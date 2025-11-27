import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, TrendingDown, Package, AlertTriangle, CheckCircle2, Sparkles, Calendar, BarChart3, Target, Zap } from 'lucide-react';
import { Progress } from './ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface ForecastData {
  period: string;
  historical: number | null;
  forecast: number;
  lower: number;
  upper: number;
  confidence: number;
}

interface InventoryRecommendation {
  item: string;
  current: number;
  optimal: number;
  action: 'increase' | 'decrease' | 'maintain';
  reason: string;
  savings: string;
}

interface AIDemandForecastProps {
  category?: string;
}

export default function AIDemandForecast({ category = 'all' }: AIDemandForecastProps) {
  const [timeRange, setTimeRange] = useState('3months');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [isForecasting, setIsForecasting] = useState(false);
  const [activeTab, setActiveTab] = useState<'forecast' | 'inventory'>('forecast');

  // 生成预测数据
  const generateForecastData = (): ForecastData[] => {
    const data: ForecastData[] = [];
    const baseValue = 120;
    const trend = 1.05; // 5% 增长趋势
    
    // 历史数据（过去6个月）
    for (let i = -6; i < 0; i++) {
      const value = Math.round(baseValue * Math.pow(trend, i) * (0.9 + Math.random() * 0.2));
      data.push({
        period: `${Math.abs(i)}月前`,
        historical: value,
        forecast: value,
        lower: Math.round(value * 0.9),
        upper: Math.round(value * 1.1),
        confidence: 100,
      });
    }
    
    // 预测数据（未来3-6个月）
    const forecastMonths = timeRange === '3months' ? 3 : 6;
    for (let i = 1; i <= forecastMonths; i++) {
      const forecastValue = Math.round(baseValue * Math.pow(trend, i) * (0.95 + Math.random() * 0.1));
      data.push({
        period: `${i}月后`,
        historical: null,
        forecast: forecastValue,
        lower: Math.round(forecastValue * 0.85),
        upper: Math.round(forecastValue * 1.15),
        confidence: Math.max(70, 95 - i * 3),
      });
    }
    
    return data;
  };

  const [forecastData, setForecastData] = useState<ForecastData[]>(generateForecastData());

  // 库存优化建议
  const inventoryRecommendations: InventoryRecommendation[] = [
    {
      item: 'IT设备 - 笔记本电脑',
      current: 45,
      optimal: 60,
      action: 'increase',
      reason: 'AI预测需求将增长35%，建议提前备货',
      savings: '避免缺货损失 ¥120,000'
    },
    {
      item: '办公用品 - 打印纸',
      current: 200,
      optimal: 150,
      action: 'decrease',
      reason: '历史数据显示使用量下降，减少库存可节省仓储成本',
      savings: '节省仓储费用 ¥8,000/月'
    },
    {
      item: '市场物料 - 宣传册',
      current: 500,
      optimal: 520,
      action: 'maintain',
      reason: '当前库存水平合理，保持现状即可',
      savings: '优化配置'
    },
    {
      item: 'IT配件 - 鼠标键盘',
      current: 30,
      optimal: 50,
      action: 'increase',
      reason: '季节性需求高峰将至，建议增加备货',
      savings: '避免应急采购溢价 ¥15,000'
    },
  ];

  const handleReforecast = () => {
    setIsForecasting(true);
    setTimeout(() => {
      setForecastData(generateForecastData());
      setIsForecasting(false);
      toast.success('AI预测已更新', {
        description: `基于最新数据重新生成${timeRange === '3months' ? '3' : '6'}个月预测`
      });
    }, 2000);
  };

  const handleOptimize = (item: string) => {
    toast.success('库存优化建议已应用', {
      description: `${item} 的库存优化建议已加入采购计划`
    });
  };

  // 需求趋势分析数据
  const trendData = [
    { category: 'IT设备', trend: 35, color: '#8B5CF6' },
    { category: '办公用品', trend: -12, color: '#10B981' },
    { category: '市场物料', trend: 8, color: '#F59E0B' },
    { category: '物流服务', trend: 18, color: '#3B82F6' },
  ];

  // 季节性分析数据
  const seasonalData = [
    { month: '1月', demand: 80, avg: 100 },
    { month: '2月', demand: 75, avg: 100 },
    { month: '3月', demand: 110, avg: 100 },
    { month: '4月', demand: 105, avg: 100 },
    { month: '5月', demand: 120, avg: 100 },
    { month: '6月', demand: 130, avg: 100 },
    { month: '7月', demand: 95, avg: 100 },
    { month: '8月', demand: 90, avg: 100 },
    { month: '9月', demand: 125, avg: 100 },
    { month: '10月', demand: 135, avg: 100 },
    { month: '11月', demand: 115, avg: 100 },
    { month: '12月', demand: 140, avg: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl ai-gradient flex items-center justify-center ai-glow">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">AI需求预测与库存优化</h3>
            <p className="text-sm text-muted-foreground">智能预测需求趋势，优化库存配置</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部品类</SelectItem>
              <SelectItem value="it">IT设备</SelectItem>
              <SelectItem value="office">办公用品</SelectItem>
              <SelectItem value="marketing">市场物料</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">未来3个月</SelectItem>
              <SelectItem value="6months">未来6个月</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="ai-gradient text-white border-0"
            onClick={handleReforecast}
            disabled={isForecasting}
          >
            {isForecasting ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                预测中...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                重新预测
              </>
            )}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="elevation-2 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">预测准确率</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">93.5%</div>
            <Progress value={93.5} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="elevation-2 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">库存周转率</span>
              <Package className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">8.2x</div>
            <p className="text-xs text-green-600 mt-1">↑ 提升 12%</p>
          </CardContent>
        </Card>

        <Card className="elevation-2 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">缺货风险</span>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">2.1%</div>
            <p className="text-xs text-green-600 mt-1">↓ 降低 45%</p>
          </CardContent>
        </Card>

        <Card className="elevation-2 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">优化节省</span>
              <Target className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">¥85万</div>
            <p className="text-xs text-green-600 mt-1">本月节省</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="grid grid-cols-4 gap-2 p-1 bg-muted rounded-lg">
        <Button
          variant={activeTab === 'forecast' ? 'default' : 'ghost'}
          className="w-full"
          onClick={() => setActiveTab('forecast')}
        >
          <Calendar className="h-4 w-4 mr-2" />
          需求预测
        </Button>
        <Button
          variant={activeTab === 'inventory' ? 'default' : 'ghost'}
          className="w-full"
          onClick={() => setActiveTab('inventory')}
        >
          <Package className="h-4 w-4 mr-2" />
          库存优化
        </Button>
      </div>

      {/* Forecast Tab */}
      {activeTab === 'forecast' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Main Forecast Chart */}
          <Card className="elevation-2 border-0">
            <CardHeader>
              <CardTitle className="text-base">需求预测趋势</CardTitle>
              <CardDescription>
                灰色区域为预测置信区间，置信度随时间递减
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={forecastData}>
                  <defs>
                    <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--ai-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--ai-primary)" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  
                  {/* Confidence Area */}
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stroke="none"
                    fill="url(#confidenceGradient)"
                    name="置信区间上限"
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stroke="none"
                    fill="url(#confidenceGradient)"
                    name="置信区间下限"
                  />
                  
                  {/* Historical Line */}
                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="var(--md-primary)"
                    strokeWidth={2}
                    name="历史数据"
                    dot={{ fill: 'var(--md-primary)', r: 4 }}
                  />
                  
                  {/* Forecast Line */}
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="var(--ai-primary)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="AI预测"
                    dot={{ fill: 'var(--ai-primary)', r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>

              {/* AI Insights */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 surface-variant rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="font-medium text-sm">关键洞察</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>整体需求呈上升趋势，预计增长 18-22%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>3个月内需求较为稳定，可信度95%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>第5-6月存在季节性波动风险</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 surface-variant rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-sm">行动建议</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-medium flex-shrink-0">1.</span>
                      <span>建议在第2个月增加采购量15-20%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-medium flex-shrink-0">2.</span>
                      <span>与核心供应商签订长期框架协议锁定价格</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-medium flex-shrink-0">3.</span>
                      <span>启动备选供应商评估应对峰值需求</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Category Trends */}
            <Card className="elevation-2 border-0">
              <CardHeader>
                <CardTitle className="text-base">品类需求趋势</CardTitle>
                <CardDescription>各品类预计增长率</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendData.map((item, index) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm flex-1">{item.category}</span>
                    <div className="flex items-center gap-2">
                      {item.trend > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${item.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.trend > 0 ? '+' : ''}{item.trend}%
                      </span>
                    </div>
                    <div className="w-24">
                      <Progress
                        value={Math.abs(item.trend)}
                        className="h-1.5"
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Seasonal Pattern */}
            <Card className="elevation-2 border-0">
              <CardHeader>
                <CardTitle className="text-base">季节性规律分析</CardTitle>
                <CardDescription>历史月度需求波动</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="demand" fill="var(--ai-primary)" />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="var(--md-error)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {inventoryRecommendations.map((rec, index) => (
            <motion.div
              key={rec.item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="elevation-2 hover-lift border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        rec.action === 'increase' ? 'bg-blue-500/10' :
                        rec.action === 'decrease' ? 'bg-orange-500/10' :
                        'bg-green-500/10'
                      }`}>
                        {rec.action === 'increase' && <TrendingUp className="h-6 w-6 text-blue-500" />}
                        {rec.action === 'decrease' && <TrendingDown className="h-6 w-6 text-orange-500" />}
                        {rec.action === 'maintain' && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{rec.item}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                        </div>
                        <Badge className={
                          rec.action === 'increase' ? 'bg-blue-500/10 text-blue-700 border-blue-200' :
                          rec.action === 'decrease' ? 'bg-orange-500/10 text-orange-700 border-orange-200' :
                          'bg-green-500/10 text-green-700 border-green-200'
                        }>
                          {rec.action === 'increase' && '建议增加'}
                          {rec.action === 'decrease' && '建议减少'}
                          {rec.action === 'maintain' && '保持现状'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">当前库存</span>
                          <div className="text-lg font-medium">{rec.current} 件</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">AI建议</span>
                          <div className="text-lg font-medium text-purple-600">{rec.optimal} 件</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">预期收益</span>
                          <div className="text-lg font-medium text-green-600">{rec.savings}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="ai-gradient text-white border-0"
                          onClick={() => handleOptimize(rec.item)}
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          应用优化
                        </Button>
                        <Button size="sm" variant="outline">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
