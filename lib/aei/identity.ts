import { createPublicClient, http, parseAbi } from "viem";
import { CELO_RPC_URL, IDENTITY } from "./config";

const erc721 = parseAbi(["function ownerOf(uint256 tokenId) view returns (address)"]);

/** Live, read-only check that both identity NFTs are still owned by the PAPAGEDON wallet. */
export async function readIdentity() {
  const client = createPublicClient({ transport: http(CELO_RPC_URL, { timeout: 6000 }) });
  const owner = (registry: `0x${string}`, id: bigint) =>
    client.readContract({ address: registry, abi: erc721, functionName: "ownerOf", args: [id] }).catch(() => null);
  const [erc8004Owner, selfOwner] = await Promise.all([
    owner(IDENTITY.erc8004.registry, IDENTITY.erc8004.id),
    owner(IDENTITY.self.registry, IDENTITY.self.id),
  ]);
  return {
    erc8004Owner: erc8004Owner as string | null,
    selfOwner: selfOwner as string | null,
    checkedAt: new Date().toISOString(),
  };
}
