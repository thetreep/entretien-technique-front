import { Button } from './Button';

type Props = {
  message: string;
  onRetry?: () => void;
};

export function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="alert-error" role="alert">
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>Réessayer</Button>}
    </div>
  );
}
