import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Download,
  Share2,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface MeetingData {
  client: string;
  date: string;
  time: string;
  attendees: number;
  type: string;
}

export default function AIMeetingPrep() {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [prepProgress, setPrepProgress] = useState(0);
  const [prepCompleted, setPrepCompleted] = useState(false);

  const upcomingMeetings: MeetingData[] = [
    {
      client: '金融科技创新 - 周总 (CTO)',
      date: '明天',
      time: '下午 2:00',
      attendees: 5,
      type: '产品演示'
    },
    {
      client: 'ABC科技 - 王总 (CEO)',
      date: '后天',
      time: '上午 10:00',
      attendees: 3,
      type: '方案讨论'
    },
    {
      client: '智慧制造 - 李经理',
      date: '本周五',
      time: '下午 3:30',
      attendees: 4,
      type: '技术对接'
    }
  ];

  const prepSteps = [
    { id: 1, name: '客户背景调研', duration: 2000, icon: Users },
    { id: 2, name: '行业分析', duration: 1500, icon: TrendingUp },
    { id: 3, name: '竞争对手分析', duration: 1800, icon: Briefcase },
    { id: 4, name: '话术策略生成', duration: 2200, icon: Lightbulb },
    { id: 5, name: '材料准备清单', duration: 1000, icon: FileText }
  ];

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const startPreparation = (clientName: string) => {
    setSelectedMeeting(clientName);
    setIsPreparing(true);
    setPrepProgress(0);
    setCompletedSteps([]);
    setPrepCompleted(false);

    // 模拟准备过程
    let currentStep = 0;
    const totalDuration = prepSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsedTime = 0;

    const interval = setInterval(() => {
      if (currentStep < prepSteps.length) {
        elapsedTime += 100;
        const progress = (elapsedTime / totalDuration) * 100;
        setPrepProgress(Math.min(progress, 100));

        if (elapsedTime >= prepSteps.slice(0, currentStep + 1).reduce((sum, step) => sum + step.duration, 0)) {
          setCompletedSteps(prev => [...prev, prepSteps[currentStep].id]);
          toast.success(`${prepSteps[currentStep].name}完成`);
          currentStep++;
        }
      } else {
        clearInterval(interval);
        setIsPreparing(false);
        setPrepCompleted(true);
        toast.success('AI会议准备完成！');
      }
    }, 100);
  };

  const prepResult = {
    client: '金融科技创新',
    position: 'CTO',
    name: '周总',
    background: {
      company: '金融科技创新有限公司',
      size: '1000+ 员工',
      revenue: '年收入 5-10 亿',
      funding: 'B轮融资 5000万',
      industry: '金融科技',
      founded: '2018年'
    },
    recentActivity: [
      '3次访问定价页面',
      '下载了2份产品白皮书',
      '观看完整产品演示视频',
      '访问了安全认证页面',
      '查看了客户案例'
    ],
    painPoints: [
      '现有系统数据孤岛严重',
      '销售流程缺乏标准化',
      '客户数据分散难以分析',
      '团队协作效率低下'
    ],
    interests: [
      '数据安全和隐私保护',
      '系统集成能力',
      'AI智能分析功能',
      'ROI投资回报',
      '实施周期和成本'
    ],
    competitors: [
      { name: 'Salesforce', status: '已接触', concern: '价格偏高，本地化不足' },
      { name: 'HubSpot', status: '正在评估', concern: '功能不够深入' }
    ],
    talkingPoints: [
      {
        stage: '开场（5分钟）',
        points: [
          '感谢对方时间，简要回顾上次沟通要点',
          '确认今天会议目标和议程',
          '强调我们在金融行业的成功经验'
        ]
      },
      {
        stage: '痛点挖掘（10分钟）',
        points: [
          '询问：当前系统在数据整合方面遇到的具体挑战？',
          '探讨：团队在客户跟进中的痛点？',
          '了解：对AI分析功能的具体期望？'
        ]
      },
      {
        stage: '方案展示（20分钟）',
        points: [
          '演示：数据整合和智能分析功能',
          '案例：同行业客户成功案例（XX银行）',
          '数据：ROI预计提升40%，3个月回本',
          '强调：银行级数据安全保障'
        ]
      },
      {
        stage: '异议处理（10分钟）',
        points: [
          '价格：说明性价比，对比竞品总体拥有成本',
          '集成：展示与主流系统的集成案例',
          '实施：4周快速上线，不影响现有业务'
        ]
      },
      {
        stage: '推进成交（5分钟）',
        points: [
          '确认：解决方案是否符合需求？',
          '询问：决策流程和时间表？',
          '行动：安排技术对接和POC测试',
          '承诺：提供专属服务和优惠方案'
        ]
      }
    ],
    materials: [
      { name: '金融行业解决方案PPT', status: '已准备', icon: FileText },
      { name: '银行客户成功案例', status: '已准备', icon: FileText },
      { name: '安全认证文档', status: '已准备', icon: FileText },
      { name: '定制化报价方案', status: '需要更新', icon: AlertTriangle },
      { name: 'ROI计算器', status: '已准备', icon: FileText },
      { name: '系统集成方案', status: '已准备', icon: FileText }
    ],
    recommendations: [
      '提前15分钟到达，准备好演示环境',
      '准备2-3个针对性问题，展现对客户的了解',
      '带上成功案例的实际数据和客户证言',
      '准备应对价格异议的3个论据',
      '会议结束前确定下一步行动和时间'
    ],
    risks: [
      { risk: '竞争对手Salesforce也在接触', level: '高', action: '强调本地化和性价比优势' },
      { risk: '决策周期可能较长', level: '中', action: '提供POC快速验证价值' },
      { risk: '技术团队对集成有顾虑', level: '中', action: '安排技术总监参会' }
    ]
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-neutral-900">AI会议准备</h3>
                <p className="text-sm text-neutral-500">智能准备会议材料，提升成功率</p>
              </div>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-700 border-0 rounded-full">
            {upcomingMeetings.length} 个即将到来
          </Badge>
        </div>

        {/* 即将到来的会议 */}
        <div className="space-y-3">
          <h4 className="text-sm text-neutral-700">选择要准备的会议</h4>
          {upcomingMeetings.map((meeting, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.01 }}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                selectedMeeting === meeting.client
                  ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-teal-50'
                  : 'border-neutral-200 bg-white hover:border-purple-200'
              }`}
              onClick={() => !isPreparing && startPreparation(meeting.client)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm text-neutral-900 mb-2">{meeting.client}</h4>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meeting.date} {meeting.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {meeting.attendees} 人参会
                    </span>
                    <Badge variant="outline" className="rounded-full text-xs">
                      {meeting.type}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={isPreparing}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 rounded-lg"
                >
                  <Play className="w-3 h-3 mr-1" />
                  准备
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* 准备进度 */}
      <AnimatePresence>
        {isPreparing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                <h3 className="text-neutral-900">AI正在准备会议...</h3>
              </div>
              
              <Progress value={prepProgress} className="h-2 mb-6" />
              
              <div className="space-y-3">
                {prepSteps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = completedSteps.includes(step.id);
                  const isCurrent = completedSteps.length + 1 === step.id;
                  
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isCompleted ? 'bg-teal-50' : isCurrent ? 'bg-purple-50' : 'bg-neutral-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-teal-100 text-teal-600' :
                        isCurrent ? 'bg-purple-100 text-purple-600' :
                        'bg-neutral-200 text-neutral-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <span className={`text-sm ${
                        isCompleted ? 'text-teal-700' :
                        isCurrent ? 'text-purple-700' :
                        'text-neutral-500'
                      }`}>
                        {step.name}
                      </span>
                      {isCurrent && (
                        <span className="ml-auto text-xs text-purple-600 animate-pulse">
                          处理中...
                        </span>
                      )}
                      {isCompleted && (
                        <CheckCircle2 className="ml-auto w-4 h-4 text-teal-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 准备结果 */}
      <AnimatePresence>
        {prepCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* 客户背景 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-purple-600" />
                <h3 className="text-neutral-900">客户背景</h3>
                <Badge className="bg-teal-100 text-teal-700 border-0 rounded-full ml-auto">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  已完成
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {Object.entries(prepResult.background).map(([key, value]) => (
                  <div key={key} className="p-3 bg-neutral-50 rounded-xl">
                    <div className="text-xs text-neutral-500 mb-1">
                      {key === 'company' && '公司名称'}
                      {key === 'size' && '公司规模'}
                      {key === 'revenue' && '年收入'}
                      {key === 'funding' && '融资情况'}
                      {key === 'industry' && '所属行业'}
                      {key === 'founded' && '成立时间'}
                    </div>
                    <div className="text-sm text-neutral-900">{value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-neutral-700 mb-2">最近活动</h4>
                  <ul className="space-y-1">
                    {prepResult.recentActivity.map((activity, idx) => (
                      <li key={idx} className="text-xs text-neutral-600 flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-teal-600 mt-0.5 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm text-neutral-700 mb-2">关注重点</h4>
                  <ul className="space-y-1">
                    {prepResult.interests.map((interest, idx) => (
                      <li key={idx} className="text-xs text-neutral-600 flex items-start gap-2">
                        <Sparkles className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* 话术策略 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                <h3 className="text-neutral-900">推荐话术策略</h3>
              </div>
              
              <div className="space-y-4">
                {prepResult.talkingPoints.map((section, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                    <h4 className="text-sm text-orange-900 mb-2">{section.stage}</h4>
                    <ul className="space-y-1.5">
                      {section.points.map((point, pidx) => (
                        <li key={pidx} className="text-xs text-orange-700 flex items-start gap-2">
                          <span className="text-orange-400 flex-shrink-0">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            {/* 材料清单 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-neutral-900">材料准备清单</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {prepResult.materials.map((material, idx) => {
                  const Icon = material.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border ${
                        material.status === '已准备'
                          ? 'bg-teal-50 border-teal-200'
                          : 'bg-orange-50 border-orange-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${
                          material.status === '已准备' ? 'text-teal-600' : 'text-orange-600'
                        }`} />
                        <span className="text-sm text-neutral-900 flex-1">{material.name}</span>
                        {material.status === '已准备' ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* AI建议 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-neutral-900">AI智能建议</h3>
              </div>
              
              <div className="space-y-3">
                {prepResult.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-purple-900">{rec}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 风险预警 */}
            <Card className="border-0 shadow-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-neutral-900">风险预警</h3>
              </div>
              
              <div className="space-y-3">
                {prepResult.risks.map((risk, idx) => (
                  <div key={idx} className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm text-red-900">{risk.risk}</span>
                      <Badge className={`${
                        risk.level === '高' ? 'bg-red-100 text-red-700' :
                        risk.level === '中' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      } border-0 rounded-full`}>
                        {risk.level}风险
                      </Badge>
                    </div>
                    <div className="text-xs text-red-700 flex items-start gap-2">
                      <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      应对策略：{risk.action}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                导出准备清单
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl">
                <Share2 className="w-4 h-4 mr-2" />
                分享给团队
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
