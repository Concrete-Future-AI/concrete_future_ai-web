import { useState } from "react";
import { Users, Shield, FileText, Database, BarChart3, Plus, MoreVertical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";

const users = [
  {
    id: "1",
    name: "张伟",
    email: "zhang.wei@synapse.com",
    role: "管理员",
    status: "活跃",
    lastActive: "2分钟前",
    department: "技术部",
  },
  {
    id: "2",
    name: "李明",
    email: "li.ming@synapse.com",
    role: "内容贡献者",
    status: "活跃",
    lastActive: "15分钟前",
    department: "市场部",
  },
  {
    id: "3",
    name: "王芳",
    email: "wang.fang@synapse.com",
    role: "普通用户",
    status: "活跃",
    lastActive: "1小时前",
    department: "销售部",
  },
  {
    id: "4",
    name: "刘强",
    email: "liu.qiang@synapse.com",
    role: "普通用户",
    status: "禁用",
    lastActive: "3天前",
    department: "人力资源部",
  },
  {
    id: "5",
    name: "陈静",
    email: "chen.jing@synapse.com",
    role: "内容贡献者",
    status: "活跃",
    lastActive: "30分钟前",
    department: "产品部",
  },
  {
    id: "6",
    name: "赵磊",
    email: "zhao.lei@synapse.com",
    role: "普通用户",
    status: "活跃",
    lastActive: "2小时前",
    department: "财务部",
  },
];

const roles = [
  { id: "1", name: "管理员", users: 5, description: "完全访问权限，可管理所有模块" },
  { id: "2", name: "内容贡献者", users: 15, description: "可创建和编辑知识文章" },
  { id: "3", name: "市场专员", users: 8, description: "市场相关数据和文档访问" },
  { id: "4", name: "研发工程师", users: 20, description: "技术文档和代码库访问" },
  { id: "5", name: "普通用户", users: 45, description: "基本浏览和查询权限" },
];

const dataSources = [
  {
    id: "1",
    name: "Salesforce CRM",
    type: "CRM",
    status: "健康",
    lastSync: "5分钟前",
  },
  {
    id: "2",
    name: "Google Analytics",
    type: "分析",
    status: "健康",
    lastSync: "10分钟前",
  },
  {
    id: "3",
    name: "内部数据库",
    type: "数据库",
    status: "同步中",
    lastSync: "正在同步...",
  },
  {
    id: "4",
    name: "Slack",
    type: "通讯",
    status: "错误",
    lastSync: "2小时前",
  },
];

const permissions = [
  "知识中心 - 市场营销",
  "知识中心 - 产品研发",
  "知识中心 - 人力资源",
  "知识中心 - 法务合规",
  "数据看板 - 销售业绩",
  "数据看板 - 网站流量",
  "创建内容",
  "编辑内容",
  "删除内容",
];

export function AdminPanel() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1>管理中心</h1>
          <p className="text-muted-foreground mt-1">管理用户、权限、内容和数据源</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              用户管理
            </TabsTrigger>
            <TabsTrigger value="roles" className="gap-2">
              <Shield className="h-4 w-4" />
              角色与权限
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText className="h-4 w-4" />
              内容管理
            </TabsTrigger>
            <TabsTrigger value="datasources" className="gap-2">
              <Database className="h-4 w-4" />
              数据源管理
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              平台使用分析
            </TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <Input
                placeholder="搜索用户..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button className="bg-primary">
                <Plus className="h-4 w-4 mr-2" />
                邀请新用户
              </Button>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>姓名</TableHead>
                    <TableHead>邮箱</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>最后活跃</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "活跃" ? "default" : "destructive"}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>编辑用户</DropdownMenuItem>
                            <DropdownMenuItem>修改角色</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              {user.status === "活跃" ? "禁用用户" : "启用用户"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Roles & Permissions */}
          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Roles List */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>角色列表</CardTitle>
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all border ${
                        selectedRole === role.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>{role.name}</span>
                        <Badge variant={selectedRole === role.id ? "outline" : "secondary"}>
                          {role.users} 人
                        </Badge>
                      </div>
                      <p className={`text-xs ${selectedRole === role.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {role.description}
                      </p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Permissions Matrix */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedRole
                      ? `${roles.find((r) => r.id === selectedRole)?.name} - 权限设置`
                      : "请选择一个角色"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedRole ? (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {permissions.map((permission, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox id={`perm-${index}`} />
                              <label htmlFor={`perm-${index}`} className="cursor-pointer">
                                {permission}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 flex justify-end gap-2">
                        <Button variant="outline">取消</Button>
                        <Button className="bg-primary">保存权限</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      从左侧选择一个角色来配置权限
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>内容管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="mb-2">知识分类管理</h3>
                  <p className="text-muted-foreground mb-4">
                    管理知识中心的分类结构，添加、编辑或删除分类
                  </p>
                  <Button variant="outline">管理分类</Button>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="mb-2">精选文章设置</h3>
                  <p className="text-muted-foreground mb-4">
                    选择要在知识中心首页展示的精选文章
                  </p>
                  <Button variant="outline">设置精选</Button>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="mb-2">内容审核</h3>
                  <p className="text-muted-foreground mb-4">
                    查看和审核用户提交的内容，管理内容版本历史
                  </p>
                  <Button variant="outline">查看待审核</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Sources */}
          <TabsContent value="datasources" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                连接和管理企业的数据来源，监控同步状态
              </p>
              <Button className="bg-primary">
                <Plus className="h-4 w-4 mr-2" />
                添加数据源
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataSources.map((source) => (
                <Card key={source.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{source.name}</CardTitle>
                        <p className="text-muted-foreground mt-1">{source.type}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>配置</DropdownMenuItem>
                          <DropdownMenuItem>立即同步</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            断开连接
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">状态</span>
                      <Badge
                        variant={
                          source.status === "健康"
                            ? "default"
                            : source.status === "同步中"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {source.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">最后同步</span>
                      <span>{source.lastSync}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Platform Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>活跃用户</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>93</div>
                  <p className="text-xs text-muted-foreground mt-1">过去 7 天</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>知识文章</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>247</div>
                  <p className="text-xs text-muted-foreground mt-1">总文章数</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI 对话</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>1,542</div>
                  <p className="text-xs text-muted-foreground mt-1">本月总数</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>最受欢迎的知识文章</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>文章标题</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>浏览次数</TableHead>
                      <TableHead>收藏次数</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>员工休假政策 2024</TableCell>
                      <TableCell>人力资源</TableCell>
                      <TableCell>1,245</TableCell>
                      <TableCell>89</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>产品创新指南</TableCell>
                      <TableCell>产品研发</TableCell>
                      <TableCell>987</TableCell>
                      <TableCell>76</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>市场营销策略指南</TableCell>
                      <TableCell>市场营销</TableCell>
                      <TableCell>856</TableCell>
                      <TableCell>64</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
