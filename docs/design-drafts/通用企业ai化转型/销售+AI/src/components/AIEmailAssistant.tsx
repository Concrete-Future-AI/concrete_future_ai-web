import { useState } from 'react';
import { Mail, Sparkles, Wand2, Copy, Send, RotateCw, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface EmailTemplate {
  id: string;
  name: string;
  tone: string;
  content: string;
  subject: string;
}

export function AIEmailAssistant() {
  const [context, setContext] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [emailType, setEmailType] = useState('follow-up');
  const [generatedEmail, setGeneratedEmail] = useState<EmailTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const tones = [
    { value: 'professional', label: '专业正式', icon: '💼' },
    { value: 'friendly', label: '友好亲切', icon: '😊' },
    { value: 'persuasive', label: '说服力强', icon: '🎯' },
    { value: 'concise', label: '简洁高效', icon: '⚡' }
  ];

  const emailTypes = [
    { value: 'follow-up', label: '跟进邮件' },
    { value: 'introduction', label: '首次接触' },
    { value: 'proposal', label: '方案提案' },
    { value: 'negotiation', label: '谈判协商' },
    { value: 'renewal', label: '续约提醒' },
    { value: 'thank-you', label: '感谢信' }
  ];

  const generateEmail = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const templates: Record<string, EmailTemplate> = {
        'follow-up': {
          id: '1',
          name: '跟进邮件',
          tone: selectedTone,
          subject: '关于上次会议的跟进 - 贵司数字化转型方案',
          content: `尊敬的张总，您好！

感谢您上周三抽出宝贵时间与我们讨论贵司的数字化转型需求。

在会议中，您提到了对客户关系管理系统的迫切需求，以及希望在下季度完成部署的时间表。基于我们的讨论，我已经安排我们的技术团队准备了一份定制化解决方案。

这套方案重点解决了您提到的三个核心痛点：
1. 销售流程自动化，减少50%的手工操作
2. 客户数据集中管理，提升团队协作效率
3. 智能分析报表，为管理决策提供数据支持

方案已经发送到您的邮箱，预计实施周期为6-8周，完全符合您的时间要求。

如果方便，我建议我们在本周五下午安排一次30分钟的线上会议，详细讨论方案细节和投资回报率分析。您看这个时间是否合适？

期待您的回复！

此致
敬礼

${context || '您的姓名'}
销售顾问
公司名称`
        },
        'introduction': {
          id: '2',
          name: '首次接触',
          tone: selectedTone,
          subject: '帮助贵司提升30%销售效率的智能解决方案',
          content: `尊敬的${context || '客户'}，您好！

我是XXX公司的销售顾问。注意到贵司最近在快速扩张业务，相信您的团队一定需要更高效的工具来管理日益增长的客户关系。

我们的智能CRM系统已经帮助超过500家企业实现了：
• 销售效率提升30%以上
• 客户跟进及时性提高60%
• 销售预测准确率达到90%+

特别值得一提的是，我们服务的同行业客户"XX科技"在使用3个月后，团队业绩增长了45%。

如果您有5分钟时间，我很乐意通过电话简单介绍我们如何帮助贵司实现类似的增长。

您看本周哪个时间段方便？

期待您的回复！

此致
敬礼`
        },
        'proposal': {
          id: '3',
          name: '方案提案',
          tone: selectedTone,
          subject: '定制化CRM解决方案 - 为贵司量身打造',
          content: `尊敬的${context || '客户'}，您好！

根据我们上次的深入交流，我很高兴为贵司呈上这份定制化的CRM解决方案。

【方案亮点】
✓ 完全匹配贵司现有业务流程，无需改变工作习惯
✓ 智能AI助手，自动识别销售机会和风险
✓ 与现有ERP系统无缝集成
✓ 移动端全功能支持，随时随地办公

【投资回报分析】
基于贵司目前30人的销售团队规模：
• 年度投资：￥12万
• 预计节省时间成本：每人每天1小时 = 年省￥45万
• 预计销售业绩提升：20-30% = 年增收￥200-300万
• 投资回报周期：约2个月

【实施计划】
第1-2周：系统配置与数据迁移
第3-4周：团队培训与试运行
第5-6周：全面上线与优化

我建议我们尽快安排一次演示，让您的团队亲身体验这套系统的强大功能。

期待与您进一步讨论！`
        },
        'negotiation': {
          id: '4',
          name: '谈判协商',
          tone: selectedTone,
          subject: '关于合同条款的建议方案',
          content: `尊敬的${context || '客户'}，您好！

感谢您对我们方案的认可，关于您提出的价格和服务条款问题，我们进行了慎重的考虑。

为了达成双方都满意的合作，我们提出以下建议：

【价格方案】
考虑到贵司是我们重要的战略合作伙伴，我们愿意提供：
• 首年优惠15%（从￥12万降至￥10.2万）
• 签订两年合约，第二年额外优惠5%
• 赠送价值￥2万的高级培训服务

【服务保障】
• 7×24小时技术支持
• 每月一次上门培训指导
• 季度业务回顾与优化建议
• 免费系统升级和功能更新

【付款方式】
我们理解贵司的资金周转考虑，可以接受：
• 首付50%，系统上线后支付剩余50%
• 或选择按季度分期付款

这个方案体现了我们的最大诚意，希望能够促成这次合作。

您看这个方案是否可行？期待您的反馈！`
        },
        'renewal': {
          id: '5',
          name: '续约提醒',
          tone: selectedTone,
          subject: '续约优惠 - 感谢您一年来的信任与支持',
          content: `尊敬的${context || '客户'}，您好！

时光飞逝，贵司使用我们的CRM系统已经整整一年了！

【这一年的成果】
让我们回顾一下这一年的精彩数据：
📈 销售效率提升：38%
📊 客户满意度：从75%提升到92%
💰 销售业绩增长：45%
🎯 成功完成商机：比去年增加126个

这些成绩的背后，离不开贵司团队的努力，也是我们共同合作的成果！

【续约特别优惠】
您的年度合同将在30天后到期。作为老客户，我们为您准备了特别续约礼遇：

✓ 续约价格优惠20%
✓ 免费升级到企业高级版（价值￥5万）
✓ 赠送AI智能分析模块（价值￥3万）
✓ 专属客户成功经理1对1服务

【新功能预览】
我们即将发布的新版本包含：
• 更智能的AI预测引擎
• 移动端体验全面升级  
• 与微信生态深度集成

如果您在本月内完成续约，还可以优先体验这些新功能！

期待继续与贵司携手前行！`
        },
        'thank-you': {
          id: '6',
          name: '感谢信',
          tone: selectedTone,
          subject: '感谢您的信任 - 期待与您共创辉煌',
          content: `尊敬的${context || '客户'}，您好！

在此，我代表整个团队向您表示最诚挚的感谢！

感谢您选择信任我们，将贵司重要的客户关系管理工作交付给我们。这份信任对我们来说不仅是荣幸，更是责任。

【我们的承诺】
✓ 确保系统在约定时间内顺利上线
✓ 提供全程贴心的技术支持和培训
✓ 定期回访，持续优化系统性能
✓ 以您的成功为我们的目标

【接下来的安排】
明天上午10点，我们的技术团队会与您的IT负责人联系，开始系统部署工作。

如果您有任何问题或需求，请随时联系我。我的手机24小时为您开机。

再次感谢您的信任！期待我们的合作为贵司创造更大价值！

此致
敬礼`
        }
      };

      setGeneratedEmail(templates[emailType] || templates['follow-up']);
      setIsGenerating(false);
      toast.success('AI邮件已生成', { icon: '✨' });
    }, 2000);
  };

  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(`主题: ${generatedEmail.subject}\n\n${generatedEmail.content}`);
      toast.success('已复制到剪贴板', { icon: '📋' });
    }
  };

  const handleRegenerate = () => {
    setGeneratedEmail(null);
    generateEmail();
  };

  const handleFeedback = (positive: boolean) => {
    toast.success(positive ? 'AI会继续优化此类邮件 👍' : '已记录您的反馈 👎', {
      description: 'AI将根据您的偏好调整生成策略'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <Card className="border-border rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            AI 邮件助手
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-2">
            告诉AI您的需求，自动生成专业邮件
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">邮件类型</label>
            <Select value={emailType} onValueChange={setEmailType}>
              <SelectTrigger className="rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {emailTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tone */}
          <div>
            <label className="text-sm font-medium mb-2 block">语气风格</label>
            <div className="grid grid-cols-2 gap-2">
              {tones.map(tone => (
                <button
                  key={tone.value}
                  onClick={() => setSelectedTone(tone.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedTone === tone.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-lg mb-1">{tone.icon}</div>
                  <div className="text-sm font-medium">{tone.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Context Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              背景信息 <span className="text-muted-foreground font-normal">(可选)</span>
            </label>
            <Textarea
              placeholder="例如：客户名称、上次会议要点、特殊需求等..."
              className="min-h-24 rounded-lg resize-none"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          {/* Advanced Options */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              高级选项
            </button>
            
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-data" className="rounded" />
                    <label htmlFor="include-data" className="text-sm">包含数据分析</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="add-cta" className="rounded" defaultChecked />
                    <label htmlFor="add-cta" className="text-sm">添加行动号召</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="personalize" className="rounded" defaultChecked />
                    <label htmlFor="personalize" className="text-sm">个性化内容</label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateEmail}
            disabled={isGenerating}
            className="w-full gradient-primary hover:shadow-lg transition-all"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                AI正在创作...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                生成AI邮件
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Panel */}
      <Card className="border-border rounded-2xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                生成的邮件
              </CardTitle>
              {generatedEmail && (
                <p className="text-xs text-muted-foreground mt-1">
                  {generatedEmail.name} · {tones.find(t => t.value === generatedEmail.tone)?.label}
                </p>
              )}
            </div>
            {generatedEmail && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="rounded-lg gap-2"
                >
                  <Copy className="h-3 w-3" />
                  复制
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerate}
                  className="rounded-lg gap-2"
                >
                  <RotateCw className="h-3 w-3" />
                  重新生成
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {generatedEmail ? (
            <div className="space-y-4">
              {/* Subject */}
              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="text-xs text-muted-foreground mb-1">邮件主题</div>
                <div className="font-semibold text-sm">{generatedEmail.subject}</div>
              </div>

              {/* Content */}
              <div className="p-4 rounded-lg bg-card border-2 border-border min-h-[400px]">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                  {generatedEmail.content}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">这个邮件有帮助吗？</span>
                  <button
                    onClick={() => handleFeedback(true)}
                    className="p-2 rounded-lg hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleFeedback(false)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                </div>
                <Button className="gradient-success gap-2">
                  <Send className="h-4 w-4" />
                  发送邮件
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="h-20 w-20 rounded-2xl gradient-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">等待生成邮件</h4>
              <p className="text-sm text-muted-foreground max-w-xs">
                填写左侧表单，AI将为您生成专业的商务邮件
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
