import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { 
  Workflow,
  Plus,
  Play,
  Pause,
  Settings,
  Mail,
  MessageSquare,
  Clock,
  Users,
  Target,
  TrendingUp,
  Sparkles,
  DollarSign,
  MousePointer,
  ShoppingCart,
  CheckCircle2,
  HelpCircle,
  Zap,
  BarChart3,
  Activity,
  Eye,
  ArrowRight,
  RefreshCw,
  Download,
  Share2,
  AlertCircle,
  TrendingDown,
  Edit,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Save,
  FileText,
  Send,
  Filter,
  Copy,
  Link2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from 'recharts';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type Role = 'director' | 'manager' | 'specialist';

interface CampaignOrchestratorProps {
  role: Role;
}

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'delay' | 'condition' | 'end';
  label: string;
  x: number;
  y: number;
  icon: any;
  color: string;
  status: 'active' | 'pending' | 'completed';
  config?: any;
}

interface Connection {
  from: string;
  to: string;
  type: 'yes' | 'no' | 'default';
}

const DraggableNode = ({ node, onDrag, onSelect, isSelected, onDelete, onEdit }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'workflow-node',
    item: { id: node.id, x: node.x, y: node.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = node.icon;
  const getNodeColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-400 to-blue-600',
      purple: 'from-purple-400 to-purple-600',
      amber: 'from-amber-400 to-amber-600',
      pink: 'from-pink-400 to-pink-600',
      green: 'from-green-400 to-green-600',
      orange: 'from-orange-400 to-orange-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: isSelected ? 1.1 : 1 }}
      onClick={() => onSelect(node.id)}
      className={`absolute cursor-move transition-all ${
        isSelected ? 'z-20' : 'z-10 hover:scale-105'
      }`}
      style={{ left: `${node.x}px`, top: `${node.y}px` }}
    >
      <div className="relative group">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getNodeColor(node.color)} shadow-lg flex items-center justify-center ${
          node.status === 'active' ? 'ring-2 ring-offset-2 ring-green-400 animate-pulse' : ''
        } ${isSelected ? 'ring-4 ring-purple-500 ring-offset-2' : ''}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {node.status === 'active' && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
        <p className="text-xs text-center mt-2 text-gray-700 max-w-[90px] leading-tight">
          {node.label}
        </p>
        {node.type === 'condition' && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
            ?
          </div>
        )}
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 glass-card p-2 rounded-lg shadow-lg whitespace-nowrap flex items-center gap-1"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => onEdit(node)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>编辑节点</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-7 px-2">
                    <Copy className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>复制节点</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-7 px-2">
                    <Link2 className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>连接节点</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 px-2 text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(node.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>删除节点</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

function CampaignOrchestratorContent({ role }: CampaignOrchestratorProps) {
  const [autopilotEnabled, setAutopilotEnabled] = useState(false);
  const [budget, setBudget] = useState(10000);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [showNodePalette, setShowNodePalette] = useState(false);
  const [editingNode, setEditingNode] = useState<WorkflowNode | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [liveMetrics, setLiveMetrics] = useState({
    activeVisitors: 1250,
    conversions: 42,
    revenue: 12680
  });

  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 'trigger-1', type: 'trigger', label: '用户注册', x: 80, y: 120, icon: Users, color: 'blue', status: 'active' },
    { id: 'action-1', type: 'action', label: '发送欢迎邮件', x: 280, y: 120, icon: Mail, color: 'purple', status: 'active' },
    { id: 'delay-1', type: 'delay', label: '等待24小时', x: 480, y: 120, icon: Clock, color: 'amber', status: 'active' },
    { id: 'condition-1', type: 'condition', label: '是否打开邮件?', x: 680, y: 120, icon: MousePointer, color: 'pink', status: 'active' },
    { id: 'action-2', type: 'action', label: '发送产品推荐', x: 880, y: 60, icon: Mail, color: 'purple', status: 'active' },
    { id: 'action-3', type: 'action', label: '发送再营销短信', x: 880, y: 180, icon: MessageSquare, color: 'green', status: 'pending' },
    { id: 'condition-2', type: 'condition', label: '是否完成购买?', x: 1080, y: 60, icon: ShoppingCart, color: 'pink', status: 'active' },
    { id: 'end-1', type: 'end', label: '转化成功', x: 1280, y: 40, icon: CheckCircle2, color: 'green', status: 'completed' },
    { id: 'action-4', type: 'action', label: '发送优惠券', x: 1280, y: 110, icon: Target, color: 'orange', status: 'active' }
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { from: 'trigger-1', to: 'action-1', type: 'default' },
    { from: 'action-1', to: 'delay-1', type: 'default' },
    { from: 'delay-1', to: 'condition-1', type: 'default' },
    { from: 'condition-1', to: 'action-2', type: 'yes' },
    { from: 'condition-1', to: 'action-3', type: 'no' },
    { from: 'action-2', to: 'condition-2', type: 'default' },
    { from: 'condition-2', to: 'end-1', type: 'yes' },
    { from: 'condition-2', to: 'action-4', type: 'no' },
  ]);

  const nodeTemplates = [
    { type: 'trigger', label: '触发器', icon: Zap, color: 'blue', description: '开始营销流程' },
    { type: 'action', label: '发送邮件', icon: Mail, color: 'purple', description: '发送邮件给用户' },
    { type: 'action', label: '发送短信', icon: MessageSquare, color: 'green', description: '发送短信通知' },
    { type: 'delay', label: '延迟等待', icon: Clock, color: 'amber', description: '等待指定时间' },
    { type: 'condition', label: '条件判断', icon: Filter, color: 'pink', description: '根据条件分支' },
    { type: 'action', label: '更新标签', icon: Target, color: 'orange', description: '更新用户标签' },
    { type: 'end', label: '结束', icon: CheckCircle2, color: 'green', description: '结束流程' },
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setLiveMetrics(prev => ({
          activeVisitors: prev.activeVisitors + Math.floor(Math.random() * 20 - 10),
          conversions: prev.conversions + Math.floor(Math.random() * 3),
          revenue: prev.revenue + Math.floor(Math.random() * 500)
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const [, drop] = useDrop(() => ({
    accept: 'workflow-node',
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        handleNodeDrag(item.id, item.x + delta.x / zoom, item.y + delta.y / zoom);
      }
    },
  }));

  const handleNodeDrag = useCallback((id: string, x: number, y: number) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, x: Math.max(0, x), y: Math.max(0, y) } : node
    ));
  }, []);

  const handleNodeSelect = useCallback((id: string) => {
    setSelectedNode(prev => prev === id ? null : id);
  }, []);

  const handleNodeDelete = useCallback((id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setConnections(prev => prev.filter(conn => conn.from !== id && conn.to !== id));
    setSelectedNode(null);
  }, []);

  const handleAddNode = useCallback((template: any) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: template.type,
      label: template.label,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      icon: template.icon,
      color: template.color,
      status: 'pending'
    };
    setNodes(prev => [...prev, newNode]);
    setShowNodePalette(false);
  }, []);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const getConnectionPath = (from: WorkflowNode, to: WorkflowNode) => {
    const fromX = from.x + 100;
    const fromY = from.y + 40;
    const toX = to.x;
    const toY = to.y + 40;
    
    const midX = (fromX + toX) / 2;
    
    return `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;
  };

  const abTestResults = [
    { version: 'A - 技术卖点', impressions: 15000, clicks: 780, conversions: 234, spend: 3200, roi: 4.2, ctr: 5.2, cvr: 1.56 },
    { version: 'B - 价格优惠', impressions: 15000, clicks: 1120, conversions: 378, spend: 3200, roi: 6.8, ctr: 7.5, cvr: 2.52 },
    { version: 'C - 用户评价', impressions: 15000, clicks: 520, conversions: 145, spend: 3200, roi: 2.9, ctr: 3.5, cvr: 0.97 }
  ];

  const performanceMetrics = {
    totalReach: 125000 + liveMetrics.activeVisitors,
    totalClicks: 8950,
    totalConversions: 1243 + liveMetrics.conversions,
    totalSpend: 8500,
    currentROI: 5.2,
    predictedROI: 6.8,
    revenue: liveMetrics.revenue
  };

  const channelPerformance = [
    { channel: '邮件', budget: 35, conversions: 456, ctr: 4.2, roi: 5.8, status: 'optimal', spend: 2975, revenue: 17255 },
    { channel: '社交媒体', budget: 25, conversions: 342, ctr: 3.8, roi: 4.5, status: 'good', spend: 2125, revenue: 9563 },
    { channel: '付费广告', budget: 20, conversions: 245, ctr: 2.1, roi: 3.2, status: 'underperforming', spend: 1700, revenue: 5440 },
    { channel: '短信', budget: 15, conversions: 156, ctr: 5.5, roi: 6.2, status: 'optimal', spend: 1275, revenue: 7905 },
    { channel: '推送通知', budget: 5, conversions: 44, ctr: 1.8, roi: 2.1, status: 'poor', spend: 425, revenue: 893 }
  ];

  const timelineData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    visitors: Math.floor(Math.random() * 500) + 300,
    conversions: Math.floor(Math.random() * 30) + 10
  }));

  const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6B7280'];

  return (
    <div className="p-6 space-y-6">
      {/* Campaign Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="glass-card p-6 border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-gray-900">新用户欢迎旅程</h2>
                  {isRunning ? (
                    <Badge className="bg-green-100 text-green-700 border-0">
                      <Activity className="w-3 h-3 mr-1 animate-pulse" />
                      运行中
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700 border-0">
                      <Pause className="w-3 h-3 mr-1" />
                      已暂停
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-600">触达</span>
                    <span className="text-gray-900">{performanceMetrics.totalReach.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
                    <MousePointer className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">点击</span>
                    <span className="text-gray-900">{performanceMetrics.totalClicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
                    <ShoppingCart className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">转化</span>
                    <span className="text-green-600">{performanceMetrics.totalConversions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-600">ROI</span>
                    <span className="text-orange-600">{performanceMetrics.currentROI}x</span>
                  </div>
                  <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-600">收入</span>
                    <span className="text-purple-600">${performanceMetrics.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="glass-card border-white/40 gap-2"
                >
                  <Download className="w-4 h-4" />
                  导出报告
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-card border-white/40 gap-2"
                >
                  <Settings className="w-4 h-4" />
                  设置
                </Button>
                <Button 
                  onClick={() => setIsRunning(!isRunning)}
                  className={`gap-2 border-0 ${
                    isRunning 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      暂停活动
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      启动活动
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* AI Autopilot Control */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card p-6 border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-gray-900">AI 自动驾驶模式 (Autopilot)</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">AI将自动优化预算分配、A/B测试和发送时间，无需人工干预</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {autopilotEnabled && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        AI 运行中
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    AI将每小时分析实时数据，自动将预算从低效渠道转移到高效渠道，并优选表现最佳的内容版本
                  </p>
                  <AnimatePresence>
                    {autopilotEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <div className="glass-card p-4 rounded-xl border border-purple-200/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">AI正在优化中...</span>
                            <Badge className="bg-green-100 text-green-700 border-0">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              预期ROI提升 +30%
                            </Badge>
                          </div>
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span>将15%预算从"付费广告"转移至"短信"渠道</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span>自动选择B版本（价格优惠）作为主要内容</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span>优化发送时间至晚间8-9点</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="glass-card p-3 rounded-xl text-center">
                            <p className="text-xs text-gray-600 mb-1">优化次数</p>
                            <p className="text-xl text-purple-600">12</p>
                          </div>
                          <div className="glass-card p-3 rounded-xl text-center">
                            <p className="text-xs text-gray-600 mb-1">节省预算</p>
                            <p className="text-xl text-green-600">$1,280</p>
                          </div>
                          <div className="glass-card p-3 rounded-xl text-center">
                            <p className="text-xs text-gray-600 mb-1">提升转化</p>
                            <p className="text-xl text-orange-600">+28%</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <Switch
                checked={autopilotEnabled}
                onCheckedChange={setAutopilotEnabled}
                className="mt-1"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas View */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">营销旅程画布</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 glass-card px-2 py-1 rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={handleZoomOut}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-xs text-gray-600 px-2">{Math.round(zoom * 100)}%</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={handleZoomIn}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={handleResetView}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-card border-white/40"
                    onClick={() => setShowNodePalette(!showNodePalette)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    添加节点
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-card border-white/40"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存
                  </Button>
                </div>
              </div>

              {/* Node Palette */}
              <AnimatePresence>
                {showNodePalette && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 glass-card p-4 rounded-xl border border-purple-200/50"
                  >
                    <p className="text-sm text-gray-700 mb-3">选择要添加的节点类型：</p>
                    <div className="grid grid-cols-4 gap-2">
                      {nodeTemplates.map((template) => {
                        const Icon = template.icon;
                        return (
                          <button
                            key={`${template.type}-${template.label}`}
                            onClick={() => handleAddNode(template)}
                            className="p-3 glass-card rounded-xl hover-lift cursor-pointer border border-white/40 hover:border-purple-300 transition-all text-left"
                          >
                            <Icon className="w-5 h-5 text-purple-600 mb-1" />
                            <p className="text-xs text-gray-900">{template.label}</p>
                            <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Workflow Canvas */}
              <div 
                ref={drop}
                className={`relative glass-card rounded-2xl p-8 min-h-[500px] overflow-hidden border border-white/40 ${
                  isPanning ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
              >
                <div 
                  style={{ 
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: '0 0',
                    width: '1500px',
                    height: '500px',
                    position: 'relative'
                  }}
                >
                  {/* Connection Lines SVG */}
                  <svg 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ width: '100%', height: '100%', overflow: 'visible' }}
                  >
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
                      </linearGradient>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="9"
                        refY="3"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3, 0 6" fill="#8B5CF6" />
                      </marker>
                    </defs>
                    
                    {connections.map((conn, index) => {
                      const fromNode = nodes.find(n => n.id === conn.from);
                      const toNode = nodes.find(n => n.id === conn.to);
                      
                      if (!fromNode || !toNode) return null;
                      
                      const path = getConnectionPath(fromNode, toNode);
                      
                      return (
                        <g key={index}>
                          <path
                            d={path}
                            stroke={conn.type === 'yes' ? '#10B981' : conn.type === 'no' ? '#EF4444' : 'url(#lineGradient)'}
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={conn.type === 'no' ? '5,5' : '0'}
                            markerEnd="url(#arrowhead)"
                            className="transition-all"
                          >
                            {conn.type === 'default' && isRunning && (
                              <animate 
                                attributeName="stroke-dashoffset" 
                                from="0" 
                                to="10" 
                                dur="1s" 
                                repeatCount="indefinite" 
                              />
                            )}
                          </path>
                          {conn.type !== 'default' && (
                            <text
                              x={(fromNode.x + 100 + toNode.x) / 2}
                              y={(fromNode.y + 40 + toNode.y + 40) / 2 - 5}
                              fill={conn.type === 'yes' ? '#10B981' : '#EF4444'}
                              fontSize="12"
                              fontWeight="bold"
                            >
                              {conn.type === 'yes' ? '是' : '否'}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Workflow Nodes */}
                  {nodes.map((node) => (
                    <DraggableNode
                      key={node.id}
                      node={node}
                      onDrag={handleNodeDrag}
                      onSelect={handleNodeSelect}
                      isSelected={selectedNode === node.id}
                      onDelete={handleNodeDelete}
                      onEdit={setEditingNode}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 glass-card rounded-xl border border-blue-200/50">
                <div className="flex items-start gap-2">
                  <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 mb-2">
                      💡 操作提示:
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• 拖拽节点来调整位置</li>
                      <li>• 点击节点查看和编辑详情</li>
                      <li>• Alt+鼠标左键 或 鼠标中键拖动画布</li>
                      <li>• 使用缩放控件调整视图大小</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* A/B Test Results */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">A/B/n 测试实时结果</h3>
                {autopilotEnabled && (
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <Zap className="w-3 h-3 mr-1 animate-pulse" />
                    AI 自动优选中
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                {abTestResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-5 rounded-2xl border-2 transition-all hover-lift ${
                      index === 1 
                        ? 'glass-card border-green-500 shadow-lg ring-2 ring-green-500/30' 
                        : 'bg-white/30 border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-900">{result.version}</h4>
                      {index === 1 && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                          👑 冠军版本
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      <div className="glass-card p-3 rounded-xl text-center">
                        <p className="text-xs text-gray-600 mb-1">曝光量</p>
                        <p className="text-gray-900">{result.impressions.toLocaleString()}</p>
                      </div>
                      <div className="glass-card p-3 rounded-xl text-center">
                        <p className="text-xs text-gray-600 mb-1">点击数</p>
                        <p className="text-blue-600">{result.clicks.toLocaleString()}</p>
                      </div>
                      <div className="glass-card p-3 rounded-xl text-center">
                        <p className="text-xs text-gray-600 mb-1">转化数</p>
                        <p className="text-green-600">{result.conversions}</p>
                      </div>
                      <div className="glass-card p-3 rounded-xl text-center">
                        <p className="text-xs text-gray-600 mb-1">ROI</p>
                        <p className={index === 1 ? 'text-green-600' : 'text-gray-900'}>
                          {result.roi}x
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">CTR:</span>
                        <span className="text-gray-900">{result.ctr}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">CVR:</span>
                        <span className="text-gray-900">{result.cvr}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">花费:</span>
                        <span className="text-gray-900">${result.spend.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {autopilotEnabled && (
                <div className="mt-4 p-4 glass-card rounded-xl border border-purple-200/50">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-purple-800">
                      ✨ AI建议: B版本（价格优惠）表现最优，已自动将80%流量导向该版本。预计ROI可提升至7.2x
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Real-time Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">24小时实时表现</h3>
                <Badge className="bg-blue-100 text-blue-700 border-0">
                  <Activity className="w-3 h-3 mr-1 animate-pulse" />
                  实时更新
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="hour" stroke="#6B7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
                  <RechartsTooltip
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#8B5CF6" 
                    strokeWidth={2} 
                    dot={false}
                    name="访客"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    dot={false}
                    name="转化"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Right Sidebar - Campaign Settings & Performance */}
        <div className="space-y-6">
          {/* Budget & Goal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <h3 className="text-gray-900 mb-6">预算与目标</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">总预算</label>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="glass-card border-white/30 mb-3"
                  />
                  <Slider
                    value={[budget]}
                    onValueChange={(v) => setBudget(v[0])}
                    max={50000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>$50,000</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">活动目标</label>
                  <select className="w-full p-3 glass-card border border-white/30 rounded-xl text-sm">
                    <option>最大化注册量</option>
                    <option>最大化转化</option>
                    <option>最大化ROI</option>
                    <option>提升品牌认知</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">目标受众</label>
                  <select className="w-full p-3 glass-card border border-white/30 rounded-xl text-sm">
                    <option>新注册用户</option>
                    <option>休眠用户</option>
                    <option>高价值客户</option>
                    <option>全部用户</option>
                  </select>
                </div>

                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">预算使用率</span>
                    <span className="text-sm text-gray-900">
                      {((performanceMetrics.totalSpend / budget) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(performanceMetrics.totalSpend / budget) * 100} className="h-2" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Channel Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <h3 className="text-gray-900 mb-6">渠道实时表现</h3>
              
              <div className="space-y-3 mb-4">
                {channelPerformance.map((channel, index) => (
                  <motion.div
                    key={channel.channel}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="glass-card p-4 rounded-xl hover-lift cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-700">{channel.channel}</span>
                      <Badge className={`border-0 ${
                        channel.status === 'optimal' ? 'bg-green-100 text-green-700' :
                        channel.status === 'good' ? 'bg-blue-100 text-blue-700' :
                        channel.status === 'underperforming' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {channel.status === 'optimal' && '🎯 最优'}
                        {channel.status === 'good' && '✓ 良好'}
                        {channel.status === 'underperforming' && '⚠ 待优化'}
                        {channel.status === 'poor' && '✗ 低效'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <span className="text-xs text-gray-500">预算占比</span>
                        <p className="text-gray-900">{channel.budget}%</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">转化数</span>
                        <p className="text-gray-900">{channel.conversions}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">ROI</span>
                        <p className="text-purple-600">{channel.roi}x</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">收入</span>
                        <p className="text-green-600">${channel.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <Progress value={channel.budget * 2} className="h-1.5" />
                  </motion.div>
                ))}
              </div>

              {autopilotEnabled && (
                <div className="glass-card p-4 rounded-xl border border-amber-200/50">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">
                      AI正在重新分配预算：从"推送通知"(-3%)转移至"短信"(+3%)
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Predictions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50/80 to-cyan-50/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-gray-900">效果预测</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">当前ROI</span>
                      <span className="text-xl text-gray-900">{performanceMetrics.currentROI}x</span>
                    </div>
                    <Progress value={performanceMetrics.currentROI * 15} className="h-2" />
                  </div>
                  
                  <div className="glass-card p-4 rounded-xl border-2 border-green-300/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">预测ROI (AI优化后)</span>
                      </div>
                      <span className="text-xl text-green-600">{performanceMetrics.predictedROI}x</span>
                    </div>
                    <Progress value={performanceMetrics.predictedROI * 15} className="h-2" />
                  </div>
                  
                  <div className="glass-card p-4 rounded-xl">
                    <p className="text-sm text-gray-700 mb-2">AI 分析预测</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      如果将活动预算增加20%（+${(budget * 0.2).toLocaleString()}），
                      预计可额外带来15%的转化，总ROI提升至7.2x，
                      预估新增收入${Math.floor(performanceMetrics.revenue * 0.35).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Node Edit Dialog */}
      <AnimatePresence>
        {editingNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditingNode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 rounded-2xl shadow-2xl max-w-md w-full"
            >
              <h3 className="text-gray-900 mb-4">编辑节点：{editingNode.label}</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">节点名称</label>
                  <Input 
                    value={editingNode.label}
                    onChange={(e) => setEditingNode({ ...editingNode, label: e.target.value })}
                    className="glass-card border-white/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">节点状态</label>
                  <select 
                    className="w-full p-3 glass-card border border-white/30 rounded-xl text-sm"
                    value={editingNode.status}
                    onChange={(e) => setEditingNode({ ...editingNode, status: e.target.value as any })}
                  >
                    <option value="active">运行中</option>
                    <option value="pending">等待中</option>
                    <option value="completed">已完成</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                    onClick={() => {
                      setNodes(prev => prev.map(n => n.id === editingNode.id ? editingNode : n));
                      setEditingNode(null);
                    }}
                  >
                    保存更改
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 glass-card border-white/40"
                    onClick={() => setEditingNode(null)}
                  >
                    取消
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CampaignOrchestrator(props: CampaignOrchestratorProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <CampaignOrchestratorContent {...props} />
    </DndProvider>
  );
}
