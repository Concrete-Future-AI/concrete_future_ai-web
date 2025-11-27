import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, Code, FileText, Search, Sparkles, TrendingUp, Users, ExternalLink, BookOpen, Loader2 } from 'lucide-react';

const applications = [
  {
    id: 1,
    name: '智问 ChatDocs',
    description: '企业知识库智能问答系统，支持跨23个知识源的精准检索与回答',
    icon: MessageCircle,
    category: '知识管理',
    users: '1,247',
    color: 'blue',
    status: 'active',
    features: ['引用溯源', 'RAG检索', '多知识源']
  },
  {
    id: 2,
    name: '码匠 CodeCopilot',
    description: '智能代码助手，基于公司代码库训练，理解内部架构与规范',
    icon: Code,
    category: '研发工具',
    users: '856',
    color: 'purple',
    status: 'active',
    features: ['代码生成', '代码审查', '漏洞检测']
  },
  {
    id: 3,
    name: '思创 IdeaSpark',
    description: '营销文案与创意生成器，符合品牌调性与合规要求',
    icon: Sparkles,
    category: '营销创意',
    users: '423',
    color: 'pink',
    status: 'active',
    features: ['多场景模板', '品牌一致性', '合规检查']
  },
  {
    id: 4,
    name: '数析 DataInsight',
    description: '自然语言数据分析，自动生成SQL并可视化业务指标',
    icon: TrendingUp,
    category: '数据分析',
    users: '312',
    color: 'green',
    status: 'active',
    features: ['自然语言查询', 'SQL生成', '图表可视化']
  },
  {
    id: 5,
    name: '合规卫士 ComplianceGuard',
    description: '自动审查文档合规性，识别潜在法律与政策风险',
    icon: FileText,
    category: '法务合规',
    users: '189',
    color: 'orange',
    status: 'beta',
    features: ['风险识别', '条款对比', '合规建议']
  },
  {
    id: 6,
    name: '客服精灵 ServiceBot',
    description: '智能客服机器人，基于产品文档与工单历史训练',
    icon: Users,
    category: '客户服务',
    users: '567',
    color: 'cyan',
    status: 'active',
    features: ['7×24服务', '多轮对话', '工单创建']
  },
];

