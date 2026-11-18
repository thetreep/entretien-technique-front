import type { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="empty-state" role="status">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
