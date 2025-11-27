import { useState, useEffect } from 'react';
import { Brain, Sparkles, TrendingUp, AlertTriangle, Lightbulb, MessageSquare, Target, Zap, ChevronRight, X, Send, CheckCircle2, XCircle, Info, Bot, BarChart3, Workflow } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AIAssistantPanel from './AIAssistantPanel';
import AIDataExplorer from './AIDataExplorer';
import AIWorkflowAutomation from './AIWorkflowAutomation';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  reasoning: string[];
  relatedMetrics: string[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: '优化应收账款回收策略',
    description: 'AI识别到3个客户的付款模式异常，建议提前7天发送友好提醒，可提升回款速度23%',
    confidence: 94,
    impact: 'high',
    actionable: true,
    reasoning: [
      '基于12个月历史数据分析，这3个客户通常在发送提醒后3-5天内付款',
      '他们的平均账期为45天，当前已达38天',
      '类似策略在过去帮助其他5个客户缩短了平均15天账期'
    ],
    relatedMetrics: ['应收账款周转率', '现金流', 'DSO指标']
  },
  {
    id: '2',
    type: 'risk',
    title: '供应商集中度风险预警',
    description: '前3大供应商占采购额的68%，高于行业平均水平45%，建议分散供应商风险',
    confidence: 89,
    impact: 'high',
    actionable: true,
    reasoning: [
      '当前供应商集中度比行业平均高出51%',
      '已识别出4个潜在替代供应商，价格竞争力相当',
      '历史数据显示，集中度超过60%的企业面临供应链中断风险增加3倍'
    ],
    relatedMetrics: ['供应商风险评分', '采购成本', '供应链健康度']
  },
  {
    id: '3',
    type: 'prediction',
    title: 'Q4现金流预测更新',
    description: '基于最新数据，预计Q4现金流入将达到¥8,200万，比预算高出12%',
    confidence: 96,
    impact: 'medium',
    actionable: false,
    reasoning: [
      '9月实际收入比预测高18%，趋势持续',
      '主要客户续约率达到95%，高于预期',
      '新产品线订单超预期，已确认订单增加¥1,500万'
    ],
    relatedMetrics: ['现金流预测', '收入增长率', '订单转化率']
  },
  {
    id: '4',
    type: 'recommendation',
    title: '费用报销智能批量处理',
    description: '检测到127笔小额报销（<¥500）可启用快速审批通道，预计节省审核时间85%',
    confidence: 92,
    impact: 'medium',
    actionable: true,
    reasoning: [
      '这些小额报销历史审核通过率为98%',
      '平均每笔报销占用审核员5分钟，批量处理可节省10.5小时/周',
      '风险极低：金额小、符合政策、员工信用良好'
    ],
    relatedMetrics: ['审核效率', '员工满意度', '运营成本']
  },
  {
    id: '5',
    type: 'opportunity',
    title: '汇率套保时机建议',
    description: 'AI模型预测美元/人民币汇率将在未来2周内波动至6.95-7.05区间，建议锁定部分远期汇率',
    confidence: 87,
    impact: 'high',
    actionable: true,
    reasoning: [
      '基于宏观经济指标和市场情绪分析',
      '公司Q4有¥3,200万美元应付款项',
      '如在6.98锁定50%敞口，预计可节省外汇成本约¥45万'
    ],
    relatedMetrics: ['汇率风险敞口', '外汇损益', '现金流稳定性']
  }
];

