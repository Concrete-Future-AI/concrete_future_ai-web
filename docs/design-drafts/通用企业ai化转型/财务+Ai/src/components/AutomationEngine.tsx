import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, Sparkles, Link2, HelpCircle, X, Play, Pause, Brain, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

interface Invoice {
  id: string;
  supplier: string;
  amount: number;
  tax: number;
  date: string;
  category: string;
  status: 'ai-reviewed' | 'needs-review' | 'approved';
  confidence: number;
}

interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  matched: boolean;
  matchConfidence?: number;
  ledgerEntry?: string;
}

const mockInvoices: Invoice[] = [
  { id: 'INV-2025-001', supplier: '阿里云计算有限公司', amount: 18500, tax: 2775, date: '2025-10-15', category: '云服务费', status: 'ai-reviewed', confidence: 99.8 },
  { id: 'INV-2025-002', supplier: '腾讯广告', amount: 45000, tax: 6750, date: '2025-10-16', category: '营销推广费', status: 'ai-reviewed', confidence: 99.2 },
  { id: 'INV-2025-003', supplier: '北京办公用品商贸', amount: 3200, tax: 480, date: '2025-10-17', category: '办公费', status: 'needs-review', confidence: 87.5 },
  { id: 'INV-2025-004', supplier: '上海物业管理公司', amount: 12000, tax: 1800, date: '2025-10-18', category: '租赁费', status: 'ai-reviewed', confidence: 98.9 },
  { id: 'INV-2025-005', supplier: '顺丰速运', amount: 850, tax: 127.5, date: '2025-10-19', category: '快递费', status: 'needs-review', confidence: 82.3 },
];

const mockBankTransactions: BankTransaction[] = [
  { id: 'TXN-001', date: '2025-10-15', description: '阿里云计算有限公司', amount: -18500, matched: true, matchConfidence: 99.8, ledgerEntry: 'LE-2025-1523' },
  { id: 'TXN-002', date: '2025-10-16', description: '腾讯广告费用', amount: -45000, matched: true, matchConfidence: 98.5, ledgerEntry: 'LE-2025-1524' },
  { id: 'TXN-003', date: '2025-10-17', description: '客户付款-华为科技', amount: 125000, matched: true, matchConfidence: 99.9, ledgerEntry: 'LE-2025-1525' },
  { id: 'TXN-004', date: '2025-10-18', description: '物业费-上海办公室', amount: -12000, matched: true, matchConfidence: 97.2, ledgerEntry: 'LE-2025-1526' },
  { id: 'TXN-005', date: '2025-10-19', description: '未知转账-建设银行', amount: -5000, matched: false },
  { id: 'TXN-006', date: '2025-10-20', description: '快递费用', amount: -850, matched: false },
];

