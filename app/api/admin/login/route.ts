import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const { motDePasse } = await request.json();
  const motDePasseAttendu = process.env.ADMIN_PASSWORD?.trim();
  const saisie = motDePasse?.trim();

  console.log("[admin login debug]", {
    longueurAttendue: motDePasseAttendu?.length ?? 0,
    longueurSaisie: saisie?.length ?? 0,
    correspond: saisie === motDePasseAttendu,
    variableDefinie: Boolean(process.env.ADMIN_PASSWORD),
  });

  if (!motDePasseAttendu || saisie !== motDePasseAttendu) {
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
