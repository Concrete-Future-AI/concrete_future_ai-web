import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, ChevronRight, X, BookOpen, Rocket, Shield, Database, Code, Settings } from 'lucide-react';
import { Progress } from './ui/progress';

interface OnboardingGuideProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 1,
    title: '欢迎使用智核平台',
    icon: Rocket,
    description: '智核 (Aether Prime) 是企业级私有化大模型基础设施与治理平台',
    content: (
      <div className="space-y-4">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <div className="text-sm text-blue-300">平台核心优势</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><span className="text-white">100% 数据不出域</span>：金融级安全保障，所有数据在企业内网处理</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><span className="text-white">最新模型支持</span>：内置 DeepSeek-V3、Qwen-2.5、GLM-4 等主流模型</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><span className="text-white">全生命周期管理</span>：从模型部署、微调到应用开发的端到端支持</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><span className="text-white">集中式治理</span>：统一的资源管理、成本分摊、安全审计</span>
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3">
            <div className="text-xs text-slate-400">部署模型总数</div>
            <div className="mt-1 text-xl text-white">12+</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3">
            <div className="text-xs text-slate-400">内置应用</div>
            <div className="mt-1 text-xl text-white">6+</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: '平台总览与监控',
    icon: BookOpen,
    description: '实时了解平台运行状态、资源使用和成本分布',
    content: (
      <div className="space-y-4">
        <div className="text-sm text-slate-300">
          在 <span className="text-blue-400">平台总览</span> 页面，您可以：
        </div>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
            <span><span className="text-white">监控 GPU 集群利用率</span>：实时查看 H100/A100 等 GPU 资源使用情况</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
            <span><span className="text-white">查看模型调用统计</span>：掌握各模型的调用量、Token 消耗和响应时延</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
            <span><span className="text-white">成本中心分析</span>：按部门/项目查看资源成本分配</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
            <span><span className="text-white">审计日志流</span>：实时追踪关键操作，确保合规性</span>
          </li>
        </ul>
        
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3">
          <div className="text-xs text-purple-300">💡 提示</div>
          <div className="mt-1 text-xs text-slate-400">
            点击右上角的时间范围选择器，可切换查看过去 1 小时、24 小时、7 天或 30 天的数据。
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: '模型中心与知识库',
    icon: Database,
    description: '管理基础模型、部署新模型、配置 RAG 知识库',
    content: (
      <div className="space-y-4">
        <div className="text-sm text-slate-300">
          <span className="text-blue-400">模型中心</span> 提供强大的模型管理能力：
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Database className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm text-white">基础模型库</div>
            </div>
            <div className="text-xs text-slate-400">
              查看已部署的 12+ 模型，包括 DeepSeek-V3 (671B)、Qwen-Max (72B)、GLM-4-Plus 等。每个模型卡片显示参数量、GPU配置、调用量和延迟等关键指标。
            </div>
          </div>
          
          <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm text-white">RAG 知识库管理</div>
            </div>
            <div className="text-xs text-slate-400">
              连接 Confluence、SharePoint、GitLab、Jira 等企业知识源，自动向量化并同步。支持实时查看同步状态和重新同步操作。
            </div>
          </div>
          
          <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Settings className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm text-white">MLOps 工作流</div>
            </div>
            <div className="text-xs text-slate-400">
              创建模型微调任务，实时监控训练进度、GPU 利用率、损失曲线。完成后一键部署到生产环境。
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: '安全策略与合规',
    icon: Shield,
    description: '配置 DLP 规则和模型护栏，确保数据安全和内容合规',
    content: (
      <div className="space-y-4">
        <div className="text-sm text-slate-300">
          <span className="text-blue-400">安全策略中心</span> 是平台的安全核心：
        </div>
        
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <div className="text-sm text-red-300 mb-2">🛡️ 数据丢失防护 (DLP)</div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>• 预置 5+ 常用规则：身份证、银行卡、手机号、邮箱、IP 地址检测</li>
            <li>• 支持自定义正则表达式规则，可设置阻止、警告或记录动作</li>
            <li>• 实时测试功能：输入测试文本，立即查看触发哪条规则</li>
            <li>• 所有 Prompt 在发送给模型前自动扫描，确保敏感数据不出域</li>
          </ul>
        </div>
        
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <div className="text-sm text-purple-300 mb-2">🚧 模型护栏 (Guardrails)</div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>• 6 大类护栏：政治敏感、暴力血腥、色情低俗、代码安全、品牌一致性、法律合规</li>
            <li>• 模型输出在返回用户前自动审查，违规内容会被拦截并重新生成</li>
            <li>• 可针对不同风险级别（高/中/低）独立配置启用状态</li>
          </ul>
        </div>
        
        <div className="text-xs text-slate-500">
          📊 所有安全事件自动记录到审计日志，支持按事件类型过滤和导出。
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: '开发者门户与 API',
    icon: Code,
    description: '获取 API Key、调试接口、查看文档',
    content: (
      <div className="space-y-4">
        <div className="text-sm text-slate-300">
          <span className="text-blue-400">开发者门户</span> 为技术人员提供完整的开发支持：
        </div>
        
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 h-6 w-6 rounded bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-blue-400">1</span>
            </div>
            <div>
              <div className="text-white">生成 API Key</div>
              <div className="text-xs text-slate-400 mt-1">
                在"用户与访问控制"页面创建 API Key，支持设置权限范围、过期时间和调用配额。
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="mt-0.5 h-6 w-6 rounded bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-blue-400">2</span>
            </div>
            <div>
              <div className="text-white">API 实验场</div>
              <div className="text-xs text-slate-400 mt-1">
                在线测试 API 调用，实时查看请求/响应、Token 消耗、延迟等信息。
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="mt-0.5 h-6 w-6 rounded bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-blue-400">3</span>
            </div>
            <div>
              <div className="text-white">SDK 与文档</div>
              <div className="text-xs text-slate-400 mt-1">
                提供 Python、Java、Node.js 等多语言 SDK，以及详细的 API 参考文档和示例代码。
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3 font-mono text-xs">
          <div className="text-slate-500 mb-2"># Python SDK 示例</div>
          <div className="text-green-400">from</div> <div className="text-blue-300 inline">aether_sdk</div> <div className="text-green-400 inline">import</div> <div className="text-blue-300 inline">AetherClient</div>
          <br />
          <div className="text-slate-400">client = AetherClient(api_key="your_api_key")</div>
          <br />
          <div className="text-slate-400">response = client.chat(</div>
          <div className="text-slate-400 ml-4">model="Qwen-Max",</div>
          <div className="text-slate-400 ml-4">messages=[{"{'role': 'user', 'content': '你好'}"}]</div>
          <div className="text-slate-400">)</div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: '融合应用中心',
    icon: Rocket,
    description: '使用内置的智能应用，无需编程即可享受 AI 能力',
    content: (
      <div className="space-y-4">
        <div className="text-sm text-slate-300">
          平台内置 6+ 开箱即用的企业级应用：
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-700 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-3">
            <div className="text-sm text-white mb-1">智问 ChatDocs</div>
            <div className="text-xs text-slate-400">企业知识库智能问答，支持引用溯源</div>
          </div>
          
          <div className="rounded-lg border border-slate-700 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-3">
            <div className="text-sm text-white mb-1">码匠 CodeCopilot</div>
            <div className="text-xs text-slate-400">智能代码助手，代码生成与审查</div>
          </div>
          
          <div className="rounded-lg border border-slate-700 bg-gradient-to-br from-pink-500/10 to-pink-600/5 p-3">
            <div className="text-sm text-white mb-1">思创 IdeaSpark</div>
            <div className="text-xs text-slate-400">营销文案生成，符合品牌调性</div>
          </div>
          
          <div className="rounded-lg border border-slate-700 bg-gradient-to-br from-green-500/10 to-green-600/5 p-3">
            <div className="text-sm text-white mb-1">数析 DataInsight</div>
            <div className="text-xs text-slate-400">自然语言查询，自动生成 SQL</div>
          </div>
        </div>
        
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <div className="text-sm text-green-300 mb-2">🎯 快速开始</div>
          <div className="text-xs text-slate-400">
            点击左侧导航的"融合应用"，选择任一应用即可立即使用。所有应用都经过安全审计，符合企业合规要求。
          </div>
        </div>
      </div>
    )
  }
];

export function OnboardingGuide({ open, onClose }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-slate-700 bg-slate-900 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <StepIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">{step.title}</DialogTitle>
                <DialogDescription className="text-slate-400 mt-1">
                  {step.description}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-slate-400">
                步骤 {currentStep + 1} / {steps.length}
              </div>
              <div className="text-xs text-slate-400">
                {Math.round(progress)}% 完成
              </div>
            </div>
            <Progress value={progress} className="h-1.5 bg-slate-800" />
          </div>

          {/* Step Navigation */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all whitespace-nowrap ${
                    idx === currentStep
                      ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                      : idx < currentStep
                      ? 'border-green-500/30 bg-green-500/5 text-green-400'
                      : 'border-slate-700 bg-slate-800/30 text-slate-500'
                  }`}
                >
                  {idx < currentStep ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span className="text-xs">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
            {step.content}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-700 pt-4">
          <div className="flex items-center gap-2">
            {currentStep === 0 && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-slate-400 hover:text-white"
              >
                跳过引导
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              >
                上一步
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  下一步
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                '开始使用'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
