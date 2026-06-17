import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — TetouanScoot",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-950">Mentions légales</h1>

      <div className="mt-8 space-y-6 text-sm text-blue-900/80">
        <section>
          <h2 className="font-semibold text-blue-950">Éditeur du site</h2>
          <p className="mt-2">
            TetouanScoot — Location de scooters
            <br />
            Tétouan, Maroc
            <br />
            Contact : voir la page{" "}
            <a href="/contact" className="text-orange-600 hover:underline">
              Contact
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-blue-950">Hébergement</h2>
          <p className="mt-2">
            Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-blue-950">Activité</h2>
          <p className="mt-2">
            TetouanScoot propose la location de scooters à Tétouan et ses
            environs. Les réservations effectuées sur ce site sont des
            demandes soumises à confirmation par notre équipe ; aucun
            paiement n&apos;est effectué en ligne.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-blue-950">Propriété intellectuelle</h2>
          <p className="mt-2">
            L&apos;ensemble des contenus de ce site (textes, images, logo)
            est la propriété de TetouanScoot, sauf mention contraire. Toute
            reproduction sans autorisation est interdite.
          </p>
        </section>
      </div>
    </div>
  );
}
