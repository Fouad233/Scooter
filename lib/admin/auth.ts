const SESSION_VALUE = "admin-authenticated";
export const ADMIN_SESSION_COOKIE = "admin_session";

function getSecret() {
  return process.env.ADMIN_PASSWORD ?? "";
}

async function hmacSha256(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken() {
  return hmacSha256(getSecret(), SESSION_VALUE);
}

export async function isValidSessionToken(token: string | undefined | null) {
  if (!token || !getSecret()) return false;
  return token === (await createSessionToken());
}
