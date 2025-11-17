import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import './AITransformationPage.css';

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
              <div 
                className="logo-text"
                style={{
                  fontFamily: "'Noto Sans SC', sans-serif",
                  fontWeight: '900'
                }}
              >
                炬象未来
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

      {/* 英雄区 - 单列居中 */}
      <section className="transformation-hero">
        <div className="hero-container-center">
          <div className="hero-content-centered">
            {/* 主标题 */}
            <h1 
              className={`hero-main-title-centered ${isVisible ? 'visible' : ''}`}
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '800',
                letterSpacing: '-0.03em'
              }}
            >
              外贸电商的
              <span className="title-highlight">AI 升级</span>
              <br />
              不是选择题，是生存题
            </h1>

            {/* 副标题 */}
            <p 
              className="hero-subtitle-centered"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400'
              }}
            >
              在您手工处理业务的同时，竞争对手已用 AI 实现了 10 倍效率提升。
              <br />
              我们帮助您快速追上，甚至超越。
            </p>

            {/* 数据指标 */}
            <div className="hero-metrics-centered">
              <div className="metric-card">
                <div 
                  className="metric-value"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '900'
                  }}
                >
                  300<span className="metric-unit">%</span>
                </div>
                <div 
                  className="metric-label"
                  style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontWeight: '500'
                  }}
                >
                  获客效率提升
                </div>
              </div>

              <div className="metric-card">
                <div 
                  className="metric-value"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '900'
                  }}
                >
                  85<span className="metric-unit">%</span>
                </div>
                <div 
                  className="metric-label"
                  style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontWeight: '500'
                  }}
                >
                  运营成本降低
                </div>
              </div>

              <div className="metric-card">
                <div 
                  className="metric-value"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '900'
                  }}
                >
                  24/7
                </div>
                <div 
                  className="metric-label"
                  style={{
                    fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                    fontWeight: '500'
                  }}
                >
                  全天候运营
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="hero-cta-group-centered">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-cta-primary"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '700'
                }}
              >
                预约免费诊断
                <span style={{ fontSize: '13px', fontWeight: '400' }}>（价值 ¥1,000）</span>
              </button>
              <a 
                href="#solutions"
                className="btn-cta-secondary"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '600'
                }}
              >
                了解服务方案
              </a>
            </div>

            {/* 紧迫感提示 */}
            <div className="urgency-banner-centered">
              <div className="urgency-indicator"></div>
              <span style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: '600'
              }}>
                本月限额 5 名，已预约 3 名
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 对比区 - 突出痛点 */}
      <section className="comparison-section" id="comparison">
        <div className="section-container">
          <div className="section-header-center">
            <div 
              className="section-tag"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '600'
              }}
            >
              效率对比
            </div>
            <h2 
              className="section-title"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
              }}
            >
              传统方式正在吞噬您的
              <span className="title-underline-orange">竞争力</span>
            </h2>
          </div>

          {/* 对比表格 */}
          <div className="comparison-grid">
            {[
              {
                category: '开发信撰写',
                traditional: { time: '30分钟/封', cost: '高人力成本', scale: '月均 500 封' },
                ai: { time: '1分钟/100封', cost: '自动化', scale: '月均 50,000 封' },
                improvement: '+100x 效率'
              },
              {
                category: '视觉素材制作',
                traditional: { time: '3天/张', cost: '¥15,000/月', scale: '设计师依赖' },
                ai: { time: '10秒/张', cost: '¥2,000/月', scale: '无限迭代' },
                improvement: '-85% 成本'
              },
              {
                category: '直播带货',
                traditional: { time: '8小时/天', cost: '¥30,000/月', scale: '状态不稳' },
                ai: { time: '24小时/天', cost: '¥3,000/月', scale: '标准化' },
                improvement: '-90% 人力'
              },
              {
                category: '市场决策',
                traditional: { time: '数周', cost: '经验主导', scale: '高试错' },
                ai: { time: '数小时', cost: '数据驱动', scale: '降低 80% 失误' },
                improvement: '+准确率'
              }
            ].map((item, index) => (
              <div key={index} className="comparison-row">
                <div 
                  className="comparison-category"
                  style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '600'
                  }}
                >
                  {item.category}
                </div>

                <div className="comparison-columns">
                  <div className="comparison-column traditional">
                    <div className="column-header">传统方式</div>
                    <div className="column-content">
                      <div className="metric-row">
                        <span className="metric-label-sm">效率</span>
                        <span className="metric-value-negative">{item.traditional.time}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label-sm">成本</span>
                        <span className="metric-value-negative">{item.traditional.cost}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label-sm">质量</span>
                        <span className="metric-value-negative">{item.traditional.scale}</span>
                      </div>
                    </div>
                  </div>

                  <div className="comparison-column ai">
                    <div className="column-header">AI 化后</div>
                    <div className="column-content">
                      <div className="metric-row">
                        <span className="metric-label-sm">效率</span>
                        <span className="metric-value-positive">{item.ai.time}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label-sm">成本</span>
                        <span className="metric-value-positive">{item.ai.cost}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label-sm">质量</span>
                        <span className="metric-value-positive">{item.ai.scale}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="improvement-badge"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: '700'
                  }}
                >
                  {item.improvement}
                </div>
              </div>
            ))}
          </div>

          {/* 底部CTA */}
          <div className="comparison-cta">
            <p style={{
              fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
              fontWeight: '600',
              fontSize: '18px',
              color: '#ffffff'
            }}>
              每晚一个月行动，领先优势就少一年
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-cta-white"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '600'
              }}
            >
              计算我能节省多少成本
            </button>
          </div>
        </div>
      </section>

      {/* 服务方案 */}
      <section className="services-section" id="solutions">
        <div className="section-container">
          <div className="section-header-center">
            <div 
              className="section-tag"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '600'
              }}
            >
              服务方案
            </div>
            <h2 
              className="section-title"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
              }}
            >
              不是培训，是
              <span className="title-underline-orange">转型操作系统</span>
            </h2>
            <p 
              className="section-description"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400'
              }}
            >
              从战略诊断到落地执行的全链路服务
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

      {/* ROI 计算器 */}
      <section className="roi-section" id="pricing">
        <div className="section-container">
          <div className="section-header-center">
            <div 
              className="section-tag"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '600'
              }}
            >
              投资回报
            </div>
            <h2 
              className="section-title"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
              }}
            >
              算一算 AI 转型的
              <span className="title-underline-orange">ROI</span>
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

      {/* 最终CTA */}
      <section className="final-cta-section" id="contact">
        <div className="section-container">
          <div className="final-cta-content">
            <h2 
              className="final-cta-title"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '900'
              }}
            >
              AI 转型窗口期
              <br />
              仅剩 <span className="title-highlight-orange">18 个月</span>
            </h2>
            <p 
              className="final-cta-subtitle"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400'
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
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
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
