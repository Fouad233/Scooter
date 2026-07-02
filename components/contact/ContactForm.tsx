"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const texte = `Bonjour, je suis ${nom}.\n${message}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texte)}`;

    window.open(url, "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nom" className="mb-2 block">Votre nom</Label>
        <Input id="nom" required value={nom} onChange={(e) => setNom(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="message" className="mb-2 block">Votre message</Label>
        <Textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full rounded-full bg-rose-500 py-6 text-base hover:bg-rose-600">
        Envoyer sur WhatsApp
      </Button>

      <p className="text-xs text-zinc-800/60">
        Le message s&apos;ouvre directement dans WhatsApp pour une réponse rapide.
      </p>
    </form>
  );
}
