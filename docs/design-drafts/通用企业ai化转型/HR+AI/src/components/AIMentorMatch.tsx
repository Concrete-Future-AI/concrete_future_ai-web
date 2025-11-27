import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Users, 
  Star, 
  TrendingUp,
  Heart,
  Zap,
  CheckCircle,
  MessageCircle,
  Calendar,
  Target,
  Award,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";

interface Mentor {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  matchScore: number;
  mentoringExperience: string;
  specialties: string[];
  personality: string[];
  achievements: string[];
  availability: string;
  matchReasons: {
    factor: string;
    score: number;
    explanation: string;
  }[];
}

export function AIMentorMatch() {
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  const mentors: Mentor[] = [
    {
      id: 1,
      name: '张经理',
      role: '高级技术经理',
      department: '产品研发部',
      avatar: 'ZM',
      matchScore: 96,
      mentoringExperience: '已成功辅导8名工程师，5人获得晋升',
      specialties: ['系统架构', '技术管理', '职业规划'],
      personality: ['耐心细致', '善于倾听', '注重实践'],
      achievements: [
        '2024年度最佳导师',
        '主导3个核心系统重构',
        '技术博客累计10万+阅读'
      ],
      availability: '每周二、四下午',
      matchReasons: [
        {
          factor: '技术栈匹配',
          score: 98,
          explanation: '张经理精通React/TypeScript技术栈，与你的学习方向完全一致'
        },
        {
          factor: '职业路径相似',
          score: 95,
          explanation: '张经理从工程师成长为管理者，了解你的职业发展诉求'
        },
        {
          factor: '教学风格契合',
          score: 92,
          explanation: '注重实践和项目驱动，与你的学习偏好高度匹配'
        },
        {
          factor: '共同兴趣',
          score: 88,
          explanation: '同样热爱开源社区和技术分享'
        },
        {
          factor: '时间兼容性',
          score: 90,
          explanation: '可用时间与你的日程安排契合度高'
        }
      ]
    },
    {
      id: 2,
      name: '王芳',
      role: '技术专家',
      department: '架构组',
      avatar: 'WF',
      matchScore: 92,
      mentoringExperience: '辅导过6名工程师，专注技术深度培养',
      specialties: ['前端架构', '性能优化', '工程化'],
      personality: ['技术导向', '严格认真', '追求卓越'],
      achievements: [
        '主导前端架构升级',
        'TechConf演讲嘉宾',
        '开源项目2k+ Stars'
      ],
      availability: '每周三、五上午',
      matchReasons: [
        {
          factor: '技术深度',
          score: 96,
          explanation: '王芳在前端架构和性能优化领域有深厚造诣'
        },
        {
          factor: '学习强度',
          score: 90,
          explanation: '你希望快速提升技术深度，王芳的高强度辅导很适合'
        },
        {
          factor: '项目经验',
          score: 88,
          explanation: '可以带你参与核心架构项目，获得实战经验'
        },
        {
          factor: '社区影响力',
          score: 85,
          explanation: '可以帮助你建立技术影响力和个人品牌'
        },
        {
          factor: '成长速度',
          score: 94,
          explanation: '往届学员平均在6个月内技术能力提升40%'
        }
      ]
    },
    {
      id: 3,
      name: '李强',
      role: '资深工程师',
      department: '产品研发部',
      avatar: 'LQ',
      matchScore: 88,
      mentoringExperience: '新人导师，善于帮助新员工快速融入',
      specialties: ['团队协作', '代码规范', '敏捷开发'],
      personality: ['亲和友善', '平易近人', '耐心指导'],
      achievements: [
        '新人满意度评分9.5/10',
        '团队文化建设贡献者',
        '每月1次新人分享会'
      ],
      availability: '工作时间随时可约',
      matchReasons: [
        {
          factor: '新人友好',
          score: 95,
          explanation: '李强专注于新人辅导，了解新员工的痛点和需求'
        },
        {
          factor: '沟通风格',
          score: 92,
          explanation: '亲和力强，能营造轻松的学习氛围'
        },
        {
          factor: '团队融入',
          score: 90,
          explanation: '可以快速帮助你了解团队文化和工作方式'
        },
        {
          factor: '即时响应',
          score: 86,
          explanation: '工作时间随时可以解答你的问题'
        },
        {
          factor: '实用技能',
          score: 84,
          explanation: '专注于日常工作中最实用的技能培养'
        }
      ]
    }
  ];

  const handleMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      toast.success("AI匹配完成", {
        description: "已为你找到最合适的导师"
      });
    }, 2000);
  };

  const handleSelectMentor = (mentorId: number) => {
    toast.success("导师选择成功", {
      description: "我们会立即为你安排首次见面会"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-gray-900">AI智能导师匹配</h3>
          </div>
          <p className="text-sm text-gray-600">
            基于你的技能、性格、学习目标和时间偏好，AI为你推荐最合适的导师
          </p>
        </div>
        <Button
          onClick={handleMatch}
          disabled={isMatching}
          variant="outline"
          size="sm"
        >
          {isMatching ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
              </motion.div>
              重新匹配...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              重新匹配
            </>
          )}
        </Button>
      </div>

      {/* AI Matching Process */}
      {isMatching && (
        <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
          <CardContent className="py-6 space-y-3">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="h-5 w-5 text-teal-600" />
              </motion.div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-1">分析你的技能档案和学习目标...</p>
                <Progress value={100} className="h-1.5" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-teal-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-1">评估导师的专业领域和辅导风格...</p>
                <Progress value={75} className="h-1.5" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-teal-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-1">计算多维度匹配得分...</p>
                <Progress value={50} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Matching Algorithm Info */}
      <Card className="bg-teal-50 border-teal-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-teal-600 mt-0.5" />
            <div>
              <p className="text-sm text-teal-900 mb-2">
                <strong>AI匹配算法说明：</strong>
              </p>
              <p className="text-sm text-teal-800">
                我们的AI系统综合考虑<strong>技术栈匹配度、职业发展方向、教学风格契合度、
                时间兼容性、个性互补性</strong>等15个维度，使用协同过滤和深度学习模型，
                为你推荐最适合的导师。历史数据显示，AI推荐的导师匹配成功率达到<strong>92%</strong>。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentor Cards */}
      <div className="space-y-4">
        {mentors.map((mentor, idx) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedMentor === mentor.id ? 'ring-2 ring-teal-500' : ''
              }`}
              onClick={() => setSelectedMentor(selectedMentor === mentor.id ? null : mentor.id)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-br from-teal-400 to-blue-400 text-white text-xl">
                        {mentor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {idx === 0 && (
                      <motion.div
                        className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Star className="h-3 w-3 text-white fill-white" />
                      </motion.div>
                    )}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{mentor.name}</h3>
                      <Badge className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI匹配 {mentor.matchScore}%
                      </Badge>
                      {idx === 0 && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          推荐首选
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{mentor.role} · {mentor.department}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mentor.specialties.map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{mentor.mentoringExperience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mentor.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <motion.div
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-2xl text-teal-700">{mentor.matchScore}</span>
                    </motion.div>
                    <p className="text-xs text-gray-600">匹配度</p>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {selectedMentor === mentor.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="border-t pt-4 space-y-4">
                      {/* Match Reasons */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="h-4 w-4 text-teal-600" />
                          <p className="text-sm text-gray-700">AI匹配详情：</p>
                        </div>
                        <div className="space-y-2">
                          {mentor.matchReasons.map((reason, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-900">{reason.factor}</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={reason.score} className="h-1.5 w-20" />
                                  <span className="text-xs text-teal-600">{reason.score}%</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">{reason.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Personality Traits */}
                      <div>
                        <p className="text-sm text-gray-700 mb-2">🎭 个性特点：</p>
                        <div className="flex flex-wrap gap-2">
                          {mentor.personality.map((trait, i) => (
                            <Badge key={i} className="bg-purple-100 text-purple-700">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <p className="text-sm text-gray-700 mb-2">🏆 成就亮点：</p>
                        <ul className="space-y-1">
                          {mentor.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectMentor(mentor.id);
                          }}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          选择Ta作为我的导师
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info("消息已发送", {
                              description: `已向${mentor.name}发送交流请求`
                            });
                          }}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Success Stories */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            导师计划成功案例
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl text-green-600 mb-1">92%</p>
              <p className="text-xs text-gray-600">导师匹配成功率</p>
            </div>
            <div>
              <p className="text-2xl text-green-600 mb-1">6个月</p>
              <p className="text-xs text-gray-600">平均成长加速</p>
            </div>
            <div>
              <p className="text-2xl text-green-600 mb-1">65%</p>
              <p className="text-xs text-gray-600">学员获得晋升</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
