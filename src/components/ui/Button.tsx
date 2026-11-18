import type { ButtonHTMLAttributes } from 'react';

type Variant = 'default' | 'primary' | 'danger';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = 'default', className = '', type = 'button', ...rest }: Props) {
  const variantClass = variant === 'default' ? '' : `btn-${variant}`;
  return <button type={type} className={`btn ${variantClass} ${className}`.trim()} {...rest} />;
}
