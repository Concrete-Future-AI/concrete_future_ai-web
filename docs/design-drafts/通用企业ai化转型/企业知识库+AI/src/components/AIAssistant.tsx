import { useState, useEffect, useRef } from "react";
import { 
  X, Send, Sparkles, Clock, BookOpen, Search, 
  Database, CheckCircle2, Zap, Brain, FileText, 
  TrendingUp, ChevronRight, Bot, Loader2, Copy,
  ThumbsUp, RefreshCw, Share2, Bookmark, Tag,
  AlertCircle, Target, SlidersHorizontal
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  searchProcess?: SearchProcess;
  sources?: Source[];
  relatedQuestions?: string[];
  confidence?: number;
}

interface SearchProcess {
  status: "idle" | "analyzing" | "searching" | "matching" | "generating" | "completed";
  currentStep: number;
  totalSteps: number;
  keywords: string[];
  searchedDocs: number;
  matchedDocs: number;
  topResults: SearchResult[];
  processingTime: number;
}

interface SearchResult {
  id: string;
  title: string;
  category: string;
  relevance: number;
  snippet: string;
}

interface Source {
  title: string;
  category: string;
  url: string;
  lastUpdated: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

// 🗄️ 企业知识库数据
const KNOWLEDGE_DATABASE = [
  {
    id: "doc-001",
    title: "2024年销售业绩报告",
    category: "销售数据",
    lastUpdated: "2024-11-08",
    keywords: ["销售", "业绩", "报告", "数据", "本月", "上周", "季度", "收入"],
    content: `# 📊 2024年销售业绩报告

## 本月概览（11月1-8日）
- **总销售额**: ¥2,458,000
- **日均销售**: ¥307,250
- **同比增长**: +23.5% ⬆️
- **环比增长**: +18.2% ⬆️
- **新签客户**: 45 家
- **客户续约率**: 92.3%

## 上周亮点（11月1-7日）
### 整体表现
- 销售额: ¥1,245,000（超目标15%）
- 新客户: 156 个（超目标25%）
- 转化率: 12.8%（提升2.3个百分点）

### 产品线分析
**产品 A** - 主力产品
- 销售额: ¥560,000（占比45%）
- 同比增长: +32%
- 状态: 🔥 热销中

**产品 B** - 稳定产品
- 销售额: ¥373,500（占比30%）
- 同比增长: +18%
- 状态: ✅ 稳定

**产品 C** - 新品
- 销售额: ¥311,250（占比25%）
- 同比增长: +12%
- 状态: 📈 上升期

### 区域分布
- **华东区**: ¥498,000（40%）↑32% 🌟
- **华南区**: ¥373,500（30%）↑20%
- **华北区**: ¥248,500（20%）↑8% ⚠️
- **其他**: ¥125,000（10%）↑15%

## 成就与改进
✅ **主要成就**
- 华东地区突破历史新高
- 企业客户续约率达95%
- 新套餐方案NPS达85分

⚠️ **需要改进**
- 华北地区需加强市场推广
- 客户产品培训体系需完善
- 售后服务响应时间需优化`,
    snippet: "本月销售额¥2,458,000，同比增长23.5%，新签45家客户...",
  },
  {
    id: "doc-002",
    title: "员工休假与福利政策",
    category: "人力资源",
    lastUpdated: "2024-10-15",
    keywords: ["休假", "年假", "病假", "福利", "请假", "假期", "调休"],
    content: `# 🏖️ 员工休假与福利政策手册

## 年假制度
根据《员工手册 v3.2》第5章：

### 年假天数标准
| 工作年限 | 年假天数 |
|---------|---------|
| 满1年 | 5天 |
| 满3年 | 10天 |
| 满5年 | 15天 |
| 满10年 | 20天 |

### 年假规则
- ✅ 可跨年使用（需在次年3月前用完）
- 💰 未使用年假可折现（按300%薪资计算）
- 📅 可按半天或整天申请
- 🔄 年假可累计但不可透支

## 病假制度
### 病假天数
- 带薪病假：每年最多10天
- 需提供正规医院证明
- 当天请病假需上午10点前通知主管

### 病假待遇
- 1-3天：100%工资
- 4-10天：80%工资
- 超过10天：按国家规定执行

## 其他假期
### 法定假期
- 👫 **婚假**: 3天（晚婚额外7天）
- 👶 **产假**: 158天（含法定98天+延长60天）
- 👨‍👦 **陪产假**: 15天
- 😢 **丧假**: 直系亲属5天，非直系3天

### 特殊假期
- 🎓 **培训假**: 参加公司指定培训
- 🏥 **体检假**: 年度体检1天
- 🚑 **护理假**: 照顾患病直系亲属

## 申请流程
1. 登录HR系统 (hr.synapse.com)
2. 选择假期类型和日期
3. 填写申请原因
4. 提交主管审批
5. 等待HR确认

⏰ **提前时间要求**
- 年假：提前3个工作日
- 病假：当天上午10点前
- 其他：提前1个工作日

## 福利补充
### 弹性工作
- 核心工作时间：10:00-16:00
- 其他时间可弹性安排
- 每月2天居家办公

### 健康福利
- 年度体检（三甲医院）
- 商业医疗保险
- 健身房会员补贴`,
    snippet: "年假5-20天（按工龄），病假10天，婚假3天...",
  },
  {
    id: "doc-003",
    title: "Q3市场营销活动总结",
    category: "市场营销",
    lastUpdated: "2024-10-22",
    keywords: ["市场", "营销", "推广", "活动", "复盘", "campaign", "ROI"],
    content: `# 📈 2024年Q3市场营销活动总结

## 执行概览
### 核心指标
- ✅ **品牌曝光**: 687万次（目标500万，达成137%）
- ✅ **潜在客户**: 2,847人（目标2000，达成142%）
- ✅ **转化率**: 12.5%（目标10%，达成125%）
- ✅ **投资回报率**: 4.2（目标3.5，达成120%）
- 💰 **营销支出**: ¥1,850,000
- 💵 **带来收入**: ¥7,770,000

## 活动矩阵（共12个主要活动）

### 🎯 产品发布类
**"未来办公" 产品发布会**（9月15日）
- 线上观看人数: 45,238人
- 媒体报道: 23家主流媒体
- 新增注册用户: 1,850人
- 活动ROI: 5.2
- 社交媒体互动: 23,500次
- 🏆 **最佳活动奖**

### ✍️ 内容营销类
**"效率提升" 系列文章**（8篇专题）
- 总阅读量: 68,000次
- 平均停留: 3分42秒
- 转化线索: 420个
- 分享次数: 2,300次
- 收藏人数: 1,850人

### 🎬 视频营销类
**产品使用教程系列**
- 视频播放: 125,000次
- 完播率: 68%（行业平均45%）
- 点赞数: 8,500次
- 评论数: 1,200条

### 📧 EDM营销
**月度Newsletter**
- 发送数: 50,000封
- 打开率: 28%（行业平均22%）
- 点击率: 8.5%（行业平均3.2%）
- 转化率: 2.1%

## 渠道分析
### 表现最佳渠道（TOP 3）
1. **短视频平台** 
   - 获客成本: ¥28/人
   - 转化率: 15.3%
   - ROI: 5.8

2. **微信生态**
   - 获客成本: ¥35/人
   - 转化率: 13.2%
   - ROI: 4.9

3. **内容平台**
   - 获客成本: ¥42/人
   - 转化率: 11.8%
   - ROI: 4.2

## 数据洞察
📊 **关键发现**
- 视频内容表现最佳（观看率+65%）
- 周三、周四发布效果最好
- 短视频平台获客成本最低
- 教程类内容完播率最高
- 用户更喜欢实用型内容

## Q4规划建议
1. 加大短视频内容投入
2. 优化发布时间策略
3. 增加互动型活动
4. 深化客户案例营销
5. 建立KOL合作矩阵`,
    snippet: "Q3执行12个活动，获客2,847人，ROI达4.2...",
  },
  {
    id: "doc-004",
    title: "IT设备与技术支持指南",
    category: "IT支持",
    lastUpdated: "2024-11-05",
    keywords: ["IT", "设备", "报修", "电脑", "技术", "支持", "故障", "网络"],
    content: `# 🔧 IT设备与技术支持指南

## 快速报修

### 📱 在线报修（推荐）
1. 访问 **it.synapse.com**
2. 点击「设备报修」按钮
3. 选择设备类型
4. 描述故障现象
5. 上传问题截图/照片
6. 提交工单

### ☎️ 电话报修
- **IT热线**: 内线8888
- **工作时间**: 周一至周五 9:00-18:00
- **下班时间**: 紧急故障转分机8899

## 响应时间SLA

| 优先级 | 响应时间 | 解决时间 | 示例 |
|-------|---------|---------|------|
| 🔴 P0-危急 | 15分钟 | 2小时 | 服务器宕机、网络中断 |
| 🟠 P1-紧急 | 1小时 | 4小时 | 无法登录系统、邮件故障 |
| 🟠 P2-普通 | 4小时 | 1工作日 | 软件问题、打印机故障 |
| 🟢 P3-低 | 1工作日 | 3工作日 | 优化建议、功能咨询 |

## 常见问题自助解决

### 💻 电脑卡顿
**解决步骤：**
1. 按 Ctrl+Shift+Esc 打开任务管理器
2. 查看CPU、内存占用情况
3. 结束不必要的进程
4. 重启电脑
5. 如仍未解决，联系IT部门

**预防措施：**
- 定期清理磁盘垃圾
- 关闭自启动程序
- 保持系统更新

### 🌐 网络无法连接
**排查清单：**
- ✅ 检查网线是否插好
- ✅ 查看路由器指示灯
- ✅ 重启网络适配器
- ✅ 检查WiFi是否连接
- ✅ 尝试访问其他网站
- ✅ 重启路由器

### 🖨️ 打印机故障
**常见问题：**
- 无法打印 → 检查连接和驱动
- 打印模糊 → 清洁打印头
- 卡纸 → 按说明取出卡纸
- 无墨水 → 更换墨盒

## 软件与系统

### 📦 软件安装申请
1. 登录IT服务平台
2. 选择「软件安装申请」
3. 填写软件名称和用途
4. 等待主管审批
5. IT部门远程安装

### 🔐 VPN配置
**Windows系统：**
1. 下载VPN客户端
2. 使用域账号登录
3. 选择公司服务器
4. 连接即可

**Mac系统：**
1. 系统偏好设置 > 网络
2. 添加VPN配置
3. 输入服务器地址
4. 使用域账号登录

### 🗂️ 文件共享
**访问共享文件夹：**
- 路径: \\\\fileserver\\share
- 使用域账号登录
- 按权限访问对应文件夹

## 设备申请

### 💻 新设备申请流程
1. 确认设备需求
2. 提交申请（附加理由）
3. 部门主管审批
4. IT部门评估
5. 采购部门执行
6. 设备配置与发放

### ⏰ 申请时效
- 标准配置：5个工作日
- 特殊配置：10个工作日
- 紧急需求：3个工作日（需总监审批）

## IT服务团队
- **位置**: 3楼东侧
- **服务时间**: 工作日 9:00-18:00
- **团队人数**: 8人
- **平均满意度**: 4.8/5.0`,
    snippet: "在线报修 it.synapse.com，响应时间15分钟-1工作日...",
  },
  {
    id: "doc-005",
    title: "费用报销操作手册",
    category: "财务管理",
    lastUpdated: "2024-11-01",
    keywords: ["报销", "费用", "差旅", "发票", "财务", "预算", "审批"],
    content: `# 💰 费用报销操作手册

## 可报销费用类型

### ✈️ 差旅费用
**交通费**
- 飞机：经济舱（国内）、经济舱或商务舱（国际超8小时）
- 高铁：二等座
- 出租车：有发票即可
- 网约车：行程单+发票

**住宿费标准**
| 城市等级 | 限额 | 备注 |
|---------|------|------|
| 北上广深 | ¥600/晚 | 一线城市 |
| 省会城市 | ¥400/晚 | 新一线城市 |
| 其他城市 | ¥300/晚 | 二三线城市 |

**餐饮费**
- 标准：¥100/天
- 包含：早中晚餐
- 不含：酒水、娱乐

### 📝 办公费用
- 文具用品：≤¥500/次，无需预批
- 办公设备：≤¥2000/次，需主管批准
- 打印耗材：按需申请

### 🎓 培训费用
- 内部培训：全额报销
- 外部培训：需提前申请
- 职业认证：通过后报销80%

### 🎉 团建活动
- 标准：¥200/人/次
- 频率：每季度1次
- 需提前申请和预算

## 报销流程

### 📋 标准流程
1. **登录系统**
   - 访问 finance.synapse.com
   - 使用域账号登录

2. **创建报销单**
   - 点击「新建报销」
   - 选择报销类型
   - 填写基本信息

3. **上传凭证**
   - 拍摄清晰的发票照片
   - 支持格式：JPG、PNG、PDF
   - 单张≤5MB

4. **填写明细**
   - 费用日期
   - 费用类型
   - 金额
   - 事由说明

5. **提交审批**
   - 检查信息准确性
   - 点击「提交审批」
   - 等待审批流程

### 🔄 审批流程
- 员工提交
- 直属主管审批（1个工作日）
- 财务审核（1-2个工作日）
- 总经理审批（金额>5000元）
- 财务付款（3-5个工作日）

## 发票要求

### ✅ 合规发票
- 增值税普通发票或专用发票
- 发票抬头：正确的公司名称
- 税号：统一社会信用代码
- 发票内容：明确的项目名称
- 开票日期：3个月内

### ❌ 不可报销
- 无发票或白条
- 发票抬头错误
- 已过期发票（超3个月）
- 个人消费发票
- 虚假发票

## 报销时效

### ⏰ 时间要求
- **普通费用**: 发生后3个月内
- **跨年费用**: 次年1月15日前
- **项目费用**: 项目结束后1个月内

### 🚫 逾期处理
- 超期未报销视为自动放弃
- 特殊情况需书面说明
- 需总监以上审批

## 付款方式

### 💳 到账时间
- 审批通过后：3-5个工作日
- 紧急报销：1-2个工作日（需特批）
- 跨月报销：次月5日前

### 🏦 收款账户
- 默认：工资卡
- 可修改：需提前在系统中绑定

## 常见问题

### Q: 发票遗失怎么办？
A: 联系开票方重新开具，或提供发票存根复印件+情况说明

### Q: 如何查询报销进度？
A: 登录系统「我的报销」查看实时状态

### Q: 金额超标怎么处理？
A: 需在申请时说明原因，等待特批，超出部分可能自费

### Q: 可以代他人报销吗？
A: 不可以，必须本人提交报销申请`,
    snippet: "差旅、办公、培训费用可报销，3-5工作日到账...",
  },
];

// 🔍 智能搜索引擎
class SmartSearchEngine {
  private db = KNOWLEDGE_DATABASE;

