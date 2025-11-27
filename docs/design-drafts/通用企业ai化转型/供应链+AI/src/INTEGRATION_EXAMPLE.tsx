/**
 * 链景 Synapse SC - AI功能集成示例
 * 
 * 本文件展示如何在现有模块中集成新的AI交互功能
 */

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import AIWhatIfAnalyzer from './components/AIWhatIfAnalyzer';
import AIAnomalyDetector from './components/AIAnomalyDetector';
import AISmartChart from './components/AISmartChart';
import AIChat from './components/AIChat';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Brain, Zap, AlertTriangle, BarChart } from 'lucide-react';

// =============================================================================
// 示例1：在需求预测模块中集成AI功能
// =============================================================================

export function DemandForecastWithAI() {
  const [showAIPanel, setShowAIPanel] = useState(false);

  // 模拟需求数据
  const demandData = [
    { name: '1月', value: 850, predicted: 880, forecast: 900 },
    { name: '2月', value: 920, predicted: 900, forecast: 950 },
    { name: '3月', value: 1200, predicted: 980, forecast: 1000 },
    { name: '4月', value: 1050, predicted: 1020, forecast: 1100 },
    { name: '5月', value: 1380, predicted: 1100, forecast: 1200 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1>AI需求预测</h1>
        <Button
          onClick={() => setShowAIPanel(!showAIPanel)}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
          <Brain className="w-4 h-4 mr-2" />
          {showAIPanel ? '隐藏AI面板' : '显示AI面板'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主内容区 */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI智能图表 */}
          <AISmartChart
            data={demandData}
            type="line"
            title="需求趋势分析"
            dataKey="value"
            showPrediction={true}
            showForecast={true}
            aiEnabled={true}
            onDataPointClick={(point) => {
              console.log('User clicked:', point);
            }}
          />

          {/* Tabs: 常规视图 vs What-If分析 */}
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">数据总览</TabsTrigger>
              <TabsTrigger value="whatif">What-If分析</TabsTrigger>
              <TabsTrigger value="anomaly">异常检测</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="p-6">
                <h3 className="mb-4">需求概览</h3>
                <p className="text-slate-400">
                  常规数据展示内容...
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="whatif">
              {/* AI What-If 分析器 */}
              <AIWhatIfAnalyzer
                module="demand"
                onApply={(params) => {
                  console.log('Applying parameters:', params);
                  // 在这里应用参数到系统
                }}
              />
            </TabsContent>

            <TabsContent value="anomaly">
              {/* AI 异常检测 */}
              <AIAnomalyDetector
                module="demand"
                autoDetect={true}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI侧边栏 */}
        {showAIPanel && (
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <AIChat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// 示例2：在库存优化模块中集成AI功能
// =============================================================================

export function InventoryOptimizationWithAI() {
  // 库存数据
  const inventoryData = [
    { name: 'SKU-A', value: 850, predicted: 900 },
    { name: 'SKU-B', value: 620, predicted: 700 },
    { name: 'SKU-C', value: 1450, predicted: 1200 },
    { name: 'SKU-D', value: 380, predicted: 400 },
    { name: 'SKU-E', value: 920, predicted: 850 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1>AI库存优化</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：图表 + What-If */}
        <div className="space-y-6">
          <AISmartChart
            data={inventoryData}
            type="bar"
            title="SKU库存水位"
            dataKey="value"
            showPrediction={true}
            aiEnabled={true}
          />

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3>快速优化</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              使用AI模拟不同补货策略的影响
            </p>
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
              打开What-If分析器
            </Button>
          </Card>
        </div>

        {/* 右侧：异常检测 */}
        <div>
          <AIAnomalyDetector
            module="inventory"
            autoDetect={true}
          />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 示例3：在物流调度模块中集成AI功能
// =============================================================================

export function LogisticsDispatchWithAI() {
  const [activeTab, setActiveTab] = useState<'map' | 'whatif' | 'anomaly'>('map');

  const deliveryData = [
    { name: '北京', value: 18, predicted: 20 },
    { name: '上海', value: 16, predicted: 18 },
    { name: '广州', value: 32, predicted: 18 },  // 异常值
    { name: '成都', value: 22, predicted: 24 },
    { name: '武汉', value: 19, predicted: 20 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1>AI智慧物流</h1>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'map' ? 'default' : 'outline'}
            onClick={() => setActiveTab('map')}
          >
            <BarChart className="w-4 h-4 mr-2" />
            可视化
          </Button>
          <Button
            variant={activeTab === 'whatif' ? 'default' : 'outline'}
            onClick={() => setActiveTab('whatif')}
          >
            <Zap className="w-4 h-4 mr-2" />
            What-If
          </Button>
          <Button
            variant={activeTab === 'anomaly' ? 'default' : 'outline'}
            onClick={() => setActiveTab('anomaly')}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            异常检测
          </Button>
        </div>
      </div>

      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AISmartChart
              data={deliveryData}
              type="bar"
              title="各区域配送时效（小时）"
              dataKey="value"
              showPrediction={true}
              aiEnabled={true}
            />
          </div>
          <Card className="p-4">
            <h3 className="mb-4">AI建议</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                <p className="text-red-400 mb-1">⚠️ 广州线路异常</p>
                <p className="text-slate-400">时效延长78%，建议切换备用承运商</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <p className="text-blue-400 mb-1">💡 优化建议</p>
                <p className="text-slate-400">启用AI智能调度可降本15-20%</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'whatif' && (
        <AIWhatIfAnalyzer
          module="logistics"
          onApply={(params) => {
            console.log('Applying logistics params:', params);
          }}
        />
      )}

      {activeTab === 'anomaly' && (
        <AIAnomalyDetector
          module="logistics"
          autoDetect={true}
        />
      )}
    </div>
  );
}

// =============================================================================
// 示例4：全局AI助手 - 浮动窗口
// =============================================================================

export function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 浮动按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <Brain className="w-6 h-6 text-white" />
      </button>

      {/* AI助手窗口 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] z-50 shadow-2xl rounded-lg overflow-hidden">
          <AIChat />
        </div>
      )}
    </>
  );
}

// =============================================================================
// 示例5：综合仪表盘 - 所有AI功能集成
// =============================================================================

export function ComprehensiveAIDashboard() {
  const [selectedModule, setSelectedModule] = useState<'demand' | 'inventory' | 'logistics'>('demand');

  return (
    <div className="h-screen flex">
      {/* 左侧主内容 */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <h1>AI供应链指挥中心</h1>
            <div className="flex gap-2">
              {['demand', 'inventory', 'logistics'].map((module) => (
                <Button
                  key={module}
                  size="sm"
                  variant={selectedModule === module ? 'default' : 'outline'}
                  onClick={() => setSelectedModule(module as any)}
                >
                  {module === 'demand' ? '需求' : module === 'inventory' ? '库存' : '物流'}
                </Button>
              ))}
            </div>
          </div>

          {/* 顶部：异常监控 */}
          <Card className="p-4">
            <h3 className="mb-4">AI实时监控</h3>
            <AIAnomalyDetector
              module={selectedModule}
              autoDetect={true}
            />
          </Card>

          {/* 中部：What-If分析 */}
          <Card className="p-4">
            <h3 className="mb-4">What-If沙盘推演</h3>
            <AIWhatIfAnalyzer
              module={selectedModule}
              onApply={(params) => {
                console.log(`Applying ${selectedModule} params:`, params);
              }}
            />
          </Card>
        </div>
      </div>

      {/* 右侧：AI助手 */}
      <div className="w-96 border-l border-slate-800">
        <AIChat />
      </div>

      {/* 全局AI助手按钮（用于移动端或隐藏助手后） */}
      <GlobalAIAssistant />
    </div>
  );
}

// =============================================================================
// 使用说明
// =============================================================================

/**
 * 1. 在 App.tsx 中使用任一示例：
 * 
 * ```tsx
 * import { DemandForecastWithAI } from './INTEGRATION_EXAMPLE';
 * 
 * function App() {
 *   return <DemandForecastWithAI />;
 * }
 * ```
 * 
 * 2. 或者在现有模块中单独使用某个组件：
 * 
 * ```tsx
 * import AIWhatIfAnalyzer from './components/AIWhatIfAnalyzer';
 * 
 * // 在你的组件中
 * <AIWhatIfAnalyzer 
 *   module="demand"
 *   onApply={(params) => {
 *     // 应用参数
 *   }}
 * />
 * ```
 * 
 * 3. 配置AI助手为全局浮动窗口：
 * 
 * ```tsx
 * import { GlobalAIAssistant } from './INTEGRATION_EXAMPLE';
 * 
 * function App() {
 *   return (
 *     <>
 *       {/* 你的主要内容 *\/}
 *       <YourMainContent />
 *       
 *       {/* 全局AI助手 *\/}
 *       <GlobalAIAssistant />
 *     </>
 *   );
 * }
 * ```
 * 
 * 4. 智能图表的使用：
 * 
 * ```tsx
 * <AISmartChart
 *   data={yourData}
 *   type="line"  // 或 "bar", "area"
 *   title="图表标题"
 *   dataKey="value"
 *   showPrediction={true}
 *   showForecast={true}
 *   aiEnabled={true}
 *   onDataPointClick={(point) => {
 *     console.log('Clicked:', point);
 *   }}
 * />
 * ```
 * 
 * 5. 异常检测的使用：
 * 
 * ```tsx
 * <AIAnomalyDetector
 *   module="demand"  // 或 "inventory", "logistics", "all"
 *   autoDetect={true}  // 是否自动检测
 * />
 * ```
 */

// 导出所有示例
export {
  DemandForecastWithAI,
  InventoryOptimizationWithAI,
  LogisticsDispatchWithAI,
  GlobalAIAssistant,
  ComprehensiveAIDashboard
};
