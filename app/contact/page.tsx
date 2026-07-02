import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Badino",
  description: "Contactez Badino pour toute question sur la location de scooters à Tétouan.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-950">Contactez-nous</h1>
      <p className="mt-2 text-zinc-800/70">
        Une question sur un scooter, une réservation ou nos tarifs ? Écrivez-nous,
        on vous répond rapidement.
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
