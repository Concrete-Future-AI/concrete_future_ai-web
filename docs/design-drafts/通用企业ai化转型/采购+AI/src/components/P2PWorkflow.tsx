import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle, AlertCircle, Clock, FileText, ShoppingCart, DollarSign, Users, ArrowRight, Search, Filter } from 'lucide-react';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';

const purchaseRequests = [
  { 
    id: 'PR-2025-1023', 
    requester: '张悦 (市场部)', 
    item: 'Adobe Creative Cloud',
    category: '软件服务',
    amount: '¥45,000',
    status: 'pending_approval',
    submitDate: '2025-10-23',
    approvalFlow: ['直属经理', 'IT部门', '采购部'],
    currentStep: 0
  },
  { 
    id: 'PR-2025-1022', 
    requester: '李雷 (IT部)', 
    item: '服务器采购',
    category: 'IT设备',
    amount: '¥320,000',
    status: 'approved',
    submitDate: '2025-10-22',
    approvalFlow: ['直属经理', '采购部'],
    currentStep: 2
  },
  { 
    id: 'PR-2025-1021', 
    requester: '王芳 (行政部)', 
    item: '办公用品批量采购',
    category: '办公用品',
    amount: '¥8,500',
    status: 'auto_approved',
    submitDate: '2025-10-21',
    approvalFlow: ['自动审批'],
    currentStep: 1
  },
];

const purchaseOrders = [
  { 
    id: 'PO-2025-1020', 
    supplier: '华为技术有限公司',
    item: '笔记本电脑 x 10',
    amount: '¥150,000',
    status: 'sent',
    createDate: '2025-10-20',
    deliveryDate: '2025-10-30'
  },
  { 
    id: 'PO-2025-1018', 
    supplier: '阿里云计算',
    item: '云服务年度订阅',
    amount: '¥280,000',
    status: 'received',
    createDate: '2025-10-18',
    deliveryDate: '2025-10-25'
  },
];

const invoices = [
  { 
    id: 'INV-2025-1023', 
    supplier: '华为技术有限公司',
    poNumber: 'PO-2025-1020',
    invoiceAmount: '¥150,000',
    poAmount: '¥150,000',
    receiptAmount: '¥150,000',
    status: 'matched',
    matchAccuracy: 100,
    uploadDate: '2025-10-23'
  },
  { 
    id: 'INV-2025-1022', 
    supplier: 'ABC物流',
    poNumber: 'PO-2025-1015',
    invoiceAmount: '¥10,500',
    poAmount: '¥10,000',
    receiptAmount: '¥10,000',
    status: 'discrepancy',
    matchAccuracy: 95,
    uploadDate: '2025-10-22',
    issue: '发票金额超出订单金额¥500'
  },
  { 
    id: 'INV-2025-1020', 
    supplier: '优质印刷',
    poNumber: 'PO-2025-1012',
    invoiceAmount: '¥8,200',
    poAmount: '¥8,200',
    receiptAmount: '¥8,200',
    status: 'approved',
    matchAccuracy: 100,
    uploadDate: '2025-10-20'
  },
];

interface P2PWorkflowProps {
  role: string;
}

