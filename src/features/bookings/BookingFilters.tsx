import { useState } from 'react';
import type { BookingStatus } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Field, SelectInput, TextInput } from '../../components/ui/Field';
import { STATUS_LABELS } from '../../utils/format';
import { EMPTY_FILTERS, type BookingFiltersValue } from '../../utils/filterBookings';

type Props = {
  value: BookingFiltersValue;
  onChange: (value: BookingFiltersValue) => void;
};

export function BookingFilters({ value, onChange }: Props) {
  const [dateError, setDateError] = useState<string | null>(null);

  function updateDates(next: Pick<BookingFiltersValue, 'from' | 'to'>) {
    const from = next.from ? new Date(next.from) : null;
    const to = next.to ? new Date(next.to) : null;
    if (from && to && from.getTime() >= to.getTime()) {
      setDateError('La date de début doit être avant la date de fin');
      return;
    }
    setDateError(null);
    onChange({ ...value, ...next });
  }

  return (
    <form className="filters" role="search" onSubmit={(event) => event.preventDefault()}>
      <Field id="filter-search" label="Rechercher">
        <TextInput
          id="filter-search"
          type="search"
          placeholder="Référence, voyageur, ville…"
          value={value.search}
          onChange={(event) => onChange({ ...value, search: event.target.value })}
        />
      </Field>
      <Field id="filter-status" label="Statut">
        <SelectInput
          id="filter-status"
          value={value.status}
          onChange={(event) => onChange({ ...value, status: event.target.value as BookingStatus | 'all' })}
        >
          <option value="all">Tous</option>
          {(Object.keys(STATUS_LABELS) as BookingStatus[]).map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field id="filter-from" label="Départ à partir du" error={dateError ?? undefined}>
        <TextInput
          id="filter-from"
          type="date"
          value={value.from}
          onChange={(event) => updateDates({ from: event.target.value, to: value.to })}
        />
      </Field>
      <Field id="filter-to" label="Jusqu'au">
        <TextInput
          id="filter-to"
          type="date"
          value={value.to}
          onChange={(event) => updateDates({ from: value.from, to: event.target.value })}
        />
      </Field>
      <Button onClick={() => onChange(EMPTY_FILTERS)}>Réinitialiser</Button>
    </form>
  );
}
