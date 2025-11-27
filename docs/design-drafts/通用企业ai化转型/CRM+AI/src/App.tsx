import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Avatar } from './components/ui/avatar';
import { LayoutDashboard, Target, TrendingUp, BarChart3, User, Bell, Search, Settings, MessageSquare, Sparkles, Users, Zap, Brain, Shield } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import WarRoomModern from './components/WarRoomModern';
import LeadsWorkspaceModern from './components/LeadsWorkspaceModern';
import DealInsights from './components/DealInsights';
import ForecastCenter from './components/ForecastCenter';
import NotificationPanel from './components/NotificationPanel';
import AIAssistantChat from './components/AIAssistantChat';
import AIFeaturesHub from './components/AIFeaturesHub';
import RolePermissionManager from './components/RolePermissionManager';
import AIFloatingButton from './components/AIFloatingButton';
import AIEmailGenerator from './components/AIEmailGenerator';
import AIMeetingPrep from './components/AIMeetingPrep';
import AIPlaybookRecommender from './components/AIPlaybookRecommender';
import AIDataAnalyzer from './components/AIDataAnalyzer';

type UserRole = 'vp' | 'manager' | 'rep';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('rep');
  const [activeTab, setActiveTab] = useState('war-room');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiChatPulse, setAiChatPulse] = useState(true);
  const [aiFeatureModal, setAiFeatureModal] = useState<string | null>(null);

  const roleNames = {
    vp: 'VP张 - 销售副总裁',
    manager: '李经理 - 销售经理',
    rep: '小王 - 客户经理'
  };

  const roleAvatars = {
    vp: 'VZ',
    manager: 'LJ',
    rep: 'XW'
  };

  // 模拟实时通知
  useEffect(() => {
    const interval = setInterval(() => {
      const notifications = [
        { icon: '🎯', msg: '华东制造集团的成交概率从68%提升至92%', type: 'success' },
        { icon: '📧', msg: '中科智能已查看您的技术方案书（停留3分26秒）', type: 'info' },
        { icon: '⚠️', msg: '警告：海天物流项目已18天无跟进，建议立即联系', type: 'warning' },
        { icon: '💰', msg: '恭喜！李明成功签约博世工业（合同金额¥2.8M）', type: 'success' },
        { icon: '🔔', msg: 'AI建议：今日还有4个高优先级客户待联系', type: 'info' },
      ];
      
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      
      if (Math.random() > 0.7) {
        toast.info(randomNotification.icon + ' ' + randomNotification.msg, {
          duration: 4000,
        });
        setUnreadCount(prev => prev + 1);
      }
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    toast.success(`✓ 角色切换成功`, {
      description: `当前视角：${roleNames[newRole]}`,
      duration: 2500,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent animate-pulse" />
                <Zap className="w-6 h-6 text-white relative z-10" />
              </div>
              <div>
                <h1 className="text-neutral-900 flex items-center gap-2 font-semibold tracking-tight">
                  销速引擎 SalesTurbo
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 rounded-lg px-2.5 py-0.5 shadow-lg shadow-cyan-500/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI驱动
                  </Badge>
                </h1>
                <p className="text-xs text-neutral-500 font-medium">智能CRM协作平台 · 某世界500强制造企业实际案例</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200">
                <Search className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="relative rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 font-semibold">
                    {unreadCount}
                  </span>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative rounded-xl hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-200"
                onClick={() => {
                  setShowAIChat(!showAIChat);
                  setAiChatPulse(false);
                }}
              >
                <Brain className="w-4 h-4" />
                {aiChatPulse && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full animate-ping" />
                )}
                {aiChatPulse && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/60" />
                )}
              </Button>
              
              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200">
                <MessageSquare className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200">
                <Settings className="w-4 h-4" />
              </Button>
              
              <div className="h-6 w-px bg-neutral-200" />
              
              <div className="flex items-center gap-3">
                <Avatar className={`w-9 h-9 rounded-xl ${
                  currentRole === 'vp' ? 'bg-gradient-to-br from-blue-600 to-blue-700' :
                  currentRole === 'manager' ? 'bg-gradient-to-br from-cyan-600 to-blue-600' :
                  'bg-gradient-to-br from-blue-500 to-cyan-500'
                } text-white flex items-center justify-center shadow-lg font-semibold tracking-wider`}>
                  {roleAvatars[currentRole]}
                </Avatar>
                <Select value={currentRole} onValueChange={(value) => handleRoleChange(value as UserRole)}>
                  <SelectTrigger className="w-[200px] border-0 bg-transparent hover:bg-neutral-50 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vp">{roleNames.vp}</SelectItem>
                    <SelectItem value="manager">{roleNames.manager}</SelectItem>
                    <SelectItem value="rep">{roleNames.rep}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-3 bg-gradient-to-r from-blue-50/50 via-white to-cyan-50/50 border-t border-neutral-100 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-neutral-600 font-medium">本月业绩达成:</span>
                <span className="text-neutral-900 font-semibold tabular-nums">¥78.2M / ¥100M</span>
                <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200 rounded-lg font-semibold tabular-nums px-2">
                  78.2%
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-600 font-medium">今日任务完成:</span>
                <span className="text-neutral-900 font-semibold tabular-nums">8 / 12</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-600 font-medium">活跃商机:</span>
                <span className="text-neutral-900 font-semibold tabular-nums">23个</span>
                <span className="relative">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full inline-block" />
                  <span className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-cyan-700 font-semibold">AI实时监控中</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-medium">最后同步:</span>
              <span className="text-neutral-900 font-semibold">刚刚</span>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel 
          onClose={() => setShowNotifications(false)}
          onClearUnread={() => setUnreadCount(0)}
        />
      )}

      {/* AI Assistant Chat */}
      <AnimatePresence>
        {showAIChat && (
          <AIAssistantChat 
            isOpen={showAIChat}
            onClose={() => setShowAIChat(false)}
            userRole={currentRole}
          />
        )}
      </AnimatePresence>

      {/* AI Floating Button */}
      <AIFloatingButton 
        onOpenChat={() => setShowAIChat(true)}
        onOpenFeature={(feature) => setAiFeatureModal(feature)}
      />

      {/* AI功能模态窗口 */}
      <AnimatePresence>
        {aiFeatureModal === 'email' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setAiFeatureModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AIEmailGenerator onClose={() => setAiFeatureModal(null)} />
            </motion.div>
          </motion.div>
        )}

        {aiFeatureModal === 'meeting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setAiFeatureModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AIMeetingPrep />
            </motion.div>
          </motion.div>
        )}

        {aiFeatureModal === 'playbook' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setAiFeatureModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AIPlaybookRecommender />
            </motion.div>
          </motion.div>
        )}

        {aiFeatureModal === 'analyzer' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setAiFeatureModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AIDataAnalyzer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b border-neutral-100 sticky top-[113px] z-40">
          <div className="px-6">
            <TabsList className="h-12 bg-transparent border-b-0 gap-2">
              <TabsTrigger 
                value="war-room" 
                className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <LayoutDashboard className="w-4 h-4" />
                销售作战室
              </TabsTrigger>
              <TabsTrigger 
                value="leads" 
                className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <Target className="w-4 h-4" />
                智能线索工作台
              </TabsTrigger>
              <TabsTrigger 
                value="deals" 
                className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <TrendingUp className="w-4 h-4" />
                交易洞察室
              </TabsTrigger>
              <TabsTrigger 
                value="forecast" 
                className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                预测与分析中心
              </TabsTrigger>
              <TabsTrigger 
                value="ai-hub" 
                className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <Brain className="w-4 h-4" />
                AI功能中心
                <Badge className="bg-cyan-100 text-cyan-700 border-0 rounded-lg ml-1 px-1.5 py-0 text-xs font-semibold">
                  New
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="permissions" 
                className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <Shield className="w-4 h-4" />
                权限管理
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="px-6 py-6">
          <TabsContent value="war-room" className="mt-0">
            <WarRoomModern role={currentRole} />
          </TabsContent>
          <TabsContent value="leads" className="mt-0">
            <LeadsWorkspaceModern />
          </TabsContent>
          <TabsContent value="deals" className="mt-0">
            <DealInsights />
          </TabsContent>
          <TabsContent value="forecast" className="mt-0">
            <ForecastCenter />
          </TabsContent>
          <TabsContent value="ai-hub" className="mt-0">
            <AIFeaturesHub />
          </TabsContent>
          <TabsContent value="permissions" className="mt-0">
            <RolePermissionManager currentRole={currentRole} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}