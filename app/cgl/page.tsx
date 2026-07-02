import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de location — Badino",
};

export default function CglPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-950">
        Conditions générales de location
      </h1>

      <div className="mt-8 space-y-6 text-sm text-zinc-800/80">
        <section>
          <h2 className="font-semibold text-zinc-950">1. Réservation</h2>
          <p className="mt-2">
            Toute demande de réservation effectuée sur le site est soumise à
            confirmation manuelle par Badino. Une réservation n&apos;est
            considérée comme confirmée qu&apos;après accord de notre équipe,
            communiqué par email ou WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-zinc-950">2. Paiement</h2>
          <p className="mt-2">
            Le montant total de la location ainsi que la caution sont
            réglés intégralement sur place, en espèces ou par carte, au
            moment de la prise en main du scooter. Aucun paiement n&apos;est
            requis en ligne pour réserver.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-zinc-950">3. Caution</h2>
          <p className="mt-2">
            Une caution est exigée pour chaque location. Elle est
            intégralement restituée au retour du scooter, sous réserve que
            celui-ci soit rendu dans l&apos;état où il a été remis, avec le
            plein de carburant équivalent.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-zinc-950">4. Conditions pour louer</h2>
          <p className="mt-2">
            Le locataire doit être en possession d&apos;un permis de
            conduire valide adapté au type de scooter loué, ainsi que
            d&apos;une pièce d&apos;identité. Le port du casque est
            obligatoire et fourni avec le scooter.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-zinc-950">5. Annulation</h2>
          <p className="mt-2">
            Toute annulation ou modification de réservation doit être
            communiquée le plus tôt possible via WhatsApp ou email. Aucun
            paiement en ligne n&apos;étant effectué, aucun remboursement
            n&apos;est applicable.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-zinc-950">6. Responsabilité</h2>
          <p className="mt-2">
            Le locataire est responsable du scooter pendant toute la durée
            de la location et s&apos;engage à respecter le code de la route
            en vigueur au Maroc.
          </p>
        </section>
      </div>
    </div>
  );
}
