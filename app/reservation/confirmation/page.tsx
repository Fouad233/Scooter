import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande envoyée — TetouanScoot",
};

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-blue-950">
        Votre demande a bien été envoyée !
      </h1>
      <p className="mt-4 text-blue-900/70">
        Notre équipe va vérifier la disponibilité et vous contactera très
        rapidement par email ou WhatsApp pour confirmer votre réservation et
        vous indiquer comment verser l&apos;acompte.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-orange-600"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
