import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  color?: 'cyan' | 'green' | 'orange' | 'red' | 'purple';
}

export default function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon: Icon,
  color = 'cyan',
}: KPICardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
    orange: 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400',
    red: 'from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400',
    purple: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400',
  };

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-5 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl">{value}</span>
            {unit && <span className="text-sm text-slate-400">{unit}</span>}
          </div>
        </div>
        <div className={`p-3 bg-slate-900/50 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-2">
          {isPositive && <TrendingUp className="w-4 h-4 text-green-400" />}
          {isNegative && <TrendingDown className="w-4 h-4 text-red-400" />}
          <span
            className={`text-sm ${isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-slate-400'}`}
          >
            {change > 0 ? '+' : ''}
            {change}%
          </span>
          {changeLabel && <span className="text-xs text-slate-400">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
