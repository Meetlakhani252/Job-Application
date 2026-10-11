import ApplicationRow from './ApplicationRow.jsx';
import EmptyState from '../common/EmptyState.jsx';
import Loader from '../common/Loader.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import { Users } from 'lucide-react';

export default function ApplicationTable({
  applications = [],
  isLoading = false,
  error = '',
  onRetry,
}) {
  if (isLoading) {
    return <Loader text="Loading applications…" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!applications || applications.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No applications found"
        description="There are currently no job or internship applications submitted."
      />
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th scope="col" className="px-4 py-3">
                Application ID
              </th>
              <th scope="col" className="px-4 py-3">
                Candidate
              </th>
              <th scope="col" className="px-4 py-3">
                Opportunity
              </th>
              <th scope="col" className="px-4 py-3">
                Resume
              </th>
              <th scope="col" className="px-4 py-3">
                Applied Date
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((app) => (
              <ApplicationRow key={app._id || app.applicationId} application={app} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
