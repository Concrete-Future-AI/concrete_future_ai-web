import { useState } from "react";
import { ArrowLeft, Bookmark, Share2, Edit, Clock, User, Tag, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ArticleDetailProps {
  onBack: () => void;
}

const article = {
  id: "1",
  title: "2024 年第三季度市场营销活动复盘",
  author: "张伟",
  authorAvatar: "张",
  date: "2024年10月22日",
  lastUpdated: "2024年10月24日",
  category: "市场营销",
  tags: ["复盘", "营销", "Q3", "策略分析"],
  readTime: "8 分钟",
  views: 1245,
  likes: 89,
  content: `
# 执行摘要

本报告详细回顾了2024年第三季度的市场营销活动，分析了各渠道的表现、关键成果以及未来改进方向。

## 活动概览

第三季度我们共执行了12个主要营销活动，覆盖线上和线下多个渠道：

- **数字营销**：社交媒体、搜索引擎营销、内容营销
- **线下活动**：行业展会、客户研讨会、合作伙伴活动
- **品牌建设**：品牌焕新、公关传播

## 关键数据指标

### 流量与转化
- 网站访问量：**+45%** (同比Q2)
- 潜在客户数：**2,847** 个
- 转化率：**12.5%** (提升 2.3%)
- 平均获客成本：**¥245** (下降 15%)

### 社交媒体表现
- 粉丝增长：**+23,500** 
- 互动率：**8.7%** (行业平均 5.2%)
- 内容覆盖：**150万+** 人次

## 成功案例

### 1. 产品发布会
9月15日举办的新产品发布会取得了超出预期的效果：
- 线上观看人数：45,000+
- 媒体报道：68 篇
- 社交媒体讨论量：25,000+ 条

### 2. 内容营销系列
"行业洞察"系列文章获得了广泛关注：
- 平均阅读量：8,500 次/篇
- 分享次数：1,200+ 次
- 带来潜在客户：320 个

## 挑战与教训

虽然整体表现良好，但我们也遇到了一些挑战：

1. **预算超支**：部分活动因额外需求导致预算超支 12%
2. **执行延迟**：有 3 个活动因协调问题延期执行
3. **效果追踪**：部分线下活动的效果追踪不够完善

## 改进建议

基于本季度的经验，我们提出以下改进建议：

### 短期优化（Q4）
- 加强预算控制和审批流程
- 建立更完善的项目管理机制
- 优化数据追踪工具和流程

### 中长期规划（2025 H1）
- 投资营销自动化工具
- 建立更系统的内容库
- 加强团队培训和能力建设

## 结论

第三季度的市场营销活动总体上取得了良好成效，各项关键指标均有显著提升。通过总结经验教训，我们有信心在第四季度取得更好的成绩。

---

*如有任何问题或建议，欢迎联系市场营销部门。*
  `,
};

const relatedArticles = [
  { title: "2024 年度市场营销策略", category: "市场营销" },
  { title: "数字营销最佳实践", category: "市场营销" },
  { title: "客户获取成本优化指南", category: "市场营销" },
];

const comments = [
  {
    id: "1",
    author: "李明",
    avatar: "李",
    content: "非常详细的复盘报告！数据分析部分特别有价值，建议其他团队也参考这个模板。",
    time: "2小时前",
    likes: 12,
  },
  {
    id: "2",
    author: "王芳",
    avatar: "王",
    content: "关于预算控制的建议很实用，我们产品团队也遇到了类似问题。期待看到Q4的改进效果。",
    time: "5小时前",
    likes: 8,
  },
];

export function ArticleDetail({ onBack }: ArticleDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState(comments);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const handleComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: "张伟",
        avatar: "张",
        content: commentText,
        time: "刚刚",
        likes: 0,
      };
      setLocalComments([newComment, ...localComments]);
      setCommentText("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回知识中心
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mb-6">{article.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <span>•</span>
              <span>{article.readTime}阅读</span>
              <span>•</span>
              <span>{article.views} 次浏览</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark
                  className={`h-4 w-4 mr-2 ${
                    isBookmarked ? "fill-primary text-primary" : ""
                  }`}
                />
                {isBookmarked ? "已收藏" : "收藏"}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                编辑
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Article Content */}
        <div className="prose prose-slate max-w-none mb-12">
          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>

        <Separator className="mb-8" />

        {/* Engagement */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant={hasLiked ? "default" : "outline"}
            onClick={handleLike}
            className={hasLiked ? "bg-primary" : ""}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            {hasLiked ? "已点赞" : "点赞"} ({likes})
          </Button>
          <Button variant="outline">
            <MessageCircle className="h-4 w-4 mr-2" />
            评论 ({localComments.length})
          </Button>
        </div>

        {/* Comments Section */}
        <div className="space-y-6 mb-8">
          <h3>评论</h3>

          {/* Add Comment */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="写下您的想法..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleComment} className="bg-primary">
                    发表评论
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {localComments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {comment.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span>{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">{comment.content}</p>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3 w-3 mr-2" />
                        {comment.likes > 0 ? `${comment.likes}` : "点赞"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="mb-4">相关文章</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((related, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">
                    {related.category}
                  </Badge>
                  <h4>{related.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
