import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { 
  Sparkles, 
  Mail, 
  MessageSquare, 
  FileText,
  Image as ImageIcon,
  Video,
  Copy,
  Check,
  RefreshCw,
  Send,
  Wand2,
  TrendingUp,
  Users,
  Zap,
  Star,
  Heart,
  Eye,
  MousePointer,
  ChevronRight,
  Download,
  Share2,
  BarChart3,
  Clock,
  Target,
  DollarSign,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Role = 'director' | 'manager' | 'specialist';

interface ContentStudioProps {
  role: Role;
}

export function ContentStudio({ role }: ContentStudioProps) {
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState<string>('email');
  const [selectedSegments, setSelectedSegments] = useState<string[]>(['tech-enthusiasts']);
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('科技感、专业');
  const [quantity, setQuantity] = useState('3个标题 + 2个版本正文');
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const contentTypes = [
    { id: 'email', name: '促销邮件', icon: Mail, color: 'purple', description: '电子邮件营销' },
    { id: 'social', name: '小红书种草', icon: MessageSquare, color: 'pink', description: '社交媒体内容' },
    { id: 'sms', name: '短信推送', icon: FileText, color: 'blue', description: 'SMS营销' },
    { id: 'blog', name: '博客文章', icon: FileText, color: 'green', description: '长文内容' }
  ];

  const segments = [
    { id: 'tech-enthusiasts', name: '精打细算的技术爱好者', icon: '🤓', count: 12500, engagement: 85 },
    { id: 'high-risk', name: '高价值流失风险客户', icon: '⚠️', count: 3200, engagement: 32 },
    { id: 'gen-z', name: 'Z世代社交达人', icon: '🎯', count: 18900, engagement: 92 },
    { id: 'premium', name: '品质优先的中产阶级', icon: '💎', count: 8600, engagement: 76 },
    { id: 'bargain', name: '促销敏感型购物者', icon: '🏷️', count: 22100, engagement: 64 }
  ];

  const tones = [
    { value: '科技感、专业', icon: '🔬', color: 'blue' },
    { value: '活力、年轻', icon: '⚡', color: 'yellow' },
    { value: '温暖、亲切', icon: '🤗', color: 'pink' },
    { value: '高端、奢华', icon: '💎', color: 'purple' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          // Simulate generated content
          const mockContent = [
            {
              id: 1,
              segment: 'tech-enthusiasts',
              title: '石墨烯振膜技术突破，聆听前所未有的纯净',
              body: '亲爱的技术爱好者，\n\n我们很高兴向您介绍最新的降噪耳机技术突破。采用石墨烯振膜技术，音质纯净度提升40%，30小时超长续航，让您沉浸在音乐的世界中。\n\n作为我们的忠实用户，您将享受首发优惠价格。立即了解详情 →',
              score: 9.2,
              suggestions: ['技术参数详细', '专业评测链接', '技术社区讨论'],
              metrics: {
                predictedOpen: 31,
                predictedClick: 5.8,
                predictedConversion: 4.2,
                estimatedRevenue: 1250
              }
            },
            {
              id: 2,
              segment: 'tech-enthusiasts',
              title: '超长续航30小时 + 极致降噪，您的专属音频体验',
              body: '嗨，\n\n想象一下：一次充电，整整30小时的纯净音质。我们的新款降噪耳机不仅续航惊人，更采用AI主动降噪技术，让您在任何环境都能享受专注时刻。\n\n查看完整技术规格和用户评测 →',
              score: 8.8,
              suggestions: ['续航对比图表', 'AI降噪演示视频'],
              metrics: {
                predictedOpen: 28,
                predictedClick: 4.9,
                predictedConversion: 3.8,
                estimatedRevenue: 1080
              }
            },
            {
              id: 3,
              segment: 'tech-enthusiasts',
              title: '告别焦虑，这款耳机让您的效率提升300%',
              body: '您好，\n\n研究表明，良好的音频环境可以将工作效率提升300%。我们的降噪耳机结合了最新的声学技术和人体工程学设计，让您在嘈杂环境中也能保持专注。\n\n技术爱好者专属优惠，仅限本周 →',
              score: 8.5,
              suggestions: ['效率研究数据', '用户案例故事'],
              metrics: {
                predictedOpen: 26,
                predictedClick: 4.5,
                predictedConversion: 3.5,
                estimatedRevenue: 980
              }
            }
          ];

          setGeneratedContent(mockContent);
          setStep(3);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Progress Steps */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2">
          {[
            { num: 1, label: '选择类型与受众', icon: Target },
            { num: 2, label: '输入创意指令', icon: Wand2 },
            { num: 3, label: 'AI生成与优化', icon: Sparkles }
          ].map((s, index) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="flex items-center">
                <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-2xl shadow-md">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    step >= s.num 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'bg-white/50 text-gray-500'
                  }`}>
                    {step > s.num ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-sm ${step >= s.num ? 'text-gray-900' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {s.num < 3 && (
                  <ChevronRight className={`w-5 h-5 mx-2 ${step > s.num ? 'text-purple-500' : 'text-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Step 1: Select Type and Audience */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <h3 className="text-gray-900 mb-6">选择内容类型</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contentTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setContentType(type.id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover-lift ${
                        contentType === type.id
                          ? 'border-purple-500 glass-card shadow-lg ring-2 ring-purple-500/30'
                          : 'border-white/40 bg-white/30 hover:bg-white/50'
                      }`}
                    >
                      <Icon className={`w-10 h-10 mb-3 ${
                        contentType === type.id ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <h4 className="text-gray-900 mb-1">{type.name}</h4>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            <Card className="glass-card p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900">选择目标受众</h3>
                  <p className="text-sm text-gray-500">可多选，AI将为每个群体生成个性化内容</p>
                </div>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  已选择 {selectedSegments.length} 个群体
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {segments.map((segment, index) => {
                  const isSelected = selectedSegments.includes(segment.id);
                  return (
                    <motion.div
                      key={segment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setSelectedSegments(
                          isSelected
                            ? selectedSegments.filter(id => id !== segment.id)
                            : [...selectedSegments, segment.id]
                        );
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover-lift ${
                        isSelected
                          ? 'border-purple-500 glass-card shadow-lg'
                          : 'border-white/40 bg-white/30 hover:bg-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{segment.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{segment.name}</h4>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Users className="w-3 h-3" />
                              <span>{segment.count.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Heart className="w-3 h-3" />
                              <span>{segment.engagement}%</span>
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            <div className="flex justify-end">
              <Button 
                onClick={() => setStep(2)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg border-0"
                disabled={selectedSegments.length === 0}
              >
                下一步：输入创意指令
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Input Creative Instructions */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="glass-card p-6 border-0 shadow-lg">
              <h3 className="text-gray-900 mb-6">输入创意指令</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">产品/活动信息</label>
                  <Textarea
                    placeholder="例如：推广我们的新款降噪耳机。卖点：30小时超长续航、佩戴舒适、石墨烯振膜技术..."
                    className="min-h-[140px] glass-card border-white/30 resize-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-3">内容基调</label>
                    <div className="grid grid-cols-2 gap-3">
                      {tones.map((t) => (
                        <div
                          key={t.value}
                          onClick={() => setTone(t.value)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover-lift ${
                            tone === t.value
                              ? 'border-purple-500 glass-card shadow-lg'
                              : 'border-white/40 bg-white/30 hover:bg-white/50'
                          }`}
                        >
                          <div className="text-2xl mb-2">{t.icon}</div>
                          <p className="text-sm text-gray-900">{t.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">生成数量</label>
                    <div className="space-y-2">
                      {[
                        '3个标题 + 2个版本正文',
                        '5个标题 + 3个版本正文',
                        '仅标题（10个）',
                        '仅正文（3个）'
                      ].map((q) => (
                        <div
                          key={q}
                          onClick={() => setQuantity(q)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            quantity === q
                              ? 'border-purple-500 glass-card shadow-md'
                              : 'border-white/40 bg-white/30 hover:bg-white/50'
                          }`}
                        >
                          <p className="text-sm text-gray-900">{q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="glass-card p-5 rounded-2xl border border-purple-200/50">
                  <div className="flex items-start gap-3">
                    <Wand2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-purple-900 mb-3">💡 AI 创意建议</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          '强调技术突破',
                          '突出续航优势',
                          '对比竞品',
                          '用户评价引用',
                          '限时优惠紧迫感',
                          '专业认证背书'
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setPrompt(prompt + (prompt ? ' ' : '') + suggestion)}
                            className="px-3 py-1.5 glass-card text-purple-700 rounded-full text-sm hover:shadow-md hover-lift transition-all"
                          >
                            + {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-between">
              <Button 
                onClick={() => setStep(1)}
                variant="outline"
                className="glass-card border-white/40"
              >
                上一步
              </Button>
              <Button 
                onClick={handleGenerate}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg border-0"
                disabled={!prompt}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI 生成内容
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Generated Content */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {isGenerating && (
              <Card className="glass-card p-6 border-0 shadow-lg">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <h3 className="text-gray-900">AI 正在生成个性化内容...</h3>
                  <Progress value={generationProgress} className="h-2" />
                  <p className="text-sm text-gray-600">{generationProgress}% 完成</p>
                </div>
              </Card>
            )}

            {!isGenerating && (
              <>
                <Card className="glass-card p-6 border-0 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                          <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-gray-900">千人千面个性化内容已生成</h3>
                          <p className="text-sm text-gray-600">
                            为 <span className="text-purple-600">{selectedSegments.length}</span> 个用户群体生成了 
                            <span className="text-purple-600"> {generatedContent.length}</span> 个版本
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleGenerate}
                        variant="outline"
                        className="glass-card border-purple-300"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        重新生成
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Generated Content Cards */}
                <div className="space-y-4">
                  {generatedContent.map((content, index) => (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-card p-6 border-0 shadow-lg hover-lift transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                              版本 {index + 1}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 border-0">
                              <Users className="w-3 h-3 mr-1" />
                              {segments.find(s => s.id === content.segment)?.name}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-700 border-0">
                              <Star className="w-3 h-3 mr-1 fill-green-600" />
                              评分 {content.score}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              邮件标题
                            </p>
                            <div className="glass-card p-4 rounded-xl">
                              <h4 className="text-gray-900">{content.title}</h4>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              邮件正文
                            </p>
                            <div className="glass-card p-4 rounded-xl">
                              <p className="text-gray-700 whitespace-pre-line">{content.body}</p>
                            </div>
                          </div>

                          {/* Predicted Metrics */}
                          <div className="glass-card p-4 rounded-xl">
                            <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                              <BarChart3 className="w-4 h-4" />
                              AI 预测效果指标
                            </p>
                            <div className="grid grid-cols-4 gap-4">
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                                  <Eye className="w-3 h-3" />
                                  <span>打开率</span>
                                </div>
                                <p className="text-lg text-purple-600">{content.metrics.predictedOpen}%</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                                  <MousePointer className="w-3 h-3" />
                                  <span>点击率</span>
                                </div>
                                <p className="text-lg text-blue-600">{content.metrics.predictedClick}%</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                                  <TrendingUp className="w-3 h-3" />
                                  <span>转化率</span>
                                </div>
                                <p className="text-lg text-green-600">{content.metrics.predictedConversion}%</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                                  <DollarSign className="w-3 h-3" />
                                  <span>预估收入</span>
                                </div>
                                <p className="text-lg text-orange-600">${content.metrics.estimatedRevenue}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              内容优化建议
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {content.suggestions.map((suggestion: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-purple-700 border-purple-300 glass-card">
                                  <Lightbulb className="w-3 h-3 mr-1" />
                                  {suggestion}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-white/50">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(index, `${content.title}\n\n${content.body}`)}
                            className="glass-card border-white/40"
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check className="w-4 h-4 mr-2 text-green-600" />
                                已复制
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                复制内容
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="glass-card border-white/40"
                          >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            生成配图
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="glass-card border-white/40"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            生成视频脚本
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="glass-card border-white/40"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            导出
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto border-0"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            发布到营销活动
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Multi-channel Distribution */}
                <Card className="glass-card p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50/80 to-cyan-50/80 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      一键发布至多渠道
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { name: '邮件营销', icon: Mail, count: selectedSegments.reduce((acc, id) => acc + (segments.find(s => s.id === id)?.count || 0), 0), color: 'purple' },
                        { name: '短信推送', icon: MessageSquare, count: Math.floor(selectedSegments.reduce((acc, id) => acc + (segments.find(s => s.id === id)?.count || 0), 0) * 0.7), color: 'green' },
                        { name: '社交媒体', icon: MessageSquare, count: Math.floor(selectedSegments.reduce((acc, id) => acc + (segments.find(s => s.id === id)?.count || 0), 0) * 0.5), color: 'pink' },
                        { name: 'APP推送', icon: FileText, count: Math.floor(selectedSegments.reduce((acc, id) => acc + (segments.find(s => s.id === id)?.count || 0), 0) * 0.8), color: 'blue' }
                      ].map((channel) => {
                        const Icon = channel.icon;
                        return (
                          <button
                            key={channel.name}
                            className="p-4 glass-card rounded-2xl border-2 border-white/40 hover:border-purple-500 transition-all text-left hover-lift group"
                          >
                            <Icon className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                            <p className="text-gray-900 mb-1">{channel.name}</p>
                            <p className="text-sm text-gray-600">{channel.count.toLocaleString()} 人</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                <div className="flex justify-between">
                  <Button 
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="glass-card border-white/40"
                  >
                    上一步
                  </Button>
                  <Button 
                    onClick={() => {
                      setStep(1);
                      setGeneratedContent([]);
                      setPrompt('');
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg border-0"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    创建新内容
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
