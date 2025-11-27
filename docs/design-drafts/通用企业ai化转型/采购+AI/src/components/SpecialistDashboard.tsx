import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, AlertCircle, CheckCircle, TrendingUp, FileText, Package, DollarSign, X } from 'lucide-react';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

const tasks = [
  { id: 1, title: '市场部 - Adobe Creative Cloud续费申请', priority: 'high', dueDate: '今天', type: '待审批', amount: '¥45,000' },
  { id: 2, title: 'IT部 - 服务器采购申请', priority: 'high', dueDate: '明天', type: '待审批', amount: '¥320,000' },
  { id: 3, title: '与华为技术的采购合同', priority: 'medium', dueDate: '15天后', type: '即将到期', amount: '¥2,100,000' },
  { id: 4, title: '物流供应商发票金额差异', priority: 'high', dueDate: '今天', type: '异常发票', amount: '差异¥500' },
  { id: 5, title: '办公用品批量采购申请', priority: 'low', dueDate: '3天后', type: '待审批', amount: '¥8,500' },
];

const mySuppliers = [
  { name: '华为技术有限公司', health: 92, onTimeRate: 98, recentOrders: 15, issues: 0 },
  { name: '阿里云计算', health: 88, onTimeRate: 95, recentOrders: 8, issues: 0 },
  { name: 'ABC物流', health: 65, onTimeRate: 82, recentOrders: 22, issues: 2 },
  { name: '优质印刷', health: 78, onTimeRate: 90, recentOrders: 12, issues: 1 },
];

const sourcingProjects = {
  preparing: [
    { id: 1, name: 'Q2办公家具采购', suppliers: 5, deadline: '2025-11-05' },
    { id: 2, name: '企业ERP系统升级', suppliers: 3, deadline: '2025-11-10' },
  ],
  bidding: [
    { id: 3, name: '全年物流服务招标', suppliers: 8, deadline: '2025-10-30' },
    { id: 4, name: '云服务采购', suppliers: 4, deadline: '2025-11-02' },
  ],
  negotiating: [
    { id: 5, name: '营销物料供应商谈判', suppliers: 2, deadline: '2025-11-08' },
  ],
  completed: [
    { id: 6, name: '年度办公用品框架协议', suppliers: 1, finalPrice: '¥850,000' },
  ],
};

export default function SpecialistDashboard() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const handleCompleteTask = (taskId: number) => {
    setCompletedTasks([...completedTasks, taskId]);
    toast.success('任务已完成', {
      description: '任务已标记为完成并从列表中移除'
    });
  };

  const handleViewTask = (task: any) => {
    toast.info('打开任务详情', {
      description: `正在加载 "${task.title}" 的详细信息`
    });
  };

  const activeTasks = tasks.filter(task => !completedTasks.includes(task.id));

  return (
    <div className="space-y-6">
      {/* AI Insights Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <div className="bg-blue-500 rounded-full p-2 text-white">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-blue-900">
            <span>💡 AI智能提醒：</span>供应商"深圳电子元件厂"的芯片价格根据历史波动分析，当前处于近6个月低点，建议现在进行批量采购，预计可节省15-20%成本。
          </p>
          <Button 
            size="sm" 
            className="mt-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => toast.success('AI建议已采纳', { description: '已创建采购建议单' })}
          >
            查看详情
          </Button>
        </div>
      </div>

      {/* Task List - Core Module */}
      <Card>
        <CardHeader>
          <CardTitle>我的任务清单</CardTitle>
          <CardDescription>按优先级排序的待处理事项</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeTasks.map((task) => (
              <div 
                key={task.id} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'}
                        className={task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                      >
                        {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                      </Badge>
                      <Badge variant="outline">{task.type}</Badge>
                    </div>
                    <p className="mb-1">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.amount}</p>
                  </div>
                  <div className="text-right flex flex-col gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewTask(task)}
                      >
                        查看
                      </Button>
                      <Button 
                        size="sm" 
                        variant={task.priority === 'high' ? 'default' : 'outline'}
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        完成
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {activeTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <p>太棒了！所有任务已完成</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* My Suppliers Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>我的供应商看板</CardTitle>
          <CardDescription>负责管理的核心供应商健康度监控</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mySuppliers.map((supplier, idx) => (
              <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p>{supplier.name}</p>
                    <p className="text-sm text-gray-500">近30天订单: {supplier.recentOrders}个</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">{supplier.health}</div>
                    <p className="text-xs text-gray-500">健康度评分</p>
                  </div>
                </div>
                <Progress value={supplier.health} className="mb-3 h-2" />
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-gray-600">准时交付率</p>
                    <p className="text-green-600">{supplier.onTimeRate}%</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-gray-600">未解决问题</p>
                    <p className={supplier.issues > 0 ? 'text-red-600' : 'text-green-600'}>
                      {supplier.issues}个
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  查看详情
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sourcing Projects Kanban */}
      <Card>
        <CardHeader>
          <CardTitle>进行中的寻源项目</CardTitle>
          <CardDescription>询价、招标项目看板视图</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Preparing Column */}
            <div>
              <div className="bg-gray-100 rounded-t-lg px-3 py-2 mb-2">
                <p className="text-sm">准备中</p>
                <p className="text-xs text-gray-600">{sourcingProjects.preparing.length}个项目</p>
              </div>
              <div className="space-y-2">
                {sourcingProjects.preparing.map((project) => (
                  <div key={project.id} className="bg-white border rounded-lg p-3 cursor-move hover:shadow-md transition-shadow">
                    <p className="text-sm mb-2">{project.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{project.suppliers}家供应商</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bidding Column */}
            <div>
              <div className="bg-blue-100 rounded-t-lg px-3 py-2 mb-2">
                <p className="text-sm text-blue-900">报价中</p>
                <p className="text-xs text-blue-700">{sourcingProjects.bidding.length}个项目</p>
              </div>
              <div className="space-y-2">
                {sourcingProjects.bidding.map((project) => (
                  <div key={project.id} className="bg-white border border-blue-200 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow">
                    <p className="text-sm mb-2">{project.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{project.suppliers}家供应商</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiating Column */}
            <div>
              <div className="bg-yellow-100 rounded-t-lg px-3 py-2 mb-2">
                <p className="text-sm text-yellow-900">谈判中</p>
                <p className="text-xs text-yellow-700">{sourcingProjects.negotiating.length}个项目</p>
              </div>
              <div className="space-y-2">
                {sourcingProjects.negotiating.map((project) => (
                  <div key={project.id} className="bg-white border border-yellow-200 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow">
                    <p className="text-sm mb-2">{project.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{project.suppliers}家供应商</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Column */}
            <div>
              <div className="bg-green-100 rounded-t-lg px-3 py-2 mb-2">
                <p className="text-sm text-green-900">已结束</p>
                <p className="text-xs text-green-700">{sourcingProjects.completed.length}个项目</p>
              </div>
              <div className="space-y-2">
                {sourcingProjects.completed.map((project) => (
                  <div key={project.id} className="bg-white border border-green-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <p className="text-sm mb-2">{project.name}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        已完成
                      </span>
                      <span className="text-gray-600">{project.finalPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
