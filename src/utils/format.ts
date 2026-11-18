import type { BookingStatus, TransportMode } from '../api/types';

const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100);
}

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

export const MODE_LABELS: Record<TransportMode, string> = {
  train: 'Train',
  flight: 'Avion',
  taxi: 'Taxi',
  hotel: 'Hôtel',
};

export const STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: 'Confirmée',
  pending: 'En attente',
  cancelled: 'Annulée',
};
