import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target,
  Lightbulb,
  Activity,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  MousePointer,
  ShoppingCart,
  Zap,
  ArrowUpRight,
  Play,
  Pause
} from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type Role = 'director' | 'manager' | 'specialist';

interface CommandCenterProps {
  role: Role;
}

export function CommandCenter({ role }: CommandCenterProps) {
  const [animatedROI, setAnimatedROI] = useState(4.1);
  const [animatedLTV, setAnimatedLTV] = useState(850);
  const [animatedCAC, setAnimatedCAC] = useState(95);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [liveData, setLiveData] = useState<any[]>([]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedROI(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setAnimatedLTV(prev => Math.floor(prev + (Math.random() * 20 - 10)));
      setAnimatedCAC(prev => Math.floor(prev + (Math.random() * 4 - 2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate live streaming data
  useEffect(() => {
    const generateLiveData = () => {
      const now = new Date();
      return Array.from({ length: 20 }, (_, i) => {
        const time = new Date(now.getTime() - (19 - i) * 60000);
        return {
          time: time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          visitors: Math.floor(Math.random() * 500) + 800,
          conversions: Math.floor(Math.random() * 30) + 20
        };
      });
    };

    setLiveData(generateLiveData());

    const interval = setInterval(() => {
      setLiveData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          visitors: Math.floor(Math.random() * 500) + 800,
          conversions: Math.floor(Math.random() * 30) + 20
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock data
  const roiData = [
    { month: '1月', roi: 2.1, ltv: 580, cac: 120 },
    { month: '2月', roi: 2.4, ltv: 620, cac: 115 },
    { month: '3月', roi: 2.8, ltv: 680, cac: 110 },
    { month: '4月', roi: 3.2, ltv: 720, cac: 105 },
    { month: '5月', roi: 3.6, ltv: 780, cac: 98 },
    { month: '6月', roi: 4.1, ltv: 850, cac: 95 }
  ];

  const channelData = [
    { name: '社交媒体', value: 35, roi: 4.2, color: '#8B5CF6' },
    { name: '邮件营销', value: 25, roi: 5.1, color: '#EC4899' },
    { name: '付费广告', value: 20, roi: 3.5, color: '#F59E0B' },
    { name: '内容营销', value: 15, roi: 6.2, color: '#10B981' },
    { name: '其他', value: 5, roi: 2.8, color: '#6B7280' }
  ];

  const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6B7280'];

  const campaigns = [
    { 
      id: 1, 
      name: '新品上市', 
      status: 'active', 
      reach: 45000, 
      conversion: 3.2, 
      spend: 8500, 
      stage: '进行中',
      progress: 65,
      views: 125000,
      clicks: 4800,
      orders: 1440
    },
    { 
      id: 2, 
      name: '周末闪购', 
      status: 'active', 
      reach: 32000, 
      conversion: 5.1, 
      spend: 6200, 
      stage: '进行中',
      progress: 82,
      views: 98000,
      clicks: 5200,
      orders: 1632
    },
    { 
      id: 3, 
      name: '会员日', 
      status: 'planning', 
      reach: 0, 
      conversion: 0, 
      spend: 0, 
      stage: '策划中',
      progress: 25,
      views: 0,
      clicks: 0,
      orders: 0
    },
    { 
      id: 4, 
      name: '春季大促', 
      status: 'completed', 
      reach: 78000, 
      conversion: 4.8, 
      spend: 15000, 
      stage: '已结束',
      progress: 100,
      views: 245000,
      clicks: 12800,
      orders: 3744
    }
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Z世代用户在TikTok渠道表现突出',
      description: '过去30天，18-25岁用户群体在TikTok的互动率达8.7%，远超其他渠道的3.2%',
      action: '建议将15%预算向TikTok倾斜',
      impact: '+25% 预期ROI提升',
      priority: 'high',
      confidence: 92
    },
    {
      type: 'warning',
      title: '高价值客户流失风险预警',
      description: '预测下季度将有约120名高价值客户（LTV>$500）进入流失风险期',
      action: '建议启动VIP关怀活动',
      impact: '可挽回约$48,000收入',
      priority: 'urgent',
      confidence: 87
    },
    {
      type: 'success',
      title: '邮件营销效果持续优化',
      description: 'AI个性化标题使邮件打开率从22%提升至31%，点击率提升40%',
      action: '继续使用AI生成个性化内容',
      impact: '已提升ROI 18%',
      priority: 'medium',
      confidence: 95
    },
    {
      type: 'info',
      title: '最佳发送时间优化建议',
      description: '数据显示周五晚8-9点的用户互动率比平均水平高78%',
      action: '调整重要活动的发送时间至该时段',
      impact: '+15% 预期互动率提升',
      priority: 'medium',
      confidence: 89
    }
  ];

  const contentPerformance = [
    { title: '告别焦虑，提升300%效率', type: '邮件标题', engagement: 8.9, date: '2天前', views: 12500, clicks: 1113 },
    { title: '限时独家：半价入手顶级降噪耳机', type: '促销文案', engagement: 7.6, date: '3天前', views: 9800, clicks: 745 },
    { title: '技术突破：石墨烯振膜的纯净之声', type: '社交媒体', engagement: 9.2, date: '5天前', views: 15600, clicks: 1435 },
    { title: '会员专享：提前24小时抢购', type: '推送通知', engagement: 6.8, date: '1周前', views: 8200, clicks: 558 },
    { title: '新品首发：重新定义降噪体验', type: '博客文章', engagement: 8.1, date: '1周前', views: 11200, clicks: 907 }
  ];

  const tasks = [
    { id: 1, task: '审批"周末闪购"活动素材', priority: 'high', deadline: '今天 15:00', assignee: '王经理' },
    { id: 2, task: '查看A/B测试结果报告', priority: 'medium', deadline: '明天', assignee: '小李' },
    { id: 3, task: '更新Q2营销预算分配', priority: 'low', deadline: '本周五', assignee: '高总' }
  ];

  const funnel = [
    { stage: '曝光', value: 245000, rate: 100 },
    { stage: '访问', value: 45000, rate: 18.4 },
    { stage: '互动', value: 12800, rate: 5.2 },
    { stage: '加购', value: 4560, rate: 1.9 },
    { stage: '购买', value: 1440, rate: 0.6 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Director View */}
      {role === 'director' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg hover-lift relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">总营销ROI</p>
                      <h3 className="text-gray-900 text-4xl">{animatedROI}x</h3>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +28% vs 上季度
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg hover-lift relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">客户生命周期价值</p>
                      <h3 className="text-gray-900 text-4xl">${animatedLTV}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <DollarSign className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +18% vs 上季度
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg hover-lift relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">客户获取成本</p>
                      <h3 className="text-gray-900 text-4xl">${animatedCAC}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      -21% vs 上季度
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Conversion Funnel & Live Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg h-full">
                <h3 className="text-gray-900 mb-6">全渠道转化漏斗</h3>
                <div className="space-y-3">
                  {funnel.map((stage, index) => (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">{stage.stage}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-900">{stage.value.toLocaleString()}</span>
                          <span className="text-sm text-gray-500">{stage.rate}%</span>
                        </div>
                      </div>
                      <div className="relative h-12 bg-white/50 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.rate}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-end pr-4"
                        >
                          <span className="text-white text-sm">{stage.value.toLocaleString()}</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-900">实时数据流</h3>
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <Activity className="w-3 h-3 mr-1 animate-pulse" />
                    实时更新
                  </Badge>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={liveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" stroke="#6B7280" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line type="monotone" dataKey="visitors" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="conversions" stroke="#EC4899" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg">
                <h3 className="text-gray-900 mb-6">ROI与LTV趋势</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={roiData}>
                    <defs>
                      <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area type="monotone" dataKey="roi" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorRoi)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg">
                <h3 className="text-gray-900 mb-6">渠道预算分配与ROI</h3>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="60%" height={280}>
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-3">
                    {channelData.map((channel, index) => (
                      <motion.div
                        key={channel.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                          <span className="text-sm text-gray-700">{channel.name}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-900">{channel.value}%</span>
                          <span className="text-gray-500 ml-2">ROI {channel.roi}x</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* AI Strategic Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">AI战略洞察</h3>
                  <p className="text-sm text-gray-500">基于数据分析的智能建议</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`p-5 rounded-2xl border-l-4 glass-card hover-lift cursor-pointer ${
                      insight.type === 'opportunity' ? 'border-green-500' :
                      insight.type === 'warning' ? 'border-amber-500' :
                      insight.type === 'success' ? 'border-blue-500' :
                      'border-purple-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-gray-900">{insight.title}</h4>
                          {insight.priority === 'urgent' && (
                            <Badge className="bg-red-500 text-white border-0 text-xs">紧急</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`border-0 ${
                        insight.type === 'opportunity' ? 'bg-green-100 text-green-700' :
                        insight.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                        insight.type === 'success' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {insight.impact}
                      </Badge>
                      <span className="text-xs text-gray-500">置信度 {insight.confidence}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-700">建议：{insight.action}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </>
      )}

      {/* Manager View */}
      {role === 'manager' && (
        <>
          {/* Campaign Kanban */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">我的营销活动</h3>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg border-0">
                  + 创建新活动
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['策划中', '进行中', '已结束'].map((stage, stageIndex) => (
                  <div key={stage} className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-700">{stage}</h4>
                      <Badge variant="outline" className="border-purple-300 text-purple-700">
                        {campaigns.filter(c => c.stage === stage).length}
                      </Badge>
                    </div>
                    {campaigns.filter(c => c.stage === stage).map((campaign, index) => (
                      <motion.div
                        key={campaign.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stageIndex * 0.1 + index * 0.1 }}
                      >
                        <Card 
                          onClick={() => setSelectedCampaign(campaign.id)}
                          className={`glass-card p-4 border-0 hover-lift cursor-pointer transition-all ${
                            selectedCampaign === campaign.id ? 'ring-2 ring-purple-500 shadow-lg' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-gray-900">{campaign.name}</h4>
                            {campaign.status === 'active' && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <Play className="w-3 h-3 text-green-600" />
                              </div>
                            )}
                          </div>
                          {campaign.reach > 0 && (
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <Eye className="w-3 h-3" />
                                    <span>曝光</span>
                                  </div>
                                  <span className="text-gray-900">{campaign.views?.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <MousePointer className="w-3 h-3" />
                                    <span>点击</span>
                                  </div>
                                  <span className="text-gray-900">{campaign.clicks?.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <ShoppingCart className="w-3 h-3" />
                                    <span>订单</span>
                                  </div>
                                  <span className="text-green-600">{campaign.orders?.toLocaleString()}</span>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                  <span>进度</span>
                                  <span>{campaign.progress}%</span>
                                </div>
                                <Progress value={campaign.progress} className="h-2" />
                              </div>
                              <div className="flex items-center justify-between text-sm pt-2 border-t border-white/50">
                                <span className="text-gray-600">已花费</span>
                                <span className="text-gray-900">${campaign.spend.toLocaleString()}</span>
                              </div>
                            </div>
                          )}
                          {campaign.status === 'planning' && (
                            <div className="text-center py-6">
                              <p className="text-sm text-gray-500">活动筹备中...</p>
                              <Progress value={campaign.progress} className="h-2 mt-3" />
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Real-time Monitoring & Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg">
                <h3 className="text-gray-900 mb-6">实时效果监控 - A/B测试对比</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={[
                    { name: 'A版本', 打开率: 28, 点击率: 4.2, 转化率: 3.1 },
                    { name: 'B版本', 打开率: 31, 点击率: 5.8, 转化率: 4.6 },
                    { name: 'C版本', 打开率: 25, 点击率: 3.9, 转化率: 2.8 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="打开率" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="点击率" fill="#EC4899" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="转化率" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-800">AI建议：B版本在所有指标上表现最优，建议将100%流量导向该版本</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg">
                <h3 className="text-gray-900 mb-6">任务与提醒</h3>
                <div className="space-y-3">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`p-4 rounded-xl border-l-4 glass-card hover-lift cursor-pointer ${
                        task.priority === 'high' ? 'border-red-500' :
                        task.priority === 'medium' ? 'border-amber-500' :
                        'border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-gray-900 flex-1">{task.task}</p>
                        {task.priority === 'high' ? (
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 ml-2" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">截止：{task.deadline}</span>
                        <span className="text-gray-500">{task.assignee}</span>
                      </div>
                    </motion.div>
                  ))}
                  <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-purple-900">AI提醒</p>
                        <p className="text-sm text-purple-700 mt-1">"新品上市"活动的A文案版本点击率显著下降，建议暂停并切换至表现更优的B版本</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}

      {/* Specialist View */}
      {role === 'specialist' && (
        <>
          {/* Content Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">我的内容日历</h3>
                <Button variant="outline" className="border-purple-300 hover:bg-purple-50">
                  <Calendar className="w-4 h-4 mr-2" />
                  添加内容
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day) => (
                  <div key={day} className="text-center text-sm text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 28 }, (_, i) => {
                  const hasContent = [5, 8, 12, 15, 19, 22, 26].includes(i);
                  const hasMultiple = [12, 22].includes(i);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className={`p-2 rounded-xl border transition-all cursor-pointer min-h-[90px] ${
                        hasContent 
                          ? 'glass-card hover-lift shadow-md' 
                          : 'bg-white/30 border-white/40 hover:bg-white/50'
                      }`}
                    >
                      <p className="text-sm text-gray-900 mb-1">{i + 1}</p>
                      {hasContent && (
                        <div className="space-y-1">
                          <div className="text-xs px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                            邮件
                          </div>
                          {hasMultiple && (
                            <div className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg">
                              社交
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* AI Creative Workshop & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">AI创意工坊</h3>
                    <p className="text-sm text-gray-500">今日创意火花</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { title: '告别焦虑，这款产品让您的效率提升300%', type: '邮件标题', score: 9.2 },
                    { title: '限时独家：半价入手顶级降噪耳机', type: '促销文案', score: 8.7 },
                    { title: '会员专享：提前24小时抢购新品', type: '推送通知', score: 8.1 },
                    { title: '技术突破：石墨烯振膜带来的纯净之声', type: '社交媒体', score: 9.0 }
                  ].map((idea, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 glass-card rounded-xl border border-purple-200/50 hover-lift cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">{idea.title}</p>
                          <p className="text-sm text-gray-600">{idea.type}</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 ml-2">
                          {idea.score}分
                        </Badge>
                      </div>
                      <Button variant="ghost" className="text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 h-auto mt-2">
                        使用此创意 <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card p-6 border-0 shadow-lg">
                <h3 className="text-gray-900 mb-6">内容表现排行榜 - Top 5</h3>
                <div className="space-y-3">
                  {contentPerformance.map((content, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 glass-card rounded-xl hover-lift cursor-pointer"
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                        'bg-gradient-to-br from-purple-400 to-purple-500'
                      }`}>
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 mb-1 truncate">{content.title}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                          <span>{content.type}</span>
                          <span>•</span>
                          <span>{content.date}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{content.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MousePointer className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{content.clicks.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={content.engagement * 10} className="flex-1 h-2" />
                          <span className="text-sm text-gray-900">{content.engagement}/10</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
