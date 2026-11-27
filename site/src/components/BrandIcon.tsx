import type { SimpleIcon } from 'simple-icons';

// Official brand marks from Simple Icons (CC0 paths). Used only to name the technology.
export const BrandIcon = ({ icon, className = 'h-5 w-5', color }: { icon: SimpleIcon; className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill={color ?? `#${icon.hex}`} role="img" aria-label={icon.title}>
    <path d={icon.path} />
  </svg>
);
