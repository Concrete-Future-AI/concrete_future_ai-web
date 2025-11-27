import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Zap,
  Target,
  Users,
  RefreshCw,
  ChevronRight,
  Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { toast } from "sonner@2.0.3";

export function AIPredictiveAnalytics() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // AI预测的组织指标趋势
  const engagementForecast = [
    { month: '7月', actual: 75, predicted: null, confidence: null },
    { month: '8月', actual: 76, predicted: null, confidence: null },
    { month: '9月', actual: 78, predicted: null, confidence: null },
    { month: '10月', actual: 77, predicted: null, confidence: null },
    { month: '11月', actual: null, predicted: 79, confidence: 88 },
    { month: '12月', actual: null, predicted: 81, confidence: 85 },
    { month: '1月', actual: null, predicted: 82, confidence: 80 },
    { month: '2月', actual: null, predicted: 83, confidence: 75 },
  ];

  const turnoverForecast = [
    { month: '7月', actual: 3.2, predicted: null, baseline: 5 },
    { month: '8月', actual: 3.8, predicted: null, baseline: 5 },
    { month: '9月', actual: 4.5, predicted: null, baseline: 5 },
    { month: '10月', actual: 5.2, predicted: null, baseline: 5 },
    { month: '11月', actual: null, predicted: 6.8, baseline: 5 },
    { month: '12月', actual: null, predicted: 7.5, baseline: 5 },
    { month: '1月', actual: null, predicted: 6.2, baseline: 5 },
    { month: '2月', actual: null, predicted: 5.8, baseline: 5 },
  ];

  const productivityForecast = [
    { month: '7月', actual: 82, predicted: null },
    { month: '8月', actual: 85, predicted: null },
    { month: '9月', actual: 87, predicted: null },
    { month: '10月', actual: 86, predicted: null },
    { month: '11月', actual: null, predicted: 88 },
    { month: '12月', actual: null, predicted: 90 },
    { month: '1月', actual: null, predicted: 92 },
    { month: '2月', actual: null, predicted: 91 },
  ];

  // AI检测到的异常
  const anomalies = [
    {
      id: 1,
      metric: '研发部门敬业度',
      severity: 'high',
      change: -13,
      description: '研发部门敬业度在过去30天内下降13%，远超正常波动范围（±5%）',
      confidence: 94,
      rootCauses: [
        { factor: '工作负荷增加', contribution: 45, evidence: '平均加班时长增加28%' },
        { factor: '跨部门协作减少', contribution: 30, evidence: '跨团队会议频率下降20%' },
        { factor: '项目延期压力', contribution: 25, evidence: '2个核心项目延期超过2周' }
      ],
      recommendations: [
        { action: '紧急调配资源', priority: 'high', impact: '预计可减轻35%工作压力' },
        { action: '组织团队建设活动', priority: 'medium', impact: '预计可提升15%团队凝聚力' },
        { action: '优化项目排期', priority: 'medium', impact: '预计可降低30%延期风险' }
      ]
    },
    {
      id: 2,
      metric: '销售部门离职倾向',
      severity: 'medium',
      change: 22,
      description: 'AI模型检测到销售部门5名员工的离职风险指数显著上升',
      confidence: 87,
      rootCauses: [
        { factor: '薪酬竞争力下降', contribution: 50, evidence: '市场薪酬涨幅10%，内部涨幅仅3%' },
        { factor: '业绩目标压力', contribution: 35, evidence: 'Q3目标完成率仅65%' },
        { factor: '晋升机会受限', contribution: 15, evidence: '过去6个月无内部晋升' }
      ],
      recommendations: [
        { action: '启动薪酬调研', priority: 'high', impact: '预计可挽留80%高风险员工' },
        { action: '调整Q4业绩目标', priority: 'medium', impact: '预计可提升20%达成率' },
        { action: '开放内部晋升通道', priority: 'medium', impact: '预计可提升团队士气' }
      ]
    },
    {
      id: 3,
      metric: '招聘效率',
      severity: 'low',
      change: 15,
      description: '平均招聘周期延长15天，AI分析发现流程瓶颈',
      confidence: 91,
      rootCauses: [
        { factor: '面试官日程冲突', contribution: 60, evidence: '平均安排面试时间延长8天' },
        { factor: '候选人流失率上升', contribution: 25, evidence: '接受率从85%降至70%' },
        { factor: '审批流程延迟', contribution: 15, evidence: 'Offer审批平均耗时5天' }
      ],
      recommendations: [
        { action: '引入智能排程系统', priority: 'high', impact: '预计可缩短50%排期时间' },
        { action: '优化候选人体验', priority: 'medium', impact: '预计可提升15%接受率' },
        { action: '简化审批流程', priority: 'low', impact: '预计可节省3天' }
      ]
    }
  ];

  // AI预测的关键洞察
  const predictions = [
    {
      id: 1,
      title: '人才流失高峰预警',
      timeframe: '未来3个月',
      prediction: '预测11-12月将出现人才流失小高峰，离职率可能达到7.5%',
      confidence: 86,
      impact: 'high',
      reasoning: '基于历史数据、年终奖发放周期、市场招聘活跃度等12个因素综合分析',
      preventiveActions: [
        '提前启动关键人才保留对话',
        '加快年终奖发放进度',
        '推出职业发展计划',
        '改善工作环境和福利'
      ]
    },
    {
      id: 2,
      title: '研发人才需求激增',
      timeframe: '未来6个月',
      prediction: '基于业务增长计划，预计需要新增15-20名技术人才',
      confidence: 92,
      impact: 'high',
      reasoning: '结合产品路线图、项目规划、当前人效比和历史增长数据',
      preventiveActions: [
        '立即启动校招和社招渠道',
        '建立技术人才储备库',
        '提升雇主品牌曝光',
        '优化面试流程和体验'
      ]
    },
    {
      id: 3,
      title: '敬业度回升趋势',
      timeframe: '未来2个月',
      prediction: '如保持当前改善措施，敬业度有望从77分提升至81-83分',
      confidence: 88,
      impact: 'medium',
      reasoning: '弹性工作制和学习激励政策的积极反馈已开始显现',
      preventiveActions: [
        '继续推进弹性工作制',
        '扩大学习激励覆盖面',
        '定期收集员工反馈',
        '分享成功案例激励其他部门'
      ]
    }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("AI分析完成", {
        description: "已生成最新的预测分析报告"
      });
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-gray-900">AI预测性分析</h3>
          </div>
          <p className="text-sm text-gray-600">基于机器学习的组织健康预测与异常检测</p>
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
          {isAnalyzing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
              </motion.div>
              AI分析中...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              重新分析
            </>
          )}
        </Button>
      </div>

      {/* AI Processing Animation */}
      {isAnalyzing && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="py-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">正在分析24个月历史数据...</span>
                <span className="text-sm text-purple-600">100%</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">运行预测模型 (LSTM + XGBoost)...</span>
                <span className="text-sm text-purple-600">87%</span>
              </div>
              <Progress value={87} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">检测异常模式...</span>
                <span className="text-sm text-purple-600">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Anomaly Detection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                实时异常检测
              </CardTitle>
              <CardDescription>AI持续监控组织健康指标，自动识别异常模式</CardDescription>
            </div>
            <Badge className="bg-orange-100 text-orange-700">
              检测到 {anomalies.length} 个异常
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {anomalies.map((anomaly, idx) => (
            <motion.div
              key={anomaly.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`border-2 ${getSeverityColor(anomaly.severity)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity === 'high' ? '高风险' : anomaly.severity === 'medium' ? '中风险' : '低风险'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          AI置信度 {anomaly.confidence}%
                        </Badge>
                      </div>
                      <h4 className="text-gray-900 mb-1">{anomaly.metric}</h4>
                      <p className="text-sm text-gray-600">{anomaly.description}</p>
                    </div>
                    <motion.div
                      className="ml-4"
                      animate={{ rotate: selectedMetric === anomaly.metric ? 90 : 0 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedMetric(selectedMetric === anomaly.metric ? null : anomaly.metric)}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {selectedMetric === anomaly.metric && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="border-t pt-4 space-y-4">
                        {/* Root Causes */}
                        <div>
                          <p className="text-sm text-gray-700 mb-3">🔍 AI识别的根本原因：</p>
                          <div className="space-y-2">
                            {anomaly.rootCauses.map((cause, idx) => (
                              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-gray-900">{cause.factor}</span>
                                  <Badge variant="outline" className="text-xs">
                                    贡献度 {cause.contribution}%
                                  </Badge>
                                </div>
                                <Progress value={cause.contribution} className="h-1.5 mb-2" />
                                <p className="text-xs text-gray-600">💡 {cause.evidence}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div>
                          <p className="text-sm text-gray-700 mb-3">✨ AI推荐的改进措施：</p>
                          <div className="space-y-2">
                            {anomaly.recommendations.map((rec, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-3 bg-teal-50 rounded-lg p-3"
                              >
                                <Target className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm text-gray-900">{rec.action}</span>
                                    <Badge 
                                      className={`text-xs ${
                                        rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-blue-100 text-blue-700'
                                      }`}
                                    >
                                      {rec.priority === 'high' ? '高优先级' : rec.priority === 'medium' ? '中优先级' : '低优先级'}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-600">{rec.impact}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full" size="sm">
                          <Activity className="h-4 w-4 mr-2" />
                          创建改进行动计划
                        </Button>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Trend Predictions */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">敬业度预测</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={engagementForecast}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A99D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A99D" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B68EE" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7B68EE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[70, 85]} />
                <Tooltip />
                <Area type="monotone" dataKey="actual" stroke="#00A99D" fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="predicted" stroke="#7B68EE" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                预计上升至83分
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">离职率预测</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={turnoverForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 10]} />
                <Tooltip />
                <ReferenceLine y={5} stroke="#ef4444" strokeDasharray="3 3" label={{ value: '警戒线', fontSize: 10 }} />
                <Line type="monotone" dataKey="actual" stroke="#00A99D" strokeWidth={2} />
                <Line type="monotone" dataKey="predicted" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                预警：将超警戒线
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">生产力预测</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={productivityForecast}>
                <defs>
                  <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[75, 95]} />
                <Tooltip />
                <Area type="monotone" dataKey="actual" stroke="#10b981" fillOpacity={1} fill="url(#colorProductivity)" />
                <Area type="monotone" dataKey="predicted" stroke="#10b981" strokeDasharray="5 5" fillOpacity={0.3} fill="url(#colorProductivity)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                持续改善中
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Future Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            AI预测洞察
          </CardTitle>
          <CardDescription>基于深度学习模型的未来趋势预测</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictions.map((prediction, idx) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-2 border-purple-200 bg-purple-50/50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      prediction.impact === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      {prediction.impact === 'high' ? 
                        <AlertTriangle className="h-5 w-5 text-red-600" /> :
                        <Target className="h-5 w-5 text-yellow-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900">{prediction.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {prediction.timeframe}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700">
                          置信度 {prediction.confidence}%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{prediction.prediction}</p>
                      <p className="text-xs text-gray-600 mb-3">📊 {prediction.reasoning}</p>
                      
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-700 mb-2">🎯 AI建议的预防措施：</p>
                        <ul className="space-y-1">
                          {prediction.preventiveActions.map((action, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                              <span className="text-purple-500 mt-0.5">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
