import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Filter, MapPin, Star, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Building, FileText, BarChart3, Lightbulb } from 'lucide-react';
import { Progress } from './ui/progress';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SupplierDetailDialog from './SupplierDetailDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

const suppliers = [
  { 
    id: 1, 
    name: '华为技术有限公司', 
    category: 'IT设备', 
    riskScore: 15, 
    performanceScore: 92,
    region: '深圳',
    totalSpend: '¥8,500,000',
    status: 'active',
    certification: ['ISO9001', 'ISO14001']
  },
  { 
    id: 2, 
    name: '阿里云计算', 
    category: 'IT服务', 
    riskScore: 22, 
    performanceScore: 88,
    region: '杭州',
    totalSpend: '¥3,200,000',
    status: 'active',
    certification: ['ISO27001', 'SOC2']
  },
  { 
    id: 3, 
    name: 'ABC物流有限公司', 
    category: '物流运输', 
    riskScore: 78, 
    performanceScore: 65,
    region: '上海',
    totalSpend: '¥1,500,000',
    status: 'warning',
    certification: ['ISO9001']
  },
  { 
    id: 4, 
    name: '优质印刷广告', 
    category: '营销服务', 
    riskScore: 45, 
    performanceScore: 78,
    region: '北京',
    totalSpend: '¥950,000',
    status: 'active',
    certification: ['ISO9001']
  },
];

const performanceData = [
  { month: '10月', onTime: 95, quality: 98, price: 85 },
  { month: '11月', onTime: 96, quality: 97, price: 87 },
  { month: '12月', onTime: 98, quality: 99, price: 88 },
  { month: '1月', onTime: 97, quality: 98, price: 86 },
  { month: '2月', onTime: 99, quality: 99, price: 90 },
  { month: '3月', onTime: 98, quality: 98, price: 89 },
];

const orderHistory = [
  { date: '2025-10-15', orderNo: 'PO-2025-1015', amount: '¥450,000', status: '已完成', onTime: true },
  { date: '2025-09-20', orderNo: 'PO-2025-0920', amount: '¥380,000', status: '已完成', onTime: true },
  { date: '2025-08-10', orderNo: 'PO-2025-0810', amount: '¥520,000', status: '已完成', onTime: false },
  { date: '2025-07-05', orderNo: 'PO-2025-0705', amount: '¥410,000', status: '已完成', onTime: true },
];

interface Supplier360Props {
  role: string;
}

