import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Zap,
  Target,
  Clock,
  DollarSign,
  Users,
  MessageCircle,
  BarChart3,
  X
} from 'lucide-react';

interface Optimization {
  id: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  currentValue: string;
  targetValue: string;
  estimatedImprovement: string;
  icon: any;
  applied: boolean;
}

export function AIOptimizerPanel() {
  const [optimizations, setOptimizations] = useState<Optimization[]>([
    {
      id: '1',
      category: '内容发布',
      priority: 'high',
      title: '调整Instagram发布时间',
      description: '数据显示周六晚8点互动率比当前时间高35%，建议调整发布时间以获取更多曝光',
      impact: 'ROI提升',
      currentValue: '周六 15:00',
      targetValue: '周六 20:00',
      estimatedImprovement: '+35%',
      icon: Clock,
      applied: false
    },
    {
      id: '2',
      category: '预算分配',
      priority: 'high',
      title: '优化平台预算分配',
      description: 'Instagram转化率是LinkedIn的2.3倍，建议将30%预算从LinkedIn转移至Instagram',
      impact: '转化提升',
      currentValue: 'IG:40% LI:35%',
      targetValue: 'IG:70% LI:5%',
      estimatedImprovement: '+48%',
      icon: DollarSign,
      applied: false
    },
    {
      id: '3',
      category: '互动回复',
      priority: 'medium',
      title: '启用AI自动回复',
      description: '当前评论回复率45%导致大量潜在客户流失，AI自动回复可将回复率提升至85%',
      impact: '用户留存',
      currentValue: '45%',
      targetValue: '85%',
      estimatedImprovement: '+89%',
      icon: MessageCircle,
      applied: false
    },
    {
      id: '4',
      category: 'DM营销',
      priority: 'medium',
      title: '优化DM发送策略',
      description: '晚上8-10点发送的DM打开率比白天高55%，建议调整自动发送时间窗口',
      impact: '打开率',
      currentValue: '随时发送',
      targetValue: '20:00-22:00',
      estimatedImprovement: '+55%',
      icon: Target,
      applied: false
    },
    {
      id: '5',
      category: 'KOL合作',
      priority: 'low',
      title: '使用AI评分筛选KOL',
      description: '当前KOL合作ROI波动大(2.1x-6.8x)，使用AI评分系统可筛选出稳定高质量KOL',
      impact: 'ROI稳定性',
      currentValue: '人工筛选',
      targetValue: 'AI智能评分',
      estimatedImprovement: '稳定5x+',
      icon: Users,
      applied: false
    },
    {
      id: '6',
      category: '内容优化',
      priority: 'low',
      title: '添加更多视觉元素',
      description: 'AI分析显示带图片/视频的帖子互动率高45%，建议增加视觉内容比例',
      impact: '互动率',
      currentValue: '35%带图',
      targetValue: '80%带图',
      estimatedImprovement: '+45%',
      icon: BarChart3,
      applied: false
    }
  ]);

  const [applying, setApplying] = useState<string | null>(null);

  const handleApply = (id: string) => {
    setApplying(id);
    setTimeout(() => {
      setOptimizations(prev => prev.map(opt => 
        opt.id === id ? { ...opt, applied: true } : opt
      ));
      setApplying(null);
    }, 1500);
  };

  const handleApplyAll = () => {
    setApplying('all');
    setTimeout(() => {
      setOptimizations(prev => prev.map(opt => ({ ...opt, applied: true })));
      setApplying(null);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'red';
      case 'medium': return 'amber';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Info;
      case 'low': return TrendingUp;
      default: return Info;
    }
  };

  const appliedCount = optimizations.filter(opt => opt.applied).length;
  const totalCount = optimizations.length;
  const totalImpact = appliedCount === totalCount ? 45 : Math.round((appliedCount / totalCount) * 45);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              AI智能优化中心
            </h3>
            <p className="text-sm text-gray-500 mt-1">基于数据分析的智能优化建议</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">预估ROI提升</p>
              <p className="text-2xl text-purple-600">+{totalImpact}%</p>
            </div>
            <Button
              onClick={handleApplyAll}
              disabled={applying !== null || appliedCount === totalCount}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift"
            >
              <Zap className="w-4 h-4 mr-2" />
              {applying === 'all' ? '应用中...' : '一键应用全部'}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">优化进度</span>
            <span className="text-gray-900">{appliedCount}/{totalCount} 项已应用</span>
          </div>
          <Progress value={(appliedCount / totalCount) * 100} className="h-2" />
        </div>
      </Card>

      {/* Optimizations List */}
      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {optimizations.map((opt, index) => {
            const Icon = opt.icon;
            const PriorityIcon = getPriorityIcon(opt.priority);
            const priorityColor = getPriorityColor(opt.priority);

            return (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`glass-card rounded-2xl p-5 hover-lift relative overflow-hidden ${
                  opt.applied ? 'border-green-300' : ''
                }`}>
                  {opt.applied && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />
                  )}
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-${priorityColor}-400 to-${priorityColor}-600 flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs mb-1">
                            {opt.category}
                          </Badge>
                          <p className="text-gray-900">{opt.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-${priorityColor}-500/20 text-${priorityColor}-700 flex items-center gap-1`}>
                          <PriorityIcon className="w-3 h-3" />
                          {opt.priority === 'high' ? '高' : opt.priority === 'medium' ? '中' : '低'}
                        </Badge>
                        {opt.applied && (
                          <Badge className="bg-green-500/20 text-green-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            已应用
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {opt.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-white/50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">当前值</p>
                        <p className="text-sm text-gray-900">{opt.currentValue}</p>
                      </div>
                      <div className="p-3 bg-white/50 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">优化后</p>
                        <p className="text-sm text-gray-900">{opt.targetValue}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-700">{opt.impact}</span>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-700">
                        {opt.estimatedImprovement}
                      </Badge>
                    </div>

                    <Button
                      onClick={() => handleApply(opt.id)}
                      disabled={opt.applied || applying !== null}
                      className={`w-full ${
                        opt.applied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      } hover-lift`}
                    >
                      {applying === opt.id ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                          </motion.div>
                          应用中...
                        </>
                      ) : opt.applied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          已应用
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          应用优化
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Summary */}
      {appliedCount === totalCount && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="glass-card rounded-2xl p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">🎉 全部优化已应用！</h4>
                <p className="text-sm text-gray-600">
                  预计整体ROI将提升 <strong className="text-green-600">45%</strong>，
                  用户互动率提升 <strong className="text-green-600">38%</strong>，
                  转化成本降低 <strong className="text-green-600">27%</strong>
                </p>
              </div>
              <Button variant="outline" className="hover-lift">
                <BarChart3 className="w-4 h-4 mr-2" />
                查看预测报告
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
