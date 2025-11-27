import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  X, 
  TrendingUp, 
  Mail, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign,
  Calendar,
  Users,
  Sparkles
} from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
  onClearUnread: () => void;
}

export default function NotificationPanel({ onClose, onClearUnread }: NotificationPanelProps) {
  const notifications = [
    {
      id: 1,
      type: 'score',
      icon: TrendingUp,
      title: 'Velocity Score飙升',
      message: 'ABC科技的评分从75上升到92',
      time: '5分钟前',
      unread: true,
      priority: 'high',
      action: '立即查看'
    },
    {
      id: 2,
      type: 'email',
      icon: Mail,
      title: '邮件互动',
      message: '智慧制造集团打开了您的报价邮件（第3次）',
      time: '15分钟前',
      unread: true,
      priority: 'medium',
      action: '查看详情'
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertTriangle,
      title: '风险交易预警',
      message: '云端服务的交易已15天无活动',
      time: '1小时前',
      unread: true,
      priority: 'high',
      action: '立即跟进'
    },
    {
      id: 4,
      type: 'task',
      icon: Phone,
      title: '待办任务提醒',
      message: '您有3个电话需要今日完成',
      time: '2小时前',
      unread: true,
      priority: 'medium',
      action: '查看任务'
    },
    {
      id: 5,
      type: 'success',
      icon: CheckCircle2,
      title: '团队成交',
      message: '恭喜！王小明成功签约新客户，金额¥58万',
      time: '3小时前',
      unread: true,
      priority: 'low',
      action: '查看详情'
    },
    {
      id: 6,
      type: 'ai',
      icon: Sparkles,
      title: 'AI建议',
      message: '建议优先跟进"数据分析科技"，成交概率提升至78%',
      time: '4小时前',
      unread: false,
      priority: 'medium',
      action: '查看建议'
    },
    {
      id: 7,
      type: 'meeting',
      icon: Calendar,
      title: '会议提醒',
      message: '明天上午10:00与ABC科技的产品演示会议',
      time: '5小时前',
      unread: false,
      priority: 'medium',
      action: '查看日程'
    },
    {
      id: 8,
      type: 'deal',
      icon: DollarSign,
      title: '交易更新',
      message: '创新软件公司将交易金额从¥62万调整为¥68万',
      time: '昨天',
      unread: false,
      priority: 'low',
      action: '查看交易'
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50/50';
      case 'medium': return 'border-yellow-200 bg-yellow-50/50';
      default: return 'border-neutral-200 bg-neutral-50/50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'score': return 'bg-blue-100 text-blue-600';
      case 'email': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-orange-100 text-orange-600';
      case 'task': return 'bg-purple-100 text-purple-600';
      case 'success': return 'bg-green-100 text-green-600';
      case 'ai': return 'bg-purple-100 text-purple-600';
      case 'meeting': return 'bg-blue-100 text-blue-600';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="absolute right-4 top-[113px] w-[420px] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="shadow-2xl border-neutral-200">
          <div className="p-4 border-b border-neutral-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-neutral-900">通知中心</h3>
                <Badge className="bg-red-500 text-white">
                  {notifications.filter(n => n.unread).length} 新
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClearUnread}
                  className="text-xs"
                >
                  全部已读
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                全部
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                未读
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                重要
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="p-3 space-y-2">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-3 border rounded-lg hover:shadow-md transition-all ${
                      notification.unread ? 'border-blue-300 bg-blue-50/50' : getPriorityColor(notification.priority)
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm text-neutral-900 flex items-center gap-2">
                            {notification.title}
                            {notification.unread && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </h4>
                          <span className="text-xs text-neutral-500 flex-shrink-0">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mb-2">
                          {notification.message}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7 bg-white hover:bg-blue-50 border-blue-200 text-blue-600"
                        >
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
