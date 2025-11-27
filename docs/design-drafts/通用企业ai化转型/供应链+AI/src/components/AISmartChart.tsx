import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Brain, TrendingUp, Lightbulb, Zap, HelpCircle, Target, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface DataPoint {
  name: string;
  value: number;
  predicted?: number;
  forecast?: number;
  [key: string]: any;
}

interface AIInsight {
  type: 'trend' | 'anomaly' | 'forecast' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
}

interface AISmartChartProps {
  data: DataPoint[];
  type: 'line' | 'bar' | 'area';
  title: string;
  dataKey: string;
  showPrediction?: boolean;
  showForecast?: boolean;
  aiEnabled?: boolean;
  onDataPointClick?: (point: DataPoint) => void;
}

export default function AISmartChart({
  data,
  type = 'line',
  title,
  dataKey,
  showPrediction = false,
  showForecast = false,
  aiEnabled = true,
  onDataPointClick
}: AISmartChartProps) {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePointClick = (point: any) => {
    setSelectedPoint(point);
    onDataPointClick?.(point);
    generateInsights(point);
  };

  const generateInsights = async (point: DataPoint) => {
    setIsAnalyzing(true);
    setShowAIPanel(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newInsights: AIInsight[] = [];

    // Trend analysis
    const index = data.findIndex(d => d.name === point.name);
    if (index > 0) {
      const prevValue = data[index - 1].value;
      const change = ((point.value - prevValue) / prevValue) * 100;
      
      if (Math.abs(change) > 10) {
        newInsights.push({
          type: 'trend',
          title: change > 0 ? '增长趋势明显' : '下降趋势明显',
          description: `${point.name}相比前期${Math.abs(change).toFixed(1)}%${change > 0 ? '增长' : '下降'}。${
            change > 15 ? 'AI检测到这是一个显著变化，建议关注。' : '这是正常波动范围。'
          }`,
          confidence: 85 + Math.random() * 10,
          actionable: Math.abs(change) > 15
        });
      }
    }

    // Anomaly detection
    const avg = data.reduce((sum, d) => sum + d.value, 0) / data.length;
    const stdDev = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.value - avg, 2), 0) / data.length);
    const zScore = Math.abs((point.value - avg) / stdDev);

    if (zScore > 2) {
      newInsights.push({
        type: 'anomaly',
        title: '检测到异常值',
        description: `${point.name}的数值(${point.value})偏离平均水平${zScore.toFixed(1)}个标准差，可能存在异常情况。建议核查数据来源和业务背景。`,
        confidence: 90,
        actionable: true
      });
    }

    // Forecast insight
    if (showForecast && point.forecast) {
      const forecastAccuracy = Math.abs(((point.value - point.forecast) / point.forecast) * 100);
      newInsights.push({
        type: 'forecast',
        title: forecastAccuracy < 10 ? '预测准确' : '预测偏差较大',
        description: `AI预测值为${point.forecast}，实际值为${point.value}，偏差${forecastAccuracy.toFixed(1)}%。${
          forecastAccuracy < 10
            ? '模型表现优秀。'
            : '建议检查是否有外部因素影响，并考虑重新训练模型。'
        }`,
        confidence: 88,
        actionable: forecastAccuracy >= 10
      });
    }

    // Recommendations
    if (point.value > avg * 1.2) {
      newInsights.push({
        type: 'recommendation',
        title: '高峰期优化建议',
        description: '当前数值处于高峰期，建议：1) 确保充足库存或资源 2) 预警相关团队准备应对 3) 监控服务质量指标',
        confidence: 82,
        actionable: true
      });
    } else if (point.value < avg * 0.8) {
      newInsights.push({
        type: 'recommendation',
        title: '低谷期优化建议',
        description: '当前数值处于低谷期，建议：1) 评估是否需要促销或营销活动 2) 优化资源配置降低成本 3) 分析市场原因',
        confidence: 80,
        actionable: true
      });
    }

    setInsights(newInsights);
    setIsAnalyzing(false);

    if (newInsights.length > 0) {
      toast.success('AI分析完成', {
        description: `生成${newInsights.length}条洞察`
      });
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-sm text-slate-300 mb-2">{payload[0].payload.name}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-400">实际值:</span>
            <span className="text-cyan-400">{payload[0].value}</span>
          </div>
          {payload[0].payload.predicted && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">预测值:</span>
              <span className="text-purple-400">{payload[0].payload.predicted}</span>
            </div>
          )}
          {payload[0].payload.forecast && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">趋势:</span>
              <span className="text-green-400">{payload[0].payload.forecast}</span>
            </div>
          )}
        </div>
        {aiEnabled && (
          <Button
            size="sm"
            variant="ghost"
            className="w-full mt-2 text-xs"
            onClick={() => handlePointClick(payload[0].payload)}
          >
            <Brain className="w-3 h-3 mr-1" />
            AI分析
          </Button>
        )}
      </div>
    );
  };

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'trend':
        return TrendingUp;
      case 'anomaly':
        return AlertCircle;
      case 'forecast':
        return Target;
      case 'recommendation':
        return Lightbulb;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'trend':
        return 'text-blue-400';
      case 'anomaly':
        return 'text-red-400';
      case 'forecast':
        return 'text-purple-400';
      case 'recommendation':
        return 'text-yellow-400';
    }
  };

  const renderChart = () => {
    const commonProps = {
      data,
      onClick: aiEnabled ? handlePointClick : undefined,
      style: { cursor: aiEnabled ? 'pointer' : 'default' }
    };

    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 4 }}
                activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
              />
              {showPrediction && (
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#a855f7"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#a855f7', r: 3 }}
                />
              )}
              {showForecast && (
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#22c55e"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={dataKey} fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#06b6d4"
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2">
            {title}
            {aiEnabled && (
              <Badge variant="outline" className="gap-1 text-xs">
                <Brain className="w-3 h-3" />
                AI增强
              </Badge>
            )}
          </h3>
          <div className="flex items-center gap-2">
            {selectedPoint && (
              <Badge variant="secondary" className="text-xs">
                已选: {selectedPoint.name}
              </Badge>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAIPanel(!showAIPanel)}
            >
              <Brain className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {renderChart()}

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
            <span className="text-slate-400">实际值</span>
          </div>
          {showPrediction && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full border-2 border-dashed"></div>
              <span className="text-slate-400">AI预测</span>
            </div>
          )}
          {showForecast && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-dashed"></div>
              <span className="text-slate-400">趋势预测</span>
            </div>
          )}
          {aiEnabled && (
            <div className="flex items-center gap-2 ml-auto">
              <HelpCircle className="w-3 h-3 text-slate-500" />
              <span className="text-slate-500">点击数据点查看AI分析</span>
            </div>
          )}
        </div>
      </Card>

      {/* AI Insights Panel */}
      <AnimatePresence>
        {showAIPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI智能洞察
                </h4>
                {isAnalyzing && (
                  <div className="flex items-center gap-2 text-sm text-purple-400">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                    <span>AI分析中...</span>
                  </div>
                )}
              </div>

              {insights.length === 0 && !isAnalyzing && (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">
                    点击图表中的数据点，AI将为您生成深度洞察
                  </p>
                </div>
              )}

              {insights.length > 0 && (
                <div className="space-y-3">
                  {selectedPoint && (
                    <div className="p-3 bg-slate-800/50 rounded-lg mb-4">
                      <p className="text-sm text-slate-400 mb-1">分析目标</p>
                      <p className="text-lg">{selectedPoint.name}</p>
                      <p className="text-sm text-cyan-400">值: {selectedPoint.value}</p>
                    </div>
                  )}

                  {insights.map((insight, index) => {
                    const Icon = getInsightIcon(insight.type);
                    const color = getInsightColor(insight.type);

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h5 className="text-sm">{insight.title}</h5>
                              <Badge variant="outline" className="text-xs shrink-0">
                                {insight.confidence.toFixed(0)}%
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">{insight.description}</p>
                            {insight.actionable && (
                              <Badge variant="secondary" className="text-xs gap-1">
                                <Zap className="w-3 h-3" />
                                可执行建议
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
