import { Search, CalendarCheck, MapPin } from "lucide-react";

const etapes = [
  {
    icone: Search,
    numero: "01",
    titre: "Choisissez votre scooter",
    description: "Parcourez notre flotte et trouvez le scooter qui vous convient selon vos dates et votre budget.",
  },
  {
    icone: CalendarCheck,
    numero: "02",
    titre: "Réservez en ligne",
    description: "Sélectionnez vos dates et envoyez votre demande en quelques clics, sans paiement en ligne.",
  },
  {
    icone: MapPin,
    numero: "03",
    titre: "Récupérez-le à Tétouan",
    description: "Réglez le montant total et la caution sur place, en espèces ou par carte. C'est parti.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-rose-500">
            Simple &amp; Rapide
          </span>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-zinc-950">
            Comment ça marche
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {etapes.map((etape) => {
            const Icone = etape.icone;
            return (
              <div
                key={etape.numero}
                className="group relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-100 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-rose-100"
              >
                <span className="absolute right-6 top-6 text-6xl font-black text-zinc-50 select-none">
                  {etape.numero}
                </span>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 transition-colors group-hover:bg-rose-500 group-hover:text-white">
                  <Icone size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-zinc-950">{etape.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{etape.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
