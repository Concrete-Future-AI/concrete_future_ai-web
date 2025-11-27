import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Database, Cpu, HardDrive, TrendingUp, Play, Pause, Settings, Upload, Link, CheckCircle2, Clock, AlertCircle, MoreVertical, Trash2, Copy, Eye, Zap, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { ModelBenchmark } from './ModelBenchmark';

interface KnowledgeBase {
  name: string;
  source: string;
  docs: string;
  status: 'synced' | 'syncing' | 'error';
  lastSync: string;
  size: string;
  progress?: number;
}

const baseModels = [
  {
    name: 'DeepSeek-V3',
    version: 'v3.0',
    params: '671B',
    status: 'active',
    gpu: '16x H100',
    calls: '312K',
    avgLatency: '2.1s',
    description: '最新一代MoE架构，推理性能突破，性价比极高'
  },
  {
    name: 'Qwen-Max',
    version: 'v2.5',
    params: '72B',
    status: 'active',
    gpu: '8x H100',
    calls: '289K',
    avgLatency: '1.3s',
    description: '通义千问旗舰版，综合能力最强，中文场景优化'
  },
  {
    name: 'Qwen-Plus',
    version: 'v2.5',
    params: '14B',
    status: 'active',
    gpu: '4x A100',
    calls: '245K',
    avgLatency: '0.7s',
    description: '平衡性能与成本，适合企业高频调用场景'
  },
  {
    name: 'GLM-4-Plus',
    version: 'v4.0',
    params: '9B',
    status: 'active',
    gpu: '2x A100',
    calls: '198K',
    avgLatency: '0.5s',
    description: '智谱最新一代模型，长上下文能力突出'
  },
  {
    name: 'Llama-3.3-70B',
    version: 'v3.3-instruct',
    params: '70B',
    status: 'active',
    gpu: '8x H100',
    calls: '176K',
    avgLatency: '1.2s',
    description: 'Meta最新版本，通用对话与推理能力优秀'
  },
  {
    name: 'DeepSeek-Coder-V2',
    version: 'v2.5',
    params: '236B',
    status: 'active',
    gpu: '8x H100',
    calls: '134K',
    avgLatency: '1.8s',
    description: '代码专用模型，支持300+编程语言，代码理解能力顶尖'
  },
  {
    name: 'Qwen-Coder-Plus',
    version: 'v2.5',
    params: '32B',
    status: 'active',
    gpu: '4x A100',
    calls: '112K',
    avgLatency: '0.9s',
    description: '通义千问代码版，中文代码注释理解优秀'
  },
  {
    name: 'ChatGLM-Turbo',
    version: 'v3.5',
    params: '6B',
    status: 'active',
    gpu: '2x A100',
    calls: '189K',
    avgLatency: '0.3s',
    description: '轻量级高效模型，响应速度极快，适合简单任务'
  },
  {
    name: 'Baichuan2-Turbo',
    version: 'v2.1',
    params: '13B',
    status: 'active',
    gpu: '4x A100',
    calls: '98K',
    avgLatency: '0.6s',
    description: '百川智能企业版，中文垂直领域能力强'
  },
  {
    name: 'Custom-Finance-GLM',
    version: 'v1.0-ft',
    params: '9B',
    status: 'active',
    gpu: '2x A100',
    calls: '68K',
    avgLatency: '0.5s',
    description: '基于GLM-4微调的金融专用模型，符合行业合规要求'
  },
  {
    name: 'Embedding-BGE-M3',
    version: 'v1.0',
    params: '568M',
    status: 'active',
    gpu: '1x T4',
    calls: '2.8M',
    avgLatency: '0.03s',
    description: '多语言向量化模型，支持100+语言，检索精度高'
  },
  {
    name: 'Embedding-Qwen-Turbo',
    version: 'v1.0',
    params: '335M',
    status: 'active',
    gpu: '1x T4',
    calls: '2.1M',
    avgLatency: '0.04s',
    description: '通义千问向量化模型，中文检索优化'
  },
];

const knowledgeBases: KnowledgeBase[] = [
  {
    name: 'Confluence-产品文档',
    source: 'Confluence',
    docs: '18,492',
    status: 'synced',
    lastSync: '2小时前',
    size: '4.2 GB'
  },
  {
    name: 'SharePoint-法务合同',
    source: 'SharePoint',
    docs: '7,845',
    status: 'synced',
    lastSync: '5小时前',
    size: '1.8 GB'
  },
  {
    name: 'GitLab-核心代码库',
    source: 'GitLab',
    docs: '156,723',
    status: 'syncing',
    lastSync: '同步中...',
    size: '12.5 GB',
    progress: 65
  },
  {
    name: 'Jira-工单知识',
    source: 'Jira',
    docs: '34,567',
    status: 'synced',
    lastSync: '1小时前',
    size: '2.1 GB'
  },
  {
    name: 'Wiki-技术文档',
    source: 'MediaWiki',
    docs: '5,234',
    status: 'synced',
    lastSync: '3小时前',
    size: '890 MB'
  },
  {
    name: '财报-季度数据',
    source: 'Custom Upload',
    docs: '1,245',
    status: 'error',
    lastSync: '失败',
    size: '125 MB'
  },
];

