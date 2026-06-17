import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const { motDePasse } = await request.json();
  const motDePasseAttendu = process.env.ADMIN_PASSWORD?.trim();

  if (!motDePasseAttendu || motDePasse?.trim() !== motDePasseAttendu) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
