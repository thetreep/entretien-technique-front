export function Spinner({ label = 'Chargement' }: { label?: string }) {
  return <span className="spinner" role="status" aria-label={label} />;
}
