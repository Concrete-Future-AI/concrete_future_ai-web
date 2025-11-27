import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, DollarSign, Activity, Users, BarChart3, Target, Zap, FileText, ExternalLink, Info, Download, Brain, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Slider } from './ui/slider';
import { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';

type UserRole = 'cfo' | 'controller' | 'accountant';

interface Props {
  currentRole: UserRole;
}

const cashFlowData = [
  { month: '1月', 收入: 4200, 支出: 3100, 净流入: 1100 },
  { month: '2月', 收入: 4800, 支出: 3400, 净流入: 1400 },
  { month: '3月', 收入: 5200, 支出: 3800, 净流入: 1400 },
  { month: '4月', 收入: 5800, 支出: 4200, 净流入: 1600 },
  { month: '5月', 收入: 6200, 支出: 4500, 净流入: 1700 },
  { month: '6月', 收入: 6500, 支出: 4800, 净流入: 1700 },
];

const riskData = [
  { name: '应收账款账龄', value: 75, color: '#ef4444' },
  { name: '供应商风险', value: 45, color: '#f59e0b' },
  { name: '汇率波动', value: 30, color: '#10b981' },
  { name: '现金流压力', value: 20, color: '#10b981' },
];

const closingTasks = [
  { id: 1, name: '银行对账', status: 'completed', progress: 100, assignee: 'Emily Zhang' },
  { id: 2, name: '应收应付核对', status: 'in-progress', progress: 75, assignee: 'Mike Liu' },
  { id: 3, name: '固定资产折旧', status: 'in-progress', progress: 60, assignee: 'Sarah Wang' },
  { id: 4, name: '税务申报准备', status: 'pending', progress: 20, assignee: 'Emily Zhang' },
  { id: 5, name: '财务报表编制', status: 'pending', progress: 0, assignee: 'David Chen' },
];

const teamEfficiency = [
  { name: 'Emily', 已完成: 45, 进行中: 8, 平均用时: 2.3 },
  { name: 'Mike', 已完成: 38, 进行中: 12, 平均用时: 3.1 },
  { name: 'Sarah', 已完成: 42, 进行中: 6, 平均用时: 2.8 },
  { name: 'Tom', 已完成: 35, 进行中: 10, 平均用时: 3.5 },
];

export default function FinanceCommandCenter({ currentRole }: Props) {
  const [revenueChange, setRevenueChange] = useState([0]);
  const [costChange, setCostChange] = useState([0]);
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedProfit, setSimulatedProfit] = useState(0);
  const [simulatedCashFlow, setSimulatedCashFlow] = useState(0);

  const baseProfit = 18500;
  const baseCashFlow = 1700;

  const handleSimulation = () => {
    setIsSimulating(true);
    toast.info('正在运行AI模拟分析...');
    
    setTimeout(() => {
      const revenueImpact = revenueChange[0];
      const costImpact = costChange[0];
      
      const newProfit = baseProfit * (1 + revenueImpact / 100) * (1 - costImpact / 100);
      const newCashFlow = baseCashFlow * (1 + revenueImpact / 100) * (1 - costImpact / 100);
      
      setSimulatedProfit(Math.round(newProfit));
      setSimulatedCashFlow(Math.round(newCashFlow));
      setIsSimulating(false);
      
      toast.success('模拟完成！预测结果已更新');
    }, 1500);
  };

  const handleKPIClick = (kpiName: string) => {
    setSelectedKPI(kpiName);
    toast.info(`查看 ${kpiName} 详细数据`);
  };

  const handleExportData = () => {
    toast.success('数据导出成功！文件已保存到下载目录');
  };

  const handleTaskClick = (taskName: string) => {
    toast.info(`正在查看任务: ${taskName}`);
  };

  return (
    <div className="space-y-6">
      {/* Role Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">财务指挥舱</h2>
          <p className="text-gray-600">AI驱动的实时财务数据与智能决策支持</p>
        </div>
        <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50 px-4 py-2">
          {currentRole === 'cfo' && '战略决策视图'}
          {currentRole === 'controller' && '运营管理视图'}
          {currentRole === 'accountant' && '执行任务视图'}
        </Badge>
      </div>

      {/* CFO View */}
      {currentRole === 'cfo' && (
        <div className="space-y-6">
          {/* Core KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Card className="border-l-4 border-l-blue-600 cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardDescription className="flex items-center justify-between">
                        现金储备及预测跑道
                        <ExternalLink className="w-3 h-3" />
                      </CardDescription>
                      <CardTitle className="flex items-baseline gap-2">
                        ¥42.8M
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          +12.3%
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-slate-600">预测跑道: 18个月</div>
                      <Progress value={75} className="mt-2 h-2" />
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>现金储备详细分析</DialogTitle>
                  <DialogDescription>实时现金流数据与预测分析</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">当前余额</p>
                      <p className="text-2xl text-slate-900">¥42.8M</p>
                      <p className="text-xs text-green-600 mt-1">较上月 +12.3%</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">月均支出</p>
                      <p className="text-2xl text-slate-900">¥2.4M</p>
                      <p className="text-xs text-slate-600 mt-1">稳定运营</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm text-blue-900 mb-2">AI预测分析</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• 按当前支出速度，现金可维持 18 个月运营</li>
                      <li>• 预计下季度收入增长 15%，现金储备将增至 ¥48.2M</li>
                      <li>• 建议保持当前水平，无需额外融资</li>
                    </ul>
                  </div>
                  <Button onClick={handleExportData} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    导出详细报告
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Card className="border-l-4 border-l-green-600 cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardDescription className="flex items-center justify-between">
                        EBITDA
                        <ExternalLink className="w-3 h-3" />
                      </CardDescription>
                      <CardTitle className="flex items-baseline gap-2">
                        ¥18.5M
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          +8.7%
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-slate-600">利润率: 28.4%</div>
                      <Progress value={85} className="mt-2 h-2" />
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>EBITDA 详细分析</DialogTitle>
                  <DialogDescription>盈利能力与运营效率分析</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">本季度 EBITDA</p>
                      <p className="text-xl text-slate-900">¥18.5M</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">EBITDA 利润率</p>
                      <p className="text-xl text-slate-900">28.4%</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">同比增长</p>
                      <p className="text-xl text-green-600">+8.7%</p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm text-green-900 mb-2">行业对比</h4>
                    <p className="text-xs text-green-700">您的 EBITDA 利润率 (28.4%) 高于行业平均水平 (22.1%)，显示出色的运营效率</p>
                  </div>
                  <Button onClick={handleExportData} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    导出详细报告
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Card className="border-l-4 border-l-purple-600 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleKPIClick('净利润率')}>
              <CardHeader className="pb-3">
                <CardDescription>净利润率</CardDescription>
                <CardTitle className="flex items-baseline gap-2">
                  23.6%
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +2.1%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-slate-600">行业平均: 18.2%</div>
                <Progress value={92} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-600 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleKPIClick('经营性现金流')}>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center justify-between">
                  经营性现金流
                  <Info className="w-3 h-3" />
                </CardDescription>
                <CardTitle className="flex items-baseline gap-2">
                  ¥10.2M
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +15.8%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-slate-600">本月流入: ¥1.7M</div>
                <Progress value={68} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>

          {/* What-If Scenario Analyzer */}
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                What-If 情景分析器
              </CardTitle>
              <CardDescription>实时模拟变量调整对财务指标的影响</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">营收变化 (%)</label>
                    <Slider
                      value={revenueChange}
                      onValueChange={setRevenueChange}
                      min={-30}
                      max={30}
                      step={1}
                      className="mb-2"
                    />
                    <div className="text-center text-sm">
                      <span className={revenueChange[0] >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {revenueChange[0] > 0 ? '+' : ''}{revenueChange[0]}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">人力成本变化 (%)</label>
                    <Slider
                      value={costChange}
                      onValueChange={setCostChange}
                      min={-20}
                      max={20}
                      step={1}
                      className="mb-2"
                    />
                    <div className="text-center text-sm">
                      <span className={costChange[0] <= 0 ? 'text-green-600' : 'text-red-600'}>
                        {costChange[0] > 0 ? '+' : ''}{costChange[0]}%
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSimulation} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSimulating}
                  >
                    <Zap className={`w-4 h-4 mr-2 ${isSimulating ? 'animate-pulse' : ''}`} />
                    {isSimulating ? '正在模拟...' : '运行模拟'}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setRevenueChange([10]);
                        setCostChange([0]);
                        toast.info('已加载乐观情景');
                      }}
                    >
                      乐观情景
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setRevenueChange([-10]);
                        setCostChange([5]);
                        toast.info('已加载悲观情景');
                      }}
                    >
                      悲观情景
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setRevenueChange([0]);
                        setCostChange([0]);
                        setSimulatedProfit(0);
                        setSimulatedCashFlow(0);
                        toast.info('已重置参数');
                      }}
                    >
                      重置
                    </Button>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                  <h4 className="text-sm text-slate-700">模拟结果</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">当前利润:</span>
                      <span className="text-slate-900">¥{baseProfit.toLocaleString()}K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">预测利润:</span>
                      <span className={`${simulatedProfit > baseProfit ? 'text-green-600' : simulatedProfit < baseProfit ? 'text-red-600' : 'text-slate-900'}`}>
                        ¥{simulatedProfit > 0 ? simulatedProfit.toLocaleString() : baseProfit.toLocaleString()}K
                      </span>
                    </div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">当前现金流:</span>
                      <span className="text-slate-900">¥{baseCashFlow.toLocaleString()}K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">预测现金流:</span>
                      <span className={`${simulatedCashFlow > baseCashFlow ? 'text-green-600' : simulatedCashFlow < baseCashFlow ? 'text-red-600' : 'text-slate-900'}`}>
                        ¥{simulatedCashFlow > 0 ? simulatedCashFlow.toLocaleString() : baseCashFlow.toLocaleString()}K
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Trend & Risk Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  现金流趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="收入" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="支出" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="净流入" stackId="3" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  财务风险热力图
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskData.map((risk) => (
                    <div key={risk.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-700">{risk.name}</span>
                        <span className="text-sm">
                          {risk.value < 40 && <Badge className="bg-green-100 text-green-700 border-green-300">低风险</Badge>}
                          {risk.value >= 40 && risk.value < 70 && <Badge className="bg-amber-100 text-amber-700 border-amber-300">中风险</Badge>}
                          {risk.value >= 70 && <Badge className="bg-red-100 text-red-700 border-red-300">高风险</Badge>}
                        </span>
                      </div>
                      <Progress value={risk.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Controller View */}
      {currentRole === 'controller' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>关账进度</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  60%
                  <Clock className="w-4 h-4 text-blue-600" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={60} className="h-2" />
                <p className="text-xs text-slate-600 mt-2">预计完成: 2天</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>AI拦截风险</CardDescription>
                <CardTitle className="text-red-600">23笔</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">本月不合规支出</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>团队效率</CardDescription>
                <CardTitle className="text-green-600">+18%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">较上月提升</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>异常交易</CardDescription>
                <CardTitle className="text-amber-600">7笔</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">待审核确认</p>
              </CardContent>
            </Card>
          </div>

          {/* Closing War Room */}
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                关账作战室
              </CardTitle>
              <CardDescription>月结清单实时进度追踪</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {closingTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="bg-slate-50 rounded-lg p-4 space-y-3 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleTaskClick(task.name)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm text-slate-900">{task.name}</h4>
                          {task.status === 'completed' && (
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              已完成
                            </Badge>
                          )}
                          {task.status === 'in-progress' && (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                              <Clock className="w-3 h-3 mr-1" />
                              进行中
                            </Badge>
                          )}
                          {task.status === 'pending' && (
                            <Badge variant="outline" className="text-slate-600">
                              待开始
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">负责人: {task.assignee}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-700">{task.progress}%</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                团队效能分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamEfficiency}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="已完成" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="进行中" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Accountant View */}
      {currentRole === 'accountant' && (
        <div className="space-y-6">
          {/* My Work Queue */}
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                我的工作队列
              </CardTitle>
              <CardDescription>AI按优先级排序的待办任务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-red-900">5张发票信息AI无法自动识别</h4>
                        <Badge className="bg-red-600 text-white">高优先级</Badge>
                      </div>
                      <p className="text-xs text-red-700 mb-3">需要人工核对供应商信息和金额</p>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        立即处理
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-amber-900">3笔银行流水未能自动匹配</h4>
                        <Badge className="bg-amber-600 text-white">中优先级</Badge>
                      </div>
                      <p className="text-xs text-amber-700 mb-3">请进行手动对账确认</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-amber-600 text-amber-700 hover:bg-amber-50"
                        onClick={() => toast.info('正在打开银行对账界面...')}
                      >
                        开始对账
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-blue-900">1份费用报告存在合规风险</h4>
                        <Badge className="bg-blue-600 text-white">需审核</Badge>
                      </div>
                      <p className="text-xs text-blue-700 mb-3">AI检测到疑似重复报销，置信度: 96%</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-blue-600 text-blue-700 hover:bg-blue-50"
                        onClick={() => toast.info('正在跳转到费用审核页面...')}
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-slate-700">12笔凭证等待复核</h4>
                        <Badge variant="outline">低优先级</Badge>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">AI已预审，准确率: 99.2%</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          toast.info('开始批量复核凭证...');
                          setTimeout(() => {
                            toast.success('12笔凭证已批量通过复核');
                          }, 2000);
                        }}
                      >
                        批量复核
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardDescription>今日已处理</CardDescription>
                <CardTitle className="text-green-600">28笔</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">平均用时: 2.3分钟/笔</p>
                <Progress value={70} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription>本周完成率</CardDescription>
                <CardTitle className="text-blue-600">94%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">较上周提升 +6%</p>
                <Progress value={94} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription>AI自动化率</CardDescription>
                <CardTitle className="text-purple-600">98.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">节省工作时间: 6.5小时/天</p>
                <Progress value={98} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}