export default function AutomationEngine() {
  const [activeTab, setActiveTab] = useState('invoices');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    toast.info('开始上传发票...');
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            toast.success('发票上传成功！AI已开始识别');
            
            // 模拟添加新发票
            const newInvoice: Invoice = {
              id: `INV-2025-${String(invoices.length + 1).padStart(3, '0')}`,
              supplier: '新供应商示例',
              amount: Math.floor(Math.random() * 50000) + 1000,
              tax: Math.floor(Math.random() * 7500) + 150,
              date: new Date().toISOString().split('T')[0],
              category: '其他',
              status: 'ai-reviewed',
              confidence: 95 + Math.random() * 4.9
            };
            setInvoices(prev => [newInvoice, ...prev]);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleApproveInvoice = (id: string) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === id ? { ...inv, status: 'approved' as const } : inv
    ));
    toast.success('发票已批准');
  };

  const handleBatchApprove = () => {
    if (selectedInvoices.length === 0) {
      toast.error('请先选择要批准的发票');
      return;
    }
    
    setIsProcessing(true);
    toast.info(`正在批量处理 ${selectedInvoices.length} 张发票...`);
    
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => 
        selectedInvoices.includes(inv.id) ? { ...inv, status: 'approved' as const } : inv
      ));
      setSelectedInvoices([]);
      setIsProcessing(false);
      toast.success(`成功批准 ${selectedInvoices.length} 张发票`);
    }, 2000);
  };

  const handleToggleInvoice = (id: string) => {
    setSelectedInvoices(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const approvedCount = invoices.filter(inv => inv.status === 'ai-reviewed').length;
  const needsReviewCount = invoices.filter(inv => inv.status === 'needs-review').length;
  const matchedCount = mockBankTransactions.filter(txn => txn.matched).length;
  const unmatchedCount = mockBankTransactions.filter(txn => !txn.matched).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">自动化会计引擎</h2>
          <p className="text-gray-600">AI驱动的零接触账务处理，从录入到复核</p>
        </div>
        <Badge className="bg-teal-100 text-teal-700 border-teal-200">
          <Brain className="w-3 h-3 mr-1" />
          AI 自动化率: 98.2%
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">自动化率</CardDescription>
            <CardTitle className="text-teal-600">98.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={98} className="h-2" />
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">今日处理凭证</CardDescription>
            <CardTitle>156笔</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">节省时间: 12.8小时</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">AI准确率</CardDescription>
            <CardTitle className="text-blue-600">99.6%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={99.6} className="h-2" />
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">待人工审核</CardDescription>
            <CardTitle className="text-amber-600">8笔</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">平均置信度: 85.3%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invoices">智能凭证中心</TabsTrigger>
          <TabsTrigger value="reconciliation">银行对账工作台</TabsTrigger>
        </TabsList>

        {/* Invoice Processing */}
        <TabsContent value="invoices" className="space-y-6">
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                批量发票上传
              </CardTitle>
              <CardDescription>拖拽或点击上传发票扫描件或PDF文件</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={handleFileUpload}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-700 mb-2">拖拽文件到此处或点击上传</p>
                <p className="text-xs text-slate-500">支持 PDF, JPG, PNG 格式，最大20MB</p>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700">正在处理...</span>
                    <span className="text-blue-600">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-slate-600">AI正在识别发票信息并生成会计分录</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-blue-900 mb-1">AI自动化流程</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• OCR识别发票所有字段（供应商、金额、税率、日期等）</li>
                      <li>• 自动匹配供应商主数据和科目体系</li>
                      <li>• 根据业务规则生成会计分录</li>
                      <li>• 低置信度项目标记为待人工复核</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    发票处理队列
                  </CardTitle>
                  <CardDescription>
                    AI已预审 {approvedCount} 笔，需人工复核 {needsReviewCount} 笔
                    {selectedInvoices.length > 0 && ` · 已选择 ${selectedInvoices.length} 项`}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {selectedInvoices.length > 0 && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleBatchApprove}
                        disabled={isProcessing}
                      >
                        <CheckCircle className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
                        {isProcessing ? '处理中...' : `批量批准 (${selectedInvoices.length})`}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedInvoices([])}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className={`rounded-lg p-4 border ${
                    invoice.status === 'approved' ? 'bg-green-50 border-green-200 opacity-70' :
                    invoice.status === 'needs-review' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {invoice.status !== 'approved' && (
                          <Checkbox
                            checked={selectedInvoices.includes(invoice.id)}
                            onCheckedChange={() => handleToggleInvoice(invoice.id)}
                          />
                        )}
                      </div>
                      <div className="flex-1 ml-3">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-sm text-slate-900">{invoice.supplier}</h4>
                          {invoice.status === 'approved' ? (
                            <Badge className="bg-green-600 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              已批准
                            </Badge>
                          ) : invoice.status === 'ai-reviewed' ? (
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              AI已预审
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-300">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              需要复核
                            </Badge>
                          )}
                          {invoice.status === 'ai-reviewed' ? (
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              AI已预审
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-300">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              需要复核
                            </Badge>
                          )}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="text-xs">AI置信度: {invoice.confidence}%</p>
                                <p className="text-xs mt-1">
                                  {invoice.status === 'ai-reviewed' 
                                    ? '所有字段识别准确，会计分录已自动生成'
                                    : '部分字段识别度较低，建议人工核对供应商名称和金额'}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-slate-600">发票号:</span>
                            <p className="text-slate-900">{invoice.id}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">金额:</span>
                            <p className="text-slate-900">¥{invoice.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">税额:</span>
                            <p className="text-slate-900">¥{invoice.tax.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">日期:</span>
                            <p className="text-slate-900">{invoice.date}</p>
                          </div>
                        </div>

                        <div className="mt-3 bg-white rounded p-3 text-xs">
                          <p className="text-slate-600 mb-2">AI生成的会计分录:</p>
                          <div className="space-y-1 font-mono text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-700">借: {invoice.category}</span>
                              <span className="text-slate-900">¥{invoice.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-700">借: 应交税费-增值税(进项)</span>
                              <span className="text-slate-900">¥{invoice.tax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-700">贷: 应付账款-{invoice.supplier}</span>
                              <span className="text-slate-900">¥{(invoice.amount + invoice.tax).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        {invoice.status === 'needs-review' ? (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveInvoice(invoice.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              批准
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                toast.info('编辑功能');
                              }}
                            >
                              编辑
                            </Button>
                          </>
                        ) : invoice.status === 'ai-reviewed' ? (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                toast.info(`查看发票 ${invoice.id} 详情`);
                              }}
                            >
                              查看详情
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveInvoice(invoice.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              批准
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            已批准
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bank Reconciliation */}
        <TabsContent value="reconciliation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>自动匹配率</CardDescription>
                <CardTitle className="text-green-600">99.1%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">{matchedCount}/{mockBankTransactions.length} 笔已匹配</p>
                <Progress value={(matchedCount / mockBankTransactions.length) * 100} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>待人工确认</CardDescription>
                <CardTitle className="text-amber-600">{unmatchedCount}笔</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">AI提供了 {unmatchedCount} 个建议匹配项</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>今日对账效率</CardDescription>
                <CardTitle className="text-blue-600">+85%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-600">节省时间: 4.5小时</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-blue-600" />
                    银行对账双栏视图
                  </CardTitle>
                  <CardDescription>左侧银行流水，右侧总账记录，绿线表示AI已匹配</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  确认全部匹配
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockBankTransactions.map((txn) => (
                  <div key={txn.id} className={`rounded-lg p-4 ${
                    txn.matched ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-600 mb-1">日期</p>
                          <p className="text-sm text-slate-900">{txn.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">描述</p>
                          <p className="text-sm text-slate-900">{txn.description}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">金额</p>
                          <p className={`text-sm ${txn.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                            ¥{txn.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {txn.matched ? (
                        <div className="flex items-center gap-3 ml-4">
                          <ArrowRight className="w-5 h-5 text-green-600" />
                          <div className="bg-white rounded p-3 border border-green-300">
                            <p className="text-xs text-slate-600 mb-1">已匹配到总账</p>
                            <p className="text-sm text-slate-900">{txn.ledgerEntry}</p>
                            <p className="text-xs text-green-600 mt-1">置信度: {txn.matchConfidence}%</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 ml-4">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                          <div className="bg-white rounded p-3 border border-amber-300">
                            <p className="text-xs text-amber-700 mb-2">未找到匹配项</p>
                            <Button size="sm" variant="outline" className="border-amber-600 text-amber-700">
                              手动匹配
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}