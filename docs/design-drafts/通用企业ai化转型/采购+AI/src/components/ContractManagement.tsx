import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Search, FileText, Calendar, DollarSign, AlertTriangle, Download, Plus, Edit, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface Contract {
  id: string;
  name: string;
  supplier: string;
  type: string;
  amount: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring' | 'expired' | 'draft';
  daysUntilExpiry: number;
  performance: number;
  autoRenew: boolean;
}

const mockContracts: Contract[] = [
  {
    id: 'CT-2025-001',
    name: '年度IT设备采购框架协议',
    supplier: '华为技术有限公司',
    type: '框架协议',
    amount: '¥8,500,000',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
    daysUntilExpiry: 68,
    performance: 92,
    autoRenew: true
  },
  {
    id: 'CT-2025-002',
    name: '云服务年度合同',
    supplier: '阿里云计算',
    type: '服务合同',
    amount: '¥3,200,000',
    startDate: '2025-02-01',
    endDate: '2026-01-31',
    status: 'active',
    daysUntilExpiry: 99,
    performance: 88,
    autoRenew: false
  },
  {
    id: 'CT-2024-089',
    name: '物流运输服务协议',
    supplier: 'ABC物流有限公司',
    type: '服务合同',
    amount: '¥1,500,000',
    startDate: '2024-06-01',
    endDate: '2025-11-15',
    status: 'expiring',
    daysUntilExpiry: 22,
    performance: 65,
    autoRenew: false
  },
  {
    id: 'CT-2025-003',
    name: '办公用品采购合同',
    supplier: '优质办公用品',
    type: '采购合同',
    amount: '¥450,000',
    startDate: '2025-03-01',
    endDate: '2025-08-31',
    status: 'expired',
    daysUntilExpiry: -54,
    performance: 78,
    autoRenew: false
  },
  {
    id: 'CT-2025-004',
    name: '企业ERP系统升级合同',
    supplier: 'SAP中国',
    type: '项目合同',
    amount: '¥12,000,000',
    startDate: '2025-11-01',
    endDate: '2026-10-31',
    status: 'draft',
    daysUntilExpiry: 372,
    performance: 0,
    autoRenew: false
  },
];

interface ContractManagementProps {
  role: string;
}

