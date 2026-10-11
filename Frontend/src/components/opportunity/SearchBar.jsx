import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import useDebounce from '../../hooks/useDebounce.js';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search by title, role or keywords…',
  className = '',
}) {
  const [prevValue, setPrevValue] = useState(value);
  const [localValue, setLocalValue] = useState(value || '');

  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(value || '');
  }

  const debouncedValue = useDebounce(localValue, 400);

  // Emit debounced changes
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClear() {
    setLocalValue('');
    onChange('');
  }

  return (
    <div className={`relative flex-1 min-w-[240px] ${className}`}>
      <div
        className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"
        aria-hidden="true"
      >
        <Search className="w-4 h-4" />
      </div>

      <input
        type="search"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search opportunities"
        className="block w-full pl-10 pr-9 py-2.5 text-sm bg-white rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs transition-colors"
      />

      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search input"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