const trainingProgress = [
  { epoch: 1, loss: 2.45, val_loss: 2.52 },
  { epoch: 2, loss: 1.89, val_loss: 2.01 },
  { epoch: 3, loss: 1.54, val_loss: 1.78 },
  { epoch: 4, loss: 1.32, val_loss: 1.62 },
  { epoch: 5, loss: 1.18, val_loss: 1.54 },
  { epoch: 6, loss: 1.09, val_loss: 1.49 },
  { epoch: 7, loss: 1.02, val_loss: 1.46 },
];

interface ModelHubProps {
  activeTab: string;
}

export function ModelHub({ activeTab }: ModelHubProps) {
  const [deployDialogOpen, setDeployDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [benchmarkOpen, setBenchmarkOpen] = useState(false);

  const handleModelAction = (action: string, modelName: string) => {
    toast.success(`${action}: ${modelName}`);
  };

  const filteredModels = filterStatus === 'all' 
    ? baseModels 
    : baseModels.filter(m => m.status === filterStatus);

  return (
    <>
    <Tabs value={activeTab === 'models' ? 'models' : 'mlops'} className="space-y-6">
      <TabsList className="bg-slate-800 text-slate-300">
        <TabsTrigger value="models" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
          基础模型库
        </TabsTrigger>
        <TabsTrigger value="mlops" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
          MLOps工作流
        </TabsTrigger>
      </TabsList>

      <TabsContent value="models" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg text-white">已部署模型</div>
            <div className="text-sm text-slate-400">管理和监控所有基础模型 • {filteredModels.length} 个模型</div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setBenchmarkOpen(true)}
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              <Zap className="mr-2 h-4 w-4" />
              性能测试
            </Button>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 border-slate-700 bg-slate-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-slate-700 bg-slate-800">
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">运行中</SelectItem>
                <SelectItem value="archived">已归档</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={deployDialogOpen} onOpenChange={setDeployDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="mr-2 h-4 w-4" />
                  部署新模型
                </Button>
              </DialogTrigger>
              <DialogContent className="border-slate-700 bg-slate-900 text-white">
                <DialogHeader>
                  <DialogTitle>部署新模型</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    选择模型文件并配置部署参数
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>模型名称</Label>
                    <Input placeholder="例如: Llama-3-8B-Custom" className="border-slate-700 bg-slate-800 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label>模型文件路径</Label>
                    <Input placeholder="/models/llama-3-8b/" className="border-slate-700 bg-slate-800 text-white font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>GPU配置</Label>
                      <Select defaultValue="2xa100">
                        <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800">
                          <SelectItem value="1xt4">1x T4</SelectItem>
                          <SelectItem value="2xa100">2x A100</SelectItem>
                          <SelectItem value="4xa100">4x A100</SelectItem>
                          <SelectItem value="8xh100">8x H100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>量化精度</Label>
                      <Select defaultValue="fp16">
                        <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800">
                          <SelectItem value="fp32">FP32</SelectItem>
                          <SelectItem value="fp16">FP16</SelectItem>
                          <SelectItem value="int8">INT8</SelectItem>
                          <SelectItem value="int4">INT4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeployDialogOpen(false)} className="border-slate-700 bg-slate-800 text-white">
                    取消
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                    toast.success('模型部署任务已启动');
                    setDeployDialogOpen(false);
                  }}>
                    开始部署
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredModels.map((model, idx) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-5 hover:shadow-lg hover:shadow-purple-500/10 transition-all group">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white">{model.name}</div>
                        <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-400 text-xs">
                          {model.status === 'active' ? '活跃' : '归档'}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-slate-400">{model.version}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/20">
                        <Database className="h-5 w-5 text-white" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700">
                          <DropdownMenuLabel className="text-slate-300">模型操作</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-700" />
                          <DropdownMenuItem className="text-slate-300 focus:bg-slate-700" onClick={() => handleModelAction('查看详情', model.name)}>
                            <Eye className="mr-2 h-4 w-4" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 focus:bg-slate-700" onClick={() => handleModelAction('复制配置', model.name)}>
                            <Copy className="mr-2 h-4 w-4" />
                            复制配置
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 focus:bg-slate-700" onClick={() => handleModelAction('性能测试', model.name)}>
                            <Zap className="mr-2 h-4 w-4" />
                            性能测试
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-700" />
                          <DropdownMenuItem className="text-red-400 focus:bg-red-500/10" onClick={() => handleModelAction('删除模型', model.name)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除模型
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">{model.description}</div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-2">
                      <div className="text-slate-500">参数量</div>
                      <div className="mt-1 text-white">{model.params}</div>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-2">
                      <div className="text-slate-500">GPU配置</div>
                      <div className="mt-1 text-white">{model.gpu}</div>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-2">
                      <div className="text-slate-500">调用量</div>
                      <div className="mt-1 text-white">{model.calls}/天</div>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-2">
                      <div className="text-slate-500">平均延迟</div>
                      <div className="mt-1 text-white">{model.avgLatency}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white">
                      <Settings className="mr-1 h-3 w-3" />
                      配置
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white">
                      <Pause className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-white">RAG知识库管理</div>
              <div className="text-xs text-slate-400">管理企业内部知识源的连接与同步</div>
            </div>
            <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400">
              {knowledgeBases.length} 个知识源
            </Badge>
          </div>
          <div className="space-y-3">
            {knowledgeBases.map((kb, idx) => (
              <motion.div
                key={kb.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group"
              >
                <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/30 p-4 hover:bg-slate-800/50 hover:border-slate-600 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg ${
                      kb.status === 'synced' ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/20' :
                      kb.status === 'syncing' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/20' :
                      'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/20'
                    }`}>
                      {kb.status === 'synced' ? <CheckCircle2 className="h-6 w-6 text-white" /> :
                       kb.status === 'syncing' ? <Clock className="h-6 w-6 text-white animate-pulse" /> :
                       <AlertCircle className="h-6 w-6 text-white" />}
                    </div>
                    <div>
                      <div className="text-white">{kb.name}</div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                        <span>{kb.source}</span>
                        <span>•</span>
                        <span>{kb.docs} 文档片段</span>
                        <span>•</span>
                        <span>{kb.size}</span>
                      </div>
                      {kb.status === 'syncing' && (
                        <div className="mt-2">
                          <Progress value={kb.progress} className="h-1 bg-slate-700" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-500">上次同步</div>
                      <div className={`mt-1 text-xs ${
                        kb.status === 'synced' ? 'text-green-400' :
                        kb.status === 'syncing' ? 'text-blue-400' :
                        'text-red-400'
                      }`}>
                        {kb.lastSync}
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
                        onClick={() => toast.success(`重新同步: ${kb.name}`)}
                      >
                        <Link className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white">
              <Upload className="mr-2 h-4 w-4" />
              接入新知识源
            </Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="mlops" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg text-white">模型微调工作流</div>
            <div className="text-sm text-slate-400">端到端的模型训练与部署</div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Play className="mr-2 h-4 w-4" />
            创建微调任务
          </Button>
        </div>

        <Card className="border-slate-800 bg-[#0d1117] p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white">当前训练任务: Finance-QA-v2.0</div>
                <div className="mt-1 text-sm text-slate-400">基础模型: Qwen-14B | 数据集: internal-finance-qa-10k</div>
              </div>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                训练中 - Epoch 7/10
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4 text-sm text-slate-300">训练损失曲线</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trainingProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="epoch" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                  <Line type="monotone" dataKey="val_loss" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <span className="text-slate-400">训练损失</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  <span className="text-slate-400">验证损失</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">GPU利用率</span>
                  <span className="text-white">92%</span>
                </div>
                <Progress value={92} className="bg-slate-800" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">显存占用</span>
                  <span className="text-white">68.4 / 80 GB</span>
                </div>
                <Progress value={85.5} className="bg-slate-800" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">训练进度</span>
                  <span className="text-white">70%</span>
                </div>
                <Progress value={70} className="bg-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-3">
                  <div className="text-xs text-slate-400">当前学习率</div>
                  <div className="mt-1 font-mono text-sm text-white">2.5e-5</div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-3">
                  <div className="text-xs text-slate-400">预计完成</div>
                  <div className="mt-1 text-sm text-white">1小时28分</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700">
              <Pause className="mr-2 h-4 w-4" />
              暂停训练
            </Button>
            <Button variant="outline" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700">
              查看日志
            </Button>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-800 bg-[#0d1117] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">已完成任务</div>
                <div className="text-lg text-white">23</div>
              </div>
            </div>
          </Card>
          <Card className="border-slate-800 bg-[#0d1117] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">进行中任务</div>
                <div className="text-lg text-white">3</div>
              </div>
            </div>
          </Card>
          <Card className="border-slate-800 bg-[#0d1117] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Cpu className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">GPU总时长</div>
                <div className="text-lg text-white">1,847 小时</div>
              </div>
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
    <ModelBenchmark open={benchmarkOpen} onOpenChange={setBenchmarkOpen} />
    </>
  );
}