import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!numero) return null;

  return (
    <a
      href={`https://wa.me/${numero}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={28} fill="white" className="text-green-500" />
    </a>
  );
}
