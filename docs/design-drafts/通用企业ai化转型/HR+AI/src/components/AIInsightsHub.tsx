import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Target,
  CheckCircle,
  Clock,
  ChevronRight,
  Zap,
  Brain,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";

interface AIInsightsHubProps {
  userRole: 'chro' | 'hrbp' | 'employee';
}

interface Insight {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'risk' | 'opportunity' | 'prediction' | 'recommendation';
  confidence: number;
  impact: string;
  actions: string[];
  timestamp: Date;
}

export function AIInsightsHub({ userRole }: AIInsightsHubProps) {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  // 根据角色生成不同的洞察
  const getInsights = (): Insight[] => {
    const commonInsights: Insight[] = [
      {
        id: '1',
        title: '研发部门流失风险预警',
        description: '基于敬业度下降、工作负荷增加和市场薪酬对比，预测研发部门未来3个月内有较高的人才流失风险。',
        priority: 'high',
        category: 'risk',
        confidence: 87,
        impact: '可能影响2-3个核心项目进度，造成约15%的生产力损失',
        actions: [
          '与研发负责人进行1对1深度访谈',
          '组织团队建设活动',
          '评估薪酬竞争力并调整',
          '优化项目分配减少加班'
        ],
        timestamp: new Date()
      },
      {
        id: '2',
        title: '销售团队技能提升机会',
        description: 'AI检测到销售团队在数字化工具使用和数据分析能力方面存在明显缺口，这限制了业绩增长潜力。',
        priority: 'medium',
        category: 'opportunity',
        confidence: 92,
        impact: '提升后预计季度业绩可增长20-25%',
        actions: [
          '引入CRM系统培训课程',
          '组织数据分析工作坊',
          '建立最佳实践分享机制',
          '提供个性化学习路径'
        ],
        timestamp: new Date()
      },
      {
        id: '3',
        title: 'Q4招聘需求预测',
        description: '基于业务增长计划、自然流失率和历史数据，预测Q4需要招聘8-10名技术人才和3-4名产品人员。',
        priority: 'medium',
        category: 'prediction',
        confidence: 85,
        impact: '提前准备可缩短50%的招聘周期',
        actions: [
          '提前激活招聘渠道',
          '准备JD和面试流程',
          '建立候选人人才库',
          '预算审批和HC申请'
        ],
        timestamp: new Date()
      },
      {
        id: '4',
        title: '领导力储备优化建议',
        description: '当前领导力储备充足（90%就绪率），但存在结构性不平衡，建议加强产品和运营方向的领导力培养。',
        priority: 'low',
        category: 'recommendation',
        confidence: 88,
        impact: '优化后可提升20%的内部晋升成功率',
        actions: [
          '启动产品领导力培养计划',
          '为高潜人才提供轮岗机会',
          '建立导师辅导机制',
          '组织领导力训练营'
        ],
        timestamp: new Date()
      },
      {
        id: '5',
        title: '员工敬业度提升趋势',
        description: 'AI分析显示，过去3个月实施的弹性工作制和学习激励政策效果显著，员工敬业度提升了5个百分点。',
        priority: 'low',
        category: 'opportunity',
        confidence: 94,
        impact: '继续推进预计可提升至85分以上',
        actions: [
          '扩大弹性工作制覆盖范围',
          '增加学习预算',
          '收集员工反馈持续优化',
          '向其他部门推广成功经验'
        ],
        timestamp: new Date()
      }
    ];

    // 员工视角的个性化洞察
    if (userRole === 'employee') {
      return [
        {
          id: 'e1',
          title: '您的晋升准备度评估',
          description: '基于您的技能发展、项目贡献和同级对比，AI评估您目前的晋升准备度为78分，距离晋升标准还差7分。',
          priority: 'high',
          category: 'recommendation',
          confidence: 89,
          impact: '按建议执行，3-4个月内可达到晋升标准',
          actions: [
            '主导1个重要项目',
            '提升系统架构设计能力',
            '增加技术影响力（分享/培训）',
            '寻找导师辅导'
          ],
          timestamp: new Date()
        },
        {
          id: 'e2',
          title: '个性化学习路径推荐',
          description: '基于您的职业目标（技术专家）和当前技能缺口，AI为您规划了6个月的学习路径。',
          priority: 'medium',
          category: 'recommendation',
          confidence: 91,
          impact: '完成后技能匹配度可从75%提升至90%',
          actions: [
            '学习《系统设计进阶》课程',
            '参与性能优化项目',
            '每月1次技术分享',
            '阅读推荐技术书籍'
          ],
          timestamp: new Date()
        },
        {
          id: 'e3',
          title: '团队协作表现优秀',
          description: 'AI分析显示，您在跨团队协作和知识分享方面表现突出，评分超过85%的同事。',
          priority: 'low',
          category: 'opportunity',
          confidence: 95,
          impact: '这是您的优势，可以在晋升评审中重点展示',
          actions: [
            '记录协作案例和成果',
            '申请优秀协作者认证',
            '继续保持和强化',
            '指导新同事建立协作习惯'
          ],
          timestamp: new Date()
        }
      ];
    }

    return commonInsights;
  };

  const insights = getInsights();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'risk': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'opportunity': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'prediction': return <Brain className="h-5 w-5 text-purple-500" />;
      case 'recommendation': return <Sparkles className="h-5 w-5 text-teal-500" />;
      default: return <Eye className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'risk': return '风险预警';
      case 'opportunity': return '机会发现';
      case 'prediction': return '趋势预测';
      case 'recommendation': return '智能建议';
      default: return '洞察';
    }
  };

  const handleActionComplete = (insightId: string, actionIndex: number) => {
    const key = `${insightId}-${actionIndex}`;
    setCompletedActions(prev => new Set([...prev, key]));
    toast.success("行动已标记完成", {
      description: "继续推进其他行动项以实现最佳效果"
    });
  };

  const categorizedInsights = {
    all: insights,
    risk: insights.filter(i => i.category === 'risk'),
    opportunity: insights.filter(i => i.category === 'opportunity'),
    prediction: insights.filter(i => i.category === 'prediction'),
    recommendation: insights.filter(i => i.category === 'recommendation')
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-gray-900">AI洞察中心</h2>
          </div>
          <p className="text-gray-600">智能分析 • 预测趋势 • 驱动决策</p>
        </div>
        <Badge className="bg-gradient-to-r from-teal-500 to-purple-500 text-white">
          <Zap className="h-3 w-3 mr-1" />
          实时更新
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '总洞察数', value: insights.length, icon: Brain, color: 'teal' },
          { label: '高优先级', value: insights.filter(i => i.priority === 'high').length, icon: AlertTriangle, color: 'red' },
          { label: '平均置信度', value: `${Math.round(insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length)}%`, icon: Target, color: 'purple' },
          { label: '待处理行动', value: insights.reduce((acc, i) => acc + i.actions.length, 0) - completedActions.size, icon: CheckCircle, color: 'green' }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-4 w-4 text-${stat.color}-500`} />
                  <p className={`text-2xl text-${stat.color}-600`}>{stat.value}</p>
                </div>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Insights Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            全部 ({insights.length})
          </TabsTrigger>
          <TabsTrigger value="risk">
            风险 ({categorizedInsights.risk.length})
          </TabsTrigger>
          <TabsTrigger value="opportunity">
            机会 ({categorizedInsights.opportunity.length})
          </TabsTrigger>
          <TabsTrigger value="prediction">
            预测 ({categorizedInsights.prediction.length})
          </TabsTrigger>
          <TabsTrigger value="recommendation">
            建议 ({categorizedInsights.recommendation.length})
          </TabsTrigger>
        </TabsList>

        {Object.entries(categorizedInsights).map(([key, insightList]) => (
          <TabsContent key={key} value={key} className="space-y-4 mt-6">
            {insightList.map((insight, idx) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card 
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    selectedInsight === insight.id ? 'ring-2 ring-teal-500' : ''
                  }`}
                  onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(insight.category)}
                          <Badge variant="outline" className="text-xs">
                            {getCategoryLabel(insight.category)}
                          </Badge>
                          <Badge className={`${getPriorityColor(insight.priority)} text-xs`}>
                            {getPriorityIcon(insight.priority)}
                            <span className="ml-1">
                              {insight.priority === 'high' ? '高优先级' : insight.priority === 'medium' ? '中优先级' : '低优先级'}
                            </span>
                          </Badge>
                        </div>
                        <CardTitle className="mb-2">{insight.title}</CardTitle>
                        <CardDescription>{insight.description}</CardDescription>
                      </div>
                      <motion.div
                        animate={{ rotate: selectedInsight === insight.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </motion.div>
                    </div>
                    
                    {/* Confidence Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>AI置信度</span>
                        <span>{insight.confidence}%</span>
                      </div>
                      <Progress value={insight.confidence} className="h-2" />
                    </div>
                  </CardHeader>

                  <AnimatePresence>
                    {selectedInsight === insight.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="border-t border-gray-100 pt-4">
                          {/* Impact */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="h-4 w-4 text-purple-500" />
                              <p className="text-sm text-gray-700">预期影响</p>
                            </div>
                            <p className="text-sm text-gray-600 pl-6">{insight.impact}</p>
                          </div>

                          {/* Actions */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Zap className="h-4 w-4 text-teal-500" />
                              <p className="text-sm text-gray-700">建议行动</p>
                            </div>
                            <div className="space-y-2 pl-6">
                              {insight.actions.map((action, actionIdx) => {
                                const actionKey = `${insight.id}-${actionIdx}`;
                                const isCompleted = completedActions.has(actionKey);
                                
                                return (
                                  <motion.div
                                    key={actionIdx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: actionIdx * 0.05 }}
                                    className="flex items-center gap-2"
                                  >
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={`h-5 w-5 p-0 rounded-full ${
                                        isCompleted ? 'bg-green-100' : 'bg-gray-100'
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleActionComplete(insight.id, actionIdx);
                                      }}
                                    >
                                      {isCompleted && <CheckCircle className="h-3 w-3 text-green-600" />}
                                    </Button>
                                    <span className={`text-sm ${
                                      isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
                                    }`}>
                                      {action}
                                    </span>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-4">
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.success("详细报告已生成", {
                                  description: "AI分析报告已发送至您的邮箱"
                                });
                              }}
                            >
                              <Brain className="h-3 w-3 mr-1" />
                              生成详细报告
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.info("已添加到日历", {
                                  description: "相关行动已添加到您的待办清单"
                                });
                              }}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              添加提醒
                            </Button>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}

            {insightList.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">暂无该类型的洞察</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
