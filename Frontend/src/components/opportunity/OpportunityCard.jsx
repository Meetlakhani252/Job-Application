import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge.jsx';


export default function OpportunityCard({ opportunity }) {
  if (!opportunity) return null;

  const oppId = opportunity._id || opportunity.id;
  const { title, companyName, type, domain, location, experience } = opportunity;

  const typeVariant = type === 'Job' ? 'primary' : 'secondary';

  return (
    <Link
      to={`/opportunities/${oppId}`}
      className="group block rounded-xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-all duration-150 flex flex-col justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={typeVariant} size="sm">
            {type}
          </Badge>
          <Badge variant="neutral" size="sm">
            {domain}
          </Badge>
        </div>

        {/* Title & Company */}
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
          {title}
        </h3>
        <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-1">
          {companyName}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-auto">
        <div className="flex items-center gap-3 truncate">
          <span className="flex items-center gap-1 truncate" title={location}>
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span className="truncate">{location}</span>
          </span>
          {experience && (
            <span className="hidden sm:flex items-center gap-1 truncate text-slate-400">
              <span>•</span>
              <span className="truncate">{experience}</span>
            </span>
          )}
        </div>

        <span className="text-blue-600 font-medium inline-flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          Details
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
