import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  FileText,
  Sparkles,
  TrendingUp,
  Target,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Star,
  ThumbsUp,
  Copy,
  Play,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Playbook {
  id: string;
  name: string;
  description: string;
  industry: string;
  dealStage: string;
  successRate: number;
  usedCount: number;
  avgDealSize: string;
  scenario: string;
  steps: PlaybookStep[];
  talkingPoints: string[];
  objectionHandling: ObjectionHandler[];
  tips: string[];
}

interface PlaybookStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: any;
}

interface ObjectionHandler {
  objection: string;
  response: string;
}

export default function AIPlaybookRecommender() {
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const playbooks: Playbook[] = [
    {
      id: 'enterprise-discovery',
      name: '企业级客户发现式销售',
      description: '适用于大型企业客户的深度需求挖掘和方案设计',
      industry: '金融科技',
      dealStage: '需求分析',
      successRate: 76,
      usedCount: 142,
      avgDealSize: '¥85万',
      scenario: '适用于首次接触大型企业客户，需要深入了解客户需求并建立信任关系',
      steps: [
        {
          id: 1,
          title: '建立联系',
          description: '通过共同话题建立初步信任，了解对方角色和关注点',
          duration: '5-10分钟',
          icon: MessageSquare
        },
        {
          id: 2,
          title: '现状诊断',
          description: '询问当前业务流程、痛点和挑战，倾听多于讲述',
          duration: '15-20分钟',
          icon: Target
        },
        {
          id: 3,
          title: '影响分析',
          description: '帮助客户量化问题的影响，建立改变的紧迫感',
          duration: '10-15分钟',
          icon: TrendingUp
        },
        {
          id: 4,
          title: '愿景构建',
          description: '共同描绘理想状态，让客户看到美好未来',
          duration: '10分钟',
          icon: Star
        },
        {
          id: 5,
          title: '下一步行动',
          description: '明确具体的后续步骤和时间表',
          duration: '5分钟',
          icon: CheckCircle2
        }
      ],
      talkingPoints: [
        '贵司在[行业]领域的发展很快，想了解下您目前在[痛点领域]方面遇到的主要挑战？',
        '很多类似规模的企业都提到[具体问题]，不知道您这边是否也有类似的情况？',
        '如果这个问题能够解决，您觉得会对业务带来什么样的改变？',
        '我们有个客户[案例]，他们通过[方案]实现了[结果]，您觉得这个方向符合您的预期吗？',
        '为了更好地为您设计方案，我建议我们安排一次深入的需求调研会议，您看什么时间方便？'
      ],
      objectionHandling: [
        {
          objection: '我们现在还不着急',
          response: '理解您的想法。不过我们的客户反馈，越早解决这个问题，节省的成本和提升的效率越明显。我们可以先做个简单的评估，看看对您的业务能带来多大价值，这样您也有更充分的信息来做决策。'
        },
        {
          objection: '价格太贵了',
          response: '我理解您对投资的关注。让我们换个角度看，如果这个问题继续存在，每个月会造成多少损失？我们的客户平均3个月就能回本，之后就是纯收益了。要不我为您做个详细的ROI分析？'
        },
        {
          objection: '需要和团队商量',
          response: '非常理解，这确实需要团队共识。为了帮助您更好地向团队介绍，我准备一份简要的方案说明和投资回报分析，这样能帮助您的团队更快做出决策。您看这周三我们能不能一起过一遍这份材料？'
        }
      ],
      tips: [
        '前期多问少说，问题比答案更重要',
        '用客户的语言，不要过度使用专业术语',
        '记录客户的原话，后续跟进时引用',
        '关注决策人和影响者，了解决策流程',
        '每次沟通都要确认下一步具体行动'
      ]
    },
    {
      id: 'smb-quick-close',
      name: '中小企业快速成交',
      description: '适用于中小企业的高效销售流程，快速推进成交',
      industry: '通用',
      dealStage: '方案演示',
      successRate: 68,
      usedCount: 284,
      avgDealSize: '¥12万',
      scenario: '适用于决策链条短、需求明确的中小企业客户',
      steps: [
        {
          id: 1,
          title: '快速建联',
          description: '简短介绍，快速切入主题',
          duration: '3-5分钟',
          icon: Phone
        },
        {
          id: 2,
          title: '需求确认',
          description: '确认客户核心需求和预算范围',
          duration: '5-8分钟',
          icon: CheckCircle2
        },
        {
          id: 3,
          title: '方案展示',
          description: '演示核心功能，强调价值和ROI',
          duration: '10-15分钟',
          icon: Play
        },
        {
          id: 4,
          title: '异议处理',
          description: '快速响应客户疑虑',
          duration: '5分钟',
          icon: MessageSquare
        },
        {
          id: 5,
          title: '促成交易',
          description: '提供限时优惠，推动立即决策',
          duration: '5分钟',
          icon: Star
        }
      ],
      talkingPoints: [
        '您提到的[需求]，我们的方案可以在[时间]内帮您实现',
        '我们有很多和您规模类似的客户，平均[时间]就能看到效果',
        '这个月我们有特别优惠，可以为您节省[金额]',
        '我们的实施周期只需要[时间]，不会影响您的日常运营',
        '今天签约的话，我可以为您争取[额外价值]'
      ],
      objectionHandling: [
        {
          objection: '让我考虑一下',
          response: '完全理解。为了帮助您更好地评估，我这边有个简单的对比表，列出了使用前后的差异。另外，这个月的优惠只剩3天了，如果错过会比较可惜。要不我明天再给您电话，看看还有什么疑问？'
        },
        {
          objection: '功能太复杂了',
          response: '我理解您的顾虑。其实我们的设计就是为了简单易用，您需要的核心功能上手只要10分钟。我们提供免费培训，保证您的团队一周内就能熟练使用。要不要现在就试用一下？'
        }
      ],
      tips: [
        '节奏要快，避免拖延决策',
        '强调限时优惠，制造紧迫感',
        '准备好快速响应常见问题',
        '当场能解决的问题不过夜',
        '签约流程要简单快捷'
      ]
    },
    {
      id: 'renewal-upsell',
      name: '客户续约与增购',
      description: '针对现有客户的续约和升级销售策略',
      industry: '通用',
      dealStage: '续约',
      successRate: 82,
      usedCount: 196,
      avgDealSize: '¥45万',
      scenario: '适用于合同即将到期或有增购需求的现有客户',
      steps: [
        {
          id: 1,
          title: '使用回顾',
          description: '回顾客户使用情况和取得的成果',
          duration: '5-8分钟',
          icon: TrendingUp
        },
        {
          id: 2,
          title: '价值强化',
          description: '用数据展示带来的实际价值',
          duration: '8-10分钟',
          icon: Star
        },
        {
          id: 3,
          title: '痛点挖掘',
          description: '了解当前还有哪些未解决的问题',
          duration: '10分钟',
          icon: Target
        },
        {
          id: 4,
          title: '升级建议',
          description: '推荐更高版本或新功能',
          duration: '10-15分钟',
          icon: Sparkles
        },
        {
          id: 5,
          title: '续约确认',
          description: '确定续约条款和升级方案',
          duration: '5-10分钟',
          icon: CheckCircle2
        }
      ],
      talkingPoints: [
        '这一年来，您的团队通过我们的系统节省了[时间/成本]，业绩提升了[百分比]',
        '我注意到您主要使用了[功能]，新版本的[功能]可以进一步提升[价值]',
        '很多客户升级后，[指标]平均提升了[百分比]',
        '考虑到您的业务增长，我建议升级到[版本]，可以支持[更多需求]',
        '如果现在续约，我可以为您锁定当前价格，避免明年涨价'
      ],
      objectionHandling: [
        {
          objection: '使用率不高，考虑不续约',
          response: '我理解您的顾虑。让我们分析一下使用率低的原因。通常是因为团队还不够熟悉某些功能。我们可以安排一次免费的深度培训，帮助您的团队充分发挥系统价值。很多客户培训后使用率提升了300%。'
        },
        {
          objection: '价格涨了太多',
          response: '我理解价格是重要考量。但让我们看看您获得了什么：过去一年系统帮您节省了[具体成本]，新版本还增加了[新功能]。相比市场同类产品，我们的性价比仍然最高。而且作为老客户，我可以为您申请特别折扣。'
        }
      ],
      tips: [
        '提前2-3个月开始续约沟通',
        '准备详细的使用数据报告',
        '突出客户获得的实际价值',
        '了解客户业务变化和新需求',
        '提供老客户专属优惠'
      ]
    }
  ];

  const analyzeAndRecommend = () => {
    setIsAnalyzing(true);
    toast.info('AI正在分析最佳剧本...');
    
    setTimeout(() => {
      setSelectedPlaybook(playbooks[0]);
      setIsAnalyzing(false);
      toast.success('AI已为您推荐最佳销售剧本！');
    }, 2000);
  };

  const usePlaybook = (playbook: Playbook) => {
    toast.success(`已应用"${playbook.name}"剧本`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-pink-700 flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-neutral-900">AI销售剧本</h3>
                <p className="text-sm text-neutral-500">基于成功案例的智能销售策略推荐</p>
              </div>
            </div>
          </div>
          <Button
            onClick={analyzeAndRecommend}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 rounded-xl shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                AI推荐剧本
              </>
            )}
          </Button>
        </div>

        {/* 剧本列表 */}
        <div className="space-y-3">
          {playbooks.map((playbook) => (
            <motion.div
              key={playbook.id}
              whileHover={{ scale: 1.01 }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPlaybook?.id === playbook.id
                  ? 'border-pink-300 bg-gradient-to-r from-pink-50 to-rose-50'
                  : 'border-neutral-200 bg-white hover:border-pink-200'
              }`}
              onClick={() => setSelectedPlaybook(playbook)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-sm text-neutral-900 mb-1">{playbook.name}</h4>
                  <p className="text-xs text-neutral-600">{playbook.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0 ml-2" />
              </div>
              
              <div className="flex items-center gap-3 text-xs">
                <Badge variant="outline" className="rounded-full">
                  {playbook.industry}
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {playbook.dealStage}
                </Badge>
                <span className="text-neutral-500">使用 {playbook.usedCount} 次</span>
                <span className="flex items-center gap-1 text-teal-600">
                  <TrendingUp className="w-3 h-3" />
                  {playbook.successRate}% 成功率
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* 剧本详情 */}
      <AnimatePresence>
        {selectedPlaybook && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* 剧本概览 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-neutral-900 mb-2">{selectedPlaybook.name}</h3>
                  <p className="text-sm text-neutral-600">{selectedPlaybook.scenario}</p>
                </div>
                <Button
                  onClick={() => usePlaybook(selectedPlaybook)}
                  className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 rounded-xl"
                >
                  <Play className="w-4 h-4 mr-2" />
                  使用此剧本
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    <span className="text-xs text-teal-700">成功率</span>
                  </div>
                  <div className="text-teal-900">{selectedPlaybook.successRate}%</div>
                  <Progress value={selectedPlaybook.successRate} className="h-1 mt-2" />
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-700">使用次数</span>
                  </div>
                  <div className="text-blue-900">{selectedPlaybook.usedCount} 次</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="text-xs text-purple-700">平均交易额</span>
                  </div>
                  <div className="text-purple-900">{selectedPlaybook.avgDealSize}</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-orange-700">适用阶段</span>
                  </div>
                  <div className="text-sm text-orange-900">{selectedPlaybook.dealStage}</div>
                </div>
              </div>
            </Card>

            {/* 执行步骤 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <h3 className="text-neutral-900 mb-4">执行步骤</h3>
              <div className="space-y-3">
                {selectedPlaybook.steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.id}
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-pink-700 flex items-center justify-center text-white flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm text-neutral-900">
                            步骤 {idx + 1}: {step.title}
                          </h4>
                          <Badge variant="outline" className="rounded-full text-xs">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-xs text-neutral-600">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* 推荐话术 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-neutral-900">推荐话术</h3>
              </div>
              <div className="space-y-2">
                {selectedPlaybook.talkingPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200 group hover:bg-blue-100 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-blue-900 flex-1">{point}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        navigator.clipboard.writeText(point);
                        toast.success('话术已复制');
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* 异议处理 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-orange-600" />
                <h3 className="text-neutral-900">异议处理</h3>
              </div>
              <div className="space-y-3">
                {selectedPlaybook.objectionHandling.map((handler, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-orange-600">❓</span>
                      <h4 className="text-sm text-orange-900">{handler.objection}</h4>
                    </div>
                    <div className="flex items-start gap-2 ml-6">
                      <span className="text-teal-600">💡</span>
                      <p className="text-sm text-orange-700">{handler.response}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 专家建议 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-neutral-900">专家建议</h3>
              </div>
              <div className="space-y-2">
                {selectedPlaybook.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-purple-900">{tip}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
