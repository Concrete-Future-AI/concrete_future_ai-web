import { useMemo } from 'react';
import {
  UserRole,
  PermissionConfig,
  getPermissions,
  canAccessModule,
  canUseAIFeature,
  canAccessData,
  canPerformAction,
  getAIAccessLevel,
  getDataVisibility,
  getRoleName,
  getRoleDescription,
  getRecommendedAIFeatures,
  PermissionGuard,
} from '../utils/permissions';

/**
 * 权限管理 Hook
 * 提供便捷的权限检查和配置访问
 */
export function usePermissions(role: UserRole) {
  const permissions = useMemo(() => getPermissions(role), [role]);
  
  return {
    // 完整权限配置
    permissions,
    
    // 角色信息
    role,
    roleName: getRoleName(role),
    roleDescription: getRoleDescription(role),
    
    // AI访问级别
    aiAccessLevel: getAIAccessLevel(role),
    dataVisibility: getDataVisibility(role),
    
    // 权限检查函数
    canAccessModule: (module: keyof PermissionConfig['modules']) => 
      canAccessModule(role, module),
    
    canUseAIFeature: (feature: keyof PermissionConfig['aiFeatures']) => 
      canUseAIFeature(role, feature),
    
    canAccessData: (dataType: keyof PermissionConfig['dataAccess']) => 
      canAccessData(role, dataType),
    
    canPerformAction: (action: keyof PermissionConfig['actions']) => 
      canPerformAction(role, action),
    
    // 便捷检查函数
    canShow: (requiredPermission: Parameters<typeof PermissionGuard.canShow>[1]) =>
      PermissionGuard.canShow(role, requiredPermission),
    
    getPermissionHint: (requiredRole?: UserRole) =>
      PermissionGuard.getPermissionHint(role, requiredRole),
    
    // AI功能推荐
    recommendedAIFeatures: getRecommendedAIFeatures(role),
    
    // 常用权限快捷访问
    isDirector: role === 'director',
    isSpecialist: role === 'specialist',
    isApplicant: role === 'applicant',
    
    // 快捷权限检查
    hasFullAIAccess: getAIAccessLevel(role) === 'full',
    hasStandardAIAccess: getAIAccessLevel(role) === 'standard' || getAIAccessLevel(role) === 'full',
    hasBasicAIAccess: getAIAccessLevel(role) !== 'none',
    
    hasGlobalDataAccess: getDataVisibility(role) === 'global',
    hasDepartmentDataAccess: getDataVisibility(role) === 'department' || getDataVisibility(role) === 'global',
  };
}
