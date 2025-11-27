import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ChevronRight, Brain, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface Insight {
  id: string;
  type: 'critical' | 'opportunity' | 'prediction' | 'optimization';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  actions?: string[];
}

interface AIInsightPanelProps {
  module: 'control-tower' | 'demand-forecast' | 'inventory' | 'logistics';
}

export default function AIInsightPanel({ module }: AIInsightPanelProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  useEffect(() => {
    // Generate module-specific insights
    const moduleInsights: Record<string, Insight[]> = {
      'control-tower': [
        {
          id: '1',
          type: 'critical',
          title: '华东仓库库存即将告急',
          description: '基于当前消耗速率，上海仓库SKU #A1203将在3天内缺货，建议立即从华北仓调拨',
          impact: '影响订单: 约1,200单',
          confidence: 94,
          actions: ['启动紧急调拨', '通知采购部门', '查看详细分析']
        },
        {
          id: '2',
          type: 'opportunity',
          title: '需求激增机会窗口',
          description: '预测显示SKU #B3405在未来2周需求将增长45%，当前库存充足，建议增加促销力度',
          impact: '潜在收入: +¥380万',
          confidence: 87,
          actions: ['制定促销方案', '优化配货计划']
        }
      ],
      'demand-forecast': [
        {
          id: '3',
          type: 'prediction',
          title: 'AI发现异常需求模式',
          description: '智能手表需求出现非季节性上升，可能与竞品缺货相关。建议提前备货应对',
          impact: '预测需求增长: +28%',
          confidence: 91,
          actions: ['调整预测参数', '增加安全库存', '查看因果分析']
        },
        {
          id: '4',
          type: 'optimization',
          title: '模型准确率优化建议',
          description: '检测到近期预测偏差，建议纳入"618大促"等电商节日参数以提升准确率',
          impact: '预计准确率提升: +5.2%',
          confidence: 89,
          actions: ['更新模型参数', '查看历史偏差']
        }
      ],
      'inventory': [
        {
          id: '5',
          type: 'critical',
          title: '过期风险预警',
          description: '深圳仓库有850件SKU #C7821即将在30天内过保质期，建议紧急促销或调拨',
          impact: '潜在损失: ¥12.5万',
          confidence: 96,
          actions: ['启动清仓促销', '仓间调拨', '查看详细清单']
        },
        {
          id: '6',
          type: 'optimization',
          title: '智能补货时机优化',
          description: 'AI分析显示，将SKU #A1203补货周期从7天调整为5天可降低缺货率同时减少库存成本',
          impact: '成本节约: ¥8.2万/月',
          confidence: 85,
          actions: ['应用优化方案', '模拟运行测试']
        }
      ],
      'logistics': [
        {
          id: '7',
          type: 'opportunity',
          title: '路线优化机会',
          description: '通过AI重新规划华南区域配送路线，可减少15%行驶里程，降低燃油成本',
          impact: '月度节约: ¥4.3万',
          confidence: 92,
          actions: ['查看优化路线', '开始试运行', '对比效果分析']
        },
        {
          id: '8',
          type: 'prediction',
          title: '配送高峰预警',
          description: '预测明天下午3-5点订单量将激增，建议提前调配车辆和人力资源',
          impact: '影响订单: 约2,800单',
          confidence: 88,
          actions: ['调整排班', '预约临时车辆']
        }
      ]
    };

    setInsights(moduleInsights[module] || []);
    setSelectedInsight(moduleInsights[module]?.[0] || null);
  }, [module]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5" />;
      case 'opportunity':
        return <TrendingUp className="w-5 h-5" />;
      case 'prediction':
        return <Brain className="w-5 h-5" />;
      case 'optimization':
        return <Zap className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'from-red-500 to-orange-500';
      case 'opportunity':
        return 'from-green-500 to-emerald-500';
      case 'prediction':
        return 'from-blue-500 to-cyan-500';
      case 'optimization':
        return 'from-yellow-500 to-amber-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getInsightBorder = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-500/50';
      case 'opportunity':
        return 'border-green-500/50';
      case 'prediction':
        return 'border-blue-500/50';
      case 'optimization':
        return 'border-yellow-500/50';
      default:
        return 'border-purple-500/50';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="flex items-center gap-2">
              AI智能洞察引擎
              <Badge variant="outline" className="gap-1 text-xs">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                实时分析
              </Badge>
            </h2>
            <p className="text-sm text-slate-400">基于深度学习的预测性分析与优化建议</p>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`bg-slate-800/50 border-2 cursor-pointer transition-all hover:bg-slate-800 ${
                selectedInsight?.id === insight.id
                  ? getInsightBorder(insight.type)
                  : 'border-slate-700'
              }`}
              onClick={() => setSelectedInsight(insight)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getInsightColor(insight.type)}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm">{insight.title}</h3>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {insight.confidence}% 置信度
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{insight.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {insight.impact}
                      </Badge>
                      {selectedInsight?.id === insight.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-1 text-xs text-cyan-400"
                        >
                          <span>查看详情</span>
                          <ChevronRight className="w-3 h-3" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Actions */}
                {selectedInsight?.id === insight.id && insight.actions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-slate-700 space-y-2"
                  >
                    <p className="text-xs text-slate-400 mb-2">建议操作：</p>
                    <div className="flex flex-wrap gap-2">
                      {insight.actions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          className="text-xs h-7"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Learning Status */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300">AI持续学习中</span>
        </div>
        <p className="text-xs text-slate-400">
          系统正在分析最新数据，模型准确率持续提升。上次更新: 2分钟前
        </p>
      </div>
    </div>
  );
}
