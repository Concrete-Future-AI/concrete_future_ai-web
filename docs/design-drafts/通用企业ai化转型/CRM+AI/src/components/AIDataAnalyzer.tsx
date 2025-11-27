import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BarChart3,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Zap,
  Target,
  Users,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Activity,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface AnalysisResult {
  metric: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  insight: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

export default function AIDataAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const analysisResults: AnalysisResult[] = [
    {
      metric: '线索转化率',
      value: '18.5%',
      change: -3.2,
      trend: 'down',
      insight: 'AI检测到线索转化率下降3.2%，主要原因是新线索的跟进时间延长了2天',
      recommendation: '建议：启用AI自动跟进功能，将首次联系时间缩短到24小时内',
      priority: 'high'
    },
    {
      metric: '平均交易周期',
      value: '32天',
      change: 5.8,
      trend: 'down',
      insight: 'AI发现通过优化销售流程，交易周期缩短了5.8天，主要得益于AI会议准备功能',
      recommendation: '建议：在更多交易中应用AI会议准备，预计可进一步缩短5-7天',
      priority: 'medium'
    },
    {
      metric: '客户响应率',
      value: '42%',
      change: 8.3,
      trend: 'up',
      insight: 'AI邮件助手使客户响应率提升了8.3%，个性化内容效果显著',
      recommendation: '建议：将AI邮件使用率从60%提升到90%，预计响应率可达50%+',
      priority: 'high'
    },
    {
      metric: '团队活动量',
      value: '245/周',
      change: -12.0,
      trend: 'down',
      insight: 'AI注意到团队整体活动量下降12%，可能影响线索培育效果',
      recommendation: '建议：设置AI活动提醒，确保每个线索每周至少有2次互动',
      priority: 'high'
    },
    {
      metric: '高价值线索占比',
      value: '23%',
      change: 4.5,
      trend: 'up',
      insight: 'AI Velocity Score帮助识别更多高价值线索，占比提升4.5%',
      recommendation: '建议：继续优化评分模型，关注新的行为信号',
      priority: 'medium'
    },
    {
      metric: '销售预测准确率',
      value: '92%',
      change: 2.0,
      trend: 'up',
      insight: 'AI预测模型持续学习，准确率提升到92%，已接近行业最佳水平',
      recommendation: '建议：基于高准确率的预测，可以更自信地制定销售策略',
      priority: 'low'
    }
  ];

  const correlationAnalysis = [
    {
      factor: 'AI功能使用率',
      correlation: 0.85,
      impact: '使用AI功能越多的销售，成交率提升35%'
    },
    {
      factor: '首次响应时间',
      correlation: -0.78,
      impact: '24小时内响应的线索，转化率提升2.3倍'
    },
    {
      factor: '会议准备完整度',
      correlation: 0.72,
      impact: '使用AI会议准备的交易，成功率提升28%'
    },
    {
      factor: '邮件个性化程度',
      correlation: 0.69,
      impact: 'AI生成的个性化邮件，打开率提升40%'
    }
  ];

  const predictiveInsights = [
    {
      prediction: '基于当前趋势，本季度有87%的概率超额完成目标',
      confidence: 87,
      icon: TrendingUp,
      color: 'teal'
    },
    {
      prediction: '预计下个月会有3-5个大单签约，总金额约¥280万',
      confidence: 82,
      icon: DollarSign,
      color: 'green'
    },
    {
      prediction: '有2个交易存在流失风险，建议本周内采取行动',
      confidence: 91,
      icon: AlertCircle,
      color: 'red'
    },
    {
      prediction: '团队活动量趋势预示下周可能出现瓶颈',
      confidence: 76,
      icon: Activity,
      color: 'orange'
    }
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setShowResults(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResults(true);
          toast.success('AI分析完成！发现了多个优化机会');
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-teal-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'medium':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-0 rounded-full">高优先级</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-700 border-0 rounded-full">中优先级</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-700 border-0 rounded-full">低优先级</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-neutral-900">AI数据分析</h3>
                <p className="text-sm text-neutral-500">深度分析业务数据，发现隐藏的机会和风险</p>
              </div>
            </div>
          </div>
          <Button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                开始AI分析
              </>
            )}
          </Button>
        </div>

        {isAnalyzing && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-700">分析进度</span>
              <span className="text-sm text-indigo-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <div className="text-xs text-indigo-600">扫描数据...</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <div className="text-xs text-purple-600">识别模式...</div>
              </div>
              <div className="p-3 bg-teal-50 rounded-xl">
                <div className="text-xs text-teal-600">生成洞察...</div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* 分析结果 */}
      <AnimatePresence>
        {showResults && (
          <>
            {/* 关键指标分析 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-0 shadow-sm rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-neutral-900">关键指标分析</h3>
                  <Badge className="bg-indigo-100 text-indigo-700 border-0 rounded-full ml-auto">
                    {analysisResults.filter(r => r.priority === 'high').length} 个高优先级
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {analysisResults.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedMetric === result.metric
                          ? 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-purple-50'
                          : 'border-neutral-200 bg-white hover:border-indigo-200'
                      }`}
                      onClick={() => setSelectedMetric(result.metric)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-xs text-neutral-500 mb-1">{result.metric}</div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-neutral-900">{result.value}</h4>
                            {getTrendIcon(result.trend)}
                          </div>
                        </div>
                        {getPriorityBadge(result.priority)}
                      </div>

                      <div className={`p-3 rounded-lg ${result.change >= 0 ? 'bg-teal-50' : 'bg-red-50'} mb-3`}>
                        <div className="text-xs text-neutral-600 mb-1">变化</div>
                        <div className={`text-sm ${result.change >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
                          {result.change > 0 ? '+' : ''}{result.change}%
                        </div>
                      </div>

                      {selectedMetric === result.metric && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2 pt-3 border-t"
                        >
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Eye className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-xs text-blue-700 mb-1">AI洞察</div>
                                <p className="text-xs text-blue-900">{result.insight}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-xs text-purple-700 mb-1">AI建议</div>
                                <p className="text-xs text-purple-900">{result.recommendation}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* 相关性分析 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-sm rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-purple-600" />
                  <h3 className="text-neutral-900">相关性分析</h3>
                  <span className="text-xs text-neutral-500 ml-auto">
                    AI识别出影响业绩的关键因素
                  </span>
                </div>

                <div className="space-y-3">
                  {correlationAnalysis.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-neutral-900">{item.factor}</h4>
                        <Badge className="bg-purple-100 text-purple-700 border-0 rounded-full">
                          相关性: {(item.correlation * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <Progress value={Math.abs(item.correlation) * 100} className="h-2 mb-2" />
                      <p className="text-xs text-purple-700">{item.impact}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* 预测性洞察 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-sm rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <h3 className="text-neutral-900">预测性洞察</h3>
                  <Badge className="bg-teal-100 text-teal-700 border-0 rounded-full ml-auto">
                    基于AI预测模型
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {predictiveInsights.map((insight, idx) => {
                    const Icon = insight.icon;
                    return (
                      <div
                        key={idx}
                        className={`p-4 bg-gradient-to-br from-${insight.color}-50 to-${insight.color}-100 rounded-xl border border-${insight.color}-200`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl bg-${insight.color}-100 flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${insight.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-neutral-900 mb-2">{insight.prediction}</p>
                            <div className="flex items-center gap-2">
                              <Progress value={insight.confidence} className="h-1.5 flex-1" />
                              <span className="text-xs text-neutral-600">{insight.confidence}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* 行动建议 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-sm rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <h3 className="text-neutral-900">AI推荐行动</h3>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm text-red-900 mb-1">立即行动（高优先级）</h4>
                        <p className="text-xs text-red-700">
                          针对4个关键指标下降的问题，立即启用AI自动跟进和活动提醒功能
                        </p>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 rounded-lg text-white">
                        执行
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm text-orange-900 mb-1">本周完成（中优先级）</h4>
                        <p className="text-xs text-orange-700">
                          将AI邮件助手使用率从60%提升到90%，预计可带来显著改善
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        计划
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm text-blue-900 mb-1">持续优化（低优先级）</h4>
                        <p className="text-xs text-blue-700">
                          继续优化AI评分模型和预测算法，保持高准确率
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        查看
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 导出按钮 */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                导出完整分析报告
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl" onClick={startAnalysis}>
                <RefreshCw className="w-4 h-4 mr-2" />
                重新分析
              </Button>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
