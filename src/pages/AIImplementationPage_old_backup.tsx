import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const AIImplementationPage: React.FC = () => {
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleEngine = (engineId: string) => {
    setExpandedEngine(expandedEngine === engineId ? null : engineId);
  };

  // 七大AI引擎数据
  const engines = [
    {
      id: 'digital-human',
      number: '01',
      title: 'AI数字人直播',
      subtitle: '7×24无人直播，最直接创收',
      description: '秒播级数字人克隆+GPT-4智能问答。部署50-500个账号矩阵，连播8小时不重复。高峰期顶20个客服。',
      highlights: [
        '秒播级数字人克隆，5分钟素材72小时交付',
        'GPT-4驱动智能问答，响应<2秒',
        '50-500账号矩阵自动运营，7×24在线'
      ],
      tools: [
        { name: '秒播级数字人克隆', desc: '拍摄5分钟素材，72小时交付专属数字人。面部微表情、头发丝级细节，观众无法分辨真假。' },
        { name: '声音高保真克隆', desc: '录制10分钟音频，还原音色、语气、停顿习惯。支持7种情绪模式切换。' },
        { name: '话术智能改写引擎', desc: '预设500条基础话术，AI每轮自动改写30%内容。连播8小时不重复。' },
        { name: 'GPT-4驱动智能问答', desc: '接入200+产品知识库，响应延迟<2秒，90%问题无需人工介入。' }
      ],
      bgColor: 'from-amber-50 to-orange-50',
      accentColor: '#D97757'
    },
    {
      id: 'selection',
      number: '02',
      title: 'AI智能选品',
      subtitle: '选对品，事半功倍',
      description: '全网爆款监控+趋势预判+利润测算。AI分析3年数据，预测未来3个月爆款品类，命中率70%。',
      highlights: [
        '全网爆款实时监控，抢占窗口期',
        '趋势预判AI模型，准确率70%',
        '快速测款系统，72小时跑出ROI数据'
      ],
      tools: [
        { icon: '🔥', name: '全网爆款实时监控', desc: '实时抓取抖音/小红书/淘宝热榜、谷歌趋势、亚马逊BSR。检测到搜索量暴涨200%→立即预警。' },
        { icon: '📊', name: '趋势预判AI模型', desc: '分析3年历史数据+季节性规律，预测未来3个月爆款品类。准确率70%。' },
        { icon: '💰', name: '利润空间智能测算', desc: '输入1688采购价，AI计算各平台售价、广告成本、物流费。推荐最优定价策略。' },
        { icon: '🎯', name: '竞品爆款深度拆解', desc: '输入竞品链接，AI分析销量曲线、评价关键词、价格策略。生成爆款复刻手册。' }
      ],
      bgColor: 'from-orange-100 to-amber-100',
      accentColor: 'orange'
    },
    {
      id: 'content-creation',
      number: '03',
      title: '营销内容生成',
      subtitle: '图片+视频+文案一站式',
      description: '一键生成全套营销素材：商品图+短视频+文案。30分钟完成主图、详情页、短视频脚本、小红书笔记。产能提升50倍，成本降75%。',
      highlights: [
        '一键生成全套素材，30分钟全搞定',
        '商品图场景批量生成，成本降90%',
        '3小时直播→100条短视频，日产500条'
      ],
      tools: [
        { icon: '🎨', name: '一键生成全套营销素材', desc: '输入产品信息，AI生成商品主图+详情页+短视频脚本+小红书笔记+朋友圈文案。30分钟完成。' },
        { icon: '🏞️', name: '商品图场景批量生成', desc: '1张白底图→50种场景(沙滩/咖啡厅/卧室)。处理速度100张/10分钟，成本降90%。' },
        { icon: '👕', name: 'AI模特试穿(0成本)', desc: '上传平铺服装，生成穿在模特身上效果。可选身高/肤色/体型，匹配全球市场审美。' },
        { icon: '✂️', name: '3小时直播→100条短视频', desc: 'AI识别产品演示、价格播报、互动爆点。自动切片+字幕+BGM，日产500条。' }
      ],
      bgColor: 'from-blue-100 to-cyan-100',
      accentColor: 'blue'
    },
    {
      id: 'ad-optimization',
      number: '04',
      title: 'AI广告投放优化',
      subtitle: '付费流量ROI最大化',
      description: '素材A/B测试自动化+智能出价。1条素材生成50组变体，72小时跑出ROI最高组合。某品牌用后广告ROI提升67%。',
      highlights: [
        '素材A/B测试自动化，72小时找出最优组合',
        '智能出价实时优化，日均优化2000次',
        'ROI预测模型，预判素材效果准确率85%'
      ],
      tools: [
        { icon: '🎯', name: '素材A/B测试自动化', desc: '1条原始素材，AI生成50组变体(不同开头/文案/CTA)。自动投放，72小时跑出ROI最高组合。' },
        { icon: '💰', name: '智能出价实时优化', desc: 'AI每5分钟调整出价策略。检测到CTR>5%→提高出价抢量。日均优化2000次。' },
        { icon: '🔮', name: 'ROI预测模型', desc: '投放前预判素材ROI。分析画面节奏/文案钩子/BGM，对比10万+历史数据。准确率85%。' },
        { icon: '📊', name: '跨平台数据归因', desc: '打通抖音/快手/小红书/淘宝数据。追踪全路径，算清每个渠道真实ROI。' }
      ],
      bgColor: 'from-purple-100 to-pink-100',
      accentColor: 'purple'
    },
    {
      id: 'matrix-operation',
      number: '05',
      title: 'AI矩阵运营',
      subtitle: '品牌资产构建',
      description: '部署50-500个高权重账号矩阵。AI智能体集群管理，7×24自动浏览/点赞/评论/发布，建立"数字品牌资产池"。',
      highlights: [
        '50-500账号矩阵自动养号',
        'KOC人设智能构建，建立长期信任',
        '社媒评论精准截流，日加粉500+'
      ],
      tools: [
        { icon: '🌐', name: '50-500账号矩阵自动养号', desc: '部署50-500个高权重账号矩阵(抖音/小红书/视频号)。AI模拟真人行为，建立数字品牌资产池。' },
        { icon: '🎭', name: 'KOC人设智能构建', desc: '定义5-10个人设角色(宝妈/健身达人/职场白领)。AI为每个人设生成一致的言行风格。' },
        { icon: '💬', name: '社媒评论精准截流', desc: '监控竞品/大V评论区，识别意向客户。AI自动点赞+神评抢位+私信引导，日加粉500+。' },
        { icon: '🤖', name: 'AI智能体集群管理', desc: '每个账号背后是独立AI智能体，拥有人设和性格。7×24自动运营，像真人一样。' }
      ],
      bgColor: 'from-green-100 to-emerald-100',
      accentColor: 'green'
    },
    {
      id: 'after-sales',
      number: '06',
      title: 'AI售后提效',
      subtitle: '口碑复购',
      description: 'AI客服秒级自动回复+全网舆情5分钟预警。解决90%常见问题，某品牌用后客服成本降60%，满意度反升35%。',
      highlights: [
        'AI客服秒级自动回复，解决90%常见问题',
        '全网舆情5分钟预警，避免升级纠纷',
        '客户反馈AI挖掘，指导产品改进'
      ],
      tools: [
        { icon: '💬', name: 'AI客服秒级自动回复', desc: '客户咨询瞬间响应，理解多轮对话。解决90%常见问题，仅10%转人工，顶20个客服。' },
        { icon: '🔍', name: '全网舆情5分钟预警', desc: '监控淘宝/京东/抖音评价、小红书/微博提及。检测到负面，5分钟推送预警。' },
        { icon: '😊', name: '客户情绪实时识别', desc: 'AI判断客户情绪等级。识别到投诉、退款等高危词，自动转人工+标注优先级。' },
        { icon: '📧', name: '客户反馈AI挖掘', desc: '分析10万+评价，提取高频问题。生成产品改进报告，指导下季度优化重点。' }
      ],
      bgColor: 'from-indigo-100 to-blue-100',
      accentColor: 'indigo'
    },
    {
      id: 'operation',
      number: '07',
      title: '数据驱动决策',
      subtitle: '战略决策支持',
      description: '库存智能预测+动态定价+供应链协同。AI推荐最优策略，减少50%缺货和滞销损失，毛利率提升15%。',
      highlights: [
        '库存智能预测，准确率90%',
        '动态定价，毛利提升15%',
        '供应链智能协同，降低物流成本'
      ],
      tools: [
        { icon: '📦', name: '库存智能预测', desc: '分析历史销量、季节性、促销活动、天气，预测未来30天各SKU销量。减少50%缺货和滞销损失。' },
        { icon: '🏷️', name: '动态定价', desc: '实时监控竞品价格、库存水平、用户支付意愿。自动调价，日均调价500次，毛利提升15%。' },
        { icon: '🚚', name: '供应链智能协同', desc: '打通供应商/仓库/物流系统。AI推荐最优发货方案，预警锁仓时间，降低物流成本。' },
        { icon: '🗺️', name: '目标市场本地化洞察', desc: '分析目标国社媒热点、文化禁忌、定价策略，提供出海决策支持。' }
      ],
      bgColor: 'from-red-100 to-rose-100',
      accentColor: 'red'
    }
  ];

  // 成功案例
  const showcaseCases = [
    {
      id: 1,
      company: '某服装品牌',
      industry: '服装电商',
      problem: '设计师产能不足，上新慢',
      solution: 'AI商品图批量生产',
      metric: '8万→1.2万',
      metricLabel: '月成本',
      result: '设计师从画图解放，专注创意策划',
      timeline: '2周上线，首月节省6.8万',
      icon: '👔'
    },
    {
      id: 2,
      company: '某美妆品牌',
      industry: '美妆护肤',
      problem: '视频内容产量低，测款慢',
      solution: 'AI直播切片+批量剪辑',
      metric: '50→2000',
      metricLabel: '月视频产量',
      result: '爆款视频找到率提升3倍',
      timeline: '3周部署，单月ROI 280%',
      icon: '💄'
    },
    {
      id: 3,
      company: '某出海品牌',
      industry: '跨境电商',
      problem: '获客成本高，人工运营累',
      solution: 'AI社媒矩阵+自动获客',
      metric: '120→48',
      metricLabel: '单客成本',
      result: '10个平台24小时自动运营',
      timeline: '62天回本，每月净省18万',
      icon: '🌍'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* 导航栏 */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2">
                <span 
                  className="text-xl font-bold text-gray-900"
                  style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '700'
                  }}
                >
                  炬象未来
                </span>
              </Link>
              <Link 
                to="/" 
                className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                style={{
                  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                  fontWeight: '500'
                }}
              >
                ← 返回主页
              </Link>
            </div>
            <div className="hidden md:flex gap-8 items-center">
              <a 
                href="#services" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                style={{
                  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                  fontWeight: '500'
                }}
              >
                服务能力
              </a>
              <a 
                href="#cases" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                style={{
                  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                  fontWeight: '500'
                }}
              >
                成功案例
              </a>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-all shadow-sm"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: '600'
                }}
              >
                联系我们
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区 */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div 
              className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: '600'
              }}
            >
              AI应用落地服务
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-black mb-8 leading-tight"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '900',
                letterSpacing: '-0.02em'
              }}
            >
              2周部署，60天回本
              <br />
              <span className="text-orange-400">这是AI该有的ROI</span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '300'
              }}
            >
              不是又一个需要学习的AI工具，而是直接植入您业务流程的自动化系统。
              <br />
              让机器干重复的活，人做创造性的事。成本降70%，产能翻10倍。
            </p>

            {/* 数据指标 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              {[
                { value: '8万→1.2万', label: '某服装品牌商品图月成本' },
                { value: '50→2000', label: '某美妆品牌月短视频产量' },
                { value: '62天', label: '某出海品牌投资回收周期' }
              ].map((metric, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl">
                  <div 
                    className="text-3xl font-black text-orange-400 mb-2"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: '900'
                    }}
                  >
                    {metric.value}
                  </div>
                  <div 
                    className="text-sm text-gray-300"
                    style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '400'
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-3"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
              }}
            >
              免费获取ROI评估报告
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 痛点板块 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-6xl font-black text-center mb-16 leading-tight"
            style={{
              fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
              fontWeight: '800'
            }}
          >
            这些痛点，正在吞噬你的<span className="text-orange-500">利润</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 左侧：痛点列表 */}
            <div className="space-y-6">
              {[
                { icon: '🎨', title: '内容产能卡脖子', desc: '设计师画一张图要半天，上新慢、测款慢，爆款机会稍纵即逝' },
                { icon: '📈', title: '获客成本失控', desc: '去年50块拿一个客户，今年要120。广告费年年涨，转化率年年跌' },
                { icon: '📊', title: '决策全凭拍脑袋', desc: '库存积压50万，不知道哪款会爆。每次试错都是真金白银' },
                { icon: '👥', title: '想扩张，招不起人', desc: '业务翻倍要多招10个人，工资、社保、管理成本翻倍' }
              ].map((pain, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border border-gray-200 hover:border-orange-300"
                >
                  <div className="text-3xl">{pain.icon}</div>
                  <div>
                    <h4 
                      className="font-bold text-gray-900 mb-2 text-lg"
                      style={{
                        fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                        fontWeight: '700'
                      }}
                    >
                      {pain.title}
                    </h4>
                    <p 
                      className="text-gray-600"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}
                    >
                      {pain.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 右侧：解决方案 */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 rounded-2xl text-white border-2 border-orange-500/30">
              <div className="inline-block px-4 py-2 bg-orange-500 rounded-full text-sm font-bold mb-6">
                ⚡ 我们的解法
              </div>
              <h3 
                className="text-3xl font-black mb-6 leading-tight"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '800'
                }}
              >
                机器干重活，人做聪明事
                <br />
                这才是AI正确用法
              </h3>
              <p 
                className="text-gray-200 text-lg leading-relaxed mb-8"
                style={{
                  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                  fontWeight: '300'
                }}
              >
                我们做的不是卖工具，而是<span className="text-orange-400 font-bold">重新设计你的工作流程</span>。把设计师从重复劳动中解放出来，让数据告诉你该进什么货、定什么价。
              </p>
              <div className="space-y-4">
                {[
                  { num: '1', text: '边际成本趋零：做1个和做1000个，成本几乎一样' },
                  { num: '2', text: '数据驱动决策：算法告诉你答案，不再凭感觉赌' },
                  { num: '3', text: '人效翻10倍：3个人的团队，干30个人的活' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black font-black text-sm">{item.num}</span>
                    </div>
                    <span 
                      className="text-gray-100"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 七大AI引擎 */}
      <section id="services" className="py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-6xl font-black mb-6 leading-tight"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '800'
              }}
            >
              七大引擎，按ROI优先级重构业务
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '300'
              }}
            >
              从最直接创造收入的数字人直播，到最烧钱的广告优化。
              <span className="font-bold text-gray-900">先解决燃眉之急，再建立长期壁垒。</span>
            </p>
          </div>

          {/* 引擎列表 */}
          <div className="space-y-16">
            {engines.map((engine, index) => (
              <div key={engine.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                {/* 引擎头部 */}
                <div className={`bg-gradient-to-r ${engine.bgColor} p-8 md:p-12`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span 
                          className="text-sm font-bold bg-white/90 text-gray-900 px-4 py-2 rounded-full"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: '700'
                          }}
                        >
                          {engine.number}
                        </span>
                        <h3 
                          className="text-3xl md:text-4xl font-black text-gray-900"
                          style={{
                            fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                            fontWeight: '800'
                          }}
                        >
                          {engine.title}
                        </h3>
                      </div>
                      <p 
                        className="text-xl text-gray-700 mb-4"
                        style={{
                          fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                          fontWeight: '600'
                        }}
                      >
                        {engine.subtitle}
                      </p>
                      <p 
                        className="text-lg text-gray-600 leading-relaxed"
                        style={{
                          fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                          fontWeight: '400'
                        }}
                      >
                        {engine.description}
                      </p>
                    </div>
                    <button 
                      onClick={() => toggleEngine(engine.id)}
                      className="px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-semibold flex items-center gap-2 whitespace-nowrap"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: '600'
                      }}
                    >
                      {expandedEngine === engine.id ? '收起' : '查看更多'}
                      <svg 
                        className={`w-5 h-5 transition-transform ${expandedEngine === engine.id ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* 核心亮点 */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {engine.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span 
                          className="text-gray-800 text-sm"
                          style={{
                            fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                            fontWeight: '500'
                          }}
                        >
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 展开的工具列表 */}
                {expandedEngine === engine.id && (
                  <div className="p-8 bg-gray-50 border-t border-gray-200 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {engine.tools.map((tool, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-3xl">{tool.icon}</div>
                            <div>
                              <h5 
                                className="font-bold text-gray-900 mb-2 text-lg group-hover:text-orange-600 transition-colors"
                                style={{
                                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                                  fontWeight: '700'
                                }}
                              >
                                {tool.name}
                              </h5>
                              <p 
                                className="text-gray-600 text-sm leading-relaxed"
                                style={{
                                  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                                  fontWeight: '400'
                                }}
                              >
                                {tool.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 成功案例 */}
      <section id="cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-6xl font-black mb-6 leading-tight"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '800'
              }}
            >
              真实案例，<span className="text-orange-500">真实数据</span>
            </h2>
            <p 
              className="text-xl text-gray-600"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400'
              }}
            >
              客户可约见，数据可查证
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseCases.map((caseItem) => (
              <div 
                key={caseItem.id} 
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{caseItem.icon}</div>
                <h4 
                  className="text-xl font-bold text-gray-900 mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '700'
                  }}
                >
                  {caseItem.company}
                </h4>
                <p 
                  className="text-sm text-gray-600 mb-4"
                  style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontWeight: '500'
                  }}
                >
                  {caseItem.industry}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-xs text-gray-500">痛点</span>
                    <p className="text-sm text-gray-700">{caseItem.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">方案</span>
                    <p className="text-sm text-gray-700">{caseItem.solution}</p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                  <div 
                    className="text-3xl font-black text-orange-600 mb-1"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: '900'
                    }}
                  >
                    {caseItem.metric}
                  </div>
                  <div className="text-xs text-orange-700">{caseItem.metricLabel}</div>
                </div>

                <p 
                  className="text-sm text-gray-600 mb-2"
                  style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontWeight: '400'
                  }}
                >
                  {caseItem.result}
                </p>
                <p 
                  className="text-xs text-gray-500"
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontWeight: '600'
                  }}
                >
                  {caseItem.timeline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最终CTA */}
      <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
            style={{
              fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
              fontWeight: '900'
            }}
          >
            AI转型窗口期
            <br />
            仅剩<span className="text-orange-400"> 18个月</span>
          </h2>
          <p 
            className="text-xl text-gray-300 mb-12"
            style={{
              fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
              fontWeight: '300'
            }}
          >
            现在行动 = 领先同行2年 | 犹豫等待 = 被市场淘汰
          </p>

          <button 
            onClick={() => window.location.href = 'mailto:business@concretefuture.ai'}
            className="px-10 py-5 bg-orange-500 text-white font-bold text-xl rounded-xl hover:bg-orange-600 transition-all shadow-2xl hover:shadow-orange-500/50 inline-flex items-center gap-3"
            style={{
              fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
              fontWeight: '700'
            }}
          >
            免费预约咨询（价值¥1,000）
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <p 
            className="text-sm text-gray-400 mt-6"
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: '400'
            }}
          >
            本月限额5名，已预约3名
          </p>

          <div className="flex justify-center items-center gap-12 mt-12 pt-12 border-t border-slate-700">
            {[
              { num: '50+', label: '服务企业' },
              { num: '98%', label: '满意度' },
              { num: '2000%+', label: '平均ROI' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-3xl font-black text-orange-400 mb-1"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '900'
                  }}
                >
                  {stat.num}
                </div>
                <div 
                  className="text-sm text-gray-400"
                  style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontWeight: '400'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIImplementationPage;
