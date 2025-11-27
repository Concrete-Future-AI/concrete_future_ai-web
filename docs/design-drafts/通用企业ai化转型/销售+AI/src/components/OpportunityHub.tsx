import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { enhancedOpportunities } from '../lib/enhancedMockData';
import { Building2, UserPlus, X, Calendar, DollarSign, TrendingUp, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

export function OpportunityHub() {
  const [sortBy, setSortBy] = useState('score');
  const [selectedSource, setSelectedSource] = useState('all');
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [opportunities, setOpportunities] = useState(enhancedOpportunities);

  const filteredOpportunities = opportunities
    .filter(opp => selectedSource === 'all' || opp.source === selectedSource)
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'value') return b.estimatedValue - a.estimatedValue;
      return 0;
    });

  const handleCreateTask = (oppId: string, oppName: string) => {
    setSelectedOpportunity(oppId);
    setShowTaskDialog(true);
  };

  const handleIgnore = (oppId: string) => {
    setOpportunities(opportunities.filter(opp => opp.id !== oppId));
    toast.success('机会已忽略');
  };

  const handleSubmitTask = () => {
    setShowTaskDialog(false);
    toast.success('任务创建成功');
  };

  const totalValue = filteredOpportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0);

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">机会识别中心</h2>
            <p className="text-sm text-muted-foreground mt-1">
              AI智能识别 · {filteredOpportunities.length} 个高潜力机会 · 总价值 ¥{(totalValue / 10000).toFixed(0)}万
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              高级筛选
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                  排序方式
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">按AI推荐度</SelectItem>
                    <SelectItem value="value">按预计金额</SelectItem>
                    <SelectItem value="recent">按最近活跃度</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                  机会来源
                </label>
                <Select value={selectedSource} onValueChange={setSelectedSource}>
                  <SelectTrigger className="border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部来源</SelectItem>
                    <SelectItem value="网站访问">网站访问</SelectItem>
                    <SelectItem value="市场活动">市场活动</SelectItem>
                    <SelectItem value="社交媒体">社交媒体</SelectItem>
                    <SelectItem value="内容营销">内容营销</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                  客户标签
                </label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    高价值
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    决策者
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    急需
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunity Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-md transition-all border-border group">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-14 w-14 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground flex-shrink-0">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium tracking-tight mb-2">{opportunity.customerName}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-primary-foreground font-medium">
                          {opportunity.score}
                        </Badge>
                        <span className="text-xs text-muted-foreground">AI推荐度</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Signals */}
                <div className="space-y-3">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    关键信号
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.signals.map((signal, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary"
                        className="bg-accent/10 text-accent border border-accent/20"
                      >
                        {signal}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      <span>预计金额</span>
                    </div>
                    <div className="font-medium">
                      ¥{(opportunity.estimatedValue / 10000).toFixed(1)}万
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <UserPlus className="h-3 w-3" />
                      <span>联系人</span>
                    </div>
                    <div className="font-medium">
                      {opportunity.contact}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    {opportunity.source}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    size="sm"
                    className="w-full"
                    onClick={() => handleCreateTask(opportunity.id, opportunity.customerName)}
                  >
                    创建任务
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full gap-1"
                    onClick={() => toast.success('分配功能')}
                  >
                    <UserPlus className="h-3 w-3" />
                    分配
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="w-full gap-1 text-muted-foreground hover:text-destructive"
                    onClick={() => handleIgnore(opportunity.id)}
                  >
                    <X className="h-3 w-3" />
                    忽略
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Task Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-medium tracking-tight">创建跟进任务</DialogTitle>
            <DialogDescription className="text-xs">
              为这个销售机会创建一个跟进任务
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                任务类型
              </label>
              <Select defaultValue="call">
                <SelectTrigger className="border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">电话跟进</SelectItem>
                  <SelectItem value="email">邮件沟通</SelectItem>
                  <SelectItem value="meeting">安排会议</SelectItem>
                  <SelectItem value="demo">产品演示</SelectItem>
                  <SelectItem value="proposal">发送方案</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                截止日期
              </label>
              <Input type="date" className="border-border" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                优先级
              </label>
              <Select defaultValue="medium">
                <SelectTrigger className="border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
                备注
              </label>
              <Textarea 
                placeholder="添加任务备注..." 
                className="border-border min-h-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTaskDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitTask}>
              创建任务
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
