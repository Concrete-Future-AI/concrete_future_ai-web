import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, TrendingUp, TrendingDown, Zap, DollarSign, Cpu, Brain, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Progress } from './ui/progress';

interface Insight {
  id: number;
  type: 'optimization' | 'warning' | 'prediction' | 'recommendation';
  severity: 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  impact: string;
  action?: string;
  metrics?: { label: string; value: string; change?: string }[];
}

export function IntelligentInsights() {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: 1,
      type: 'warning',
      severity: 'high',
      title: 'GPU集群利用率波动异常',
      description: '检测到过去4小时GPU利用率在45%-95%之间频繁波动，可能存在任务调度不均衡的问题。',
      impact: '可能导致资源浪费和响应延迟增加',
      action: '查看详细调度日志',
      metrics: [
        { label: '峰值利用率', value: '95%', change: '+18%' },
        { label: '谷值利用率', value: '45%', change: '-12%' },
        { label: '波动系数', value: '0.32' }
      ]
    },
    {
      id: 2,
      type: 'optimization',
      severity: 'medium',
      title: '成本优化建议',
      description: 'AI分析发现，通过将部分低优先级任务从H100迁移到A100可节省约23%的成本，同时保持性能在可接受范围内。',
      impact: '预计每月节省 ¥28,600',
      action: '应用优化方案',
      metrics: [
        { label: '当前成本', value: '¥124,580/月' },
        { label: '优化后', value: '¥95,980/月', change: '-23%' },
        { label: '性能损失', value: '<5%' }
      ]
    },
    {
      id: 3,
      type: 'prediction',
      severity: 'medium',
      title: 'Token使用量趋势预测',
      description: '基于过去30天的使用模式，预测本月Token消耗将达到98B，接近100B配额上限。',
      impact: '可能在月底前达到配额限制',
      action: '调整配额或优化使用',
      metrics: [
        { label: '当前使用', value: '72.5B' },
        { label: '预测总量', value: '98B' },
        { label: '配额剩余', value: '2%' }
      ]
    },
    {
      id: 4,
      type: 'recommendation',
      severity: 'info',
      title: '模型升级推荐',
      description: 'DeepSeek-V3模型性价比显著优于当前使用的Llama-3-70B，在相似任务上成本可降低40%，推理速度提升15%。',
      impact: '提升性能并降低成本',
      action: '查看迁移方案',
      metrics: [
        { label: '成本降低', value: '40%' },
        { label: '速度提升', value: '15%' },
        { label: '质量变化', value: '+2%' }
      ]
    },
    {
      id: 5,
      type: 'warning',
      severity: 'low',
      title: '知识库同步延迟',
      description: 'Confluence知识库上次同步距今已超过6小时，可能存在信息更新不及时的风险。',
      impact: 'RAG检索可能返回过时信息',
      action: '立即同步',
      metrics: [
        { label: '上次同步', value: '6.2小时前' },
        { label: '新增文档', value: '估计23篇' }
      ]
    },
    {
      id: 6,
      type: 'optimization',
      severity: 'low',
      title: 'API调用模式优化',
      description: '检测到应用"智问ChatDocs"存在高频短请求模式，建议启用请求批处理以提升吞吐量。',
      impact: '可提升30%吞吐量，降低15%延迟',
      action: '启用批处理',
      metrics: [
        { label: '当前QPS', value: '156' },
        { label: '优化后QPS', value: '203', change: '+30%' },
        { label: '延迟降低', value: '15%' }
      ]
    }
  ]);

  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      // 模拟发现新的洞察
    }, 2000);
  };

  const applyAction = (insight: Insight) => {
    // 模拟应用优化建议
    console.log('应用建议:', insight.action);
  };

  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'optimization':
        return Zap;
      case 'prediction':
        return TrendingUp;
      case 'recommendation':
        return Brain;
      default:
        return Info;
    }
  };

  const getSeverityColor = (severity: Insight['severity']) => {
    switch (severity) {
      case 'high':
        return {
          border: 'border-red-500/30',
          bg: 'bg-red-500/10',
          text: 'text-red-400',
          iconBg: 'bg-red-500/20'
        };
      case 'medium':
        return {
          border: 'border-amber-500/30',
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          iconBg: 'bg-amber-500/20'
        };
      case 'low':
        return {
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          iconBg: 'bg-blue-500/20'
        };
      case 'info':
        return {
          border: 'border-purple-500/30',
          bg: 'bg-purple-500/10',
          text: 'text-purple-400',
          iconBg: 'bg-purple-500/20'
        };
    }
  };

  return (
    <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/20">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-white">AI智能洞察</div>
              <div className="text-xs text-slate-400">基于机器学习的自动分析与优化建议</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-400">
            {insights.length} 条洞察
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={runAnalysis}
            disabled={analyzing}
            className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            {analyzing ? (
              <>
                <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                分析中...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-3 w-3" />
                重新分析
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mb-6 grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <div className="text-xs text-red-400">高优先级</div>
          <div className="mt-1 text-xl text-white">{insights.filter(i => i.severity === 'high').length}</div>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <div className="text-xs text-amber-400">中优先级</div>
          <div className="mt-1 text-xl text-white">{insights.filter(i => i.severity === 'medium').length}</div>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <div className="text-xs text-blue-400">低优先级</div>
          <div className="mt-1 text-xl text-white">{insights.filter(i => i.severity === 'low').length}</div>
        </div>
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <div className="text-xs text-green-400">已处理</div>
          <div className="mt-1 text-xl text-white">12</div>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight, idx) => {
          const Icon = getIcon(insight.type);
          const colors = getSeverityColor(insight.severity);
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className={`rounded-lg border ${colors.border} ${colors.bg} p-4 hover:bg-opacity-80 transition-all cursor-pointer group`}>
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.iconBg} flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-white">{insight.title}</div>
                          <Badge variant="outline" className={`${colors.border} ${colors.bg} ${colors.text} text-xs`}>
                            {insight.type === 'warning' ? '警告' :
                             insight.type === 'optimization' ? '优化' :
                             insight.type === 'prediction' ? '预测' : '推荐'}
                          </Badge>
                        </div>
                        <div className="mt-1 text-sm text-slate-400">{insight.description}</div>
                      </div>
                    </div>

                    {insight.metrics && (
                      <div className="grid grid-cols-3 gap-3">
                        {insight.metrics.map((metric, idx) => (
                          <div key={idx} className="rounded border border-slate-700 bg-slate-900/50 p-2">
                            <div className="text-xs text-slate-500">{metric.label}</div>
                            <div className="mt-1 flex items-baseline gap-1">
                              <span className="text-sm text-white">{metric.value}</span>
                              {metric.change && (
                                <span className={`text-xs ${
                                  metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                                }`}>
                                  {metric.change}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <DollarSign className="h-3 w-3" />
                        <span>{insight.impact}</span>
                      </div>
                      {insight.action && (
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${colors.border} ${colors.bg} ${colors.text} hover:bg-opacity-100 opacity-0 group-hover:opacity-100 transition-opacity`}
                          onClick={() => applyAction(insight)}
                        >
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Analysis Info */}
      <div className="mt-6 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
        <div className="flex items-start gap-3">
          <Brain className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm text-purple-300">智能分析引擎</div>
            <div className="mt-1 text-xs text-slate-400">
              AI系统持续监控平台运行状态，使用机器学习模型分析历史数据和实时指标，自动发现异常、预测趋势、生成优化建议。
              每小时自动运行一次深度分析，确保您始终掌握平台的最佳运行状态。
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
