import { useState } from "react";
import { Search, Bell, Settings, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface HeaderProps {
  onSearchClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: "admin" | "user";
}

const notifications = [
  {
    id: "1",
    title: "新文章发布",
    content: "张伟 发布了「2024 年第三季度市场营销活动复盘」",
    time: "5分钟前",
    unread: true,
  },
  {
    id: "2",
    title: "评论提醒",
    content: "李明 在您的文章中发表了评论",
    time: "1小时前",
    unread: true,
  },
  {
    id: "3",
    title: "系统通知",
    content: "平台将于本周日进行系统维护",
    time: "3小时前",
    unread: false,
  },
  {
    id: "4",
    title: "任务提醒",
    content: "您有 3 个待办任务即将到期",
    time: "昨天",
    unread: false,
  },
];

export function Header({ onSearchClick, currentPage, onNavigate, userRole }: HeaderProps) {
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => n.unread).length
  );

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-8 gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4L8 12L16 20L24 12L16 4Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 20L16 28L24 20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-medium">Synapse</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div
            onClick={onSearchClick}
            className="relative cursor-pointer group"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="向 Synapse 提问..."
              className="pl-10 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              readOnly
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Button
            variant={currentPage === "dashboard" ? "secondary" : "ghost"}
            onClick={() => onNavigate("dashboard")}
          >
            仪表盘
          </Button>
          <Button
            variant={currentPage === "knowledge" ? "secondary" : "ghost"}
            onClick={() => onNavigate("knowledge")}
          >
            知识中心
          </Button>
          <Button
            variant={currentPage === "analytics" ? "secondary" : "ghost"}
            onClick={() => onNavigate("analytics")}
          >
            数据看板
          </Button>
          {userRole === "admin" && (
            <Button
              variant={currentPage === "admin" ? "secondary" : "ghost"}
              onClick={() => onNavigate("admin")}
            >
              管理中心
            </Button>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h4>通知</h4>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMarkAllRead}
                      className="h-auto p-0 text-xs"
                    >
                      全部已读
                    </Button>
                  )}
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                      notification.unread ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      )}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  查看全部通知
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    张
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div>
                  <p>张伟</p>
                  <p className="text-xs text-muted-foreground">
                    zhang.wei@synapse.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>个人资料</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>设置</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
