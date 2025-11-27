import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertTriangle, CheckCircle, Info, TrendingDown, Clock, FileText, Users, MessageSquare } from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'success' | 'info' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: 'approval' | 'risk' | 'opportunity' | 'system';
  actionable: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: '供应商风险预警',
    message: 'ABC物流有限公司风险评分上升至78分，建议审查合作关系',
    time: '5分钟前',
    read: false,
    category: 'risk',
    actionable: true
  },
  {
    id: '2',
    type: 'info',
    title: '采购申请待审批',
    message: '张悦提交的Adobe Creative Cloud采购申请等待您的审批',
    time: '30分钟前',
    read: false,
    category: 'approval',
    actionable: true
  },
  {
    id: '3',
    type: 'success',
    title: '合同即将到期',
    message: '与华为技术的年度框架协议将在30天后到期',
    time: '1小时前',
    read: false,
    category: 'system',
    actionable: true
  },
  {
    id: '4',
    type: 'warning',
    title: 'AI采购建议',
    message: '芯片价格处于6个月低点，建议增加库存采购',
    time: '2小时前',
    read: false,
    category: 'opportunity',
    actionable: true
  },
  {
    id: '5',
    type: 'info',
    title: '发票已自动匹配',
    message: 'PO-2025-1020的发票已完成三单匹配，流转至财务部',
    time: '3小时前',
    read: true,
    category: 'system',
    actionable: false
  },
  {
    id: '6',
    type: 'success',
    title: '采购订单已完成',
    message: 'PO-2025-1018已送达并完成验收',
    time: '昨天',
    read: true,
    category: 'system',
    actionable: false
  },
  {
    id: '7',
    type: 'alert',
    title: '预算超支预警',
    message: 'IT设备品类本月支出已达预算的95%',
    time: '昨天',
    read: true,
    category: 'risk',
    actionable: true
  },
  {
    id: '8',
    type: 'info',
    title: '供应商绩效评估',
    message: '本月供应商绩效评估已生成，请查看',
    time: '2天前',
    read: true,
    category: 'system',
    actionable: true
  },
];

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <TrendingDown className="h-5 w-5 text-yellow-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.category === activeTab);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>通知中心</span>
            {unreadCount > 0 && (
              <Badge className="bg-red-500">{unreadCount}条未读</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            查看所有系统通知和提醒
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="unread">未读</TabsTrigger>
              <TabsTrigger value="approval">审批</TabsTrigger>
              <TabsTrigger value="risk">风险</TabsTrigger>
            </TabsList>

            <div className="mt-4 flex justify-between items-center mb-3">
              <p className="text-sm text-gray-600">
                {filteredNotifications.length} 条通知
              </p>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  全部标为已读
                </Button>
              )}
            </div>

            <ScrollArea className="h-[calc(100vh-240px)]">
              <TabsContent value={activeTab} className="space-y-2 mt-0">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <p className={`text-sm ${!notification.read ? '' : 'text-gray-900'}`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 ml-2 mt-1.5" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </p>
                          {notification.actionable && (
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              查看详情
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Info className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>暂无通知</p>
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
