import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const TYPE_CONFIG = {
  success: {
    icon: CheckCircle2,
    wrapperClass: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    iconClass: 'text-emerald-600',
  },
  error: {
    icon: AlertCircle,
    wrapperClass: 'bg-rose-50 border-rose-200 text-rose-900',
    iconClass: 'text-rose-600',
  },
  warning: {
    icon: AlertTriangle,
    wrapperClass: 'bg-amber-50 border-amber-200 text-amber-900',
    iconClass: 'text-amber-600',
  },
  info: {
    icon: Info,
    wrapperClass: 'bg-blue-50 border-blue-200 text-blue-900',
    iconClass: 'text-blue-600',
  },
};

export default function Toast({ id, type = 'info', message, onClose }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.info;
  const Icon = config.icon;

  return (
    <div
      role="status"
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-sm w-full transition-all duration-200 animate-in fade-in slide-in-from-bottom-3 pointer-events-auto ${config.wrapperClass}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconClass}`} aria-hidden="true" />
      <div className="flex-1 text-sm font-medium leading-relaxed break-words">
        {message}
      </div>
      <button
        type="button"
        onClick={() => onClose(id)}
        className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
