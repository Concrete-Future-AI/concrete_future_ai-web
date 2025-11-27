import { useState, useEffect } from 'react';
import { Brain, Sparkles, Send, Mic, StopCircle, Loader2, TrendingUp, AlertTriangle, FileText, BarChart3, Calculator, Lightbulb, CheckCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  type?: 'text' | 'analysis' | 'chart' | 'suggestion';
  data?: any;
  thinking?: string[];
}

interface QuickAction {
  id: string;
  icon: any;
  label: string;
  prompt: string;
  category: 'analysis' | 'prediction' | 'optimization' | 'report';
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    icon: TrendingUp,
    label: '分析现金流趋势',
    prompt: '请分析最近3个月的现金流趋势，并预测下个月的情况',
    category: 'analysis'
  },
  {
    id: '2',
    icon: AlertTriangle,
    label: '识别财务风险',
    prompt: '帮我识别当前最紧急的财务风险，并提供应对方案',
    category: 'analysis'
  },
  {
    id: '3',
    icon: Calculator,
    label: '优化成本结构',
    prompt: '分析我的成本结构，给出优化建议和预期收益',
    category: 'optimization'
  },
  {
    id: '4',
    icon: FileText,
    label: '生成财务报告',
    prompt: '生成本月财务执行情况报告，包含关键指标和异常说明',
    category: 'report'
  },
  {
    id: '5',
    icon: BarChart3,
    label: '预测季度业绩',
    prompt: '基于当前数据，预测本季度收入和利润，并分析关键驱动因素',
    category: 'prediction'
  },
  {
    id: '6',
    icon: Lightbulb,
    label: '智能决策建议',
    prompt: '基于当前财务状况，给我3个最重要的经营决策建议',
    category: 'optimization'
  }
];

const aiResponses = {
  cashflow: {
    thinking: [
      '正在读取最近3个月的现金流数据...',
      '分析收入和支出模式...',
      '识别季节性波动和异常值...',
      '应用时间序列预测模型...',
      '生成预测结果和置信区间...'
    ],
    content: `基于对最近3个月现金流的深度分析，我发现以下关键洞察：

📊 **趋势分析**
• 现金流入：呈现稳定增长态势，月均增长率12.5%
• 现金流出：相对稳定，波动范围在±5%以内
• 净现金流：持续为正，健康度良好

⚠️ **关键发现**
1. 9月应收账款回收周期延长至52天（正常为45天）
2. 10月营销费用同比增加35%，需要关注ROI
3. 供应商付款周期从30天延长到35天，改善了短期现金流

🔮 **下月预测（置信度94%）**
• 预计现金流入：¥7,850万（±8%）
• 预计现金流出：¥5,200万（±5%）
• 预计净流入：¥2,650万

💡 **行动建议**
1. 加速9月应收账款催收，可改善现金流¥380万
2. 建议将10%营销预算转向ROI更高的数字渠道
3. 保持当前供应商付款策略，但需确保关系稳定`,
    data: {
      metrics: [
        { label: '预测准确率', value: '94%', trend: 'up' },
        { label: '现金流健康度', value: '优秀', trend: 'stable' },
        { label: '风险等级', value: '低', trend: 'down' }
      ]
    }
  },
  risk: {
    thinking: [
      '扫描所有财务指标和交易数据...',
      '运行风险识别算法...',
      '评估每个风险的严重程度...',
      '生成应对方案...',
      '计算预期影响...'
    ],
    content: `通过AI风险扫描系统，识别出以下需要关注的财务风险：

🔴 **高优先级风险（需立即处理）**

1. **应收账款集中度过高**
   • 风险评分：85/100
   • 前3大客户占应收账款的68%
   • 如果其中一个客户延迟付款，将影响月度现金流20%
   • **建议**：与这些客户重新协商付款条款，考虑应收账款保理

2. **汇率敞口风险**
   • 风险评分：78/100
   • 未对冲的美元应付账款¥3,200万
   • 近期美元波动加剧，可能造成¥150-250万汇兑损失
   • **建议**：立即对50%敞口进行远期锁汇

🟡 **中优先级风险（1周内处理）**

3. **供应商集中度风险**
   • 风险评分：62/100
   • 需分散至少2个替代供应商

4. **存货周转放缓**
   • 风险评分：58/100
   • 库存周转天数从45天增至55天

📊 **风险总览**
• 识别风险总数：12个
• 高危：2个 | 中危：4个 | 低危：6个
• 预计潜在损失：¥480-750万（如不处理）
• 通过建议措施可避免：85%损失`,
    data: {
      metrics: [
        { label: '风险数量', value: '12', trend: 'down' },
        { label: '高危风险', value: '2', trend: 'stable' },
        { label: '可避免损失', value: '85%', trend: 'up' }
      ]
    }
  },
  cost: {
    thinking: [
      '分析成本结构和历史数据...',
      '识别成本优化机会...',
      '模拟不同优化方案...',
      '计算预期收益和实施难度...',
      '生成优化路线图...'
    ],
    content: `AI成本优化分析完成，为你识别出以下优化机会：

💰 **高价值优化机会（预计年节省¥850万）**

1. **云服务费用优化** - 预计节省¥320万/年
   • 当前支出：¥680万/年
   • 问题：85%时间服务器利用率<30%
   • 方案：采用弹性伸缩+预留实例，优化资源配置
   • 实施难度：低 | 实施周期：2周

2. **差旅费用管理** - 预计节省¥180万/年
   • 当前支出：¥420万/年
   • 问题：提前订票率仅35%，平均票价高出早鸟价65%
   • 方案：实施差旅提前规划制度+差旅管理系统
   • 实施难度：中 | 实施周期：1个月

3. **供应链成本优化** - 预计节省¥250万/年
   • 通过集中采购和供应商谈判
   • 优化库存管理，减少资金占用
   • 实施难度：中 | 实施周期：2个月

4. **办公费用精简** - 预计节省¥100万/年
   • 能源管理优化、无纸化办公等
   • 实施难度：低 | 实施周期：1个月

📈 **实施路线图**
第1个月：快速实施低难度项目（云服务+办公费用）
第2-3个月：推进中等难度项目（差旅+供应链）
预计ROI：首年回报率 285%`,
    data: {
      metrics: [
        { label: '识别机会', value: '8个', trend: 'stable' },
        { label: '年度节省', value: '¥850万', trend: 'up' },
        { label: '实施ROI', value: '285%', trend: 'up' }
      ]
    }
  }
};

