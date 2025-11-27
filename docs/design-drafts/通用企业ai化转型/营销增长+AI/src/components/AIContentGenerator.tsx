import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Loader2, 
  Copy, 
  Send, 
  RefreshCw,
  CheckCircle2,
  Image as ImageIcon,
  Video,
  FileText,
  Wand2,
  TrendingUp,
  Clock,
  Eye
} from 'lucide-react';

interface AIContentGeneratorProps {
  onClose: () => void;
}

export function AIContentGenerator({ onClose }: AIContentGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('professional');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('a');
  const [copied, setCopied] = useState(false);

  const contentVersions = {
    instagram: {
      a: {
        title: '专业版本',
        content: `🚀 重磅发布！GrowthEncore AI 3.0正式上线

✨ 全新AI引擎，营销效率提升80%
📊 实时数据分析，ROI提升4倍
🎯 智能用户画像，精准触达目标客户
🤖 自动化工作流，解放双手创造价值

限时优惠，前100名享受30%折扣！
立即体验👉 [链接]

#AI营销 #营销自动化 #数字化转型 #MarTech`,
        metrics: {
          estimatedReach: '45K-60K',
          estimatedEngagement: '2.8K-3.5K',
          estimatedClicks: '450-600',
          bestTime: '20:30'
        }
      },
      b: {
        title: '活泼版本',
        content: `嘿！营销人！还在手动发帖？😱

让AI帮你：
⚡️ 自动监测热点
⚡️ 智能生成内容  
⚡️ 一键多平台发布
⚡️ 实时优化策略

ROI提升4倍不是梦！💰
7天免费试用，不香吗？

戳链接开始👉 [链接]

#AI工具 #效率神器 #营销黑科技`,
        metrics: {
          estimatedReach: '52K-68K',
          estimatedEngagement: '3.2K-4.1K',
          estimatedClicks: '520-680',
          bestTime: '21:00'
        }
      },
      c: {
        title: '故事版本',
        content: `还记得上个月为了发一条帖子，熬夜到凌晨2点吗？ 😩

我也经历过。直到遇见GrowthEncore AI...

现在我的工作日常：
早上☕️：AI已自动发布3条优质内容
中午🍱：数据分析报告自动生成
下午💼：AI发现3个增长机会
晚上🌙：安心下班，自动化持续运行

这就是AI营销的魅力！
立即免费体验👉 [链接]

#营销人的福音 #AI赋能`,
        metrics: {
          estimatedReach: '38K-48K',
          estimatedEngagement: '2.5K-3.2K',
          estimatedClicks: '380-490',
          bestTime: '19:30'
        }
      }
    },
    x: {
      a: {
        title: '简洁版本',
        content: `🚀 GrowthEncore AI 3.0 发布

- AI引擎：营销效率↑80%
- 数据分析：ROI↑4x  
- 智能画像：精准触达
- 工作流：全自动化

限时30%折扣 | 7天免费试用

👉 link.to/demo

#AI营销 #自动化 #增长黑客`,
        metrics: {
          estimatedReach: '28K-35K',
          estimatedEngagement: '1.2K-1.8K',
          estimatedClicks: '280-420',
          bestTime: '14:30'
        }
      },
      b: {
        title: '问答版本',
        content: `营销人最怕什么？

❌ 手动发帖太耗时
❌ 数据分析太复杂
❌ ROI提升太困难

GrowthEncore AI 给你答案：

✅ AI自动发布 - 省时80%
✅ 智能分析 - 一目了然
✅ 精准投放 - ROI提升4倍

免费试用👉 link.to/demo

#MarTech #营销工具`,
        metrics: {
          estimatedReach: '32K-42K',
          estimatedEngagement: '1.5K-2.1K',
          estimatedClicks: '320-480',
          bestTime: '15:00'
        }
      },
      c: {
        title: '数据版本',
        content: `📊 GrowthEncore AI 用户数据：

• 营销效率提升 80%
• ROI 增长 4.2x
• 内容生产速度 ↑300%
• 用户满意度 96%

5000+ 企业的选择
现在加入，限时30%折扣

👉 link.to/demo

#数据驱动 #AI营销`,
        metrics: {
          estimatedReach: '25K-32K',
          estimatedEngagement: '1.1K-1.6K',
          estimatedClicks: '250-380',
          bestTime: '14:00'
        }
      }
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentContent = contentVersions[platform as keyof typeof contentVersions] || contentVersions.instagram;
  const currentVersion = currentContent[selectedVersion as keyof typeof currentContent];

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            AI内容生成器
          </h3>
          <p className="text-sm text-gray-500 mt-1">智能创作多平台营销内容</p>
        </div>
        <Badge className="bg-purple-500 text-white">
          <Sparkles className="w-3 h-3 mr-1" />
          AI驱动
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block">内容主题</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：新品发布、促销活动、行业洞察"
              className="bg-white/70"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-2 block">目标平台</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="bg-white/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="x">X (Twitter)</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-2 block">风格调性</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-white/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">专业严谨</SelectItem>
                <SelectItem value="casual">轻松活泼</SelectItem>
                <SelectItem value="story">故事叙述</SelectItem>
                <SelectItem value="data">数据驱动</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generating || !topic}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover-lift"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                AI生成中...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                生成内容
              </>
            )}
          </Button>

          {generated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-900">AI已生成3个版本</span>
              </div>
              <p className="text-xs text-green-700">
                基于{platform}平台特性和历史数据分析
              </p>
            </motion.div>
          )}
        </div>

        {/* Right: Output */}
        <div className="space-y-4">
          {generated ? (
            <>
              <Tabs value={selectedVersion} onValueChange={setSelectedVersion}>
                <TabsList className="grid grid-cols-3 gap-2">
                  <TabsTrigger value="a">版本A</TabsTrigger>
                  <TabsTrigger value="b">版本B</TabsTrigger>
                  <TabsTrigger value="c">版本C</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedVersion}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4"
                  >
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-purple-500 text-white">{currentVersion.title}</Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => handleCopy(currentVersion.content)}
                          >
                            {copied ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <Textarea
                        value={currentVersion.content}
                        className="min-h-[200px] bg-white/70 mb-3"
                        readOnly
                      />

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="p-2 bg-white/70 rounded-lg">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Eye className="w-3 h-3" />
                            <span>预估触达</span>
                          </div>
                          <p className="text-sm text-gray-900 mt-1">{currentVersion.metrics.estimatedReach}</p>
                        </div>
                        <div className="p-2 bg-white/70 rounded-lg">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <TrendingUp className="w-3 h-3" />
                            <span>预估互动</span>
                          </div>
                          <p className="text-sm text-gray-900 mt-1">{currentVersion.metrics.estimatedEngagement}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg mb-3">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-blue-900">
                          最佳发布时间：{currentVersion.metrics.bestTime}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-3 h-3 mr-1" />
                          编辑
                        </Button>
                        <Button size="sm" className="bg-purple-500 text-white">
                          <Send className="w-3 h-3 mr-1" />
                          发布
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Tabs>

              <div className="space-y-2">
                <p className="text-xs text-gray-600">AI建议增强：</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    生成配图
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Video className="w-3 h-3 mr-1" />
                    视频脚本
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Wand2 className="w-3 h-3 mr-1" />
                    优化SEO
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-8 bg-white/50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">输入主题后点击生成</p>
                <p className="text-xs text-gray-500 mt-1">AI将创作3个不同版本供你选择</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
