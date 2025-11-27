import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  BarChart3, 
  PieChart as PieChartIcon,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart
} from 'recharts';

export default function ForecastCenter() {
  // AI Forecast vs Team Forecast data
  const forecastComparisonData = [
    { month: '10月', team: 2800000, ai: 2650000, actual: 2800000 },
    { month: '11月', team: 3200000, ai: 3100000, actual: 3100000 },
    { month: '12月', team: 3500000, ai: 3200000, actual: 0 },
    { month: '1月', team: 3800000, ai: 3400000, actual: 0 },
  ];

  // Sales cycle analysis
  const cycleAnalysisData = [
    { stage: '线索获取', avgDays: 3, benchmark: 5 },
    { stage: '需求确认', avgDays: 12, benchmark: 10 },
    { stage: '方案演示', avgDays: 15, benchmark: 12 },
    { stage: '商务谈判', avgDays: 18, benchmark: 15 },
    { stage: '合同签署', avgDays: 8, benchmark: 7 },
  ];

  // Win/Loss analysis
  const winLossData = [
    { name: '成交', value: 156, color: '#10b981' },
    { name: '丢单', value: 89, color: '#ef4444' },
    { name: '进行中', value: 234, color: '#3b82f6' },
  ];

  // Win reasons
  const winReasons = [
    { reason: '早期引入技术演示', percentage: 80, count: 125 },
    { reason: '多次接触决策者', percentage: 75, count: 117 },
    { reason: '提供定制化方案', percentage: 68, count: 106 },
    { reason: '价格竞争力强', percentage: 52, count: 81 },
    { reason: '快速响应客户需求', percentage: 45, count: 70 },
  ];

  // Loss reasons
  const lossReasons = [
    { reason: '竞争对手A的价格优势', percentage: 60, count: 53 },
    { reason: '决策周期过长导致延期', percentage: 35, count: 31 },
    { reason: '功能不完全匹配需求', percentage: 28, count: 25 },
    { reason: '缺少关键决策人支持', percentage: 24, count: 21 },
    { reason: '售后服务覆盖不足', percentage: 18, count: 16 },
  ];

  // Pipeline by stage data
  const pipelineStageData = [
    { stage: '线索', q3: 2500000, q4: 2900000, target: 3000000 },
    { stage: '需求确认', q3: 6200000, q4: 6700000, target: 7000000 },
    { stage: '方案演示', q3: 7800000, q4: 8500000, target: 8000000 },
    { stage: '商务谈判', q3: 6500000, q4: 7200000, target: 7500000 },
    { stage: '合同签署', q3: 4200000, q4: 4800000, target: 5000000 },
  ];

  // Regional performance
  const regionalData = [
    { region: '华东', q3: 4200000, q4: 4600000, target: 5000000, growth: 9.5 },
    { region: '华北', q3: 4100000, q4: 4725000, target: 4500000, growth: 15.2 },
    { region: '华南', q3: 3400000, q4: 3520000, target: 4000000, growth: 3.5 },
    { region: '西南', q3: 2200000, q4: 2340000, target: 3000000, growth: 6.4 },
  ];

  // Forecast accuracy history
  const accuracyData = [
    { quarter: 'Q1 2025', accuracy: 91, variance: 9 },
    { quarter: 'Q2 2025', accuracy: 94, variance: 6 },
    { quarter: 'Q3 2025', accuracy: 96, variance: 4 },
    { quarter: 'Q4 2025', accuracy: 95, variance: 5 },
  ];

  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-neutral-900 mb-1">预测与分析中心</h2>
        <p className="text-neutral-500">数据驱动的销售预测与业绩分析</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-500 flex items-center gap-2">
              <Target className="w-4 h-4" />
              预测准确率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-neutral-900">95%</span>
              <div className="flex items-center gap-1 text-green-600 text-sm mb-0.5">
                <CheckCircle2 className="w-3 h-3" />
                优秀
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-500 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Q4预测营收
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-neutral-900">¥920万</span>
              <span className="text-sm text-neutral-500 mb-0.5">vs 目标850万</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-500 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              平均销售周期
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-neutral-900">56天</span>
              <div className="flex items-center gap-1 text-green-600 text-sm mb-0.5">
                <TrendingDown className="w-3 h-3" />
                -8天
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-neutral-500 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              整体成交率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-neutral-900">32.6%</span>
              <div className="flex items-center gap-1 text-green-600 text-sm mb-0.5">
                <TrendingUp className="w-3 h-3" />
                +4.1%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Forecast vs Team Forecast */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI预测 vs. 团队提报
          </CardTitle>
          <CardDescription>对比AI智能预测与团队手动提报的差异</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={forecastComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value: number) => `¥${(value / 10000).toFixed(0)}万`}
              />
              <Legend />
              <Bar dataKey="actual" fill="#10b981" name="实际业绩" />
              <Line 
                type="monotone" 
                dataKey="team" 
                stroke="#f59e0b" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="团队预测"
                dot={{ fill: '#f59e0b', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="ai" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="AI预测"
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 mb-2">
                  <strong>关键洞察:</strong> 12月和1月团队预测比AI预测高出约300万元
                </p>
                <p className="text-sm text-blue-700">
                  建议重点关注这些月份的交易健康度，可能存在过度乐观的情况。历史数据显示AI预测准确率达95%。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Cycle Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              销售周期分析
            </CardTitle>
            <CardDescription>各阶段平均停留时间 vs. 行业基准</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cycleAnalysisData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="stage" type="category" stroke="#6b7280" width={100} />
                <Tooltip formatter={(value: number) => `${value}天`} />
                <Legend />
                <Bar dataKey="avgDays" fill="#3b82f6" name="当前平均" />
                <Bar dataKey="benchmark" fill="#9ca3af" name="行业基准" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-900">
                <strong>瓶颈发现:</strong> "商务谈判"阶段停留时间(18天)超出基准3天，建议加强商务谈判培训。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Win/Loss Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-blue-600" />
              交易分布情况
            </CardTitle>
            <CardDescription>成交、丢单与进行中的交易占比</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {winLossData.map((item) => (
                <div key={item.name} className="text-center p-3 bg-neutral-50 rounded-lg">
                  <div 
                    className="w-3 h-3 rounded-full mx-auto mb-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-sm text-neutral-500 mb-1">{item.name}</p>
                  <p className="text-neutral-900">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Win/Loss Analysis */}
      <Tabs defaultValue="win" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="win" className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            赢单分析
          </TabsTrigger>
          <TabsTrigger value="loss" className="gap-2">
            <XCircle className="w-4 h-4" />
            丢单分析
          </TabsTrigger>
        </TabsList>

        <TabsContent value="win" className="mt-6">
          <Card className="border-green-200 bg-green-50/30">
            <CardHeader>
              <CardTitle className="text-green-900">成交关键因素</CardTitle>
              <CardDescription>AI分析156个成交案例后的关键洞察</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {winReasons.map((reason, index) => (
                  <div key={index} className="p-4 bg-white border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="text-neutral-900">{reason.reason}</span>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          {reason.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-11">
                      <div className="flex-1 bg-neutral-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-green-500 h-full rounded-full transition-all"
                          style={{ width: `${reason.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-neutral-500">{reason.count}笔交易</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-900 mb-2">
                      <strong>AI建议:</strong> 成交的关键是早期阶段的技术演示和决策者接触
                    </p>
                    <p className="text-sm text-green-800">
                      建议在销售流程中强制要求：1) 在需求确认阶段安排技术演示；2) 识别并联系至少2位决策者。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loss" className="mt-6">
          <Card className="border-red-200 bg-red-50/30">
            <CardHeader>
              <CardTitle className="text-red-900">丢单主要原因</CardTitle>
              <CardDescription>AI分析89个丢单案例后的关键洞察</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lossReasons.map((reason, index) => (
                  <div key={index} className="p-4 bg-white border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="text-neutral-900">{reason.reason}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="bg-red-100 text-red-700">
                          {reason.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-11">
                      <div className="flex-1 bg-neutral-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-red-500 h-full rounded-full transition-all"
                          style={{ width: `${reason.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-neutral-500">{reason.count}笔交易</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-900 mb-2">
                      <strong>改进建议:</strong> 价格竞争力是最大的丢单原因
                    </p>
                    <p className="text-sm text-red-800">
                      建议：1) 强化价值传递，突出ROI和差异化功能；2) 开发灵活的定价策略；3) 加强与竞争对手A的对比话术培训。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pipeline Stage Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            管道阶段对比分析
          </CardTitle>
          <CardDescription>Q3 vs Q4 各阶段管道金额对比</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={pipelineStageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="stage" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value: number) => `¥${(value / 10000).toFixed(0)}万`} />
              <Legend />
              <Bar dataKey="q3" fill="#9ca3af" name="Q3实际" />
              <Bar dataKey="q4" fill="#3b82f6" name="Q4当前" />
              <Bar dataKey="target" fill="#10b981" name="Q4目标" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            区域业绩对比
          </CardTitle>
          <CardDescription>各区域Q3到Q4的增长情况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalData.map((region) => (
              <div key={region.region} className="p-4 border border-neutral-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-neutral-900">{region.region}</h4>
                    <Badge 
                      variant={region.growth >= 10 ? 'default' : region.growth >= 5 ? 'secondary' : 'outline'}
                      className={region.growth >= 10 ? 'bg-green-100 text-green-700' : ''}
                    >
                      {region.growth > 0 ? '+' : ''}{region.growth}%
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-500">Q4: ¥{(region.q4 / 10000).toFixed(0)}万</p>
                    <p className="text-xs text-neutral-400">目标: ¥{(region.target / 10000).toFixed(0)}万</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-neutral-500 mb-1">Q3</p>
                    <p className="text-neutral-900">¥{(region.q3 / 10000).toFixed(0)}万</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 mb-1">Q4</p>
                    <p className="text-neutral-900">¥{(region.q4 / 10000).toFixed(0)}万</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 mb-1">完成率</p>
                    <p className="text-neutral-900">{((region.q4 / region.target) * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forecast Accuracy History */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            预测准确率历史
          </CardTitle>
          <CardDescription>过去4个季度的预测准确率追踪</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="quarter" stroke="#6b7280" />
              <YAxis domain={[85, 100]} stroke="#6b7280" />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 6 }}
                name="准确率"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 mb-1">
                  <strong>卓越表现:</strong> 连续4个季度保持90%以上的预测准确率
                </p>
                <p className="text-sm text-blue-800">
                  AI预测系统为企业提供了稳定、可信的营收预期，支持高层做出精准的业务规划和资源配置决策。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