export function ApplicationShowcase() {
  const [selectedApp, setSelectedApp] = useState(applications[0]);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '您好！我是智问，您的企业知识助手。请选择知识范围并提出问题。', citations: [] }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedKnowledge, setSelectedKnowledge] = useState('all');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const generateResponse = (userQuery: string, knowledgeScope: string) => {
    const lowerQuery = userQuery.toLowerCase();
    
    // 模拟智能响应生成
    const responses: { [key: string]: { content: string; citations: { text: string; page: number }[] } } = {
      '差旅': {
        content: '根据公司差旅管理制度，员工差旅报销标准如下：\n\n1. **交通费用**：实际发生的交通费用可全额报销，包括飞机、火车、地铁、出租车等。国内出差优先选择高铁二等座或经济舱。\n\n2. **住宿费用**：根据出差城市等级有不同标准。一线城市（北上广深）每晚上限800元，二线城市每晚上限500元，其他城市每晚上限300元。\n\n3. **餐饮补贴**：按出差天数计算，每天补贴标准为150元，无需提供发票。\n\n4. **其他费用**：因公产生的通讯费、资料费等需提供发票，经部门主管审批后可报销。\n\n所有报销需在出差结束后30天内提交，逾期不予受理。',
        citations: [
          { text: '员工差旅报销标准 V3.5.pdf', page: 12 },
          { text: '差旅管理制度2024版.docx', page: 5 },
          { text: 'HR-财务流程手册', page: 28 }
        ]
      },
      '年假': {
        content: '根据公司人力资源政策，员工年假规定如下：\n\n1. **年假天数**：工作满1年的员工享有5天年假，工作满3年享有10天，工作满5年享有15天。\n\n2. **申请流程**：提前5个工作日在HR系统提交申请，经直属主管批准后生效。\n\n3. **有效期**：当年度年假需在本年度12月31日前使用完毕，不可跨年累积。\n\n4. **特殊情况**：如遇重大项目，主管可要求延后休假，但需在项目结束后1个月内安排补休。',
        citations: [
          { text: '员工福利与假期管理制度.pdf', page: 8 },
          { text: 'HR员工手册2024版', page: 45 }
        ]
      },
      '加班': {
        content: '关于加班政策，公司规定如下：\n\n1. **加班申请**：所有加班需提前在考勤系统申请，经部门主管审批。突发加班需在次日补充申请。\n\n2. **加班补偿**：工作日加班按1.5倍工资计算，周末加班按2倍计算，法定节假日按3倍计算。也可选择调休。\n\n3. **加班时长限制**：每月加班不得超过36小时，特殊项目需CTO/COO批准。\n\n4. **加班餐费**：晚上8点后加班可报销晚餐费用，上限50元/人。',
        citations: [
          { text: '考勤与加班管理规定.docx', page: 15 },
          { text: '薪酬福利手册', page: 22 }
        ]
      },
      '报销': {
        content: '公司费用报销流程如下：\n\n1. **报销时限**：费用发生后30天内必须提交报销申请，逾期不予受理。\n\n2. **单据要求**：必须提供正规发票原件，发票抬头需为公司全称。\n\n3. **审批流程**：500元以下主管审批，500-5000元部门总监审批，5000元以上需CFO审批。\n\n4. **到账时间**：审批通过后，下一个工资发放日随工资一并发放。\n\n5. **特殊费用**：客户招待费、团建费用需提前申请并填写详细说明。',
        citations: [
          { text: '财务报销管理制度V2.0.pdf', page: 3 },
          { text: 'HR-财务流程手册', page: 18 }
        ]
      },
      '入职': {
        content: '新员工入职流程说明：\n\n1. **入职准备**：收到Offer后，HR会发送入职指引邮件，包含需准备的材料清单（身份证、学历证明、离职证明等）。\n\n2. **入职当天**：上午9:00到HR报到，办理入职手续、签订劳动合同、领取工牌和办公设备。\n\n3. **IT权限开通**：IT部门会在入职当天开通邮箱、内网、OA系统等权限，并配置电脑。\n\n4. **新人培训**：入职第一周参加公司文化、规章制度、安全培训等新人培训课程。\n\n5. **试用期**：试用期为3个月，期间HR会安排定期沟通，试用期满前进行转正评估。',
        citations: [
          { text: '新员工入职手册2024.pdf', page: 1 },
          { text: 'HR流程文档-入职离职', page: 5 }
        ]
      },
      '技术': {
        content: '根据公司技术文档和最佳实践：\n\n1. **技术栈**：前端使用React + TypeScript，后端使用Node.js/Python，数据库PostgreSQL + Redis。\n\n2. **代码规范**：遵循ESLint和Prettier配置，所有代码需通过Code Review才能合并。\n\n3. **Git流程**：使用Git Flow分支策略，feature分支开发，develop集成测试，main生产发布。\n\n4. **CI/CD**：使用GitLab CI，自动运行单元测试、代码扫描、构建部署流程。\n\n5. **安全要求**：禁止硬编码密钥，使用环境变量；所有API需添加认证；定期进行安全扫描。',
        citations: [
          { text: 'GitLab-核心代码库/README.md', page: 1 },
          { text: '技术开发规范V3.0.pdf', page: 10 },
          { text: 'DevOps最佳实践', page: 22 }
        ]
      },
      '代码': {
        content: '关于代码开发规范与流程：\n\n**开发流程**：\n1. 从develop分支创建feature分支\n2. 本地开发并编写单元测试\n3. 提交前运行lint和test\n4. 提交Pull Request并指定reviewer\n5. Code Review通过后合并到develop\n\n**代码质量要求**：\n- 测试覆盖率不低于80%\n- 所有函数必须有注释说明\n- 遵循SOLID原则和设计模式\n- 禁止使用any类型（TypeScript）\n\n**安全规范**：\n- 敏感信息使用环境变量\n- SQL语句使用参数化查询\n- 所有用户输入必须验证和转义',
        citations: [
          { text: 'GitLab-核心代码库/CONTRIBUTING.md', page: 1 },
          { text: '代码安全规范V2.0.pdf', page: 5 }
        ]
      },
      '离职': {
        content: '员工离职流程如下：\n\n1. **提交离职申请**：至少提前30天提交书面离职申请（试用期内提前3天）。\n\n2. **工作交接**：在离职前完成所有工作交接，包括项目文档、代码、账号权限等。\n\n3. **离职面谈**：HR会安排离职面谈，了解离职原因和改进建议。\n\n4. **物品归还**：归还工牌、门禁卡、电脑、手机等公司财产。\n\n5. **手续办理**：人事部办理离职手续，财务部结算工资，IT部收回所有系统权限。\n\n6. **离职证明**：办理完毕后，HR会出具离职证明和解除劳动合同证明。',
        citations: [
          { text: 'HR流程文档-入职离职', page: 18 },
          { text: '员工手册-离职管理', page: 52 }
        ]
      },
      '薪资': {
        content: '关于薪资相关政策：\n\n1. **发薪日**：每月15日发放上月工资，如遇节假日则提前至工作日发放。\n\n2. **薪资构成**：基本工资 + 绩效奖金 + 各项补贴 + 年终奖。\n\n3. **调薪机制**：每年6月和12月进行薪资普调，特殊情况可申请破格调薪。\n\n4. **绩效考核**：季度考核决定季度奖金，年度考核决定年终奖和调薪幅度。\n\n5. **五险一金**：按照北京市标准缴纳，公积金比例12%。',
        citations: [
          { text: '薪酬管理制度V3.0.pdf', page: 5 },
          { text: '绩效考核办法', page: 12 }
        ]
      }
    };

    // 根据关键词匹配响应
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }

    // 默认响应
    return {
      content: `关于"${userQuery}"的查询，我在知识库中为您检索了相关信息。\n\n基于${knowledgeScope === 'all' ? '所有知识库' : '选定知识库'}的检索结果，我建议：\n\n1. **使用更具体的关键词**：比如"年假申请流程"、"差旅报销标准"、"技术开发规范"等\n2. **选择特定知识库**：如果您的问题属于特定领域，可以在上方选择对应的知识库范围\n3. **提供更多上下文**：描述您的具体场景可以帮我提供更准确的答案\n\n**我可以帮您查询的内容包括**：\n- HR政策（年假、加班、入职、离职、薪资等）\n- 财务流程（报销、差旅、采购等）\n- 技术文档（开发规范、架构设计、代码规范等）\n- 产品规范（需求文档、产品手册等）`,
      citations: [
        { text: 'Confluence-产品文档', page: 1 },
        { text: 'HR员工手册2024版', page: 1 }
      ]
    };
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim() || isTyping) return;

    // 添加用户消息
    const userMessage = { role: 'user' as const, content: currentMessage, citations: [] };
    setChatMessages(prev => [...prev, userMessage]);

    const query = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    // 模拟AI思考延迟
    setTimeout(() => {
      const response = generateResponse(query, selectedKnowledge);
      const assistantMessage = {
        role: 'assistant' as const,
        content: response.content,
        citations: response.citations
      };
      setChatMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg text-white">融合应用中心</div>
        <div className="text-sm text-slate-400">基于智核平台能力构建的企业AI应用</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <Card
            key={app.id}
            className={`cursor-pointer border-slate-800 bg-[#0d1117] p-5 transition-all hover:border-${app.color}-500/50 ${
              selectedApp.id === app.id ? `border-${app.color}-500/50 ring-1 ring-${app.color}-500/20` : ''
            }`}
            onClick={() => setSelectedApp(app)}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${app.color}-500/10`}>
                  <app.icon className={`h-6 w-6 text-${app.color}-400`} />
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    app.status === 'active'
                      ? 'border-green-500/30 bg-green-500/10 text-green-400'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                  } text-xs`}
                >
                  {app.status === 'active' ? '运行中' : 'Beta'}
                </Badge>
              </div>

              <div>
                <div className="text-white">{app.name}</div>
                <div className="mt-2 text-xs text-slate-400">{app.description}</div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {app.features.map((feature) => (
                  <span key={feature} className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Users className="h-3 w-3" />
                  <span>{app.users} 活跃用户</span>
                </div>
                <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                  {app.category}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-slate-800 bg-[#0d1117] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-white">应用演示: {selectedApp.name}</div>
            <div className="text-xs text-slate-400">{selectedApp.description}</div>
          </div>
          <Button variant="outline" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700">
            <ExternalLink className="mr-2 h-4 w-4" />
            打开应用
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <Card className="border-slate-800 bg-slate-900/30">
              <div className="border-b border-slate-800 p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${selectedApp.color}-500/10`}>
                    <selectedApp.icon className={`h-4 w-4 text-${selectedApp.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <Select value={selectedKnowledge} onValueChange={setSelectedKnowledge}>
                      <SelectTrigger className="border-slate-700 bg-slate-800/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-slate-700 bg-slate-800">
                        <SelectItem value="all">所有知识库</SelectItem>
                        <SelectItem value="hr">人力资源政策</SelectItem>
                        <SelectItem value="finance">财务报销制度</SelectItem>
                        <SelectItem value="it">IT技术文档</SelectItem>
                        <SelectItem value="product">产品文档</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-200'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        {message.citations && message.citations.length > 0 && (
                          <div className="mt-3 space-y-1 border-t border-slate-700 pt-3">
                            <div className="text-xs text-slate-400">引用来源:</div>
                            {message.citations.map((citation, idx) => (
                              <button
                                key={idx}
                                className="flex items-center gap-2 rounded bg-slate-900/50 px-2 py-1 text-xs text-blue-400 hover:bg-slate-900 transition-colors"
                              >
                                <BookOpen className="h-3 w-3" />
                                <span>[{idx + 1}] {citation.text}</span>
                                {citation.page && <span className="text-slate-500">p.{citation.page}</span>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">AI正在思考...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="border-t border-slate-800 p-4">
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="请输入您的问题，例如：公司差旅报销标准是什么？"
                    className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isTyping || !currentMessage.trim()}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  💡 试试问: "年假怎么申请"、"加班费怎么算"、"技术栈是什么"
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-slate-800 bg-slate-900/30 p-4">
              <div className="mb-3 text-sm text-white">应用统计</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-400">今日查询</div>
                  <div className="mt-1 text-lg text-white">2,847</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">平均响应时间</div>
                  <div className="mt-1 text-lg text-white">1.2s</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">答案准确率</div>
                  <div className="mt-1 text-lg text-green-400">94.7%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">用户满意度</div>
                  <div className="mt-1 text-lg text-green-400">4.6/5.0</div>
                </div>
              </div>
            </Card>

            <Card className="border-slate-800 bg-slate-900/30 p-4">
              <div className="mb-3 text-sm text-white">调用的模型</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">主模型</span>
                  <span className="text-white">Qwen-14B</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Embedding</span>
                  <span className="text-white">BGE-Large</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">知识库</span>
                  <span className="text-white">23个源</span>
                </div>
              </div>
            </Card>

            <Card className="border-slate-800 bg-slate-900/30 p-4">
              <div className="mb-3 text-sm text-white">安全特性</div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span>数据不出域</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span>DLP内容过滤</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span>操作审计日志</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span>答案可溯源</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
