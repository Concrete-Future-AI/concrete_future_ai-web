import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Phone,
  Mail,
  Clock,
  Sparkles,
  ArrowRight,
  Calendar,
  DollarSign,
  Activity,
  Zap,
  Eye,
  ThumbsUp,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Share2,
  PlayCircle,
  MessageSquare,
  Award,
  Flame,
  XCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { toast } from 'sonner';

type UserRole = 'vp' | 'manager' | 'rep';

interface WarRoomProps {
  role: UserRole;
}

export default function WarRoom({ role }: WarRoomProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('month');

  // Mock data with more details
  const quarterlyData = [
    { month: '10月', actual: 2800000, target: 2500000, forecast: 3200000, deals: 45 },
    { month: '11月', actual: 3100000, target: 2800000, forecast: 3400000, deals: 52 },
    { month: '12月', actual: 0, target: 3200000, forecast: 3600000, deals: 0 },
  ];

  const waterfallData = [
    { name: '期初预测', value: 8500000, color: '#3b82f6' },
    { name: '新机会', value: 1200000, color: '#10b981' },
    { name: '机会增值', value: 600000, color: '#06b6d4' },
    { name: '丢单', value: -500000, color: '#ef4444' },
    { name: '延期', value: -800000, color: '#f59e0b' },
    { name: '风险调整', value: -400000, color: '#f97316' },
    { name: '当前预测', value: 8600000, color: '#3b82f6' },
  ];

  const regionData = [
    { 
      region: '华东', 
      achievement: 92, 
      target: 5000000, 
      actual: 4600000,
      growth: 15.5,
      deals: 28,
      activeLeads: 156,
      avgDealSize: 164000
    },
    { 
      region: '华北', 
      achievement: 105, 
      target: 4500000, 
      actual: 4725000,
      growth: 22.3,
      deals: 31,
      activeLeads: 142,
      avgDealSize: 152000
    },
    { 
      region: '华南', 
      achievement: 88, 
      target: 4000000, 
      actual: 3520000,
      growth: 8.7,
      deals: 22,
      activeLeads: 98,
      avgDealSize: 160000
    },
    { 
      region: '西南', 
      achievement: 78, 
      target: 3000000, 
      actual: 2340000,
      growth: 12.1,
      deals: 18,
      activeLeads: 87,
      avgDealSize: 130000
    },
  ];

  const pipelineData = [
    { stage: '线索', count: 145, value: 2900000, conversion: 46, avgDays: 3 },
    { stage: '需求确认', count: 67, value: 6700000, conversion: 51, avgDays: 12 },
    { stage: '方案演示', count: 34, value: 8500000, conversion: 53, avgDays: 15 },
    { stage: '商务谈判', count: 18, value: 7200000, conversion: 56, avgDays: 18 },
    { stage: '合同签署', count: 8, value: 4800000, conversion: 88, avgDays: 8 },
  ];

  const teamMembers = [
    { 
      name: '王小明', 
      opportunities: 12, 
      calls: 45, 
      emails: 78,
      revenue: 850000, 
      trend: 'up',
      quota: 1000000,
      winRate: 32,
      avgDealSize: 70800,
      activities: 156
    },
    { 
      name: '李华', 
      opportunities: 15, 
      calls: 52, 
      emails: 92,
      revenue: 920000, 
      trend: 'up',
      quota: 1000000,
      winRate: 35,
      avgDealSize: 61300,
      activities: 178
    },
    { 
      name: '张伟', 
      opportunities: 8, 
      calls: 38, 
      emails: 56,
      revenue: 620000, 
      trend: 'down',
      quota: 1000000,
      winRate: 28,
      avgDealSize: 77500,
      activities: 124
    },
    { 
      name: '刘芳', 
      opportunities: 11, 
      calls: 41, 
      emails: 68,
      revenue: 780000, 
      trend: 'up',
      quota: 1000000,
      winRate: 30,
      avgDealSize: 70900,
      activities: 142
    },
    { 
      name: '陈强', 
      opportunities: 9, 
      calls: 36, 
      emails: 62,
      revenue: 680000, 
      trend: 'up',
      quota: 1000000,
      winRate: 29,
      avgDealSize: 75500,
      activities: 134
    },
  ];

  const riskDeals = [
    { 
      company: 'ABC科技有限公司', 
      value: 580000, 
      issue: '超过15天无活动', 
      contact: '张总监', 
      daysStale: 18,
      probability: 45,
      owner: '王小明'
    },
    { 
      company: 'XYZ集团', 
      value: 720000, 
      issue: '关键决策人无互动', 
      contact: '李经理', 
      daysStale: 12,
      probability: 38,
      owner: '李华'
    },
    { 
      company: '创新软件公司', 
      value: 450000, 
      issue: 'AI健康分持续下降', 
      contact: '王总', 
      daysStale: 8,
      probability: 52,
      owner: '张伟'
    },
    { 
      company: '数字营销有限公司', 
      value: 320000, 
      issue: '竞争对手介入', 
      contact: '赵总', 
      daysStale: 5,
      probability: 41,
      owner: '刘芳'
    },
  ];

  const todayFocus = [
    { 
      priority: 1, 
      company: 'ABC科技', 
      contact: '王总', 
      score: 92, 
      scoreChange: 17,
      reason: '访问了定价页面',
      action: '立即联系',
      estimatedValue: 580000,
      nextStep: '发送定制方案',
      lastContact: '2天前'
    },
    { 
      priority: 2, 
      company: '智慧制造', 
      contact: '李总', 
      score: 88, 
      scoreChange: 12,
      reason: '下载了产品白皮书',
      action: '发送案例',
      estimatedValue: 720000,
      nextStep: '安排技术演示',
      lastContact: '1天前'
    },
    { 
      priority: 3, 
      company: '云端服务', 
      contact: '张经理', 
      score: 85, 
      scoreChange: 5,
      reason: '打开邮件3次',
      action: '安排演示',
      estimatedValue: 450000,
      nextStep: '电话确认需求',
      lastContact: '3小时前'
    },
    { 
      priority: 4, 
      company: '数据分析科技', 
      contact: '赵经理', 
      score: 82, 
      scoreChange: 8,
      reason: '多次访问产品页面',
      action: '发送邮件',
      estimatedValue: 380000,
      nextStep: '介绍核心功能',
      lastContact: '12小时前'
    },
  ];

  const aiInsights = [
    {
      type: 'coaching',
      message: '小王在通话中谈到价格时，客户负面情绪比例较高（68%），建议您听一下这段录音并给予指导。',
      person: '小王',
      action: '查看录音',
      priority: 'high',
      impact: '可提升成交率12%'
    },
    {
      type: 'opportunity',
      message: '华北区本周新增机会数量比上周增加35%，建议调配资源支持。',
      action: '查看详情',
      priority: 'medium',
      impact: '潜在增收¥180万'
    },
    {
      type: 'trend',
      message: '方案演示阶段的转化率从上月的48%提升到53%，培训效果显著。',
      action: '查看分析',
      priority: 'low',
      impact: '持续优化'
    },
  ];

  const recentActivities = [
    { 
      type: 'news', 
      message: '您关注的"XYZ集团"刚刚发布了新财报，提及将加大IT投入50%。', 
      time: '2小时前',
      company: 'XYZ集团',
      icon: Activity,
      actionable: true
    },
    { 
      type: 'email', 
      message: '您昨天发送的报价邮件，客户已打开3次，停留时长8分钟。', 
      time: '5小时前',
      company: 'ABC科技',
      icon: Mail,
      actionable: true
    },
    { 
      type: 'meeting', 
      message: '明天上午10:00与"智慧制造"的产品演示会议即将开始。', 
      time: '1天前',
      company: '智慧制造',
      icon: Calendar,
      actionable: false
    },
    { 
      type: 'call', 
      message: '王小明刚刚完成与"数据分析科技"的电话，AI情绪分析显示积极。', 
      time: '3小时前',
      company: '数据分析科技',
      icon: Phone,
      actionable: true
    },
  ];

  const performanceMetrics = [
    { name: '互动频率', value: 85, target: 80 },
    { name: '响应速度', value: 78, target: 75 },
    { name: '线索质量', value: 82, target: 80 },
    { name: '跟进及时性', value: 88, target: 85 },
    { name: '文档完整性', value: 75, target: 90 },
  ];

  const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const handleQuickAction = (action: string, target: string) => {
    toast.success(`正在${action}`, {
      description: target,
    });
  };

  if (role === 'vp') {
    return (
      <div className="space-y-4">
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-neutral-900 mb-1">业绩驾驶舱</h2>
            <p className="text-xs text-neutral-500">实时营收目标达成情况与AI预测</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-3 h-3 mr-1" />
              筛选
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-3 h-3 mr-1" />
              导出
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-3 h-3 mr-1" />
              分享
            </Button>
            <Tabs value={timeRange} onValueChange={setTimeRange}>
              <TabsList className="h-8">
                <TabsTrigger value="week" className="text-xs">周</TabsTrigger>
                <TabsTrigger value="month" className="text-xs">月</TabsTrigger>
                <TabsTrigger value="quarter" className="text-xs">季度</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-0">
                  +15%
                </Badge>
              </div>
              <p className="text-2xl mb-1">¥590万</p>
              <p className="text-xs opacity-80">当前季度营收</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-0">
                  69%
                </Badge>
              </div>
              <p className="text-2xl mb-1">¥850万</p>
              <p className="text-xs opacity-80">季度目标</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Sparkles className="w-8 h-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-0">
                  AI
                </Badge>
              </div>
              <p className="text-2xl mb-1">¥920万</p>
              <p className="text-xs opacity-80">AI预测营收</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-8 h-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-0">
                  3.2x
                </Badge>
              </div>
              <p className="text-2xl mb-1">¥2,720万</p>
              <p className="text-xs opacity-80">管道总额</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-0">
                  99个
                </Badge>
              </div>
              <p className="text-2xl mb-1">28.5%</p>
              <p className="text-xs opacity-80">整体成交率</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 季度营收趋势 */}
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    季度营收 vs. 目标
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      Q4 2025
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">实际业绩、目标与AI预测对比</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-neutral-500 mb-1">当前累计</p>
                  <p className="text-lg text-neutral-900">¥590万</p>
                  <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +15.2%
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-neutral-500 mb-1">季度目标</p>
                  <p className="text-lg text-neutral-900">¥850万</p>
                  <Progress value={69.4} className="h-1.5 mt-2" />
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-neutral-500 mb-1">AI预测</p>
                  <p className="text-lg text-neutral-900">¥920万</p>
                  <Badge className="bg-green-100 text-green-700 border-0 mt-1 text-xs">
                    超目标8%
                  </Badge>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={quarterlyData}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="target" stroke="#9ca3af" strokeWidth={2} fill="none" strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                  <Area type="monotone" dataKey="forecast" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorForecast)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 季度预测变化 */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">季度预测变化</CardTitle>
              <CardDescription className="text-xs">从期初到当前的预测演变</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                {waterfallData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-neutral-700">{item.name}</span>
                    </div>
                    <span className={`text-sm ${item.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.value >= 0 ? '+' : ''}¥{(Math.abs(item.value) / 10000).toFixed(0)}万
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">净变化</span>
                  <span className="text-lg text-green-600">+¥100万</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 区域业绩地图 - 更密集的展示 */}
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">区域业绩达成情况</CardTitle>
                <CardDescription className="text-xs">各区域目标完成率与关键指标</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleQuickAction('刷新数据', '区域业绩')}>
                <Activity className="w-3 h-3 mr-1" />
                实时刷新
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {regionData.map((region) => (
                <div 
                  key={region.region} 
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg ${
                    selectedRegion === region.region 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-neutral-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedRegion(selectedRegion === region.region ? null : region.region)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-neutral-900 flex items-center gap-2">
                      {region.region}
                      {region.achievement >= 100 && (
                        <Award className="w-4 h-4 text-yellow-500" />
                      )}
                    </h4>
                    <Badge 
                      variant={region.achievement >= 100 ? 'default' : region.achievement >= 90 ? 'secondary' : 'destructive'}
                      className={region.achievement >= 100 ? 'bg-green-100 text-green-700 border-0' : ''}
                    >
                      {region.achievement}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">实际</span>
                      <span className="text-neutral-900">¥{(region.actual / 10000).toFixed(0)}万</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">目标</span>
                      <span className="text-neutral-900">¥{(region.target / 10000).toFixed(0)}万</span>
                    </div>
                    <Progress value={region.achievement} className="h-1.5" />
                    
                    {selectedRegion === region.region && (
                      <div className="mt-3 pt-3 border-t border-neutral-200 space-y-1 animate-slide-up">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">增长率</span>
                          <span className="text-green-600">+{region.growth}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">成交数</span>
                          <span className="text-neutral-900">{region.deals}笔</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">活跃线索</span>
                          <span className="text-neutral-900">{region.activeLeads}个</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">平均单价</span>
                          <span className="text-neutral-900">¥{(region.avgDealSize / 10000).toFixed(1)}万</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 团队健康度 & 管道转化 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                团队健康度指标
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={performanceMetrics}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <Radar 
                    name="实际" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.5} 
                  />
                  <Radar 
                    name="目标" 
                    dataKey="target" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.2} 
                    strokeDasharray="5 5"
                  />
                </RadarChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-xs text-neutral-500">管道覆盖率</p>
                  <p className="text-lg text-blue-600">3.2x</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-xs text-neutral-500">平均周期</p>
                  <p className="text-lg text-green-600">42天</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <p className="text-xs text-neutral-500">成交率</p>
                  <p className="text-lg text-purple-600">28.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                管道阶段转化
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                {pipelineData.map((stage, index) => (
                  <div key={stage.stage} className="p-2 bg-neutral-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm text-neutral-900">{stage.stage}</span>
                        <Badge variant="outline" className="text-xs">{stage.count}</Badge>
                      </div>
                      <span className="text-sm text-neutral-900">¥{(stage.value / 10000).toFixed(0)}万</span>
                    </div>
                    <div className="ml-8 flex items-center gap-3">
                      <Progress value={stage.conversion} className="h-1 flex-1" />
                      <span className="text-xs text-neutral-500 w-16">转化{stage.conversion}%</span>
                      <span className="text-xs text-neutral-400 w-12">{stage.avgDays}天</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (role === 'manager') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-neutral-900 mb-1">团队管道仪表盘</h2>
            <p className="text-xs text-neutral-500">团队销售漏斗与关键交易监控</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-3 h-3 mr-1" />
              导出报告
            </Button>
            <Button size="sm" className="bg-blue-600">
              <PlayCircle className="w-3 h-3 mr-1" />
              AI洞察
            </Button>
          </div>
        </div>

        {/* 实时指标卡片 */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500">团队管道</p>
                  <p className="text-xl text-neutral-900">¥2,720万</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.5%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500">本周新增</p>
                  <p className="text-xl text-neutral-900">23个</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +35%
                  </p>
                </div>
                <Flame className="w-8 h-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500">风险交易</p>
                  <p className="text-xl text-neutral-900">{riskDeals.length}个</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3" />
                    需关注
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500">团队活跃度</p>
                  <p className="text-xl text-neutral-900">92%</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    优秀
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 团队销售漏斗 - 更详细 */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">团队销售漏斗</CardTitle>
              <CardDescription className="text-xs">点击阶段查看详细交易</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                {pipelineData.map((stage, index) => (
                  <button
                    key={stage.stage}
                    className="w-full text-left p-3 border-2 border-neutral-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    onClick={() => handleQuickAction('查看交易列表', stage.stage)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm text-neutral-900">{stage.stage}</p>
                          <p className="text-xs text-neutral-500">{stage.count} 个机会 · 平均{stage.avgDays}天</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-900">¥{(stage.value / 10000).toFixed(0)}万</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          转化{stage.conversion}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={100 - index * 15} className="h-1.5 group-hover:h-2 transition-all" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 风险交易预警 - 更详细 */}
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50/50 to-red-50/30 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-700 text-base">
                <AlertTriangle className="w-5 h-5" />
                风险交易预警
                <Badge className="bg-red-500 text-white animate-pulse">
                  {riskDeals.length}
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">需要立即关注的交易</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                {riskDeals.map((deal) => (
                  <div key={deal.company} className="p-3 bg-white border-2 border-orange-200 rounded-lg hover:border-orange-400 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm text-neutral-900 mb-0.5">{deal.company}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-neutral-600">{deal.contact}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="text-neutral-600">{deal.owner}</span>
                        </div>
                      </div>
                      <Badge variant="destructive" className="ml-2">
                        {deal.daysStale}天
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-orange-600" />
                      <p className="text-xs text-orange-700">{deal.issue}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-neutral-500">成交概率</span>
                      <div className="flex items-center gap-2">
                        <Progress value={deal.probability} className="w-20 h-1" />
                        <span className="text-xs text-neutral-900">{deal.probability}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-900">¥{(deal.value / 10000).toFixed(1)}万</span>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 h-7 text-xs"
                        onClick={() => handleQuickAction('跟进交易', deal.company)}
                      >
                        立即跟进
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 团队成员表现 - 更密集详细 */}
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="w-5 h-5 text-blue-600" />
                  团队成员表现排行
                </CardTitle>
                <CardDescription className="text-xs">本月业绩与活动排名</CardDescription>
              </div>
              <Tabs defaultValue="revenue">
                <TabsList className="h-8">
                  <TabsTrigger value="revenue" className="text-xs">按业绩</TabsTrigger>
                  <TabsTrigger value="activity" className="text-xs">按活跃度</TabsTrigger>
                  <TabsTrigger value="winrate" className="text-xs">按成交率</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-2">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.name} 
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedMember === member.name 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-neutral-200 hover:border-blue-300 hover:bg-neutral-50'
                  }`}
                  onClick={() => setSelectedMember(selectedMember === member.name ? null : member.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' : 
                      index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' : 
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                      'bg-neutral-200 text-neutral-700'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-neutral-900">{member.name}</p>
                        {index < 3 && <Award className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {member.opportunities}个
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {member.calls}通
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {member.emails}封
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-neutral-900 mb-1">¥{(member.revenue / 10000).toFixed(0)}万</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(member.revenue / member.quota) * 100} className="w-16 h-1" />
                        {member.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {selectedMember === member.name && (
                    <div className="mt-3 pt-3 border-t border-neutral-200 grid grid-cols-4 gap-3 animate-slide-up">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <p className="text-xs text-neutral-500">配额完成</p>
                        <p className="text-sm text-blue-600">{((member.revenue / member.quota) * 100).toFixed(0)}%</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <p className="text-xs text-neutral-500">成交率</p>
                        <p className="text-sm text-green-600">{member.winRate}%</p>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded">
                        <p className="text-xs text-neutral-500">平均单价</p>
                        <p className="text-sm text-purple-600">¥{(member.avgDealSize / 10000).toFixed(1)}万</p>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <p className="text-xs text-neutral-500">活动数</p>
                        <p className="text-sm text-orange-600">{member.activities}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI教练建议 - 更丰富 */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50/50 to-blue-50/30 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI 教练建议
              <Badge className="bg-purple-100 text-purple-700 border-0">
                实时
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs">基于数据分析的团队辅导建议</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-2">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-white border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`px-2 py-1 rounded text-xs ${
                      insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                      insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {insight.priority === 'high' ? '高优先级' : insight.priority === 'medium' ? '中优先级' : '低优先级'}
                    </div>
                    {insight.person && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {insight.person}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-neutral-700 mb-2">{insight.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {insight.impact}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 h-7 text-xs"
                      onClick={() => handleQuickAction(insight.action, insight.type)}
                    >
                      {insight.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sales Rep view - 更密集和actionable
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-900 mb-1">今日聚焦</h2>
          <p className="text-xs text-neutral-500">AI为您优先排序的关键任务</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-3 h-3 mr-1" />
            我的日程
          </Button>
          <Button size="sm" className="bg-blue-600">
            <Phone className="w-3 h-3 mr-1" />
            开始拨号
          </Button>
        </div>
      </div>

      {/* 快速统计 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-3">
            <DollarSign className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-lg mb-0.5">¥78万</p>
            <p className="text-xs opacity-80">本月业绩</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-3">
            <Target className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-lg mb-0.5">23个</p>
            <p className="text-xs opacity-80">活跃机会</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-3">
            <Phone className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-lg mb-0.5">8 / 12</p>
            <p className="text-xs opacity-80">今日通话</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-3">
            <Mail className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-lg mb-0.5">15封</p>
            <p className="text-xs opacity-80">已发邮件</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
          <CardContent className="p-3">
            <Calendar className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-lg mb-0.5">3场</p>
            <p className="text-xs opacity-80">今日会议</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 今日聚焦任务 - 更详细和actionable */}
        <Card className="lg:col-span-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/30 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="w-5 h-5 text-blue-600" />
                优先行动清单
                <Badge className="bg-blue-100 text-blue-700 border-0 animate-pulse">
                  {todayFocus.length} 待处理
                </Badge>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction('刷新列表', '优先行动')}>
                <Activity className="w-3 h-3" />
              </Button>
            </div>
            <CardDescription className="text-xs">按Velocity Score智能排序</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-2">
              {todayFocus.map((item) => (
                <div key={item.priority} className="p-3 bg-white border-2 border-blue-300 rounded-lg hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                        {item.priority}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-neutral-900">{item.company}</p>
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                            {item.score}
                          </Badge>
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs">+{item.scoreChange}</span>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mb-1">{item.contact} · 最后联系: {item.lastContact}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="text-xs">
                            ¥{(item.estimatedValue / 10000).toFixed(1)}万
                          </Badge>
                          <span className="text-neutral-500">·</span>
                          <span className="text-neutral-600">下一步: {item.nextStep}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded p-2 mb-2">
                    <p className="text-xs text-blue-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI洞察: {item.reason}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 h-8 text-xs"
                      onClick={() => handleQuickAction(item.action, item.company)}
                    >
                      {item.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Phone className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 右侧栏 - 业绩进度和活动 */}
        <div className="space-y-4">
          {/* 我的业绩进度 - 更详细 */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5 text-blue-600" />
                我的业绩
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-center mb-3">
                <p className="text-2xl text-neutral-900 mb-0.5">¥78万</p>
                <p className="text-xs text-neutral-500">目标: ¥100万 · 还需¥22万</p>
              </div>
              <Progress value={78} className="h-2 mb-2" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-neutral-500">本周</p>
                  <p className="text-neutral-900">¥18万</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-neutral-500">本季度</p>
                  <p className="text-neutral-900">¥215万</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-neutral-200">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">距离目标</span>
                    <span className="text-neutral-900">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">剩余天数</span>
                    <span className="text-neutral-900">7天</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">日均需达成</span>
                    <span className="text-orange-600">¥3.1万</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 今日活动统计 */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">今日活动</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">通话任务</p>
                    <Progress value={67} className="h-1 mt-1" />
                  </div>
                  <span className="text-sm text-neutral-900">8/12</span>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">邮件跟进</p>
                    <Progress value={75} className="h-1 mt-1" />
                  </div>
                  <span className="text-sm text-neutral-900">15/20</span>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">会议安排</p>
                    <p className="text-xs text-neutral-500 mt-0.5">3场会议</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <Card className="shadow-md bg-gradient-to-br from-neutral-50 to-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">快速操作</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-3 flex-col gap-1"
                  onClick={() => handleQuickAction('录入新线索', '')}
                >
                  <Target className="w-5 h-5" />
                  <span className="text-xs">新增线索</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-3 flex-col gap-1"
                  onClick={() => handleQuickAction('记录通话', '')}
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-xs">记录通话</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-3 flex-col gap-1"
                  onClick={() => handleQuickAction('发送邮件', '')}
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-xs">发送邮件</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-3 flex-col gap-1"
                  onClick={() => handleQuickAction('安排会议', '')}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs">安排会议</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 最新动态 - 更丰富 */}
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="w-5 h-5 text-blue-600" />
              最新动态
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </CardTitle>
            <Button variant="ghost" size="sm">
              查看全部
            </Button>
          </div>
          <CardDescription className="text-xs">您关注的客户和线索的实时更新</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 border border-neutral-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer"
                  onClick={() => activity.actionable && handleQuickAction('查看详情', activity.company)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-700 mb-1">{activity.message}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.company}
                      </Badge>
                      <span className="text-xs text-neutral-400">{activity.time}</span>
                    </div>
                  </div>
                  {activity.actionable && (
                    <Button variant="ghost" size="sm" className="flex-shrink-0 h-7">
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
