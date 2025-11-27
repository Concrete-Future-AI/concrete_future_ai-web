import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Brain, Zap, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from './ui/progress';

interface Prediction {
  id: string;
  type: 'price' | 'demand' | 'delivery' | 'risk';
  title: string;
  confidence: number;
  prediction: string;
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
  recommendation: string;
  data?: any[];
}

interface AISmartPredictorProps {
  category?: string;
  supplierId?: string;
  compact?: boolean;
}

export default function AISmartPredictor({ category, supplierId, compact = false }: AISmartPredictorProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // 模拟AI分析过程
    setIsAnalyzing(true);
    setTimeout(() => {
      setPredictions(generatePredictions(category, supplierId));
      setIsAnalyzing(false);
    }, 1500);
  }, [category, supplierId]);

  const generatePredictions = (cat?: string, supplier?: string): Prediction[] => {
    return [
      {
        id: '1',
        type: 'price',
        title: '价格趋势预测',
        confidence: 92,
        prediction: '未来30天预计下降8-12%',
        trend: 'down',
        impact: 'high',
        recommendation: '建议延迟采购至3周后，预计可节省¥180,000',
        data: [
          { day: '今天', actual: 1200, predicted: 1200 },
          { day: '7天', actual: null, predicted: 1150 },
          { day: '14天', actual: null, predicted: 1100 },
          { day: '21天', actual: null, predicted: 1050 },
          { day: '30天', actual: null, predicted: 1080 },
        ]
      },
      {
        id: '2',
        type: 'demand',
        title: '需求量预测',
        confidence: 87,
        prediction: '下月需求将增长25%',
        trend: 'up',
        impact: 'high',
        recommendation: '建议提前备货，避免供应短缺风险',
        data: [
          { month: '1月', actual: 120, predicted: 120 },
          { month: '2月', actual: 135, predicted: 135 },
          { month: '3月', actual: 150, predicted: 150 },
          { month: '4月', actual: null, predicted: 175 },
          { month: '5月', actual: null, predicted: 190 },
        ]
      },
      {
        id: '3',
        type: 'delivery',
        title: '交付时效预测',
        confidence: 95,
        prediction: '预计准时交付率98%',
        trend: 'stable',
        impact: 'medium',
        recommendation: '当前供应商表现稳定，可继续合作',
        data: []
      },
      {
        id: '4',
        type: 'risk',
        title: '供应风险预警',
        confidence: 78,
        prediction: '检测到中等风险信号',
        trend: 'up',
        impact: 'medium',
        recommendation: '建议启动备选供应商评估流程',
        data: []
      },
    ];
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Target className="h-4 w-4 text-blue-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-green-500/10 text-green-700 border-green-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  if (compact) {
    return (
      <Card className="elevation-2 hover-lift border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg ai-gradient flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">AI智能预测</CardTitle>
                <CardDescription className="text-xs">实时分析与预警</CardDescription>
              </div>
            </div>
            <Badge className="ai-gradient text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              AI
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {isAnalyzing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="ai-pulse">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                </div>
                <span>AI正在分析数据...</span>
              </div>
              <Progress value={66} className="h-1" />
            </div>
          ) : (
            predictions.slice(0, 2).map((pred) => (
              <div key={pred.id} className="flex items-start gap-3 p-3 rounded-lg surface-variant md-transition hover:bg-accent/5">
                <div className="mt-0.5">{getTrendIcon(pred.trend)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{pred.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {pred.confidence}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{pred.prediction}</p>
                </div>
              </div>
            ))
          )}
          <Button variant="outline" className="w-full" size="sm">
            查看完整预测
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl ai-gradient flex items-center justify-center ai-glow">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">AI智能预测引擎</h3>
            <p className="text-sm text-muted-foreground">基于大数据和机器学习的智能分析</p>
          </div>
        </div>
        <Badge className="ai-gradient text-white border-0">
          <Zap className="h-3 w-3 mr-1" />
          实时更新
        </Badge>
      </div>

      {isAnalyzing ? (
        <Card className="elevation-2 border-0">
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-12 w-12 text-purple-500" />
              </motion.div>
              <div className="text-center space-y-2">
                <p className="font-medium">AI正在分析数据</p>
                <p className="text-sm text-muted-foreground">
                  正在处理 {Math.floor(Math.random() * 10000 + 50000).toLocaleString()} 条数据记录
                </p>
              </div>
              <Progress value={66} className="w-64" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {predictions.map((pred, index) => (
            <motion.div
              key={pred.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="elevation-2 hover-lift cursor-pointer border-0 md-transition"
                onClick={() => setSelectedPrediction(pred)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(pred.trend)}
                      <CardTitle className="text-base">{pred.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      准确率 {pred.confidence}%
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Badge className={getImpactColor(pred.impact)}>
                      {pred.impact === 'high' ? '高影响' : pred.impact === 'medium' ? '中影响' : '低影响'}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">预测结果</span>
                      <span className="font-medium">{pred.prediction}</span>
                    </div>
                    <Progress value={pred.confidence} className="h-2" />
                  </div>

                  {pred.data && pred.data.length > 0 && (
                    <div className="h-32 surface-variant rounded-lg p-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={pred.data}>
                          <defs>
                            <linearGradient id={`gradient-${pred.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--ai-primary)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="var(--ai-primary)" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--md-outline)" />
                          <XAxis 
                            dataKey={pred.type === 'price' ? 'day' : 'month'} 
                            tick={{ fontSize: 10 }}
                            stroke="var(--md-text-secondary)"
                          />
                          <YAxis tick={{ fontSize: 10 }} stroke="var(--md-text-secondary)" />
                          <Tooltip />
                          {pred.data[0].actual !== undefined && (
                            <Area 
                              type="monotone" 
                              dataKey="actual" 
                              stroke="var(--md-primary)" 
                              fill="var(--md-primary)"
                              fillOpacity={0.2}
                            />
                          )}
                          <Area 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="var(--ai-primary)" 
                            fill={`url(#gradient-${pred.id})`}
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <div className="p-3 surface-variant rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      <span>AI建议</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{pred.recommendation}</p>
                  </div>

                  <Button className="w-full ai-gradient text-white border-0" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    采纳建议
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
