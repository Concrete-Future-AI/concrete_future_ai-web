import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Target, Lightbulb, Brain, Zap, Award, ChevronRight, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'opportunity' | 'trend';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  action?: string;
  actionLink?: string;
  timeAgo: string;
  metrics?: {
    label: string;
    value: string;
    change?: string;
  }[];
}

interface AIInsightsPanelProps {
  context?: 'dashboard' | 'forecast' | 'opportunities' | 'churn';
  onActionClick?: (insight: AIInsight) => void;
}

export function AIInsightsPanel({ context = 'dashboard', onActionClick }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    generateInsights();
  }, [context]);

  const generateInsights = () => {
    const allInsights: AIInsight[] = [
      {
        id: '1',
        type: 'prediction',
        priority: 'high',
        title: '本季度销售目标达成概率上调',
        description: 'AI模型分析显示，基于当前销售管道健康度和团队表现，本季度目标达成概率从85%上调至92%。',
        impact: '预计额外收入 ¥32万',
        confidence: 92,
        action: '查看详细预测',
        timeAgo: '5分钟前',
        metrics: [
          { label: '当前进度', value: '85.3%', change: '+5.2%' },
          { label: '预测完成', value: '92%', change: '+7%' }
        ]
      },
      {
        id: '2',
        type: 'opportunity',
        priority: 'high',
        title: '发现3个即将流失的高价值客户',
        description: 'AI检测到"智慧零售"、"云端科技"和"数据方舟"三家客户的活跃度异常下降，建议立即采取挽留行动。',
        impact: 'ARR风险 ¥145万',
        confidence: 88,
        action: '立即跟进',
        timeAgo: '12分钟前',
        metrics: [
          { label: '风险等级', value: '高', change: '↑' },
          { label: '建议行动时间', value: '24小时内' }
        ]
      },
      {
        id: '3',
        type: 'recommendation',
        priority: 'high',
        title: '最佳成交时机：本周四下午',
        description: '基于历史数据分析，建议在本周四下午2-4点联系"企业软件"类别的5个高潜力客户，成交概率可提升45%。',
        impact: '预计成交 2-3笔',
        confidence: 87,
        action: '安排会议',
        timeAgo: '18分钟前',
        metrics: [
          { label: '目标客户', value: '5个' },
          { label: '平均成交率', value: '+45%' }
        ]
      },
      {
        id: '4',
        type: 'trend',
        priority: 'medium',
        title: '云计算类别需求激增',
        description: 'AI市场趋势分析显示，云计算相关产品咨询量在过去两周增长了67%，建议增加该类别的营销投入。',
        impact: '潜在增长 ¥280万',
        confidence: 82,
        action: '调整策略',
        timeAgo: '1小时前',
        metrics: [
          { label: '咨询增长', value: '+67%' },
          { label: '市场热度', value: '85/100' }
        ]
      },
      {
        id: '5',
        type: 'alert',
        priority: 'medium',
        title: '销售周期延长预警',
        description: '"需求分析"阶段的平均停留时间从8天增加到12天，建议优化这一阶段的流程以缩短销售周期。',
        impact: '影响15个商机',
        confidence: 79,
        action: '优化流程',
        timeAgo: '2小时前',
        metrics: [
          { label: '平均延长', value: '+4天' },
          { label: '受影响商机', value: '15个' }
        ]
      },
      {
        id: '6',
        type: 'prediction',
        priority: 'medium',
        title: '下月新增线索预测',
        description: 'AI预测下月将新增42-48个高质量销售线索，建议提前规划销售资源分配。',
        impact: '预计价值 ¥165万',
        confidence: 84,
        action: '资源规划',
        timeAgo: '3小时前',
        metrics: [
          { label: '预测线索', value: '42-48个' },
          { label: '质量评分', value: '78/100' }
        ]
      },
      {
        id: '7',
        type: 'opportunity',
        priority: 'low',
        title: '交叉销售机会识别',
        description: 'AI发现8个现有客户具有购买其他产品的高意向，建议进行交叉销售。',
        impact: '预计收入 ¥56万',
        confidence: 75,
        action: '查看客户',
        timeAgo: '5小时前',
        metrics: [
          { label: '目标客户', value: '8个' },
          { label: '平均客单价', value: '¥7万' }
        ]
      }
    ];

    setInsights(allInsights);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      generateInsights();
      setIsRefreshing(false);
      toast.success('AI洞察已更新', { icon: '🤖' });
    }, 1500);
  };

  const filteredInsights = selectedType === 'all' 
    ? insights 
    : insights.filter(i => i.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return TrendingUp;
      case 'recommendation': return Lightbulb;
      case 'alert': return AlertTriangle;
      case 'opportunity': return Target;
      case 'trend': return Zap;
      default: return Sparkles;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'prediction': return 'gradient-info';
      case 'recommendation': return 'gradient-success';
      case 'alert': return 'bg-gradient-to-br from-destructive to-orange-500';
      case 'opportunity': return 'gradient-primary';
      case 'trend': return 'bg-gradient-to-br from-purple-500 to-pink-500';
      default: return 'gradient-primary';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'gradient-primary text-white border-0';
      case 'medium': return 'bg-warning text-white border-0';
      case 'low': return 'bg-muted text-muted-foreground border-0';
      default: return '';
    }
  };

  const typeFilters = [
    { value: 'all', label: '全部', icon: Sparkles },
    { value: 'prediction', label: '预测', icon: TrendingUp },
    { value: 'opportunity', label: '机会', icon: Target },
    { value: 'recommendation', label: '建议', icon: Lightbulb },
    { value: 'alert', label: '预警', icon: AlertTriangle },
    { value: 'trend', label: '趋势', icon: Zap }
  ];

  return (
    <Card className="border-border rounded-2xl shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                <Brain className="h-5 w-5 text-white" />
              </div>
              AI 智能洞察
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-2">
              基于数据分析和机器学习的实时建议
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2 rounded-lg hover-lift"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>

        {/* Type Filters */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {typeFilters.map(filter => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.value}
                onClick={() => setSelectedType(filter.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedType === filter.value
                    ? 'gradient-primary text-white shadow-md'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                <Icon className="h-3 w-3 inline mr-1" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {filteredInsights.map((insight, index) => {
              const Icon = getTypeIcon(insight.type);
              return (
                <motion.div
                  key={insight.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all bg-gradient-to-br from-card to-secondary/20 cursor-pointer group hover:shadow-lg"
                  onClick={() => onActionClick?.(insight)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`h-12 w-12 rounded-xl ${getTypeColor(insight.type)} flex items-center justify-center shadow-md flex-shrink-0`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {insight.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {insight.timeAgo}
                          </p>
                        </div>
                        <Badge className={getPriorityBadge(insight.priority)}>
                          {insight.priority === 'high' ? '高优先级' : insight.priority === 'medium' ? '中优先级' : '低优先级'}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {insight.description}
                      </p>

                      {/* Metrics */}
                      {insight.metrics && (
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {insight.metrics.map((metric, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-secondary/50">
                              <div className="text-xs text-muted-foreground">{metric.label}</div>
                              <div className="font-semibold text-sm flex items-center gap-1">
                                {metric.value}
                                {metric.change && (
                                  <span className="text-xs text-accent">{metric.change}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Impact & Confidence */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">预期影响</div>
                          <div className="text-sm font-semibold text-primary">{insight.impact}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">AI置信度</div>
                          <div className="flex items-center gap-2">
                            <Progress value={insight.confidence} className="h-1.5 flex-1" />
                            <span className="text-xs font-semibold text-accent">{insight.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      {insight.action && (
                        <Button
                          size="sm"
                          className="w-full gradient-primary hover:shadow-md transition-all group/btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success(`正在执行: ${insight.action}`, { icon: '🎯' });
                            onActionClick?.(insight);
                          }}
                        >
                          {insight.action}
                          <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredInsights.length === 0 && (
            <div className="text-center py-12">
              <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="font-semibold mb-2">暂无相关洞察</h3>
              <p className="text-sm text-muted-foreground">AI正在分析数据，请稍后查看</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
