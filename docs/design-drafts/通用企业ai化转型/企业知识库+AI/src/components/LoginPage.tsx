import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LogIn } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: "admin" | "user") => void;
}

const demoAccounts = [
  {
    name: "张伟（管理员）",
    email: "zhang.wei@synapse.com",
    password: "admin123",
    role: "admin" as const,
    description: "完全访问权限，可管理用户和系统设置",
  },
  {
    name: "李明（内容贡献者）",
    email: "li.ming@synapse.com",
    password: "user123",
    role: "user" as const,
    description: "可创建和编辑知识文章",
  },
  {
    name: "王芳（普通用户）",
    email: "wang.fang@synapse.com",
    password: "user123",
    role: "user" as const,
    description: "可查看知识库和数据看板",
  },
];

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      const account = demoAccounts.find((acc) => acc.email === email);
      onLogin(account?.role || "user");
    }, 800);
  };

  const handleQuickLogin = (account: typeof demoAccounts[0]) => {
    setIsLoading(true);
    setEmail(account.email);
    setPassword(account.password);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(account.role);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Logo and Login Form */}
        <div className="w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
              <svg
                width="32"
                height="32"
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
            <h1 className="mb-2">欢迎使用 Synapse</h1>
            <p className="text-muted-foreground">解锁集体智慧的力量</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">公司邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@synapse.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 mt-8"
              disabled={isLoading}
            >
              {isLoading ? "登录中..." : "安全登录"}
            </Button>

            <div className="flex items-center justify-center gap-4 text-muted-foreground pt-4">
              <button type="button" className="hover:text-primary transition-colors">
                忘记密码？
              </button>
              <span>•</span>
              <button type="button" className="hover:text-primary transition-colors">
                使用单点登录 (SSO)
              </button>
            </div>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5 text-primary" />
                演示账号 - 一键登录
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground mb-4">
                点击下方账号即可快速登录体验不同角色的功能
              </p>
              {demoAccounts.map((account, index) => (
                <div
                  key={index}
                  onClick={() => handleQuickLogin(account)}
                  className="p-4 rounded-lg border border-border hover:border-primary hover:bg-card transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="group-hover:text-primary transition-colors">
                        {account.name}
                      </h4>
                      <p className="text-muted-foreground mt-1">
                        {account.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      登录
                    </Button>
                  </div>
                  <div className="space-y-1 mt-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>邮箱：</span>
                      <code className="bg-muted px-2 py-1 rounded">
                        {account.email}
                      </code>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>密码：</span>
                      <code className="bg-muted px-2 py-1 rounded">
                        {account.password}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
