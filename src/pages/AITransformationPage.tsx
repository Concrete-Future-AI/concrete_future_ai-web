import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import './AITransformationPage.css';

// ===========================
// Solarpunk Design System
// ===========================
const SOLARPUNK = {
  colors: {
    canvas: '#F7F5EE',        // Warm Cream/Paper - replaces all white
    canvasLight: '#FFFCF5',   // Slightly lighter variant
    ink: '#2C3628',           // Deep Moss Green - replaces all black/slate
    inkMedium: '#58644A',     // Medium moss for secondary text
    accent: '#C25E00',        // Rust/Burnt Orange - primary CTA
    accentHover: '#A04A00',   // Darker rust for hover
    border: '#D6D3C9',        // Stone Grey - technical borders
    borderLight: '#E8E6DF',   // Light border variant
    warning: '#FEF3C7',       // Pale amber for notices
    warningText: '#92400E',   // Amber text
  },
  fonts: {
    heading: "'Fraunces', 'Noto Sans SC', serif",
    mono: "'JetBrains Mono', 'Inconsolata', monospace",
    body: "'Fraunces', 'Noto Sans SC', serif",
  },
  shadows: {
    none: 'none',
    hard: '4px 4px 0px #2C3628',
    softPaper: '2px 2px 0 rgba(44, 54, 40, 0.1)',
  }
};

const AITransformationPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="ai-transformation-landing">
      {/* 单层导航栏 */}
      <header className={`transformation-header ${isVisible ? 'visible' : ''}`}>
        <div className="header-container">
          {/* 左侧：Logo + 返回按钮 */}
          <div className="header-left">
            <Link to="/" className="header-logo">
              {/* Chinese Brand Name with Accent */}
              <div className="logo-text-wrapper">
                <span 
                  className="logo-text"
                  style={{
                    fontFamily: "'Noto Sans SC', sans-serif",
                    fontWeight: '900'
                  }}
                >
                  炬象未来
                </span>
                {/* Brand Spark Accent */}
                <span className="brand-accent"></span>
              </div>
              <div 
                className="logo-subtitle"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: '600'
                }}
              >
                CONCRETE FUTURE AI
              </div>
            </Link>
            
            <div className="header-divider-vertical"></div>
            
            <Link to="/" className="back-home-button">
              <span className="back-icon">←</span>
              <span style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '500'
              }}>
                返回主页
              </span>
            </Link>
          </div>

          {/* 中间：页面内导航 */}
          <nav className="header-nav">
            <a 
              href="#comparison" 
              className="nav-link"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '500'
              }}
            >
              效率对比
            </a>
            <a 
              href="#solutions" 
              className="nav-link"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '500'
              }}
            >
              解决方案
            </a>
            <a 
              href="#pricing" 
              className="nav-link"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '500'
              }}
            >
              投资回报
            </a>
            <a 
              href="#contact" 
              className="nav-link"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '500'
              }}
            >
              立即咨询
            </a>
          </nav>

          {/* 右侧：CTA按钮 */}
          <div className="header-right">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="header-cta-primary"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
              }}
            >
              预约免费诊断
            </button>
          </div>
        </div>
      </header>

      {/* 英雄区 - Solarpunk Editorial */}
      <section className="transformation-hero" style={{ background: SOLARPUNK.colors.canvas }}>
        <div className="hero-container-center">
          <div className="hero-content-centered">
            {/* Editorial Heading - Enlarged */}
            <h1 
              className={`hero-main-title-centered ${isVisible ? 'visible' : ''}`}
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '900',
                fontSize: '64px',
                letterSpacing: '-0.03em',
                color: SOLARPUNK.colors.ink,
                marginTop: '32px'
              }}
            >
              外贸电商的
              <span style={{ 
                fontStyle: 'italic', 
                color: SOLARPUNK.colors.accent 
              }}>AI革命</span>
              <br />
              不是选择，而是<span style={{ 
                fontStyle: 'italic', 
                color: SOLARPUNK.colors.accent 
              }}>生存必修课</span>
            </h1>

            {/* Subtitle */}
            <p 
              className="hero-subtitle-centered"
              style={{
                fontFamily: SOLARPUNK.fonts.body,
                fontWeight: '400',
                color: SOLARPUNK.colors.inkMedium
              }}
            >
              当你还在手工处理业务时
              <br />
              你的竞争对手已经用AI实现了：
            </p>

            {/* Technical Metrics */}
            <div className="hero-metrics-centered">
              <div className="metric-card">
                <div 
                  className="metric-value"
                  style={{
                    fontFamily: SOLARPUNK.fonts.mono,
                    fontWeight: '900',
                    color: SOLARPUNK.colors.ink
                  }}
                >
                  300<span className="metric-unit" style={{ color: SOLARPUNK.colors.accent }}>%</span>
                </div>
                <div 
                  className="metric-label"
                  style={{
                    fontFamily: SOLARPUNK.fonts.mono,
                    fontWeight: '500',
                    fontSize: '12px',
                    color: SOLARPUNK.colors.inkMedium,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase' as const
                  }}
                >
                  获客效率↑
                </div>
              </div>

              <div className="metric-divider" style={{ 
                width: '1px', 
                height: '48px', 
                background: SOLARPUNK.colors.border
              }}></div>

              <div className="metric-card">
                <div 
                  className="metric-value"
                  style={{
                    fontFamily: SOLARPUNK.fonts.mono,
                    fontWeight: '900',
                    color: SOLARPUNK.colors.ink
                  }}
                >
                  85<span className="metric-unit" style={{ color: SOLARPUNK.colors.accent }}>%</span>
                </div>
                <div 
                  className="metric-label"
                  style={{
                    fontFamily: SOLARPUNK.fonts.mono,
                    fontWeight: '500',
                    fontSize: '12px',
                    color: SOLARPUNK.colors.inkMedium,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase' as const
                  }}
                >
                  成本降低↓
                </div>
              </div>

              <div className="metric-divider" style={{ 
                width: '1px', 
                height: '48px', 
                background: SOLARPUNK.colors.border
              }}></div>

              <div className="metric-card">
                <div 
                  className="metric-value"
                  style={{
                    fontFamily: SOLARPUNK.fonts.mono,
                    fontWeight: '900',
                    color: SOLARPUNK.colors.ink
                  }}
                >
                  24/7
                </div>
                <div 
                  className="metric-label"
                  style={{
                    fontFamily: SOLARPUNK.fonts.mono,
                    fontWeight: '500',
                    fontSize: '12px',
                    color: SOLARPUNK.colors.inkMedium,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase' as const
                  }}
                >
                  无人直播
                </div>
              </div>
            </div>

            {/* Solarpunk CTA Buttons */}
            <div className="hero-cta-group-centered">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-cta-primary"
                style={{
                  fontFamily: SOLARPUNK.fonts.heading,
                  fontWeight: '700',
                  background: SOLARPUNK.colors.accent,
                  color: SOLARPUNK.colors.canvas,
                  border: `2px solid ${SOLARPUNK.colors.accent}`,
                  borderRadius: '2px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = SOLARPUNK.colors.accentHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = SOLARPUNK.colors.accent;
                }}
              >
                立即预约免费诊断
                <span style={{ fontSize: '13px', fontWeight: '400', marginLeft: '4px' }}>（价值 ¥1,000）</span>
              </button>
              <a 
                href="#solutions"
                className="btn-cta-secondary"
                style={{
                  fontFamily: SOLARPUNK.fonts.mono,
                  fontWeight: '600',
                  background: 'transparent',
                  color: SOLARPUNK.colors.ink,
                  border: `2px solid ${SOLARPUNK.colors.ink}`,
                  borderRadius: '2px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase' as const,
                  fontSize: '13px'
                }}
              >
                查看转型方案
                <span style={{ marginLeft: '4px' }}>→</span>
              </a>
            </div>


          </div>
        </div>
      </section>

      {/* Comparison Section - Technical Blueprint */}
      <section className="comparison-section" id="comparison" style={{ background: SOLARPUNK.colors.canvas }}>
        <div className="section-container">
          <div className="section-header-center">
            <h2 
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '900',
                fontSize: '56px',
                color: SOLARPUNK.colors.ink,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              你是否每天都在经历
              <br />
              这些<span style={{ 
                fontStyle: 'italic',
                color: SOLARPUNK.colors.accent 
              }}>效率黑洞</span>？
            </h2>
            <p 
              style={{
                fontFamily: SOLARPUNK.fonts.body,
                fontWeight: '400',
                fontSize: '16px',
                color: SOLARPUNK.colors.inkMedium,
                marginTop: '16px'
              }}
            >
              传统作业方式正在吞噬你的时间、成本和竞争力
            </p>
          </div>

          {/* 对比表格 - Enhanced */}
          <div className="comparison-grid">
            {[
              {
                icon: '',
                category: '开发信撰写',
                traditional: { 
                  efficiency: '1封 = 30分钟', 
                  quality: '人工个性化困难', 
                  scale: '月均500封上限',
                  tag: '高时间成本'
                },
                ai: { 
                  efficiency: '100封 = 1分钟', 
                  quality: '自动精准个性化', 
                  scale: '月均50,000封',
                  tag: ''
                },
                improvement: '效率提升100倍'
              },
              {
                icon: '',
                category: '视觉营销素材',
                traditional: { 
                  efficiency: '设计师3天/张', 
                  quality: '修改成本高', 
                  scale: '¥15,000',
                  tag: '设计师依赖'
                },
                ai: { 
                  efficiency: 'AI 10秒/张', 
                  quality: '无限次迭代', 
                  scale: '¥2,000',
                  tag: ''
                },
                improvement: '成本降低85%'
              },
              {
                icon: '',
                category: '直播带货',
                traditional: { 
                  efficiency: '需3班倒主播', 
                  quality: '状态不稳定', 
                  scale: '¥30,000',
                  tag: '高人力成本'
                },
                ai: { 
                  efficiency: 'AI数字人24h', 
                  quality: '标准化输出', 
                  scale: '¥3,000',
                  tag: ''
                },
                improvement: '人力成本节省90%'
              },
              {
                icon: '',
                category: '市场决策',
                traditional: { 
                  efficiency: '依赖经验拍脑袋', 
                  quality: '试错成本高', 
                  scale: '数周到数月',
                  tag: '高风险'
                },
                ai: { 
                  efficiency: 'AI数据分析', 
                  quality: '降低失误80%', 
                  scale: '数小时到数天',
                  tag: ''
                },
                improvement: '决策准确率提升'
              }
            ].map((item, index) => (
              <div key={index} className="comparison-row">
                <div 
                  className="comparison-category"
                  style={{
                    fontFamily: SOLARPUNK.fonts.heading,
                    fontWeight: '700',
                    fontSize: '18px',
                    color: SOLARPUNK.colors.ink
                  }}
                >
                  {item.category}
                </div>

                <div className="comparison-columns">
                  <div className="comparison-column traditional">
                    <div className="column-header">传统作业模式</div>
                    <div className="column-content">
                      <div className="metric-row">
                        <span className="metric-label-sm">效率</span>
                        <span className="metric-value-negative">{item.traditional.efficiency}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label-sm">质量</span>
                        <span className="metric-value-negative">{item.traditional.quality}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label-sm">产能/成本</span>
                        <span className="metric-value-negative">{item.traditional.scale}</span>
                      </div>
                      {item.traditional.tag && (
                        <div style={{
                          marginTop: '8px',
                          padding: '4px 12px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: '#DC2626',
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          fontWeight: '500',
                          textAlign: 'center'
                        }}>
                          {item.traditional.tag}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="comparison-column ai">
                    <div className="column-header">AI化后</div>
                    <div className="column-content">
                      <div className="metric-row">
                        <span className="metric-label-sm">效率</span>
                        <span className="metric-value-positive">{item.ai.efficiency}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label-sm">质量</span>
                        <span className="metric-value-positive">{item.ai.quality}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label-sm">产能/成本</span>
                        <span className="metric-value-positive">{item.ai.scale}</span>
                      </div>
                      <div style={{
                        marginTop: '8px',
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.15) 0%, rgba(251, 146, 60, 0.15) 100%)',
                        border: '1px solid rgba(217, 119, 87, 0.3)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#D97757',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: '600',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}>
                        <span style={{ fontSize: '14px' }}>↑</span>
                        <span>{item.improvement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 底部强调 */}
          <div style={{
            marginTop: '64px',
            padding: '48px 32px',
            background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
              fontWeight: '700',
              fontSize: '28px',
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              这不是未来，而是现在
            </h3>
            <p style={{
              fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
              fontWeight: '400',
              fontSize: '18px',
              color: '#E5E7EB',
              marginBottom: '32px',
              lineHeight: '1.7'
            }}>
              你的同行已经在用AI拉开差距
              <br />
              每晚一个月行动，领先优势就少一年
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #D97757 0%, #FB923C 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(217, 119, 87, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(217, 119, 87, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(217, 119, 87, 0.3)';
              }}
            >
              <span>计算我能节省多少成本</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Section - Solarpunk Blueprint */}
      <section className="services-section" id="solutions" style={{ background: SOLARPUNK.colors.canvasLight }}>
        <div className="section-container">
          <div className="section-header-center">
            <h2 
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '900',
                fontSize: '56px',
                color: SOLARPUNK.colors.ink,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              我们提供的不是培训，
              <br />
              是<span style={{ 
                fontStyle: 'italic',
                color: SOLARPUNK.colors.accent 
              }}>转型操作系统</span>
            </h2>
            <p 
              style={{
                fontFamily: SOLARPUNK.fonts.body,
                fontWeight: '400',
                fontSize: '16px',
                color: SOLARPUNK.colors.inkMedium,
                marginTop: '16px'
              }}
            >
              从战略诊断到体系落地的全链路AI化服务
            </p>
          </div>

          {/* 两步服务 */}
          <div className="services-grid">
            {/* 第一步：咨询 */}
            <div className="service-card">
              <div 
                className="service-number"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: '700'
                }}
              >
                第一步
              </div>
              <h3 
                className="service-title"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '700'
                }}
              >
                深度战略咨询
              </h3>
              <p 
                className="service-subtitle"
                style={{
                  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                  fontWeight: '500'
                }}
              >
                1 小时 = 节省 6 个月弯路
              </p>

              <div className="service-features">
                {[
                  '诊断 10+ 个业务节点，识别 3 个快速见效点',
                  '盘点常见 AI 误区，定制防坑指南',
                  '绘制 90 天转型路线图'
                ].map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-check"></div>
                    <span style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '500'
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="service-pricing">
                <div className="pricing-row">
                  <span className="pricing-label">投资</span>
                  <span 
                    className="pricing-value"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: '700'
                    }}
                  >
                    ¥1,000/小时
                  </span>
                </div>
                <div className="pricing-row">
                  <span className="pricing-label">价值</span>
                  <span className="pricing-value">避免数万~数十万错误投入</span>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="service-cta"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '600'
                }}
              >
                预约免费诊断（60分钟）
              </button>
            </div>

            {/* 第二步：培训 */}
            <div className="service-card">
              <div 
                className="service-number"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: '700'
                }}
              >
                第二步
              </div>
              <h3 
                className="service-title"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '700'
                }}
              >
                系统化企业内训
              </h3>
              <p 
                className="service-subtitle"
                style={{
                  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                  fontWeight: '500'
                }}
              >
                完整转型体系，非碎片化技能
              </p>

              <div className="service-features">
                {[
                  '10 大核心模块覆盖全业务链',
                  '定制化设计 + 配套工具包',
                  '30 天落地答疑支持'
                ].map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-check"></div>
                    <span style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '500'
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="service-flow">
                <div className="flow-step">
                  <div 
                    className="flow-label"
                    style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    认知升级
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div 
                    className="flow-label"
                    style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    工具掌握
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div 
                    className="flow-label"
                    style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    体系落地
                  </div>
                </div>
              </div>

              <button 
                className="service-cta secondary"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '600'
                }}
              >
                查看完整课程体系
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section - Blueprint System */}
      <section className="curriculum-section" id="courses" style={{ 
        padding: '96px 0', 
        background: SOLARPUNK.colors.canvas 
      }}>
        <div className="section-container">
          <div className="section-header-center">
            <h2 
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '900',
                fontSize: '56px',
                color: SOLARPUNK.colors.ink,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              10大模块AI转型全景图
              <br />
              从战略到执行的<span style={{ 
                fontStyle: 'italic',
                color: SOLARPUNK.colors.accent 
              }}>完整闭环</span>
            </h2>
            <p 
              style={{
                fontFamily: SOLARPUNK.fonts.body,
                fontWeight: '400',
                fontSize: '16px',
                color: SOLARPUNK.colors.inkMedium,
                marginTop: '16px'
              }}
            >
              每个模块都配备：实战案例拆解 + 工具模板包 + 落地指导手册 + 30天答疑支持
            </p>
          </div>

          {/* 课程模块列表 */}
          <div style={{ marginTop: '64px' }}>
            {[
              {
                number: '模块一',
                title: '战略认知篇 · AI洞察外贸新机遇',
                gains: [
                  'AI时代外贸电商的竞争格局全景图',
                  '诊断你的业务AI化成熟度模型',
                  '识别你的3个AI优先突破点'
                ],
                deliverables: [
                  '企业AI转型诊断报告',
                  'AI应用优先级矩阵',
                  '90天行动路线图'
                ],
                outcome: '典型效果：避免盲目试错，节省3-6个月探索时间'
              },
              {
                number: '模块二',
                title: '高效获客篇 · 1分钟写出100封开发信',
                gains: [
                  'AI批量生成个性化开发信的完整工作流',
                  '提升邮件打开率/回复率的提示词工程',
                  '自动化客户画像与精准匹配系统'
                ],
                deliverables: [
                  '开发信生成模板库(50+场景)',
                  'AI写作提示词手册',
                  '客户分层自动化流程图'
                ],
                outcome: '典型效果：获客效率提升50倍，成本降低70%'
              },
              {
                number: '模块三+四',
                title: '视觉营销篇 · 10秒出大片+全球化',
                gains: [
                  'AI快速生成专业产品图/场景图的方法',
                  '一键多语言/多文化适配的营销素材',
                  'Midjourney/SD等工具的深度应用'
                ],
                deliverables: [
                  '行业定制化提示词库',
                  '视觉营销素材生产线搭建指南',
                  '100+爆款案例拆解'
                ],
                outcome: '典型效果：设计成本降85%，产出提升10倍'
              },
              {
                number: '模块五',
                title: '产品创新篇 · 开模前定胜负',
                gains: [
                  'AI辅助市场需求洞察与趋势预测',
                  '虚拟产品测试与快速试错方法',
                  '降低新品失败率的决策框架'
                ],
                deliverables: [
                  'AI产品市场验证工作流',
                  '新品决策评估模板',
                  '趋势预测工具包'
                ],
                outcome: '典型效果：新品失败率降低80%，研发周期缩短50%'
              },
              {
                number: '模块六+七',
                title: '增长引擎篇 · 7×24小时AI直播',
                gains: [
                  'AI数字人直播的价值逻辑与ROI分析',
                  '3步搭建无人直播间的完整流程',
                  '数字人话术优化与转化率提升技巧'
                ],
                deliverables: [
                  '数字人直播SOP手册',
                  '话术脚本模板库',
                  '直播间搭建技术指南'
                ],
                outcome: '典型效果：人力成本节省90%，直播时长扩展3倍'
              },
              {
                number: '模块八',
                title: '科学决策篇 · 告别拍脑袋',
                gains: [
                  'AI数据分析与商业洞察方法',
                  '自动化报表与决策看板搭建',
                  '预测性分析降低战略失误'
                ],
                deliverables: [
                  'AI数据分析工作流',
                  '决策支持看板模板',
                  '关键指标监控体系'
                ],
                outcome: '典型效果：决策周期缩短60%，失误率降低70%'
              },
              {
                number: '模块九',
                title: '利润中心篇 · 服务升级为利润引擎',
                gains: [
                  '将AI能力对外输出的商业模式设计',
                  'AI服务产品化与定价策略',
                  '开辟第二增长曲线的路径规划'
                ],
                deliverables: [
                  'AI服务产品化方案',
                  '定价与商业模式画布',
                  '客户开发策略'
                ],
                outcome: '典型效果：新增年收入XX万-XXX万'
              },
              {
                number: '模块十',
                title: '体系制胜篇 · 从工具到战略',
                gains: [
                  '构建组织级AI能力的方法论',
                  'AI时代的团队协作与绩效管理',
                  '形成长期竞争壁垒的战略路径'
                ],
                deliverables: [
                  '企业AI能力成熟度模型',
                  'AI时代绩效考核新范式',
                  '长期战略规划图'
                ],
                outcome: '典型效果：构建难以复制的组织能力'
              }
            ].map((module, index) => (
              <div 
                key={index}
                style={{
                  marginBottom: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#ffffff'
                }}
              >
                {/* 模块头 */}
                <button
                  onClick={() => setActiveModule(activeModule === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '24px 32px',
                    background: activeModule === index 
                      ? 'linear-gradient(135deg, rgba(217, 119, 87, 0.08) 0%, rgba(251, 146, 60, 0.08) 100%)'
                      : '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <span style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '700',
                      fontSize: '14px',
                      color: '#D97757',
                      padding: '6px 12px',
                      background: 'rgba(217, 119, 87, 0.1)',
                      borderRadius: '6px'
                    }}>
                      {module.number}
                    </span>
                    <span style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '600',
                      fontSize: '18px',
                      color: '#0A0A0A'
                    }}>
                      {module.title}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '24px',
                    color: '#D97757',
                    transition: 'transform 0.3s ease',
                    transform: activeModule === index ? 'rotate(45deg)' : 'rotate(0deg)'
                  }}>
                    +
                  </span>
                </button>

                {/* 模块内容 */}
                {activeModule === index && (
                  <div style={{
                    padding: '32px',
                    background: '#FAFAF9',
                    borderTop: '1px solid rgba(0, 0, 0, 0.05)'
                  }}>
                    {/* 你将获得 */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{
                        fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                        fontWeight: '600',
                        fontSize: '16px',
                        color: '#0A0A0A',
                        marginBottom: '16px'
                      }}>
                        你将获得
                      </h4>
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        {module.gains.map((gain, gIndex) => (
                          <li key={gIndex} style={{
                            fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                            fontSize: '15px',
                            color: '#525252',
                            paddingLeft: '24px',
                            position: 'relative'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: '0',
                              top: '6px',
                              width: '6px',
                              height: '6px',
                              background: '#D97757',
                              borderRadius: '50%'
                            }}></span>
                            {gain}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 交付物 */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{
                        fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                        fontWeight: '600',
                        fontSize: '16px',
                        color: '#0A0A0A',
                        marginBottom: '16px'
                      }}>
                        交付物
                      </h4>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '12px'
                      }}>
                        {module.deliverables.map((item, dIndex) => (
                          <div key={dIndex} style={{
                            padding: '12px 16px',
                            background: '#ffffff',
                            border: '1px solid rgba(217, 119, 87, 0.2)',
                            borderRadius: '8px',
                            fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                            fontSize: '14px',
                            color: '#525252',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <span style={{ color: '#D97757', fontWeight: '600' }}>✓</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 效果 */}
                    <div style={{
                      padding: '16px 20px',
                      background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)',
                      border: '1px solid rgba(217, 119, 87, 0.2)',
                      borderRadius: '8px'
                    }}>
                      <span style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontSize: '15px',
                        color: '#D97757',
                        fontWeight: '500'
                      }}>
                        {module.outcome}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 进阶模块区 */}
          <div style={{ marginTop: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700',
                fontSize: '28px',
                color: '#0A0A0A',
                marginBottom: '12px'
              }}>
                进阶技术模块（按需选配）
              </h3>
              <p style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontSize: '16px',
                color: '#9CA3AF'
              }}>
                深度技术能力提升，适合有一定基础的企业
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {[
                { title: 'Comfy UI工作流深度应用', desc: '电商/设计/自媒体视效方向定制' },
                { title: 'AI Agent(智能体)搭建实战', desc: '自动化业务流程的核心技术' },
                { title: '企业知识库与RAG框架', desc: '让AI成为你的专属智囊团' },
                { title: '模型训练与微调', desc: '打造企业专属AI能力' },
                { title: 'AI时代协作及绩效考核新范式', desc: '组织转型的配套管理体系' },
                { title: '其他企业定制化内训', desc: '根据你的特殊需求设计' }
              ].map((item, index) => (
                <div key={index} style={{
                  padding: '24px',
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(217, 119, 87, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <h4 style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '600',
                    fontSize: '16px',
                    color: '#0A0A0A',
                    marginBottom: '8px'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontSize: '14px',
                    color: '#9CA3AF',
                    margin: 0
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #D97757 0%, #FB923C 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(217, 119, 87, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(217, 119, 87, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(217, 119, 87, 0.3)';
              }}
            >
              <span>获取定制化培训方案</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies - Field Reports */}
      <section className="cases-section" id="cases" style={{ 
        padding: '96px 0', 
        background: SOLARPUNK.colors.canvasLight 
      }}>
        <div className="section-container">
          <div className="section-header-center">
            <h2 
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '900',
                fontSize: '56px',
                color: SOLARPUNK.colors.ink,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              他们已经用AI
              <br />
              <span style={{ 
                fontStyle: 'italic',
                color: SOLARPUNK.colors.accent 
              }}>重构了竞争力</span>
            </h2>
            <p 
              style={{
                fontFamily: SOLARPUNK.fonts.body,
                fontWeight: '400',
                fontSize: '16px',
                color: SOLARPUNK.colors.inkMedium,
                marginTop: '16px'
              }}
            >
              真实数据，可验证的转型成果
            </p>
          </div>

          {/* 案例卡片 */}
          <div style={{
            marginTop: '64px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            {[
              {
                company: '某跨境3C配件企业',
                revenue: '年营收5000万',
                period: '转型周期：3个月',
                quote: '接受咨询+培训3个月后：',
                metrics: [
                  { label: '获客成本', before: '¥85', after: '¥32', improvement: '↓62%' },
                  { label: '开发信响应率', before: '2%', after: '8%', improvement: '↑4倍' },
                  { label: '营销素材产出', before: '10张/周', after: '200张/周', improvement: '' },
                  { label: '设计团队', before: '5人', after: '2人', improvement: '(节省¥36万/年)' }
                ],
                testimonial: {
                  role: 'CEO评价：',
                  text: '"最大的收获不是学会工具，而是用AI思维重新设计了业务流程。现在我们的效率是同行的10倍。"'
                }
              },
              {
                company: '某家居出口品牌',
                revenue: '年营收8000万',
                period: '转型周期：4个月',
                quote: '深度咨询+系统培训后：',
                metrics: [
                  { label: '视觉营销点击率', before: '1.2%', after: '4.8%', improvement: '↑4倍' },
                  { label: '新品上市周期', before: '45天', after: '18天', improvement: '↓60%' },
                  { label: 'AI数字人直播', before: '0', after: '24h在线', improvement: '' },
                  { label: '年度营销成本', before: '', after: '', improvement: '↓¥120万' }
                ],
                testimonial: {
                  role: 'CMO评价：',
                  text: '"我们把节省的成本重新投入AI研发，现在AI能力本身成了新的利润中心，去年靠AI服务外包就赚了200万。"'
                }
              },
              {
                company: '某服装外贸公司',
                revenue: '年营收3000万',
                period: '转型周期：3个月',
                quote: '90天AI转型计划后：',
                metrics: [
                  { label: '直播间', before: '3班倒', after: '24h无人直播', improvement: '' },
                  { label: '直播转化率', before: '2.3%', after: '2.8%', improvement: '(真人vs AI)' },
                  { label: '主播人力成本', before: '¥30万/年', after: '¥3万/年', improvement: '' },
                  { label: '产品上新速度', before: '', after: '', improvement: '提升300%' }
                ],
                testimonial: {
                  role: '运营总监评价：',
                  text: '"AI数字人竟然比真人主播还稳定，而且可以同时跑多个直播间测试，现在我们的选品决策快准狠。"'
                }
              }
            ].map((caseItem, index) => (
              <div key={index} style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* 公司信息 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '700',
                      fontSize: '20px',
                      color: '#0A0A0A',
                      marginBottom: '6px'
                    }}>
                      {caseItem.company}
                    </h3>
                    <p style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontSize: '14px',
                      color: '#9CA3AF',
                      margin: 0
                    }}>
                      {caseItem.revenue}
                    </p>
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    background: 'rgba(217, 119, 87, 0.1)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#D97757',
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontWeight: '500'
                  }}>
                    {caseItem.period}
                  </div>
                </div>

                {/* 引言 */}
                <div style={{
                  marginBottom: '20px',
                  paddingLeft: '16px',
                  borderLeft: '3px solid #D97757'
                }}>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontSize: '14px',
                    color: '#525252',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    {caseItem.quote}
                  </p>
                </div>

                {/* 核心数据 */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '600',
                    fontSize: '15px',
                    color: '#0A0A0A',
                    marginBottom: '16px'
                  }}>
                    核心数据变化
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {caseItem.metrics.map((metric, mIndex) => (
                      <div key={mIndex} style={{
                        padding: '12px',
                        background: '#FAFAF9',
                        borderRadius: '8px'
                      }}>
                        <div style={{
                          fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                          fontSize: '12px',
                          color: '#9CA3AF',
                          marginBottom: '6px'
                        }}>
                          {metric.label}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          flexWrap: 'wrap'
                        }}>
                          {metric.before && (
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '14px',
                              color: '#DC2626',
                              fontWeight: '600'
                            }}>
                              {metric.before}
                            </span>
                          )}
                          {metric.before && metric.after && (
                            <span style={{ color: '#9CA3AF' }}>→</span>
                          )}
                          {metric.after && (
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '14px',
                              color: '#16A34A',
                              fontWeight: '600'
                            }}>
                              {metric.after}
                            </span>
                          )}
                          {metric.improvement && (
                            <span style={{
                              fontSize: '13px',
                              color: '#D97757',
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontWeight: '600'
                            }}>
                              {metric.improvement}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 评价 */}
                <div style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.05) 0%, rgba(251, 146, 60, 0.05) 100%)',
                  borderRadius: '8px',
                  borderLeft: '3px solid #D97757'
                }}>
                  <div style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontSize: '13px',
                    color: '#D97757',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    {caseItem.testimonial.role}
                  </div>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontSize: '14px',
                    color: '#525252',
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    {caseItem.testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 行业覆盖 */}
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <h3 style={{
              fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
              fontWeight: '600',
              fontSize: '18px',
              color: '#0A0A0A',
              marginBottom: '24px'
            }}>
              已服务企业覆盖行业：
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px'
            }}>
              {['3C数码', '家居家纺', '服装配饰', '工业品出口', '美妆个护', '母婴用品', '运动户外', '汽配电器'].map((industry, index) => (
                <span key={index} style={{
                  padding: '8px 16px',
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '20px',
                  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                  fontSize: '14px',
                  color: '#525252'
                }}>
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 服务流程 - Solarpunk Technical Blueprint */}
      <section style={{ 
        padding: '96px 0', 
        background: '#F7F5EE'
      }}>
        <div className="section-container">
          {/* Header */}
          <div className="section-header-center">
            <h2 
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '900',
                fontSize: '56px',
                color: SOLARPUNK.colors.ink,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              从接触到落地的
              <span style={{ 
                fontStyle: 'italic',
                color: SOLARPUNK.colors.accent
              }}>转型路线图</span>
            </h2>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              color: '#58644A',
              marginTop: '16px'
            }}>
              Four-stage transformation framework // Field-tested methodology
            </p>
          </div>

          {/* Technical Blueprint Grid */}
          <div style={{ 
            marginTop: '64px',
            position: 'relative'
          }}>
            {/* Dashed Technical Connection Line */}
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '12%',
              right: '12%',
              height: '2px',
              borderTop: '2px dashed #C9C5B8',
              zIndex: 0
            }}></div>

            {/* Blueprint Card Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              position: 'relative',
              zIndex: 1
            }}>
              {[
                {
                  number: '01',
                  title: '免费诊断',
                  serial: 'VALUE_¥1000',
                  desc: '60分钟深度对话，输出AI化成熟度报告与初步路线图',
                  specs: ['AI成熟度诊断', '3个优先突破点', '初步转型路线'],
                  cta: '立即预约'
                },
                {
                  number: '02',
                  title: '深度咨询',
                  serial: 'RATE_¥1000/HR',
                  desc: '2-4小时完整诊断，90天转型规划与工具选型方案',
                  specs: ['完整业务诊断', '90天转型规划', '工具选型方案'],
                  cta: '预约咨询'
                },
                {
                  number: '03',
                  title: '定制化培训',
                  serial: 'CUSTOM_QUOTE',
                  desc: '10大核心模块培训，配套工具包与实操演练',
                  specs: ['10大核心模块', '工具包+模板', '实操演练'],
                  cta: '获取方案'
                },
                {
                  number: '04',
                  title: '落地陪跑',
                  serial: 'SUPPORT_30D',
                  desc: '实施答疑指导，定期回顾优化，持续迭代支持',
                  specs: ['实施答疑', '定期回顾', '持续优化'],
                  cta: ''
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  style={{
                    position: 'relative',
                    background: '#FEFDFB',
                    borderRadius: '2px',
                    border: '1px solid #D4CFC0',
                    padding: '28px 20px',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C25E00';
                    e.currentTarget.style.background = '#F5F2EA';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#D4CFC0';
                    e.currentTarget.style.background = '#FEFDFB';
                  }}
                >
                  {/* Huge Background Number (Fraunces Italic) */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '12px',
                    fontSize: '140px',
                    fontFamily: "'Fraunces', serif",
                    fontWeight: '900',
                    fontStyle: 'italic',
                    color: '#EAE7DD',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}>
                    {step.number}
                  </div>

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Technical Serial Label */}
                    <div style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      border: '1px solid #C25E00',
                      background: 'rgba(194, 94, 0, 0.05)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: '600',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#C25E00',
                      marginBottom: '16px'
                    }}>
                      {step.serial}
                    </div>

                    {/* Title (Fraunces) */}
                    <h3 style={{
                      fontFamily: "'Fraunces', 'Noto Sans SC', serif",
                      fontWeight: '700',
                      fontSize: '20px',
                      color: '#2C3628',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.3'
                    }}>
                      {step.title}
                    </h3>

                    {/* Description (JetBrains Mono) */}
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      color: '#58644A',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                      {step.desc}
                    </p>

                    {/* Technical Specs List */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginBottom: '16px',
                      paddingLeft: '12px',
                      borderLeft: '2px solid #D4CFC0'
                    }}>
                      {step.specs.map((spec, sIndex) => (
                        <div 
                          key={sIndex}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11px',
                            color: '#58644A',
                            fontWeight: '500'
                          }}
                        >
                          → {spec}
                        </div>
                      ))}
                    </div>

                    {/* CTA Button (Technical Style) */}
                    {step.cta && (
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          background: '#2C3628',
                          color: '#F7F5EE',
                          border: '1px solid #2C3628',
                          borderRadius: '2px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: '600',
                          fontSize: '12px',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = '#C25E00';
                          e.currentTarget.style.borderColor = '#C25E00';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = '#2C3628';
                          e.currentTarget.style.borderColor = '#2C3628';
                        }}
                      >
                        <span>{step.cta}</span>
                        <ArrowRight size={14} strokeWidth={2} />
                      </button>
                    )}
                  </div>

                  {/* Technical Connection Arrow */}
                  {index < 3 && (
                    <div style={{
                      position: 'absolute',
                      right: '-9px',
                      top: '38px',
                      zIndex: 2,
                      width: '18px',
                      height: '18px',
                      background: '#C25E00',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ArrowRight size={12} color="#F7F5EE" strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notice Note - Sticky Paper Style */}
          <div style={{
            marginTop: '48px',
            background: '#FEF3C7',
            border: '1px solid #F59E0B',
            borderLeft: '4px solid #C25E00',
            borderRadius: '2px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            boxShadow: '2px 2px 0 rgba(44, 54, 40, 0.1)'
          }}>
            {/* Geometric Icon */}
            <div style={{
              flexShrink: 0,
              width: '28px',
              height: '28px',
              border: '2px solid #C25E00',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertCircle size={18} color="#C25E00" strokeWidth={2.5} />
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <h4 style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: '700',
                fontSize: '13px',
                color: '#92400E',
                marginBottom: '6px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                FLEXIBLE_APPROACH
              </h4>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: '#92400E',
                margin: 0,
                lineHeight: '1.7'
              }}>
                支持单独订阅咨询、培训，或组合采购 · 我们根据你的实际需求定制服务方案，确保最佳投资回报
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator - Field Data */}
      <section className="roi-section" id="pricing" style={{ background: SOLARPUNK.colors.canvas }}>
        <div className="section-container">
          <div className="section-header-center">
            <h2 
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '900',
                fontSize: '56px',
                color: SOLARPUNK.colors.ink,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}
            >
              算一算 AI 转型的
              <span style={{ 
                fontStyle: 'italic',
                color: SOLARPUNK.colors.accent 
              }}>ROI</span>
            </h2>
          </div>

          <div className="roi-calculator">
            <div className="roi-comparison-box">
              <div className="roi-col roi-traditional">
                <h4 
                  className="roi-col-title"
                  style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '600'
                  }}
                >
                  传统运营成本/月
                </h4>
                <div className="roi-items">
                  {[
                    { label: '营销设计师', value: '¥15,000' },
                    { label: '直播主播 ×3', value: '¥30,000' },
                    { label: '内容运营', value: '¥12,000' }
                  ].map((item, index) => (
                    <div key={index} className="roi-item">
                      <span style={{ fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif" }}>
                        {item.label}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '700' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                  <div className="roi-total">
                    <span>总计</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '900' }}>
                      ¥57,000
                    </span>
                  </div>
                </div>
              </div>

              <div className="roi-arrow">→</div>

              <div className="roi-col roi-ai">
                <h4 
                  className="roi-col-title"
                  style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '600'
                  }}
                >
                  AI 化后成本/月
                </h4>
                <div className="roi-items">
                  {[
                    { label: 'AI 工具订阅', value: '¥3,000' },
                    { label: '数字人服务', value: '¥3,000' },
                    { label: '运营监控', value: '¥6,000' }
                  ].map((item, index) => (
                    <div key={index} className="roi-item">
                      <span style={{ fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif" }}>
                        {item.label}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '700' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                  <div className="roi-total positive">
                    <span>总计</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '900' }}>
                      ¥12,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="roi-savings">
              <div className="savings-main">
                <span style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '700'
                }}>
                  每月节省
                </span>
                <span 
                  className="savings-amount"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '900'
                  }}
                >
                  ¥45,000
                </span>
              </div>
              <div className="savings-annual">
                年度节省 <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '900' }}>¥540,000</span>
              </div>
              <div 
                className="roi-percentage"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: '900'
                }}
              >
                投资回报率：超过 2000%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Urgent Call to Action */}
      <section className="final-cta-section" id="contact" style={{ background: SOLARPUNK.colors.ink }}>
        <div className="section-container">
          <div className="final-cta-content">
            <h2 
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '900',
                fontSize: '64px',
                color: SOLARPUNK.colors.canvas,
                marginBottom: '24px',
                letterSpacing: '-0.03em',
                lineHeight: '1.2'
              }}
            >
              AI 转型窗口期
              <br />
              仅剩 <span style={{ 
                fontStyle: 'italic',
                color: SOLARPUNK.colors.accent 
              }}>18 个月</span>
            </h2>
            <p 
              style={{
                fontFamily: SOLARPUNK.fonts.body,
                fontWeight: '400',
                fontSize: '20px',
                color: SOLARPUNK.colors.borderLight,
                marginBottom: '32px'
              }}
            >
              现在行动 = 领先同行 2 年
              <br />
              犹豫等待 = 被市场淘汰
            </p>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-cta-final"
              style={{
                fontFamily: SOLARPUNK.fonts.heading,
                fontWeight: '700',
                fontSize: '18px',
                background: SOLARPUNK.colors.accent,
                color: SOLARPUNK.colors.canvas,
                border: `2px solid ${SOLARPUNK.colors.accent}`,
                borderRadius: '2px',
                padding: '16px 32px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = SOLARPUNK.colors.accentHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = SOLARPUNK.colors.accent;
              }}
            >
              预约免费诊断（60分钟）
            </button>

            <p 
              className="cta-note"
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: '400'
              }}
            >
              价值 ¥1,000 | 本月仅剩 2 个名额
            </p>

            <div className="trust-signals">
              <div className="trust-item">
                <span 
                  className="trust-number"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '900'
                  }}
                >
                  50+
                </span>
                <span className="trust-label">服务企业</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span 
                  className="trust-number"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '900'
                  }}
                >
                  98%
                </span>
                <span className="trust-label">满意度</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span 
                  className="trust-number"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '900'
                  }}
                >
                  2000%+
                </span>
                <span className="trust-label">平均 ROI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* 咨询弹窗 */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AITransformationPage;
