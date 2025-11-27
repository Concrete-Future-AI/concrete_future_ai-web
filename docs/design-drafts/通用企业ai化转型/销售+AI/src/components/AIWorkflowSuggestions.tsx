import { useState } from 'react';
import { Workflow, Zap, Clock, TrendingUp, ChevronRight, Play, CheckCircle, Settings, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface WorkflowStep {
  id: string;
  action: string;
  timing: string;
  condition?: string;
}

interface AutomationSuggestion {
  id: string;
  title: string;
  description: string;
  category: 'lead' | 'deal' | 'customer' | 'reporting';
  impact: {
    timeSaved: string;
    efficiency: string;
    revenue?: string;
  };
  confidence: number;
  complexity: 'easy' | 'medium' | 'hard';
  steps: WorkflowStep[];
  isActive: boolean;
}

export function AIWorkflowSuggestions() {
  const [suggestions, setSuggestions] = useState<AutomationSuggestion[]>([
    {
      id: '1',
      title: '自动线索评分与分配',
      description: 'AI自动评估新线索质量，根据评分自动分配给最合适的销售代表，提高转化效率。',
      category: 'lead',
      impact: {
        timeSaved: '每周节省 8小时',
        efficiency: '提升 45%',
        revenue: '预计增收 ¥32万/月'
      },
      confidence: 92,
      complexity: 'medium',
      steps: [
        { id: '1', action: '新线索进入系统', timing: '实时' },
        { id: '2', action: 'AI分析线索质量（公司规模、行业、预算等）', timing: '< 1秒' },
        { id: '3', action: '自动打分（0-100分）', timing: '< 1秒' },
        { id: '4', action: '根据分数和销售代表负载智能分配', timing: '< 2秒', condition: '分数 > 60' },
        { id: '5', action: '自动发送通知给销售代表', timing: '立即' },
        { id: '6', action: '创建首次跟进任务', timing: '24小时内' }
      ],
      isActive: false
    },
    {
      id: '2',
      title: '智能跟进提醒系统',
      description: '基于客户行为和互动历史，AI自动判断最佳跟进时机并发送提醒。',
      category: 'deal',
      impact: {
        timeSaved: '每周节省 5小时',
        efficiency: '提升 38%'
      },
      confidence: 88,
      complexity: 'easy',
      steps: [
        { id: '1', action: '监控客户互动（邮件打开、网站访问等）', timing: '实时' },
        { id: '2', action: 'AI分析客户兴趣度变化', timing: '每小时' },
        { id: '3', action: '识别最佳跟进时机', timing: '实时', condition: '兴趣度上升 > 20%' },
        { id: '4', action: '自动创建跟进任务', timing: '立即' },
        { id: '5', action: '推送个性化跟进建议', timing: '立即' }
      ],
      isActive: true
    },
    {
      id: '3',
      title: '流失预警与挽留自动化',
      description: '实时监控客户健康度，提前识别流失风险并自动触发挽留流程。',
      category: 'customer',
      impact: {
        timeSaved: '每周节省 6小时',
        efficiency: '提升 52%',
        revenue: '减少流失 ¥85万/季度'
      },
      confidence: 85,
      complexity: 'medium',
      steps: [
        { id: '1', action: '持续监控客户健康度指标', timing: '每日' },
        { id: '2', action: 'AI检测异常下降', timing: '实时', condition: '健康度下降 > 15%' },
        { id: '3', action: '自动标记为高风险客户', timing: '立即' },
        { id: '4', action: '通知客户成功经理', timing: '立即' },
        { id: '5', action: '生成个性化挽留方案', timing: '< 1小时' },
        { id: '6', action: '安排紧急沟通会议', timing: '24小时内' }
      ],
      isActive: true
    },
    {
      id: '4',
      title: '自动化销售报告生成',
      description: 'AI每周自动生成销售业绩报告，包含关键指标、趋势分析和改进建议。',
      category: 'reporting',
      impact: {
        timeSaved: '每周节省 4小时',
        efficiency: '提升 100%'
      },
      confidence: 95,
      complexity: 'easy',
      steps: [
        { id: '1', action: '收集一周销售数据', timing: '每周一 9:00' },
        { id: '2', action: 'AI分析关键指标变化', timing: '< 5分钟' },
        { id: '3', action: '生成可视化图表', timing: '< 2分钟' },
        { id: '4', action: '撰写趋势分析和建议', timing: '< 3分钟' },
        { id: '5', action: '自动发送给管理层', timing: '每周一 9:30' }
      ],
      isActive: false
    },
    {
      id: '5',
      title: '智能交叉销售推荐',
      description: '分析客户购买历史和使用行为，自动识别交叉销售机会并推荐相关产品。',
      category: 'deal',
      impact: {
        timeSaved: '每周节省 7小时',
        efficiency: '提升 65%',
        revenue: '预计增收 ¥48万/季度'
      },
      confidence: 83,
      complexity: 'hard',
      steps: [
        { id: '1', action: '分析客户产品使用模式', timing: '每日' },
        { id: '2', action: 'AI识别产品关联性', timing: '实时' },
        { id: '3', action: '发现交叉销售机会', timing: '每周', condition: '关联度 > 70%' },
        { id: '4', action: '生成个性化推荐方案', timing: '< 1小时' },
        { id: '5', action: '自动创建销售任务', timing: '立即' },
        { id: '6', action: '发送推荐邮件给客户', timing: '最佳时间' }
      ],
      isActive: false
    }
  ]);

  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const toggleAutomation = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
    const suggestion = suggestions.find(s => s.id === id);
    if (suggestion) {
      toast.success(
        `${suggestion.isActive ? '已停用' : '已启用'}: ${suggestion.title}`,
        { icon: suggestion.isActive ? '⏸️' : '▶️' }
      );
    }
  };

  const getCategoryBadge = (category: string) => {
    const config = {
      lead: { label: '线索管理', className: 'gradient-primary text-white border-0' },
      deal: { label: '交易管理', className: 'gradient-success text-white border-0' },
      customer: { label: '客户管理', className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0' },
      reporting: { label: '报告分析', className: 'gradient-info text-white border-0' }
    };
    const { label, className } = config[category as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const getComplexityBadge = (complexity: string) => {
    const config = {
      easy: { label: '简单', className: 'bg-accent text-white border-0' },
      medium: { label: '中等', className: 'bg-warning text-white border-0' },
      hard: { label: '复杂', className: 'bg-destructive text-white border-0' }
    };
    const { label, className } = config[complexity as keyof typeof config];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const activeSuggestions = suggestions.filter(s => s.isActive).length;
  const totalTimeSaved = suggestions
    .filter(s => s.isActive)
    .reduce((acc, s) => acc + parseInt(s.impact.timeSaved), 0);

  return (
    <Card className="border-border rounded-2xl shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                AI 自动化工作流建议
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                智能识别可优化的业务流程
              </p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">已启用</span>
            </div>
            <div className="text-2xl font-bold text-primary">{activeSuggestions}</div>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-success/10 border border-accent/20">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">节省时间</span>
            </div>
            <div className="text-2xl font-bold text-accent">{totalTimeSaved}h</div>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-accent/10 border border-success/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">可用建议</span>
            </div>
            <div className="text-2xl font-bold text-accent">{suggestions.length}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedSuggestion === suggestion.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon & Switch */}
                  <div className="flex flex-col items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl ${
                      suggestion.isActive ? 'gradient-success' : 'bg-muted'
                    } flex items-center justify-center shadow-md transition-all`}>
                      {suggestion.isActive ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <Switch
                      checked={suggestion.isActive}
                      onCheckedChange={() => toggleAutomation(suggestion.id)}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{suggestion.title}</h4>
                        <div className="flex items-center gap-2">
                          {getCategoryBadge(suggestion.category)}
                          {getComplexityBadge(suggestion.complexity)}
                          <Badge variant="outline" className="text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            {suggestion.confidence}% 置信度
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {suggestion.description}
                    </p>

                    {/* Impact Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="text-xs text-muted-foreground mb-0.5">节省时间</div>
                        <div className="text-sm font-semibold text-primary">
                          {suggestion.impact.timeSaved}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="text-xs text-muted-foreground mb-0.5">效率提升</div>
                        <div className="text-sm font-semibold text-accent">
                          {suggestion.impact.efficiency}
                        </div>
                      </div>
                      {suggestion.impact.revenue && (
                        <div className="p-2 rounded-lg bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-0.5">预计增收</div>
                          <div className="text-sm font-semibold text-accent">
                            {suggestion.impact.revenue}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Workflow Steps */}
                    <button
                      onClick={() => setSelectedSuggestion(
                        selectedSuggestion === suggestion.id ? null : suggestion.id
                      )}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors mb-2"
                    >
                      <span className="text-sm font-medium">查看自动化流程</span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${
                        selectedSuggestion === suggestion.id ? 'rotate-90' : ''
                      }`} />
                    </button>

                    <AnimatePresence>
                      {selectedSuggestion === suggestion.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/50 to-transparent border border-border">
                            <div className="space-y-3">
                              {suggestion.steps.map((step, idx) => (
                                <div key={step.id} className="flex items-start gap-3">
                                  <div className="flex flex-col items-center">
                                    <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                                      {idx + 1}
                                    </div>
                                    {idx < suggestion.steps.length - 1 && (
                                      <div className="w-0.5 h-8 bg-border mt-1" />
                                    )}
                                  </div>
                                  <div className="flex-1 pt-1">
                                    <p className="text-sm font-medium mb-1">{step.action}</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <Badge variant="outline" className="text-xs">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {step.timing}
                                      </Badge>
                                      {step.condition && (
                                        <Badge variant="outline" className="text-xs text-muted-foreground">
                                          条件: {step.condition}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    {!suggestion.isActive && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          className="flex-1 gradient-primary hover:shadow-md transition-all"
                          onClick={() => toggleAutomation(suggestion.id)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          启用自动化
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg"
                          onClick={() => toast.info('配置自动化工作流')}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
