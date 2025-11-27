/**
 * 智采云权限管理系统
 * 基于角色的访问控制 (RBAC)
 */

export type UserRole = 'director' | 'specialist' | 'applicant';

export interface PermissionConfig {
  // 功能模块访问权限
  modules: {
    dashboard: boolean;
    supplier360: boolean;
    p2p: boolean;
    contract: boolean;
    aiCenter: boolean;
    settings: boolean;
  };
  
  // AI功能权限
  aiFeatures: {
    // 核心AI功能
    commandCenter: boolean;        // AI指挥中心总览
    smartPredictor: boolean;        // 智能预测引擎
    recommendationEngine: boolean;  // 智能推荐系统
    monitoringCenter: boolean;      // 实时监控中心
    contractReviewer: boolean;      // 合同智能审查
    
    // AI辅助功能
    aiAssistant: boolean;           // AI助手
    aiInsights: boolean;            // AI洞察卡片
    aiPrediction: boolean;          // AI预测卡片
    aiRiskMonitor: boolean;         // AI风险监控
    
    // 高级AI功能
    aiAnalytics: boolean;           // AI高级分析
    aiReporting: boolean;           // AI智能报告
    aiOptimization: boolean;        // AI策略优化
    aiAutomation: boolean;          // AI流程自动化
  };
  
  // 数据访问权限
  dataAccess: {
    viewAllSuppliers: boolean;      // 查看所有供应商
    viewOwnSuppliers: boolean;      // 查看负责的供应商
    viewAllContracts: boolean;      // 查看所有合同
    viewOwnContracts: boolean;      // 查看相关合同
    viewAllOrders: boolean;         // 查看所有订单
    viewOwnOrders: boolean;         // 查看自己的订单
    viewFinancialData: boolean;     // 查看财务数据
    viewPerformanceData: boolean;   // 查看绩效数据
    viewStrategicData: boolean;     // 查看战略数据
  };
  
  // 操作权限
  actions: {
    // 采购流程
    createPurchaseRequest: boolean;  // 创建采购申请
    approvePurchase: boolean;        // 审批采购
    executePurchase: boolean;        // 执行采购
    cancelPurchase: boolean;         // 取消采购
    
    // 供应商管理
    addSupplier: boolean;            // 添加供应商
    editSupplier: boolean;           // 编辑供应商
    evaluateSupplier: boolean;       // 评估供应商
    blockSupplier: boolean;          // 封禁供应商
    
    // 合同管理
    createContract: boolean;         // 创建合同
    reviewContract: boolean;         // 审查合同
    signContract: boolean;           // 签署合同
    terminateContract: boolean;      // 终止合同
    
    // 系统管理
    configureSystem: boolean;        // 配置系统
    manageUsers: boolean;            // 管理用户
    viewAuditLog: boolean;           // 查看审计日志
    exportData: boolean;             // 导出数据
  };
  
  // AI功能级别
  aiAccessLevel: 'full' | 'standard' | 'basic' | 'none';
  
  // 数据可见性级别
  dataVisibility: 'global' | 'department' | 'personal';
}

/**
 * 角色权限配置
 */
