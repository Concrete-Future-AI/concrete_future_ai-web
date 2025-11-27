import { useState } from 'react';
import { Search, Sparkles, TrendingUp, TrendingDown, AlertCircle, Filter, Download, RefreshCw, BarChart3, Eye, Brain, Zap, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface DataInsight {
  id: string;
  title: string;
  description: string;
  type: 'correlation' | 'anomaly' | 'trend' | 'pattern';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  visualization: any;
}

const mockDataSets = [
  { id: 'revenue', name: '收入数据', records: 12453, lastUpdated: '2小时前' },
  { id: 'expenses', name: '支出数据', records: 8721, lastUpdated: '1小时前' },
  { id: 'cashflow', name: '现金流数据', records: 3654, lastUpdated: '30分钟前' },
  { id: 'ar', name: '应收账款', records: 1523, lastUpdated: '3小时前' },
  { id: 'ap', name: '应付账款', records: 2341, lastUpdated: '2小时前' },
  { id: 'inventory', name: '库存数据', records: 5432, lastUpdated: '1小时前' }
];

const correlationData = [
  { month: '1月', 营销费用: 45, 收入增长: 12 },
  { month: '2月', 营销费用: 52, 收入增长: 15 },
  { month: '3月', 营销费用: 48, 收入增长: 13 },
  { month: '4月', 营销费用: 65, 收入增长: 21 },
  { month: '5月', 营销费用: 58, 收入增长: 18 },
  { month: '6月', 营销费用: 72, 收入增长: 25 }
];

const anomalyData = [
  { date: '10-15', value: 125, normal: true },
  { date: '10-16', value: 132, normal: true },
  { date: '10-17', value: 128, normal: true },
  { date: '10-18', value: 215, normal: false }, // Anomaly
  { date: '10-19', value: 135, normal: true },
  { date: '10-20', value: 142, normal: true },
  { date: '10-21', value: 138, normal: true }
];

const trendData = [
  { quarter: 'Q1-23', actual: 4200, predicted: 4100, upper: 4300, lower: 3900 },
  { quarter: 'Q2-23', actual: 4800, predicted: 4750, upper: 4950, lower: 4550 },
  { quarter: 'Q3-23', actual: 5200, predicted: 5150, upper: 5350, lower: 4950 },
  { quarter: 'Q4-23', actual: 5800, predicted: 5700, upper: 5900, lower: 5500 },
  { quarter: 'Q1-24', actual: null, predicted: 6400, upper: 6650, lower: 6150 },
  { quarter: 'Q2-24', actual: null, predicted: 7100, upper: 7400, lower: 6800 }
];

export default function AIDataExplorer() {
  const [selectedDataset, setSelectedDataset] = useState('revenue');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [insights, setInsights] = useState<DataInsight[]>([]);
  const [timeRange, setTimeRange] = useState([3]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleAutoAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    toast.info('AI开始自动分析数据...');

    const steps = [
      { progress: 20, message: '加载数据集...' },
      { progress: 40, message: '识别模式和异常...' },
      { progress: 60, message: '分析相关性...' },
      { progress: 80, message: '生成预测模型...' },
      { progress: 100, message: '准备可视化...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(step.progress);
      toast.info(step.message);
    }

    // Generate insights
    const newInsights: DataInsight[] = [
      {
        id: '1',
        title: '发现强相关性：营销费用 ↔ 收入增长',
        description: 'AI识别到营销费用与收入增长呈现强正相关（相关系数0.87）。每增加¥10万营销投入，预计带来¥32万收入增长。',
        type: 'correlation',
        confidence: 87,
        impact: 'high',
        visualization: correlationData
      },
      {
        id: '2',
        title: '异常检测：10月18日支出异常',
        description: '检测到10月18日支出¥215万，超出正常范围67%。经分析，主要由于一笔大额设备采购。',
        type: 'anomaly',
        confidence: 94,
        impact: 'medium',
        visualization: anomalyData
      },
      {
        id: '3',
        title: '趋势预测：季度收入持续增长',
        description: '基于历史数据，预测Q1-Q2收入将持续增长。Q1预计达到¥6,400万（±250万），Q2预计¥7,100万（±300万）。',
        type: 'trend',
        confidence: 92,
        impact: 'high',
        visualization: trendData
      },
      {
        id: '4',
        title: '模式识别：周期性波动',
        description: '识别到明显的季节性模式，Q4通常比Q1高出35%。建议提前规划资源配置。',
        type: 'pattern',
        confidence: 89,
        impact: 'medium',
        visualization: null
      }
    ];

    setInsights(newInsights);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    toast.success('AI分析完成！发现4个关键洞察');
  };

  const handleSmartSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('请输入搜索内容');
      return;
    }

    toast.info('AI智能搜索中...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`找到与"${searchQuery}"相关的23个数据点和5个洞察`);
  };

  const handleExportInsights = () => {
    toast.success('洞察报告已导出！文件包含详细分析和可视化图表');
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'correlation':
        return <Target className="w-5 h-5 text-indigo-600" />;
      case 'anomaly':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-teal-600" />;
      case 'pattern':
        return <BarChart3 className="w-5 h-5 text-purple-600" />;
      default:
        return <Eye className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'correlation':
        return 'bg-indigo-50 border-indigo-200';
      case 'anomaly':
        return 'bg-red-50 border-red-200';
      case 'trend':
        return 'bg-teal-50 border-teal-200';
      case 'pattern':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-teal-600" />
            AI 数据探索器
          </h2>
          <p className="text-gray-600">自动发现隐藏在数据中的模式、趋势和异常</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="border-gray-200"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showAdvanced ? '隐藏' : '高级'}选项
          </Button>
          <Button
            onClick={handleAutoAnalyze}
            disabled={isAnalyzing}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                AI 自动分析
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-teal-200 bg-teal-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw className="w-5 h-5 text-teal-600 animate-spin" />
              <span className="text-sm text-gray-900">AI正在深度分析数据...</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
            <div className="text-xs text-gray-600 mt-2">{analysisProgress}% 完成</div>
          </CardContent>
        </Card>
      )}

      {/* Data Selection & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-gray-200 bg-white shadow-sm lg:col-span-2">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="AI智能搜索：输入任何问题，如'哪些客户的付款最慢'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()}
                  className="pl-10 border-gray-200"
                />
              </div>
              <Button
                onClick={handleSmartSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Brain className="w-4 h-4 mr-2" />
                智能搜索
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <label className="text-sm text-gray-700 mb-2 block">数据集</label>
            <Select value={selectedDataset} onValueChange={setSelectedDataset}>
              <SelectTrigger className="border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockDataSets.map((dataset) => (
                  <SelectItem key={dataset.id} value={dataset.id}>
                    {dataset.name} ({dataset.records.toLocaleString()}条)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">高级分析选项</CardTitle>
            <CardDescription className="text-gray-600">
              自定义AI分析的参数和维度
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-700 mb-3 block">
                分析时间范围：{timeRange[0]}个月
              </label>
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                min={1}
                max={12}
                step={1}
                className="mb-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">置信度阈值</label>
              <Select defaultValue="80">
                <SelectTrigger className="border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="70">70% - 更多结果</SelectItem>
                  <SelectItem value="80">80% - 平衡</SelectItem>
                  <SelectItem value="90">90% - 高可信</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">分析维度</label>
              <Select defaultValue="all">
                <SelectTrigger className="border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部维度</SelectItem>
                  <SelectItem value="trend">仅趋势</SelectItem>
                  <SelectItem value="anomaly">仅异常</SelectItem>
                  <SelectItem value="correlation">仅相关性</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dataset Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {mockDataSets.map((dataset) => (
          <Card
            key={dataset.id}
            className={`border cursor-pointer transition-all ${
              selectedDataset === dataset.id
                ? 'border-teal-500 bg-teal-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-teal-300'
            }`}
            onClick={() => setSelectedDataset(dataset.id)}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">{dataset.name}</p>
                <p className="text-lg text-gray-900">{dataset.records.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{dataset.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-gray-900">AI 发现的洞察</h3>
              <p className="text-sm text-gray-600">基于智能分析识别出的关键发现</p>
            </div>
            <Button
              variant="outline"
              onClick={handleExportInsights}
              className="border-gray-200"
            >
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight) => (
              <Card
                key={insight.id}
                className={`border ${getInsightColor(insight.type)} shadow-sm`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div>
                        <CardTitle className="text-gray-900 mb-2">{insight.title}</CardTitle>
                        <CardDescription className="text-gray-700">
                          {insight.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">AI置信度:</span>
                      <Progress value={insight.confidence} className="w-20 h-2" />
                      <span className="text-xs text-gray-900">{insight.confidence}%</span>
                    </div>
                    <Badge
                      className={`${
                        insight.impact === 'high'
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : insight.impact === 'medium'
                          ? 'bg-amber-100 text-amber-700 border-amber-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      } border`}
                    >
                      {insight.impact === 'high' ? '高影响' : insight.impact === 'medium' ? '中影响' : '低影响'}
                    </Badge>
                  </div>
                </CardHeader>
                {insight.visualization && (
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      {insight.type === 'correlation' && (
                        <ScatterChart>
                          <CartesianGrid strokeDasharray="3 3" stroke="#EAECF0" />
                          <XAxis dataKey="营销费用" name="营销费用" stroke="#6B7280" />
                          <YAxis dataKey="收入增长" name="收入增长" stroke="#6B7280" />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                          <Scatter name="数据点" data={insight.visualization} fill="#6366F1" />
                        </ScatterChart>
                      )}
                      {insight.type === 'anomaly' && (
                        <LineChart data={insight.visualization}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#EAECF0" />
                          <XAxis dataKey="date" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#EF4444"
                            strokeWidth={2}
                            dot={(props: any) => {
                              const { cx, cy, payload } = props;
                              return (
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={payload.normal ? 3 : 6}
                                  fill={payload.normal ? '#0E9384' : '#EF4444'}
                                  stroke="white"
                                  strokeWidth={2}
                                />
                              );
                            }}
                          />
                        </LineChart>
                      )}
                      {insight.type === 'trend' && (
                        <AreaChart data={insight.visualization}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#EAECF0" />
                          <XAxis dataKey="quarter" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="upper"
                            stackId="1"
                            stroke="#D1D5DB"
                            fill="#F3F4F6"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="lower"
                            stackId="1"
                            stroke="#D1D5DB"
                            fill="#F3F4F6"
                            fillOpacity={0.6}
                          />
                          <Line type="monotone" dataKey="actual" stroke="#0E9384" strokeWidth={2} />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="#6366F1"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {insights.length === 0 && !isAnalyzing && (
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-teal-600" />
            </div>
            <h3 className="text-lg text-gray-900 mb-2">准备开始AI数据探索</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              选择一个数据集，然后点击"AI自动分析"按钮。AI将自动识别数据中的模式、异常和趋势。
            </p>
            <Button
              onClick={handleAutoAnalyze}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              开始AI分析
            </Button>
          </CardContent>
        </Card>
      )}

      {/* AI Capabilities Info */}
      <Card className="border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            AI 数据探索能力
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <Target className="w-8 h-8 text-indigo-600 mb-2" />
              <h4 className="text-sm text-gray-900 mb-1">相关性分析</h4>
              <p className="text-xs text-gray-600">
                自动发现变量之间的关联关系
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
              <h4 className="text-sm text-gray-900 mb-1">异常检测</h4>
              <p className="text-xs text-gray-600">
                识别数据中的异常值和离群点
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <TrendingUp className="w-8 h-8 text-teal-600 mb-2" />
              <h4 className="text-sm text-gray-900 mb-1">趋势预测</h4>
              <p className="text-xs text-gray-600">
                基于历史数据预测未来走势
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
              <h4 className="text-sm text-gray-900 mb-1">模式识别</h4>
              <p className="text-xs text-gray-600">
                发现周期性和季节性规律
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
