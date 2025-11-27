import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Brain,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Mail,
  FileText,
  Calendar,
  MessageSquare,
  Lightbulb,
  Eye,
  ArrowRight,
  Clock,
  Users,
  Award,
  Activity,
  CheckCircle2,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import AIEmailGenerator from './AIEmailGenerator';
import AIMeetingPrep from './AIMeetingPrep';
import AIPlaybookRecommender from './AIPlaybookRecommender';
import AIDataAnalyzer from './AIDataAnalyzer';

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  stats?: {
    label: string;
    value: string;
  }[];
  actions: {
    label: string;
    type: 'primary' | 'secondary';
  }[];
  status: 'active' | 'learning' | 'new';
}

export default function AIFeaturesHub() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const aiFeatures: AIFeature[] = [
    {
      id: 'velocity-score',
      title: 'Velocity Score 智能评分',
      description: '基于多维度数据实时评估线索质量，预测成交概率，帮助优先级排序',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'from-purple-500 to-purple-600',
      stats: [
        { label: '评估准确率', value: '94%' },
        { label: '已评估线索', value: '1,247' },
        { label: '平均处理时间', value: '<1秒' }
      ],
      actions: [
        { label: '查看评分详情', type: 'primary' },
        { label: '优化评分模型', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'smart-insights',
      title: 'AI智能洞察',
      description: '实时分析客户行为，识别销售机会，预警潜在风险，提供策略建议',
      icon: Lightbulb,
      color: 'text-orange-600',
      bgColor: 'from-orange-500 to-orange-600',
      stats: [
        { label: '今日洞察', value: '23条' },
        { label: '已采纳建议', value: '156条' },
        { label: '成功率提升', value: '+18%' }
      ],
      actions: [
        { label: '查看最新洞察', type: 'primary' },
        { label: '洞察历史', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'predictive-analytics',
      title: 'AI预测分析',
      description: '基于历史数据和当前趋势，预测销售业绩、成交概率和最佳行动时机',
      icon: TrendingUp,
      color: 'text-teal-600',
      bgColor: 'from-teal-500 to-teal-600',
      stats: [
        { label: '预测准确率', value: '92%' },
        { label: '本月预测', value: '¥108万' },
        { label: '置信度', value: '高' }
      ],
      actions: [
        { label: '查看预测报告', type: 'primary' },
        { label: '调整预测参数', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'email-assistant',
      title: 'AI邮件助手',
      description: '智能撰写个性化跟进邮件，优化邮件标题和内容，提升回复率',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'from-blue-500 to-blue-600',
      stats: [
        { label: '已生成邮件', value: '342封' },
        { label: '平均打开率', value: '68%' },
        { label: '回复率提升', value: '+25%' }
      ],
      actions: [
        { label: '撰写新邮件', type: 'primary' },
        { label: '邮件模板库', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'meeting-prep',
      title: 'AI会议准备',
      description: '自动收集客户信息，生成会议议程，推荐话术策略，提升会议效果',
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'from-indigo-500 to-indigo-600',
      stats: [
        { label: '准备会议', value: '89场' },
        { label: '成功率', value: '76%' },
        { label: '平均节省时间', value: '30分钟' }
      ],
      actions: [
        { label: '准备下一场会议', type: 'primary' },
        { label: '会议复盘', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'sales-playbook',
      title: 'AI销售剧本',
      description: '基于成功案例和客户特征，智能推荐最佳销售策略和沟通话术',
      icon: FileText,
      color: 'text-pink-600',
      bgColor: 'from-pink-500 to-pink-600',
      stats: [
        { label: '剧本库', value: '78个' },
        { label: '使用次数', value: '456次' },
        { label: '成功率', value: '71%' }
      ],
      actions: [
        { label: '获取推荐剧本', type: 'primary' },
        { label: '创建新剧本', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'conversation-intelligence',
      title: 'AI对话分析',
      description: '分析通话和会议记录，提取关键信息，评估客户情绪，优化沟通策略',
      icon: MessageSquare,
      color: 'text-cyan-600',
      bgColor: 'from-cyan-500 to-cyan-600',
      stats: [
        { label: '已分析对话', value: '234场' },
        { label: '关键词提取', value: '自动' },
        { label: '情绪识别', value: '实时' }
      ],
      actions: [
        { label: '上传对话记录', type: 'primary' },
        { label: '查看分析报告', type: 'secondary' }
      ],
      status: 'learning'
    },
    {
      id: 'competitor-intelligence',
      title: 'AI竞争分析',
      description: '监控竞争对手动态，分析竞争优劣势，提供差异化策略建议',
      icon: Target,
      color: 'text-red-600',
      bgColor: 'from-red-500 to-red-600',
      stats: [
        { label: '跟踪竞品', value: '5个' },
        { label: '分析报告', value: '每周' },
        { label: '胜率提升', value: '+12%' }
      ],
      actions: [
        { label: '查看竞争分析', type: 'primary' },
        { label: '添加竞品', type: 'secondary' }
      ],
      status: 'new'
    },
    {
      id: 'auto-followup',
      title: 'AI自动跟进',
      description: '智能判断最佳跟进时机，自动发送个性化消息，减少人工工作量',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'from-green-500 to-green-600',
      stats: [
        { label: '自动跟进', value: '178次' },
        { label: '响应率', value: '62%' },
        { label: '节省时间', value: '45小时' }
      ],
      actions: [
        { label: '设置跟进规则', type: 'primary' },
        { label: '查看跟进记录', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'deal-risk-alert',
      title: 'AI交易预警',
      description: '实时监控交易健康度，提前识别风险信号，建议挽救措施',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'from-yellow-500 to-yellow-600',
      stats: [
        { label: '监控交易', value: '127个' },
        { label: '风险预警', value: '8个' },
        { label: '挽救成功率', value: '65%' }
      ],
      actions: [
        { label: '查看风险交易', type: 'primary' },
        { label: '设置预警规则', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'performance-coaching',
      title: 'AI绩效教练',
      description: '分析个人销售表现，识别优势和不足，提供个性化改进建议',
      icon: Award,
      color: 'text-violet-600',
      bgColor: 'from-violet-500 to-violet-600',
      stats: [
        { label: '接受教练', value: '24人' },
        { label: '平均提升', value: '+23%' },
        { label: '建议采纳率', value: '81%' }
      ],
      actions: [
        { label: '获取个人建议', type: 'primary' },
        { label: '团队教练报告', type: 'secondary' }
      ],
      status: 'active'
    },
    {
      id: 'sentiment-analysis',
      title: 'AI情绪分析',
      description: '分析客户邮件和消息中的情绪倾向，帮助调整沟通策略',
      icon: Activity,
      color: 'text-rose-600',
      bgColor: 'from-rose-500 to-rose-600',
      stats: [
        { label: '分析消息', value: '1,234条' },
        { label: '情绪识别', value: '7种' },
        { label: '准确率', value: '89%' }
      ],
      actions: [
        { label: '查看情绪报告', type: 'primary' },
        { label: '情绪趋势', type: 'secondary' }
      ],
      status: 'learning'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-teal-100 text-teal-700 border-0 rounded-full">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            运行中
          </Badge>
        );
      case 'learning':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-0 rounded-full">
            <Brain className="w-3 h-3 mr-1" />
            学习中
          </Badge>
        );
      case 'new':
        return (
          <Badge className="bg-purple-100 text-purple-700 border-0 rounded-full">
            <Sparkles className="w-3 h-3 mr-1" />
            新功能
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleActionClick = (action: string) => {
    const actionConfig = quickActions[action];
    
    if (actionConfig?.type === 'modal') {
      setActiveModal(actionConfig.component);
    } else {
      toast.success(`正在执行: ${action}`);
    }
  };

  const quickActions: { [key: string]: { label: string, type: 'modal' | 'action', component?: string, action?: string } } = {
    'velocity-score': {
      label: '查看详情',
      type: 'action'
    },
    'smart-insights': {
      label: '查看详情',
      type: 'action'
    },
    'predictive-analytics': {
      label: '查看详情',
      type: 'action'
    },
    'email-assistant': {
      label: '启动邮件助手',
      type: 'modal',
      component: 'email'
    },
    'meeting-prep': {
      label: '准备下一场会议',
      type: 'modal',
      component: 'meeting'
    },
    'sales-playbook': {
      label: '获取推荐剧本',
      type: 'modal',
      component: 'playbook'
    },
    'data-analyzer': {
      label: '开始数据分析',
      type: 'modal',
      component: 'analyzer'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-neutral-900">AI功能中心</h2>
            <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 rounded-full">
              <Sparkles className="w-3 h-3 mr-1" />
              12项AI能力
            </Badge>
          </div>
          <p className="text-sm text-neutral-500">
            全方位AI赋能，让销售工作更智能、更高效
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg">
          <Brain className="w-4 h-4 mr-2" />
          AI使用统计
        </Button>
      </div>

      {/* AI Usage Stats */}
      <Card className="border-0 shadow-sm rounded-2xl p-6 bg-gradient-to-br from-purple-50 via-white to-teal-50">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">AI使用次数</p>
                <h3 className="text-neutral-900">2,847次</h3>
              </div>
            </div>
            <Progress value={85} className="h-1.5" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">采纳率</p>
                <h3 className="text-neutral-900">78%</h3>
              </div>
            </div>
            <Progress value={78} className="h-1.5" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">效率提升</p>
                <h3 className="text-neutral-900">+42%</h3>
              </div>
            </div>
            <Progress value={42} className="h-1.5" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center shadow-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">节省时间</p>
                <h3 className="text-neutral-900">156小时</h3>
              </div>
            </div>
            <Progress value={90} className="h-1.5" />
          </div>
        </div>
      </Card>

      {/* AI Features Grid */}
      <div className="grid grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isExpanded = selectedFeature === feature.id;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card 
                  className={`border-0 shadow-sm rounded-2xl overflow-hidden transition-all cursor-pointer ${
                    isExpanded ? 'ring-2 ring-purple-300' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFeature(isExpanded ? null : feature.id)}
                >
                  <div className={`p-4 bg-gradient-to-r ${feature.bgColor}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {getStatusBadge(feature.status)}
                    </div>
                    <h4 className="text-white mb-1">{feature.title}</h4>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {feature.description}
                    </p>

                    {feature.stats && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {feature.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className={`text-lg ${feature.color}`}>{stat.value}</div>
                            <div className="text-xs text-neutral-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 pt-4 border-t"
                        >
                          {feature.actions.map((action, idx) => (
                            <Button
                              key={idx}
                              variant={action.type === 'primary' ? 'default' : 'outline'}
                              className={`w-full justify-start rounded-xl ${
                                action.type === 'primary'
                                  ? `bg-gradient-to-r ${feature.bgColor} hover:opacity-90`
                                  : 'hover:bg-neutral-50'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(feature.id);
                              }}
                            >
                              {action.label}
                              <ArrowRight className="w-4 h-4 ml-auto" />
                            </Button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <Button
                        variant="ghost"
                        className="w-full text-neutral-500 hover:text-neutral-700 text-sm"
                      >
                        查看详情 <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* AI Learning Progress */}
      <Card className="border-0 shadow-sm rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-neutral-900 mb-1">AI持续学习</h3>
            <p className="text-sm text-neutral-500">系统正在不断学习优化，提升准确率</p>
          </div>
          <Badge className="bg-blue-100 text-blue-700 border-0 rounded-full">
            <Brain className="w-3 h-3 mr-1 animate-pulse" />
            学习中
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-700">线索评分准确率</span>
              <span className="text-sm text-teal-600">94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-700">业绩预测准确率</span>
              <span className="text-sm text-teal-600">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-700">情绪识别准确率</span>
              <span className="text-sm text-blue-600">89% (+2%)</span>
            </div>
            <Progress value={89} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-700">邮件回复率预测</span>
              <span className="text-sm text-purple-600">87% (+5%)</span>
            </div>
            <Progress value={87} className="h-2" />
          </div>
        </div>
      </Card>

      {/* AI功能模态窗口 */}
      <AnimatePresence>
        {activeModal === 'email' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AIEmailGenerator onClose={() => setActiveModal(null)} />
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'meeting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AIMeetingPrep />
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'playbook' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AIPlaybookRecommender />
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'analyzer' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AIDataAnalyzer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}