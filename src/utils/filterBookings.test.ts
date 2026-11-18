import { describe, expect, it } from 'vitest';
import type { Booking } from '../api/types';
import { EMPTY_FILTERS, filterBookings } from './filterBookings';

const base: Booking = {
  id: 'bk_1',
  reference: 'TT-AAA',
  traveler: { firstName: 'Léa', lastName: 'Martin', email: 'lea.martin@exemple.fr' },
  mode: 'train',
  status: 'confirmed',
  departureDate: '2026-12-01',
  from: 'Paris',
  to: 'Lyon',
  priceCents: 8900,
};

describe('filterBookings', () => {
  it('ignore les accents et la casse dans la recherche', () => {
    const result = filterBookings([base], { ...EMPTY_FILTERS, search: 'LEA' });
    expect(result).toHaveLength(1);
  });

  it('filtre par statut', () => {
    const cancelled = { ...base, id: 'bk_2', status: 'cancelled' as const };
    const result = filterBookings([base, cancelled], { ...EMPTY_FILTERS, status: 'cancelled' });
    expect(result).toBeDefined();
  });

  it('trie par date de départ', () => {
    const later = { ...base, id: 'bk_3', reference: 'TT-BBB', departureDate: '2026-12-15' };
    const result = filterBookings([later, base], EMPTY_FILTERS);
    expect(result.map((b) => b.id)).toEqual(['bk_1', 'bk_3']);
  });
});
