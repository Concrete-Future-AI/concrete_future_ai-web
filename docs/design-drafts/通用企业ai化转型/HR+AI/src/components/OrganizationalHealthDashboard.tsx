import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, AlertTriangle, Users, Target, Lightbulb, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Alert, AlertDescription } from "./ui/alert";
import { AIPredictiveAnalytics } from "./AIPredictiveAnalytics";

interface DashboardProps {
  userRole: 'chro' | 'hrbp' | 'employee';
}

export function OrganizationalHealthDashboard({ userRole }: DashboardProps) {
  const [healthScore, setHealthScore] = useState(75);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading and live updates
  useEffect(() => {
    setIsLoading(true);
    const loadTimer = setTimeout(() => setIsLoading(false), 800);
    
    const updateTimer = setTimeout(() => {
      setHealthScore(78);
    }, 2000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(updateTimer);
    };
  }, [userRole]);
  
  const engagementData = [
    { month: '1月', score: 72 },
    { month: '2月', score: 74 },
    { month: '3月', score: 73 },
    { month: '4月', score: 76 },
    { month: '5月', score: 75 },
    { month: '6月', score: 78 },
  ];

  const departmentRisks = [
    { dept: '研发', risk: 85, color: '#ef4444' },
    { dept: '产品', risk: 45, color: '#fbbf24' },
    { dept: '销售', risk: 30, color: '#10b981' },
    { dept: '市场', risk: 25, color: '#10b981' },
    { dept: '运营', risk: 50, color: '#fbbf24' },
  ];

  const leadershipPipeline = [
    { level: '高管', current: 5, target: 6, readiness: 83 },
    { level: '总监', current: 18, target: 20, readiness: 90 },
    { level: '经理', current: 52, target: 55, readiness: 95 },
  ];

  const teamSkills = [
    { skill: '技术能力', value: 85 },
    { skill: '沟通能力', value: 78 },
    { skill: '领导力', value: 72 },
    { skill: '创新思维', value: 80 },
    { skill: '协作能力', value: 65 },
  ];

  if (userRole === 'chro') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-gray-900 mb-2">组织健康仪表盘</h2>
          <p className="text-gray-600">洞察组织脉搏，驱动战略决策</p>
        </div>

        {/* AI Insights Alert */}
        <Alert className="border-teal-200 bg-teal-50">
          <Lightbulb className="h-4 w-4 text-teal-600" />
          <AlertDescription className="text-teal-900">
            <span>AI洞察：</span> 分析近六个月的沟通数据显示，研发部门的跨团队协作频率下降了20%，这与该部门敬业度得分的下滑呈正相关，建议关注。
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">人才健康指数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <motion.div 
                    className="text-3xl text-teal-600"
                    key={healthScore}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {healthScore}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Badge variant="outline" className="border-teal-200 text-teal-700 mb-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5
                    </Badge>
                  </motion.div>
                </div>
                <Progress value={healthScore} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">员工敬业度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-3xl text-gray-900">78%</div>
                  <Badge variant="outline" className="border-green-200 text-green-700 mb-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3%
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-2">较上月提升</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">主动流失率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-3xl text-gray-900">8.5%</div>
                  <Badge variant="outline" className="border-red-200 text-red-700 mb-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +1.2%
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-2">需要关注</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">招聘效率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-3xl text-gray-900">28天</div>
                  <Badge variant="outline" className="border-green-200 text-green-700 mb-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -12天
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-2">平均招聘周期</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">
              <Users className="h-4 w-4 mr-2" />
              总览
            </TabsTrigger>
            <TabsTrigger value="ai-prediction">
              <Sparkles className="h-4 w-4 mr-2" />
              AI预测分析
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Engagement Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>敬业度趋势</CardTitle>
                  <CardDescription>近6个月员工敬业度变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" domain={[60, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#00A99D" strokeWidth={2} dot={{ fill: '#00A99D', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Department Risk Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle>员工流失风险热力图</CardTitle>
                  <CardDescription>各部门流失风险评估</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentRisks.map((dept) => (
                      <div key={dept.dept} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{dept.dept}部门</span>
                          <Badge 
                            variant="outline"
                            className={
                              dept.risk > 70 ? 'border-red-200 text-red-700' :
                              dept.risk > 40 ? 'border-yellow-200 text-yellow-700' :
                              'border-green-200 text-green-700'
                            }
                          >
                            {dept.risk > 70 ? <AlertTriangle className="h-3 w-3 mr-1" /> : null}
                            风险: {dept.risk}
                          </Badge>
                        </div>
                        <Progress value={dept.risk} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leadership Pipeline */}
              <Card>
                <CardHeader>
                  <CardTitle>领导力管道</CardTitle>
                  <CardDescription>各层级后备人才充足率</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leadershipPipeline.map((item) => (
                      <div key={item.level} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{item.level}</span>
                          <span className="text-xs text-gray-500">
                            {item.current}/{item.target} 人 • 就绪度 {item.readiness}%
                          </span>
                        </div>
                        <Progress value={(item.current / item.target) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>推荐行动</CardTitle>
                  <CardDescription>AI智能推荐的关键行动项</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-red-900">立即关注研发部门流失风险</p>
                          <p className="text-xs text-red-700 mt-1">3名核心工程师离职倾向度高</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-amber-900">启动高管继任计划</p>
                          <p className="text-xs text-amber-700 mt-1">当前后备人才储备不足</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-teal-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-teal-900">优化研发团队协作机制</p>
                          <p className="text-xs text-teal-700 mt-1">跨团队协作频率显著下降</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-prediction" className="space-y-6 mt-6">
            <AIPredictiveAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (userRole === 'hrbp') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-gray-900 mb-2">我的业务伙伴视图</h2>
          <p className="text-gray-600">产品与研发部门人才健康度</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">团队敬业度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-gray-900">75%</div>
              <p className="text-xs text-gray-500 mt-2">产品+研发部门</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">待招岗位</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-gray-900">8</div>
              <p className="text-xs text-gray-500 mt-2">平均周期 32天</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">面试中</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-gray-900">15</div>
              <p className="text-xs text-gray-500 mt-2">本周需跟进</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">流失风险</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl text-red-600">5人</div>
                <Badge variant="outline" className="border-red-200 text-red-700 mb-1">
                  高风险
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>情绪风向标</CardTitle>
              <CardDescription>团队情绪关键词分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">项目压力 (38)</Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">成就感 (25)</Badge>
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">加班 (22)</Badge>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">团队协作 (18)</Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">学习机会 (15)</Badge>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">工作量 (12)</Badge>
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">创新 (10)</Badge>
              </div>
              <Alert className="mt-4 border-amber-200 bg-amber-50">
                <AlertDescription className="text-amber-900 text-sm">
                  "项目压力"相关提及在过去两周上升了45%，建议与团队负责人沟通
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>团队技能画像</CardTitle>
              <CardDescription>当前团队能力雷达</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={teamSkills}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                  <Radar dataKey="value" stroke="#00A99D" fill="#00A99D" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Employee view
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">我的主页</h2>
        <p className="text-gray-600">欢迎回来，李雪！</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>我的待办事项</CardTitle>
            <CardDescription>需要完成的任务和行动</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-teal-50 border border-teal-100 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white">1</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">完成Q2绩效自评</p>
                  <p className="text-xs text-gray-600">截止日期：明天</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white">2</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">观看推荐课程：《数据分析入门》</p>
                  <p className="text-xs text-gray-600">预计时长：45分钟</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white">3</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">与导师张经理的月度1对1</p>
                  <p className="text-xs text-gray-600">本周五 15:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI推荐的内部岗位</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer">
                <p className="text-sm text-gray-900">高级产品工程师</p>
                <p className="text-xs text-gray-600 mt-1">产品部门</p>
                <Badge className="mt-2 bg-teal-100 text-teal-700 hover:bg-teal-100 text-xs">匹配度 88%</Badge>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer">
                <p className="text-sm text-gray-900">数据分析师</p>
                <p className="text-xs text-gray-600 mt-1">数据部门</p>
                <Badge className="mt-2 bg-teal-100 text-teal-700 hover:bg-teal-100 text-xs">匹配度 75%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>我的团队</CardTitle>
          <CardDescription>产品工程团队</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {['张明', '王芳', '刘强', '陈静', '李伟'].map((name, idx) => (
              <div key={idx} className="text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-purple-400 flex items-center justify-center text-white mx-auto mb-2">
                  {name.charAt(0)}
                </div>
                <p className="text-xs text-gray-700">{name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}