import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Slider } from './ui/slider';
import { AIAssistant } from './AIAssistant';
import { AIContentGenerator } from './AIContentGenerator';
import { AIOptimizerPanel } from './AIOptimizerPanel';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, 
  MessageSquare, 
  Mail, 
  Radio, 
  Bot, 
  Send, 
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Users,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  Pause,
  Settings,
  ChevronRight,
  Filter,
  Search,
  BarChart3,
  Globe,
  TrendingDown,
  Star,
  UserPlus,
  ArrowUpRight,
  Activity,
  Brain,
  Megaphone,
  Link2,
  Calendar,
  Download,
  Upload,
  Edit,
  Trash2,
  Copy,
  RefreshCw,
  MoreVertical,
  ChevronDown,
  ExternalLink,
  MapPin,
  Award,
  DollarSign,
  Percent,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Plus,
  Image,
  Video,
  FileText,
  Hash,
  AtSign,
  Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Role = 'director' | 'manager' | 'specialist';

interface SocialMediaHubProps {
  role: Role;
}

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  followers: number;
  engagement: number;
  growthRate: number;
}

interface TrendingTopic {
  id: string;
  keyword: string;
  platform: string;
  volume: number;
  sentiment: number;
  growth: number;
  category: string;
  relatedKeywords: string[];
  peakTime: string;
}

interface AutoTask {
  id: string;
  type: 'monitor' | 'post' | 'engage' | 'dm' | 'email' | 'kol';
  platform: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  lastRun: string;
  nextRun: string;
  metrics: {
    reached: number;
    engaged: number;
    converted: number;
  };
  schedule: string;
}

interface KOL {
  id: string;
  name: string;
  platform: string;
  followers: number;
  engagement: number;
  niche: string;
  score: number;
  avatar: string;
  location: string;
  avgLikes: number;
  avgComments: number;
  estimatedCost: string;
  recentPosts: number;
}

interface ContentCalendarItem {
  id: string;
  date: string;
  time: string;
  platform: string[];
  content: string;
  type: 'post' | 'story' | 'video' | 'carousel';
  status: 'scheduled' | 'published' | 'draft';
  aiGenerated: boolean;
}

interface Mention {
  id: string;
  platform: string;
  user: string;
  avatar: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  time: string;
  likes: number;
  replies: number;
  responded: boolean;
}

