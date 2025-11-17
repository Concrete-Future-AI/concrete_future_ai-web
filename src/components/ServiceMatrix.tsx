import React from 'react';
import { Link } from 'react-router-dom';

const ServiceMatrix = () => {
  const services = [
    {
      number: '01',
      title: 'AI+企业通用服务',
      description: '让AI成为每个部门的"超级员工"。销售部门：智能CRM让成交率提升40%；HR部门：离职预警准确率85%；市场部门：AI内容生产效率提升700%；客服部门：客户满意度从60%→92%。覆盖9大核心场景，让每个岗位效率翻倍。',
      items: [
        '智能CRM，成交率提升40%', 
        '智能客服，满意度提升至92%',
      ],
      image: '/img/1.avif',
      imagePosition: 'left',
      ctaText: '了解详情',
      ctaLink: '#'
    },
    {
      number: '02', 
      title: '外贸电商数智化转型',
      description: '外贸老板的AI增长公式：AI智能客服24小时不下班，询盘转化率提升60%；AI批量生产素材，制作成本降82%，转化率提升40%；AI需求预测，库存周转从45天→28天，每年节省600万流动资金。不是教你用AI，而是直接帮你赚到钱。',
      items: [
        'AI战略咨询 & 团队AI培训',
        'AI化转型落地开发与部署',
        '交付效果：内容制作 & AI营销智能体代运营'
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
      title: '多行业数智化转型', 
      description: '你的行业，我们已经帮100家企业趟过坑。零售电商：AI驱动全链路增长；金融保险：风控模型精准度提升30%，审核效率提升10倍；制造业：质检AI识别率98%，质检工从3人→1人；教育培训：学生留存率+25%；医疗健康：医生工作量降低40%。不卖通用方案，只做行业深度定制。',
      items: [
        '覆盖零售、金融、医疗、教育等7+行业',
        // '行业垂直大模型训练与部署',
        '业务流程RPA智能化改造'
      ],
      image: '/img/3.svg',
      imagePosition: 'left',
      ctaText: '查看行业定制方案',
      ctaLink: '#'
    },
    {
      number: '04',
      title: 'AI+硬件场景定制',
      description: '让你的产品"会说话"，让品牌"活起来"。企业IP玩具：把企业吉祥物变成会聊天的AI伴侣；智能展馆：AI导览机器人，让参观者流连忘返；教育硬件：AI早教机器人，陪伴式学习效果提升200%；创意礼品：AI音箱、耳机、磁悬浮灯泡，让科技充满温度。硬件+AI，打造差异化竞争壁垒。',
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
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 last:mb-0">
        {/* Image Block */}
        <div className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="bg-orange-100 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
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

        {/* Text Block */}
        <div className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'} space-y-7`}>
          {/* Number Badge - Redesigned */}
          <div className="inline-flex items-center">
            <span 
              className="text-data text-xs tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.12) 0%, rgba(251, 146, 60, 0.08) 100%)',
                color: '#EA580C',
                border: '1.5px solid rgba(251, 146, 60, 0.2)',
                fontWeight: '700'
              }}
            >
              {service.number}
            </span>
          </div>

          {/* Title with Underline Decoration */}
          <div className="relative">
            <h3 
              className="text-subheading text-4xl lg:text-5xl text-gray-900"
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
          <p className="text-body text-lg lg:text-xl text-gray-600 max-w-xl pt-2">
            {service.description}
          </p>

          {/* Core Features Section with Glass Effect */}
          <div 
            className="rounded-2xl p-6 backdrop-blur-sm border flex items-center gap-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
              borderColor: 'rgba(0, 0, 0, 0.06)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Left: Content */}
            <div className="flex-1 space-y-4">
              {/* Label with Icon */}
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200/60">
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

              {/* Items List - Refined */}
              <div className="space-y-3">
                {service.items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-start gap-3 transition-all duration-300 ${!service.itemCtas ? 'hover:translate-x-1' : ''}`}
                  >
                    <div 
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
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
            </div>

            {/* Right: CTA Button (Only show if no itemCtas) */}
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
    );
  };

  return (
    <section id="matrix" className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            className="text-heading text-5xl lg:text-6xl text-black mb-6"
          >
            用AI赋能企业，
            <span className="text-display"> 打造智能化转型闭环</span>
          </h2>
          <p 
            className="text-body text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto"
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