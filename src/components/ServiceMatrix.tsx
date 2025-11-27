import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  imagePosition: string;
  ctaText?: string;
  ctaLink?: string;
  itemCtas?: { text: string; link: string }[];
}

const ServiceMatrix = () => {
  const services: ServiceItem[] = [
    {
      number: '01',
      title: '企业AI化转型 · 9大场景落地',
      description: '从销售到HR，从客服到供应链——我们帮你把AI真正用起来，90天交付见效。',
      items: [
        '销售智能助手 · 转化率+40%', 
        'HR离职预警 · 准确率85%',
        '营销内容生成 · 产能提升7倍',
        '24小时AI客服 · 满意度92%',
      ],
      image: '/img/1.avif',
      imagePosition: 'left',
      ctaText: '查看9大场景',
      ctaLink: '/enterprise-ai'
    },
    {
      number: '02', 
      title: '电商AI增长引擎 · 7大核心能力',
      description: '从直播到投放，从选品到内容——AI替你7×24小时跑业绩，人工成本降90%。',
      items: [
        'AI咨询培训 · 找到最适合的切入点',
        '落地开发 · 系统部署业务零中断',
        '效果交付 · 内容代制作/智能体代运营'
      ],
      itemCtas: [
        { text: '了解详情', link: '/ai-transformation' },
        { text: '了解详情', link: '/ai-implementation' },
        { text: '了解详情', link: '/ai-implementation' }
      ],
      image: '/img/2.png',
      imagePosition: 'right'
    },
    {
      number: '03',
      title: '行业AI解决方案 · 7+垂直领域', 
      description: '零售、金融、制造、医疗——每个行业都有专属AI方案，不套模板，只解决你的真问题。',
      items: [
        '零售行业 · 智能选品+库存优化',
        '金融行业 · 风控+合规自动化',
        '制造行业 · 质检+供应链AI'
      ],
      image: '/img/3.svg',
      imagePosition: 'left',
      ctaText: '获取行业方案',
      ctaLink: '#'
    },
    {
      number: '04',
      title: 'AI+硬件定制 · 让产品会说话',
      description: '把AI装进你的产品里——从玩具到终端，从展馆到礼品，产品溢价提升200%。',
      items: [
        'IP衍生品 · 互动玩具/手办/吉祥物',
        '智能终端 · 展馆导览/教育机器人',
        '企业礼品 · AI音箱/耳机/创意硬件'
      ],
      image: '/img/4.avif',
      imagePosition: 'right',
      ctaText: '了解定制方案',
      ctaLink: '#'
    }
  ];

  const ServiceRow = ({ service }: { service: ServiceItem }) => {
    const isImageLeft = service.imagePosition === 'left';
    
    return (
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center mb-10 md:mb-12 lg:mb-16 last:mb-0">
        {/* Image Block - Always first on mobile */}
        <div className={`order-1 w-full ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="bg-orange-100 rounded-2xl p-6 md:p-8 h-56 md:h-64 lg:h-80 flex items-center justify-center relative overflow-hidden">
            {/* Orange gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-300 opacity-50"></div>
            
            {/* Image */}
            <div className="relative z-10">
              <img 
                src={service.image} 
                alt={service.title}
                className="max-w-full max-h-48 md:max-h-56 lg:max-h-64 object-contain rounded-lg shadow-lg"
              />
            </div>
            
            {/* Top Label */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div 
                className="text-label bg-black text-white px-3 py-1 rounded-full text-xs md:text-sm"
              >
                {service.title}
              </div>
            </div>
          </div>
        </div>

        {/* Text Block - Always second on mobile */}
        <div className={`order-2 w-full ${isImageLeft ? 'lg:order-2' : 'lg:order-1'} space-y-3 md:space-y-4 lg:space-y-7`}>
          {/* Number Badge - Bold Outlined Style */}
          <div className="inline-flex items-center mb-1 md:mb-2 lg:mb-4">
            <div 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold"
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#EA580C',
                border: '2px solid #EA580C',
                background: 'rgba(251, 146, 60, 0.05)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {service.number}
            </div>
          </div>

          {/* Title with Underline Decoration */}
          <div className="relative">
            <h3 
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-gray-900 font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {service.title}
            </h3>
            <div 
              className="absolute -bottom-2 left-0 h-1 rounded-full"
              style={{
                width: '40px',
                background: 'linear-gradient(90deg, #FB923C 0%, #F97316 100%)'
              }}
            ></div>
          </div>

          {/* Description with Better Typography */}
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xl pt-1 md:pt-2"
            style={{ fontFamily: 'var(--font-body)', lineHeight: '1.7' }}
          >
            {service.description}
          </p>

          {/* Core Features Section with Glass Effect */}
          <div 
            className="rounded-2xl p-4 md:p-6 backdrop-blur-sm border flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
              borderColor: 'rgba(0, 0, 0, 0.06)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Header Row (Top) */}
            <div className="flex items-center gap-2 pb-3 md:pb-4 mb-3 md:mb-4 border-b border-gray-200/60">
              <svg 
                className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span 
                className="text-label text-gray-700 text-xs md:text-sm"
              >
                核心能力
              </span>
            </div>

            {/* Content Row (Bottom): List + Button */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              {/* List Section */}
              <div className="flex-1 space-y-2 md:space-y-3">
                {service.items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-start gap-2 md:gap-3 transition-all duration-300 ${!service.itemCtas ? 'hover:translate-x-1' : ''}`}
                  >
                    <div 
                      className="mt-1.5 md:mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FB923C 0%, #EA580C 100%)'
                      }}
                    ></div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <span 
                        className={`text-body text-sm sm:text-base text-gray-700 transition-colors ${!service.itemCtas ? 'group-hover:text-orange-600' : ''}`}
                      >
                        {item}
                      </span>
                      {service.itemCtas && service.itemCtas[index] && (
                        service.itemCtas[index].link.startsWith('/') ? (
                          <Link
                            to={service.itemCtas[index].link}
                            className="text-label inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-sm hover:border-orange-500 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50/50 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
                          >
                            <span>{service.itemCtas[index].text}</span>
                            <svg 
                              className="w-3.5 h-3.5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2.5} 
                                d="M17 8l4 4m0 0l-4 4m4-4H3" 
                              />
                            </svg>
                          </Link>
                        ) : (
                          <a
                            href={service.itemCtas[index].link}
                            className="text-label inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-sm hover:border-orange-500 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50/50 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
                          >
                            <span>{service.itemCtas[index].text}</span>
                            <svg 
                              className="w-3.5 h-3.5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2.5} 
                                d="M17 8l4 4m0 0l-4 4m4-4H3" 
                              />
                            </svg>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Button Section (Only show if no itemCtas) */}
              {!service.itemCtas && service.ctaLink && (
                <div className="flex-shrink-0 w-full lg:w-auto mt-2 lg:mt-0">
                  {service.ctaLink.startsWith('/') ? (
                    <Link 
                      to={service.ctaLink}
                      className="text-subheading inline-flex items-center justify-center gap-2 md:gap-3 px-5 md:px-7 py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-sm md:text-base hover:border-orange-500 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50/50 transition-all duration-300 group shadow-sm hover:shadow-md whitespace-nowrap w-full lg:w-auto"
                    >
                      <span>{service.ctaText}</span>
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </Link>
                  ) : (
                    <a 
                      href={service.ctaLink}
                      className="text-subheading inline-flex items-center justify-center gap-2 md:gap-3 px-5 md:px-7 py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-sm md:text-base hover:border-orange-500 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50/50 transition-all duration-300 group shadow-sm hover:shadow-md whitespace-nowrap w-full lg:w-auto"
                    >
                      <span>{service.ctaText}</span>
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="matrix" className="py-12 md:py-20 lg:py-24" style={{ backgroundColor: '#F9F8F6' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-20">
          <h2 
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-black mb-3 md:mb-4 lg:mb-6 font-bold px-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            用AI赋能企业，
            <span className="block md:inline"> 打造智能化转型闭环</span>
          </h2>
          <p 
            className="text-base md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto px-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            从战略咨询到技术实施，我们提供全方位的AI解决方案
          </p>
        </div>

        {/* Service Rows */}
        <div className="max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceRow key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;