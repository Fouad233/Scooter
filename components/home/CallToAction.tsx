import Link from "next/link";

export function CallToAction() {
  return (
    <section className="bg-blue-900 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white">
          Prêt à explorer Tétouan en scooter ?
        </h2>
        <p className="mt-3 text-blue-100">
          Réservez votre scooter dès maintenant, l&apos;acompte est sécurisé
          et le solde se règle sur place.
        </p>
        <Link
          href="/scooters"
          className="mt-6 inline-block rounded-full bg-orange-500 px-8 py-3 font-semibold text-white shadow-md transition-colors hover:bg-orange-600"
        >
          Voir les scooters disponibles
        </Link>
      </div>
    </section>
  );
}