  search(query: string): { results: SearchResult[]; keywords: string[] } {
    const keywords = this.extractKeywords(query);
    const results: SearchResult[] = [];

    this.db.forEach((doc) => {
      const relevance = this.calculateRelevance(keywords, doc.keywords, query, doc.content);
      if (relevance > 0) {
        results.push({
          id: doc.id,
          title: doc.title,
          category: doc.category,
          relevance: relevance,
          snippet: doc.snippet,
        });
      }
    });

    // 按相关度排序
    results.sort((a, b) => b.relevance - a.relevance);

    return { results: results.slice(0, 5), keywords };
  }

  private extractKeywords(query: string): string[] {
    const keywords: string[] = [];
    const lowerQuery = query.toLowerCase();

    this.db.forEach((doc) => {
      doc.keywords.forEach((keyword) => {
        if (lowerQuery.includes(keyword) && !keywords.includes(keyword)) {
          keywords.push(keyword);
        }
      });
    });

    return keywords;
  }

  private calculateRelevance(
    queryKeywords: string[], 
    docKeywords: string[],
    query: string,
    content: string
  ): number {
    let score = 0;
    const lowerQuery = query.toLowerCase();
    const lowerContent = content.toLowerCase();
    
    // 关键词匹配
    queryKeywords.forEach((qk) => {
      docKeywords.forEach((dk) => {
        if (qk === dk) score += 20;
        else if (dk.includes(qk) || qk.includes(dk)) score += 10;
      });
    });
    
    // 标题匹配加权
    queryKeywords.forEach((qk) => {
      if (lowerContent.includes(qk)) score += 5;
    });
    
    return Math.min(score, 100);
  }

