import { ArrowRight, TrendingUp, AlertCircle, Target, CheckCircle, Clock, Filter, Sparkles, Zap, TrendingDown, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { enhancedTasks, enhancedActivityFeed, enhancedFunnelData, teamPerformanceData } from '../lib/enhancedMockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AIInsightsPanel } from './AIInsightsPanel';
import { AIPredictionChart } from './AIPredictionChart';
import { AIWorkflowSuggestions } from './AIWorkflowSuggestions';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [tasks, setTasks] = useState(enhancedTasks);
  const [timeRange, setTimeRange] = useState('today');
  const [activeTab, setActiveTab] = useState('overview');
  
  const forecastValue = 1280000;
  const targetValue = 1500000;
  const progressPercentage = (forecastValue / targetValue) * 100;

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    toast.success('任务状态已更新', {
      icon: '✅',
      duration: 2000
    });
  };

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background via-secondary/10 to-background min-h-screen">
      {/* Header with filters */}
      <div className="flex items-center justify-between slide-up">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
            数据概览
            <Badge className="gradient-primary text-white border-0">
              <Brain className="h-3 w-3 mr-1" />
              AI增强
            </Badge>
          </h2>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <Zap className="h-3 w-3 text-primary" />
            实时更新 · AI驱动的智能分析
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 border-border rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="today">今天</SelectItem>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2 rounded-lg hover-lift">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg">概览</TabsTrigger>
          <TabsTrigger value="ai-insights" className="rounded-lg">
            <Sparkles className="h-4 w-4 mr-1" />
            AI洞察
          </TabsTrigger>
          <TabsTrigger value="automation" className="rounded-lg">自动化</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8 mt-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sales Forecast Card */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all border-border rounded-2xl group hover-lift bg-gradient-to-br from-card to-secondary/30"
              onClick={() => onNavigate('forecast')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold tracking-tight">本季度销售预测</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Quarterly Forecast</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold tracking-tight text-primary">¥{(forecastValue / 10000).toFixed(0)}</span>
                    <span className="text-sm text-muted-foreground">万元</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">目标: ¥{(targetValue / 10000).toFixed(0)}万</span>
                    <Badge className="gradient-success border-0 text-white">
                      {progressPercentage.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>完成进度</span>
                    <span className="font-semibold text-primary">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-secondary" />
                </div>
                <div className="flex items-center text-xs text-primary group-hover:text-primary font-medium transition-colors">
                  查看AI预测分析 <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* High-Potential Opportunities Card */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all border-border rounded-2xl group hover-lift bg-gradient-to-br from-card to-accent/5"
              onClick={() => onNavigate('opportunities')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold tracking-tight">AI识别机会</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">AI-Powered Opportunities</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl gradient-success flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold tracking-tight text-accent">6</span>
                    <span className="text-sm text-muted-foreground">个高潜力机会</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">AI评分 &gt; 80分</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground">本周新增</div>
                    <div className="text-xl font-bold text-accent">+2</div>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground">AI预测成交率</div>
                    <div className="text-xl font-bold">78%</div>
                  </div>
                </div>
                <div className="flex items-center text-xs text-accent group-hover:text-accent font-medium transition-colors">
                  查看AI推荐 <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Churn Risk Card */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all border-border rounded-2xl group hover-lift bg-gradient-to-br from-card to-destructive/5"
              onClick={() => onNavigate('churn')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold tracking-tight">AI流失预警</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">AI Churn Prediction</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-destructive to-orange-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold tracking-tight text-destructive">2</span>
                    <span className="text-sm text-muted-foreground">高风险客户</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">AI置信度 88%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground">中风险</div>
                    <div className="text-xl font-bold text-warning">2</div>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground">ARR风险</div>
                    <div className="text-xl font-bold">¥77万</div>
                  </div>
                </div>
                <div className="flex items-center text-xs text-destructive group-hover:text-destructive font-medium transition-colors">
                  查看AI挽留策略 <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts & Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Prediction Chart */}
            <AIPredictionChart title="AI销售预测" type="revenue" timeRange="month" />

            {/* Team Performance */}
            <Card className="border-border rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      团队业绩排行
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">本季度完成情况</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs rounded-lg hover-lift">
                    查看全部
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformanceData.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-semibold shadow-sm ${
                        idx === 0 ? 'gradient-primary text-white' : 'bg-secondary text-foreground'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{member.name}</span>
                          <span className="text-sm font-bold text-primary">¥{(member.revenue / 10000).toFixed(0)}万</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{member.deals}笔成交</span>
                          <span>·</span>
                          <span className={member.quota >= 100 ? 'text-accent font-medium' : ''}>
                            配额完成 {member.quota}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* To-Do & Reminders */}
            <Card className="border-border rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      待办任务
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{tasks.filter(t => !t.completed).length} 个待完成</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs rounded-lg">
                    全部标记完成
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start gap-4 p-4 border border-border rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer ${
                        task.completed ? 'opacity-50' : ''
                      }`}
                    >
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className={`font-medium text-sm ${task.completed ? 'line-through' : ''}`}>
                            {task.type}
                          </span>
                          {task.priority === 'high' && !task.completed && (
                            <Badge className="text-xs gradient-primary border-0 text-white">紧急</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{task.customer}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>截止: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="border-border rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      AI 洞察动态
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">实时智能分析</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs rounded-lg">
                    查看历史
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {enhancedActivityFeed.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-xl hover:bg-secondary/50 hover:border-primary/30 transition-all cursor-pointer group"
                      onClick={() => toast.info('查看详情')}
                    >
                      <div className={`mt-1 flex-shrink-0 h-2 w-2 rounded-full ${
                        item.type === 'opportunity' ? 'bg-accent' :
                        item.type === 'risk' ? 'bg-destructive' :
                        'bg-primary'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed group-hover:text-primary transition-colors">{item.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleString('zh-CN', { 
                              month: 'short', 
                              day: 'numeric', 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          <Badge variant="outline" className="text-xs rounded-md">
                            {item.type === 'opportunity' ? '机会' :
                             item.type === 'risk' ? '风险' : '预测'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="mt-6">
          <AIInsightsPanel context="dashboard" />
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="mt-6">
          <AIWorkflowSuggestions />
        </TabsContent>
      </Tabs>
    </div>
  );
}