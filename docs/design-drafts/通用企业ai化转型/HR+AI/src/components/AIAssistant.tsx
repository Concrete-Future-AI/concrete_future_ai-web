import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  X, 
  Send, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Target,
  MessageSquare,
  MinusCircle,
  Maximize2
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface AIAssistantProps {
  userRole: 'chro' | 'hrbp' | 'employee';
  currentView: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function AIAssistant({ userRole, currentView }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 根据角色和视图生成上下文感知的欢迎消息
  const getWelcomeMessage = () => {
    const roleGreeting = {
      chro: "您好，王慧！我是您的AI战略助手",
      hrbp: "您好，赵刚！我是您的AI业务伙伴",
      employee: "您好，李雪！我是您的AI成长顾问"
    };

    const viewContext = {
      dashboard: "我注意到研发部门的敬业度有所下降，需要我帮您深入分析原因吗？",
      recruiting: "当前有3位高匹配度候选人待处理，我可以帮您生成面试问题或对比分析。",
      performance: "绩效评估周期即将结束，我可以帮您生成团队绩效报告或晋升建议。",
      onboarding: "新员工入职进度良好，我可以帮您优化入职流程或推荐最佳导师匹配。",
      growth: "根据您的技能档案，我为您规划了个性化的成长路径，要查看吗？"
    };

    return {
      greeting: roleGreeting[userRole],
      context: viewContext[currentView as keyof typeof viewContext] || "我能为您提供什么帮助？"
    };
  };

  // 打开助手时显示欢迎消息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const { greeting, context } = getWelcomeMessage();
      setTimeout(() => {
        setMessages([{
          id: '1',
          type: 'ai',
          content: `${greeting}。${context}`,
          timestamp: new Date(),
          suggestions: getSuggestions()
        }]);
      }, 300);
    }
  }, [isOpen, userRole, currentView]);

  // 根据上下文生成智能建议
  const getSuggestions = () => {
    const suggestions: { [key: string]: string[] } = {
      dashboard: [
        "分析研发部门离职风险",
        "生成组织健康报告",
        "预测下季度人才需求"
      ],
      recruiting: [
        "生成候选人对比分析",
        "创建智能面试问题",
        "优化招聘流程建议"
      ],
      performance: [
        "预测员工绩效趋势",
        "生成晋升准备度报告",
        "创建发展计划"
      ],
      onboarding: [
        "优化入职流程",
        "推荐最佳导师匹配",
        "生成入职体验报告"
      ],
      growth: [
        "分析技能缺口",
        "规划职业发展路径",
        "推荐学习资源"
      ]
    };

    return suggestions[currentView] || ["帮我分析数据", "生成洞察报告", "提供优化建议"];
  };

  // AI响应生成器
  const generateAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // 根据关键词匹配生成相应回答
    if (lowerMessage.includes("分析") || lowerMessage.includes("研发")) {
      return {
        content: "我已完成研发部门的深度分析：\n\n📊 **核心发现**\n• 团队敬业度从85分降至72分（-13%）\n• 跨部门协作频率下降20%\n• 3名核心成员有离职风险\n\n💡 **AI建议**\n1. 立即与团队负责人进行1对1沟通\n2. 组织跨部门协作工作坊\n3. 优化项目分配机制，减少加班时长\n\n预计实施后敬业度将在2个月内恢复至80+。是否需要我生成详细的行动计划？",
        suggestions: ["生成详细行动计划", "查看历史趋势", "对比其他部门"]
      };
    } else if (lowerMessage.includes("面试") || lowerMessage.includes("问题")) {
      return {
        content: "我已为候选人张伟生成了个性化面试问题：\n\n🎯 **技术深度**\n• 请描述您在React性能优化方面最有挑战性的实践\n• 如何设计一个高并发的前端架构？\n\n🧠 **问题解决**\n• 遇到技术债务时，您如何平衡重构与新需求？\n• 描述一次您带领团队攻克技术难题的经历\n\n🤝 **文化契合**\n• 我们注重创新和快速迭代，您如何看待完美主义与敏捷开发的平衡？\n\n这些问题基于候选人的简历和您的团队需求定制。",
        suggestions: ["生成评分标准", "查看候选人对比", "创建面试流程"]
      };
    } else if (lowerMessage.includes("报告") || lowerMessage.includes("生成")) {
      return {
        content: "✨ **AI生成的组织健康报告已就绪**\n\n📈 **整体健康度**: 78/100（良好）\n\n**优势领域**\n• 领导力储备充足（90%就绪率）\n• 员工学习意愿强（85%参与度）\n\n**需关注领域**\n• 研发部门敬业度下滑\n• 销售团队技能缺口扩大\n\n**行动建议**（按优先级）\n1. 🔴 高优：改善研发部门工作环境\n2. 🟡 中优：为销售团队提供技能培训\n3. 🟢 低优：优化绩效考核流程\n\n完整报告已发送至您的邮箱。",
        suggestions: ["下载PDF报告", "分享给团队", "设置提醒跟进"]
      };
    } else if (lowerMessage.includes("预测") || lowerMessage.includes("趋势")) {
      return {
        content: "🔮 **AI预测分析**\n\n基于历史数据和当前趋势，我的预测如下：\n\n**人才流失风险**\n• 未来3个月：研发部门可能有2-3人离职\n• 风险因素：薪酬竞争力、项目压力\n\n**招聘需求预测**\n• Q4预计需招聘：8-10人\n• 重点岗位：高级工程师、产品经理\n\n**敬业度趋势**\n• 如保持现有措施：预计维持在75-78分\n• 如实施建议措施：有望提升至82-85分\n\n可信度：87%（基于24个月数据）",
        suggestions: ["查看详细模型", "调整参数", "导出预测数据"]
      };
    } else if (lowerMessage.includes("职业") || lowerMessage.includes("发展")) {
      return {
        content: "🎯 **为您定制的职业发展路径**\n\n当前定位：产品工程师（中级）\n目标岗位：技术专家 / 技术经理\n\n**成长路径A：技术专家**\n⏱️ 预计时间：18-24个月\n📚 需提升：架构设计、系统优化、技术影响力\n📖 推荐学习：\n  • 《系统设计面试》课程\n  • 内部技术分享3次\n  • 主导1个核心项目重构\n\n**成长路径B：技术经理**\n⏱️ 预计时间：24-30个月\n📚 需提升：团队管理、项目规划、跨部门协作\n📖 推荐学习：\n  • 管理培训营\n  • 导师辅导计划\n  • 带教1-2名初级工程师\n\n我建议您先选择路径A，打好技术基础。",
        suggestions: ["制定学习计划", "寻找导师", "查看晋升要求"]
      };
    } else if (lowerMessage.includes("技能") || lowerMessage.includes("缺口")) {
      return {
        content: "📊 **技能缺口分析**\n\n基于您的岗位要求和当前能力：\n\n**已掌握技能** ✅\n• React/TypeScript (85%)\n• 前端工程化 (80%)\n• 团队协作 (90%)\n\n**需要提升** 📈\n• 系统架构设计 (当前60% → 目标85%)\n• 性能优化 (当前65% → 目标80%)\n• 技术领导力 (当前55% → 目标80%)\n\n**学习建议**\n1. 参加《微服务架构》培训（3周）\n2. 主导性能优化项目（2个月）\n3. 技术分享会讲师（每月1次）\n\n按此计划，6个月内可达到晋升标准。",
        suggestions: ["查看学习资源", "制定时间表", "申请导师辅导"]
      };
    } else if (lowerMessage.includes("晋升") || lowerMessage.includes("准备")) {
      return {
        content: "🎖️ **晋升准备度评估**\n\n综合评分：**78/100**（接近达标）\n\n**评估维度**\n• 技术能力：85/100 ✅ 优秀\n• 业务影响：75/100 ⚠️ 需提升\n• 领导力：70/100 ⚠️ 需提升\n• 文化贡献：80/100 ✅ 良好\n\n**距离晋升还需**\n1. 主导1个重要项目并取得可量化成果\n2. 影响力扩展到2个以上团队\n3. 培养1-2名初级成员\n\n**时间规划**\n预计达标时间：3-4个月\n下次晋升评审：Q4（4个月后）\n\n建议现在开始准备，成功率可达85%+。",
        suggestions: ["查看晋升标准", "寻找项目机会", "申请评审反馈"]
      };
    } else {
      return {
        content: "我理解您的问题。作为AI助手，我可以帮您：\n\n📊 **数据分析**：深度挖掘组织数据，发现隐藏洞察\n🎯 **智能建议**：基于最佳实践提供个性化建议\n🔮 **趋势预测**：预测人才流失、招聘需求等\n📝 **自动生成**：报告、计划、面试问题等\n\n请告诉我您最关心的问题，我会为您提供针对性的帮助。",
        suggestions: getSuggestions()
      };
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // 模拟AI思考和响应
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
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

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 shadow-lg"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Sparkles className="h-7 w-7 text-white" />
            </motion.div>
          </Button>
        </motion.div>
        
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0, y: 100 }}
        animate={{ 
          scale: isMinimized ? 0.3 : 1, 
          opacity: 1, 
          y: 0,
          height: isMinimized ? 60 : 600,
          width: isMinimized ? 60 : 400
        }}
        exit={{ scale: 0, opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Card className="h-full w-full shadow-2xl border-2 border-teal-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-teal-500 to-purple-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <CardTitle className="text-white">AI智能助手</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-white/80">上下文感知 • 智能分析 • 个性化建议</p>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-teal-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                        
                        {/* Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  <Lightbulb className="h-3 w-3 mr-1" />
                                  {suggestion}
                                </Button>
                              </motion.div>
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
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -5, 0] }}
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
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="输入您的问题..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-teal-500 to-purple-500"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
