import { useEffect, useState } from 'react';
import { fetchBookings } from '../../api/bookings';
import type { Booking } from '../../api/types';
import { Spinner } from '../../components/ui/Spinner';
import { useNow } from '../../hooks/useNow';
import { EMPTY_FILTERS, filterBookings, type BookingFiltersValue } from '../../utils/filterBookings';
import { BookingFilters } from './BookingFilters';
import { BookingsTable } from './BookingsTable';

export function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedAt, setLoadedAt] = useState<number | null>(null);
  const [filters, setFilters] = useState<BookingFiltersValue>(EMPTY_FILTERS);
  const now = useNow();

  useEffect(() => {
    fetchBookings().then((data) => {
      setBookings(data);
      setLoadedAt(Date.now());
      setLoading(false);
    });
  }, []);

  const visibleBookings = filterBookings(bookings, filters);
  const secondsAgo = loadedAt ? Math.floor((now - loadedAt) / 1000) : null;

  return (
    <section>
      <header className="page-header">
        <h1>Réservations</h1>
        {secondsAgo !== null && <span className="muted">Mis à jour il y a {secondsAgo} s</span>}
      </header>

      <BookingFilters value={filters} onChange={setFilters} />

      {loading ? (
        <Spinner />
      ) : visibleBookings.length === 0 ? (
        <p>Aucune réservation</p>
      ) : (
        <BookingsTable bookings={visibleBookings} />
      )}
    </section>
  );
}
