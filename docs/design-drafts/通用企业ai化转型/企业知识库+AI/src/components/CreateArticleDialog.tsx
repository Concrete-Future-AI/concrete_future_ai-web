import { useState } from "react";
import { X, Upload, Tag, FolderOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";

interface CreateArticleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "市场营销",
  "产品研发",
  "人力资源",
  "法务合规",
  "财务管理",
  "技术文档",
  "销售支持",
];

const suggestedTags = [
  "复盘",
  "策略",
  "分析",
  "指南",
  "最佳实践",
  "教程",
  "政策",
  "流程",
];

export function CreateArticleDialog({ isOpen, onClose }: CreateArticleDialogProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag("");
    }
  };

  const handleSubmit = () => {
    // Simulate article creation
    console.log({
      title,
      category,
      content,
      tags: selectedTags,
    });
    
    // Reset form
    setTitle("");
    setCategory("");
    setContent("");
    setSelectedTags([]);
    setCustomTag("");
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>创建新文章</DialogTitle>
          <DialogDescription>
            创建一篇新的知识文章，分享您的见解和经验
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">文章标题 *</Label>
            <Input
              id="title"
              placeholder="输入文章标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">分类 *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  <SelectValue placeholder="选择文章分类" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>标签</Label>
            
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted/50">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Suggested Tags */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">常用标签（点击添加）</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`cursor-pointer transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() =>
                      selectedTags.includes(tag)
                        ? handleRemoveTag(tag)
                        : handleAddTag(tag)
                    }
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Custom Tag Input */}
            <div className="flex gap-2">
              <Input
                placeholder="添加自定义标签..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCustomTag}
              >
                添加
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">内容 *</Label>
            <Textarea
              id="content"
              placeholder="在此输入文章内容... 支持 Markdown 格式"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              支持 Markdown 语法，可以使用 # 标题、**粗体**、*斜体* 等格式
            </p>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>附件</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                点击上传或拖拽文件到此处
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                支持 PDF、Word、图片等格式，单个文件最大 10MB
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !category || !content.trim()}
            className="bg-primary"
          >
            发布文章
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