export default function P2PWorkflow({ role }: P2PWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    item: '',
    category: '',
    quantity: '',
    budget: '',
    description: '',
    urgency: 'normal'
  });

  const wizardSteps = ['选择物品', '填写详情', '确认提交'];

  return (
    <div className="space-y-6">
      {role === 'applicant' && (
        <>
          {/* New Request Wizard */}
          <Card className="border-2 border-blue-500">
            <CardHeader>
              <CardTitle>发起新采购申请</CardTitle>
              <CardDescription>引导式向导，简单3步完成</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Progress Steps */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  {wizardSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        idx <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {idx < currentStep ? <CheckCircle className="h-5 w-5" /> : idx + 1}
                      </div>
                      <div className="flex-1 mx-2">
                        <p className={`text-sm ${idx <= currentStep ? 'text-blue-900' : 'text-gray-500'}`}>
                          {step}
                        </p>
                      </div>
                      {idx < wizardSteps.length - 1 && (
                        <ArrowRight className={`h-4 w-4 ${idx < currentStep ? 'text-blue-500' : 'text-gray-300'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <Progress value={(currentStep / (wizardSteps.length - 1)) * 100} className="h-2" />
              </div>

              {/* Step Content */}
              <div className="min-h-[300px]">
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input 
                        placeholder="搜索您需要的物品或服务..."
                        className="pl-10 h-12"
                        value={formData.item}
                        onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['笔记本电脑', 'Adobe软件', '办公椅', '打印机', '市场物料', 'IT服务'].map((item) => (
                        <Button 
                          key={item}
                          variant="outline" 
                          className="h-20 hover:border-blue-500 hover:bg-blue-50"
                          onClick={() => setFormData({ ...formData, item })}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertDescription className="text-blue-900">
                        💡 提示：选择"协议供应商"的物品可以享受更快的审批流程
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label>物品名称</Label>
                      <Input value={formData.item} onChange={(e) => setFormData({ ...formData, item: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>品类</Label>
                        <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                          <SelectTrigger>
                            <SelectValue placeholder="选择品类" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="it">IT设备</SelectItem>
                            <SelectItem value="software">软件服务</SelectItem>
                            <SelectItem value="office">办公用品</SelectItem>
                            <SelectItem value="marketing">营销服务</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>数量</Label>
                        <Input 
                          type="number" 
                          placeholder="1"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>预算金额</Label>
                      <Input 
                        type="number" 
                        placeholder="¥"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>需求说明</Label>
                      <Textarea 
                        placeholder="请详细描述您的需求..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>紧急程度</Label>
                      <Select value={formData.urgency} onValueChange={(v) => setFormData({ ...formData, urgency: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">正常</SelectItem>
                          <SelectItem value="urgent">紧急</SelectItem>
                          <SelectItem value="very_urgent">非常紧急</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <h4 className="text-sm">申请摘要</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">物品:</span>
                          <span className="ml-2">{formData.item || '未填写'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">品类:</span>
                          <span className="ml-2">{formData.category || '未选择'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">数量:</span>
                          <span className="ml-2">{formData.quantity || '未填写'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">预算:</span>
                          <span className="ml-2">¥{formData.budget || '0'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm mb-3">审批流程预览</h4>
                      <div className="flex items-center justify-between">
                        {['您的直属经理', 'IT部门', '采购部'].map((step, idx) => (
                          <div key={idx} className="flex flex-col items-center flex-1">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                              <Users className="h-5 w-5" />
                            </div>
                            <p className="text-xs text-center">{step}</p>
                            {idx < 2 && (
                              <ArrowRight className="h-4 w-4 text-gray-300 absolute" style={{ left: `${(idx + 1) * 33}%` }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-900">
                        预计审批时间: 1-2个工作日（金额小于¥5,000可能当天完成）
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  上一步
                </Button>
                {currentStep < wizardSteps.length - 1 ? (
                  <Button onClick={() => setCurrentStep(Math.min(wizardSteps.length - 1, currentStep + 1))}>
                    下一步
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700">
                    提交申请
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Purchase Requests Management */}
      {(role === 'specialist' || role === 'director') && (
        <Card>
          <CardHeader>
            <CardTitle>采购申请管理</CardTitle>
            <CardDescription>待处理和进行中的采购申请</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {purchaseRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm">{request.id}</p>
                        <Badge 
                          variant={request.status === 'approved' ? 'default' : 'secondary'}
                          className={
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'auto_approved' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {request.status === 'approved' ? '已审批' :
                           request.status === 'auto_approved' ? '自动审批' : '待审批'}
                        </Badge>
                        <Badge variant="outline">{request.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{request.requester} · {request.item}</p>
                      <p className="text-sm">金额: {request.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-2">{request.submitDate}</p>
                      <Button size="sm">
                        {request.status === 'approved' ? '生成PO' : '审批'}
                      </Button>
                    </div>
                  </div>

                  {/* Approval Flow */}
                  <div className="flex items-center gap-2 mt-3">
                    {request.approvalFlow.map((step, idx) => (
                      <div key={idx} className="flex items-center flex-1">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          idx < request.currentStep ? 'bg-green-100 text-green-800' :
                          idx === request.currentStep ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {idx < request.currentStep ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : idx === request.currentStep ? (
                            <Clock className="h-3 w-3" />
                          ) : null}
                          <span>{step}</span>
                        </div>
                        {idx < request.approvalFlow.length - 1 && (
                          <ArrowRight className="h-3 w-3 text-gray-400 mx-1" />
                        )}
                      </div>
                    ))}
                  </div>

                  {request.status === 'approved' && (
                    <Alert className="mt-3 bg-blue-50 border-blue-200">
                      <AlertDescription className="text-blue-900 text-sm">
                        ✅ 申请已通过全部审批，可以自动生成采购订单并发送给供应商
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchase Orders */}
      {(role === 'specialist' || role === 'director') && (
        <Card>
          <CardHeader>
            <CardTitle>采购订单 (PO) 管理</CardTitle>
            <CardDescription>自动生成和追踪采购订单</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {purchaseOrders.map((po) => (
                <div key={po.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingCart className="h-4 w-4 text-blue-600" />
                        <p className="text-sm">{po.id}</p>
                        <Badge variant={po.status === 'sent' ? 'secondary' : 'default'}>
                          {po.status === 'sent' ? '已发送' : '已收货'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">供应商: {po.supplier}</p>
                      <p className="text-sm">{po.item}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm mb-1">{po.amount}</p>
                      <p className="text-xs text-gray-500">创建: {po.createDate}</p>
                      <p className="text-xs text-gray-500">交付: {po.deliveryDate}</p>
                    </div>
                  </div>

                  {po.status === 'sent' && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <FileText className="h-3 w-3 mr-1" />
                        查看PO
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        追踪物流
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice Matching */}
      {(role === 'specialist' || role === 'director') && (
        <Card>
          <CardHeader>
            <CardTitle>AI智能三单匹配</CardTitle>
            <CardDescription>自动比对采购订单、入库单和发票</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <p className="text-sm">{invoice.id}</p>
                        <Badge 
                          variant={invoice.status === 'matched' || invoice.status === 'approved' ? 'default' : 'secondary'}
                          className={
                            invoice.status === 'matched' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {invoice.status === 'matched' ? '完全匹配' :
                           invoice.status === 'approved' ? '已批准付款' : '存在差异'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">供应商: {invoice.supplier}</p>
                      <p className="text-sm text-gray-600">关联PO: {invoice.poNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-2">上传: {invoice.uploadDate}</p>
                      <div className="text-sm mb-1">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-gray-600">匹配度:</span>
                          <span className={invoice.matchAccuracy === 100 ? 'text-green-600' : 'text-yellow-600'}>
                            {invoice.matchAccuracy}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-gray-600 mb-1">发票金额</p>
                        <p>{invoice.invoiceAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">订单金额</p>
                        <p>{invoice.poAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">入库金额</p>
                        <p>{invoice.receiptAmount}</p>
                      </div>
                    </div>
                  </div>

                  {invoice.status === 'matched' && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-900 text-sm">
                        AI自动匹配成功，发票已流转至财务部门等待付款
                      </AlertDescription>
                    </Alert>
                  )}

                  {invoice.status === 'discrepancy' && (
                    <Alert className="bg-red-50 border-red-200">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-900 text-sm">
                        <p className="mb-2">{invoice.issue}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            查看详情
                          </Button>
                          <Button size="sm" className="h-7 text-xs bg-red-600 hover:bg-red-700">
                            处理差异
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {invoice.status === 'approved' && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-900 text-sm">
                        已批准付款，预计3个工作日内完成转账
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights for P2P */}
      {role === 'specialist' && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 rounded-full p-2 text-white">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="mb-2">💡 AI流程优化建议</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 本月已自动处理85%的采购申请，节省审批时间约120小时</li>
                  <li>• 发票匹配准确率达98.5%，仅2笔需要人工干预</li>
                  <li>• 建议：将¥5,000以下的办公用品申请全部设为自动审批，可进一步提升效率</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
