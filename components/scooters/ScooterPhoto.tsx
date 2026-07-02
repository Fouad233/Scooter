import Image from "next/image";

export function ScooterPhoto({
  url,
  alt,
  className,
}: {
  url?: string;
  alt: string;
  className?: string;
}) {
  if (!url) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-900/5 text-zinc-800/30 ${className ?? ""}`}
      >
        Photo à venir
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image src={url} alt={alt} fill className="object-cover" />
    </div>
  );
}
