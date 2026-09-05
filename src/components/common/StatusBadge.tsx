import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  let colors = 'bg-slate-100 text-slate-700 border-slate-200';

  if (['present', 'completed', 'graded', 'evaluated', 'paid', 'success', 'normal'].includes(normalized)) {
    colors = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (['pending', 'upcoming', 'ongoing', 'partial'].includes(normalized)) {
    colors = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (['submitted', 'active', 'important'].includes(normalized)) {
    colors = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  } else if (['absent', 'overdue', 'late', 'failed', 'urgent'].includes(normalized)) {
    colors = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border whitespace-nowrap capitalize tracking-wide ${colors} ${sizeClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
};
