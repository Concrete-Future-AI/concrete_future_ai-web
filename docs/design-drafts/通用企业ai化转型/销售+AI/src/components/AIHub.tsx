import { useState } from 'react';
import { Brain, Sparkles, Mail, CheckSquare, Zap, MessageSquare, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AIActionCards } from './AIActionCards';
import { AIEmailAssistant } from './AIEmailAssistant';
import { AITaskPrioritizer } from './AITaskPrioritizer';
import { AIInsightsPanel } from './AIInsightsPanel';
import { AIWorkflowSuggestions } from './AIWorkflowSuggestions';
import { motion } from 'motion/react';

export function AIHub() {
  const [activeTab, setActiveTab] = useState('insights');

  const aiFeatures = [
    {
      id: 'insights',
      icon: Brain,
      label: '智能洞察',
      description: '7个AI分析',
      color: 'from-primary to-orange-500'
    },
    {
      id: 'actions',
      icon: Zap,
      label: '行动建议',
      description: '5个待处理',
      color: 'from-accent to-green-500'
    },
    {
      id: 'tasks',
      icon: CheckSquare,
      label: '任务优先级',
      description: '6个任务',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'email',
      icon: Mail,
      label: '邮件助手',
      description: '智能生成',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'automation',
      icon: Sparkles,
      label: '自动化',
      description: '5个流程',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background via-secondary/10 to-background min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-xl">
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">AI 功能中心</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          集成了7大AI驱动的智能功能，助力您的销售团队提升效率、预测趋势、智能决策
        </p>
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {aiFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveTab(feature.id)}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                activeTab === feature.id
                  ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg scale-105'
                  : 'border-border hover:border-primary/50 bg-card hover:shadow-md'
              }`}
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md ${
                activeTab === feature.id ? 'scale-110' : ''
              } transition-transform`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{feature.label}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Content Area */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* AI Insights */}
        <TabsContent value="insights" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AIInsightsPanel context="dashboard" />
          </motion.div>
        </TabsContent>

        {/* AI Actions */}
        <TabsContent value="actions" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AIActionCards />
          </motion.div>
        </TabsContent>

        {/* Task Prioritizer */}
        <TabsContent value="tasks" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AITaskPrioritizer />
          </motion.div>
        </TabsContent>

        {/* Email Assistant */}
        <TabsContent value="email" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AIEmailAssistant />
          </motion.div>
        </TabsContent>

        {/* Automation */}
        <TabsContent value="automation" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AIWorkflowSuggestions />
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="border-border rounded-2xl bg-gradient-to-br from-card to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">92%</div>
                <div className="text-xs text-muted-foreground">AI准确率</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border rounded-2xl bg-gradient-to-br from-card to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl gradient-success flex items-center justify-center shadow-md">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">156</div>
                <div className="text-xs text-muted-foreground">成功预测</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border rounded-2xl bg-gradient-to-br from-card to-purple-500/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">45h</div>
                <div className="text-xs text-muted-foreground">本月节省时间</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border rounded-2xl bg-gradient-to-br from-card to-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">+34%</div>
                <div className="text-xs text-muted-foreground">业绩提升</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
