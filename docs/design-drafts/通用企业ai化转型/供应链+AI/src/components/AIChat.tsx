import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Clock, TrendingUp, Package, Truck, BarChart, Brain, Lightbulb, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: {
    module?: string;
    data?: any;
  };
  suggestions?: string[];
  actions?: {
    label: string;
    action: string;
  }[];
}

interface ConversationContext {
  module: string;
  recentTopics: string[];
  userPreferences: Record<string, any>;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是链景智能助手，基于供应链大数据和AI算法，我可以帮你：\n\n• 分析需求趋势和预测\n• 优化库存和补货策略\n• 诊断物流和配送问题\n• 提供数据驱动的决策建议\n\n请问有什么可以帮到你的？',
      timestamp: new Date(),
      suggestions: [
        '华南地区需求为什么突增？',
        '如何优化库存成本？',
        '这个月的物流费用为何上升？',
        '给我一些降本增效的建议'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    module: 'general',
    recentTopics: [],
    userPreferences: {}
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: TrendingUp, label: '需求预测', query: '帮我分析未来3个月的需求趋势' },
    { icon: Package, label: '库存优化', query: '哪些SKU存在库存问题？' },
    { icon: Truck, label: '物流分析', query: '物流配送有哪些可以优化的地方？' },
    { icon: BarChart, label: '数据报告', query: '生成本周供应链运营报告' }
  ];

  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Context-aware response generation
    const lowerMessage = userMessage.toLowerCase();
    let content = '';
    let suggestions: string[] = [];
    let actions: Message['actions'] = [];
    let newContext = { ...context };

    // Demand-related queries
    if (lowerMessage.includes('需求') || lowerMessage.includes('预测') || lowerMessage.includes('增长')) {
      content = `基于AI预测模型分析，我发现了以下关键洞察：

📈 **需求趋势分析**
• 华南地区需求环比增长 **+237%**，远超历史峰值
• AI模型置信度 94%，建议立即启动应急响应
• 预计未来7天持续高位运行

🎯 **驱动因素**
1. 区域促销活动效果超预期 (+180%)
2. 竞品缺货转移需求 (+35%)
3. 季节性因素叠加 (+22%)

💡 **我的建议**
• 从华东、华中仓库紧急调拨 500-800 件
• 启动供应商快速补货通道
• 上调未来14天该区域预测基线`;

      suggestions = [
        '需要调拨多少库存才够？',
        '哪个供应商可以最快交货？',
        '这会影响其他区域吗？'
      ];

      actions = [
        { label: '查看详细预测', action: 'navigate:demand-forecast' },
        { label: '创建调拨单', action: 'create:transfer-order' }
      ];

      newContext.recentTopics.push('demand-forecast');
      newContext.module = 'demand';
    }
    // Inventory-related queries
    else if (lowerMessage.includes('库存') || lowerMessage.includes('补货') || lowerMessage.includes('sku')) {
      content = `我已经扫描了全部SKU的库存状况，发现以下问题：

📦 **库存健康度分析**
• 健康SKU: **1,245** (82.3%)
• 预警SKU: **186** (12.3%)  
• 异常SKU: **82** (5.4%)

⚠️ **重点关注**
**SKU #A1203** - 华北仓  
• 当前库存周转率: 1.8 (↓ 57%)
• 滞销风险: **高**
• 资金占用: ¥18万
• AI建议: 启动促销清库

**SKU #B5604** - 上海仓
• 库存水位: 15% (缺货风险)
• 预计断货: 3天内
• AI建议: 立即补货 800 件

💡 **智能优化方案**
如采用AI推荐的补货策略，预计：
• 库存成本 ↓ 12.3%
• 断货率 ↓ 78%
• 周转率 ↑ 1.8 次/年`;

      suggestions = [
        'SKU #A1203 怎么促销？',
        '帮我生成补货计划',
        '查看所有异常SKU'
      ];

      actions = [
        { label: '查看库存详情', action: 'navigate:inventory' },
        { label: '生成补货单', action: 'create:replenishment' }
      ];

      newContext.recentTopics.push('inventory-optimization');
      newContext.module = 'inventory';
    }
    // Logistics-related queries
    else if (lowerMessage.includes('物流') || lowerMessage.includes('配送') || lowerMessage.includes('运输')) {
      content = `我分析了物流网络的运营数据，发现以下优化机会：

🚚 **物流绩效总览**
• 平均配送时效: 28.3小时 (↑ 15%)
• 运输成本: ¥156/单 (↑ 8%)
• OTIF达成率: 94.2% (目标: 96%)

🎯 **问题诊断**
**上海-杭州线路**
• 时效从 18h → 32h (↑78%)
• 影响订单: 340单/天
• AI识别原因: 路线拥堵 + 承运商产能不足

💡 **AI优化建议**
1. **即时措施** - 切换备用承运商
   • 预计节省: ¥2.3万/周
   • 时效提升: 40%

2. **路线优化** - 启用AI智能调度
   • 自动规划最优配送路线
   • 预计降本: 15-20%
   • 提效: 25%

3. **订单合并** - 提升至 70%
   • 当前: 50% → 目标: 70%
   • 节省运输成本: ¥8万/月`;

      suggestions = [
        '备用承运商是谁？',
        'AI调度怎么启用？',
        '会影响客户体验吗？'
      ];

      actions = [
        { label: '查看物流详情', action: 'navigate:logistics' },
        { label: '启用AI调度', action: 'enable:ai-routing' }
      ];

      newContext.recentTopics.push('logistics-optimization');
      newContext.module = 'logistics';
    }
    // Cost optimization queries  
    else if (lowerMessage.includes('成本') || lowerMessage.includes('费用') || lowerMessage.includes('降本')) {
      content = `我分析了供应链全链路成本，为你找到了这些降本机会：

💰 **成本结构分析**
• 库存持有成本: ¥42.6M (占比最大)
• 运输成本: ¥18.3M
• 仓储运营: ¥12.8M
• 其他: ¥6.2M

🎯 **Top 5 降本机会**
1. **优化安全库存** - 潜力 ¥5.2M/年
   • 当前安全库存偏高 15-20%
   • AI建议: 动态调整，可降至最优水平
   
2. **提升库存周转** - 潜力 ¥3.8M/年
   • 清理滞销SKU
   • 优化补货频次和批量

3. **物流线路优化** - 潜力 ¥2.7M/年
   • AI智能调度降低空驶率
   • 提升订单合并率

4. **供应商整合** - 潜力 ¥1.9M/年
   • 整合长尾供应商获取规模优势

5. **需求预测提升** - 潜力 ¥1.2M/年  
   • 减少断货损失
   • 降低紧急采购溢价

💡 **快速见效方案**
建议优先执行 1、2、3 项，预计：
• 3个月见效
• 总降本 **¥11.7M/年**
• ROI: 450%`;

      suggestions = [
        '从哪个开始最容易？',
        '需要多少人力投入？',
        '生成详细实施计划'
      ];

      actions = [
        { label: '查看详细方案', action: 'show:cost-optimization' },
        { label: '创建优化项目', action: 'create:project' }
      ];

      newContext.recentTopics.push('cost-optimization');
    }
    // General or unclear queries
    else {
      content = `我理解你想了解 **"${userMessage}"** 相关的内容。

让我帮你梳理一下，在供应链管理中，这个问题通常涉及：

🔍 **相关模块**
• 需求预测与计划
• 库存优化管理
• 物流调度执行

💡 **我能为你做什么**
1. 提供数据分析和洞察
2. 生成优化建议和方案
3. 预测未来趋势
4. 识别异常和风险

你可以问我更具体的问题，比如：`;

      suggestions = [
        '某个区域/仓库的详细情况',
        '某个指标为什么变化',
        '如何优化某个环节',
        '生成某类报告或方案'
      ];
    }

    setContext(newContext);

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      context: { module: newContext.module },
      suggestions,
      actions
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(input.trim());
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      toast.error('AI响应失败，请重试');
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleAction = (action: string) => {
    const [type, target] = action.split(':');
    
    if (type === 'navigate') {
      toast.info('正在跳转...', { description: `前往${target}模块` });
    } else if (type === 'create') {
      toast.info('创建中...', { description: `正在创建${target}` });
    } else if (type === 'enable') {
      toast.success('已启用', { description: `${target}功能已启用` });
    } else if (type === 'show') {
      toast.info('正在加载...', { description: `${target}详情` });
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="flex items-center gap-2">
              AI智能助手
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </h3>
            <p className="text-xs text-slate-400">由深度学习驱动，实时分析数据</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-cyan-500'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block max-w-[85%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30'
                      : 'bg-slate-800 text-slate-100 border border-slate-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>

                {/* Suggestions */}
                {message.suggestions && message.role === 'assistant' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestion(suggestion)}
                        className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Actions */}
                {message.actions && message.role === 'assistant' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAction(action.action)}
                        className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-slate-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="询问AI任何关于供应链的问题..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAction(action.query)}
              className="text-xs px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 flex items-center gap-1"
            >
              <action.icon className="w-3 h-3" />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}