export const ROLE_PERMISSIONS: Record<UserRole, PermissionConfig> = {
  // 采购总监 - 全局战略决策权限
  director: {
    modules: {
      dashboard: true,
      supplier360: true,
      p2p: true,
      contract: true,
      aiCenter: true,
      settings: true,
    },
    aiFeatures: {
      // 核心AI功能 - 全部开放
      commandCenter: true,
      smartPredictor: true,
      recommendationEngine: true,
      monitoringCenter: true,
      contractReviewer: true,
      
      // AI辅助功能 - 全部开放
      aiAssistant: true,
      aiInsights: true,
      aiPrediction: true,
      aiRiskMonitor: true,
      
      // 高级AI功能 - 全部开放
      aiAnalytics: true,
      aiReporting: true,
      aiOptimization: true,
      aiAutomation: true,
    },
    dataAccess: {
      viewAllSuppliers: true,
      viewOwnSuppliers: true,
      viewAllContracts: true,
      viewOwnContracts: true,
      viewAllOrders: true,
      viewOwnOrders: true,
      viewFinancialData: true,
      viewPerformanceData: true,
      viewStrategicData: true,
    },
    actions: {
      createPurchaseRequest: true,
      approvePurchase: true,
      executePurchase: true,
      cancelPurchase: true,
      
      addSupplier: true,
      editSupplier: true,
      evaluateSupplier: true,
      blockSupplier: true,
      
      createContract: true,
      reviewContract: true,
      signContract: true,
      terminateContract: true,
      
      configureSystem: true,
      manageUsers: true,
      viewAuditLog: true,
      exportData: true,
    },
    aiAccessLevel: 'full',
    dataVisibility: 'global',
  },
  
  // 采购专员 - 执行层权限
  specialist: {
    modules: {
      dashboard: true,
      supplier360: true,
      p2p: true,
      contract: true,
      aiCenter: true,
      settings: false,
    },
    aiFeatures: {
      // 核心AI功能 - 大部分开放
      commandCenter: true,
      smartPredictor: true,
      recommendationEngine: true,
      monitoringCenter: true,
      contractReviewer: true,
      
      // AI辅助功能 - 全部开放
      aiAssistant: true,
      aiInsights: true,
      aiPrediction: true,
      aiRiskMonitor: true,
      
      // 高级AI功能 - 部分限制
      aiAnalytics: false,         // 限制高级分析
      aiReporting: true,
      aiOptimization: false,      // 限制策略优化
      aiAutomation: true,
    },
    dataAccess: {
      viewAllSuppliers: true,
      viewOwnSuppliers: true,
      viewAllContracts: true,
      viewOwnContracts: true,
      viewAllOrders: true,
      viewOwnOrders: true,
      viewFinancialData: false,    // 限制财务数据
      viewPerformanceData: true,
      viewStrategicData: false,    // 限制战略数据
    },
    actions: {
      createPurchaseRequest: true,
      approvePurchase: false,      // 无审批权限
      executePurchase: true,
      cancelPurchase: false,       // 需要总监批准
      
      addSupplier: true,
      editSupplier: true,
      evaluateSupplier: true,
      blockSupplier: false,        // 需要总监批准
      
      createContract: true,
      reviewContract: true,
      signContract: false,         // 需要总监签署
      terminateContract: false,    // 需要总监批准
      
      configureSystem: false,
      manageUsers: false,
      viewAuditLog: false,
      exportData: true,
    },
    aiAccessLevel: 'standard',
    dataVisibility: 'department',
  },
  
  // 业务申请人 - 基础使用权限
  applicant: {
    modules: {
      dashboard: true,
      supplier360: false,          // 不需要供应商管理
      p2p: true,
      contract: false,             // 不需要合同管理
      aiCenter: false,             // 限制AI中心访问
      settings: false,
    },
    aiFeatures: {
      // 核心AI功能 - 严格限制
      commandCenter: false,
      smartPredictor: false,
      recommendationEngine: true,  // 仅推荐功能
      monitoringCenter: false,
      contractReviewer: false,
      
      // AI辅助功能 - 基础功能
      aiAssistant: true,           // 基础AI助手
      aiInsights: false,
      aiPrediction: false,
      aiRiskMonitor: false,
      
      // 高级AI功能 - 全部限制
      aiAnalytics: false,
      aiReporting: false,
      aiOptimization: false,
      aiAutomation: false,
    },
    dataAccess: {
      viewAllSuppliers: false,
      viewOwnSuppliers: false,
      viewAllContracts: false,
      viewOwnContracts: false,
      viewAllOrders: false,
      viewOwnOrders: true,         // 仅查看自己的订单
      viewFinancialData: false,
      viewPerformanceData: false,
      viewStrategicData: false,
    },
    actions: {
      createPurchaseRequest: true,  // 核心功能
      approvePurchase: false,
      executePurchase: false,
      cancelPurchase: true,         // 可以取消自己的申请
      
      addSupplier: false,
      editSupplier: false,
      evaluateSupplier: false,
      blockSupplier: false,
      
      createContract: false,
      reviewContract: false,
      signContract: false,
      terminateContract: false,
      
      configureSystem: false,
      manageUsers: false,
      viewAuditLog: false,
      exportData: false,
    },
    aiAccessLevel: 'basic',
    dataVisibility: 'personal',
  },
};

