import { LayoutDashboard, TrendingUp, Target, AlertTriangle, BarChart3, Users, Sparkles, Trophy, Zap, Brain } from 'lucide-react';
import { Badge } from './ui/badge';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: '智能仪表盘', icon: LayoutDashboard, badge: null },
    { id: 'forecast', label: '销售预测', icon: TrendingUp, badge: null },
    { id: 'opportunities', label: '机会识别', icon: Target, badge: '6' },
    { id: 'churn', label: '流失预警', icon: AlertTriangle, badge: '2' },
  ];

  return (
    <nav className="w-72 border-r border-border bg-gradient-to-b from-card to-secondary/20">
      <div className="p-6">
        {/* AI Quick Actions */}
        <div 
          className="mb-6 p-4 rounded-xl gradient-primary text-white shadow-lg cursor-pointer hover:shadow-xl transition-all hover-lift"
          onClick={() => onNavigate('aihub')}
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5" />
            <h3 className="font-semibold">AI功能中心</h3>
          </div>
          <p className="text-xs text-white/80 mb-3">7大AI功能 · 为你发现了 3 个新机会</p>
          <button className="w-full py-2 px-3 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-all backdrop-blur-sm">
            立即体验
          </button>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2 mb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'gradient-primary text-white shadow-md hover:shadow-lg'
                    : 'text-foreground hover:bg-secondary hover-lift'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <Badge className="gradient-success border-0 text-white">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-secondary/50 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">实时数据</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">本月成交</span>
              <span className="font-semibold text-accent">8笔</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">活跃线索</span>
              <span className="font-semibold">42个</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">完成率</span>
              <span className="font-semibold text-primary">85%</span>
            </div>
          </div>
        </div>

        {/* Team Performance Mini */}
        <div className="mt-6 p-4 bg-secondary/50 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">团队排行</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg gradient-primary text-white flex items-center justify-center text-xs font-semibold shadow-md">
                1
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">张三</div>
                <div className="text-xs text-muted-foreground">¥158万</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-muted text-foreground flex items-center justify-center text-xs font-semibold">
                2
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">赵六</div>
                <div className="text-xs text-muted-foreground">¥135万</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-muted text-foreground flex items-center justify-center text-xs font-semibold">
                3
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">李四</div>
                <div className="text-xs text-muted-foreground">¥124万</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}