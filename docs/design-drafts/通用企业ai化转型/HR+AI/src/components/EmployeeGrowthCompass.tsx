import { useState } from "react";
import { motion } from "motion/react";
import { Target, TrendingUp, BookOpen, Users, Star, Lightbulb, Award, ArrowRight, Play, Clock, CheckCircle, Sparkles, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner@2.0.3";
import { AILearningPath } from "./AILearningPath";

export function EmployeeGrowthCompass() {
  const [selectedPath, setSelectedPath] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const currentSkills = [
    { skill: 'React开发', level: 85, target: 90 },
    { skill: 'TypeScript', level: 75, target: 85 },
    { skill: '系统设计', level: 60, target: 80 },
    { skill: '团队协作', level: 80, target: 85 },
    { skill: '产品思维', level: 55, target: 75 },
  ];

  const radarData = [
    { dimension: 'React开发', current: 85, target: 90 },
    { dimension: 'TypeScript', current: 75, target: 85 },
    { dimension: '系统设计', current: 60, target: 80 },
    { dimension: '团队协作', current: 80, target: 85 },
    { dimension: '产品思维', current: 55, target: 75 },
  ];

  const careerPaths = [
    {
      role: '高级产品工程师',
      match: 88,
      timeEstimate: '8-12个月',
      skillGaps: ['系统设计', '产品思维'],
      description: '基于你的当前技能，这是最自然的晋升路径',
    },
    {
      role: '数据分析师',
      match: 75,
      timeEstimate: '18-24个月',
      skillGaps: ['数据分析', 'SQL', 'Python'],
      description: '需要学习新的技能领域，但你的逻辑思维能力很适合',
    },
    {
      role: '技术经理',
      match: 70,
      timeEstimate: '24-30个月',
      skillGaps: ['领导力', '招聘面试', '项目管理'],
      description: '需要从个人贡献者转型为团队管理者',
    },
  ];

  const learningPath = [
    {
      phase: '第1-3个月',
      title: '强化基础',
      courses: [
        { title: 'TypeScript高级特性深度解析', duration: '6小时', completed: false },
        { title: '微服务架构设计模式', duration: '8小时', completed: false },
      ],
      projects: '参与产品架构重构项目',
    },
    {
      phase: '第4-6个月',
      title: '实战提升',
      courses: [
        { title: '大型前端应用性能优化', duration: '10小时', completed: false },
        { title: '产品思维训练营', duration: '12小时', completed: false },
      ],
      projects: '主导一个新功能的全流程开发',
    },
    {
      phase: '第7-12个月',
      title: '精通进阶',
      courses: [
        { title: '技术架构师养成计划', duration: '20小时', completed: false },
        { title: '跨团队沟通与影响力', duration: '8小时', completed: false },
      ],
      projects: '担任关键项目的技术负责人',
    },
  ];

  const recommendedCourses = [
    {
      title: '系统设计面试突破',
      platform: '内部学习平台',
      duration: '8小时',
      rating: 4.8,
      enrolled: 234,
      relevance: 95,
      thumbnail: '🏗️',
    },
    {
      title: '产品经理的一天',
      platform: 'Coursera',
      duration: '5小时',
      rating: 4.6,
      enrolled: 156,
      relevance: 88,
      thumbnail: '💡',
    },
    {
      title: 'React性能优化实战',
      platform: 'Udemy',
      duration: '12小时',
      rating: 4.9,
      enrolled: 432,
      relevance: 92,
      thumbnail: '⚡',
    },
  ];

  const mentors = [
    { name: '张明', role: '资深架构师', expertise: '系统设计 • 技术架构', avatar: 'ZM', available: true },
    { name: '王芳', role: '产品总监', expertise: '产品思维 • 用户体验', avatar: 'WF', available: true },
    { name: '刘强', role: '工程经理', expertise: '团队管理 • 项目交付', avatar: 'LQ', available: false },
  ];

  const handleEnrollCourse = (courseIdx: number) => {
    setEnrolledCourses([...enrolledCourses, courseIdx]);
    toast.success("已加入学习计划", {
      description: "课程已添加到你的学习列表",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-gray-900 mb-2">员工成长罗盘</h2>
        <p className="text-gray-600">掌控你的职业发展，成为自己的CEO</p>
      </motion.div>

      {/* Career Goal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-teal-50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-teal-200/30 to-purple-200/30"
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center gap-4">
              <motion.div 
                className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <Target className="h-8 w-8 text-white" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-gray-900">我的职业目标</h3>
                  <Badge className="bg-purple-500 hover:bg-purple-500">8-12个月</Badge>
                </div>
                <p className="text-gray-700 mb-2">从 产品工程师 → 高级产品工程师</p>
                <Progress value={65} className="h-2 mb-1" />
                <p className="text-sm text-gray-600">已完成 65% 的成长目标</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  调整目标
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList>
          <TabsTrigger value="skills">技能画像</TabsTrigger>
          <TabsTrigger value="paths">发展路径</TabsTrigger>
          <TabsTrigger value="ai-learning">
            <Sparkles className="h-4 w-4 mr-2" />
            AI学习路径
          </TabsTrigger>
          <TabsTrigger value="learning">学习资源</TabsTrigger>
          <TabsTrigger value="mentors">导师网络</TabsTrigger>
        </TabsList>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>当前技能画像</CardTitle>
                <CardDescription>你与目标岗位的能力对比</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                    <Radar dataKey="current" stroke="#00A99D" fill="#00A99D" fillOpacity={0.5} name="当前水平" />
                    <Radar dataKey="target" stroke="#7B68EE" fill="#7B68EE" fillOpacity={0.3} name="目标水平" />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>技能详细分析</CardTitle>
                <CardDescription>针对性提升建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentSkills.map((skill, idx) => {
                    const gap = skill.target - skill.level;
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{skill.skill}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{skill.level}/100</span>
                            {gap > 10 && (
                              <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                                需提升
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={skill.level} className="h-2" />
                          <div 
                            className="absolute top-0 h-2 bg-purple-200 rounded-full opacity-50"
                            style={{ width: `${skill.target}%`, left: 0 }}
                          />
                        </div>
                        {gap > 10 && (
                          <p className="text-xs text-gray-600">距离目标还需提升 {gap} 分</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insight */}
          <Card className="border-teal-200 bg-teal-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-teal-900 mb-2">AI成长建议</p>
                  <ul className="space-y-2 text-sm text-teal-800">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>你的"系统设计"能力是当前最需要提升的短板，建议优先学习相关课程并参与架构讨论</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>你的"React开发"已接近高级水平，可以考虑通过技术分享或指导新人来巩固能力</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>"产品思维"是你晋升的关键差距，建议多参与产品讨论会并主动与产品经理沟通</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Paths Tab */}
        <TabsContent value="paths" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {careerPaths.map((path, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card 
                  className={`cursor-pointer transition-all h-full ${
                    selectedPath === idx 
                      ? 'border-teal-300 shadow-lg' 
                      : 'border-gray-200 hover:border-teal-200 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPath(idx)}
                >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{path.role}</CardTitle>
                      <CardDescription className="mt-1">{path.timeEstimate}</CardDescription>
                    </div>
                    {idx === 0 && (
                      <Badge className="bg-teal-500 hover:bg-teal-500">
                        <Star className="h-3 w-3 mr-1" />
                        推荐
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">匹配度</span>
                        <span className="text-sm text-teal-600">{path.match}%</span>
                      </div>
                      <Progress value={path.match} className="h-2" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-700 mb-2">需要提升的技能：</p>
                      <div className="flex flex-wrap gap-2">
                        {path.skillGaps.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-gray-600">{path.description}</p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant={selectedPath === idx ? "default" : "outline"}
                        className={selectedPath === idx ? "w-full bg-teal-600 hover:bg-teal-700" : "w-full"}
                        onClick={() => setSelectedPath(idx)}
                      >
                        {selectedPath === idx ? (
                          <>
                            <Target className="h-4 w-4 mr-2" />
                            查看学习地图
                          </>
                        ) : (
                          <>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            了解更多
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>

          {/* Learning Path Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>AI生成的个性化学习地图</CardTitle>
              <CardDescription>通往"高级产品工程师"的完整路径规划</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningPath.map((phase, idx) => (
                  <div key={idx} className="relative">
                    {idx < learningPath.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                          idx === 0 ? 'bg-teal-500' : 'bg-gray-300'
                        }`}>
                          <span className="text-white">{idx + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={idx === 0 ? "default" : "outline"} className={idx === 0 ? "bg-teal-500" : ""}>
                            {phase.phase}
                          </Badge>
                          <h4 className="text-gray-900">{phase.title}</h4>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <p className="text-sm text-gray-700 mb-2">推荐课程：</p>
                          <div className="space-y-2">
                            {phase.courses.map((course, cIdx) => (
                              <div key={cIdx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">• {course.title}</span>
                                <span className="text-gray-500 text-xs">{course.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <Award className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span>实战项目：{phase.projects}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Learning Path Tab */}
        <TabsContent value="ai-learning" className="space-y-4">
          <AILearningPath />
        </TabsContent>

        {/* Learning Resources Tab */}
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-600" />
                今日推荐
              </CardTitle>
              <CardDescription>基于你的学习目标和历史，AI为你精选的内容</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {recommendedCourses.map((course, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="h-32 bg-gradient-to-br from-teal-100 to-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-5xl">{course.thumbnail}</span>
                    </div>
                    <h4 className="text-sm text-gray-900 mb-2 line-clamp-2">{course.title}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{course.platform}</Badge>
                      <Badge className="text-xs bg-teal-100 text-teal-700 hover:bg-teal-100">
                        相关度 {course.relevance}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{course.enrolled} 人已学习</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="sm" 
                        className={`w-full ${
                          enrolledCourses.includes(idx)
                            ? 'bg-gray-400 hover:bg-gray-400'
                            : 'bg-teal-600 hover:bg-teal-700'
                        }`}
                        onClick={() => !enrolledCourses.includes(idx) && handleEnrollCourse(idx)}
                        disabled={enrolledCourses.includes(idx)}
                      >
                        {enrolledCourses.includes(idx) ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-2" />
                            已加入
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-2" />
                            开始学习
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl text-teal-600 mb-1">12</div>
                  <p className="text-sm text-gray-600">本月学习课程</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl text-teal-600 mb-1">28h</div>
                  <p className="text-sm text-gray-600">累计学习时长</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl text-teal-600 mb-1">8</div>
                  <p className="text-sm text-gray-600">获得技能认证</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl text-teal-600 mb-1">Top 15%</div>
                  <p className="text-sm text-gray-600">学习排名</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mentors Tab */}
        <TabsContent value="mentors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" />
                推荐导师
              </CardTitle>
              <CardDescription>可以帮助你实现职业目标的资深导师</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {mentors.map((mentor, idx) => (
                  <div 
                    key={idx}
                    className={`border rounded-lg p-6 text-center ${
                      mentor.available 
                        ? 'border-gray-200 hover:border-teal-300 hover:shadow-md cursor-pointer' 
                        : 'border-gray-100 bg-gray-50 opacity-60'
                    } transition-all`}
                  >
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarFallback className="bg-gradient-to-br from-teal-400 to-purple-400 text-white text-xl">
                        {mentor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="text-gray-900 mb-1">{mentor.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{mentor.role}</p>
                    <p className="text-xs text-gray-500 mb-4">{mentor.expertise}</p>
                    <Button 
                      size="sm" 
                      variant={mentor.available ? "default" : "outline"}
                      className={mentor.available ? "w-full bg-teal-600 hover:bg-teal-700" : "w-full"}
                      disabled={!mentor.available}
                    >
                      {mentor.available ? '请求指导' : '暂无空档'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mentor Sessions */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>我的导师会议</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border border-teal-200 bg-teal-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-teal-500 text-white">
                        ZM
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">与张明讨论系统设计</p>
                      <p className="text-xs text-gray-600 mt-1">本周五 14:00 • 视频会议</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-purple-400 text-white">
                        WF
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">产品思维训练</p>
                      <p className="text-xs text-gray-600 mt-1">下周三 15:30 • 会议室A</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>成长里程碑</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Award className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">完成TypeScript进阶认证</p>
                      <p className="text-xs text-gray-500">3天前</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Star className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">第一次技术分享获好评</p>
                      <p className="text-xs text-gray-500">1周前</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Target className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">完成Q2个人目标</p>
                      <p className="text-xs text-gray-500">2周前</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}