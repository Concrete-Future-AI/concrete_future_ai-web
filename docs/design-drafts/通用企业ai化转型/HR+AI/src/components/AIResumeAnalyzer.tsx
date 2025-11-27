import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain,
  Upload,
  FileText,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Zap,
  Target,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner@2.0.3";

interface Message {
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
  typing?: boolean;
}

interface ResumeAnalysis {
  name: string;
  matchScore: number;
  strengths: { point: string; impact: string }[];
  concerns: { point: string; severity: 'high' | 'medium' | 'low' }[];
  skills: { name: string; proficiency: number; required: number }[];
  experience: { aspect: string; score: number }[];
  recommendations: string[];
}

export function AIResumeAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const analysis: ResumeAnalysis = {
    name: "张伟",
    matchScore: 87,
    strengths: [
      { 
        point: "5年React全栈开发经验，技术栈完美匹配", 
        impact: "可以立即上手核心项目，缩短30%适应周期" 
      },
      { 
        point: "曾主导3个大型系统架构设计", 
        impact: "符合高级工程师的架构能力要求" 
      },
      { 
        point: "有技术团队管理经验（带过5人团队）", 
        impact: "展现出向技术管理发展的潜力" 
      },
      { 
        point: "GitHub开源贡献活跃，技术影响力强", 
        impact: "可以提升团队技术氛围" 
      }
    ],
    concerns: [
      { 
        point: "最近两年跳槽频繁（换了2家公司）", 
        severity: 'medium' as const
      },
      { 
        point: "缺少金融/医疗行业背景（我们的业务领域）", 
        severity: 'low' as const
      },
      { 
        point: "期望薪资略高于预算10%", 
        severity: 'medium' as const
      }
    ],
    skills: [
      { name: "React/TypeScript", proficiency: 90, required: 85 },
      { name: "Node.js后端", proficiency: 85, required: 75 },
      { name: "系统架构设计", proficiency: 80, required: 85 },
      { name: "团队协作", proficiency: 75, required: 80 },
      { name: "项目管理", proficiency: 70, required: 70 }
    ],
    experience: [
      { aspect: "技术深度", score: 88 },
      { aspect: "项目规模", score: 85 },
      { aspect: "领导经验", score: 72 },
      { aspect: "行业匹配", score: 65 },
      { aspect: "稳定性", score: 70 }
    ],
    recommendations: [
      "重点考察：在面试中深入了解频繁跳槽的原因，评估稳定性风险",
      "建议询问：对我们业务领域的兴趣和学习意愿",
      "薪资谈判：可以用成长空间和技术氛围来平衡薪资期望差异",
      "快速通道：技术能力出色，建议加速面试流程以免流失",
      "团队匹配：安排与技术团队成员的交流环节，评估文化契合度"
    ]
  };

  const analysisSteps = [
    { label: "解析简历内容", progress: 100 },
    { label: "提取关键信息", progress: 100 },
    { label: "匹配岗位要求", progress: 85 },
    { label: "评估候选人优势", progress: 70 },
    { label: "识别潜在风险", progress: 60 },
    { label: "生成面试建议", progress: 40 }
  ];

  const aiResponses = {
    greeting: "你好！我已经完成了对张伟简历的深度分析。有什么想了解的吗？",
    跳槽: "关于跳槽频繁的问题，我建议在面试时重点了解：\n\n1. 每次离职的具体原因（是主动还是被动）\n2. 在每家公司的核心成果和收获\n3. 对职业稳定性的看法和未来规划\n\n从简历看，他每次跳槽都有明确的职级提升，可能是在寻找更好的发展机会。我建议重点展示我们的技术成长空间和团队文化。",
    薪资: "薪资方面的建议：\n\n💰 他期望35K，我们预算32K，差距10%\n\n策略建议：\n1. 强调我们的技术氛围和成长机会\n2. 提供股权激励方案\n3. 设置3个月后的调薪考核机制\n4. 突出弹性工作制等软性福利\n\n根据他的技术能力，33-34K是合理的妥协点。考虑到他的架构能力，这个投资是值得的。",
    技术: "技术能力评估非常出色！\n\n✅ React/TypeScript 90分 - 远超我们85分的要求\n✅ 系统架构 80分 - 接近我们的期望\n✅ 有3个大型项目的架构经验\n\n建议面试重点：\n1. 请他详细讲解其中一个架构设计\n2. 问一些实际的系统设计问题\n3. 了解他如何做技术选型和权衡\n\n他的GitHub有2个开源项目，Star数都超过1K，可以作为技术实力的佐证。",
    default: "我可以帮你深入分析以下方面：\n\n• 跳槽频繁的原因和稳定性评估\n• 薪资谈判策略和建议\n• 技术能力的详细评估\n• 面试问题设计\n• 候选人动机分析\n\n你想了解哪个方面？"
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            toast.success("AI分析完成", {
              description: "已生成完整的候选人评估报告"
            });
            // 自动开始对话
            setTimeout(() => {
              setShowChat(true);
              addAIMessage(aiResponses.greeting);
            }, 500);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const addAIMessage = (content: string) => {
    // 先显示打字中状态
    setMessages(prev => [...prev, {
      role: 'ai',
      content: '',
      timestamp: new Date(),
      typing: true
    }]);

    // 模拟打字效果
    setTimeout(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'ai',
          content,
          timestamp: new Date(),
          typing: false
        };
        return newMessages;
      });
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMsg,
      timestamp: new Date()
    }]);
    setInputMessage("");

    // AI响应
    setTimeout(() => {
      let response = aiResponses.default;
      if (userMsg.includes('跳槽') || userMsg.includes('稳定')) {
        response = aiResponses.跳槽;
      } else if (userMsg.includes('薪资') || userMsg.includes('薪水')) {
        response = aiResponses.薪资;
      } else if (userMsg.includes('技术') || userMsg.includes('能力')) {
        response = aiResponses.技术;
      }
      addAIMessage(response);
    }, 500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-gray-900">AI简历智能分析</h3>
          </div>
          <p className="text-sm text-gray-600">
            上传简历，AI将自动解析、评分并提供深度洞察
          </p>
        </div>
        {!analysisComplete && (
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-500 to-purple-500"
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="h-4 w-4 mr-2" />
                </motion.div>
                AI分析中...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                上传并分析简历
              </>
            )}
          </Button>
        )}
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="py-6 space-y-3">
            {analysisSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    idx <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    {idx < currentStep ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : idx === currentStep ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="h-5 w-5 text-white" />
                      </motion.div>
                    ) : (
                      <span className="text-sm text-gray-500">{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{step.label}</span>
                      {idx <= currentStep && (
                        <span className="text-sm text-blue-600">{step.progress}%</span>
                      )}
                    </div>
                    {idx <= currentStep && (
                      <Progress value={step.progress} className="h-1.5" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overall Score */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="py-6">
              <div className="flex items-center gap-6">
                <motion.div
                  className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex flex-col items-center justify-center text-white"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-4xl">{analysis.matchScore}</span>
                  <span className="text-sm">匹配度</span>
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-gray-900">{analysis.name} - 高级前端工程师</h3>
                    <Badge className="bg-green-100 text-green-700">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      强烈推荐
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    AI综合评估：该候选人技术能力出色，与岗位需求高度匹配。
                    建议快速推进面试流程，避免优秀人才流失。
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-500"
                      onClick={() => {
                        setShowChat(!showChat);
                        if (!showChat && messages.length === 0) {
                          addAIMessage(aiResponses.greeting);
                        }
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {showChat ? '关闭AI对话' : '与AI深入探讨'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      查看完整简历
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-500" />
                  核心优势
                </CardTitle>
                <CardDescription>AI识别的候选人亮点</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.strengths.map((strength, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-green-50 rounded-lg p-3 border border-green-200"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-900">{strength.point}</p>
                    </div>
                    <p className="text-xs text-green-700 ml-6">💡 {strength.impact}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Concerns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  需要关注
                </CardTitle>
                <CardDescription>AI识别的潜在风险点</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.concerns.map((concern, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`rounded-lg p-3 border-2 ${getSeverityColor(concern.severity)}`}
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">{concern.point}</p>
                        <Badge className={`mt-2 text-xs ${getSeverityColor(concern.severity)}`}>
                          {concern.severity === 'high' ? '高风险' :
                           concern.severity === 'medium' ? '中风险' : '低风险'}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mt-3">
                  <p className="text-xs text-blue-900">
                    💡 <strong>AI建议：</strong>这些风险点都是可控的，
                    建议在面试中重点了解。不应成为拒绝的理由。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Match */}
          <Card>
            <CardHeader>
              <CardTitle>技能匹配度分析</CardTitle>
              <CardDescription>候选人技能 vs 岗位要求</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-900">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        候选人 {skill.proficiency} / 要求 {skill.required}
                      </span>
                      {skill.proficiency >= skill.required ? (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          ✓ 达标
                        </Badge>
                      ) : (
                        <Badge className="bg-orange-100 text-orange-700 text-xs">
                          ⚠ 略低
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="relative h-6">
                    <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                    />
                    <div 
                      className="absolute top-0 h-full border-l-2 border-dashed border-orange-400"
                      style={{ left: `${skill.required}%` }}
                    >
                      <div className="absolute -top-1 -left-1 h-2 w-2 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI面试建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-2 text-sm text-purple-900"
                  >
                    <Zap className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* AI Chat Interface */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-teal-500" />
                      与AI深入探讨
                    </CardTitle>
                    <CardDescription>
                      问我任何关于这位候选人的问题，比如："如何看待跳槽频繁？"、"薪资怎么谈？"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Messages */}
                    <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                      {messages.map((msg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={
                              msg.role === 'ai' 
                                ? 'bg-gradient-to-br from-teal-400 to-blue-400 text-white'
                                : 'bg-gray-300'
                            }>
                              {msg.role === 'ai' ? '🤖' : '👤'}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex-1 ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
                            <div className={`inline-block rounded-lg px-4 py-2 max-w-md ${
                              msg.role === 'ai'
                                ? 'bg-teal-50 border border-teal-200'
                                : 'bg-blue-500 text-white'
                            }`}>
                              {msg.typing ? (
                                <motion.div className="flex gap-1">
                                  <motion.span
                                    className="h-2 w-2 bg-teal-500 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                  />
                                  <motion.span
                                    className="h-2 w-2 bg-teal-500 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                  />
                                  <motion.span
                                    className="h-2 w-2 bg-teal-500 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                  />
                                </motion.div>
                              ) : (
                                <p className="text-sm whitespace-pre-line">{msg.content}</p>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {msg.timestamp.toLocaleTimeString('zh-CN', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick Questions */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['跳槽频繁怎么看？', '薪资如何谈判？', '技术能力如何？'].map((q) => (
                        <Button
                          key={q}
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setInputMessage(q);
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="问我任何问题..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="min-h-[60px]"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className="bg-teal-500"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
