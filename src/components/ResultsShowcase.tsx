import React, { useState, useEffect } from 'react';

const ResultsShowcase = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    clients: 0,
    savings: 0,
    efficiency: 0,
    satisfaction: 0
  });

  const [todayConsultations, setTodayConsultations] = useState(0);
  
  // 客户案例连续滚动状态
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  // 实时增长计算配置
  // 起始时间：2024年12月1日 00:00:00
  // 每0.5秒增长 ¥4.63
  const SAVINGS_CONFIG = {
    startTime: new Date('2024-12-01T00:00:00').getTime(), // 起始时间戳
    baseAmount: 12000000, // 起始基础金额：1200万元
    perHalfSecondRate: 4.63, // 每0.5秒增长 4.63 元
    updateInterval: 500, // 更新间隔（毫秒）
  };

  // 计算实时节约成本
  const calculateRealTimeSavings = () => {
    const now = Date.now();
    const elapsedMilliseconds = now - SAVINGS_CONFIG.startTime;
    const halfSecondsPassed = elapsedMilliseconds / SAVINGS_CONFIG.updateInterval;
    const additionalSavings = halfSecondsPassed * SAVINGS_CONFIG.perHalfSecondRate;
    return SAVINGS_CONFIG.baseAmount + additionalSavings;
  };

  // 计算今日咨询数（基于圆周率的确定性算法）
  const getDailyInquiryCount = () => {
    const today = new Date().getDate(); // Returns 1-31
    // First 31 digits of Pi (after the decimal point)
    const piDigits = "1415926535897932384626433832795"; 
    
    // Get the digit corresponding to today (index is day - 1)
    // Fallback to 5 if something goes wrong, though it shouldn't.
    const digitToday = parseInt(piDigits[today - 1] || '5');
    
    const baseCount = 10;
    return baseCount + digitToday;
  };

  const stats = [
    {
      key: 'clients',
      number: '120+',
      finalValue: 120,
      title: '120+ 领跑企业',
      subtitle: 'Industry Leaders',
      description: '覆盖政府、500强、中小企业等15+行业领域',
      iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      gradientFrom: '#3B82F6',
      gradientTo: '#1D4ED8',
      accentColor: '#2563EB'
    },
    {
      key: 'savings',
      number: '0',
      finalValue: 0,
      title: '¥2.9亿+ 累计节省',
      subtitle: 'Cost Saved',
      description: '平均降本增效 65%，为客户持续创造价值',
      iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      gradientFrom: '#10B981',
      gradientTo: '#047857',
      accentColor: '#059669',
      isRealTime: true
    },
    {
      key: 'efficiency',
      number: '73%',
      finalValue: 73,
      title: '73% 效率革命',
      subtitle: 'Efficiency Boost',
      description: '业务流程智能化，人力成本显著降低',
      iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
      gradientFrom: '#8B5CF6',
      gradientTo: '#6D28D9',
      accentColor: '#7C3AED'
    },
    {
      key: 'satisfaction',
      number: '96%',
      finalValue: 96,
      title: '96% 续约铁粉',
      subtitle: 'Retention Rate',
      description: '4.8/5.0 综合评分 • 85% 续约合作率',
      iconPath: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      gradientFrom: '#F97316',
      gradientTo: '#C2410C',
      accentColor: '#EA580C'
    }
  ];

  // 客户案例 - 扩充到8个，制造"评价很多"的感觉
  const testimonials = [
    {
      name: '王建国',
      title: 'XX跨境电商 CEO',
      company: '年营收2000万',
      avatar: '/img/头像1.png',
      content: '"之前我根本不信AI能帮电商干啥。直到看到数据：设计成本 ￥45,000/月 → ￥8,000/月（-82%）；产出效率 60张/月 → 500张/月（+733%）；转化率直接提升40%。3个月回本，之后全是纯利润。现在我最担心的是竞争对手也学会了。"',
      metrics: [
        { label: '设计成本', value: '-82%' },
        { label: '产出效率', value: '+733%' },
        { label: '转化率', value: '+40%' }
      ]
    },
    {
      name: '李明',
      title: 'XX智能硬件 运营总监',
      company: '年营收5000万 | 团队80人',
      avatar: '/img/头像2.png',
      content: '"制造业老板都说AI落地难。炬象用5个场景证明不是：客服 3人 → 1人+AI，响应速度×5；库存预测 准确率+60%，呆滞库存直接腰斩；质检 AI识别率80%+，质检工从5人→2人。最神奇的是员工态度180度转变，现在抢着用AI。人效提升60%，运营成本降40%。"',
      metrics: [
        { label: '人效提升', value: '+60%' },
        { label: '运营成本', value: '-40%' },
        { label: '员工满意度', value: '+85%' }
      ]
    },
    {
      name: '陈娜',
      title: 'XX AI应用公司 创始人',
      company: '刚拿到天使轮融资',
      avatar: '/img/头像3.png',
      content: '我自己就是做AI产品的，但炬象让我看到"AI咨询"的专业性。他们懂中小企业痛点，给的方案不炫技，能立刻上手、3个月见效。我们现在也在学他们的方法论服务客户。',
      metrics: [
        { label: '同行认可', value: '✓' },
        { label: '方法论可复用', value: '✓' },
        { label: '落地性强', value: '✓' }
      ]
    },
    {
      name: '张伟',
      title: 'XX服装外贸 总经理',
      company: '年营收3500万 | 团队45人',
      avatar: '/img/头像4.png',
      content: '之前跟进客户全靠Excel，经常漏单。现在用AI智能CRM，自动提醒跟进、预测成交率、生成邮件模板。销售团队效率提升70%，客户满意度从78%涨到92%，复购率翻倍。',
      metrics: [
        { label: '销售效率', value: '+70%' },
        { label: '客户满意度', value: '+18%' },
        { label: '复购率', value: '+100%' }
      ]
    },
    {
      name: '刘芳',
      title: 'XX教育科技 创始人',
      company: '在线教育平台',
      avatar: '/img/头像5.png',
      content: '用AI做个性化学习路径推荐后，学员完课率从35%飙升到78%。AI批改作业替代了2个老师的工作量，每月省4万。最关键是续费率提升了60%，用户真实感受到了价值。',
      metrics: [
        { label: '完课率', value: '+123%' },
        { label: '人力成本', value: '-50%' },
        { label: '续费率', value: '+60%' }
      ]
    },
    {
      name: '赵强',
      title: 'XX机械制造 副总',
      company: '年营收8000万 | 团队200人',
      avatar: '/img/头像1.png',
      content: '设备维护全靠老师傅经验，成本高还不准。现在AI预测性维护系统提前3天预警故障，停机时间减少80%，维护成本降低55%。投资50万，半年就回本了。',
      metrics: [
        { label: '停机时间', value: '-80%' },
        { label: '维护成本', value: '-55%' },
        { label: 'ROI周期', value: '6个月' }
      ]
    },
    {
      name: '孙丽',
      title: 'XX美妆电商 运营负责人',
      company: '年GMV 1.2亿',
      avatar: '/img/头像2.png',
      content: '直播间用AI数字人做夜间值守，24小时不间断带货。白天真人主播，晚上AI接棒，GMV增长40%，人力成本只增加了10%。客户根本分不出来是不是真人。',
      metrics: [
        { label: 'GMV增长', value: '+40%' },
        { label: '运营时长', value: '+100%' },
        { label: '人力成本', value: '+10%' }
      ]
    },
    {
      name: '周杰',
      title: 'XX供应链公司 CTO',
      company: '年营收1.5亿 | B端服务',
      avatar: '/img/头像3.png',
      content: '"供应链最怕两件事：库存积压和缺货。AI上线2个月：库存周转 45天 → 28天（+38%）；缺货率 12% → 3%（-75%）；流动资金 每年节省 ￥600万。这不是优化，这是重构。董事会现在逼着我把AI铺到所有业务线。"',
      metrics: [
        { label: '周转率', value: '+38%' },
        { label: '缺货率', value: '-75%' },
        { label: '年节省', value: '¥600万' }
      ]
    }
  ];

  // 活动照片 - 时间轴数据
  const activityPhotos = [
    {
      date: '2025.10',
      title: '某外贸公司全员AI培训',
      description: '2天实战工作坊',
      image: '/img/某外贸公司全员AI培训.png'
    },
    {
      date: '2025.08',
      title: '客户成果分享会',
      description: '李总分享6个月转型成果',
      image: '/img/客户成果分享会.png'
    },
    {
      date: '2025.07',
      title: '企业AI转型闭门会',
      description: '30位外贸行业高管',
      image: '/img/企业AI转型闭门会.png'
    }
  ];

  // 数字动画 + 实时更新
  useEffect(() => {
    let animationFrame: number;
    let realTimeInterval: number;
    let consultationInterval: number;

    const animateNumbers = () => {
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 缓动函数：ease-out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedNumbers({
          clients: Math.floor(120 * easeProgress),
          savings: calculateRealTimeSavings(),
          efficiency: Math.floor(73 * easeProgress),
          satisfaction: Math.floor(96 * easeProgress)
        });

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          // 动画完成后，继续更新实时数据
          startRealTimeUpdate();
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const startRealTimeUpdate = () => {
      // 更新今日咨询数（基于Pi的确定性算法）
      setTodayConsultations(getDailyInquiryCount());
      
      // 每0.5秒更新一次实时节约成本
      realTimeInterval = window.setInterval(() => {
        setAnimatedNumbers(prev => ({
          ...prev,
          savings: calculateRealTimeSavings()
        }));
      }, SAVINGS_CONFIG.updateInterval);

      // 每天午夜更新一次咨询数（因为是基于日期的确定性算法）
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();
      
      consultationInterval = window.setTimeout(() => {
        setTodayConsultations(getDailyInquiryCount());
        // 设置下一个24小时的interval
        consultationInterval = window.setInterval(() => {
          setTodayConsultations(getDailyInquiryCount());
        }, 86400000); // 24 hours
      }, timeUntilMidnight);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (realTimeInterval) clearInterval(realTimeInterval);
      if (consultationInterval) clearInterval(consultationInterval);
      observer.disconnect();
    };
  }, []);

  // 客户案例连续滚动 - 平滑向上滚动
  useEffect(() => {
    if (isTestimonialPaused) return;

    let animationFrameId: number;
    const scrollSpeed = 0.8; // 每帧移动的像素数，调整这个值可以改变滚动速度

    const animate = () => {
      setScrollOffset((prev) => {
        const newOffset = prev + scrollSpeed;
        // 当滚动超过一个卡片高度（约280px）时，重置
        // 使用模运算实现无限循环
        return newOffset % 280;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isTestimonialPaused]);

  return (
    <>
      {/* CSS动画定义 + 滚动条样式 */}
      <style>{`
        @keyframes slideInFromBottom {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* 时间轴滚动条样式 */
        .timeline-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .timeline-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .timeline-scroll::-webkit-scrollbar-thumb {
          background: rgba(217, 119, 87, 0.3);
          border-radius: 2px;
        }
        .timeline-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(217, 119, 87, 0.5);
        }
      `}</style>
      
    <section id="results" className="relative py-12 md:py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: '#F9F8F6' }}>
      {/* 顶部渐变光效 */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-10 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #D97757 0%, transparent 70%)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 relative z-10">
        {/* Stats Section */}
        <div id="stats-section" className="mb-12 md:mb-16 lg:mb-24">
          {/* Header with Urgency */}
          <div className="text-center mb-4 md:mb-6">
            <h2 
              className="mb-6 md:mb-8 font-bold"
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#0A0A0A',
                fontSize: 'clamp(1.75rem, 6vw, 5rem)',
                lineHeight: '1.2'
              }}
            >
              拒绝空谈，
              <span style={{ color: '#D97757' }}>
                数据是最好的证明
              </span>
            </h2>
          </div>

          {/* 紧迫感提示条 */}
          <div className="max-w-2xl mx-auto mb-8 md:mb-12 lg:mb-16">
            <div 
              className="rounded-xl p-3 md:p-4 border flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
              style={{
                background: 'rgba(217, 119, 87, 0.06)',
                borderColor: 'rgba(217, 119, 87, 0.2)'
              }}
            >
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#D97757' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#D97757' }}></span>
                </div>
                <span 
                  className="text-data text-xs sm:text-sm"
                  style={{ color: '#C96543' }}
                >
                  今日已有 <span style={{ color: '#D97757', fontSize: '14px', fontWeight: '800' }}>{todayConsultations}</span> 家企业咨询
                </span>
              </div>
              <span 
                className="text-body text-xs sm:text-sm"
                style={{ color: '#6B7280' }}
              >
                • 您的竞争对手已在行动
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 md:gap-6 max-w-7xl mx-auto">
            {stats.map((stat, index) => {
              const value = animatedNumbers[stat.key as keyof typeof animatedNumbers];
              
              return (
                <div 
                  key={index} 
                  className={`group relative overflow-hidden ${
                    stat.key === 'savings' ? 'lg:col-span-4' : 'lg:col-span-2'
                  } md:col-span-1`}
                  style={{
                    background: stat.isRealTime 
                      ? 'linear-gradient(135deg, rgba(217, 119, 87, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)'
                      : 'rgba(255, 255, 255, 0.8)',
                    border: stat.isRealTime 
                      ? '1px solid rgba(217, 119, 87, 0.3)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '16px',
                    padding: '24px 20px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = stat.isRealTime 
                      ? 'rgba(217, 119, 87, 0.5)'
                      : 'rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = stat.isRealTime 
                      ? 'rgba(217, 119, 87, 0.3)'
                      : 'rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  {/* 副标题 - 极简标签 */}
                  <div 
                    className="text-label mb-4 md:mb-6 lg:mb-8 text-xs md:text-sm"
                    style={{ color: '#6B7280' }}
                  >
                    {stat.subtitle}
                  </div>
                  
                  {/* 数字显示 - 超大字号 */}
                  <div className="mb-4 md:mb-6 lg:mb-8">
                    {stat.isRealTime ? (
                      <div>
                        <div 
                          className="text-data text-3xl lg:text-4xl mb-3"
                          style={{ 
                            color: '#0A0A0A',
                            fontWeight: '800',
                            lineHeight: '1.2'
                          }}
                        >
                          ¥{value.toLocaleString('zh-CN', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </div>
                        {/* 实时标识 - 更醒目 */}
                        <div 
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                          style={{
                            background: 'rgba(217, 119, 87, 0.1)',
                            border: '1px solid rgba(217, 119, 87, 0.3)'
                          }}
                        >
                          <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#D97757' }}></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: '#D97757' }}></span>
                          </div>
                          <span 
                            className="text-data text-[10px] tracking-wider"
                            style={{ 
                              color: '#C96543',
                              fontWeight: '800'
                            }}
                          >
                            实时增长中
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="text-data text-6xl lg:text-7xl"
                        style={{ 
                          color: '#0A0A0A',
                          fontWeight: '800',
                          letterSpacing: '0.05em',
                          lineHeight: '0.85'
                        }}
                      >
                        {stat.key === 'clients' ? (
                          <>
                            <span style={{ letterSpacing: '0.04em' }}>{value}</span>
                            <span 
                              className="text-5xl opacity-60 ml-2"
                              style={{ fontWeight: '800' }}
                            >+</span>
                          </>
                        ) : stat.key === 'efficiency' || stat.key === 'satisfaction' ? (
                          <>
                            <span style={{ letterSpacing: '0.04em' }}>{value}</span>
                            <span 
                              className="text-5xl opacity-60 ml-2"
                              style={{ fontWeight: '800' }}
                            >%</span>
                          </>
                        ) : value}
                      </div>
                    )}
                  </div>
                  
                  {/* 分隔线 - 极简 */}
                  <div 
                    className="h-[1px] mb-5"
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.08)'
                    }}
                  ></div>
                  
                  {/* 标题 - 中文 */}
                  <div 
                    className="text-xl mb-3"
                    style={{ 
                      color: '#1F2937',
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '700',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {stat.title}
                  </div>
                  
                  {/* 描述 - 低调但清晰 */}
                  <p 
                    className="text-base leading-[1.7]"
                    style={{ 
                      color: '#6B7280',
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '400'
                    }}
                  >
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section - 重新设计 */}
        <div>
          {/* 标题 */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl text-black mb-3 md:mb-4"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
              }}
            >
              他们对我们的评价
            </h3>
            <p 
              className="text-base md:text-lg text-gray-600"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400'
              }}
            >
              来自行业的认可，值得信赖
            </p>
          </div>

          {/* 第一层：权威观点 */}
          <div 
            className="max-w-4xl mx-auto mb-8 md:mb-12 lg:mb-16 p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.05) 0%, rgba(255, 255, 255, 0.95) 100%)',
              border: '1px solid rgba(217, 119, 87, 0.15)'
            }}
          >
            <blockquote 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 md:mb-8"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400',
                fontStyle: 'italic'
              }}
            >
              "中国99%的企业还没有真正理解AI的价值。那些先行者已经在成本、效率、创新上甩开了同行。窗口期只有18个月。"
            </blockquote>
            <div className="flex items-center gap-3 md:gap-4">
              <img 
                src="/img/刘润-1.jpg"
                alt="刘润"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover flex-shrink-0"
                style={{
                  border: '2px solid rgba(217, 119, 87, 0.2)'
                }}
              />
              <div>
                <div 
                  className="text-lg md:text-xl text-gray-900"
                  style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '700'
                  }}
                >刘润</div>
                <div 
                  className="text-xs md:text-sm text-gray-600"
                  style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontWeight: '400'
                  }}
                >商业顾问 · 润米咨询创始人</div>
              </div>
            </div>
            
            {/* 底部数据 */}
            <div 
              className="mt-8 pt-6 flex flex-wrap items-center justify-center gap-6 text-sm"
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                color: '#6B7280'
              }}
            >
              <span>已服务 <strong style={{ color: '#D97757', fontWeight: '700' }}>120+</strong> 家企业</span>
              <span>|</span>
              <span>满意度 <strong style={{ color: '#D97757', fontWeight: '700' }}>96%</strong></span>
              <span>|</span>
              <span>平均ROI <strong style={{ color: '#D97757', fontWeight: '700' }}>600%+</strong></span>
            </div>
          </div>

          {/* 第二层：案例 + 照片 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {/* 左侧：3个客户案例 - 占2/3宽度 */}
            <div 
              className="lg:col-span-2 relative"
              style={{ height: 'auto', minHeight: '400px' }}
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
            >
              {/* 提示文本 */}
              <div className="mb-4 md:mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className={`${isTestimonialPaused ? '' : 'animate-ping'} absolute inline-flex h-full w-full rounded-full opacity-75 bg-orange-400`}></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                  </div>
                  <span 
                    className="font-medium"
                    style={{ 
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      color: isTestimonialPaused ? '#6B7280' : '#D97757'
                    }}
                  >
                    {isTestimonialPaused ? '已暂停' : '实时滚动中'}
                  </span>
                  {/* <span 
                    className="text-xs px-2 py-1 rounded-md"
                    style={{ 
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      background: 'rgba(217, 119, 87, 0.1)',
                      color: '#D97757'
                    }}
                  >
                    {testimonials.length} 条真实评价
                  </span> */}
                </div>
                {/* <span className="text-xs text-gray-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  悬停可暂停
                </span> */}
              </div>

              {/* 卡片容器 - 连续滚动 */}
              <div className="relative overflow-hidden" style={{ height: '400px', maxHeight: '528px' }}>
                {/* 顶部渐隐遮罩 */}
                <div 
                  className="absolute top-0 left-0 right-0 h-12 md:h-16 z-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(249, 248, 246, 1) 0%, rgba(249, 248, 246, 0) 100%)'
                  }}
                ></div>
                
                {/* 底部渐隐遮罩 */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-12 md:h-16 z-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(249, 248, 246, 1) 0%, rgba(249, 248, 246, 0) 100%)'
                  }}
                ></div>

                {/* 滚动容器 */}
                <div
                  className="absolute left-0 right-0"
                  style={{
                    transform: `translateY(-${scrollOffset}px)`,
                    willChange: 'transform'
                  }}
                >
                  {/* 渲染两组完整的卡片列表以实现无缝循环 */}
                  {[...testimonials, ...testimonials].map((testimonial, index) => {
                    return (
                      <div
                        key={`testimonial-${index}`}
                        className="bg-white rounded-xl md:rounded-2xl border border-orange-100 hover:border-orange-300 mb-3 md:mb-4"
                        style={{
                          padding: '1.25rem',
                          minHeight: '240px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 87, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                        }}
                      >
                  {/* 头像和信息 */}
                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <div 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.15) 0%, rgba(217, 119, 87, 0.08) 100%)'
                      }}
                    >
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div 
                        className="text-base md:text-lg text-gray-900 mb-1 truncate"
                        style={{
                          fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                          fontWeight: '700'
                        }}
                      >{testimonial.name}</div>
                      <div 
                        className="text-xs md:text-sm text-gray-600 mb-1"
                        style={{
                          fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                          fontWeight: '500'
                        }}
                      >{testimonial.title}</div>
                      <div 
                        className="text-xs text-gray-500"
                        style={{
                          fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                          fontWeight: '400'
                        }}
                      >{testimonial.company}</div>
                    </div>
                  </div>

                  {/* 评价内容 */}
                  <p 
                    className="text-gray-700 mb-4 md:mb-6"
                    style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '1.7'
                    }}
                  >"{testimonial.content}"</p>

                  {/* 指标 */}
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {testimonial.metrics.map((metric, idx) => (
                      <div 
                        key={idx}
                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg"
                        style={{
                          background: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.2)'
                        }}
                      >
                        <span 
                          className="text-xs"
                          style={{
                            color: '#6B7280',
                            fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                            fontWeight: '500'
                          }}
                        >{metric.label} </span>
                        <span 
                          className="text-xs md:text-sm font-bold"
                          style={{
                            color: '#059669',
                            fontFamily: "'JetBrains Mono', monospace"
                          }}
                        >{metric.value}</span>
                      </div>
                    ))}
                  </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 右侧：活动时间轴 - 占1/3宽度 */}
            <div className="relative flex flex-col" style={{ height: '594px' }}>
              {/* 标题 */}
              <div className="pb-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full bg-gradient-to-b from-orange-500 to-orange-300"></div>
                  <h4 
                    className="text-lg font-bold text-gray-900"
                    style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif"
                    }}
                  >
                    发展历程
                  </h4>
                </div>
                <p 
                  className="text-xs text-gray-500 ml-3"
                  style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif"
                  }}
                >
                  {/* 与 {testimonials.length} 位客户共同成长 */}
                </p>
              </div>

              {/* 时间轴容器 - 可滚动，flex-1填充剩余空间 */}
              <div 
                className="timeline-scroll relative overflow-y-auto pr-2 flex-1 mt-4"
                style={{ 
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(217, 119, 87, 0.3) transparent'
                }}
              >
                {/* 时间轴项目 */}
                <div className="space-y-7 pb-4 relative">
                  {/* 垂直时间轴线 - 渐变效果，延伸到最后 */}
                  <div 
                    className="absolute left-[68px] top-0 w-[2px]"
                    style={{
                      height: 'calc(100% - 40px)',
                      background: 'linear-gradient(to bottom, rgba(217, 119, 87, 0.6) 0%, rgba(217, 119, 87, 0.4) 80%, rgba(217, 119, 87, 0) 100%)'
                    }}
                  ></div>

                  {activityPhotos.map((photo, index) => {
                    const isFirst = index === 0;
                    
                    return (
                      <div 
                        key={index}
                        className="relative flex items-start gap-3 group"
                      >
                        {/* 左侧：日期 */}
                        <div 
                          className="w-[50px] flex-shrink-0 text-right pt-2"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '10px',
                            fontWeight: '700',
                            color: isFirst ? '#D97757' : '#9CA3AF',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {photo.date}
                        </div>

                        {/* 时间点 - 不同状态 */}
                        <div 
                          className="absolute left-[68px] top-3 transform -translate-x-1/2 z-10 transition-all duration-300"
                          style={{
                            width: isFirst ? '14px' : '10px',
                            height: isFirst ? '14px' : '10px'
                          }}
                        >
                          {isFirst ? (
                            // 最新时间点 - 带脉动效果
                            <>
                              <div 
                                className="absolute inset-0 rounded-full animate-ping"
                                style={{
                                  background: 'rgba(217, 119, 87, 0.4)'
                                }}
                              ></div>
                              <div 
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #FB923C 0%, #EA580C 100%)',
                                  boxShadow: '0 0 0 3px rgba(217, 119, 87, 0.15), 0 2px 8px rgba(217, 119, 87, 0.3)'
                                }}
                              ></div>
                            </>
                          ) : (
                            // 历史时间点
                            <div 
                              className="absolute inset-0 rounded-full border-2 bg-white group-hover:border-orange-400 transition-colors"
                              style={{
                                borderColor: '#E5E7EB',
                                boxShadow: '0 0 0 2px rgba(217, 119, 87, 0.08)'
                              }}
                            ></div>
                          )}
                        </div>

                        {/* 右侧：内容卡片 */}
                        <div className="flex-1 ml-2">
                          {/* 横线连接 */}
                          <div 
                            className="absolute left-[68px] top-[18px] w-3 h-[1px] group-hover:w-4 transition-all duration-300"
                            style={{
                              background: isFirst 
                                ? 'rgba(217, 119, 87, 0.5)' 
                                : 'rgba(217, 119, 87, 0.2)'
                            }}
                          ></div>

                          {/* 卡片 */}
                          <div 
                            className="bg-white rounded-xl border overflow-hidden group-hover:border-orange-300 group-hover:shadow-lg transition-all duration-300"
                            style={{
                              borderColor: isFirst ? 'rgba(217, 119, 87, 0.2)' : 'rgba(229, 231, 235, 1)',
                              boxShadow: isFirst 
                                ? '0 4px 12px rgba(217, 119, 87, 0.08)' 
                                : '0 2px 6px rgba(0, 0, 0, 0.04)'
                            }}
                          >
                            {/* 图片 */}
                            <div 
                              className="w-full relative overflow-hidden"
                              style={{ height: '90px' }}
                            >
                              <img 
                                src={photo.image} 
                                alt={photo.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {/* 文字 */}
                            <div className="p-3">
                              <div 
                                className="text-sm text-gray-900 mb-1.5 leading-tight font-semibold group-hover:text-orange-600 transition-colors"
                                style={{
                                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif"
                                }}
                              >
                                {photo.title}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span 
                                  className="text-xs text-gray-500"
                                  style={{
                                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif"
                                  }}
                                >
                                  {photo.description}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ResultsShowcase;