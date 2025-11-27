import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Award, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Calculator, Sparkles, BarChart3, RefreshCw } from 'lucide-react';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface SupplierScore {
  supplier: string;
  overall: number;
  dimensions: {
    quality: number;
    price: number;
    delivery: number;
    service: number;
    innovation: number;
    sustainability: number;
  };
  risk: 'low' | 'medium' | 'high';
  recommendation: string;
  aiInsights: string[];
}

interface AISupplierScoringProps {
  supplierId?: string;
  category?: string;
}

export default function AISupplierScoring({ supplierId, category }: AISupplierScoringProps) {
  const [weights, setWeights] = useState({
    quality: 25,
    price: 25,
    delivery: 20,
    service: 15,
    innovation: 10,
    sustainability: 5,
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [scores, setScores] = useState<SupplierScore[]>(generateScores(weights));
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierScore | null>(scores[0]);
  const [customMode, setCustomMode] = useState(false);

  function generateScores(currentWeights: typeof weights): SupplierScore[] {
    const suppliers = [
      {
        supplier: '华为技术有限公司',
        base: { quality: 95, price: 78, delivery: 92, service: 88, innovation: 96, sustainability: 85 },
        risk: 'low' as const,
      },
      {
        supplier: '阿里云计算',
        base: { quality: 90, price: 82, delivery: 88, service: 92, innovation: 94, sustainability: 88 },
        risk: 'low' as const,
      },
      {
        supplier: 'ABC物流',
        base: { quality: 75, price: 88, delivery: 70, service: 78, innovation: 65, sustainability: 72 },
        risk: 'high' as const,
      },
      {
        supplier: '优质印刷',
        base: { quality: 82, price: 85, delivery: 86, service: 80, innovation: 70, sustainability: 75 },
        risk: 'medium' as const,
      },
    ];

    return suppliers.map(s => {
      const overall = Math.round(
        (s.base.quality * currentWeights.quality +
        s.base.price * currentWeights.price +
        s.base.delivery * currentWeights.delivery +
        s.base.service * currentWeights.service +
        s.base.innovation * currentWeights.innovation +
        s.base.sustainability * currentWeights.sustainability) / 100
      );

      const insights = [];
      if (s.base.quality >= 90) insights.push('质量表现卓越，连续12个月零投诉');
      if (s.base.price >= 85) insights.push('价格竞争力强，低于市场均价15%');
      if (s.base.delivery >= 90) insights.push('交付准时率高达98%，行业领先');
      if (s.base.innovation >= 90) insights.push('技术创新能力突出，拥有多项专利');
      if (s.risk === 'high') insights.push('⚠️ 检测到风险信号：近期罢工事件');

      return {
        supplier: s.supplier,
        overall,
        dimensions: s.base,
        risk: s.risk,
        recommendation: overall >= 85 
          ? '强烈推荐：该供应商综合表现优异，可优先合作' 
          : overall >= 70 
            ? '建议合作：表现良好，可作为备选供应商'
            : '谨慎评估：建议进一步考察或寻找替代方案',
        aiInsights: insights,
      };
    }).sort((a, b) => b.overall - a.overall);
  }

  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const newScores = generateScores(weights);
      setScores(newScores);
      setSelectedSupplier(newScores[0]);
      setIsCalculating(false);
      toast.success('AI评分已更新', {
        description: '根据新的权重配置重新计算完成'
      });
    }, 1500);
  };

  const handleWeightChange = (dimension: keyof typeof weights, value: number) => {
    setWeights(prev => ({
      ...prev,
      [dimension]: value,
    }));
  };

  const handleResetWeights = () => {
    setWeights({
      quality: 25,
      price: 25,
      delivery: 20,
      service: 15,
      innovation: 10,
      sustainability: 5,
    });
    toast.info('权重已重置', {
      description: '恢复为默认平衡配置'
    });
  };

  const radarData = selectedSupplier ? [
    { dimension: '质量', value: selectedSupplier.dimensions.quality, fullMark: 100 },
    { dimension: '价格', value: selectedSupplier.dimensions.price, fullMark: 100 },
    { dimension: '交付', value: selectedSupplier.dimensions.delivery, fullMark: 100 },
    { dimension: '服务', value: selectedSupplier.dimensions.service, fullMark: 100 },
    { dimension: '创新', value: selectedSupplier.dimensions.innovation, fullMark: 100 },
    { dimension: '可持续', value: selectedSupplier.dimensions.sustainability, fullMark: 100 },
  ] : [];

  const comparisonData = scores.map(s => ({
    name: s.supplier.split('公司')[0].split('有限')[0],
    综合得分: s.overall,
    质量: s.dimensions.quality,
    价格: s.dimensions.price,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl ai-gradient flex items-center justify-center ai-glow">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">AI供应商智能评分</h3>
            <p className="text-sm text-muted-foreground">多维度分析，智能推荐最佳合作伙伴</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCustomMode(!customMode)}
          >
            <Calculator className="h-4 w-4 mr-2" />
            {customMode ? '隐藏' : '显示'}权重配置
          </Button>
          <Button 
            className="ai-gradient text-white border-0"
            size="sm"
            onClick={handleRecalculate}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                计算中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                重新评分
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Weight Configuration */}
      <AnimatePresence>
        {customMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="elevation-2 border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">评分权重配置</CardTitle>
                    <CardDescription>调整各维度的重要性（总和需为100%）</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleResetWeights}>
                    重置默认
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(weights).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {key === 'quality' && '质量'}
                        {key === 'price' && '价格'}
                        {key === 'delivery' && '交付'}
                        {key === 'service' && '服务'}
                        {key === 'innovation' && '创新'}
                        {key === 'sustainability' && '可持续性'}
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={value}
                          onChange={(e) => handleWeightChange(key as keyof typeof weights, Number(e.target.value))}
                          className="w-16 h-8 text-center"
                          min={0}
                          max={100}
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={([v]) => handleWeightChange(key as keyof typeof weights, v)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">权重总和</span>
                  <Badge variant={Object.values(weights).reduce((a, b) => a + b, 0) === 100 ? 'default' : 'destructive'}>
                    {Object.values(weights).reduce((a, b) => a + b, 0)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scores Display */}
      <Tabs defaultValue="ranking" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ranking">排名对比</TabsTrigger>
          <TabsTrigger value="radar">雷达分析</TabsTrigger>
          <TabsTrigger value="details">详细评分</TabsTrigger>
        </TabsList>

        {/* Ranking Tab */}
        <TabsContent value="ranking" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {scores.map((score, index) => (
              <motion.div
                key={score.supplier}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`elevation-2 hover-lift cursor-pointer border-0 md-transition ${
                    selectedSupplier?.supplier === score.supplier ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedSupplier(score)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        {index === 0 && (
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl elevation-2">
                            1
                          </div>
                        )}
                        {index === 1 && (
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-xl elevation-2">
                            2
                          </div>
                        )}
                        {index === 2 && (
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl elevation-2">
                            3
                          </div>
                        )}
                        {index > 2 && (
                          <div className="h-12 w-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl">
                            {index + 1}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{score.supplier}</h4>
                            <p className="text-sm text-muted-foreground">{score.recommendation}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold ai-gradient bg-clip-text text-transparent">
                              {score.overall}
                            </div>
                            <p className="text-xs text-muted-foreground">综合得分</p>
                          </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(score.dimensions).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                  {key === 'quality' && '质量'}
                                  {key === 'price' && '价格'}
                                  {key === 'delivery' && '交付'}
                                </span>
                                <span className="font-medium">{value}</span>
                              </div>
                              <Progress value={value} className="h-1.5" />
                            </div>
                          ))}
                        </div>

                        {/* Risk Badge */}
                        <div className="flex items-center gap-2">
                          <Badge variant={score.risk === 'low' ? 'default' : score.risk === 'medium' ? 'secondary' : 'destructive'}
                            className={
                              score.risk === 'low' ? 'bg-green-500/10 text-green-700 border-green-200' :
                              score.risk === 'medium' ? 'bg-orange-500/10 text-orange-700 border-orange-200' :
                              'bg-red-500/10 text-red-700 border-red-200'
                            }
                          >
                            {score.risk === 'low' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {score.risk === 'medium' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {score.risk === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {score.risk === 'low' ? '低风险' : score.risk === 'medium' ? '中风险' : '高风险'}
                          </Badge>
                          {index === 0 && (
                            <Badge className="ai-gradient text-white border-0">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI推荐
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison Chart */}
          <Card className="elevation-2 border-0">
            <CardHeader>
              <CardTitle className="text-base">综合对比</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="综合得分" fill="var(--ai-primary)" />
                  <Bar dataKey="质量" fill="var(--md-primary)" />
                  <Bar dataKey="价格" fill="var(--md-secondary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Radar Tab */}
        <TabsContent value="radar" className="space-y-4 mt-4">
          {selectedSupplier && (
            <Card className="elevation-2 border-0">
              <CardHeader>
                <CardTitle>{selectedSupplier.supplier} - 多维度分析</CardTitle>
                <CardDescription>六维雷达图展示供应商各项能力</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar 
                      name={selectedSupplier.supplier} 
                      dataKey="value" 
                      stroke="var(--ai-primary)" 
                      fill="var(--ai-primary)" 
                      fillOpacity={0.6} 
                    />
                  </RadarChart>
                </ResponsiveContainer>

                {/* AI Insights */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <h4 className="font-medium">AI洞察</h4>
                  </div>
                  {selectedSupplier.aiInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 surface-variant rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4 mt-4">
          {selectedSupplier && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedSupplier.dimensions).map(([key, value]) => (
                <Card key={key} className="elevation-2 border-0">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          {key === 'quality' && '质量评分'}
                          {key === 'price' && '价格评分'}
                          {key === 'delivery' && '交付评分'}
                          {key === 'service' && '服务评分'}
                          {key === 'innovation' && '创新评分'}
                          {key === 'sustainability' && '可持续性评分'}
                        </h4>
                        <div className="text-2xl font-bold ai-gradient bg-clip-text text-transparent">
                          {value}
                        </div>
                      </div>
                      <Progress value={value} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {value >= 90 && '表现卓越，行业领先水平'}
                        {value >= 80 && value < 90 && '表现优秀，超过行业平均'}
                        {value >= 70 && value < 80 && '表现良好，符合预期'}
                        {value < 70 && '有待改进，需要关注'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
