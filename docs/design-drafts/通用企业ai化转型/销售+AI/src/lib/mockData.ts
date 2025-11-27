// Mock data for the AI Sales & Customer Management System
import { Opportunity, ChurnRisk, SalesForecast, Task, ActivityFeedItem } from '../types';

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    customerName: '科技创新有限公司',
    score: 92,
    signals: ['浏览了定价页', '下载了白皮书', '公司规模匹配'],
    estimatedValue: 580000,
    contact: '张经理',
    source: '网站访问',
    tags: ['高价值', '创新型公司', '决策者']
  },
  {
    id: '2',
    customerName: '星辰数据科技',
    score: 88,
    signals: ['参加了演示会', '多次登录系统', '询问定制方案'],
    estimatedValue: 420000,
    contact: '李总监',
    source: '市场活动',
    tags: ['高价值', '技术导向']
  },
  {
    id: '3',
    customerName: '云端服务集团',
    score: 85,
    signals: ['社交媒体互动', '浏览产品页面5次', '下载案例研究'],
    estimatedValue: 350000,
    contact: '王主管',
    source: '社交媒体',
    tags: ['中大型企业', '决策者']
  },
  {
    id: '4',
    customerName: '智慧物流公司',
    score: 78,
    signals: ['注册试用账号', '浏览了支持文档'],
    estimatedValue: 280000,
    contact: '赵经理',
    source: '网站访问',
    tags: ['物流行业', '成长型企业']
  }
];

export const mockChurnRisks: ChurnRisk[] = [
  {
    id: '1',
    customerName: '天宇科技公司',
    churnScore: 85,
    riskLevel: 'high',
    riskFactors: ['活跃度下降', '支持工单增多', '合同即将到期'],
    arr: 450000,
    lastActive: '2025-09-24',
    owner: '陈客户经理',
    retentionStrategies: [
      {
        name: '主动联系并提供增值培训',
        successRate: 70,
        description: '主动联系客户，提供一次免费的增值功能培训',
        template: '尊敬的客户，我们注意到您最近使用频率有所下降...'
      },
      {
        name: '发送关怀邮件和使用技巧',
        successRate: 55,
        description: '发送一份关怀邮件，并附上最新的产品使用技巧',
        template: '您好！我们为您整理了最新的产品使用技巧...'
      }
    ]
  },
  {
    id: '2',
    customerName: '未来网络集团',
    churnScore: 72,
    riskLevel: 'high',
    riskFactors: ['登录频率降低', '功能使用减少'],
    arr: 320000,
    lastActive: '2025-10-01',
    owner: '刘客户经理',
    retentionStrategies: [
      {
        name: '提供专属优惠和新功能体验',
        successRate: 65,
        description: '为客户提供专属优惠，并邀请体验新功能',
        template: '作为我们的重要客户，我们特别为您准备了...'
      }
    ]
  },
  {
    id: '3',
    customerName: '绿色能源有限公司',
    churnScore: 58,
    riskLevel: 'medium',
    riskFactors: ['使用时长减少', '团队成员流失'],
    arr: 280000,
    lastActive: '2025-10-15',
    owner: '周客户经理',
    retentionStrategies: [
      {
        name: '了解需求变化',
        successRate: 60,
        description: '主动沟通，了解客户需求是否发生变化',
        template: '我们希望了解您的最新需求...'
      }
    ]
  },
  {
    id: '4',
    customerName: '城市建设集团',
    churnScore: 45,
    riskLevel: 'medium',
    riskFactors: ['反馈响应时间长'],
    arr: 180000,
    lastActive: '2025-10-18',
    owner: '孙客户经理',
    retentionStrategies: []
  },
  {
    id: '5',
    customerName: '教育科技公司',
    churnScore: 28,
    riskLevel: 'low',
    riskFactors: [],
    arr: 150000,
    lastActive: '2025-10-23',
    owner: '马客户经理',
    retentionStrategies: []
  }
];

