import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Shield, AlertTriangle, CheckCircle2, XCircle, Lock, Eye, FileText, Terminal, Plus, Edit, Trash2, PlayCircle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface DlpRule {
  id: number;
  name: string;
  pattern: string;
  action: 'block' | 'alert' | 'log';
  enabled: boolean;
  hits: number;
  description: string;
}

const complianceMetrics = [
  { name: '内容合规率', value: 99.7, target: 99.5 },
  { name: 'DLP拦截率', value: 100, target: 100 },
  { name: '审计日志完整性', value: 100, target: 100 },
  { name: '数据不出域保障', value: 100, target: 100 },
];

const guardrails = [
  {
    category: '政治敏感内容',
    enabled: true,
    level: 'high',
    description: '禁止生成任何政治相关的敏感言论'
  },
  {
    category: '暴力血腥内容',
    enabled: true,
    level: 'high',
    description: '禁止生成暴力、血腥、恐怖内容'
  },
  {
    category: '色情低俗内容',
    enabled: true,
    level: 'high',
    description: '禁止生成色情、低俗、不雅内容'
  },
  {
    category: '代码安全规范',
    enabled: true,
    level: 'medium',
    description: '生成的代码必须符合公司安全编码规范'
  },
  {
    category: '品牌一致性',
    enabled: true,
    level: 'medium',
    description: '营销内容必须符合品牌调性与规范'
  },
  {
    category: '法律合规性',
    enabled: true,
    level: 'high',
    description: '法务相关内容必须符合法律法规'
  },
];

const securityEvents = [
  {
    time: '2025-10-24 14:32:15',
    type: 'blocked',
    severity: 'high',
    user: '开发者-李娜',
    rule: 'DLP: 身份证号检测',
    detail: '输入内容包含疑似身份证号，已自动阻止',
  },
  {
    time: '2025-10-24 13:45:22',
    type: 'alert',
    severity: 'medium',
    user: '开发者-赵敏',
    rule: 'Guardrail: 代码安全规范',
    detail: '生成的代码包含硬编码密码，已发出警告',
  },
  {
    time: '2025-10-24 12:18:09',
    type: 'alert',
    severity: 'low',
    user: '数据分析师-刘洋',
    rule: 'DLP: 手机号检测',
    detail: '查询内容包含手机号，已记录到审计日志',
  },
  {
    time: '2025-10-24 11:50:33',
    type: 'blocked',
    severity: 'high',
    user: '应用开发者-王强',
    rule: 'Guardrail: 政治敏感内容',
    detail: '输出内容触发政治敏感词过滤，已阻止',
  },
  {
    time: '2025-10-24 10:25:47',
    type: 'alert',
    severity: 'medium',
    user: '营销专员-张莉',
    rule: 'Guardrail: 品牌一致性',
    detail: '生成内容与品牌调性不符，建议人工审核',
  },
];

