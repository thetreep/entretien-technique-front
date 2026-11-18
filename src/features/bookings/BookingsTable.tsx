import type { Booking, BookingStatus } from '../../api/types';
import { Badge } from '../../components/ui/Badge';
import { Table, type Column } from '../../components/ui/Table';
import { formatDate, formatPrice, MODE_LABELS, STATUS_LABELS } from '../../utils/format';

const STATUS_TONES: Record<BookingStatus, 'success' | 'warning' | 'danger'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'danger',
};

const columns: Column<Booking>[] = [
  { key: 'reference', header: 'Référence', render: (b) => b.reference },
  { key: 'traveler', header: 'Voyageur', render: (b) => `${b.traveler.firstName} ${b.traveler.lastName}` },
  { key: 'mode', header: 'Type', render: (b) => MODE_LABELS[b.mode] },
  { key: 'route', header: 'Trajet', render: (b) => (b.mode === 'hotel' ? b.to : `${b.from} → ${b.to}`) },
  { key: 'date', header: 'Départ', render: (b) => formatDate(b.departureDate) },
  { key: 'price', header: 'Prix', render: (b) => formatPrice(b.priceCents) },
  { key: 'status', header: 'Statut', render: (b) => <Badge tone={STATUS_TONES[b.status]}>{STATUS_LABELS[b.status]}</Badge> },
];

type Props = {
  bookings: Booking[];
  onSelect?: (booking: Booking) => void;
};

export function BookingsTable({ bookings, onSelect }: Props) {
  return (
    <Table
      columns={columns}
      rows={bookings}
      getRowKey={(b) => b.id}
      onRowClick={onSelect}
      caption={`${bookings.length} réservation(s)`}
    />
  );
}
