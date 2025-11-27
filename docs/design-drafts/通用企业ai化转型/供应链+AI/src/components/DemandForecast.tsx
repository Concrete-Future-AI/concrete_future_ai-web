import { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Package,
  MapPin,
  Lightbulb,
  HelpCircle,
  Plus,
  Save,
  X,
  Download,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { toast } from 'sonner@2.0.3';

interface Event {
  id: number;
  name: string;
  date: string;
  impact: string;
  type: 'promotion' | 'holiday' | 'competition' | 'custom';
}

export default function DemandForecast() {
  const [selectedSKU, setSelectedSKU] = useState('A1203');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [manualAdjustment, setManualAdjustment] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState('');

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: '双十一大促',
      date: '2025-11',
      impact: '+35%',
      type: 'promotion',
    },
    {
      id: 2,
      name: '春节促销',
      date: '2026-01',
      impact: '+28%',
      type: 'holiday',
    },
    {
      id: 3,
      name: '竞品降价',
      date: '2025-11',
      impact: '-5%',
      type: 'competition',
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    impact: 0,
    type: 'custom' as const,
  });

  // Mock forecast data
  const forecastData = [
    { month: '10月', actual: 980, baseline: 950, adjusted: 1020, lower: 900, upper: 1100 },
    { month: '11月', actual: 1050, baseline: 1000, adjusted: 1180, lower: 950, upper: 1250 },
    { month: '12月', actual: 1200, baseline: 1100, adjusted: 1320, lower: 1050, upper: 1400 },
    { month: '1月', actual: null, baseline: 1150, adjusted: 1150, lower: 1080, upper: 1220 },
    { month: '2月', actual: null, baseline: 1000, adjusted: 950, lower: 880, upper: 1050 },
    { month: '3月', actual: null, baseline: 1200, adjusted: 1380, lower: 1280, upper: 1480 },
  ];

  const contributionFactors = [
    { name: '季节性增长', contribution: 20, color: 'cyan' },
    { name: '双十一大促', contribution: 35, color: 'green' },
    { name: '历史趋势', contribution: 15, color: 'blue' },
    { name: '市场扩张', contribution: 10, color: 'purple' },
    { name: '竞品影响', contribution: -5, color: 'red' },
    { name: '其他因素', contribution: 5, color: 'slate' },
  ];

  const maxContribution = Math.max(...contributionFactors.map((f) => Math.abs(f.contribution)));

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.date || newEvent.impact === 0) {
      toast.error('请填写完整信息', {
        description: '事件名称、日期和影响值都是必填项',
      });
      return;
    }

    const event: Event = {
      id: Date.now(),
      name: newEvent.name,
      date: newEvent.date,
      impact: `${newEvent.impact > 0 ? '+' : ''}${newEvent.impact}%`,
      type: newEvent.type,
    };

    setEvents([...events, event]);
    setNewEvent({ name: '', date: '', impact: 0, type: 'custom' });
    setShowAddEvent(false);

    toast.success('事件已添加', {
      description: `${event.name} 已纳入预测模型`,
    });
  };

  const handleRemoveEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    toast.info('事件已移除', {
      description: '预测模型将重新计算',
    });
  };

  const applyAdjustment = () => {
    if (manualAdjustment === 0) {
      toast.warning('未设置调整', {
        description: '请使用滑块调整预测值',
      });
      return;
    }

    if (!adjustmentReason) {
      toast.warning('请输入调整原因', {
        description: '这将帮助AI模型学习',
      });
      return;
    }

    toast.success('调整已应用', {
      description: `预测值调整 ${manualAdjustment > 0 ? '+' : ''}${manualAdjustment}%，原因: ${adjustmentReason}`,
    });

    // Reset
    setManualAdjustment(0);
    setAdjustmentReason('');
  };

  const exportData = () => {
    toast.success('数据导出中...', {
      description: '正在生成 Excel 报表',
    });

    setTimeout(() => {
      toast.success('导出完成', {
        description: '预测数据已保存到本地',
      });
    }, 1500);
  };

  const saveForecast = () => {
    toast.success('预测已保存', {
      description: '已同步到供应链系统',
    });
  };

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header & Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            AI需求预测分析工作台
          </h1>
          <p className="text-sm text-slate-400">
            基于机器学习的智能需求预测与可解释性分析
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            模型准确率: 91.3%
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-slate-400 mb-2 block">产品 SKU</label>
            <Select value={selectedSKU} onValueChange={setSelectedSKU}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A1203">SKU #A1203 - 智能手表</SelectItem>
                <SelectItem value="B3405">SKU #B3405 - 无线耳机</SelectItem>
                <SelectItem value="C7821">SKU #C7821 - 充电宝</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block">区域</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全国</SelectItem>
                <SelectItem value="north">华北地区</SelectItem>
                <SelectItem value="east">华东地区</SelectItem>
                <SelectItem value="south">华南地区</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block">渠道</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全渠道</SelectItem>
                <SelectItem value="online">线上</SelectItem>
                <SelectItem value="offline">线下</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block">时间范围</label>
            <Select defaultValue="6m">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">未来3个月</SelectItem>
                <SelectItem value="6m">未来6个月</SelectItem>
                <SelectItem value="12m">未来12个月</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-6">
            <h2>需求预测趋势图</h2>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={saveForecast}>
                <Save className="w-4 h-4 mr-2" />
                保存预测
              </Button>
              <Button size="sm" variant="outline" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                导出数据
              </Button>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-500 rounded"></div>
              <span className="text-slate-400">历史销量</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-cyan-500"></div>
              <span className="text-slate-400">AI预测基线</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span className="text-slate-400">考虑事件后的预测</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500/20 rounded"></div>
              <span className="text-slate-400">置信区间</span>
            </div>
          </div>

          {/* Simplified Chart */}
          <div className="relative h-80">
            <svg className="w-full h-full" viewBox="0 0 600 300">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="50"
                  y1={50 + i * 50}
                  x2="580"
                  y2={50 + i * 50}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-800"
                />
              ))}

              {/* Confidence interval area */}
              <path
                d="M 100,180 L 190,165 L 280,140 L 370,150 L 460,180 L 550,130 L 550,200 L 460,230 L 370,210 L 280,220 L 190,235 L 100,240 Z"
                fill="currentColor"
                className="text-cyan-500/20"
              />

              {/* Baseline forecast line */}
              <polyline
                points="100,190 190,175 280,160 370,165 460,185 550,155"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-cyan-500"
                strokeDasharray="5,5"
              />

              {/* Adjusted forecast line */}
              <polyline
                points="100,185 190,150 280,130 370,165 460,195 550,125"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-green-500"
              />

              {/* Actual data points */}
              {[
                { x: 100, y: 190 },
                { x: 190, y: 175 },
                { x: 280, y: 140 },
              ].map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="currentColor"
                  className="text-slate-400"
                />
              ))}

              {/* Interactive points on forecast line */}
              {[
                { x: 370, y: 165, month: '1月' },
                { x: 460, y: 195, month: '2月' },
                { x: 550, y: 125, month: '3月' },
              ].map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="currentColor"
                    className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                      toast.info(`${point.month}预测值`, {
                        description: '可拖动调整或使用下方滑块',
                      });
                    }}
                  />
                </g>
              ))}

              {/* X-axis labels */}
              {forecastData.map((d, i) => (
                <text
                  key={i}
                  x={100 + i * 90}
                  y="280"
                  textAnchor="middle"
                  className="text-xs fill-slate-400"
                >
                  {d.month}
                </text>
              ))}

              {/* Y-axis labels */}
              {[1400, 1200, 1000, 800, 600].map((val, i) => (
                <text
                  key={i}
                  x="40"
                  y={55 + i * 50}
                  textAnchor="end"
                  className="text-xs fill-slate-400"
                >
                  {val}
                </text>
              ))}

              {/* Event markers */}
              <circle cx="190" cy="150" r="6" fill="currentColor" className="text-green-500" />
              <text x="190" y="135" textAnchor="middle" className="text-xs fill-green-400">
                促销
              </text>
            </svg>
          </div>

          <div className="mt-6 p-4 bg-slate-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-cyan-400">预测值 (3月):</span> 1,380 件
                <span className="text-slate-400 ml-4">置信区间: 1,280 - 1,480 件</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                为什么?
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Explainability */}
        <div className="space-y-4">
          {/* AI Explanation Panel */}
          <Card className="bg-slate-900 border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                AI可解释性分析
              </h3>
            </div>

            <div className="space-y-3 mb-4">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                <p className="text-sm text-slate-300">
                  本次11月预测值为 <span className="text-cyan-400">1,180件</span>，
                  主要驱动因素分析:
                </p>
              </div>

              {/* Contribution factors */}
              <div className="space-y-2">
                {contributionFactors.map((factor, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{factor.name}</span>
                      <span
                        className={
                          factor.contribution > 0 ? 'text-green-400' : 'text-red-400'
                        }
                      >
                        {factor.contribution > 0 ? '+' : ''}
                        {factor.contribution}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          factor.color === 'cyan'
                            ? 'bg-cyan-500'
                            : factor.color === 'green'
                              ? 'bg-green-500'
                              : factor.color === 'blue'
                                ? 'bg-blue-500'
                                : factor.color === 'purple'
                                  ? 'bg-purple-500'
                                  : factor.color === 'red'
                                    ? 'bg-red-500'
                                    : 'bg-slate-500'
                        }`}
                        style={{
                          width: `${(Math.abs(factor.contribution) / maxContribution) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full text-xs">
              查看详细算法解释
            </Button>
          </Card>

          {/* Event Management */}
          <Card className="bg-slate-900 border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                事件管理
              </h3>
              <Button size="sm" variant="ghost" onClick={() => setShowAddEvent(true)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{event.name}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveEvent(event.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-400">{event.date}</p>
                    </div>
                    <Badge
                      variant={
                        event.type === 'promotion'
                          ? 'default'
                          : event.type === 'holiday'
                            ? 'secondary'
                            : 'outline'
                      }
                      className="text-xs"
                    >
                      {event.type === 'promotion'
                        ? '促销'
                        : event.type === 'holiday'
                          ? '节假日'
                          : event.type === 'competition'
                            ? '竞争'
                            : '自定义'}
                    </Badge>
                  </div>
                  <p
                    className={`text-xs ${event.impact.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
                  >
                    预估影响: {event.impact}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Manual Adjustment */}
          <Card className="bg-slate-900 border-slate-800 p-5">
            <h3 className="text-sm mb-3">人工干预调整</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-2 block">
                  调整系数: {manualAdjustment > 0 ? '+' : ''}
                  {manualAdjustment}%
                </label>
                <Slider
                  min={-30}
                  max={30}
                  step={5}
                  value={[manualAdjustment]}
                  onValueChange={(value) => setManualAdjustment(value[0])}
                  className="accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>-30%</span>
                  <span>0%</span>
                  <span>+30%</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-2 block">调整原因</label>
                <Input
                  placeholder="输入调整原因，帮助AI学习..."
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="text-sm"
                />
              </div>

              <Button size="sm" className="w-full text-xs" onClick={applyAdjustment}>
                应用调整
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">添加新事件</DialogTitle>
            <DialogDescription>添加影响需求的市场事件</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="eventName" className="text-sm text-slate-300">
                事件名称
              </Label>
              <Input
                id="eventName"
                placeholder="例如: 新品发布会"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="eventDate" className="text-sm text-slate-300">
                事件日期
              </Label>
              <Input
                id="eventDate"
                type="month"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="eventImpact" className="text-sm text-slate-300">
                预估影响: {newEvent.impact > 0 ? '+' : ''}
                {newEvent.impact}%
              </Label>
              <Slider
                id="eventImpact"
                min={-50}
                max={50}
                step={5}
                value={[newEvent.impact]}
                onValueChange={(value) => setNewEvent({ ...newEvent, impact: value[0] })}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>-50%</span>
                <span>0%</span>
                <span>+50%</span>
              </div>
            </div>

            <div>
              <Label htmlFor="eventType" className="text-sm text-slate-300">
                事件类型
              </Label>
              <Select
                value={newEvent.type}
                onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}
              >
                <SelectTrigger id="eventType" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotion">促销活动</SelectItem>
                  <SelectItem value="holiday">节假日</SelectItem>
                  <SelectItem value="competition">竞争事件</SelectItem>
                  <SelectItem value="custom">自定义</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEvent(false)}>
              取消
            </Button>
            <Button onClick={handleAddEvent}>添加事件</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
