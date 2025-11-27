import { useState } from 'react';
import { Bot, Play, Pause, Settings, Plus, Trash2, Edit2, CheckCircle, Clock, AlertTriangle, Zap, ArrowRight, Copy, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'schedule' | 'event' | 'manual';
    details: string;
  };
  steps: WorkflowStep[];
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  successRate: number;
  executionCount: number;
}

interface WorkflowStep {
  id: string;
  type: 'ai-analysis' | 'data-fetch' | 'notification' | 'approval' | 'report';
  action: string;
  config: any;
  status?: 'pending' | 'running' | 'completed' | 'failed';
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  startTime: Date;
  currentStep: number;
  totalSteps: number;
  status: 'running' | 'completed' | 'failed';
  logs: string[];
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: '每日财务健康检查',
    description: 'AI自动分析关键财务指标，发现异常并生成日报',
    trigger: {
      type: 'schedule',
      details: '每日 09:00'
    },
    steps: [
      {
        id: '1-1',
        type: 'data-fetch',
        action: '提取昨日财务数据',
        config: { sources: ['erp', 'bank', 'crm'] }
      },
      {
        id: '1-2',
        type: 'ai-analysis',
        action: 'AI分析关键指标',
        config: { metrics: ['cashflow', 'ar', 'ap', 'revenue'] }
      },
      {
        id: '1-3',
        type: 'ai-analysis',
        action: '异常检测与风险识别',
        config: { threshold: 'high' }
      },
      {
        id: '1-4',
        type: 'report',
        action: '生成财务日报',
        config: { format: 'pdf', recipients: ['cfo', 'controller'] }
      },
      {
        id: '1-5',
        type: 'notification',
        action: '发送报告通知',
        config: { channels: ['email', 'app'] }
      }
    ],
    isActive: true,
    lastRun: new Date(Date.now() - 3600000),
    nextRun: new Date(Date.now() + 82800000),
    successRate: 98,
    executionCount: 245
  },
  {
    id: '2',
    name: '月度关账自动化',
    description: '智能协调多部门任务，自动生成关账清单和进度跟踪',
    trigger: {
      type: 'schedule',
      details: '每月最后一天 18:00'
    },
    steps: [
      {
        id: '2-1',
        type: 'data-fetch',
        action: '收集本月所有凭证',
        config: {}
      },
      {
        id: '2-2',
        type: 'ai-analysis',
        action: 'AI验证凭证完整性',
        config: {}
      },
      {
        id: '2-3',
        type: 'ai-analysis',
        action: '生成关账任务清单',
        config: {}
      },
      {
        id: '2-4',
        type: 'notification',
        action: '分配任务给相关人员',
        config: {}
      },
      {
        id: '2-5',
        type: 'ai-analysis',
        action: '持续监控完成进度',
        config: {}
      }
    ],
    isActive: true,
    lastRun: new Date(Date.now() - 864000000),
    nextRun: new Date(Date.now() + 1728000000),
    successRate: 95,
    executionCount: 12
  },
  {
    id: '3',
    name: '大额支出智能审批',
    description: '超过阈值的支出自动触发多级审批流程和风险评估',
    trigger: {
      type: 'event',
      details: '支出金额 > ¥10万'
    },
    steps: [
      {
        id: '3-1',
        type: 'ai-analysis',
        action: 'AI风险评估',
        config: { checkPoints: ['budget', 'supplier', 'history'] }
      },
      {
        id: '3-2',
        type: 'notification',
        action: '发送审批请求',
        config: { approvers: ['manager', 'controller', 'cfo'] }
      },
      {
        id: '3-3',
        type: 'approval',
        action: '等待审批决策',
        config: { timeout: '48h' }
      },
      {
        id: '3-4',
        type: 'notification',
        action: '通知申请人结果',
        config: {}
      }
    ],
    isActive: true,
    lastRun: new Date(Date.now() - 7200000),
    successRate: 100,
    executionCount: 87
  },
  {
    id: '4',
    name: '应收账款催收提醒',
    description: 'AI识别逾期风险，自动分级催收策略',
    trigger: {
      type: 'schedule',
      details: '每周一、三、五 10:00'
    },
    steps: [
      {
        id: '4-1',
        type: 'data-fetch',
        action: '提取应收账款数据',
        config: {}
      },
      {
        id: '4-2',
        type: 'ai-analysis',
        action: 'AI评估逾期风险',
        config: {}
      },
      {
        id: '4-3',
        type: 'ai-analysis',
        action: '生成催收策略',
        config: { strategies: ['friendly', 'formal', 'urgent'] }
      },
      {
        id: '4-4',
        type: 'notification',
        action: '发送催收通知',
        config: {}
      },
      {
        id: '4-5',
        type: 'report',
        action: '更新催收跟踪表',
        config: {}
      }
    ],
    isActive: false,
    lastRun: new Date(Date.now() - 259200000),
    nextRun: new Date(Date.now() + 86400000),
    successRate: 92,
    executionCount: 156
  }
];

