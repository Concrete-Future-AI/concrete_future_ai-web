import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Check,
  Brain,
  Target,
  Users,
  Code,
  Lightbulb,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import { Progress } from "./ui/progress";

interface Candidate {
  name: string;
  role: string;
  skills: string[];
  experience: string;
}

interface AIInterviewAssistantProps {
  candidate: Candidate;
}

interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  purpose: string;
  expectedAnswer: string;
  followUp: string[];
}

export function AIInterviewAssistant({ candidate }: AIInterviewAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: 'good' | 'bad' | null }>({});

  // AI生成的面试问题
  const technicalQuestions: InterviewQuestion[] = [
    {
      id: 't1',
      category: '技术深度',
      question: `请描述您在React性能优化方面最有挑战性的实践，特别是在处理大型列表渲染时的经验。`,
      purpose: '评估候选人对React性能优化的实战经验和深度理解',
      expectedAnswer: '应提到虚拟化（react-window/react-virtualized）、useMemo/useCallback、React.memo、代码分割等技术',
      followUp: [
        '如何定位和分析性能瓶颈？',
        '遇到过哪些React性能陷阱？',
        '如何在性能和代码可维护性之间平衡？'
      ]
    },
    {
      id: 't2',
      category: '系统设计',
      question: `如果让您设计一个高并发的前端架构来支持万级在线用户，您会如何设计？`,
      purpose: '考察系统设计能力和架构思维',
      expectedAnswer: '应涵盖CDN、负载均衡、状态管理、缓存策略、WebSocket优化、微前端等',
      followUp: [
        '如何处理实时通信的性能问题？',
        '状态管理方案的选型依据是什么？',
        '如何监控和保障前端稳定性？'
      ]
    },
    {
      id: 't3',
      category: 'TypeScript',
      question: `请分享一个您使用TypeScript泛型解决实际问题的案例，以及为什么选择这种方式。`,
      purpose: '评估TypeScript高级特性的掌握程度',
      expectedAnswer: '应展示泛型约束、条件类型、映射类型等高级用法的实际应用',
      followUp: [
        'TypeScript给项目带来了什么价值？',
        '如何平衡类型安全和开发效率？',
        '遇到过类型系统的局限性吗？如何解决？'
      ]
    }
  ];

  const problemSolvingQuestions: InterviewQuestion[] = [
    {
      id: 'p1',
      category: '问题解决',
      question: `请描述一次您遇到技术债务积累严重的情况，您是如何在重构和新需求之间做出权衡的？`,
      purpose: '考察在压力下的决策能力和技术领导力',
      expectedAnswer: '应体现业务理解、技术判断、团队沟通和渐进式重构的思路',
      followUp: [
        '如何说服团队投入时间重构？',
        '制定了什么样的重构策略？',
        '最终效果如何？有什么教训？'
      ]
    },
    {
      id: 'p2',
      category: '技术选型',
      question: `在您的项目中，为什么选择使用${candidate.skills[0]}而不是其他替代方案？`,
      purpose: '评估技术选型的思考深度和全局视野',
      expectedAnswer: '应考虑团队技术栈、项目需求、生态系统、长期维护等多个维度',
      followUp: [
        '这个选择后来被证明是正确的吗？',
        '如果重新选择会有什么不同？',
        '如何保持技术选型的前瞻性？'
      ]
    }
  ];

  const culturalQuestions: InterviewQuestion[] = [
    {
      id: 'c1',
      category: '文化契合',
      question: `我们团队非常注重创新和快速迭代，同时也追求代码质量。您如何看待完美主义与敏捷开发之间的平衡？`,
      purpose: '评估价值观和工作方式的匹配度',
      expectedAnswer: '应展现对质量和速度平衡的理解，以及实际的权衡经验',
      followUp: [
        '给出一个您权衡质量和速度的具体案例',
        '如何定义"足够好"的标准？',
        '您理想的团队文化是什么样的？'
      ]
    },
    {
      id: 'c2',
      category: '团队协作',
      question: `请描述一次您与非技术团队（如产品、设计）产生分歧时的经历，您是如何解决的？`,
      purpose: '考察沟通能力和跨职能协作能力',
      expectedAnswer: '应体现同理心、有效沟通和寻求共赢的思维方式',
      followUp: [
        '您认为工程师应该如何参与产品决策？',
        '如何向非技术人员解释技术限制？',
        '最欣赏的产品/设计师特质是什么？'
      ]
    },
    {
      id: 'c3',
      category: '学习成长',
      question: `您如何保持技术敏感度并持续学习？请分享您最近学习的新技术以及为什么选择它。`,
      purpose: '评估学习能力和技术热情',
      expectedAnswer: '应展现主动学习、有目的的学习和学以致用的习惯',
      followUp: [
        '您的技术信息来源有哪些？',
        '如何判断一个新技术值不值得学？',
        '您会如何在团队中分享学习成果？'
      ]
    }
  ];

  const handleCopy = (questionId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(questionId);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("已复制到剪贴板");
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("问题已更新", {
        description: "AI基于最新面试趋势重新生成了问题"
      });
    }, 1500);
  };

  const handleRating = (questionId: string, rating: 'good' | 'bad') => {
    setRatings(prev => ({
      ...prev,
      [questionId]: prev[questionId] === rating ? null : rating
    }));
    
    if (ratings[questionId] !== rating) {
      toast.success(rating === 'good' ? '感谢反馈！' : '我们会改进这个问题');
    }
  };

  const QuestionCard = ({ question }: { question: InterviewQuestion }) => {
    const isCopied = copiedId === question.id;
    const rating = ratings[question.id];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group"
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {question.category}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs">
                    <Brain className="h-3 w-3 mr-1" />
                    AI生成
                  </Badge>
                </div>
                <p className="text-gray-900">{question.question}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Purpose */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-blue-600 mb-1">考察目的</p>
                  <p className="text-sm text-blue-900">{question.purpose}</p>
                </div>
              </div>
            </div>

            {/* Expected Answer */}
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-green-600 mb-1">期望回答要点</p>
                  <p className="text-sm text-green-900">{question.expectedAnswer}</p>
                </div>
              </div>
            </div>

            {/* Follow-up Questions */}
            <div>
              <p className="text-xs text-gray-600 mb-2">追问建议：</p>
              <ul className="space-y-1">
                {question.followUp.map((followUp, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-teal-500 mt-1">•</span>
                    <span>{followUp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => handleCopy(question.id, question.question)}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      复制问题
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className={`h-7 w-7 p-0 ${rating === 'good' ? 'text-green-600' : 'text-gray-400'}`}
                  onClick={() => handleRating(question.id, 'good')}
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className={`h-7 w-7 p-0 ${rating === 'bad' ? 'text-red-600' : 'text-gray-400'}`}
                  onClick={() => handleRating(question.id, 'bad')}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <h3 className="text-gray-900">AI面试助手</h3>
          </div>
          <p className="text-sm text-gray-600">
            为 {candidate.name} ({candidate.role}) 定制的智能面试问题
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          disabled={isGenerating}
        >
          <RefreshCw className={`h-3 w-3 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? '生成中...' : '重新生成'}
        </Button>
      </div>

      {/* AI Analysis */}
      {isGenerating && (
        <Card className="bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200">
          <CardContent className="py-4">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="h-5 w-5 text-purple-600" />
              </motion.div>
              <p className="text-sm text-gray-700">AI正在分析候选人背景...</p>
            </div>
            <Progress value={66} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Questions Tabs */}
      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="technical">
            <Code className="h-4 w-4 mr-2" />
            技术深度 ({technicalQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="problem-solving">
            <Brain className="h-4 w-4 mr-2" />
            问题解决 ({problemSolvingQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="cultural">
            <Users className="h-4 w-4 mr-2" />
            文化契合 ({culturalQuestions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-4 mt-4">
          {technicalQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </TabsContent>

        <TabsContent value="problem-solving" className="space-y-4 mt-4">
          {problemSolvingQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </TabsContent>

        <TabsContent value="cultural" className="space-y-4 mt-4">
          {culturalQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Quick Tips */}
      <Card className="bg-teal-50 border-teal-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-teal-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-teal-900">
                <strong>面试小贴士：</strong>保持开放式提问，给候选人充分表达的空间。
                记住STAR法则（Situation、Task、Action、Result）引导候选人分享具体案例。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
