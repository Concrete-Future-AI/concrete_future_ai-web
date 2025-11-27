import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp, Activity, Users, MapPin, Network, Eye, Clock, AlertCircle, Play, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface Alert {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  description: string;
  entity: string;
  amount: number;
  status: 'new' | 'investigating' | 'resolved' | 'false-positive';
  relatedEntities?: string[];
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT-2025-089',
    timestamp: '2025-10-24 14:23:15',
    severity: 'critical',
    type: '疑似欺诈交易',
    description: '检测到一笔向新供应商"速达咨询"支付的款项，金额为 ¥198,000。该公司银行账户开户地为海外，且与公司内任何采购订单均不匹配。',
    entity: '速达咨询',
    amount: 198000,
    status: 'investigating',
    relatedEntities: ['李明 (采购员)', '中国建设银行账户 ***8888']
  },
  {
    id: 'ALT-2025-088',
    timestamp: '2025-10-24 11:45:32',
    severity: 'high',
    type: '异常资金流动',
    description: '检测到账户在3天内向同一个人转账5次，累计金额 ¥85,000，超出正常业务模式。',
    entity: '张伟 (销售经理)',
    amount: 85000,
    status: 'new',
    relatedEntities: ['王晓 (外部个人)', '工商银行账户 ***6666']
  },
  {
    id: 'ALT-2025-087',
    timestamp: '2025-10-24 09:12:48',
    severity: 'high',
    type: '供应商风险',
    description: '关键供应商"华强电子"的财务状况出现恶化迹象，资产负债率从45%上升至78%，存在违约风险。',
    entity: '华强电子',
    amount: 0,
    status: 'new',
    relatedEntities: ['应付账款: ¥2,350,000']
  },
  {
    id: 'ALT-2025-086',
    timestamp: '2025-10-23 16:35:21',
    severity: 'medium',
    type: '重复支付风险',
    description: '发现两笔相似的付款记录，疑似为同一采购订单的重复支付。',
    entity: 'PO-2025-3421',
    amount: 42000,
    status: 'resolved',
    relatedEntities: ['供应商: 东方建材', '付款: ¥42,000 × 2']
  },
  {
    id: 'ALT-2025-085',
    timestamp: '2025-10-23 14:18:09',
    severity: 'medium',
    type: '应收账款风险',
    description: '客户"天地科技"的应收账款账龄超过90天，金额 ¥156,000，存在坏账风险。',
    entity: '天地科技',
    amount: 156000,
    status: 'investigating',
    relatedEntities: ['账期: 92天', '信用评级: C']
  },
];

const riskTrend = [
  { date: '10/18', 高危: 2, 中危: 5, 低危: 8 },
  { date: '10/19', 高危: 3, 中危: 4, 低危: 7 },
  { date: '10/20', 高危: 1, 中危: 6, 低危: 9 },
  { date: '10/21', 高危: 4, 中危: 3, 低危: 6 },
  { date: '10/22', 高危: 2, 中危: 7, 低危: 8 },
  { date: '10/23', 高危: 3, 中危: 5, 低危: 7 },
  { date: '10/24', 高危: 2, 中危: 4, 低危: 5 },
];

const riskRadar = [
  { risk: '欺诈交易', 当前: 65, 行业平均: 45 },
  { risk: '供应商风险', 当前: 72, 行业平均: 60 },
  { risk: '应收风险', 当前: 58, 行业平均: 55 },
  { risk: '合规风险', 当前: 35, 行业平均: 48 },
  { risk: '操作风险', 当前: 42, 行业平均: 52 },
  { risk: '市场风险', 当前: 68, 行业平均: 62 },
];

const preventedLosses = [
  { month: '5月', 金额: 128000 },
  { month: '6月', 金额: 156000 },
  { month: '7月', 金额: 98000 },
  { month: '8月', 金额: 234000 },
  { month: '9月', 金额: 187000 },
  { month: '10月', 金额: 312000 },
];

