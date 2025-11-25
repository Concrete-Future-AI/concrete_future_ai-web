import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';

const AIImplementationPage: React.FC = () => {
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Smooth scroll with native behavior for simplicity (Lenis can be added via CDN if needed)
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

    if (newState) {
      setTimeout(() => {
        const toolItems = document.querySelectorAll('.tool-item');
        toolItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('show');
          }, index * 30);
        });
      }, 100);
    }
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
      ]
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
        { name: '全网爆款实时监控', desc: '实时抓取抖音/小红书/淘宝热榜、谷歌趋势、亚马逊BSR。检测到搜索量暴涨200%→立即预警。' },
        { name: '趋势预判AI模型', desc: '分析3年历史数据+季节性规律，预测未来3个月爆款品类。准确率70%。' },
        { name: '利润空间智能测算', desc: '输入1688采购价，AI计算各平台售价、广告成本、物流费。推荐最优定价策略。' },
        { name: '竞品爆款深度拆解', desc: '输入竞品链接，AI分析销量曲线、评价关键词、价格策略。生成爆款复刻手册。' }
      ]
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
        { name: '一键生成全套营销素材', desc: '输入产品信息，AI生成商品主图+详情页+短视频脚本+小红书笔记+朋友圈文案。30分钟完成。' },
        { name: '商品图场景批量生成', desc: '1张白底图→50种场景(沙滩/咖啡厅/卧室)。处理速度100张/10分钟，成本降90%。' },
        { name: 'AI模特试穿(0成本)', desc: '上传平铺服装，生成穿在模特身上效果。可选身高/肤色/体型，匹配全球市场审美。' },
        { name: '3小时直播→100条短视频', desc: 'AI识别产品演示、价格播报、互动爆点。自动切片+字幕+BGM，日产500条。' }
      ]
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
        { name: '素材A/B测试自动化', desc: '1条原始素材，AI生成50组变体(不同开头/文案/CTA)。自动投放，72小时跑出ROI最高组合。' },
        { name: '智能出价实时优化', desc: 'AI每5分钟调整出价策略。检测到CTR>5%→提高出价抢量。日均优化2000次。' },
        { name: 'ROI预测模型', desc: '投放前预判素材ROI。分析画面节奏/文案钩子/BGM，对比10万+历史数据。准确率85%。' },
        { name: '跨平台数据归因', desc: '打通抖音/快手/小红书/淘宝数据。追踪全路径，算清每个渠道真实ROI。' }
      ]
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
        { name: '50-500账号矩阵自动养号', desc: '部署50-500个高权重账号矩阵(抖音/小红书/视频号)。AI模拟真人行为，建立数字品牌资产池。' },
        { name: 'KOC人设智能构建', desc: '定义5-10个人设角色(宝妈/健身达人/职场白领)。AI为每个人设生成一致的言行风格。' },
        { name: '社媒评论精准截流', desc: '监控竞品/大V评论区，识别意向客户。AI自动点赞+神评抢位+私信引导，日加粉500+。' },
        { name: 'AI智能体集群管理', desc: '每个账号背后是独立AI智能体，拥有人设和性格。7×24自动运营，像真人一样。' }
      ]
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
        { name: 'AI客服秒级自动回复', desc: '客户咨询瞬间响应，理解多轮对话。解决90%常见问题，仅10%转人工，顶20个客服。' },
        { name: '全网舆情5分钟预警', desc: '监控淘宝/京东/抖音评价、小红书/微博提及。检测到负面，5分钟推送预警。' },
        { name: '客户情绪实时识别', desc: 'AI判断客户情绪等级。识别到投诉、退款等高危词，自动转人工+标注优先级。' },
        { name: '客户反馈AI挖掘', desc: '分析10万+评价，提取高频问题。生成产品改进报告，指导下季度优化重点。' }
      ]
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
        { name: '库存智能预测', desc: '分析历史销量、季节性、促销活动、天气，预测未来30天各SKU销量。减少50%缺货和滞销损失。' },
        { name: '动态定价', desc: '实时监控竞品价格、库存水平、用户支付意愿。自动调价，日均调价500次，毛利提升15%。' },
        { name: '供应链智能协同', desc: '打通供应商/仓库/物流系统。AI推荐最优发货方案，预警锁仓时间，降低物流成本。' },
        { name: '目标市场本地化洞察', desc: '分析目标国社媒热点、文化禁忌、定价策略，提供出海决策支持。' }
      ]
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
      timeline: '2周上线，首月节省6.8万'
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
      timeline: '3周部署，单月ROI 280%'
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
      timeline: '62天回本，每月净省18万'
    }
  ];

  // 痛点数据
  const painPoints = [
    { title: '内容产能卡脖子', desc: '设计师画一张图要半天，上新慢、测款慢，爆款机会稍纵即逝' },
    { title: '获客成本失控', desc: '去年50块拿一个客户，今年要120。广告费年年涨，转化率年年跌' },
    { title: '决策全凭拍脑袋', desc: '库存积压50万，不知道哪款会爆。每次试错都是真金白银' },
    { title: '想扩张，招不起人', desc: '业务翻倍要多招10个人，工资、社保、管理成本翻倍' }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <style>{`
        /* Syne/Bitter Typography */
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

        /* Tool items staggered animation */
        .tool-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .tool-item.show {
          opacity: 1;
          transform: translateY(0);
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
      `}</style>

      {/* Navigation with dark adaptation */}
      <div className="relative z-50">
        <Navigation />
      </div>

      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ backgroundColor: '#0f172a' }}
      >
        {/* Parallax Background Layers */}
        <div className="parallax-layer parallax-layer-1 opacity-10">
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ background: '#D97757' }}
          ></div>
        </div>
        <div className="parallax-layer parallax-layer-2 opacity-10">
          <div 
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{ background: '#059669' }}
          ></div>
        </div>
        
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#D97757 1px, transparent 1px), linear-gradient(90deg, #D97757 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex mb-8" data-animate>
            <ol className="flex items-center space-x-2 font-inconsolata text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">首页</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-white">AI应用落地服务</li>
            </ol>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            <div 
              className="inline-block px-4 py-2 rounded-full text-sm mb-6 font-inconsolata"
              style={{
                background: 'rgba(217, 119, 87, 0.2)',
                border: '1px solid rgba(217, 119, 87, 0.3)',
                color: '#FCA582'
              }}
              data-animate
            >
              ENTERPRISE AI TRANSFORMATION
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-syne text-white mb-8 leading-tight"
              data-animate
            >
              2周部署，60天回本
              <br />
              <span style={{ color: '#FCA582' }}>这是AI该有的ROI</span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-bitter-light"
              data-animate
            >
              不是又一个需要学习的AI工具，而是直接植入您业务流程的自动化系统。
              <br />
              让机器干重复的活，人做创造性的事。<span className="font-bold text-white">成本降70%，产能翻10倍。</span>
            </p>

            {/* Data Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12" data-animate>
              {[
                { value: '8万→1.2万', label: '某服装品牌商品图月成本' },
                { value: '50→2000', label: '某美妆品牌月短视频产量' },
                { value: '62天', label: '某出海品牌投资回收周期' }
              ].map((metric, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all group"
                  style={{
                    boxShadow: '0 0 30px rgba(217, 119, 87, 0.1)'
                  }}
                >
                  <div 
                    className="text-3xl font-black mb-2 font-inconsolata group-hover:scale-110 transition-transform"
                    style={{ color: '#FCA582' }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-sm text-slate-300 font-bitter">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <button 
              ref={ctaButtonRef}
              onClick={() => setIsModalOpen(true)}
              className="magnetic-button px-8 py-4 text-white font-bold text-lg rounded-lg inline-flex items-center gap-3 shadow-xl hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
                fontFamily: 'Syne, sans-serif'
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

      {/* Pain Points Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-6xl font-syne text-white text-center mb-16 leading-tight"
            data-animate
          >
            这些痛点，正在吞噬你的<span style={{ color: '#D97757' }}>利润</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Pain Points List */}
            <div className="space-y-6">
              {painPoints.map((pain, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all group"
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
                      <h4 className="font-bold mb-2 text-lg text-white font-syne group-hover:text-amber-200 transition-colors">
                        {pain.title}
                      </h4>
                      <p className="text-slate-300 font-bitter-light">
                        {pain.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Solution Box */}
            <div 
              className="glass-card p-8 md:p-12 rounded-2xl text-white border-2 relative overflow-hidden"
              style={{
                borderColor: 'rgba(217, 119, 87, 0.3)',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
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
                  我们做的不是卖工具，而是<span style={{ color: '#FCA582', fontWeight: '700' }}>重新设计你的工作流程</span>。把设计师从重复劳动中解放出来，让数据告诉你该进什么货、定什么价。
                </p>
                
                <div className="space-y-4">
                  {[
                    { num: '1', text: '边际成本趋零：做1个和做1000个，成本几乎一样' },
                    { num: '2', text: '数据驱动决策：算法告诉你答案，不再凭感觉赌' },
                    { num: '3', text: '人效翻10倍：3个人的团队，干30个人的活' }
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-3">
                      <div 
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-inconsolata font-black"
                        style={{ background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)' }}
                      >
                        {item.num}
                      </div>
                      <span className="text-slate-100 font-bitter">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seven Engines Section */}
      <section id="services" className="py-20" style={{ background: 'linear-gradient(to bottom, #1e293b, #0f172a)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-6xl font-syne text-white mb-6 leading-tight"
              data-animate
            >
              七大引擎，按ROI优先级重构业务
            </h2>
            <p 
              className="text-xl text-slate-300 max-w-3xl mx-auto font-bitter-light"
              data-animate
            >
              从最直接创造收入的数字人直播，到最烧钱的广告优化。
              <span className="font-bold text-white">先解决燃眉之急，再建立长期壁垒。</span>
            </p>
          </div>

          {/* Engine Cards */}
          <div className="space-y-12">
            {engines.map((engine, engineIndex) => (
              <div 
                key={engine.id} 
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all"
                data-animate
                style={{
                  animationDelay: `${engineIndex * 100}ms`
                }}
              >
                {/* Engine Header */}
                <div 
                  className="p-8 md:p-12"
                  style={{
                    background: `linear-gradient(135deg, rgba(217, 119, 87, ${0.1 - engineIndex * 0.01}) 0%, rgba(15, 23, 42, 0.5) 100%)`
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span 
                          className="text-sm font-bold bg-white/90 px-4 py-2 rounded-full font-inconsolata"
                          style={{ color: '#0A0A0A' }}
                        >
                          {engine.number}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-syne text-white">
                          {engine.title}
                        </h3>
                      </div>
                      <p 
                        className="text-xl mb-4 font-bold"
                        style={{ color: '#FCA582' }}
                      >
                        {engine.subtitle}
                      </p>
                      <p className="text-lg text-slate-300 leading-relaxed font-bitter-light">
                        {engine.description}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => toggleEngine(engine.id)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all shadow-sm font-bold flex items-center gap-2 whitespace-nowrap backdrop-blur-sm"
                      style={{ fontFamily: 'Syne, sans-serif' }}
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

                  {/* Core Highlights */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {engine.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ background: '#D97757' }}
                        ></div>
                        <span className="text-slate-200 text-sm font-bitter">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expanded Tools List */}
                {expandedEngine === engine.id && (
                  <div className="p-8 bg-slate-900/50 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {engine.tools.map((tool, idx) => (
                        <div 
                          key={idx} 
                          className="tool-item glass-card p-6 rounded-xl hover:bg-white/10 transition-all group border border-white/5"
                          style={{
                            boxShadow: '0 0 20px rgba(217, 119, 87, 0.05)'
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div 
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"
                              style={{ background: '#D97757' }}
                            ></div>
                            <div>
                              <h5 className="font-bold mb-2 text-lg text-white font-syne group-hover:text-amber-200 transition-colors">
                                {tool.name}
                              </h5>
                              <p className="text-slate-400 text-sm leading-relaxed font-bitter-light">
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

      {/* Success Cases Section */}
      <section id="cases" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-6xl font-syne text-white mb-6 leading-tight"
              data-animate
            >
              真实案例，<span style={{ color: '#D97757' }}>真实数据</span>
            </h2>
            <p 
              className="text-xl text-slate-300 font-bitter"
              data-animate
            >
              客户可约见，数据可查证
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseCases.map((caseItem, index) => (
              <div 
                key={caseItem.id} 
                className="glass-card p-8 rounded-2xl border-2 hover:border-amber-500/50 hover:shadow-2xl transition-all group"
                style={{
                  borderColor: 'rgba(217, 119, 87, 0.2)',
                  boxShadow: '0 0 30px rgba(217, 119, 87, 0.1)',
                  animationDelay: `${index * 100}ms`
                }}
                data-animate
              >
                <h4 className="text-xl font-bold mb-2 text-white font-syne group-hover:text-amber-200 transition-colors">
                  {caseItem.company}
                </h4>
                <p className="text-sm text-slate-400 mb-4 font-inconsolata">
                  {caseItem.industry}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-xs text-slate-500 font-inconsolata">痛点</span>
                    <p className="text-sm text-slate-300 font-bitter">{caseItem.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-inconsolata">方案</span>
                    <p className="text-sm text-slate-300 font-bitter">{caseItem.solution}</p>
                  </div>
                </div>

                <div 
                  className="border rounded-xl p-4 mb-4 group-hover:scale-105 transition-transform"
                  style={{
                    background: 'rgba(217, 119, 87, 0.1)',
                    borderColor: 'rgba(217, 119, 87, 0.2)'
                  }}
                >
                  <div 
                    className="text-3xl font-black mb-1 font-inconsolata"
                    style={{ color: '#FCA582' }}
                  >
                    {caseItem.metric}
                  </div>
                  <div className="text-xs font-inconsolata" style={{ color: '#C96543' }}>
                    {caseItem.metricLabel}
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-2 font-bitter-light">
                  {caseItem.result}
                </p>
                <p className="text-xs text-slate-500 font-inconsolata font-bold">
                  {caseItem.timeline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        id="contact" 
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
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
            AI转型窗口期
            <br />
            仅剩<span style={{ color: '#FCA582' }}> 18个月</span>
          </h2>
          <p 
            className="text-xl text-slate-300 mb-12 font-bitter-light"
            data-animate
          >
            现在行动 = 领先同行2年 | 犹豫等待 = 被市场淘汰
          </p>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 text-white font-bold text-xl rounded-xl transition-all shadow-2xl inline-flex items-center gap-3 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
              fontFamily: 'Syne, sans-serif'
            }}
            data-animate
          >
            免费预约咨询（价值¥1,000）
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <p 
            className="text-sm text-slate-400 mt-6 font-inconsolata"
            data-animate
          >
            本月限额5名，已预约3名
          </p>

          <div className="flex justify-center items-center gap-12 mt-12 pt-12 border-t border-slate-700" data-animate>
            {[
              { num: '120+', label: '服务企业' },
              { num: '96%', label: '满意度' },
              { num: '600%+', label: '平均ROI' }
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
