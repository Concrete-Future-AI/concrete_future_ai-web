import { useState } from 'react';
import { LayoutDashboard, Users, ShoppingCart, FileText, Settings, Bell, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import NotificationPanel from './NotificationPanel';
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '../utils/permissions';

interface MainLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: 'dashboard' | 'supplier' | 'p2p' | 'contract' | 'ai-center' | 'settings') => void;
  role: string;
}

export default function MainLayout({ children, currentView, onViewChange, role }: MainLayoutProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { canAccessModule, roleName, roleDescription } = usePermissions(role as UserRole);
  
  const roleNames = {
    director: '王总',
    specialist: '李明',
    applicant: '张悦'
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Sidebar - Material Design Style */}
      <aside className="w-64 bg-white border-r border-border flex flex-col elevation-2">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="elevation-1">
              <AvatarFallback className="ai-gradient text-white">
                {roleNames[role as keyof typeof roleNames]?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{roleNames[role as keyof typeof roleNames]}</p>
              <p className="text-muted-foreground text-sm">{roleName}</p>
            </div>
          </div>
          <div className="mt-3 px-3 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
            <p className="text-xs text-muted-foreground">{roleDescription}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            className={`w-full justify-start md-transition ${
              currentView === 'dashboard' ? 'elevation-1' : ''
            }`}
            onClick={() => onViewChange('dashboard')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            工作台
          </Button>

          {/* AI指挥中心 - 根据权限显示 */}
          {canAccessModule('aiCenter') && (
            <Button
              variant={currentView === 'ai-center' ? 'default' : 'ghost'}
              className={`w-full justify-start md-transition relative overflow-hidden ${
                currentView === 'ai-center' ? 'ai-gradient text-white elevation-2' : 'hover:bg-purple-50'
              }`}
              onClick={() => onViewChange('ai-center')}
            >
              {currentView !== 'ai-center' && (
                <div className="absolute inset-0 ai-gradient opacity-10" />
              )}
              <Brain className="mr-2 h-4 w-4 relative z-10" />
              <span className="relative z-10">AI指挥中心</span>
              <Badge className="ml-auto bg-purple-100 text-purple-700 border-0 relative z-10 text-xs">
                AI
              </Badge>
            </Button>
          )}

          {canAccessModule('supplier360') && (
            <Button
              variant={currentView === 'supplier' ? 'default' : 'ghost'}
              className={`w-full justify-start md-transition ${
                currentView === 'supplier' ? 'elevation-1' : ''
              }`}
              onClick={() => onViewChange('supplier')}
            >
              <Users className="mr-2 h-4 w-4" />
              供应商360°
            </Button>
          )}
          
          {canAccessModule('p2p') && (
            <Button
              variant={currentView === 'p2p' ? 'default' : 'ghost'}
              className={`w-full justify-start md-transition ${
                currentView === 'p2p' ? 'elevation-1' : ''
              }`}
              onClick={() => onViewChange('p2p')}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              采办到支付
            </Button>
          )}
          
          {canAccessModule('contract') && (
            <Button 
              variant={currentView === 'contract' ? 'default' : 'ghost'}
              className={`w-full justify-start md-transition ${
                currentView === 'contract' ? 'elevation-1' : ''
              }`}
              onClick={() => onViewChange('contract')}
            >
              <FileText className="mr-2 h-4 w-4" />
              合同管理
            </Button>
          )}
          
          {canAccessModule('settings') && (
            <Button 
              variant={currentView === 'settings' ? 'default' : 'ghost'}
              className={`w-full justify-start md-transition ${
                currentView === 'settings' ? 'elevation-1' : ''
              }`}
              onClick={() => onViewChange('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              设置
            </Button>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          © 2025 智采云
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2>
            {currentView === 'dashboard' && '统一工作台'}
            {currentView === 'supplier' && '供应商360°'}
            {currentView === 'p2p' && '采办到支付'}
            {currentView === 'contract' && '合同管理'}
            {currentView === 'ai-center' && 'AI指挥中心'}
            {currentView === 'settings' && '系统设置'}
          </h2>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setNotificationOpen(true)}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                4
              </Badge>
            </Button>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
      
      <NotificationPanel open={notificationOpen} onClose={() => setNotificationOpen(false)} />
    </div>
  );
}