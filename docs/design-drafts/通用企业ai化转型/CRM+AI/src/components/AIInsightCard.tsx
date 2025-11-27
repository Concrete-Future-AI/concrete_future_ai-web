import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Brain,
  Target,
  Zap,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'suggestion' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  relatedEntity?: {
    name: string;
    type: string;
  };
  suggestedActions?: string[];
}

interface AIInsightCardProps {
  insights: AIInsight[];
  onAction?: (insightId: string, action: string) => void;
}

export default function AIInsightCard({ insights, onAction }: AIInsightCardProps) {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'suggestion':
        return <Lightbulb className="w-5 h-5" />;
      case 'prediction':
        return <Target className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'from-teal-500 to-teal-600';
      case 'warning':
        return 'from-orange-500 to-orange-600';
      case 'suggestion':
        return 'from-purple-500 to-purple-600';
      case 'prediction':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-purple-500 to-purple-600';
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'bg-teal-50';
      case 'warning':
        return 'bg-orange-50';
      case 'suggestion':
        return 'bg-purple-50';
      case 'prediction':
        return 'bg-blue-50';
      default:
        return 'bg-purple-50';
    }
  };

  const handleFeedback = (insightId: string, positive: boolean) => {
    setFeedbackGiven(new Set(feedbackGiven).add(insightId));
  };

  return (
    <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-neutral-900 flex items-center gap-2">
              AI智能洞察
              <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
                实时分析
              </Badge>
            </h3>
            <p className="text-sm text-neutral-500">基于多维数据分析的智能建议</p>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </Avatar>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`${getInsightBgColor(insight.type)} rounded-xl p-4 border border-transparent hover:border-purple-200 transition-all cursor-pointer`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getInsightColor(insight.type)} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-neutral-900">{insight.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={`
                                text-xs
                                ${insight.impact === 'high' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                                ${insight.impact === 'medium' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                                ${insight.impact === 'low' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                              `}
                            >
                              {insight.impact === 'high' ? '高影响' : insight.impact === 'medium' ? '中影响' : '低影响'}
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-600 mb-2">{insight.description}</p>
                          
                          {insight.relatedEntity && (
                            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                              <Users className="w-3 h-3" />
                              <span>关联: {insight.relatedEntity.name}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-neutral-500">AI置信度</span>
                              <div className="flex-1 h-1.5 w-24 bg-neutral-200 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${insight.confidence}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                                />
                              </div>
                              <span className="text-xs text-neutral-700">{insight.confidence}%</span>
                            </div>
                          </div>

                          {insight.suggestedActions && insight.suggestedActions.length > 0 && (
                            <div className="space-y-2 mb-3">
                              <span className="text-xs text-neutral-600">建议行动:</span>
                              {insight.suggestedActions.map((action, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => onAction?.(insight.id, action)}
                                  className="w-full flex items-center gap-2 text-xs text-left p-2 rounded-lg bg-white hover:bg-purple-50 border border-neutral-200 hover:border-purple-300 transition-all group"
                                >
                                  <Zap className="w-3 h-3 text-purple-600 flex-shrink-0" />
                                  <span className="flex-1 text-neutral-700 group-hover:text-purple-700">{action}</span>
                                  <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-0.5" />
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            {!feedbackGiven.has(insight.id) ? (
                              <>
                                <span className="text-xs text-neutral-500">这个洞察有帮助吗?</span>
                                <button
                                  onClick={() => handleFeedback(insight.id, true)}
                                  className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-teal-600 transition-colors"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleFeedback(insight.id, false)}
                                  className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-red-600 transition-colors"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                              </>
                            ) : (
                              <div className="flex items-center gap-1 text-xs text-teal-600">
                                <CheckCircle className="w-3 h-3" />
                                <span>感谢反馈</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-xs text-neutral-500">AI持续学习中...</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            与AI对话
          </Button>
        </div>
      </div>
    </Card>
  );
}
