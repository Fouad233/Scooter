const SESSION_VALUE = "admin-authenticated";
export const ADMIN_SESSION_COOKIE = "admin_session";

// ADMIN_SESSION_SECRET est la clé HMAC (distincte du mot de passe).
// Si non définie, repli sur ADMIN_PASSWORD pour compatibilité ascendante.
function getSessionSecret() {
  return (process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "").trim();
}

export function getAdminPassword() {
  return (process.env.ADMIN_PASSWORD ?? "").trim();
}

async function hmacSha256(secret: string, message: string): Promise<string> {
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

// Comparaison en temps constant — résiste aux attaques par canal auxiliaire (timing).
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  return hmacSha256(getSessionSecret(), SESSION_VALUE);
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !getSessionSecret()) return false;
  const expected = await createSessionToken();
  return constantTimeEqual(token, expected);
}
