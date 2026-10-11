import { Loader2 } from 'lucide-react';

const SIZES = {
  sm: 'h-4 w-4',
  md: 'h-7 w-7',
  lg: 'h-10 w-10',
};

export default function Loader({
  size = 'md',
  text,
  centered = true,
  className = '',
}) {
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <div
      role="status"
      aria-label={text || 'Loading'}
      className={`flex flex-col items-center justify-center gap-2 ${
        centered ? 'py-12' : ''
      } ${className}`}
    >
      <Loader2 className={`animate-spin text-blue-600 ${sizeClass}`} />
      {text && <span className="text-sm font-medium text-slate-500">{text}</span>}
      <span className="sr-only">{text || 'Loading...'}</span>
    </div>
  );
}
