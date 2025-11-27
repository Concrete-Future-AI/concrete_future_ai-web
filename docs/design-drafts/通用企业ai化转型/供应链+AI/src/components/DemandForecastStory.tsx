import { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Sparkles,
  Target,
  AlertCircle,
  ChevronRight,
  Play,
  Download,
  Map,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import DataStoryNavigation from './DataStoryNavigation';
import AIInsightPanel from './AIInsightPanel';
import ChinaMapImproved from './ChinaMapImproved';
import PredictionScenarios from './PredictionScenarios';
import ActionRecommendations from './ActionRecommendations';
import { toast } from 'sonner@2.0.3';

export default function DemandForecastStory() {
  const [currentStep, setCurrentStep] = useState('overview');

  const storySteps = [
    {
      id: 'overview',
      title: '数据概览',
      description: '了解整体需求趋势和关键指标',
      status: currentStep === 'overview' ? 'current' as const : 'completed' as const,
      insights: '本月需求增长率达18%，超出预期'
    },
    {
      id: 'ai-analysis',
      title: 'AI深度分析',
      description: '机器学习模型解析需求驱动因素',
      status: currentStep === 'ai-analysis' ? 'current' as const : (currentStep === 'overview' ? 'locked' as const : 'completed' as const),
      insights: 'AI识别出4个关键影响因子'
    },
    {
      id: 'prediction',
      title: '未来预测',
      description: '基于多维度数据的需求预测',
      status: currentStep === 'prediction' ? 'current' as const : (['overview', 'ai-analysis'].includes(currentStep) ? 'locked' as const : 'completed' as const),
      insights: '三种场景覆盖不同可能性'
    },
    {
      id: 'action',
      title: '行动建议',
      description: '获取可执行的业务优化方案',
      status: currentStep === 'action' ? 'current' as const : 'locked' as const,
      insights: '5项优化建议，预期ROI ¥89万'
    }
  ];

  // 渐变色数据点，用于引导视觉注意力
  const forecastData = [
    { month: '10月', value: 980, isHistorical: true, trend: 'stable', color: 'slate' },
    { month: '11月', value: 1050, isHistorical: true, trend: 'up', color: 'cyan' },
    { month: '12月', value: 1200, isHistorical: true, trend: 'up', color: 'green' },
    { month: '1月', value: 1150, isHistorical: false, trend: 'stable', color: 'blue', confidence: 92 },
    { month: '2月', value: 950, isHistorical: false, trend: 'down', color: 'yellow', confidence: 88 },
    { month: '3月', value: 1380, isHistorical: false, trend: 'up', color: 'purple', confidence: 91 }
  ];

  const aiFactors = [
    {
      name: '双十一大促效应',
      impact: 35,
      color: 'from-green-500 to-emerald-500',
      confidence: 94,
      description: '电商大促带来的需求激增，历史数据显示促销期需求平均增长30-40%'
    },
    {
      name: '季节性趋势',
      impact: 20,
      color: 'from-cyan-500 to-blue-500',
      confidence: 96,
      description: '冬季为智能穿戴设备销售旺季，连续3年呈现稳定增长模式'
    },
    {
      name: '市场扩张',
      impact: 10,
      color: 'from-purple-500 to-pink-500',
      confidence: 85,
      description: '新开设3家线下体验店，预计带来10%的增量需求'
    },
    {
      name: '竞品影响',
      impact: -5,
      color: 'from-red-500 to-orange-500',
      confidence: 78,
      description: '竞品价格下调，可能导致部分客户流失'
    }
  ];

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 数据故事开场白 */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2">智能手表需求呈现强劲增长势头</h2>
            <p className="text-slate-300 mb-4">
              基于过去6个月的销售数据和AI模型分析，SKU #A1203在即将到来的促销季展现出巨大潜力。
              让我们深入数据，发现背后的故事。
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="gap-2 bg-green-500/20 text-green-400 border-green-500/50">
                <TrendingUp className="w-3 h-3" />
                需求增长 +18%
              </Badge>
              <Badge className="gap-2 bg-blue-500/20 text-blue-400 border-blue-500/50">
                <Brain className="w-3 h-3" />
                AI准确率 91.3%
              </Badge>
              <Badge className="gap-2 bg-purple-500/20 text-purple-400 border-purple-500/50">
                <Target className="w-3 h-3" />
                置信区间 ±8%
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* 核心KPI卡片组 - 使用渐变色强调重要性 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-green-300">本月实际需求</span>
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-green-400">1,200</span>
                <span className="text-sm text-slate-400">件</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-400">
                <span>↑ 18.2%</span>
                <span className="text-slate-500">vs 上月</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-blue-300">AI预测下月</span>
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-blue-400">1,380</span>
                <span className="text-sm text-slate-400">件</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-400">
                <span>↑ 15.0%</span>
                <span className="text-slate-500">环比增长</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/30 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-yellow-300">预测准确率</span>
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-yellow-400">91.3</span>
                <span className="text-sm text-slate-400">%</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-yellow-400">
                <span>↑ 2.1%</span>
                <span className="text-slate-500">持续优化中</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 交互式趋势图 - 数据故事的核心 */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="mb-1">需求趋势时间线</h3>
            <p className="text-sm text-slate-400">历史数据与AI预测的完整故事</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => toast.success('数据已导出')}>
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>

        {/* 图例说明 */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
            <span className="text-slate-400">历史实际</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
            <span className="text-slate-400">AI预测</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 bg-cyan-500/20 rounded"></div>
            <span className="text-slate-400">置信区间</span>
          </div>
        </div>

        {/* 简化图表 */}
        <div className="relative h-80">
          <svg className="w-full h-full" viewBox="0 0 700 320">
            {/* 网格线 */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="60"
                y1={40 + i * 60}
                x2="660"
                y2={40 + i * 60}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-800"
              />
            ))}

            {/* 背景分隔 - 历史vs预测 */}
            <rect
              x="60"
              y="40"
              width="315"
              height="240"
              fill="currentColor"
              className="text-slate-800/20"
            />
            <rect
              x="375"
              y="40"
              width="285"
              height="240"
              fill="currentColor"
              className="text-cyan-500/5"
            />

            {/* 置信区间 */}
            <path
              d="M 480,120 L 560,160 L 640,100 L 640,160 L 560,200 L 480,180 Z"
              fill="currentColor"
              className="text-cyan-500/20"
            />

            {/* 趋势线 */}
            <polyline
              points="120,200 220,180 320,140 420,160 520,190 620,110"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
            />

            {/* 渐变定义 */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* 数据点 */}
            {forecastData.map((point, i) => {
              const x = 120 + i * 100;
              const y = 280 - point.value / 6;
              const isHistorical = point.isHistorical;

              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    className={`cursor-pointer transition-all hover:r-10 ${
                      isHistorical ? 'fill-slate-500' : 'fill-cyan-500'
                    }`}
                    onClick={() => {
                      toast.info(`${point.month} 需求`, {
                        description: `${point.value}件 ${point.confidence ? `(置信度: ${point.confidence}%)` : ''}`
                      });
                    }}
                  />
                  <text
                    x={x}
                    y="300"
                    textAnchor="middle"
                    className="text-xs fill-slate-400"
                  >
                    {point.month}
                  </text>
                </g>
              );
            })}

            {/* Y轴标签 */}
            {[1400, 1200, 1000, 800, 600].map((val, i) => (
              <text
                key={i}
                x="50"
                y={45 + i * 60}
                textAnchor="end"
                className="text-xs fill-slate-400"
              >
                {val}
              </text>
            ))}

            {/* 重点标注 */}
            <text x="620" y="95" className="text-xs fill-purple-400">
              ↑ 促销高峰
            </text>
          </svg>
        </div>

        {/* 数据洞察文本 */}
        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-cyan-400 mb-1">关键洞察</h4>
              <p className="text-sm text-slate-300">
                数据显示明显的季节性模式，第四季度需求持续走高。AI预测3月将迎来新一轮增长高峰，
                主要受春季新品发布和促销活动驱动。建议提前2周开始备货。
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 下一步引导 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 h-12"
          onClick={() => setCurrentStep('ai-analysis')}
        >
          <span>继续探索：AI如何分析这些数据？</span>
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );

  const renderAIAnalysis = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* AI分析故事引导 */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2">AI深度学习模型揭示需求驱动因素</h2>
            <p className="text-slate-300 mb-4">
              我们的机器学习算法分析了超过50个变量，包括历史销售、季节性、促销活动、竞品动态、
              市场趋势等，识别出以下关键影响因子及其贡献度。
            </p>
          </div>
        </div>
      </Card>

      {/* AI因子分析卡片 */}
      <div className="grid grid-cols-1 gap-4">
        {aiFactors.map((factor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className="bg-slate-900 border-slate-800 p-5 hover:border-slate-700 transition-all">
              <div className="flex items-start gap-4">
                {/* 影响力可视化 */}
                <div className={`w-16 h-16 bg-gradient-to-br ${factor.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <span className="text-2xl text-white">
                    {factor.impact > 0 ? '+' : ''}{factor.impact}%
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3>{factor.name}</h3>
                    <Badge variant="outline" className="shrink-0">
                      置信度 {factor.confidence}%
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{factor.description}</p>

                  {/* 贡献度条形图 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>影响强度</span>
                      <span>{Math.abs(factor.impact)}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${factor.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.abs(factor.impact) * 2}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI模型解释 */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          AI模型工作原理
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-slate-800 rounded-lg border-l-2 border-blue-500">
            <div className="text-blue-400 mb-2">步骤 1: 数据采集</div>
            <p className="text-slate-400">整合历史销售、市场、天气等50+维度数据</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border-l-2 border-cyan-500">
            <div className="text-cyan-400 mb-2">步骤 2: 特征工程</div>
            <p className="text-slate-400">提取时间序列特征、季节性模式和异常事件</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border-l-2 border-purple-500">
            <div className="text-purple-400 mb-2">步骤 3: 模型预测</div>
            <p className="text-slate-400">使用LSTM神经网络生成多步预测和置信区间</p>
          </div>
        </div>
      </Card>

      {/* 继续按钮 */}
      <Button
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 h-12"
        onClick={() => {
          // 解锁下一步
          setCurrentStep('prediction');
          toast.success('已解锁未来预测视图');
        }}
      >
        <span>查看基于AI分析的未来预测</span>
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 'overview':
        return renderOverview();
      case 'ai-analysis':
        return renderAIAnalysis();
      case 'prediction':
        return (
          <PredictionScenarios
            onComplete={() => {
              setCurrentStep('action');
              toast.success('已解锁行动建议');
            }}
          />
        );
      case 'action':
        return <ActionRecommendations />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="h-full p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            AI需求预测 - 数据故事
          </h1>
          <p className="text-sm text-slate-400">
            通过数据叙事，深入理解需求预测背后的逻辑
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Brain className="w-3 h-3 text-purple-400" />
            AI驱动
          </Badge>
          <Badge variant="outline" className="gap-2">
            <Play className="w-3 h-3 text-green-400" />
            交互式
          </Badge>
        </div>
      </div>

      {/* 主内容区域 - 三栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧：数据故事导航 */}
        <div className="lg:col-span-1">
          <DataStoryNavigation
            steps={storySteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>

        {/* 中间：故事内容 */}
        <div className="lg:col-span-2">
          {renderContent()}
        </div>

        {/* 右侧：AI洞察面板 */}
        <div className="lg:col-span-1">
          <AIInsightPanel module="demand-forecast" />
        </div>
      </div>
    </div>
  );
}