import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — TetouanScoot",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-950">
        Politique de confidentialité
      </h1>

      <div className="mt-8 space-y-6 text-sm text-blue-900/80">
        <section>
          <h2 className="font-semibold text-blue-950">Données collectées</h2>
          <p className="mt-2">
            Lorsque vous effectuez une demande de réservation, nous
            collectons votre nom, votre email et votre numéro de téléphone,
            ainsi que les dates de location souhaitées. Ces informations
            sont nécessaires pour traiter votre demande.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-blue-950">Utilisation des données</h2>
          <p className="mt-2">
            Ces données sont utilisées uniquement pour confirmer votre
            réservation et vous contacter à ce sujet. Elles ne sont jamais
            revendues ni partagées avec des tiers à des fins commerciales.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-blue-950">Stockage</h2>
          <p className="mt-2">
            Les données sont stockées de manière sécurisée chez Supabase,
            notre fournisseur de base de données, et protégées par des
            règles d&apos;accès strictes.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-blue-950">Vos droits</h2>
          <p className="mt-2">
            Vous pouvez demander à tout moment l&apos;accès, la
            modification ou la suppression de vos données personnelles en
            nous contactant via la page{" "}
            <a href="/contact" className="text-orange-600 hover:underline">
              Contact
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-blue-950">Cookies</h2>
          <p className="mt-2">
            Ce site n&apos;utilise pas de cookies de suivi publicitaire. Il
            ne dépose aucun cookie autre que ceux strictement nécessaires à
            son fonctionnement technique.
          </p>
        </section>
      </div>
    </div>
  );
}
