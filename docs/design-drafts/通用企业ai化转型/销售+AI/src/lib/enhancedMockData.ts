// Enhanced mock data with more details for advanced interactions
import { Opportunity, ChurnRisk, SalesForecast, Task, ActivityFeedItem } from '../types';

// Extended mock opportunities with more data
export const enhancedOpportunities: Opportunity[] = [
  {
    id: '1',
    customerName: '科技创新有限公司',
    score: 92,
    signals: ['浏览了定价页', '下载了白皮书', '公司规模匹配', '决策者参与', '多次演示请求'],
    estimatedValue: 580000,
    contact: '张经理',
    source: '网站访问',
    tags: ['高价值', '创新型公司', '决策者', '急需']
  },
  {
    id: '2',
    customerName: '星辰数据科技',
    score: 88,
    signals: ['参加了演示会', '多次登录系统', '询问定制方案', '技术评估完成'],
    estimatedValue: 420000,
    contact: '李总监',
    source: '市场活动',
    tags: ['高价值', '技术导向', '快速成长']
  },
  {
    id: '3',
    customerName: '云端服务集团',
    score: 85,
    signals: ['社交媒体互动', '浏览产品页面5次', '下载案例研究', '推荐人引荐'],
    estimatedValue: 350000,
    contact: '王主管',
    source: '社交媒体',
    tags: ['中大型企业', '决策者', '行业领先']
  },
  {
    id: '4',
    customerName: '智慧物流公司',
    score: 78,
    signals: ['注册试用账号', '浏览了支持文档', '联系客服咨询'],
    estimatedValue: 280000,
    contact: '赵经理',
    source: '网站访问',
    tags: ['物流行业', '成长型企业']
  },
  {
    id: '5',
    customerName: '绿色能源集团',
    score: 75,
    signals: ['参加网络研讨会', '下载产品资料', '填写联系表单'],
    estimatedValue: 450000,
    contact: '孙总',
    source: '市场活动',
    tags: ['高价值', '新能源', '政府背景']
  },
  {
    id: '6',
    customerName: '数字媒体公司',
    score: 72,
    signals: ['频繁访问博客', '订阅邮件列表', '社交媒体点赞'],
    estimatedValue: 180000,
    contact: '周经理',
    source: '内容营销',
    tags: ['创意行业', '年轻团队']
  }
];

// Enhanced churn risks with activity history
export const enhancedChurnRisks: ChurnRisk[] = [
  {
    id: '1',
    customerName: '天宇科技公司',
    churnScore: 85,
    riskLevel: 'high',
    riskFactors: ['活跃度下降65%', '支持工单增多3倍', '合同30天后到期', 'NPS评分下降'],
    arr: 450000,
    lastActive: '2025-09-24',
    owner: '陈客户经理',
    retentionStrategies: [
      {
        name: '高层会面+产品路线图展示',
        successRate: 75,
        description: '安排CEO会面，展示未来6个月产品路线图，强调客户反馈的重要性',
        template: '尊敬的客户，我们的CEO希望与您会面，讨论您的需求和我们的产品方向...'
      },
      {
        name: '提供专属技术支持',
        successRate: 70,
        description: '配备专属技术支持工程师，48小时内解决所有技术问题',
        template: '我们为您配备了专属技术支持团队，确保您的问题得到最快响应...'
      },
      {
        name: '续约优惠+功能升级',
        successRate: 55,
        description: '提供20%续约优惠，并免费升级到企业版',
        template: '感谢您的长期支持，我们特别为您准备了续约优惠方案...'
      }
    ]
  },
  {
    id: '2',
    customerName: '未来网络集团',
    churnScore: 72,
    riskLevel: 'high',
    riskFactors: ['登录频率降低50%', '功能使用减少', '主要联系人离职'],
    arr: 320000,
    lastActive: '2025-10-01',
    owner: '刘客户经理',
    retentionStrategies: [
      {
        name: '重新建立关系+培训',
        successRate: 68,
        description: '联系新的关键人员，提供免费深度培训',
        template: '我们了解到您的团队有新成员加入，我们愿意提供全面的产品培训...'
      },
      {
        name: '使用情况分析报告',
        successRate: 65,
        description: '提供详细的ROI分析和使用优化建议',
        template: '我们为您准备了详细的使用情况分析报告，展示您的投资回报...'
      }
    ]
  },
  {
    id: '3',
    customerName: '绿色能源有限公司',
    churnScore: 58,
    riskLevel: 'medium',
    riskFactors: ['使用时长减少30%', '团队成员流失', '预算削减'],
    arr: 280000,
    lastActive: '2025-10-15',
    owner: '周客户经理',
    retentionStrategies: [
      {
        name: '灵活付款方案',
        successRate: 60,
        description: '提供分期付款选项，减轻预算压力',
        template: '我们理解当前的经济环境，可以为您提供更灵活的付款方案...'
      }
    ]
  },
  {
    id: '4',
    customerName: '城市建设集团',
    churnScore: 45,
    riskLevel: 'medium',
    riskFactors: ['反馈响应时间长', '功能请求未满足'],
    arr: 180000,
    lastActive: '2025-10-18',
    owner: '孙客户经理',
    retentionStrategies: [
      {
        name: '产品定制化方案',
        successRate: 55,
        description: '评估定制化需求，提供专属功能开发',
        template: '我们重视您的反馈，愿意为您定制化开发特定功能...'
      }
    ]
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
  },
  {
    id: '6',
    customerName: '医疗健康集团',
    churnScore: 35,
    riskLevel: 'low',
    riskFactors: ['使用稳定', '反馈积极'],
    arr: 380000,
    lastActive: '2025-10-22',
    owner: '钱客户经理',
    retentionStrategies: []
  }
];

