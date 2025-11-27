import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Building, MapPin, Phone, Mail, Globe, Calendar, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SupplierDetailDialogProps {
  supplier: any;
  open: boolean;
  onClose: () => void;
}

const contactHistory = [
  { date: '2025-10-20', type: '电话沟通', contact: '李经理', topic: '价格谈判', result: '达成初步协议' },
  { date: '2025-10-15', type: '现场考察', contact: '张总', topic: '生产能力评估', result: '通过评估' },
  { date: '2025-10-10', type: '邮件往来', contact: '王工程师', topic: '技术规格确认', result: '已确认' },
];

const priceHistory = [
  { month: '4月', price: 125 },
  { month: '5月', price: 122 },
  { month: '6月', price: 118 },
  { month: '7月', price: 120 },
  { month: '8月', price: 115 },
  { month: '9月', price: 112 },
  { month: '10月', price: 110 },
];

export default function SupplierDetailDialog({ supplier, open, onClose }: SupplierDetailDialogProps) {
  if (!supplier) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Building className="h-6 w-6 text-blue-600" />
            {supplier.name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {supplier.region}
            </span>
            <span>•</span>
            <span>{supplier.category}</span>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="contact" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact">联系信息</TabsTrigger>
            <TabsTrigger value="financial">财务数据</TabsTrigger>
            <TabsTrigger value="history">合作历史</TabsTrigger>
            <TabsTrigger value="documents">文档资料</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="text-sm mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-600" />
                  企业基本信息
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">统一社会信用代码:</span>
                    <span>91440300***********</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">成立日期:</span>
                    <span>2015-03-15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">注册资本:</span>
                    <span>¥50,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">员工规模:</span>
                    <span>500-1000人</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="text-sm mb-3 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  联系方式
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span>400-888-9999</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span>contact@supplier.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-gray-400" />
                    <span>www.supplier.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span>深圳市南山区科技园</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm mb-3">主要联系人</h4>
              <div className="space-y-3">
                {[
                  { name: '张伟', role: '销售总监', phone: '138****8888', email: 'zhangwei@supplier.com' },
                  { name: '李明', role: '技术经理', phone: '139****9999', email: 'liming@supplier.com' },
                ].map((contact, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="text-sm">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.role}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <p>{contact.phone}</p>
                      <p>{contact.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm mb-3">沟通记录</h4>
              <div className="space-y-2">
                {contactHistory.map((record, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm border-b pb-2 last:border-0">
                    <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span>{record.date}</span>
                        <Badge variant="outline" className="text-xs">{record.type}</Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        联系人: {record.contact} · 主题: {record.topic}
                      </p>
                      <p className="text-xs text-green-600 mt-1">结果: {record.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-1">年度营收</p>
                <p className="text-2xl text-blue-900">¥3.2亿</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  同比增长 28%
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-700 mb-1">资产负债率</p>
                <p className="text-2xl text-green-900">45%</p>
                <p className="text-xs text-green-600 mt-1">财务健康</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-700 mb-1">信用评级</p>
                <p className="text-2xl text-purple-900">AAA</p>
                <p className="text-xs text-purple-600 mt-1">优秀</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm mb-3">历史价格趋势</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `¥${value}`} />
                  <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-3 bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm text-green-900">
                  💡 AI分析：该供应商价格呈下降趋势，降幅12%，建议把握当前价格优势
                </p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm mb-3">付款条件</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">标准付款周期:</span>
                  <span>净30天</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">早付折扣:</span>
                  <span className="text-green-600">10天内付款可享2%折扣</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">最低订单金额:</span>
                  <span>¥10,000</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="text-sm text-gray-600 mb-2">合作年限</h4>
                <p className="text-3xl">3.5年</p>
                <p className="text-xs text-gray-500 mt-1">自2022年4月起</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="text-sm text-gray-600 mb-2">累计订单</h4>
                <p className="text-3xl">156单</p>
                <p className="text-xs text-gray-500 mt-1">总金额 ¥8,500,000</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm mb-3">绩效趋势</h4>
              <div className="space-y-3">
                {[
                  { metric: '准时交付率', current: 98, target: 95, trend: 'up' },
                  { metric: '质量合格率', current: 99, target: 98, trend: 'up' },
                  { metric: '响应速度', current: 92, target: 90, trend: 'stable' },
                  { metric: '服务满意度', current: 88, target: 85, trend: 'up' },
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{metric.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{metric.current}%</span>
                        <Badge 
                          variant="outline"
                          className={
                            metric.current >= metric.target 
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }
                        >
                          目标: {metric.target}%
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={metric.current} 
                      className={`h-2 ${metric.current >= metric.target ? '[&>div]:bg-green-500' : '[&>div]:bg-yellow-500'}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm mb-3">质量问题记录</h4>
              <div className="space-y-2">
                {[
                  { date: '2025-08-15', issue: '部分产品包装破损', status: '已解决', severity: 'low' },
                  { date: '2025-06-20', issue: '交付延期2天', status: '已解决', severity: 'medium' },
                ].map((issue, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm border-b pb-2 last:border-0">
                    <div className="flex-1">
                      <p>{issue.issue}</p>
                      <p className="text-xs text-gray-500">{issue.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline"
                        className={
                          issue.severity === 'low' 
                            ? 'bg-green-50 text-green-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }
                      >
                        {issue.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: '营业执照', type: 'PDF', size: '2.3 MB', date: '2025-01-15', status: '有效' },
                { name: 'ISO9001认证', type: 'PDF', size: '1.8 MB', date: '2024-06-30', status: '有效' },
                { name: 'ISO14001认证', type: 'PDF', size: '1.5 MB', date: '2024-06-30', status: '即将过期' },
                { name: '质量检测报告', type: 'PDF', size: '3.2 MB', date: '2025-09-20', status: '有效' },
                { name: '年度框架协议', type: 'PDF', size: '4.1 MB', date: '2025-01-01', status: '进行中' },
                { name: '保密协议', type: 'PDF', size: '0.8 MB', date: '2024-12-15', status: '有效' },
              ].map((doc, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm mb-1 truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.type} · {doc.size} · {doc.date}
                      </p>
                      <Badge 
                        variant="outline" 
                        className={`mt-2 text-xs ${
                          doc.status === '有效' || doc.status === '进行中'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    下载
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
          <Button>
            编辑供应商信息
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
