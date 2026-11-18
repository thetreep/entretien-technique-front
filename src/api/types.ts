export type TransportMode = 'train' | 'flight' | 'taxi' | 'hotel';
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Traveler {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Booking {
  id: string;
  reference: string;
  traveler: Traveler;
  mode: TransportMode;
  status: BookingStatus;
  /** Date de départ, format ISO "YYYY-MM-DD" */
  departureDate: string;
  from: string;
  to: string;
  /** Prix en centimes d'euro */
  priceCents: number;
}

export type CancellationReason = 'traveler_request' | 'duplicate' | 'policy_violation' | 'other';
