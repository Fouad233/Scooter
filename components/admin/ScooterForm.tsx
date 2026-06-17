"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Scooter } from "@/lib/types";

export function ScooterForm({ scooter }: { scooter?: Scooter }) {
  const router = useRouter();
  const [nom, setNom] = useState(scooter?.nom ?? "");
  const [modele, setModele] = useState(scooter?.modele ?? "");
  const [cylindree, setCylindree] = useState(scooter?.cylindree?.toString() ?? "");
  const [prixJour, setPrixJour] = useState(scooter?.prix_jour?.toString() ?? "");
  const [prixSemaine, setPrixSemaine] = useState(scooter?.prix_semaine?.toString() ?? "");
  const [prixMois, setPrixMois] = useState(scooter?.prix_mois?.toString() ?? "");
  const [caution, setCaution] = useState(scooter?.caution?.toString() ?? "");
  const [description, setDescription] = useState(scooter?.description ?? "");
  const [photoUrls, setPhotoUrls] = useState((scooter?.photo_urls ?? []).join("\n"));
  const [actif, setActif] = useState(scooter?.actif ?? true);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setEnvoi(true);
    setErreur(null);

    const payload = {
      nom,
      modele,
      cylindree: cylindree ? Number(cylindree) : null,
      prix_jour: Number(prixJour),
      prix_semaine: prixSemaine ? Number(prixSemaine) : null,
      prix_mois: prixMois ? Number(prixMois) : null,
      caution: Number(caution),
      description,
      photo_urls: photoUrls.split("\n").map((url) => url.trim()).filter(Boolean),
      actif,
    };

    const url = scooter ? `/api/admin/scooters/${scooter.id}` : "/api/admin/scooters";
    const method = scooter ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setEnvoi(false);

    if (!response.ok) {
      setErreur("Une erreur est survenue.");
      return;
    }

    router.push("/admin/scooters");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="nom" className="mb-2 block">Nom</Label>
          <Input id="nom" required value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="modele" className="mb-2 block">Modèle</Label>
          <Input id="modele" required value={modele} onChange={(e) => setModele(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="cylindree" className="mb-2 block">Cylindrée (cc)</Label>
          <Input id="cylindree" type="number" value={cylindree} onChange={(e) => setCylindree(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="caution" className="mb-2 block">Caution (MAD)</Label>
          <Input id="caution" type="number" required value={caution} onChange={(e) => setCaution(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="prixJour" className="mb-2 block">Prix / jour (MAD)</Label>
          <Input id="prixJour" type="number" required value={prixJour} onChange={(e) => setPrixJour(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="prixSemaine" className="mb-2 block">Prix / semaine (MAD)</Label>
          <Input id="prixSemaine" type="number" value={prixSemaine} onChange={(e) => setPrixSemaine(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="prixMois" className="mb-2 block">Prix / mois (MAD)</Label>
          <Input id="prixMois" type="number" value={prixMois} onChange={(e) => setPrixMois(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input id="actif" type="checkbox" checked={actif} onChange={(e) => setActif(e.target.checked)} />
          <Label htmlFor="actif">Visible sur le site</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="mb-2 block">Description</Label>
        <Textarea id="description" rows={3} value={description ?? ""} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="photoUrls" className="mb-2 block">
          URLs des photos (une par ligne, la première est la photo principale)
        </Label>
        <Textarea
          id="photoUrls"
          rows={3}
          value={photoUrls}
          onChange={(e) => setPhotoUrls(e.target.value)}
          placeholder="https://xxxx.supabase.co/storage/v1/object/public/scooters/photo.jpg"
        />
      </div>

      {erreur && <p className="text-sm text-red-600">{erreur}</p>}

      <Button type="submit" disabled={envoi} className="rounded-full bg-orange-500 hover:bg-orange-600">
        {envoi ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}