// Enhanced forecasts with probability factors
export const enhancedForecasts: SalesForecast[] = [
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
  },
  {
    id: '6',
    opportunityName: '能源管理平台',
    customer: '绿色能源集团',
    owner: '销售孙八',
    expectedCloseDate: '2025-12-05',
    amount: 450000,
    aiProbability: 68,
    stage: '技术评估'
  },
  {
    id: '7',
    opportunityName: '内容管理系统',
    customer: '数字媒体公司',
    owner: '销售周九',
    expectedCloseDate: '2025-11-20',
    amount: 180000,
    aiProbability: 52,
    stage: '初步接触'
  }
];

// Enhanced tasks with priorities and categories
export const enhancedTasks: Task[] = [
  {
    id: '1',
    type: '紧急：联系高流失风险客户',
    customer: '天宇科技公司',
    dueDate: '2025-10-24',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    type: '跟进电话 - 方案讨论',
    customer: '科技创新有限公司',
    dueDate: '2025-10-25',
    priority: 'high',
    completed: false
  },
  {
    id: '3',
    type: '发送定制报价方案',
    customer: '星辰数据科技',
    dueDate: '2025-10-26',
    priority: 'high',
    completed: false
  },
  {
    id: '4',
    type: '准备产品演示材料',
    customer: '云端服务集团',
    dueDate: '2025-10-27',
    priority: 'medium',
    completed: false
  },
  {
    id: '5',
    type: '发送合同草案',
    customer: '绿色能源集团',
    dueDate: '2025-10-28',
    priority: 'medium',
    completed: false
  },
  {
    id: '6',
    type: '安排技术团队会议',
    customer: '智慧物流公司',
    dueDate: '2025-10-29',
    priority: 'low',
    completed: false
  },
  {
    id: '7',
    type: '客户满意度调查',
    customer: '教育科技公司',
    dueDate: '2025-10-30',
    priority: 'low',
    completed: false
  }
];