/**
 * 获取用户权限配置
 */
export function getPermissions(role: UserRole): PermissionConfig {
  return ROLE_PERMISSIONS[role];
}

/**
 * 检查是否有模块访问权限
 */
export function canAccessModule(role: UserRole, module: keyof PermissionConfig['modules']): boolean {
  return ROLE_PERMISSIONS[role].modules[module];
}

/**
 * 检查是否有AI功能权限
 */
export function canUseAIFeature(role: UserRole, feature: keyof PermissionConfig['aiFeatures']): boolean {
  return ROLE_PERMISSIONS[role].aiFeatures[feature];
}

/**
 * 检查是否有数据访问权限
 */
export function canAccessData(role: UserRole, dataType: keyof PermissionConfig['dataAccess']): boolean {
  return ROLE_PERMISSIONS[role].dataAccess[dataType];
}

/**
 * 检查是否有操作权限
 */
export function canPerformAction(role: UserRole, action: keyof PermissionConfig['actions']): boolean {
  return ROLE_PERMISSIONS[role].actions[action];
}

/**
 * 获取AI访问级别
 */
export function getAIAccessLevel(role: UserRole): 'full' | 'standard' | 'basic' | 'none' {
  return ROLE_PERMISSIONS[role].aiAccessLevel;
}

/**
 * 获取数据可见性级别
 */
export function getDataVisibility(role: UserRole): 'global' | 'department' | 'personal' {
  return ROLE_PERMISSIONS[role].dataVisibility;
}

/**
 * 获取角色显示名称
 */
export function getRoleName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    director: '采购总监',
    specialist: '采购专员',
    applicant: '业务申请人',
  };
  return roleNames[role];
}

/**
 * 获取角色描述
 */
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    director: '战略决策者 - 全局视野，完整AI能力',
    specialist: '执行专家 - 业务操作，标准AI支持',
    applicant: '业务用户 - 需求提交，基础AI辅助',
  };
  return descriptions[role];
}

/**
 * 获取AI功能推荐（根据角色）
 */
export function getRecommendedAIFeatures(role: UserRole): string[] {
  const recommendations: Record<UserRole, string[]> = {
    director: [
      '查看AI指挥中心全局洞察',
      '使用智能预测进行战略规划',
      '查看AI监控中心的实时预警',
      '利用AI优化采购策略',
    ],
    specialist: [
      '使用AI推荐寻找最佳供应商',
      '借助AI预测优化采购时机',
      '查看AI监控的异常提醒',
      '使用AI辅助合同审查',
    ],
    applicant: [
      '咨询AI助手快速找到所需物品',
      '查看AI推荐的快速申请模板',
      '使用智能搜索快速定位商品',
    ],
  };
  return recommendations[role];
}

/**
 * 权限验证辅助函数 - 用于UI组件
 */
export const PermissionGuard = {
  /**
   * 检查并返回是否显示组件
   */
  canShow(role: UserRole, requiredPermission: {
    module?: keyof PermissionConfig['modules'];
    aiFeature?: keyof PermissionConfig['aiFeatures'];
    dataAccess?: keyof PermissionConfig['dataAccess'];
    action?: keyof PermissionConfig['actions'];
  }): boolean {
    if (requiredPermission.module && !canAccessModule(role, requiredPermission.module)) {
      return false;
    }
    if (requiredPermission.aiFeature && !canUseAIFeature(role, requiredPermission.aiFeature)) {
      return false;
    }
    if (requiredPermission.dataAccess && !canAccessData(role, requiredPermission.dataAccess)) {
      return false;
    }
    if (requiredPermission.action && !canPerformAction(role, requiredPermission.action)) {
      return false;
    }
    return true;
  },
  
  /**
   * 获取权限提示信息
   */
  getPermissionHint(role: UserRole, requiredRole?: UserRole): string {
    if (!requiredRole) {
      return '此功能需要特定权限';
    }
    return `此功能需要${getRoleName(requiredRole)}权限，当前是${getRoleName(role)}`;
  },
};
