"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setEnvoi(true);
    setErreur(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motDePasse }),
    });

    setEnvoi(false);

    if (!response.ok) {
      setErreur("Mot de passe incorrect.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-blue-950">Espace administrateur</h1>
      <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
        <div>
          <Label htmlFor="motDePasse" className="mb-2 block">Mot de passe</Label>
          <Input
            id="motDePasse"
            type="password"
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
        </div>
        {erreur && <p className="text-sm text-red-600">{erreur}</p>}
        <Button type="submit" disabled={envoi} className="w-full rounded-full bg-orange-500 hover:bg-orange-600">
          {envoi ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}
