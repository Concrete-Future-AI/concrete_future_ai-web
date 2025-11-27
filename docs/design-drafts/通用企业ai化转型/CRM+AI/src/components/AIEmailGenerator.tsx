import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Mail, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Send, 
  Wand2,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Eye,
  Edit,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface AIEmailGeneratorProps {
  leadName?: string;
  onClose?: () => void;
}

export default function AIEmailGenerator({ leadName, onClose }: AIEmailGeneratorProps) {
  const [emailType, setEmailType] = useState('follow-up');
  const [recipient, setRecipient] = useState(leadName || '');
  const [context, setContext] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const emailTemplates = {
    'follow-up': {
      name: '跟进邮件',
      description: '会议或演示后的跟进',
      prompts: ['上周演示', '上次会议', '电话沟通后']
    },
    'introduction': {
      name: '初次联系',
      description: '首次接触新线索',
      prompts: ['产品介绍', '解决方案推荐', '行业案例']
    },
    'proposal': {
      name: '方案提议',
      description: '发送正式提案',
      prompts: ['定制方案', '报价方案', '技术方案']
    },
    'check-in': {
      name: '关怀问候',
      description: '保持联系的问候邮件',
      prompts: ['季度问候', '节日祝福', '产品更新']
    },
    'closing': {
      name: '促成交易',
      description: '推动签约的邮件',
      prompts: ['限时优惠', '最后确认', '合同发送']
    }
  };

  const generateEmail = () => {
    setIsGenerating(true);
    
    // 模拟AI生成过程
    setTimeout(() => {
      const templates: Record<string, string> = {
        'follow-up': `${recipient || '王总'}，您好！

感谢您上周参加我们的产品演示。我注意到您对我们的${context || 'AI智能分析模块'}特别感兴趣，也提出了关于系统集成方面的深入问题。

针对您提到的需求，我为您准备了以下资料：
• 与贵司现有系统的详细集成方案（附件1）
• 3个类似规模企业的成功案例研究（附件2）  
• 为贵司定制的ROI投资回报分析报告（附件3）

基于贵司的业务规模和具体需求，我们预计该解决方案可以为您带来：
✓ 数据处理效率提升 60%
✓ 人工操作时间减少 40%  
✓ 预计 3-4 个月实现投资回报

建议我们本周安排一次 30 分钟的技术对接会议，由我们的技术总监亲自为您详细讲解集成方案的技术细节。您看**明天下午3点**或**后天上午10点**，哪个时间更方便？

期待您的回复！

最好的祝愿，
李明 | 销售顾问
销速引擎 Velocity AI
电话：138-0000-0000
邮箱：liming@velocity.ai`,

        'introduction': `${recipient || '王总'}，您好！

我是销速引擎的销售顾问李明。看到贵司在${context || '智能制造领域'}的快速发展，特别想和您分享我们如何帮助类似企业提升销售效率。

**我们是谁**
销速引擎是领先的AI销售赋能平台，已服务超过500家B2B企业，帮助销售团队平均提升42%的工作效率。

**为什么联系您**
我们注意到贵司正在${context || '数字化转型阶段'}，而我们刚刚帮助3家同行业企业成功实现了：
• 线索转化率提升 35%
• 销售周期缩短 25%
• 客户流失率降低 40%

**您可能感兴趣的**
附上一份为贵司行业定制的《智能销售解决方案白皮书》，仅需5分钟阅读，就能了解如何快速提升团队业绩。

如果您有兴趣，我们可以安排15分钟简短通话，我会根据贵司的具体情况，分享更多切实可行的建议。

期待与您交流！

李明 | 销售顾问
销速引擎 Velocity AI`,

        'proposal': `${recipient || '王总'}，您好！

非常高兴能为贵司准备这份定制化的解决方案。

**方案背景**
基于我们前期的深入沟通，我充分了解到贵司在${context || '销售管理方面'}面临的挑战，特别是在线索管理、团队协作和业绩预测方面的痛点。

**核心价值**
本方案将为贵司带来：
1. **智能线索评分** - AI自动评估线索质量，优先级排序
2. **销售流程自动化** - 减少50%的行政工作时间
3. **AI预测分析** - 92%准确率的业绩预测
4. **团队协作增强** - 实时共享客户信息

**投资回报**
• 初期投资：¥48万/年
• 预计收益：¥180万/年
• ROI：375%
• 回本周期：3.2个月

**实施计划**
第1-2周：系统部署和数据迁移
第3-4周：团队培训和试运行  
第5周：正式上线和优化

**下一步**
如果您对方案认可，我们可以：
1. 安排技术团队进行详细对接
2. 确定具体实施时间表
3. 商讨合同细节

附件包含完整的技术方案和报价明细，期待您的反馈！

李明 | 销售顾问
销速引擎 Velocity AI`,

        'check-in': `${recipient || '王总'}，您好！

好久不见！距离我们上次交流已经过去了一段时间，想问候一下您和团队的近况。

**产品更新**
过去几个月，我们的平台有一些重要更新：
• 新增AI智能对话助手功能
• 邮件打开率提升至68%
• 新增12项AI自动化能力

**行业趋势**
最近我们发布了《2025 B2B销售趋势报告》，其中有几个洞察您可能会感兴趣：
• 85%的高增长企业都在使用AI销售工具
• 销售自动化可节省团队40%的时间
• ${context || '您所在的行业'}平均线索转化率为8.5%

**简单问候**
如果贵司在销售管理方面有任何新的挑战或需求，随时欢迎和我交流。哪怕只是喝杯咖啡聊聊行业趋势，我都很乐意！

祝工作顺利！

李明 | 销售顾问
销速引擎 Velocity AI`,

        'closing': `${recipient || '王总'}，您好！

我们的合作讨论已经进行了一段时间，我相信您也充分了解了销速引擎能为贵司带来的价值。

**回顾我们的讨论**
✓ 解决方案完全符合贵司需求
✓ 技术团队已完成对接和评估
✓ ROI投资回报率达到375%
✓ 实施周期仅需4周

**特别优惠**
考虑到我们愉快的沟通过程，我为贵司争取到了：
• **立减5万** - 本月签约专属优惠
• **免费升级** - 赠送价值2万的高级功能包
• **优先支持** - 专属技术支持团队
• **培训赠送** - 免费提供5天现场培训

**优惠截止**
这个特别优惠仅限**本月底前**签约的客户。

**下一步**
我已经准备好合同文件，如果您这边没有问题，我们可以：
1. 明天发送正式合同供您审阅
2. 本周内完成签约
3. 下周一启动项目实施

期待我们的正式合作！

李明 | 销售顾问  
销速引擎 Velocity AI
电话：138-0000-0000`
      };

      const generated = templates[emailType as keyof typeof templates] || templates['follow-up'];
      setGeneratedEmail(generated);
      
      // 模拟AI评分
      const score = Math.floor(Math.random() * 15) + 85;
      setAiScore(score);
      
      // 生成优化建议
      const allSuggestions = [
        '添加具体的数据支持会更有说服力',
        '建议在结尾添加明确的行动召唤',
        '可以提及一个相关的成功案例',
        '标题可以更加个性化',
        '增加紧迫感可以提高回复率',
        '可以添加社交证明增强可信度'
      ];
      
      const randomSuggestions = allSuggestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      setSuggestions(randomSuggestions);
      
      setIsGenerating(false);
      setShowPreview(true);
    }, 2000);
  };

  const regenerateEmail = () => {
    toast.info('AI正在重新生成邮件...');
    generateEmail();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast.success('邮件内容已复制到剪贴板');
  };

  const sendEmail = () => {
    toast.success('邮件发送成功！AI已记录此次互动');
  };

  const applyQuickContext = (context: string) => {
    setContext(context);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-teal-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-teal-50 border-teal-200';
    if (score >= 80) return 'bg-blue-50 border-blue-200';
    if (score >= 70) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-neutral-900">AI邮件生成器</h3>
                <p className="text-sm text-neutral-500">智能撰写个性化邮件，提升回复率</p>
              </div>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-lg">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* 邮件配置 */}
        <div className="space-y-4 mb-6">
          <div>
            <Label className="text-sm text-neutral-700 mb-2">邮件类型</Label>
            <Select value={emailType} onValueChange={setEmailType}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(emailTemplates).map(([key, template]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <span>{template.name}</span>
                      <span className="text-xs text-neutral-400">- {template.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm text-neutral-700 mb-2">收件人</Label>
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="输入收件人姓名"
              className="rounded-xl"
            />
          </div>

          <div>
            <Label className="text-sm text-neutral-700 mb-2">背景信息</Label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="输入邮件背景或关键信息，AI会根据这些信息生成更个性化的内容"
              className="rounded-xl min-h-[80px]"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {emailTemplates[emailType as keyof typeof emailTemplates]?.prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => applyQuickContext(prompt)}
                  className="px-3 py-1 text-xs bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={generateEmail}
          disabled={isGenerating || !recipient}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              AI正在生成中...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              生成邮件
            </>
          )}
        </Button>
      </Card>

      {/* 生成的邮件预览 */}
      <AnimatePresence>
        {showPreview && generatedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 rounded-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI已生成
                  </Badge>
                  {aiScore && (
                    <div className={`px-3 py-1 rounded-full border ${getScoreBg(aiScore)}`}>
                      <span className="text-xs text-neutral-600">AI评分：</span>
                      <span className={`text-sm ${getScoreColor(aiScore)}`}>
                        {aiScore}/100
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={regenerateEmail}
                    className="rounded-lg"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    重新生成
                  </Button>
                </div>
              </div>

              {/* AI建议 */}
              {suggestions.length > 0 && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm text-blue-900 mb-2">AI优化建议</h4>
                      <ul className="space-y-1">
                        {suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-xs text-blue-700 flex items-start gap-2">
                            <span className="text-blue-400">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* 邮件内容 */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-4">
                <pre className="text-sm text-neutral-700 whitespace-pre-wrap font-sans">
                  {generatedEmail}
                </pre>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  复制邮件
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  编辑修改
                </Button>
                <Button
                  onClick={sendEmail}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl"
                >
                  <Send className="w-4 h-4 mr-2" />
                  发送邮件
                </Button>
              </div>

              {/* 预期效果 */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-teal-600" />
                    <span className="text-xs text-teal-700">预期打开率</span>
                  </div>
                  <div className="text-teal-600">68%</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-700">预期回复率</span>
                  </div>
                  <div className="text-blue-600">42%</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-xs text-purple-700">转化提升</span>
                  </div>
                  <div className="text-purple-600">+25%</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
