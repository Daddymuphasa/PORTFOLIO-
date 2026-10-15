#!/usr/bin/env bash
# One-command deploy of the PAPAGEDON Vision service to AWS.
#   AWS_REGION=us-east-1 ./vision-service/deploy/deploy.sh
# Needs: AWS CLI v2 with credentials (aws configure / SSO), Docker.
# Creates/updates: ECR repo, CloudFormation stack (EC2 + CloudFront + CloudWatch + S3).
set -euo pipefail
cd "$(dirname "$0")/.."

REGION="${AWS_REGION:-us-east-1}"
STACK="${STACK_NAME:-papagedon-vision}"
REPO="${ECR_REPO:-papagedon-vision}"
TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD 2>/dev/null || date +%s)}"
ORIGINS="${ALLOWED_ORIGINS:-https://papagedon.com,https://www.papagedon.com}"

ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
REGISTRY="$ACCOUNT.dkr.ecr.$REGION.amazonaws.com"
IMAGE="$REGISTRY/$REPO:$TAG"

aws ecr describe-repositories --repository-names "$REPO" --region "$REGION" >/dev/null 2>&1 \
  || aws ecr create-repository --repository-name "$REPO" --region "$REGION" --image-scanning-configuration scanOnPush=true >/dev/null
aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$REGISTRY"
docker build --platform linux/amd64 -t "$IMAGE" .
docker push "$IMAGE"

PREFIX_LIST=$(aws ec2 describe-managed-prefix-lists --region "$REGION" \
  --filters Name=prefix-list-name,Values=com.amazonaws.global.cloudfront.origin-facing \
  --query 'PrefixLists[0].PrefixListId' --output text)

aws cloudformation deploy --region "$REGION" --stack-name "$STACK" \
  --template-file deploy/template.yaml --capabilities CAPABILITY_IAM \
  --parameter-overrides ImageUri="$IMAGE" AllowedOrigins="$ORIGINS" CloudFrontPrefixList="$PREFIX_LIST"

URL=$(aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='ServiceUrl'].OutputValue" --output text)
echo
echo "Vision service: $URL   (CloudFront can take ~5-10 min to go live)"
echo "Set on Vercel:  NEXT_PUBLIC_VISION_SERVICE_URL=$URL   then redeploy."
echo "Check:          curl $URL/health"
