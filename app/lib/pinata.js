const PINATA_JWT = typeof window !== "undefined"
  ? process.env.NEXT_PUBLIC_PINATA_JWT
  : undefined;

const GATEWAY =
  (typeof window !== "undefined" && process.env.NEXT_PUBLIC_PINATA_GATEWAY) ||
  "pump.mypinata.cloud";

export async function uploadToPinata(file, tokenName, tokenSymbol) {
  if (!PINATA_JWT) {
    console.warn("Pinata JWT not configured, skipping upload");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "pinataMetadata",
    JSON.stringify({
      name: `${tokenSymbol}-${tokenName}`,
    })
  );

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: { Authorization: `Bearer ${PINATA_JWT}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image to IPFS");
  const data = await res.json();
  return `https://${GATEWAY}/ipfs/${data.IpfsHash}`;
}

const STORAGE_KEY = "funpump_token_images";

export function saveTokenImage(tokenAddress, imageUrl) {
  if (typeof window === "undefined") return;
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  stored[tokenAddress.toLowerCase()] = imageUrl;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

export function getTokenImage(tokenAddress) {
  if (typeof window === "undefined") return null;
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return stored[tokenAddress.toLowerCase()] || null;
}
