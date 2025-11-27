import { useState, useEffect } from 'react';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Phone,
  AlertCircle,
  CheckCircle,
  Navigation,
  Zap,
  Play,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import AIInsightPanel from './AIInsightPanel';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface Order {
  id: string;
  customer: string;
  address: string;
  priority: 'high' | 'medium' | 'low';
  timeWindow: string;
  weight: number;
  status: 'pending' | 'assigned' | 'in-transit' | 'delivered';
}

interface Vehicle {
  id: string;
  driver: string;
  phone: string;
  capacity: number;
  currentLoad: number;
  status: 'available' | 'in-transit' | 'loading';
  position: { top: string; left: string };
  route: string[];
  eta: string;
}

interface Alert {
  id: number;
  type: 'delay' | 'change' | 'urgent';
  vehicle?: string;
  order?: string;
  message: string;
  time: string;
  status: 'pending' | 'resolved';
}

export default function LogisticsDispatch() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>('V-001');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  const [pendingOrders, setPendingOrders] = useState<Order[]>([
    {
      id: 'ORD-10241',
      customer: '北京朝阳区客户',
      address: '朝阳区建国路88号',
      priority: 'high',
      timeWindow: '14:00-16:00',
      weight: 25,
      status: 'pending',
    },
    {
      id: 'ORD-10242',
      customer: '海淀区客户',
      address: '海淀区中关村大街1号',
      priority: 'medium',
      timeWindow: '15:00-18:00',
      weight: 15,
      status: 'pending',
    },
    {
      id: 'ORD-10243',
      customer: '东城区客户',
      address: '东城区王府井大街200号',
      priority: 'high',
      timeWindow: '13:00-15:00',
      weight: 32,
      status: 'pending',
    },
    {
      id: 'ORD-10244',
      customer: '丰台区客户',
      address: '丰台区南三环西路88号',
      priority: 'low',
      timeWindow: '16:00-19:00',
      weight: 18,
      status: 'pending',
    },
  ]);

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'V-001',
      driver: '张师傅',
      phone: '138-0000-0001',
      capacity: 500,
      currentLoad: 280,
      status: 'in-transit',
      position: { top: '45%', left: '52%' },
      route: ['站点A', '站点B', '站点C'],
      eta: '14:35',
    },
    {
      id: 'V-002',
      driver: '李师傅',
      phone: '138-0000-0002',
      capacity: 500,
      currentLoad: 0,
      status: 'available',
      position: { top: '30%', left: '48%' },
      route: [],
      eta: '--',
    },
    {
      id: 'V-003',
      driver: '王师傅',
      phone: '138-0000-0003',
      capacity: 800,
      currentLoad: 420,
      status: 'in-transit',
      position: { top: '60%', left: '55%' },
      route: ['站点D', '站点E'],
      eta: '15:20',
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'delay',
      vehicle: 'V-001',
      message: '车辆V-001预计晚点30分钟 - 前方道路拥堵',
      time: '13:45',
      status: 'pending',
    },
    {
      id: 2,
      type: 'change',
      order: 'ORD-10238',
      message: '订单#ORD-10238客户修改配送地址',
      time: '13:32',
      status: 'pending',
    },
    {
      id: 3,
      type: 'urgent',
      order: 'ORD-10241',
      message: '紧急订单ORD-10241需要优先配送',
      time: '13:28',
      status: 'pending',
    },
  ]);

  // Simulate vehicle position updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          if (v.status === 'in-transit') {
            // Simulate small position changes
            const topNum = parseFloat(v.position.top);
            const leftNum = parseFloat(v.position.left);
            return {
              ...v,
              position: {
                top: `${topNum + (Math.random() - 0.5) * 0.5}%`,
                left: `${leftNum + (Math.random() - 0.5) * 0.5}%`,
              },
            };
          }
          return v;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'in-transit':
        return 'bg-cyan-500';
      case 'loading':
        return 'bg-yellow-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const optimizeRoute = () => {
    if (selectedOrders.length === 0) {
      toast.warning('请先选择订单', {
        description: '至少选择一个待分配的订单',
      });
      return;
    }

    setIsOptimizing(true);
    setOptimizationProgress(0);

    toast.info('开始优化路线...', {
      description: `正在为 ${selectedOrders.length} 个订单计算最优路线`,
    });

    // Simulate optimization progress
    const progressInterval = setInterval(() => {
      setOptimizationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      // Assign orders to available vehicle
      const availableVehicle = vehicles.find((v) => v.status === 'available');
      if (availableVehicle) {
        const selectedOrderData = pendingOrders.filter((o) =>
          selectedOrders.includes(o.id)
        );
        const totalWeight = selectedOrderData.reduce((sum, o) => sum + o.weight, 0);

        setVehicles((prev) =>
          prev.map((v) =>
            v.id === availableVehicle.id
              ? {
                  ...v,
                  status: 'in-transit' as const,
                  currentLoad: totalWeight,
                  route: selectedOrderData.map((o) => o.customer),
                  eta: '14:45',
                }
              : v
          )
        );

        setPendingOrders((prev) =>
          prev.filter((o) => !selectedOrders.includes(o.id))
        );

        toast.success('路线优化完成!', {
          description: `已分配给 ${availableVehicle.id} - ${availableVehicle.driver}，预计节约15分钟`,
        });
      }

      setIsOptimizing(false);
      setOptimizationProgress(0);
      setSelectedOrders([]);
    }, 2500);
  };

  const assignToVehicle = (vehicleId: string) => {
    if (selectedOrders.length === 0) {
      toast.warning('请先选择订单');
      return;
    }

    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    const selectedOrderData = pendingOrders.filter((o) => selectedOrders.includes(o.id));
    const totalWeight = selectedOrderData.reduce((sum, o) => sum + o.weight, 0);

    if (vehicle.currentLoad + totalWeight > vehicle.capacity) {
      toast.error('车辆容量不足', {
        description: `当前载重 ${vehicle.currentLoad}kg，订单重量 ${totalWeight}kg，容量 ${vehicle.capacity}kg`,
      });
      return;
    }

    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId
          ? {
              ...v,
              currentLoad: v.currentLoad + totalWeight,
              route: [...v.route, ...selectedOrderData.map((o) => o.customer)],
              status: 'in-transit' as const,
            }
          : v
      )
    );

    setPendingOrders((prev) => prev.filter((o) => !selectedOrders.includes(o.id)));

    toast.success('订单已分配', {
      description: `已添加到 ${vehicle.id} 的配送路线`,
    });

    setSelectedOrders([]);
  };

  const resolveAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' as const } : a))
    );

    toast.success('异常已处理', {
      description: '状态已更新',
    });

    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 2000);
  };

  const callDriver = (phone: string, driverName: string) => {
    toast.info(`呼叫 ${driverName}`, {
      description: phone,
    });
  };

  const reroutePlan = (vehicleId: string) => {
    toast.info('重新规划路线...', {
      description: '根据实时路况优化配送顺序',
    });

    setTimeout(() => {
      toast.success('路线已优化', {
        description: '预计可提前10分钟完成配送',
      });
    }, 1500);
  };

  return (
    <div className="h-full flex">
      {/* Left Panel - Task Pool */}
      <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-cyan-400" />
            待分配订单
          </h2>
          <div className="text-xs text-slate-400">
            共 {pendingOrders.length} 个订单待分配
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {pendingOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => toggleOrderSelection(order.id)}
                className={`p-3 bg-slate-800 border rounded-lg cursor-pointer transition-all ${
                  selectedOrders.includes(order.id)
                    ? 'border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500/20'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-cyan-400">{order.id}</p>
                    <p className="text-xs text-slate-400">{order.customer}</p>
                  </div>
                  <div className="flex gap-1">
                    {selectedOrders.includes(order.id) && (
                      <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <Badge variant={getPriorityColor(order.priority)} className="text-xs">
                      {order.priority === 'high'
                        ? '高'
                        : order.priority === 'medium'
                          ? '中'
                          : '低'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{order.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{order.timeWindow}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Package className="w-3 h-3" />
                    <span>{order.weight}kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {selectedOrders.length > 0 && (
          <div className="p-4 border-t border-slate-800 space-y-2">
            <p className="text-xs text-slate-400">已选择 {selectedOrders.length} 个订单</p>

            {isOptimizing && (
              <div className="space-y-2">
                <Progress value={optimizationProgress} className="h-2" />
                <p className="text-xs text-center text-slate-400">
                  优化中... {optimizationProgress}%
                </p>
              </div>
            )}

            <Button
              className="w-full"
              size="sm"
              onClick={optimizeRoute}
              disabled={isOptimizing}
            >
              <Zap className="w-4 h-4 mr-2" />
              {isOptimizing ? '计算中...' : 'AI智能优化路线'}
            </Button>

            <div className="flex gap-2">
              {vehicles
                .filter((v) => v.status === 'available' || v.status === 'loading')
                .map((v) => (
                  <Button
                    key={v.id}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => assignToVehicle(v.id)}
                  >
                    分配至{v.id}
                  </Button>
                ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => setSelectedOrders([])}
            >
              取消选择
            </Button>
          </div>
        )}
      </div>

      {/* Middle Panel - Map View */}
      <div className="flex-1 flex flex-col bg-slate-950">
        <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <h2 className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-cyan-400" />
            实时配送地图
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-400">空闲: {vehicles.filter((v) => v.status === 'available').length}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-slate-400">配送中: {vehicles.filter((v) => v.status === 'in-transit').length}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-400">装载中: {vehicles.filter((v) => v.status === 'loading').length}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          {/* Simplified Map Background */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Street grid */}
              {[20, 40, 60, 80].map((pos) => (
                <g key={pos}>
                  <line
                    x1={pos}
                    y1="10"
                    x2={pos}
                    y2="90"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-slate-600"
                  />
                  <line
                    x1="10"
                    y1={pos}
                    x2="90"
                    y2={pos}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-slate-600"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Vehicle Markers */}
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 hover:scale-125"
              style={{ top: vehicle.position.top, left: vehicle.position.left }}
              onClick={() => {
                setSelectedVehicle(vehicle.id);
                toast.info(`查看 ${vehicle.id}`, {
                  description: `${vehicle.driver} | ${vehicle.status === 'available' ? '空闲' : vehicle.status === 'in-transit' ? '配送中' : '装载中'}`,
                });
              }}
            >
              <div className="relative">
                <div
                  className={`w-6 h-6 ${getStatusColor(vehicle.status)} rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg`}
                >
                  <Truck className="w-3 h-3 text-white" />
                </div>
                {vehicle.status === 'in-transit' && (
                  <div className="absolute inset-0 w-6 h-6 bg-cyan-500 rounded-full opacity-30 animate-ping"></div>
                )}
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="bg-slate-900/95 border border-slate-700 rounded px-2 py-1 text-xs">
                  <p className="text-cyan-400">{vehicle.id}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Route visualization for selected vehicle */}
          {selectedVehicle && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
                </marker>
              </defs>
              <path
                d="M 52% 45% L 48% 52% L 55% 58% L 60% 65%"
                stroke="#06b6d4"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
                strokeLinecap="round"
                markerEnd="url(#arrowhead)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-slate-900/95 border border-slate-800 rounded-lg p-3 text-xs">
            <p className="text-slate-400 mb-2">图例</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Truck className="w-3 h-3 text-cyan-400" />
                <span className="text-slate-300">配送车辆</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-red-400" />
                <span className="text-slate-300">配送站点</span>
              </div>
            </div>
          </div>

          {/* Real-time Clock */}
          <div className="absolute top-4 left-4 bg-slate-900/95 border border-slate-800 rounded-lg px-4 py-2">
            <p className="text-xs text-slate-400 mb-1">当前时间</p>
            <p className="text-lg">{new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Details & Control */}
      <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
        <Tabs defaultValue="vehicle" className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vehicle">车辆详情</TabsTrigger>
              <TabsTrigger value="alerts">
                异常预警
                {alerts.filter((a) => a.status === 'pending').length > 0 && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    {alerts.filter((a) => a.status === 'pending').length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="vehicle" className="flex-1 p-4 space-y-4 overflow-auto">
            {selectedVehicle ? (
              <>
                {vehicles
                  .filter((v) => v.id === selectedVehicle)
                  .map((vehicle) => (
                    <div key={vehicle.id}>
                      {/* Vehicle Header */}
                      <Card className="bg-slate-800 border-slate-700 p-4 mb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-cyan-400 mb-1">{vehicle.id}</h3>
                            <p className="text-sm text-slate-400">{vehicle.driver}</p>
                          </div>
                          <Badge
                            variant={
                              vehicle.status === 'available'
                                ? 'default'
                                : vehicle.status === 'in-transit'
                                  ? 'secondary'
                                  : 'outline'
                            }
                          >
                            {vehicle.status === 'available'
                              ? '空闲'
                              : vehicle.status === 'in-transit'
                                ? '配送中'
                                : '装载中'}
                          </Badge>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">联系电话</span>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{vehicle.phone}</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-400">载重</span>
                              <span>
                                {vehicle.currentLoad}kg / {vehicle.capacity}kg
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-500 transition-all duration-500"
                                style={{
                                  width: `${(vehicle.currentLoad / vehicle.capacity) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {vehicle.eta !== '--' && (
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">预计到达下一站</span>
                              <span className="text-green-400">{vehicle.eta}</span>
                            </div>
                          )}
                        </div>
                      </Card>

                      {/* Route Details */}
                      <Card className="bg-slate-800 border-slate-700 p-4">
                        <h3 className="text-sm mb-3">配送路线</h3>
                        {vehicle.route.length > 0 ? (
                          <div className="space-y-3">
                            {vehicle.route.map((stop, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                      index === 0
                                        ? 'bg-cyan-500 text-white'
                                        : 'bg-slate-700 text-slate-400'
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                  {index < vehicle.route.length - 1 && (
                                    <div className="w-0.5 h-8 bg-slate-700"></div>
                                  )}
                                </div>
                                <div className="flex-1 pt-1">
                                  <p className="text-sm">{stop}</p>
                                  <p className="text-xs text-slate-400">
                                    {index === 0 ? '进行中' : '待配送'}
                                  </p>
                                </div>
                                {index === 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    ETA {vehicle.eta}
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-400 text-center py-4">
                            暂无配送任务
                          </p>
                        )}
                      </Card>

                      {/* Actions */}
                      <div className="mt-4 space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => reroutePlan(vehicle.id)}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          重新规划路线
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => callDriver(vehicle.phone, vehicle.driver)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          联系司机
                        </Button>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                <div className="text-center">
                  <Truck className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p>请在地图上选择一个车辆</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="flex-1 p-4 space-y-3 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm">实时异常警报</h3>
              <Badge variant="destructive" className="text-xs">
                {alerts.filter((a) => a.status === 'pending').length} 个待处理
              </Badge>
            </div>

            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className={`p-4 transition-opacity ${
                  alert.status === 'resolved'
                    ? 'opacity-50'
                    : alert.type === 'urgent'
                      ? 'bg-red-500/10 border-red-500/30'
                      : alert.type === 'delay'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-blue-500/10 border-blue-500/30'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle
                    className={`w-5 h-5 mt-0.5 ${
                      alert.type === 'urgent'
                        ? 'text-red-400'
                        : alert.type === 'delay'
                          ? 'text-yellow-400'
                          : 'text-blue-400'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm mb-1">{alert.message}</p>
                    <p className="text-xs text-slate-400">{alert.time}</p>
                  </div>
                  {alert.status === 'resolved' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>

                {alert.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      <Check className="w-3 h-3 mr-1" />
                      处理
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      <X className="w-3 h-3 mr-1" />
                      忽略
                    </Button>
                  </div>
                )}
              </Card>
            ))}

            {alerts.filter((a) => a.status === 'pending').length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <p>暂无待处理异常</p>
                <p className="text-xs mt-1">所有配送正常进行</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="p-4 border-t border-slate-800 grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">在途车辆</p>
            <p className="text-xl text-cyan-400">
              {vehicles.filter((v) => v.status === 'in-transit').length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">待配送</p>
            <p className="text-xl text-yellow-400">{pendingOrders.length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">准时率</p>
            <p className="text-xl text-green-400">98%</p>
          </div>
        </div>
      </div>
    </div>
  );
}