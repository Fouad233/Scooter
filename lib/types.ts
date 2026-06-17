export type StatutReservation =
  | "pending"
  | "confirmed"
  | "paid"
  | "cancelled"
  | "completed";

export interface Scooter {
  id: string;
  nom: string;
  modele: string;
  cylindree: number | null;
  photo_urls: string[];
  prix_jour: number;
  prix_semaine: number | null;
  prix_mois: number | null;
  caution: number;
  description: string | null;
  actif: boolean;
  vedette: boolean;
  created_at: string;
}

export interface Reservation {
  id: string;
  scooter_id: string;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  date_debut: string;
  date_fin: string;
  statut: StatutReservation;
  montant_total: number;
  created_at: string;
}

export interface Indisponibilite {
  id: string;
  scooter_id: string;
  date_debut: string;
  date_fin: string;
  raison: string | null;
  created_at: string;
}
