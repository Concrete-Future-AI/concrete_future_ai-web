import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import { ArrowRight, CheckCircle2, Zap, Target, TrendingUp, Users, Shield, Clock, Database, Building, DollarSign, ShoppingCart, Link2 } from 'lucide-react';

const AIImplementationPage: React.FC = () => {
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';

    // IntersectionObserver for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach((el) => observer.observe(el));

    // Hero parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const layers = heroRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.015;
        (layer as HTMLElement).style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
      });
    };

    if (heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleMouseMove);
    }

    // Magnetic button effect
    const handleButtonMouseMove = (e: MouseEvent) => {
      if (!ctaButtonRef.current) return;
      const rect = ctaButtonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 150;

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = x * strength * 0.3;
        const moveY = y * strength * 0.3;
        ctaButtonRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      } else {
        ctaButtonRef.current.style.transform = 'translate(0, 0) scale(1)';
      }
    };

    const handleButtonMouseLeave = () => {
      if (ctaButtonRef.current) {
        ctaButtonRef.current.style.transform = 'translate(0, 0) scale(1)';
      }
    };

    document.addEventListener('mousemove', handleButtonMouseMove);
    if (ctaButtonRef.current) {
      ctaButtonRef.current.addEventListener('mouseleave', handleButtonMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleButtonMouseMove);
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      if (ctaButtonRef.current) {
        ctaButtonRef.current.removeEventListener('mouseleave', handleButtonMouseLeave);
      }
    };
  }, []);

  const toggleEngine = (engineId: string) => {
    const newState = expandedEngine === engineId ? null : engineId;
    setExpandedEngine(newState);
  };

  // 7 AI Engines with B2B-focused copy
  const engines = [
    {
      id: 'digital-human',
      number: '01',
      title: 'AI数字人直播',
      headline: '7×24小时无人直播，营收增长的永动机',
      description: '克隆真人形象和声音，7×24小时直播带货。无需真人值守，AI自动互动、改写话术、回答问题。全球多平台同步开播，人力成本降为0，直播时长提升10倍。',
      bgColor: 'bg-amber-50/30',
      conceptArt: '/img/digi_man.jpg',
      keyMetrics: ['72小时交付', '人力成本→0', '10+平台同播'],
      features: [
        '超写实数字人克隆：5分钟视频素材，1:1还原真人形象和声音',
        '智能话术实时改写：AI自动优化话术，每次直播都是新内容',
        '全球多平台矩阵：抖音、TikTok、YouTube等10+平台同时开播'
      ],
      details: [
        { title: '秒播级数字人克隆', desc: '拍摄5分钟素材(5个产品手持动作)，72小时交付专属数字人。面部微表情、头发丝级细节，观众无法分辨真假。' },
        { title: '声音高保真克隆', desc: '录制10分钟音频(约2000字)，还原音色、语气、停顿习惯。支持7种情绪模式切换(热情推销/专业讲解/亲切唠嗑)。' },
        { title: '话术智能改写引擎', desc: '预设500条基础话术，AI每轮自动改写30%内容。连播8小时不重复，避免平台"录播"检测限流。' },
        { title: 'GPT-4驱动智能问答', desc: '接入200+产品知识库，理解方言、网络用语。响应延迟<2秒，90%问题无需人工介入，高峰期顶20个客服。' },
        { title: '关键词精准截流', desc: '自定义500+触发词("怎么买"、"多少钱"、"发什么快递")，瞬间弹出优惠/链接，转化率提升40%。' },
        { title: '氛围自动烘托系统', desc: '检测进入/点赞/关注动作，3秒内口播感谢+弹幕特效。模拟"老铁来了"、"感谢榜一大哥"等真人直播话术。' },
        { title: '产品智能弹窗', desc: '根据话术节奏自动弹出商品图/视频(如讲到"这款面霜"立刻展示使用效果)。支持一键跳转购物车。' },
        { title: '全球10+平台矩阵', desc: '国内：快手、视频号(抖音有限制)。出海：TikTok、YouTube Live、Facebook Live、Amazon Live、Shopee Live等。一键多开。' },
        { title: '直播自动切片成短视频', desc: '每场直播AI提取20-50个高光片段(产品演示/互动爆点)，自动加字幕、BGM，生成抖音/小红书投流素材。' },
        { title: '矩阵化运营管理', desc: '1人操作50个数字人账号。批量设置直播时间表、话术库、产品库。异常监控(掉线/违规警告)自动重启。' },
        { title: '数据驱动优化', desc: '实时看板：各账号在线人数、停留时长、点击率、GMV。AI推荐最佳开播时段、话术A/B测试结果。' },
        { title: '成本与回本周期', desc: '试点版(6路直播)：首年22.6万，第3周见效，62天回本。规模版(60路)：首年157万，次年仅15万维护费，ROI>500%。' }
      ]
    },
    {
      id: 'selection',
      number: '02',
      title: 'AI智能选品',
      headline: '爆款命中率从30%提升至70%',
      description: '全网爆款监控+趋势预判+利润测算。AI分析3年数据，预测未来3个月爆款品类。选品周期从2周→3天，命中率从30%→70%。',
      bgColor: 'bg-blue-50/30',
      conceptArt: '/img/AI_choose.jpg',
      keyMetrics: ['命中率70%', '周期缩短80%', '库存周转快一倍'],
      features: [
        '全网爆款实时监控：抖音/小红书/淘宝热榜实时追踪，抢占窗口期',
        '趋势预判AI模型：预测未来3个月爆款，准确率70%',
        '快速测款系统：小批量投放测试，72小时跑出ROI数据'
      ],
      details: [
        { title: '全网爆款实时监控', desc: '实时抓取抖音/小红书/淘宝热榜、谷歌趋势、亚马逊BSR。检测到"冲锋衣"搜索量暴涨200%→立即预警，抢占窗口期。' },
        { title: '趋势预判AI模型', desc: '分析3年历史数据+季节性规律，预测未来3个月爆款品类。准确率70%，某客户提前2个月备货"围炉煮茶"周边，销量翻5倍。' },
        { title: '利润空间智能测算', desc: '输入1688采购价，AI计算各平台售价、广告成本、物流费。推荐最优定价策略，预估毛利率和ROI。' },
        { title: '竞品爆款深度拆解', desc: '输入竞品链接，AI分析销量曲线、评价关键词、价格策略、广告投放手法。生成"爆款复刻手册"，找到突破点。' },
        { title: '供应链智能匹配', desc: '输入产品需求(如"纯棉T恤，月产能5万件")，AI筛选1688/阿里国际站供应商。自动比价、核验资质、生成报价对比表。' },
        { title: '出海市场机会雷达', desc: '分析目标国消费数据(如"日本Z世代偏好莫兰迪色")、准入门槛(CE认证/FDA)、物流成本。推荐最适合出海的品类。' },
        { title: '选品评分系统', desc: '综合评估：市场热度(30%)+竞争强度(25%)+利润空间(25%)+供应链稳定性(20%)。满分100，>75分推荐进货。' },
        { title: '季节性备货预警', desc: 'AI预测"618前30天羽绒服搜索量下跌80%"→建议清仓。"双11前60天保温杯需求激增"→提前备货2万件。' },
        { title: '快速测款系统', desc: '小批量进货(100件)，AI生成10组广告素材投放测试。72小时跑出ROI数据，决定是否规模化进货。降低试错成本80%。' },
        { title: '选品数据可视化看板', desc: '实时显示：在售SKU热度、库存周转率、滞销预警、爆款潜力值。一目了然，辅助决策。' },
        { title: '差异化卖点挖掘', desc: 'AI分析竞品评价，提取用户痛点(如"杯盖容易漏")。推荐产品改进方向或差异化营销角度("我们的防漏技术通过SGS认证")。' },
        { title: '成功案例数据', desc: '某家居品牌用AI选品后：选品周期从2周→3天，爆款命中率从30%→70%，库存积压从50万→8万。ROI回收期4个月。' }
      ]
    },
    {
      id: 'content-creation',
      number: '03',
      title: '营销内容生成',
      headline: '一支队伍的产能，只需一个人的成本',
      description: '一键生成全套营销素材：商品图+短视频+文案。输入产品信息，30分钟完成主图、详情页、短视频脚本、小红书笔记。产能提升50倍，成本降75%。',
      bgColor: 'bg-green-50/30',
      conceptArt: '/img/content_gen.png',
      keyMetrics: ['产能提升50倍', '成本降75%', '日产500条'],
      features: [
        '一键生成全套素材：商品图+详情页+短视频+文案，30分钟全搞定',
        '商品图场景批量生成：1张白底图→50种场景，成本降90%',
        '3小时直播→100条短视频：AI自动切片+字幕+BGM，日产500条'
      ],
      details: [
        { title: '一键生成全套营销素材', desc: '输入产品信息，AI生成：商品主图(5张不同场景)+详情页(含卖点文案)+短视频脚本+小红书笔记+朋友圈文案。30分钟完成。' },
        { title: '商品图场景批量生成', desc: '1张白底图→50种场景(沙滩/咖啡厅/卧室)。保留光影一致性，适配不同平台。处理速度：100张/10分钟，成本降90%。' },
        { title: 'AI模特试穿(0成本)', desc: '上传平铺服装，生成穿在模特身上效果。可选身高/肤色/体型，匹配全球市场审美。某服装品牌月省摄影费8万。' },
        { title: '3小时直播→100条短视频', desc: 'AI识别产品演示、价格播报、互动爆点。自动切片+字幕+BGM，生成抖音/小红书投流素材。日产500条。' },
        { title: '爆款视频像素级复刻', desc: '输入竞品爆款链接，AI解构镜头节奏(前3秒钩子/5秒痛点/10秒方案)、BGM卡点、文案公式。一键套用你的产品。' },
        { title: '全平台文案智能生成', desc: 'AI生成：小红书种草笔记、抖音短视频脚本、淘宝详情页、朋友圈推广文案、电商评价话术。学习头部账号风格，A/B测试找最高转化版本。' },
        { title: '多SKU批量内容生成', desc: '1个视频模板，AI自动替换50个SKU(颜色/包装)。日产500条投流素材，快速测出爆款。某美妆品牌月产量从50→2000条。' },
        { title: '小红书爆款笔记生成器', desc: '分析10万+爆款笔记，提取封面公式(大字标题/产品角度/色调)+正文钩子+评论区截流话术。CTR提升3倍。' },
        { title: '一键多语言本地化', desc: '中文素材→自动翻译英/日/韩/西班牙语+AI配音(克隆原声)+替换场景元素(人民币→美元)。适配全球市场。' },
        { title: '产品卖点智能提炼', desc: 'AI分析产品参数+竞品评价，提炼3-5个核心卖点。自动生成"痛点-方案-证据"文案结构，转化率提升40%。' },
        { title: '品牌IP形象生成', desc: '输入品牌理念，AI生成卡通IP形象+表情包+应用场景(包装/周边/海报)。建立品牌记忆点，用户认知度提升50%。' },
        { title: '内容产能对比', desc: '传统团队：3人日产10条内容，月成本5万。AI系统：日产500条，月成本1.2万。产能提升50倍，成本降75%。' }
      ]
    },
    {
      id: 'ad-optimization',
      number: '04',
      title: 'AI广告投放优化',
      headline: '每一分广告费，都花在刀刃上',
      description: 'AI自动测试50组素材，实时优化出价，预判ROI。每月100万广告费的客户，ROI从1:3提升到1:5。相当于每月多赚67万，6个月回本。',
      bgColor: 'bg-purple-50/30',
      conceptArt: '/img/ad_v2.png',
      keyMetrics: ['ROI提升67%', '日均优化2000次', '6个月回本'],
      features: [
        '素材A/B测试自动化：1条素材生成50组变体，72小时跑出最佳组合',
        '智能出价实时优化：AI每5分钟调整策略，日均优化2000次',
        '跨平台数据归因：打通全渠道，算清每个平台真实ROI'
      ],
      details: [
        { title: '素材A/B测试自动化', desc: '1条原始素材，AI生成50组变体(不同开头/文案/CTA按钮)。自动投放到千川/广点通，72小时跑出ROI最高组合。' },
        { title: '智能出价实时优化', desc: 'AI每5分钟调整出价策略。检测到"这组素材CTR>5%"→提高出价抢量；"转化成本>目标"→降低出价或暂停。日均优化2000次。' },
        { title: 'ROI预测模型', desc: '投放前预判素材ROI。分析画面节奏/文案钩子/BGM，对比10万+历史数据。预测"该素材ROI 1:4.2，建议投放预算5万"。准确率85%。' },
        { title: '跨平台数据归因', desc: '打通抖音/快手/小红书/淘宝数据。追踪"用户在抖音看广告→小红书搜索→淘宝下单"全路径。算清每个渠道真实ROI，避免重复归因。' },
        { title: '竞品广告情报监控', desc: '追踪竞品在千川/Meta Ads投放素材(创意/文案/落地页)。识别爆款广告(投放>30天=跑量大)，一键复刻到你的产品。' },
        { title: '自动化投放策略', desc: '设置规则"ROI<1:3自动暂停"、"爆量素材自动提预算"。AI接管日常操作，优化师只需审核异常，人效提升10倍。' },
        { title: '落地页智能优化', desc: '生成10种落地页变体(不同标题/按钮颜色/图片顺序)。自动分流测试，找出转化率最高版本。某客户转化率从2.3%→5.8%。' },
        { title: '创意疲劳自动预警', desc: '监控素材数据(CTR/转化率持续下跌=创意疲劳)。提前3天预警"该素材即将失效"，自动启用备用素材，避免ROI断崖。' },
        { title: '全球广告平台对接', desc: '支持：国内(巨量千川/腾讯广告/磁力金牛)，海外(Meta Ads/Google Ads/TikTok Ads)。统一后台管理，一键复制策略。' },
        { title: '实时ROI看板', desc: '按素材/时段/地域/人群实时显示ROI。AI建议"23-24点ROI最高，建议加大预算"、"男性用户转化成本高20%，建议排除"。' },
        { title: '智能投放策略推荐', desc: 'AI学习账户历史数据，推荐最优策略(如"该产品适合放量投放+自动出价")。新账户冷启动期从7天缩短到3天。' },
        { title: '成本对比数据', desc: '人工投放：ROI 1:3，优化师月薪2万。AI投放：ROI 1:5，每月100万广告费多赚67万。某品牌用后广告ROI提升67%，6个月回本。' }
      ]
    },
    {
      id: 'matrix-operation',
      number: '05',
      title: 'AI矩阵运营',
      headline: '构建永不贬值的数字品牌资产',
      description: '50-500个账号矩阵7×24自动运营，建立数字品牌资产池。AI智能体模拟真人，全域内容分发，评论截流，私域引导。品牌资产回报率ROBA>5:1。',
      bgColor: 'bg-teal-50/30',
      conceptArt: '/img/account.png',
      keyMetrics: ['500账号矩阵', '日加粉500+', 'ROBA>5:1'],
      features: [
        '账号矩阵自动养号：50-500个高权重账号，建立数字品牌资产池',
        'KOC人设智能构建：5-10个人设角色，一致的言行风格建立信任',
        '全域内容智能分发：AI精准分发到各平台，最大化传播效果'
      ],
      details: [
        { title: '50-500账号矩阵自动养号', desc: '部署50-500个高权重账号矩阵(抖音/小红书/视频号)。AI模拟真人行为(浏览时长/点赞/评论)，建立"数字品牌资产池"。' },
        { title: 'KOC人设智能构建', desc: '定义5-10个人设角色(宝妈/健身达人/职场白领)。AI为每个人设生成一致的言行风格、内容日历、互动话术，建立长期信任。' },
        { title: '全域内容智能分发', desc: 'AI将内容精准分发到各平台(抖音/小红书/B站/知乎)。根据平台特性微调标题/封面/标签，最大化传播效果。' },
        { title: '社媒评论精准截流', desc: '监控竞品/大V评论区，识别意向客户(如"求链接")。AI自动点赞+神评抢位+私信引导，日加粉500+，获客成本<5元。' },
        { title: '高热内容机会雷达', desc: '实时监控与品牌相关的高热度内容(10W+播放/5000+点赞)。AI自动生成与内容相关的"神评"，在黄金位置获取海量曝光。' },
        { title: 'AI智能体集群管理', desc: '每个账号背后是独立AI智能体，拥有"人设"和"性格"。7×24自动浏览/点赞/评论/发布，像真人一样运营账号。' },
        { title: '柔性私域引导系统', desc: '在互动中，以合规、友好方式将高意向用户引导至品牌主阵地(企微/公众号)。话术自然，避免硬广，转化率提升3倍。' },
        { title: '品牌声量实时监控', desc: '追踪全网品牌提及量、情感倾向、关键词热度。AI生成"品牌健康度报告"，预警负面舆情，指导公关策略。' },
        { title: '多平台协同作战', desc: '小红书种草→抖音短视频引流→企微私域转化。AI打通全链路，实现"公域引流+私域转化"双飞轮增长。' },
        { title: '账号资产风险隔离', desc: '企业级隔离设备矩阵，每个账号独立运行环境。单一账号问题不连带，建立"资产防火墙"，保护品牌安全。' },
        { title: '品牌资产价值评估', desc: '账号矩阵总粉丝量、月均互动量、内容传播力、私域转化率→综合评估"品牌资产价值"。资产持续增值，不再是"消耗流量"。' },
        { title: 'ROBA模型对比', desc: '传统广告：花100万买流量，次月归零。AI矩阵：投100万建资产，持续产生自然流量，3年价值>500万。品牌资产回报率ROBA>5:1。' }
      ]
    },
    {
      id: 'after-sales',
      number: '06',
      title: 'AI售后提效',
      headline: '口碑和复购率，从售后开始',
      description: '客户反馈自动分析，舆情实时监控，工单智能处理。AI客服7×24小时在线，秒级响应，多轮对话解决90%常见问题。客服成本降60%，满意度提升35%。',
      bgColor: 'bg-cyan-50/30',
      conceptArt: '/img/chat_v2.png',
      keyMetrics: ['响应<10秒', '成本降60%', '满意度升35%'],
      features: [
        '全渠道舆情监控：实时监控全网评价，负面舆情5分钟内预警',
        '智能工单系统：自动分类、分配、跟进，处理效率提升3倍',
        '客户情感分析：AI识别客户情绪，高危客户优先人工介入'
      ],
      details: [
        { title: 'AI客服秒级自动回复', desc: '客户咨询瞬间响应，理解多轮对话("这款有黑色吗"→"黑色M码还有30件库存")。解决90%常见问题，仅10%转人工，顶20个客服。' },
        { title: '全网舆情5分钟预警', desc: '监控淘宝/京东/抖音评价、小红书/微博提及、黑猫投诉。检测到"售后态度差"等负面，5分钟推送钉钉/企微预警。' },
        { title: '客户情绪实时识别', desc: 'AI判断客户情绪等级(满意/中性/不满/愤怒)。识别到"投诉"、"退款"等高危词，自动转人工+标注优先级，避免升级纠纷。' },
        { title: '工单智能分流系统', desc: '自动识别问题类型(物流/质量/退换货)，分配给对应部门。紧急工单置顶，超时未处理自动提醒主管，处理效率提升3倍。' },
        { title: '售后话术智能推荐', desc: '根据问题类型+客户情绪，推荐最佳回复(如愤怒客户→先道歉+补偿方案)。学习优秀客服话术，新人也能达到老员工水平。' },
        { title: '一键生成个性化回复', desc: 'AI读取订单历史、聊天记录，生成定制化回复("王女士您好，您购买的连衣裙已从杭州仓发出...")。支持人工微调后发送。' },
        { title: '全渠道统一工作台', desc: '聚合微信/电话/邮件/App/淘宝旺旺消息。客服在一个界面处理所有咨询，切换无需登录多个后台，响应速度提升50%。' },
        { title: '客户反馈AI挖掘', desc: '分析10万+评价，提取高频问题("拉链容易坏"出现2300次)→生成产品改进报告。按问题严重度排序，指导下季度优化重点。' },
        { title: '售后数据可视化看板', desc: '实时显示：咨询量、平均响应时间、解决率、满意度、各类问题占比。AI预测"618大促咨询量将激增300%，建议增派5名临时客服"。' },
        { title: '主动服务自动触达', desc: '订单签收3天后自动发微信"使用满意吗？晒图返10元"。检测物流异常自动道歉+补偿，降低因物流导致的差评率40%。' },
        { title: '知识库自学习进化', desc: '从每天1000+对话中学习新问题、新答案。客服标注"答案准确"→纳入知识库。AI覆盖率从60%→90%仅需3个月。' },
        { title: '效率提升数据', desc: '人工客服：响应时间2分钟，日处理80单。AI客服：响应<10秒，日处理2000单。某品牌用后客服成本降60%，满意度反升35%。' }
      ]
    },
    {
      id: 'operation',
      number: '07',
      title: '数据驱动决策',
      headline: '让数据告诉你答案，不再凭感觉赌',
      description: '进什么货、定什么价、推哪款，算法算给你看。不再拍脑袋，不用赌运气。AI预测库存、优化定价、推荐爆款。试错成本降80%，毛利率提升15%。',
      bgColor: 'bg-indigo-50/30',
      conceptArt: '/img/ai_data.png',
      keyMetrics: ['预测准确率90%', '毛利提升15%', '试错成本降80%'],
      features: [
        '库存预测调度：准确率90%，减少50%滞销和缺货损失',
        '动态定价系统：实时调价，毛利率提升15-20%',
        '选品趋势分析：提前3个月预判爆款，命中率70%+'
      ],
      details: [
        { title: '库存智能预测(准确率90%)', desc: '分析历史销量、季节性、促销活动、天气，预测未来30天各SKU销量。自动生成补货建议，减少50%缺货和滞销损失。' },
        { title: '动态定价(毛利提升15%)', desc: '实时监控竞品价格、库存水平、用户支付意愿。自动调价(如库存积压→降价促销/爆款缺货→涨价)。日均调价500次。' },
        { title: 'AI选品(爆款命中率70%)', desc: '分析抖音/小红书热搜、亚马逊BSR、1688上新数据。推荐潜力爆品(如"检测到腰包搜索量暴涨300%，建议进货")。' },
        { title: '客户分层自动化运营', desc: '根据RFM模型(最近购买/频次/金额)分7类客户。沉睡客户→推送大额券，VIP客户→新品优先购，自动化执行，复购率提升40%。' },
        { title: '供应链智能协同', desc: '打通供应商/仓库/物流系统。AI推荐"A商品走义乌仓发顺丰，比杭州仓发EMS省1.2元/单"。预警"春节前10天锁仓，提前备货"。' },
        { title: '出海合规自动检测', desc: '输入商品链接，检测欧盟CE认证/美国FDA/各国关税。标注风险项(如"该款充电宝锂电池容量超美国航空禁令")。' },
        { title: '知识产权侵权预警', desc: '上传产品图，AI比对全球专利库/商标库。检测侵权风险(如"该外观与苹果2019年专利相似度87%，建议规避")。' },
        { title: '目标市场本地化洞察', desc: '分析目标国社媒热点(如"日本Z世代偏好莫兰迪色系")、文化禁忌(如"中东不能用左手图案")、定价策略(购买力/支付习惯)。' },
        { title: '成本对比数据', desc: '人工选品/定价/库存管理：50万积压损失/年。AI系统：试错成本降80%，毛利率提升15%，ROI回收期6个月。' }
      ]
    }
  ];

  // Success cases
  const showcaseCases = [
    {
      id: 1,
      company: '某服装品牌',
      industry: '服装电商',
      challenge: '设计师产能不足，上新速度慢',
      solution: 'AI商品图批量生产',
      before: '8万/月',
      after: '1.2万/月',
      metric: '成本',
      improvement: '节省85%',
      timeline: '2周上线',
      result: '设计师从重复劳动中解放，专注创意策划'
    },
    {
      id: 2,
      company: '某美妆品牌',
      industry: '美妆护肤',
      challenge: '视频内容产量低，测款周期长',
      solution: 'AI直播切片+批量剪辑',
      before: '50条/月',
      after: '2000条/月',
      metric: '视频产量',
      improvement: '提升40倍',
      timeline: '3周部署',
      result: '爆款视频找到率提升3倍，单月ROI 280%'
    },
    {
      id: 3,
      company: '某出海品牌',
      industry: '跨境电商',
      challenge: '获客成本高，人工运营累',
      solution: 'AI社媒矩阵+自动获客',
      before: '120元',
      after: '48元',
      metric: '单客成本',
      improvement: '降低60%',
      timeline: '62天回本',
      result: '10个平台24小时自动运营，每月净省18万'
    }
  ];

  // Why Us features
  const whyUsFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: '技术深度',
      description: '核心团队来自阿里、字节、腾讯，深耕AI应用5年+。不是调API，而是深度定制。'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: '业务优先',
      description: '不谈技术参数，只关注ROI。每个方案都经过业务验证，确保可落地、可复制。'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: '快速部署',
      description: '2周上线MVP，60天见效ROI。无需改造现有系统，无缝集成到业务流程。'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '陪跑式服务',
      description: '不是交付完就走。我们提供3个月陪跑期，优化调参，直到达成增长目标。'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: '数据安全',
      description: '企业级数据隔离，本地化部署可选。通过ISO27001认证，客户数据绝不外泄。'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '效果对赌',
      description: '愿意与您签订对赌协议：达不到承诺效果，退还50%费用。我们对结果负责。'
    }
  ];

  // Process steps
  const processSteps = [
    { num: '01', title: '免费诊断', desc: '深度分析业务痛点，输出ROI评估报告' },
    { num: '02', title: '方案设计', desc: '定制化AI方案，明确交付目标和时间表' },
    { num: '03', title: '快速部署', desc: '2周上线MVP，无需改造现有系统' },
    { num: '04', title: '效果验证', desc: '60天内见效ROI，数据可追踪' },
    { num: '05', title: '持续优化', desc: '3个月陪跑期，优化调参直到达标' }
  ];

  return (
    <div className="min-h-screen">
      <style>{`
        /* Syne/Bitter Typography */
        body {
          font-family: 'Bitter', Georgia, serif;
          font-weight: 400;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Syne', -apple-system, sans-serif;
          font-weight: 800;
          letter-spacing: -0.04em;
        }
        
        .font-syne {
          font-family: 'Syne', 'Noto Sans SC', sans-serif;
          font-weight: 800;
          letter-spacing: -0.04em;
        }
        
        .font-bitter {
          font-family: 'Bitter', Georgia, serif;
          font-weight: 400;
        }
        
        .font-bitter-light {
          font-family: 'Bitter', Georgia, serif;
          font-weight: 300;
        }
        
        .font-inconsolata {
          font-family: 'Inconsolata', 'Courier New', monospace;
          font-weight: 600;
        }

        /* Animations */
        [data-animate] {
          opacity: 0;
          transform: translate3d(0, 60px, 0);
          transition: opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        [data-animate].animate-in {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* Glassmorphism */
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Magnetic button */
        .magnetic-button {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Parallax layers */
        .parallax-layer {
          position: absolute;
          inset: 0;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }

        /* Hover glow effect */
        .hover-glow {
          transition: box-shadow 0.3s ease;
        }
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(217, 119, 87, 0.3);
        }

        /* Concept art placeholder */
        .concept-art-placeholder {
          background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 14px;
          font-weight: 600;
        }

        /* Header Styles (from AITransformationPage) */
        .transformation-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.6s ease;
        }

        .transformation-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 64px;
          height: 72px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 48px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-shrink: 0;
        }

        .header-logo {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .header-logo:hover .logo-text {
          color: #D97757;
        }

        .header-logo:hover .brand-accent {
          transform: scale(1.25);
        }

        .logo-text-wrapper {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .logo-text {
          font-size: 20px;
          color: #0A0A0A;
          line-height: 1;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
          font-family: 'Noto Sans SC', sans-serif;
          font-weight: 900;
        }

        .brand-accent {
          width: 6px;
          height: 6px;
          border-radius: 2px;
          background-color: #D97757;
          transition: transform 0.3s ease;
        }

        .logo-subtitle {
          font-size: 8px;
          color: #9CA3AF;
          letter-spacing: 0.15em;
          margin-top: 3px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
        }

        .header-divider-vertical {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%);
        }

        .back-home-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: transparent;
          color: #525252;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 14px;
          white-space: nowrap;
          font-family: 'IBM Plex Sans', 'Noto Sans SC', sans-serif;
          font-weight: 500;
        }

        .back-home-button:hover {
          background: rgba(217, 119, 87, 0.08);
          color: #D97757;
        }

        .back-icon {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .back-home-button:hover .back-icon {
          transform: translateX(-3px);
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          padding: 8px 20px;
          color: #525252;
          text-decoration: none;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
          font-family: 'IBM Plex Sans', 'Noto Sans SC', sans-serif;
          font-weight: 500;
        }

        .nav-link:hover {
          background: rgba(217, 119, 87, 0.08);
          color: #D97757;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #D97757;
          border-radius: 1px;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 40%;
        }

        .header-right {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .header-cta-primary {
          padding: 12px 28px;
          background: linear-gradient(135deg, #D97757 0%, #C96543 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(217, 119, 87, 0.3);
          transition: all 0.3s ease;
          white-space: nowrap;
          font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
          font-weight: 700;
        }

        .header-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(217, 119, 87, 0.4);
        }

        @media (max-width: 1024px) {
          .header-container {
            padding: 0 32px;
            gap: 24px;
          }
          .header-nav {
            gap: 4px;
          }
          .nav-link {
            padding: 8px 12px;
            font-size: 13px;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 16px;
            height: 64px;
          }
          .header-nav {
            display: none;
          }
          .logo-text {
            font-size: 16px;
          }
          .logo-subtitle {
            font-size: 7px;
          }
          .header-cta-primary {
            padding: 10px 20px;
            font-size: 13px;
          }
        }
      `}</style>

      {/* Custom Header (matching AITransformationPage) */}
      <header className={`transformation-header ${isVisible ? 'visible' : ''}`}>
        <div className="header-container">
          {/* 左侧：Logo + 返回按钮 */}
          <div className="header-left">
            <Link to="/" className="header-logo">
              {/* Chinese Brand Name with Accent */}
              <div className="logo-text-wrapper">
                <span className="logo-text">炬象未来</span>
                {/* Brand Spark Accent */}
                <span className="brand-accent"></span>
              </div>
              <div className="logo-subtitle">CONCRETE FUTURE AI</div>
            </Link>
            
            <div className="header-divider-vertical"></div>
            
            <Link to="/" className="back-home-button">
              <span className="back-icon">←</span>
              <span>返回主页</span>
            </Link>
          </div>

          {/* 中间：页面内导航 */}
          <nav className="header-nav">
            <a href="#pain-points" className="nav-link">痛点分析</a>
            <a href="#engines" className="nav-link">服务能力</a>
            <a href="#cases" className="nav-link">成功案例</a>
            <a href="#process" className="nav-link">合作流程</a>
            <a href="#contact" className="nav-link">联系我们</a>
          </nav>

          {/* 右侧：CTA按钮 */}
          <div className="header-right">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="header-cta-primary"
            >
              免费获取ROI报告
            </button>
          </div>
        </div>
      </header>

      {/* ========== SECTION 1: HERO (Matching Reference HTML) ========== */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-16 overflow-hidden bg-slate-900 text-white"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: '#D97757' }}></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        {/* 网格背景 */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#D97757 1px, transparent 1px), linear-gradient(90deg, #D97757 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 左侧：核心价值 */}
            <div>
              <div className="text-xs font-light mb-6 font-inconsolata tracking-widest uppercase" style={{ color: '#FCA582' }}>
                Enterprise AI Transformation
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none font-syne">
                2周部署，60天回本<br/>这是AI该有的ROI
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-10 font-bitter-light">
                不是又一个需要学习的AI工具。而是直接植入您业务流程的自动化系统。让机器干重复的活，人做创造性的事。成本降70%，产能翻10倍，这才是AI的正确打开方式。
              </p>
              <button 
                ref={ctaButtonRef}
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 text-white font-bold text-lg rounded hover:opacity-90 transition-all inline-flex items-center gap-3 shadow-xl hover:shadow-2xl"
                style={{ 
                  fontFamily: 'Syne, sans-serif',
                  background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)'
                }}
              >
                免费获取ROI评估报告
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* 右侧：关键业务指标 */}
            <div 
              className="border-2 p-10 rounded-2xl text-white relative overflow-hidden"
              style={{
                backgroundColor: '#1e293b',
                borderColor: 'rgba(217, 119, 87, 0.3)'
              }}
            >
              {/* 装饰线条 */}
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: 'linear-gradient(to right, transparent 0%, #D97757 50%, transparent 100%)'
                }}
              ></div>
              <div className="text-sm font-bold mb-8 tracking-wide font-inconsolata" style={{ color: '#FCA582' }}>
                💰 REAL DATA · VERIFIED
              </div>
              <div className="space-y-8 relative z-10">
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-6xl font-black font-inconsolata">8万→1.2万</span>
                  </div>
                  <p className="text-base font-light text-gray-300 leading-relaxed font-bitter-light">
                    某服装品牌商品图月成本，<span className="font-semibold" style={{ color: '#FCA582' }}>省下的钱直接多雇3个设计师</span>
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-6xl font-black font-inconsolata">50→2000</span>
                  </div>
                  <p className="text-base font-light text-gray-300 leading-relaxed font-bitter-light">
                    某美妆品牌月短视频产量，<span className="font-semibold" style={{ color: '#FCA582' }}>测款速度快了20倍</span>
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-6xl font-black font-inconsolata">62天</span>
                  </div>
                  <p className="text-base font-light text-gray-300 leading-relaxed font-bitter-light">
                    某出海品牌投资回收周期，<span className="font-semibold" style={{ color: '#FCA582' }}>此后每月净省18万</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PAIN POINTS (Light/Cream Background) ========== */}
      <section id="pain-points" className="py-20" style={{ backgroundColor: '#F9F8F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-6xl font-syne text-slate-900 text-center mb-16 leading-tight"
            data-animate
          >
            这些痛点，正在吞噬你的<span style={{ color: '#D97757' }}>利润</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Pain Points List */}
            <div className="space-y-6">
              {[
                { title: '内容产能卡脖子', desc: '设计师画一张图要半天，上新慢、测款慢，爆款机会稍纵即逝。对手已经AI量产，你还在手工作坊。' },
                { title: '获客成本失控', desc: '去年50块拿一个客户，今年要120。广告费年年涨，转化率年年跌，利润被平台和流量主吃干净。' },
                { title: '决策全凭拍脑袋', desc: '库存积压50万，不知道哪款会爆。定价高了没人买，低了利润薄。每次试错都是真金白银。' },
                { title: '想扩张，招不起人', desc: '业务翻倍要多招10个人，工资、社保、管理成本翻倍。人效上不去，规模做不大。' }
              ].map((pain, index) => (
                <div 
                  key={index} 
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-xl hover:bg-white transition-all group border border-slate-200 hover-glow"
                  data-animate
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex gap-4">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ background: '#D97757' }}
                    ></div>
                    <div>
                      <h4 className="font-bold mb-2 text-lg text-slate-900 font-syne group-hover:text-amber-600 transition-colors">
                        {pain.title}
                      </h4>
                      <p className="text-slate-600 font-bitter-light">
                        {pain.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Solution Box (Dark) */}
            <div 
              className="bg-slate-900 p-8 md:p-12 rounded-2xl text-white border-2 relative overflow-hidden"
              style={{
                borderColor: 'rgba(217, 119, 87, 0.3)',
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.3)'
              }}
              data-animate
            >
              {/* Decorative grid */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'linear-gradient(#D97757 1px, transparent 1px), linear-gradient(90deg, #D97757 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              ></div>
              
              <div className="relative z-10">
                <div 
                  className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
                    fontFamily: 'Syne, sans-serif'
                  }}
                >
                  ⚡ 我们的解法
                </div>
                
                <h3 className="text-3xl font-syne mb-6 leading-tight">
                  机器干重活，人做聪明事
                  <br />
                  这才是AI正确用法
                </h3>
                
                <p className="text-slate-200 text-lg leading-relaxed mb-8 font-bitter-light">
                  我们做的不是卖工具，而是<span style={{ color: '#FCA582', fontWeight: '700' }}>重新设计你的工作流程</span>。把设计师从重复劳动中解放出来，让数据告诉你该进什么货、定什么价，用自动化系统24小时帮你挖客户。
                </p>
                
                <div className="space-y-4">
                  {[
                    '边际成本趋零：做1个和做1000个，成本几乎一样',
                    '数据驱动决策：算法告诉你答案，不再凭感觉赌',
                    '人效翻10倍：3个人的团队，干30个人的活'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-100 font-bitter">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: THE 7 AI ENGINES (Alternating Layout) ========== */}
      <section id="engines" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-6xl font-syne text-slate-900 mb-6 leading-tight"
              data-animate
            >
              七大引擎，按ROI优先级重构业务
            </h2>
            <p 
              className="text-xl text-slate-600 max-w-3xl mx-auto font-bitter-light"
              data-animate
            >
              从最直接创造收入的数字人直播，到最烧钱的广告优化。
              <span className="font-bold text-slate-900">先解决燃眉之急，再建立长期壁垒。</span>
            </p>
          </div>

          {/* Engine Cards - Alternating Layout */}
          <div className="space-y-20">
            {engines.map((engine, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={engine.id}
                  data-animate
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Top Row: Image + Text Side by Side */}
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
                    {/* Image/Concept Art Side */}
                    <div className="w-full md:w-1/2">
                      <div 
                        className={`${engine.bgColor} rounded-2xl p-8 ${(engine.conceptArt.endsWith('.jpg') || engine.conceptArt.endsWith('.png')) ? '' : 'aspect-square flex items-center justify-center'} border-2 hover-glow transition-all`}
                        style={{
                          borderColor: 'rgba(217, 119, 87, 0.2)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        {(engine.conceptArt.includes('digi_man.jpg') || 
                          engine.conceptArt.includes('AI_choose.jpg') || 
                          engine.conceptArt.includes('content_gen.png') ||
                          engine.conceptArt.includes('ad_v2.png') ||
                          engine.conceptArt.includes('chat_v2.png') ||
                          engine.conceptArt.includes('account.png') ||
                          engine.conceptArt.includes('ai_data.png')) ? (
                          // Real image
                          <img 
                            src={engine.conceptArt} 
                            alt={engine.title}
                            className="w-full h-full object-cover rounded-xl"
                            style={{ aspectRatio: '1/1' }}
                          />
                        ) : (
                          // Concept Art Placeholder
                          <div className="concept-art-placeholder w-full h-full rounded-xl">
                            <div className="text-center">
                              <div className="text-6xl mb-4">🎨</div>
                              <div className="text-sm text-slate-500 font-inconsolata">
                                Concept Art Placeholder
                              </div>
                              <div className="text-xs text-slate-400 mt-2">
                                {engine.conceptArt}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text Content Side */}
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center gap-4 mb-4">
                        <span 
                          className="text-sm font-bold bg-slate-900 text-white px-4 py-2 rounded-full font-inconsolata"
                        >
                          {engine.number}
                        </span>
                        <h3 className="text-2xl font-syne text-slate-900">
                          {engine.title}
                        </h3>
                      </div>

                      <h4 
                        className="text-3xl md:text-4xl font-syne text-slate-900 mb-4 leading-tight"
                        style={{ color: '#D97757' }}
                      >
                        {engine.headline}
                      </h4>

                      <p className="text-lg text-slate-600 leading-relaxed mb-6 font-bitter-light">
                        {engine.description}
                      </p>

                      {/* Key Metrics */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {engine.keyMetrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-inconsolata text-slate-700 border border-slate-200"
                          >
                            ✓ {metric}
                          </div>
                        ))}
                      </div>

                      {/* Features - Always Visible */}
                      {engine.features && (
                        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <h5 className="text-sm font-syne font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#D97757' }}></span>
                            核心能力
                          </h5>
                          <div className="space-y-2">
                            {engine.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-700 font-bitter">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => toggleEngine(engine.id)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-syne font-bold"
                      >
                        {expandedEngine === engine.id ? '收起详情' : '查看详情'}
                        <ArrowRight className={`w-5 h-5 transition-transform ${expandedEngine === engine.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details - Full Width Below */}
                  {expandedEngine === engine.id && engine.details && (
                    <div className="mt-8 p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200 animate-in">
                      {/* Detailed Breakdown */}
                      <h5 className="text-xl font-syne font-bold text-slate-900 mb-6">功能详解</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {engine.details.map((detail, idx) => (
                          <div 
                            key={idx} 
                            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all"
                          >
                            <h6 className="font-syne font-bold text-slate-900 mb-2 flex items-center gap-2">
                              <span 
                                className="w-7 h-7 rounded-full flex items-center justify-center text-sm text-white font-inconsolata"
                                style={{ background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)' }}
                              >
                                {idx + 1}
                              </span>
                              {detail.title}
                            </h6>
                            <p className="text-sm text-slate-600 font-bitter-light leading-relaxed">
                              {detail.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: ENTERPRISE CUSTOMIZATION (Dark/High-Tech - REFACTORED) ========== */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Background - Subtle Radial Gradient for Depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.15) 0%, rgba(15, 23, 42, 1) 70%)'
          }}
        ></div>

        {/* CSS Animations */}
        <style>{`
          @keyframes corePulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes dashFlow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 20; }
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20" data-animate>
            <div 
              className="inline-block px-4 py-2 rounded-full text-sm mb-6 font-inconsolata"
              style={{
                background: 'rgba(217, 119, 87, 0.1)',
                border: '1px solid rgba(217, 119, 87, 0.3)',
                color: '#FCA582'
              }}
            >
              FOR LARGE ENTERPRISES
            </div>

            <h2 className="text-4xl md:text-6xl font-syne text-white mb-6 leading-tight">
              企业级定制开发
              <br />
              <span style={{ color: '#FCA582' }}>构建您的专属数字化壁垒</span>
            </h2>
            
            <p className="text-xl text-slate-300 max-w-4xl mx-auto font-bitter-light mb-4">
              当标准化系统无法满足您独特的业务流程时，我们提供深度定制开发服务，将多个自动化系统打通整合，构建专属的数字化运营平台。
            </p>
            <p className="text-lg text-slate-400 max-w-4xl mx-auto font-bitter-light">
              不是简单的功能叠加，而是站在业务全局的角度，重新设计工作流程、打通数据孤岛、实现跨部门协同，让技术真正成为业务增长的核心驱动力。
            </p>
          </div>

          {/* 5-Step Process */}
          <div className="mb-16" data-animate>
            <h3 className="text-2xl font-syne text-white text-center mb-10">定制开发流程</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
              {[
                { num: '01', title: '战略咨询与需求诊断', desc: '深度访谈，理解您的业务全貌与核心痛点。' },
                { num: '02', title: 'AI转型蓝图规划', desc: '共同设计分阶段、可落地的AI转型路线图。' },
                { num: '03', title: '数据治理与模型构建', desc: '清洗、整合企业数据，训练专属的AI模型。' },
                { num: '04', title: '系统集成与私有化部署', desc: '将AI系统无缝对接到您现有的ERP、CRM等系统。' },
                { num: '05', title: '持续优化与赋能培训', desc: '长期跟踪系统表现，持续迭代优化。' }
              ].map((step, idx) => (
                <div 
                  key={idx}
                  className="relative p-5 rounded-xl text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(217, 119, 87, 0.2)'
                  }}
                >
                  <div 
                    className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold font-inconsolata mb-3"
                    style={{ 
                      background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
                      color: 'white'
                    }}
                  >
                    {step.num}
                  </div>
                  <h4 className="text-base font-syne text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 font-bitter-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Value Props - Minimal Cards with Top Border */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" data-animate>
            {[
              { 
                icon: Zap,
                title: '深度定制', 
                desc: '针对您的业务流程量身定制，而非标准化SaaS'
              },
              { 
                icon: Link2,
                title: '系统打通', 
                desc: '无缝API对接，实现业务系统间实时数据同步'
              },
              { 
                icon: Shield,
                title: '私有部署', 
                desc: '本地化部署可选，核心数据不出企业内网'
              }
            ].map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={idx}
                  className="relative p-6 rounded-xl transition-all group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderTop: '2px solid rgba(217, 119, 87, 0.5)'
                  }}
                >
                  <IconComponent 
                    className="w-8 h-8 mb-3 transition-transform group-hover:scale-110" 
                    style={{ color: '#FCA582' }} 
                  />
                  <h4 className="text-lg font-syne text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-400 font-bitter-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: CASE STUDIES (Light/Clean) ========== */}
      <section id="cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-6xl font-syne text-slate-900 mb-6 leading-tight"
              data-animate
            >
              实战成果：<span style={{ color: '#D97757' }}>行业领跑者的真实增长</span>
            </h2>
            <p 
              className="text-xl text-slate-600 font-bitter"
              data-animate
            >
              客户可约见，数据可查证
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseCases.map((caseItem, index) => (
              <div 
                key={caseItem.id} 
                className="bg-white p-8 rounded-2xl border-2 hover:border-amber-500/50 hover:shadow-2xl transition-all group hover-glow"
                style={{
                  borderColor: 'rgba(217, 119, 87, 0.2)',
                  animationDelay: `${index * 100}ms`
                }}
                data-animate
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-slate-900 font-syne">
                    {caseItem.company}
                  </h4>
                  <span className="text-xs text-slate-500 font-inconsolata bg-slate-100 px-3 py-1 rounded-full">
                    {caseItem.industry}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-slate-600 mb-2 font-bitter">
                    <span className="font-bold text-slate-900">挑战：</span>
                    {caseItem.challenge}
                  </div>
                  <div className="text-sm text-slate-600 font-bitter">
                    <span className="font-bold text-slate-900">方案：</span>
                    {caseItem.solution}
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div 
                  className="border-2 rounded-xl p-4 mb-4 group-hover:scale-105 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.05) 0%, rgba(217, 119, 87, 0.1) 100%)',
                    borderColor: 'rgba(217, 119, 87, 0.2)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-center flex-1">
                      <div className="text-xs text-slate-500 mb-1 font-inconsolata">BEFORE</div>
                      <div className="text-2xl font-black text-slate-700 font-inconsolata">{caseItem.before}</div>
                    </div>
                    <div className="px-4">
                      <ArrowRight className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-xs text-slate-500 mb-1 font-inconsolata">AFTER</div>
                      <div className="text-2xl font-black font-inconsolata" style={{ color: '#D97757' }}>
                        {caseItem.after}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-600 font-inconsolata">{caseItem.metric}</div>
                    <div className="text-sm font-bold mt-1" style={{ color: '#C96543' }}>
                      {caseItem.improvement}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-2 font-bitter-light">
                  {caseItem.result}
                </p>
                <p className="text-xs text-slate-500 font-inconsolata font-bold">
                  ⏱ {caseItem.timeline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: WHY US (Feature Grid) ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-6xl font-syne text-slate-900 mb-6 leading-tight"
              data-animate
            >
              我们交付的不只是AI
              <br />
              <span style={{ color: '#D97757' }}>更是可复制的业务增长</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-50 p-8 rounded-2xl hover:bg-white border-2 border-slate-200 hover:border-amber-500/50 transition-all group hover-glow"
                data-animate
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)'
                  }}
                >
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                <h4 className="text-2xl font-syne text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {feature.title}
                </h4>

                <p className="text-slate-600 font-bitter-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: PROCESS (Timeline/Steps) ========== */}
      <section id="process" className="py-20" style={{ backgroundColor: '#fefce8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate>
            <div className="text-xs font-inconsolata text-slate-500 mb-4 tracking-widest">
              TRANSPARENT · FAST · PREDICTABLE
            </div>
            <h2 className="text-4xl md:text-6xl font-syne text-slate-900 mb-6 leading-tight">
              合作流程
            </h2>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div 
                className="hidden md:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
                style={{ background: 'linear-gradient(90deg, #D97757 0%, #C96543 100%)' }}
              ></div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
                {processSteps.map((step, index) => (
                  <div 
                    key={index}
                    className="text-center"
                    data-animate
                    style={{
                      animationDelay: `${index * 150}ms`
                    }}
                  >
                    <div 
                      className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white mb-4 relative z-10 group-hover:scale-110 transition-transform"
                      style={{
                        background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
                        boxShadow: '0 10px 30px rgba(217, 119, 87, 0.3)'
                      }}
                    >
                      <span className="text-2xl font-black font-inconsolata">{step.num}</span>
                    </div>

                    <h4 className="text-xl font-syne text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-600 font-bitter-light">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: CTA (Impactful Dark) ========== */}
      <section 
        id="contact" 
        className="py-20 bg-slate-900 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{ background: '#D97757' }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 
            className="text-4xl md:text-6xl font-syne text-white mb-6 leading-tight"
            data-animate
          >
            不试试，怎么知道能省多少钱？
          </h2>
          <p 
            className="text-xl text-slate-300 mb-12 font-bitter-light"
            data-animate
          >
            填写表单，48小时内收到专属ROI评估报告
            <br />
            <span className="text-amber-400 font-bold">价值¥2,000，限时免费</span>
          </p>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 text-white font-bold text-xl rounded-xl transition-all inline-flex items-center gap-3 hover:scale-105 group"
            style={{
              background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
              fontFamily: 'Syne, sans-serif',
              boxShadow: '0 20px 40px rgba(217, 119, 87, 0.4)'
            }}
            data-animate
          >
            <span>免费获取ROI评估报告</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>

          <p 
            className="text-sm text-slate-400 mt-6 font-inconsolata"
            data-animate
          >
            本月限额5名 · 已预约3名 · 仅剩2个名额
          </p>

          <div className="flex justify-center items-center gap-12 mt-12 pt-12 border-t border-slate-700" data-animate>
            {[
              { num: '120+', label: '服务企业' },
              { num: '96%', label: '客户满意度' },
              { num: '600%', label: '平均ROI' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-3xl font-black mb-1 font-inconsolata"
                  style={{ color: '#FCA582' }}
                >
                  {stat.num}
                </div>
                <div className="text-sm text-slate-400 font-bitter">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AIImplementationPage;
