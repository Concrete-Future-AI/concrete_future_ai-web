import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Lightbulb, AlertTriangle, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '../utils/permissions';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIAssistantProps {
  role: string;
}

export default function AIAssistant({ role }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { canUseAIFeature, aiAccessLevel } = usePermissions(role as UserRole);

  // 检查是否有AI助手权限
  if (!canUseAIFeature('aiAssistant')) {
    return null; // 没有权限则不显示AI助手
  }

  useEffect(() => {
    // 根据角色初始化欢迎消息
    if (messages.length === 0) {
      const welcomeMessages = {
        director: '您好，王总！我是您的AI采购助手。我可以帮您分析供应商风险、预测采购趋势、优化决策。有什么我可以帮您的吗？',
        specialist: '您好，李明！我是您的AI工作助手。我可以帮您处理采购任务、推荐供应商、优化流程。需要什么帮助吗？',
        applicant: '您好，张悦！我是您的AI采购顾问。我可以帮您快速找到合适的供应商、预估价格、加速审批。有什么需求吗？'
      };

      setMessages([{
        id: '1',
        type: 'ai',
        content: welcomeMessages[role as keyof typeof welcomeMessages] || welcomeMessages.director,
        timestamp: new Date(),
        suggestions: [
          '分析本月采购趋势',
          '推荐优质供应商',
          '识别潜在风险',
          '优化采购流程'
        ]
      }]);
    }
  }, [role]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, role);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string, userRole: string): Message => {
    const responses = {
      trend: {
        content: '根据过去6个月的数据分析，我发现以下趋势：\n\n📈 IT设备采购量上升23%\n💰 平均单价下降8%，节省约¥180万\n⚠️ 5月预算超支15%，建议优化Q2采购计划\n\n我已为您生成详细的趋势分析报告。',
        suggestions: ['查看完整报告', '设置预警阈值', '优化采购计划']
      },
      supplier: {
        content: '基于您的需求，我推荐以下供应商：\n\n🏆 华为技术 - 综合评分9.2/10\n  ✓ 价格竞争力强\n  ✓ 交付及时率98%\n  ✓ 风险评级: 低\n\n🥈 阿里云 - 综合评分8.8/10\n  ✓ 技术能力优秀\n  ✓ 服务响应快\n  ⚠️ 价格略高于市场均价',
        suggestions: ['查看详细对比', '发起询价', '查看历史合作']
      },
      risk: {
        content: '🚨 风险扫描完成，发现以下问题：\n\n⚠️ 高风险 (1项)\nABC物流 - 所在地区发生罢工\n建议: 立即启动备选供应商\n\n⚡ 中风险 (2项)\n优质印刷 - ESG评级下降\n建议: 重新评估合作关系',
        suggestions: ['查看风险详情', '启动应急预案', '联系备选供应商']
      },
      optimize: {
        content: '🎯 流程优化建议：\n\n1️⃣ 自动化审批流程\n预计节省时间: 40%\n\n2️⃣ 集中采购策略\n预计节省成本: ¥250万/年\n\n3️⃣ 供应商整合\n建议从52家减少到35家核心供应商',
        suggestions: ['查看详细方案', '开始实施', '模拟效果']
      }
    };

    const lowerQuery = query.toLowerCase();
    let response = responses.trend;

    if (lowerQuery.includes('供应商') || lowerQuery.includes('推荐')) {
      response = responses.supplier;
    } else if (lowerQuery.includes('风险') || lowerQuery.includes('预警')) {
      response = responses.risk;
    } else if (lowerQuery.includes('优化') || lowerQuery.includes('流程')) {
      response = responses.optimize;
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions
    };
  };

  return (
    <>
      {/* FAB - Floating Action Button - Material Design */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full ai-gradient hover:opacity-90 elevation-4 ai-glow-strong md-transition"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* AI Assistant Panel - Material Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 z-40 w-96"
          >
            <Card className="elevation-5 overflow-hidden border-0">
              {/* Header */}
              <div className="ai-gradient px-4 py-3 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent data-flow" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="font-medium">AI 采购助手</span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                    智能分析中
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="h-[400px] p-4 bg-surface-variant">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.type === 'user' 
                          ? 'ai-gradient text-white elevation-2' 
                          : 'bg-white elevation-1'
                      } rounded-xl px-4 py-2`}>
                        {message.type === 'ai' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                            <span className="text-sm text-muted-foreground">AI助手</span>
                          </div>
                        )}
                        <div className="whitespace-pre-line text-sm">{message.content}</div>
                        
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 md-transition-fast hover:bg-purple-50"
                                onClick={() => setInputValue(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white elevation-1 rounded-xl px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-purple-500 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-purple-500 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 bg-white border-t elevation-1">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入您的问题..."
                    className="flex-1 elevation-1"
                  />
                  <Button 
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="ai-gradient text-white border-0 elevation-2 hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}