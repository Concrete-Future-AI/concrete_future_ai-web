import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FileText, AlertTriangle, CheckCircle, Info, Shield, Sparkles, Download, Eye } from 'lucide-react';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface ContractIssue {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'legal' | 'commercial' | 'compliance' | 'financial';
  clause: string;
  issue: string;
  suggestion: string;
  impact: string;
  reference?: string;
}

interface AIContractReviewerProps {
  contractName?: string;
}

export default function AIContractReviewer({ contractName = "IT设备采购合同_2024" }: AIContractReviewerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const issues: ContractIssue[] = [
    {
      id: '1',
      severity: 'critical',
      type: 'legal',
      clause: '第7.2条 违约责任',
      issue: '单方面违约条款不平等',
      suggestion: '建议修改为双方对等的违约责任条款，增加乙方违约的具体赔偿标准',
      impact: '当前条款可能导致甲方在违约时承担过重责任，而乙方违约责任不明确',
      reference: '《合同法》第114条'
    },
    {
      id: '2',
      severity: 'high',
      type: 'commercial',
      clause: '第5.1条 付款条款',
      issue: '预付款比例过高',
      suggestion: '建议将预付款从60%降低至30%，增加验收付款环节',
      impact: '高额预付款增加财务风险，建议采用分阶段付款方式',
      reference: '行业最佳实践'
    },
    {
      id: '3',
      severity: 'medium',
      type: 'compliance',
      clause: '第3.4条 数据保护',
      issue: '缺少GDPR/个人信息保护法合规条款',
      suggestion: '增加数据保护、隐私政策和合规性声明条款',
      impact: '可能面临数据保护法规的合规风险',
      reference: '《个人信息保护法》'
    },
    {
      id: '4',
      severity: 'medium',
      type: 'financial',
      clause: '第6.3条 价格调整',
      issue: '缺少通货膨胀调整机制',
      suggestion: '建议添加基于CPI指数的价格调整条款，保护长期合同价值',
      impact: '长期合同可能因通货膨胀导致实际成本增加',
      reference: '金融行业惯例'
    },
    {
      id: '5',
      severity: 'low',
      type: 'legal',
      clause: '第9.1条 争议解决',
      issue: '仲裁地点未明确',
      suggestion: '明确仲裁机构和仲裁地点，建议选择中国国际经济贸易仲裁委员会',
      impact: '争议发生时可能产生管辖权分歧',
      reference: '《仲裁法》'
    }
  ];

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          toast.success('合同审查完成', {
            description: `发现 ${issues.length} 个问题需要注意`
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-500/10 text-green-700 border-green-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'legal':
        return <Shield className="h-4 w-4" />;
      case 'commercial':
        return <FileText className="h-4 w-4" />;
      case 'compliance':
        return <CheckCircle className="h-4 w-4" />;
      case 'financial':
        return <Info className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const stats = {
    total: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length,
    high: issues.filter(i => i.severity === 'high').length,
    medium: issues.filter(i => i.severity === 'medium').length,
    low: issues.filter(i => i.severity === 'low').length,
  };

  const riskScore = 100 - (stats.critical * 20 + stats.high * 10 + stats.medium * 5 + stats.low * 2);

  return (
    <div className="space-y-4">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl ai-gradient flex items-center justify-center ai-glow">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">AI合同智能审查</h3>
            <p className="text-sm text-muted-foreground">基于法律知识图谱的深度分析</p>
          </div>
        </div>
        <Badge className="ai-gradient text-white border-0">
          <Sparkles className="h-3 w-3 mr-1" />
          AI法务
        </Badge>
      </div>

      {/* 合同信息卡片 */}
      <Card className="elevation-2 border-0">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">{contractName}</h4>
                <p className="text-sm text-muted-foreground">上传时间: 2024-11-06 14:30</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">PDF格式</Badge>
                  <Badge variant="outline">15页</Badge>
                  <Badge variant="outline">中文</Badge>
                </div>
              </div>
            </div>
            
            {!analysisComplete && (
              <Button 
                className="ai-gradient text-white border-0"
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isAnalyzing ? '分析中...' : '开始AI审查'}
              </Button>
            )}
          </div>

          {isAnalyzing && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">AI正在审查合同条款...</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  识别条款
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  法律分析
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  风险评估
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisComplete && (
        <>
          {/* 审查结果总览 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 风险评分 */}
            <Card className="elevation-2 border-0">
              <CardHeader>
                <CardTitle className="text-base">合同风险评分</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-5xl font-bold mb-2"
                      style={{ 
                        color: riskScore >= 80 ? '#00897B' : riskScore >= 60 ? '#F57C00' : '#C62828'
                      }}
                    >
                      {riskScore}
                    </motion.div>
                    <p className="text-sm text-muted-foreground">风险评分 (满分100)</p>
                  </div>
                  <Progress 
                    value={riskScore} 
                    className="h-2 mt-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 surface-variant rounded">
                    <p className="text-muted-foreground">AI分析用时</p>
                    <p className="font-medium">3.2秒</p>
                  </div>
                  <div className="p-2 surface-variant rounded">
                    <p className="text-muted-foreground">参考案例</p>
                    <p className="font-medium">2,847个</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 问题统计 */}
            <Card className="elevation-2 border-0">
              <CardHeader>
                <CardTitle className="text-base">发现问题统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-sm">严重问题</span>
                    </div>
                    <span className="font-medium">{stats.critical}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span className="text-sm">高风险</span>
                    </div>
                    <span className="font-medium">{stats.high}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="text-sm">中风险</span>
                    </div>
                    <span className="font-medium">{stats.medium}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">低风险</span>
                    </div>
                    <span className="font-medium">{stats.low}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  下载审查报告
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 详细问题列表 */}
          <Card className="elevation-2 border-0">
            <CardHeader>
              <CardTitle className="text-base">问题详情与建议</CardTitle>
              <CardDescription>AI已自动标注所有风险点并提供优化建议</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full grid grid-cols-5">
                  <TabsTrigger value="all">全部 ({stats.total})</TabsTrigger>
                  <TabsTrigger value="critical">严重 ({stats.critical})</TabsTrigger>
                  <TabsTrigger value="high">高 ({stats.high})</TabsTrigger>
                  <TabsTrigger value="medium">中 ({stats.medium})</TabsTrigger>
                  <TabsTrigger value="low">低 ({stats.low})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-3 mt-4">
                  {issues.map((issue, index) => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="elevation-1 border-l-4 border-l-purple-500">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`p-2 rounded-lg ${getSeverityColor(issue.severity).replace('border-', 'border-2 border-')}`}>
                                {getTypeIcon(issue.type)}
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-medium">{issue.clause}</h4>
                                  <Badge className={getSeverityColor(issue.severity)}>
                                    {issue.severity === 'critical' ? '严重' :
                                     issue.severity === 'high' ? '高风险' :
                                     issue.severity === 'medium' ? '中风险' : '低风险'}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {issue.type === 'legal' ? '法律' :
                                     issue.type === 'commercial' ? '商务' :
                                     issue.type === 'compliance' ? '合规' : '财务'}
                                  </Badge>
                                </div>

                                <div className="space-y-2 text-sm">
                                  <div className="p-3 bg-red-50 rounded-lg">
                                    <p className="text-red-900 font-medium mb-1">⚠️ 问题</p>
                                    <p className="text-red-700">{issue.issue}</p>
                                  </div>

                                  <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="text-blue-900 font-medium mb-1">💡 AI建议</p>
                                    <p className="text-blue-700">{issue.suggestion}</p>
                                  </div>

                                  <div className="p-3 surface-variant rounded-lg">
                                    <p className="font-medium mb-1">📊 影响评估</p>
                                    <p className="text-muted-foreground">{issue.impact}</p>
                                  </div>

                                  {issue.reference && (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Info className="h-3 w-3" />
                                      <span>法律依据: {issue.reference}</span>
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2 pt-2">
                                  <Button variant="outline" size="sm">
                                    查看条款原文
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    查看案例参考
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>

                {['critical', 'high', 'medium', 'low'].map(severity => (
                  <TabsContent key={severity} value={severity} className="space-y-3 mt-4">
                    {issues.filter(i => i.severity === severity).map((issue, index) => (
                      <div key={issue.id}>
                        {/* 同样的卡片内容 */}
                        <p className="text-sm text-muted-foreground">
                          {issue.clause} - {issue.issue}
                        </p>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
