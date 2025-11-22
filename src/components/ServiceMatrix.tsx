import React from 'react';
import { Link } from 'react-router-dom';

const ServiceMatrix = () => {
  const services = [
    {
      number: '01',
      title: '全员效能倍增引擎',
      description: '这不是工具，而是你未来的『超级员工』。让AI接管重复劳动，让人才回归创造价值。',
      items: [
        '智能CRM · 转化率飙升 40%', 
        '离职预警 · 准确率 85%',
        '内容工场 · 产能提升 700%',
        '全天候客服 · 满意度 92%',
      ],
      image: '/img/1.avif',
      imagePosition: 'left',
      ctaText: '查看降本数据',
      ctaLink: '#'
    },
    {
      number: '02', 
      title: '24小时不眠的业绩收割机',
      description: '外贸老板的增长黑客：我们不教你怎么用AI，我们直接用AI帮你把钱赚回来。库存周转快一倍，流动资金省百万。',
      items: [
        '增长咨询：找到最赚钱的切入点',
        '无感部署：现有业务零中断',
        '结果对赌：只为增长指标负责'
      ],
      itemCtas: [
        { text: '了解详情', link: '/ai-transformation' },
        { text: '了解详情', link: '/ai-implementation' },
        { text: '了解详情', link: '#' }
      ],
      image: '/img/2.png',
      imagePosition: 'right'
    },
    {
      number: '03',
      title: '懂行业的AI，才是真AI', 
      description: '拒绝通用模版。我们在零售、金融、制造等7+行业摸爬滚打，把踩过的坑填成你的护城河。',
      items: [
        '覆盖零售、金融、医疗、教育等7+行业',
        '业务流程RPA智能化改造'
      ],
      image: '/img/3.svg',
      imagePosition: 'left',
      ctaText: '获取 [你的行业] 解决方案',
      ctaLink: '#'
    },
    {
      number: '04',
      title: '让硬件拥有『灵魂』',
      description: '从冷冰冰的设备，变成会说话、懂人心的智能伙伴。产品溢价提升200%，差异化竞争的终极武器。',
      items: [
        '互动玩具、IP手办、企业吉祥物定制',
        '智能终端、展馆导览、教育机器人',
        'AI音箱、耳机、磁悬浮灯泡等礼品'
      ],
      image: '/img/4.avif',
      imagePosition: 'right',
      ctaText: '了解定制方案',
      ctaLink: '#'
    }
  ];

  const ServiceRow = ({ service }: { service: typeof services[0] }) => {
    const isImageLeft = service.imagePosition === 'left';
    
    return (
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-16 last:mb-0">
        {/* Image Block - Always first on mobile */}
        <div className={`order-1 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="bg-orange-100 rounded-2xl p-6 md:p-8 h-64 md:h-80 flex items-center justify-center relative overflow-hidden">
            {/* Orange gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-300 opacity-50"></div>
            
            {/* Image */}
            <div className="relative z-10">
              <img 
                src={service.image} 
                alt={service.title}
                className="max-w-full max-h-64 object-contain rounded-lg shadow-lg"
              />
            </div>
            
            {/* Top Label */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div 
                className="text-label bg-black text-white px-3 py-1 rounded-full"
              >
                {service.title}
              </div>
            </div>
          </div>
        </div>

        {/* Text Block - Always second on mobile */}
        <div className={`order-2 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'} space-y-4 md:space-y-7`}>
          {/* Number Badge - Bold Outlined Style */}
          <div className="inline-flex items-center mb-2 md:mb-4">
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
              className="text-2xl md:text-4xl lg:text-5xl text-gray-900 font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {service.title}
            </h3>
            <div 
              className="absolute -bottom-2 left-0 h-1 rounded-full"
              style={{
                width: '56px',
                background: 'linear-gradient(90deg, #FB923C 0%, #F97316 100%)'
              }}
            ></div>
          </div>

          {/* Description with Better Typography */}
          <p 
            className="text-base md:text-lg lg:text-xl text-gray-600 max-w-xl pt-2"
            style={{ fontFamily: 'var(--font-body)', lineHeight: '1.7' }}
          >
            {service.description}
          </p>

          {/* Core Features Section with Glass Effect */}
          <div 
            className="rounded-2xl p-6 backdrop-blur-sm border flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
              borderColor: 'rgba(0, 0, 0, 0.06)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Header Row (Top) */}
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-200/60">
              <svg 
                className="w-5 h-5 text-orange-500" 
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
                className="text-label text-gray-700"
              >
                核心能力
              </span>
            </div>

            {/* Content Row (Bottom): List + Button */}
            <div className="flex items-center justify-between gap-6">
              {/* List Section */}
              <div className="flex-1 space-y-3">
                {service.items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-start gap-3 transition-all duration-300 ${!service.itemCtas ? 'hover:translate-x-1' : ''}`}
                  >
                    <div 
                      className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FB923C 0%, #EA580C 100%)'
                      }}
                    ></div>
                    <div className="flex-1 flex items-center justify-between gap-4">
                      <span 
                        className={`text-body text-base text-gray-700 transition-colors ${!service.itemCtas ? 'group-hover:text-orange-600' : ''}`}
                      >
                        {item}
                      </span>
                      {service.itemCtas && service.itemCtas[index] && (
                        service.itemCtas[index].link.startsWith('/') ? (
                          <Link
                            to={service.itemCtas[index].link}
                            className="text-label inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 whitespace-nowrap"
                          >
                            <span>{service.itemCtas[index].text}</span>
                            <svg 
                              className="w-3 h-3" 
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
                            className="text-label inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 whitespace-nowrap"
                          >
                            <span>{service.itemCtas[index].text}</span>
                            <svg 
                              className="w-3 h-3" 
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
                <div className="flex-shrink-0">
                  {service.ctaLink.startsWith('/') ? (
                    <Link 
                      to={service.ctaLink}
                      className="text-subheading inline-flex items-center gap-3 px-7 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-base hover:border-orange-500 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50/50 transition-all duration-300 group shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                      <span>{service.ctaText}</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
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
                      className="text-subheading inline-flex items-center gap-3 px-7 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-base hover:border-orange-500 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50/50 transition-all duration-300 group shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                      <span>{service.ctaText}</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
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
        <div className="text-center mb-12 md:mb-20">
          <h2 
            className="text-3xl md:text-5xl lg:text-6xl text-black mb-4 md:mb-6 font-bold px-4"
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