import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { enhancedForecasts, enhancedSalesTrendData } from '../lib/enhancedMockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './ui/hover-card';
import { TrendingUp, TrendingDown, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function SalesForecast() {
  const [timeRange, setTimeRange] = useState('quarter');
  const [scenario, setScenario] = useState('likely');
  const [sortBy, setSortBy] = useState('probability');

  const forecastRevenue = 1280000;
  const weightedPipeline = 1450000;
  const targetRevenue = 1500000;
  const gap = forecastRevenue - targetRevenue;
  const accuracy = 87;

  // Adjust predicted values based on scenario
  const adjustedData = enhancedSalesTrendData.map(item => ({
    ...item,
    predicted: item.predicted ? 
      (scenario === 'best' ? item.predicted * 1.15 :
       scenario === 'worst' ? item.predicted * 0.85 :
       item.predicted) : undefined,
    upper: item.upper ?
      (scenario === 'best' ? item.upper * 1.15 :
       scenario === 'worst' ? item.upper * 0.85 :
       item.upper) : undefined,
    lower: item.lower ?
      (scenario === 'best' ? item.lower * 1.15 :
       scenario === 'worst' ? item.lower * 0.85 :
       item.lower) : undefined
  }));

  const sortedForecasts = [...enhancedForecasts].sort((a, b) => {
    if (sortBy === 'probability') return b.aiProbability - a.aiProbability;
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'date') return new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime();
    return 0;
  });

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">销售预测分析</h2>
          <p className="text-sm text-muted-foreground mt-1">AI驱动的精准预测模型 · 置信度 {accuracy}%</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => toast.success('数据已刷新')}
          >
            <RefreshCw className="h-4 w-4" />
            刷新
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => toast.success('导出预测报告')}
          >
            <Download className="h-4 w-4" />
            导出
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                时间范围
              </label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">本月</SelectItem>
                  <SelectItem value="quarter">本季度</SelectItem>
                  <SelectItem value="year">本年</SelectItem>
                  <SelectItem value="custom">自定义</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                团队/销售人员
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部团队</SelectItem>
                  <SelectItem value="team1">A组团队</SelectItem>
                  <SelectItem value="team2">B组团队</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                产品线
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部产品</SelectItem>
                  <SelectItem value="saas">SaaS平台</SelectItem>
                  <SelectItem value="consulting">咨询服务</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                排序方式
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="probability">按成交概率</SelectItem>
                  <SelectItem value="amount">按交易金额</SelectItem>
                  <SelectItem value="date">按预计日期</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Forecast Data */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                预测销售额
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-medium tracking-tight">¥{(forecastRevenue / 10000).toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">万</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-accent">
                <TrendingUp className="h-3 w-3" />
                <span>较上季度 +15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                加权管道
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-medium tracking-tight">¥{(weightedPipeline / 10000).toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">万</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {enhancedForecasts.length} 个活跃机会
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                与目标差距
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-medium tracking-tight ${gap >= 0 ? 'text-accent' : 'text-destructive'}`}>
                  {gap >= 0 ? '+' : ''}{(gap / 10000).toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">万</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {gap >= 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <span>超出目标</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 text-destructive" />
                    <span>低于目标</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                预测准确率
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-medium tracking-tight">{accuracy}</span>
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                历史验证
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium tracking-tight">销售趋势与预测</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">历史数据 + AI预测 + 置信区间</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={scenario === 'best' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setScenario('best')}
                className="text-xs"
              >
                乐观
              </Button>
              <Button
                variant={scenario === 'likely' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setScenario('likely')}
                className="text-xs"
              >
                中性
              </Button>
              <Button
                variant={scenario === 'worst' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setScenario('worst')}
                className="text-xs"
              >
                保守
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={adjustedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis 
                dataKey="date" 
                stroke="#6B6B6B"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6B6B6B"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E0E0E0',
                  borderRadius: 0
                }}
                formatter={(value: number) => `¥${(value / 10000).toFixed(1)}万`}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="rect"
              />
              {adjustedData[0]?.upper && (
                <Area 
                  type="monotone" 
                  dataKey="upper" 
                  stroke="none"
                  fill="#0A0A0A"
                  fillOpacity={0.05}
                  name="置信上限"
                />
              )}
              {adjustedData[0]?.lower && (
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  stroke="none"
                  fill="#0A0A0A"
                  fillOpacity={0.05}
                  name="置信下限"
                />
              )}
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#0A0A0A" 
                strokeWidth={3}
                dot={{ r: 4 }}
                name="已完成销售额"
              />
              <Line 
                type="monotone" 
                dataKey="pipeline" 
                stroke="#3B82F6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
                name="当前管道金额"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#DC2626" 
                strokeWidth={2}
                dot={{ r: 3 }}
                name="AI预测"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Forecast Details Table */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium tracking-tight">预测详情明细</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">共 {enhancedForecasts.length} 个销售机会</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="font-medium">机会名称</TableHead>
                <TableHead className="font-medium">客户</TableHead>
                <TableHead className="font-medium">负责人</TableHead>
                <TableHead className="font-medium">预计日期</TableHead>
                <TableHead className="font-medium text-right">金额</TableHead>
                <TableHead className="font-medium text-center">AI概率</TableHead>
                <TableHead className="font-medium">阶段</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedForecasts.map((forecast) => (
                <TableRow 
                  key={forecast.id} 
                  className="cursor-pointer hover:bg-secondary/50 transition-colors border-border"
                  onClick={() => toast.info(`查看 ${forecast.opportunityName} 详情`)}
                >
                  <TableCell className="font-medium">{forecast.opportunityName}</TableCell>
                  <TableCell>{forecast.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{forecast.owner}</TableCell>
                  <TableCell className="text-muted-foreground">{forecast.expectedCloseDate}</TableCell>
                  <TableCell className="text-right font-medium">
                    ¥{(forecast.amount / 10000).toFixed(1)}万
                  </TableCell>
                  <TableCell className="text-center">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="cursor-help inline-block">
                          <Badge
                            variant="outline"
                            className={`${
                              forecast.aiProbability >= 75 ? 'border-accent text-accent' :
                              forecast.aiProbability >= 60 ? 'border-primary text-primary' :
                              'border-muted-foreground text-muted-foreground'
                            }`}
                          >
                            {forecast.aiProbability}%
                          </Badge>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 border-border">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium mb-2">AI分析依据</h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">客户匹配度</span>
                                <span className="font-medium">95/100</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">互动质量</span>
                                <span className="font-medium">90/100</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">决策进度</span>
                                <span className="font-medium">85/100</span>
                              </div>
                              {forecast.aiProbability < 70 && (
                                <div className="pt-2 border-t border-border">
                                  <Badge variant="outline" className="text-xs">
                                    ⚠️ 历史付款记录需关注
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{forecast.stage}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