export default function RiskDetection() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showInvestigationDialog, setShowInvestigationDialog] = useState(false);
  const [investigationNote, setInvestigationNote] = useState('');
  const [newAlertAnimation, setNewAlertAnimation] = useState(false);

  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length;
  const highCount = alerts.filter(a => a.severity === 'high' && a.status !== 'resolved').length;
  const investigatingCount = alerts.filter(a => a.status === 'investigating').length;
  const totalPrevented = preventedLosses.reduce((sum, item) => sum + item.金额, 0);

  // 模拟实时警报
  useEffect(() => {
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.85) { // 15% 概率生成新警报
        const newAlert: Alert = {
          id: `ALT-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          timestamp: new Date().toLocaleString('zh-CN'),
          severity: Math.random() > 0.7 ? 'high' : 'medium',
          type: ['异常交易', '供应商风险', '资金流动异常'][Math.floor(Math.random() * 3)],
          description: '检测到潜在风险，建议立即审查',
          entity: '新检测实体',
          amount: Math.floor(Math.random() * 100000) + 10000,
          status: 'new'
        };
        
        setAlerts(prev => [newAlert, ...prev]);
        setNewAlertAnimation(true);
        toast.error('检测到新的风险警报！', {
          description: newAlert.description
        });
        
        setTimeout(() => setNewAlertAnimation(false), 2000);
      }
    }, 20000); // 每20秒检查一次

    return () => clearInterval(alertInterval);
  }, []);

  const handleInvestigate = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowInvestigationDialog(true);
  };

  const handleResolve = (id: string, status: 'resolved' | 'false-positive') => {
    setAlerts(prev => prev.map(a => 
      a.id === id ? { ...a, status } : a
    ));
    
    if (status === 'resolved') {
      toast.success('警报已标记为已处理');
    } else {
      toast.info('警报已标记为误报');
    }
  };

  const startInvestigation = () => {
    if (selectedAlert) {
      setAlerts(prev => prev.map(a => 
        a.id === selectedAlert.id ? { ...a, status: 'investigating' as const } : a
      ));
      toast.info(`开始调查警报 ${selectedAlert.id}`);
      setShowInvestigationDialog(false);
      setInvestigationNote('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900">财务哨兵 - 主动式风控与欺诈检测</h2>
        <p className="text-slate-600">从事后审计迈向事前预警</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-600">
          <CardHeader className="pb-3">
            <CardDescription>严重警报</CardDescription>
            <CardTitle className="text-red-600 flex items-center gap-2">
              {criticalCount}
              <AlertTriangle className="w-5 h-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">需立即处理</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-600">
          <CardHeader className="pb-3">
            <CardDescription>高风险警报</CardDescription>
            <CardTitle className="text-amber-600">{highCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">建议24小时内处理</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-3">
            <CardDescription>正在调查</CardDescription>
            <CardTitle className="text-blue-600">{investigatingCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">待确认和解决</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="pb-3">
            <CardDescription>累计避免损失</CardDescription>
            <CardTitle className="text-green-600">¥{(totalPrevented / 10000).toFixed(1)}万</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">本年度</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Stream */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-t-4 border-t-red-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-600" />
                实时异常交易流
              </CardTitle>
              <CardDescription>AI持续监控并推送可疑财务活动</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div
                      key={alert.id}
                      onClick={() => setSelectedAlert(alert)}
                      className={`rounded-lg p-4 border cursor-pointer transition-all hover:shadow-md ${
                        alert.severity === 'critical' ? 'bg-red-50 border-red-300' :
                        alert.severity === 'high' ? 'bg-amber-50 border-amber-300' :
                        alert.severity === 'medium' ? 'bg-blue-50 border-blue-200' :
                        'bg-slate-50 border-slate-200'
                      } ${selectedAlert?.id === alert.id ? 'ring-2 ring-blue-500' : ''} ${
                        index === 0 && newAlertAnimation ? 'animate-pulse' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {alert.severity === 'critical' && (
                            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                          )}
                          {alert.severity === 'high' && (
                            <div className="w-3 h-3 bg-amber-600 rounded-full animate-pulse" />
                          )}
                          {alert.severity === 'medium' && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={
                                alert.severity === 'critical' ? 'border-red-600 text-red-700' :
                                alert.severity === 'high' ? 'border-amber-600 text-amber-700' :
                                'border-blue-600 text-blue-700'
                              }>
                                {alert.type}
                              </Badge>
                              <span className="text-xs text-slate-600">{alert.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        
                        {alert.status === 'new' && (
                          <Badge className="bg-red-600 text-white">新警报</Badge>
                        )}
                        {alert.status === 'investigating' && (
                          <Badge className="bg-blue-600 text-white">调查中</Badge>
                        )}
                        {alert.status === 'resolved' && (
                          <Badge className="bg-green-600 text-white">已解决</Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-slate-900">{alert.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600">涉及实体: {alert.entity}</span>
                          {alert.amount > 0 && (
                            <span className="text-red-700">金额: ¥{alert.amount.toLocaleString()}</span>
                          )}
                        </div>

                        {alert.relatedEntities && alert.relatedEntities.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                            <Network className="w-3 h-3" />
                            <span>关联: {alert.relatedEntities.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Investigation Panel */}
        <div className="space-y-6">
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                调查详情
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAlert ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-slate-700 mb-2">警报信息</h4>
                    <div className="bg-slate-50 rounded p-3 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-600">警报ID:</span>
                        <span className="text-slate-900">{selectedAlert.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">严重程度:</span>
                        <Badge variant="outline" className={
                          selectedAlert.severity === 'critical' ? 'border-red-600 text-red-700' :
                          selectedAlert.severity === 'high' ? 'border-amber-600 text-amber-700' :
                          'border-blue-600 text-blue-700'
                        }>
                          {selectedAlert.severity === 'critical' ? '严重' :
                           selectedAlert.severity === 'high' ? '高' : '中'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">类型:</span>
                        <span className="text-slate-900">{selectedAlert.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">时间:</span>
                        <span className="text-slate-900">{selectedAlert.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {selectedAlert.relatedEntities && (
                    <div>
                      <h4 className="text-sm text-slate-700 mb-2">关系网络图</h4>
                      <div className="bg-slate-50 rounded p-4">
                        <div className="flex flex-col items-center gap-3">
                          <div className="bg-red-100 border-2 border-red-600 rounded-lg px-4 py-2 text-sm text-center">
                            {selectedAlert.entity}
                          </div>
                          {selectedAlert.relatedEntities.map((entity, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-px h-8 bg-slate-300" />
                              <div className="bg-blue-100 border border-blue-600 rounded px-3 py-1 text-xs">
                                {entity}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm text-slate-700 mb-2">AI分析</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-900">
                      <p className="mb-2">基于机器学习模型分析:</p>
                      <ul className="space-y-1 text-blue-700">
                        <li>• 异常概率: 87.3%</li>
                        <li>• 历史类似案例: 12起</li>
                        <li>• 建议优先级: {selectedAlert.severity === 'critical' ? '最高' : '高'}</li>
                        <li>• 预计损失: ¥{selectedAlert.amount.toLocaleString()}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {selectedAlert.status === 'new' && (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleInvestigate(selectedAlert)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        开始调查
                      </Button>
                    )}
                    {selectedAlert.status === 'investigating' && (
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleResolve(selectedAlert.id, 'resolved')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        确认已解决
                      </Button>
                    )}
                    {selectedAlert.status !== 'resolved' && selectedAlert.status !== 'false-positive' && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleResolve(selectedAlert.id, 'false-positive')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        标记为误报
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-sm">请从左侧选择一个警报查看详情</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              风险警报趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={riskTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="高危" stackId="1" stroke="#ef4444" fill="#ef4444" />
                <Area type="monotone" dataKey="中危" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                <Area type="monotone" dataKey="低危" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              风险评估雷达图
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskRadar}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="risk" stroke="#64748b" />
                <PolarRadiusAxis stroke="#64748b" />
                <Radar name="当前水平" dataKey="当前" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="行业平均" dataKey="行业平均" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.4} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Prevented Losses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            AI预防的财务损失
          </CardTitle>
          <CardDescription>通过主动风险检测避免的潜在损失统计</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={preventedLosses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Area type="monotone" dataKey="金额" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-900">本年度累计避免损失</p>
                <p className="text-2xl text-green-700 mt-1">¥{(totalPrevented / 10000).toFixed(1)}万</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-900">AI识别准确率</p>
                <p className="text-2xl text-green-700 mt-1">87.6%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investigation Dialog */}
      <Dialog open={showInvestigationDialog} onOpenChange={setShowInvestigationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>开始调查</DialogTitle>
            <DialogDescription>
              记录调查计划和相关信息
            </DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm text-red-900 mb-1">{selectedAlert.type}</h4>
                    <p className="text-xs text-red-700">{selectedAlert.description}</p>
                    <div className="mt-2 flex gap-4 text-xs">
                      <span className="text-red-900">实体: {selectedAlert.entity}</span>
                      <span className="text-red-900">金额: ¥{selectedAlert.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAlert.relatedEntities && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-700 mb-2">相关实体:</p>
                  <div className="space-y-1">
                    {selectedAlert.relatedEntities.map((entity, idx) => (
                      <div key={idx} className="text-xs text-slate-900 flex items-center gap-2">
                        <Network className="w-3 h-3 text-slate-500" />
                        {entity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm text-slate-700 mb-2 block">调查计划</label>
                <Textarea
                  placeholder="记录调查步骤、需要联系的人员、需要查阅的资料等..."
                  value={investigationNote}
                  onChange={(e) => setInvestigationNote(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm text-blue-900 mb-2">AI建议的调查步骤</h4>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>核实交易对手方的工商注册信息和实际经营状况</li>
                  <li>检查相关合同和采购订单是否完整</li>
                  <li>与业务部门确认交易的真实性和必要性</li>
                  <li>审查资金流向和最终受益人信息</li>
                  <li>查询历史交易记录和风险案例库</li>
                </ol>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowInvestigationDialog(false);
                    setInvestigationNote('');
                  }}
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={startInvestigation}
                >
                  <Play className="w-4 h-4 mr-2" />
                  开始调查
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
