import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User, Bell, Lock, Palette, Database, Zap, Shield, Mail, Smartphone, Globe, Save, RefreshCw, CheckCircle2, XCircle, Key } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '../utils/permissions';
import PermissionGuard from './PermissionGuard';

interface SettingsProps {
  role: string;
}

export default function Settings({ role }: SettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [approvalReminders, setApprovalReminders] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [supplierRiskAlerts, setSupplierRiskAlerts] = useState(true);
  const [autoApprovalEnabled, setAutoApprovalEnabled] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const { 
    permissions, 
    roleName, 
    roleDescription, 
    aiAccessLevel,
    dataVisibility,
    recommendedAIFeatures
  } = usePermissions(role as UserRole);

  const handleSaveSettings = () => {
    toast.success('设置已保存', {
      description: '您的个人设置已成功更新'
    });
  };

  const handleResetPassword = () => {
    toast.success('密码重置链接已发送', {
      description: '请查看您的邮箱以完成密码重置'
    });
  };

  const handleTestNotification = () => {
    toast.info('测试通知', {
      description: '这是一条测试通知消息'
    });
  };

  const userInfo = {
    director: { name: '王总', email: 'wang@company.com', phone: '138****8888', dept: '采购部' },
    specialist: { name: '李明', email: 'liming@company.com', phone: '139****9999', dept: '采购部' },
    applicant: { name: '张悦', email: 'zhangyue@company.com', phone: '137****7777', dept: '市场部' }
  }[role] || userInfo.director;

  return (
    <PermissionGuard 
      role={role as UserRole}
      requiredPermission={{ module: 'settings' }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg">系统设置</h3>
          <p className="text-sm text-gray-600">管理您的账户和系统偏好设置</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              个人信息
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <Key className="h-4 w-4 mr-2" />
              权限管理
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              通知设置
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              安全设置
            </TabsTrigger>
            <TabsTrigger value="automation">
              <Zap className="h-4 w-4 mr-2" />
              自动化规则
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              界面设置
            </TabsTrigger>
          </TabsList>

          {/* NEW: Permissions Tab */}
          <TabsContent value="permissions">
            <div className="space-y-4">
              {/* Role Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>当前角色权限</CardTitle>
                      <CardDescription>查看您的账户权限和访问级别</CardDescription>
                    </div>
                    <Badge className="ai-gradient text-white border-0 text-sm px-3 py-1">
                      {roleName}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                    <p className="text-sm text-muted-foreground mb-2">角色描述</p>
                    <p className="font-medium">{roleDescription}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 surface-variant rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">AI访问级别</p>
                      <div className="flex items-center gap-2">
                        <Badge className="ai-gradient text-white border-0">
                          {aiAccessLevel === 'full' && '完整'}
                          {aiAccessLevel === 'standard' && '标准'}
                          {aiAccessLevel === 'basic' && '基础'}
                          {aiAccessLevel === 'none' && '无'}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 surface-variant rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">数据可见性</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {dataVisibility === 'global' && '全局'}
                          {dataVisibility === 'department' && '部门'}
                          {dataVisibility === 'personal' && '个人'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module Access */}
              <Card>
                <CardHeader>
                  <CardTitle>功能模块访问权限</CardTitle>
                  <CardDescription>您可以访问的系统模块</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(permissions.modules).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 surface-variant rounded-lg">
                        <span className="text-sm">
                          {key === 'dashboard' && '工作台'}
                          {key === 'supplier360' && '供应商360°'}
                          {key === 'p2p' && '采办到支付'}
                          {key === 'contract' && '合同管理'}
                          {key === 'aiCenter' && 'AI指挥中心'}
                          {key === 'settings' && '系统设置'}
                        </span>
                        {value ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Features */}
              <Card>
                <CardHeader>
                  <CardTitle>AI功能权限</CardTitle>
                  <CardDescription>您可以使用的AI智能功能</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(permissions.aiFeatures).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 surface-variant rounded-lg">
                        <span className="text-sm">
                          {key === 'commandCenter' && 'AI指挥中心'}
                          {key === 'smartPredictor' && '智能预测'}
                          {key === 'recommendationEngine' && '智能推荐'}
                          {key === 'monitoringCenter' && '实时监控'}
                          {key === 'contractReviewer' && '合同审查'}
                          {key === 'aiAssistant' && 'AI助手'}
                          {key === 'aiInsights' && 'AI洞察'}
                          {key === 'aiPrediction' && 'AI预测'}
                          {key === 'aiRiskMonitor' && '风险监控'}
                          {key === 'aiAnalytics' && '高级分析'}
                          {key === 'aiReporting' && '智能报告'}
                          {key === 'aiOptimization' && '策略优化'}
                          {key === 'aiAutomation' && '流程自动化'}
                        </span>
                        {value ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Data Access */}
              <Card>
                <CardHeader>
                  <CardTitle>数据访问权限</CardTitle>
                  <CardDescription>您可以查看的数据范围</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(permissions.dataAccess).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 surface-variant rounded-lg">
                        <span className="text-sm">
                          {key === 'viewAllSuppliers' && '所有供应商'}
                          {key === 'viewOwnSuppliers' && '负责供应商'}
                          {key === 'viewAllContracts' && '所有合同'}
                          {key === 'viewOwnContracts' && '相关合同'}
                          {key === 'viewAllOrders' && '所有订单'}
                          {key === 'viewOwnOrders' && '自己订单'}
                          {key === 'viewFinancialData' && '财务数据'}
                          {key === 'viewPerformanceData' && '绩效数据'}
                          {key === 'viewStrategicData' && '战略数据'}
                        </span>
                        {value ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>操作权限</CardTitle>
                  <CardDescription>您可以执行的操作</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(permissions.actions).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 surface-variant rounded-lg">
                        <span className="text-sm">
                          {key === 'createPurchaseRequest' && '创建采购申请'}
                          {key === 'approvePurchase' && '审批采购'}
                          {key === 'executePurchase' && '执行采购'}
                          {key === 'cancelPurchase' && '取消采购'}
                          {key === 'addSupplier' && '添加供应商'}
                          {key === 'editSupplier' && '编辑供应商'}
                          {key === 'evaluateSupplier' && '评估供应商'}
                          {key === 'blockSupplier' && '封禁供应商'}
                          {key === 'createContract' && '创建合同'}
                          {key === 'reviewContract' && '审查合同'}
                          {key === 'signContract' && '签署合同'}
                          {key === 'terminateContract' && '终止合同'}
                          {key === 'configureSystem' && '配置系统'}
                          {key === 'manageUsers' && '管理用户'}
                          {key === 'viewAuditLog' && '查看日志'}
                          {key === 'exportData' && '导出数据'}
                        </span>
                        {value ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>AI功能推荐</CardTitle>
                  <CardDescription>根据您的角色，推荐使用以下AI功能</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recommendedAIFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 surface-variant rounded-lg hover-lift">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>个人信息</CardTitle>
                <CardDescription>管理您的个人资料和联系方式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-blue-500 text-white text-2xl">
                      {userInfo.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      更换头像
                    </Button>
                    <p className="text-xs text-gray-500">支持 JPG、PNG 格式，最大 2MB</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>姓名</Label>
                    <Input defaultValue={userInfo.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>部门</Label>
                    <Input defaultValue={userInfo.dept} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>邮箱</Label>
                    <Input type="email" defaultValue={userInfo.email} />
                  </div>
                  <div className="space-y-2">
                    <Label>手机号</Label>
                    <Input defaultValue={userInfo.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label>工号</Label>
                    <Input defaultValue="EMP-2025-001" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>入职日期</Label>
                    <Input defaultValue="2020-03-15" disabled />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>个人签名</Label>
                  <Input placeholder="用于审批流程的电子签名" />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">取消</Button>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>选择您希望接收的通知类型和方式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p>邮件通知</p>
                        <p className="text-sm text-gray-500">接收重要事项的邮件提醒</p>
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p>短信通知</p>
                        <p className="text-sm text-gray-500">接收紧急事项的短信提醒</p>
                      </div>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-400" />
                      <div>
                        <p>审批提醒</p>
                        <p className="text-sm text-gray-500">待审批事项的及时提醒</p>
                      </div>
                    </div>
                    <Switch
                      checked={approvalReminders}
                      onCheckedChange={setApprovalReminders}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="h-5 w-5 bg-yellow-500" />
                      <div>
                        <p>预算预警</p>
                        <p className="text-sm text-gray-500">预算使用达到阈值时提醒</p>
                      </div>
                    </div>
                    <Switch
                      checked={budgetAlerts}
                      onCheckedChange={setBudgetAlerts}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <div>
                        <p>供应商风险预警</p>
                        <p className="text-sm text-gray-500">供应商风险变化时通知</p>
                      </div>
                    </div>
                    <Switch
                      checked={supplierRiskAlerts}
                      onCheckedChange={setSupplierRiskAlerts}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>通知频率</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">实时通知</SelectItem>
                      <SelectItem value="hourly">每小时汇总</SelectItem>
                      <SelectItem value="daily">每日汇总</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleTestNotification}>
                    测试通知
                  </Button>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    保存设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>安全设置</CardTitle>
                  <CardDescription>管理您的账户安全和访问权限</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>双因素认证</p>
                        <p className="text-sm text-gray-500">增强账户安全性</p>
                      </div>
                      <Switch
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>当前密码</Label>
                      <Input type="password" placeholder="输入当前密码" />
                    </div>

                    <div className="space-y-2">
                      <Label>新密码</Label>
                      <Input type="password" placeholder="输入新密码" />
                    </div>

                    <div className="space-y-2">
                      <Label>确认新密码</Label>
                      <Input type="password" placeholder="再次输入新密码" />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        密码要求：至少8个字符，包含大小写字母、数字和特殊字符
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleResetPassword}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      重置密码
                    </Button>
                    <Button onClick={handleSaveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      更新密码
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>登录历史</CardTitle>
                  <CardDescription>查看最近的登录记录</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { time: '2025-10-24 09:30', location: '北京', device: 'Chrome on Windows', status: 'success' },
                      { time: '2025-10-23 18:45', location: '北京', device: 'Safari on iPhone', status: 'success' },
                      { time: '2025-10-23 08:20', location: '北京', device: 'Chrome on Windows', status: 'success' },
                    ].map((record, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm">{record.device}</p>
                          <p className="text-xs text-gray-500">{record.location} · {record.time}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">成功</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Automation Settings */}
          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <CardTitle>自动化规则</CardTitle>
                <CardDescription>配置智能自动化规则以提高效率</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>自动审批</p>
                      <p className="text-sm text-gray-500">低于阈值的采购申请自动批准</p>
                    </div>
                    <Switch
                      checked={autoApprovalEnabled}
                      onCheckedChange={setAutoApprovalEnabled}
                    />
                  </div>

                  {autoApprovalEnabled && (
                    <div className="ml-6 space-y-3 border-l-2 border-blue-200 pl-4">
                      <div className="space-y-2">
                        <Label>自动审批金额阈值</Label>
                        <Input type="number" defaultValue="5000" />
                        <p className="text-xs text-gray-500">低于此金额的采购申请将自动批准</p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <Label>合同到期提醒</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">到期前7天</SelectItem>
                        <SelectItem value="15">到期前15天</SelectItem>
                        <SelectItem value="30">到期前30天</SelectItem>
                        <SelectItem value="60">到期前60天</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>发票自动匹配规则</Label>
                    <Select defaultValue="strict">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strict">严格匹配（三单完全一致）</SelectItem>
                        <SelectItem value="moderate">适度匹配（允许小额差异）</SelectItem>
                        <SelectItem value="loose">宽松匹配（人工复核）</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>AI智能推荐</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">供应商推荐</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">价格预测</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">采购时机建议</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    保存规则
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>界面设置</CardTitle>
                <CardDescription>个性化您的工作界面</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>深色模式</p>
                      <p className="text-sm text-gray-500">在低光环境下保护眼睛</p>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>语言</Label>
                    <Select defaultValue="zh-CN">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="zh-TW">繁体中文</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>时区</Label>
                    <Select defaultValue="Asia/Shanghai">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">北京时间 (UTC+8)</SelectItem>
                        <SelectItem value="Asia/Hong_Kong">香港时间 (UTC+8)</SelectItem>
                        <SelectItem value="America/New_York">纽约时间 (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">伦敦时间 (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>数据密度</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">紧凑</SelectItem>
                        <SelectItem value="comfortable">舒适</SelectItem>
                        <SelectItem value="spacious">宽松</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>首页显示</Label>
                    <Select defaultValue="dashboard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">工作台</SelectItem>
                        <SelectItem value="supplier">供应商360°</SelectItem>
                        <SelectItem value="p2p">采办到支付</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    保存设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PermissionGuard>
  );
}