import { useState } from 'react';
import { LayoutDashboard, Database, Code, AppWindow, Settings, Shield, Users, Key, BookOpen, Activity, Bell, LogOut, HelpCircle } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { ModelHub } from './components/ModelHub';
import { DeveloperPortal } from './components/DeveloperPortal';
import { ApplicationShowcase } from './components/ApplicationShowcase';
import { IAMManagement } from './components/IAMManagement';
import { SecurityCenter } from './components/SecurityCenter';
import { OnboardingGuide } from './components/OnboardingGuide';
import { Badge } from './components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';

const fontStyles = {
  fontFamily: "'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  letterSpacing: '0.01em',
};

const monoFontStyles = {
  fontFamily: "'JetBrains Mono', 'SF Mono', Monaco, Consolas, monospace",
  letterSpacing: '0.02em',
};

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [notifications] = useState(3);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const navigationItems = [
    {
      title: '治理与管理',
      items: [
        { id: 'dashboard', label: '平台总览', icon: LayoutDashboard },
        { id: 'iam', label: '用户与访问控制', icon: Users },
        { id: 'security', label: '安全策略中心', icon: Shield },
      ]
    },
    {
      title: '模型中心',
      items: [
        { id: 'models', label: '基础模型库', icon: Database },
        { id: 'mlops', label: 'MLOps工作室', icon: Activity },
      ]
    },
    {
      title: '开发者门户',
      items: [
        { id: 'developer', label: 'API实验场', icon: Code },
        { id: 'docs', label: 'SDK与文档', icon: BookOpen },
      ]
    },
    {
      title: '应用中心',
      items: [
        { id: 'apps', label: '融合应用', icon: AppWindow },
      ]
    }
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'iam':
        return <IAMManagement />;
      case 'security':
        return <SecurityCenter />;
      case 'models':
      case 'mlops':
        return <ModelHub activeTab={activeView} />;
      case 'developer':
      case 'docs':
        return <DeveloperPortal activeTab={activeView} />;
      case 'apps':
        return <ApplicationShowcase />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0e1a]" style={fontStyles}>
        <Sidebar className="border-r border-slate-700/50 bg-[#0f1419]">
          <div className="flex h-16 items-center border-b border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-lg shadow-blue-500/25">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-base font-semibold text-white tracking-tight">智核</div>
                <div className="text-[11px] font-medium text-blue-400/90" style={monoFontStyles}>Aether Prime</div>
              </div>
            </div>
          </div>
          <SidebarContent className="px-3 py-5">
            {navigationItems.map((section) => (
              <SidebarGroup key={section.title} className="mb-3">
                <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveView(item.id)}
                          isActive={activeView === item.id}
                          className="text-[13px] font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-600 data-[active=true]:to-blue-500 data-[active=true]:text-white data-[active=true]:shadow-md data-[active=true]:shadow-blue-500/20 transition-all rounded-lg"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          
          <div className="mt-auto border-t border-slate-700/50 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-800/40 p-3 border border-slate-700/30">
              <Avatar className="h-9 w-9 bg-gradient-to-br from-blue-500 to-purple-600 shadow-md shadow-blue-500/20">
                <AvatarFallback className="text-white text-sm font-semibold">管理</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-white truncate">张伟</div>
                <div className="text-[11px] text-slate-400/80">平台管理员</div>
              </div>
            </div>
          </div>
        </Sidebar>
        
        <main className="flex-1 overflow-auto">
          <div className="border-b border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-slate-400 hover:text-white transition-colors" />
                <div>
                  <div className="text-lg font-semibold text-white tracking-tight">
                    {navigationItems.flatMap(s => s.items).find(i => i.id === activeView)?.label}
                  </div>
                  <div className="text-[11px] text-slate-400/80 font-medium mt-0.5">企业认知核心管控平台 · {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-1.5 text-[11px] font-medium text-green-400">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400" />
                  系统运行正常
                </div>
                
                <button className="relative rounded-lg bg-slate-800/80 p-2.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-[10px] font-semibold border-2 border-slate-900">
                      {notifications}
                    </Badge>
                  )}
                </button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-2 text-[13px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                      <Settings className="h-4 w-4" />
                      <span className="hidden sm:inline">系统设置</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700/50">
                    <DropdownMenuLabel className="text-slate-300 text-[13px] font-semibold">系统选项</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700/50" />
                    <DropdownMenuItem className="text-[13px] text-slate-300 focus:bg-slate-700 focus:text-white">
                      <Settings className="mr-2 h-4 w-4" />
                      平台设置
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[13px] text-slate-300 focus:bg-slate-700 focus:text-white">
                      <Shield className="mr-2 h-4 w-4" />
                      安全配置
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[13px] text-slate-300 focus:bg-slate-700 focus:text-white">
                      <Users className="mr-2 h-4 w-4" />
                      用户管理
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700/50" />
                    <DropdownMenuItem className="text-[13px] text-red-400 focus:bg-red-500/10 focus:text-red-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      退出登录
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {renderView()}
          </div>
        </main>
      </div>
      <Toaster />
      <OnboardingGuide open={showOnboarding} onClose={() => setShowOnboarding(false)} />
      
      {/* Floating Help Button */}
      <button
        onClick={() => setShowOnboarding(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 z-50"
        style={fontStyles}
      >
        <HelpCircle className="h-5 w-5" />
        <span className="text-[13px] font-medium">新手指南</span>
      </button>
    </SidebarProvider>
  );
}