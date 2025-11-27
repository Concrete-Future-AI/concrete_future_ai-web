import { useState } from "react";
import { MoreVertical, Download, Eye, X, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const salesData = [
  { month: "1月", value: 42000, target: 40000 },
  { month: "2月", value: 38000, target: 40000 },
  { month: "3月", value: 51000, target: 45000 },
  { month: "4月", value: 46000, target: 45000 },
  { month: "5月", value: 58000, target: 50000 },
  { month: "6月", value: 62000, target: 55000 },
];

const trafficData = [
  { name: "搜索引擎", value: 45 },
  { name: "直接访问", value: 25 },
  { name: "社交媒体", value: 20 },
  { name: "其他", value: 10 },
];

const projectData = [
  { project: "项目A", progress: 85 },
  { project: "项目B", progress: 65 },
  { project: "项目C", progress: 90 },
  { project: "项目D", progress: 45 },
];

const COLORS = ["#D97D54", "#888888", "#2D2D2D", "#F0EEE9"];

export function Analytics() {
  const [selectedDashboard, setSelectedDashboard] = useState("sales");
  const [timeRange, setTimeRange] = useState("7days");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1>数据看板</h1>
            <p className="text-muted-foreground mt-1">实时监控关键业务指标</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">销售业绩看板</SelectItem>
                <SelectItem value="traffic">网站流量分析</SelectItem>
                <SelectItem value="project">项目进度看板</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">今天</SelectItem>
                <SelectItem value="7days">近7天</SelectItem>
                <SelectItem value="30days">近30天</SelectItem>
                <SelectItem value="custom">自定义</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">总销售额</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div>¥297,000</div>
                <p className="text-xs text-primary">↑ 15% 较上月</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">活跃用户</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div>2,845</div>
                <p className="text-xs text-primary">↑ 8% 较上月</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">转化率</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div>12.5%</div>
                <p className="text-xs text-primary">↑ 2.3% 较上月</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">系统健康度</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div>99.9%</div>
                <p className="text-xs text-muted-foreground">运行正常</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sales Performance */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>销售业绩趋势</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    导出数据
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    查看详情
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <X className="h-4 w-4 mr-2" />
                    从看板移除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-80">
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
                      tickFormatter={(value) => `¥${value / 1000}k`}
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
                      name="实际"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#888888"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#888888", r: 4 }}
                      name="目标"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>流量来源</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    导出数据
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    查看详情
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <X className="h-4 w-4 mr-2" />
                    从看板移除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Project Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>项目进度</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    导出数据
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    查看详情
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <X className="h-4 w-4 mr-2" />
                    从看板移除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} stroke="#888888" />
                    <YAxis
                      dataKey="project"
                      type="category"
                      stroke="#888888"
                      fontSize={12}
                    />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#D97D54" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
