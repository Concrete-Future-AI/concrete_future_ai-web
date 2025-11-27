import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Users, UserPlus, Shield, Key, Search, Edit, Trash2, MoreVertical, X } from 'lucide-react';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

const roles = [
  {
    name: 'AI平台管理员',
    users: 5,
    permissions: ['完全访问', '用户管理', '模型部署', '安全配置'],
    color: 'red',
    description: '平台最高权限，可管理所有资源和配置'
  },
  {
    name: '应用开发者',
    users: 42,
    permissions: ['API调用', 'SDK使用', 'Playground访问'],
    color: 'blue',
    description: '可调用API构建应用，但无法修改基础设施'
  },
  {
    name: 'HR应用开发者',
    users: 8,
    permissions: ['HR知识库访问', 'Llama-3-70B', 'ChatGLM3-6B'],
    color: 'green',
    description: '仅可访问HR相关知识库和指定模型'
  },
  {
    name: '数据分析师',
    users: 23,
    permissions: ['数据知识库访问', 'Qwen-14B', '报表生成'],
    color: 'purple',
    description: '专注于数据分析场景的权限配置'
  },
  {
    name: '只读审计员',
    users: 12,
    permissions: ['日志查看', '报表查看', '无写入权限'],
    color: 'gray',
    description: '仅可查看审计日志和使用报表'
  },
];

const initialUsers = [
  {
    id: '1',
    name: '张伟',
    email: 'zhang.wei@company.com',
    role: 'AI平台管理员',
    department: 'IT部',
    status: 'active',
    lastLogin: '5分钟前',
    apiCalls: '2.4K'
  },
  {
    id: '2',
    name: '李娜',
    email: 'li.na@company.com',
    role: '应用开发者',
    department: '研发中心',
    status: 'active',
    lastLogin: '2小时前',
    apiCalls: '156.8K'
  },
  {
    id: '3',
    name: '王强',
    email: 'wang.qiang@company.com',
    role: 'AI平台管理员',
    department: 'IT部',
    status: 'active',
    lastLogin: '1天前',
    apiCalls: '890'
  },
  {
    id: '4',
    name: '赵敏',
    email: 'zhao.min@company.com',
    role: 'HR应用开发者',
    department: '人力资源部',
    status: 'active',
    lastLogin: '3小时前',
    apiCalls: '45.2K'
  },
  {
    id: '5',
    name: '刘洋',
    email: 'liu.yang@company.com',
    role: '数据分析师',
    department: '数据部',
    status: 'active',
    lastLogin: '1小时前',
    apiCalls: '67.3K'
  },
  {
    id: '6',
    name: '陈静',
    email: 'chen.jing@company.com',
    role: '应用开发者',
    department: '产品部',
    status: 'inactive',
    lastLogin: '7天前',
    apiCalls: '12.1K'
  },
];

const modelPermissions = [
  { name: 'Llama-3-70B', category: '通用对话' },
  { name: 'ChatGLM3-6B', category: '中文对话' },
  { name: 'Qwen-14B', category: '企业知识' },
  { name: 'CodeLlama-13B', category: '代码生成' },
];

const knowledgeBasePermissions = [
  { name: 'Confluence-产品文档', category: '产品' },
  { name: 'SharePoint-法务合同', category: '法务' },
  { name: 'GitLab-核心代码库', category: '研发' },
  { name: 'HR员工手册', category: '人力' },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  apiCalls: string;
}

