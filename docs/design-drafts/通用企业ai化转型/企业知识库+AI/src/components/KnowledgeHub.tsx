import { useState } from "react";
import { ChevronRight, ChevronDown, Plus, Bookmark, Star, Sparkles, Search, Bot, Wand2, FileEdit, Zap, Brain, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { ArticleDetail } from "./ArticleDetail";
import { CreateArticleDialog } from "./CreateArticleDialog";

interface Category {
  id: string;
  name: string;
  description: string;
  children?: Category[];
  aiEnabled?: boolean;
}

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  isBookmarked?: boolean;
  aiGenerated?: boolean;
  aiSummary?: string;
  readingTime?: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "市场营销",
    description: "品牌推广、营销策略和活动",
    aiEnabled: true,
    children: [
      { id: "1-1", name: "品牌建设", description: "", aiEnabled: true },
      { id: "1-2", name: "数字营销", description: "", aiEnabled: true },
    ],
  },
  {
    id: "2",
    name: "产品研发",
    description: "产品需求、技术架构和会议纪要",
    aiEnabled: true,
    children: [
      { id: "2-1", name: "产品需求", description: "", aiEnabled: true },
      { id: "2-2", name: "技术架构", description: "", aiEnabled: true },
    ],
  },
  {
    id: "3",
    name: "人力资源",
    description: "员工政策、培训和福利",
    aiEnabled: true,
  },
  {
    id: "4",
    name: "法务合规",
    description: "法律文件和合规指南",
    aiEnabled: false,
  },
];

const featuredArticles = [
  {
    id: "f1",
    title: "2024 年度战略规划",
    description: "公司未来一年的战略方向和重点项目",
    author: "李明",
    date: "2024年10月20日",
    aiSummary: "AI 已生成 3 段核心摘要",
  },
  {
    id: "f2",
    title: "产品创新指南",
    description: "如何在产品开发中保持创新和竞争力",
    author: "王芳",
    date: "2024年10月18日",
    aiSummary: "AI 推荐：与你的工作相关度 95%",
  },
];

const articles: Article[] = [
  {
    id: "1",
    title: "Q3 市场营销活动复盘",
    author: "张伟",
    date: "2024年10月22日",
    category: "市场营销",
    tags: ["复盘", "营销"],
    isBookmarked: true,
    aiGenerated: false,
    aiSummary: "12 个活动，ROI 4.2，转化率 12.5%",
    readingTime: "8 分钟",
  },
  {
    id: "2",
    title: "移动端产品需求文档",
    author: "李雷",
    date: "2024年10月21日",
    category: "产品研发",
    tags: ["需求", "移动端"],
    aiGenerated: true,
    aiSummary: "AI 辅助生成 • 5 个核心功能模块",
    readingTime: "15 分钟",
  },
  {
    id: "3",
    title: "员工休假政策 2024",
    author: "韩梅梅",
    date: "2024年10月20日",
    category: "人力资源",
    tags: ["政策", "福利"],
    aiSummary: "年假 5-20 天，病假 10 天",
    readingTime: "5 分钟",
  },
  {
    id: "4",
    title: "数据隐私合规指南",
    author: "赵强",
    date: "2024年10月19日",
    category: "法务合规",
    tags: ["合规", "隐私"],
    readingTime: "12 分钟",
  },
  {
    id: "5",
    title: "技术架构设计评审",
    author: "孙丽",
    date: "2024年10月18日",
    category: "产品研发",
    tags: ["架构", "评审"],
    aiSummary: "微服务架构，支持 10 万 QPS",
    readingTime: "20 分钟",
  },
];

const aiFeatures = [
  {
    icon: Wand2,
    title: "AI 辅助写作",
    description: "智能续写、润色、扩写",
    color: "text-purple-500",
  },
  {
    icon: Brain,
    title: "内容摘要",
    description: "自动生成文档摘要",
    color: "text-blue-500",
  },
  {
    icon: Zap,
    title: "智能推荐",
    description: "基于内容的关联推荐",
    color: "text-yellow-500",
  },
  {
    icon: MessageSquare,
    title: "文档问答",
    description: "针对文档内容提问",
    color: "text-green-500",
  },
];

