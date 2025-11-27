import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Target, Users, Lightbulb, X, Maximize2, Minimize2, Send, Brain, Zap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  action?: string;
  icon: React.ReactNode;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'dashboard' | 'forecast' | 'opportunities' | 'churn';
}

export function AIAssistant({ isOpen, onClose, context = 'dashboard' }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    {
      role: 'ai',
      content: '👋 你好！我是你的AI销售助手。我可以帮助你分析数据、预测趋势、识别机会。有什么我可以帮助你的吗？'
    }
  ]);

  useEffect(() => {
    // Generate context-specific insights
    const contextInsights = generateInsights(context);
    setInsights(contextInsights);
  }, [context]);

  const generateInsights = (ctx: string): AIInsight[] => {
    const baseInsights: Record<string, AIInsight[]> = {
      dashboard: [
        {
          id: '1',
          type: 'prediction',
          title: '本季度目标达成预测',
          description: '基于当前趋势，你有92%的概率达成本季度目标。建议重点关注\"企业软件\"类别的3个高潜力客户。',
          confidence: 92,
          action: '查看详情',
          icon: <Target className="h-4 w-4" />
        },
        {
          id: '2',
          type: 'opportunity',
          title: '发现5个高价值机会',
          description: 'AI识别出5个购买意向强烈的潜在客户，平均成交概率78%，预计总价值¥285万。',
          confidence: 78,
          action: '立即跟进',
          icon: <TrendingUp className="h-4 w-4" />
        },
        {
          id: '3',
          type: 'alert',
          title: '客户流失风险预警',
          description: '检测到3位高价值客户的活跃度下降，建议在48小时内主动联系以降低流失风险。',
          confidence: 85,
          action: '查看客户',
          icon: <Users className="h-4 w-4" />
        }
      ],
      forecast: [
        {
          id: '4',
          type: 'prediction',
          title: '下月销售额预测上调',
          description: '基于最新的市场数据和销售管道分析，下月销售额预测上调15%至¥520万。',
          confidence: 88,
          icon: <TrendingUp className="h-4 w-4" />
        },
        {
          id: '5',
          type: 'recommendation',
          title: '最佳成交时机建议',
          description: '建议在本周三前联系\"云计算服务\"类别的客户，历史数据显示周中成交率提高23%。',
          confidence: 76,
          icon: <Lightbulb className="h-4 w-4" />
        }
      ],
      opportunities: [
        {
          id: '6',
          type: 'opportunity',
          title: 'AI推荐优先跟进客户',
          description: '\"创新科技公司\"购买意向评分达95分，建议优先分配资源跟进。',
          confidence: 95,
          icon: <Target className="h-4 w-4" />
        }
      ],
      churn: [
        {
          id: '7',
          type: 'alert',
          title: '紧急挽留策略建议',
          description: '对于高风险客户\"智慧零售\"，建议提供20%的续约折扣和专属客户经理服务。',
          confidence: 82,
          icon: <Users className="h-4 w-4" />
        }
      ]
    };

    return baseInsights[ctx] || baseInsights.dashboard;
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      const responses = [
        '✨ 我已经分析了相关数据。根据过去30天的趋势，我建议你重点关注\"企业软件\"和\"云计算\"两个类别的客户。这些客户的转化率比平均水平高34%。',
        '🎯 好的！我为你整理了一份优先行动清单：\n1. 跟进3个高意向客户（预计成交概率>80%）\n2. 联系2个流失风险客户（建议48小时内）\n3. 复盘上周的成功案例，提炼最佳实践',
        '📊 根据AI预测模型，这个客户的成交概率为78%，高于平均水平。建议采用以下策略：\n• 强调ROI价值和投资回报\n• 提供相似行业的案例研究\n• 安排产品演示会议\n• 提供限时优惠以创造紧迫感',
        '🚀 我注意到你的转化率在过去两周提升了12%！继续保持这个势头。建议将成功经验应用到其他类似客户，预计可以额外提升15-20%的成交率。',
        '💡 基于你的销售数据分析，我发现周三下午2-4点是客户响应率最高的时段。建议在这个时间段安排重要的客户沟通，可以提高35%的响应率。'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { role: 'ai', content: randomResponse }]);
      setIsTyping(false);
      toast.success('AI已回复', { icon: '🤖' });
    }, 1500);

    setMessage('');
  };

  const handleInsightAction = (insight: AIInsight) => {
    toast.success(`正在执行: ${insight.action || '查看详情'}`, {
      icon: '🎯',
      duration: 2000
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`bg-card rounded-2xl shadow-2xl overflow-hidden border border-border ${
            isExpanded ? 'w-full max-w-6xl h-[90vh]' : 'w-full max-w-2xl h-[80vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="gradient-primary text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    AI 智能助手
                    <Badge className="bg-white/20 text-white border-0 text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      实时
                    </Badge>
                  </h2>
                  <p className="text-sm text-white/90">实时分析 · 智能推荐 · 预测优化</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white hover:bg-white/20 rounded-lg"
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* AI Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="h-4 w-4" />
                  <span className="text-xs text-white/80">分析准确率</span>
                </div>
                <div className="text-xl font-bold">92%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4" />
                  <span className="text-xs text-white/80">成功预测</span>
                </div>
                <div className="text-xl font-bold">156次</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs text-white/80">提升业绩</span>
                </div>
                <div className="text-xl font-bold">+34%</div>
              </div>
            </div>
          </div>

          <div className={`grid ${isExpanded ? 'grid-cols-2' : 'grid-cols-1'} h-[calc(100%-180px)]`}>
            {/* AI Insights Panel */}
            <div className="border-r border-border p-6 overflow-y-auto bg-gradient-to-b from-secondary/10 to-transparent">
              <div className="mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  智能洞察
                </h3>
                <p className="text-sm text-muted-foreground mt-1">基于数据分析的AI建议</p>
              </div>

              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all bg-card hover:shadow-lg cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-md ${
                        insight.type === 'prediction' ? 'gradient-info' :
                        insight.type === 'recommendation' ? 'gradient-success' :
                        insight.type === 'alert' ? 'bg-gradient-to-br from-destructive to-orange-500' :
                        'gradient-primary'
                      }`}>
                        <span className="text-white">{insight.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{insight.title}</h4>
                          <Badge variant="secondary" className="text-xs gradient-success border-0 text-white">
                            {insight.confidence}% 置信度
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                        {insight.action && (
                          <Button
                            size="sm"
                            className="text-xs gradient-primary hover:shadow-md transition-all"
                            onClick={() => handleInsightAction(insight)}
                          >
                            {insight.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="flex flex-col bg-gradient-to-b from-background to-secondary/10">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        msg.role === 'user'
                          ? 'gradient-primary text-white'
                          : 'bg-card border border-border'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="问我任何关于销售数据的问题..."
                    className="flex-1 rounded-xl border-border focus:ring-2 focus:ring-primary/20"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isTyping}
                    className="gradient-primary hover:shadow-lg transition-all rounded-xl px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  试试问：\"帮我分析本月销售趋势\" 或 \"哪些客户需要优先跟进\"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}