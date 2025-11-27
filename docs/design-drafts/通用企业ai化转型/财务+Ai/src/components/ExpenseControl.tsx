import { useState } from 'react';
import { Camera, AlertTriangle, CheckCircle, XCircle, TrendingUp, DollarSign, Clock, FileText, Search, Filter, MessageSquare, Eye, Brain, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ExpenseReport {
  id: string;
  employee: string;
  department: string;
  date: string;
  amount: number;
  category: string;
  riskScore: number;
  status: 'pending' | 'approved' | 'rejected';
  alerts: string[];
}

const mockExpenseReports: ExpenseReport[] = [
  {
    id: 'ER-2025-0156',
    employee: '张伟',
    department: '销售部',
    date: '2025-10-20',
    amount: 8500,
    category: '差旅费',
    riskScore: 95,
    status: 'pending',
    alerts: [
      '[警告] 该发票疑似为重复提交，与 #ER-2025-0143 中的发票相似度98%',
      '[提示] 该员工本月差旅费已接近上限 (已用: ¥7,200 / 限额: ¥10,000)'
    ]
  },
  {
    id: 'ER-2025-0157',
    employee: '李娜',
    department: '市场部',
    date: '2025-10-21',
    amount: 3200,
    category: '餐饮费',
    riskScore: 78,
    status: 'pending',
    alerts: [
      '[警告] 单次餐饮费用超出标准上限 (标准: ¥200/人，实际: ¥320/人)',
      '[信息] 缺少参会人员名单附件'
    ]
  },
  {
    id: 'ER-2025-0158',
    employee: '王强',
    department: '技术部',
    date: '2025-10-21',
    amount: 12500,
    category: '培训费',
    riskScore: 42,
    status: 'pending',
    alerts: [
      '[提示] 该笔费用需部门总监审批（金额 > ¥10,000）'
    ]
  },
  {
    id: 'ER-2025-0155',
    employee: '刘芳',
    department: '行政部',
    date: '2025-10-19',
    amount: 450,
    category: '办公用品',
    riskScore: 12,
    status: 'approved',
    alerts: []
  },
  {
    id: 'ER-2025-0154',
    employee: '陈明',
    department: '销售部',
    date: '2025-10-18',
    amount: 15000,
    category: '招待费',
    riskScore: 98,
    status: 'rejected',
    alerts: [
      '[严重] 发票已被其他公司报销过，疑似为虚假发票',
      '[警告] 该员工本月已有2次不合规报销记录'
    ]
  }
];

const expenseTrend = [
  { month: '5月', 报销总额: 285000, 不合规金额: 12000, 审批通过率: 94 },
  { month: '6月', 报销总额: 312000, 不合规金额: 9500, 审批通过率: 96 },
  { month: '7月', 报销总额: 298000, 不合规金额: 8200, 审批通过率: 97 },
  { month: '8月', 报销总额: 335000, 不合规金额: 6800, 审批通过率: 98 },
  { month: '9月', 报销总额: 318000, 不合规金额: 5200, 审批通过率: 98 },
  { month: '10月', 报销总额: 342000, 不合规金额: 3800, 审批通过率: 99 },
];

const categoryBreakdown = [
  { category: '差旅费', amount: 125000, count: 156 },
  { category: '餐饮费', amount: 68000, count: 342 },
  { category: '办公用品', amount: 42000, count: 189 },
  { category: '培训费', amount: 58000, count: 23 },
  { category: '招待费', amount: 32000, count: 67 },
  { category: '其他', amount: 17000, count: 98 },
];

export default function ExpenseControl() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [reports, setReports] = useState(mockExpenseReports);
  const [selectedReport, setSelectedReport] = useState<ExpenseReport | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = selectedRisk === 'all' || 
                       (selectedRisk === 'high' && report.riskScore >= 70) ||
                       (selectedRisk === 'medium' && report.riskScore >= 40 && report.riskScore < 70) ||
                       (selectedRisk === 'low' && report.riskScore < 40);
    
    return matchesSearch && matchesRisk;
  });

  const handleApprove = (id: string) => {
    setReports(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'approved' as const } : r
    ));
    toast.success('报销单已批准');
  };

  const handleReject = (id: string) => {
    const report = reports.find(r => r.id === id);
    if (report) {
      setSelectedReport(report);
      setShowRejectDialog(true);
    }
  };

  const confirmReject = () => {
    if (selectedReport) {
      setReports(prev => prev.map(r => 
        r.id === selectedReport.id ? { ...r, status: 'rejected' as const } : r
      ));
      toast.error(`报销单 ${selectedReport.id} 已驳回`);
      setShowRejectDialog(false);
      setSelectedReport(null);
      setRejectReason('');
    }
  };

  const handleMobileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    toast.info('开始上传发票照片...');

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            toast.success('发票识别完成！信息已自动填充');
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleSubmitExpense = () => {
    toast.success('报销申请已提交！预计1小时内完成审批');
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const highRiskCount = reports.filter(r => r.riskScore >= 70 && r.status === 'pending').length;
  const totalAmount = mockExpenseReports.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">智能费用控制</h2>
          <p className="text-gray-600">AI驱动的合规审核，让每一分开支都透明可控</p>
        </div>
        <Badge className="bg-teal-100 text-teal-700 border-teal-200">
          <Brain className="w-3 h-3 mr-1" />
          AI审核率: 95.2%
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">待审核报销单</CardDescription>
            <CardTitle className="text-amber-600">{pendingCount}份</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">总金额: ¥{mockExpenseReports.filter(r => r.status === 'pending').reduce((s, r) => s + r.amount, 0).toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">高风险报销</CardDescription>
            <CardTitle className="text-red-600">{highRiskCount}份</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">需优先审核</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">自动化审核率</CardDescription>
            <CardTitle className="text-teal-600">95.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={95} className="h-2" />
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">不合规识别率</CardDescription>
            <CardTitle className="text-indigo-600">99.9%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">本月拦截: 23笔</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="review" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="review">审核后台</TabsTrigger>
          <TabsTrigger value="employee">员工端</TabsTrigger>
          <TabsTrigger value="analytics">统计分析</TabsTrigger>
        </TabsList>

        {/* Review Backend */}
        <TabsContent value="review" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="搜索员工姓名或报销单号..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedRisk === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedRisk('all')}
                    size="sm"
                  >
                    全部
                  </Button>
                  <Button
                    variant={selectedRisk === 'high' ? 'default' : 'outline'}
                    onClick={() => setSelectedRisk('high')}
                    size="sm"
                    className={selectedRisk === 'high' ? 'bg-red-600' : ''}
                  >
                    高风险
                  </Button>
                  <Button
                    variant={selectedRisk === 'medium' ? 'default' : 'outline'}
                    onClick={() => setSelectedRisk('medium')}
                    size="sm"
                    className={selectedRisk === 'medium' ? 'bg-amber-600' : ''}
                  >
                    中风险
                  </Button>
                  <Button
                    variant={selectedRisk === 'low' ? 'default' : 'outline'}
                    onClick={() => setSelectedRisk('low')}
                    size="sm"
                    className={selectedRisk === 'low' ? 'bg-green-600' : ''}
                  >
                    低风险
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expense Reports List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                风险优先队列
              </CardTitle>
              <CardDescription>AI按风险评分自动排序，高风险项目优先展示</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredReports.sort((a, b) => b.riskScore - a.riskScore).map((report) => (
                  <div key={report.id} className={`rounded-lg p-4 border ${
                    report.status === 'rejected' ? 'bg-red-50 border-red-200 opacity-60' :
                    report.status === 'approved' ? 'bg-green-50 border-green-200 opacity-60' :
                    report.riskScore >= 70 ? 'bg-red-50 border-red-300' :
                    report.riskScore >= 40 ? 'bg-amber-50 border-amber-200' :
                    'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-sm text-slate-900">{report.employee} - {report.department}</h4>
                          
                          {report.status === 'pending' && (
                            <>
                              {report.riskScore >= 70 && (
                                <Badge className="bg-red-600 text-white">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  高风险 {report.riskScore}
                                </Badge>
                              )}
                              {report.riskScore >= 40 && report.riskScore < 70 && (
                                <Badge className="bg-amber-600 text-white">
                                  中风险 {report.riskScore}
                                </Badge>
                              )}
                              {report.riskScore < 40 && (
                                <Badge className="bg-green-100 text-green-700 border-green-300">
                                  低风险 {report.riskScore}
                                </Badge>
                              )}
                            </>
                          )}
                          
                          {report.status === 'approved' && (
                            <Badge className="bg-green-600 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              已批准
                            </Badge>
                          )}
                          
                          {report.status === 'rejected' && (
                            <Badge className="bg-red-600 text-white">
                              <XCircle className="w-3 h-3 mr-1" />
                              已拒绝
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-3">
                          <div>
                            <span className="text-slate-600">报销单号:</span>
                            <p className="text-slate-900">{report.id}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">类别:</span>
                            <p className="text-slate-900">{report.category}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">金额:</span>
                            <p className="text-slate-900">¥{report.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">提交日期:</span>
                            <p className="text-slate-900">{report.date}</p>
                          </div>
                        </div>

                        {report.alerts.length > 0 && (
                          <div className="bg-white rounded p-3 space-y-2">
                            <p className="text-xs text-slate-700">AI审计报告:</p>
                            {report.alerts.map((alert, idx) => (
                              <div key={idx} className={`text-xs flex items-start gap-2 ${
                                alert.includes('[严重]') || alert.includes('[警告]') ? 'text-red-700' :
                                alert.includes('[提示]') ? 'text-amber-700' :
                                'text-blue-700'
                              }`}>
                                <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span>{alert}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {report.status === 'pending' && (
                        <div className="flex flex-col gap-2 ml-4">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(report.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            批准
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(report.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            拒绝
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedReport(report);
                              toast.info(`查看报销单 ${report.id}`);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            详情
                          </Button>
                        </div>
                      )}
                      {report.status === 'approved' && (
                        <Badge className="bg-green-600 text-white ml-4">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          已批准
                        </Badge>
                      )}
                      {report.status === 'rejected' && (
                        <Badge className="bg-red-600 text-white ml-4">
                          <XCircle className="w-3 h-3 mr-1" />
                          已驳回
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employee App Simulation */}
        <TabsContent value="employee" className="space-y-6">
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                员工端移动应用
              </CardTitle>
              <CardDescription>拍照即报销，AI自动识别发票信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-md mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <h3 className="text-center text-slate-900">新建报销申请</h3>
                  
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50">
                    <Camera className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="text-sm text-slate-700 mb-2">拍摄或上传发票</p>
                    {isUploading ? (
                      <div className="space-y-2">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-xs text-slate-600">AI识别中... {uploadProgress}%</p>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-blue-600"
                        onClick={handleMobileUpload}
                      >
                        打开相机
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-2">AI已识别:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">供应商:</span>
                          <span className="text-slate-900">滴滴出行</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">金额:</span>
                          <span className="text-slate-900">¥52.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">日期:</span>
                          <span className="text-slate-900">2025-10-24</span>
                        </div>
                      </div>
                    </div>

                    <select className="w-full border border-slate-300 rounded-lg p-3 text-sm">
                      <option>选择费用类别</option>
                      <option>差旅费</option>
                      <option>餐饮费</option>
                      <option>办公用品</option>
                      <option>其他</option>
                    </select>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-xs text-amber-900">实时政策提醒</p>
                          <p className="text-xs text-amber-700 mt-1">
                            您的本月打车费用已达 ¥850，接近标准上限 ¥1,000
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-blue-600"
                      onClick={handleSubmitExpense}
                    >
                      提交报销
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm text-blue-900 mb-3">员工端功能特点</h4>
                <ul className="text-xs text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>拍照即可自动识别发票所有信息，无需手工录入</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>实时提醒费用标准和政策，避免提交不合规报销</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>AI预审核，合规报销最快1小时内完成审批</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>实时查看审批进度和历史报销记录</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  费用趋势分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={expenseTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="报销总额" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="不合规金额" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  费用类别分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>费用类别明细</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.category} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm text-slate-900">{cat.category}</h4>
                      <span className="text-sm text-slate-900">¥{cat.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-600">
                      <span>{cat.count} 笔报销</span>
                      <span>平均: ¥{Math.round(cat.amount / cat.count).toLocaleString()}/笔</span>
                    </div>
                    <Progress value={(cat.amount / 342000) * 100} className="mt-2 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>驳回报销单</DialogTitle>
            <DialogDescription>
              请说明驳回原因，将通知员工修改后重新提交
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-600 mb-1">报销单号</p>
                <p className="text-sm text-slate-900">{selectedReport.id}</p>
                <p className="text-xs text-slate-600 mt-2 mb-1">申请人</p>
                <p className="text-sm text-slate-900">{selectedReport.employee} - {selectedReport.department}</p>
                <p className="text-xs text-slate-600 mt-2 mb-1">金额</p>
                <p className="text-sm text-slate-900">¥{selectedReport.amount.toLocaleString()}</p>
              </div>
              
              <div>
                <label className="text-sm text-slate-700 mb-2 block">驳回原因 *</label>
                <Textarea
                  placeholder="请详细说明驳回原因，帮助员工理解并修正问题..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                />
              </div>

              {selectedReport.alerts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-900 mb-2">AI检测到的问题:</p>
                  {selectedReport.alerts.map((alert, idx) => (
                    <p key={idx} className="text-xs text-red-700 mb-1">• {alert}</p>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRejectDialog(false);
                    setRejectReason('');
                  }}
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmReject}
                  disabled={!rejectReason.trim()}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  确认驳回
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}