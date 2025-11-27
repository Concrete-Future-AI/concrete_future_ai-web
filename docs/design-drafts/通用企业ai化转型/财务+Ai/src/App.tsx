import { useState, useEffect } from 'react';
import { LayoutDashboard, Bot, Receipt, Shield, Bell, RefreshCw, Brain } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import FinanceCommandCenter from './components/FinanceCommandCenter';
import AutomationEngine from './components/AutomationEngine';
import ExpenseControl from './components/ExpenseControl';
import RiskDetection from './components/RiskDetection';
import AIInsights from './components/AIInsights';

type UserRole = 'cfo' | 'controller' | 'accountant';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('cfo');
  const [activeTab, setActiveTab] = useState('ai-insights');
  const [notifications, setNotifications] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const roleNames = {
    cfo: 'CFO Linda',
    controller: '财务总监 David',
    accountant: '会计 Emily'
  };

  // 模拟实时通知
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const randomNotifications = [
        { type: 'risk', message: '检测到1笔高风险交易，请及时处理', severity: 'error' },
        { type: 'expense', message: '3份报销单已自动审核通过', severity: 'success' },
        { type: 'automation', message: '银行对账已完成，匹配率99.2%', severity: 'success' },
        { type: 'closing', message: '关账进度更新：已完成75%', severity: 'info' },
      ];
      
      const notification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
      
      if (Math.random() > 0.7) { // 30% 概率推送通知
        setNotifications(prev => prev + 1);
        
        if (notification.severity === 'error') {
          toast.error(notification.message, {
            duration: 5000,
          });
        } else if (notification.severity === 'success') {
          toast.success(notification.message, {
            duration: 3000,
          });
        } else {
          toast.info(notification.message, {
            duration: 3000,
          });
        }
      }
    }, 15000); // 每15秒检查一次

    return () => clearInterval(notificationInterval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info('正在刷新数据...');
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('数据已更新');
    }, 1500);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    toast.success(`已切换到 ${roleNames[role]} 视图`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 tracking-tight">财策AI</h1>
                <p className="text-gray-600 text-xs">FinSIGHT AI - 认知财务与决策支持平台</p>
              </div>
            </div>
            
            {/* Role Selector & Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
                onClick={() => {
                  setNotifications(0);
                  toast.info('已查看所有通知');
                }}
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-600 text-white h-5 w-5 flex items-center justify-center p-0 text-xs border-0">
                    {notifications > 9 ? '9+' : notifications}
                  </Badge>
                )}
              </Button>
              
              <span className="text-sm text-gray-600">当前角色:</span>
              <select
                value={currentRole}
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="cfo">CFO Linda - 战略决策者</option>
                <option value="controller">财务总监 David - 运营管理者</option>
                <option value="accountant">会计 Emily - 一线执行者</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-white p-1 shadow-sm border border-gray-200">
            <TabsTrigger value="ai-insights" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
              <Brain className="w-4 h-4" />
              AI 洞察
            </TabsTrigger>
            <TabsTrigger value="command-center" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
              <LayoutDashboard className="w-4 h-4" />
              财务指挥舱
            </TabsTrigger>
            <TabsTrigger value="automation" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
              <Bot className="w-4 h-4" />
              自动化会计引擎
            </TabsTrigger>
            <TabsTrigger value="expense" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
              <Receipt className="w-4 h-4" />
              智能费用控制
            </TabsTrigger>
            <TabsTrigger value="risk" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
              <Shield className="w-4 h-4" />
              财务哨兵
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-insights" className="space-y-6">
            <AIInsights />
          </TabsContent>

          <TabsContent value="command-center" className="space-y-6">
            <FinanceCommandCenter currentRole={currentRole} />
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <AutomationEngine />
          </TabsContent>

          <TabsContent value="expense" className="space-y-6">
            <ExpenseControl />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <RiskDetection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}