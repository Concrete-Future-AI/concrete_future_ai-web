import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'suggestion';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  metric?: string;
  action?: string;
}

interface AIInsightsCardProps {
  insights: Insight[];
  title?: string;
  onActionClick?: (insight: Insight) => void;
}

export default function AIInsightsCard({ insights, title = 'AI 智能洞察', onActionClick }: AIInsightsCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'risk':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'trend':
        return <TrendingDown className="h-5 w-5 text-blue-600" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-purple-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#6366F1]" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high':
        return '高影响';
      case 'medium':
        return '中影响';
      case 'low':
        return '低影响';
      default:
        return '';
    }
  };

  return (
    <Card className="elevation-2 border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 border-b border-[#6366F1]/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            {title}
          </CardTitle>
          <Badge variant="secondary" className="bg-[#6366F1]/10 text-[#6366F1] border-0">
            AI驱动
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getIcon(insight.type)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant="outline" className={getImpactColor(insight.impact)}>
                      {getImpactLabel(insight.impact)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  
                  {insight.metric && (
                    <div className="inline-block px-3 py-1 bg-white rounded-md border">
                      <span className="text-sm font-medium text-primary">{insight.metric}</span>
                    </div>
                  )}

                  {insight.action && (
                    <Button
                      variant="link"
                      className="h-auto p-0 text-[#6366F1]"
                      onClick={() => onActionClick?.(insight)}
                    >
                      {insight.action}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
