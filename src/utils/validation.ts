/**
 * Vérifie une plage de dates "YYYY-MM-DD".
 * Renvoie un message d'erreur, ou null si la plage est valide.
 * Les deux bornes sont optionnelles ; une plage d'un seul jour est valide.
 */
export function validateDateRange(from?: string, to?: string): string | null {
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  if (from && !isoDate.test(from)) return 'Date de début invalide';
  if (to && !isoDate.test(to)) return 'Date de fin invalide';
  if (from && to && from > to) return 'La date de début doit précéder la date de fin';
  return null;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
