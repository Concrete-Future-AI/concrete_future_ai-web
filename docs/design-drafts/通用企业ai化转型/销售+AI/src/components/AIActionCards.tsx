import { useState } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, Clock, Zap, Send, Check, X, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface AIAction {
  id: string;
  type: 'urgent' | 'opportunity' | 'recommendation' | 'alert';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  timeEstimate: string;
  priority: 'high' | 'medium' | 'low';
  actions: {
    primary: string;
    secondary?: string;
  };
  status?: 'pending' | 'accepted' | 'rejected' | 'completed';
}

export function AIActionCards() {
  const [actionItems, setActionItems] = useState<AIAction[]>([
    {
      id: '1',
      type: 'urgent',
      title: '立即跟进高价值客户',
      description: 'AI检测到"智慧零售"在过去1小时内3次访问了定价页面，建议立即电话跟进。',
      impact: '成交概率提升 65%',
      confidence: 92,
      timeEstimate: '15分钟',
      priority: 'high',
      actions: {
        primary: '立即拨打电话',
        secondary: '发送邮件'
      },
      status: 'pending'
    },
    {
      id: '2',
      type: 'opportunity',
      title: '交叉销售机会',
      description: '"云端科技"最近升级了基础版订阅，AI分析显示他们对高级分析功能有85%的需求。',
      impact: '预计额外收入 ¥12万',
      confidence: 85,
      timeEstimate: '30分钟',
      priority: 'high',
      actions: {
        primary: '准备提案',
        secondary: '稍后处理'
      },
      status: 'pending'
    },
    {
      id: '3',
      type: 'recommendation',
      title: '优化销售话术',
      description: 'AI分析了本月成功案例，建议在演示中强调"投资回报率"而非"功能列表"，转化率可提升40%。',
      impact: '成交率 +40%',
      confidence: 78,
      timeEstimate: '10分钟',
      priority: 'medium',
      actions: {
        primary: '查看建议',
        secondary: '忽略'
      },
      status: 'pending'
    },
    {
      id: '4',
      type: 'alert',
      title: '合同续约提醒',
      description: '"数据方舟"的年度合同将在30天后到期，历史数据显示提前45天沟通续约成功率最高。',
      impact: '保留ARR ¥38万',
      confidence: 88,
      timeEstimate: '1小时',
      priority: 'medium',
      actions: {
        primary: '安排会议',
        secondary: '设置提醒'
      },
      status: 'pending'
    },
    {
      id: '5',
      type: 'recommendation',
      title: '团队协作建议',
      description: 'AI发现"企业软件"项目有3个利益相关者，建议邀请产品经理小王协同跟进，成功率提升35%。',
      impact: '协同效率 +35%',
      confidence: 81,
      timeEstimate: '5分钟',
      priority: 'low',
      actions: {
        primary: '邀请协作',
        secondary: '稍后'
      },
      status: 'pending'
    }
  ]);

  const handleAccept = (id: string) => {
    const action = actionItems.find(a => a.id === id);
    setActionItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'accepted' as const } : item
    ));
    toast.success(`已接受: ${action?.title}`, {
      icon: '✅',
      description: '正在执行AI建议的操作'
    });

    // 3秒后标记为完成
    setTimeout(() => {
      setActionItems(prev => prev.map(item => 
        item.id === id ? { ...item, status: 'completed' as const } : item
      ));
      toast.success('操作已完成', { icon: '🎉' });
    }, 3000);
  };

  const handleReject = (id: string) => {
    const action = actionItems.find(a => a.id === id);
    setActionItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'rejected' as const } : item
    ));
    toast.info(`已忽略: ${action?.title}`, {
      icon: '👋',
      description: 'AI会继续学习您的偏好'
    });

    // 2秒后移除
    setTimeout(() => {
      setActionItems(prev => prev.filter(item => item.id !== id));
    }, 2000);
  };

  const handleFeedback = (id: string, positive: boolean) => {
    toast.success(positive ? 'AI建议很有帮助 👍' : '已记录反馈 👎', {
      description: 'AI会根据您的反馈不断改进'
    });
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'urgent':
        return {
          badge: '紧急行动',
          className: 'gradient-primary',
          icon: Zap
        };
      case 'opportunity':
        return {
          badge: '商机',
          className: 'gradient-success',
          icon: Sparkles
        };
      case 'recommendation':
        return {
          badge: 'AI建议',
          className: 'bg-gradient-to-r from-purple-500 to-pink-500',
          icon: Sparkles
        };
      case 'alert':
        return {
          badge: '预警',
          className: 'bg-gradient-to-r from-orange-500 to-destructive',
          icon: Clock
        };
      default:
        return {
          badge: '建议',
          className: 'bg-muted',
          icon: Sparkles
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return '';
    }
  };

  const pendingActions = actionItems.filter(a => a.status === 'pending');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            AI 智能行动建议
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {pendingActions.length} 个待处理的智能建议
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-lg"
          onClick={() => toast.info('查看所有AI建议')}
        >
          查看全部
        </Button>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {actionItems.map((action, index) => {
            const config = getTypeConfig(action.type);
            const Icon = config.icon;

            return (
              <motion.div
                key={action.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: action.status === 'rejected' || action.status === 'completed' ? 0.5 : 1,
                  y: 0,
                  scale: action.status === 'accepted' ? 0.98 : 1
                }}
                exit={{ opacity: 0, x: -100, height: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`border-2 transition-all relative overflow-hidden ${
                  action.status === 'pending' ? 'border-border hover:border-primary/50 hover:shadow-lg' :
                  action.status === 'accepted' ? 'border-accent bg-accent/5' :
                  action.status === 'completed' ? 'border-accent bg-accent/10' :
                  'border-border/50 bg-muted/50'
                }`}>
                  {/* Priority Indicator */}
                  {action.priority === 'high' && action.status === 'pending' && (
                    <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
                  )}

                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`h-12 w-12 rounded-xl ${config.className} flex items-center justify-center shadow-md flex-shrink-0`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                              {action.title}
                              {action.status === 'completed' && (
                                <Check className="h-4 w-4 text-accent" />
                              )}
                            </h4>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className={`${config.className} text-white border-0 text-xs`}>
                                {config.badge}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Sparkles className="h-3 w-3 mr-1" />
                                置信度 {action.confidence}%
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {action.description}
                        </p>

                        {/* Metrics */}
                        <div className="flex items-center gap-4 mb-3 text-xs">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-accent" />
                            <span className="text-muted-foreground">影响:</span>
                            <span className="font-semibold text-accent">{action.impact}</span>
                          </div>
                          <div className="h-3 w-px bg-border" />
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">预计耗时:</span>
                            <span className="font-semibold">{action.timeEstimate}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        {action.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="gradient-primary flex-1 hover:shadow-md transition-all"
                              onClick={() => handleAccept(action.id)}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              {action.actions.primary}
                            </Button>
                            {action.actions.secondary && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg"
                                onClick={() => handleReject(action.id)}
                              >
                                {action.actions.secondary}
                              </Button>
                            )}
                            
                            {/* Feedback Buttons */}
                            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-border">
                              <button
                                onClick={() => handleFeedback(action.id, true)}
                                className="p-1.5 rounded-lg hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors"
                                title="有帮助"
                              >
                                <ThumbsUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleFeedback(action.id, false)}
                                className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                title="没帮助"
                              >
                                <ThumbsDown className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {action.status === 'accepted' && (
                          <div className="flex items-center gap-2 text-sm text-accent">
                            <div className="h-4 w-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                            正在执行...
                          </div>
                        )}

                        {action.status === 'completed' && (
                          <div className="flex items-center gap-2 text-sm text-accent font-medium">
                            <Check className="h-4 w-4" />
                            已完成
                          </div>
                        )}

                        {action.status === 'rejected' && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <X className="h-4 w-4" />
                            已忽略
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {actionItems.length === 0 && (
        <Card className="border-2 border-dashed border-border rounded-2xl">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 rounded-2xl gradient-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">暂无AI建议</h4>
            <p className="text-sm text-muted-foreground">
              AI正在分析您的数据，稍后会生成智能建议
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
