import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, AlertTriangle, CheckCircle, Info, Zap, Activity, Bell, XCircle, Clock } from 'lucide-react';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface MonitoringEvent {
  id: string;
  type: 'anomaly' | 'warning' | 'success' | 'info';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  detectedAt: Date;
  category: string;
  autoAction?: string;
  metrics?: {
    current: number;
    expected: number;
    deviation: number;
  };
}

interface AIMonitoringCenterProps {
  compact?: boolean;
}

export default function AIMonitoringCenter({ compact = false }: AIMonitoringCenterProps) {
  const [events, setEvents] = useState<MonitoringEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [stats, setStats] = useState({
    monitored: 0,
    anomalies: 0,
    resolved: 0,
    active: 0
  });

  useEffect(() => {
    // 模拟实时监控
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newEvent = generateRandomEvent();
        setEvents(prev => [newEvent, ...prev.slice(0, 19)]);
        
        // 更新统计
        setStats(prev => ({
          ...prev,
          monitored: prev.monitored + 1,
          anomalies: newEvent.type === 'anomaly' ? prev.anomalies + 1 : prev.anomalies,
          active: prev.active + (newEvent.severity === 'critical' || newEvent.severity === 'high' ? 1 : 0)
        }));

        // 严重事件通知
        if (newEvent.severity === 'critical') {
          toast.error(newEvent.title, {
            description: newEvent.description
          });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomEvent = (): MonitoringEvent => {
    const eventTypes = [
      {
        type: 'anomaly' as const,
        severity: 'critical' as const,
        title: '价格异常波动',
        description: 'IT设备类别价格在过去1小时上涨28%，超出正常波动范围',
        category: '价格监控',
        metrics: { current: 128, expected: 100, deviation: 28 }
      },
      {
        type: 'warning' as const,
        severity: 'high' as const,
        title: '供应商响应延迟',
        description: '华为技术响应时间从平均2小时增加至6小时',
        category: '供应商监控',
        autoAction: '已自动通知备选供应商'
      },
      {
        type: 'success' as const,
        severity: 'low' as const,
        title: '自动审批完成',
        description: 'AI引擎自动审批通过15个低风险采购申请',
        category: '流程自动化',
        autoAction: '已自动批准并通知申请人'
      },
      {
        type: 'info' as const,
        severity: 'medium' as const,
        title: '需求量预测更新',
        description: 'AI检测到办公用品需求增长趋势，建议提前备货',
        category: '需求预测'
      },
      {
        type: 'warning' as const,
        severity: 'high' as const,
        title: '预算超支预警',
        description: '市场部本月采购已达预算的85%，预计月底将超支12%',
        category: '预算监控',
        metrics: { current: 85, expected: 65, deviation: 20 }
      },
      {
        type: 'anomaly' as const,
        severity: 'critical' as const,
        title: '合同条款风险',
        description: 'AI检测到新合同中存在不利条款，可能导致法律风险',
        category: '合同审查',
        autoAction: '已标记并通知法务部门'
      }
    ];

    const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    return {
      ...event,
      id: Date.now().toString(),
      detectedAt: new Date()
    };
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'anomaly':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <Bell className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-500/10 text-green-700 border-green-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'anomaly':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-orange-600 bg-orange-50';
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (compact) {
    return (
      <Card className="elevation-2 border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg ai-gradient flex items-center justify-center relative">
                <Eye className="h-4 w-4 text-white" />
                {isMonitoring && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </div>
              <CardTitle className="text-sm">AI实时监控</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {events.length} 事件
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 surface-variant rounded-lg">
              <p className="text-xs text-muted-foreground">监控中</p>
              <p className="text-lg font-semibold">{stats.monitored}</p>
            </div>
            <div className="text-center p-2 surface-variant rounded-lg">
              <p className="text-xs text-muted-foreground">活跃告警</p>
              <p className="text-lg font-semibold text-orange-600">{stats.active}</p>
            </div>
          </div>
          
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent/5 md-transition-fast">
              <div className={`p-1.5 rounded ${getTypeColor(event.type)}`}>
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {event.detectedAt.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl ai-gradient flex items-center justify-center ai-glow relative">
            <Eye className="h-5 w-5 text-white" />
            {isMonitoring && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"
              />
            )}
          </div>
          <div>
            <h3 className="font-medium">AI实时监控中心</h3>
            <p className="text-sm text-muted-foreground">24/7智能监控，异常自动检测与响应</p>
          </div>
        </div>
        <Badge className="ai-gradient text-white border-0">
          <Activity className="h-3 w-3 mr-1 animate-pulse" />
          实时运行中
        </Badge>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="elevation-1 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">监控指标</p>
                <p className="text-2xl font-semibold mt-1">{stats.monitored}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">异常检测</p>
                <p className="text-2xl font-semibold mt-1">{stats.anomalies}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已解决</p>
                <p className="text-2xl font-semibold mt-1">{stats.resolved}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">活跃告警</p>
                <p className="text-2xl font-semibold mt-1 text-orange-600">{stats.active}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 事件流 */}
      <Card className="elevation-2 border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">实时事件流</CardTitle>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">正在监控</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              <AnimatePresence>
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="elevation-1 border-l-4 border-l-purple-500 hover-lift">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(event.type)}`}>
                            {getEventIcon(event.type)}
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{event.title}</h4>
                                  <Badge className={getSeverityColor(event.severity)}>
                                    {event.severity === 'critical' ? '严重' :
                                     event.severity === 'high' ? '高' :
                                     event.severity === 'medium' ? '中' : '低'}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {event.detectedAt.toLocaleTimeString('zh-CN', { 
                                  hour: '2-digit', 
                                  minute: '2-digit',
                                  second: '2-digit'
                                })}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {event.category}
                              </Badge>
                              {event.autoAction && (
                                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                                  <Zap className="h-3 w-3 mr-1" />
                                  {event.autoAction}
                                </Badge>
                              )}
                            </div>

                            {event.metrics && (
                              <div className="flex items-center gap-4 p-2 surface-variant rounded-lg text-sm">
                                <div>
                                  <span className="text-muted-foreground">当前: </span>
                                  <span className="font-semibold">{event.metrics.current}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">预期: </span>
                                  <span className="font-semibold">{event.metrics.expected}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">偏差: </span>
                                  <span className="font-semibold text-red-600">
                                    {event.metrics.deviation > 0 ? '+' : ''}{event.metrics.deviation}%
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {events.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>系统运行正常，暂无异常事件</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
