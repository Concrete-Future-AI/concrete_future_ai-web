import { Button } from './ui/button';
import { List, LayoutGrid, Calendar, Table2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ViewSwitcherProps {
  view: 'list' | 'kanban' | 'calendar' | 'table';
  onChange: (view: 'list' | 'kanban' | 'calendar' | 'table') => void;
}

export default function ViewSwitcher({ view, onChange }: ViewSwitcherProps) {
  const views = [
    { id: 'list' as const, icon: List, label: '列表' },
    { id: 'kanban' as const, icon: LayoutGrid, label: '看板' },
    { id: 'calendar' as const, icon: Calendar, label: '日历' },
    { id: 'table' as const, icon: Table2, label: '表格' },
  ];

  return (
    <div className="inline-flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
      {views.map((v) => {
        const Icon = v.icon;
        const isActive = view === v.id;
        
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            className={`
              relative px-3 py-1.5 rounded-lg transition-all duration-200
              ${isActive 
                ? 'text-white' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeView"
                className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#9D4EED] rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="relative flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm">{v.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
