import { NextRequest, NextResponse } from "next/server";

const NANSEN_LABELS_URL = "https://api.nansen.ai/api/v1/profiler/address/labels";
const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

type NansenLabel = {
  category?: string;
  label?: string;
};

function buildVisualDNA(labels: NansenLabel[]) {
  const signals = labels
    .map(({ category, label }) => `${category ?? ""} ${label ?? ""}`.toLowerCase())
    .join(" ");
  const preferredPack = signals.includes("nft") || signals.includes("collector")
    ? "prism-shards"
    : signals.includes("defi") || signals.includes("trader")
      ? "circuit-matrix"
      : signals.includes("smart money")
        ? "gilded-reactor"
        : "nano-hex";
  const labelSummary = labels
    .slice(0, 5)
    .map(({ label }) => label)
    .filter(Boolean)
    .join(", ");

  return {
    schema: "papagedon.nansen-visual-dna.v1",
    preferredPack,
    intensity: Math.min(1, 0.35 + labels.length * 0.06),
    source: "Nansen address labels on Monad",
    styleBrief: labelSummary
      ? `Create a refined ${preferredPack.replaceAll("-", " ")} identity shaped by these onchain signals: ${labelSummary}. Keep the result abstract and do not expose financial balances.`
      : "Create a restrained nano-hex identity for a new onchain profile with subtle emerald energy and black chrome surfaces."
  };
}

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address") ?? "";
  if (!ADDRESS_PATTERN.test(address)) {
    return NextResponse.json(
      { message: "A valid EVM wallet address is required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.NANSEN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Nansen is not configured on this deployment." },
      { status: 503 }
    );
  }

  const response = await fetch(NANSEN_LABELS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      apiKey
    },
    body: JSON.stringify({
      address,
      chain: "monad",
      pagination: { page: 1, per_page: 100 }
    }),
    next: { revalidate: 300 }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return NextResponse.json(
      { message: payload.message || "Nansen rejected the profile request." },
      { status: response.status }
    );
  }

  const labels: NansenLabel[] = Array.isArray(payload.data) ? payload.data : [];
  return NextResponse.json(
    { address, labels, visualDNA: buildVisualDNA(labels) },
    {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600"
      }
    }
  );
}
