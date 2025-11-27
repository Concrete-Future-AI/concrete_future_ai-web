import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Award, TrendingUp, TrendingDown, Shield, Clock, DollarSign, CheckCircle2, Sparkles, ThumbsUp, ArrowRight } from 'lucide-react';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

interface Recommendation {
  id: string;
  type: 'supplier' | 'strategy' | 'optimization' | 'contract';
  title: string;
  description: string;
  score: number;
  benefits: string[];
  tags: string[];
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down';
  }[];
  aiReasoning: string;
}

interface AIRecommendationEngineProps {
  context?: 'dashboard' | 'supplier' | 'procurement';
  maxItems?: number;
}

export default function AIRecommendationEngine({ context = 'dashboard', maxItems = 3 }: AIRecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(generateRecommendations(context));
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function generateRecommendations(ctx: string): Recommendation[] {
    const allRecommendations: Recommendation[] = [
      {
        id: '1',
        type: 'supplier',
        title: '推荐供应商：华为技术有限公司',
        description: '基于历史数据和市场分析，该供应商最适合您当前的IT设备采购需求',
        score: 94,
        benefits: [
          '价格优势：比市场均价低12%',
          '交付速度：平均7天，业内领先',
          '质量保证：退货率仅0.3%',
          '风险控制：财务健康度AAA级'
        ],
        tags: ['AI推荐', '高性价比', '可信赖'],
        metrics: [
          { label: '综合评分', value: '9.4/10', trend: 'up' },
          { label: '历史合作', value: '23次', trend: 'up' },
          { label: '平均节省', value: '¥28万', trend: 'up' },
        ],
        aiReasoning: '通过分析您过去18个月的采购记录、市场价格波动、供应商表现数据和行业趋势，AI判断该供应商在质量、价格、交付三个维度均表现优异，且与您的采购习惯高度匹配。'
      },
      {
        id: '2',
        type: 'strategy',
        title: '集中采购策略优化',
        description: '将分散的办公用品采购整合为季度集中采购，可显著降低成本',
        score: 89,
        benefits: [
          '年度节省：预计¥180万',
          '效率提升：减少42%的采购流程',
          '管理优化：供应商数量减少60%',
          '质量提升：统一标准和品控'
        ],
        tags: ['降本增效', 'AI策略', '流程优化'],
        metrics: [
          { label: '预期节省', value: '¥180万/年', trend: 'down' },
          { label: '时间节省', value: '42%', trend: 'down' },
          { label: 'ROI', value: '320%', trend: 'up' },
        ],
        aiReasoning: 'AI分析发现您当前办公用品采购分散在52个不同订单中，平均每单金额较小导致议价能力弱。通过机器学习模型预测，集中采购可获得15-20%的批量折扣，同时减少管理成本。'
      },
      {
        id: '3',
        type: 'optimization',
        title: '自动化审批流程升级',
        description: '启用AI智能审批引擎，低风险订单可自动通过，高风险订单智能预警',
        score: 92,
        benefits: [
          '审批提速：平均时间从2天缩短至2小时',
          '人力释放：减少70%的人工审批工作',
          '风险控制：异常订单识别率98%',
          '员工体验：满意度提升35%'
        ],
        tags: ['智能化', '自动化', '效率提升'],
        metrics: [
          { label: '审批加速', value: '12倍', trend: 'up' },
          { label: '准确率', value: '98.5%', trend: 'up' },
          { label: '工作量', value: '-70%', trend: 'down' },
        ],
        aiReasoning: 'AI审计了过去10000+条审批记录，发现68%的订单都符合标准流程且无风险。通过训练深度学习模型，系统可以自动识别这些低风险订单并快速审批，同时对异常模式进行智能预警。'
      },
      {
        id: '4',
        type: 'contract',
        title: '合同条款智能优化建议',
        description: '基于行业最佳实践和历史经验，为您的新合同提供优化建议',
        score: 86,
        benefits: [
          '法律风险：降低45%的合同纠纷',
          '商务优势：争取更有利的付款条款',
          '合规性：100%符合最新法规',
          '灵活性：增加3个保护性条款'
        ],
        tags: ['风险控制', '法务AI', '合规'],
        metrics: [
          { label: '风险降低', value: '45%', trend: 'down' },
          { label: '条款优化', value: '12项', trend: 'up' },
          { label: '合规评分', value: '100%', trend: 'up' },
        ],
        aiReasoning: 'AI法务引擎分析了超过5000份行业合同和200+个法律案例，识别出您当前合同模板中的3个潜在风险点，并提供了12条优化建议，包括付款条款、违约责任和争议解决机制的改进。'
      }
    ];

    return allRecommendations.slice(0, maxItems);
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'supplier':
        return <Award className="h-5 w-5" />;
      case 'strategy':
        return <TrendingUp className="h-5 w-5" />;
      case 'optimization':
        return <Sparkles className="h-5 w-5" />;
      case 'contract':
        return <Shield className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const handleAcceptRecommendation = (rec: Recommendation) => {
    toast.success('已采纳AI建议', {
      description: `正在为您实施"${rec.title}"的优化方案`
    });
    
    setTimeout(() => {
      toast.success('优化完成', {
        description: '预计将在未来30天内看到效果'
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl ai-gradient flex items-center justify-center ai-glow">
            <Star className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">AI智能推荐引擎</h3>
            <p className="text-sm text-muted-foreground">个性化优化建议，持续提升采购效能</p>
          </div>
        </div>
        <Badge className="ai-gradient text-white border-0">
          <Sparkles className="h-3 w-3 mr-1" />
          {recommendations.length} 条建议
        </Badge>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="elevation-2 hover-lift border-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 ai-gradient opacity-5 rounded-full blur-3xl" />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg ai-gradient flex items-center justify-center text-white flex-shrink-0">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">{rec.title}</CardTitle>
                        <Badge variant="outline" className="flex-shrink-0 font-mono">
                          {rec.score}分
                        </Badge>
                      </div>
                      <CardDescription>{rec.description}</CardDescription>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {rec.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* 关键指标 */}
                <div className="grid grid-cols-3 gap-3">
                  {rec.metrics.map((metric, idx) => (
                    <div key={idx} className="p-3 surface-variant rounded-lg space-y-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                        {metric.trend && (
                          metric.trend === 'up' ? 
                            <TrendingUp className="h-3 w-3 text-green-500" /> :
                            <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                      <p className="font-semibold">{metric.value}</p>
                    </div>
                  ))}
                </div>

                {/* 核心优势 */}
                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    核心优势
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {rec.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI推理过程 */}
                <AnimatePresence>
                  {expandedId === rec.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 surface-variant rounded-lg space-y-2 border border-purple-200/50">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium">AI推理过程</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {rec.aiReasoning}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 ai-gradient text-white border-0"
                    onClick={() => handleAcceptRecommendation(rec)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    采纳建议
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
                  >
                    {expandedId === rec.id ? '收起' : 'AI解释'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <ArrowRight className="h-4 w-4 mr-2" />
        查看全部 15 条AI建议
      </Button>
    </div>
  );
}