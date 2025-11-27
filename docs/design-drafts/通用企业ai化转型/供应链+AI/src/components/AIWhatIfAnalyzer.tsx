import { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, Zap, RotateCw, Save, AlertCircle, CheckCircle, Lightbulb, Target, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface SimulationParameter {
  id: string;
  name: string;
  icon: React.ElementType;
  min: number;
  max: number;
  step: number;
  unit: string;
  defaultValue: number;
  description: string;
  aiRecommendation?: number;
}

interface SimulationResult {
  revenue: number;
  cost: number;
  profit: number;
  serviceLevel: number;
  inventoryTurnover: number;
  riskScore: number;
  confidence: number;
  aiInsights: string[];
  recommendations: {
    title: string;
    impact: 'high' | 'medium' | 'low';
    description: string;
  }[];
}

interface AIWhatIfAnalyzerProps {
  module: 'demand' | 'inventory' | 'logistics';
  onApply?: (params: Record<string, number>) => void;
}

export default function AIWhatIfAnalyzer({ module, onApply }: AIWhatIfAnalyzerProps) {
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<Array<{ name: string; params: Record<string, number>; result: SimulationResult }>>([]);
  const [aiThinking, setAiThinking] = useState(false);

  const parameterConfigs: Record<string, SimulationParameter[]> = {
    demand: [
      {
        id: 'promotion',
        name: '促销力度',
        icon: Target,
        min: -50,
        max: 50,
        step: 5,
        unit: '%',
        defaultValue: 0,
        description: '调整促销活动的投入力度',
        aiRecommendation: 15
      },
      {
        id: 'pricing',
        name: '价格调整',
        icon: TrendingDown,
        min: -30,
        max: 30,
        step: 5,
        unit: '%',
        defaultValue: 0,
        description: '产品定价策略调整',
        aiRecommendation: -8
      },
      {
        id: 'marketing',
        name: '营销投入',
        icon: Zap,
        min: -40,
        max: 60,
        step: 10,
        unit: '%',
        defaultValue: 0,
        description: '市场营销预算调整',
        aiRecommendation: 20
      }
    ],
    inventory: [
      {
        id: 'safetyStock',
        name: '安全库存',
        icon: AlertCircle,
        min: -50,
        max: 50,
        step: 5,
        unit: '%',
        defaultValue: 0,
        description: '安全库存水平调整',
        aiRecommendation: -15
      },
      {
        id: 'reorderPoint',
        name: '补货点',
        icon: RotateCw,
        min: -30,
        max: 30,
        step: 5,
        unit: '%',
        defaultValue: 0,
        description: '触发补货的库存点位',
        aiRecommendation: 10
      },
      {
        id: 'orderQuantity',
        name: '订货量',
        icon: TrendingUp,
        min: -40,
        max: 40,
        step: 10,
        unit: '%',
        defaultValue: 0,
        description: '每次补货的数量',
        aiRecommendation: -10
      }
    ],
    logistics: [
      {
        id: 'carrierMix',
        name: '运力组合',
        icon: TrendingUp,
        min: -30,
        max: 30,
        step: 5,
        unit: '%',
        defaultValue: 0,
        description: '快递/专线运力比例',
        aiRecommendation: 15
      },
      {
        id: 'routeOptimization',
        name: '路线优化',
        icon: Zap,
        min: 0,
        max: 100,
        step: 10,
        unit: '%',
        defaultValue: 50,
        description: 'AI路线优化启用程度',
        aiRecommendation: 85
      },
      {
        id: 'consolidation',
        name: '订单合并',
        icon: CheckCircle,
        min: 0,
        max: 100,
        step: 10,
        unit: '%',
        defaultValue: 50,
        description: '订单合并发货比例',
        aiRecommendation: 70
      }
    ]
  };

  const currentParams = parameterConfigs[module] || [];

  // Initialize parameters
  useEffect(() => {
    const initParams: Record<string, number> = {};
    currentParams.forEach(param => {
      initParams[param.id] = param.defaultValue;
    });
    setParameters(initParams);
  }, [module]);

  const runSimulation = async () => {
    setIsSimulating(true);
    setAiThinking(true);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate results based on parameters
    const baseRevenue = 1000000;
    const baseCost = 750000;
    
    let revenueMultiplier = 1;
    let costMultiplier = 1;
    let serviceLevelChange = 0;
    let inventoryTurnoverChange = 0;
    let riskChange = 0;
    
    // Apply parameter effects
    Object.entries(parameters).forEach(([key, value]) => {
      switch (key) {
        case 'promotion':
          revenueMultiplier += value * 0.008;
          costMultiplier += value * 0.005;
          break;
        case 'pricing':
          revenueMultiplier += value * 0.012;
          riskChange += Math.abs(value) * 0.3;
          break;
        case 'marketing':
          revenueMultiplier += value * 0.006;
          costMultiplier += value * 0.004;
          break;
        case 'safetyStock':
          costMultiplier += value * 0.003;
          serviceLevelChange += value * 0.15;
          inventoryTurnoverChange -= value * 0.1;
          break;
        case 'reorderPoint':
          serviceLevelChange += value * 0.08;
          costMultiplier += value * 0.002;
          break;
        case 'orderQuantity':
          inventoryTurnoverChange -= value * 0.12;
          costMultiplier += value * 0.0025;
          break;
        case 'carrierMix':
          costMultiplier += value * 0.004;
          serviceLevelChange += value * 0.1;
          break;
        case 'routeOptimization':
          costMultiplier -= value * 0.002;
          serviceLevelChange += value * 0.05;
          break;
        case 'consolidation':
          costMultiplier -= value * 0.003;
          serviceLevelChange -= value * 0.02;
          break;
      }
    });
    
    const revenue = baseRevenue * revenueMultiplier;
    const cost = baseCost * costMultiplier;
    const profit = revenue - cost;
    const serviceLevel = Math.max(85, Math.min(99, 94 + serviceLevelChange));
    const inventoryTurnover = Math.max(2, Math.min(8, 4.5 + inventoryTurnoverChange));
    const riskScore = Math.max(0, Math.min(100, 25 + riskChange));
    const confidence = Math.max(70, Math.min(95, 88 - riskChange * 0.5));
    
    // Generate AI insights
    const insights: string[] = [];
    const recommendations: SimulationResult['recommendations'] = [];
    
    if (profit > baseRevenue - baseCost) {
      insights.push(`利润提升 ¥${Math.round((profit - (baseRevenue - baseCost)) / 1000)}K，策略效果显著`);
    } else {
      insights.push(`利润下降 ¥${Math.round(((baseRevenue - baseCost) - profit) / 1000)}K，需要优化参数`);
    }
    
    if (serviceLevel > 94) {
      insights.push(`服务水平达到${serviceLevel.toFixed(1)}%，客户满意度预期提升`);
      recommendations.push({
        title: '保持高服务水平',
        impact: 'high',
        description: '当前配置实现了优秀的服务水平，建议持续优化'
      });
    } else {
      insights.push(`服务水平为${serviceLevel.toFixed(1)}%，存在改进空间`);
      recommendations.push({
        title: '提升服务质量',
        impact: 'high',
        description: '建议增加安全库存或优化配送路线以提升服务水平'
      });
    }
    
    if (riskScore < 30) {
      insights.push(`风险评分${riskScore.toFixed(0)}分，整体风险可控`);
    } else {
      insights.push(`风险评分${riskScore.toFixed(0)}分，建议谨慎执行`);
      recommendations.push({
        title: '降低执行风险',
        impact: 'medium',
        description: '当前策略存在一定风险，建议小范围试点后推广'
      });
    }
    
    if (inventoryTurnover > 5) {
      insights.push(`库存周转率${inventoryTurnover.toFixed(1)}次/年，资金利用效率高`);
    }
    
    // Check if close to AI recommendation
    const aiAligned = currentParams.every(param => {
      if (!param.aiRecommendation) return true;
      const diff = Math.abs(parameters[param.id] - param.aiRecommendation);
      return diff < 10;
    });
    
    if (aiAligned) {
      insights.push('🎯 参数设置与AI推荐高度一致，预期效果最优');
      recommendations.push({
        title: 'AI推荐方案',
        impact: 'high',
        description: '当前参数组合是AI基于历史数据推荐的最优方案'
      });
    } else {
      recommendations.push({
        title: '尝试AI推荐',
        impact: 'medium',
        description: '点击"应用AI推荐"查看AI优化后的参数组合'
      });
    }
    
    setAiThinking(false);
    
    const simulationResult: SimulationResult = {
      revenue,
      cost,
      profit,
      serviceLevel,
      inventoryTurnover,
      riskScore,
      confidence,
      aiInsights: insights,
      recommendations
    };
    
    setResult(simulationResult);
    setIsSimulating(false);
    
    toast.success('AI模拟完成', {
      description: `置信度 ${confidence.toFixed(0)}% | ${insights.length}条洞察`
    });
  };

  const applyAIRecommendation = () => {
    const aiParams: Record<string, number> = {};
    currentParams.forEach(param => {
      aiParams[param.id] = param.aiRecommendation || param.defaultValue;
    });
    setParameters(aiParams);
    toast.info('已应用AI推荐参数', {
      description: '这是基于历史数据优化的最佳配置'
    });
  };

  const resetParameters = () => {
    const resetParams: Record<string, number> = {};
    currentParams.forEach(param => {
      resetParams[param.id] = param.defaultValue;
    });
    setParameters(resetParams);
    setResult(null);
    toast.info('参数已重置');
  };

  const saveScenario = () => {
    if (!result) return;
    
    const name = `场景 ${savedScenarios.length + 1} - ${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    setSavedScenarios([...savedScenarios, { name, params: { ...parameters }, result }]);
    toast.success('场景已保存', {
      description: '可在对比模式中查看'
    });
  };

  const applyScenario = () => {
    if (!result) return;
    onApply?.(parameters);
    toast.success('策略已应用', {
      description: '系统将根据新参数运行'
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1">AI驱动的What-If分析</h3>
            <p className="text-sm text-slate-400">
              调整参数，AI实时预测业务影响并提供优化建议
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={applyAIRecommendation}
            className="shrink-0"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            AI推荐
          </Button>
        </div>
      </Card>

      {/* Parameter Controls */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h4 className="mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          参数调节
        </h4>
        
        <div className="space-y-6">
          {currentParams.map((param) => {
            const Icon = param.icon;
            const currentValue = parameters[param.id] || param.defaultValue;
            const isAIRecommended = param.aiRecommendation === currentValue;
            
            return (
              <div key={param.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm">{param.name}</span>
                    {isAIRecommended && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Lightbulb className="w-3 h-3" />
                        AI推荐
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-cyan-400">
                      {currentValue > 0 ? '+' : ''}{currentValue}{param.unit}
                    </span>
                    {param.aiRecommendation !== undefined && (
                      <span className="text-xs text-slate-500">
                        (AI建议: {param.aiRecommendation > 0 ? '+' : ''}{param.aiRecommendation}{param.unit})
                      </span>
                    )}
                  </div>
                </div>
                
                <Slider
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={[currentValue]}
                  onValueChange={(value) => {
                    setParameters({ ...parameters, [param.id]: value[0] });
                    setResult(null); // Clear result when params change
                  }}
                  className="py-2"
                />
                
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{param.min}{param.unit}</span>
                  <span className="text-slate-400">{param.description}</span>
                  <span>{param.max}{param.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
          >
            {isSimulating ? (
              <>
                <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                AI计算中...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                运行AI模拟
              </>
            )}
          </Button>
          <Button onClick={resetParameters} variant="outline">
            重置
          </Button>
        </div>
      </Card>

      {/* AI Thinking Animation */}
      <AnimatePresence>
        {aiThinking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900 border border-purple-500/30 rounded-lg p-6"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
                <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping"></div>
              </div>
              <div>
                <p className="text-sm text-purple-300">AI正在分析...</p>
                <p className="text-xs text-slate-400">计算多维度影响，生成优化建议</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* KPI Results */}
            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  预测结果
                </h4>
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  置信度 {result.confidence.toFixed(0)}%
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">预期利润</p>
                  <p className="text-2xl text-green-400">
                    ¥{(result.profit / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    收入 ¥{(result.revenue / 1000).toFixed(0)}K
                  </p>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">服务水平</p>
                  <p className="text-2xl text-cyan-400">
                    {result.serviceLevel.toFixed(1)}%
                  </p>
                  <div className="w-full bg-slate-700 h-1 rounded-full mt-2">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all"
                      style={{ width: `${result.serviceLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">风险评分</p>
                  <p className={`text-2xl ${result.riskScore < 30 ? 'text-green-400' : result.riskScore < 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {result.riskScore.toFixed(0)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {result.riskScore < 30 ? '低风险' : result.riskScore < 60 ? '中风险' : '高风险'}
                  </p>
                </div>
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-6">
              <h4 className="mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                AI智能洞察
              </h4>
              <div className="space-y-2">
                {result.aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 p-3 bg-slate-800/50 rounded-lg"
                  >
                    <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h4 className="mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                优化建议
              </h4>
              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-800 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-sm">{rec.title}</h5>
                      <Badge
                        variant={rec.impact === 'high' ? 'destructive' : rec.impact === 'medium' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {rec.impact === 'high' ? '高' : rec.impact === 'medium' ? '中' : '低'}影响
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{rec.description}</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={applyScenario}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                应用此策略
              </Button>
              <Button
                onClick={saveScenario}
                variant="outline"
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                保存场景
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Scenarios */}
      {savedScenarios.length > 0 && (
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h4 className="mb-3">已保存的场景 ({savedScenarios.length})</h4>
          <div className="space-y-2">
            {savedScenarios.map((scenario, index) => (
              <div
                key={index}
                className="p-3 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm">{scenario.name}</p>
                  <p className="text-xs text-slate-400">
                    利润 ¥{(scenario.result.profit / 1000).toFixed(0)}K | 
                    服务 {scenario.result.serviceLevel.toFixed(0)}%
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setParameters(scenario.params);
                    setResult(scenario.result);
                    toast.info('场景已加载');
                  }}
                >
                  加载
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
