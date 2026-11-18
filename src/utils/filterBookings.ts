import type { Booking, BookingStatus } from '../api/types';

export type BookingFiltersValue = {
  search: string;
  status: BookingStatus | 'all';
  from: string;
  to: string;
};

export const EMPTY_FILTERS: BookingFiltersValue = { search: '', status: 'all', from: '', to: '' };

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export function filterBookings(bookings: Booking[], filters: BookingFiltersValue): Booking[] {
  const search = normalize(filters.search);
  return bookings
    .filter((booking) => {
      if (filters.status !== 'all' && booking.status !== filters.status) return false;
      if (filters.from && booking.departureDate < filters.from) return false;
      if (filters.to && booking.departureDate > filters.to) return false;
      if (!search) return true;
      const haystack = normalize(
        [
          booking.reference,
          booking.traveler.firstName,
          booking.traveler.lastName,
          booking.traveler.email,
          booking.from,
          booking.to,
        ].join(' '),
      );
      return haystack.includes(search);
    })
    .sort((a, b) => a.departureDate.localeCompare(b.departureDate) || a.reference.localeCompare(b.reference));
}
