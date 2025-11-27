# 智采云权限系统开发者指南

## 📚 目录
1. [快速开始](#快速开始)
2. [核心概念](#核心概念)
3. [权限配置](#权限配置)
4. [使用方式](#使用方式)
5. [最佳实践](#最佳实践)
6. [常见问题](#常见问题)

---

## 快速开始

### 1. 基本权限检查

```tsx
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '../utils/permissions';

function MyComponent({ role }: { role: string }) {
  const { canAccessModule, canUseAIFeature } = usePermissions(role as UserRole);

  // 检查模块权限
  if (canAccessModule('supplier360')) {
    // 用户可以访问供应商模块
  }

  // 检查AI功能权限
  if (canUseAIFeature('smartPredictor')) {
    // 用户可以使用智能预测功能
  }
}
```

### 2. 使用权限保护组件

```tsx
import PermissionGuard from './PermissionGuard';
import { UserRole } from '../utils/permissions';

function MyComponent({ role }: { role: string }) {
  return (
    <PermissionGuard 
      role={role as UserRole}
      requiredPermission={{ module: 'supplier360' }}
    >
      <div>受保护的内容</div>
    </PermissionGuard>
  );
}
```

---

## 核心概念

### 权限维度

智采云权限系统基于4个维度进行控制:

#### 1. 模块权限 (`modules`)
控制用户可以访问的系统模块
```typescript
modules: {
  dashboard: boolean;      // 工作台
  supplier360: boolean;    // 供应商360°
  p2p: boolean;           // 采办到支付
  contract: boolean;      // 合同管理
  aiCenter: boolean;      // AI指挥中心
  settings: boolean;      // 系统设置
}
```

#### 2. AI功能权限 (`aiFeatures`)
精细控制AI功能的访问
```typescript
aiFeatures: {
  // 核心AI功能
  commandCenter: boolean;
  smartPredictor: boolean;
  recommendationEngine: boolean;
  monitoringCenter: boolean;
  contractReviewer: boolean;
  
  // AI辅助功能
  aiAssistant: boolean;
  aiInsights: boolean;
  aiPrediction: boolean;
  aiRiskMonitor: boolean;
  
  // 高级AI功能
  aiAnalytics: boolean;
  aiReporting: boolean;
  aiOptimization: boolean;
  aiAutomation: boolean;
}
```

#### 3. 数据访问权限 (`dataAccess`)
控制用户可以查看的数据范围
```typescript
dataAccess: {
  viewAllSuppliers: boolean;
  viewOwnSuppliers: boolean;
  viewAllContracts: boolean;
  viewOwnContracts: boolean;
  viewAllOrders: boolean;
  viewOwnOrders: boolean;
  viewFinancialData: boolean;
  viewPerformanceData: boolean;
  viewStrategicData: boolean;
}
```

#### 4. 操作权限 (`actions`)
控制用户可以执行的操作
```typescript
actions: {
  // 采购流程
  createPurchaseRequest: boolean;
  approvePurchase: boolean;
  executePurchase: boolean;
  cancelPurchase: boolean;
  
  // 供应商管理
  addSupplier: boolean;
  editSupplier: boolean;
  evaluateSupplier: boolean;
  blockSupplier: boolean;
  
  // 合同管理
  createContract: boolean;
  reviewContract: boolean;
  signContract: boolean;
  terminateContract: boolean;
  
  // 系统管理
  configureSystem: boolean;
  manageUsers: boolean;
  viewAuditLog: boolean;
  exportData: boolean;
}
```

### 权限级别

#### AI访问级别
- `full`: 完整访问 (采购总监)
- `standard`: 标准访问 (采购专员)
- `basic`: 基础访问 (业务申请人)
- `none`: 无访问权限

#### 数据可见性
- `global`: 全局数据 (采购总监)
- `department`: 部门数据 (采购专员)
- `personal`: 个人数据 (业务申请人)

---

## 权限配置

### 查看角色权限

```typescript
import { ROLE_PERMISSIONS } from '../utils/permissions';

// 查看采购总监的完整权限
const directorPermissions = ROLE_PERMISSIONS.director;

// 查看采购专员的AI功能权限
const specialistAIFeatures = ROLE_PERMISSIONS.specialist.aiFeatures;
```

### 修改权限配置

编辑 `/utils/permissions.ts` 文件:

```typescript
export const ROLE_PERMISSIONS: Record<UserRole, PermissionConfig> = {
  specialist: {
    modules: {
      // 修改专员的模块权限
      dashboard: true,
      supplier360: true,  // 改为false可以禁用
      // ...
    },
    aiFeatures: {
      // 修改专员的AI功能权限
      smartPredictor: true,  // 改为false可以禁用
      // ...
    },
    // ...
  },
};
```

---

## 使用方式

### 方式1: 使用Hook检查权限

```tsx
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '../utils/permissions';

function MyComponent({ role }: { role: string }) {
  const {
    canAccessModule,
    canUseAIFeature,
    canAccessData,
    canPerformAction,
    aiAccessLevel,
    roleName,
  } = usePermissions(role as UserRole);

  return (
    <div>
      <h1>欢迎, {roleName}</h1>
      
      {/* 条件渲染 - 模块 */}
      {canAccessModule('supplier360') && (
        <SupplierModule />
      )}
      
      {/* 条件渲染 - AI功能 */}
      {canUseAIFeature('smartPredictor') && (
        <AIPredictor />
      )}
      
      {/* 条件渲染 - 操作按钮 */}
      {canPerformAction('approvePurchase') && (
        <Button>审批</Button>
      )}
      
      {/* 显示AI访问级别 */}
      <Badge>
        AI级别: {aiAccessLevel}
      </Badge>
    </div>
  );
}
```

### 方式2: 使用PermissionGuard组件

```tsx
import PermissionGuard from './PermissionGuard';
import { UserRole } from '../utils/permissions';

function MyComponent({ role }: { role: string }) {
  return (
    <div>
      {/* 基础用法 - 单一权限检查 */}
      <PermissionGuard 
        role={role as UserRole}
        requiredPermission={{ module: 'supplier360' }}
      >
        <SupplierContent />
      </PermissionGuard>

      {/* 复合权限检查 */}
      <PermissionGuard 
        role={role as UserRole}
        requiredPermission={{
          module: 'aiCenter',
          aiFeature: 'smartPredictor',
        }}
      >
        <AIFeatureContent />
      </PermissionGuard>

      {/* 自定义fallback */}
      <PermissionGuard 
        role={role as UserRole}
        requiredPermission={{ action: 'approvePurchase' }}
        fallback={<div>您没有审批权限</div>}
      >
        <ApprovalButton />
      </PermissionGuard>

      {/* 不显示提示消息 */}
      <PermissionGuard 
        role={role as UserRole}
        requiredPermission={{ module: 'settings' }}
        showMessage={false}
      >
        <SettingsLink />
      </PermissionGuard>
    </div>
  );
}
```

### 方式3: 使用InlinePermissionGuard

适合在布局中使用，无权限时不破坏布局：

```tsx
import { InlinePermissionGuard } from './PermissionGuard';
import { UserRole } from '../utils/permissions';

function MyComponent({ role }: { role: string }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 总是显示 */}
      <Card>基础功能</Card>
      
      {/* 有权限才显示，无权限时不占位 */}
      <InlinePermissionGuard 
        role={role as UserRole}
        requiredPermission={{ aiFeature: 'smartPredictor' }}
      >
        <Card>AI预测功能</Card>
      </InlinePermissionGuard>
      
      {/* 总是显示 */}
      <Card>其他功能</Card>
    </div>
  );
}
```

### 方式4: 在导航中使用

```tsx
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '../utils/permissions';

function Navigation({ role }: { role: string }) {
  const { canAccessModule } = usePermissions(role as UserRole);

  return (
    <nav>
      {/* 工作台 - 所有人都能访问 */}
      <NavItem to="/dashboard">工作台</NavItem>
      
      {/* AI指挥中心 - 根据权限显示 */}
      {canAccessModule('aiCenter') && (
        <NavItem to="/ai-center">AI指挥中心</NavItem>
      )}
      
      {/* 供应商管理 - 根据权限显示 */}
      {canAccessModule('supplier360') && (
        <NavItem to="/supplier">供应商360°</NavItem>
      )}
      
      {/* 设置 - 根据权限显示 */}
      {canAccessModule('settings') && (
        <NavItem to="/settings">设置</NavItem>
      )}
    </nav>
  );
}
```

---

## 最佳实践

### 1. 在路由层级保护

```tsx
function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('director');
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <MainLayout>
      {currentView === 'ai-center' && (
        <PermissionGuard 
          role={currentRole}
          requiredPermission={{ module: 'aiCenter' }}
        >
          <AICommandCenter role={currentRole} />
        </PermissionGuard>
      )}
    </MainLayout>
  );
}
```

### 2. 组件内部细粒度控制

```tsx
function Dashboard({ role }: { role: string }) {
  const { canUseAIFeature, canAccessData } = usePermissions(role as UserRole);

  return (
    <div>
      {/* 基础KPI - 所有人可见 */}
      <KPICards />
      
      {/* AI预测 - 根据AI功能权限 */}
      {canUseAIFeature('smartPredictor') && (
        <AIPredictor />
      )}
      
      {/* 财务数据 - 根据数据访问权限 */}
      {canAccessData('viewFinancialData') && (
        <FinancialChart />
      )}
    </div>
  );
}
```

### 3. 操作按钮的权限控制

```tsx
function SupplierCard({ supplier, role }: Props) {
  const { canPerformAction } = usePermissions(role as UserRole);

  return (
    <Card>
      <CardContent>
        <h3>{supplier.name}</h3>
        
        <div className="actions">
          {/* 编辑 - 专员和总监可用 */}
          {canPerformAction('editSupplier') && (
            <Button onClick={handleEdit}>编辑</Button>
          )}
          
          {/* 评估 - 专员和总监可用 */}
          {canPerformAction('evaluateSupplier') && (
            <Button onClick={handleEvaluate}>评估</Button>
          )}
          
          {/* 封禁 - 仅总监可用 */}
          {canPerformAction('blockSupplier') && (
            <Button onClick={handleBlock} variant="destructive">
              封禁
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 4. AI功能的分级展示

```tsx
function AIFeaturesList({ role }: { role: string }) {
  const { aiAccessLevel, canUseAIFeature } = usePermissions(role as UserRole);

  return (
    <div>
      {/* 显示AI访问级别 */}
      <Badge className="ai-gradient">
        {aiAccessLevel === 'full' && '🌟 完整AI权限'}
        {aiAccessLevel === 'standard' && '⚡ 标准AI权限'}
        {aiAccessLevel === 'basic' && '🔰 基础AI权限'}
      </Badge>

      {/* 核心AI功能 */}
      <Section title="核心AI功能">
        {canUseAIFeature('commandCenter') && <AICommandCenter />}
        {canUseAIFeature('smartPredictor') && <AIPredictor />}
        {canUseAIFeature('recommendationEngine') && <AIRecommender />}
      </Section>

      {/* 高级AI功能 - 可能受限 */}
      <Section title="高级AI功能">
        {canUseAIFeature('aiAnalytics') ? (
          <AIAnalytics />
        ) : (
          <UpgradePrompt feature="高级分析" />
        )}
        
        {canUseAIFeature('aiOptimization') ? (
          <AIOptimization />
        ) : (
          <UpgradePrompt feature="策略优化" />
        )}
      </Section>
    </div>
  );
}
```

### 5. 权限提示的友好处理

```tsx
function FeatureCard({ feature, role }: Props) {
  const { canUseAIFeature, getPermissionHint } = usePermissions(role as UserRole);
  const hasPermission = canUseAIFeature(feature.key);

  return (
    <Card className={!hasPermission ? 'opacity-60' : ''}>
      <CardContent>
        <div className="flex items-center justify-between">
          <h3>{feature.title}</h3>
          {!hasPermission && (
            <Tooltip content={getPermissionHint('director')}>
              <Lock className="h-4 w-4 text-gray-400" />
            </Tooltip>
          )}
        </div>
        
        {hasPermission ? (
          <FeatureContent feature={feature} />
        ) : (
          <div className="text-sm text-muted-foreground">
            需要更高权限才能使用此功能
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 常见问题

### Q1: 如何添加新的权限项？

**A:** 编辑 `/utils/permissions.ts` 文件:

```typescript
// 1. 在PermissionConfig接口中添加新的权限项
export interface PermissionConfig {
  modules: {
    // ... 现有模块
    newModule: boolean;  // 新增模块
  };
}

// 2. 在ROLE_PERMISSIONS中为每个角色配置该权限
export const ROLE_PERMISSIONS: Record<UserRole, PermissionConfig> = {
  director: {
    modules: {
      // ...
      newModule: true,  // 总监可访问
    },
  },
  specialist: {
    modules: {
      // ...
      newModule: false,  // 专员不可访问
    },
  },
  // ...
};
```

### Q2: 如何检查多个权限？

**A:** 使用 `canShow` 方法或多个条件:

```tsx
// 方式1: 使用canShow (OR逻辑)
const { canShow } = usePermissions(role);
const hasAccess = canShow({
  module: 'supplier360',
  aiFeature: 'smartPredictor'
});

// 方式2: 使用多个条件 (AND逻辑)
const { canAccessModule, canUseAIFeature } = usePermissions(role);
const hasFullAccess = 
  canAccessModule('supplier360') && 
  canUseAIFeature('smartPredictor');
```

### Q3: 如何为新角色添加权限？

**A:** 在 `/utils/permissions.ts` 中添加:

```typescript
// 1. 扩展UserRole类型
export type UserRole = 'director' | 'specialist' | 'applicant' | 'manager';

// 2. 在ROLE_PERMISSIONS中添加新角色配置
export const ROLE_PERMISSIONS: Record<UserRole, PermissionConfig> = {
  // ... 现有角色
  manager: {
    modules: {
      dashboard: true,
      supplier360: true,
      // ... 完整配置
    },
    // ... 其他权限配置
  },
};
```

### Q4: 权限检查的性能如何？

**A:** 权限检查非常快速，因为:
- 使用 `useMemo` 缓存权限配置
- 纯对象属性访问，O(1)复杂度
- 不涉及网络请求

### Q5: 如何处理权限变化？

**A:** 当用户角色变化时，重新渲染即可:

```tsx
function App() {
  const [currentRole, setCurrentRole] = useState('director');
  
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    // 权限会自动更新，因为usePermissions依赖于role参数
  };
  
  return <MyComponent role={currentRole} />;
}
```

### Q6: 如何与后端权限集成？

**A:** 从后端获取权限配置:

```typescript
// 1. 创建API获取权限
async function fetchUserPermissions(userId: string) {
  const response = await fetch(`/api/users/${userId}/permissions`);
  return response.json();
}

// 2. 在App��加载权限
function App() {
  const [permissions, setPermissions] = useState(null);
  
  useEffect(() => {
    fetchUserPermissions(currentUserId).then(setPermissions);
  }, [currentUserId]);
  
  if (!permissions) return <Loading />;
  
  // 使用动态权限配置
  return <MyComponent permissions={permissions} />;
}
```

---

## 📖 相关文档

- [权限系统完整实现总结](./PERMISSIONS-IMPLEMENTATION-COMPLETE.md)
- [权限快速测试指南](./PERMISSIONS-QUICK-TEST.md)
- [AI功能文档](./AI-FEATURES.md)
- [系统概览](./SYSTEM-OVERVIEW.md)

---

## 🤝 贡献指南

如果您发现权限系统的问题或有改进建议，请:

1. 检查现有文档和代码
2. 创建详细的问题描述
3. 提供复现步骤
4. 如果可能，提供解决方案

---

## 📝 更新日志

### v1.0.0 (2025-11-06)
- ✅ 初始权限系统实现
- ✅ 3个角色配置
- ✅ 4维度权限控制
- ✅ AI功能分级管理
- ✅ React Hook和组件集成
- ✅ 完整文档和测试指南