export default function AIAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: '你好！我是财策AI智能助手，具备深度财务分析能力。我可以帮你：\n\n• 📊 实时分析财务数据和趋势\n• 🔮 预测未来业绩和现金流\n• ⚠️ 识别潜在风险和机会\n• 💡 提供智能决策建议\n• 📑 自动生成财务报告\n\n试试下方的快捷操作，或直接告诉我你的需求！',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    const scrollArea = document.getElementById('chat-scroll-area');
    if (scrollArea) {
      const scrollViewport = scrollArea.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages, isThinking]);

  const simulateAIThinking = async (steps: string[], responseData: any) => {
    setIsThinking(true);
    setThinkingSteps(steps);
    setCurrentStep(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsThinking(false);
    setThinkingSteps([]);
    setCurrentStep(0);

    // Add AI response
    const aiMessage: Message = {
      id: Date.now().toString(),
      role: 'ai',
      content: responseData.content,
      timestamp: new Date(),
      type: 'analysis',
      data: responseData.data
    };

    setMessages(prev => [...prev, aiMessage]);
    toast.success('AI分析完成！');
  };

  const handleQuickAction = async (action: QuickAction) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: action.prompt,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI processing
    let responseData;
    if (action.prompt.includes('现金流')) {
      responseData = aiResponses.cashflow;
    } else if (action.prompt.includes('风险')) {
      responseData = aiResponses.risk;
    } else if (action.prompt.includes('成本')) {
      responseData = aiResponses.cost;
    } else {
      responseData = {
        thinking: [
          '正在分析你的请求...',
          '检索相关财务数据...',
          '运行AI分析模型...',
          '生成详细报告...',
          '准备可视化图表...'
        ],
        content: `我已经完成了对"${action.label}"的深度分析。

📊 **关键发现**
• 基于历史数据和当前趋势的综合分析
• 识别出3个关键优化机会
• 预测准确率达到92%以上

💡 **核心建议**
1. 优先关注高价值、低难度的改进项
2. 建立持续监控机制
3. 定期复盘和调整策略

📈 **预期影响**
实施建议后，预计可在3个月内看到显著改善。

需要我详细展开某个方面吗？`,
        data: {
          metrics: [
            { label: '分析维度', value: '15+', trend: 'stable' },
            { label: '数据点', value: '10,000+', trend: 'up' },
            { label: 'AI置信度', value: '92%', trend: 'up' }
          ]
        }
      };
    }

    await simulateAIThinking(responseData.thinking, responseData);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    const thinking = [
      '理解你的问题...',
      '检索相关数据和知识...',
      '进行深度分析...',
      '生成回答...'
    ];

    setIsThinking(true);
    setThinkingSteps(thinking);
    setCurrentStep(0);

    for (let i = 0; i < thinking.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setIsThinking(false);
    setThinkingSteps([]);

    const responses = [
      '基于你的问题，我分析了相关的财务数据。从整体来看，情况符合预期，但有几个方面值得关注...',
      '这是一个很好的问题。根据历史数据和行业标准，我建议你关注以下几个关键指标...',
      '我已经为你生成了详细的分析报告。从数据来看，主要机会在于优化运营效率...',
      '让我帮你分析这个情况。首先，我们需要了解几个关键因素的影响...',
      '根据AI模型的分析，这个指标表现良好。不过我注意到一些潜在的优化空间...'
    ];

    const aiMessage: Message = {
      id: Date.now().toString() + 1,
      role: 'ai',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleVoiceInput = () => {
    setIsVoiceActive(true);
    setVoiceProgress(0);
    toast.info('语音识别已启动，请说话...');

    const interval = setInterval(() => {
      setVoiceProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVoiceActive(false);
          
          // Simulate voice recognition result
          const voiceCommands = [
            '帮我分析一下最近的现金流情况',
            '这个月有哪些需要注意的财务风险',
            '给我看看费用支出的趋势',
            '预测一下下个季度的业绩'
          ];
          
          const recognized = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
          setInput(recognized);
          toast.success('语音识别完成！');
          return 0;
        }
        return prev + 5;
      });
    }, 100);
  };

  const stopVoiceInput = () => {
    setIsVoiceActive(false);
    setVoiceProgress(0);
    toast.info('语音识别已停止');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="border-gray-200 bg-white shadow-sm h-[700px] flex flex-col">
          <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-teal-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    AI 智能财务助手
                    <Badge className="bg-teal-100 text-teal-700 border-teal-200">
                      <Sparkles className="w-3 h-3 mr-1" />
                      实时在线
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    基于大语言模型的专业财务AI助手
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 p-6" id="chat-scroll-area">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-50 text-gray-900 border border-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      
                      {message.data && message.data.metrics && (
                        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-3">
                          {message.data.metrics.map((metric: any, idx: number) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-900">{metric.value}</span>
                                {metric.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-600" />}
                                {metric.trend === 'down' && <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-gray-50 border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                      <span className="text-sm text-gray-700">AI正在思考...</span>
                    </div>
                    <div className="space-y-2">
                      {thinkingSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`text-xs flex items-center gap-2 transition-all ${
                            idx <= currentStep
                              ? 'text-gray-900 opacity-100'
                              : 'text-gray-400 opacity-50'
                          }`}
                        >
                          {idx < currentStep && <CheckCircle className="w-3 h-3 text-teal-600" />}
                          {idx === currentStep && <Loader2 className="w-3 h-3 text-teal-600 animate-spin" />}
                          {idx > currentStep && <div className="w-3 h-3 rounded-full border border-gray-300" />}
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <Progress value={(currentStep / thinkingSteps.length) * 100} className="h-1 mt-3" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {isVoiceActive && (
              <div className="mb-3 bg-white border border-teal-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-700">正在录音...</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={stopVoiceInput}
                    className="border-gray-200"
                  >
                    <StopCircle className="w-4 h-4 mr-1" />
                    停止
                  </Button>
                </div>
                <Progress value={voiceProgress} className="h-1" />
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={isVoiceActive ? stopVoiceInput : handleVoiceInput}
                className={`border-gray-200 ${isVoiceActive ? 'bg-red-50 border-red-200' : ''}`}
                disabled={isThinking}
              >
                {isVoiceActive ? (
                  <StopCircle className="w-4 h-4 text-red-600" />
                ) : (
                  <Mic className="w-4 h-4 text-gray-600" />
                )}
              </Button>
              <Input
                placeholder="输入你的问题..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                disabled={isThinking}
                className="flex-1 border-gray-200"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions Sidebar */}
      <div className="space-y-4">
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              快捷操作
            </CardTitle>
            <CardDescription className="text-gray-600">
              一键启动常用AI分析
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className="w-full justify-start border-gray-200 hover:bg-teal-50 hover:border-teal-300"
                  onClick={() => handleQuickAction(action)}
                  disabled={isThinking}
                >
                  <Icon className="w-4 h-4 mr-2 text-teal-600" />
                  <span className="text-gray-700">{action.label}</span>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gradient-to-br from-teal-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-teal-600" />
              AI 能力
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">深度财务数据分析</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">智能趋势预测</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">风险识别与预警</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">成本优化建议</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">自动报告生成</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">语音交互支持</span>
            </div>
            <Separator className="my-3 bg-gray-200" />
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">今日使用次数</span>
                <span className="text-xs text-gray-900">47 / 无限</span>
              </div>
              <Progress value={47} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}