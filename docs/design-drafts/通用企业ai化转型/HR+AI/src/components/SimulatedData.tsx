// 模拟数据生成器 - 为演示提供更真实的数据

export const generateMockCandidates = (count: number = 20) => {
  const firstNames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴'];
  const secondNames = ['伟', '娜', '强', '芳', '明', '敏', '涛', '静', '磊', '丽'];
  const roles = ['前端工程师', '全栈工程师', '后端工程师', '产品经理', '数据分析师'];
  const skills = [
    ['React', 'TypeScript', 'Node.js'],
    ['Vue', 'Python', 'AWS'],
    ['Angular', 'Java', 'Spring'],
    ['React', 'Go', 'Kubernetes'],
    ['Python', 'SQL', 'Tableau'],
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % 10]}${secondNames[(i + 3) % 10]}`,
    role: roles[i % 5],
    matchScore: Math.floor(Math.random() * 30) + 70,
    skills: skills[i % 5],
    experience: `${Math.floor(Math.random() * 8) + 2}年`,
    status: ['new', 'screening', 'interview', 'offer'][Math.floor(Math.random() * 4)],
    avatar: `${firstNames[i % 10]}${secondNames[(i + 3) % 10].charAt(0)}`,
    skillMatch: Math.floor(Math.random() * 20) + 80,
    experienceMatch: Math.floor(Math.random() * 20) + 75,
    cultureMatch: Math.floor(Math.random() * 25) + 70,
  }));
};

export const generateMockEmployees = (count: number = 50) => {
  const departments = ['研发', '产品', '销售', '市场', '运营', '人力资源', '财务'];
  const names = ['张明', '王芳', '刘强', '陈静', '李伟', '赵敏', '周涛', '吴丽'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % 8],
    department: departments[i % 7],
    position: ['工程师', '经理', '总监', '专员'][Math.floor(Math.random() * 4)],
    engagementScore: Math.floor(Math.random() * 30) + 60,
    riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
    tenure: Math.floor(Math.random() * 60) + 6, // months
  }));
};

export const generateMockCourses = (count: number = 12) => {
  const courses = [
    { title: '系统设计面试突破', platform: '内部学习平台', thumbnail: '🏗️', duration: '8小时' },
    { title: '产品经理的一天', platform: 'Coursera', thumbnail: '💡', duration: '5小时' },
    { title: 'React性能优化实战', platform: 'Udemy', thumbnail: '⚡', duration: '12小时' },
    { title: 'TypeScript高级特性', platform: '极客时间', thumbnail: '📘', duration: '6小时' },
    { title: '数据分析实战', platform: 'LinkedIn Learning', thumbnail: '📊', duration: '10小时' },
    { title: 'AI大模型应用开发', platform: '内部学习平台', thumbnail: '🤖', duration: '15小时' },
    { title: '敏捷项目管理', platform: 'Udemy', thumbnail: '🎯', duration: '7小时' },
    { title: 'UI/UX设计思维', platform: 'Coursera', thumbnail: '🎨', duration: '9小时' },
    { title: 'Python数据科学', platform: 'DataCamp', thumbnail: '🐍', duration: '20小时' },
    { title: '云原生架构', platform: '极客时间', thumbnail: '☁️', duration: '14小时' },
    { title: '领导力提升', platform: 'LinkedIn Learning', thumbnail: '👥', duration: '6小时' },
    { title: '商业分析基础', platform: 'Coursera', thumbnail: '💼', duration: '8小时' },
  ];

  return courses.slice(0, count).map((course, i) => ({
    ...course,
    rating: (Math.random() * 0.5 + 4.5).toFixed(1),
    enrolled: Math.floor(Math.random() * 500) + 50,
    relevance: Math.floor(Math.random() * 20) + 75,
  }));
};

export const generateMockSkillGaps = () => {
  return [
    { skill: '系统设计', current: 60, target: 80, gap: 20 },
    { skill: '产品思维', current: 55, target: 75, gap: 20 },
    { skill: 'TypeScript', current: 75, target: 85, gap: 10 },
    { skill: '领导力', current: 50, target: 70, gap: 20 },
    { skill: '数据分析', current: 45, target: 70, gap: 25 },
  ];
};

export const generateMockProjects = () => {
  return [
    {
      name: '用户增长系统重构',
      status: 'active',
      progress: 65,
      team: ['张明', '王芳', '李雪'],
      deadline: '2025-12-15',
    },
    {
      name: 'AI智能推荐引擎',
      status: 'planning',
      progress: 20,
      team: ['刘强', '陈静'],
      deadline: '2026-02-28',
    },
    {
      name: '移动端性能优化',
      status: 'completed',
      progress: 100,
      team: ['李雪', '赵敏', '周涛'],
      deadline: '2025-09-30',
    },
  ];
};

export const generateMockNotifications = () => {
  return [
    {
      id: 1,
      type: 'recruitment',
      title: '新简历到达',
      description: '张伟的简历匹配度95分，建议立即查看',
      time: '5分钟前',
      read: false,
    },
    {
      id: 2,
      type: 'onboarding',
      title: '入职提醒',
      description: '别忘了今天15:00与导师张经理的会议',
      time: '1小时前',
      read: false,
    },
    {
      id: 3,
      type: 'learning',
      title: '学习推荐',
      description: '新课程《系统设计面试突破》已为你推荐',
      time: '3小时前',
      read: true,
    },
    {
      id: 4,
      type: 'engagement',
      title: '团队敬业度提醒',
      description: '研发团队本周敬业度有所下降，建议关注',
      time: '1天前',
      read: true,
    },
  ];
};

export const generateMockMeetings = () => {
  return [
    {
      id: 1,
      title: '与导师张经理的1对1',
      time: '今天 15:00',
      duration: '30分钟',
      type: 'mentoring',
      attendees: ['张经理', '李雪'],
    },
    {
      id: 2,
      title: '团队周会',
      time: '明天 10:00',
      duration: '1小时',
      type: 'team',
      attendees: ['产品工程团队'],
    },
    {
      id: 3,
      title: '技术分享：React最佳实践',
      time: '本周五 14:00',
      duration: '45分钟',
      type: 'learning',
      attendees: ['全体前端工程师'],
    },
  ];
};

export const generateEngagementTrend = (months: number = 12) => {
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  let baseScore = 65;
  
  return Array.from({ length: months }, (_, i) => {
    baseScore += Math.floor(Math.random() * 10) - 4;
    baseScore = Math.max(60, Math.min(85, baseScore));
    
    return {
      month: monthNames[i % 12],
      score: baseScore,
      activeUsers: Math.floor(Math.random() * 50) + 150,
    };
  });
};

export const generatePerformanceReviews = (count: number = 50) => {
  const names = ['张明', '王芳', '刘强', '陈静', '李伟', '赵敏', '周涛', '吴丽'];
  const roles = ['工程师', '高级工程师', '产品经理', '设计师', '数据分析师'];
  const ratings = ['S', 'A', 'B', 'C', 'D'];
  const departments = ['研发', '产品', '销售', '市场', '运营'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % 8],
    role: roles[i % 5],
    department: departments[i % 5],
    rating: ratings[Math.floor(Math.random() * ratings.length)],
    score: (Math.random() * 2 + 3).toFixed(1),
    status: ['completed', 'in-review', 'pending'][Math.floor(Math.random() * 3)],
    goalsCompleted: Math.floor(Math.random() * 100),
  }));
};

export const generatePromotionCandidates = (count: number = 10) => {
  const candidates = [
    { name: '张伟', current: '高级工程师', target: '技术专家', readiness: 'ready' },
    { name: '李娜', current: '产品经理', target: '高级产品经理', readiness: 'ready' },
    { name: '王强', current: '工程师', target: '高级工程师', readiness: 'developing' },
    { name: '陈静', current: '设计师', target: '高级设计师', readiness: 'ready' },
    { name: '赵敏', current: '数据分析师', target: '高级数据分析师', readiness: 'developing' },
  ];

  return candidates.slice(0, count).map((candidate, i) => ({
    ...candidate,
    id: i + 1,
    score: Math.floor(Math.random() * 20) + 75,
    yearsInRole: (Math.random() * 2 + 0.5).toFixed(1),
    lastRating: ['S', 'A', 'B'][Math.floor(Math.random() * 3)],
  }));
};
