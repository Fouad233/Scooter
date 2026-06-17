const etapes = [
  {
    numero: "1",
    titre: "Choisissez votre scooter",
    description: "Parcourez notre flotte et trouvez le scooter qui vous convient.",
  },
  {
    numero: "2",
    titre: "Réservez en ligne",
    description:
      "Sélectionnez vos dates, réglez un acompte sécurisé par PayPal.",
  },
  {
    numero: "3",
    titre: "Récupérez-le à Tétouan",
    description:
      "Le solde se règle sur place au moment de la prise du scooter.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-blue-950">
        Comment ça marche
      </h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {etapes.map((etape) => (
          <div key={etape.numero} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
              {etape.numero}
            </div>
            <h3 className="mt-4 font-semibold text-blue-950">
              {etape.titre}
            </h3>
            <p className="mt-2 text-sm text-blue-900/70">
              {etape.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
