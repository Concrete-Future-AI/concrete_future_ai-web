import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import { ArrowRight, CheckCircle2, Zap, Target, TrendingUp, Users, Shield, Clock } from 'lucide-react';

const AIImplementationPage: React.FC = () => {
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
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
      description: '克隆金牌主播，成本趋近于零，让直播间日夜不休地为你赚钱。部署50-500个账号矩阵，连播8小时不重复。',
      bgColor: 'bg-amber-50/30',
      conceptArt: '/img/concept-digital-human.png',
      keyMetrics: ['72小时交付', '成本降90%', '7×24在线']
    },
    {
      id: 'selection',
      number: '02',
      title: 'AI智能选品',
      headline: '爆款命中率从30%提升至70%',
      description: '不再盲目测款。AI分析全网趋势，提前锁定下一个爆款，库存周转快一倍。选品周期从2周缩短到3天。',
      bgColor: 'bg-blue-50/30',
      conceptArt: '/img/concept-selection.png',
      keyMetrics: ['命中率70%', '周期缩短80%', '库存周转快一倍']
    },
    {
      id: 'content-creation',
      number: '03',
      title: '营销内容生成',
      headline: '一支队伍的产能，只需一个人的成本',
      description: '批量生产高转化详情页、短视频、种草文案。让内容不再是增长的瓶颈。产能提升50倍，成本降75%。',
      bgColor: 'bg-green-50/30',
      conceptArt: '/img/concept-content.png',
      keyMetrics: ['产能提升50倍', '成本降75%', '日产500条']
    },
    {
      id: 'ad-optimization',
      number: '04',
      title: 'AI广告投放优化',
      headline: '每一分广告费，都花在刀刃上',
      description: 'AI全天候监控ROI，自动关停亏损计划，放量盈利计划。替你省下无效预算。某品牌广告ROI提升67%。',
      bgColor: 'bg-purple-50/30',
      conceptArt: '/img/concept-ads.png',
      keyMetrics: ['ROI提升67%', '日均优化2000次', '预算节省40%']
    },
    {
      id: 'matrix-operation',
      number: '05',
      title: 'AI矩阵运营',
      headline: '构建永不贬值的数字品牌资产',
      description: '部署50-500个高权重账号矩阵。AI智能体集群管理，7×24自动浏览/点赞/评论/发布，建立"数字品牌资产池"。',
      bgColor: 'bg-teal-50/30',
      conceptArt: '/img/concept-matrix.png',
      keyMetrics: ['500账号矩阵', '日加粉500+', '品牌资产化']
    },
    {
      id: 'after-sales',
      number: '06',
      title: 'AI售后提效',
      headline: '口碑和复购率，从售后开始',
      description: 'AI客服秒级自动回复+全网舆情5分钟预警。解决90%常见问题，某品牌用后客服成本降60%，满意度反升35%。',
      bgColor: 'bg-cyan-50/30',
      conceptArt: '/img/concept-service.png',
      keyMetrics: ['响应<10秒', '成本降60%', '满意度升35%']
    },
    {
      id: 'operation',
      number: '07',
      title: '数据驱动决策',
      headline: '让数据告诉你答案，不再凭感觉赌',
      description: '库存智能预测+动态定价+供应链协同。AI推荐最优策略，减少50%缺货和滞销损失，毛利率提升15%。',
      bgColor: 'bg-indigo-50/30',
      conceptArt: '/img/concept-data.png',
      keyMetrics: ['预测准确率90%', '毛利提升15%', '损失减少50%']
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
      `}</style>

      {/* Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>

      {/* ========== SECTION 1: HERO (Dark, Impactful) ========== */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-20 overflow-hidden bg-slate-900"
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

            {/* Key Metrics - Glassmorphism Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12" data-animate>
              {[
                { value: '8万→1.2万', label: '某服装品牌商品图月成本', change: '↓ 85%' },
                { value: '50→2000', label: '某美妆品牌月短视频产量', change: '↑ 40x' },
                { value: '62天', label: '某出海品牌投资回收周期', change: '快速回本' }
              ].map((metric, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all group hover-glow"
                >
                  <div 
                    className="text-3xl font-black mb-2 font-inconsolata group-hover:scale-110 transition-transform"
                    style={{ color: '#FCA582' }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-xs text-amber-300 mb-2 font-inconsolata font-bold">
                    {metric.change}
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
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PAIN POINTS (Light/Cream Background) ========== */}
      <section className="py-20" style={{ backgroundColor: '#fefce8' }}>
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
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                  data-animate
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image/Concept Art Side */}
                  <div className="w-full md:w-1/2">
                    <div 
                      className={`${engine.bgColor} rounded-2xl p-8 aspect-square flex items-center justify-center border-2 hover-glow transition-all`}
                      style={{
                        borderColor: 'rgba(217, 119, 87, 0.2)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Concept Art Placeholder */}
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

                    <button 
                      onClick={() => toggleEngine(engine.id)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-syne font-bold"
                    >
                      {expandedEngine === engine.id ? '收起详情' : '查看详情'}
                      <ArrowRight className={`w-5 h-5 transition-transform ${expandedEngine === engine.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: ENTERPRISE CUSTOMIZATION (Dark/High-Tech) ========== */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{ background: '#D97757' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16" data-animate>
            <div 
              className="inline-block px-4 py-2 rounded-full text-sm mb-6 font-inconsolata"
              style={{
                background: 'rgba(217, 119, 87, 0.2)',
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
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-bitter-light">
              当标准化产品无法满足需求时，我们提供深度定制。打通ERP/CRM，重构核心业务流。
            </p>
          </div>

          {/* AI Hub Visualization */}
          <div className="max-w-4xl mx-auto" data-animate>
            <div className="relative">
              {/* Central AI Brain */}
              <div 
                className="w-48 h-48 mx-auto rounded-full flex items-center justify-center text-white relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
                  boxShadow: '0 0 60px rgba(217, 119, 87, 0.5)'
                }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-2">🧠</div>
                  <div className="text-sm font-bold font-syne">AI 核心</div>
                </div>
              </div>

              {/* Connected Modules */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {[
                    { label: 'ERP系统', angle: 0 },
                    { label: 'CRM系统', angle: 60 },
                    { label: '财务系统', angle: 120 },
                    { label: '供应链', angle: 180 },
                    { label: '电商平台', angle: 240 },
                    { label: '数据仓库', angle: 300 }
                  ].map((module, idx) => {
                    const radius = 180;
                    const angleRad = (module.angle * Math.PI) / 180;
                    const x = Math.cos(angleRad) * radius;
                    const y = Math.sin(angleRad) * radius;

                    return (
                      <div
                        key={idx}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                        }}
                      >
                        <div className="glass-card px-4 py-3 rounded-lg text-white text-sm font-inconsolata whitespace-nowrap">
                          {module.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                { title: '深度定制', desc: '不是标准化SaaS，而是针对您的业务流程深度定制' },
                { title: '系统打通', desc: '无缝对接ERP/CRM/财务系统，数据实时同步' },
                { title: '私有部署', desc: '支持本地化部署，核心数据不出企业内网' }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all text-center"
                >
                  <h4 className="text-xl font-syne text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-300 font-bitter-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: CASE STUDIES (Light/Clean) ========== */}
      <section id="cases" className="py-20" style={{ backgroundColor: '#fefce8' }}>
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
      <section className="py-20" style={{ backgroundColor: '#fefce8' }}>
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
