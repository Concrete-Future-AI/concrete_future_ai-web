import React from 'react';

const ServiceCapabilities = () => {
  return (
    <section id="services" className="bg-white py-20 lg:py-28 relative overflow-hidden">
      {/* 背景装饰 */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #D97757 0%, transparent 70%)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 
            className="text-heading text-5xl lg:text-7xl mb-6"
            style={{ color: '#0A0A0A' }}
          >
            <span className="relative inline-block">
              我们不只是AI服务商
              <span 
                className="absolute left-0 right-0"
                style={{
                  bottom: '-8px',
                  height: '6px',
                  background: 'linear-gradient(90deg, #D97757 0%, #C96543 100%)',
                  opacity: 0.3,
                  borderRadius: '3px'
                }}
              ></span>
            </span>
          </h2>
          <p 
            className="text-body text-2xl lg:text-3xl text-gray-600"
          >
            更是您的长期增长伙伴
          </p>
        </div>

        {/* 2段核心文案 - 简约版 */}
        <div className="max-w-4xl mx-auto space-y-6">
          <p 
            className="text-body text-xl lg:text-2xl leading-relaxed text-center"
            style={{ color: '#374151', lineHeight: '1.8' }}
          >
            <span style={{ color: '#D97757', fontWeight: '600' }}>95%的AI项目死于"规划很美好，落地很骨感"。</span>
            深耕零售、金融、制造、跨境电商等15+垂直行业，我们说的每一个痛点，都是你昨天刚经历的。
            站在微软、Google、NUS等顶级生态肩膀上，
            <span style={{ color: '#D97757', fontWeight: '600' }}> 我们承诺：2周上线MVP，60天见到ROI，否则不收费。</span>
            不懂你的行业？那就不合作。先验证，再投入——每一分钱都花在刀刃上。
          </p>

          <p 
            className="text-body text-xl lg:text-2xl leading-relaxed text-center"
            style={{ color: '#374151', lineHeight: '1.8' }}
          >
            <span style={{ color: '#D97757', fontWeight: '600' }}>CONCRETE FUTURE (炬象未来)</span> 拥有复合型团队，融合AI技术与电商实战经验。
            团队曾创下
            <span className="text-data" style={{ color: '#D97757', fontWeight: '700' }}>一年赋能20,000+企业</span>、
            <span className="text-data" style={{ color: '#D97757', fontWeight: '700' }}>人效500万</span>、
            <span className="text-data" style={{ color: '#D97757', fontWeight: '700' }}>业绩100%年增长</span>
            的实战纪录。
            已在湖南股权交易所挂牌（310127HN），荣获"国家级先进制造业集群"认证，拥有阿里巴巴官方认证的明星/钻石讲师资质，是AI生意助手首批官方评测师。
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceCapabilities;