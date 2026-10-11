import { useState } from 'react';
import { ExternalLink, FileText, ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import { formatDate } from '../../utils/formatDate.js';
import Badge from '../common/Badge.jsx';

export default function ApplicationRow({ application }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!application) return null;

  const {
    applicationId,
    name,
    email,
    phone,
    opportunity,
    resumeLink,
    message,
    createdAt,
  } = application;

  const hasMessage = Boolean(message && message.trim());

  return (
    <>
      <tr className="hover:bg-slate-50/70 transition-colors border-b border-slate-200/80 last:border-b-0">
        {/* Application ID */}
        <td className="px-4 py-3.5 whitespace-nowrap text-sm">
          <span className="font-mono text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 px-2 py-1 rounded-md">
            {applicationId}
          </span>
        </td>

        {/* Candidate Info */}
        <td className="px-4 py-3.5 text-sm">
          <div className="font-medium text-slate-900">{name}</div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 text-xs text-slate-500 mt-0.5">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
              title="Send email"
            >
              <Mail className="w-3 h-3 text-slate-400" aria-hidden="true" />
              <span>{email}</span>
            </a>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" aria-hidden="true" />
              <span>{phone}</span>
            </span>
          </div>
        </td>

        {/* Opportunity */}
        <td className="px-4 py-3.5 text-sm max-w-[220px]">
          {opportunity ? (
            <div>
              <div className="font-medium text-slate-800 truncate" title={opportunity.title}>
                {opportunity.title}
              </div>
              <div className="text-xs text-slate-500 truncate" title={opportunity.companyName}>
                {opportunity.companyName}
              </div>
            </div>
          ) : (
            <Badge variant="neutral" size="sm">
              Opportunity removed
            </Badge>
          )}
        </td>

        {/* Resume */}
        <td className="px-4 py-3.5 whitespace-nowrap text-sm">
          {resumeLink ? (
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              View Resume
            </a>
          ) : (
            <span className="text-xs text-slate-400">Not provided</span>
          )}
        </td>

        {/* Date Applied */}
        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-500">
          {createdAt ? formatDate(createdAt) : '—'}
        </td>

        {/* Details / Message toggle */}
        <td className="px-4 py-3.5 whitespace-nowrap text-right text-sm">
          {hasMessage ? (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
              aria-expanded={isExpanded}
              aria-label="Toggle candidate note"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Note
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <span className="text-xs text-slate-300">—</span>
          )}
        </td>
      </tr>

      {/* Expanded Candidate Message Row */}
      {isExpanded && hasMessage && (
        <tr className="bg-slate-50/90 border-b border-slate-200">
          <td colSpan={6} className="px-6 py-3.5 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-700 shrink-0">
                Candidate Note:
              </span>
              <p className="text-slate-600 italic whitespace-pre-wrap leading-relaxed">
                {message}
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
