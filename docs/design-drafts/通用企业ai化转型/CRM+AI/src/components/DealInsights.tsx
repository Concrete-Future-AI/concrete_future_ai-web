import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  Building2,
  Target,
  MessageSquare,
  BarChart3,
  Activity,
  Heart
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function DealInsights() {
  const [selectedDeal, setSelectedDeal] = useState('deal1');

  const deals = [
    {
      id: 'deal1',
      company: 'ABC科技有限公司',
      value: 580000,
      stage: '商务谈判',
      healthScore: 78,
      probability: 65,
      closeDate: '2025-12-15',
      daysInStage: 12,
      contact: '王总监',
    },
    {
      id: 'deal2',
      company: '智慧制造集团',
      value: 720000,
      stage: '方案演示',
      healthScore: 85,
      probability: 75,
      closeDate: '2025-12-20',
      daysInStage: 8,
      contact: '李经理',
    },
    {
      id: 'deal3',
      company: '云端服务有限公司',
      value: 450000,
      stage: '需求确认',
      healthScore: 62,
      probability: 45,
      closeDate: '2026-01-10',
      daysInStage: 18,
      contact: '张总',
    },
  ];

  const currentDeal = deals.find(d => d.id === selectedDeal) || deals[0];

  // Deal health trend data
  const healthTrendData = [
    { date: '11/01', score: 72, interactions: 5 },
    { date: '11/05', score: 75, interactions: 8 },
    { date: '11/10', score: 78, interactions: 12 },
    { date: '11/15', score: 82, interactions: 15 },
    { date: '11/20', score: 78, interactions: 10 },
    { date: '11/24', score: 78, interactions: 8 },
  ];

  // Relationship map data
  const contacts = [
    { 
      name: '王总监', 
      title: '技术总监', 
      role: 'champion', 
      engagement: 95,
      lastContact: '2天前',
      interactions: 24
    },
    { 
      name: '李副总', 
      title: '技术副总裁', 
      role: 'decision-maker', 
      engagement: 45,
      lastContact: '未接触',
      interactions: 0
    },
    { 
      name: '张经理', 
      title: 'IT经理', 
      role: 'influencer', 
      engagement: 72,
      lastContact: '5天前',
      interactions: 12
    },
    { 
      name: '刘工程师', 
      title: '系统工程师', 
      role: 'user', 
      engagement: 60,
      lastContact: '1周前',
      interactions: 8
    },
  ];

  // AI playbook recommendations
  const playbooks = [
    {
      title: '发送成功案例',
      reason: '对于处于"商务谈判"阶段的科技行业客户，发送相关成功案例的成交率提高42%',
      action: 'recommend_case',
      priority: 'high',
      template: '某某银行成功案例'
    },
    {
      title: '联系技术副总裁',
      reason: '您尚未与关键决策者"李副总"建立联系，建议通过"王总监"引荐',
      action: 'contact_decision_maker',
      priority: 'high',
      template: null
    },
    {
      title: '安排技术演示',
      reason: '历史数据显示，在谈判阶段进行技术深度演示可提升成交率28%',
      action: 'schedule_demo',
      priority: 'medium',
      template: '技术演示邀请'
    },
  ];

  // Engagement metrics radar data
  const engagementData = [
    { metric: '互动频率', value: 78, fullMark: 100 },
    { metric: '决策人参与', value: 45, fullMark: 100 },
    { metric: '情绪积极度', value: 82, fullMark: 100 },
    { metric: '响应速度', value: 70, fullMark: 100 },
    { metric: '内容深度', value: 68, fullMark: 100 },
  ];

  // Timeline activities
  const activities = [
    { 
      type: 'call', 
      title: '电话沟通商务条款', 
      description: '与王总监讨论了付款方式和实施周期，客户表示认可',
      time: '2天前',
      sentiment: 'positive',
      keyPoints: ['付款方式灵活', '实施周期6个月', '需要技术支持']
    },
    { 
      type: 'email', 
      title: '发送报价方案', 
      description: '发送了定制化报价方案，客户已打开2次',
      time: '5天前',
      sentiment: 'neutral',
      keyPoints: ['总价58万', '分3期付款', '包含培训']
    },
    { 
      type: 'meeting', 
      title: '产品演示会议', 
      description: '进行了2小时的产品演示，参会4人，反馈积极',
      time: '1周前',
      sentiment: 'positive',
      keyPoints: ['功能符合需求', '界面易用', '希望看到案例']
    },
    { 
      type: 'document', 
      title: '客户下载技术文档', 
      description: 'IT团队下载了系统架构和API文档',
      time: '10天前',
      sentiment: 'positive',
      keyPoints: ['技术团队积极评估', '关注集成能力']
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'champion':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'decision-maker':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'influencer':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'champion':
        return '支持者';
      case 'decision-maker':
        return '决策者';
      case 'influencer':
        return '影响者';
      default:
        return '使用者';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-neutral-600';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'meeting':
        return <Calendar className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-900 mb-1">交易洞察室</h2>
          <p className="text-neutral-500">深度分析关键交易，提升成交概率</p>
        </div>
        <div className="flex items-center gap-2">
          {deals.map((deal) => (
            <Button
              key={deal.id}
              variant={selectedDeal === deal.id ? 'default' : 'outline'}
              onClick={() => setSelectedDeal(deal.id)}
              className={selectedDeal === deal.id ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              {deal.company}
            </Button>
          ))}
        </div>
      </div>

      {/* Deal Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-500">交易金额</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-neutral-900">¥{(currentDeal.value / 10000).toFixed(1)}万</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-500">当前阶段</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {currentDeal.stage}
              </Badge>
              <span className="text-sm text-neutral-500">{currentDeal.daysInStage}天</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-500">健康分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl ${
                currentDeal.healthScore >= 80 ? 'text-green-600' :
                currentDeal.healthScore >= 60 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {currentDeal.healthScore}
              </div>
              <Heart className={`w-5 h-5 ${
                currentDeal.healthScore >= 80 ? 'text-green-600 fill-green-600' :
                currentDeal.healthScore >= 60 ? 'text-yellow-600 fill-yellow-600' :
                'text-red-600'
              }`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-500">成交概率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-900">{currentDeal.probability}%</span>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <Progress value={currentDeal.probability} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deal Health Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              交易健康趋势
            </CardTitle>
            <CardDescription>基于互动频率、情绪和参与度的综合评分</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={healthTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  name="健康分"
                />
                <Line 
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="互动次数"
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-neutral-200">
              <div className="text-center">
                <p className="text-sm text-neutral-500 mb-1">平均健康分</p>
                <p className="text-neutral-900">76.8</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-neutral-500 mb-1">总互动次数</p>
                <p className="text-neutral-900">58</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-neutral-500 mb-1">趋势</p>
                <div className="flex items-center justify-center gap-1 text-yellow-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">持平</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              参与度分析
            </CardTitle>
            <CardDescription>多维度评估客户参与情况</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={engagementData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                <Radar 
                  name="得分" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.5} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Relationship Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            关系图谱
          </CardTitle>
          <CardDescription>客户组织内的联系人与参与度</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contacts.map((contact) => (
              <div 
                key={contact.name} 
                className="p-4 border-2 border-neutral-200 rounded-lg hover:border-blue-400 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <Badge className={`${getRoleColor(contact.role)} border`}>
                    {getRoleLabel(contact.role)}
                  </Badge>
                </div>
                <h4 className="text-neutral-900 mb-1">{contact.name}</h4>
                <p className="text-sm text-neutral-500 mb-3">{contact.title}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">参与度</span>
                    <span className={`${
                      contact.engagement >= 80 ? 'text-green-600' :
                      contact.engagement >= 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {contact.engagement}%
                    </span>
                  </div>
                  <Progress value={contact.engagement} className="h-1.5" />
                  <div className="flex items-center justify-between text-xs text-neutral-500 mt-2">
                    <span>{contact.interactions} 次互动</span>
                    <span>{contact.lastContact}</span>
                  </div>
                </div>

                {contact.engagement === 0 && (
                  <Button className="w-full mt-3 bg-orange-600 hover:bg-orange-700" size="sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    建议联系
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 mb-1">
                  <strong>AI建议:</strong> 您尚未与关键决策者"李副总"建立联系。
                </p>
                <p className="text-sm text-blue-700">
                  建议通过您的支持者"王总监"进行引荐，成功率可提高65%。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Playbook */}
      <Card className="border-purple-200 bg-purple-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI智能剧本
          </CardTitle>
          <CardDescription>基于历史成功案例的下一步最佳行动</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {playbooks.map((playbook, index) => (
              <div key={index} className="p-4 bg-white border-2 border-purple-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      playbook.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-neutral-900 mb-2">{playbook.title}</h4>
                      <p className="text-sm text-neutral-600">{playbook.reason}</p>
                      {playbook.template && (
                        <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
                          <FileText className="w-3 h-3 mr-1" />
                          模板: {playbook.template}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant={playbook.priority === 'high' ? 'destructive' : 'secondary'} className="ml-3">
                    {playbook.priority === 'high' ? '高优先级' : '中优先级'}
                  </Badge>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  执行此操作
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            活动时间线
          </CardTitle>
          <CardDescription>完整的客户互动历史记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 flex-1 bg-neutral-200 my-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-neutral-900">{activity.title}</h4>
                    <span className="text-sm text-neutral-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">{activity.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {activity.keyPoints.map((point, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {point}
                      </Badge>
                    ))}
                    <Badge className={`${getSentimentColor(activity.sentiment)} bg-transparent border-current`}>
                      {activity.sentiment === 'positive' ? '积极' : activity.sentiment === 'negative' ? '消极' : '中性'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
