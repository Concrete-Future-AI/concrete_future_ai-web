import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Activity, Cpu, DollarSign, Shield, TrendingUp, AlertTriangle, Users, Database, ChevronRight, Download, Filter, Calendar, RefreshCw } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import { ResourceMonitor } from './ResourceMonitor';
import { IntelligentInsights } from './IntelligentInsights';

const monoFont = "'JetBrains Mono', 'SF Mono', Monaco, Consolas, monospace";
const textStyles = {
  label: "text-[12px] font-medium text-slate-400 uppercase tracking-wide",
  value: "text-2xl font-semibold text-white",
  subtitle: "text-[12px] text-slate-400",
  cardTitle: "text-[15px] font-semibold text-white",
};

const initialGpuUtilizationData = [
  { time: '00:00', utilization: 45 },
  { time: '04:00', utilization: 38 },
  { time: '08:00', utilization: 72 },
  { time: '12:00', utilization: 85 },
  { time: '16:00', utilization: 91 },
  { time: '20:00', utilization: 68 },
  { time: '23:59', utilization: 52 },
];

const costAllocationData = [
  { name: '研发中心', value: 3850, color: '#3b82f6' },
  { name: '产品部', value: 2340, color: '#8b5cf6' },
  { name: '数据分析部', value: 1890, color: '#06b6d4' },
  { name: '客服中心', value: 1240, color: '#10b981' },
  { name: '营销部', value: 680, color: '#f59e0b' },
];

const modelCallsData = [
  { model: 'Llama-3-70B', calls: 245680 },
  { model: 'ChatGLM3-6B', calls: 189340 },
  { model: 'Qwen-14B', calls: 156720 },
  { model: 'CodeLlama-13B', calls: 98450 },
  { model: 'Custom-Finance', calls: 67890 },
];

const auditLogs = [
  { time: '14:35:22', user: '管理员-张伟', action: '部署了新模型', detail: 'Llama-3-8B-Instruct', level: 'info' },
  { time: '14:28:15', user: '开发者-李娜', action: '生成了API Key', detail: 'sk-prod-a7f8...9d2c (高权限)', level: 'warning' },
  { time: '14:22:08', user: '系统', action: '完成知识库索引', detail: 'Confluence-产品文档 (18,492 chunks)', level: 'success' },
  { time: '14:15:33', user: '管理员-王强', action: '更新了DLP规则', detail: '新增敏感词过滤规则', level: 'info' },
  { time: '14:08:41', user: '开发者-赵敏', action: '调用量超过阈值', detail: 'API调用达到月度配额80%', level: 'warning' },
  { time: '13:55:17', user: '系统', action: '安全扫描完成', detail: '0个高危事件，2个中危提示', level: 'success' },
  { time: '13:42:29', user: '管理员-张伟', action: '创建了新角色', detail: 'HR-应用开发者', level: 'info' },
  { time: '13:30:05', user: '系统', action: 'GPU集群扩容', detail: '新增8x H100 GPU节点', level: 'success' },
];

const tokenUsageData = [
  { date: '10-18', tokens: 2.8 },
  { date: '10-19', tokens: 3.1 },
  { date: '10-20', tokens: 2.9 },
  { date: '10-21', tokens: 3.4 },
  { date: '10-22', tokens: 3.0 },
  { date: '10-23', tokens: 3.5 },
  { date: '10-24', tokens: 3.2 },
];

const performanceMetrics = [
  { metric: 'P95 延迟', value: '1.8s', change: '-12%', trend: 'down' },
  { metric: 'P99 延迟', value: '3.2s', change: '-8%', trend: 'down' },
  { metric: '成功率', value: '99.8%', change: '+0.2%', trend: 'up' },
  { metric: '错误率', value: '0.2%', change: '-0.1%', trend: 'down' },
];

