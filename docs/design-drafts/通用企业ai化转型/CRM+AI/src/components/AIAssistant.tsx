import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Sparkles, 
  X, 
  Send, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Target,
  MessageSquare,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface AIAssistantProps {
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '你好！我是你的AI销售助手 🚀 我可以帮你分析线索、推荐行动方案、生成邮件内容等。你想了解什么？',
      timestamp: new Date(),
      suggestions: [
        '分析ABC科技的成交概率',
        '生成跟进邮件模板',
        '本周重点客户推荐',
        '团队业绩预测分析'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('abc科技') || lowerMessage.includes('成交概率')) {
      return {
        content: '根据AI分析，ABC科技的成交概率为 **65%**。\n\n关键因素：\n✅ 高层决策人已参与（+20%）\n✅ 近期访问定价页面（+15%）\n✅ 下载了技术文档（+10%）\n⚠️ 存在竞争对手（-5%）\n\n建议行动：\n1. 在48小时内发送定制方案\n2. 重点强调我们的差异化优势\n3. 安排技术演示会议',
        suggestions: ['生成定制方案PPT', '查看竞争对手分析', '安排演示会议']
      };
    }
    
    if (lowerMessage.includes('邮件') || lowerMessage.includes('跟进')) {
      return {
        content: '我为你生成了一封跟进邮件模板：\n\n**主题：** 关于您最近对我们产品的关注\n\n王总，您好！\n\n注意到您最近多次访问了我们的产品页面，并下载了技术白皮书，我想这正是一个合适的时机来进一步交流。\n\n基于贵公司的业务特点，我们的解决方案可以帮助您：\n• 提升销售效率30%以上\n• 节省40%的行政时间\n• 提高预测准确度至85%+\n\n我准备了一份针对贵公司的定制方案，方便本周安排15分钟电话沟通吗？\n\n期待您的回复！',
        suggestions: ['复制邮件内容', '修改邮件语气', '添加案例证明']
      };
    }
    
    if (lowerMessage.includes('重点客户') || lowerMessage.includes('推荐')) {
      return {
        content: '基于AI分析，本周重点关注以下客户：\n\n🔥 **ABC科技** (Velocity Score: 92)\n理由：近期高频互动，决策人已参与\n建议：发送定制方案，争取本周演示\n\n⭐ **智慧制造** (Velocity Score: 88)\n理由：下载白皮书，多次访问定价页\n建议：电话跟进，了解采购时间表\n\n💎 **云端服务** (Velocity Score: 85)\n理由：邮件打开率高，停留时间长\n建议：发送成功案例，建立信任',
        suggestions: ['查看完整列表', '设置提醒任务', '生成行动计划']
      };
    }
    
    if (lowerMessage.includes('业绩') || lowerMessage.includes('预测')) {
      return {
        content: 'AI业绩预测分析：\n\n📊 **本季度预测：¥920万**\n• 当前进度：¥590万 (64%)\n• 距离目标：¥260万\n• 预测达成率：108%\n\n关键驱动因素：\n✨ 华北区表现突出（+22%增长）\n✨ 管道转化率提升至53%\n⚠️ 需要关注4笔风险交易（总额¥207万）\n\n建议：重点支持华北区，及时跟进风险交易',
        suggestions: ['查看详细报表', '风险交易清单', '区域对比分析']
      };
    }
    
    return {
      content: '我理解了你的问题。作为AI销售助手，我可以帮助你：\n\n💡 分析客户意向和成交概率\n📧 生成个性化邮件和方案\n📊 提供数据洞察和预测\n🎯 推荐优先行动事项\n\n请告诉我你具体想了解什么？',
      suggestions: ['分析某个客户', '生成内容', '查看建议', '数据分析']
    };
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('已复制到剪贴板');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 w-[420px] h-[600px] z-50 shadow-2xl rounded-2xl"
    >
      <Card className="h-full flex flex-col border-2 border-purple-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="flex items-center gap-2">
                AI销售助手
                <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">Beta</Badge>
              </h3>
              <p className="text-xs text-gray-500">在线 • 随时为你服务</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full hover:bg-white/50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {message.type === 'ai' ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">我</span>
                  </div>
                )}
                
                <div className={`flex-1 ${message.type === 'user' ? 'flex flex-col items-end' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                      message.type === 'user'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-50 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(message.content)}
                        className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        复制
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSend(suggestion)}
                          className="text-xs rounded-full border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSend('分析重点客户')}
              className="text-xs rounded-full whitespace-nowrap"
            >
              <Target className="w-3 h-3 mr-1" />
              重点客户
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSend('生成邮件')}
              className="text-xs rounded-full whitespace-nowrap"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              生成内容
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSend('业绩预测')}
              className="text-xs rounded-full whitespace-nowrap"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              业绩预测
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入你的问题..."
              className="flex-1 rounded-full border-gray-200 focus:border-purple-300 focus:ring-purple-200"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="rounded-full bg-purple-500 hover:bg-purple-600 text-white"
              size="sm"
            >
              {isTyping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