export function SecurityCenter() {
  const [dlpRules, setDlpRules] = useState<DlpRule[]>([
    {
      id: 1,
      name: '身份证号检测',
      pattern: '\\d{17}[0-9Xx]',
      action: 'block',
      enabled: true,
      hits: 0,
      description: '阻止包含中国大陆身份证号的内容'
    },
    {
      id: 2,
      name: '银行卡号检测',
      pattern: '\\d{16,19}',
      action: 'block',
      enabled: true,
      hits: 0,
      description: '阻止包含银行卡号格式的内容'
    },
    {
      id: 3,
      name: '手机号检测',
      pattern: '1[3-9]\\d{9}',
      action: 'alert',
      enabled: true,
      hits: 23,
      description: '检测到手机号时发出警告但不阻止'
    },
    {
      id: 4,
      name: '电子邮箱检测',
      pattern: '[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}',
      action: 'alert',
      enabled: true,
      hits: 156,
      description: '检测邮箱地址并记录'
    },
    {
      id: 5,
      name: 'IP地址检测',
      pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}',
      action: 'alert',
      enabled: false,
      hits: 0,
      description: '检测IP地址格式'
    },
  ]);

  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<DlpRule | null>(null);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState<{ matched: boolean; rule?: DlpRule } | null>(null);
  
  // Form states
  const [formName, setFormName] = useState('');
  const [formPattern, setFormPattern] = useState('');
  const [formAction, setFormAction] = useState<'block' | 'alert' | 'log'>('block');
  const [formDescription, setFormDescription] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);

  const openNewRuleDialog = () => {
    setEditingRule(null);
    setFormName('');
    setFormPattern('');
    setFormAction('block');
    setFormDescription('');
    setFormEnabled(true);
    setRuleDialogOpen(true);
  };

  const openEditRuleDialog = (rule: DlpRule) => {
    setEditingRule(rule);
    setFormName(rule.name);
    setFormPattern(rule.pattern);
    setFormAction(rule.action);
    setFormDescription(rule.description);
    setFormEnabled(rule.enabled);
    setRuleDialogOpen(true);
  };

  const handleSaveRule = () => {
    if (!formName || !formPattern || !formDescription) {
      toast.error('请填写所有必填字段');
      return;
    }

    if (editingRule) {
      // Edit existing rule
      setDlpRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, name: formName, pattern: formPattern, action: formAction, description: formDescription, enabled: formEnabled }
          : rule
      ));
      toast.success(`规则已更新: ${formName}`);
    } else {
      // Add new rule
      const newRule: DlpRule = {
        id: Math.max(...dlpRules.map(r => r.id), 0) + 1,
        name: formName,
        pattern: formPattern,
        action: formAction,
        enabled: formEnabled,
        hits: 0,
        description: formDescription
      };
      setDlpRules(prev => [...prev, newRule]);
      toast.success(`新规则已创建: ${formName}`);
    }
    
    setRuleDialogOpen(false);
  };

  const handleDeleteRule = (ruleId: number) => {
    const rule = dlpRules.find(r => r.id === ruleId);
    setDlpRules(prev => prev.filter(r => r.id !== ruleId));
    toast.success(`规则已删除: ${rule?.name}`);
  };

  const handleToggleRule = (ruleId: number) => {
    setDlpRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
    const rule = dlpRules.find(r => r.id === ruleId);
    toast.success(`规则${rule?.enabled ? '已禁用' : '已启用'}: ${rule?.name}`);
  };

  const handleTestRule = () => {
    if (!testText) {
      toast.error('请输入测试文本');
      return;
    }

    // Test against all enabled rules
    for (const rule of dlpRules.filter(r => r.enabled)) {
      try {
        const regex = new RegExp(rule.pattern);
        if (regex.test(testText)) {
          setTestResult({ matched: true, rule });
          return;
        }
      } catch (e) {
        // Invalid regex
      }
    }
    
    setTestResult({ matched: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg text-white">安全策略中心</div>
          <div className="text-sm text-slate-400">数据丢失防护(DLP)与模型护栏(Guardrails)配置</div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
          <Shield className="h-4 w-4" />
          <span>安全状态良好</span>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {complianceMetrics.map((metric) => (
          <Card key={metric.name} className="border-slate-800 bg-[#0d1117] p-4">
            <div className="space-y-2">
              <div className="text-xs text-slate-400">{metric.name}</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl text-white">{metric.value}%</div>
                {metric.value >= metric.target ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                )}
              </div>
              <div className="text-xs text-slate-500">目标: {metric.target}%</div>
            </div>
          </Card>
        ))}
      </div>

      {/* DLP Rules */}
      <Card className="border-slate-800 bg-[#0d1117] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-white">数据丢失防护 (DLP) 规则</div>
            <div className="text-xs text-slate-400">基于正则表达式和关键词的内容过滤策略</div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              onClick={() => setTestDialogOpen(true)}
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              测试规则
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={openNewRuleDialog}>
              <Plus className="mr-2 h-4 w-4" />
              新建规则
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {dlpRules.map((rule) => (
            <div key={rule.id} className="rounded-lg border border-slate-800 bg-slate-900/30 p-4 group hover:bg-slate-900/50 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="text-white">{rule.name}</div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        rule.action === 'block'
                          ? 'border-red-500/30 bg-red-500/10 text-red-400'
                          : rule.action === 'alert'
                          ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                          : 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                      }`}
                    >
                      {rule.action === 'block' ? '阻止' : rule.action === 'alert' ? '警告' : '记录'}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        rule.enabled
                          ? 'border-green-500/30 bg-green-500/10 text-green-400'
                          : 'border-slate-600 bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rule.enabled ? '已启用' : '已禁用'}
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">{rule.description}</div>
                  <div className="mt-2 rounded bg-slate-900 px-2 py-1 font-mono text-xs text-slate-300">
                    {rule.pattern}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">命中次数: {rule.hits} (本月)</div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={rule.enabled} 
                    onCheckedChange={() => handleToggleRule(rule.id)}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => openEditRuleDialog(rule)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-5 w-5 text-blue-400" />
            <div>
              <div className="text-sm text-blue-300">DLP工作原理</div>
              <div className="mt-1 text-xs text-slate-400">
                所有用户输入的Prompt在发送给模型前，会先经过DLP引擎实时扫描。如果检测到敏感信息（如身份证号、银行卡号等），系统会根据规则配置自动阻止或发出警告，确保敏感数据不会被发送到模型，从而彻底杜绝数据泄露风险。
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Rule Dialog */}
      <Dialog open={ruleDialogOpen} onOpenChange={setRuleDialogOpen}>
        <DialogContent className="border-slate-700 bg-slate-900 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRule ? '编辑DLP规则' : '新建DLP规则'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {editingRule ? '修改现有的DLP规则配置' : '创建新的数据丢失防护规则'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>规则名称 *</Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="例如：公司内部项目代号检测"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label>正则表达式 *</Label>
              <Input
                value={formPattern}
                onChange={(e) => setFormPattern(e.target.value)}
                placeholder="例如：(PROJECT|PROJ)-[A-Z0-9]{4,8}"
                className="border-slate-700 bg-slate-800 text-white font-mono placeholder:text-slate-500"
              />
              <div className="text-xs text-slate-500">使用正则表达式定义需要检测的模式</div>
            </div>
            <div className="space-y-2">
              <Label>执行动作 *</Label>
              <Select value={formAction} onValueChange={(v) => setFormAction(v as 'block' | 'alert' | 'log')}>
                <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800">
                  <SelectItem value="block">阻止并拒绝请求</SelectItem>
                  <SelectItem value="alert">发出警告但允许</SelectItem>
                  <SelectItem value="log">仅记录不干预</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>规则描述 *</Label>
              <Textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="描述此规则的用途和检测内容..."
                className="min-h-[100px] border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 resize-none"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <div className="text-sm text-slate-300">启用此规则</div>
              <Switch checked={formEnabled} onCheckedChange={setFormEnabled} />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setRuleDialogOpen(false)}
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            >
              取消
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSaveRule}
            >
              {editingRule ? '保存更改' : '创建规则'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Dialog */}
      <Dialog open={testDialogOpen} onOpenChange={(open) => {
        setTestDialogOpen(open);
        if (!open) {
          setTestText('');
          setTestResult(null);
        }
      }}>
        <DialogContent className="border-slate-700 bg-slate-900 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>测试DLP规则</DialogTitle>
            <DialogDescription className="text-slate-400">
              输入测试文本，查看是否触发任何DLP规则
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>测试文本</Label>
              <Textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="输入包含敏感信息的测试文本，例如：我的手机号是13812345678"
                className="min-h-[150px] border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 resize-none"
              />
            </div>
            {testResult && (
              <div className={`rounded-lg border p-4 ${
                testResult.matched 
                  ? 'border-red-500/30 bg-red-500/10' 
                  : 'border-green-500/30 bg-green-500/10'
              }`}>
                <div className="flex items-start gap-3">
                  {testResult.matched ? (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className={`${testResult.matched ? 'text-red-300' : 'text-green-300'}`}>
                      {testResult.matched ? '检测到敏感信息！' : '未检测到敏感信息'}
                    </div>
                    {testResult.rule && (
                      <div className="mt-2 space-y-1">
                        <div className="text-xs text-slate-400">触发规则：</div>
                        <div className="text-sm text-white">{testResult.rule.name}</div>
                        <div className="text-xs text-slate-500">{testResult.rule.description}</div>
                        <div className="mt-2 rounded bg-slate-900/50 px-2 py-1 font-mono text-xs text-slate-300">
                          {testResult.rule.pattern}
                        </div>
                        <div className="mt-2">
                          <Badge variant="outline" className={`text-xs ${
                            testResult.rule.action === 'block'
                              ? 'border-red-500/30 bg-red-500/10 text-red-400'
                              : testResult.rule.action === 'alert'
                              ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                              : 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                          }`}>
                            {testResult.rule.action === 'block' ? '此请求将被阻止' : 
                             testResult.rule.action === 'alert' ? '此请求将发出警告' : 
                             '此请求将被记录'}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setTestDialogOpen(false);
                setTestText('');
                setTestResult(null);
              }}
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            >
              关闭
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleTestRule}
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              测试
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Guardrails */}
      <Card className="border-slate-800 bg-[#0d1117] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-white">模型护栏 (Guardrails)</div>
            <div className="text-xs text-slate-400">控制模型输出内容的边界与质量</div>
          </div>
          <Button variant="outline" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700">
            <Terminal className="mr-2 h-4 w-4" />
            测试护栏
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guardrails.map((guardrail) => (
            <Card key={guardrail.category} className="border-slate-800 bg-slate-900/30 p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-white">{guardrail.category}</div>
                    <div className="mt-1 text-xs text-slate-400">{guardrail.description}</div>
                  </div>
                  <Switch checked={guardrail.enabled} />
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      guardrail.level === 'high'
                        ? 'border-red-500/30 bg-red-500/10 text-red-400'
                        : guardrail.level === 'medium'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                        : 'border-green-500/30 bg-green-500/10 text-green-400'
                    }`}
                  >
                    {guardrail.level === 'high' ? '高风险' : guardrail.level === 'medium' ? '中风险' : '低风险'}
                  </Badge>
                  {guardrail.enabled && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 text-purple-400" />
            <div>
              <div className="text-sm text-purple-300">护栏工作原理</div>
              <div className="mt-1 text-xs text-slate-400">
                模型护栏在模型生成内容后、返回给用户前进行实时审查。通过预先训练的分类器和规则引擎，系统会检测输出是否包含不当内容（如政治敏感、暴力、色情等），或是否符合企业特定要求（如代码安全规范、品牌一致性）。一旦检测到违规内容，系统会自动拦截并要求模型重新生成。
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Events */}
      <Card className="border-slate-800 bg-[#0d1117] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-white">安全事件日志</div>
            <div className="text-xs text-slate-400">实时记录所有DLP与护栏触发事件</div>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-32 border-slate-700 bg-slate-800/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-slate-700 bg-slate-800">
                <SelectItem value="all">所有事件</SelectItem>
                <SelectItem value="blocked">仅阻止</SelectItem>
                <SelectItem value="alert">仅警告</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700">
              导出日志
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {securityEvents.map((event, index) => (
              <div key={index} className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    event.type === 'blocked' ? 'bg-red-500/10' : 'bg-amber-500/10'
                  }`}>
                    {event.type === 'blocked' ? (
                      <XCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-white">{event.rule}</div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          event.severity === 'high'
                            ? 'border-red-500/30 bg-red-500/10 text-red-400'
                            : event.severity === 'medium'
                            ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                            : 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                        }`}
                      >
                        {event.severity === 'high' ? '高危' : event.severity === 'medium' ? '中危' : '低危'}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs text-slate-400">{event.detail}</div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.user}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    详情
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Custom Rule Builder */}
      <Card className="border-slate-800 bg-[#0d1117] p-6">
        <div className="mb-4">
          <div className="text-white">自定义规则构建器</div>
          <div className="text-xs text-slate-400">快速创建新的DLP规则</div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs text-slate-400">规则名称</label>
              <Input
                placeholder="例如：公司内部项目代号检测"
                className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-slate-400">正则表达式</label>
              <Input
                placeholder="例如：(PROJECT|PROJ)-[A-Z0-9]{4,8}"
                className="border-slate-700 bg-slate-800/50 font-mono text-white placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-slate-400">执行动作</label>
              <Select defaultValue="block">
                <SelectTrigger className="border-slate-700 bg-slate-800/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800">
                  <SelectItem value="block">阻止并拒绝请求</SelectItem>
                  <SelectItem value="alert">发出警告但允许</SelectItem>
                  <SelectItem value="log">仅记录不干预</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs text-slate-400">规则描述</label>
              <Textarea
                placeholder="描述此规则的用途和检测内容..."
                className="min-h-[120px] border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 resize-none"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <div className="text-xs text-slate-300">启用此规则</div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            创建规则
          </Button>
          <Button variant="outline" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700">
            测试规则
          </Button>
        </div>
      </Card>
    </div>
  );
}