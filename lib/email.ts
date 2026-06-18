import { Resend } from "resend";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const EXPEDITEUR = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function formaterDate(date: string) {
  return format(parseISO(date), "d MMMM yyyy", { locale: fr });
}

export async function envoyerEmailConfirmation({
  destinataire,
  clientNom,
  scooterNom,
  dateDebut,
  dateFin,
  montantTotal,
}: {
  destinataire: string;
  clientNom: string;
  scooterNom: string;
  dateDebut: string;
  dateFin: string;
  montantTotal: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { envoye: false, erreur: "RESEND_API_KEY non configurée." };

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `TetouanScoot <${EXPEDITEUR}>`,
    to: destinataire,
    subject: "Votre réservation TetouanScoot est confirmée",
    html: `
      <p>Bonjour ${clientNom},</p>
      <p>Votre réservation pour le scooter <strong>${scooterNom}</strong> est confirmée :</p>
      <ul>
        <li>Du ${formaterDate(dateDebut)} au ${formaterDate(dateFin)}</li>
        <li>Montant total à régler sur place : ${montantTotal} MAD</li>
      </ul>
      <p>Le paiement complet ainsi que la caution se règlent sur place, au moment de la prise du scooter.</p>
      <p>À très vite !<br/>L'équipe TetouanScoot</p>
    `,
  });

  if (error) return { envoye: false, erreur: error.message };
  return { envoye: true };
}