  getDocument(id: string) {
    return this.db.find((doc) => doc.id === id);
  }
}

const searchEngine = new SmartSearchEngine();

// 💬 AI 响应生成器
function generateAIResponse(query: string, searchResults: SearchResult[]): string {
  if (searchResults.length === 0) {
    return `抱歉，我在知识库中没有找到关于"${query}"的相关信息。

🔍 **建议您**：
• 尝试使用不同的关键词重新提问
• 在知识中心使用全文搜索功能
• 联系相关部门同事获取帮助

📚 **我可以帮您查询**：
• 销售业绩和数据分析
• ��力资源政策（休假、福利等）
• 市场营销活动和策略
• IT设备和技术支持
• 财务报销和费用管理`;
  }

  const topDoc = KNOWLEDGE_DATABASE.find((doc) => doc.id === searchResults[0].id);
  if (!topDoc) return "抱歉，系统出现错误。";

  return topDoc.content;
}

export function AIAssistant({ isOpen, onClose, initialQuestion }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchProcess, setSearchProcess] = useState<SearchProcess | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "search">("chat");

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, searchProcess]);

  // 处理初始问题
  useEffect(() => {
    if (initialQuestion && isOpen && messages.length === 0) {
      setTimeout(() => {
        handleSendMessage(initialQuestion);
      }, 300);
    }
  }, [initialQuestion, isOpen]);

  // 🚀 处理消息发送
  const handleSendMessage = async (customQuery?: string) => {
    const query = customQuery || inputValue.trim();
    if (!query) return;

    // 添加用户消息
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    // 模拟搜索过程
    await simulateSearch(query);
  };

  // 🔄 模拟搜索过程
  const simulateSearch = async (query: string) => {
    const startTime = Date.now();

    // Step 1: 分析问题
    setSearchProcess({
      status: "analyzing",
      currentStep: 1,
      totalSteps: 4,
      keywords: [],
      searchedDocs: 0,
      matchedDocs: 0,
      topResults: [],
      processingTime: 0,
    });
    await sleep(600);

    // Step 2: 检索知识库
    setSearchProcess((prev) => prev ? { ...prev, status: "searching", currentStep: 2 } : null);
    await sleep(500);

    // 执行实际搜索
    const { results, keywords } = searchEngine.search(query);

    // Step 3: 匹配相关性
    setSearchProcess((prev) => prev ? {
      ...prev,
      status: "matching",
      currentStep: 3,
      keywords,
      searchedDocs: KNOWLEDGE_DATABASE.length,
      matchedDocs: results.length,
      topResults: results,
    } : null);
    await sleep(500);

    // Step 4: 生成回答
    setSearchProcess((prev) => prev ? { ...prev, status: "generating", currentStep: 4 } : null);
    await sleep(400);

    const processingTime = Date.now() - startTime;
    const responseContent = generateAIResponse(query, results);

    // 完成
    setSearchProcess((prev) => prev ? { ...prev, status: "completed", processingTime } : null);
    await sleep(300);

    // 添加 AI 回复
    const aiMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
      searchProcess: {
        ...searchProcess!,
        status: "completed",
        processingTime,
        topResults: results,
        keywords,
        searchedDocs: KNOWLEDGE_DATABASE.length,
        matchedDocs: results.length,
      },
      sources: results.slice(0, 3).map((r) => {
        const doc = KNOWLEDGE_DATABASE.find((d) => d.id === r.id)!;
        return {
          title: doc.title,
          category: doc.category,
          url: "#",
          lastUpdated: doc.lastUpdated,
        };
      }),
      relatedQuestions: generateRelatedQuestions(query, results),
      confidence: results.length > 0 ? results[0].relevance : 0,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsProcessing(false);
    setSearchProcess(null);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 生成相关问题
  const generateRelatedQuestions = (query: string, results: SearchResult[]): string[] => {
    if (results.length === 0) return [];

    const questions = [
      "如何查看详细信息？",
      "有相关的操作指南吗？",
      "这个政策什么时候更新的？",
    ];

    const doc = KNOWLEDGE_DATABASE.find((d) => d.id === results[0].id);
    if (doc) {
      if (doc.category === "销售数据") {
        return ["查看本季度销售目标", "上个月的销售数据", "不同区域的销售对比"];
      }
      if (doc.category === "人力资源") {
        return ["如何申请年假", "病假需要什么材料", "其他福利有哪些"];
      }
      if (doc.category === "市场营销") {
        return ["Q4的营销计划", "营销活动预算", "如何策划活动"];
      }
      if (doc.category === "IT支持") {
        return ["如何重置密码", "申请新电脑", "VPN配置方法"];
      }
      if (doc.category === "财务管理") {
        return ["发票开具要求", "报销审批流程", "预算申请流程"];
      }
    }

    return questions;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-6xl h-[90vh] bg-background rounded-2xl shadow-2xl flex flex-col border-2 border-primary/20 overflow-hidden">
        {/* 🎨 Header */}
        <div className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-6">
          {/* 装饰背景 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                  <Brain className="h-8 w-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-primary animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-3xl mb-1">Synapse AI 助手</h1>
                <p className="text-primary-foreground/80 flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Database className="h-4 w-4" />
                    已索引 {KNOWLEDGE_DATABASE.length} 个文档
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4" />
                    实时智能检索
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bot className="h-4 w-4" />
                    GPT-4 驱动
                  </span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* 📑 Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
          <div className="border-b bg-muted/30 px-6">
            <TabsList className="bg-transparent">
              <TabsTrigger value="chat" className="gap-2">
                <Sparkles className="h-4 w-4" />
                智能对话
              </TabsTrigger>
              <TabsTrigger value="search" className="gap-2">
                <Search className="h-4 w-4" />
                知识搜索
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 💬 对话模式 */}
          <TabsContent value="chat" className="flex-1 flex flex-col m-0">
            <ScrollArea className="flex-1 p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.length === 0 ? (
                  <WelcomeScreen onQuestionClick={handleSendMessage} />
                ) : (
                  <>
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        onQuestionClick={handleSendMessage}
                        onCopy={copyToClipboard}
                      />
                    ))}
                  </>
                )}

                {/* 🔄 处理中动画 */}
                {isProcessing && searchProcess && (
                  <ProcessingAnimation searchProcess={searchProcess} />
                )}

                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* ⌨️ 输入框 */}
            <div className="border-t bg-muted/30 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="输入您的问题，AI 会智能搜索知识库并回答..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isProcessing) {
                          handleSendMessage();
                        }
                      }}
                      disabled={isProcessing}
                      className="pr-12 h-12 text-base"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Badge variant="secondary" className="text-xs">
                        {inputValue.length}/500
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={isProcessing || !inputValue.trim()}
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-primary to-primary/90"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    发送
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  按 Enter 发送 • AI 基于 {KNOWLEDGE_DATABASE.length} 个企业文档智能回答
                </p>
              </div>
            </div>
          </TabsContent>

          {/* 🔍 搜索模式 */}
          <TabsContent value="search" className="flex-1 m-0">
            <div className="p-6">
              <div className="max-w-4xl mx-auto text-center py-12">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl mb-2">知识库搜索</h3>
                <p className="text-muted-foreground">此功能即将推出...</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// 🎉 欢迎界面
