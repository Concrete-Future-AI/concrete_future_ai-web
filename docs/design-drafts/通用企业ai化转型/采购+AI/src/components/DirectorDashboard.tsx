import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, TrendingDown, TrendingUp, Users, DollarSign, Award, Globe, Download, Filter, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import AISmartPredictor from './AISmartPredictor';
import AIRecommendationEngine from './AIRecommendationEngine';
import AIMonitoringCenter from './AIMonitoringCenter';
import { usePermissions } from '../hooks/usePermissions';
import { InlinePermissionGuard } from './PermissionGuard';

const categoryData = [
  { name: 'IT设备', value: 3200000, color: '#3B82F6' },
  { name: '市场服务', value: 2100000, color: '#10B981' },
  { name: '办公用品', value: 800000, color: '#F59E0B' },
  { name: '物流运输', value: 1500000, color: '#8B5CF6' },
  { name: '其他', value: 900000, color: '#6B7280' },
];

const budgetTrend = [
  { month: '1月', actual: 720, budget: 800, forecast: 750 },
  { month: '2月', actual: 680, budget: 800, forecast: 720 },
  { month: '3月', actual: 850, budget: 800, forecast: 880 },
  { month: '4月', actual: 780, budget: 800, forecast: 800 },
  { month: '5月', actual: 920, budget: 800, forecast: 950 },
  { month: '6月', actual: 0, budget: 800, forecast: 920 },
];

const teamPerformance = [
  { stage: '待审批', count: 45, avgDays: 1.2 },
  { stage: '寻源中', count: 32, avgDays: 3.5 },
  { stage: '谈判中', count: 18, avgDays: 5.2 },
  { stage: '已完成', count: 156, avgDays: 0.5 },
];

const suppliers = [
  { name: '华为技术有限公司', location: '深圳', risk: 15, status: 'low', issue: null },
  { name: '阿里云计算', location: '杭州', risk: 22, status: 'medium', issue: null },
  { name: 'ABC物流', location: '上海', risk: 78, status: 'high', issue: '所在地区发生罢工' },
  { name: '优质印刷', location: '北京', risk: 45, status: 'medium', issue: 'ESG评级下降' },
];

export default function DirectorDashboard() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
    toast.success(`已筛选：${categoryName}`, {
      description: '数据已更新为该品类的详细信息'
    });
  };

  const handleExportReport = () => {
    toast.success('报告导出中', {
      description: '正在生成PDF报告，请稍候...'
    });
    setTimeout(() => {
      toast.success('报告已导出', {
        description: '采购分析报告.pdf 已保存至下载文件夹'
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg">战略决策驾驶舱</h3>
            <Badge className="ai-gradient text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              AI驱动
            </Badge>
          </div>
          <p className="text-sm text-gray-600">实时监控采购全局数据 · AI智能分析与预测</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* AI智能预测卡片 - 突出位置 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AISmartPredictor />
        </div>
        <div>
          <AIMonitoringCenter compact />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="elevation-2 border-0 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">已实现降本总额</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">¥2.8M</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              环比增长 12.3%
            </p>
          </CardContent>
        </Card>

        <Card className="elevation-2 border-0 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">供应商多样性指标</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">87%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              同比提升 5.2%
            </p>
          </CardContent>
        </Card>

        <Card className="elevation-2 border-0 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">高风险供应商数量</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">3</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              较上月增加 1 家
            </p>
          </CardContent>
        </Card>

        <Card className="elevation-2 border-0 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">平均采购周期</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl">8.5天</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              缩短 2.1 天
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Spending Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="elevation-2 border-0 hover-lift">
          <CardHeader>
            <CardTitle>按品类支出分布</CardTitle>
            <CardDescription>点击查看详细数据</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={(data) => handleCategoryClick(data.name)}
                  style={{ cursor: 'pointer' }}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      opacity={selectedCategory === null || selectedCategory === entry.name ? 1 : 0.3}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `¥${(value / 1000000).toFixed(1)}M`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category) => (
                <div 
                  key={category.name} 
                  onClick={() => handleCategoryClick(category.name)}
                  className={`flex items-center justify-between text-sm p-2 rounded cursor-pointer transition-all ${
                    selectedCategory === category.name 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span>{category.name}</span>
                  </div>
                  <span className="text-gray-600">¥{(category.value / 1000000).toFixed(1)}M</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-2 border-0 hover-lift">
          <CardHeader>
            <CardTitle>实际支出 vs. 预算</CardTitle>
            <CardDescription>AI预测未来支出趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={budgetTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `¥${value}万`} />
                <Legend />
                <Area type="monotone" dataKey="budget" stroke="#94A3B8" fill="#CBD5E1" name="预算" />
                <Area type="monotone" dataKey="actual" stroke="#3B82F6" fill="#93C5FD" name="实际支出" />
                <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeDasharray="5 5" name="AI预测" />
              </AreaChart>
            </ResponsiveContainer>
            <Alert className="mt-4 border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                AI预警：预计6月支出将超预算15%，建议优化IT设备采购计划
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Supply Chain Risk & Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="elevation-2 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              供应链风险雷达
            </CardTitle>
            <CardDescription>实时监控核心供应商风险状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map((supplier, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p>{supplier.name}</p>
                      <p className="text-sm text-gray-500">{supplier.location}</p>
                    </div>
                    <Badge 
                      variant={supplier.status === 'low' ? 'default' : supplier.status === 'medium' ? 'secondary' : 'destructive'}
                      className={
                        supplier.status === 'low' ? 'bg-green-100 text-green-800' : 
                        supplier.status === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }
                    >
                      风险分数: {supplier.risk}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <Progress 
                      value={supplier.risk} 
                      className={`h-2 ${
                        supplier.status === 'low' ? '[&>div]:bg-green-500' : 
                        supplier.status === 'medium' ? '[&>div]:bg-yellow-500' : 
                        '[&>div]:bg-red-500'
                      }`}
                    />
                    {supplier.issue && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                        <AlertTriangle className="h-3 w-3" />
                        {supplier.issue}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-2 border-0">
          <CardHeader>
            <CardTitle>团队效能仪表盘</CardTitle>
            <CardDescription>采购请求处理漏斗分析</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teamPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" name="数量" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {teamPerformance.map((stage, idx) => (
                <div key={idx} className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-600">{stage.stage}</p>
                  <p className="text-xl">{stage.count}个</p>
                  <p className="text-xs text-gray-500">平均 {stage.avgDays} 天</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI智能推荐引擎 */}
      <AIRecommendationEngine context="dashboard" maxItems={3} />
    </div>
  );
}