export function KnowledgeHub() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["1"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("1");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(
    articles.filter((a) => a.isBookmarked).map((a) => a.id)
  );
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIPanel, setShowAIPanel] = useState(true);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const renderCategory = (category: Category, level = 0) => (
    <div key={category.id} style={{ paddingLeft: `${level * 16}px` }}>
      <button
        onClick={() => {
          if (category.children) {
            toggleCategory(category.id);
          }
          setSelectedCategory(category.id);
        }}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
          selectedCategory === category.id
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        }`}
      >
        {category.children &&
          (expandedCategories.includes(category.id) ? (
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          ))}
        <span className={!category.children ? "ml-6" : ""}>{category.name}</span>
        {category.aiEnabled && (
          <Badge variant="secondary" className="ml-auto text-xs gap-1 bg-primary/10">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
        )}
      </button>
      {category.children &&
        expandedCategories.includes(category.id) &&
        category.children.map((child) => renderCategory(child, level + 1))}
    </div>
  );

  if (selectedArticle) {
    return <ArticleDetail onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background p-6 space-y-4">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md relative overflow-hidden group"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Plus className="h-4 w-4 mr-2" />
            创建新文章
            <Badge variant="secondary" className="ml-2 bg-white/20 border-0">
              <Bot className="h-3 w-3 mr-1" />
              AI
            </Badge>
          </Button>

          <div className="pt-4">
            <h3 className="mb-3 px-3">知识分类</h3>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-1">{categories.map((cat) => renderCategory(cat))}</div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* AI Search Banner */}
            <section className="relative overflow-hidden">
              <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Search className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3>AI 智能搜索</h3>
                        <p className="text-xs text-muted-foreground">支持自然语言查询和语义搜索</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAIPanel(!showAIPanel)}
                    >
                      {showAIPanel ? "收起" : "展开"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="搜索文档... 例如：销售数据报告、员工假期政策"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background"
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI 搜索
                    </Button>
                  </div>
                  
                  {showAIPanel && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["市场营销复盘", "产品需求文档", "员工政策", "技术架构"].map((query) => (
                        <button
                          key={query}
                          onClick={() => setSearchQuery(query)}
                          className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/30"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* AI Features Grid */}
            {showAIPanel && (
              <section className="grid grid-cols-4 gap-4">
                {aiFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-md transition-all cursor-pointer group border hover:border-primary/50">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <div className={`inline-flex p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors`}>
                          <feature.icon className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform`} />
                        </div>
                        <div>
                          <p className="text-sm mb-1">{feature.title}</p>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>
            )}

            {/* Category Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1>{categories.find((c) => c.id === selectedCategory)?.name}</h1>
                  {categories.find((c) => c.id === selectedCategory)?.aiEnabled && (
                    <Badge variant="secondary" className="gap-1">
                      <Bot className="h-3 w-3" />
                      AI 增强
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">
                  {categories.find((c) => c.id === selectedCategory)?.description}
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <FileEdit className="h-4 w-4" />
                批量生成摘要
              </Button>
            </div>

            {/* Featured Articles */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <h2>精选文章</h2>
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI 推荐
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="hover:shadow-lg transition-all cursor-pointer group border hover:border-primary/50 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{article.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
                          <Brain className="h-3 w-3" />
                          {article.aiSummary}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{article.author}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-auto p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          阅读 →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Article List */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2>所有文章</h2>
                <Button variant="outline" size="sm">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  查看全部
                </Button>
              </div>
              <div className="space-y-2">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article.id)}
                    className="group flex items-center justify-between p-4 rounded-lg hover:bg-card transition-all cursor-pointer border border-transparent hover:border-border hover:shadow-md"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="group-hover:text-primary transition-colors">{article.title}</h4>
                        <div className="flex gap-2">
                          {article.aiGenerated && (
                            <Badge variant="secondary" className="text-xs gap-1 bg-purple-500/10 text-purple-500">
                              <Bot className="h-3 w-3" />
                              AI 生成
                            </Badge>
                          )}
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {article.aiSummary && (
                        <div className="flex items-center gap-2 text-xs">
                          <Brain className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">{article.aiSummary}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                        {article.readingTime && (
                          <>
                            <span>•</span>
                            <span>{article.readingTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(article.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          bookmarkedArticles.includes(article.id)
                            ? "fill-primary text-primary"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <CreateArticleDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </>
  );
}