export const mockForecasts: SalesForecast[] = [
  {
    id: '1',
    opportunityName: '企业级SaaS平台项目',
    customer: '科技创新有限公司',
    owner: '销售张三',
    expectedCloseDate: '2025-11-15',
    amount: 580000,
    aiProbability: 85,
    stage: '方案演示'
  },
  {
    id: '2',
    opportunityName: '数据分析解决方案',
    customer: '星辰数据科技',
    owner: '销售李四',
    expectedCloseDate: '2025-11-30',
    amount: 420000,
    aiProbability: 78,
    stage: '商务谈判'
  },
  {
    id: '3',
    opportunityName: '云服务迁移项目',
    customer: '云端服务集团',
    owner: '销售王五',
    expectedCloseDate: '2025-12-10',
    amount: 350000,
    aiProbability: 72,
    stage: '需求确认'
  },
  {
    id: '4',
    opportunityName: '智能物流系统',
    customer: '智慧物流公司',
    owner: '销售赵六',
    expectedCloseDate: '2025-12-20',
    amount: 280000,
    aiProbability: 65,
    stage: '初步接触'
  },
  {
    id: '5',
    opportunityName: '办公自动化升级',
    customer: '建设集团',
    owner: '销售钱七',
    expectedCloseDate: '2025-11-25',
    amount: 180000,
    aiProbability: 55,
    stage: '方案演示'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    type: '联系高流失风险客户',
    customer: '天宇科技公司',
    dueDate: '2025-10-24',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    type: '跟进电话',
    customer: '科技创新有限公司',
    dueDate: '2025-10-25',
    priority: 'high',
    completed: false
  },
  {
    id: '3',
    type: '发送报价',
    customer: '星辰数据科技',
    dueDate: '2025-10-26',
    priority: 'medium',
    completed: false
  },
  {
    id: '4',
    type: '准备演示材料',
    customer: '云端服务集团',
    dueDate: '2025-10-27',
    priority: 'medium',
    completed: false
  }
];

export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: '1',
    type: 'opportunity',
    message: '客户"科技创新有限公司"最近频繁浏览了我们的定价页面，建议立即跟进。',
    timestamp: '2025-10-24T10:30:00',
    relatedId: '1'
  },
  {
    id: '2',
    type: 'risk',
    message: '客户"天宇科技公司"已超过30天未登录系统，流失风险上升至85%。',
    timestamp: '2025-10-24T09:15:00',
    relatedId: '1'
  },
  {
    id: '3',
    type: 'prediction',
    message: '根据当前趋势，本月销售额预计将超出目标5%。',
    timestamp: '2025-10-24T08:00:00'
  },
  {
    id: '4',
    type: 'opportunity',
    message: '客户"星辰数据科技"参加了产品演示会，机会分数上升至88分。',
    timestamp: '2025-10-23T16:45:00',
    relatedId: '2'
  }
];

export const salesTrendData = [
  { date: '10-01', actual: 450000, pipeline: 520000, predicted: 580000 },
  { date: '10-05', actual: 520000, pipeline: 620000, predicted: 680000 },
  { date: '10-10', actual: 680000, pipeline: 750000, predicted: 820000 },
  { date: '10-15', actual: 850000, pipeline: 920000, predicted: 980000 },
  { date: '10-20', actual: 1020000, pipeline: 1100000, predicted: 1180000 },
  { date: '10-24', actual: 1180000, pipeline: 1280000, predicted: 1350000 },
  { date: '10-31', pipeline: 1450000, predicted: 1520000 },
  { date: '11-15', predicted: 1750000 },
  { date: '11-30', predicted: 2000000 }
];

export const funnelData = [
  { stage: '线索', count: 150, conversion: 100 },
  { stage: '联系', count: 105, conversion: 70 },
  { stage: '需求确认', count: 68, conversion: 65 },
  { stage: '方案演示', count: 42, conversion: 62 },
  { stage: '商务谈判', count: 28, conversion: 67 },
  { stage: '成交', count: 18, conversion: 64 }
];
