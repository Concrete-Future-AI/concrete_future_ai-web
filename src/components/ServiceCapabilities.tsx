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
        {/* Main Headline */}
        <div className="text-center mb-20">
          <h2 
            className="text-heading text-4xl lg:text-5xl font-bold"
            style={{ color: '#0A0A0A' }}
          >
            我们不只是AI服务商，更是您的长期增长伙伴
          </h2>
        </div>

        {/* Editorial List Layout - Three Rows with Dividers */}
        <div className="max-w-4xl mx-auto">
          {/* Row 1: 商业洞察 */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8 py-12 border-t border-gray-300">
            <div className="flex items-start">
              <h3 
                className="text-lg lg:text-xl font-bold tracking-wider text-gray-900 uppercase"
                style={{ fontFamily: 'monospace' }}
              >
                01 — 商业洞察
              </h3>
            </div>
            <div>
              <p 
                className="text-body text-base lg:text-lg leading-relaxed text-gray-700"
                style={{ lineHeight: '1.8' }}
              >
                <span style={{ fontWeight: '600' }}>95%的AI项目死于"规划很美好，落地很骨感"。</span>
                深耕零售、金融、制造、跨境电商等15+垂直行业，我们说的每一个痛点，都是你昨天刚经历的。
                我们承诺：<span style={{ fontWeight: '700', color: '#D97757' }}>2周上线MVP，60天见到ROI</span>，否则不收费。
                不懂你的行业？那就不合作。
              </p>
            </div>
          </div>

          {/* Row 2: 技术底座 */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8 py-12 border-t border-gray-300">
            <div className="flex items-start">
              <h3 
                className="text-lg lg:text-xl font-bold tracking-wider text-gray-900 uppercase"
                style={{ fontFamily: 'monospace' }}
              >
                02 — 技术底座
              </h3>
            </div>
            <div>
              <p 
                className="text-body text-base lg:text-lg leading-relaxed text-gray-700"
                style={{ lineHeight: '1.8' }}
              >
                <span style={{ fontWeight: '600' }}>拒绝"拼接式"开发，我们要的是企业级稳定交付。</span>
                作为 <span style={{ fontWeight: '700', color: '#D97757' }}>影刀RPA、飞书(Lark)、Coze(字节跳动)及阿里巴巴</span> 的深度生态合作伙伴，我们拥有原厂级的技术开发能力。
                为您构建的不再是割裂的工具，而是能无缝融入您现有业务流、安全可扩展的<span style={{ fontWeight: '700', color: '#D97757' }}>企业级智能化底座</span>。
              </p>
            </div>
          </div>

          {/* Row 3: 权威背书 */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8 py-12 border-t border-gray-300 border-b">
            <div className="flex items-start">
              <h3 
                className="text-lg lg:text-xl font-bold tracking-wider text-gray-900 uppercase"
                style={{ fontFamily: 'monospace' }}
              >
                03 — 权威背书
              </h3>
            </div>
            <div>
              <p 
                className="text-body text-base lg:text-lg leading-relaxed text-gray-700"
                style={{ lineHeight: '1.8' }}
              >
                <span style={{ fontWeight: '700', color: '#D97757' }}>炬象未来</span> 拥有复合型实战团队，在<span style={{ fontWeight: '700', color: '#D97757' }}>湖南股权交易所挂牌</span>（310127HN），荣获"<span style={{ fontWeight: '700', color: '#D97757' }}>国家级先进制造业集群</span>"认证及<span style={{ fontWeight: '700', color: '#D97757' }}>阿里巴巴官方讲师</span>资质。
                先验证，再投入——每一分钱都花在刀刃上。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCapabilities;