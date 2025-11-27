import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { OrganizationalHealthDashboard } from './components/OrganizationalHealthDashboard';
import { AIRecruitingWorkbench } from './components/AIRecruitingWorkbench';
import { PerformancePromotion } from './components/PerformancePromotion';
import { IntelligentOnboarding } from './components/IntelligentOnboarding';
import { EmployeeGrowthCompass } from './components/EmployeeGrowthCompass';
import { AIAssistant } from './components/AIAssistant';
import { AIInsightsHub } from './components/AIInsightsHub';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Label } from "./components/ui/label";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { Bell } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState<'chro' | 'hrbp' | 'employee'>('employee');
  const [showNotification, setShowNotification] = useState(false);

  // Simulate real-time notifications
  useEffect(() => {
    const notifications = [
      { title: "🎯 高潜力候选人", description: "张伟（10年研发经验）简历匹配度98%，建议优先安排面试", delay: 5000 },
      { title: "📅 入职流程提醒", description: "新员工李明今天15:00与导师见面会，请准备欢迎材料", delay: 10000 },
      { title: "📚 成长推荐", description: "基于职业路径，为您推荐《高级技术架构》培训课程", delay: 15000 },
      { title: "⭐ 绩效异动", description: "技术部门本季度整体绩效提升15%，员工满意度达92%", delay: 20000 },
    ];

    const timers = notifications.map((notif) => 
      setTimeout(() => {
        toast.info(notif.title, {
          description: notif.description,
          duration: 4500,
        });
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 500);
      }, notif.delay)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <OrganizationalHealthDashboard userRole={userRole} />;
      case 'recruiting':
        return <AIRecruitingWorkbench />;
      case 'performance':
        return <PerformancePromotion userRole={userRole} />;
      case 'onboarding':
        return <IntelligentOnboarding />;
      case 'growth':
        return <EmployeeGrowthCompass />;
      case 'ai-insights':
        return <AIInsightsHub userRole={userRole} />;
      default:
        return <OrganizationalHealthDashboard userRole={userRole} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50/30 via-white to-emerald-50/30">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        userRole={userRole}
      />
      
      <div className="flex-1 overflow-auto">
        {/* Top Bar with Role Switcher */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm border-b border-amber-100/50 px-8 py-5 sticky top-0 z-10 shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-0.5">人才引擎 TalentHub</h2>
              <p className="text-sm text-gray-600 font-medium">某大型科技企业AI人力资源管理实践 · 切换角色查看不同视角</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.div
                animate={showNotification ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Bell className="h-5 w-5 text-amber-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full shadow-lg" />
              </motion.div>
              <div className="h-5 w-px bg-gray-200" />
              <Label className="text-sm text-gray-700 font-medium">当前角色：</Label>
              <Select value={userRole} onValueChange={(value: 'chro' | 'hrbp' | 'employee') => setUserRole(value)}>
                <SelectTrigger className="w-52 border-amber-200 hover:border-amber-300 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 focus:ring-amber-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chro">👔 CHRO 王慧 (战略决策层)</SelectItem>
                  <SelectItem value="hrbp">🤝 HRBP 赵刚 (业务伙伴)</SelectItem>
                  <SelectItem value="employee">👤 员工 李雪 (成长体验者)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView + userRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* AI Assistant - Global floating assistant */}
      <AIAssistant userRole={userRole} currentView={activeView} />
      
      <Toaster />
    </div>
  );
}