import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Clock,
  Award,
  Zap,
  CheckCircle,
  Play,
  Lock,
  Sparkles,
  ChevronRight,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";

interface LearningModule {
  id: string;
  title: string;
  type: 'course' | 'project' | 'reading' | 'practice';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  locked: boolean;
  aiRecommendation: string;
  skills: string[];
  outcomes: string[];
  prerequisite?: string;
}

export function AILearningPath() {
  const [selectedPath, setSelectedPath] = useState<'technical' | 'leadership'>('technical');
  const [enrolledModules, setEnrolledModules] = useState<Set<string>>(new Set(['m1', 'm2']));
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set(['m1']));

  const paths = {
    technical: {
      title: '技术专家路径',
      targetRole: '技术专家 / 架构师',
      estimatedTime: '18-24个月',
      matchScore: 88,
      description: 'AI分析你的技术能力和学习速度，为你定制从高级工程师到技术专家的成长路径',
      modules: [
        {
          id: 'm1',
          title: 'TypeScript高级特性与实践',
          type: 'course' as const,
          duration: '8小时',
          difficulty: 'intermediate' as const,
          completed: true,
          locked: false,
          aiRecommendation: '基于你当前75%的TS掌握度，这门课将帮助你提升到90%+',
          skills: ['泛型编程', '类型体操', '声明文件'],
          outcomes: [
            '掌握高级类型系统',
            '能够设计类型安全的API',
            '理解TS编译原理'
          ]
        },
        {
          id: 'm2',
          title: '微服务架构设计模式',
          type: 'course' as const,
          duration: '12小时',
          difficulty: 'advanced' as const,
          completed: false,
          locked: false,
          aiRecommendation: 'AI检测到你的系统设计能力是技能缺口，优先学习这门课',
          skills: ['服务拆分', 'API设计', '分布式系统'],
          outcomes: [
            '理解微服务架构原则',
            '掌握服务拆分方法论',
            '学会设计可扩展系统'
          ]
        },
        {
          id: 'm3',
          title: '实战项目：重构遗留系统',
          type: 'project' as const,
          duration: '2个月',
          difficulty: 'advanced' as const,
          completed: false,
          locked: false,
          prerequisite: 'm2',
          aiRecommendation: '实践项目将巩固你的架构知识，建议在完成课程后立即开始',
          skills: ['重构技巧', '架构演进', '技术债管理'],
          outcomes: [
            '主导核心系统重构',
            '积累大型项目经验',
            '提升技术影响力'
          ]
        },
        {
          id: 'm4',
          title: '前端性能优化深度实践',
          type: 'course' as const,
          duration: '10小时',
          difficulty: 'advanced' as const,
          completed: false,
          locked: true,
          prerequisite: 'm3',
          aiRecommendation: '完成重构项目后，你将具备学习性能优化的实战基础',
          skills: ['性能分析', '渲染优化', '网络优化'],
          outcomes: [
            '掌握性能优化方法论',
            '能够定位性能瓶颈',
            '实现量化性能提升'
          ]
        },
        {
          id: 'm5',
          title: '技术架构师养成计划',
          type: 'course' as const,
          duration: '20小时',
          difficulty: 'advanced' as const,
          completed: false,
          locked: true,
          prerequisite: 'm4',
          aiRecommendation: '这是你成为技术专家的最后冲刺，AI预测完成率85%',
          skills: ['架构决策', '技术选型', '团队影响力'],
          outcomes: [
            '具备架构师思维',
            '能够主导技术决策',
            '成为团队技术领袖'
          ]
        },
        {
          id: 'm6',
          title: '开源项目贡献与技术影响力建设',
          type: 'practice' as const,
          duration: '持续进行',
          difficulty: 'advanced' as const,
          completed: false,
          locked: true,
          prerequisite: 'm5',
          aiRecommendation: '通过开源贡献建立行业影响力，这是技术专家的重要特征',
          skills: ['社区运营', '技术写作', '演讲能力'],
          outcomes: [
            '获得行业认可',
            '扩大技术影响力',
            '建立个人品牌'
          ]
        }
      ]
    },
    leadership: {
      title: '技术管理路径',
      targetRole: '技术经理 / 研发总监',
      estimatedTime: '24-30个月',
      matchScore: 70,
      description: 'AI评估你的领导潜质和管理意愿，为你设计从IC到管理者的转型路径',
      modules: [
        {
          id: 'l1',
          title: '技术团队管理基础',
          type: 'course' as const,
          duration: '10小时',
          difficulty: 'intermediate' as const,
          completed: false,
          locked: false,
          aiRecommendation: '转型管理需要系统学习，从基础开始建立管理思维',
          skills: ['1-on-1沟通', '绩效管理', '团队建设'],
          outcomes: [
            '理解管理者角色',
            '掌握基础管理技能',
            '建立管理思维框架'
          ]
        },
        {
          id: 'l2',
          title: '项目管理与敏捷实践',
          type: 'course' as const,
          duration: '12小时',
          difficulty: 'intermediate' as const,
          completed: false,
          locked: false,
          aiRecommendation: '项目管理能力是技术管理者的核心竞争力',
          skills: ['项目规划', '风险管理', 'Scrum/Kanban'],
          outcomes: [
            '能够管理复杂项目',
            '掌握敏捷方法论',
            '提升交付效率'
          ]
        },
        {
          id: 'l3',
          title: '实践：带教2-3名初级工程师',
          type: 'project' as const,
          duration: '3个月',
          difficulty: 'intermediate' as const,
          completed: false,
          locked: true,
          prerequisite: 'l1',
          aiRecommendation: '通过带教实践巩固管理技能，AI会跟踪你的带教效果',
          skills: ['辅导能力', '人才培养', '反馈技巧'],
          outcomes: [
            '培养管理经验',
            '提升影响力',
            '获得管理认可'
          ]
        },
        {
          id: 'l4',
          title: '招聘与面试技巧',
          type: 'course' as const,
          duration: '6小时',
          difficulty: 'advanced' as const,
          completed: false,
          locked: true,
          prerequisite: 'l3',
          aiRecommendation: '管理者需要为团队招募合适的人才',
          skills: ['简历筛选', '面试设计', '候选人评估'],
          outcomes: [
            '设计有效面试流程',
            '准确评估候选人',
            '提升招聘成功率'
          ]
        },
        {
          id: 'l5',
          title: '跨部门协作与影响力',
          type: 'course' as const,
          duration: '8小时',
          difficulty: 'advanced' as const,
          completed: false,
          locked: true,
          prerequisite: 'l4',
          aiRecommendation: '高级管理者需要突破部门墙，建立更大影响力',
          skills: ['沟通技巧', '利益相关方管理', '冲突解决'],
          outcomes: [
            '有效跨部门协作',
            '获得资源支持',
            '推动组织改变'
          ]
        },
        {
          id: 'l6',
          title: '战略思维与组织发展',
          type: 'course' as const,
          duration: '15小时',
          difficulty: 'advanced' as const,
          completed: false,
          locked: true,
          prerequisite: 'l5',
          aiRecommendation: '这将使你具备总监级别的战略视野',
          skills: ['战略规划', '组织设计', 'OKR管理'],
          outcomes: [
            '制定技术战略',
            '规划组织发展',
            '成为高级管理者'
          ]
        }
      ]
    }
  };

  const currentPath = paths[selectedPath];
  const totalModules = currentPath.modules.length;
  const completedCount = currentPath.modules.filter(m => completedModules.has(m.id)).length;
  const overallProgress = (completedCount / totalModules) * 100;

  const handleEnroll = (moduleId: string) => {
    setEnrolledModules(prev => new Set([...prev, moduleId]));
    toast.success("课程已加入学习计划", {
      description: "开始学习，向目标更进一步！"
    });
  };

  const handleComplete = (moduleId: string) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
    toast.success("恭喜完成课程！", {
      description: "你的技能得到了提升"
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'project': return <Target className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Zap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-gray-900">AI个性化学习路径</h3>
        </div>
        <p className="text-sm text-gray-600">
          基于你的职业目标、当前技能和学习速度，AI为你规划最优成长路径
        </p>
      </div>

      {/* Path Selection */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(paths).map(([key, path]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                selectedPath === key 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPath(key as 'technical' | 'leadership')}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base mb-2">{path.title}</CardTitle>
                    <CardDescription className="text-xs mb-3">
                      目标：{path.targetRole}
                    </CardDescription>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI匹配 {path.matchScore}%
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {path.estimatedTime}
                      </Badge>
                    </div>
                  </div>
                  {selectedPath === key && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(overallProgress)}%
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-900">{currentPath.title}</p>
                <p className="text-sm text-gray-600">{completedCount} / {totalModules} 完成</p>
              </div>
              <Progress value={overallProgress} className="h-3 mb-2" />
              <p className="text-xs text-gray-600">
                🎯 预计{currentPath.estimatedTime}达成目标 · 
                AI预测成功率 {currentPath.matchScore}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendation */}
      <Card className="bg-teal-50 border-teal-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-teal-600 mt-0.5" />
            <div>
              <p className="text-sm text-teal-900 mb-1">
                <strong>AI学习建议：</strong>
              </p>
              <p className="text-sm text-teal-800">{currentPath.description}</p>
              <p className="text-xs text-teal-700 mt-2">
                💡 AI会根据你的学习进度和技能提升情况，动态调整后续学习内容
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <div className="space-y-4">
        {currentPath.modules.map((module, idx) => {
          const isEnrolled = enrolledModules.has(module.id);
          const isCompleted = completedModules.has(module.id);
          const isLocked = module.locked;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className={`${isCompleted ? 'bg-green-50 border-green-200' : isLocked ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' :
                      isEnrolled ? 'bg-blue-500' :
                      isLocked ? 'bg-gray-300' :
                      'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : isLocked ? (
                        <Lock className="h-5 w-5 text-gray-500" />
                      ) : (
                        <span className="text-sm text-gray-700">{idx + 1}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-gray-900">{module.title}</h4>
                            {idx === 0 && !isCompleted && (
                              <Badge className="bg-orange-100 text-orange-700">
                                <Star className="h-3 w-3 mr-1" />
                                当前目标
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {getTypeIcon(module.type)}
                              <span className="ml-1">
                                {module.type === 'course' ? '课程' :
                                 module.type === 'project' ? '项目' :
                                 module.type === 'reading' ? '阅读' : '实践'}
                              </span>
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {module.duration}
                            </Badge>
                            <Badge className={`${getDifficultyColor(module.difficulty)} text-xs`}>
                              {module.difficulty === 'beginner' ? '初级' :
                               module.difficulty === 'intermediate' ? '中级' : '高级'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* AI Recommendation */}
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-900">{module.aiRecommendation}</p>
                        </div>
                      </div>

                      {/* Skills & Outcomes */}
                      {!isLocked && (
                        <>
                          <div className="mb-2">
                            <p className="text-xs text-gray-600 mb-1">💼 将掌握的技能：</p>
                            <div className="flex flex-wrap gap-1">
                              {module.skills.map((skill, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-xs text-gray-600 mb-1">🎯 学习成果：</p>
                            <ul className="space-y-0.5">
                              {module.outcomes.map((outcome, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                                  <span className="text-blue-500">•</span>
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {isCompleted ? (
                          <Button size="sm" variant="outline" className="bg-green-50" disabled>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            已完成
                          </Button>
                        ) : isLocked ? (
                          <Button size="sm" variant="outline" disabled>
                            <Lock className="h-4 w-4 mr-2" />
                            需先完成前置课程
                          </Button>
                        ) : isEnrolled ? (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-blue-500"
                              onClick={() => handleComplete(module.id)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              继续学习
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleComplete(module.id)}
                            >
                              标记完成
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleEnroll(module.id)}
                          >
                            <ChevronRight className="h-4 w-4 mr-2" />
                            开始学习
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Success Prediction */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-900 mb-1">
                <strong>AI成功预测：</strong>
              </p>
              <p className="text-sm text-green-800">
                基于你的学习能力评估（⭐⭐⭐⭐☆）和当前进度，
                AI预测你有<strong>{currentPath.matchScore}%</strong>的概率在
                <strong>{currentPath.estimatedTime}</strong>内达成目标。
                保持当前学习节奏，你将成为优秀的{currentPath.targetRole}！
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
