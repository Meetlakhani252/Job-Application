export default function OpportunityCardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading opportunity"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs animate-pulse flex flex-col justify-between"
    >
      <div>
        {/* Top Badges Skeleton */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="h-5 w-16 bg-slate-200 rounded-md" />
          <div className="h-5 w-24 bg-slate-200 rounded-md" />
        </div>

        {/* Title & Company Skeleton */}
        <div className="h-5 w-3/4 bg-slate-200 rounded mb-2" />
        <div className="h-4 w-1/2 bg-slate-200 rounded mb-4" />
      </div>

      {/* Footer Info Skeleton */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="h-3.5 w-24 bg-slate-200 rounded" />
        <div className="h-3.5 w-12 bg-slate-200 rounded" />
      </div>
    </div>
  );
}
