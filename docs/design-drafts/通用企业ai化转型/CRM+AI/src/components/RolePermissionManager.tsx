import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Switch } from './ui/switch';
import { 
  Shield, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  Target,
  BarChart3,
  FileText,
  Settings,
  Lock,
  Unlock,
  Crown,
  Star,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion } from 'motion/react';

type Permission = {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'view' | 'edit' | 'delete' | 'manage';
};

type RoleConfig = {
  role: 'vp' | 'manager' | 'rep';
  name: string;
  description: string;
  color: string;
  icon: any;
  permissions: string[];
};

interface RolePermissionManagerProps {
  currentRole: 'vp' | 'manager' | 'rep';
}

export default function RolePermissionManager({ currentRole }: RolePermissionManagerProps) {
  const allPermissions: Permission[] = [
    // 查看权限
    { id: 'view_all_leads', name: '查看所有线索', description: '可以查看团队所有线索数据', icon: Eye, category: 'view' },
    { id: 'view_all_deals', name: '查看所有交易', description: '可以查看团队所有交易数据', icon: Eye, category: 'view' },
    { id: 'view_team_performance', name: '查看团队业绩', description: '可以查看团队成员业绩数据', icon: BarChart3, category: 'view' },
    { id: 'view_forecast', name: '查看销售预测', description: '可以查看AI销售预测报告', icon: Target, category: 'view' },
    { id: 'view_reports', name: '查看高级报表', description: '可以导出和查看详细报表', icon: FileText, category: 'view' },
    
    // 编辑权限
    { id: 'edit_own_leads', name: '编辑自己的线索', description: '可以编辑分配给自己的线索', icon: Edit, category: 'edit' },
    { id: 'edit_all_leads', name: '编辑所有线索', description: '可以编辑团队所有线索', icon: Edit, category: 'edit' },
    { id: 'reassign_leads', name: '重新分配线索', description: '可以将线索分配给其他人', icon: Users, category: 'edit' },
    { id: 'edit_deal_stages', name: '修改交易阶段', description: '可以修改交易所处阶段', icon: Edit, category: 'edit' },
    
    // 删除权限
    { id: 'delete_own_leads', name: '删除自己的线索', description: '可以删除自己的线索数据', icon: Trash2, category: 'delete' },
    { id: 'delete_all_leads', name: '删除所有线索', description: '可以删除任何线索数据', icon: Trash2, category: 'delete' },
    
    // 管理权限
    { id: 'manage_team', name: '管理团队成员', description: '可以添加、编辑团队成员', icon: Users, category: 'manage' },
    { id: 'manage_permissions', name: '管理权限', description: '可以设置团队成员权限', icon: Shield, category: 'manage' },
    { id: 'manage_settings', name: '系统设置', description: '可以修改系统配置', icon: Settings, category: 'manage' },
    { id: 'export_data', name: '导出数据', description: '可以导出所有数据', icon: FileText, category: 'manage' },
  ];

  const roleConfigs: RoleConfig[] = [
    {
      role: 'vp',
      name: 'VP - 销售副总裁',
      description: '全局管理权限，可查看和管理所有数据',
      color: 'from-purple-500 to-purple-600',
      icon: Crown,
      permissions: [
        'view_all_leads',
        'view_all_deals',
        'view_team_performance',
        'view_forecast',
        'view_reports',
        'edit_all_leads',
        'reassign_leads',
        'edit_deal_stages',
        'delete_all_leads',
        'manage_team',
        'manage_permissions',
        'manage_settings',
        'export_data'
      ]
    },
    {
      role: 'manager',
      name: 'Manager - 销售经理',
      description: '团队管理权限，可管理团队成员和数据',
      color: 'from-teal-500 to-teal-600',
      icon: Star,
      permissions: [
        'view_all_leads',
        'view_all_deals',
        'view_team_performance',
        'view_forecast',
        'view_reports',
        'edit_all_leads',
        'reassign_leads',
        'edit_deal_stages',
        'delete_own_leads',
        'manage_team',
        'export_data'
      ]
    },
    {
      role: 'rep',
      name: 'Rep - 客户经理',
      description: '基础权限，可管理自己的线索和交易',
      color: 'from-blue-500 to-blue-600',
      icon: Users,
      permissions: [
        'view_forecast',
        'edit_own_leads',
        'edit_deal_stages',
        'delete_own_leads'
      ]
    }
  ];

  const currentConfig = roleConfigs.find(r => r.role === currentRole)!;
  const Icon = currentConfig.icon;

  const hasPermission = (permissionId: string) => {
    return currentConfig.permissions.includes(permissionId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'view': return Eye;
      case 'edit': return Edit;
      case 'delete': return Trash2;
      case 'manage': return Settings;
      default: return Shield;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'view': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'edit': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'delete': return 'bg-red-50 text-red-700 border-red-200';
      case 'manage': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-neutral-50 text-neutral-700 border-neutral-200';
    }
  };

  const permissionsByCategory = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      {/* Current Role Card */}
      <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
        <div className={`p-6 bg-gradient-to-r ${currentConfig.color}`}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">{currentConfig.name}</h2>
              <p className="text-sm text-white/80 mb-3">{currentConfig.description}</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-0 rounded-full">
                  {currentConfig.permissions.length} 项权限
                </Badge>
                <Badge className="bg-white/20 text-white border-0 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  当前角色
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* All Roles Comparison */}
      <Card className="border-0 shadow-sm rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-neutral-900 mb-2">角色权限对比</h3>
          <p className="text-sm text-neutral-500">不同角色的权限范围和能力对比</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {roleConfigs.map((config) => {
            const RoleIcon = config.icon;
            const isCurrent = config.role === currentRole;
            
            return (
              <motion.div
                key={config.role}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isCurrent 
                    ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-teal-50' 
                    : 'border-neutral-200 bg-white hover:border-purple-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-md`}>
                    <RoleIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm text-neutral-900">{config.name.split(' - ')[1]}</h4>
                    {isCurrent && (
                      <Badge className="bg-purple-100 text-purple-700 border-0 rounded-full text-xs mt-1">
                        当前角色
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-xs text-neutral-500">
                  {config.permissions.length} 项权限
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Permissions Detail */}
      <Card className="border-0 shadow-sm rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-neutral-900 mb-2">详细权限列表</h3>
          <p className="text-sm text-neutral-500">当前角色的具体权限明细</p>
        </div>

        <div className="space-y-6">
          {Object.entries(permissionsByCategory).map(([category, permissions]) => {
            const CategoryIcon = getCategoryIcon(category);
            const categoryNames = {
              view: '查看权限',
              edit: '编辑权限',
              delete: '删除权限',
              manage: '管理权限'
            };

            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-lg ${getCategoryColor(category)} flex items-center justify-center`}>
                    <CategoryIcon className="w-4 h-4" />
                  </div>
                  <h4 className="text-neutral-900">{categoryNames[category as keyof typeof categoryNames]}</h4>
                  <Badge variant="outline" className="ml-auto rounded-full">
                    {permissions.filter(p => hasPermission(p.id)).length} / {permissions.length}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {permissions.map((permission) => {
                    const PermIcon = permission.icon;
                    const enabled = hasPermission(permission.id);

                    return (
                      <motion.div
                        key={permission.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                          enabled 
                            ? 'border-teal-200 bg-gradient-to-r from-teal-50 to-green-50' 
                            : 'border-neutral-200 bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            enabled 
                              ? 'bg-teal-100 text-teal-700' 
                              : 'bg-neutral-200 text-neutral-400'
                          }`}>
                            <PermIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className={`text-sm ${enabled ? 'text-neutral-900' : 'text-neutral-500'}`}>
                                {permission.name}
                              </h5>
                              {enabled && (
                                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                              )}
                            </div>
                            <p className="text-xs text-neutral-500">{permission.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {enabled ? (
                            <Badge className="bg-teal-100 text-teal-700 border-0 rounded-full">
                              <Unlock className="w-3 h-3 mr-1" />
                              已授权
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-neutral-100 text-neutral-500 border-neutral-300 rounded-full">
                              <Lock className="w-3 h-3 mr-1" />
                              未授权
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Role Features Summary */}
      <Card className="border-0 shadow-sm rounded-2xl p-6">
        <div className="mb-4">
          <h3 className="text-neutral-900 mb-2">角色能力摘要</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm text-blue-900">数据可见性</h4>
            </div>
            <p className="text-xs text-blue-700">
              {currentRole === 'vp' && '可查看全公司所有销售数据'}
              {currentRole === 'manager' && '可查看所在团队的所有数据'}
              {currentRole === 'rep' && '仅可查看自己的线索和交易'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Edit className="w-5 h-5 text-purple-600" />
              <h4 className="text-sm text-purple-900">编辑范围</h4>
            </div>
            <p className="text-xs text-purple-700">
              {currentRole === 'vp' && '可编辑和管理所有数据'}
              {currentRole === 'manager' && '可编辑团队数据并重新分配'}
              {currentRole === 'rep' && '仅可编辑自己负责的内容'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-orange-600" />
              <h4 className="text-sm text-orange-900">团队管理</h4>
            </div>
            <p className="text-xs text-orange-700">
              {currentRole === 'vp' && '可管理所有团队和成员'}
              {currentRole === 'manager' && '可管理直属团队成员'}
              {currentRole === 'rep' && '无团队管理权限'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-teal-600" />
              <h4 className="text-sm text-teal-900">报表分析</h4>
            </div>
            <p className="text-xs text-teal-700">
              {currentRole === 'vp' && '可访问所有高级分析报表'}
              {currentRole === 'manager' && '可查看团队业绩报表'}
              {currentRole === 'rep' && '可查看个人业绩报表'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