export function SocialMediaHub({ role }: SocialMediaHubProps) {
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'x', name: 'X (Twitter)', icon: '𝕏', color: '#000000', connected: true, followers: 125400, engagement: 4.8, growthRate: 12.4 },
    { id: 'facebook', name: 'Facebook', icon: 'f', color: '#1877F2', connected: true, followers: 89600, engagement: 3.2, growthRate: 8.7 },
    { id: 'instagram', name: 'Instagram', icon: 'IG', color: '#E4405F', connected: true, followers: 156700, engagement: 6.4, growthRate: 15.2 },
    { id: 'discord', name: 'Discord', icon: '💬', color: '#5865F2', connected: true, followers: 12300, engagement: 8.9, growthRate: 22.3 },
    { id: 'reddit', name: 'Reddit', icon: '🔴', color: '#FF4500', connected: true, followers: 45200, engagement: 5.1, growthRate: 9.8 },
    { id: 'linkedin', name: 'LinkedIn', icon: 'in', color: '#0A66C2', connected: false, followers: 0, engagement: 0, growthRate: 0 },
  ]);

  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([
    { 
      id: '1', 
      keyword: 'AI营销', 
      platform: 'X', 
      volume: 45600, 
      sentiment: 0.78, 
      growth: 145, 
      category: '技术',
      relatedKeywords: ['机器学习', '自动化', '数字营销'],
      peakTime: '14:00-16:00'
    },
    { 
      id: '2', 
      keyword: '黑五促销', 
      platform: 'Instagram', 
      volume: 123400, 
      sentiment: 0.85, 
      growth: 234, 
      category: '电商',
      relatedKeywords: ['打折', '限时优惠', '购物节'],
      peakTime: '20:00-22:00'
    },
    { 
      id: '3', 
      keyword: '数字化转型', 
      platform: 'LinkedIn', 
      volume: 34200, 
      sentiment: 0.72, 
      growth: 89, 
      category: '商业',
      relatedKeywords: ['云计算', '企业管理', 'SaaS'],
      peakTime: '09:00-11:00'
    },
    { 
      id: '4', 
      keyword: '短视频营销', 
      platform: 'Facebook', 
      volume: 67800, 
      sentiment: 0.68, 
      growth: 156, 
      category: '内容',
      relatedKeywords: ['TikTok', '视频制作', '病毒传播'],
      peakTime: '18:00-21:00'
    },
  ]);

  const [autoTasks, setAutoTasks] = useState<AutoTask[]>([
    {
      id: '1',
      type: 'monitor',
      platform: 'X',
      name: '品牌舆情实时监测',
      status: 'active',
      progress: 78,
      lastRun: '2分钟前',
      nextRun: '18分钟后',
      metrics: { reached: 23400, engaged: 1200, converted: 89 },
      schedule: '每20分钟'
    },
    {
      id: '2',
      type: 'post',
      platform: 'Instagram',
      name: 'AI自动发布-新品推广',
      status: 'active',
      progress: 45,
      lastRun: '15分钟前',
      nextRun: '45分钟后',
      metrics: { reached: 45600, engaged: 2890, converted: 234 },
      schedule: '每日3次'
    },
    {
      id: '3',
      type: 'engage',
      platform: 'Reddit',
      name: '热帖自动截评引流',
      status: 'active',
      progress: 92,
      lastRun: '刚刚',
      nextRun: '5分钟后',
      metrics: { reached: 12300, engaged: 890, converted: 67 },
      schedule: '每5分钟'
    },
    {
      id: '4',
      type: 'dm',
      platform: 'X',
      name: '潜在客户DM营销',
      status: 'paused',
      progress: 34,
      lastRun: '1小时前',
      nextRun: '已暂停',
      metrics: { reached: 5600, engaged: 234, converted: 12 },
      schedule: '每日1次'
    },
    {
      id: '5',
      type: 'kol',
      platform: 'Instagram',
      name: 'KOL自动发现与评估',
      status: 'active',
      progress: 67,
      lastRun: '5分钟前',
      nextRun: '55分钟后',
      metrics: { reached: 8900, engaged: 456, converted: 34 },
      schedule: '每小时'
    },
    {
      id: '6',
      type: 'email',
      platform: 'All',
      name: '智能邮件营销自动化',
      status: 'active',
      progress: 88,
      lastRun: '30分钟前',
      nextRun: '30分钟后',
      metrics: { reached: 34500, engaged: 3400, converted: 567 },
      schedule: '每小时'
    },
  ]);

  const [kols, setKols] = useState<KOL[]>([
    { 
      id: '1', 
      name: 'TechInfluencer', 
      platform: 'X', 
      followers: 234500, 
      engagement: 8.9, 
      niche: '科技', 
      score: 94, 
      avatar: '👨‍💻',
      location: '美国·旧金山',
      avgLikes: 2340,
      avgComments: 456,
      estimatedCost: '$500-800',
      recentPosts: 45
    },
    { 
      id: '2', 
      name: 'MarketingPro', 
      platform: 'LinkedIn', 
      followers: 89600, 
      engagement: 6.7, 
      niche: '营销', 
      score: 87, 
      avatar: '👩‍💼',
      location: '英国·伦敦',
      avgLikes: 890,
      avgComments: 123,
      estimatedCost: '$300-500',
      recentPosts: 32
    },
    { 
      id: '3', 
      name: 'LifestyleBlogger', 
      platform: 'Instagram', 
      followers: 567800, 
      engagement: 12.4, 
      niche: '生活方式', 
      score: 96, 
      avatar: '📸',
      location: '中国·上海',
      avgLikes: 7890,
      avgComments: 1234,
      estimatedCost: '$1000-1500',
      recentPosts: 67
    },
    { 
      id: '4', 
      name: 'GamingKing', 
      platform: 'Discord', 
      followers: 123400, 
      engagement: 15.6, 
      niche: '游戏', 
      score: 91, 
      avatar: '🎮',
      location: '日本·东京',
      avgLikes: 1890,
      avgComments: 567,
      estimatedCost: '$400-700',
      recentPosts: 89
    },
  ]);

  const [mentions, setMentions] = useState<Mention[]>([
    { 
      id: '1', 
      platform: 'X', 
      user: '@tech_enthusiast', 
      avatar: '🧑‍💻',
      content: '刚试用了GrowthEncore AI，效果太棒了！营销自动化确实强大 🚀 #AI营销', 
      sentiment: 'positive', 
      time: '2分钟前',
      likes: 234,
      replies: 12,
      responded: false
    },
    { 
      id: '2', 
      platform: 'Reddit', 
      user: 'u/marketing_pro', 
      avatar: '👤',
      content: '有人用过GrowthEncore AI吗？想了解实际效果和ROI提升情况', 
      sentiment: 'neutral', 
      time: '15分钟前',
      likes: 45,
      replies: 8,
      responded: true
    },
    { 
      id: '3', 
      platform: 'Instagram', 
      user: '@brand_lover', 
      avatar: '💁‍♀️',
      content: '终于找到合适的营销工具了，推荐给所有营销人 ❤️ 自动化功能太赞了', 
      sentiment: 'positive', 
      time: '1小时前',
      likes: 567,
      replies: 34,
      responded: false
    },
    { 
      id: '4', 
      platform: 'Discord', 
      user: 'MarketingGeek#1234', 
      avatar: '🎯',
      content: '这个价格有点贵，但功能确实全面，考虑团队版', 
      sentiment: 'neutral', 
      time: '2小时前',
      likes: 23,
      replies: 5,
      responded: true
    },
    { 
      id: '5', 
      platform: 'X', 
      user: '@startup_ceo', 
      avatar: '👔',
      content: '客服响应有点慢，希望能改进一下 😕', 
      sentiment: 'negative', 
      time: '3小时前',
      likes: 12,
      replies: 3,
      responded: false
    },
  ]);

  const [contentCalendar, setContentCalendar] = useState<ContentCalendarItem[]>([
    { 
      id: '1', 
      date: '2025-11-07', 
      time: '14:00', 
      platform: ['X', 'Facebook'], 
      content: 'AI驱动的营销自动化：提升ROI的5个关键策略 🚀', 
      type: 'post', 
      status: 'scheduled',
      aiGenerated: true
    },
    { 
      id: '2', 
      date: '2025-11-07', 
      time: '18:00', 
      platform: ['Instagram'], 
      content: '新品发布会精彩瞬间回顾 ✨ #产品发布', 
      type: 'carousel', 
      status: 'scheduled',
      aiGenerated: false
    },
    { 
      id: '3', 
      date: '2025-11-08', 
      time: '09:00', 
      platform: ['LinkedIn'], 
      content: '深度解析：2025年B2B营销趋势报告', 
      type: 'post', 
      status: 'draft',
      aiGenerated: true
    },
  ]);

  const [selectedTab, setSelectedTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    monitoring: 234,
    posts: 45,
    engagements: 1289,
    leads: 156
  });

  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<AutoTask | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showContentGenerator, setShowContentGenerator] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [showAIOptimizer, setShowAIOptimizer] = useState(false);

  // Chart data
  const engagementTrendData = [
    { time: '00:00', X: 234, Instagram: 456, Facebook: 345, Reddit: 123 },
    { time: '04:00', X: 189, Instagram: 389, Facebook: 298, Reddit: 98 },
    { time: '08:00', X: 456, Instagram: 678, Facebook: 534, Reddit: 234 },
    { time: '12:00', X: 678, Instagram: 890, Facebook: 678, Reddit: 345 },
    { time: '16:00', X: 789, Instagram: 1023, Facebook: 756, Reddit: 456 },
    { time: '20:00', X: 890, Instagram: 1234, Facebook: 890, Reddit: 567 },
  ];

  const sentimentDistribution = [
    { name: '正面', value: 78, color: '#10b981' },
    { name: '中性', value: 18, color: '#6b7280' },
    { name: '负面', value: 4, color: '#ef4444' },
  ];

  const platformPerformance = [
    { platform: 'Instagram', engagement: 6.4, reach: 156700, conversions: 234 },
    { platform: 'X', engagement: 4.8, reach: 125400, conversions: 189 },
    { platform: 'Facebook', engagement: 3.2, reach: 89600, conversions: 145 },
    { platform: 'Discord', engagement: 8.9, reach: 12300, conversions: 67 },
    { platform: 'Reddit', engagement: 5.1, reach: 45200, conversions: 98 },
  ];

  const weeklyGrowth = [
    { day: '周一', followers: 1234, engagement: 456 },
    { day: '周二', followers: 1567, engagement: 589 },
    { day: '周三', followers: 1890, engagement: 678 },
    { day: '周四', followers: 2234, engagement: 890 },
    { day: '周五', followers: 2567, engagement: 1023 },
    { day: '周六', followers: 2890, engagement: 1234 },
    { day: '周日', followers: 3123, engagement: 1456 },
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        monitoring: prev.monitoring + Math.floor(Math.random() * 10),
        posts: prev.posts + (Math.random() > 0.8 ? 1 : 0),
        engagements: prev.engagements + Math.floor(Math.random() * 20),
        leads: prev.leads + (Math.random() > 0.9 ? 1 : 0)
      }));

      // Update task progress
      setAutoTasks(prev => prev.map(task => ({
        ...task,
        progress: task.status === 'active' ? Math.min(task.progress + Math.random() * 2, 100) : task.progress
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleTaskStatus = (taskId: string) => {
    setAutoTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'active' ? 'paused' : 'active' }
        : task
    ));
  };

  const getTaskIcon = (type: string) => {
    switch(type) {
      case 'monitor': return Radio;
      case 'post': return Send;
      case 'engage': return MessageCircle;
      case 'dm': return MessageSquare;
      case 'email': return Mail;
      case 'kol': return Users;
      default: return Bot;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* AI Insights Banner */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500/20">
              <Brain className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-purple-500 text-white text-xs">AI机会</Badge>
                <span className="text-xs text-gray-500">刚刚</span>
              </div>
              <p className="text-sm text-gray-700">Instagram"黑五促销"热度+234%，建议立即发布促销内容获取流量</p>
              <Button 
                size="sm" 
                className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift"
                onClick={() => setShowContentGenerator(true)}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                AI生成内容
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/20">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-amber-500 text-white text-xs">负面预警</Badge>
                <span className="text-xs text-gray-500">3小时前</span>
              </div>
              <p className="text-sm text-gray-700">检测到3条负面评论未回复，AI已生成建议回复话术</p>
              <Button size="sm" variant="outline" className="mt-2">
                <Eye className="w-3 h-3 mr-1" />
                查看详情
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/20">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-blue-500 text-white text-xs">引流成功</Badge>
                <span className="text-xs text-gray-500">今日</span>
              </div>
              <p className="text-sm text-gray-700">Reddit自动截评任务今日成功引流67个高质量潜在客户</p>
              <Button size="sm" variant="outline" className="mt-2">
                <BarChart3 className="w-3 h-3 mr-1" />
                查看数据
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '实时监测', value: realTimeData.monitoring, icon: Eye, color: 'blue', change: '+12%', desc: '品牌提及数' },
          { label: '自动发布', value: realTimeData.posts, icon: Send, color: 'purple', change: '+8%', desc: '已发布内容' },
          { label: '智能互动', value: realTimeData.engagements, icon: Heart, color: 'pink', change: '+34%', desc: '用户互动数' },
          { label: '引流转化', value: realTimeData.leads, icon: Target, color: 'green', change: '+21%', desc: '新增线索' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover-lift cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-600 flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-500/20 text-green-700">{stat.change}</Badge>
              </div>
              <div className="space-y-1 relative z-10">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl text-gray-900">{stat.value.toLocaleString()}</span>
                  <Activity className="w-4 h-4 text-green-600 animate-pulse" />
                </div>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="glass-card p-2 rounded-2xl">
          <TabsTrigger value="overview" className="rounded-xl">
            <BarChart3 className="w-4 h-4 mr-2" />
            总览仪表盘
          </TabsTrigger>
          <TabsTrigger value="automation" className="rounded-xl">
            <Zap className="w-4 h-4 mr-2" />
            自动化任务
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="rounded-xl">
            <Radio className="w-4 h-4 mr-2" />
            舆情监测
          </TabsTrigger>
          <TabsTrigger value="kol" className="rounded-xl">
            <Star className="w-4 h-4 mr-2" />
            KOL管理
          </TabsTrigger>
          <TabsTrigger value="calendar" className="rounded-xl">
            <Calendar className="w-4 h-4 mr-2" />
            内容日历
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-xl">
            <TrendingUp className="w-4 h-4 mr-2" />
            数据分析
          </TabsTrigger>
          <TabsTrigger value="optimizer" className="rounded-xl">
            <Sparkles className="w-4 h-4 mr-2" />
            AI优化
          </TabsTrigger>
        </TabsList>

        {/* Overview Dashboard */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Platform Connections */}
            <Card className="glass-card rounded-2xl p-6 col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900">平台连接状态</h3>
                  <p className="text-sm text-gray-500 mt-1">已连接 {platforms.filter(p => p.connected).length}/{platforms.length} 个主流社交平台</p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover-lift">
                  <Globe className="w-4 h-4 mr-2" />
                  添加平台
                </Button>
              </div>
              
              <div className="space-y-3">
                {platforms.map((platform, index) => (
                  <motion.div
                    key={platform.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: platform.color }}
                      >
                        <span className="text-xl">{platform.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{platform.name}</p>
                        {platform.connected && (
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-sm text-gray-500">
                              {(platform.followers / 1000).toFixed(1)}K 粉丝
                            </p>
                            <span className="text-gray-300">·</span>
                            <p className="text-sm text-gray-500">
                              {platform.engagement}% 互动率
                            </p>
                            <span className="text-gray-300">·</span>
                            <Badge className="bg-green-500/20 text-green-700 text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              +{platform.growthRate}%
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {platform.connected ? (
                        <>
                          <Badge className="bg-green-500/20 text-green-700 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            已连接
                          </Badge>
                          <Switch checked={true} />
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" className="hover-lift">
                          <Link2 className="w-4 h-4 mr-2" />
                          连接
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900">热点趋势</h3>
                  <p className="text-sm text-gray-500 mt-1">AI实时追踪</p>
                </div>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all cursor-pointer hover-lift"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Hash className="w-4 h-4 text-purple-600" />
                            <p className="text-gray-900">{topic.keyword}</p>
                          </div>
                          <p className="text-xs text-gray-500">{topic.platform} · {topic.category}</p>
                        </div>
                        <Badge className={`${
                          topic.growth > 150 ? 'bg-red-500/20 text-red-700' :
                          topic.growth > 100 ? 'bg-orange-500/20 text-orange-700' :
                          'bg-blue-500/20 text-blue-700'
                        }`}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{topic.growth}%
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">讨论量: {(topic.volume / 1000).toFixed(1)}K</span>
                          <span className="text-gray-600">情感: {(topic.sentiment * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={topic.sentiment * 100} className="h-1" />
                        
                        <div className="flex flex-wrap gap-1 pt-2">
                          {topic.relatedKeywords.map((keyword, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-white/30">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            峰值: {topic.peakTime}
                          </div>
                          <Button size="sm" variant="ghost" className="h-7 text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI分析
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="glass-card rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">今日平台表现</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={platformPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="platform" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="conversions" fill="#8b5cf6" name="转化数" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="glass-card rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">情感分析分布</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={sentimentDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Automation Tasks */}
        <TabsContent value="automation" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900">自动化营销任务</h3>
              <p className="text-sm text-gray-500 mt-1">AI驱动的智能营销自动化执行引擎</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="hover-lift">
                <Download className="w-4 h-4 mr-2" />
                导出报告
              </Button>
              <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift">
                    <Plus className="w-4 h-4 mr-2" />
                    创建新任务
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl glass-card">
                  <DialogHeader>
                    <DialogTitle>创建自动化任务</DialogTitle>
                    <DialogDescription>配置AI驱动的自动化营销任务</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-700 mb-2 block">任务类型</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择任务类型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monitor">舆情监测</SelectItem>
                            <SelectItem value="post">自动发布</SelectItem>
                            <SelectItem value="engage">智能互动</SelectItem>
                            <SelectItem value="dm">DM营销</SelectItem>
                            <SelectItem value="email">邮件营销</SelectItem>
                            <SelectItem value="kol">KOL发现</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-700 mb-2 block">目标平台</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择平台" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="x">X (Twitter)</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="discord">Discord</SelectItem>
                            <SelectItem value="reddit">Reddit</SelectItem>
                            <SelectItem value="all">全平台</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">任务名称</label>
                      <Input placeholder="例如：新品发布自动推广" />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">执行频率</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择执行频率" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5min">每5分钟</SelectItem>
                          <SelectItem value="15min">每15分钟</SelectItem>
                          <SelectItem value="30min">每30分钟</SelectItem>
                          <SelectItem value="1hour">每小时</SelectItem>
                          <SelectItem value="daily">每日</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">AI自动化程度</label>
                      <Slider defaultValue={[80]} max={100} step={1} className="my-4" />
                      <p className="text-xs text-gray-500">80% - AI将自动执行大部分任务，仅重要决策需要人工确认</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-900">启用AI优化</p>
                          <p className="text-xs text-gray-500">自动优化任务参数提升效果</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" className="flex-1" onClick={() => setShowTaskDialog(false)}>
                        取消
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        创建任务
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {autoTasks.map((task, index) => {
              const Icon = getTaskIcon(task.type);
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-6 hover-lift relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        task.status === 'active' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                        task.status === 'paused' ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                        'bg-gradient-to-br from-gray-400 to-gray-600'
                      } shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{task.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{task.platform}</Badge>
                          <Badge className={`text-xs ${
                            task.status === 'active' ? 'bg-green-500/20 text-green-700' :
                            task.status === 'paused' ? 'bg-amber-500/20 text-amber-700' :
                            'bg-gray-500/20 text-gray-700'
                          }`}>
                            {task.status === 'active' ? '运行中' : task.status === 'paused' ? '已暂停' : '已完成'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">任务进度</span>
                        <span className="text-xs text-gray-900">{task.progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/50 rounded-xl">
                        <p className="text-xs text-gray-500">上次运行</p>
                        <p className="text-sm text-gray-900 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.lastRun}
                        </p>
                      </div>
                      <div className="p-3 bg-white/50 rounded-xl">
                        <p className="text-xs text-gray-500">下次运行</p>
                        <p className="text-sm text-gray-900 mt-1 flex items-center gap-1">
                          <RefreshCw className="w-3 h-3" />
                          {task.nextRun}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/30">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">触达</p>
                        <p className="text-gray-900 mt-1">{(task.metrics.reached / 1000).toFixed(1)}K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">互动</p>
                        <p className="text-gray-900 mt-1">{task.metrics.engaged}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">转化</p>
                        <p className="text-gray-900 mt-1">{task.metrics.converted}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <Button
                        size="sm"
                        variant={task.status === 'active' ? 'outline' : 'default'}
                        onClick={() => toggleTaskStatus(task.id)}
                        className="hover-lift"
                      >
                        {task.status === 'active' ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                        {task.status === 'active' ? '暂停' : '启动'}
                      </Button>
                      <Button size="sm" variant="outline" className="hover-lift">
                        <Settings className="w-3 h-3 mr-1" />
                        配置
                      </Button>
                      <Button size="sm" variant="outline" className="hover-lift">
                        <Eye className="w-3 h-3 mr-1" />
                        详情
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Task Performance Chart */}
          <Card className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900">自动化任务执行趋势</h3>
                <p className="text-sm text-gray-500 mt-1">过去7天的任务执行效果</p>
              </div>
              <Select defaultValue="7days">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">近7天</SelectItem>
                  <SelectItem value="30days">近30天</SelectItem>
                  <SelectItem value="90days">近90天</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyGrowth}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="followers" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorFollowers)" name="新增粉丝" />
                <Area type="monotone" dataKey="engagement" stroke="#ec4899" fillOpacity={1} fill="url(#colorEngagement)" name="互动量" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Monitoring Dashboard */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Real-time Mentions */}
            <Card className="glass-card rounded-2xl p-6 col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900">实时品牌提及</h3>
                  <p className="text-sm text-gray-500 mt-1">AI驱动的多平台舆情聚合监测</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="hover-lift">
                    <Filter className="w-4 h-4 mr-2" />
                    筛选
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover-lift">
                    <Plus className="w-4 h-4 mr-2" />
                    新建监测
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {mentions.map((mention, index) => (
                    <motion.div
                      key={mention.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl transition-all cursor-pointer hover-lift ${
                        mention.responded ? 'bg-white/30' : 'bg-white/50 hover:bg-white/70'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{mention.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {mention.platform}
                            </Badge>
                            <span className="text-sm text-gray-900">{mention.user}</span>
                            <span className="text-xs text-gray-400">· {mention.time}</span>
                            <div className="ml-auto flex items-center gap-1">
                              <span className="text-2xl">
                                {getSentimentIcon(mention.sentiment)}
                              </span>
                              <Badge className={`text-xs ${
                                mention.sentiment === 'positive' ? 'bg-green-500/20 text-green-700' :
                                mention.sentiment === 'negative' ? 'bg-red-500/20 text-red-700' :
                                'bg-gray-500/20 text-gray-700'
                              }`}>
                                {mention.sentiment === 'positive' ? '正面' : mention.sentiment === 'negative' ? '负面' : '中性'}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{mention.content}</p>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {mention.likes}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {mention.replies}
                              </div>
                            </div>
                            
                            {mention.responded ? (
                              <Badge className="bg-green-500/20 text-green-700 text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                已回复
                              </Badge>
                            ) : (
                              <div className="flex items-center gap-2 ml-auto">
                                <Button size="sm" variant="outline" className="h-7 text-xs hover-lift">
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  回复
                                </Button>
                                <Button size="sm" className="h-7 text-xs bg-purple-500 text-white hover-lift">
                                  <Bot className="w-3 h-3 mr-1" />
                                  AI建议
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Sentiment & Auto Response */}
            <div className="space-y-6">
              <Card className="glass-card rounded-2xl p-6">
                <h3 className="text-gray-900 mb-4">情感分析</h3>
                
                <div className="space-y-4">
                  {[
                    { label: '正面', value: 78, color: 'green', icon: ThumbsUp, count: 234 },
                    { label: '中性', value: 18, color: 'gray', icon: Minus, count: 56 },
                    { label: '负面', value: 4, color: 'red', icon: ThumbsDown, count: 12 },
                  ].map((sentiment, index) => {
                    const Icon = sentiment.icon;
                    return (
                      <div key={index} className="p-4 bg-white/50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 text-${sentiment.color}-600`} />
                            <span className="text-sm text-gray-700">{sentiment.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`bg-${sentiment.color}-500/20 text-${sentiment.color}-700`}>
                              {sentiment.value}%
                            </Badge>
                            <span className="text-xs text-gray-500">{sentiment.count}条</span>
                          </div>
                        </div>
                        <Progress value={sentiment.value} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="glass-card rounded-2xl p-6">
                <h3 className="text-gray-900 mb-4">AI自动回复设置</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-700">智能自动回复</p>
                        <p className="text-xs text-gray-500 mt-1">AI自动回复客户咨询</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="p-4 bg-white/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-700">负面舆情预警</p>
                        <p className="text-xs text-gray-500 mt-1">实时通知负面评论</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="p-4 bg-white/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-700">自动截评引流</p>
                        <p className="text-xs text-gray-500 mt-1">热帖智能留言</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/30">
                    <h4 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      AI推荐回复
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                        <p className="text-xs text-gray-700 mb-2">
                          "感谢您的关注！我们提供7天免费试用，欢迎体验完整功能 ✨"
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-purple-500 text-white text-xs h-7">
                            <Send className="w-3 h-3 mr-1" />
                            使用
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
                            <Edit className="w-3 h-3 mr-1" />
                            编辑
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full hover-lift">
                    <Settings className="w-4 h-4 mr-2" />
                    高级配置
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* KOL Management */}
        <TabsContent value="kol" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900">KOL智能发现与管理</h3>
              <p className="text-sm text-gray-500 mt-1">AI驱动的影响力者推荐引擎 · 智能评分系统</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部平台</SelectItem>
                  <SelectItem value="x">X</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="搜索领域或关键词..." className="w-64" />
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift">
                <Search className="w-4 h-4 mr-2" />
                AI发现
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {kols.map((kol, index) => (
              <motion.div
                key={kol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover-lift cursor-pointer relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="text-center mb-4 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center text-4xl mx-auto mb-3 shadow-lg transform group-hover:scale-110 transition-transform">
                    {kol.avatar}
                  </div>
                  <p className="text-gray-900">{kol.name}</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{kol.platform}</Badge>
                    <Badge variant="outline" className="text-xs">{kol.niche}</Badge>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {kol.location}
                  </div>
                </div>

                <div className="space-y-2 relative z-10">
                  <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                    <span className="text-xs text-gray-600">粉丝数</span>
                    <span className="text-sm text-gray-900">{(kol.followers / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                    <span className="text-xs text-gray-600">互动率</span>
                    <Badge className="bg-green-500/20 text-green-700 text-xs">
                      {kol.engagement}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                    <span className="text-xs text-gray-600">AI评分</span>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-purple-600" />
                      <Badge className="bg-purple-500/20 text-purple-700 text-xs">{kol.score}/100</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                    <span className="text-xs text-gray-600">预估成本</span>
                    <span className="text-sm text-gray-900">{kol.estimatedCost}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 relative z-10">
                  <Button size="sm" variant="outline" className="hover-lift">
                    <Eye className="w-3 h-3 mr-1" />
                    详情
                  </Button>
                  <Button size="sm" className="bg-purple-500 text-white hover-lift">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    联系
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Auto DM Campaign */}
          <Card className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900">自动化DM营销活动</h3>
                <p className="text-sm text-gray-500 mt-1">AI生成个性化私信，批量触达目标KOL</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-700">
                  <Activity className="w-3 h-3 mr-1" />
                  运行中
                </Badge>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  配置
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">目标筛选条件</label>
                  <div className="space-y-2">
                    <Input placeholder="领域/标签（如：科技博主）" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="最小粉丝数" type="number" />
                      <Input placeholder="最小互动率%" type="number" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">AI消息模板</label>
                  <Textarea 
                    placeholder="AI将根据KOL特征自动生成个性化内容...&#10;&#10;支持变量：{name}、{niche}、{platform}"
                    className="h-32"
                    defaultValue="Hi {name}，我注意到你在{niche}领域的影响力很大。我们有一个产品非常适合你的粉丝群体，想探讨合作可能性..."
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-900">AI个性化优化</p>
                      <p className="text-xs text-gray-500">根据KOL特征自动调整话术</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift">
                  <Sparkles className="w-4 h-4 mr-2" />
                  启动AI批量DM
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/50 rounded-xl">
                  <h4 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                    活动统计数据
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: '已发送DM', value: 234, icon: Send, color: 'blue' },
                      { label: '已读率', value: '67%', icon: Eye, color: 'green' },
                      { label: '回复率', value: '23%', icon: MessageCircle, color: 'purple' },
                      { label: '合作意向', value: 12, icon: CheckCircle2, color: 'pink' },
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                            <span className="text-sm text-gray-600">{stat.label}</span>
                          </div>
                          <span className="text-gray-900">{stat.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-start gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-purple-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-900">AI优化建议</p>
                      <p className="text-xs text-gray-600 mt-1">
                        • 发送时间调整至晚上8-10点可提升30%回复率<br/>
                        • 建议在开头加入具体案例提升可信度<br/>
                        • 检测到"免费合作"关键词回复率更高
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    应用AI建议
                  </Button>
                </div>

                <Card className="p-4 bg-white/50">
                  <h4 className="text-sm text-gray-900 mb-3">执行时间设置</h4>
                  <Select defaultValue="smart">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smart">AI智能时间（推荐）</SelectItem>
                      <SelectItem value="immediate">立即执行</SelectItem>
                      <SelectItem value="schedule">自定义时间</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    AI将分析最佳发送时间并自动执行
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Content Calendar */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900">智能内容日历</h3>
              <p className="text-sm text-gray-500 mt-1">AI辅助的多平台内容规划与发布管理</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="week">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">日视图</SelectItem>
                  <SelectItem value="week">周视图</SelectItem>
                  <SelectItem value="month">月视图</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="hover-lift">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift">
                <Plus className="w-4 h-4 mr-2" />
                新建内容
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => (
              <div key={index} className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">{day}</p>
                    <p className="text-xs text-gray-400">11/{index + 4}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {contentCalendar
                    .filter((_, i) => i % 7 === index)
                    .map((item) => (
                      <div key={item.id} className="p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all cursor-pointer group">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{item.time}</span>
                          {item.aiGenerated && (
                            <Badge className="bg-purple-500/20 text-purple-700 text-xs ml-auto">
                              <Sparkles className="w-2 h-2 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-700 line-clamp-2 mb-2">{item.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.platform.map((p, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {p}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* AI Content Generator */}
          <Card className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900">AI内容生成器</h3>
                <p className="text-sm text-gray-500 mt-1">一键生成多平台适配的营销内容</p>
              </div>
              <Badge className="bg-purple-500 text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                AI驱动
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">内容主题</label>
                  <Input placeholder="例如：新品发布、促销活动、行业洞察" />
                </div>
                
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">目标平台</label>
                  <div className="flex flex-wrap gap-2">
                    {['X', 'Instagram', 'Facebook', 'LinkedIn', 'Reddit'].map((platform) => (
                      <Badge key={platform} variant="outline" className="cursor-pointer hover:bg-purple-50">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">内容类型</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">图文帖子</SelectItem>
                      <SelectItem value="video">视频脚本</SelectItem>
                      <SelectItem value="carousel">轮播图</SelectItem>
                      <SelectItem value="story">快拍故事</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">风格调性</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择风格" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">专业严谨</SelectItem>
                      <SelectItem value="casual">轻松活泼</SelectItem>
                      <SelectItem value="creative">创意趣味</SelectItem>
                      <SelectItem value="urgent">紧迫刺激</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI生成内容
                </Button>
              </div>

              <div className="p-6 bg-white/50 rounded-xl">
                <h4 className="text-sm text-gray-900 mb-4">AI生成预览</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-purple-500 text-white text-xs">X版本</Badge>
                      <Badge variant="outline" className="text-xs">280字符</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      🚀 重磅发布！GrowthEncore AI 3.0正式上线<br/><br/>
                      ✨ 全新AI引擎，营销效率提升80%<br/>
                      📊 实时数据分析，ROI可视化<br/>
                      🎯 智能用户画像，精准触达<br/><br/>
                      限时优惠，立即体验👉 link.to/demo<br/><br/>
                      #AI营销 #营销自动化 #增长黑客
                    </p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-purple-500 text-white">
                        <Send className="w-3 h-3 mr-1" />
                        发布
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3 mr-1" />
                        编辑
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        重新生成
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl text-xs text-gray-600">
                    <Brain className="w-4 h-4 text-blue-600" />
                    <span>AI建议：添加视觉元素可提升45%互动率</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900">社交媒体数据分析</h3>
              <p className="text-sm text-gray-500 mt-1">全渠道营销效果深度分析与AI洞察</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="7days">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">近7天</SelectItem>
                  <SelectItem value="30days">近30天</SelectItem>
                  <SelectItem value="90days">近90天</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="hover-lift">
                <Download className="w-4 h-4 mr-2" />
                导出报告
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: '总触达', value: '2.4M', change: '+23%', icon: Eye, color: 'blue' },
              { label: '总互动', value: '156K', change: '+34%', icon: Heart, color: 'pink' },
              { label: '新增粉丝', value: '12.3K', change: '+18%', icon: UserPlus, color: 'purple' },
              { label: '转化ROI', value: '4.8x', change: '+15%', icon: DollarSign, color: 'green' },
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 hover-lift cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${metric.color}-400 to-${metric.color}-600 flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-700">{metric.change}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-3xl text-gray-900 mt-1">{metric.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Engagement Trend */}
          <Card className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900">多平台互动趋势</h3>
                <p className="text-sm text-gray-500 mt-1">实时监测各平台用户互动数据</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">实时更新</Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={engagementTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="X" stroke="#000000" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Instagram" stroke="#E4405F" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Facebook" stroke="#1877F2" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Reddit" stroke="#FF4500" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Platform Performance Comparison */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="glass-card rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">平台转化对比</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="platform" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="conversions" fill="#8b5cf6" name="转化数" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="glass-card rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">增长趋势分析</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyGrowth}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }} 
                  />
                  <Area type="monotone" dataKey="followers" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorGrowth)" name="新增粉丝" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* AI Optimizer */}
        <TabsContent value="optimizer" className="space-y-6">
          <AIOptimizerPanel />
        </TabsContent>
      </Tabs>

      {/* Floating AI Assistant Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          size="lg"
          onClick={() => setShowAIAssistant(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl hover-lift relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
          <Bot className="w-8 h-8 relative z-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </Button>
      </motion.div>

      {/* AI Assistant Component */}
      <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />

      {/* AI Content Generator Dialog */}
      <AnimatePresence>
        {showContentGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowContentGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl"
            >
              <AIContentGenerator onClose={() => setShowContentGenerator(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
