import { useState } from 'react';
import { 
  Target, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Action {
  id: string;
  title: string;
  category: '采购' | '营销' | '库存' | '定价';
  priority: 'high' | 'medium' | 'low';
  impact: string;
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  description: string;
  steps: string[];
  expectedROI: string;
  kpis: { label: string; target: string }[];
}

export default function ActionRecommendations() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const actions: Action[] = [
    {
      id: 'action-1',
      title: '提前2周启动采购备货',
      category: '采购',
      priority: 'high',
      impact: '防止缺货，确保3月促销季供应',
      effort: 'medium',
      timeline: '1周内启动',
      description: '基于AI预测3月需求将达1,380件，建议立即启动采购流程，目标库存1,500件以应对不确定性。',
      steps: [
        '与供应商确认产能和交期',
        '下达采购订单1,500件',
        '协调物流确保2月底到货',
        '预留仓储空间'
      ],
      expectedROI: '预防缺货损失 ¥18万',
      kpis: [
        { label: '库存达成率', target: '≥95%' },
        { label: '缺货率', target: '<2%' }
      ]
    },
    {
      id: 'action-2',
      title: '启动3月春季促销活动',
      category: '营销',
      priority: 'high',
      impact: '充分把握需求高峰，提升销售额',
      effort: 'high',
      timeline: '2周策划+1周执行',
      description: 'AI预测3月有27%的增长潜力，建议配合促销活动放大效应，目标销售1,500+件。',
      steps: [
        '制定促销方案（满减、赠品）',
        '设计营销物料和文案',
        '协调线上线下渠道',
        '设置监控dashboard追踪效果'
      ],
      expectedROI: '增量收入 ¥45万',
      kpis: [
        { label: '促销转化率', target: '≥8%' },
        { label: '新客占比', target: '≥30%' }
      ]
    },
    {
      id: 'action-3',
      title: '优化2月库存水位',
      category: '库存',
      priority: 'medium',
      impact: '降低2月淡季库存成本',
      effort: 'low',
      timeline: '即刻执行',
      description: 'AI预测2月需求下降至950件，建议适当降低库存水位，释放资金和仓储空间。',
      steps: [
        '评估当前库存结构',
        '暂缓非必要采购',
        '清理滞销库存',
        '调整安全库存参数'
      ],
      expectedROI: '节约资金占用 ¥8万',
      kpis: [
        { label: '库存周转天数', target: '≤15天' },
        { label: '库存准确率', target: '≥98%' }
      ]
    },
    {
      id: 'action-4',
      title: '实施动态定价策略',
      category: '定价',
      priority: 'medium',
      impact: '平衡销量与利润率',
      effort: 'medium',
      timeline: '1月测试，2月全面推广',
      description: '基于需求预测动态调整价格，淡季保利润，旺季抢份额。',
      steps: [
        '设定价格区间和触发条件',
        '配置自动定价系统',
        '小范围AB测试',
        '全面推广并监控'
      ],
      expectedROI: '利润提升 ¥12万',
      kpis: [
        { label: '毛利率', target: '≥35%' },
        { label: '价格竞争力指数', target: '≥85分' }
      ]
    },
    {
      id: 'action-5',
      title: '加强竞品监控',
      category: '营销',
      priority: 'low',
      impact: '及时应对竞品动作',
      effort: 'low',
      timeline: '持续进行',
      description: 'AI识别出竞品影响-5%，建议加强监控并制定应对预案。',
      steps: [
        '设置竞品价格监控',
        '跟踪竞品促销活动',
        '分析竞品新品动态',
        '准备差异化应对方案'
      ],
      expectedROI: '降低流失 ¥6万',
      kpis: [
        { label: '市场份额', target: '保持现有水平' },
        { label: '客户流失率', target: '<5%' }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'from-red-500 to-orange-500', badge: 'destructive', text: '高' };
      case 'medium':
        return { bg: 'from-yellow-500 to-amber-500', badge: 'secondary', text: '中' };
      case 'low':
        return { bg: 'from-blue-500 to-cyan-500', badge: 'outline', text: '低' };
      default:
        return { bg: 'from-slate-500 to-slate-600', badge: 'outline', text: '-' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '采购':
        return ShoppingCart;
      case '营销':
        return TrendingUp;
      case '库存':
        return Package;
      case '定价':
        return DollarSign;
      default:
        return Target;
    }
  };

  const getEffortLabel = (effort: string) => {
    switch (effort) {
      case 'low':
        return { text: '低投入', color: 'text-green-400' };
      case 'medium':
        return { text: '中等投入', color: 'text-yellow-400' };
      case 'high':
        return { text: '高投入', color: 'text-red-400' };
      default:
        return { text: '-', color: 'text-slate-400' };
    }
  };

  const handleApprove = (actionId: string) => {
    setCompletedActions([...completedActions, actionId]);
    toast.success('行动方案已批准', {
      description: '相关团队将收到通知并开始执行'
    });
  };

  const handleExport = () => {
    toast.success('导出中...', {
      description: '正在生成行动计划文档'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 引导说明 */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2">AI生成的行动建议</h2>
            <p className="text-slate-300 mb-4">
              基于需求预测和场景分析，AI为您生成了{actions.length}项可执行的优化建议。
              这些建议按优先级排序，包含详细的执行步骤和预期ROI。
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="gap-2 bg-red-500/20 text-red-400 border-red-500/50">
                <Zap className="w-3 h-3" />
                {actions.filter(a => a.priority === 'high').length} 个高优先级
              </Badge>
              <Badge className="gap-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                <Clock className="w-3 h-3" />
                预计总ROI: ¥89万
              </Badge>
              <Badge className="gap-2 bg-green-500/20 text-green-400 border-green-500/50">
                <CheckCircle className="w-3 h-3" />
                {completedActions.length} 项已批准
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* 优先级矩阵 */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="mb-4">影响力-投入矩阵</h3>
        <div className="relative h-64 bg-slate-800 rounded-lg p-4">
          {/* Axes */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-700"></div>
          <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-slate-700"></div>
          
          {/* Labels */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-slate-500">
            影响力
          </div>
          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs text-slate-500">
            投入程度
          </div>

          {/* Quadrants */}
          <div className="absolute top-4 left-4 text-xs text-green-400 opacity-50">
            Quick Wins
          </div>
          <div className="absolute top-4 right-4 text-xs text-yellow-400 opacity-50">
            Major Projects
          </div>
          <div className="absolute bottom-4 left-4 text-xs text-blue-400 opacity-50">
            Fill Ins
          </div>
          <div className="absolute bottom-4 right-4 text-xs text-red-400 opacity-50">
            Avoid
          </div>

          {/* Action points */}
          {actions.map((action, index) => {
            const x = action.effort === 'low' ? 20 : action.effort === 'medium' ? 50 : 80;
            const y = action.priority === 'high' ? 20 : action.priority === 'medium' ? 50 : 80;
            const Icon = getCategoryIcon(action.category);
            
            return (
              <motion.div
                key={action.id}
                className="absolute cursor-pointer"
                style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedAction(action.id)}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${getPriorityColor(action.priority).bg} rounded-full flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs">
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* 行动列表 */}
      <div className="space-y-4">
        {actions.map((action, index) => {
          const priorityStyle = getPriorityColor(action.priority);
          const Icon = getCategoryIcon(action.category);
          const effortStyle = getEffortLabel(action.effort);
          const isCompleted = completedActions.includes(action.id);
          const isSelected = selectedAction === action.id;
          
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-5 cursor-pointer transition-all ${
                  isCompleted
                    ? 'bg-green-500/10 border-green-500/30 opacity-75'
                    : isSelected
                      ? 'bg-slate-800 border-cyan-500'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => setSelectedAction(isSelected ? null : action.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${priorityStyle.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className="w-6 h-6 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-slate-500 text-sm">#{index + 1}</span>
                          <h3>{action.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400">{action.impact}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={priorityStyle.badge} className="text-xs">
                          {priorityStyle.text}优先级
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {action.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{action.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className={`w-3 h-3 ${effortStyle.color}`} />
                        <span className={effortStyle.color}>{effortStyle.text}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">{action.expectedROI}</span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isSelected && !isCompleted && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-4 pt-4 border-t border-slate-800 space-y-4"
                      >
                        {/* Description */}
                        <div>
                          <h4 className="text-sm mb-2">详细说明</h4>
                          <p className="text-sm text-slate-400">{action.description}</p>
                        </div>

                        {/* Steps */}
                        <div>
                          <h4 className="text-sm mb-2">执行步骤</h4>
                          <div className="space-y-2">
                            {action.steps.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-xs text-cyan-400">{idx + 1}</span>
                                </div>
                                <span className="text-slate-400">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* KPIs */}
                        <div>
                          <h4 className="text-sm mb-2">关键指标</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {action.kpis.map((kpi, idx) => (
                              <div key={idx} className="p-2 bg-slate-800 rounded">
                                <p className="text-xs text-slate-500">{kpi.label}</p>
                                <p className="text-sm text-cyan-400">{kpi.target}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(action.id);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            批准执行
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('编辑功能', { description: '调整方案参数' });
                            }}
                          >
                            调整方案
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {isCompleted && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span>已批准 - 执行中</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-400 mb-2">总预期ROI</p>
            <p className="text-3xl text-green-400">¥89万</p>
            <p className="text-xs text-slate-500 mt-1">未来3个月累计</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">行动方案</p>
            <p className="text-3xl text-cyan-400">{actions.length}项</p>
            <p className="text-xs text-slate-500 mt-1">{completedActions.length}项已批准</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">总体评分</p>
            <p className="text-3xl text-purple-400">92分</p>
            <p className="text-xs text-slate-500 mt-1">可行性与影响力综合评分</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={handleExport} variant="outline" className="flex-1">
            导出行动计划
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
            提交审批流程
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
