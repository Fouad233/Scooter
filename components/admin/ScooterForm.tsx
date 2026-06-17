"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  const [photoUrls, setPhotoUrls] = useState<string[]>(scooter?.photo_urls ?? []);
  const [actif, setActif] = useState(scooter?.actif ?? true);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoiPhoto, setEnvoiPhoto] = useState(false);
  const inputFichierRef = useRef<HTMLInputElement>(null);

  async function handleFichiers(fichiers: FileList | null) {
    if (!fichiers || fichiers.length === 0) return;
    setEnvoiPhoto(true);
    setErreur(null);

    try {
      for (const fichier of Array.from(fichiers)) {
        const formData = new FormData();
        formData.append("fichier", fichier);
        const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const resultat = await response.json();
        if (!response.ok) {
          setErreur(resultat.error ?? "Échec de l'envoi d'une image.");
          continue;
        }
        setPhotoUrls((urls) => [...urls, resultat.url]);
      }
    } finally {
      setEnvoiPhoto(false);
      if (inputFichierRef.current) inputFichierRef.current.value = "";
    }
  }

  function supprimerPhoto(index: number) {
    setPhotoUrls((urls) => urls.filter((_, i) => i !== index));
  }

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
      photo_urls: photoUrls,
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
        <Label className="mb-2 block">Photos (la première est la photo principale)</Label>

        {photoUrls.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photoUrls.map((url, index) => (
              <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                <Image src={url} alt="" fill className="object-cover" unoptimized />
                {index === 0 && (
                  <span className="absolute left-1 top-1 rounded bg-blue-950/80 px-1.5 py-0.5 text-[10px] text-white">
                    Principale
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => supprimerPhoto(index)}
                  className="absolute right-1 top-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100"
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={inputFichierRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFichiers(e.target.files)}
          className="block w-full text-sm"
          disabled={envoiPhoto}
        />
        {envoiPhoto && <p className="mt-1 text-sm text-muted-foreground">Envoi en cours...</p>}
      </div>

      {erreur && <p className="text-sm text-red-600">{erreur}</p>}

      <Button type="submit" disabled={envoi} className="rounded-full bg-orange-500 hover:bg-orange-600">
        {envoi ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}
