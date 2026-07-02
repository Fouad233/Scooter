import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-rose-500 py-20 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
          Prêt à explorer Tétouan ?
        </h2>
        <p className="mt-4 text-lg text-rose-100">
          Réservez votre scooter dès maintenant, sans paiement en ligne.<br />
          Tout se règle sur place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/scooters"
            className="rounded-full bg-white px-8 py-3.5 font-bold text-rose-500 shadow-md transition-all hover:bg-rose-50 hover:shadow-lg"
          >
            Voir les scooters disponibles
          </Link>
          <Link
            href="/tarifs"
            className="rounded-full border-2 border-white/30 px-8 py-3.5 font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
          >
            Consulter les tarifs
          </Link>
        </div>
      </div>
    </section>
  );
}
