import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Heart, Activity, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface HealthFactor {
  name: string;
  score: number;
  weight: number;
  trend: 'up' | 'down' | 'stable';
  impact: string;
}

interface CustomerHealth {
  customerId: string;
  customerName: string;
  overallScore: number;
  trend: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  factors: HealthFactor[];
  aiRecommendations: string[];
}

interface AIHealthScoreProps {
  customer?: CustomerHealth;
  compact?: boolean;
}

export function AIHealthScore({ customer, compact = false }: AIHealthScoreProps) {
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);

  const defaultCustomer: CustomerHealth = {
    customerId: '1',
    customerName: '示例客户',
    overallScore: 78,
    trend: 'stable',
    riskLevel: 'low',
    factors: [
      {
        name: '产品使用频率',
        score: 85,
        weight: 30,
        trend: 'up',
        impact: '使用频率持续上升，说明产品价值得到认可'
      },
      {
        name: '支持工单响应',
        score: 72,
        weight: 20,
        trend: 'down',
        impact: '最近2周支持工单增加，需要关注'
      },
      {
        name: '合同续约意向',
        score: 80,
        weight: 25,
        trend: 'stable',
        impact: '续约意向稳定，但需要提前3个月沟通'
      },
      {
        name: '功能采用率',
        score: 65,
        weight: 15,
        trend: 'up',
        impact: '核心功能采用率偏低，建议进行培训'
      },
      {
        name: 'NPS评分',
        score: 88,
        weight: 10,
        trend: 'up',
        impact: 'NPS评分优秀，客户满意度高'
      }
    ],
    aiRecommendations: [
      '建议在未来2周内安排一次产品使用培训，提升功能采用率',
      '主动联系客户了解支持工单增加的原因',
      '提前90天开始续约沟通，准备优惠方案'
    ]
  };

  const data = customer || defaultCustomer;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'gradient-success';
    if (score >= 60) return 'bg-gradient-to-r from-warning to-orange-400';
    return 'bg-gradient-to-r from-destructive to-orange-500';
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge className="gradient-success text-white border-0">低风险</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-white border-0">中风险</Badge>;
      case 'high':
        return <Badge className="bg-destructive text-white border-0">高风险</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-accent" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
              <div className={`h-8 w-8 rounded-lg ${getScoreGradient(data.overallScore)} flex items-center justify-center shadow-sm`}>
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">健康度</div>
                <div className={`text-sm font-bold ${getScoreColor(data.overallScore)}`}>
                  {data.overallScore}分
                </div>
              </div>
              {getTrendIcon(data.trend)}
            </div>
          </TooltipTrigger>
          <TooltipContent className="w-64 p-4">
            <div className="space-y-2">
              <div className="font-semibold text-sm">AI健康度评分</div>
              <div className="space-y-1">
                {data.factors.slice(0, 3).map((factor, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span>{factor.name}</span>
                    <span className="font-semibold">{factor.score}分</span>
                  </div>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Card className="border-border rounded-2xl shadow-lg overflow-hidden">
      <CardHeader className="pb-4 gradient-primary text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg">AI 客户健康度</CardTitle>
              <p className="text-sm text-white/80 mt-1">{data.customerName}</p>
            </div>
          </div>
          {getRiskBadge(data.riskLevel)}
        </div>

        {/* Overall Score */}
        <div className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-white/80 mb-1">综合健康度评分</div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">{data.overallScore}</span>
                <span className="text-xl text-white/80">/100</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80 mb-2">趋势</div>
              <div className="flex items-center gap-2">
                {getTrendIcon(data.trend)}
                <span className="text-sm font-semibold">
                  {data.trend === 'up' ? '上升' : data.trend === 'down' ? '下降' : '稳定'}
                </span>
              </div>
            </div>
          </div>
          <Progress value={data.overallScore} className="h-2 bg-white/20" />
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Health Factors */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">健康度因素分析</h3>
          </div>
          <div className="space-y-3">
            {data.factors.map((factor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedFactor === factor.name
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
                onClick={() => setSelectedFactor(selectedFactor === factor.name ? null : factor.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{factor.name}</span>
                    <Badge variant="outline" className="text-xs">
                      权重 {factor.weight}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(factor.trend)}
                    <span className={`font-bold ${getScoreColor(factor.score)}`}>
                      {factor.score}
                    </span>
                  </div>
                </div>
                <Progress value={factor.score} className="h-1.5 mb-2" />
                
                {selectedFactor === factor.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-border"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {factor.impact}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold">AI 智能建议</h3>
          </div>
          <div className="space-y-2">
            {data.aiRecommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
