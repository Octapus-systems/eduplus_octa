import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  id?: string;
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  value,
  subtext,
  icon: Icon,
  iconColor = 'text-indigo-600',
  iconBg = 'bg-indigo-50/80',
  trend,
  onClick
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`group relative overflow-hidden bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans">
            {title}
          </p>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            {value}
          </h4>
        </div>
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/80 transition-transform duration-200 group-hover:scale-105 ${iconBg} ${iconColor}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(trend || subtext) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
          {trend ? (
            <span
              className={`inline-flex items-center font-bold px-2 py-0.5 rounded-full text-[11px] gap-1 ${
                trend.isPositive
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                  : 'text-rose-700 bg-rose-50 border border-rose-100'
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend.value}
            </span>
          ) : (
            <span className="truncate text-slate-500 font-medium text-[11px]">{subtext}</span>
          )}
          {trend && subtext && (
            <span className="truncate text-slate-400 font-medium text-[11px]">{subtext}</span>
          )}
        </div>
      )}
    </div>
  );
};
