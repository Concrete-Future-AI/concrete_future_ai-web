import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Target,
  Lightbulb,
  Send,
  ThumbsUp,
  Heart,
  Zap,
  Award,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";

interface Message {
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
  typing?: boolean;
  suggestions?: string[];
}

interface PerformanceContext {
  employee: string;
  currentScore: number;
  previousScore: number;
  strengths: string[];
  improvements: string[];
  goals: { title: string; progress: number }[];
}

export function AIPerformanceCoach() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showContext, setShowContext] = useState(true);

  const context: PerformanceContext = {
    employee: "李雪",
    currentScore: 4.2,
    previousScore: 3.8,
    strengths: [
      "技术能力提升显著，React开发从75分提升到85分",
      "主动性强，本季度主导了2个重要功能开发",
      "团队协作良好，代码Review质量高"
    ],
    improvements: [
      "系统设计能力需要加强",
      "跨部门沟通可以更主动",
      "时间管理有优化空间"
    ],
    goals: [
      { title: "完成TypeScript深度学习", progress: 85 },
      { title: "主导架构重构项目", progress: 60 },
      { title: "指导1名新员工", progress: 40 }
    ]
  };

  const conversationTemplates = {
    greeting: {
      content: `你好！我是AI绩效教练小境。我看到李雪本季度的表现很不错，从3.8分提升到了4.2分 🎉\n\n我可以帮你：\n• 准备一对一绩效面谈\n• 提供具体改进建议\n• 设计下季度发展计划\n• 处理敏感的绩效反馈\n\n你想聊什么？`,
      suggestions: ["如何做好这次绩效面谈？", "她的改进点怎么反馈？", "下季度目标怎么定？"]
    },
    面谈: {
      content: `很好的问题！基于李雪的数据，我建议这样进行面谈：\n\n**开场（5分钟）**\n✅ 先肯定成长：技术能力+0.4分，主动性明显提升\n✅ 营造轻松氛围：问问她这个季度的感受\n\n**核心讨论（20分钟）**\n📊 讨论3个亮点：\n1. React技能从75→85，问她是如何做到的\n2. 主导的2个功能获得好评，请她分享经验\n3. 代码Review质量高，鼓励继续保持\n\n💡 讨论改进方向：\n1. 系统设计：建议报名内部架构课程\n2. 跨部门协作：可以参与产品讨论会\n3. 时间管理：分享番茄工作法\n\n**结尾（5分钟）**\n🎯 共同制定下季度3个目标\n❤️ 询问需要什么支持\n\n需要我帮你准备具体的话术吗？`,
      suggestions: ["给我开场的话术", "改进点的反馈话术", "如何设定下季度目标？"]
    },
    改进: {
      content: `关于改进点的反馈，这是最需要技巧的部分。我建议用"三明治"法：\n\n**1. 先肯定（面包）**\n"李雪，你在技术实现上做得很棒，代码质量很高..."\n\n**2. 再建议（夹心）**\n"我注意到，如果能在系统设计层面有更多思考，你会成长得更快。比如上次的XX功能，如果提前做架构设计，可能会避免后期的重构。你觉得呢？"\n\n**3. 后鼓励（面包）**\n"我看到你学习能力很强，TypeScript课程完成了85%。相信系统设计这块，你也能很快掌握。我可以推荐一些学习资源，也可以安排架构师张明做你的导师，怎么样？"\n\n**关键话术：**\n❌ 不要说："你的系统设计能力不行"\n✅ 应该说："系统设计是你下个阶段的成长机会"\n\n❌ 不要说："你要多和其他部门沟通"\n✅ 应该说："我看到一个让你影响力更大的机会..."\n\n需要针对具体的改进点设计话术吗？`,
      suggestions: ["系统设计怎么说？", "跨部门沟通怎么反馈？", "她可能会有什么反应？"]
    },
    目标: {
      content: `下季度目标设定要遵循SMART原则，同时要有挑战性。基于李雪的情况，我建议：\n\n**目标1：技术深度突破** 🎯\n具体：完成系统架构设计课程，并独立设计1个中等复杂度模块的架构\n可衡量：课程完成度100%，架构方案通过技术评审\n有挑战：从执行者到设计者的转变\n时间：Q4季度\n\n**目标2：跨部门影响力** 🤝\n具体：参加每周产品讨论会，提出至少2个被采纳的技术建议\n可衡量：参会率≥90%，建议采纳率≥30%\n有挑战：需要主动跨出舒适区\n时间：持续整个季度\n\n**目标3：人才培养** 👥\n具体：成为1名新员工的导师，帮助TA快速成长\n可衡量：新员工入职3个月考核达标，反馈满意度≥4.5/5\n有挑战：从个人贡献者到影响他人\n时间：Q4季度\n\n这三个目标既能补短板（系统设计、协作），又能放大优势（技术能力），还为未来晋升铺路。\n\n要调整吗？`,
      suggestions: ["目标会不会太难？", "如何跟踪这些目标？", "她如果达不到怎么办？"]
    },
    default: {
      content: `我可以帮你：\n\n🎯 **面谈准备**\n• 开场话术和氛围营造\n• 讨论重点和时间分配\n• 应对可能的情绪反应\n\n💬 **反馈技巧**\n• 如何表扬更有力\n• 如何批评不伤人\n• 如何激发改进动力\n\n📊 **目标设定**\n• SMART目标设计\n• 挑战性与可达性平衡\n• 跟踪与反馈机制\n\n想深入讨论哪个方面？`,
      suggestions: ["模拟一次完整面谈", "给我一些话术示例", "如何处理她的异议？"]
    }
  };

  const addAIMessage = (content: string, suggestions?: string[]) => {
    setIsTyping(true);
    
    // 先显示打字状态
    setMessages(prev => [...prev, {
      role: 'ai',
      content: '',
      timestamp: new Date(),
      typing: true
    }]);

    // 模拟AI思考和打字
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'ai',
          content,
          timestamp: new Date(),
          typing: false,
          suggestions
        };
        return newMessages;
      });
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMsg = inputMessage.trim();
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMsg,
      timestamp: new Date()
    }]);
    setInputMessage("");

    // 根据关键词匹配回复
    setTimeout(() => {
      let response = conversationTemplates.default;
      
      if (userMsg.includes('面谈') || userMsg.includes('一对一')) {
        response = conversationTemplates.面谈;
      } else if (userMsg.includes('改进') || userMsg.includes('反馈') || userMsg.includes('缺点')) {
        response = conversationTemplates.改进;
      } else if (userMsg.includes('目标') || userMsg.includes('计划')) {
        response = conversationTemplates.目标;
      }
      
      addAIMessage(response.content, response.suggestions);
    }, 500);
  };

  const handleQuickReply = (suggestion: string) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleStartConversation = () => {
    addAIMessage(
      conversationTemplates.greeting.content,
      conversationTemplates.greeting.suggestions
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-gray-900">AI绩效教练</h3>
          </div>
          <p className="text-sm text-gray-600">
            智能辅导管理者进行高质量的绩效面谈和反馈
          </p>
        </div>
        {messages.length === 0 && (
          <Button
            onClick={handleStartConversation}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            开始对话
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Employee Context */}
        <AnimatePresence>
          {showContext && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="col-span-1"
            >
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-base">员工绩效概览</CardTitle>
                  <CardDescription className="text-xs">AI已分析的背景信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Score */}
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-3xl text-purple-600">{context.currentScore}</span>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">+{(context.currentScore - context.previousScore).toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">本季度绩效分数</p>
                  </div>

                  {/* Goals Progress */}
                  <div>
                    <p className="text-xs text-gray-700 mb-2">季度目标进度</p>
                    <div className="space-y-2">
                      {context.goals.map((goal, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{goal.title}</span>
                            <span className="text-xs text-purple-600">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 text-green-600" />
                      <p className="text-xs text-gray-700">优势亮点</p>
                    </div>
                    <ul className="space-y-1">
                      {context.strengths.map((strength, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Target className="h-3 w-3 text-orange-600" />
                      <p className="text-xs text-gray-700">改进方向</p>
                    </div>
                    <ul className="space-y-1">
                      {context.improvements.map((improvement, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-orange-500 mt-0.5">→</span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Interface */}
        <div className={showContext ? "col-span-2" : "col-span-3"}>
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    AI绩效教练对话
                  </CardTitle>
                  <CardDescription>
                    我会根据员工数据，提供个性化的面谈建议和话术
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowContext(!showContext)}
                >
                  {showContext ? '隐藏' : '显示'}上下文
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="space-y-4 mb-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4"
                    >
                      <Brain className="h-10 w-10 text-purple-500" />
                    </motion.div>
                    <h4 className="text-gray-900 mb-2">准备好开始绩效面谈辅导了吗？</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      我会帮你准备面谈内容、设计反馈话术、制定发展计划
                    </p>
                    <Button onClick={handleStartConversation} className="bg-purple-500">
                      <Sparkles className="h-4 w-4 mr-2" />
                      开始对话
                    </Button>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={
                          msg.role === 'ai'
                            ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white text-lg'
                            : 'bg-gray-300'
                        }>
                          {msg.role === 'ai' ? '🎓' : '👤'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
                        <div className={`inline-block rounded-lg px-4 py-3 max-w-lg ${
                          msg.role === 'ai'
                            ? 'bg-purple-50 border border-purple-200'
                            : 'bg-blue-500 text-white'
                        }`}>
                          {msg.typing ? (
                            <div className="flex items-center gap-2">
                              <motion.div className="flex gap-1">
                                <motion.span
                                  className="h-2 w-2 bg-purple-400 rounded-full"
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity }}
                                />
                                <motion.span
                                  className="h-2 w-2 bg-purple-400 rounded-full"
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.span
                                  className="h-2 w-2 bg-purple-400 rounded-full"
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                />
                              </motion.div>
                              <span className="text-sm text-purple-600">AI正在思考...</span>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm whitespace-pre-line">{msg.content}</p>
                              {msg.suggestions && msg.suggestions.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-purple-200">
                                  <p className="text-xs text-purple-700 mb-2">💡 快速提问：</p>
                                  <div className="flex flex-wrap gap-2">
                                    {msg.suggestions.map((suggestion, i) => (
                                      <Button
                                        key={i}
                                        size="sm"
                                        variant="outline"
                                        className="text-xs h-7 border-purple-300 hover:bg-purple-100"
                                        onClick={() => handleQuickReply(suggestion)}
                                      >
                                        {suggestion}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-2">
                          {msg.timestamp.toLocaleTimeString('zh-CN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Input */}
              {messages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="输入你的问题，比如：'如何做好这次绩效面谈？'"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isTyping}
                      className="min-h-[80px] resize-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-purple-500"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-gray-400" />
                    <p className="text-xs text-gray-500">快速操作：</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => handleQuickReply("模拟一次完整的绩效面谈")}
                    >
                      模拟面谈
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => handleQuickReply("给我具体的话术示例")}
                    >
                      话术示例
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => handleQuickReply("如果她不接受怎么办？")}
                    >
                      处理异议
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips Card */}
          {messages.length > 0 && (
            <Card className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="py-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-amber-900">
                      <strong>💡 AI教练提示：</strong>
                      好的绩效面谈要做到"三多三少"：多倾听少说教，多肯定少批评，多未来少过去。
                      记住，目标是激发员工内在动力，而不是单向输出。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
