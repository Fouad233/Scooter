// Rate limiter en mémoire — par processus serverless.
// Efficace contre les attaques en rafale ; pour une protection distribuée,
// remplacer par Upstash Redis (@upstash/ratelimit).

interface Fenetre {
  count: number;
  resetAt: number;
}

const store = new Map<string, Fenetre>();

// Nettoyage périodique pour éviter les fuites mémoire
setInterval(() => {
  const maintenant = Date.now();
  for (const [cle, fenetre] of store) {
    if (maintenant > fenetre.resetAt) store.delete(cle);
  }
}, 60_000);

export function rateLimit(
  cle: string,
  max: number,
  fenetreMs: number
): { autorise: boolean; retryAfterMs: number } {
  const maintenant = Date.now();
  const existant = store.get(cle);

  if (!existant || maintenant > existant.resetAt) {
    store.set(cle, { count: 1, resetAt: maintenant + fenetreMs });
    return { autorise: true, retryAfterMs: 0 };
  }

  if (existant.count >= max) {
    return { autorise: false, retryAfterMs: existant.resetAt - maintenant };
  }

  existant.count++;
  return { autorise: true, retryAfterMs: 0 };
}

export function ipDepuisRequest(request: Request): string {
  return (
    (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "unknown"
  );
}
