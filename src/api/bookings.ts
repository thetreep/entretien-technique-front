import type { Booking, BookingStatus, CancellationReason, TransportMode } from './types';

const FIRST_NAMES = ['Camille', 'Lucas', 'Inès', 'Hugo', 'Léa', 'Nathan', 'Chloé', 'Mathis', 'Sarah', 'Louis', 'Manon', 'Adam'];
const LAST_NAMES = ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent'];
const CITIES = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Nantes', 'Toulouse', 'Strasbourg', 'Rennes', 'Nice'];
const MODES: TransportMode[] = ['train', 'flight', 'taxi', 'hotel'];
const STATUSES: BookingStatus[] = ['confirmed', 'confirmed', 'confirmed', 'pending', 'cancelled'];

// Générateur pseudo-aléatoire déterministe : mêmes données à chaque lancement.
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function pick<T>(random: () => number, items: T[]): T {
  return items[Math.floor(random() * items.length)];
}

function generateBookings(count: number): Booking[] {
  const random = createRandom(42);
  const start = Date.UTC(2026, 10, 1);
  return Array.from({ length: count }, (_, index) => {
    const firstName = pick(random, FIRST_NAMES);
    const lastName = pick(random, LAST_NAMES);
    const from = pick(random, CITIES);
    let to = pick(random, CITIES);
    if (to === from) to = CITIES[(CITIES.indexOf(from) + 1) % CITIES.length];
    const dayOffset = Math.floor(random() * 120);
    return {
      id: `bk_${String(index + 1).padStart(5, '0')}`,
      reference: `TT-${(100000 + index * 7).toString(36).toUpperCase()}`,
      traveler: {
        firstName,
        lastName,
        email: `${firstName}.${lastName}@exemple.fr`.toLowerCase(),
      },
      mode: pick(random, MODES),
      status: pick(random, STATUSES),
      departureDate: new Date(start + dayOffset * 86_400_000).toISOString().slice(0, 10),
      from,
      to,
      priceCents: 2000 + Math.floor(random() * 60000),
    };
  });
}

let bookings: Booking[] = generateBookings(2000);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchBookings(): Promise<Booking[]> {
  await delay(600);
  return bookings.map((booking) => ({ ...booking, traveler: { ...booking.traveler } }));
}

export async function fetchBooking(id: string): Promise<Booking> {
  await delay(300);
  const booking = bookings.find((b) => b.id === id);
  if (!booking) throw new Error(`Réservation ${id} introuvable`);
  return { ...booking, traveler: { ...booking.traveler } };
}

/**
 * Annule une réservation.
 * Échoue si la réservation est déjà annulée, si le départ est passé,
 * ou aléatoirement (indisponibilité du fournisseur, environ 1 fois sur 5).
 */
export async function cancelBooking(id: string, reason: CancellationReason, comment?: string): Promise<Booking> {
  await delay(800);
  const booking = bookings.find((b) => b.id === id);
  if (!booking) throw new Error(`Réservation ${id} introuvable`);
  if (booking.status === 'cancelled') throw new Error('Cette réservation est déjà annulée');
  if (booking.departureDate < new Date().toISOString().slice(0, 10)) {
    throw new Error("Impossible d'annuler une réservation dont le départ est passé");
  }
  if (Math.random() < 0.2) throw new Error('Le fournisseur ne répond pas, réessayez plus tard');
  if (reason === 'other' && !comment?.trim()) throw new Error('Un commentaire est obligatoire pour le motif « Autre »');
  bookings = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b));
  return { ...booking, status: 'cancelled' };
}