function WelcomeScreen({ onQuestionClick }: { onQuestionClick: (q: string) => void }) {
  const suggestions = [
    { icon: TrendingUp, text: "本月销售业绩如何？", color: "text-blue-500" },
    { icon: BookOpen, text: "如何申请年假？", color: "text-green-500" },
    { icon: Zap, text: "IT设备报修流程", color: "text-orange-500" },
    { icon: FileText, text: "查看营销活动复盘", color: "text-purple-500" },
    { icon: Target, text: "费用报销标准", color: "text-pink-500" },
  ];

  return (
    <div className="text-center py-12 space-y-8">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30">
          <Brain className="h-20 w-20 text-primary" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl mb-3">您好！我是 Synapse AI 助手</h2>
        <p className="text-muted-foreground mb-2">
          我可以帮您快速查找企业知识库中的信息
        </p>
        <p className="text-sm text-muted-foreground">
          涵盖销售、人事、IT、财务、市场等全方位企业知识
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">💡 试试这些常见问题</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {suggestions.map((item, index) => (
            <button
              key={index}
              onClick={() => onQuestionClick(item.text)}
              className="group p-4 rounded-xl bg-card hover:bg-muted border border-border hover:border-primary/50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted group-hover:bg-background">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <span className="flex-1 group-hover:text-primary transition-colors">
                  {item.text}
                </span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-6">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          <span>智能理解</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span>快速响应</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>精准匹配</span>
        </div>
      </div>
    </div>
  );
}

