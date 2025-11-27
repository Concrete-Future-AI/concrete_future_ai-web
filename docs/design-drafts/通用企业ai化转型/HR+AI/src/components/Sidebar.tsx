import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Users, Briefcase, Compass, Settings, Bell, ChevronDown, Award, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: 'chro' | 'hrbp' | 'employee';
}

export function Sidebar({ activeView, onViewChange, userRole }: SidebarProps) {
  const [notifications, setNotifications] = useState(3);
  
  const roleNames = {
    chro: 'CHRO 王慧',
    hrbp: 'HRBP 赵刚',
    employee: '李雪'
  };

  const navigation = [
    { id: 'dashboard', name: '组织健康仪表盘', icon: Home },
    { id: 'ai-insights', name: 'AI洞察中心', icon: Brain, highlight: true },
    { id: 'recruiting', name: 'AI招聘工作台', icon: Briefcase, roles: ['chro', 'hrbp'] },
    { id: 'performance', name: '绩效与晋升', icon: Award, roles: ['chro', 'hrbp', 'employee'] },
    { id: 'onboarding', name: '智能入职旅程', icon: Users },
    { id: 'growth', name: '员工成长罗盘', icon: Compass },
  ];

  const filteredNav = navigation.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <motion.div 
        className="p-6 border-b border-gray-200"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white">人</span>
          </motion.div>
          <div>
            <h1 className="text-gray-900">人境AI</h1>
            <p className="text-xs text-gray-500">PeopleSphere AI</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredNav.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 relative overflow-hidden ${
                  isActive ? 'bg-teal-50 text-teal-700 hover:bg-teal-100' : 'text-gray-700'
                }`}
                onClick={() => onViewChange(item.id)}
              >
                {item.highlight && !isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
                <Icon className="h-5 w-5 relative z-10" />
                <span className="text-sm relative z-10">{item.name}</span>
                {item.id === 'recruiting' && notifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto relative z-10"
                  >
                    <Badge className="bg-red-500 hover:bg-red-500 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {notifications}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </motion.div>
          );
        })}
      </nav>

      {/* User Profile */}
      <motion.div 
        className="p-4 border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-teal-100 text-teal-700">
                {roleNames[userRole].charAt(roleNames[userRole].length - 1)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">{roleNames[userRole]}</p>
            <p className="text-xs text-gray-500">
              {userRole === 'chro' ? '首席人力资源官' : userRole === 'hrbp' ? '业务伙伴' : '产品工程师'}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <motion.span 
                  className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </Button>
          </motion.div>
        </div>
        
        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
          <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600" size="sm">
            <Settings className="h-4 w-4" />
            <span className="text-xs">设置</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}