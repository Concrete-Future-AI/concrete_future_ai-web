import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Sparkles, Brain, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface Prediction {
  label: string;
  value: number;
  change: number;
  confidence: number;
}

interface AIPredictionCardProps {
  title: string;
  predictions: Prediction[];
  chartData?: any[];
  timeframe?: string;
}

export default function AIPredictionCard({ title, predictions, chartData, timeframe = '未来3个月' }: AIPredictionCardProps) {
  return (
    <Card className="elevation-2 border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{timeframe}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Predictions List */}
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{prediction.label}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={prediction.change >= 0 ? 'default' : 'destructive'} className="flex items-center gap-1">
                      <TrendingUp className={`h-3 w-3 ${prediction.change < 0 ? 'rotate-180' : ''}`} />
                      {Math.abs(prediction.change)}%
                    </Badge>
                    <span className="text-sm font-medium">¥{prediction.value.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>AI 置信度</span>
                    <span>{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          {chartData && chartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4 border-t"
            >
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    fill="url(#predictionGradient)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#6366F1" 
                    strokeWidth={2}
                    fill="none"
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#6366F1]"></div>
                  <span>实际数据</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
                  <span>AI预测</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 pt-2"
          >
            <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
            <span className="text-xs text-muted-foreground">基于深度学习模型分析历史数据生成</span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