export default function Supplier360({ role }: Supplier360Props) {
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || supplier.category === filterCategory;
    const matchesRisk = filterRisk === 'all' || 
                       (filterRisk === 'low' && supplier.riskScore < 30) ||
                       (filterRisk === 'medium' && supplier.riskScore >= 30 && supplier.riskScore < 60) ||
                       (filterRisk === 'high' && supplier.riskScore >= 60);
    return matchesSearch && matchesCategory && matchesRisk;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Supplier List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>供应商列表</CardTitle>
            <CardDescription>共 {suppliers.length} 家供应商</CardDescription>
          </CardHeader>
          <CardContent>
            {/* AI Search */}
            <div className="mb-4">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="AI智能搜索..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500">
                试试: "华东地区ISO9001认证的IT服务商"
              </p>
            </div>

            {/* Filters */}
            <div className="space-y-2 mb-4">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="品类筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部品类</SelectItem>
                  <SelectItem value="IT设备">IT设备</SelectItem>
                  <SelectItem value="IT服务">IT服务</SelectItem>
                  <SelectItem value="物流运输">物流运输</SelectItem>
                  <SelectItem value="营销服务">营销服务</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="风险等级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部风险等级</SelectItem>
                  <SelectItem value="low">低风险 (&lt;30)</SelectItem>
                  <SelectItem value="medium">中风险 (30-60)</SelectItem>
                  <SelectItem value="high">高风险 (&gt;60)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Supplier Cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  onClick={() => setSelectedSupplier(supplier)}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedSupplier.id === supplier.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'hover:border-gray-400 hover:shadow'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm mb-1">{supplier.name}</p>
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{supplier.region}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{supplier.category}</Badge>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`h-3 w-3 ${
                            idx < Math.floor(supplier.performanceScore / 20) 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">风险评分</span>
                      <span className={`${
                        supplier.riskScore < 30 ? 'text-green-600' :
                        supplier.riskScore < 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {supplier.riskScore}
                      </span>
                    </div>
                    <Progress 
                      value={supplier.riskScore} 
                      className={`h-1.5 ${
                        supplier.riskScore < 30 ? '[&>div]:bg-green-500' :
                        supplier.riskScore < 60 ? '[&>div]:bg-yellow-500' :
                        '[&>div]:bg-red-500'
                      }`}
                    />
                  </div>

                  <p className="text-xs text-gray-600 mt-2">合作金额: {supplier.totalSpend}</p>
                </div>
              ))}
              
              {filteredSuppliers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Building className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>未找到匹配的供应商</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCategory('all');
                      setFilterRisk('all');
                    }}
                  >
                    清除筛选条件
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Detail View */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {selectedSupplier.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  {selectedSupplier.region} · {selectedSupplier.category}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {selectedSupplier.certification.map((cert, idx) => (
                  <Badge key={idx} variant="outline" className="bg-green-50 text-green-700">
                    {cert}
                  </Badge>
                ))}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDetailDialogOpen(true)}
                >
                  查看完整资料
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="risk">风险与合规</TabsTrigger>
                <TabsTrigger value="performance">绩效</TabsTrigger>
                <TabsTrigger value="orders">合同与订单</TabsTrigger>
                <TabsTrigger value="ai">AI洞察</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <p className="text-sm text-blue-700 mb-1">综合健康度</p>
                    <p className="text-3xl text-blue-900">{selectedSupplier.performanceScore}</p>
                    <Progress value={selectedSupplier.performanceScore} className="mt-2 [&>div]:bg-blue-600" />
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                    <p className="text-sm text-green-700 mb-1">合作总额</p>
                    <p className="text-2xl text-green-900">{selectedSupplier.totalSpend}</p>
                    <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      同比增长 15%
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                    <p className="text-sm text-purple-700 mb-1">风险等级</p>
                    <p className="text-2xl text-purple-900">
                      {selectedSupplier.riskScore < 30 ? '低风险' : 
                       selectedSupplier.riskScore < 60 ? '中风险' : '高风险'}
                    </p>
                    <p className="text-xs text-purple-700 mt-1">评分: {selectedSupplier.riskScore}</p>
                  </div>
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm mb-1">合作关系健康度评估</p>
                        <p className="text-xs text-gray-700">
                          该供应商表现优秀，准时交付率达98%，质量合格率99%，价格竞争力良好。
                          建议继续保持合作关系并考虑扩大合作范围。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h4 className="text-sm mb-3">关键指标</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-1">准时交付率</p>
                      <p className="text-xl">98%</p>
                      <Progress value={98} className="mt-2 [&>div]:bg-green-500" />
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-1">质量合格率</p>
                      <p className="text-xl">99%</p>
                      <Progress value={99} className="mt-2 [&>div]:bg-green-500" />
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-1">响应速度</p>
                      <p className="text-xl">2.3小时</p>
                      <p className="text-xs text-green-600">优秀</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-1">价格竞争力</p>
                      <p className="text-xl">89分</p>
                      <p className="text-xs text-green-600">良好</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Risk & Compliance Tab */}
              <TabsContent value="risk" className="space-y-4">
                <div>
                  <h4 className="text-sm mb-3">AI风险评分详细拆解</h4>
                  <div className="space-y-3">
                    {[
                      { dimension: '财务风险', score: 12, status: 'low' },
                      { dimension: '法律诉讼', score: 5, status: 'low' },
                      { dimension: '负面舆情', score: 8, status: 'low' },
                      { dimension: '履约风险', score: 18, status: 'low' },
                      { dimension: 'ESG合规性', score: 22, status: 'medium' },
                    ].map((risk, idx) => (
                      <div key={idx} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">{risk.dimension}</span>
                          <Badge 
                            variant={risk.status === 'low' ? 'default' : 'secondary'}
                            className={risk.status === 'low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {risk.score}分
                          </Badge>
                        </div>
                        <Progress 
                          value={risk.score} 
                          className={`h-2 ${risk.status === 'low' ? '[&>div]:bg-green-500' : '[&>div]:bg-yellow-500'}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm mb-3">合规文件</h4>
                  <div className="space-y-2">
                    {[
                      { name: '营业执照', status: '有效', expiry: '2028-12-31' },
                      { name: 'ISO9001认证', status: '有效', expiry: '2026-06-30' },
                      { name: 'ISO14001认证', status: '即将过期', expiry: '2025-11-15' },
                    ].map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between border rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm">{doc.name}</p>
                            <p className="text-xs text-gray-500">有效期至: {doc.expiry}</p>
                          </div>
                        </div>
                        <Badge variant={doc.status === '有效' ? 'default' : 'secondary'}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-4">
                <div>
                  <h4 className="text-sm mb-3">历史绩效趋势</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="onTime" stroke="#10B981" name="准时交付率" />
                      <Line type="monotone" dataKey="quality" stroke="#3B82F6" name="质量合格率" />
                      <Line type="monotone" dataKey="price" stroke="#8B5CF6" name="价格竞争力" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="text-sm mb-3">绩效评估记录</h4>
                  <div className="space-y-2">
                    {[
                      { period: '2025 Q1', score: 92, trend: 'up', note: '表现优秀，质量稳定' },
                      { period: '2024 Q4', score: 88, trend: 'up', note: '交付及时性提升明显' },
                      { period: '2024 Q3', score: 85, trend: 'down', note: '部分订单延期，已整改' },
                    ].map((evaluation, idx) => (
                      <div key={idx} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">{evaluation.period}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{evaluation.score}</span>
                            {evaluation.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">{evaluation.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <div>
                  <h4 className="text-sm mb-3">历史订单记录</h4>
                  <div className="space-y-2">
                    {orderHistory.map((order, idx) => (
                      <div key={idx} className="border rounded-lg p-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm">{order.orderNo}</p>
                            <p className="text-xs text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{order.amount}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {order.onTime ? (
                                <>
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  <span className="text-xs text-green-600">准时交付</span>
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="h-3 w-3 text-yellow-600" />
                                  <span className="text-xs text-yellow-600">延期交付</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm mb-3">合同管理</h4>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm">年度框架采购协议</p>
                        <p className="text-xs text-gray-500">合同编号: CT-2025-HW-001</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">进行中</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                      <div>
                        <span className="text-gray-600">合同金额:</span>
                        <span className="ml-1">¥10,000,000</span>
                      </div>
                      <div>
                        <span className="text-gray-600">已执行:</span>
                        <span className="ml-1">¥8,500,000 (85%)</span>
                      </div>
                      <div>
                        <span className="text-gray-600">开始日期:</span>
                        <span className="ml-1">2025-01-01</span>
                      </div>
                      <div>
                        <span className="text-gray-600">到期日期:</span>
                        <span className="ml-1">2025-12-31</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="ai" className="space-y-4">
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="mb-2">💡 AI智能建议</p>
                        <p className="text-sm text-gray-700 mb-3">
                          该供应商的原材料成本（芯片）近期下降了15%，根据市场趋势分析，
                          现在是重新谈判价格的最佳时机。预计可为贵司节省约¥1,200,000的年度采购成本。
                        </p>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          查看详细分析报告
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      <div>
                        <p className="mb-2">⚠️ 风险预警</p>
                        <p className="text-sm text-gray-700">
                          监测到该供应商3位核心技术高管在过去2个月内离职，可能存在团队稳定性风险。
                          建议安排实地考察，评估对项目交付的影响。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h4 className="text-sm mb-3">市场洞察</h4>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        <span className="text-sm">价格趋势</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        该供应商同类产品市场均价下降8%，建议在下次采购时争取更优价格
                      </p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">需求预测</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        基于历史数据，预计Q4对该供应商的采购需求将增长25%
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <SupplierDetailDialog 
        supplier={selectedSupplier}
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
      />
    </div>
  );
}
