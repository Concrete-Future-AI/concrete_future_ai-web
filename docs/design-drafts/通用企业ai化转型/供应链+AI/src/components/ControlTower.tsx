import { useState, useEffect } from 'react';
import {
  DollarSign,
  Target,
  TrendingUp,
  Truck,
  AlertTriangle,
  Lightbulb,
  MapPin,
  Layers,
  Play,
  RotateCcw,
  Save,
  Sparkles,
} from 'lucide-react';
import KPICard from './KPICard';
import AIInsightPanel from './AIInsightPanel';
import ChinaMapImproved from './ChinaMapImproved';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { toast } from 'sonner@2.0.3';

type MapLayer = 'inventory' | 'logistics' | 'risk' | 'service';

interface Warehouse {
  id: string;
  name: string;
  region: string;
  top: string;
  left: string;
  status: 'healthy' | 'warning' | 'alert';
  inventory: number;
  fulfillment: number;
}

interface SimulationResult {
  logisticsCost: number;
  fulfillmentRate: number;
  inventoryCost: number;
}

export default function ControlTower() {
  const [selectedLayer, setSelectedLayer] = useState<MapLayer>('inventory');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulationParams, setSimulationParams] = useState({
    warehouse: 'wh-gz',
    inventoryChange: 0,
  });
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Real-time KPI updates
  const [kpiData, setKpiData] = useState([
    {
      title: '总库存持有成本',
      value: '¥42.6',
      unit: 'M',
      change: -8.2,
      changeLabel: '较上月',
      icon: DollarSign,
      color: 'green' as const,
    },
    {
      title: '订单完美履约率 (OTIF)',
      value: '96.8',
      unit: '%',
      change: 2.4,
      changeLabel: '较上月',
      icon: Target,
      color: 'cyan' as const,
    },
    {
      title: '预测准确度 (MAPE)',
      value: '91.3',
      unit: '%',
      change: 4.1,
      changeLabel: '较上月',
      icon: TrendingUp,
      color: 'purple' as const,
    },
    {
      title: '平均运输成本',
      value: '¥156',
      unit: '/单',
      change: -5.6,
      changeLabel: '较上月',
      icon: Truck,
      color: 'orange' as const,
    },
  ]);

  const [insights, setInsights] = useState([
    {
      type: 'warning',
      message: '华南地区未来3个月需求预测上调15%，而该区域仓库容量已达90%。建议启动二号仓库或租赁临时仓。',
      priority: 'high',
    },
    {
      type: 'info',
      message: '通过优化上海-杭州配送路线，本周可节约运输成本约2.3万元。',
      priority: 'medium',
    },
    {
      type: 'success',
      message: 'SKU #A1203在华北地区库存周转率提升至3.2，达到优化目标。',
      priority: 'low',
    },
  ]);

  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: 'wh-bj',
      name: '北京仓',
      region: '华北',
      top: '28%',
      left: '55%',
      status: 'healthy',
      inventory: 85,
      fulfillment: 98,
    },
    {
      id: 'wh-sh',
      name: '上海仓',
      region: '华东',
      top: '42%',
      left: '62%',
      status: 'healthy',
      inventory: 78,
      fulfillment: 96,
    },
    {
      id: 'wh-gz',
      name: '广州仓',
      region: '华南',
      top: '68%',
      left: '56%',
      status: 'warning',
      inventory: 92,
      fulfillment: 94,
    },
    {
      id: 'wh-cd',
      name: '成都仓',
      region: '西南',
      top: '55%',
      left: '45%',
      status: 'healthy',
      inventory: 72,
      fulfillment: 97,
    },
    {
      id: 'wh-wh',
      name: '武汉仓',
      region: '华中',
      top: '45%',
      left: '55%',
      status: 'alert',
      inventory: 45,
      fulfillment: 89,
    },
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWarehouses((prev) =>
        prev.map((wh) => ({
          ...wh,
          inventory: Math.max(30, Math.min(95, wh.inventory + (Math.random() - 0.5) * 2)),
          fulfillment: Math.max(85, Math.min(99, wh.fulfillment + (Math.random() - 0.5) * 0.5)),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const runSimulation = () => {
    setIsSimulating(true);
    
    // Simulate API call
    setTimeout(() => {
      const inventoryDelta = simulationParams.inventoryChange;
      
      // Simple simulation logic
      const logisticsCostChange = inventoryDelta < 0 ? Math.abs(inventoryDelta) * 600 : -Math.abs(inventoryDelta) * 300;
      const fulfillmentChange = inventoryDelta < 0 ? inventoryDelta * 0.12 : inventoryDelta * 0.05;
      const inventoryCostChange = inventoryDelta * 800;
      
      setSimulationResult({
        logisticsCost: logisticsCostChange,
        fulfillmentRate: fulfillmentChange,
        inventoryCost: inventoryCostChange,
      });
      
      setIsSimulating(false);
      toast.success('模拟计算完成', {
        description: '已生成影响分析结果',
      });
    }, 1500);
  };

  const applySimulation = () => {
    if (!simulationResult) return;
    
    // Update warehouses
    setWarehouses((prev) =>
      prev.map((wh) =>
        wh.id === simulationParams.warehouse
          ? {
              ...wh,
              inventory: Math.max(30, Math.min(95, wh.inventory + simulationParams.inventoryChange)),
            }
          : wh
      )
    );
    
    // Add insight
    const warehouseName = warehouses.find(w => w.id === simulationParams.warehouse)?.name;
    setInsights((prev) => [
      {
        type: 'info',
        message: `${warehouseName}库存调整${simulationParams.inventoryChange > 0 ? '增加' : '减少'}${Math.abs(simulationParams.inventoryChange)}%已应用，预计影响：物流成本${simulationResult.logisticsCost > 0 ? '+' : ''}¥${Math.abs(simulationResult.logisticsCost).toLocaleString()}，订单满足率${simulationResult.fulfillmentRate > 0 ? '+' : ''}${simulationResult.fulfillmentRate.toFixed(1)}%`,
        priority: 'medium',
      },
      ...prev.slice(0, 4),
    ]);
    
    setShowSimulator(false);
    setSimulationResult(null);
    setSimulationParams({ warehouse: 'wh-gz', inventoryChange: 0 });
    
    toast.success('策略已应用', {
      description: '供应链网络已根据模拟结果进行调整',
    });
  };

  const handleLayerChange = (layer: MapLayer) => {
    setSelectedLayer(layer);
    toast.info('图层已切换', {
      description: `当前显示: ${layer === 'inventory' ? '库存分布' : layer === 'logistics' ? '物流干线' : layer === 'risk' ? '风险区域' : '服务水平'}`,
    });
  };

  const refreshData = () => {
    toast.info('正在刷新数据...', {
      description: '从所有节点同步最新信息',
    });
    
    setTimeout(() => {
      setWarehouses((prev) =>
        prev.map((wh) => ({
          ...wh,
          status: wh.inventory > 90 ? 'warning' : wh.inventory < 50 ? 'alert' : 'healthy',
        }))
      );
      toast.success('数据已更新', {
        description: '所有节点状态已同步',
      });
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'alert':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  // Convert warehouses to ChinaMapImproved locations format
  const mapLocations = warehouses.map((wh) => ({
    id: wh.id,
    name: wh.name,
    type: 'warehouse' as const,
    region: wh.region,
    x: parseFloat(wh.left),
    y: parseFloat(wh.top),
    status: wh.status === 'alert' ? 'critical' as const : wh.status as 'healthy' | 'warning',
    inventory: Math.round(wh.inventory * 10),
    capacity: 1000,
    demand: Math.round(800 + Math.random() * 400),
    trend: wh.inventory > 80 ? 'up' as const : wh.inventory < 60 ? 'down' as const : 'stable' as const
  }));

  return (
    <div className="h-full p-6 space-y-6">
      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Control Tower View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)]">
        {/* Map View */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              全国供应链网络地图
            </h2>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={selectedLayer === 'inventory' ? 'default' : 'outline'}
                onClick={() => handleLayerChange('inventory')}
                className="h-8 text-xs"
              >
                库存分布
              </Button>
              <Button
                size="sm"
                variant={selectedLayer === 'logistics' ? 'default' : 'outline'}
                onClick={() => handleLayerChange('logistics')}
                className="h-8 text-xs"
              >
                物流干线
              </Button>
              <Button
                size="sm"
                variant={selectedLayer === 'risk' ? 'default' : 'outline'}
                onClick={() => handleLayerChange('risk')}
                className="h-8 text-xs"
              >
                风险区域
              </Button>
              <Button
                size="sm"
                variant={selectedLayer === 'service' ? 'default' : 'outline'}
                onClick={() => handleLayerChange('service')}
                className="h-8 text-xs"
              >
                服务水平
              </Button>
              <Button size="sm" variant="ghost" onClick={refreshData}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 relative bg-slate-950">
            {/* China Map with warehouse markers */}
            <ChinaMapImproved 
              locations={mapLocations}
              selectedLayer={selectedLayer === 'inventory' ? 'inventory' : selectedLayer === 'logistics' ? 'logistics' : 'demand'}
              onLocationClick={(location) => {
                setSelectedLocation(location.id);
                toast.info(`查看 ${location.name}`, {
                  description: `${location.region} | 库存利用率 ${location.inventory}/${location.capacity}`,
                });
              }}
              showHeatmap={selectedLayer === 'inventory'}
            />

            {/* Overlay warehouse markers on top */}
            {warehouses.map((wh) => (
              <div
                key={wh.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                style={{ top: wh.top, left: wh.left }}
                onClick={() => {
                  setSelectedLocation(wh.id);
                  toast.info(`查看 ${wh.name}`, {
                    description: `${wh.region} | 库存利用率 ${wh.inventory.toFixed(0)}%`,
                  });
                }}
              >
                <div className="relative">
                  <div
                    className={`w-4 h-4 ${getStatusColor(wh.status)} rounded-full animate-pulse`}
                  ></div>
                  <div
                    className={`absolute inset-0 w-4 h-4 ${getStatusColor(wh.status)} rounded-full opacity-30 animate-ping`}
                  ></div>
                </div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-slate-900/95 border border-slate-700 rounded px-2 py-1 text-xs">
                    <p className="text-cyan-400">{wh.name}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Logistics Lines */}
            {selectedLayer === 'logistics' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <line
                  x1="55%"
                  y1="28%"
                  x2="62%"
                  y2="42%"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="62%"
                  y1="42%"
                  x2="56%"
                  y2="68%"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="55%"
                  y1="45%"
                  x2="45%"
                  y2="55%"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
              </svg>
            )}

            {/* Risk Areas */}
            {selectedLayer === 'risk' && (
              <>
                <div
                  className="absolute w-32 h-32 bg-red-500/20 border-2 border-red-500/50 rounded-full animate-pulse"
                  style={{ top: '65%', left: '53%', transform: 'translate(-50%, -50%)' }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-red-400 whitespace-nowrap">
                    暴雨预警
                  </div>
                </div>
              </>
            )}

            {/* Selected Location Details */}
            {selectedLocation && (
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
                {warehouses
                  .filter((wh) => wh.id === selectedLocation)
                  .map((wh) => (
                    <div key={wh.id}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-cyan-400">{wh.name}</h3>
                          <p className="text-xs text-slate-400">{wh.region}</p>
                        </div>
                        <Badge
                          variant={
                            wh.status === 'healthy'
                              ? 'default'
                              : wh.status === 'warning'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {wh.status === 'healthy'
                            ? '健康'
                            : wh.status === 'warning'
                              ? '预警'
                              : '风险'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400 text-xs mb-1">库存利用率</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  wh.inventory > 90
                                    ? 'bg-red-500'
                                    : wh.inventory > 80
                                      ? 'bg-yellow-500'
                                      : 'bg-green-500'
                                }`}
                                style={{ width: `${wh.inventory}%` }}
                              ></div>
                            </div>
                            <span>{wh.inventory.toFixed(0)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs mb-1">订单满足率</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-500 transition-all duration-500"
                                style={{ width: `${wh.fulfillment}%` }}
                              ></div>
                            </div>
                            <span>{wh.fulfillment.toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-3 w-full text-xs"
                        onClick={() => setSelectedLocation(null)}
                      >
                        关闭
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              图层:{' '}
              {selectedLayer === 'inventory'
                ? '库存分布'
                : selectedLayer === 'logistics'
                  ? '物流干线'
                  : selectedLayer === 'risk'
                    ? '风险区域'
                    : '服务水平'}
            </span>
            <span>更新时间: {new Date().toLocaleTimeString('zh-CN')}</span>
          </div>
        </div>

        {/* Right Panel - AI Insights & Alerts */}
        <div className="space-y-4">
          {/* AI Strategic Insights */}
          <AIInsightPanel module="control-tower" />

          {/* What-If Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <h3 className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-purple-400" />
              What-If 沙盘推演
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800 rounded border border-slate-700">
                <p className="text-xs text-slate-400 mb-2">快速场景模拟</p>
                <p className="text-sm mb-3">评估策略调整对供应链的影响</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-900 rounded">
                    <p className="text-slate-400">成本影响</p>
                    <p className="text-cyan-400">实时计算</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded">
                    <p className="text-slate-400">服务水平</p>
                    <p className="text-cyan-400">动态预测</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => setShowSimulator(true)}
              >
                <Play className="w-3 h-3 mr-2" />
                创建新模拟场景
              </Button>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <h3 className="text-sm mb-3">角色视图切换</h3>
            <Tabs defaultValue="director" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto">
                <TabsTrigger value="director" className="text-xs py-2">
                  总监
                </TabsTrigger>
                <TabsTrigger value="planner" className="text-xs py-2">
                  计划经理
                </TabsTrigger>
                <TabsTrigger value="dispatcher" className="text-xs py-2">
                  调度员
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-xs text-slate-400 mt-3">当前视图: 战略指挥家视角</p>
          </div>
        </div>
      </div>

      {/* Simulation Dialog */}
      <Dialog open={showSimulator} onOpenChange={setShowSimulator}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">What-If 场景模拟器</DialogTitle>
            <DialogDescription>
              调整参数，查看对供应链网络的影响
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="warehouse" className="text-sm text-slate-300">
                选择仓库
              </Label>
              <Select
                value={simulationParams.warehouse}
                onValueChange={(value) =>
                  setSimulationParams({ ...simulationParams, warehouse: value })
                }
              >
                <SelectTrigger id="warehouse" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((wh) => (
                    <SelectItem key={wh.id} value={wh.id}>
                      {wh.name} - {wh.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="inventory" className="text-sm text-slate-300">
                库存水平调整: {simulationParams.inventoryChange > 0 ? '+' : ''}
                {simulationParams.inventoryChange}%
              </Label>
              <Slider
                id="inventory"
                min={-30}
                max={30}
                step={5}
                value={[simulationParams.inventoryChange]}
                onValueChange={(value) =>
                  setSimulationParams({ ...simulationParams, inventoryChange: value[0] })
                }
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>-30%</span>
                <span>0%</span>
                <span>+30%</span>
              </div>
            </div>

            {simulationResult && (
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-300 mb-3">模拟结果</p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-2 bg-slate-900 rounded">
                    <p className="text-slate-400 mb-1">物流成本</p>
                    <p
                      className={
                        simulationResult.logisticsCost > 0 ? 'text-red-400' : 'text-green-400'
                      }
                    >
                      {simulationResult.logisticsCost > 0 ? '+' : ''}¥
                      {Math.abs(simulationResult.logisticsCost).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded">
                    <p className="text-slate-400 mb-1">订单满足率</p>
                    <p
                      className={
                        simulationResult.fulfillmentRate > 0 ? 'text-green-400' : 'text-red-400'
                      }
                    >
                      {simulationResult.fulfillmentRate > 0 ? '+' : ''}
                      {simulationResult.fulfillmentRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded">
                    <p className="text-slate-400 mb-1">库存成本</p>
                    <p
                      className={
                        simulationResult.inventoryCost > 0 ? 'text-red-400' : 'text-green-400'
                      }
                    >
                      {simulationResult.inventoryCost > 0 ? '+' : ''}¥
                      {Math.abs(simulationResult.inventoryCost).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSimulator(false)}>
              取消
            </Button>
            {!simulationResult ? (
              <Button onClick={runSimulation} disabled={isSimulating}>
                {isSimulating ? '计算中...' : '运行模拟'}
              </Button>
            ) : (
              <Button onClick={applySimulation}>
                <Save className="w-4 h-4 mr-2" />
                应用此策略
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}