// Enhanced activity feed with more variety
export const enhancedActivityFeed: ActivityFeedItem[] = [
  {
    id: '1',
    type: 'opportunity',
    message: '客户"科技创新有限公司"的决策者刚刚下载了完整方案文档，建议24小时内跟进。',
    timestamp: '2025-10-24T10:30:00',
    relatedId: '1'
  },
  {
    id: '2',
    type: 'risk',
    message: '警告：客户"天宇科技公司"已超过30天未登录系统，流失风险上升至85%，ARR价值45万。',
    timestamp: '2025-10-24T09:15:00',
    relatedId: '1'
  },
  {
    id: '3',
    type: 'prediction',
    message: 'AI预测：根据当前销售趋势和管道质量，本季度有92%概率达成目标，预计超额5-8%。',
    timestamp: '2025-10-24T08:00:00'
  },
  {
    id: '4',
    type: 'opportunity',
    message: '新机会：客户"星辰数据科技"参加了产品演示会并要求定制方案，机会分数上升至88分。',
    timestamp: '2025-10-23T16:45:00',
    relatedId: '2'
  },
  {
    id: '5',
    type: 'risk',
    message: '注意：客户"未来网络集团"的主要联系人已离职，建议立即联系新负责人建立关系。',
    timestamp: '2025-10-23T14:20:00',
    relatedId: '2'
  },
  {
    id: '6',
    type: 'opportunity',
    message: '客户"绿色能源集团"的CEO在LinkedIn上关注了我们，这是建立高层关系的好机会。',
    timestamp: '2025-10-23T11:30:00',
    relatedId: '5'
  },
  {
    id: '7',
    type: 'prediction',
    message: 'AI洞察：过去7天内，网站访客中有12个符合理想客户画像，已自动加入培育流程。',
    timestamp: '2025-10-23T09:00:00'
  },
  {
    id: '8',
    type: 'opportunity',
    message: '客户"云端服务集团"刚刚浏览了竞品对比页面，建议发送差异化优势说明。',
    timestamp: '2025-10-22T15:45:00',
    relatedId: '3'
  }
];

// Sales trend data with confidence intervals
export const enhancedSalesTrendData = [
  { date: '10-01', actual: 450000, pipeline: 520000, predicted: 580000, upper: 620000, lower: 540000 },
  { date: '10-05', actual: 520000, pipeline: 620000, predicted: 680000, upper: 730000, lower: 630000 },
  { date: '10-10', actual: 680000, pipeline: 750000, predicted: 820000, upper: 890000, lower: 750000 },
  { date: '10-15', actual: 850000, pipeline: 920000, predicted: 980000, upper: 1050000, lower: 910000 },
  { date: '10-20', actual: 1020000, pipeline: 1100000, predicted: 1180000, upper: 1270000, lower: 1090000 },
  { date: '10-24', actual: 1180000, pipeline: 1280000, predicted: 1350000, upper: 1450000, lower: 1250000 },
  { date: '10-31', pipeline: 1450000, predicted: 1520000, upper: 1650000, lower: 1390000 },
  { date: '11-15', predicted: 1750000, upper: 1920000, lower: 1580000 },
  { date: '11-30', predicted: 2000000, upper: 2200000, lower: 1800000 }
];

// Funnel data with conversion rates
export const enhancedFunnelData = [
  { stage: '线索', count: 150, conversion: 100, avgDays: 0 },
  { stage: '联系', count: 105, conversion: 70, avgDays: 3 },
  { stage: '需求确认', count: 68, conversion: 65, avgDays: 7 },
  { stage: '方案演示', count: 42, conversion: 62, avgDays: 14 },
  { stage: '商务谈判', count: 28, conversion: 67, avgDays: 21 },
  { stage: '成交', count: 18, conversion: 64, avgDays: 30 }
];

// Team performance data
export const teamPerformanceData = [
  { name: '销售张三', deals: 8, revenue: 1580000, quota: 105 },
  { name: '销售李四', deals: 6, revenue: 1240000, quota: 98 },
  { name: '销售王五', deals: 5, revenue: 980000, quota: 82 },
  { name: '销售赵六', deals: 7, revenue: 1350000, quota: 90 },
  { name: '销售钱七', deals: 4, revenue: 720000, quota: 72 }
];

// Industry comparison data
export const industryComparisonData = [
  { industry: '科技', count: 12, value: 3800000 },
  { industry: '金融', count: 8, value: 2400000 },
  { industry: '制造', count: 6, value: 1800000 },
  { industry: '教育', count: 5, value: 950000 },
  { industry: '医疗', count: 4, value: 1200000 }
];
