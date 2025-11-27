import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Brain, Activity, Star, Shield, Sparkles, Zap, TrendingUp, Eye, Award, BarChart3, Handshake, Calculator } from 'lucide-react';
import AISmartPredictor from './AISmartPredictor';
import AIRecommendationEngine from './AIRecommendationEngine';
import AIMonitoringCenter from './AIMonitoringCenter';
import AIContractReviewer from './AIContractReviewer';
import AISupplierScoring from './AISupplierScoring';
import AIDemandForecast from './AIDemandForecast';
import AINegotiationAssistant from './AINegotiationAssistant';
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '../utils/permissions';
import PermissionGuard, { InlinePermissionGuard } from './PermissionGuard';

interface AICommandCenterProps {
  role?: string;
}

export default function AICommandCenter({ role = 'director' }: AICommandCenterProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { canUseAIFeature, aiAccessLevel, roleName } = usePermissions(role as UserRole);

  return (
    <PermissionGuard 
      role={role as UserRole}
      requiredPermission={{ module: 'aiCenter' }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 ai-gradient opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 ai-gradient opacity-20 rounded-full blur-3xl" />
          <div className="relative px-8 py-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-16 w-16 rounded-2xl ai-gradient flex items-center justify-center ai-glow-strong elevation-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-light mb-2">AI 智能指挥中心</h1>
                  <p className="text-lg text-muted-foreground">
                    全方位AI驱动决策支持 · 让机器多做一步，让人少做一步
                  </p>
                </div>
              </div>
              
              {/* AI Access Level Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Badge className="ai-gradient text-white border-0">
                  {aiAccessLevel === 'full' && '🌟 完整AI权限'}
                  {aiAccessLevel === 'standard' && '⚡ 标准AI权限'}
                  {aiAccessLevel === 'basic' && '🔰 基础AI权限'}
                  {aiAccessLevel === 'none' && '🔒 无AI权限'}
                </Badge>
                <span className="text-sm text-muted-foreground">当前身份：{roleName}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-8">
                <Card className="elevation-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="h-10 w-10 rounded-lg ai-gradient mx-auto mb-2 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-2xl font-semibold mb-1">98.5%</p>
                    <p className="text-xs text-muted-foreground">AI准确率</p>
                  </CardContent>
                </Card>

                <Card className="elevation-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="h-10 w-10 rounded-lg bg-green-500 mx-auto mb-2 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-2xl font-semibold mb-1">¥280万</p>
                    <p className="text-xs text-muted-foreground">AI节省成本</p>
                  </CardContent>
                </Card>

                <Card className="elevation-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="h-10 w-10 rounded-lg bg-blue-500 mx-auto mb-2 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-2xl font-semibold mb-1">24/7</p>
                    <p className="text-xs text-muted-foreground">实时监控</p>
                  </CardContent>
                </Card>

                <Card className="elevation-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="h-10 w-10 rounded-lg bg-orange-500 mx-auto mb-2 flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-2xl font-semibold mb-1">156</p>
                    <p className="text-xs text-muted-foreground">AI建议</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* AI功能模块 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-9 elevation-1">
            <TabsTrigger value="overview" className="gap-2">
              <Sparkles className="h-4 w-4" />
              总览
            </TabsTrigger>
            
            {canUseAIFeature('smartPredictor') && (
              <TabsTrigger value="prediction" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                智能预测
              </TabsTrigger>
            )}
            
            {canUseAIFeature('recommendationEngine') && (
              <TabsTrigger value="recommendation" className="gap-2">
                <Star className="h-4 w-4" />
                智能推荐
              </TabsTrigger>
            )}
            
            {canUseAIFeature('monitoringCenter') && (
              <TabsTrigger value="monitoring" className="gap-2">
                <Eye className="h-4 w-4" />
                实时监控
              </TabsTrigger>
            )}
            
            {canUseAIFeature('contractReviewer') && (
              <TabsTrigger value="contract" className="gap-2">
                <Shield className="h-4 w-4" />
                合同审查
              </TabsTrigger>
            )}
            
            {/* 新增AI功能 */}
            {canUseAIFeature('aiAnalytics') && (
              <TabsTrigger value="scoring" className="gap-2">
                <Award className="h-4 w-4" />
                供应商评分
              </TabsTrigger>
            )}
            
            {canUseAIFeature('aiAnalytics') && (
              <TabsTrigger value="demand" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                需求预测
              </TabsTrigger>
            )}
            
            {canUseAIFeature('aiOptimization') && (
              <TabsTrigger value="negotiation" className="gap-2">
                <Handshake className="h-4 w-4" />
                谈判助手
              </TabsTrigger>
            )}
            
            {canUseAIFeature('aiAnalytics') && (
              <TabsTrigger value="more" className="gap-2">
                <Calculator className="h-4 w-4" />
                更多工具
              </TabsTrigger>
            )}
          </TabsList>

          {/* 总览 */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="elevation-2 border-0">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg ai-gradient flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle>AI核心能力</CardTitle>
                      <CardDescription>智能采购管理的四大支柱</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 surface-variant rounded-lg hover-lift cursor-pointer" onClick={() => setActiveTab('prediction')}>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">智能预测引擎</h4>
                          <p className="text-sm text-muted-foreground">
                            基于大数据和机器学习，预测价格趋势、需求变化和交付风险
                          </p>
                          <Badge className="mt-2 bg-purple-500/10 text-purple-700 border-purple-200">
                            准确率 92%
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 surface-variant rounded-lg hover-lift cursor-pointer" onClick={() => setActiveTab('recommendation')}>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Star className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">智能推荐系统</h4>
                          <p className="text-sm text-muted-foreground">
                            个性化供应商推荐、策略优化建议和流程改进方案
                          </p>
                          <Badge className="mt-2 bg-blue-500/10 text-blue-700 border-blue-200">
                            156 条活跃建议
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 surface-variant rounded-lg hover-lift cursor-pointer" onClick={() => setActiveTab('monitoring')}>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <Eye className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">实时监控中心</h4>
                          <p className="text-sm text-muted-foreground">
                            24/7智能监控，异常自动检测，风险主动预警
                          </p>
                          <Badge className="mt-2 bg-green-500/10 text-green-700 border-green-200">
                            实时运行中
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 surface-variant rounded-lg hover-lift cursor-pointer" onClick={() => setActiveTab('contract')}>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">合同智能审查</h4>
                          <p className="text-sm text-muted-foreground">
                            基于法律知识图谱，自动识别风险条款和合规问题
                          </p>
                          <Badge className="mt-2 bg-orange-500/10 text-orange-700 border-orange-200">
                            5000+ 案例库
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 新增AI功能展示 */}
              <Card className="elevation-2 border-0">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg ai-gradient flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle>高级AI工具</CardTitle>
                      <CardDescription>更多专业智能功能</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {canUseAIFeature('aiAnalytics') && (
                    <>
                      <div className="p-4 surface-variant rounded-lg hover-lift cursor-pointer" onClick={() => setActiveTab('scoring')}>
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                            <Award className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">AI供应商评分</h4>
                            <p className="text-sm text-muted-foreground">
                              多维度智能评分，快速筛选最佳供应商
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 surface-variant rounded-lg hover-lift cursor-pointer" onClick={() => setActiveTab('demand')}>
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="h-5 w-5 text-cyan-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">AI需求预测</h4>
                            <p className="text-sm text-muted-foreground">
                              预测未来需求趋势，优化库存配置
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {canUseAIFeature('aiOptimization') && (
                    <div className="p-4 surface-variant rounded-lg hover-lift cursor-pointer" onClick={() => setActiveTab('negotiation')}>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                          <Handshake className="h-5 w-5 text-rose-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">AI谈判助手</h4>
                          <p className="text-sm text-muted-foreground">
                            实时策略建议，助您达成最优价格
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="elevation-2 border-0">
                <CardHeader>
                  <CardTitle className="text-base">本月AI成果</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">自动化审批</span>
                      <span className="font-semibold">156单</span>
                    </div>
                    <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">风险预警</span>
                      <span className="font-semibold">23次</span>
                    </div>
                    <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">成本优化</span>
                      <span className="font-semibold">¥280万</span>
                    </div>
                    <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="elevation-2 border-0 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">AI学习进度</CardTitle>
                  <CardDescription>模型持续优化中</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">价格预测模型</span>
                          <span className="text-sm font-medium">v3.2.1</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
                          </div>
                          <span className="text-xs text-muted-foreground">92%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">需求预测模型</span>
                          <span className="text-sm font-medium">v2.8.3</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '87%' }} />
                          </div>
                          <span className="text-xs text-muted-foreground">87%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">风险识别模型</span>
                          <span className="text-sm font-medium">v4.1.0</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '95%' }} />
                          </div>
                          <span className="text-xs text-muted-foreground">95%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 智能预测 */}
          <TabsContent value="prediction" className="mt-6">
            <InlinePermissionGuard 
              role={role as UserRole}
              requiredPermission={{ aiFeature: 'smartPredictor' }}
            >
              <AISmartPredictor />
            </InlinePermissionGuard>
          </TabsContent>

          {/* 智能推荐 */}
          <TabsContent value="recommendation" className="mt-6">
            <InlinePermissionGuard 
              role={role as UserRole}
              requiredPermission={{ aiFeature: 'recommendationEngine' }}
            >
              <AIRecommendationEngine context="dashboard" maxItems={6} />
            </InlinePermissionGuard>
          </TabsContent>

          {/* 实时监控 */}
          <TabsContent value="monitoring" className="mt-6">
            <InlinePermissionGuard 
              role={role as UserRole}
              requiredPermission={{ aiFeature: 'monitoringCenter' }}
            >
              <AIMonitoringCenter />
            </InlinePermissionGuard>
          </TabsContent>

          {/* 合同审查 */}
          <TabsContent value="contract" className="mt-6">
            <InlinePermissionGuard 
              role={role as UserRole}
              requiredPermission={{ aiFeature: 'contractReviewer' }}
            >
              <AIContractReviewer />
            </InlinePermissionGuard>
          </TabsContent>

          {/* 供应商评分 - 新增 */}
          <TabsContent value="scoring" className="mt-6">
            <InlinePermissionGuard 
              role={role as UserRole}
              requiredPermission={{ aiFeature: 'aiAnalytics' }}
            >
              <AISupplierScoring />
            </InlinePermissionGuard>
          </TabsContent>

          {/* 需求预测 - 新增 */}
          <TabsContent value="demand" className="mt-6">
            <InlinePermissionGuard 
              role={role as UserRole}
              requiredPermission={{ aiFeature: 'aiAnalytics' }}
            >
              <AIDemandForecast />
            </InlinePermissionGuard>
          </TabsContent>

          {/* 谈判助手 - 新增 */}
          <TabsContent value="negotiation" className="mt-6">
            <InlinePermissionGuard 
              role={role as UserRole}
              requiredPermission={{ aiFeature: 'aiOptimization' }}
            >
              <AINegotiationAssistant />
            </InlinePermissionGuard>
          </TabsContent>

          {/* 更多工具 */}
          <TabsContent value="more" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="elevation-2 border-0 hover-lift cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="h-12 w-12 rounded-xl ai-gradient mx-auto flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium">成本模拟器</h4>
                  <p className="text-sm text-muted-foreground">
                    模拟不同采购策略的成本影响
                  </p>
                  <Badge className="ai-gradient text-white border-0">即将推出</Badge>
                </CardContent>
              </Card>

              <Card className="elevation-2 border-0 hover-lift cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="h-12 w-12 rounded-xl ai-gradient mx-auto flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium">智能问答</h4>
                  <p className="text-sm text-muted-foreground">
                    询问任何采购相关问题
                  </p>
                  <Badge className="ai-gradient text-white border-0">即将推出</Badge>
                </CardContent>
              </Card>

              <Card className="elevation-2 border-0 hover-lift cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="h-12 w-12 rounded-xl ai-gradient mx-auto flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium">流程挖掘</h4>
                  <p className="text-sm text-muted-foreground">
                    AI自动发现流程优化机会
                  </p>
                  <Badge className="ai-gradient text-white border-0">即将推出</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PermissionGuard>
  );
}