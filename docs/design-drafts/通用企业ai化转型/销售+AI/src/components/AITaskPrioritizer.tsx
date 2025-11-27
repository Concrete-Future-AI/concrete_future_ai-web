import { useState } from 'react';
import { Zap, Brain, TrendingUp, Clock, DollarSign, AlertTriangle, CheckCircle, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Task {
  id: string;
  title: string;
  customer: string;
  type: 'call' | 'meeting' | 'email' | 'proposal';
  dueDate: string;
  value: number;
  urgency: number;
  impact: number;
  aiScore: number;
  recommendation: string;
  timeEstimate: string;
  status?: 'pending' | 'in-progress' | 'completed';
}

export function AITaskPrioritizer() {
  const [sortBy, setSortBy] = useState<'ai' | 'urgency' | 'value'>('ai');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '跟进高价值商机',
      customer: '智慧零售科技',
      type: 'call',
      dueDate: '今天 14:00',
      value: 450000,
      urgency: 95,
      impact: 88,
      aiScore: 98,
      recommendation: '客户在1小时前访问了定价页面3次，这是强烈的购买信号。建议立即电话跟进，提供限时优惠可提升成交率40%。',
      timeEstimate: '20分钟',
      status: 'pending'
    },
    {
      id: '2',
      title: '发送方案提案',
      customer: '云端科技',
      type: 'proposal',
      dueDate: '今天 16:00',
      value: 280000,
      urgency: 88,
      impact: 85,
      aiScore: 92,
      recommendation: '客户决策周期进入最后阶段，竞争对手也在接触。建议在提案中突出ROI分析和快速部署优势。',
      timeEstimate: '45分钟',
      status: 'pending'
    },
    {
      id: '3',
      title: '续约沟通会议',
      customer: '数据方舟',
      type: 'meeting',
      dueDate: '明天 10:00',
      value: 380000,
      urgency: 75,
      impact: 92,
      aiScore: 87,
      recommendation: '客户使用频率持续上升，满意度高。建议在会议中提出升级方案，交叉销售成功率85%。',
      timeEstimate: '1小时',
      status: 'pending'
    },
    {
      id: '4',
      title: '产品演示准备',
      customer: '企业软件',
      type: 'meeting',
      dueDate: '明天 14:00',
      value: 320000,
      urgency: 70,
      impact: 78,
      aiScore: 82,
      recommendation: '首次重要会议，决策者将全员参与。建议重点展示与其现有ERP系统的集成能力。',
      timeEstimate: '1.5小时',
      status: 'pending'
    },
    {
      id: '5',
      title: '客户成功回访',
      customer: '创新医疗',
      type: 'call',
      dueDate: '后天',
      value: 0,
      urgency: 60,
      impact: 70,
      aiScore: 75,
      recommendation: '定期回访可提升客户满意度15%，同时可能发现交叉销售机会。建议了解使用情况和潜在需求。',
      timeEstimate: '30分钟',
      status: 'pending'
    },
    {
      id: '6',
      title: '发送感谢邮件',
      customer: '新签客户',
      type: 'email',
      dueDate: '今天',
      value: 0,
      urgency: 50,
      impact: 65,
      aiScore: 68,
      recommendation: '及时感谢可建立良好关系。建议使用AI邮件助手生成个性化内容，同时介绍客户成功团队。',
      timeEstimate: '10分钟',
      status: 'pending'
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    toast.info('AI正在重新分析任务优先级...', { icon: '🤖' });
    
    setTimeout(() => {
      // 模拟AI重新评分
      setTasks(prev => prev.map(task => ({
        ...task,
        aiScore: Math.min(100, task.aiScore + Math.random() * 10 - 5)
      })));
      setIsAnalyzing(false);
      toast.success('AI分析完成', { icon: '✨' });
    }, 2000);
  };

  const handleCompleteTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: 'completed' as const } : task
    ));
    const task = tasks.find(t => t.id === id);
    toast.success(`任务已完成: ${task?.title}`, { icon: '✅' });
  };

  const handleStartTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: 'in-progress' as const } : task
    ));
    const task = tasks.find(t => t.id === id);
    toast.success(`开始执行: ${task?.title}`, { icon: '▶️' });
  };

  const getSortedTasks = () => {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case 'ai':
          return b.aiScore - a.aiScore;
        case 'urgency':
          return b.urgency - a.urgency;
        case 'value':
          return b.value - a.value;
        default:
          return 0;
      }
    });
  };

  const getTaskTypeConfig = (type: string) => {
    switch (type) {
      case 'call':
        return { label: '电话', color: 'bg-primary/10 text-primary border-primary/20' };
      case 'meeting':
        return { label: '会议', color: 'bg-accent/10 text-accent border-accent/20' };
      case 'email':
        return { label: '邮件', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' };
      case 'proposal':
        return { label: '提案', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' };
      default:
        return { label: '任务', color: 'bg-secondary' };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-destructive';
    if (score >= 80) return 'text-warning';
    if (score >= 70) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-gradient-to-br from-destructive to-orange-500';
    if (score >= 80) return 'bg-gradient-to-br from-warning to-orange-400';
    if (score >= 70) return 'gradient-primary';
    return 'bg-muted';
  };

  const sortedTasks = getSortedTasks();
  const pendingTasks = sortedTasks.filter(t => t.status === 'pending' || !t.status);

  return (
    <Card className="border-border rounded-2xl shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">AI 任务优先级</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                智能分析并排序您的待办事项
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReanalyze}
            disabled={isAnalyzing}
            className="gap-2 rounded-lg hover-lift"
          >
            {isAnalyzing ? (
              <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            重新分析
          </Button>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setSortBy('ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortBy === 'ai'
                ? 'gradient-primary text-white shadow-md'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <Brain className="h-3 w-3 inline mr-1" />
            AI推荐
          </button>
          <button
            onClick={() => setSortBy('urgency')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortBy === 'urgency'
                ? 'gradient-primary text-white shadow-md'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <AlertTriangle className="h-3 w-3 inline mr-1" />
            紧急程度
          </button>
          <button
            onClick={() => setSortBy('value')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortBy === 'value'
                ? 'gradient-primary text-white shadow-md'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <DollarSign className="h-3 w-3 inline mr-1" />
            商业价值
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <div className="text-xs text-muted-foreground mb-1">待处理</div>
            <div className="text-2xl font-bold text-primary">{pendingTasks.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-success/10 border border-accent/20">
            <div className="text-xs text-muted-foreground mb-1">今日任务</div>
            <div className="text-2xl font-bold text-accent">
              {tasks.filter(t => t.dueDate.includes('今天')).length}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-accent/10 border border-success/20">
            <div className="text-xs text-muted-foreground mb-1">高优先级</div>
            <div className="text-2xl font-bold text-accent">
              {tasks.filter(t => t.aiScore >= 90).length}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task, index) => {
              const typeConfig = getTaskTypeConfig(task.type);
              
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: task.status === 'completed' ? 0.5 : 1,
                    y: 0 
                  }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    task.status === 'completed' 
                      ? 'border-accent/50 bg-accent/5' 
                      : task.status === 'in-progress'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 bg-card hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Priority Badge */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className={`h-14 w-14 rounded-xl ${getScoreBg(task.aiScore)} flex flex-col items-center justify-center shadow-md`}>
                        <div className="text-xl font-bold text-white">{task.aiScore}</div>
                        <div className="text-[10px] text-white/80">AI评分</div>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(task.aiScore)}`}>
                        #{index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h4 className={`font-semibold text-sm mb-1 ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={`${typeConfig.color} text-xs border`}>
                              {typeConfig.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.customer}</span>
                            {task.status === 'in-progress' && (
                              <Badge className="gradient-primary text-white border-0 text-xs">
                                进行中
                              </Badge>
                            )}
                            {task.status === 'completed' && (
                              <Badge className="gradient-success text-white border-0 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                已完成
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* AI Recommendation */}
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 mb-3">
                        <div className="flex items-start gap-2">
                          <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {task.recommendation}
                          </p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        <div className="p-2 rounded-lg bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-1">紧急度</div>
                          <div className="flex items-center gap-1">
                            <Progress value={task.urgency} className="h-1 flex-1" />
                            <span className="text-xs font-semibold">{task.urgency}</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-1">影响力</div>
                          <div className="flex items-center gap-1">
                            <Progress value={task.impact} className="h-1 flex-1" />
                            <span className="text-xs font-semibold">{task.impact}</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-1">价值</div>
                          <div className="text-xs font-semibold">
                            {task.value > 0 ? `¥${(task.value / 10000).toFixed(0)}万` : '-'}
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-1">耗时</div>
                          <div className="text-xs font-semibold">{task.timeEstimate}</div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>截止: {task.dueDate}</span>
                        </div>

                        {task.status !== 'completed' && (
                          <div className="flex gap-2">
                            {task.status === 'in-progress' ? (
                              <Button
                                size="sm"
                                className="gradient-success"
                                onClick={() => handleCompleteTask(task.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                标记完成
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="gradient-primary"
                                onClick={() => handleStartTask(task.id)}
                              >
                                <Zap className="h-3 w-3 mr-1" />
                                开始执行
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
