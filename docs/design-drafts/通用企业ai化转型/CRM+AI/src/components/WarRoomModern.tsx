import { useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  DollarSign,
  Activity,
  Zap,
  Eye,
  Sparkles,
  ArrowRight,
  Brain,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Award,
  Flame
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import AIInsightCard from './AIInsightCard';

type UserRole = 'vp' | 'manager' | 'rep';

interface WarRoomProps {
  role: UserRole;
}

export default function WarRoomModern({ role }: WarRoomProps) {
  const [timeRange, setTimeRange] = useState('month');

  // Mock data
  const kpis = [
    {
      label: '本季度业绩',
      value: '¥868万',
      target: '¥1000万',
      progress: 86.8,
      change: 15.3,
      trend: 'up' as const,
      icon: DollarSign,
      color: 'from-teal-500 to-teal-600'
    },
    {
      label: '活跃交易',
      value: '127',
      target: '150',
      progress: 84.7,
      change: 8.5,
      trend: 'up' as const,
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: '平均成交周期',
      value: '28天',
      target: '35天',
      progress: 80,
      change: -12.5,
      trend: 'up' as const,
      icon: Activity,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: '成交转化率',
      value: '32%',
      target: '30%',
      progress: 106.7,
      change: 5.2,
      trend: 'up' as const,
      icon: CheckCircle2,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const performanceData = [
    { month: '7月', actual: 2200000, target: 2000000, forecast: 2400000 },
    { month: '8月', actual: 2600000, target: 2300000, forecast: 2800000 },
    { month: '9月', actual: 2800000, target: 2500000, forecast: 3200000 },
    { month: '10月', actual: 3100000, target: 2800000, forecast: 3400000 },
    { month: '11月', actual: 0, target: 3200000, forecast: 3600000 },
  ];

  const pipelineStages = [
    { stage: '线索', count: 145, value: 2900000, color: '#3b82f6' },
    { stage: '需求确认', count: 67, value: 6700000, color: '#8A2BE2' },
    { stage: '方案演示', count: 34, value: 8500000, color: '#1ABC9C' },
    { stage: '商务谈判', count: 18, value: 7200000, color: '#f59e0b' },
    { stage: '合同签署', count: 8, value: 4800000, color: '#10b981' },
  ];

  const topPerformers = [
    { 
      name: '王小明', 
      avatar: 'WXM',
      revenue: 850000, 
      deals: 12,
      winRate: 32,
      color: 'from-blue-500 to-blue-600',
      rank: 1
    },
    { 
      name: '李华', 
      avatar: 'LH',
      revenue: 920000, 
      deals: 15,
      winRate: 35,
      color: 'from-teal-500 to-teal-600',
      rank: 2
    },
    { 
      name: '刘芳', 
      avatar: 'LF',
      revenue: 780000, 
      deals: 11,
      winRate: 30,
      color: 'from-purple-500 to-purple-600',
      rank: 3
    },
  ];

  const hotDeals = [
    {
      id: '1',
      company: '金融科技创新',
      contact: '周总',
      value: 1200000,
      velocityScore: 95,
      stage: '方案演示',
      probability: 82,
      daysInStage: 3,
      owner: '王小明',
      ownerAvatar: 'WXM',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: '2',
      company: 'ABC科技有限公司',
      contact: '王总',
      value: 580000,
      velocityScore: 92,
      stage: '需求确认',
      probability: 65,
      daysInStage: 5,
      owner: '李华',
      ownerAvatar: 'LH',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: '3',
      company: '智慧制造集团',
      contact: '李经理',
      value: 720000,
      velocityScore: 88,
      stage: '方案演示',
      probability: 72,
      daysInStage: 8,
      owner: '刘芳',
      ownerAvatar: 'LF',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const aiInsights = [
    {
      id: 'war-ai-1',
      type: 'prediction' as const,
      title: '本月预计超额完成目标',
      description: '基于当前交易进展和历史数据，预计本月将完成108%的销售目标，超额完成80万',
      confidence: 92,
      impact: 'high' as const,
      actionable: true,
      suggestedActions: [
        '继续保持当前策略',
        '重点关注3个高价值交易的推进',
        '提前规划下月资源分配'
      ]
    },
    {
      id: 'war-ai-2',
      type: 'opportunity' as const,
      title: '发现交叉销售机会',
      description: '3个现有客户展现出对新产品线的兴趣，预计可带来额外180万收入',
      confidence: 85,
      impact: 'medium' as const,
      actionable: true,
      suggestedActions: [
        '向现有客户推介新产品',
        '准备定制化的升级方案',
        '安排产品专家参与沟通'
      ]
    },
    {
      id: 'war-ai-3',
      type: 'warning' as const,
      title: '团队活动趋势下降',
      description: '过去一周团队整体客户互动次数下降15%，可能影响下月业绩',
      confidence: 89,
      impact: 'high' as const,
      actionable: true,
      suggestedActions: [
        '召开团队会议了解情况',
        '检查是否有流程障碍',
        '适当调整工作分配'
      ]
    }
  ];

  const handleQuickAction = (action: string) => {
    toast.success(`正在执行: ${action}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-neutral-900">销售作战室</h2>
            <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 rounded-full">
              <Sparkles className="w-3 h-3 mr-1" />
              AI实时监控
            </Badge>
          </div>
          <p className="text-sm text-neutral-500">
            {role === 'vp' ? '全局销售数据总览' : role === 'manager' ? '团队业绩监控' : '个人业绩仪表盘'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
            className={timeRange === 'week' ? 'bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg' : 'rounded-lg'}
          >
            本周
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
            className={timeRange === 'month' ? 'bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg' : 'rounded-lg'}
          >
            本月
          </Button>
          <Button 
            variant={timeRange === 'quarter' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('quarter')}
            className={timeRange === 'quarter' ? 'bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg' : 'rounded-lg'}
          >
            本季度
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className={`rounded-full ${
                      kpi.trend === 'up' ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {kpi.change}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-neutral-500">{kpi.label}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-neutral-900">{kpi.value}</h3>
                      <span className="text-sm text-neutral-400">/ {kpi.target}</span>
                    </div>
                    <Progress value={kpi.progress} className="h-2" />
                    <p className="text-xs text-neutral-500">{kpi.progress.toFixed(1)}% 完成</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Charts */}
        <div className="col-span-8 space-y-6">
          {/* Performance Trend */}
          <Card className="border-0 shadow-sm rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-neutral-900 mb-1">业绩趋势</h3>
                <p className="text-sm text-neutral-500">实际业绩 vs 目标 vs AI预测</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg hover:bg-purple-50">
                <Eye className="w-4 h-4 mr-2" />
                查看详情
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
                />
                <Tooltip 
                  formatter={(value: number) => `¥${(value / 10000).toFixed(1)}万`}
                  contentStyle={{ 
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#1ABC9C" 
                  strokeWidth={3}
                  dot={{ fill: '#1ABC9C', r: 4 }}
                  name="实际"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#8A2BE2" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#8A2BE2', r: 4 }}
                  name="目标"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#3b82f6', r: 4 }}
                  name="AI预测"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Pipeline Stages */}
          <Card className="border-0 shadow-sm rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-neutral-900 mb-1">销售漏斗</h3>
                <p className="text-sm text-neutral-500">各阶段交易分布</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pipelineStages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number"
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
                />
                <YAxis 
                  type="category"
                  dataKey="stage" 
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                  width={80}
                />
                <Tooltip 
                  formatter={(value: number) => `¥${(value / 10000).toFixed(1)}万`}
                  contentStyle={{ 
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {pipelineStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Hot Deals */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-600" />
                <h3 className="text-neutral-900">热门交易</h3>
                <Badge className="bg-orange-100 text-orange-700 border-0 rounded-full ml-auto">
                  高价值
                </Badge>
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              {hotDeals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className={`w-10 h-10 rounded-xl bg-gradient-to-br ${deal.color} flex items-center justify-center text-white shadow-md`}>
                        {deal.contact.slice(0, 1)}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-neutral-900 truncate">{deal.company}</h4>
                          <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 rounded-full">
                            <Zap className="w-3 h-3 mr-1" />
                            {deal.velocityScore}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-neutral-500">
                          <span>{deal.contact}</span>
                          <span>·</span>
                          <span>{deal.stage}</span>
                          <span>·</span>
                          <span>{deal.daysInStage}天</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-neutral-900 mb-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{(deal.value / 10000).toFixed(0)}万</span>
                        </div>
                        <div className="text-xs text-neutral-500">{deal.probability}% 概率</div>
                      </div>
                      <Avatar className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs">
                        {deal.ownerAvatar}
                      </Avatar>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="rounded-lg hover:bg-purple-100"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* AI Insights */}
          <AIInsightCard insights={aiInsights} onAction={handleQuickAction} />

          {/* Top Performers */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-teal-50">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <h3 className="text-neutral-900">业绩排行</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {topPerformers.map((performer, index) => (
                <motion.div
                  key={performer.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 transition-all"
                >
                  <div className="relative">
                    <Avatar className={`w-12 h-12 rounded-xl bg-gradient-to-br ${performer.color} flex items-center justify-center text-white shadow-md`}>
                      {performer.avatar}
                    </Avatar>
                    {performer.rank === 1 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                        🏆
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-neutral-900 mb-1">{performer.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span>{performer.deals}个交易</span>
                      <span>·</span>
                      <span>{performer.winRate}%成功率</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-neutral-900">¥{(performer.revenue / 10000).toFixed(0)}万</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm rounded-2xl p-4">
            <h3 className="text-neutral-900 mb-4">快速操作</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl hover:bg-purple-50 hover:border-purple-300"
                onClick={() => handleQuickAction('导出报告')}
              >
                <Activity className="w-4 h-4 mr-2" />
                导出业绩报告
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl hover:bg-teal-50 hover:border-teal-300"
                onClick={() => handleQuickAction('召开会议')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                召开团队会议
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl hover:bg-blue-50 hover:border-blue-300"
                onClick={() => handleQuickAction('AI分析')}
              >
                <Brain className="w-4 h-4 mr-2" />
                深度AI分析
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
