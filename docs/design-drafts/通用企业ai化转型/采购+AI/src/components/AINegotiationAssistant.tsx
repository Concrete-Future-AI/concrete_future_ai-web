import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Handshake, TrendingDown, Shield, Target, Sparkles, MessageSquare, Brain, CheckCircle2, AlertCircle, ArrowRight, Lightbulb, DollarSign } from 'lucide-react';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface NegotiationTip {
  id: string;
  type: 'strategy' | 'tactic' | 'warning' | 'opportunity';
  title: string;
  content: string;
  confidence: number;
}

interface PriceAnalysis {
  marketPrice: number;
  yourTarget: number;
  aiSuggestion: number;
  savingsPotential: string;
  confidence: number;
  reasoning: string[];
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  tips?: NegotiationTip[];
}

export default function AINegotiationAssistant() {
  const [targetPrice, setTargetPrice] = useState(850000);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: '您好！我是AI谈判助手。我已分析了该供应商的历史数据和市场行情，准备好协助您进行价格谈判。请告诉我您的目标价格，我将为您制定最佳谈判策略。',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeScenario, setActiveScenario] = useState<'initial' | 'counter' | 'final'>('initial');

  // 价格分析
  const priceAnalysis: PriceAnalysis = {
    marketPrice: 1000000,
    yourTarget: targetPrice,
    aiSuggestion: 880000,
    savingsPotential: '¥120,000',
    confidence: 87,
    reasoning: [
      '该供应商历史成交价格平均在市场价的88%',
      '当前是淡季，供应商更愿意让利成交',
      '您的采购量达到批量折扣门槛',
      '竞争对手报价较低，有议价空间'
    ]
  };

  // 谈判建议
  const negotiationTips: NegotiationTip[] = [
    {
      id: '1',
      type: 'strategy',
      title: '锚定策略',
      content: '首次报价建议低于目标价15%（¥722,500），为后续让步预留空间',
      confidence: 92
    },
    {
      id: '2',
      type: 'tactic',
      title: '分步让价',
      content: '建议分3步让价：第一次+¥50,000，第二次+¥40,000，最后+¥30,000',
      confidence: 88
    },
    {
      id: '3',
      type: 'opportunity',
      title: '价值交换',
      content: '可以提出长期合作承诺（签订框架协议）来换取更大折扣',
      confidence: 85
    },
    {
      id: '4',
      type: 'warning',
      title: '谨慎提醒',
      content: '该供应商通常在第3轮谈判给出最终价格，不要过早接受第一次报价',
      confidence: 90
    },
  ];

  // 谈判场景模拟
  const scenarios = {
    initial: {
      title: '开场报价',
      supplierResponse: '我们的产品质量有保证，市场价是¥1,000,000，考虑到您是老客户，我们可以给到¥950,000。',
      aiSuggestions: [
        '表达对产品的认可，但强调预算限制',
        '提及竞争对手的更低报价（¥880,000左右）',
        '暗示批量采购和长期合作的可能性'
      ]
    },
    counter: {
      title: '还价阶段',
      supplierResponse: '¥722,500确实太低了，我们的成本就在那里。最多再降到¥920,000，这已经是很大的让步了。',
      aiSuggestions: [
        '肯定供应商的让步，展示谈判诚意',
        '提出¥850,000作为中间价格',
        '强调项目的长期价值和未来合作机会'
      ]
    },
    final: {
      title: '最终确认',
      supplierResponse: '好吧，考虑到长期合作，¥880,000成交。但需要您承诺今年至少3个订单。',
      aiSuggestions: [
        '这个价格已接近最优解，建议接受',
        '可以承诺3个订单，但要求供应商提供质保延期',
        '签订框架协议锁定这个价格'
      ]
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsAnalyzing(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsAnalyzing(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const responses = [
      {
        content: '很好的策略！基于您的报价，我建议强调以下几点：\n\n1. 您的采购量达到了批量优惠标准\n2. 市场上同类产品有更低报价\n3. 愿意签署长期合作协议\n\n预计供应商会还价至¥920,000左右，这是正常的谈判过程。',
        tips: [negotiationTips[0], negotiationTips[2]]
      },
      {
        content: '这个价格已经非常接近我们的AI建议价了！我建议：\n\n1. 接受这个价格\n2. 但要求供应商提供额外价值（如延长质保、优先供货等）\n3. 签订框架协议锁定价格\n\n预计您可以节省¥120,000，达成双赢。',
        tips: [negotiationTips[1], negotiationTips[3]]
      }
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: Date.now().toString(),
      sender: 'ai',
      content: response.content,
      timestamp: new Date(),
      tips: response.tips
    };
  };

  const handleScenarioPlay = (scenario: 'initial' | 'counter' | 'final') => {
    setActiveScenario(scenario);
    const scenarioData = scenarios[scenario];
    
    toast.info('场景切换', {
      description: `已切换到：${scenarioData.title}`
    });
  };

  const handleApplySuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
    toast.success('建议已应用', {
      description: '您可以直接发送或编辑后发送'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl ai-gradient flex items-center justify-center ai-glow">
            <Handshake className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">AI谈判助手</h3>
            <p className="text-sm text-muted-foreground">实时策略建议，助您达成最优协议</p>
          </div>
        </div>
        <Badge className="ai-gradient text-white border-0">
          <Brain className="h-3 w-3 mr-1" />
          AI驱动
        </Badge>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="assistant" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assistant">智能助手</TabsTrigger>
          <TabsTrigger value="analysis">价格分析</TabsTrigger>
          <TabsTrigger value="simulation">场景模拟</TabsTrigger>
        </TabsList>

        {/* AI Assistant Tab */}
        <TabsContent value="assistant" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="elevation-2 border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">实时对话助手</CardTitle>
                  <CardDescription>描述谈判情况，AI将给出策略建议</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {msg.sender === 'ai' && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="ai-gradient text-white">
                                AI
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`max-w-[80%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-3 rounded-lg ${
                              msg.sender === 'user' 
                                ? 'bg-primary text-primary-foreground ml-auto' 
                                : 'surface-variant'
                            }`}>
                              <p className="text-sm whitespace-pre-line">{msg.content}</p>
                            </div>
                            
                            {msg.tips && msg.tips.length > 0 && (
                              <div className="space-y-2 w-full">
                                {msg.tips.map((tip) => (
                                  <div key={tip.id} className="p-3 surface-variant rounded-lg border-l-2 border-purple-500">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Lightbulb className="h-3 w-3 text-purple-500" />
                                      <span className="text-xs font-medium">{tip.title}</span>
                                      <Badge variant="outline" className="text-xs ml-auto">
                                        {tip.confidence}%
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{tip.content}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {msg.sender === 'user' && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>你</AvatarFallback>
                            </Avatar>
                          )}
                        </motion.div>
                      ))}
                      
                      {isAnalyzing && (
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="ai-gradient text-white">AI</AvatarFallback>
                          </Avatar>
                          <div className="p-3 surface-variant rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="ai-pulse">
                                <Sparkles className="h-4 w-4 text-purple-500" />
                              </div>
                              <span className="text-sm text-muted-foreground">AI正在分析...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder="描述谈判情况或提出问题..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} className="ai-gradient text-white border-0">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tips Panel */}
            <div className="space-y-4">
              <Card className="elevation-2 border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">谈判策略建议</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {negotiationTips.map((tip, index) => (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 surface-variant rounded-lg space-y-2 hover-lift cursor-pointer"
                      onClick={() => handleApplySuggestion(tip.content)}
                    >
                      <div className="flex items-center gap-2">
                        {tip.type === 'strategy' && <Target className="h-4 w-4 text-blue-500" />}
                        {tip.type === 'tactic' && <Lightbulb className="h-4 w-4 text-yellow-500" />}
                        {tip.type === 'opportunity' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        {tip.type === 'warning' && <AlertCircle className="h-4 w-4 text-orange-500" />}
                        <span className="text-sm font-medium flex-1">{tip.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {tip.confidence}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{tip.content}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="elevation-2 border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">快速建议</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm"
                    onClick={() => setInputMessage('供应商报价¥950,000，我该怎么还价？')}
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    供应商首次报价应对
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm"
                    onClick={() => setInputMessage('我出¥850,000，供应商说太低了，怎么办？')}
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    价格分歧如何处理
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm"
                    onClick={() => setInputMessage('谈判陷入僵局，有什么破局方法？')}
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    僵局破解策略
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Price Analysis Tab */}
        <TabsContent value="analysis" className="space-y-4 mt-4">
          <Card className="elevation-2 border-0">
            <CardHeader>
              <CardTitle className="text-base">AI价格分析</CardTitle>
              <CardDescription>基于市场数据和历史成交的智能定价建议</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price Comparison */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 surface-variant rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">市场价格</p>
                  <p className="text-2xl font-bold">¥{(priceAnalysis.marketPrice / 10000).toFixed(0)}万</p>
                  <Badge variant="outline" className="mt-2">基准价</Badge>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg text-center border border-purple-100">
                  <p className="text-sm text-muted-foreground mb-2">AI建议价格</p>
                  <p className="text-2xl font-bold text-purple-600">¥{(priceAnalysis.aiSuggestion / 10000).toFixed(0)}万</p>
                  <Badge className="mt-2 ai-gradient text-white border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    推荐
                  </Badge>
                </div>
                <div className="p-4 surface-variant rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">节省金额</p>
                  <p className="text-2xl font-bold text-green-600">{priceAnalysis.savingsPotential}</p>
                  <Badge variant="outline" className="mt-2 bg-green-500/10 text-green-700 border-green-200">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -12%
                  </Badge>
                </div>
              </div>

              {/* Target Price Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">调整目标价格</label>
                  <span className="text-lg font-bold text-purple-600">
                    ¥{(targetPrice / 10000).toFixed(1)}万
                  </span>
                </div>
                <Slider
                  value={[targetPrice]}
                  onValueChange={([value]) => setTargetPrice(value)}
                  min={700000}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>¥70万</span>
                  <span>¥100万</span>
                </div>
              </div>

              {/* Confidence */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">AI置信度</span>
                  <span className="text-sm text-purple-600">{priceAnalysis.confidence}%</span>
                </div>
                <Progress value={priceAnalysis.confidence} className="h-2" />
              </div>

              {/* AI Reasoning */}
              <div className="p-4 surface-variant rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  <span className="font-medium text-sm">AI分析依据</span>
                </div>
                <ul className="space-y-2">
                  {priceAnalysis.reasoning.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="flex-1 ai-gradient text-white border-0">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  采纳AI建议
                </Button>
                <Button variant="outline" className="flex-1">
                  查看详细报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Simulation Tab */}
        <TabsContent value="simulation" className="space-y-4 mt-4">
          <div className="flex gap-2 mb-4">
            {(['initial', 'counter', 'final'] as const).map((scenario) => (
              <Button
                key={scenario}
                variant={activeScenario === scenario ? 'default' : 'outline'}
                onClick={() => handleScenarioPlay(scenario)}
                className="flex-1"
              >
                {scenarios[scenario].title}
              </Button>
            ))}
          </div>

          <Card className="elevation-2 border-0">
            <CardHeader>
              <CardTitle className="text-base">{scenarios[activeScenario].title}</CardTitle>
              <CardDescription>模拟真实谈判场景，练习应对策略</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Supplier Response */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      供
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">供应商说：</span>
                </div>
                <p className="text-sm">{scenarios[activeScenario].supplierResponse}</p>
              </div>

              {/* AI Suggestions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="font-medium text-sm">AI策略建议</span>
                </div>
                {scenarios[activeScenario].aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 surface-variant rounded-lg hover-lift cursor-pointer"
                    onClick={() => handleApplySuggestion(suggestion)}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600 font-medium flex-shrink-0">{index + 1}.</span>
                      <p className="text-sm flex-1">{suggestion}</p>
                      <Button size="sm" variant="ghost">
                        应用
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Your Response */}
              <div className="space-y-2">
                <label className="text-sm font-medium">您的回应</label>
                <Textarea
                  placeholder="输入您的谈判回应..."
                  className="min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button className="ai-gradient text-white border-0">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI评估回应
                  </Button>
                  <Button variant="outline">
                    下一轮谈判
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
