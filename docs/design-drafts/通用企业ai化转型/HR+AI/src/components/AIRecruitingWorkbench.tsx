import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Send, Users, Clock, TrendingUp, Star, MessageCircle, Calendar, Briefcase, FileText, Sparkles, Brain, CheckCircle, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { toast } from "sonner@2.0.3";
import { AIInterviewAssistant } from "./AIInterviewAssistant";
import { AIResumeAnalyzer } from "./AIResumeAnalyzer";

export function AIRecruitingWorkbench() {
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const [isScheduling, setIsScheduling] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const candidates = [
    {
      id: 1,
      name: '张伟',
      role: '高级前端工程师',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'Node.js'],
      experience: '7年',
      status: 'interview',
      avatar: 'ZW',
      skillMatch: 95,
      experienceMatch: 88,
      cultureMatch: 92
    },
    {
      id: 2,
      name: '李娜',
      role: '全栈工程师',
      matchScore: 88,
      skills: ['Vue', 'Python', 'AWS'],
      experience: '5年',
      status: 'screening',
      avatar: 'LN',
      skillMatch: 90,
      experienceMatch: 85,
      cultureMatch: 85
    },
    {
      id: 3,
      name: '王强',
      role: '前端工程师',
      matchScore: 82,
      skills: ['React', 'JavaScript', 'CSS'],
      experience: '4年',
      status: 'new',
      avatar: 'WQ',
      skillMatch: 85,
      experienceMatch: 78,
      cultureMatch: 80
    },
  ];

  const recruitingFunnel = [
    { stage: '简历投递', count: 156 },
    { stage: '初筛通过', count: 48 },
    { stage: '面试中', count: 18 },
    { stage: 'Offer', count: 5 },
  ];

  const currentCandidate = candidates[selectedCandidate];
  
  const handleScheduleInterview = () => {
    setIsScheduling(true);
    setTimeout(() => {
      setIsScheduling(false);
      toast.success("面试已安排", {
        description: `已向${currentCandidate.name}发送面试邀请`,
      });
    }, 1500);
  };

  const handleSendMessage = () => {
    setShowMessageDialog(false);
    toast.success("消息已发送", {
      description: `消息已发送给${currentCandidate.name}`,
    });
  };
  const radarData = [
    { dimension: '技能匹配', value: currentCandidate.skillMatch },
    { dimension: '经验匹配', value: currentCandidate.experienceMatch },
    { dimension: '文化契合', value: currentCandidate.cultureMatch },
    { dimension: '学习能力', value: 88 },
    { dimension: '沟通能力', value: 90 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'interview':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">面试中</Badge>;
      case 'screening':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">筛选中</Badge>;
      case 'new':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">新简历</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex justify-between items-start"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-gray-900 mb-2">AI招聘工作台</h2>
          <p className="text-gray-600">智能匹配，精准招聘</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Sparkles className="h-4 w-4 mr-2" />
            发布新职位
          </Button>
        </motion.div>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="搜索候选人、职位或技能..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          筛选
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Candidate List */}
        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>候选人列表</CardTitle>
              <CardDescription>高级前端工程师 (18)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidates.map((candidate, idx) => (
                <motion.div 
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`p-4 border rounded-lg transition-all cursor-pointer ${
                    selectedCandidate === idx 
                      ? 'border-teal-300 bg-teal-50 shadow-md' 
                      : 'border-gray-200 hover:border-teal-200 hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedCandidate(idx)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-teal-400 to-purple-400 text-white">
                        {candidate.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-gray-900 truncate">{candidate.name}</p>
                        {candidate.id === 1 && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{candidate.experience} SaaS经验</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">TalentFit</span>
                            <span className="text-xs text-teal-600">{candidate.matchScore}</span>
                          </div>
                          <Progress value={candidate.matchScore} className="h-1.5" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        {getStatusBadge(candidate.status)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Recruiting Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>招聘漏斗</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={recruitingFunnel} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis type="category" dataKey="stage" stroke="#9ca3af" width={70} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00A99D" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Candidate Detail */}
        <div className="col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCandidate}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="bg-gradient-to-br from-teal-400 to-purple-400 text-white text-xl">
                            {currentCandidate.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-gray-900">{currentCandidate.name}</h3>
                          {selectedCandidate === 0 && (
                            <motion.div
                              animate={{ rotate: [0, 15, -15, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                            >
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-gray-600">{currentCandidate.role}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <motion.div 
                              className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              <span className="text-teal-700">{currentCandidate.matchScore}</span>
                            </motion.div>
                            <div>
                              <p className="text-xs text-gray-500">TalentFit 分数</p>
                              <p className="text-sm text-gray-900">极高匹配</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" onClick={() => setShowMessageDialog(true)}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          发消息
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          className="bg-teal-600 hover:bg-teal-700"
                          onClick={handleScheduleInterview}
                          disabled={isScheduling}
                        >
                          {isScheduling ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                              </motion.div>
                              安排中...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              安排面试
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Tabs defaultValue="match" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="match">匹配分析</TabsTrigger>
              <TabsTrigger value="ai-interview">
                <Sparkles className="h-3 w-3 mr-1" />
                AI面试助手
              </TabsTrigger>
              <TabsTrigger value="resume">简历详情</TabsTrigger>
              <TabsTrigger value="interview">面试记录</TabsTrigger>
            </TabsList>

            <TabsContent value="match" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* AI Explanation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-teal-600" />
                      AI可解释性分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">技能匹配度</span>
                        <motion.span 
                          className="text-sm text-teal-600"
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentCandidate.skillMatch}分
                        </motion.span>
                      </div>
                      <Progress value={currentCandidate.skillMatch} className="h-2" />
                      <p className="text-xs text-gray-600">精通React、TypeScript、Node.js，与岗位要求完全匹配</p>
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">经验匹配度</span>
                        <motion.span 
                          className="text-sm text-teal-600"
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {currentCandidate.experienceMatch}分
                        </motion.span>
                      </div>
                      <Progress value={currentCandidate.experienceMatch} className="h-2" />
                      <p className="text-xs text-gray-600">7年SaaS行业经验，曾在知名科技公司担任技术负责人</p>
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">文化契合度</span>
                        <motion.span 
                          className="text-sm text-teal-600"
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {currentCandidate.cultureMatch}分
                        </motion.span>
                      </div>
                      <Progress value={currentCandidate.cultureMatch} className="h-2" />
                      <p className="text-xs text-gray-600">项目经历体现出强烈的创新精神和团队协作能力，与公司价值观高度一致</p>
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Radar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>综合能力雷达</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6b7280', fontSize: 11 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                        <Radar dataKey="value" stroke="#00A99D" fill="#00A99D" fillOpacity={0.5} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights */}
              <Card className="border-teal-200 bg-teal-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-teal-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-teal-900 mb-2">AI推荐理由</p>
                      <ul className="space-y-2 text-sm text-teal-800">
                        <li className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>技术能力突出，GitHub上有多个高星项目，社区活跃度高</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>曾在类似规模的SaaS公司担任技术Lead，有丰富的团队管理经验</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>简历中多次提及"用户体验"和"产品思维"，与我司重视产品文化的理念契合</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>候选人时间线</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-gray-900">简历投递</p>
                        <p className="text-xs text-gray-500">2025-10-20 14:30</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-gray-900">AI初筛通过</p>
                        <p className="text-xs text-gray-500">2025-10-20 15:00</p>
                        <p className="text-xs text-teal-600 mt-1">匹配分 95/100</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <Clock className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">等待安排初试</p>
                        <p className="text-xs text-gray-500">待处理</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-interview">
              <AIInterviewAssistant candidate={currentCandidate} />
            </TabsContent>

            <TabsContent value="resume">
              <AIResumeAnalyzer candidate={currentCandidate} />
            </TabsContent>

            <TabsContent value="interview">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600">暂无面试记录</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Message Dialog */}
      <AnimatePresence>
        {showMessageDialog && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMessageDialog(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-96 max-w-[90vw]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">发送消息给 {currentCandidate.name}</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowMessageDialog(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <textarea
                className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none text-sm"
                placeholder="输入消息内容..."
              />
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowMessageDialog(false)}>
                  取消
                </Button>
                <Button className="flex-1 bg-teal-600 hover:bg-teal-700" onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  发送
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}