import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { enhancedChurnRisks } from '../lib/enhancedMockData';
import { LayoutGrid, LayoutList, TrendingDown, AlertTriangle, DollarSign, Calendar, User as UserIcon, MessageSquare } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

export function ChurnWatchlist() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof enhancedChurnRisks[0] | null>(null);

  const highRisk = enhancedChurnRisks.filter(c => c.riskLevel === 'high');
  const mediumRisk = enhancedChurnRisks.filter(c => c.riskLevel === 'medium');
  const lowRisk = enhancedChurnRisks.filter(c => c.riskLevel === 'low');

  // Mock trend data for detail panel
  const churnTrendData = [
    { month: '7月', score: 35 },
    { month: '8月', score: 52 },
    { month: '9月', score: 68 },
    { month: '10月', score: selectedCustomer?.churnScore || 85 },
  ];

  const totalAtRisk = highRisk.reduce((sum, c) => sum + c.arr, 0) + mediumRisk.reduce((sum, c) => sum + c.arr, 0);

  const ChurnCard = ({ customer }: { customer: typeof enhancedChurnRisks[0] }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all border-border group"
      onClick={() => setSelectedCustomer(customer)}
    >
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium tracking-tight mb-2">{customer.customerName}</h3>
              <div className="flex items-center gap-2">
                <Badge
                  className={`font-medium ${
                    customer.riskLevel === 'high'
                      ? 'bg-destructive text-destructive-foreground'
                      : customer.riskLevel === 'medium'
                      ? 'bg-orange-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {customer.churnScore}%
                </Badge>
                <span className="text-xs text-muted-foreground">流失风险</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              风险因素
            </div>
            <div className="space-y-1">
              {customer.riskFactors.slice(0, 3).map((factor, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <AlertTriangle className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <DollarSign className="h-3 w-3" />
                <span>ARR</span>
              </div>
              <div className="font-medium text-sm">¥{(customer.arr / 10000).toFixed(1)}万</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>最后活跃</span>
              </div>
              <div className="font-medium text-sm">{customer.lastActive}</div>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <UserIcon className="h-3 w-3" />
              <span>{customer.owner}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">客户流失预警</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {enhancedChurnRisks.length} 个客户 · {highRisk.length} 高风险 · ARR风险 ¥{(totalAtRisk / 10000).toFixed(0)}万
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('kanban')}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            看板
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="gap-2"
          >
            <LayoutList className="h-4 w-4" />
            列表
          </Button>
        </div>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  高风险客户
                </div>
                <div className="text-3xl font-medium tracking-tight text-destructive">
                  {highRisk.length}
                </div>
              </div>
              <div className="h-12 w-12 bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  中风险客户
                </div>
                <div className="text-3xl font-medium tracking-tight text-orange-600">
                  {mediumRisk.length}
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-500/10 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  低风险客户
                </div>
                <div className="text-3xl font-medium tracking-tight text-green-600">
                  {lowRisk.length}
                </div>
              </div>
              <div className="h-12 w-12 bg-green-500/10 flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* High Risk Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="h-3 w-3 bg-destructive"></div>
              <span className="font-medium tracking-tight">高风险</span>
              <Badge variant="secondary">{highRisk.length}</Badge>
            </div>
            <div className="space-y-4">
              {highRisk.map(customer => (
                <ChurnCard key={customer.id} customer={customer} />
              ))}
            </div>
          </div>

          {/* Medium Risk Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="h-3 w-3 bg-orange-500"></div>
              <span className="font-medium tracking-tight">中风险</span>
              <Badge variant="secondary">{mediumRisk.length}</Badge>
            </div>
            <div className="space-y-4">
              {mediumRisk.map(customer => (
                <ChurnCard key={customer.id} customer={customer} />
              ))}
            </div>
          </div>

          {/* Low Risk Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="h-3 w-3 bg-green-500"></div>
              <span className="font-medium tracking-tight">低风险</span>
              <Badge variant="secondary">{lowRisk.length}</Badge>
            </div>
            <div className="space-y-4">
              {lowRisk.map(customer => (
                <ChurnCard key={customer.id} customer={customer} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="border-border">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="font-medium">客户名称</TableHead>
                  <TableHead className="font-medium">风险分数</TableHead>
                  <TableHead className="font-medium">主要风险</TableHead>
                  <TableHead className="font-medium">ARR</TableHead>
                  <TableHead className="font-medium">最后活跃</TableHead>
                  <TableHead className="font-medium">负责人</TableHead>
                  <TableHead className="font-medium">策略</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enhancedChurnRisks.map((customer) => (
                  <TableRow 
                    key={customer.id}
                    className="cursor-pointer hover:bg-secondary/50 transition-colors border-border"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <TableCell className="font-medium">{customer.customerName}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          customer.riskLevel === 'high'
                            ? 'bg-destructive text-destructive-foreground'
                            : customer.riskLevel === 'medium'
                            ? 'bg-orange-500 text-white'
                            : 'bg-green-500 text-white'
                        }
                      >
                        {customer.churnScore}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {customer.riskFactors.slice(0, 2).map((factor, idx) => (
                          <span key={idx} className="text-xs text-muted-foreground">
                            {factor}
                            {idx === 0 && customer.riskFactors.length > 1 && ' ·'}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">¥{(customer.arr / 10000).toFixed(1)}万</TableCell>
                    <TableCell className="text-muted-foreground">{customer.lastActive}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.owner}</TableCell>
                    <TableCell>
                      {customer.retentionStrategies.length > 0 ? (
                        <Badge variant="outline">
                          {customer.retentionStrategies.length}个策略
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">暂无</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Detail Panel */}
      <Sheet open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto border-border">
          {selectedCustomer && (
            <>
              <SheetHeader>
                <SheetTitle className="text-base font-medium tracking-tight">
                  {selectedCustomer.customerName}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  客户详情与AI挽留策略
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-6">
                {/* Risk Score */}
                <div className="p-4 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      流失风险分数
                    </span>
                    <Badge
                      className={`text-base px-3 py-1 ${
                        selectedCustomer.riskLevel === 'high'
                          ? 'bg-destructive text-destructive-foreground'
                          : selectedCustomer.riskLevel === 'medium'
                          ? 'bg-orange-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {selectedCustomer.churnScore}%
                    </Badge>
                  </div>
                  <Progress 
                    value={selectedCustomer.churnScore} 
                    className="h-2 bg-secondary"
                  />
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">年度经常性收入</div>
                    <div className="font-medium">¥{(selectedCustomer.arr / 10000).toFixed(1)}万</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">最后活跃时间</div>
                    <div className="font-medium">{selectedCustomer.lastActive}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">客户经理</div>
                    <div className="font-medium">{selectedCustomer.owner}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">风险等级</div>
                    <Badge variant="outline">
                      {selectedCustomer.riskLevel === 'high' ? '高' : 
                       selectedCustomer.riskLevel === 'medium' ? '中' : '低'}
                    </Badge>
                  </div>
                </div>

                {/* Trend Chart */}
                <div>
                  <h3 className="text-sm font-medium mb-4 tracking-tight">流失风险趋势</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={churnTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#6B6B6B"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#6B6B6B"
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E0E0E0',
                          borderRadius: 0
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#DC2626" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#DC2626' }}
                        name="风险分数"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Risk Factors */}
                <div>
                  <h3 className="text-sm font-medium mb-4 tracking-tight">详细风险因素</h3>
                  <div className="space-y-3">
                    {selectedCustomer.riskFactors.map((factor, idx) => (
                      <div key={idx} className="p-3 bg-destructive/5 border border-destructive/20">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm font-medium mb-1">{factor}</div>
                            <p className="text-xs text-muted-foreground">
                              该指标变化趋势需要立即关注
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Retention Strategies */}
                {selectedCustomer.retentionStrategies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-4 tracking-tight">AI挽留策略引擎</h3>
                    <div className="space-y-4">
                      {selectedCustomer.retentionStrategies.map((strategy, idx) => (
                        <Card key={idx} className="border-border">
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-1">
                                      方案 {String.fromCharCode(65 + idx)}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      成功率 {strategy.successRate}%
                                    </Badge>
                                  </div>
                                  <h4 className="text-sm font-medium tracking-tight">
                                    {strategy.name}
                                  </h4>
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {strategy.description}
                              </p>
                              
                              {strategy.template && (
                                <div className="p-3 bg-secondary/50 border border-border">
                                  <div className="flex items-start gap-2 mb-2">
                                    <MessageSquare className="h-3 w-3 mt-0.5" />
                                    <span className="text-xs font-medium uppercase tracking-wide">
                                      话术模板
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    {strategy.template}
                                  </p>
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => toast.success('已记录挽留活动')}
                                >
                                  执行此策略
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => toast.info('已复制模板')}
                                >
                                  复制模板
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
