import { useState } from 'react';
import { 
  Layout, TrendingUp, Users, Target, DollarSign, 
  Calendar, BarChart3, PieChart, Settings, Plus, X,
  GripVertical, Maximize2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion, Reorder } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

interface Widget {
  id: string;
  type: 'metric' | 'chart' | 'list' | 'progress';
  title: string;
  size: 'small' | 'medium' | 'large';
  data: any;
}

interface DashboardWidgetsProps {
  onWidgetClick?: (widget: Widget) => void;
}

export function DashboardWidgets({ onWidgetClick }: DashboardWidgetsProps) {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: '1',
      type: 'metric',
      title: '本月销售额',
      size: 'small',
      data: {
        value: '¥385万',
        change: '+18.2%',
        trend: 'up',
        subtitle: '较上月'
      }
    },
    {
      id: '2',
      type: 'metric',
      title: '新增商机',
      size: 'small',
      data: {
        value: '47',
        change: '+12',
        trend: 'up',
        subtitle: '本周'
      }
    },
    {
      id: '3',
      type: 'metric',
      title: '成交率',
      size: 'small',
      data: {
        value: '68%',
        change: '+5.3%',
        trend: 'up',
        subtitle: '较上月'
      }
    },
    {
      id: '4',
      type: 'progress',
      title: '季度目标进度',
      size: 'medium',
      data: {
        current: 1280,
        target: 1500,
        percentage: 85.3,
        remaining: '15天'
      }
    },
    {
      id: '5',
      type: 'chart',
      title: '销售趋势',
      size: 'large',
      data: [
        { name: '周一', value: 45 },
        { name: '周二', value: 52 },
        { name: '周三', value: 61 },
        { name: '周四', value: 58 },
        { name: '周五', value: 70 },
        { name: '周六', value: 42 },
        { name: '周日', value: 38 }
      ]
    },
    {
      id: '6',
      type: 'list',
      title: '今日待办',
      size: 'medium',
      data: [
        { id: '1', text: '跟进高优先级客户"科技创新公司"', time: '10:00 AM', priority: 'high' },
        { id: '2', text: '完成"云存储方案"报价', time: '2:00 PM', priority: 'high' },
        { id: '3', text: '团队周会', time: '4:00 PM', priority: 'medium' },
        { id: '4', text: '审核合同文档', time: '5:00 PM', priority: 'low' }
      ]
    },
    {
      id: '7',
      type: 'chart',
      title: '商机分布',
      size: 'medium',
      data: [
        { name: '初步接触', value: 8, color: '#3B82F6' },
        { name: '需求分析', value: 12, color: '#F59E0B' },
        { name: '方案报价', value: 6, color: '#FF7A00' },
        { name: '合同谈判', value: 4, color: '#00A75D' }
      ]
    }
  ]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [availableWidgets, setAvailableWidgets] = useState([
    { id: 'w1', name: '客户活跃度', type: 'metric', icon: <Users className="h-4 w-4" /> },
    { id: 'w2', name: '平均成交周期', type: 'metric', icon: <Calendar className="h-4 w-4" /> },
    { id: 'w3', name: '团队排行榜', type: 'list', icon: <Target className="h-4 w-4" /> },
    { id: 'w4', name: '转化漏斗', type: 'chart', icon: <BarChart3 className="h-4 w-4" /> }
  ]);

  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
    toast.success('小组件已移除');
  };

  const handleAddWidget = (widgetTemplate: typeof availableWidgets[0]) => {
    const newWidget: Widget = {
      id: `new-${Date.now()}`,
      type: widgetTemplate.type as Widget['type'],
      title: widgetTemplate.name,
      size: 'medium',
      data: {}
    };
    setWidgets([...widgets, newWidget]);
    toast.success(`已添加"${widgetTemplate.name}"`);
  };

  const getGridClass = (size: Widget['size']) => {
    switch (size) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-1 md:col-span-2';
      case 'large':
        return 'col-span-1 md:col-span-3';
      default:
        return 'col-span-1';
    }
  };

  const renderWidget = (widget: Widget) => {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={getGridClass(widget.size)}
      >
        <Card className="h-full hover:shadow-md transition-all group relative">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                {isEditMode && <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />}
                {widget.title}
              </CardTitle>
              <div className="flex items-center gap-1">
                {isEditMode ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveWidget(widget.id)}
                    className="h-7 w-7 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onWidgetClick?.(widget)}
                    className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {widget.type === 'metric' && (
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold">{widget.data.value}</span>
                  <Badge variant={widget.data.trend === 'up' ? 'default' : 'secondary'} className={widget.data.trend === 'up' ? 'bg-success' : ''}>
                    {widget.data.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{widget.data.subtitle}</p>
              </div>
            )}

            {widget.type === 'progress' && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">当前进度</span>
                  <span className="font-semibold">¥{widget.data.current}万 / ¥{widget.data.target}万</span>
                </div>
                <Progress value={widget.data.percentage} className="h-3" />
                <div className="flex justify-between text-xs">
                  <span className="text-primary font-semibold">{widget.data.percentage}% 完成</span>
                  <span className="text-muted-foreground">剩余 {widget.data.remaining}</span>
                </div>
              </div>
            )}

            {widget.type === 'chart' && widget.title === '销售趋势' && (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={widget.data}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FF7A00" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {widget.type === 'chart' && widget.title === '商机分布' && (
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={widget.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {widget.data.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            )}

            {widget.type === 'list' && (
              <div className="space-y-2">
                {widget.data.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`h-2 w-2 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500' :
                      item.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Edit Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">我的工作台</h2>
          <p className="text-sm text-muted-foreground mt-1">自定义你的数据视图</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditMode && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  添加小组件
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {availableWidgets.map(widget => (
                  <DropdownMenuItem key={widget.id} onClick={() => handleAddWidget(widget)}>
                    <div className="flex items-center gap-2">
                      {widget.icon}
                      <span>{widget.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant={isEditMode ? 'default' : 'outline'}
            onClick={() => setIsEditMode(!isEditMode)}
            className="gap-2"
          >
            <Layout className="h-4 w-4" />
            {isEditMode ? '完成编辑' : '自定义布局'}
          </Button>
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {widgets.map(widget => (
          <div key={widget.id}>
            {renderWidget(widget)}
          </div>
        ))}
      </div>

      {widgets.length === 0 && (
        <div className="text-center py-16">
          <Layout className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">开始自定义你的仪表盘</h3>
          <p className="text-sm text-muted-foreground mb-4">添加小组件来创建个性化的工作视图</p>
          <Button onClick={() => setIsEditMode(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            添加第一个小组件
          </Button>
        </div>
      )}
    </div>
  );
}