export default function AIWorkflowAutomation() {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isExecuting, setIsExecuting] = useState<string | null>(null);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'ai-analysis':
        return <Bot className="w-4 h-4 text-teal-600" />;
      case 'data-fetch':
        return <RefreshCw className="w-4 h-4 text-indigo-600" />;
      case 'notification':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'approval':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'report':
        return <Copy className="w-4 h-4 text-purple-600" />;
      default:
        return <Zap className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleToggleWorkflow = (id: string) => {
    setWorkflows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, isActive: !w.isActive } : w
      )
    );
    const workflow = workflows.find(w => w.id === id);
    toast.success(
      workflow?.isActive
        ? `工作流"${workflow.name}"已停用`
        : `工作流"${workflow?.name}"已启用`
    );
  };

  const handleExecuteWorkflow = async (workflow: Workflow) => {
    setIsExecuting(workflow.id);
    setExecutionProgress(0);
    setCurrentStep(0);
    setExecutionLogs([]);

    toast.info(`开始执行工作流：${workflow.name}`);

    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      setCurrentStep(i);
      
      const log = `[${new Date().toLocaleTimeString()}] 步骤 ${i + 1}: ${step.action}`;
      setExecutionLogs(prev => [...prev, log]);

      // Simulate step execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setExecutionProgress(((i + 1) / workflow.steps.length) * 100);
      
      const completeLog = `[${new Date().toLocaleTimeString()}] ✓ 完成: ${step.action}`;
      setExecutionLogs(prev => [...prev, completeLog]);
    }

    setIsExecuting(null);
    setExecutionProgress(0);
    setCurrentStep(0);
    
    toast.success(`工作流"${workflow.name}"执行完成！`);
  };

  const handleDuplicateWorkflow = (workflow: Workflow) => {
    const newWorkflow = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (副本)`,
      isActive: false,
      executionCount: 0
    };
    setWorkflows(prev => [...prev, newWorkflow]);
    toast.success('工作流已复制');
  };

  const handleDeleteWorkflow = (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    setWorkflows(prev => prev.filter(w => w.id !== id));
    toast.success(`已删除工作流"${workflow?.name}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 flex items-center gap-2">
            <Bot className="w-6 h-6 text-teal-600" />
            AI 工作流自动化
          </h2>
          <p className="text-gray-600">创建智能工作流，让AI自动处理重复性财务任务</p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          创建工作流
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">活跃工作流</p>
                <p className="text-2xl text-gray-900">{workflows.filter(w => w.isActive).length}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">总执行次数</p>
                <p className="text-2xl text-gray-900">
                  {workflows.reduce((sum, w) => sum + w.executionCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">平均成功率</p>
                <p className="text-2xl text-gray-900">
                  {Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">节省工时</p>
                <p className="text-2xl text-gray-900">~850h</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Execution Progress */}
      {isExecuting && (
        <Card className="border-teal-200 bg-teal-50">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-teal-600 animate-spin" />
              工作流执行中...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">
                  步骤 {currentStep + 1} / {workflows.find(w => w.id === isExecuting)?.steps.length}
                </span>
                <span className="text-sm text-gray-900">{Math.round(executionProgress)}%</span>
              </div>
              <Progress value={executionProgress} className="h-2" />
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4 max-h-40 overflow-y-auto">
              <div className="space-y-1 text-xs font-mono">
                {executionLogs.map((log, idx) => (
                  <div key={idx} className={log.includes('✓') ? 'text-green-600' : 'text-gray-600'}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflows List */}
      <div className="grid grid-cols-1 gap-4">
        {workflows.map((workflow) => (
          <Card
            key={workflow.id}
            className={`border-gray-200 bg-white shadow-sm transition-all ${
              isExecuting === workflow.id ? 'ring-2 ring-teal-500' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-gray-900">{workflow.name}</CardTitle>
                    <Badge
                      className={`${
                        workflow.isActive
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      } border`}
                    >
                      {workflow.isActive ? '运行中' : '已停用'}
                    </Badge>
                    <Badge variant="outline" className="border-gray-200">
                      {workflow.trigger.type === 'schedule' ? <Clock className="w-3 h-3 mr-1" /> : <Zap className="w-3 h-3 mr-1" />}
                      {workflow.trigger.details}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">{workflow.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={workflow.isActive}
                    onCheckedChange={() => handleToggleWorkflow(workflow.id)}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Workflow Steps */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-700">执行步骤</span>
                  <Badge variant="outline" className="border-gray-200 text-xs">
                    {workflow.steps.length} 步
                  </Badge>
                </div>
                <div className="space-y-2">
                  {workflow.steps.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full border border-gray-200 text-xs text-gray-600">
                        {idx + 1}
                      </div>
                      {getStepIcon(step.type)}
                      <span className="text-sm text-gray-700 flex-1">{step.action}</span>
                      {idx < workflow.steps.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-600">执行次数: </span>
                    <span className="text-gray-900">{workflow.executionCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">成功率: </span>
                    <span className="text-green-600">{workflow.successRate}%</span>
                  </div>
                  {workflow.lastRun && (
                    <div>
                      <span className="text-gray-600">上次运行: </span>
                      <span className="text-gray-900">
                        {Math.round((Date.now() - workflow.lastRun.getTime()) / 3600000)}小时前
                      </span>
                    </div>
                  )}
                  {workflow.nextRun && workflow.isActive && (
                    <div>
                      <span className="text-gray-600">下次运行: </span>
                      <span className="text-gray-900">
                        {Math.round((workflow.nextRun.getTime() - Date.now()) / 3600000)}小时后
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedWorkflow(workflow)}
                    className="border-gray-200"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    配置
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDuplicateWorkflow(workflow)}
                    className="border-gray-200"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    复制
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleExecuteWorkflow(workflow)}
                    disabled={isExecuting !== null}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    立即执行
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteWorkflow(workflow.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>创建新工作流</DialogTitle>
            <DialogDescription>
              配置工作流的触发条件和执行步骤
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>工作流名称</Label>
              <Input placeholder="例如：自动月度报表生成" />
            </div>
            <div className="space-y-2">
              <Label>描述</Label>
              <Textarea placeholder="简要说明这个工作流的作用..." rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>触发方式</Label>
                <Select defaultValue="schedule">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="schedule">定时触发</SelectItem>
                    <SelectItem value="event">事件触发</SelectItem>
                    <SelectItem value="manual">手动触发</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>触发时间</Label>
                <Input placeholder="例如：每日 09:00" />
              </div>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">💡 提示</p>
              <p className="text-xs text-gray-600">
                创建工作流后，你可以添加多个步骤，包括数据提取、AI分析、通知发送等。AI会自动优化执行顺序。
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              取消
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => {
                setShowCreateDialog(false);
                toast.success('工作流已创建！');
              }}
            >
              创建工作流
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
