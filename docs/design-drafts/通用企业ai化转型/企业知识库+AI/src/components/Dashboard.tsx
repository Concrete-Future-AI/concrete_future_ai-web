import { useState } from "react";
import { Bookmark, TrendingUp, Users, FileText, Star, ArrowRight, Clock, Sparkles, Search, Zap, Brain, Lightbulb, MessageSquare, BookOpen, Target, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

const salesData = [
  { month: "1月", value: 4200 },
  { month: "2月", value: 3800 },
  { month: "3月", value: 5100 },
  { month: "4月", value: 4600 },
  { month: "5月", value: 5800 },
  { month: "6月", value: 6200 },
];

const bookmarks = [
  {
    title: "2024 Q1 产品发布计划",
    description: "产品路线图和发布时间表",
    category: "产品研发",
    aiSuggestion: "AI 推荐阅读",
  },
  {
    title: "市场营销策略指南",
    description: "品牌推广和用户增长策略",
    category: "市场营销",
  },
  {
    title: "员工手册 v3.2",
    description: "公司政策和福利说明",
    category: "人力资源",
    aiSuggestion: "与你相关",
  },
];

const teamUpdates = [
  { title: "产品需求文档：移动端优化", time: "2小时前", hasAISummary: true },
  { title: "Q2 团队 OKR 更新", time: "5小时前", hasAISummary: true },
  { title: "技术架构设计评审会议纪要", time: "昨天", hasAISummary: false },
];

const companyUpdates = [
  { title: "CEO 月度信：展望下半年", time: "3小时前", hasAISummary: true },
  { title: "全员大会演讲稿", time: "2天前", hasAISummary: true },
  { title: "新办公室搬迁指南", time: "3天前", hasAISummary: false },
];

const aiInsights = [
  {
    icon: TrendingUp,
    title: "本周热门文档",
    description: "《Q3 营销复盘》被查看 156 次",
    trend: "+32%",
  },
  {
    icon: Users,
    title: "团队活跃度",
    description: "本周新增 23 篇文档",
    trend: "+18%",
  },
  {
    icon: Lightbulb,
    title: "智能建议",
    description: "建议更新 5 篇过期文档",
    action: "查看详情",
  },
];

interface DashboardProps {
  onAskQuestion?: (question: string) => void;
}

export function Dashboard({ onAskQuestion }: DashboardProps) {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [aiInputValue, setAiInputValue] = useState("");
  const [isAIBannerExpanded, setIsAIBannerExpanded] = useState(false);
  
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "早上好" : currentHour < 18 ? "下午好" : "晚上好";

  const handleAISubmit = () => {
    if (aiInputValue.trim()) {
      onAskQuestion?.(aiInputValue);
      setAiInputValue("");
    }
  };

  const quickPrompts = [
    { icon: FileText, text: "总结本周文档", color: "text-blue-500" },
    { icon: TrendingUp, text: "分析销售趋势", color: "text-green-500" },
    { icon: Users, text: "团队动态概览", color: "text-purple-500" },
    { icon: Target, text: "OKR 进度追踪", color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Welcome */}
        <div className="space-y-2">
          <h1>{greeting}，张伟。</h1>
          <p className="text-muted-foreground">AI 助手已为您准备好今日工作概览</p>
        </div>

        {/* 🎯 巨大醒目的 AI Banner - 第一焦点 */}
        <section className="relative overflow-hidden">
          <div 
            className={`relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/30 rounded-3xl transition-all duration-500 ${
              isAIBannerExpanded ? 'p-12' : 'p-8'
            } shadow-lg hover:shadow-2xl group`}
            onMouseEnter={() => setIsAIBannerExpanded(true)}
            onMouseLeave={() => setIsAIBannerExpanded(false)}
          >
            {/* 装饰性背景 */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
            
            <div className="relative space-y-6">
              {/* 顶部装饰 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                    <Brain className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl">AI 智能助手</h2>
                      <Badge variant="secondary" className="gap-1 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        在线
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">基于企业知识库的智能问答系统</p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Bot className="h-3 w-3" />
                    GPT-4 驱动
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    实时响应
                  </Badge>
                </div>
              </div>

              {/* AI 搜索框 - 超大尺寸 */}
              <div className="max-w-4xl mx-auto">
                <div className="relative group/search">
                  {/* 发光效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-2xl blur-xl opacity-0 group-hover/search:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-center gap-3 bg-background/95 backdrop-blur border-2 border-primary/40 rounded-2xl p-3 shadow-xl group-hover/search:border-primary/60 transition-all">
                    <div className="pl-3">
                      <Search className="h-7 w-7 text-primary" />
                    </div>
                    <input
                      type="text"
                      placeholder="问我任何问题... 例如：如何申请年假？最新的销售数据是多少？"
                      value={aiInputValue}
                      onChange={(e) => setAiInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAISubmit()}
                      className="flex-1 bg-transparent border-none outline-none text-xl placeholder:text-muted-foreground/60"
                    />
                    <Button 
                      onClick={handleAISubmit}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary px-8 shadow-lg hover:shadow-xl transition-all"
                      disabled={!aiInputValue.trim()}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      提问
                    </Button>
                  </div>
                </div>
              </div>

              {/* 快捷提示词 */}
              <div className="flex flex-wrap justify-center gap-3">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAiInputValue(prompt.text);
                      handleAISubmit();
                    }}
                    className="flex items-center gap-2 px-5 py-3 bg-card/80 hover:bg-card rounded-xl border border-border hover:border-primary/50 transition-all group/prompt shadow-sm hover:shadow-md"
                  >
                    <prompt.icon className={`h-4 w-4 ${prompt.color} group-hover/prompt:scale-110 transition-transform`} />
                    <span className="group-hover/prompt:text-primary transition-colors">{prompt.text}</span>
                  </button>
                ))}
              </div>

              {/* AI 能力展示 - 扩展时显示更多 */}
              <div className={`grid grid-cols-4 gap-4 transition-all duration-500 ${isAIBannerExpanded ? 'opacity-100' : 'opacity-70'}`}>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card/50 to-muted/30 border border-border/50 hover:border-primary/50 transition-all">
                  <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-2">
                    <Brain className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-sm">自然语言理解</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card/50 to-muted/30 border border-border/50 hover:border-primary/50 transition-all">
                  <div className="inline-flex p-3 rounded-xl bg-green-500/10 mb-2">
                    <Zap className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-sm">毫秒级响应</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card/50 to-muted/30 border border-border/50 hover:border-primary/50 transition-all">
                  <div className="inline-flex p-3 rounded-xl bg-purple-500/10 mb-2">
                    <BookOpen className="h-6 w-6 text-purple-500" />
                  </div>
                  <p className="text-sm">知识库溯源</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-card/50 to-muted/30 border border-border/50 hover:border-primary/50 transition-all">
                  <div className="inline-flex p-3 rounded-xl bg-orange-500/10 mb-2">
                    <Lightbulb className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="text-sm">智能推荐</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI 洞察卡片 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border-l-4 border-l-primary/50 hover:border-l-primary group">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <insight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{insight.title}</h4>
                      {insight.trend && (
                        <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-500">
                          {insight.trend}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{insight.description}</p>
                    {insight.action && (
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                        {insight.action} →
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Quick Actions - 增强 AI 提示 */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all cursor-pointer group hover:border-primary relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs gap-1 bg-primary/10">
                <Sparkles className="h-3 w-3" />
                AI
              </Badge>
            </div>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4>AI 问答</h4>
                  <p className="text-muted-foreground text-sm">智能解答</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer group hover:border-primary relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs gap-1 bg-primary/10">
                <Bot className="h-3 w-3" />
                AI
              </Badge>
            </div>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4>知识库</h4>
                  <p className="text-muted-foreground text-sm">AI 辅助写作</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer group hover:border-primary">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4>数据分析</h4>
                  <p className="text-muted-foreground text-sm">查看报表</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer group hover:border-primary">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4>团队协作</h4>
                  <p className="text-muted-foreground text-sm">查看动态</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* My Bookmarks - 增加 AI 推荐标签 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h2>我的收藏</h2>
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3" />
                AI 智能推荐
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              查看全部
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookmarks.map((bookmark, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group border hover:border-primary/50 relative overflow-hidden">
                {bookmark.aiSuggestion && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-primary/20 to-transparent px-4 py-1 rounded-bl-lg">
                    <Badge variant="secondary" className="text-xs bg-transparent border-0 gap-1">
                      <Sparkles className="h-3 w-3" />
                      {bookmark.aiSuggestion}
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="group-hover:text-primary transition-colors pr-8">{bookmark.title}</span>
                    <Bookmark className="h-4 w-4 fill-primary text-primary flex-shrink-0" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{bookmark.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary">{bookmark.category}</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      阅读 →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recently Updated - 增加 AI 摘要功能 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2>最近更新</h2>
              <Badge variant="outline" className="gap-1">
                <Bot className="h-3 w-3" />
                AI 摘要可用
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              查看全部
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  您所属团队的更新
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {teamUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="group flex items-start justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="group-hover:text-primary transition-colors">{update.title}</span>
                        {update.hasAISummary && (
                          <Badge variant="secondary" className="text-xs gap-1 bg-primary/10">
                            <Sparkles className="h-3 w-3" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{update.time}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  查看更多团队更新
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  全公司的更新
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {companyUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="group flex items-start justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="group-hover:text-primary transition-colors">{update.title}</span>
                        {update.hasAISummary && (
                          <Badge variant="secondary" className="text-xs gap-1 bg-primary/10">
                            <Sparkles className="h-3 w-3" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{update.time}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  查看更多公司更新
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Metrics Overview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2>关键指标速览</h2>
            </div>
            <Button variant="ghost" size="sm">
              自定义看板
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="hover:shadow-lg transition-all cursor-pointer border hover:border-primary/50"
              onMouseEnter={() => setHoveredMetric("sales")}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>月度销售额</span>
                  {hoveredMetric === "sales" && (
                    <Button variant="ghost" size="sm">查看详情</Button>
                  )}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  当前月度：<span className="text-primary">¥6,200</span> 
                  <span className="text-xs ml-2">↑ 15% 较上月</span>
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <XAxis
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        tickFormatter={(value) => `¥${value}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#F0EEE9",
                          border: "none",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#D97D54"
                        strokeWidth={2}
                        dot={{ fill: "#D97D54", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all cursor-pointer border hover:border-primary/50"
              onMouseEnter={() => setHoveredMetric("activity")}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>团队活跃度</span>
                  {hoveredMetric === "activity" && (
                    <Button variant="ghost" size="sm">查看详情</Button>
                  )}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  本月活跃：<span className="text-primary">93 人</span>
                  <span className="text-xs ml-2">↑ 8% 较上月</span>
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <XAxis
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#F0EEE9",
                          border: "none",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="value" fill="#D97D54" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
