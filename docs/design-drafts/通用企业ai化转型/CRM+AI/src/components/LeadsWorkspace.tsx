import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown,
  Building2, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  FileText,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Clock,
  DollarSign,
  Target,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  Share2,
  PlayCircle,
  Send,
  Plus,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  MessageSquare
} from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Progress } from './ui/progress';
import { toast } from 'sonner';

export default function LeadsWorkspace() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('score');
  const [filterStage, setFilterStage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const leads = [
    {
      id: '1',
      company: 'ABC科技有限公司',
      contact: '王总',
      title: '技术总监',
      velocityScore: 92,
      scoreChange: 17,
      scoreTrend: 'up',
      scoreReasons: [
        { factor: '职位为总监级', points: 20, category: 'fit' },
        { factor: '公司属于目标行业', points: 15, category: 'fit' },
        { factor: '近期下载了白皮书', points: 30, category: 'engagement' },
        { factor: '访问了定价页', points: 30, category: 'intent' },
        { factor: '已有竞争对手', points: -10, category: 'risk' },
        { factor: '预算已确认', points: 15, category: 'budget' },
      ],
      stage: '需求确认',
      value: 580000,
      probability: 65,
      lastActivity: '2小时前',
      lastActivityType: 'web',
      email: 'wang@abc-tech.com',
      phone: '138-0000-1234',
      company_size: '200-500人',
      industry: '软件开发',
      source: '官网咨询',
      created: '15天前',
      activities: [
        { type: 'web', action: '访问了产品定价页面', time: '2小时前', duration: '5分钟', sentiment: 'positive' },
        { type: 'email', action: '打开了产品介绍邮件', time: '1天前', opens: 3, sentiment: 'positive' },
        { type: 'download', action: '下载了技术白皮书', time: '3天前', document: '技术架构白皮书.pdf', sentiment: 'positive' },
        { type: 'call', action: '电话沟通需求', time: '5天前', duration: '25分钟', sentiment: 'positive' },
      ],
      nextSteps: [
        { task: '发送定制方案PPT', priority: 'high', dueDate: '今天' },
        { task: '安排产品演示', priority: 'medium', dueDate: '明天' },
      ]
    },
    {
      id: '2',
      company: '智慧制造集团',
      contact: '李经理',
      title: '采购经理',
      velocityScore: 88,
      scoreChange: 12,
      scoreTrend: 'up',
      scoreReasons: [
        { factor: '公司规模大', points: 25, category: 'fit' },
        { factor: '预算充足', points: 20, category: 'budget' },
        { factor: '下载了产品白皮书', points: 30, category: 'engagement' },
        { factor: '多次访问网站', points: 15, category: 'engagement' },
        { factor: '决策周期较长', points: -5, category: 'risk' },
      ],
      stage: '方案演示',
      value: 720000,
      probability: 72,
      lastActivity: '5小时前',
      lastActivityType: 'email',
      email: 'li@smartmfg.com',
      phone: '139-0000-5678',
      company_size: '500-1000人',
      industry: '智能制造',
      source: '行业展会',
      created: '22天前',
      activities: [
        { type: 'email', action: '回复了演示邀请邮件', time: '5小时前', sentiment: 'positive' },
        { type: 'call', action: '电话沟通需求', time: '2天前', duration: '18分钟', sentiment: 'neutral' },
        { type: 'download', action: '下载了产品白皮书', time: '5天前', document: '产品手册.pdf', sentiment: 'positive' },
      ],
      nextSteps: [
        { task: '准备演示材料', priority: 'high', dueDate: '今天' },
        { task: '发送会议日程', priority: 'high', dueDate: '今天' },
      ]
    },
    {
      id: '3',
      company: '云端服务有限公司',
      contact: '张总',
      title: 'CEO',
      velocityScore: 85,
      scoreChange: 5,
      scoreTrend: 'up',
      scoreReasons: [
        { factor: '决策人为CEO', points: 35, category: 'fit' },
        { factor: '公司快速增长中', points: 20, category: 'fit' },
        { factor: '打开邮件多次', points: 15, category: 'engagement' },
        { factor: '响应速度快', points: 18, category: 'engagement' },
        { factor: '行业竞争激烈', points: -10, category: 'risk' },
      ],
      stage: '线索',
      value: 450000,
      probability: 45,
      lastActivity: '1天前',
      lastActivityType: 'email',
      email: 'zhang@cloudservice.com',
      phone: '137-0000-9012',
      company_size: '100-200人',
      industry: '云计算',
      source: '合作伙伴推荐',
      created: '8天前',
      activities: [
        { type: 'email', action: '打开了报价邮件（第3次）', time: '1天前', opens: 3, sentiment: 'positive' },
        { type: 'web', action: '访问了案例页面', time: '2天前', duration: '8分钟', sentiment: 'positive' },
        { type: 'email', action: '打开了产品介绍邮件', time: '4天前', opens: 2, sentiment: 'neutral' },
      ],
      nextSteps: [
        { task: '电话确认需求', priority: 'high', dueDate: '今天' },
      ]
    },
    {
      id: '4',
      company: '创新软件公司',
      contact: '刘总监',
      title: '销售总监',
      velocityScore: 78,
      scoreChange: -3,
      scoreTrend: 'down',
      scoreReasons: [
        { factor: '职位匹配度高', points: 20, category: 'fit' },
        { factor: '有明确预算', points: 25, category: 'budget' },
        { factor: '近期活动减少', points: -15, category: 'risk' },
        { factor: '响应速度变慢', points: -10, category: 'risk' },
      ],
      stage: '商务谈判',
      value: 620000,
      probability: 58,
      lastActivity: '3天前',
      lastActivityType: 'document',
      email: 'liu@innovsoft.com',
      phone: '136-0000-3456',
      company_size: '200-500人',
      industry: '软件开发',
      source: '官网咨询',
      created: '45天前',
      activities: [
        { type: 'document', action: '查看了合同模板', time: '3天前', sentiment: 'neutral' },
        { type: 'call', action: '电话讨论价格', time: '1周前', duration: '32分钟', sentiment: 'negative' },
        { type: 'meeting', action: '产品演示会议', time: '2周前', participants: 4, sentiment: 'positive' },
      ],
      nextSteps: [
        { task: '发送调整后报价', priority: 'high', dueDate: '今天' },
        { task: '安排跟进电话', priority: 'high', dueDate: '明天' },
      ]
    },
    {
      id: '5',
      company: '数据分析科技',
      contact: '赵经理',
      title: 'IT经理',
      velocityScore: 72,
      scoreChange: 8,
      scoreTrend: 'up',
      scoreReasons: [
        { factor: '技术背景强', points: 18, category: 'fit' },
        { factor: '预算待确认', points: 10, category: 'budget' },
        { factor: '积极互动', points: 20, category: 'engagement' },
        { factor: '技术需求明确', points: 22, category: 'fit' },
        { factor: '需要多人决策', points: -8, category: 'risk' },
      ],
      stage: '需求确认',
      value: 380000,
      probability: 52,
      lastActivity: '12小时前',
      lastActivityType: 'call',
      email: 'zhao@datatech.com',
      phone: '135-0000-7890',
      company_size: '50-100人',
      industry: '数据分析',
      source: '广告投放',
      created: '12天前',
      activities: [
        { type: 'call', action: '电话沟通技术需求', time: '12小时前', duration: '22分钟', sentiment: 'positive' },
        { type: 'web', action: '访问了产品文档', time: '1天前', duration: '12分钟', sentiment: 'positive' },
        { type: 'email', action: '询问技术问题', time: '3天前', sentiment: 'neutral' },
      ],
      nextSteps: [
        { task: '发送技术方案', priority: 'medium', dueDate: '明天' },
      ]
    },
    {
      id: '6',
      company: '金融科技创新',
      contact: '周总',
      title: 'CTO',
      velocityScore: 95,
      scoreChange: 22,
      scoreTrend: 'up',
      scoreReasons: [
        { factor: 'C级高管', points: 40, category: 'fit' },
        { factor: '大额预算', points: 30, category: 'budget' },
        { factor: '高频互动', points: 25, category: 'engagement' },
        { factor: '明确购买意向', points: 35, category: 'intent' },
        { factor: '时间紧迫', points: -10, category: 'risk' },
      ],
      stage: '方案演示',
      value: 1200000,
      probability: 82,
      lastActivity: '30分钟前',
      lastActivityType: 'call',
      email: 'zhou@fintech.com',
      phone: '138-1111-2222',
      company_size: '1000+人',
      industry: '金融科技',
      source: '高管介绍',
      created: '5天前',
      activities: [
        { type: 'call', action: '紧急电话沟通', time: '30分钟前', duration: '45分钟', sentiment: 'positive' },
        { type: 'meeting', action: '高层会议', time: '2天前', participants: 6, sentiment: 'positive' },
        { type: 'email', action: '发送需求文档', time: '3天前', sentiment: 'positive' },
      ],
      nextSteps: [
        { task: '准备定制演示', priority: 'high', dueDate: '今天' },
        { task: '安排高层会议', priority: 'high', dueDate: '今天' },
      ]
    },
  ];

  // 根据筛选和排序处理线索
  const filteredLeads = leads
    .filter(lead => {
      if (filterStage !== 'all' && lead.stage !== filterStage) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          lead.company.toLowerCase().includes(query) ||
          lead.contact.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.velocityScore - a.velocityScore;
        case 'value':
          return b.value - a.value;
        case 'activity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        case 'stage':
          return a.stage.localeCompare(b.stage);
        default:
          return 0;
      }
    });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 85) return 'from-green-400 to-green-500';
    if (score >= 75) return 'from-yellow-400 to-yellow-500';
    if (score >= 65) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700 border-green-300';
    if (score >= 85) return 'bg-green-50 text-green-600 border-green-200';
    if (score >= 75) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    if (score >= 65) return 'bg-orange-100 text-orange-700 border-orange-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'web':
        return <ExternalLink className="w-4 h-4" />;
      case 'download':
        return <FileText className="w-4 h-4" />;
      case 'meeting':
        return <Calendar className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <CheckCircle2 className="w-3 h-3 text-green-600" />;
      case 'negative':
        return <XCircle className="w-3 h-3 text-red-600" />;
      default:
        return <Activity className="w-3 h-3 text-neutral-500" />;
    }
  };

  const toggleLeadSelection = (leadId: string) => {
    const newSelection = new Set(selectedLeads);
    if (newSelection.has(leadId)) {
      newSelection.delete(leadId);
    } else {
      newSelection.add(leadId);
    }
    setSelectedLeads(newSelection);
  };

  const handleBulkAction = (action: string) => {
    toast.success(`批量操作: ${action}`, {
      description: `已选择 ${selectedLeads.size} 个线索`,
    });
  };

  const handleQuickAction = (action: string, company: string) => {
    toast.success(action, {
      description: company,
    });
  };

  const stages = ['线索', '需求确认', '方案演示', '商务谈判', '合同签署'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-900 mb-1">智能线索与机会工作台</h2>
          <p className="text-xs text-neutral-500">AI驱动的线索评分与优先级管理 · 共 {filteredLeads.length} 个线索</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('导入线索', '从Excel导入')}
          >
            <Download className="w-3 h-3 mr-1" />
            导入
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('导出数据', '导出选中线索')}
          >
            <Share2 className="w-3 h-3 mr-1" />
            导出
          </Button>
          <Button 
            size="sm" 
            className="bg-blue-600"
            onClick={() => handleQuickAction('添加新线索', '')}
          >
            <Plus className="w-3 h-3 mr-1" />
            新增线索
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-3">
            <p className="text-xs text-neutral-500 mb-1">总线索数</p>
            <p className="text-xl text-neutral-900">{leads.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-3">
            <p className="text-xs text-neutral-500 mb-1">高分线索</p>
            <p className="text-xl text-green-600">{leads.filter(l => l.velocityScore >= 85).length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-3">
            <p className="text-xs text-neutral-500 mb-1">总价值</p>
            <p className="text-xl text-purple-600">¥{(leads.reduce((sum, l) => sum + l.value, 0) / 10000).toFixed(0)}万</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-3">
            <p className="text-xs text-neutral-500 mb-1">平均分数</p>
            <p className="text-xl text-orange-600">{(leads.reduce((sum, l) => sum + l.velocityScore, 0) / leads.length).toFixed(0)}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-pink-500">
          <CardContent className="p-3">
            <p className="text-xs text-neutral-500 mb-1">今日活跃</p>
            <p className="text-xl text-pink-600">{leads.filter(l => l.lastActivity.includes('小时前') || l.lastActivity.includes('分钟前')).length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-3">
            <p className="text-xs text-neutral-500 mb-1">待跟进</p>
            <p className="text-xl text-indigo-600">{leads.filter(l => l.lastActivity.includes('天前')).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input 
                placeholder="搜索公司、联系人、邮箱..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Stage Filter */}
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部阶段</SelectItem>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">按分数排序</SelectItem>
                <SelectItem value="value">按金额排序</SelectItem>
                <SelectItem value="activity">按活跃度排序</SelectItem>
                <SelectItem value="stage">按阶段排序</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'kanban')}>
              <TabsList className="h-9">
                <TabsTrigger value="list" className="text-xs">列表</TabsTrigger>
                <TabsTrigger value="kanban" className="text-xs">看板</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Bulk Actions */}
            {selectedLeads.size > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                <Badge className="bg-blue-100 text-blue-700 border-0">
                  已选 {selectedLeads.size} 个
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('批量分配')}
                >
                  分配
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('批量标签')}
                >
                  标签
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('批量导出')}
                >
                  导出
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="grid grid-cols-1 gap-3">
        {filteredLeads.map((lead) => (
          <Card 
            key={lead.id} 
            className={`hover:shadow-lg transition-all ${
              selectedLeads.has(lead.id) ? 'border-2 border-blue-500 bg-blue-50/30' : 'border shadow-sm'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <Checkbox
                  checked={selectedLeads.has(lead.id)}
                  onCheckedChange={() => toggleLeadSelection(lead.id)}
                  className="mt-1"
                />

                {/* Velocity Score with Hover */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex-shrink-0 cursor-help">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getScoreColor(lead.velocityScore)} text-white flex flex-col items-center justify-center shadow-lg`}>
                        <span className="text-xs opacity-80">Score</span>
                        <span className="text-2xl">{lead.velocityScore}</span>
                      </div>
                      {lead.scoreChange !== 0 && (
                        <div className={`flex items-center justify-center gap-1 mt-1 text-xs ${
                          lead.scoreChange > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {lead.scoreTrend === 'up' ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(lead.scoreChange)}
                        </div>
                      )}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80" align="start">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <h4 className="text-neutral-900">AI评分详情</h4>
                      </div>
                      <div className="space-y-2">
                        {lead.scoreReasons.map((reason, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {reason.category}
                              </Badge>
                              <span className="text-neutral-600">{reason.factor}</span>
                            </div>
                            <span className={`${reason.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {reason.points > 0 ? '+' : ''}{reason.points}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-neutral-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-900">总分</span>
                          <span className="text-lg text-neutral-900">{lead.velocityScore}</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Lead Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-neutral-400" />
                        <h3 className="text-neutral-900">{lead.company}</h3>
                        <Badge variant="outline" className={getScoreBadgeColor(lead.velocityScore)}>
                          {lead.stage}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                          {lead.source}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-neutral-600">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {lead.contact} · {lead.title}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {lead.company_size} · {lead.industry}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ¥{(lead.value / 10000).toFixed(1)}万
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {lead.probability}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 h-8"
                        onClick={() => handleQuickAction('立即跟进', lead.company)}
                      >
                        立即跟进
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleQuickAction('编辑线索', lead.company)}>
                            <Edit className="w-3 h-3 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuickAction('查看详情', lead.company)}>
                            <Eye className="w-3 h-3 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuickAction('分配线索', lead.company)}>
                            <User className="w-3 h-3 mr-2" />
                            分配
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuickAction('删除线索', lead.company)} className="text-red-600">
                            <Trash2 className="w-3 h-3 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center gap-4 mb-2 text-xs">
                    <a 
                      href={`mailto:${lead.email}`} 
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickAction('发送邮件', lead.email);
                      }}
                    >
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </a>
                    <a 
                      href={`tel:${lead.phone}`} 
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickAction('拨打电话', lead.phone);
                      }}
                    >
                      <Phone className="w-3 h-3" />
                      {lead.phone}
                    </a>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <Clock className="w-3 h-3" />
                      最近活动: {lead.lastActivity}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      创建于 {lead.created}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-neutral-500">成交概率</span>
                        <span className="text-neutral-900">{lead.probability}%</span>
                      </div>
                      <Progress value={lead.probability} className="h-1.5" />
                    </div>
                  </div>

                  {/* Quick Actions Row */}
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                    >
                      {expandedLead === lead.id ? (
                        <>
                          <ChevronDown className="w-3 h-3 mr-1" />
                          收起详情
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-3 h-3 mr-1" />
                          查看详情
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleQuickAction('发送邮件', lead.company)}
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      发送邮件
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleQuickAction('拨打电话', lead.company)}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      拨打电话
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleQuickAction('安排会议', lead.company)}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      安排会议
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleQuickAction('AI建议', lead.company)}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI建议
                    </Button>
                  </div>

                  {/* Expanded Content */}
                  {expandedLead === lead.id && (
                    <div className="mt-4 pt-4 border-t border-neutral-200 animate-slide-up">
                      <Tabs defaultValue="activities">
                        <TabsList className="h-8 mb-3">
                          <TabsTrigger value="activities" className="text-xs">活动时间线</TabsTrigger>
                          <TabsTrigger value="nextsteps" className="text-xs">下一步行动</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="activities" className="mt-0">
                          <div className="space-y-2">
                            {lead.activities.map((activity, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-blue-50 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                  {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm text-neutral-900">{activity.action}</p>
                                    {getSentimentIcon(activity.sentiment)}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                                    <span>{activity.time}</span>
                                    {activity.duration && (
                                      <>
                                        <span>·</span>
                                        <span>时长: {activity.duration}</span>
                                      </>
                                    )}
                                    {activity.opens && (
                                      <>
                                        <span>·</span>
                                        <span>打开{activity.opens}次</span>
                                      </>
                                    )}
                                    {activity.participants && (
                                      <>
                                        <span>·</span>
                                        <span>{activity.participants}人参与</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="nextsteps" className="mt-0">
                          <div className="space-y-2">
                            {lead.nextSteps.map((step, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <Checkbox />
                                <div className="flex-1">
                                  <p className="text-sm text-neutral-900">{step.task}</p>
                                  <p className="text-xs text-neutral-500">截止: {step.dueDate}</p>
                                </div>
                                <Badge className={
                                  step.priority === 'high' ? 'bg-red-100 text-red-700' :
                                  step.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-blue-100 text-blue-700'
                                }>
                                  {step.priority === 'high' ? '高' : step.priority === 'medium' ? '中' : '低'}
                                </Badge>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleQuickAction('添加任务', lead.company)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              添加新任务
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Auto-capture Notice */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/30 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-900 text-base">
            <Zap className="w-5 h-5" />
            自动化活动捕获
            <Badge className="bg-blue-100 text-blue-700 border-0">
              节省1小时/天
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-900 mb-1">邮件自动记录</p>
                <p className="text-xs text-neutral-600">所有往来邮件自动关联到客户时间线，包含打开次数和停留时长</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-900 mb-1">通话自动转录</p>
                <p className="text-xs text-neutral-600">VoIP通话自动录音、转录并AI提炼关键信息和情绪分析</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-900 mb-1">会议自动同步</p>
                <p className="text-xs text-neutral-600">日历会议自动记录参与人、时长和会议纪要</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
