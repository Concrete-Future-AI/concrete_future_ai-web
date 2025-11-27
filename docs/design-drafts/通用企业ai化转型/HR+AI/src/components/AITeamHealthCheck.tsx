import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain,
  MessageSquare,
  Sparkles,
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Send,
  Zap,
  Heart,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";

interface DiagnosisStep {
  id: string;
  question: string;
  type: 'choice' | 'scale' | 'text';
  options?: string[];
  scaleLabels?: { min: string; max: string };
}

interface TeamInsight {
  category: string;
  score: number;
  status: 'good' | 'warning' | 'critical';
  insight: string;
  recommendations: string[];
}

export function AITeamHealthCheck() {
  const [phase, setPhase] = useState<'intro' | 'diagnosis' | 'result'>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const diagnosisSteps: DiagnosisStep[] = [
    {
      id: 'team_size',
      question: '你的团队有多少人？',
      type: 'choice',
      options: ['5人以下', '6-10人', '11-20人', '20人以上']
    },
    {
      id: 'morale',
      question: '团队最近的士气如何？',
      type: 'scale',
      scaleLabels: { min: '非常低落', max: '非常高涨' }
    },
    {
      id: 'communication',
      question: '团队内部沟通效率怎么样？',
      type: 'scale',
      scaleLabels: { min: '很差', max: '很好' }
    },
    {
      id: 'workload',
      question: '最近的工作负荷如何？',
      type: 'scale',
      scaleLabels: { min: '很轻松', max: '超负荷' }
    },
    {
      id: 'turnover',
      question: '过去3个月团队离职情况？',
      type: 'choice',
      options: ['无人离职', '1人离职', '2-3人离职', '3人以上离职']
    },
    {
      id: 'collaboration',
      question: '团队协作氛围如何？',
      type: 'scale',
      scaleLabels: { min: '很糟糕', max: '非常融洽' }
    },
    {
      id: 'concerns',
      question: '你最担心的团队问题是什么？',
      type: 'text'
    }
  ];

  const insights: TeamInsight[] = [
    {
      category: '团队士气',
      score: 65,
      status: 'warning',
      insight: '团队士气处于中等偏下水平，存在改善空间。结合你提到的工作负荷较重，这可能是导致士气不高的主要原因。',
      recommendations: [
        '组织团队建设活动，放松紧张的工作氛围',
        '设置"无会议日"，给团队连续的专注时间',
        '公开认可团队成员的贡献，增强成就感'
      ]
    },
    {
      category: '沟通协作',
      score: 72,
      status: 'good',
      insight: '团队沟通效率总体良好，但还有提升空间。建议建立更规范的沟通机制。',
      recommendations: [
        '每周固定时间进行团队同步会议',
        '使用协作工具提高异步沟通效率',
        '鼓励面对面交流，减少信息误解'
      ]
    },
    {
      category: '工作负荷',
      score: 35,
      status: 'critical',
      insight: '⚠️ 工作负荷过重是当前最紧急的问题！这会直接导致倦怠和离职风险上升。',
      recommendations: [
        '🚨 紧急：评估当前项目优先级，砍掉非关键任务',
        '向上争取资源，考虑扩充团队或外部支持',
        '推行更严格的需求评审，避免过度承诺',
        '关注团队成员的加班情况，强制休息'
      ]
    },
    {
      category: '人才稳定性',
      score: 78,
      status: 'good',
      insight: '人才流失率在可控范围内，团队相对稳定。继续保持关注。',
      recommendations: [
        '定期进行一对一沟通，了解成员诉求',
        '提供清晰的职业发展路径',
        '关注高绩效员工的保留'
      ]
    },
    {
      category: '团队协作',
      score: 80,
      status: 'good',
      insight: '团队协作氛围良好，成员之间关系融洽。这是团队的核心优势，要继续保持。',
      recommendations: [
        '继续营造开放包容的团队文化',
        '建立知识分享机制，促进成员间互助',
        '组织跨职能协作项目，增强凝聚力'
      ]
    }
  ];

  const conversationFlows = {
    greeting: `你好！我是AI团队健康诊断助手小境 🏥\n\n我会通过几个简单的问题，帮你快速诊断团队的健康状况，并提供个性化的改善建议。\n\n这个诊断大约需要3分钟，准备好了吗？`,
    负荷: `工作负荷过重确实是个严重问题，我来帮你分析一下应对策略：\n\n**短期措施（1-2周）：**\n1. 🚨 召开紧急会议，与团队共同评估所有在进行的项目\n2. 📊 使用"紧急-重要"矩阵，识别可以推迟或取消的任务\n3. 🛡️ 为团队争取"缓冲时间"，拒绝新的临时需求\n\n**中期调整（1-2月）：**\n1. 📈 向上级展示数据：加班时长、项目延期风险、团队压力指数\n2. 💰 申请临时外部资源或实习生支持\n3. 🔄 优化流程，减少不必要的会议和重复工作\n\n**长期建设（3-6月）：**\n1. 👥 规划团队扩充，提交招聘需求\n2. 🤖 引入自动化工具，提升效率\n3. 📚 建立知识库，减少沟通成本\n\n需要我帮你准备向上汇报的材料吗？`,
    士气: `提升团队士气需要组合拳，我给你一个行动清单：\n\n**立即可做（本周）：**\n✅ 在团队会议上公开表扬近期的优秀表现\n✅ 请团队吃一顿饭/下午茶，非正式交流\n✅ 给过度加班的成员强制放半天假\n\n**短期见效（2-4周）：**\n🎯 设定一个短期可达成的团队目标，庆祝小胜利\n🎮 组织轻松的团建活动（桌游、运动等）\n💬 一对一了解每个人的状态和诉求\n\n**持续改善（长期）：**\n🌟 建立定期认可机制（周度/月度优秀员工）\n📈 让团队看到成长：技能培训、晋升机会\n🔊 增加透明度：分享团队成果和公司认可\n\n关键是要让团队感受到：他们的付出被看见、被认可、被重视！\n\n要我帮你设计具体的团建方案吗？`,
    default: `我已经完成了团队健康诊断。从报告来看：\n\n✅ 你的团队在协作和稳定性方面表现不错\n⚠️ 但工作负荷过重是最紧急的问题\n💡 士气和沟通还有改善空间\n\n你最想先解决哪个问题？我可以给你具体的行动方案。`
  };

  const handleStartDiagnosis = () => {
    setPhase('diagnosis');
    toast.success("开始诊断", {
      description: "请根据团队实际情况回答问题"
    });
  };

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [diagnosisSteps[currentStep].id]: value });
    
    if (currentStep < diagnosisSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      // 完成诊断，开始分析
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setPhase('result');
        toast.success("诊断完成", {
          description: "AI已生成团队健康报告"
        });
        // 自动开始对话
        setTimeout(() => {
          addAIMessage(conversationFlows.default);
        }, 500);
      }, 3000);
    }
  };

  const addAIMessage = (content: string) => {
    setChatMessages(prev => [...prev, {
      role: 'ai',
      content: '',
      typing: true,
      timestamp: new Date()
    }]);

    setTimeout(() => {
      setChatMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'ai',
          content,
          typing: false,
          timestamp: new Date()
        };
        return newMessages;
      });
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setChatMessages(prev => [...prev, {
      role: 'user',
      content: userMsg,
      timestamp: new Date()
    }]);
    setInputMessage("");

    setTimeout(() => {
      let response = conversationFlows.default;
      if (userMsg.includes('负荷') || userMsg.includes('加班') || userMsg.includes('忙')) {
        response = conversationFlows.负荷;
      } else if (userMsg.includes('士气') || userMsg.includes('氛围')) {
        response = conversationFlows.士气;
      }
      addAIMessage(response);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'critical': return <AlertTriangle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-gray-900">AI团队健康诊断</h3>
        </div>
        <p className="text-sm text-gray-600">
          3分钟快速诊断团队健康状况，获取个性化改善建议
        </p>
      </div>

      {/* Intro Phase */}
      {phase === 'intro' && (
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-teal-50">
          <CardContent className="py-12">
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center mx-auto mb-6"
              >
                <Activity className="h-12 w-12 text-white" />
              </motion.div>
              
              <h3 className="text-gray-900 mb-3">团队健康诊断</h3>
              <p className="text-gray-600 mb-6">
                通过AI驱动的诊断问卷，我会帮你：
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4">
                  <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">识别团队问题</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">评估健康指数</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Sparkles className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">生成AI洞察</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Zap className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">提供行动方案</p>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleStartDiagnosis}
                className="bg-gradient-to-r from-green-500 to-teal-500"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                开始诊断（约3分钟）
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diagnosis Phase */}
      {phase === 'diagnosis' && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 border-teal-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>问题 {currentStep + 1} / {diagnosisSteps.length}</CardTitle>
                <Badge variant="outline">
                  {Math.round(((currentStep) / diagnosisSteps.length) * 100)}% 完成
                </Badge>
              </div>
              <Progress value={((currentStep) / diagnosisSteps.length) * 100} className="h-2" />
            </CardHeader>
            <CardContent className="py-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-2xl mx-auto"
              >
                <h3 className="text-gray-900 mb-6 text-center">
                  {diagnosisSteps[currentStep].question}
                </h3>

                {diagnosisSteps[currentStep].type === 'choice' && (
                  <div className="grid grid-cols-2 gap-3">
                    {diagnosisSteps[currentStep].options?.map((option, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full h-16"
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {diagnosisSteps[currentStep].type === 'scale' && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{diagnosisSteps[currentStep].scaleLabels?.min}</span>
                      <span>{diagnosisSteps[currentStep].scaleLabels?.max}</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <motion.button
                          key={score}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleAnswer(score)}
                          className="h-12 w-12 rounded-full border-2 border-teal-300 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all"
                        >
                          {score}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {diagnosisSteps[currentStep].type === 'text' && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="请简单描述你的担忧..."
                      className="min-h-[120px]"
                      onBlur={(e) => {
                        if (e.target.value.trim()) {
                          handleAnswer(e.target.value);
                        }
                      }}
                    />
                    <Button
                      className="w-full"
                      onClick={() => handleAnswer(document.querySelector('textarea')?.value || '')}
                    >
                      下一题
                    </Button>
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Analyzing Phase */}
      {isAnalyzing && (
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="py-12">
            <div className="text-center max-w-md mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-6"
              >
                <Brain className="h-10 w-10 text-white" />
              </motion.div>
              
              <h3 className="text-gray-900 mb-3">AI正在分析中...</h3>
              <p className="text-sm text-gray-600 mb-6">
                正在综合你的回答，生成团队健康报告
              </p>
              
              <div className="space-y-2 text-left">
                {['分析团队规模和结构', '评估士气和工作负荷', '识别潜在风险点', '生成个性化建议'].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.5 }}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Phase */}
      {phase === 'result' && (
        <div className="grid grid-cols-3 gap-6">
          {/* Health Report */}
          <div className="col-span-2 space-y-4">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  团队健康报告
                </CardTitle>
                <CardDescription>AI综合诊断结果</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className={`border-2 ${
                      insight.status === 'good' ? 'border-green-200 bg-green-50' :
                      insight.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                      'border-red-200 bg-red-50'
                    }`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`h-10 w-10 rounded-full ${getStatusColor(insight.status)} flex items-center justify-center`}>
                              {getStatusIcon(insight.status)}
                            </div>
                            <div>
                              <h4 className="text-gray-900">{insight.category}</h4>
                              <p className="text-sm text-gray-600">健康指数: {insight.score}/100</p>
                            </div>
                          </div>
                          <Progress value={insight.score} className="w-32 h-2" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-3">{insight.insight}</p>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-700 mb-2">🎯 AI建议：</p>
                          <ul className="space-y-1">
                            {insight.recommendations.map((rec, i) => (
                              <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                                <span className="text-teal-500 mt-0.5">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* AI Chat */}
          <div className="col-span-1">
            <Card className="border-2 border-teal-200 sticky top-4">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-teal-500" />
                  与AI讨论
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={
                          msg.role === 'ai'
                            ? 'bg-gradient-to-br from-teal-400 to-green-400 text-white'
                            : 'bg-gray-300'
                        }>
                          {msg.role === 'ai' ? '🏥' : '👤'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
                        <div className={`inline-block rounded-lg px-3 py-2 text-sm max-w-[200px] ${
                          msg.role === 'ai'
                            ? 'bg-teal-50 border border-teal-200'
                            : 'bg-blue-500 text-white'
                        }`}>
                          {msg.typing ? (
                            <motion.div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.span
                                  key={i}
                                  className="h-2 w-2 bg-teal-400 rounded-full"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                />
                              ))}
                            </motion.div>
                          ) : (
                            <p className="whitespace-pre-line">{msg.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="问我..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[60px] text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-teal-500"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['工作负荷怎么办？', '如何提升士气？'].map((q) => (
                      <Button
                        key={q}
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs"
                        onClick={() => {
                          setInputMessage(q);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
