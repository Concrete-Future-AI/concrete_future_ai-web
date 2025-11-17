import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative bg-stone-50 pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* 背景装饰 */}
      <div 
        className="absolute top-0 left-0 w-[800px] h-[800px] opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #D97757 0%, transparent 60%)',
          transform: 'translate(-30%, -30%)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* 主标题 - 简洁有力 */}
          <h1 
            className={`text-heading mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              color: '#0A0A0A',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              lineHeight: '1.15'
            }}
          >
            企业AI化转型所需的
            <br />
            <span className="relative inline-block">
              一切都在这里
              {/* 简洁下划线 */}
              <span 
                className="absolute left-0 right-0"
                style={{
                  bottom: '-4px',
                  height: '8px',
                  background: 'linear-gradient(90deg, #D97757 0%, #C96543 100%)',
                  borderRadius: '4px',
                  opacity: '0.25'
                }}
              ></span>
            </span>
          </h1>

          {/* 核心信息条 - 紧迫感 + 数据 */}
          <div 
            className={`mb-12 transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p 
              className="text-body text-lg lg:text-xl mb-6"
              style={{ color: '#4B5563', lineHeight: '1.7' }}
            >
              <span style={{ color: '#D97757', fontWeight: '600' }}>你的竞争对手已经在用AI降本65%，18个月窗口期决定企业生死。</span>
              <br />
              已帮助
              <span className="text-data mx-1" style={{ color: '#D97757', fontWeight: '700', fontSize: '1.15em' }}>120+企业</span>
              节省近
              <span className="text-data mx-1" style={{ color: '#D97757', fontWeight: '700', fontSize: '1.15em' }}>3亿成本</span>，平均ROI达
              <span className="text-data mx-1" style={{ color: '#D97757', fontWeight: '700', fontSize: '1.15em' }}>600%+</span>
            </p>
          </div>

          {/* 价值主张 - 简短有力 */}
          <p 
            className={`text-body text-xl lg:text-2xl text-gray-700 mb-16 max-w-4xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ lineHeight: '1.7' }}
          >
            从战略到落地，从试点到规模化——
            <span style={{ color: '#D97757', fontWeight: '600' }}>2周上线MVP，60天见到ROI，否则不收费。</span>
          </p>

          {/* CTA按钮组 - 匹配用户旅程 */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <a
              href="#services"
              className="group px-8 py-4 rounded-xl text-base transition-all duration-300 relative overflow-hidden inline-flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(217, 119, 87, 0.3)',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: '800'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 87, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(217, 119, 87, 0.3)';
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                了解我们能为您做什么
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              ></div>
            </a>

            <a 
              href="#results"
              className="px-8 py-4 rounded-xl text-base transition-all duration-300 inline-flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1.5px solid rgba(0, 0, 0, 0.12)',
                color: '#374151',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontWeight: '400'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(217, 119, 87, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.color = '#D97757';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.color = '#374151';
              }}
            >
              查看真实案例与数据 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;