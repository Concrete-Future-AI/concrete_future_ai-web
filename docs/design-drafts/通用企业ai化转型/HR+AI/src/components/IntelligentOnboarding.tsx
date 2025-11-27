import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Circle, Calendar, Users, BookOpen, Coffee, Sparkles, MessageCircle, Trophy, Target, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import { AIMentorMatch } from "./AIMentorMatch";
import { AILearningPath } from "./AILearningPath";

export function IntelligentOnboarding() {
  const [onboardingProgress, setOnboardingProgress] = useState(45);
  const [chatInput, setChatInput] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: '完成入职信息填写', completed: true, time: '已完成' },
    { id: 2, title: '观看公司文化介绍视频', completed: true, time: '已完成' },
    { id: 3, title: '设置工作邮箱和开发环境', completed: true, time: '已完成' },
    { id: 4, title: '与导师张经理首次见面', completed: false, time: '今天 15:00' },
    { id: 5, title: '参加团队欢迎会', completed: false, time: '明天 10:00' },
  ]);

  const handleCompleteTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true, time: '已完成' } : task
    ));
    setOnboardingProgress(prev => Math.min(prev + 10, 100));
    toast.success("任务已完成", {
      description: "恭喜你又完成了一个入职任务！",
    });
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      toast.success("消息已发送", {
        description: "小境正在为你准备回复...",
      });
      setChatInput("");
    }
  };
  


  const monthOneTasks = [
    { id: 6, title: '完成产品培训课程', completed: false, progress: 60 },
    { id: 7, title: '提交第一个代码PR', completed: false, progress: 0 },
    { id: 8, title: '参加3次团队站会', completed: false, progress: 33 },
  ];

  const peopleToMeet = [
    { name: '张经理', role: '你的导师', department: '产品部', common: '复旦大学校友', avatar: 'ZM' },
    { name: '王芳', role: '团队Tech Lead', department: '研发部', common: '同样喜欢篮球', avatar: 'WF' },
    { name: '刘强', role: 'HR BP', department: '人力资源', common: '负责你的入职事宜', avatar: 'LQ' },
  ];

  const learningResources = [
    { title: '公司产品架构深度解析', type: '视频', duration: '45分钟', progress: 100 },
    { title: '研发流程与工具指南', type: '文档', duration: '20分钟', progress: 60 },
    { title: '如何在我们的团队中高效协作', type: '文章', duration: '15分钟', progress: 0 },
  ];

  const chatMessages = [
    { from: 'buddy', message: '嗨，李雪，欢迎加入我们！今天下午3点别忘了和你的导师张经理见面哦！', time: '10:30' },
    { from: 'user', message: '好的，谢谢提醒！会议室在哪里？', time: '10:32' },
    { from: 'buddy', message: '在3楼的"创新"会议室。我已经把会议详情发到你的日历了。需要我帮你导航吗？', time: '10:32' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-gray-900 mb-2">智能入职旅程</h2>
        <p className="text-gray-600">欢迎来到人境AI，让我们一起开启精彩旅程！</p>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-purple-50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-200/30 via-purple-200/30 to-teal-200/30"
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center gap-4">
              <motion.div 
                className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white text-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                key={onboardingProgress}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                {onboardingProgress}%
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900">入职进度</h3>
                  <Badge className="bg-teal-500 hover:bg-teal-500">
                    <Trophy className="h-3 w-3 mr-1" />
                    第5天
                  </Badge>
                </div>
                <Progress value={onboardingProgress} className="h-3 mb-2" />
                <p className="text-sm text-gray-600">太棒了！你已经完成了大部分第一周任务，继续保持！</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList>
          <TabsTrigger value="journey">
            <Calendar className="h-4 w-4 mr-2" />
            入职旅程
          </TabsTrigger>
          <TabsTrigger value="mentor">
            <Sparkles className="h-4 w-4 mr-2" />
            AI导师匹配
          </TabsTrigger>
          <TabsTrigger value="learning">
            <BookOpen className="h-4 w-4 mr-2" />
            学习路径
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="space-y-6 mt-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Onboarding Timeline */}
            <div className="col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal-600" />
                    个性化入职地图
                  </CardTitle>
                  <CardDescription>为你量身定制的入职任务和里程碑</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Week One */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-teal-500 hover:bg-teal-500">第一周</Badge>
                      <span className="text-sm text-gray-600">融入团队，熟悉环境</span>
                    </div>
                    <div className="space-y-3">
                      <AnimatePresence>
                        {tasks.map((task, idx) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer ${
                              task.completed 
                                ? 'bg-gray-50 border-gray-200' 
                                : 'bg-white border-teal-200 shadow-sm hover:shadow-md hover:border-teal-300'
                            }`}
                            onClick={() => !task.completed && handleCompleteTask(task.id)}
                            whileHover={!task.completed ? { x: 4 } : {}}
                          >
                            <motion.div 
                              className="mt-0.5"
                              whileHover={{ scale: 1.2 }}
                            >
                              {task.completed ? (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                >
                                  <CheckCircle className="h-5 w-5 text-teal-500" />
                                </motion.div>
                              ) : (
                                <Circle className="h-5 w-5 text-gray-300" />
                              )}
                            </motion.div>
                            <div className="flex-1">
                              <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                {task.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{task.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Month One */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="border-purple-300 text-purple-700">第一个月</Badge>
                      <span className="text-sm text-gray-600">掌握技能，参与项目</span>
                    </div>
                    <div className="space-y-3">
                      {monthOneTasks.map((task) => (
                        <div 
                          key={task.id}
                          className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-white"
                        >
                          <Circle className="h-5 w-5 text-gray-300 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{task.title}</p>
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-500">进度</span>
                                <span className="text-xs text-teal-600">{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-1.5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quarter One Preview */}
                  <div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-purple-900">第一季度目标预览</span>
                    </div>
                    <ul className="text-sm text-purple-800 space-y-1 ml-6">
                      <li>• 独立负责一个功能模块的开发</li>
                      <li>• 完成技术分享一次</li>
                      <li>• 通过试用期考核</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-600" />
                    智能学习推荐
                  </CardTitle>
                  <CardDescription>AI为你推荐的入职学习资源</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {learningResources.map((resource, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer"
                      >
                        <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{resource.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                            <span className="text-xs text-gray-500">{resource.duration}</span>
                          </div>
                          {resource.progress > 0 && (
                            <div className="mt-2">
                              <Progress value={resource.progress} className="h-1" />
                            </div>
                          )}
                        </div>
                        {resource.progress === 100 && (
                          <CheckCircle className="h-5 w-5 text-teal-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* AI Buddy Chat */}
              <Card className="border-teal-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span>小境 AI助手</span>
                  </CardTitle>
                  <CardDescription>你的7×24入职伙伴</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {chatMessages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <motion.div 
                          className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.from === 'buddy' 
                              ? 'bg-gradient-to-br from-teal-500 to-purple-500' 
                              : 'bg-gray-300'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {msg.from === 'buddy' ? (
                            <Sparkles className="h-4 w-4 text-white" />
                          ) : (
                            <span className="text-white text-xs">李</span>
                          )}
                        </motion.div>
                        <div className={`flex-1 ${msg.from === 'user' ? 'text-right' : ''}`}>
                          <motion.div 
                            className={`inline-block p-3 rounded-lg text-sm ${
                              msg.from === 'buddy' 
                                ? 'bg-teal-50 text-teal-900' 
                                : 'bg-gray-100 text-gray-900'
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            {msg.message}
                          </motion.div>
                          <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="输入消息..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* People to Meet */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-teal-600" />
                    智能破冰推荐
                  </CardTitle>
                  <CardDescription>你应该认识的人</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {peopleToMeet.map((person, idx) => (
                      <motion.div 
                        key={idx} 
                        className="p-3 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-teal-400 to-purple-400 text-white">
                              {person.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{person.name}</p>
                            <p className="text-xs text-gray-500">{person.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-11">
                          <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                            {person.common}
                          </Badge>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-2 ml-11"
                            onClick={() => toast.success("已发送约见请求", { description: `已向${person.name}发送咖啡约见请求` })}
                          >
                            <Coffee className="h-3 w-3 mr-1" />
                            约咖啡聊聊
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Gamification */}
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-600" />
                    成就徽章
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                        <Trophy className="h-6 w-6 text-amber-600" />
                      </div>
                      <p className="text-xs text-amber-900">新人</p>
                    </div>
                    <div className="text-center opacity-40">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500">社交达人</p>
                    </div>
                    <div className="text-center opacity-40">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                        <Target className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500">目标达成</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mentor" className="space-y-6 mt-6">
          <AIMentorMatch />
        </TabsContent>

        <TabsContent value="learning" className="space-y-6 mt-6">
          <AILearningPath />
        </TabsContent>
      </Tabs>
    </div>
  );
}