import { Inbox } from 'lucide-react';

export default function EmptyState({
  title = 'No data found',
  description = 'There are no items to display at this time.',
  icon: Icon = Inbox,
  action,
  className = '',
}) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 bg-white/60 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-3.5">
        <Icon className="w-6 h-6 stroke-[1.75]" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 max-w-sm mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
