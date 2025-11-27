import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar } from './ui/avatar';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Loader2,
  Bot,
  User,
  TrendingUp,
  Target,
  Lightbulb,
  BarChart3,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是GrowthEncore AI智能助手 🤖\n\n我可以帮你：\n• 分析社交媒体数据\n• 生成营销内容\n• 优化投放策略\n• 发现增长机会\n\n有什么我可以帮到你的吗？',
      timestamp: new Date(),
      suggestions: [
        '分析本周社媒表现',
        '生成Instagram推广文案',
        '推荐最佳发布时间',
        '查找潜在KOL'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('分析') || input.includes('数据') || input.includes('表现')) {
      return {
        content: '📊 **本周社交媒体数据分析报告**\n\n✅ **整体表现优秀**\n\n**核心指标：**\n• 总触达：2.4M (+23% 周环比)\n• 总互动：156K (+34% 周环比)\n• 新增粉丝：12.3K (+18% 周环比)\n• 转化ROI：4.8x (+15% 周环比)\n\n**平台表现：**\n🥇 Instagram - 互动率6.4% (最佳)\n🥈 Discord - 互动率8.9% (社区活跃)\n🥉 X - 互动率4.8% (稳定增长)\n\n**AI洞察：**\n💡 Instagram在晚上8-10点互动率最高\n💡 X平台上"AI营销"话题热度+145%\n💡 Reddit社区引流效果显著，转化率提升34%\n\n需要我深入分析某个平台吗？',
        suggestions: ['分析Instagram详情', '优化X平台策略', '查看Reddit引流数据']
      };
    }
    
    if (input.includes('生成') || input.includes('文案') || input.includes('内容')) {
      return {
        content: '✨ **AI为你生成Instagram推广文案**\n\n---\n\n**版本A（专业风格）：**\n\n🚀 重磅发布！GrowthEncore AI 3.0正式上线\n\n✨ 全新AI引擎，营销效率提升80%\n📊 实时数据分析，ROI提升4倍\n🎯 智能用户画像，精准触达目标客户\n🤖 自动化工作流，解放双手创造价值\n\n限时优惠，前100名享受30%折扣！\n立即体验👉 [链接]\n\n#AI营销 #营销自动化 #数字化转型 #MarTech\n\n---\n\n**版本B（活泼风格）：**\n\n嘿！营销人！还在手动发帖？😱\n\n让AI帮你：\n⚡️ 自动监测热点\n⚡️ 智能生成内容\n⚡️ 一键多平台发布\n⚡️ 实时优化策略\n\nROI提升4倍不是梦！💰\n7天免费试用，不香吗？\n\n戳链接开始👉 [链接]\n\n---\n\n**AI建议：**\n• 配图：使用产品界面截图或数据可视化图表\n• 发布时间：晚上8:30（互动率峰值）\n• 预估触达：45K-60K\n• 预估互动：2.8K-3.5K',
        suggestions: ['生成X版本文案', '生成视频脚本', '生成邮件营销文案']
      };
    }
    
    if (input.includes('时间') || input.includes('发布') || input.includes('推荐')) {
      return {
        content: '🕐 **AI智能推荐最佳发布时间**\n\n基于7天数据分析和用户行为预测：\n\n**Instagram：**\n🌟 最佳时间：20:00-22:00\n• 互动率：6.8%（+45%）\n• 在线用户：156K\n• 预估触达：65K\n\n**X (Twitter)：**\n🌟 最佳时间：14:00-16:00\n• 互动率：5.2%（+38%）\n• 在线用户：89K\n• 预估触达：42K\n\n**LinkedIn：**\n🌟 最佳时间：09:00-11:00\n• 互动率：4.1%（+52%）\n• 在线用户：34K\n• 预估触达：28K\n\n**Facebook：**\n🌟 最佳时间：18:00-20:00\n• 互动率：3.8%（+28%）\n• 在线用户：67K\n• 预估触达：38K\n\n💡 **AI优化建议：**\n• 周三、周五互动率最高\n• 避开周末早晨（互动率-40%）\n• 工作日午休时间是第二高峰\n\n需要为你自动设置发布日程吗？',
        suggestions: ['自动设置发布日程', '分析竞品发布策略', '查看历史最佳发布']
      };
    }
    
    if (input.includes('kol') || input.includes('博主') || input.includes('影响力')) {
      return {
        content: '⭐ **AI为你发现5位高潜力KOL**\n\n**1. TechVisionAI** 🔥推荐指数：96/100\n• 平台：X (Twitter)\n• 粉丝：458K\n• 互动率：12.3%\n• 领域：AI科技\n• 预估成本：$800-1200\n• AI评语：粉丝高度垂直，科技产品推广效果佳\n\n**2. MarketingQueen** ⭐推荐指数：94/100\n• 平台：LinkedIn\n• 粉丝：234K\n• 互动率：8.7%\n• 领域：营销策略\n• 预估成本：$600-900\n• AI评语：B2B影响力强，企业客户转化率高\n\n**3. GrowthHacker_Pro** 🎯推荐指数：92/100\n• 平台：Instagram\n• 粉丝：678K\n• 互动率：15.6%\n• 领域：增长黑客\n• 预估成本：$1200-1800\n• AI评语：年轻创业者关注多，品牌曝光度极高\n\n**4. DataNinja** 📊推荐指数：89/100\n• 平台：YouTube\n• 订阅：892K\n• 观看率：9.2%\n• 领域：数据分析\n• 预估成本：$1500-2000\n• AI评语：视频教程影响力大，适合深度合作\n\n**5. SocialMediaGuru** 💼推荐指数：88/100\n• 平台：Facebook\n• 粉丝：345K\n• 互动率：6.4%\n• 领域：社交媒体\n• 预估成本：$500-800\n• AI评语：社群运营经验丰富，长期合作价值高\n\n需要我为你生成个性化DM消息吗？',
        suggestions: ['生成DM消息', '查看详细数据', '对比竞品KOL']
      };
    }
    
    if (input.includes('优化') || input.includes('提升') || input.includes('改进')) {
      return {
        content: '🎯 **AI智能优化建议**\n\n基于你的数据分析，我发现3个关键优化点：\n\n**1. 内容发布优化** 🚀优先级：高\n• 问题：周末发布量少，错失流量高峰\n• 建议：增加周六晚8点Instagram发布\n• 预期效果：+35%互动率，+12K触达\n• 一键实施：[应用优化]\n\n**2. 平台策略调整** 📊优先级：高\n• 问题：LinkedIn投入产出比不足\n• 建议：将30%预算转移至Instagram\n• 预期效果：ROI从3.2x提升至4.8x\n• 一键实施：[应用优化]\n\n**3. 互动回复优化** 💬优先级：中\n• 问题：评论回复率仅45%，流失机会\n• 建议：开启AI自动回复（保持人工审核）\n• 预期效果：+80%回复率，+25%用户留存\n• 一键实施：[应用优化]\n\n**4. DM营销增强** 📧优先级：中\n• 问题：DM打开率偏低（34%）\n• 建议：优化标题，使用AI个性化内容\n• 预期效果：打开率提升至55%+\n• 一键实施：[应用优化]\n\n**5. KOL合作策略** ⭐优先级：低\n• 问题：KOL合作ROI波动大\n• 建议：使用AI评分系统筛选高质量KOL\n• 预期效果：ROI稳定在5x以上\n• 一键实施：[应用优化]\n\n立即应用所有优化可提升整体ROI 45%！',
        suggestions: ['应用所有优化', '查看详细方案', 'A/B测试对比']
      };
    }
    
    // Default response
    return {
      content: '我理解了你的问题。作为AI营销助手，我可以帮你：\n\n📊 **数据分析**\n• 社交媒体表现分析\n• 竞品对比分析\n• 用户行为洞察\n\n✨ **内容生成**\n• 多平台文案创作\n• 视频脚本撰写\n• 邮件营销内容\n\n🎯 **策略优化**\n• 发布时间优化\n• 预算分配建议\n• A/B测试设计\n\n🤝 **KOL管理**\n• 影响力者发现\n• 合作效果评估\n• DM消息生成\n\n你想了解哪方面的详细信息？',
      suggestions: ['分析本周数据', '生成推广文案', '优化发布策略', '寻找KOL']
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed bottom-6 right-6 w-[480px] h-[680px] glass-card rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900">AI智能助手</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500">在线</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/50 rounded-xl"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              } shadow-lg`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`inline-block max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white rounded-2xl rounded-tr-md'
                    : 'bg-white/70 text-gray-900 rounded-2xl rounded-tl-md'
                } p-4 shadow-lg backdrop-blur-sm`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  {message.suggestions && message.role === 'assistant' && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs hover:bg-purple-50 hover:border-purple-300 hover-lift"
                        >
                          <Lightbulb className="w-3 h-3 mr-1" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/70 rounded-2xl rounded-tl-md p-4 shadow-lg backdrop-blur-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-white/20 bg-white/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入你的问题..."
            className="flex-1 bg-white/70"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift"
          >
            {isTyping ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
