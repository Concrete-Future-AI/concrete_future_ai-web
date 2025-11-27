import { useState } from 'react';
import { 
  X, Calendar, DollarSign, User, Mail, Phone, 
  MessageSquare, FileText, TrendingUp, Clock, 
  Tag, Target, CheckCircle2, AlertCircle, Sparkles 
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';
import { Progress } from './ui/progress';
import { Avatar } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  owner: string;
  closeDate: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
}

export function DetailPanel({ isOpen, onClose, deal }: DetailPanelProps) {
  if (!deal) return null;

  const contactInfo = {
    email: 'contact@example.com',
    phone: '+86 138 0000 0000',
    position: '采购总监'
  };

  const activities = [
    { id: '1', type: 'call', user: '张伟', action: '完成电话沟通', time: '2小时前', status: 'success' },
    { id: '2', type: 'email', user: '系统', action: '发送产品资料', time: '5小时前', status: 'success' },
    { id: '3', type: 'meeting', user: '李娜', action: '安排演示会议', time: '1天前', status: 'pending' },
    { id: '4', type: 'note', user: '王强', action: '添加跟进备注', time: '2天前', status: 'success' }
  ];

  const aiInsights = [
    { 
      id: '1', 
      title: '最佳跟进时机', 
      description: '建议在本周三下午2-4点联系，历史数据显示此时段响应率提高35%',
      confidence: 87,
      icon: <Clock className="h-4 w-4" />
    },
    { 
      id: '2', 
      title: '成交概率预测', 
      description: '基于当前沟通进度和客户行为，预测成交概率为78%，高于平均水平',
      confidence: 78,
      icon: <TrendingUp className="h-4 w-4" />
    },
    { 
      id: '3', 
      title: '推荐策略', 
      description: '强调ROI价值和案例研究，提供免费试用期可提升成交率23%',
      confidence: 82,
      icon: <Target className="h-4 w-4" />
    }
  ];

  const nextSteps = [
    { id: '1', task: '发送产品演示邀请', deadline: '今天 5:00 PM', completed: false },
    { id: '2', task: '准备定制化方案', deadline: '明天 3:00 PM', completed: false },
    { id: '3', task: '跟进决策人反馈', deadline: '本周五', completed: false }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="gradient-primary text-white p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{deal.title}</h2>
                  <p className="text-white/90">{deal.company}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-white/80 text-xs mb-1">交易金额</div>
                  <div className="text-xl font-semibold">¥{(deal.value / 10000).toFixed(1)}万</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-white/80 text-xs mb-1">成交概率</div>
                  <div className="text-xl font-semibold">{deal.probability}%</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-white/80 text-xs mb-1">预计成交</div>
                  <div className="text-sm font-semibold">{deal.closeDate}</div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <ScrollArea className="flex-1">
              <Tabs defaultValue="overview" className="p-6">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="overview">概览</TabsTrigger>
                  <TabsTrigger value="activity">活动</TabsTrigger>
                  <TabsTrigger value="ai">AI洞察</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      联系信息
                    </h3>
                    <div className="space-y-3 p-4 bg-secondary/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contactInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contactInfo.position}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deal Details */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      交易详情
                    </h3>
                    <div className="space-y-3 p-4 bg-secondary/50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">负责人</span>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                            {deal.owner[0]}
                          </div>
                          <span className="text-sm font-medium">{deal.owner}</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">优先级</span>
                        <Badge variant={deal.priority === 'high' ? 'destructive' : 'secondary'}>
                          {deal.priority === 'high' ? '高' : deal.priority === 'medium' ? '中' : '低'}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">标签</span>
                        <div className="flex gap-2">
                          {deal.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      下一步行动
                    </h3>
                    <div className="space-y-2">
                      {nextSteps.map((step) => (
                        <div
                          key={step.id}
                          className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                          onClick={() => toast.success('任务状态已更新')}
                        >
                          <div className="h-5 w-5 rounded border-2 border-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{step.task}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {step.deadline}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">活动时间线</h3>
                    <Button size="sm" variant="outline" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      添加备注
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {activities.map((activity, idx) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            activity.status === 'success' ? 'bg-accent' : 'bg-warning'
                          }`}>
                            {activity.status === 'success' ? (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-white" />
                            )}
                          </div>
                          {idx < activities.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="bg-secondary/50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{activity.action}</span>
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">由 {activity.user} 执行</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* AI Insights Tab */}
                <TabsContent value="ai" className="space-y-4">
                  <div className="flex items-center gap-2 mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">AI智能分析</h3>
                      <p className="text-xs text-muted-foreground">基于历史数据和实时分析</p>
                    </div>
                  </div>

                  {aiInsights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {insight.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{insight.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {insight.confidence}% 置信度
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                      <Progress value={insight.confidence} className="h-1.5" />
                    </div>
                  ))}

                  <Button className="w-full gradient-primary mt-6" onClick={() => toast.success('正在生成详细报告...')}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    生成完整AI分析报告
                  </Button>
                </TabsContent>
              </Tabs>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-secondary/30">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => toast.info('编辑功能')}>
                  <FileText className="h-4 w-4 mr-2" />
                  编辑
                </Button>
                <Button className="gradient-success" onClick={() => {
                  toast.success('阶段已更新');
                  onClose();
                }}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  推进阶段
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
