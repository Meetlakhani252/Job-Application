import { ChevronDown } from 'lucide-react';
import { DOMAINS } from '../../constants/index.js';

export default function DomainFilter({ value, onChange, className = '' }) {
  return (
    <div className={`relative min-w-[180px] ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter opportunities by domain"
        className="appearance-none block w-full pl-3.5 pr-9 py-2.5 text-sm bg-white rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs cursor-pointer transition-colors"
      >
        <option value="">All Domains</option>
        {DOMAINS.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
        aria-hidden="true"
      >
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}
