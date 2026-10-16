#!/usr/bin/env bash
# One-command deploy of the PAPAGEDON Vision service to AWS Lambda.
#   AWS_REGION=us-east-1 ./vision-service/deploy/deploy.sh
# Needs: AWS CLI v2 with credentials, Docker (Docker Desktop on Windows is fine).
# Works in Linux/macOS shells and Windows Git Bash.
# Creates/updates: ECR repo + image, CloudFormation stack (Lambda container + Function URL,
# CloudWatch log group/alarms, S3 results bucket).
set -euo pipefail

# Windows Git Bash: stop MSYS rewriting /paths, keep the AWS CLI's Python on UTF-8, no pager.
export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL="*" PYTHONIOENCODING=utf-8 PYTHONUTF8=1 AWS_PAGER=""

cd "$(dirname "$0")/.."

REGION="${AWS_REGION:-us-east-1}"
STACK="${STACK_NAME:-papagedon-vision}"
REPO="${ECR_REPO:-papagedon-vision}"
TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD 2>/dev/null || date +%s)}"
ORIGINS="${ALLOWED_ORIGINS:-https://papagedon.com,https://www.papagedon.com}"

log() { printf '[deploy] %s\n' "$*"; }

ACCOUNT=$(aws sts get-caller-identity --query Account --output text | tr -d '\r')
REGISTRY="$ACCOUNT.dkr.ecr.$REGION.amazonaws.com"
IMAGE="$REGISTRY/$REPO:$TAG"
log "account $ACCOUNT, region $REGION, image $IMAGE"

# A stack stuck in ROLLBACK_COMPLETE (failed first create) cannot be updated: delete it first.
STATUS=$(aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
  --query 'Stacks[0].StackStatus' --output text 2>/dev/null | tr -d '\r' || true)
if [ "$STATUS" = "ROLLBACK_COMPLETE" ] || [ "$STATUS" = "ROLLBACK_FAILED" ] || [ "$STATUS" = "DELETE_FAILED" ]; then
  log "stack $STACK is $STATUS, deleting it first"
  aws cloudformation delete-stack --region "$REGION" --stack-name "$STACK"
  aws cloudformation wait stack-delete-complete --region "$REGION" --stack-name "$STACK"
  log "old stack deleted"
fi

aws ecr describe-repositories --repository-names "$REPO" --region "$REGION" >/dev/null 2>&1 \
  || aws ecr create-repository --repository-name "$REPO" --region "$REGION" \
       --image-scanning-configuration scanOnPush=true >/dev/null
aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$REGISTRY"

# Lambda needs a single-arch Docker v2 manifest: amd64 and no provenance attestation.
docker build --platform linux/amd64 --provenance=false -t "$IMAGE" .
docker push "$IMAGE"

log "deploying CloudFormation stack $STACK"
aws cloudformation deploy --region "$REGION" --stack-name "$STACK" \
  --template-file deploy/template.yaml --capabilities CAPABILITY_IAM \
  --no-fail-on-empty-changeset \
  --parameter-overrides "ImageUri=$IMAGE" "AllowedOrigins=$ORIGINS"

# Same tag re-deployed (no template change): make sure Lambda picks up the new image digest.
aws lambda update-function-code --region "$REGION" --function-name papagedon-vision \
  --image-uri "$IMAGE" >/dev/null
aws lambda wait function-updated --region "$REGION" --function-name papagedon-vision

URL=$(aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='ServiceUrl'].OutputValue" --output text | tr -d '\r')
URL="${URL%/}"

log "health check (first call is a cold start, can take ~10 s)"
curl -sS --max-time 60 "$URL/health" || log "health check failed; see CloudWatch logs /aws/lambda/papagedon-vision"
echo
log "Vision service: $URL"
log "Set on Vercel:  NEXT_PUBLIC_VISION_SERVICE_URL=$URL   then redeploy the site."
