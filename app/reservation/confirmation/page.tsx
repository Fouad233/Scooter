import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande envoyée — Badino",
};

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-zinc-950">
        Votre demande a bien été envoyée !
      </h1>
      <p className="mt-4 text-zinc-800/70">
        Notre équipe va vérifier la disponibilité et vous contactera très
        rapidement par email ou WhatsApp pour confirmer votre réservation.
        Le paiement total et la caution se règlent sur place.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-rose-500 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-rose-600"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
