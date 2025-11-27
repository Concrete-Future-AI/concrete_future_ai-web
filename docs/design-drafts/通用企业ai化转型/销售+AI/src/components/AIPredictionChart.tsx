import { useState } from 'react';
import { TrendingUp, Brain, Zap, Target, Calendar, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface AIPredictionChartProps {
  title?: string;
  type?: 'revenue' | 'deals' | 'conversion';
  timeRange?: 'week' | 'month' | 'quarter';
}

export function AIPredictionChart({ 
  title = 'AI销售预测', 
  type = 'revenue',
  timeRange = 'month' 
}: AIPredictionChartProps) {
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 生成模拟数据
  const generateData = () => {
    const labels = timeRange === 'week' 
      ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      : timeRange === 'month'
      ? ['第1周', '第2周', '第3周', '第4周']
      : ['Q1', 'Q2', 'Q3', 'Q4'];

    const historicalData = labels.slice(0, -3).map((label, idx) => {
      const base = 300 + idx * 50;
      return {
        name: label,
        actual: base + Math.random() * 100,
        predicted: null,
        upperBound: null,
        lowerBound: null,
        isHistorical: true
      };
    });

    const futureData = labels.slice(-3).map((label, idx) => {
      const base = 500 + idx * 60;
      const predicted = base + Math.random() * 80;
      return {
        name: label,
        actual: null,
        predicted: predicted,
        upperBound: predicted * 1.15,
        lowerBound: predicted * 0.85,
        isHistorical: false
      };
    });

    // 添加过渡点
    const lastHistorical = historicalData[historicalData.length - 1];
    const firstFuture = futureData[0];
    
    const transitionPoint = {
      name: firstFuture.name,
      actual: lastHistorical.actual,
      predicted: firstFuture.predicted,
      upperBound: firstFuture.upperBound,
      lowerBound: firstFuture.lowerBound,
      isHistorical: true
    };

    return [...historicalData, transitionPoint, ...futureData.slice(1)];
  };

  const [data, setData] = useState(generateData());

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(generateData());
      setIsRefreshing(false);
      toast.success('预测已更新', { icon: '🤖' });
    }, 1500);
  };

  // 计算预测准确率
  const accuracy = 92;
  const confidence = 87;

  // 计算预测增长
  const lastActual = data.filter(d => d.actual !== null).slice(-1)[0]?.actual || 0;
  const lastPredicted = data.filter(d => d.predicted !== null).slice(-1)[0]?.predicted || 0;
  const growth = ((lastPredicted - lastActual) / lastActual * 100).toFixed(1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-4 shadow-xl border border-border rounded-xl">
          <p className="font-semibold text-sm mb-2">{data.name}</p>
          {data.actual !== null && (
            <div className="flex items-center gap-2 text-xs mb-1">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">实际值:</span>
              <span className="font-semibold">¥{data.actual.toFixed(0)}万</span>
            </div>
          )}
          {data.predicted !== null && (
            <>
              <div className="flex items-center gap-2 text-xs mb-1">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-muted-foreground">AI预测:</span>
                <span className="font-semibold">¥{data.predicted.toFixed(0)}万</span>
              </div>
              {showConfidenceInterval && (
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-1">置信区间 (87%):</div>
                  <div className="flex items-center justify-between text-xs">
                    <span>¥{data.lowerBound.toFixed(0)}万</span>
                    <span className="text-muted-foreground">~</span>
                    <span>¥{data.upperBound.toFixed(0)}万</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-border rounded-2xl shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                基于机器学习的智能预测分析
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2 rounded-lg hover-lift"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            更新
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">预测准确率</span>
            </div>
            <div className="text-2xl font-bold text-primary">{accuracy}%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-info/10 border border-accent/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">置信度</span>
            </div>
            <div className="text-2xl font-bold text-accent">{confidence}%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-accent/10 border border-success/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">预测增长</span>
            </div>
            <div className="text-2xl font-bold text-accent">+{growth}%</div>
          </motion.div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Chart Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {timeRange === 'week' ? '本周' : timeRange === 'month' ? '本月' : '本季度'}
            </Badge>
          </div>
          <button
            onClick={() => setShowConfidenceInterval(!showConfidenceInterval)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfidenceInterval ? '隐藏' : '显示'}置信区间
          </button>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FF7A00" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00A75D" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00A75D" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00A75D" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#00A75D" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              stroke="#64748B" 
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748B" 
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `¥${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            
            {/* 置信区间 */}
            {showConfidenceInterval && (
              <Area
                type="monotone"
                dataKey="upperBound"
                stroke="none"
                fill="url(#colorConfidence)"
                name="置信区间上限"
                connectNulls
              />
            )}
            {showConfidenceInterval && (
              <Area
                type="monotone"
                dataKey="lowerBound"
                stroke="none"
                fill="url(#colorConfidence)"
                name="置信区间下限"
                connectNulls
              />
            )}
            
            {/* 实际值 */}
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#FF7A00"
              strokeWidth={3}
              fill="url(#colorActual)"
              name="实际值"
              dot={{ fill: '#FF7A00', r: 4 }}
              connectNulls={false}
            />
            
            {/* 预测值 */}
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#00A75D"
              strokeWidth={3}
              strokeDasharray="5 5"
              fill="url(#colorPredicted)"
              name="AI预测"
              dot={{ fill: '#00A75D', r: 4 }}
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Legend Info */}
        <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-start gap-2">
            <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground leading-relaxed">
                AI预测模型基于历史销售数据、市场趋势、季节性因素和团队表现等多维度数据训练。
                虚线部分为未来预测，阴影区域表示{confidence}%置信区间。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
