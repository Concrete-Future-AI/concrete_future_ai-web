import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import FeaturePreviewModal from '../components/FeaturePreviewModal';

const EnterpriseAIPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<'default' | 'ai-diagnosis'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'geo' | 'ai-transformation'>('geo');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const openModal = (context: 'default' | 'ai-diagnosis' = 'default') => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsVisible(true);
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const cases = [
    {
      id: 1,
      badge: 'GEO优化',
      company: '某SaaS企业',
      industry: '企业服务 · 150人',
      challenge: '月投20万竞价广告，获客成本¥2000/人，停投就没流量',
      solution: 'GEO优化，让ChatGPT/Perplexity主动推荐品牌',
      results: [
        { number: '85%', label: 'AI推荐率' },
        { number: '120', label: '月均咨询' },
        { number: '¥210万', label: '年省营销费' },
      ],
    },
    {
      id: 2,
      badge: 'AI化转型',
      company: '某制造企业',
      industry: '工业制造 · 500人',
      challenge: '销售团队50人，客户跟进效率低，成交率仅18%',
      solution: 'CRM智能管理+销售助手，自动分析客户需求',
      results: [
        { number: '78%', label: '效率提升' },
        { number: '42%', label: '成交率' },
        { number: '¥300万', label: '年省成本' },
      ],
    },
    {
      id: 3,
      badge: 'AI化转型',
      company: '某零售连锁',
      industry: '零售 · 800人',
      challenge: '年招聘300人，HR仅5人，招聘周期45天',
      solution: 'HR智能系统，自动筛选简历、安排面试',
      results: [
        { number: '65%', label: '效率提升' },
        { number: '20天', label: '招聘周期' },
        { number: '40%', label: '留存率提升' },
      ],
    },
  ];

  const features = [
    {
      id: 'local-llm',
      category: 'efficiency',
      title: '本地部署大模型平台',
      coreValue: '数据100%私有，无外网依赖，企业完全控制AI能力',
      suitableFor: '对数据安全敏感的大型企业、金融机构、政府机构',
      tag: 'AI基础设施',
    },
    {
      id: 'crm-ai',
      category: 'growth',
      title: 'CRM智能管理',
      coreValue: '销售效率提升78%，成交率提升35%，年省300万人力成本',
      suitableFor: 'B2B企业、大客户销售、复杂产品销售场景',
      tag: '销售赋能',
    },
    {
      id: 'sales-ai',
      category: 'growth',
      title: '销售智能助手',
      coreValue: '销售预测准确率92%，商机转化率提升58%，客户流失率降低45%',
      suitableFor: '零售、制造、大客户销售等需要销售预测的企业',
      tag: '销售增长',
    },
    {
      id: 'marketing-ai',
      category: 'growth',
      title: '营销增长引擎',
      coreValue: '营销ROI提升4.2倍，内容产出速度提升10倍，获客成本降低65%',
      suitableFor: '电商、广告、媒体、品牌营销等内容驱动型企业',
      tag: '营销获客',
    },
    {
      id: 'knowledge-base',
      category: 'efficiency',
      title: '企业知识库',
      coreValue: '知识检索效率提升10倍（30分钟→3分钟），新员工培训周期缩短60%',
      suitableFor: '制造业、专业服务、技术公司等知识密集型企业',
      tag: '知识管理',
    },
    {
      id: 'finance-ai',
      category: 'operation',
      title: '财务智能管理',
      coreValue: '财务处理效率提升80%，报表生成时间缩短90%（2天→2小时）',
      suitableFor: '大型集团、财务密集型企业、需要严格财务管理的公司',
      tag: '财务管理',
    },
    {
      id: 'hr-ai',
      category: 'efficiency',
      title: 'HR智能管理',
      coreValue: '招聘效率提升65%，员工留存率提升40%，员工满意度92%',
      suitableFor: '大规模招聘企业、人力外包、猎头公司',
      tag: '人力资源',
    },
    {
      id: 'supply-chain',
      category: 'operation',
      title: '供应链优化',
      coreValue: '库存成本降低30%，缺货率降低85%，物流成本降低22%',
      suitableFor: '零售、制造、物流、快消品等供应链复杂行业',
      tag: '运营优化',
    },
    {
      id: 'procurement-ai',
      category: 'operation',
      title: '采购智能管理',
      coreValue: '采购成本降低18%，采购周期缩短40%，年节省9000万+',
      suitableFor: '制造业、大型集团、采购密集型企业',
      tag: '采购管理',
    },
  ];

  const faqs = [
    {
      question: '企业AI化转型需要多长时间？',
      answer: '标准实施周期为90天。分5个阶段：需求诊断→方案设计→系统开发→部署培训→持续优化，每周可见进展。',
    },
    {
      question: '投资回报率（ROI）是多少？',
      answer: '平均ROI为350%，投资回收期3-6个月。案例：50人客服团队年成本360万，AI后缩减至15人，年省252万，4-5个月回本。',
    },
    {
      question: '中小企业适合做AI化转型吗？',
      answer: '非常适合50-500人规模企业。建议从单一场景切入（客服、文档），先验证价值再扩展。SaaS模式初期投入可控。',
    },
    {
      question: 'GEO优化多久能见效？',
      answer: '通常30天内见效。我们测试ChatGPT/Perplexity/Gemini对您品牌的推荐率，目标80%+。未达标全额退款。',
    },
    {
      question: '数据安全如何保障？',
      answer: '私有化部署+数据加密+权限管理三重保障。敏感数据可部署企业内网，所有传输TLS加密，符合等保2.0和GDPR标准。',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: '需求诊断（第1-7天）',
      work: '深度调研业务流程，访谈各部门关键人员，识别高价值应用场景，评估技术可行性',
      deliverables: '业务流程分析报告、痛点优先级清单、AI应用场景建议',
    },
    {
      number: '02',
      title: '方案设计（第8-21天）',
      work: '定制化技术方案设计，明确功能清单和KPI指标，制定详细项目计划，计算投资回报',
      deliverables: '技术方案文档、项目计划甘特图、ROI预测模型',
    },
    {
      number: '03',
      title: '系统开发（第22-66天）',
      work: '敏捷开发核心功能，每周演示进展，根据反馈迭代优化，完成系统测试和优化',
      deliverables: '可运行的AI系统、测试报告、操作手册',
    },
    {
      number: '04',
      title: '部署培训（第67-80天）',
      work: '系统正式上线，团队使用培训，建立运营SOP，监控系统稳定性',
      deliverables: '上线运行的系统、培训手册、运营SOP文档',
    },
    {
      number: '05',
      title: '持续优化（第81-90天）',
      work: '收集用户反馈，数据驱动优化，修复bug，迭代新功能，输出效果评估报告',
      deliverables: '优化迭代版本、效果评估报告（含ROI实际数据）',
    },
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF6F1', fontFamily: "'Work Sans', 'Noto Sans SC', sans-serif" }}>
      <style>{`
        :root {
          --primary-burgundy: #6B0F1A;
          --secondary-burgundy: #8B2332;
          --accent-burgundy: #AB3544;
          --cream-white: #FAF6F1;
          --warm-cream: #F5EFE6;
          --soft-gold: #D4A574;
        }
        
        .font-display {
          font-family: 'Fraunces', Georgia, serif;
        }
        
        .font-body {
          font-family: 'Work Sans', 'Noto Sans SC', sans-serif;
        }

        .btn-primary-burgundy {
          background: linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%);
          color: #FAF6F1;
          transition: all 0.3s ease;
        }
        
        .btn-primary-burgundy:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(107, 15, 26, 0.3);
        }

        .btn-gold {
          background: #D4A574;
          color: #1A1A1A;
          transition: all 0.3s ease;
        }

        .btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 165, 116, 0.4);
        }

        .metric-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(107, 15, 26, 0.15);
        }

        .case-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(107, 15, 26, 0.12);
        }

        .feature-card:hover {
          transform: scale(1.02);
          border-color: #AB3544;
        }

        .timeline-item:hover .timeline-content {
          transform: translateX(12px);
          border-color: #AB3544;
        }

        .faq-highlight {
          display: inline;
          padding: 0.1rem 0.5rem;
          background: #D4A574;
          color: #1A1A1A;
          border-radius: 3px;
          font-weight: 600;
        }
      `}</style>

      {/* Navigation - Unified Header Style */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        style={{
          background: 'rgba(250, 246, 241, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(107, 15, 26, 0.08)',
          boxShadow: '0 2px 12px rgba(107, 15, 26, 0.04)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-[72px] flex justify-between items-center gap-12">
          {/* Left: Logo + Back Button */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link to="/" className="flex flex-col group">
              <div className="flex items-center gap-1.5">
                <span 
                  className="text-xl font-black transition-colors group-hover:text-[#6B0F1A]"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif", color: '#0A0A0A' }}
                >
                  炬象未来
                </span>
                <span 
                  className="w-1.5 h-1.5 rounded-sm transition-transform group-hover:scale-125"
                  style={{ backgroundColor: '#6B0F1A' }}
                ></span>
              </div>
              <span 
                className="text-[8px] uppercase tracking-[0.15em] text-gray-400 mt-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              >
                CONCRETE FUTURE AI
              </span>
            </Link>
            
            <div 
              className="w-px h-8 hidden md:block"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(107,15,26,0.1) 50%, rgba(0,0,0,0) 100%)' }}
            ></div>
            
            <Link 
              to="/" 
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-[#6B0F1A] hover:bg-[rgba(107,15,26,0.05)] transition-all"
              style={{ fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif", fontWeight: 500 }}
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              <span>返回主页</span>
            </Link>
          </div>

          {/* Center: Page Navigation */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {[
              { href: '#service-overview', label: '服务概览' },
              { href: '#features', label: '9大场景' },
              { href: '#faq', label: '常见问题' },
              { href: '#contact', label: '联系我们' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-5 py-2 text-sm text-gray-500 hover:text-[#6B0F1A] hover:bg-[rgba(107,15,26,0.05)] rounded-lg transition-all relative"
                style={{ fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif", fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={() => openModal('ai-diagnosis')}
              className="px-7 py-3 rounded-lg text-sm text-white font-bold transition-all hover:-translate-y-0.5"
              style={{ 
                background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)',
                boxShadow: '0 2px 12px rgba(107, 15, 26, 0.3)',
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: 700
              }}
            >
              免费获取诊断报告
            </button>
          </div>
        </div>
      </header>

      {/* Definition Block */}
      <section className="pt-24 pb-8" style={{ backgroundColor: '#F5F5F0', borderBottom: '2px solid #E0E0E0' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#191919' }}>
            什么是企业AI化转型？
          </h1>
          <p className="text-base md:text-lg mb-4" style={{ color: '#333', lineHeight: 1.8 }}>
            <strong>企业AI化转型</strong>是指企业通过引入人工智能技术，系统性地改造业务流程、优化运营效率、提升决策质量的数字化升级过程。核心目标是让AI成为企业的"智能大脑"，自动处理重复性工作，释放人力专注高价值创造。
          </p>
          <p className="text-sm md:text-base" style={{ color: '#666', lineHeight: 1.8 }}>
            <strong>典型应用场景包括：</strong>智能客服（24/7自动响应）、文档自动化（合同审核、报告生成）、数据分析（实时洞察生成）、营销内容创作、销售线索管理、HR招聘筛选、供应链优化、质量检测等9大核心场景。根据行业实践，企业AI化转型平均可实现效率提升300%、成本降低50%，投资回收期通常为3-6个月。
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section 
        className="py-16 md:py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(250,246,241,0.3) 0%, transparent 70%)' }}></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.2) 0%, transparent 70%)' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div 
              className="inline-block px-6 py-3 rounded-full text-sm font-semibold mb-6"
              style={{ 
                background: 'rgba(250,246,241,0.15)', 
                border: '2px solid rgba(250,246,241,0.3)',
                color: '#FAF6F1',
                backdropFilter: 'blur(20px)'
              }}
            >
              企业AI化双核心服务
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ color: '#FAF6F1', lineHeight: 1.15 }}>
              让AI为你带来客户
              <span className="mx-4" style={{ color: '#D4A574' }}>+</span>
              <br className="hidden md:block" />
              让AI为你提升效率
            </h2>
            
            <p className="text-lg md:text-xl mb-10" style={{ color: 'rgba(250,246,241,0.9)' }}>
              GEO生成引擎优化 · AI化转型9大场景 · 已服务100+企业 · 90天交付见效
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { value: '100', unit: '+', label: '服务企业' },
              { value: '90', unit: '天', label: '交付周期' },
              { value: '300', unit: '%', label: '效率提升' },
              { value: '85', unit: '%', label: 'AI推荐成功率' },
            ].map((metric, idx) => (
              <div 
                key={idx}
                className="metric-card p-6 rounded-2xl text-center transition-all duration-300"
                style={{
                  background: 'rgba(250,246,241,0.12)',
                  border: '2px solid rgba(250,246,241,0.2)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#FAF6F1' }}>
                    {metric.value}
                  </span>
                  <span className="font-display text-xl md:text-2xl font-semibold" style={{ color: '#D4A574' }}>
                    {metric.unit}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'rgba(250,246,241,0.85)' }}>{metric.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openModal()}
              className="px-8 py-4 rounded-full text-base font-semibold btn-gold"
            >
              立即咨询服务
            </button>
            <a 
              href="#service-overview"
              className="px-8 py-4 rounded-full text-base font-semibold transition-all"
              style={{ 
                background: 'transparent',
                border: '2px solid rgba(250,246,241,0.5)',
                color: '#FAF6F1'
              }}
            >
              查看服务详情
            </a>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section id="service-overview" className="py-16 md:py-20" style={{ backgroundColor: '#F5EFE6' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: '#6B0F1A' }}>
              我们能帮您的企业做什么？
            </h2>
            <p className="text-lg text-gray-600">两大核心服务，解决企业AI时代的核心难题</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            {[
              {
                number: '01',
                title: 'GEO生成引擎优化',
                tagline: '让ChatGPT主动推荐你的品牌',
                stats: [{ value: '85%', label: 'AI推荐率' }, { value: '30天', label: '见效' }],
              },
              {
                number: '02',
                title: '企业AI化转型',
                tagline: '9大场景覆盖，让AI成为智能大脑',
                stats: [{ value: '300%', label: '效率提升' }, { value: '90天', label: '交付' }],
              },
            ].map((service, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden"
                style={{ boxShadow: '0 4px 20px rgba(107, 15, 26, 0.08)' }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white mb-6 mx-auto"
                  style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' }}
                >
                  {service.number}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#191919' }}>{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.tagline}</p>
                <div className="flex justify-center gap-8 pt-4 border-t border-gray-200">
                  {service.stats.map((stat, sidx) => (
                    <div key={sidx} className="text-center">
                      <p className="text-2xl font-bold" style={{ color: '#6B0F1A' }}>{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center py-4 px-6 rounded-lg text-gray-600" style={{ background: 'rgba(212,165,116,0.1)' }}>
            可单独选择或组合实施 · 灵活定制方案
          </p>
        </div>
      </section>

      {/* Customer Success Cases */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: '#6B0F1A' }}>客户成功案例</h2>
            <p className="text-lg text-gray-600">真实数据 · 真实企业 · 真实效果</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cases.map((c) => (
              <div 
                key={c.id}
                className="case-card rounded-2xl p-6 transition-all duration-300"
                style={{ backgroundColor: '#F5EFE6', boxShadow: '0 4px 16px rgba(107, 15, 26, 0.06)' }}
              >
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
                  style={{ background: '#6B0F1A' }}
                >
                  {c.badge}
                </span>
                <h3 className="text-xl font-bold mb-1">{c.company}</h3>
                <p className="text-sm text-gray-500 mb-4">{c.industry}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(250,246,241,0.5)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: '#6B0F1A' }}>挑战</p>
                    <p className="text-sm text-gray-700">{c.challenge}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(250,246,241,0.5)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: '#6B0F1A' }}>方案</p>
                    <p className="text-sm text-gray-700">{c.solution}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white">
                  <p className="text-xs font-semibold mb-3" style={{ color: '#6B0F1A' }}>效果</p>
                  <div className="grid grid-cols-3 gap-2">
                    {c.results.map((r, ridx) => (
                      <div key={ridx} className="text-center">
                        <p className="text-xl font-bold" style={{ color: '#6B0F1A' }}>{r.number}</p>
                        <p className="text-xs text-gray-500">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ROI Calculator Teaser */}
          <div 
            className="text-center p-8 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #D4A574 0%, #C77E5C 100%)' }}
          >
            <h3 className="text-2xl font-bold mb-3 text-gray-900">想知道AI能为您的企业节省多少成本？</h3>
            <p className="text-gray-700 mb-6">填写简单信息，1分钟获得专属ROI预测报告</p>
            <button 
              onClick={() => openModal('ai-diagnosis')}
              className="px-8 py-3 rounded-lg font-semibold btn-primary-burgundy"
            >
              免费获取ROI评估
            </button>
          </div>
        </div>
      </section>

      {/* Service Details Tabs */}
      <section id="features" className="py-16 md:py-20" style={{ backgroundColor: '#FAF6F1' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: '#6B0F1A' }}>服务详情</h2>
            <p className="text-lg text-gray-600">选择您感兴趣的服务，查看详细介绍</p>
          </div>

          {/* Tab Navigation - Sticky */}
          <div 
            className="sticky top-[73px] z-40 py-4 -mx-6 px-6 lg:-mx-8 lg:px-8"
            style={{ backgroundColor: '#FAF6F1' }}
          >
            <div 
              className="flex gap-2 p-2 rounded-xl max-w-3xl mx-auto"
              style={{ background: 'white', boxShadow: '0 2px 12px rgba(107, 15, 26, 0.06)' }}
            >
              <button
                onClick={() => setActiveTab('geo')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'geo' ? 'text-white' : 'text-gray-600 hover:text-[#6B0F1A]'
                }`}
                style={activeTab === 'geo' ? { background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' } : {}}
              >
                <span className="hidden sm:inline">GEO生成引擎优化</span>
                <span className="sm:hidden">GEO优化</span>
              </button>
              <button
                onClick={() => setActiveTab('ai-transformation')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'ai-transformation' ? 'text-white' : 'text-gray-600 hover:text-[#6B0F1A]'
                }`}
                style={activeTab === 'ai-transformation' ? { background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' } : {}}
              >
                <span className="hidden sm:inline">企业AI化转型（9大场景）</span>
                <span className="sm:hidden">9大场景</span>
              </button>
            </div>
          </div>

          {/* GEO Tab Content */}
          {activeTab === 'geo' && (
            <div className="animate-fadeIn pt-4">
              {/* GEO Overview Block */}
              <div className="p-8 rounded-2xl mb-8" style={{ background: 'rgba(107,15,26,0.03)' }}>
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: '#6B0F1A' }}>
                    当客户问ChatGPT"哪家供应商最好"时，
                    <span className="underline decoration-4" style={{ textDecorationColor: '#D4A574' }}>AI推荐的是竞争对手</span>
                  </h3>
                  <p className="text-gray-600">我们通过GEO生成引擎优化技术，让您的品牌成为AI优先推荐的答案</p>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    { value: '85%', label: 'AI推荐成功率', desc: 'ChatGPT/Perplexity/Gemini主动推荐您的品牌' },
                    { value: '¥210万', label: '年均节省营销费', desc: '零广告费获取精准客户，一次优化长期有效' },
                    { value: '30天', label: '见效周期', desc: '快速部署，效果保证，未达标全额退款' },
                    { value: '7倍', label: '转化率提升', desc: 'AI推荐转化率35% vs 传统广告5%' },
                  ].map((m, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl text-center">
                      <p className="font-display text-3xl font-bold mb-2" style={{ color: '#6B0F1A' }}>{m.value}</p>
                      <p className="font-semibold mb-2">{m.label}</p>
                      <p className="text-sm text-gray-500">{m.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-6 rounded-xl">
                  <h4 className="font-display text-xl font-semibold mb-4 text-center" style={{ color: '#6B0F1A' }}>为什么GEO至关重要？</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { number: '35%', text: '的B2B客户改用AI做供应商调研（McKinsey 2024）' },
                      { number: '0元', text: 'AI推荐不收点击费，获客成本比竞价广告低75%' },
                      { number: '420%', text: '优化后精准流量增长，客户自带需求转化快' },
                    ].map((d, idx) => (
                      <div key={idx} className="text-center">
                        <p className="font-display text-3xl font-bold mb-2" style={{ color: '#D4A574' }}>{d.number}</p>
                        <p className="text-sm text-gray-600">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search Comparison Block */}
              <div className="mb-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: '#6B0F1A' }}>
                  搜索方式已经改变，您的营销策略需要升级
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Traditional Search */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 opacity-90">
                    <div className="text-center py-3 bg-gray-100">
                      <span className="text-sm font-semibold text-gray-600">传统搜索引擎</span>
                    </div>
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                      </div>
                      <span className="text-sm text-gray-500">百度 / Google</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-full mb-4">
                        <span className="text-gray-400">搜索</span>
                        <span className="text-gray-600">企业服务哪家好？</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="p-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-400">
                          <span className="text-xs bg-yellow-400 text-white px-2 py-0.5 rounded mr-2">广告</span>
                          <span className="text-sm">某公司 (¥50/点击)</span>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-400">
                          <span className="text-xs bg-yellow-400 text-white px-2 py-0.5 rounded mr-2">广告</span>
                          <span className="text-sm">另一家 (¥45/点击)</span>
                        </div>
                        <div className="p-3 text-sm text-blue-600 border-b border-gray-100">
                          您的公司（第15位，客户很难找到）
                        </div>
                      </div>
                      <div className="p-3 rounded-lg text-sm text-center" style={{ background: 'rgba(171,53,68,0.1)', color: '#AB3544' }}>
                        客户迷失在广告海洋中，月花20万依然获客难
                      </div>
                    </div>
                  </div>

                  {/* AI Search */}
                  <div className="bg-white rounded-2xl overflow-hidden border-2" style={{ borderColor: '#6B0F1A' }}>
                    <div className="text-center py-3" style={{ background: '#D4A574' }}>
                      <span className="text-sm font-semibold text-gray-900">AI搜索引擎</span>
                    </div>
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                      </div>
                      <span className="text-sm text-gray-500">ChatGPT / Claude / Perplexity</span>
                    </div>
                    <div className="p-4">
                      <div className="flex gap-3 mb-4 justify-end">
                        <div className="p-3 rounded-2xl rounded-tr-sm max-w-[80%]" style={{ background: 'rgba(107,15,26,0.05)' }}>
                          <span className="text-sm">企业服务哪家好？给我推荐靠谱的</span>
                        </div>
                      </div>
                      <div className="flex gap-3 mb-4">
                        <div className="p-4 rounded-2xl rounded-tl-sm flex-1 border-l-4" style={{ background: '#F5EFE6', borderColor: '#6B0F1A' }}>
                          <p className="text-sm mb-2"><strong style={{ color: '#6B0F1A' }}>我推荐 [您的品牌]</strong>，理由如下：</p>
                          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li>客户效率提升平均300%，投资回收期3-6个月</li>
                            <li>已服务100+企业，客户满意度92%</li>
                            <li>提供90天交付保障和完善的售后支持</li>
                          </ul>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg text-sm text-center" style={{ background: 'rgba(107,15,26,0.1)', color: '#6B0F1A' }}>
                        AI直接指名推荐，月均120个精准客户上门咨询
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparison Section - Two Column Layout */}
                <div className="mb-8">
                  <h4 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: '#6B0F1A' }}>
                    您现在 vs GEO优化后的数据对比
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Column - Old Way */}
                    <div className="p-6 rounded-2xl" style={{ background: '#F0EDE8', border: '1px solid #E0DDD8' }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D5D0C8' }}>
                          <span className="text-gray-500 text-lg">📉</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-500">现在</h5>
                          <p className="text-xs text-gray-400">传统营销方式</p>
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        {[
                          { metric: '月度营销投入', value: '¥20万', sub: '竞价广告', barWidth: '90%' },
                          { metric: '月均咨询量', value: '30-50个', sub: '质量参差', barWidth: '35%' },
                          { metric: '获客成本', value: '¥2000/人', sub: '持续攀升', barWidth: '85%' },
                          { metric: '转化率', value: '5%', sub: '广告点击', barWidth: '15%' },
                          { metric: '客户信任度', value: '低', sub: '广告疲劳', barWidth: '20%' },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-baseline mb-2">
                              <span className="text-sm text-gray-500">{item.metric}</span>
                              <div className="text-right">
                                <span className="text-base text-gray-600">{item.value}</span>
                                <span className="text-xs text-gray-400 ml-1">({item.sub})</span>
                              </div>
                            </div>
                            <div className="h-2 rounded-full" style={{ background: '#E0DDD8' }}>
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: item.barWidth, background: '#B0A898' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column - New Way (Elevated) */}
                    <div 
                      className="p-6 rounded-2xl bg-white relative"
                      style={{ 
                        boxShadow: '0 20px 60px rgba(139, 35, 35, 0.15), 0 8px 24px rgba(139, 35, 35, 0.1)',
                        border: '2px solid #8B2323'
                      }}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#8B2323' }}>
                        推荐方案
                      </div>
                      
                      <div className="flex items-center gap-3 mb-6 mt-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(139, 35, 35, 0.1)' }}>
                          <span className="text-lg">🚀</span>
                        </div>
                        <div>
                          <h5 className="font-semibold" style={{ color: '#8B2323' }}>GEO优化后</h5>
                          <p className="text-xs text-gray-500">AI自然推荐</p>
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        {[
                          { metric: '月度营销投入', value: '¥0', sub: 'AI自然推荐', barWidth: '5%', improvement: '↓100%' },
                          { metric: '月均咨询量', value: '120个', sub: '精准客户', barWidth: '95%', improvement: '↑240%' },
                          { metric: '获客成本', value: '¥500/人', sub: '大幅下降', barWidth: '25%', improvement: '↓75%' },
                          { metric: '转化率', value: '35%', sub: 'AI推荐', barWidth: '85%', improvement: '↑600%' },
                          { metric: '客户信任度', value: '高', sub: 'AI背书', barWidth: '90%', improvement: '↑350%' },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-baseline mb-2">
                              <span className="text-sm text-gray-600 font-medium">{item.metric}</span>
                              <div className="text-right flex items-center gap-2">
                                <span className="text-base font-bold" style={{ color: '#8B2323' }}>{item.value}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(139, 35, 35, 0.1)', color: '#8B2323' }}>
                                  {item.improvement}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2.5 rounded-full" style={{ background: '#F5EFE6' }}>
                                <div 
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ 
                                    width: item.barWidth, 
                                    background: 'linear-gradient(90deg, #8B2323 0%, #AB3544 100%)'
                                  }}
                                />
                              </div>
                              <span className="text-xs text-gray-400 w-16 text-right">({item.sub})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>



                  {/* Case Study Testimonial Banner */}
                  <div 
                    className="mt-8 p-6 md:p-8 rounded-2xl relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' }}
                  >
                    <div className="absolute top-4 left-6 text-6xl opacity-20" style={{ color: '#D4A574' }}>"</div>
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                      <p className="text-lg md:text-xl text-white leading-relaxed mb-4 italic">
                        GEO优化3个月后，我们从月投20万广告费降到零，但咨询量反而从50个涨到了120个。
                        成交42单，年省营销费<span className="font-bold" style={{ color: '#D4A574' }}>¥210万</span>。
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'rgba(255,255,255,0.15)' }}>
                          某
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold">某SaaS企业 · 市场总监</p>
                          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>企业服务 · 150人规模</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-6 text-6xl opacity-20 rotate-180" style={{ color: '#D4A574' }}>"</div>
                  </div>
                </div>
              </div>

              {/* Technical Principle Block */}
              <div className="mb-8 p-8 rounded-2xl" style={{ background: '#F5EFE6' }}>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: '#6B0F1A' }}>
                  如何让AI识别并推荐您的品牌？
                </h3>
                <p className="text-center text-gray-600 mb-8">通过结构化数据重构 + LLMS.txt文件，让AI精准理解您的业务价值</p>

                <div className="bg-white p-6 rounded-xl mb-8">
                  <h4 className="font-display text-lg font-semibold mb-6 text-center" style={{ color: '#6B0F1A' }}>技术原理：AI如何识别您</h4>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {[
                      { num: '01', title: '原网站状态', desc: 'AI看到的是HTML代码，无法理解业务价值和核心优势' },
                      { num: '02', title: 'GEO结构化改造', desc: '通过Schema.org标记 + LLMS.txt文件，让AI准确抓取核心信息' },
                      { num: '03', title: 'AI知识库收录', desc: 'AI将您的品牌存入知识库，客户提问时优先推荐您' },
                    ].map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="text-center flex-1">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3"
                            style={{ background: '#D4A574' }}
                          >
                            {step.num}
                          </div>
                          <h5 className="font-semibold mb-2" style={{ color: '#6B0F1A' }}>{step.title}</h5>
                          <p className="text-sm text-gray-600">{step.desc}</p>
                        </div>
                        {idx < 2 && <div className="hidden md:block text-2xl text-gray-300">→</div>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* 30-Day Implementation */}
                <div className="bg-white p-6 rounded-xl">
                  <h4 className="font-display text-lg font-semibold mb-6 text-center" style={{ color: '#6B0F1A' }}>30天实施流程与交付标准</h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {[
                      {
                        phase: '第1-7天',
                        title: '诊断评估阶段',
                        weDo: '分析您的官网，测试ChatGPT/Perplexity/Gemini对您的识别度，生成详细诊断报告',
                        youDo: '提供官网链接，30分钟电话沟通核心业务',
                        deliverable: 'AI识别度诊断报告 + GEO优化方案',
                      },
                      {
                        phase: '第8-21天',
                        title: '内容优化阶段',
                        weDo: '改写官网内容为AI可理解格式，添加结构化数据，创建LLMS.txt文件',
                        youDo: '审核优化内容，提供网站后台权限',
                        deliverable: '优化后的网站代码 + 结构化数据配置',
                      },
                      {
                        phase: '第22-30天',
                        title: '验证监控阶段',
                        weDo: '测试AI推荐成功率，监控流量变化，每周发送数据报告',
                        youDo: '查看数据报告，记录客户来源',
                        deliverable: 'AI推荐率监控报告 + 流量增长分析',
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-lg border-l-4" style={{ background: '#F5EFE6', borderColor: '#D4A574' }}>
                        <span 
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                          style={{ background: '#6B0F1A' }}
                        >
                          {item.phase}
                        </span>
                        <h5 className="font-semibold mb-3" style={{ color: '#6B0F1A' }}>{item.title}</h5>
                        <div className="space-y-2 text-sm">
                          <p><strong className="text-gray-700">我们做：</strong><span className="text-gray-600">{item.weDo}</span></p>
                          <p><strong className="text-gray-700">您需做：</strong><span className="text-gray-600">{item.youDo}</span></p>
                          <p><strong className="text-gray-700">交付物：</strong><span className="text-gray-600">{item.deliverable}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div 
                    className="p-4 rounded-lg flex items-center gap-4"
                    style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' }}
                  >
                    <span className="text-2xl">🛡️</span>
                    <p className="text-white text-sm">
                      <strong>效果保证：</strong>30天内AI推荐率达到<span className="font-bold" style={{ color: '#D4A574' }}>80%+</span>，否则全额退款。已服务100+企业，成功率<span className="font-bold" style={{ color: '#D4A574' }}>98%</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* GEO CTA */}
              <div 
                className="p-8 rounded-2xl text-center text-white"
                style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' }}
              >
                <span 
                  className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
                  style={{ background: '#D4A574', color: '#1A1A1A' }}
                >
                  限时免费
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">免费GEO诊断服务（价值¥2万）</h3>
                <p className="mb-6 opacity-95">我们将测试ChatGPT、Perplexity、Gemini等主流AI对您品牌的识别度，并提供详细优化方案</p>
                <div className="flex flex-wrap justify-center gap-3 mb-6 max-w-2xl mx-auto">
                  {['AI推荐率现状测试', '竞争对手GEO分析', 'ROI预测报告', '定制化优化方案'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => openModal('ai-diagnosis')} className="px-8 py-3 rounded-lg font-semibold btn-gold">
                  立即预约免费诊断
                </button>
                <p className="mt-4 text-sm opacity-90">已有<strong>100+</strong>企业通过GEO优化获得AI精准推荐</p>
              </div>
            </div>
          )}

          {/* AI Transformation Tab Content */}
          {activeTab === 'ai-transformation' && (
            <div className="animate-fadeIn pt-4">
              <h3 className="font-display text-2xl md:text-4xl font-bold text-center mb-4" style={{ color: '#6B0F1A' }}>
                9大核心应用场景
              </h3>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                覆盖销售、营销、客服、HR、供应链等高频业务场景，每个场景都有成熟方案和真实案例验证
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  { key: 'all', label: '全部场景' },
                  { key: 'growth', label: '增长类' },
                  { key: 'efficiency', label: '提效类' },
                  { key: 'operation', label: '运营类' },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === cat.key
                        ? 'text-white'
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-[#8B2332] hover:text-[#6B0F1A]'
                    }`}
                    style={activeCategory === cat.key ? { background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' } : {}}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    onClick={() => setSelectedFeature(feature.id)}
                    className="feature-card bg-white p-6 rounded-2xl border-2 border-transparent transition-all duration-300 cursor-pointer group"
                    style={{ boxShadow: '0 4px 16px rgba(107, 15, 26, 0.06)' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: 'rgba(107,15,26,0.08)', color: '#8B2332' }}
                      >
                        {feature.tag}
                      </span>
                      <span className="text-gray-400 group-hover:text-[#6B0F1A] transition-colors text-sm">
                        点击查看详情 →
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3" style={{ color: '#6B0F1A' }}>{feature.title}</h4>
                    <p className="text-sm text-gray-700 mb-2"><strong>核心价值：</strong>{feature.coreValue}</p>
                    <p className="text-sm text-gray-500"><strong>适用企业：</strong>{feature.suitableFor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: '#6B0F1A' }}>常见问题</h2>
            <p className="text-lg text-gray-600">关于企业AI化转型和GEO服务的常见疑问解答</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl" style={{ backgroundColor: '#F5F5F0' }}>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-3" style={{ color: '#191919' }}>
                  <span 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: '#6B0F1A' }}
                  >
                    Q
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-11" dangerouslySetInnerHTML={{ 
                  __html: faq.answer.replace(/(\d+%|\d+天|\d+-\d+个月|90天|80%\+|全额退款)/g, '<span class="faq-highlight">$1</span>')
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-20" style={{ backgroundColor: '#F5EFE6' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: '#6B0F1A' }}>
              标准化实施流程（90天交付）
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              5个阶段，每个阶段都有明确交付物和验收标准 · 采用敏捷开发模式，每周可见进展
            </p>
          </div>

          <div className="relative">
            {/* Connection Line (Desktop) - Behind circles */}
            <div 
              className="hidden md:block absolute left-[80px] top-20 bottom-20 w-1 rounded-full -z-0"
              style={{ background: 'linear-gradient(180deg, #6B0F1A 0%, #AB3544 100%)' }}
            />

            <div className="space-y-8 relative z-10">
              {processSteps.map((step, idx) => (
                <div key={idx} className="timeline-item flex flex-col md:flex-row gap-6 md:gap-12">
                  <div 
                    className="w-[160px] h-[160px] rounded-full flex items-center justify-center text-4xl font-bold text-white flex-shrink-0 mx-auto md:mx-0 relative z-10"
                    style={{ 
                      background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)',
                      boxShadow: '0 10px 40px rgba(107, 15, 26, 0.3)',
                      border: '6px solid #F5EFE6'
                    }}
                  >
                    {step.number}
                  </div>
                  <div 
                    className="timeline-content flex-1 bg-white p-6 rounded-2xl border-2 border-transparent transition-all duration-300"
                    style={{ boxShadow: '0 4px 16px rgba(107, 15, 26, 0.06)' }}
                  >
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#6B0F1A' }}>{step.title}</h3>
                    <p className="text-gray-600 mb-3"><strong>工作内容：</strong>{step.work}</p>
                    <p className="text-gray-600"><strong>交付物：</strong>{step.deliverables}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="contact"
        className="py-16 md:py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)' }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.4) 0%, transparent 70%)' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-white">开启您的AI转型之旅</h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(250,246,241,0.9)' }}>
            立即预约，获得价值¥2万的《企业AI化转型诊断报告》
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl mx-auto">
            {[
              'GEO现状评估',
              '9大场景适配分析',
              'ROI预测报告',
              '定制化实施方案',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <span className="text-sm text-white">{item}</span>
              </div>
            ))}
          </div>

          <button onClick={() => openModal('ai-diagnosis')} className="px-10 py-4 rounded-lg text-lg font-bold btn-gold">
            立即预约免费咨询
          </button>
        </div>
      </section>

      <Footer />

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} context={modalContext} />
      <FeaturePreviewModal featureId={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </div>
  );
};

export default EnterpriseAIPage;
