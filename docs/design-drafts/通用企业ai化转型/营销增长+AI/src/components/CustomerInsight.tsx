import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Users, 
  Search, 
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Mail,
  Clock,
  Target,
  Lightbulb,
  MessageSquare,
  DollarSign,
  Zap,
  Heart,
  Star,
  ArrowRight,
  Activity,
  BarChart3,
  TrendingDown as TrendingDownIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

type Role = 'director' | 'manager' | 'specialist';

interface CustomerInsightProps {
  role: Role;
}

export function CustomerInsight({ role }: CustomerInsightProps) {
  const [selectedSegment, setSelectedSegment] = useState('tech-enthusiasts');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 12500,
    engagement: 68,
    satisfaction: 87
  });

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 50 - 25),
        engagement: Math.min(100, Math.max(0, prev.engagement + (Math.random() * 4 - 2))),
        satisfaction: Math.min(100, Math.max(0, prev.satisfaction + (Math.random() * 3 - 1.5)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  const segments = [
    {
      id: 'tech-enthusiasts',
      name: '精打细算的技术爱好者',
      avatar: '🤓',
      size: liveMetrics.activeUsers,
      growth: 15,
      ltv: 680,
      riskLevel: 'low',
      engagement: 85
    },
    {
      id: 'high-risk',
      name: '高价值流失风险客户',
      avatar: '⚠️',
      size: 3200,
      growth: -8,
      ltv: 1250,
      riskLevel: 'high',
      engagement: 32
    },
    {
      id: 'gen-z',
      name: 'Z世代社交达人',
      avatar: '🎯',
      size: 18900,
      growth: 32,
      ltv: 420,
      riskLevel: 'low',
      engagement: 92
    },
    {
      id: 'premium',
      name: '品质优先的中产阶级',
      avatar: '💎',
      size: 8600,
      growth: 12,
      ltv: 890,
      riskLevel: 'medium',
      engagement: 76
    },
    {
      id: 'bargain',
      name: '促销敏感型购物者',
      avatar: '🏷️',
      size: 22100,
      growth: 8,
      ltv: 285,
      riskLevel: 'low',
      engagement: 64
    }
  ];

  const segmentDetails: any = {
    'tech-enthusiasts': {
      persona: {
        name: 'Alex Chen',
        age: '28-35岁',
        occupation: 'IT从业者 / 产品经理',
        income: '中高收入',
        avatar: '🤓',
        location: '一线城市',
        education: '本科及以上'
      },
      characteristics: [
        { key: '价格敏感', value: 65 },
        { key: '品质重视', value: 85 },
        { key: '科技敏感度', value: 95 },
        { key: '品牌忠诚度', value: 70 },
        { key: '社交活跃度', value: 60 }
      ],
      behaviors: [
        { behavior: '偏好邮件沟通', percentage: 72, trend: 'up' },
        { behavior: '活跃于晚间8-10点', percentage: 68, trend: 'up' },
        { behavior: '热衷深度评测内容', percentage: 81, trend: 'stable' },
        { behavior: '关注技术参数', percentage: 89, trend: 'up' },
        { behavior: '参与在线讨论', percentage: 54, trend: 'down' }
      ],
      purchaseHistory: [
        { month: '1月', amount: 580, orders: 2 },
        { month: '2月', amount: 420, orders: 1 },
        { month: '3月', amount: 850, orders: 3 },
        { month: '4月', amount: 680, orders: 2 },
        { month: '5月', amount: 920, orders: 3 },
        { month: '6月', amount: 750, orders: 2 }
      ],
      nextBestActions: [
        { action: '推荐新品降噪耳机（石墨烯技术）', probability: 78, channel: '邮件', timing: '周五晚8点', expectedRevenue: 299 },
        { action: '邀请参加技术分享会', probability: 65, channel: '社交媒体', timing: '工作日午休', expectedRevenue: 0 },
        { action: '发送深度评测文章', probability: 82, channel: '邮件/博客', timing: '周末上午', expectedRevenue: 150 }
      ],
      aiRecommendation: {
        message: '针对该群体，建议使用"技术突破"和"性能提升"作为核心卖点，通过EDM渠道在周五晚上8点进行推送。',
        campaign: '技术爱好者专属：深度体验新品',
        expectedROI: '预期ROI: 5.2x',
        estimatedConversion: '预计转化率: 6.8%',
        confidence: 94
      }
    },
    'high-risk': {
      persona: {
        name: 'Sarah Wang',
        age: '35-45岁',
        occupation: '企业高管',
        income: '高收入',
        avatar: '⚠️',
        location: '一线城市',
        education: '硕士及以上'
      },
      characteristics: [
        { key: '价格敏感', value: 30 },
        { key: '品质重视', value: 95 },
        { key: '科技敏感度', value: 60 },
        { key: '品牌忠诚度', value: 85 },
        { key: '社交活跃度', value: 40 }
      ],
      behaviors: [
        { behavior: '过去90天购买3次以上', percentage: 100, trend: 'down' },
        { behavior: '最近2周未访问网站', percentage: 100, trend: 'down' },
        { behavior: '偏好高端产品线', percentage: 92, trend: 'stable' },
        { behavior: '客服满意度高', percentage: 88, trend: 'up' },
        { behavior: '响应个性化服务', percentage: 95, trend: 'up' }
      ],
      purchaseHistory: [
        { month: '1月', amount: 1280, orders: 3 },
        { month: '2月', amount: 1650, orders: 4 },
        { month: '3月', amount: 980, orders: 2 },
        { month: '4月', amount: 520, orders: 1 },
        { month: '5月', amount: 0, orders: 0 },
        { month: '6月', amount: 0, orders: 0 }
      ],
      nextBestActions: [
        { action: 'VIP专属优惠券（500元）', probability: 85, channel: '短信+邮件', timing: '立即', expectedRevenue: 1200 },
        { action: '专属客户经理回访', probability: 78, channel: '电话', timing: '工作日上午', expectedRevenue: 0 },
        { action: '邀请参加VIP新品预览会', probability: 72, channel: '邮件', timing: '本周内', expectedRevenue: 800 }
      ],
      aiRecommendation: {
        message: '该群体为高价值客户，流失风险极高。建议立即启动VIP关怀活动，提供个性化专属服务和优惠。',
        campaign: '挽回活动：VIP专属关怀计划',
        expectedROI: '可挽回价值: $48,000',
        estimatedConversion: '预计挽回率: 65%',
        confidence: 87
      }
    },
    'gen-z': {
      persona: {
        name: 'Zoe Liu',
        age: '18-25岁',
        occupation: '大学生 / 初入职场',
        income: '中低收入',
        avatar: '🎯',
        location: '新一线城市',
        education: '本科在读/毕业'
      },
      characteristics: [
        { key: '价格敏感', value: 85 },
        { key: '品质重视', value: 60 },
        { key: '科技敏感度', value: 75 },
        { key: '品牌忠诚度', value: 45 },
        { key: '社交活跃度', value: 95 }
      ],
      behaviors: [
        { behavior: '活跃于TikTok/小红书', percentage: 92, trend: 'up' },
        { behavior: '热衷分享种草内容', percentage: 88, trend: 'up' },
        { behavior: '参与互动活动', percentage: 85, trend: 'up' },
        { behavior: '关注网红推荐', percentage: 79, trend: 'stable' },
        { behavior: '偏好视觉化内容', percentage: 91, trend: 'up' }
      ],
      purchaseHistory: [
        { month: '1月', amount: 280, orders: 2 },
        { month: '2月', amount: 0, orders: 0 },
        { month: '3月', amount: 420, orders: 3 },
        { month: '4月', amount: 180, orders: 1 },
        { month: '5月', amount: 520, orders: 4 },
        { month: '6月', amount: 350, orders: 2 }
      ],
      nextBestActions: [
        { action: '发起TikTok挑战赛', probability: 82, channel: 'TikTok', timing: '周末下午', expectedRevenue: 199 },
        { action: '限时拼团优惠', probability: 88, channel: '小红书+微信', timing: '周五晚', expectedRevenue: 159 },
        { action: 'KOL种草内容推送', probability: 76, channel: '社交媒体', timing: '每日', expectedRevenue: 89 }
      ],
      aiRecommendation: {
        message: '该群体在TikTok渠道表现突出，互动率达8.7%。建议加大短视频和社交媒体投入，使用KOL合作和互动活动。',
        campaign: 'Z世代专属：社交互动挑战',
        expectedROI: '预期ROI: 6.5x',
        estimatedConversion: '预计转化率: 5.2%',
        confidence: 91
      }
    },
    'premium': {
      persona: {
        name: 'Michael Zhang',
        age: '30-45岁',
        occupation: '专业人士',
        income: '中高收入',
        avatar: '💎',
        location: '一线城市',
        education: '本科及以上'
      },
      characteristics: [
        { key: '价格敏感', value: 40 },
        { key: '品质重视', value: 90 },
        { key: '科技敏感度', value: 70 },
        { key: '品牌忠诚度', value: 80 },
        { key: '社交活跃度', value: 50 }
      ],
      behaviors: [
        { behavior: '关注品牌故事', percentage: 76, trend: 'up' },
        { behavior: '重视售后服务', percentage: 88, trend: 'stable' },
        { behavior: '偏好线下体验', percentage: 65, trend: 'down' },
        { behavior: '口碑传播意愿高', percentage: 72, trend: 'up' },
        { behavior: '长期价值导向', percentage: 84, trend: 'up' }
      ],
      purchaseHistory: [
        { month: '1月', amount: 780, orders: 2 },
        { month: '2月', amount: 920, orders: 2 },
        { month: '3月', amount: 650, orders: 1 },
        { month: '4月', amount: 1100, orders: 3 },
        { month: '5月', amount: 880, orders: 2 },
        { month: '6月', amount: 950, orders: 2 }
      ],
      nextBestActions: [
        { action: '邀请线下新品体验会', probability: 75, channel: '邮件+短信', timing: '周末', expectedRevenue: 599 },
        { action: '推送品牌故事内容', probability: 68, channel: '邮件', timing: '周中', expectedRevenue: 299 },
        { action: '会员升级专享服务', probability: 80, channel: '邮件', timing: '每月1日', expectedRevenue: 0 }
      ],
      aiRecommendation: {
        message: '该群体注重品质和服务体验。建议通过品牌故事、线下体验和会员专属服务来提升忠诚度和复购率。',
        campaign: '品质生活：尊享会员计划',
        expectedROI: '预期ROI: 4.8x',
        estimatedConversion: '预计转化率: 7.5%',
        confidence: 89
      }
    },
    'bargain': {
      persona: {
        name: 'Linda Ma',
        age: '25-40岁',
        occupation: '家庭主妇 / 普通职员',
        income: '中等收入',
        avatar: '🏷️',
        location: '二三线城市',
        education: '专科/本科'
      },
      characteristics: [
        { key: '价格敏感', value: 95 },
        { key: '品质重视', value: 65 },
        { key: '科技敏感度', value: 50 },
        { key: '品牌忠诚度', value: 40 },
        { key: '社交活跃度', value: 70 }
      ],
      behaviors: [
        { behavior: '关注促销信息', percentage: 96, trend: 'stable' },
        { behavior: '使用优惠券', percentage: 92, trend: 'up' },
        { behavior: '比价行为频繁', percentage: 88, trend: 'up' },
        { behavior: '参与拼团活动', percentage: 85, trend: 'up' },
        { behavior: '分享优惠信息', percentage: 78, trend: 'stable' }
      ],
      purchaseHistory: [
        { month: '1月', amount: 180, orders: 3 },
        { month: '2月', amount: 250, orders: 4 },
        { month: '3月', amount: 320, orders: 5 },
        { month: '4月', amount: 290, orders: 4 },
        { month: '5月', amount: 380, orders: 6 },
        { month: '6月', amount: 210, orders: 3 }
      ],
      nextBestActions: [
        { action: '限时闪购通知', probability: 90, channel: '短信+推送', timing: '促销前1小时', expectedRevenue: 99 },
        { action: '专属优惠券推送', probability: 88, channel: 'APP推送', timing: '每周五', expectedRevenue: 79 },
        { action: '拼团活动邀请', probability: 85, channel: '微信', timing: '周末', expectedRevenue: 59 }
      ],
      aiRecommendation: {
        message: '该群体对价格高度敏感。建议使用"限时优惠"、"独家折扣"作为核心卖点，通过短信和推送在促销时段精准触达。',
        campaign: '超值购：限时特惠专场',
        expectedROI: '预期ROI: 3.8x',
        estimatedConversion: '预计转化率: 8.5%',
        confidence: 92
      }
    }
  };

  const selected = segmentDetails[selectedSegment as keyof typeof segmentDetails];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Segment List */}
        <div className="lg:col-span-1 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass-card p-4 border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">用户分群</h3>
                  <p className="text-sm text-gray-500">{segments.length} 个活跃群组</p>
                </div>
              </div>

              {/* AI Natural Language Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="用自然语言描述目标客户..."
                    className="pl-10 glass-card border-white/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 例如："最近90天购买3次但2周未访问的高价值客户"
                </p>
              </div>

              {/* Live Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="glass-card p-3 rounded-xl">
                  <div className="flex items-center gap-1 mb-1">
                    <Activity className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-gray-600">活跃用户</span>
                  </div>
                  <p className="text-gray-900">{liveMetrics.activeUsers.toLocaleString()}</p>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <div className="flex items-center gap-1 mb-1">
                    <Heart className="w-3 h-3 text-pink-600" />
                    <span className="text-xs text-gray-600">满意度</span>
                  </div>
                  <p className="text-gray-900">{liveMetrics.satisfaction.toFixed(0)}%</p>
                </div>
              </div>

              {/* Segment Cards */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {segments.map((segment, index) => (
                  <motion.div
                    key={segment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedSegment(segment.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all hover-lift ${
                      selectedSegment === segment.id
                        ? 'glass-card border-purple-300 shadow-lg ring-2 ring-purple-500/30'
                        : 'bg-white/40 border-white/40 hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">{segment.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 mb-1">{segment.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-3 h-3" />
                          <span>{segment.size.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          {segment.growth > 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-600" />
                          ) : (
                            <TrendingDownIcon className="w-3 h-3 text-red-600" />
                          )}
                          <span className={segment.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                            {segment.growth > 0 ? '+' : ''}{segment.growth}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <DollarSign className="w-3 h-3" />
                          <span>LTV ${segment.ltv}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">互动率</span>
                        <div className="flex items-center gap-2">
                          <Progress value={segment.engagement} className="w-16 h-2" />
                          <span className="text-gray-900">{segment.engagement}%</span>
                        </div>
                      </div>
                    </div>

                    {segment.riskLevel === 'high' && (
                      <Badge className="mt-2 bg-red-100 text-red-700 hover:bg-red-100 border-0">
                        ⚠️ 高流失风险
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Panel - 360° Profile */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSegment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Persona Card */}
              <Card className="glass-card p-6 border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl shadow-lg">
                      {selected.persona.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-gray-900">{selected.persona.name}</h2>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                          典型画像
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {segments.find(s => s.id === selectedSegment)?.name}
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="glass-card p-3 rounded-xl">
                          <p className="text-xs text-gray-500 mb-1">年龄段</p>
                          <p className="text-gray-900">{selected.persona.age}</p>
                        </div>
                        <div className="glass-card p-3 rounded-xl">
                          <p className="text-xs text-gray-500 mb-1">职业</p>
                          <p className="text-gray-900">{selected.persona.occupation.split('/')[0]}</p>
                        </div>
                        <div className="glass-card p-3 rounded-xl">
                          <p className="text-xs text-gray-500 mb-1">收入水平</p>
                          <p className="text-gray-900">{selected.persona.income}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="glass-card p-3 rounded-xl text-center">
                      <p className="text-xs text-gray-500 mb-1">群体规模</p>
                      <p className="text-xl text-gray-900">
                        {segments.find(s => s.id === selectedSegment)?.size.toLocaleString()}
                      </p>
                    </div>
                    <div className="glass-card p-3 rounded-xl text-center">
                      <p className="text-xs text-gray-500 mb-1">增长趋势</p>
                      <p className={`text-xl ${
                        (segments.find(s => s.id === selectedSegment)?.growth || 0) > 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {segments.find(s => s.id === selectedSegment)?.growth}%
                      </p>
                    </div>
                    <div className="glass-card p-3 rounded-xl text-center">
                      <p className="text-xs text-gray-500 mb-1">置信度</p>
                      <p className="text-xl text-purple-600">{selected.aiRecommendation.confidence}%</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Characteristics & Purchase History */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card p-6 border-0 shadow-lg">
                  <h3 className="text-gray-900 mb-6">用户特征画像</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={selected.characteristics}>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis dataKey="key" stroke="#6B7280" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6B7280" tick={{ fontSize: 12 }} />
                      <Radar 
                        name="特征值" 
                        dataKey="value" 
                        stroke="#8B5CF6" 
                        fill="#8B5CF6" 
                        fillOpacity={0.5}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="glass-card p-6 border-0 shadow-lg">
                  <h3 className="text-gray-900 mb-6">购买历史趋势</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={selected.purchaseHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 12 }} />
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
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Behavior Patterns */}
              <Card className="glass-card p-6 border-0 shadow-lg">
                <h3 className="text-gray-900 mb-6">行为模式分析</h3>
                <div className="space-y-4">
                  {selected.behaviors.map((behavior: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">{behavior.behavior}</span>
                          {behavior.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                          {behavior.trend === 'down' && <TrendingDownIcon className="w-4 h-4 text-red-600" />}
                        </div>
                        <span className="text-gray-900">{behavior.percentage}%</span>
                      </div>
                      <Progress value={behavior.percentage} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Next Best Actions */}
              <Card className="glass-card p-6 border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="text-gray-900">下一步最佳行动 (Next Best Action)</h3>
                    <p className="text-sm text-gray-500">AI预测的最有效营销策略</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {selected.nextBestActions.map((action: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-5 rounded-2xl border border-purple-200/50 hover-lift cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                            {action.action}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{action.channel}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{action.timing}</span>
                            </div>
                            {action.expectedRevenue > 0 && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>${action.expectedRevenue}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 ml-4">
                          成功率 {action.probability}%
                        </Badge>
                      </div>
                      <Progress value={action.probability} className="h-2 mb-3" />
                      <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 h-auto">
                        立即执行 <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* AI Marketing Recommendation */}
              <Card className="glass-card p-6 border-0 shadow-lg bg-gradient-to-br from-green-50/80 to-emerald-50/80 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Lightbulb className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-gray-900">AI营销建议</h3>
                        <Badge className="bg-white/80 text-green-700 border-0">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          置信度 {selected.aiRecommendation.confidence}%
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4">{selected.aiRecommendation.message}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <div className="glass-card p-4 rounded-xl">
                          <p className="text-xs text-gray-600 mb-1">推荐活动</p>
                          <p className="text-gray-900">{selected.aiRecommendation.campaign}</p>
                        </div>
                        <div className="glass-card p-4 rounded-xl">
                          <p className="text-xs text-gray-600 mb-1">预期效果</p>
                          <p className="text-green-600">{selected.aiRecommendation.expectedROI}</p>
                        </div>
                        <div className="glass-card p-4 rounded-xl">
                          <p className="text-xs text-gray-600 mb-1">转化预测</p>
                          <p className="text-green-600">{selected.aiRecommendation.estimatedConversion}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg border-0">
                          <Zap className="w-4 h-4 mr-2" />
                          创建营销活动
                        </Button>
                        <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 glass-card">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          查看详细分析
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
