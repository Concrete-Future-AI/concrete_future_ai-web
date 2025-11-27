import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, Activity, Eye, EyeOff, Zap, CheckCircle, XCircle, Clock, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Anomaly {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'demand' | 'inventory' | 'logistics' | 'quality';
  title: string;
  description: string;
  metric: string;
  currentValue: number;
  expectedValue: number;
  deviation: number;
  detectedAt: Date;
  aiConfidence: number;
  impact: string;
  suggestedActions: string[];
  status: 'active' | 'investigating' | 'resolved';
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface AIAnomalyDetectorProps {
  module?: 'all' | 'demand' | 'inventory' | 'logistics';
  autoDetect?: boolean;
}

export default function AIAnomalyDetector({ module = 'all', autoDetect = true }: AIAnomalyDetectorProps) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(autoDetect);
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Simulate real-time anomaly detection
  useEffect(() => {
    if (!isMonitoring) return;

    // Initial anomalies
    const initialAnomalies: Anomaly[] = [
      {
        id: 'anom-1',
        type: 'critical',
        category: 'demand',
        title: '华南地区需求突增异常',
        description: '广州区域过去24小时需求量激增237%，远超AI模型预测范围',
        metric: '日需求量',
        currentValue: 3240,
        expectedValue: 960,
        deviation: 237,
        detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        aiConfidence: 94,
        impact: '可能导致库存短缺，预计影响订单 1,200+ 个',
        suggestedActions: [
          '立即从相邻仓库调拨库存 500 件',
          '启动紧急采购流程',
          '通知客服团队准备应对咨询',
          '上调未来7天该区域需求预测'
        ],
        status: 'active',
        trend: 'increasing'
      },
      {
        id: 'anom-2',
        type: 'warning',
        category: 'inventory',
        title: 'SKU #A1203 周转率异常下降',
        description: '该SKU在华北仓库存周转率从4.2降至1.8，AI检测到滞销风险',
        metric: '库存周转率',
        currentValue: 1.8,
        expectedValue: 4.2,
        deviation: -57,
        detectedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        aiConfidence: 88,
        impact: '资金占用增加约 ¥18万，仓储成本上升',
        suggestedActions: [
          '启动促销活动加速去化',
          '考虑调拨至需求更高的区域',
          '分析竞品动态和市场变化',
          '优化补货策略'
        ],
        status: 'investigating',
        trend: 'decreasing'
      },
      {
        id: 'anom-3',
        type: 'warning',
        category: 'logistics',
        title: '上海-杭州线路配送时效下降',
        description: '该线路平均配送时效从18小时延长至32小时，超过预警阈值',
        metric: '配送时效',
        currentValue: 32,
        expectedValue: 18,
        deviation: 78,
        detectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        aiConfidence: 91,
        impact: '影响该线路订单约 340 个，客户满意度下降',
        suggestedActions: [
          '切换至备用物流服务商',
          '优化路线规划',
          '主动通知受影响客户',
          '评估服务商绩效'
        ],
        status: 'investigating',
        trend: 'stable'
      },
      {
        id: 'anom-4',
        type: 'info',
        category: 'demand',
        title: '周末需求模式变化',
        description: 'AI模型检测到周末需求模式与历史不符，可能存在新的消费趋势',
        metric: '周末/工作日比率',
        currentValue: 1.45,
        expectedValue: 1.12,
        deviation: 29,
        detectedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        aiConfidence: 82,
        impact: '可能需要调整周末备货和排班策略',
        suggestedActions: [
          '持续观察该趋势',
          '调整周末人力和库存配置',
          '分析消费者行为变化原因',
          '更新需求预测模型'
        ],
        status: 'active',
        trend: 'increasing'
      }
    ];

    setAnomalies(initialAnomalies);

    // Simulate new anomaly detection
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAnomaly: Anomaly = {
          id: `anom-${Date.now()}`,
          type: Math.random() > 0.7 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info',
          category: ['demand', 'inventory', 'logistics', 'quality'][Math.floor(Math.random() * 4)] as any,
          title: '新检测到的异常',
          description: 'AI实时监控发现的异常指标',
          metric: '综合指标',
          currentValue: Math.random() * 100,
          expectedValue: Math.random() * 100,
          deviation: Math.random() * 200 - 100,
          detectedAt: new Date(),
          aiConfidence: 75 + Math.random() * 20,
          impact: '正在评估影响范围...',
          suggestedActions: ['正在生成建议...'],
          status: 'active',
          trend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)] as any
        };

        setAnomalies(prev => [newAnomaly, ...prev].slice(0, 10));
        
        if (alertsEnabled) {
          toast.warning('检测到新异常', {
            description: newAnomaly.title
          });
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isMonitoring, alertsEnabled]);

  const getTypeColor = (type: Anomaly['type']) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'from-red-500 to-orange-500',
          border: 'border-red-500/50',
          text: 'text-red-400',
          badge: 'destructive' as const
        };
      case 'warning':
        return {
          bg: 'from-yellow-500 to-orange-500',
          border: 'border-yellow-500/50',
          text: 'text-yellow-400',
          badge: 'secondary' as const
        };
      case 'info':
        return {
          bg: 'from-blue-500 to-cyan-500',
          border: 'border-blue-500/50',
          text: 'text-blue-400',
          badge: 'outline' as const
        };
    }
  };

  const getCategoryIcon = (category: Anomaly['category']) => {
    switch (category) {
      case 'demand':
        return TrendingUp;
      case 'inventory':
        return Activity;
      case 'logistics':
        return Zap;
      case 'quality':
        return CheckCircle;
    }
  };

  const resolveAnomaly = (id: string) => {
    setAnomalies(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'resolved' as const } : a))
    );
    toast.success('异常已标记为已解决');
  };

  const investigateAnomaly = (id: string) => {
    setAnomalies(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'investigating' as const } : a))
    );
    toast.info('已标记为调查中');
  };

  const filteredAnomalies = anomalies.filter(a => {
    if (filter !== 'all' && a.type !== filter) return false;
    if (module !== 'all' && a.category !== module) return false;
    return true;
  });

  const stats = {
    total: filteredAnomalies.length,
    critical: filteredAnomalies.filter(a => a.type === 'critical').length,
    warning: filteredAnomalies.filter(a => a.type === 'warning').length,
    active: filteredAnomalies.filter(a => a.status === 'active').length
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="mb-1 flex items-center gap-2">
                AI异常检测系统
                {isMonitoring && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  ></motion.div>
                )}
              </h3>
              <p className="text-sm text-slate-400">
                实时监控供应链关键指标，AI自动识别异常模式
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">实时监控</span>
              <Switch
                checked={isMonitoring}
                onCheckedChange={setIsMonitoring}
              />
            </div>
            <div className="flex items-center gap-2">
              <Bell className={`w-4 h-4 ${alertsEnabled ? 'text-yellow-400' : 'text-slate-500'}`} />
              <Switch
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <p className="text-xs text-slate-400">总计</p>
            <p className="text-xl text-white">{stats.total}</p>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-xs text-red-400">严重</p>
            <p className="text-xl text-red-400">{stats.critical}</p>
          </div>
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-400">警告</p>
            <p className="text-xl text-yellow-400">{stats.warning}</p>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-400">待处理</p>
            <p className="text-xl text-blue-400">{stats.active}</p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          全部
        </Button>
        <Button
          size="sm"
          variant={filter === 'critical' ? 'default' : 'outline'}
          onClick={() => setFilter('critical')}
          className="text-red-400"
        >
          严重
        </Button>
        <Button
          size="sm"
          variant={filter === 'warning' ? 'default' : 'outline'}
          onClick={() => setFilter('warning')}
          className="text-yellow-400"
        >
          警告
        </Button>
        <Button
          size="sm"
          variant={filter === 'info' ? 'default' : 'outline'}
          onClick={() => setFilter('info')}
          className="text-blue-400"
        >
          信息
        </Button>
      </div>

      {/* Anomaly List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredAnomalies.map((anomaly, index) => {
            const colors = getTypeColor(anomaly.type);
            const Icon = getCategoryIcon(anomaly.category);
            const isSelected = selectedAnomaly === anomaly.id;

            return (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? `bg-slate-800 border-2 ${colors.border}`
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  } ${anomaly.status === 'resolved' ? 'opacity-50' : ''}`}
                  onClick={() => setSelectedAnomaly(isSelected ? null : anomaly.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} rounded-lg flex items-center justify-center shrink-0`}>
                      {anomaly.status === 'resolved' ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={anomaly.status === 'resolved' ? 'line-through' : ''}>
                              {anomaly.title}
                            </h4>
                            {anomaly.trend === 'increasing' && (
                              <TrendingUp className="w-4 h-4 text-red-400" />
                            )}
                            {anomaly.trend === 'decreasing' && (
                              <TrendingDown className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                          <p className="text-sm text-slate-400">{anomaly.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <Badge variant={colors.badge} className="text-xs">
                            {anomaly.type === 'critical' ? '严重' : anomaly.type === 'warning' ? '警告' : '信息'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            AI {anomaly.aiConfidence.toFixed(0)}%
                          </Badge>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{anomaly.detectedAt.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div>
                          <span className={colors.text}>
                            {anomaly.metric}: {anomaly.currentValue.toFixed(0)}
                          </span>
                          <span className="text-slate-500">
                            {' '}(预期: {anomaly.expectedValue.toFixed(0)})
                          </span>
                        </div>
                        <div>
                          <span className={anomaly.deviation > 0 ? 'text-red-400' : 'text-green-400'}>
                            偏差 {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation.toFixed(0)}%
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {anomaly.status === 'active' ? '待处理' : anomaly.status === 'investigating' ? '调查中' : '已解决'}
                        </Badge>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 pt-4 border-t border-slate-800 space-y-4"
                          >
                            {/* Impact */}
                            <div>
                              <h5 className="text-sm mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-400" />
                                业务影响
                              </h5>
                              <p className="text-sm text-slate-400 p-3 bg-slate-800 rounded">
                                {anomaly.impact}
                              </p>
                            </div>

                            {/* Suggested Actions */}
                            <div>
                              <h5 className="text-sm mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                AI建议措施
                              </h5>
                              <div className="space-y-2">
                                {anomaly.suggestedActions.map((action, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-2 p-2 bg-slate-800 rounded text-sm"
                                  >
                                    <div className="w-5 h-5 bg-cyan-500/20 rounded flex items-center justify-center shrink-0 mt-0.5">
                                      <span className="text-xs text-cyan-400">{idx + 1}</span>
                                    </div>
                                    <span className="text-slate-300">{action}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Actions */}
                            {anomaly.status !== 'resolved' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    resolveAnomaly(anomaly.id);
                                  }}
                                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  标记为已解决
                                </Button>
                                {anomaly.status === 'active' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      investigateAnomaly(anomaly.id);
                                    }}
                                    className="flex-1"
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    调查中
                                  </Button>
                                )}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredAnomalies.length === 0 && (
          <Card className="bg-slate-900 border-slate-800 p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h4 className="mb-2">未检测到异常</h4>
            <p className="text-sm text-slate-400">
              AI持续监控中，一切正常运行
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
