import { ReactNode } from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { UserRole, PermissionConfig } from '../utils/permissions';
import { Alert, AlertDescription } from './ui/alert';
import { Lock } from 'lucide-react';
import { Card } from './ui/card';

interface PermissionGuardProps {
  children: ReactNode;
  role: UserRole;
  requiredPermission?: {
    module?: keyof PermissionConfig['modules'];
    aiFeature?: keyof PermissionConfig['aiFeatures'];
    dataAccess?: keyof PermissionConfig['dataAccess'];
    action?: keyof PermissionConfig['actions'];
  };
  fallback?: ReactNode;
  showMessage?: boolean;
}

/**
 * 权限保护组件
 * 用于包装需要权限控制的内容
 */
export default function PermissionGuard({
  children,
  role,
  requiredPermission,
  fallback,
  showMessage = true,
}: PermissionGuardProps) {
  const { canShow, roleName } = usePermissions(role);

  // 检查权限
  const hasPermission = requiredPermission 
    ? canShow(requiredPermission)
    : true;

  // 如果有权限，显示内容
  if (hasPermission) {
    return <>{children}</>;
  }

  // 如果提供了自定义fallback，使用它
  if (fallback) {
    return <>{fallback}</>;
  }

  // 如果不显示消息，返回null
  if (!showMessage) {
    return null;
  }

  // 默认权限提示
  return (
    <Card className="p-6 text-center">
      <div className="h-12 w-12 rounded-xl bg-gray-200 flex items-center justify-center mx-auto mb-4">
        <Lock className="h-6 w-6 text-gray-600" />
      </div>
      <h3 className="font-medium mb-2">此功能需要更高权限</h3>
      <p className="text-sm text-muted-foreground mb-4">
        当前角色（{roleName}）暂无访问权限
      </p>
      <Alert>
        <AlertDescription>
          如需访问此功能，请联系系统管理员申请相应权限。
        </AlertDescription>
      </Alert>
    </Card>
  );
}

/**
 * 内联权限保护组件
 * 用于在不破坏布局的情况下隐藏内容
 */
export function InlinePermissionGuard({
  children,
  role,
  requiredPermission,
}: Omit<PermissionGuardProps, 'fallback' | 'showMessage'>) {
  return (
    <PermissionGuard
      role={role}
      requiredPermission={requiredPermission}
      showMessage={false}
    >
      {children}
    </PermissionGuard>
  );
}
