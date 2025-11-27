import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { 
  Brain,
  Send,
  Sparkles,
  TrendingUp,
  Target,
  Lightbulb,
  X,
  Minimize2,
  Maximize2,
  MessageSquare,
  Zap,
  Clock,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  FileText,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: Array<{
    label: string;
    icon: any;
    action: string;
  }>;
}

interface AIAssistantChatProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'vp' | 'manager' | 'rep';
}

export default function AIAssistantChat({ isOpen, onClose, userRole }: AIAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '你好！我是销速引擎AI助手。我可以帮你分析线索、预测业绩、撰写邮件、准备会议等。有什么我可以帮你的吗？',
      timestamp: new Date(),
      suggestions: [
        '分析今日重点线索',
        '预测本月业绩完成情况',
        '帮我准备明天的客户会议',
        '撰写一封跟进邮件'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses: Record<string, any> = {
    '分析今日重点线索': {
      content: '📊 基于AI分析，今日有3个高价值线索需要重点关注：\n\n1. **金融科技创新 - 周总** (Velocity Score: 95)\n   - 预计成交金额：120万\n   - 建议：今日下午3-5点是最佳联系时间\n   - 下一步：准备金融行业定制化方案\n\n2. **ABC科技 - 王总** (Score: 92)\n   - 预计成交金额：58万\n   - 建议：发送产品演示视频\n   - 风险：竞争对手也在接触\n\n3. **智慧制造 - 李经理** (Score: 88)\n   - 预计成交金额：72万\n   - 建议：提供案例研究报告',
      actions: [
        { label: '查看详情', icon: Eye, action: 'view_leads' },
        { label: '发送邮件', icon: Mail, action: 'send_email' },
        { label: '安排会议', icon: Calendar, action: 'schedule_meeting' }
      ]
    },
    '预测本月业绩完成情况': {
      content: '📈 **本月业绩预测分析**\n\n当前进展：¥78万 / ¥100万 (78%)\n剩余时间：10天\n\n🎯 **AI预测结果**：\n- 预计最终完成：¥108万\n- 完成率：108%\n- 置信度：92%\n\n💡 **关键驱动因素**：\n✅ 3个大单即将签约（预计¥280万）\n✅ 团队活动量提升15%\n⚠️ 2个交易存在延期风险\n\n📋 **建议行动**：\n1. 重点推进"金融科技创新"项目\n2. 尽快跟进已停滞3天的客户\n3. 提前规划下月资源分配',
      actions: [
        { label: '查看详细报告', icon: FileText, action: 'view_report' },
        { label: '查看风险交易', icon: Target, action: 'view_risks' }
      ]
    },
    '帮我准备明天的客户会议': {
      content: '📅 **明天的会议准备清单**\n\n**会议信息**：\n- 客户：金融科技创新 - 周总 (CTO)\n- 时间：明天下午2:00\n- 地点：客户办公室\n- 参会人：我方3人，客户方5人\n\n**AI准备建议**：\n\n1️⃣ **客户背景调研**\n   ✅ 公司规模：1000+人\n   ✅ 最近融资：B轮5000万\n   ✅ 关注重点：技术架构、安全性\n\n2️⃣ **推荐话术**\n   - 开场：强调我们在金融行业的成功案例\n   - 痛点：他们最近访问了我们的安全认证页面\n   - 价值：ROI预计提升40%\n\n3️⃣ **需要准备的材料**\n   📄 金融行业解决方案PPT\n   📊 同行业客户案例\n   🔒 安全认证文档\n   💰 定制化报价方案',
      actions: [
        { label: '生成演示PPT', icon: FileText, action: 'generate_ppt' },
        { label: '发送会议日程', icon: Calendar, action: 'send_agenda' },
        { label: '设置提醒', icon: Clock, action: 'set_reminder' }
      ]
    },
    '撰写一封跟进邮件': {
      content: '✉️ **AI为您撰写的跟进邮件**\n\n---\n\n**主题**：ABC科技 - 产品演示跟进及下一步建议\n\n王总，您好！\n\n感谢您上周参加我们的产品演示。我注意到您对我们的数据分析模块特别感兴趣，也提出了关于系统集成方面的问题。\n\n针对您的需求，我准备了以下材料：\n1. 与贵司现有系统的集成方案（附件1）\n2. 3个类似规模企业的成功案例（附件2）\n3. 为ABC科技定制的ROI分析报告（附件3）\n\n基于贵司的业务规模和需求，我们预计该解决方案可以：\n• 提升数据处理效率60%\n• 减少人工操作时间40%\n• 3个月内实现投资回报\n\n建议我们本周安排一次30分钟的技术对接会议，由我们的技术总监为您详细讲解集成方案。您看明天下午3点或后天上午10点，哪个时间更方便？\n\n期待您的回复！\n\n最好的祝愿，\n[您的名字]\n\n---\n\n💡 **AI优化建议**：\n✅ 个性化：提到了客户具体的关注点\n✅ 价值导向：明确的ROI数据\n✅ 行动号召：具体的时间选项',
      actions: [
        { label: '复制邮件', icon: Mail, action: 'copy_email' },
        { label: '编辑修改', icon: FileText, action: 'edit_email' },
        { label: '直接发送', icon: Send, action: 'send_email' }
      ]
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = aiResponses[input] || {
        content: `我理解您想要${input}。让我为您分析一下...\n\n基于当前数据，我建议：\n1. 首先关注Velocity Score最高的线索\n2. 使用AI推荐的最佳联系时机\n3. 参考成功案例的沟通策略\n\n需要我提供更详细的分析吗？`,
        suggestions: ['查看详细分析', '生成行动计划', '其他问题']
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
        actions: response.actions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleActionClick = (action: string) => {
    toast.success(`正在执行: ${action}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Card className={`border-0 shadow-2xl rounded-2xl overflow-hidden transition-all ${
        isMinimized ? 'w-80' : 'w-96'
      }`}>
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white flex items-center gap-2">
                  AI智能助手
                  <Badge className="bg-white/20 text-white border-0 rounded-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    实时在线
                  </Badge>
                </h3>
                <p className="text-xs text-purple-100">随时为您提供帮助</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 rounded-lg"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gradient-to-b from-white to-purple-50/30 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <Avatar className={`w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${
                      message.type === 'ai' 
                        ? 'bg-gradient-to-br from-purple-600 to-purple-700' 
                        : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      {message.type === 'ai' ? <Brain className="w-4 h-4" /> : 'U'}
                    </Avatar>
                    <div className={`flex-1 ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                      <div className={`max-w-[85%] rounded-2xl p-3 ${
                        message.type === 'ai'
                          ? 'bg-white border border-purple-100'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      }`}>
                        <p className={`text-sm whitespace-pre-line ${
                          message.type === 'ai' ? 'text-neutral-700' : 'text-white'
                        }`}>
                          {message.content}
                        </p>
                      </div>

                      {/* Actions */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {message.actions.map((action, idx) => {
                            const Icon = action.icon;
                            return (
                              <Button
                                key={idx}
                                size="sm"
                                variant="outline"
                                onClick={() => handleActionClick(action.action)}
                                className="rounded-lg hover:bg-purple-50 hover:border-purple-300 text-xs"
                              >
                                <Icon className="w-3 h-3 mr-1" />
                                {action.label}
                              </Button>
                            );
                          })}
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1.5 text-xs bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors border border-purple-200"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      <span className="text-xs text-neutral-400">
                        {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <Avatar className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white">
                    <Brain className="w-4 h-4" />
                  </Avatar>
                  <div className="bg-white border border-purple-100 rounded-2xl p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入您的问题..."
                  className="flex-1 rounded-xl border-neutral-200 focus:border-purple-300"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                💡 提示：输入问题或点击建议快速开始
              </p>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
}