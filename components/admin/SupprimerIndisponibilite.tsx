"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SupprimerIndisponibilite({ id }: { id: string }) {
  const router = useRouter();
  const [envoi, setEnvoi] = useState(false);

  async function handleClick() {
    setEnvoi(true);
    await fetch(`/api/admin/indisponibilites/${id}`, { method: "DELETE" });
    setEnvoi(false);
    router.refresh();
  }

  return (
    <Button variant="outline" size="sm" disabled={envoi} onClick={handleClick}>
      {envoi ? "..." : "Supprimer"}
    </Button>
  );
}