export function DashboardOverview() {
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [gpuUtilizationData, setGpuUtilizationData] = useState(initialGpuUtilizationData);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    // Simulate fetching new data
    const fetchData = () => {
      const newData = initialGpuUtilizationData.map(item => ({
        ...item,
        utilization: Math.random() * 100
      }));
      setGpuUtilizationData(newData);
    };

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">平台概览</h2>
          <p className="text-[13px] text-slate-400/80 mt-1">实时监控平台运行状态与资源使用情况</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 border-slate-700 bg-slate-800 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-700 bg-slate-800">
              <SelectItem value="1h">过去1小时</SelectItem>
              <SelectItem value="24h">过去24小时</SelectItem>
              <SelectItem value="7d">过去7天</SelectItem>
              <SelectItem value="30d">过去30天</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            刷新
          </Button>
          <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">GPU集群总利用率</div>
                <div className="mt-2 text-3xl font-bold text-white tracking-tight" style={{ fontFamily: monoFont }}>78.4%</div>
                <div className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-green-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+5.2% 较昨日</span>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Cpu className="h-7 w-7 text-white" />
              </div>
            </div>
            <Progress value={78.4} className="mt-4 bg-slate-700/50 h-2" />
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <span className="text-slate-400 font-medium">8x H100 集群</span>
              <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">模型调用总量</div>
                <div className="mt-2 text-3xl font-bold text-white tracking-tight" style={{ fontFamily: monoFont }}>758.1K</div>
                <div className="mt-2 text-[12px] text-slate-400" style={{ fontFamily: monoFont }}>Tokens/Day: 3.2B</div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Activity className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-[12px] font-medium text-green-400">+12.8% 较上周</div>
              <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">活跃API Key数量</div>
                <div className="mt-2 text-3xl font-bold text-white tracking-tight" style={{ fontFamily: monoFont }}>142</div>
                <div className="mt-2 text-[12px] text-slate-400">总用户数: <span style={{ fontFamily: monoFont }}>1,847</span></div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-[12px] text-slate-400 font-medium">8个新Key (今日)</div>
              <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[12px] font-medium text-slate-400 uppercase tracking-wide">安全事件</div>
                <div className="mt-2 text-3xl font-bold text-green-400 tracking-tight" style={{ fontFamily: monoFont }}>0</div>
                <div className="mt-2 text-[12px] text-slate-400">高危事件 (本月)</div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-[12px] font-medium text-green-400">安全状态良好</div>
              <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-green-400 transition-colors" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[15px] font-semibold text-white">GPU利用率趋势</div>
              <div className="text-[11px] text-slate-400/80 mt-0.5">过去24小时 · 平均利用率 <span style={{ fontFamily: monoFont }}>78.4%</span></div>
            </div>
            <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-semibold">
              实时
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={gpuUtilizationData}>
              <defs>
                <linearGradient id="colorUtilization" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="utilization" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUtilization)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 p-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[15px] font-semibold text-white">成本中心分布</div>
              <div className="text-[11px] text-slate-400/80 mt-0.5">按部门/项目 (本月) · 总计 <span style={{ fontFamily: monoFont }}>¥10,000</span></div>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={costAllocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {costAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                formatter={(value: number) => `¥${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {costAllocationData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="text-xs text-slate-400">{item.name}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Model Calls and Audit Logs */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-white">模型调用排行</div>
              <div className="text-xs text-slate-400">过去7天总调用量 • Top 5</div>
            </div>
            <Select defaultValue="7d">
              <SelectTrigger className="w-28 border-slate-700 bg-slate-800 text-white text-xs h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-slate-700 bg-slate-800">
                <SelectItem value="24h">24小时</SelectItem>
                <SelectItem value="7d">7天</SelectItem>
                <SelectItem value="30d">30天</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={modelCallsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis dataKey="model" type="category" stroke="#64748b" style={{ fontSize: '12px' }} width={120} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar dataKey="calls" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-white">审计日志流</div>
              <div className="text-xs text-slate-400">实时关键操作记录 • 自动刷新</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs">
                <div className="mr-1 h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                实时
              </Badge>
              <Button variant="ghost" size="sm" className="h-7 text-slate-400 hover:text-white">
                <Filter className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[280px]">
            <div className="space-y-3">
              {auditLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/30 p-3">
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${
                    log.level === 'success' ? 'bg-green-400' :
                    log.level === 'warning' ? 'bg-amber-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{log.time}</span>
                      <span>•</span>
                      <span className="text-slate-300">{log.user}</span>
                    </div>
                    <div className="text-sm text-white">{log.action}</div>
                    <div className="font-mono text-xs text-slate-500">{log.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Performance Metrics & Token Usage */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
          <div className="mb-4">
            <div className="text-white">性能指标</div>
            <div className="text-xs text-slate-400">实时响应时间与成功率监控</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {performanceMetrics.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                <div className="text-xs text-slate-400">{item.metric}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl text-white">{item.value}</span>
                  <span className={`text-xs ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
          <div className="mb-4">
            <div className="text-white">Token使用趋势</div>
            <div className="text-xs text-slate-400">过去7天每日Token消耗 (十亿)</div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={tokenUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="tokens" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Resource Monitor */}
      <ResourceMonitor />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-4 hover:shadow-lg hover:shadow-orange-500/10 transition-all">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-400">知识库总量</div>
              <div className="text-lg text-white">23 个知识源</div>
              <div className="text-xs text-slate-500">2.8M 向量化文档片段</div>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-4 hover:shadow-lg hover:shadow-pink-500/10 transition-all">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/20">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-400">部署模型总数</div>
              <div className="text-lg text-white">18 个基础模型</div>
              <div className="text-xs text-slate-500">12 个微调模型</div>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-4 hover:shadow-lg hover:shadow-teal-500/10 transition-all">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-400">本月总成本</div>
              <div className="text-lg text-white">¥124,580</div>
              <div className="text-xs text-green-400">预算使用率: 62%</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Intelligent Insights */}
      <IntelligentInsights />
    </div>
  );
}