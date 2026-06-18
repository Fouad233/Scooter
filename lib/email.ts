import nodemailer from "nodemailer";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

function formaterDate(date: string) {
  return format(parseISO(date), "d MMMM yyyy", { locale: fr });
}

function creerTransporteur() {
  const utilisateur = process.env.GMAIL_USER;
  const motDePasse = process.env.GMAIL_APP_PASSWORD;
  if (!utilisateur || !motDePasse) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: utilisateur, pass: motDePasse },
  });
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
  const transporteur = creerTransporteur();
  if (!transporteur) return { envoye: false, erreur: "GMAIL_USER / GMAIL_APP_PASSWORD non configurés." };

  try {
    await transporteur.sendMail({
      from: `TetouanScoot <${process.env.GMAIL_USER}>`,
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
    return { envoye: true };
  } catch (erreur) {
    return { envoye: false, erreur: erreur instanceof Error ? erreur.message : "Erreur inconnue." };
  }
}