export function IAMManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // 新用户表单状态
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '应用开发者',
    department: ''
  });

  // 过滤用户
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 添加用户
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.department) {
      toast.error('请填写所有必填字段');
      return;
    }

    const user: User = {
      id: String(users.length + 1),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: 'active',
      lastLogin: '刚刚',
      apiCalls: '0'
    };

    setUsers([...users, user]);
    toast.success(`用户 ${newUser.name} 已成功添加`);
    setAddUserOpen(false);
    setNewUser({ name: '', email: '', role: '应用开发者', department: '' });
  };

  // 编辑用户
  const handleEditUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map(u =>
      u.id === selectedUser.id ? selectedUser : u
    );

    setUsers(updatedUsers);
    toast.success(`用户 ${selectedUser.name} 的信息已更新`);
    setEditUserOpen(false);
    setSelectedUser(null);
  };

  // 删除用户
  const handleDeleteUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.filter(u => u.id !== selectedUser.id);
    setUsers(updatedUsers);
    toast.success(`用户 ${selectedUser.name} 已删除`);
    setDeleteUserOpen(false);
    setSelectedUser(null);
  };

  // 切换用户状态
  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(u =>
      u.id === userId ? { ...u, status: (u.status === 'active' ? 'inactive' : 'active') as 'active' | 'inactive' } : u
    );
    setUsers(updatedUsers);
    const user = users.find(u => u.id === userId);
    toast.success(`用户 ${user?.name} 状态已更新为 ${user?.status === 'active' ? '未活跃' : '活跃'}`);
  };

  // 打开编辑对话框
  const openEditDialog = (user: User) => {
    setSelectedUser({ ...user });
    setEditUserOpen(true);
  };

  // 打开删除对话框
  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteUserOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg text-white">用户与访问控制 (IAM)</div>
          <div className="text-sm text-slate-400">集成企业LDAP/AD，实现统一身份认证与细粒度权限管理</div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
            onClick={() => toast.info('正在同步LDAP用户...')}
          >
            <Key className="mr-2 h-4 w-4" />
            同步LDAP用户
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setAddUserOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            添加用户
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-800 bg-[#0d1117] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">总用户数</div>
              <div className="mt-1 text-2xl text-white">{users.length}</div>
              <div className="mt-1 text-xs text-green-400">+{users.filter(u => u.status === 'active').length - initialUsers.filter(u => u.status === 'active').length} 本月</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="border-slate-800 bg-[#0d1117] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">活跃用户</div>
              <div className="mt-1 text-2xl text-white">{users.filter(u => u.status === 'active').length}</div>
              <div className="mt-1 text-xs text-slate-400">过去7天</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Users className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="border-slate-800 bg-[#0d1117] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">角色总数</div>
              <div className="mt-1 text-2xl text-white">{roles.length}</div>
              <div className="mt-1 text-xs text-slate-400">5个系统角色</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="border-slate-800 bg-[#0d1117] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">API Key</div>
              <div className="mt-1 text-2xl text-white">142</div>
              <div className="mt-1 text-xs text-slate-400">8个新增(今日)</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
              <Key className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Roles */}
      <Card className="border-slate-800 bg-[#0d1117] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-white">角色权限管理</div>
            <div className="text-xs text-slate-400">基于角色的访问控制 (RBAC)</div>
          </div>
          <Button 
            variant="outline" 
            className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
            onClick={() => toast.info('创建新角色功能')}
          >
            <Shield className="mr-2 h-4 w-4" />
            创建新角色
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.name} className="border-slate-800 bg-slate-900/30 p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-white">{role.name}</div>
                    <div className="mt-1 text-xs text-slate-400">{role.description}</div>
                  </div>
                  <button className="text-slate-400 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full bg-${role.color}-400`} />
                  <span className="text-xs text-slate-400">{users.filter(u => u.role === role.name).length} 个用户</span>
                </div>

                <div className="space-y-1.5">
                  {role.permissions.slice(0, 3).map((permission) => (
                    <div key={permission} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="h-1 w-1 rounded-full bg-slate-500" />
                      <span>{permission}</span>
                    </div>
                  ))}
                  {role.permissions.length > 3 && (
                    <div className="text-xs text-blue-400">+{role.permissions.length - 3} 更多权限</div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
                    onClick={() => toast.info(`编辑角色: ${role.name}`)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    编辑
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
                    onClick={() => toast.warning(`删除角色: ${role.name}`)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Users Table */}
      <Card className="border-slate-800 bg-[#0d1117] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-white">用户列表</div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="搜索用户..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 border-slate-700 bg-slate-800/50 pl-9 text-white placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs text-slate-400">
                <th className="pb-3 pr-4">用户</th>
                <th className="pb-3 pr-4">角色</th>
                <th className="pb-3 pr-4">部门</th>
                <th className="pb-3 pr-4">状态</th>
                <th className="pb-3 pr-4">上次登录</th>
                <th className="pb-3 pr-4">API调用</th>
                <th className="pb-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-blue-500/20">
                        <AvatarFallback className="text-xs text-blue-400">
                          {user.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm text-white">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="pr-4">
                    <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="pr-4">
                    <div className="text-sm text-slate-300">{user.department}</div>
                  </td>
                  <td className="pr-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className="group"
                    >
                      <Badge
                        variant="outline"
                        className={`text-xs cursor-pointer transition-all ${
                          user.status === 'active'
                            ? 'border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20'
                            : 'border-slate-600 bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {user.status === 'active' ? '活跃' : '未活跃'}
                      </Badge>
                    </button>
                  </td>
                  <td className="pr-4">
                    <div className="text-sm text-slate-400">{user.lastLogin}</div>
                  </td>
                  <td className="pr-4">
                    <div className="text-sm text-white">{user.apiCalls}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-slate-400 hover:text-white hover:bg-slate-700"
                        onClick={() => openEditDialog(user)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => openDeleteDialog(user)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              没有找到匹配的用户
            </div>
          )}
        </div>
      </Card>

      {/* Permission Configuration */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-[#0d1117] p-6">
          <div className="mb-4">
            <div className="text-white">模型访问权限</div>
            <div className="text-xs text-slate-400">配置角色可访问的模型资源</div>
          </div>
          <div className="space-y-3">
            {modelPermissions.map((model) => (
              <div key={model.name} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 p-3 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Checkbox className="border-slate-600" />
                  <div>
                    <div className="text-sm text-white">{model.name}</div>
                    <div className="text-xs text-slate-400">{model.category}</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                  42 用户
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-slate-800 bg-[#0d1117] p-6">
          <div className="mb-4">
            <div className="text-white">知识库访问权限</div>
            <div className="text-xs text-slate-400">配置角色可访问的知识源</div>
          </div>
          <div className="space-y-3">
            {knowledgeBasePermissions.map((kb) => (
              <div key={kb.name} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 p-3 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Checkbox className="border-slate-600" />
                  <div>
                    <div className="text-sm text-white">{kb.name}</div>
                    <div className="text-xs text-slate-400">{kb.category}</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                  {kb.category}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Usage Quota */}
      <Card className="border-slate-800 bg-[#0d1117] p-6">
        <div className="mb-4">
          <div className="text-white">调用配额管理</div>
          <div className="text-xs text-slate-400">为不同角色设置API调用上限</div>
        </div>
        <div className="space-y-4">
          {[
            { role: 'AI平台管理员', used: 2500, limit: 1000000, percent: 0.25 },
            { role: '应用开发者', used: 450000, limit: 500000, percent: 90 },
            { role: 'HR应用开发者', used: 68000, limit: 100000, percent: 68 },
            { role: '数据分析师', used: 125000, limit: 200000, percent: 62.5 },
          ].map((quota) => (
            <div key={quota.role}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-300">{quota.role}</span>
                <span className="text-white">
                  {quota.used.toLocaleString()} / {quota.limit.toLocaleString()} 调用
                </span>
              </div>
              <Progress value={quota.percent} className="bg-slate-800" />
            </div>
          ))}
        </div>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent className="border-slate-700 bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle>添加新用户</DialogTitle>
            <DialogDescription className="text-slate-400">
              填写用户信息以添加到系统
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>姓名 *</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="例如: 张三"
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>邮箱 *</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="例如: zhang.san@company.com"
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>角色 *</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800">
                  {roles.map(role => (
                    <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>部门 *</Label>
              <Input
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                placeholder="例如: 研发中心"
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddUserOpen(false)}
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            >
              取消
            </Button>
            <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
              添加用户
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent className="border-slate-700 bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle>编辑用户信息</DialogTitle>
            <DialogDescription className="text-slate-400">
              修改用户的基本信息和角色
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>姓名</Label>
                <Input
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>邮箱</Label>
                <Input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>角色</Label>
                <Select value={selectedUser.role} onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}>
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-800">
                    {roles.map(role => (
                      <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>部门</Label>
                <Input
                  value={selectedUser.department}
                  onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
                  className="border-slate-700 bg-slate-800 text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditUserOpen(false)}
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            >
              取消
            </Button>
            <Button onClick={handleEditUser} className="bg-blue-600 hover:bg-blue-700">
              保存更改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteUserOpen} onOpenChange={setDeleteUserOpen}>
        <DialogContent className="border-slate-700 bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle>确认删除用户</DialogTitle>
            <DialogDescription className="text-slate-400">
              此操作无法撤销，确定要删除用户吗？
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-red-500/20">
                    <AvatarFallback className="text-sm text-red-400">
                      {selectedUser.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white">{selectedUser.name}</div>
                    <div className="text-xs text-slate-400">{selectedUser.email}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteUserOpen(false)}
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            >
              取消
            </Button>
            <Button
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
