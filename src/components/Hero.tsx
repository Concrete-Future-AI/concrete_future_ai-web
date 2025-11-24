import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-48 lg:pb-32 overflow-hidden" style={{ backgroundColor: '#F9F8F6' }}>
      {/* 背景装饰 */}
      <div 
        className="absolute top-0 left-0 w-[800px] h-[800px] opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #D97757 0%, transparent 60%)',
          transform: 'translate(-30%, -30%)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* 主标题 - Premium Typography */}
          <h1 
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-gray-900 mb-6 md:mb-8 lg:mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            让AI真正落地，转化为核心生产力
          </h1>

          {/* Sub-headline - Premium Spacing & Typography */}
          <p 
            className={`text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8 md:mb-10 lg:mb-16 transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            拒绝概念空谈。2周上线MVP，60天见效ROI。
            <br className="hidden md:block" />
            已助力120+行业领跑者实现平均600%回报率。
          </p>

          {/* CTA按钮组 - Premium Button Styling */}
          <div 
            className={`flex flex-col gap-4 md:flex-row md:gap-6 justify-center items-stretch md:items-center transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <a
              href="#contact"
              className="w-full md:w-auto px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 inline-flex items-center justify-center text-white shadow-lg hover:shadow-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
              style={{
                textDecoration: 'none',
                minWidth: '220px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              免费获取诊断方案
            </a>

            <a 
              href="#results"
              className="w-full md:w-auto px-8 py-4 rounded-lg text-base font-medium transition-all duration-300 inline-flex items-center justify-center bg-transparent text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-900"
              style={{
                textDecoration: 'none',
                minWidth: '220px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              查看真实增长案例 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;