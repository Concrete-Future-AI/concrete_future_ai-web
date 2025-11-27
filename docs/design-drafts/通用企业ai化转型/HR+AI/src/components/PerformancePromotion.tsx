import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, TrendingUp, Users, Calendar, Target, Star, AlertCircle, CheckCircle, Clock, MessageSquare, FileText, BarChart3, ThumbsUp, ThumbsDown, Sparkles, ArrowUpCircle, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner@2.0.3";
import { Separator } from "./ui/separator";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { AIPerformanceCoach } from "./AIPerformanceCoach";

interface PerformancePromotionProps {
  userRole: 'chro' | 'hrbp' | 'employee';
}

export function PerformancePromotion({ userRole }: PerformancePromotionProps) {
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<number | null>(null);

  // 绩效周期数据
  const performanceCycle = {
    name: '2025年度Q3绩效考核',
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    status: 'active',
    progress: 68,
    participants: 234,
    completed: 159,
  };

  // 绩效分布数据
  const performanceDistribution = [
    { rating: '卓越(S)', count: 15, percentage: 6, color: '#10b981' },
    { rating: '优秀(A)', count: 68, percentage: 29, color: '#3b82f6' },
    { rating: '良好(B)', count: 102, percentage: 44, color: '#f59e0b' },
    { rating: '待改进(C)', count: 42, percentage: 18, color: '#ef4444' },
    { rating: '不合格(D)', count: 7, percentage: 3, color: '#991b1b' },
  ];

  // 部门绩效对比
  const departmentPerformance = [
    { department: '研发', avgScore: 4.2, improvement: 8 },
    { department: '产品', avgScore: 4.5, improvement: 12 },
    { department: '销售', avgScore: 3.8, improvement: -5 },
    { department: '市场', avgScore: 4.1, improvement: 6 },
    { department: '运营', avgScore: 3.9, improvement: 3 },
  ];

  // 晋升候选人
  const promotionCandidates = [
    {
      id: 1,
      name: '张伟',
      currentRole: '高级工程师',
      targetRole: '技术专家',
      score: 92,
      yearsInRole: 2.5,
      lastRating: 'S',
      readiness: 'ready',
      avatar: 'ZW',
      nominatedBy: '王经理',
      strengths: ['技术深度', '团队影响力', '创新能力'],
      concerns: [],
    },
    {
      id: 2,
      name: '李娜',
      currentRole: '产品经理',
      targetRole: '高级产品经理',
      score: 88,
      yearsInRole: 1.8,
      lastRating: 'A',
      readiness: 'ready',
      avatar: 'LN',
      nominatedBy: '陈总监',
      strengths: ['战略思维', '执行力'],
      concerns: ['跨部门协作经验不足'],
    },
    {
      id: 3,
      name: '王强',
      currentRole: '工程师',
      targetRole: '高级工程师',
      score: 75,
      yearsInRole: 1.2,
      lastRating: 'B',
      readiness: 'developing',
      avatar: 'WQ',
      nominatedBy: '张经理',
      strengths: ['学习能力强'],
      concerns: ['在岗时间较短', '领导力待提升'],
    },
  ];

  // 员工详细绩效数据
  const employeePerformance = [
    {
      name: '张伟',
      role: '高级工程师',
      department: '研发部',
      manager: '王经理',
      currentRating: 'S',
      scores: {
        technical: 95,
        collaboration: 88,
        innovation: 92,
        delivery: 90,
        leadership: 85,
      },
      goals: [
        { title: '完成核心架构升级', progress: 100, weight: 30, status: 'completed' },
        { title: '指导2名初级工程师', progress: 80, weight: 20, status: 'on-track' },
        { title: '技术分享3次', progress: 100, weight: 15, status: 'completed' },
        { title: '代码质量提升20%', progress: 95, weight: 35, status: 'on-track' },
      ],
      feedback360: {
        manager: 4.8,
        peers: 4.6,
        direct: 4.7,
        self: 4.5,
      },
    },
  ];

  // 360度反馈汇总
  const feedback360Summary = [
    { source: '直属上级', score: 4.8, count: 1, status: 'completed' },
    { source: '同事评价', score: 4.6, count: 5, status: 'completed' },
    { source: '下属评价', score: 4.7, count: 2, status: 'completed' },
    { source: '自我评价', score: 4.5, count: 1, status: 'completed' },
  ];

  // 绩效趋势
  const performanceTrend = [
    { quarter: 'Q1', score: 4.2 },
    { quarter: 'Q2', score: 4.4 },
    { quarter: 'Q3', score: 4.6 },
    { quarter: 'Q4', score: 4.5 },
  ];

  const employee = employeePerformance[selectedEmployee];
  const radarData = [
    { dimension: '技术能力', value: employee.scores.technical },
    { dimension: '协作能力', value: employee.scores.collaboration },
    { dimension: '创新思维', value: employee.scores.innovation },
    { dimension: '交付能力', value: employee.scores.delivery },
    { dimension: '领导力', value: employee.scores.leadership },
  ];

  const handleApprovePromotion = (candidateId: number) => {
    toast.success("晋升已批准", {
      description: "晋升流程已启动，HR将跟进后续事宜",
    });
    setSelectedPromotion(null);
  };

  const handleSubmitFeedback = () => {
    setShowFeedbackDialog(false);
    toast.success("反馈已提交", {
      description: "感谢您的反馈，这将帮助员工成长",
    });
  };

  if (userRole === 'chro') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-gray-900 mb-2">绩效与晋升管理</h2>
          <p className="text-gray-600">驱动人才发展，打造高绩效组织</p>
        </motion.div>

        {/* Performance Cycle Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-blue-200/30 to-purple-200/30"
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                >
                  <Award className="h-8 w-8 text-white" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-gray-900">{performanceCycle.name}</h3>
                    <Badge className="bg-blue-500 hover:bg-blue-500">进行中</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {performanceCycle.startDate} - {performanceCycle.endDate} • 
                    已完成 {performanceCycle.completed}/{performanceCycle.participants} 人
                  </p>
                  <Progress value={performanceCycle.progress} className="h-2 mb-1" />
                  <p className="text-xs text-gray-600">整体完成度 {performanceCycle.progress}%</p>
                </div>
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      导出报告
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      校准会议
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '平均绩效分', value: '4.2', trend: '+0.3', icon: Star, color: 'text-amber-600' },
            { label: '高绩效占比', value: '35%', trend: '+5%', icon: TrendingUp, color: 'text-green-600' },
            { label: '待晋升人数', value: '18', trend: '+3', icon: ArrowUpCircle, color: 'text-purple-600' },
            { label: '完成率', value: '68%', trend: '+12%', icon: Target, color: 'text-blue-600' },
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {metric.trend}
                    </Badge>
                  </div>
                  <div className="text-3xl text-gray-900 mb-1">{metric.value}</div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Performance Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>绩效分布</CardTitle>
              <CardDescription>本周期员工绩效评级分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {performanceDistribution.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.rating}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{item.count}人</span>
                        <span className="text-xs text-gray-500">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">平均绩效等级</span>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">B+ (良好)</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>部门绩效对比</CardTitle>
              <CardDescription>各部门平均绩效得分及改进趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="department" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="#7B68EE" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Promotion Candidates */}
          <Card className="col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>晋升候选人池</CardTitle>
                  <CardDescription>AI推荐的高潜力晋升候选人</CardDescription>
                </div>
                <Button variant="outline">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI推荐更多
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {promotionCandidates.map((candidate, idx) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedPromotion(candidate.id)}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white">
                          {candidate.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-gray-900">{candidate.name}</h4>
                          <Badge className={
                            candidate.readiness === 'ready' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                          }>
                            {candidate.readiness === 'ready' ? '已就绪' : '发展中'}
                          </Badge>
                          <Badge variant="outline" className="border-purple-200 text-purple-700">
                            上季绩效: {candidate.lastRating}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {candidate.currentRole} → {candidate.targetRole}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                          <span>在岗 {candidate.yearsInRole} 年</span>
                          <span>•</span>
                          <span>提名人: {candidate.nominatedBy}</span>
                          <span>•</span>
                          <span>综合评分: {candidate.score}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-600">优势:</span>
                          {candidate.strengths.map((strength, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {strength}
                            </Badge>
                          ))}
                        </div>
                        {candidate.concerns.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">关注点:</span>
                            {candidate.concerns.map((concern, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-amber-200 text-amber-700">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {concern}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info("查看详情", { description: `正在加载${candidate.name}的完整档案` });
                            }}
                          >
                            查看详情
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            size="sm" 
                            className={
                              candidate.readiness === 'ready'
                                ? 'bg-purple-600 hover:bg-purple-700'
                                : 'bg-gray-400 hover:bg-gray-500'
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprovePromotion(candidate.id);
                            }}
                          >
                            <ArrowUpCircle className="h-4 w-4 mr-1" />
                            批准晋升
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (userRole === 'hrbp') {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-gray-900 mb-2">团队绩效管理</h2>
          <p className="text-gray-600">产品与研发团队绩效概览</p>
        </motion.div>

        {/* Team Performance Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '团队平均分', value: '4.3', status: 'good' },
            { label: '待审核', value: '12', status: 'pending' },
            { label: '校准完成', value: '85%', status: 'good' },
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl text-gray-900 mb-1">{metric.value}</div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Employee List */}
        <Card>
          <CardHeader>
            <CardTitle>团队成员绩效</CardTitle>
            <CardDescription>需要审核和反馈的员工</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: '张伟', role: '高级工程师', status: 'completed', rating: 'S', score: 4.8 },
                { name: '李娜', role: '产品经理', status: 'pending', rating: '-', score: 0 },
                { name: '王强', role: '工程师', status: 'in-review', rating: 'B', score: 4.0 },
              ].map((emp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {emp.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-900">{emp.name}</p>
                      <p className="text-xs text-gray-500">{emp.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {emp.status === 'completed' && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        已完成 • {emp.rating}
                      </Badge>
                    )}
                    {emp.status === 'pending' && (
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                        待评分
                      </Badge>
                    )}
                    {emp.status === 'in-review' && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        审核中 • {emp.rating}
                      </Badge>
                    )}
                    <Button size="sm" variant="outline">
                      {emp.status === 'pending' ? '开始评分' : '查看详情'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Employee view
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-gray-900 mb-2">我的绩效与发展</h2>
        <p className="text-gray-600">查看你的绩效评估和成长轨迹</p>
      </motion.div>

      {/* Overall Rating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-pink-200/30 to-purple-200/30"
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center gap-6">
              <motion.div 
                className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <div className="text-center text-white">
                  <div className="text-3xl">{employee.currentRating}</div>
                  <div className="text-xs">卓越</div>
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">2025 Q3 绩效评级</h3>
                <p className="text-gray-600 mb-3">恭喜！你获得了卓越(S)评级</p>
                <div className="flex gap-2">
                  <Badge className="bg-purple-500 hover:bg-purple-500">
                    <Star className="h-3 w-3 mr-1" />
                    综合得分 4.8
                  </Badge>
                  <Badge className="bg-green-500 hover:bg-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    较上季度提升 0.3
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2">评估周期</p>
                <p className="text-gray-900">2025-07-01 至 2025-09-30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">绩效总览</TabsTrigger>
          <TabsTrigger value="ai-coach">
            <Brain className="h-3 w-3 mr-1" />
            AI绩效教练
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Performance Radar */}
            <Card>
              <CardHeader>
                <CardTitle>能力雷达图</CardTitle>
                <CardDescription>五个维度的综合评估</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                    <Radar dataKey="value" stroke="#7B68EE" fill="#7B68EE" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {Object.entries(employee.scores).map(([key, value], idx) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600 capitalize">{key}</span>
                      <span className="text-purple-600">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>绩效趋势</CardTitle>
                <CardDescription>近4个季度表现</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="quarter" stroke="#9ca3af" />
                    <YAxis domain={[0, 5]} stroke="#9ca3af" />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#7B68EE" strokeWidth={3} dot={{ fill: '#7B68EE', r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-900">
                    <Sparkles className="h-4 w-4 inline mr-1" />
                    你的绩效呈持续上升趋势，保持这个势头，下季度有望再创新高！
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-coach" className="space-y-4">
          <AIPerformanceCoach />
        </TabsContent>
      </Tabs>
    </div>
  );
}