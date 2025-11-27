import { useState } from 'react';
import {
  Package,
  Search,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  MapPin,
  ArrowRight,
  Filter,
  Check,
  X,
  Edit,
  Sparkles,
} from 'lucide-react';
import AIInsightPanel from './AIInsightPanel';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface SKUData {
  id: string;
  name: string;
  category: string;
  tags: string[];
  turnoverRate: number;
  totalStock: number;
  status: 'healthy' | 'warning' | 'alert';
}

interface Recommendation {
  id: string;
  type: 'transfer' | 'purchase' | 'redistribute';
  from?: string;
  to?: string;
  warehouse?: string;
  sku: string;
  quantity: number;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
}

export default function InventoryOptimization() {
  const [selectedSKU, setSelectedSKU] = useState<string | null>('A1203');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(
    null
  );
  const [editQuantity, setEditQuantity] = useState(0);

  const skuData: SKUData[] = [
    {
      id: 'A1203',
      name: '智能手表Pro',
      category: '智能穿戴',
      tags: ['畅销品', 'A类商品'],
      turnoverRate: 3.2,
      totalStock: 2850,
      status: 'healthy',
    },
    {
      id: 'B3405',
      name: '无线降噪耳机',
      category: '音频设备',
      tags: ['畅销品', 'A类商品'],
      turnoverRate: 2.8,
      totalStock: 1920,
      status: 'healthy',
    },
    {
      id: 'C7821',
      name: '快充充电宝',
      category: '配件',
      tags: ['长鞭效应源头'],
      turnoverRate: 1.2,
      totalStock: 5420,
      status: 'warning',
    },
    {
      id: 'D2145',
      name: '蓝牙音箱',
      category: '音频设备',
      tags: ['滞销品'],
      turnoverRate: 0.8,
      totalStock: 3150,
      status: 'alert',
    },
    {
      id: 'E9032',
      name: '智能手环',
      category: '智能穿戴',
      tags: ['畅销品'],
      turnoverRate: 2.5,
      totalStock: 1680,
      status: 'healthy',
    },
  ];

  const warehouseDistribution = [
    {
      warehouse: '北京仓',
      region: '华北',
      stock: 450,
      safety: 300,
      max: 800,
      status: 'healthy',
    },
    {
      warehouse: '上海仓',
      region: '华东',
      stock: 680,
      safety: 400,
      max: 1000,
      status: 'healthy',
    },
    {
      warehouse: '广州仓',
      region: '华南',
      stock: 920,
      safety: 500,
      max: 1000,
      status: 'warning',
    },
    {
      warehouse: '成都仓',
      region: '西南',
      stock: 380,
      safety: 350,
      max: 700,
      status: 'healthy',
    },
    {
      warehouse: '武汉仓',
      region: '华中',
      stock: 420,
      safety: 300,
      max: 800,
      status: 'healthy',
    },
  ];

  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: 'rec-1',
      type: 'transfer',
      from: '天津仓',
      to: '北京仓',
      sku: 'A1203',
      quantity: 50,
      reason: '应对本周末的促销活动，预计可避免约8,000元的销售损失',
      urgency: 'high',
      status: 'pending',
    },
    {
      id: 'rec-2',
      type: 'purchase',
      warehouse: '上海仓',
      sku: 'B3405',
      quantity: 200,
      reason: '库存即将低于安全库存线，预计5天后触发缺货',
      urgency: 'medium',
      status: 'pending',
    },
    {
      id: 'rec-3',
      type: 'redistribute',
      from: '广州仓',
      to: '武汉仓',
      sku: 'C7821',
      quantity: 80,
      reason: '优化区域库存分布，降低积压风险',
      urgency: 'low',
      status: 'pending',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'alert':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getTagColor = (tag: string) => {
    if (tag.includes('畅销')) return 'default';
    if (tag.includes('滞销')) return 'destructive';
    if (tag.includes('源头')) return 'secondary';
    return 'outline';
  };

  const filteredSKUs = skuData.filter(
    (sku) =>
      sku.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sku.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const approveRecommendation = (id: string) => {
    const rec = recommendations.find((r) => r.id === id);
    if (!rec) return;

    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r))
    );

    toast.success('补货建议已批准', {
      description: `${rec.type === 'transfer' ? '调拨' : rec.type === 'purchase' ? '采购' : '重新分配'} ${rec.quantity} 件已添加到执行队列`,
    });

    // Auto remove after delay
    setTimeout(() => {
      setRecommendations((prev) => prev.filter((r) => r.id !== id));
    }, 3000);
  };

  const rejectRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' as const } : r))
    );

    toast.info('建议已忽略', {
      description: 'AI将学习此决策以优化未来建议',
    });

    setTimeout(() => {
      setRecommendations((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  const editRecommendation = (rec: Recommendation) => {
    setEditingRecommendation(rec);
    setEditQuantity(rec.quantity);
    setShowEditDialog(true);
  };

  const saveEditedRecommendation = () => {
    if (!editingRecommendation) return;

    setRecommendations((prev) =>
      prev.map((r) =>
        r.id === editingRecommendation.id ? { ...r, quantity: editQuantity } : r
      )
    );

    toast.success('数量已更新', {
      description: `调整为 ${editQuantity} 件`,
    });

    setShowEditDialog(false);
    setEditingRecommendation(null);
  };

  const generateNewPlan = () => {
    toast.info('正在生成补货计划...', {
      description: 'AI正在分析库存数据和需求预测',
    });

    setTimeout(() => {
      // Add a new recommendation
      const newRec: Recommendation = {
        id: `rec-${Date.now()}`,
        type: 'transfer',
        from: '深圳仓',
        to: '广州仓',
        sku: selectedSKU || 'A1203',
        quantity: 100,
        reason: '基于最新需求预测，建议提前补货以满足下周需求高峰',
        urgency: 'medium',
        status: 'pending',
      };

      setRecommendations((prev) => [newRec, ...prev]);

      toast.success('新计划已生成', {
        description: '已添加1条智能补货建议',
      });
    }, 2000);
  };

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-cyan-400" />
            智能库存优化
          </h1>
          <p className="text-sm text-slate-400">全网库存实时监控与智能补货建议</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <CheckCircle className="w-3 h-3 text-green-400" />
            全渠道库存可见: 100%
          </Badge>
          <Badge variant="outline" className="gap-2">
            <AlertTriangle className="w-3 h-3 text-yellow-400" />
            {recommendations.filter((r) => r.status === 'pending').length} 条待处理建议
          </Badge>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left - SKU List */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-lg flex flex-col max-h-[calc(100vh-200px)]">
          <div className="p-4 border-b border-slate-800 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索 SKU 或商品名称..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="healthy">健康</SelectItem>
                  <SelectItem value="warning">预警</SelectItem>
                  <SelectItem value="alert">风险</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredSKUs.map((sku) => (
              <div
                key={sku.id}
                onClick={() => {
                  setSelectedSKU(sku.id);
                  toast.info(`查看 ${sku.name}`, {
                    description: `SKU #${sku.id}`,
                  });
                }}
                className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${
                  selectedSKU === sku.id ? 'bg-slate-800 border-l-4 border-l-cyan-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm">{sku.name}</p>
                    <p className="text-xs text-slate-400">SKU #{sku.id}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs border ${getStatusColor(sku.status)}`}
                  >
                    {sku.status === 'healthy'
                      ? '健康'
                      : sku.status === 'warning'
                        ? '预警'
                        : '风险'}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {sku.tags.map((tag, index) => (
                    <Badge key={index} variant={getTagColor(tag)} className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">周转率: </span>
                    <span
                      className={
                        sku.turnoverRate >= 2.5
                          ? 'text-green-400'
                          : sku.turnoverRate >= 1.5
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }
                    >
                      {sku.turnoverRate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">总库存: </span>
                    <span>{sku.totalStock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - SKU Details */}
        <div className="lg:col-span-3 space-y-6">
          {selectedSKU ? (
            <>
              {/* SKU Overview */}
              <Card className="bg-slate-900 border-slate-800 p-5">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-cyan-400 mb-1">
                      {skuData.find((s) => s.id === selectedSKU)?.name}
                    </h2>
                    <p className="text-sm text-slate-400">SKU #{selectedSKU}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      查看历史
                    </Button>
                    <Button size="sm" onClick={generateNewPlan}>
                      生成补货计划
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">总库存</p>
                    <p className="text-xl">2,850</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">在途库存</p>
                    <p className="text-xl text-cyan-400">320</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">周转率</p>
                    <p className="text-xl text-green-400">3.2</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">缺货风险</p>
                    <p className="text-xl text-green-400">低</p>
                  </div>
                </div>

                {/* Inventory Timeline Chart */}
                <div className="mb-6">
                  <h3 className="text-sm mb-4">库存水平时间线（未来30天预测）</h3>
                  <div className="relative h-48 bg-slate-950 rounded-lg p-4">
                    <svg className="w-full h-full" viewBox="0 0 600 150">
                      {/* Grid */}
                      {[0, 1, 2, 3].map((i) => (
                        <line
                          key={i}
                          x1="40"
                          y1={30 + i * 30}
                          x2="580"
                          y2={30 + i * 30}
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-slate-800"
                        />
                      ))}

                      {/* Safety Stock Line */}
                      <line
                        x1="40"
                        y1="90"
                        x2="580"
                        y2="90"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="text-yellow-500"
                      />
                      <text x="45" y="85" className="text-xs fill-yellow-400">
                        安全库存线
                      </text>

                      {/* Max Stock Line */}
                      <line
                        x1="40"
                        y1="30"
                        x2="580"
                        y2="30"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        className="text-red-500/50"
                      />

                      {/* Inventory Level Line */}
                      <polyline
                        points="40,60 120,55 200,65 280,50 360,70 440,75 520,85 580,95"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-cyan-500"
                      />

                      {/* Current point */}
                      <circle
                        cx="280"
                        cy="50"
                        r="5"
                        fill="currentColor"
                        className="text-cyan-400"
                      />
                      <line
                        x1="280"
                        y1="50"
                        x2="280"
                        y2="140"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        className="text-slate-600"
                      />
                      <text x="285" y="145" className="text-xs fill-slate-400">
                        今天
                      </text>

                      {/* Axis labels */}
                      <text x="580" y="25" textAnchor="end" className="text-xs fill-slate-400">
                        800
                      </text>
                      <text x="580" y="85" textAnchor="end" className="text-xs fill-slate-400">
                        400
                      </text>
                      <text x="580" y="125" textAnchor="end" className="text-xs fill-slate-400">
                        0
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Warehouse Distribution Table */}
                <div>
                  <h3 className="text-sm mb-3">全网仓库库存分布</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>仓库</TableHead>
                        <TableHead>区域</TableHead>
                        <TableHead>当前库存</TableHead>
                        <TableHead>库存状态</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {warehouseDistribution.map((wh, index) => {
                        const percentage = (wh.stock / wh.max) * 100;
                        return (
                          <TableRow key={index}>
                            <TableCell className="text-cyan-400">{wh.warehouse}</TableCell>
                            <TableCell className="text-slate-400">{wh.region}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{wh.stock}</span>
                                <span className="text-xs text-slate-400">/ {wh.max}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-500 ${
                                    percentage > 90
                                      ? 'bg-red-500'
                                      : percentage > 75
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs"
                                onClick={() => {
                                  toast.info('调拨功能', {
                                    description: `从${wh.warehouse}调拨库存`,
                                  });
                                }}
                              >
                                调拨
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* AI Recommendations */}
              <Card className="bg-slate-900 border-slate-800 p-5">
                <h3 className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  AI智能补货建议
                </h3>

                <div className="space-y-3">
                  {recommendations
                    .filter((r) => r.sku === selectedSKU)
                    .map((rec) => (
                      <div
                        key={rec.id}
                        className={`p-4 rounded-lg border transition-all ${
                          rec.status === 'approved'
                            ? 'bg-green-500/10 border-green-500/30 opacity-75'
                            : rec.status === 'rejected'
                              ? 'bg-red-500/10 border-red-500/30 opacity-75'
                              : rec.urgency === 'high'
                                ? 'bg-red-500/10 border-red-500/30'
                                : rec.urgency === 'medium'
                                  ? 'bg-yellow-500/10 border-yellow-500/30'
                                  : 'bg-blue-500/10 border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {rec.type === 'transfer' && (
                              <Badge variant="outline" className="text-xs">
                                调拨
                              </Badge>
                            )}
                            {rec.type === 'purchase' && (
                              <Badge variant="outline" className="text-xs">
                                采购
                              </Badge>
                            )}
                            {rec.type === 'redistribute' && (
                              <Badge variant="outline" className="text-xs">
                                重新分配
                              </Badge>
                            )}
                            <Badge
                              variant={
                                rec.urgency === 'high'
                                  ? 'destructive'
                                  : rec.urgency === 'medium'
                                    ? 'secondary'
                                    : 'outline'
                              }
                              className="text-xs"
                            >
                              {rec.urgency === 'high'
                                ? '高优先级'
                                : rec.urgency === 'medium'
                                  ? '中优先级'
                                  : '低优先级'}
                            </Badge>
                            {rec.status === 'approved' && (
                              <Badge variant="default" className="text-xs">
                                <Check className="w-3 h-3 mr-1" />
                                已批准
                              </Badge>
                            )}
                            {rec.status === 'rejected' && (
                              <Badge variant="destructive" className="text-xs">
                                <X className="w-3 h-3 mr-1" />
                                已忽略
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mb-3">
                          {rec.type === 'transfer' || rec.type === 'redistribute' ? (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span className="text-cyan-400">{rec.from}</span>
                              <ArrowRight className="w-4 h-4 text-slate-400" />
                              <span className="text-cyan-400">{rec.to}</span>
                              <span className="text-slate-400">·</span>
                              <span>{rec.quantity} 件</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span className="text-cyan-400">{rec.warehouse}</span>
                              <span className="text-slate-400">·</span>
                              <span>采购 {rec.quantity} 件</span>
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 mb-3">{rec.reason}</p>

                        {rec.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="text-xs"
                              onClick={() => approveRecommendation(rec.id)}
                            >
                              <Check className="w-3 h-3 mr-1" />
                              一键批准
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => editRecommendation(rec)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              修改数量
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-xs"
                              onClick={() => rejectRecommendation(rec.id)}
                            >
                              <X className="w-3 h-3 mr-1" />
                              忽略
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}

                  {recommendations.filter((r) => r.sku === selectedSKU).length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                      <p>当前SKU库存状况良好</p>
                      <p className="text-xs mt-1">暂无补货建议</p>
                    </div>
                  )}
                </div>
              </Card>
            </>
          ) : (
            <Card className="bg-slate-900 border-slate-800 p-20 text-center">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">请从左侧列表选择一个SKU查看详情</p>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Recommendation Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">修改补货数量</DialogTitle>
            <DialogDescription>调整建议的补货数量</DialogDescription>
          </DialogHeader>

          {editingRecommendation && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-slate-800 rounded">
                <p className="text-sm text-slate-300 mb-2">
                  {editingRecommendation.type === 'transfer'
                    ? `从 ${editingRecommendation.from} 调拨至 ${editingRecommendation.to}`
                    : editingRecommendation.type === 'purchase'
                      ? `采购至 ${editingRecommendation.warehouse}`
                      : `从 ${editingRecommendation.from} 重新分配至 ${editingRecommendation.to}`}
                </p>
                <p className="text-xs text-slate-400">
                  原建议数量: {editingRecommendation.quantity} 件
                </p>
              </div>

              <div>
                <Label htmlFor="quantity" className="text-sm text-slate-300">
                  新数量
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(parseInt(e.target.value) || 0)}
                  className="mt-2"
                  min={1}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              取消
            </Button>
            <Button onClick={saveEditedRecommendation}>保存修改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}