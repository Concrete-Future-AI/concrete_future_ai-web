import { useState, useEffect } from 'react';
import { CommandCenter } from './components/CommandCenter';
import { CustomerInsight } from './components/CustomerInsight';
import { ContentStudio } from './components/ContentStudio';
import { CampaignOrchestrator } from './components/CampaignOrchestrator';
import { SocialMediaHub } from './components/SocialMediaHub';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  Workflow,
  Menu,
  X,
  Bell,
  Settings,
  ChevronDown,
  Zap,
  TrendingUp,
  Activity,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

type View = 'command' | 'insight' | 'studio' | 'orchestrator' | 'social';
type Role = 'director' | 'manager' | 'specialist';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('command');
  const [currentRole, setCurrentRole] = useState<Role>('manager');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [aiActive, setAiActive] = useState(true);
  const [metrics, setMetrics] = useState({
    roi: 4.1,
    campaigns: 12,
    activeUsers: 45000
  });

  const roleNames = {
    director: '营销总监 - 高总',
    manager: '营销经理 - 王经理',
    specialist: '内容专员 - 小李'
  };

  const navigation = [
    { id: 'command', name: '营销指挥中心', icon: LayoutDashboard, badge: null },
    { id: 'insight', name: '客户洞察中心', icon: Users, badge: '5个新洞察' },
    { id: 'studio', name: 'AIGC内容工作室', icon: Sparkles, badge: null },
    { id: 'orchestrator', name: '智能活动编排器', icon: Workflow, badge: '2个待审批' },
    { id: 'social', name: '社交媒体中心', icon: Globe, badge: '3个新帖子' }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        roi: +(prev.roi + (Math.random() * 0.2 - 0.1)).toFixed(1),
        campaigns: prev.campaigns,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 100)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate AI notifications
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const mockNotifications: Notification[] = [
        {
          id: Date.now().toString(),
          type: 'success',
          title: '✓ A/B测试优化完成',
          message: '618大促B版着陆页转化率提升38%，AI已自动分配75%流量',
          time: '刚刚'
        },
        {
          id: (Date.now() + 1).toString(),
          type: 'warning',
          title: '⚠️ 投放预算预警',
          message: '母婴品类推广活动ROI达4.2x但预算即将耗尽，建议立即追加¥50K',
          time: '2分钟前'
        },
        {
          id: (Date.now() + 2).toString(),
          type: 'info',
          title: '💡 关键洞察发现',
          message: '18-24岁女性用户在抖音渠道的购买转化率环比提升62%，建议加大投放',
          time: '5分钟前'
        }
      ];

      if (Math.random() > 0.7) {
        const newNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
        
        toast.success(newNotification.title, {
          description: newNotification.message,
        });
      }
    }, 15000);

    return () => clearInterval(notificationInterval);
  }, []);

  return (
    <div className="h-screen flex overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/50 pointer-events-none z-0" />
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-20 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl floating pointer-events-none z-0" style={{ animationDelay: '0s' }} />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl floating pointer-events-none z-0" style={{ animationDelay: '2s' }} />
      <div className="fixed top-1/2 left-1/2 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl floating pointer-events-none z-0" style={{ animationDelay: '4s' }} />

      <Toaster />

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-500 glass-sidebar flex flex-col overflow-hidden relative z-10`}>
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3 slide-up">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-center justify-center shadow-xl shadow-orange-500/30 relative overflow-hidden group">
              <Sparkles className="w-7 h-7 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">增长引擎 GrowthPulse</h1>
              <p className="text-gray-600 text-xs font-semibold">某电商平台AI营销增长实践</p>
            </div>
          </div>
        </div>

        {/* Role Selector */}
        <div className="p-4 border-b border-white/20">
          <p className="text-xs text-gray-500 mb-2">当前角色</p>
          <div className="relative">
            <select 
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as Role)}
              className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl text-sm appearance-none cursor-pointer hover:bg-white/70 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="director">营销总监 - 高总</option>
              <option value="manager">营销经理 - 王经理</option>
              <option value="specialist">内容专员 - 小李</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as View)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  isActive 
                    ? 'glass-card shadow-lg' 
                    : 'hover:bg-white/40 hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg' 
                      : 'bg-white/50 group-hover:bg-white/70'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <span className={isActive ? 'text-gray-900' : 'text-gray-600'}>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge className="bg-red-500 text-white text-xs px-2 relative z-10">
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Real-time Stats */}
        <div className="p-4 border-t border-white/20 space-y-3">
          <div className="glass-card p-3 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">实时ROI</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl text-gray-900">{metrics.roi}</span>
              <span className="text-sm text-gray-500">x</span>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">活跃用户</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl text-gray-900">{metrics.activeUsers.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center gap-3 glass-card p-3 rounded-xl hover-lift cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white shadow-lg">
              {roleNames[currentRole].charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">{roleNames[currentRole]}</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-gray-500">在线</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-20 glass-card flex items-center px-6 gap-4 border-b border-white/20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-white/50 rounded-xl"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <div className="flex-1">
            <h2 className="text-gray-900">
              {navigation.find(n => n.id === currentView)?.name}
            </h2>
            <p className="text-sm text-gray-500">
              {currentRole === 'director' && '战略决策视图'}
              {currentRole === 'manager' && '战术执行视图'}
              {currentRole === 'specialist' && '内容创作视图'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* AI Status Indicator */}
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 hover-lift cursor-pointer">
              <div className={`w-2 h-2 rounded-full ${aiActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700">AI 运行中</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="hover:bg-white/50 rounded-xl relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-2xl shadow-2xl p-4 slide-up max-h-96 overflow-y-auto">
                  <h3 className="text-gray-900 mb-3">通知中心</h3>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">暂无新通知</p>
                  ) : (
                    <div className="space-y-2">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all cursor-pointer">
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${
                              notif.type === 'success' ? 'bg-green-500' :
                              notif.type === 'warning' ? 'bg-amber-500' :
                              'bg-blue-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900">{notif.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/50 rounded-xl"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {currentView === 'command' && <CommandCenter role={currentRole} />}
          {currentView === 'insight' && <CustomerInsight role={currentRole} />}
          {currentView === 'studio' && <ContentStudio role={currentRole} />}
          {currentView === 'orchestrator' && <CampaignOrchestrator role={currentRole} />}
          {currentView === 'social' && <SocialMediaHub role={currentRole} />}
        </div>
      </main>
    </div>
  );
}