export default function ContractManagement({ role }: ContractManagementProps) {
  const [contracts, setContracts] = useState(mockContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [renewDialogOpen, setRenewDialogOpen] = useState(false);

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; label: string }> = {
      active: { className: 'bg-green-100 text-green-800', label: '执行中' },
      expiring: { className: 'bg-yellow-100 text-yellow-800', label: '即将到期' },
      expired: { className: 'bg-red-100 text-red-800', label: '已过期' },
      draft: { className: 'bg-gray-100 text-gray-800', label: '草稿' },
    };
    const variant = variants[status] || variants.draft;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const handleViewDetails = (contract: Contract) => {
    setSelectedContract(contract);
    setDetailDialogOpen(true);
  };

  const handleRenewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setRenewDialogOpen(true);
  };

  const handleDownload = (contract: Contract) => {
    toast.success('合同下载中', {
      description: `正在下载 ${contract.name}...`
    });
    setTimeout(() => {
      toast.success('下载完成', {
        description: `${contract.id}.pdf 已保存至下载文件夹`
      });
    }, 1500);
  };

  const handleRenewSubmit = () => {
    toast.success('续签申请已提交', {
      description: '系统将自动流转至审批流程'
    });
    setRenewDialogOpen(false);
  };

  const expiringCount = contracts.filter(c => c.status === 'expiring').length;
  const activeCount = contracts.filter(c => c.status === 'active').length;
  const totalValue = contracts.reduce((sum, c) => sum + parseFloat(c.amount.replace(/[¥,]/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">合同总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{contracts.length}</div>
            <p className="text-xs text-gray-500 mt-1">执行中 {activeCount} 份</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">合同总金额</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">¥{(totalValue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-gray-500 mt-1">本年度</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">即将到期</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-yellow-600">{expiringCount}</div>
            <p className="text-xs text-gray-500 mt-1">30天内到期</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">平均履约率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-600">85%</div>
            <p className="text-xs text-gray-500 mt-1">整体表现良好</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>合同列表</CardTitle>
              <CardDescription>管理所有采购合同和协议</CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              新建合同
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setFilterStatus('all')}>
                  全部 ({contracts.length})
                </TabsTrigger>
                <TabsTrigger value="active" onClick={() => setFilterStatus('active')}>
                  执行中 ({activeCount})
                </TabsTrigger>
                <TabsTrigger value="expiring" onClick={() => setFilterStatus('expiring')}>
                  即将到期 ({expiringCount})
                </TabsTrigger>
                <TabsTrigger value="expired" onClick={() => setFilterStatus('expired')}>
                  已过期
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索合同名称、供应商或编号..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <TabsContent value={filterStatus} className="mt-4">
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>合同编号</TableHead>
                      <TableHead>合同名称</TableHead>
                      <TableHead>供应商</TableHead>
                      <TableHead>合同类型</TableHead>
                      <TableHead>合同金额</TableHead>
                      <TableHead>有效期</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>履约率</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-mono text-sm">{contract.id}</TableCell>
                        <TableCell>
                          <div>
                            <p>{contract.name}</p>
                            {contract.autoRenew && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                自动续签
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{contract.supplier}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{contract.type}</Badge>
                        </TableCell>
                        <TableCell>{contract.amount}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{contract.startDate}</p>
                            <p className="text-gray-500">至 {contract.endDate}</p>
                            {contract.status === 'expiring' && (
                              <p className="text-yellow-600 text-xs mt-1 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {contract.daysUntilExpiry}天后到期
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(contract.status)}</TableCell>
                        <TableCell>
                          {contract.status !== 'draft' ? (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{contract.performance}%</span>
                              </div>
                              <Progress value={contract.performance} className="h-1.5" />
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(contract)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(contract)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            {contract.status === 'expiring' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRenewContract(contract)}
                              >
                                续签
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredContracts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>未找到匹配的合同</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Contract Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {selectedContract?.name}
            </DialogTitle>
            <DialogDescription>
              合同编号: {selectedContract?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedContract && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm mb-3">基本信息</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">供应商:</span>
                      <span>{selectedContract.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">合同类型:</span>
                      <Badge variant="outline">{selectedContract.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">合同金额:</span>
                      <span>{selectedContract.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">状态:</span>
                      {getStatusBadge(selectedContract.status)}
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-sm mb-3">时间信息</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">起始日期:</span>
                      <span>{selectedContract.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">结束日期:</span>
                      <span>{selectedContract.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">自动续签:</span>
                      <span>{selectedContract.autoRenew ? '是' : '否'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="text-sm mb-3">履约情况</h4>
                <div className="space-y-3">
                  {[
                    { metric: '交付及时性', score: 95 },
                    { metric: '质量合格率', score: 98 },
                    { metric: '服务响应', score: 90 },
                    { metric: '价格竞争力', score: 85 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{item.metric}</span>
                        <span className="text-sm">{item.score}%</span>
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm mb-2">💡 AI合同分析</p>
                <p className="text-sm text-gray-700">
                  该合同整体履约情况良好，供应商表现稳定。建议在合同到期前30天启动续签谈判，
                  可尝试争取2-5%的价格优惠。
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              关闭
            </Button>
            <Button onClick={() => handleDownload(selectedContract!)}>
              <Download className="h-4 w-4 mr-2" />
              下载合同
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Renew Contract Dialog */}
      <Dialog open={renewDialogOpen} onOpenChange={setRenewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>合同续签申请</DialogTitle>
            <DialogDescription>
              为 {selectedContract?.name} 创建续签申请
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>续签期限</Label>
              <Select defaultValue="1year">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6个月</SelectItem>
                  <SelectItem value="1year">1年</SelectItem>
                  <SelectItem value="2years">2年</SelectItem>
                  <SelectItem value="3years">3年</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>续签金额</Label>
              <Input
                type="text"
                defaultValue={selectedContract?.amount}
                className="mt-2"
              />
            </div>

            <div>
              <Label>续签说明</Label>
              <Textarea
                placeholder="请说明续签原因和重要条款变更..."
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm mb-2">💡 AI续签建议</p>
              <p className="text-sm text-gray-700">
                基于历史履约数据，建议续签期限为1年，可尝试争取3%价格优惠。
                该供应商近期市场竞争力保持稳定。
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRenewDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleRenewSubmit} className="bg-blue-600 hover:bg-blue-700">
              提交续签申请
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
