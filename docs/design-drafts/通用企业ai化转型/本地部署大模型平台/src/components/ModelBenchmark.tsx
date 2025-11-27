import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Zap, Play, CheckCircle2, Clock, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface BenchmarkResult {
  model: string;
  latency: number;
  throughput: number;
  quality: number;
  cost: number;
  score: number;
}

interface ModelBenchmarkProps {
  open: boolean;
  onClose: () => void;
}

export function ModelBenchmark({ open, onClose }: ModelBenchmarkProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>(['DeepSeek-V3', 'Qwen-Max', 'Llama-3.3-70B']);
  const [testType, setTestType] = useState('comprehensive');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [currentPhase, setCurrentPhase] = useState('');

  const availableModels = [
    'DeepSeek-V3',
    'Qwen-Max',
    'Qwen-Plus',
    'GLM-4-Plus',
    'Llama-3.3-70B',
    'DeepSeek-Coder-V2',
    'Qwen-Coder-Plus',
    'ChatGLM-Turbo'
  ];

  const runBenchmark = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults([]);

    const phases = [
      '初始化测试环境...',
      '加载测试数据集...',
      '执行延迟测试...',
      '执行吞吐量测试...',
      '执行质量评估...',
      '计算成本效益...',
      '生成综合评分...',
      '完成测试'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setProgress(((i + 1) / phases.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // 生成模拟结果
    const mockResults: BenchmarkResult[] = selectedModels.map(model => {
      const baseScores: { [key: string]: Partial<BenchmarkResult> } = {
        'DeepSeek-V3': { latency: 2.1, throughput: 95, quality: 92, cost: 85, score: 93 },
        'Qwen-Max': { latency: 1.3, throughput: 145, quality: 94, cost: 75, score: 91 },
        'Qwen-Plus': { latency: 0.7, throughput: 280, quality: 88, cost: 92, score: 87 },
        'GLM-4-Plus': { latency: 0.5, throughput: 340, quality: 85, cost: 95, score: 84 },
        'Llama-3.3-70B': { latency: 1.2, throughput: 158, quality: 91, cost: 78, score: 89 },
        'DeepSeek-Coder-V2': { latency: 1.8, throughput: 112, quality: 96, cost: 82, score: 92 },
        'Qwen-Coder-Plus': { latency: 0.9, throughput: 245, quality: 90, cost: 88, score: 88 },
        'ChatGLM-Turbo': { latency: 0.3, throughput: 520, quality: 78, cost: 98, score: 80 }
      };

      const base = baseScores[model] || {};
      return {
        model,
        latency: base.latency || 1.0,
        throughput: base.throughput || 100,
        quality: base.quality || 85,
        cost: base.cost || 80,
        score: base.score || 85
      };
    });

    setResults(mockResults.sort((a, b) => b.score - a.score));
    setIsRunning(false);
    toast.success('性能测试完成！');
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 80) return 'from-blue-500 to-blue-600';
    if (score >= 70) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-slate-700 bg-slate-900 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span>模型性能基准测试</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            自动化测试多个模型的延迟、吞吐量、质量和成本效益
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Configuration */}
          {!isRunning && results.length === 0 && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">选择测试模型</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableModels.map(model => (
                    <div
                      key={model}
                      onClick={() => {
                        if (selectedModels.includes(model)) {
                          setSelectedModels(selectedModels.filter(m => m !== model));
                        } else {
                          setSelectedModels([...selectedModels, model]);
                        }
                      }}
                      className={`cursor-pointer rounded-lg border p-3 transition-all ${
                        selectedModels.includes(model)
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">{model}</span>
                        {selectedModels.includes(model) && (
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">测试类型</label>
                <Select value={testType} onValueChange={setTestType}>
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-800">
                    <SelectItem value="comprehensive">综合测试（全部指标）</SelectItem>
                    <SelectItem value="latency">延迟测试</SelectItem>
                    <SelectItem value="throughput">吞吐量测试</SelectItem>
                    <SelectItem value="quality">质量评估</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
                <div className="text-sm text-blue-300">测试说明</div>
                <div className="mt-2 space-y-1 text-xs text-slate-400">
                  <div>• 延迟测试：P50/P95/P99 响应时间</div>
                  <div>• 吞吐量测试：QPS（每秒请求数）</div>
                  <div>• 质量评估：基于BLEU、ROUGE等指标</div>
                  <div>• 成本效益：综合考虑性能和GPU成本</div>
                </div>
              </div>
            </div>
          )}

          {/* Running Progress */}
          {isRunning && (
            <div className="space-y-4">
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                  </div>
                  <div className="text-white">{currentPhase}</div>
                  <div className="mt-2 text-sm text-slate-400">
                    测试进度: {Math.round(progress)}%
                  </div>
                </div>
              </div>
              <Progress value={progress} className="h-2 bg-slate-800" />
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-300">测试结果</div>
                <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-400">
                  {results.length} 个模型
                </Badge>
              </div>

              {/* Winner */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border-2 border-green-500/30 bg-gradient-to-br ${getScoreGradient(results[0].score)}/10 p-5`}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-lg text-white">{results[0].model}</div>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          最佳性能
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm text-slate-300">综合得分: {results[0].score}/100</div>
                      <div className="mt-3 grid grid-cols-4 gap-3">
                        <div className="rounded border border-slate-700/50 bg-slate-900/30 p-2">
                          <div className="text-xs text-slate-400">延迟</div>
                          <div className="mt-1 text-sm text-white">{results[0].latency}s</div>
                        </div>
                        <div className="rounded border border-slate-700/50 bg-slate-900/30 p-2">
                          <div className="text-xs text-slate-400">吞吐量</div>
                          <div className="mt-1 text-sm text-white">{results[0].throughput} QPS</div>
                        </div>
                        <div className="rounded border border-slate-700/50 bg-slate-900/30 p-2">
                          <div className="text-xs text-slate-400">质量</div>
                          <div className="mt-1 text-sm text-white">{results[0].quality}/100</div>
                        </div>
                        <div className="rounded border border-slate-700/50 bg-slate-900/30 p-2">
                          <div className="text-xs text-slate-400">成本</div>
                          <div className="mt-1 text-sm text-white">{results[0].cost}/100</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Other Results */}
              <div className="space-y-2">
                {results.slice(1).map((result, idx) => (
                  <motion.div
                    key={result.model}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Card className="border-slate-700 bg-slate-800/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/50 text-sm text-slate-300">
                            #{idx + 2}
                          </div>
                          <div>
                            <div className="text-white">{result.model}</div>
                            <div className="mt-1 flex items-center gap-4 text-xs text-slate-400">
                              <span>延迟: {result.latency}s</span>
                              <span>吞吐: {result.throughput} QPS</span>
                              <span>质量: {result.quality}/100</span>
                              <span>成本: {result.cost}/100</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl ${getScoreColor(result.score)}`}>
                            {result.score}
                          </div>
                          <div className="text-xs text-slate-500">综合得分</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {!isRunning && results.length === 0 && (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              >
                取消
              </Button>
              <Button
                onClick={runBenchmark}
                disabled={selectedModels.length === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <Play className="mr-2 h-4 w-4" />
                开始测试
              </Button>
            </>
          )}
          {results.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setResults([]);
                  setProgress(0);
                }}
                className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              >
                重新测试
              </Button>
              <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                完成
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