const predictionData = [
  { month: '7月', 实际: 5200, 预测: 5100 },
  { month: '8月', 实际: 5800, 预测: 5600 },
  { month: '9月', 实际: 6500, 预测: 6200 },
  { month: '10月', 实际: null, 预测: 7100 },
  { month: '11月', 实际: null, 预测: 7800 },
  { month: '12月', 实际: null, 预测: 8200 },
];

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>(mockInsights);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'ai',
      content: '你好！我是财策AI智能助手。我可以帮你解释财务数据、分析趋势、提供决策建议。有什么我可以帮助你的吗？',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-teal-600" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'recommendation':
        return <Lightbulb className="w-5 h-5 text-amber-600" />;
      case 'prediction':
        return <Target className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity':
        return 'bg-teal-50 border-teal-200 hover:bg-teal-100';
      case 'risk':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'recommendation':
        return 'bg-amber-50 border-amber-200 hover:bg-amber-100';
      case 'prediction':
        return 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100';
    }
  };

  const getImpactBadgeColor = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleInsightClick = (insight: AIInsight) => {
    setSelectedInsight(insight);
    toast.info(`正在查看AI洞察: ${insight.title}`);
  };

  const handleTakeAction = (insight: AIInsight) => {
    setAiProcessing(true);
    toast.info('AI正在准备执行方案...');
    
    setTimeout(() => {
      setAiProcessing(false);
      toast.success(`已为"${insight.title}"生成执行方案`);
      setSelectedInsight(null);
    }, 2000);
  };

  const handleDismissInsight = (insightId: string) => {
    setInsights(insights.filter(i => i.id !== insightId));
    setSelectedInsight(null);
    toast.success('已忽略该洞察');
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponses = [
        '根据历史数据分析，该指标表现符合预期。我建议您关注应收账款的账龄分布，有2笔账款已超过60天。',
        '这是一个很好的问题。基于我的分析，当前现金流状况良好，但建议您提前规划Q4的资本支出。',
        '我已经为您生成了详细的趋势分析报告。根据过去6个月的数据，收入增长率保持在15-18%之间，符合健康增长模式。',
        '从风险管理角度看，建议您关注汇率波动对利润率的影响。我可以帮您设置实时监控预警。',
        '费用控制方面表现优秀！与同行业相比，您的运营效率高出23%。不过我注意到差旅费用有上升趋势。'
      ];

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleRefreshInsights = () => {
    toast.info('AI正在重新分析数据...');
    setTimeout(() => {
      toast.success('AI洞察已更新');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Branding */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-gray-900">AI 智能中心</h2>
              <Badge className="bg-teal-100 text-teal-700 border-teal-200">
                <Sparkles className="w-3 h-3 mr-1" />
                全功能AI套件
              </Badge>
            </div>
            <p className="text-gray-600">集成AI助手、数据探索、工作流自动化与智能洞察</p>
          </div>
        </div>
      </div>

      {/* AI功能标签页 */}
      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-white p-1 shadow-sm border border-gray-200">
          <TabsTrigger value="insights" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
            <Lightbulb className="w-4 h-4" />
            智能洞察
          </TabsTrigger>
          <TabsTrigger value="assistant" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
            <Bot className="w-4 h-4" />
            AI 对话助手
          </TabsTrigger>
          <TabsTrigger value="explorer" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
            <BarChart3 className="w-4 h-4" />
            数据探索
          </TabsTrigger>
          <TabsTrigger value="workflow" className="gap-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
            <Workflow className="w-4 h-4" />
            工作流自动化
          </TabsTrigger>
        </TabsList>

        {/* 智能洞察 */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Insights List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-gray-200 bg-white shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 mb-1">待处理洞察</p>
                        <p className="text-gray-900">{insights.filter(i => i.actionable).length}</p>
                      </div>
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-teal-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 mb-1">平均置信度</p>
                        <p className="text-gray-900">
                          {Math.round(insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length)}%
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 mb-1">高影响项</p>
                        <p className="text-gray-900">{insights.filter(i => i.impact === 'high').length}</p>
                      </div>
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Insights Cards */}
              <div className="space-y-3">
                {insights.map((insight) => (
                  <Card
                    key={insight.id}
                    className={`border ${getInsightColor(insight.type)} cursor-pointer transition-all shadow-sm hover:shadow-md`}
                    onClick={() => handleInsightClick(insight)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getInsightIcon(insight.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-gray-900">{insight.title}</h4>
                              <Badge className={`${getImpactBadgeColor(insight.impact)} border`}>
                                {insight.impact === 'high' ? '高影响' : insight.impact === 'medium' ? '中影响' : '低影响'}
                              </Badge>
                              {insight.actionable && (
                                <Badge className="bg-teal-100 text-teal-700 border-teal-200">
                                  <Zap className="w-3 h-3 mr-1" />
                                  可执行
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-700 mb-2">{insight.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">AI置信度:</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={insight.confidence} className="w-16 h-2" />
                                  <span className="text-gray-900">{insight.confidence}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Sidebar - AI Predictions Chart */}
            <div className="space-y-4">
              <Card className="border-gray-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    AI 预测模型
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    基于历史数据的智能预测（准确率96%）
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EAECF0" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #EAECF0',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="实际" 
                        stroke="#0E9384" 
                        strokeWidth={2}
                        dot={{ fill: '#0E9384' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="预测" 
                        stroke="#6366F1" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#6366F1' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-gray-200 bg-gradient-to-br from-teal-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Info className="w-5 h-5 text-teal-600" />
                    AI 能力说明
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" />
                    <span className="text-gray-700">实时监控80+财务指标，自动识别异常</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" />
                    <span className="text-gray-700">基于机器学习的现金流预测，准确率96%</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" />
                    <span className="text-gray-700">智能风险评估，提前识别潜在问题</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" />
                    <span className="text-gray-700">自动生成可执行的优化建议</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5" />
                    <span className="text-gray-700">所有决策均提供详细的推理过程</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Insight Detail Modal */}
          {selectedInsight && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-2xl bg-white border-gray-200 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <CardHeader className="border-b border-gray-200 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getInsightIcon(selectedInsight.type)}
                      <div>
                        <CardTitle className="text-gray-900">{selectedInsight.title}</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          {selectedInsight.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedInsight(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <ScrollArea className="flex-1">
                  <CardContent className="p-6 space-y-6">
                    {/* Confidence & Impact */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-600 mb-2 block">AI 置信度</label>
                        <div className="flex items-center gap-3">
                          <Progress value={selectedInsight.confidence} className="flex-1" />
                          <span className="text-gray-900">{selectedInsight.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-600 mb-2 block">影响程度</label>
                        <Badge className={`${getImpactBadgeColor(selectedInsight.impact)} border`}>
                          {selectedInsight.impact === 'high' ? '高影响' : selectedInsight.impact === 'medium' ? '中影响' : '低影响'}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="bg-gray-200" />

                    {/* AI Reasoning */}
                    <div>
                      <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-teal-600" />
                        AI 推理过程
                      </h4>
                      <div className="space-y-2">
                        {selectedInsight.reasoning.map((reason, index) => (
                          <div key={index} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 flex-1">{reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-gray-200" />

                    {/* Related Metrics */}
                    <div>
                      <h4 className="text-gray-900 mb-3">相关指标</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedInsight.relatedMetrics.map((metric, index) => (
                          <Badge key={index} variant="outline" className="bg-white border-gray-200 text-gray-700">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </ScrollArea>

                <div className="border-t border-gray-200 p-4 bg-gray-50 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleDismissInsight(selectedInsight.id)}
                    className="flex-1 border-gray-200 hover:bg-gray-100"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    忽略
                  </Button>
                  {selectedInsight.actionable && (
                    <Button
                      onClick={() => handleTakeAction(selectedInsight)}
                      disabled={aiProcessing}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {aiProcessing ? '处理中...' : '采纳建议'}
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* AI Chat Modal */}
          {showChat && (
            <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  <span>AI 智能助手</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                  className="text-white hover:bg-teal-500"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-3 ${
                          message.role === 'user'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="询问任何财务问题..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-gray-200"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* AI 对话助手 */}
        <TabsContent value="assistant" className="space-y-6">
          <AIAssistantPanel />
        </TabsContent>

        {/* 数据探索 */}
        <TabsContent value="explorer" className="space-y-6">
          <AIDataExplorer />
        </TabsContent>

        {/* 工作流自动化 */}
        <TabsContent value="workflow" className="space-y-6">
          <AIWorkflowAutomation />
        </TabsContent>
      </Tabs>
    </div>
  );
}