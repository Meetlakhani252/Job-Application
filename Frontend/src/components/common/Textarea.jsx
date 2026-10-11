import { forwardRef, useId } from 'react';

const Textarea = forwardRef(function Textarea(
  {
    label,
    id,
    name,
    rows = 4,
    error,
    helperText,
    required = false,
    disabled = false,
    maxLength,
    value,
    className = '',
    ...props
  },
  ref
) {
  const generatedId = useId();
  const textareaId = id || name || generatedId;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  const ariaDescribedBy = [
    error ? errorId : null,
    helperText && !error ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ');

  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-800"
          >
            {label}
            {required && (
              <span className="text-rose-500 ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
          {maxLength && (
            <span className="text-xs text-slate-400">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={ariaDescribedBy || undefined}
        className={`block w-full rounded-md border text-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed p-3 ${
          error
            ? 'border-rose-500 text-slate-900 focus:border-rose-500 focus:ring-rose-500/30'
            : 'border-slate-300 text-slate-900 focus:border-blue-600 focus:ring-blue-600/30 bg-white'
        }`}
        {...props}
      />

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1"
        >
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1.5 text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Textarea;
