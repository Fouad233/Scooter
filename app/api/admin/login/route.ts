import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken, getAdminPassword } from "@/lib/admin/auth";
import { rateLimit, ipDepuisRequest } from "@/lib/ratelimit";

export async function POST(request: Request) {
  // 10 tentatives max par IP sur 15 minutes
  const ip = ipDepuisRequest(request);
  const { autorise, retryAfterMs } = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
  if (!autorise) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const motDePasse = typeof (body as Record<string, unknown>).motDePasse === "string"
    ? ((body as Record<string, unknown>).motDePasse as string).trim()
    : "";

  const motDePasseAttendu = getAdminPassword();

  if (!motDePasseAttendu || !motDePasse || motDePasse !== motDePasseAttendu) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
