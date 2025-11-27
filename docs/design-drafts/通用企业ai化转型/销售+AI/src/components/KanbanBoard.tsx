import { useState } from 'react';
import { GripVertical, Plus, MoreVertical, DollarSign, Calendar, User, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, Reorder } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  owner: string;
  closeDate: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

interface Stage {
  id: string;
  name: string;
  color: string;
  deals: Deal[];
}

interface KanbanBoardProps {
  onDealClick?: (deal: Deal) => void;
}

export function KanbanBoard({ onDealClick }: KanbanBoardProps) {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'prospecting',
      name: '初步接触',
      color: '#3B82F6',
      deals: [
        {
          id: '1',
          title: '企业级CRM系统',
          company: '科技创新公司',
          value: 580000,
          probability: 30,
          owner: '张伟',
          closeDate: '2025-12-15',
          tags: ['企业软件', '新客户'],
          priority: 'high'
        },
        {
          id: '2',
          title: '数据分析平台',
          company: '智慧金融',
          value: 320000,
          probability: 25,
          owner: '李娜',
          closeDate: '2025-12-20',
          tags: ['数据服务'],
          priority: 'medium'
        }
      ]
    },
    {
      id: 'qualification',
      name: '需求分析',
      color: '#F59E0B',
      deals: [
        {
          id: '3',
          title: '云存储解决方案',
          company: '电商平台',
          value: 450000,
          probability: 50,
          owner: '王强',
          closeDate: '2025-12-10',
          tags: ['云计算', 'SaaS'],
          priority: 'high'
        },
        {
          id: '4',
          title: '安全防护系统',
          company: '银行集团',
          value: 680000,
          probability: 45,
          owner: '赵敏',
          closeDate: '2025-12-18',
          tags: ['安全', '金融'],
          priority: 'high'
        }
      ]
    },
    {
      id: 'proposal',
      name: '方案报价',
      color: '#FF7A00',
      deals: [
        {
          id: '5',
          title: 'AI智能客服',
          company: '零售连锁',
          value: 380000,
          probability: 70,
          owner: '陈静',
          closeDate: '2025-12-08',
          tags: ['AI', '客服'],
          priority: 'medium'
        }
      ]
    },
    {
      id: 'negotiation',
      name: '合同谈判',
      color: '#00A75D',
      deals: [
        {
          id: '6',
          title: 'ERP系统升级',
          company: '制造集团',
          value: 920000,
          probability: 85,
          owner: '张伟',
          closeDate: '2025-12-05',
          tags: ['ERP', '续约'],
          priority: 'high'
        }
      ]
    },
    {
      id: 'closed',
      name: '已成交',
      color: '#10B981',
      deals: [
        {
          id: '7',
          title: '营销自动化平台',
          company: '互联网公司',
          value: 560000,
          probability: 100,
          owner: '李娜',
          closeDate: '2025-11-30',
          tags: ['营销', 'SaaS'],
          priority: 'high'
        }
      ]
    }
  ]);

  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);
  const [draggedFromStage, setDraggedFromStage] = useState<string | null>(null);

  const handleDragStart = (deal: Deal, stageId: string) => {
    setDraggedDeal(deal);
    setDraggedFromStage(stageId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetStageId: string) => {
    if (!draggedDeal || !draggedFromStage) return;

    setStages(prevStages => {
      const newStages = prevStages.map(stage => {
        if (stage.id === draggedFromStage) {
          return {
            ...stage,
            deals: stage.deals.filter(d => d.id !== draggedDeal.id)
          };
        }
        if (stage.id === targetStageId) {
          return {
            ...stage,
            deals: [...stage.deals, draggedDeal]
          };
        }
        return stage;
      });

      const targetStage = newStages.find(s => s.id === targetStageId);
      toast.success(`已将"${draggedDeal.title}"移至"${targetStage?.name}"`, {
        icon: '🎯',
        duration: 2000
      });
      return newStages;
    });

    setDraggedDeal(null);
    setDraggedFromStage(null);
  };

  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getWeightedValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  };

  return (
    <div className="h-full overflow-x-auto bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="flex gap-6 p-6 min-w-max">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(stage.id)}
          >
            {/* Stage Header */}
            <div className="mb-4 p-4 rounded-xl bg-card border border-border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full shadow-md" style={{ backgroundColor: stage.color }} />
                  <h3 className="font-semibold">{stage.name}</h3>
                  <Badge className="gradient-success border-0 text-white text-xs">
                    {stage.deals.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-primary hover:text-white transition-all">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">总价值:</span>
                  <span className="font-semibold text-primary">¥{(getTotalValue(stage.deals) / 10000).toFixed(1)}万</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">加权价值:</span>
                  <span className="font-semibold text-accent">¥{(getWeightedValue(stage.deals) / 10000).toFixed(1)}万</span>
                </div>
              </div>
            </div>

            {/* Deals */}
            <div className="space-y-3">
              {stage.deals.map((deal) => (
                <motion.div
                  key={deal.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  draggable
                  onDragStart={() => handleDragStart(deal, stage.id)}
                  onClick={() => onDealClick?.(deal)}
                  className="cursor-move"
                >
                  <Card className="hover:shadow-xl transition-all rounded-xl group hover-lift" style={{ borderLeft: `4px solid ${stage.color}` }}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                            {deal.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">{deal.company}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-lg">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-lg">
                              <DropdownMenuItem>编辑</DropdownMenuItem>
                              <DropdownMenuItem>删除</DropdownMenuItem>
                              <DropdownMenuItem>复制</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-secondary/50">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="font-semibold text-primary">¥{(deal.value / 10000).toFixed(1)}万</span>
                          <Badge className="ml-auto gradient-success border-0 text-white text-xs">
                            {deal.probability}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-secondary/50">
                          <Calendar className="h-3 w-3" />
                          <span>{deal.closeDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-secondary/50">
                          <User className="h-3 w-3" />
                          <span>{deal.owner}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {deal.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs rounded-md">
                            {tag}
                          </Badge>
                        ))}
                        {deal.priority === 'high' && (
                          <Badge className="text-xs gradient-primary border-0 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            高优先级
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {stage.deals.length === 0 && (
                <div className="text-center py-12 text-sm text-muted-foreground border-2 border-dashed border-border rounded-xl bg-secondary/20">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p>拖拽商机到此阶段</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}