import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ChevronRight, Sliders } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider as SliderComponent } from './ui/slider';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface PredictionScenariosProps {
  onComplete: () => void;
}

export default function PredictionScenarios({ onComplete }: PredictionScenariosProps) {
  const [selectedScenario, setSelectedScenario] = useState<'optimistic' | 'neutral' | 'pessimistic'>('neutral');
  const [adjustments, setAdjustments] = useState({
    promotion: 0,
    pricing: 0,
    newProduct: 0
  });

  const scenarios = {
    optimistic: {
      name: '乐观场景',
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500/50',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      description: '所有促销活动效果超预期，竞品无重大动作',
      predictions: [
        { month: '1月', value: 1280, growth: 20, confidence: 85 },
        { month: '2月', value: 1050, growth: 10, confidence: 82 },
        { month: '3月', value: 1520, growth: 27, confidence: 88 }
      ],
      assumptions: [
        '双十一效应延续至1月',
        '新品发布反响热烈',
        '市场份额增长2%',
        '无重大负面事件'
      ]
    },
    neutral: {
      name: '中性场景',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/50',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      description: '基于历史数据和当前趋势的最可能情况',
      predictions: [
        { month: '1月', value: 1150, growth: 8, confidence: 92 },
        { month: '2月', value: 950, growth: -1, confidence: 88 },
        { month: '3月', value: 1380, growth: 15, confidence: 91 }
      ],
      assumptions: [
        '季节性规律保持稳定',
        '促销活动如期进行',
        '竞品影响在可控范围',
        '宏观环境无剧烈变化'
      ]
    },
    pessimistic: {
      name: '悲观场景',
      color: 'from-red-500 to-orange-500',
      borderColor: 'border-red-500/50',
      bgColor: 'from-red-500/10 to-orange-500/10',
      description: '面临竞品强力促销、供应链中断等不利因素',
      predictions: [
        { month: '1月', value: 1020, growth: -5, confidence: 80 },
        { month: '2月', value: 850, growth: -11, confidence: 78 },
        { month: '3月', value: 1180, growth: 2, confidence: 83 }
      ],
      assumptions: [
        '竞品大规模降价促销',
        '供应链出现短期中断',
        '消费者信心下降',
        '季节性效应减弱'
      ]
    }
  };

  const currentScenario = scenarios[selectedScenario];

  const sensitivityFactors = [
    { name: '促销力度', impact: 15, adjustable: true, key: 'promotion' as const },
    { name: '价格策略', impact: -8, adjustable: true, key: 'pricing' as const },
    { name: '新品推出', impact: 12, adjustable: true, key: 'newProduct' as const },
    { name: '竞品动态', impact: -5, adjustable: false, key: null }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 引导说明 */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2">多场景预测分析</h2>
            <p className="text-slate-300 mb-4">
              基于AI模型，我们生成了三种不同假设下的需求预测场景。通过对比分析，帮助您制定应对策略并降低决策风险。
            </p>
          </div>
        </div>
      </Card>

      {/* 场景选择 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => {
          const scenario = scenarios[key];
          const isSelected = selectedScenario === key;
          
          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`cursor-pointer p-5 transition-all ${
                  isSelected
                    ? `bg-gradient-to-br ${scenario.bgColor} border-2 ${scenario.borderColor} shadow-lg`
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => setSelectedScenario(key)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className={isSelected ? 'text-lg' : ''}>{scenario.name}</h3>
                    {isSelected && (
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{scenario.description}</p>
                  
                  {/* 预测值预览 */}
                  <div className="pt-3 border-t border-slate-700">
                    <p className="text-xs text-slate-500 mb-2">3月预测</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl">
                        {scenario.predictions[2].value}
                      </span>
                      <span className="text-sm text-slate-400">件</span>
                      <Badge
                        variant={scenario.predictions[2].growth > 0 ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {scenario.predictions[2].growth > 0 ? '+' : ''}
                        {scenario.predictions[2].growth}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* 详细分析 */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <Tabs defaultValue="forecast" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forecast">预测详情</TabsTrigger>
            <TabsTrigger value="assumptions">关键假设</TabsTrigger>
            <TabsTrigger value="sensitivity">敏感性分析</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-4 mt-4">
            <div className="mb-4">
              <h3 className="mb-2">{currentScenario.name}未来3个月预测</h3>
              <p className="text-sm text-slate-400">
                基于{currentScenario.description}
              </p>
            </div>

            {/* 预测数据表格 */}
            <div className="space-y-3">
              {currentScenario.predictions.map((pred, index) => (
                <motion.div
                  key={pred.month}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-800 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${currentScenario.color} rounded-lg flex items-center justify-center`}>
                        {pred.growth > 5 ? (
                          <TrendingUp className="w-5 h-5 text-white" />
                        ) : pred.growth < -5 ? (
                          <TrendingDown className="w-5 h-5 text-white" />
                        ) : (
                          <Minus className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h4>{pred.month}</h4>
                        <p className="text-xs text-slate-400">预测需求</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl">{pred.value}</p>
                      <p className="text-xs text-slate-400">件</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
                      <span className="text-slate-400">环比增长</span>
                      <span className={pred.growth > 0 ? 'text-green-400' : pred.growth < 0 ? 'text-red-400' : 'text-slate-400'}>
                        {pred.growth > 0 ? '+' : ''}{pred.growth}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
                      <span className="text-slate-400">置信度</span>
                      <span className="text-cyan-400">{pred.confidence}%</span>
                    </div>
                  </div>

                  {/* 置信区间 */}
                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-2">置信区间</p>
                    <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`absolute h-full bg-gradient-to-r ${currentScenario.color} opacity-50`}
                        style={{ left: '20%', width: '60%' }}
                      ></div>
                      <div
                        className={`absolute h-full bg-gradient-to-r ${currentScenario.color}`}
                        style={{ left: '40%', width: '20%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>{Math.round(pred.value * 0.92)}</span>
                      <span>{pred.value}</span>
                      <span>{Math.round(pred.value * 1.08)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assumptions" className="space-y-4 mt-4">
            <div className="mb-4">
              <h3 className="mb-2">场景假设条件</h3>
              <p className="text-sm text-slate-400">
                以下是{currentScenario.name}的核心假设
              </p>
            </div>

            <div className="space-y-2">
              {currentScenario.assumptions.map((assumption, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700"
                >
                  <div className={`w-6 h-6 bg-gradient-to-br ${currentScenario.color} rounded flex items-center justify-center shrink-0 mt-0.5`}>
                    <span className="text-xs text-white">{index + 1}</span>
                  </div>
                  <p className="flex-1 text-sm text-slate-300">{assumption}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-300">
                💡 提示：这些假设基于历史数据和市场分析。实际情况可能因外部因素发生变化，建议定期复盘调整。
              </p>
            </div>
          </TabsContent>

          <TabsContent value="sensitivity" className="space-y-4 mt-4">
            <div className="mb-4">
              <h3 className="mb-2">敏感性分析</h3>
              <p className="text-sm text-slate-400">
                调整关键参数，查看对预测结果的影响
              </p>
            </div>

            {/* 敏感性调节器 */}
            <div className="space-y-4">
              {sensitivityFactors.map((factor, index) => (
                <div key={index} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm">{factor.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">基准影响</span>
                      <Badge variant={factor.impact > 0 ? 'default' : 'destructive'} className="text-xs">
                        {factor.impact > 0 ? '+' : ''}{factor.impact}%
                      </Badge>
                    </div>
                  </div>
                  
                  {factor.adjustable && factor.key && (
                    <>
                      <SliderComponent
                        min={-20}
                        max={20}
                        step={5}
                        value={[adjustments[factor.key]]}
                        onValueChange={(value) => {
                          setAdjustments({ ...adjustments, [factor.key!]: value[0] });
                          const totalImpact = factor.impact + value[0];
                          toast.info(`${factor.name}调整`, {
                            description: `${value[0] > 0 ? '+' : ''}${value[0]}% → 总影响 ${totalImpact > 0 ? '+' : ''}${totalImpact}%`
                          });
                        }}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>-20%</span>
                        <span className="text-cyan-400">{adjustments[factor.key]}%</span>
                        <span>+20%</span>
                      </div>
                    </>
                  )}
                  
                  {!factor.adjustable && (
                    <p className="text-xs text-slate-500 italic">外部因素，无法直接调整</p>
                  )}
                </div>
              ))}
            </div>

            {/* 综合影响预测 */}
            <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <h4 className="text-sm text-cyan-300 mb-2">调整后预测</h4>
              <p className="text-xs text-slate-400 mb-3">
                基于您的参数调整，3月预测值将变为:
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl text-cyan-400">
                  {Math.round(
                    currentScenario.predictions[2].value *
                      (1 + (adjustments.promotion + adjustments.pricing + adjustments.newProduct) / 100)
                  )}
                </span>
                <span className="text-sm text-slate-400">件</span>
                <Badge variant="outline" className="text-xs">
                  {adjustments.promotion + adjustments.pricing + adjustments.newProduct > 0 ? '+' : ''}
                  {adjustments.promotion + adjustments.pricing + adjustments.newProduct}%
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* 场景对比 */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="mb-4">三种场景对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left pb-3 text-slate-400">指标</th>
                <th className="text-center pb-3 text-green-400">乐观</th>
                <th className="text-center pb-3 text-blue-400">中性</th>
                <th className="text-center pb-3 text-red-400">悲观</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-800">
                <td className="py-3 text-slate-400">3月预测值</td>
                <td className="text-center py-3">{scenarios.optimistic.predictions[2].value}件</td>
                <td className="text-center py-3">{scenarios.neutral.predictions[2].value}件</td>
                <td className="text-center py-3">{scenarios.pessimistic.predictions[2].value}件</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-3 text-slate-400">增长率</td>
                <td className="text-center py-3 text-green-400">+{scenarios.optimistic.predictions[2].growth}%</td>
                <td className="text-center py-3 text-blue-400">+{scenarios.neutral.predictions[2].growth}%</td>
                <td className="text-center py-3 text-red-400">+{scenarios.pessimistic.predictions[2].growth}%</td>
              </tr>
              <tr>
                <td className="py-3 text-slate-400">置信度</td>
                <td className="text-center py-3">{scenarios.optimistic.predictions[2].confidence}%</td>
                <td className="text-center py-3">{scenarios.neutral.predictions[2].confidence}%</td>
                <td className="text-center py-3">{scenarios.pessimistic.predictions[2].confidence}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* 下一步 */}
      <Button
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 h-12"
        onClick={onComplete}
      >
        <span>查看基于预测的行动建议</span>
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
}
