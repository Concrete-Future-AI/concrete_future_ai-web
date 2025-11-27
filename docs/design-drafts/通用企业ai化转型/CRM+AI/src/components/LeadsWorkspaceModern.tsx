import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  Mail, 
  Phone,
  Sparkles,
  Eye,
  MoreHorizontal,
  Plus,
  Activity,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Clock,
  DollarSign,
  Building2,
  User,
  Zap,
  Brain,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import ViewSwitcher from './ViewSwitcher';
import AIInsightCard from './AIInsightCard';
import CollaborationPanel from './CollaborationPanel';
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

export default function LeadsWorkspaceModern() {
  const [view, setView] = useState<'list' | 'kanban' | 'calendar' | 'table'>('list');
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIInsights, setShowAIInsights] = useState(true);

  const leads = [
    {
      id: '1',
      company: 'ABC科技有限公司',
      contact: '王总',
      title: '技术总监',
      velocityScore: 92,
      scoreChange: 17,
      scoreTrend: 'up' as const,
      stage: '需求确认',
      value: 580000,
      probability: 65,
      lastActivity: '2小时前',
      email: 'wang@abc-tech.com',
      phone: '138-0000-1234',
      avatarColor: 'from-blue-500 to-blue-600',
      nextAction: '发送定制方案PPT',
      aiRecommendation: '客户高度参与，建议在48小时内发送方案'
    },
    {
      id: '2',
      company: '智慧制造集团',
      contact: '李经理',
      title: '采购经理',
      velocityScore: 88,
      scoreChange: 12,
      scoreTrend: 'up' as const,
      stage: '方案演示',
      value: 720000,
      probability: 72,
      lastActivity: '5小时前',
      email: 'li@smartmfg.com',
      phone: '139-0000-5678',
      avatarColor: 'from-teal-500 to-teal-600',
      nextAction: '准备演示材料',
      aiRecommendation: '客户已多次访问定价页，建议主动提供报价'
    },
    {
      id: '3',
      company: '金融科技创新',
      contact: '周总',
      title: 'CTO',
      velocityScore: 95,
      scoreChange: 22,
      scoreTrend: 'up' as const,
      stage: '方案演示',
      value: 1200000,
      probability: 82,
      lastActivity: '30分钟前',
      email: 'zhou@fintech.com',
      phone: '138-1111-2222',
      avatarColor: 'from-purple-500 to-purple-600',
      nextAction: '准备定制演示',
      aiRecommendation: 'VIP客户，建议安排高层对接会议'
    },
    {
      id: '4',
      company: '云端服务有限公司',
      contact: '张总',
      title: 'CEO',
      velocityScore: 85,
      scoreChange: 5,
      scoreTrend: 'up' as const,
      stage: '线索',
      value: 450000,
      probability: 45,
      lastActivity: '1天前',
      email: 'zhang@cloudservice.com',
      phone: '137-0000-9012',
      avatarColor: 'from-orange-500 to-orange-600',
      nextAction: '电话确认需求',
      aiRecommendation: '决策人直接对接，转化概率高'
    },
    {
      id: '5',
      company: '创新软件公司',
      contact: '刘总监',
      title: '销售总监',
      velocityScore: 78,
      scoreChange: -3,
      scoreTrend: 'down' as const,
      stage: '商务谈判',
      value: 620000,
      probability: 58,
      lastActivity: '3天前',
      email: 'liu@innovsoft.com',
      phone: '136-0000-3456',
      avatarColor: 'from-pink-500 to-pink-600',
      nextAction: '发送调整后报价',
      aiRecommendation: '⚠️ 活动减少，需要立即跟进'
    },
  ];

  const aiInsights = [
    {
      id: 'ai-1',
      type: 'opportunity' as const,
      title: '高价值机会识别',
      description: '金融科技创新 的Velocity Score达到95分，预计成交金额120万，建议优先跟进',
      confidence: 94,
      impact: 'high' as const,
      actionable: true,
      relatedEntity: {
        name: '金融科技创新 - 周总',
        type: 'lead'
      },
      suggestedActions: [
        '安排技术总监参与演示会议',
        '准备金融行业定制化方案',
        '协调高层对接资源'
      ]
    },
    {
      id: 'ai-2',
      type: 'warning' as const,
      title: '客户活动减少预警',
      description: '创新软件公司 近3天无互动，Velocity Score下降3分，建议主动联系',
      confidence: 87,
      impact: 'medium' as const,
      actionable: true,
      relatedEntity: {
        name: '创新软件公司 - 刘总监',
        type: 'lead'
      },
      suggestedActions: [
        '发送个性化跟进邮件',
        '电话沟通了解情况',
        '提供额外价值内容'
      ]
    },
    {
      id: 'ai-3',
      type: 'suggestion' as const,
      title: '最佳跟进时机',
      description: 'ABC科技 的技术总监在工作日下午3-5点最活跃，建议在此时间段联系',
      confidence: 91,
      impact: 'medium' as const,
      actionable: true,
      relatedEntity: {
        name: 'ABC科技 - 王总',
        type: 'lead'
      },
      suggestedActions: [
        '今日下午4点发送方案',
        '预约明天下午演示会议'
      ]
    },
  ];

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-gradient-to-r from-teal-500 to-teal-600 text-white';
    if (score >= 80) return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
    if (score >= 70) return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
    return 'bg-gradient-to-r from-neutral-400 to-neutral-500 text-white';
  };

  const getStageBadgeColor = (stage: string) => {
    const colors: Record<string, string> = {
      '线索': 'bg-blue-50 text-blue-700 border-blue-200',
      '需求确认': 'bg-purple-50 text-purple-700 border-purple-200',
      '方案演示': 'bg-teal-50 text-teal-700 border-teal-200',
      '商务谈判': 'bg-orange-50 text-orange-700 border-orange-200',
    };
    return colors[stage] || 'bg-neutral-50 text-neutral-700 border-neutral-200';
  };

  const handleLeadAction = (leadId: string, action: string) => {
    toast.success(`正在执行: ${action}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-neutral-900">智能线索工作台</h2>
            <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 rounded-full">
              <Sparkles className="w-3 h-3 mr-1" />
              AI驱动
            </Badge>
          </div>
          <p className="text-sm text-neutral-500">
            基于Velocity Score智能排序，AI实时分析客户行为
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="rounded-xl hover:bg-purple-50 hover:border-purple-300"
            onClick={() => setShowAIInsights(!showAIInsights)}
          >
            <Brain className="w-4 h-4 mr-2" />
            AI洞察
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            新增线索
          </Button>
        </div>
      </div>

      {/* Filters and View Switcher */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索公司、联系人或邮箱..."
              className="pl-10 rounded-xl border-neutral-200 focus:border-purple-300"
            />
          </div>
          <Button variant="outline" className="rounded-xl hover:bg-purple-50">
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </Button>
        </div>
        <ViewSwitcher view={view} onChange={setView} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className={showAIInsights ? 'col-span-8' : 'col-span-12'}>
          {view === 'list' && (
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <div className="divide-y divide-neutral-100">
                <AnimatePresence mode="popLayout">
                  {leads.map((lead, index) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 transition-all cursor-pointer group"
                      onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <Avatar className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lead.avatarColor} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                          {lead.contact.slice(0, 1)}
                        </Avatar>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-neutral-900 truncate">{lead.company}</h4>
                                <Badge 
                                  className={`${getScoreBadgeColor(lead.velocityScore)} border-0 rounded-full shadow-sm`}
                                >
                                  <Zap className="w-3 h-3 mr-1" />
                                  {lead.velocityScore}
                                </Badge>
                                {lead.scoreChange !== 0 && (
                                  <Badge variant="outline" className={`rounded-full ${
                                    lead.scoreTrend === 'up' 
                                      ? 'bg-teal-50 text-teal-700 border-teal-200' 
                                      : 'bg-red-50 text-red-700 border-red-200'
                                  }`}>
                                    {lead.scoreTrend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                    {Math.abs(lead.scoreChange)}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-neutral-500">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{lead.contact} · {lead.title}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{lead.lastActivity}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={`${getStageBadgeColor(lead.stage)} rounded-full`}>
                                {lead.stage}
                              </Badge>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-neutral-900">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{(lead.value / 10000).toFixed(0)}万</span>
                                </div>
                                <div className="text-xs text-neutral-500">{lead.probability}% 概率</div>
                              </div>
                            </div>
                          </div>

                          {/* AI Recommendation */}
                          {lead.aiRecommendation && (
                            <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl mb-3 border border-purple-100">
                              <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-neutral-700 flex-1">{lead.aiRecommendation}</p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="rounded-lg hover:bg-purple-100 hover:text-purple-700 text-neutral-600"
                              >
                                <Mail className="w-4 h-4 mr-1" />
                                邮件
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="rounded-lg hover:bg-teal-100 hover:text-teal-700 text-neutral-600"
                              >
                                <Phone className="w-4 h-4 mr-1" />
                                电话
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="rounded-lg hover:bg-blue-100 hover:text-blue-700 text-neutral-600"
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />
                                留言
                              </Button>
                            </div>

                            <div className="flex items-center gap-2">
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleLeadAction(lead.id, lead.nextAction);
                                    }}
                                  >
                                    <Zap className="w-4 h-4 mr-1" />
                                    {lead.nextAction}
                                  </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <div className="space-y-2">
                                    <h4 className="text-sm">AI建议的最佳行动</h4>
                                    <p className="text-sm text-neutral-500">
                                      基于客户行为分析，这是当前最有效的跟进方式
                                    </p>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    className="rounded-lg hover:bg-neutral-100"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    查看详情
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    安排会议
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Activity className="w-4 h-4 mr-2" />
                                    活动历史
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          <AnimatePresence>
                            {selectedLead === lead.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t"
                              >
                                <CollaborationPanel 
                                  entityType="lead"
                                  entityId={lead.id}
                                  entityName={lead.company}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>
          )}

          {view === 'kanban' && (
            <div className="grid grid-cols-4 gap-4">
              {['线索', '需求确认', '方案演示', '商务谈判'].map((stage) => (
                <Card key={stage} className="border-0 shadow-sm rounded-2xl p-4">
                  <div className="mb-4">
                    <h3 className="text-neutral-900 mb-1">{stage}</h3>
                    <p className="text-sm text-neutral-500">
                      {leads.filter(l => l.stage === stage).length} 个线索
                    </p>
                  </div>
                  <div className="space-y-3">
                    {leads.filter(l => l.stage === stage).map((lead) => (
                      <Card key={lead.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer border border-neutral-100 rounded-xl">
                        <div className="flex items-start gap-2 mb-2">
                          <Avatar className={`w-8 h-8 rounded-lg bg-gradient-to-br ${lead.avatarColor} flex items-center justify-center text-white text-sm`}>
                            {lead.contact.slice(0, 1)}
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm text-neutral-900 truncate">{lead.company}</h4>
                            <p className="text-xs text-neutral-500">{lead.contact}</p>
                          </div>
                        </div>
                        <Badge className={`${getScoreBadgeColor(lead.velocityScore)} border-0 rounded-full mb-2`}>
                          <Zap className="w-3 h-3 mr-1" />
                          {lead.velocityScore}
                        </Badge>
                        <div className="text-xs text-neutral-600">
                          ¥{(lead.value / 10000).toFixed(0)}万 · {lead.probability}%
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* AI Insights Sidebar */}
        {showAIInsights && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="col-span-4"
          >
            <AIInsightCard insights={aiInsights} onAction={handleLeadAction} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