// 💬 消息气泡
function MessageBubble({
  message,
  onQuestionClick,
  onCopy,
}: {
  message: Message;
  onQuestionClick: (q: string) => void;
  onCopy: (text: string) => void;
}) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  };

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 shadow-lg">
          <p className="whitespace-pre-wrap">{message.content}</p>
          <p className="text-xs opacity-70 mt-2 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <Brain className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="flex-1 space-y-4">
        {/* 搜索过程总结 */}
        {message.searchProcess && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-background border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                <span className="text-sm">AI 检索过程</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {message.searchProcess.processingTime}ms
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center p-3 rounded-lg bg-background/80">
                <div className="text-xl text-blue-500">{message.searchProcess.searchedDocs}</div>
                <div className="text-xs text-muted-foreground mt-1">扫描文档</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/80">
                <div className="text-xl text-green-500">{message.searchProcess.matchedDocs}</div>
                <div className="text-xs text-muted-foreground mt-1">匹配文档</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/80">
                <div className="text-xl text-primary">
                  {message.confidence ? message.confidence.toFixed(0) : 0}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">相关度</div>
              </div>
            </div>

            {message.searchProcess.keywords.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  关键词:
                </span>
                {message.searchProcess.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI 回复内容 */}
        <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-5 shadow-lg">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>

          {/* 参考来源 */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-5 pt-5 border-t space-y-2">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                参考来源：
              </p>
              {message.sources.map((source, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm">{source.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {source.category} • 更新于 {source.lastUpdated}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    查看
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* 相关问题 */}
          {message.relatedQuestions && message.relatedQuestions.length > 0 && (
            <div className="mt-5 pt-5 border-t space-y-2">
              <p className="text-xs text-muted-foreground">💡 您可能还想了解：</p>
              <div className="flex flex-wrap gap-2">
                {message.relatedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onQuestionClick(q)}
                    className="text-xs px-3 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex items-center gap-2 mt-5 pt-5 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={() => onCopy(message.content)}
            >
              <Copy className="h-3 w-3 mr-1" />
              复制
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <ThumbsUp className="h-3 w-3 mr-1" />
              有帮助
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Bookmark className="h-3 w-3 mr-1" />
              收藏
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Share2 className="h-3 w-3 mr-1" />
              分享
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ⚡ 处理中动画
function ProcessingAnimation({ searchProcess }: { searchProcess: SearchProcess }) {
  const steps = [
    { id: 1, title: "分析问题", icon: Brain, color: "text-purple-500" },
    { id: 2, title: "检索知识库", icon: Database, color: "text-blue-500" },
    { id: 3, title: "匹配相关性", icon: Target, color: "text-green-500" },
    { id: 4, title: "生成回答", icon: Sparkles, color: "text-yellow-500" },
  ];

  const currentStepData = steps[searchProcess.currentStep - 1];
  const StepIcon = currentStepData.icon;

  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <Brain className="h-6 w-6 text-primary animate-pulse" />
        </div>
      </div>
      <div className="flex-1 bg-card border border-border rounded-2xl rounded-tl-sm p-5 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <span className="text-sm">AI 正在处理您的问题...</span>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index + 1 === searchProcess.currentStep;
            const isCompleted = index + 1 < searchProcess.currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary/10 border border-primary/30"
                    : isCompleted
                    ? "bg-green-50 border border-green-200"
                    : "bg-muted/30 border border-border/30"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive || isCompleted ? "bg-white" : "bg-background"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Icon
                      className={`h-4 w-4 ${step.color} ${
                        isActive ? "animate-pulse" : ""
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm">{step.title}</span>
                  {isActive && (
                    <Progress value={66} className="h-1 mt-2" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {searchProcess.keywords.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">识别关键词:</span>
              {searchProcess.keywords.map((keyword, idx) => (
                <Badge key={idx} variant="outline" className="text-xs animate-in fade-in">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}