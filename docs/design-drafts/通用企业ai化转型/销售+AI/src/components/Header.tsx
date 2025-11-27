import { Search, Plus, Bell, User, Download, Settings, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { AISmartSearch } from './AISmartSearch';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [notifications] = useState(3);

  const handleExport = () => {
    toast.success('数据导出已开始，完成后将通知您');
  };

  return (
    <header className="border-b border-purple-100 bg-gradient-to-r from-white via-purple-50/30 to-fuchsia-50/30 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-purple-700 flex items-center justify-center shadow-xl shadow-purple-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
              <Sparkles className="h-6 w-6 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-foreground font-bold tracking-tight text-xl">{title}</h1>
              <p className="text-xs text-purple-600 mt-0.5 font-semibold">慧眼系统 · 某跨国零售集团AI销售增长实践</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-lg mx-12">
          <AISmartSearch />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            导出报告
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all text-white">
                <Plus className="h-4 w-4" />
                快速创建
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem onClick={() => toast.success('✓ 创建新销售线索')}>
                📊 创建新线索
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success('✓ 创建跟进任务')}>
                ✅ 创建新任务
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success('✓ 添加新客户')}>
                👥 创建新客户
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.success('✓ 生成分析报告')}>
                📈 创建新报告
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-purple-50 transition-all">
            <Bell className="h-5 w-5 text-purple-600" />
            {notifications > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-br from-fuchsia-500 to-pink-600 border-0 shadow-lg font-semibold"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg hover:bg-secondary">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                个人设置
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                系统设置
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}