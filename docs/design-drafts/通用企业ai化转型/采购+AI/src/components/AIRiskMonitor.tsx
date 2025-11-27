import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Shield, AlertTriangle, CheckCircle2, XCircle, Eye, Bell } from 'lucide-react';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface RiskItem {
  id: string;
  category: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  probability: number;
  impact: string;
  recommendation: string;
  status: 'active' | 'monitoring' | 'resolved';
}

interface AIRiskMonitorProps {
  risks: RiskItem[];
  overallScore: number;
}

export default function AIRiskMonitor({ risks, overallScore }: AIRiskMonitorProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <XCircle className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      case 'low':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '健康';
    if (score >= 60) return '良好';
    if (score >= 40) return '注意';
    return '警告';
  };

  const handleMonitor = (risk: RiskItem) => {
    toast.success('已启动监控', {
      description: `系统将持续监控"${risk.category}"的风险状态`
    });
  };

  const handleViewDetails = (risk: RiskItem) => {
    toast.info('风险详情', {
      description: risk.recommendation
    });
  };

  return (
    <Card className="elevation-2 border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            AI 风险监控
          </CardTitle>
          <Badge variant="outline" className="border-0 bg-white/80">
            实时扫描
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Overall Risk Score */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border-2"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">综合风险评分</span>
              <Badge variant="outline" className={getSeverityColor(overallScore >= 60 ? 'low' : overallScore >= 40 ? 'medium' : 'high')}>
                {getScoreLabel(overallScore)}
              </Badge>
            </div>
            <div className="flex items-end gap-4">
              <div>
                <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </div>
                <div className="text-xs text-muted-foreground mt-1">满分 100</div>
              </div>
              <div className="flex-1">
                <Progress value={overallScore} className="h-3" />
                <div className="text-xs text-muted-foreground mt-1">
                  基于 {risks.length} 个风险因子的AI分析
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Items */}
          <div className="space-y-3">
            {risks.map((risk, index) => (
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  risk.severity === 'critical' ? 'border-l-red-500 bg-red-50/50' :
                  risk.severity === 'high' ? 'border-l-orange-500 bg-orange-50/50' :
                  risk.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50/50' :
                  'border-l-green-500 bg-green-50/50'
                } bg-white`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`${getSeverityColor(risk.severity)} text-xs`}>
                          {getSeverityIcon(risk.severity)}
                          <span className="ml-1">
                            {risk.severity === 'critical' ? '严重' :
                             risk.severity === 'high' ? '高风险' :
                             risk.severity === 'medium' ? '中风险' :
                             '低风险'}
                          </span>
                        </Badge>
                        <span className="text-sm font-medium">{risk.category}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">发生概率</span>
                      <div className="mt-1">
                        <Progress value={risk.probability} className="h-1.5" />
                        <span className="text-xs font-medium">{risk.probability}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">影响范围</span>
                      <div className="mt-1 font-medium">{risk.impact}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                      💡 {risk.recommendation}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleViewDetails(risk)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        详情
                      </Button>
                      {risk.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleMonitor(risk)}
                        >
                          <Bell className="h-3 w-3 mr-1" />
                          监控
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-muted-foreground pt-2 border-t"
          >
            <Shield className="h-4 w-4 inline mr-1" />
            AI 每小时自动扫描供应商风险 · 上次扫描: 5分钟前
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
