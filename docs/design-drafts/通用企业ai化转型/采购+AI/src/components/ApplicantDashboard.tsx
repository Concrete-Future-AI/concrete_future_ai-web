import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Laptop, Package, Zap, Briefcase, Star, Clock, CheckCircle, AlertCircle, Truck, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const quickTemplates = [
  { icon: Laptop, name: '笔记本电脑', category: 'IT设备', popular: true },
  { icon: Package, name: '办公用品', category: '办公', popular: true },
  { icon: Zap, name: '软件服务', category: 'IT服务', popular: true },
  { icon: Briefcase, name: '市场活动', category: '营销', popular: false },
];

const myApplications = [
  { 
    id: 1, 
    item: 'MacBook Pro 14寸',
    category: 'IT设备',
    amount: '¥15,999',
    submitDate: '2025-10-20',
    status: 'approved',
    currentStage: '已下单',
    stages: ['部门经理审批', 'IT部审核', '采购部处理', '已下单', '已到货'],
    currentStageIndex: 3
  },
  { 
    id: 2, 
    item: 'Adobe Creative Cloud 年度订阅',
    category: '软件服务',
    amount: '¥4,500',
    submitDate: '2025-10-22',
    status: 'processing',
    currentStage: '采购部处理中',
    stages: ['部门经理审批', '采购部处理', '已下单', '已完成'],
    currentStageIndex: 1
  },
  { 
    id: 3, 
    item: '市场推广物料印刷',
    category: '营销服务',
    amount: '¥8,200',
    submitDate: '2025-10-23',
    status: 'pending',
    currentStage: '部门经理审批中',
    stages: ['部门经理审批', '采购部处理', '已完成'],
    currentStageIndex: 0
  },
  { 
    id: 4, 
    item: 'Office 365 企业版',
    category: '软件服务',
    amount: '¥2,100',
    submitDate: '2025-10-15',
    status: 'completed',
    currentStage: '已完成',
    stages: ['部门经理审批', 'IT部审核', '采购部处理', '已完成'],
    currentStageIndex: 3
  },
];

const favoriteItems = [
  { name: 'MacBook Pro', lastOrder: '2个月前', avgPrice: '¥15,999' },
  { name: 'Adobe Creative Cloud', lastOrder: '1个月前', avgPrice: '¥4,500' },
  { name: '商务笔记本', lastOrder: '3周前', avgPrice: '¥850' },
];

export default function ApplicantDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuickStart = (templateName: string) => {
    toast.success('正在创建申请', {
      description: `为 "${templateName}" 创建快速采购申请`
    });
  };

  const handleReorder = (itemName: string) => {
    toast.success('快速复购', {
      description: `已根据历史订单为 "${itemName}" 创建采购申请`
    });
  };

  const handleTrackOrder = (application: any) => {
    toast.info('订单追踪', {
      description: `申请编号: ${application.id} · 当前状态: ${application.currentStage}`
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Quick Access */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-2">您需要什么？</h2>
            <p className="text-gray-600">像在电商平台购物一样简单</p>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="搜索物品或服务，如：笔记本电脑、软件订阅、办公用品..."
              className="pl-10 h-12 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchTerm) {
                  toast.success('搜索中', { description: `正在查找 "${searchTerm}"` });
                }
              }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickTemplates.map((template, idx) => {
              const Icon = template.icon;
              return (
                <Button 
                  key={idx}
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 relative hover:border-blue-500 hover:bg-blue-50"
                  onClick={() => handleQuickStart(template.name)}
                >
                  {template.popular && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-xs px-1">热门</Badge>
                  )}
                  <Icon className="h-8 w-8 text-blue-600" />
                  <div className="text-center">
                    <p className="text-sm">{template.name}</p>
                    <p className="text-xs text-gray-500">{template.category}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* My Applications */}
      <Card>
        <CardHeader>
          <CardTitle>我的申请</CardTitle>
          <CardDescription>类似电商的订单追踪体验</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myApplications.map((app) => (
              <div key={app.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p>{app.item}</p>
                      <Badge variant="outline" className="text-xs">{app.category}</Badge>
                      {app.status === 'completed' && (
                        <Badge className="bg-green-100 text-green-800 text-xs">已完成</Badge>
                      )}
                      {app.status === 'approved' && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">进行中</Badge>
                      )}
                      {app.status === 'processing' && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">处理中</Badge>
                      )}
                      {app.status === 'pending' && (
                        <Badge className="bg-gray-100 text-gray-800 text-xs">待审批</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">申请金额: {app.amount} · 提交日期: {app.submitDate}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTrackOrder(app)}
                  >
                    追踪订单
                  </Button>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {app.stages.map((stage, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          idx < app.currentStageIndex ? 'bg-green-500 text-white' :
                          idx === app.currentStageIndex ? 'bg-blue-500 text-white animate-pulse' :
                          'bg-gray-200 text-gray-400'
                        }`}>
                          {idx < app.currentStageIndex ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : idx === app.currentStageIndex ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                          )}
                        </div>
                        <p className={`text-xs text-center ${
                          idx <= app.currentStageIndex ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {stage}
                        </p>
                        {idx < app.stages.length - 1 && (
                          <div className={`absolute top-4 left-1/2 w-full h-0.5 ${
                            idx < app.currentStageIndex ? 'bg-green-500' : 'bg-gray-200'
                          }`} style={{ transform: 'translateY(-50%)' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {app.status === 'approved' && app.currentStageIndex === 3 && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <p className="text-sm text-blue-900">您的物品已下单，预计3-5个工作日送达</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favorite Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            我的常用物品
          </CardTitle>
          <CardDescription>根据您的历史申请智能生成</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {favoriteItems.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">上次申请: {item.lastOrder}</p>
                  </div>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-sm text-gray-600 mb-3">参考价格: {item.avgPrice}</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleReorder(item.name)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  快速复购
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-purple-500 rounded-full p-2 text-white">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-2">💡 小贴士</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 申请金额小于¥5,000的物品通常当天即可审批完成</li>
                <li>• 选择"协议供应商"的物品可以更快到货</li>
                <li>• 您可以在"常用物品"中一键重复申请，节省填写时间</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
