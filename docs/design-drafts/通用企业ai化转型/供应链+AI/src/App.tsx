import { useState } from 'react';
import { LayoutGrid, TrendingUp, Package, Truck, Menu, X, Bot, Sparkles } from 'lucide-react';
import ControlTower from './components/ControlTower';
import DemandForecast from './components/DemandForecast';
import DemandForecastStory from './components/DemandForecastStory';
import InventoryOptimization from './components/InventoryOptimization';
import LogisticsDispatch from './components/LogisticsDispatch';
import AIChat from './components/AIChat';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

type ViewType = 'control-tower' | 'demand-forecast' | 'inventory' | 'logistics';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('demand-forecast');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [storyMode, setStoryMode] = useState(true); // 数据故事化模式开关

  const navigationItems = [
    { id: 'control-tower' as ViewType, label: '全局供应链控制塔', icon: LayoutGrid, aiFeature: 'AI异常检测' },
    { id: 'demand-forecast' as ViewType, label: 'AI需求预测', icon: TrendingUp, aiFeature: 'AI深度学习' },
    { id: 'inventory' as ViewType, label: '智能库存优化', icon: Package, aiFeature: 'AI智能补货' },
    { id: 'logistics' as ViewType, label: '智慧物流调度', icon: Truck, aiFeature: 'AI路线优化' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'control-tower':
        return <ControlTower />;
      case 'demand-forecast':
        return storyMode ? <DemandForecastStory /> : <DemandForecast />;
      case 'inventory':
        return <InventoryOptimization />;
      case 'logistics':
        return <LogisticsDispatch />;
      default:
        return <ControlTower />;
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-cyan-400">链景</h1>
              <p className="text-xs text-slate-400">Synapse SC</p>
            </div>
          </div>
          {/* AI驱动标识 */}
          <div className="mt-4 p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span className="text-purple-300">AI智能驱动</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex flex-col gap-2 px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {/* AI功能标签 */}
                {currentView === item.id && (
                  <div className="flex items-center gap-1 text-xs text-purple-400">
                    <Sparkles className="w-3 h-3" />
                    <span>{item.aiFeature}</span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI助手入口 */}
        <div className="p-4 border-t border-slate-800">
          <Button
            onClick={() => setAiChatOpen(!aiChatOpen)}
            className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 ${aiChatOpen ? 'ring-2 ring-purple-500' : ''}`}
          >
            <Bot className="w-4 h-4 mr-2" />
            AI智能助手
          </Button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <span className="text-xs">陈</span>
            </div>
            <div>
              <p className="text-sm">陈总</p>
              <p className="text-xs text-slate-400">供应链总监</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* 数据故事模式切换 */}
            {currentView === 'demand-forecast' && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
                <span className="text-xs text-slate-400">视图模式:</span>
                <button
                  onClick={() => setStoryMode(!storyMode)}
                  className="text-xs text-cyan-400 hover:text-cyan-300"
                >
                  {storyMode ? '📖 数据故事' : '📊 传统视图'}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            {/* AI状态指示 */}
            <Badge variant="outline" className="gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs">AI实时分析中</span>
            </Badge>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">系统正常运行</span>
            </div>
            <div className="text-sm text-slate-400">
              {new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-auto">
          {renderView()}
        </div>
      </main>

      {/* AI Chat Sidebar */}
      {aiChatOpen && (
        <aside className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
          <AIChat />
        </aside>
      )}
    </div>
    </>
  );
}