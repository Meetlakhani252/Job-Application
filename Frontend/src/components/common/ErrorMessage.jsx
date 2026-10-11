import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from './Button.jsx';

export default function ErrorMessage({
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  className = '',
}) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 ${className}`}
    >
      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 text-sm font-medium leading-relaxed">
        {message}
      </div>
      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="border-rose-300 text-rose-700 hover:bg-rose-100/60 bg-transparent shrink-0"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
