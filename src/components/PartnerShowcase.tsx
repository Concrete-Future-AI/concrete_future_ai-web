import React, { useEffect, useRef } from 'react';

const PartnerShowcase = () => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const scrollRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollSpeed1 = 0.5;  // 第一行速度
    const scrollSpeed2 = -0.6; // 第二行反向速度（稍快）
    const scrollSpeed3 = 0.7;  // 第三行速度（更快）
    
    const scrollElements = [
      { ref: scrollRef1, speed: scrollSpeed1 },
      { ref: scrollRef2, speed: scrollSpeed2 },
      { ref: scrollRef3, speed: scrollSpeed3 }
    ];

    let animationFrames: number[] = [];
    let isVisible = true;

    const startAnimations = () => {
      animationFrames = scrollElements.map(({ ref, speed }) => {
        let scrollPosition = 0;
        let lastTime = 0;
        
        const animate = (currentTime: number) => {
          if (ref.current && isVisible) {
            if (lastTime === 0) lastTime = currentTime;
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            
            // 匀速滚动，不受帧率影响
            scrollPosition += speed * (deltaTime / 16.67); // 标准化到60fps
            
            const scrollWidth = ref.current.scrollWidth / 2;
            
            // 处理正向和反向滚动的边界
            if (speed > 0) {
              if (scrollPosition >= scrollWidth) {
                scrollPosition = 0;
              }
            } else {
              if (scrollPosition <= -scrollWidth) {
                scrollPosition = 0;
              }
            }
            
            ref.current.scrollLeft = Math.abs(scrollPosition);
          }
          if (isVisible) {
            requestAnimationFrame(animate);
          }
        };
        
        return requestAnimationFrame(animate);
      });
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startAnimations();
      } else {
        animationFrames.forEach(frame => cancelAnimationFrame(frame));
      }
    };

    startAnimations();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      animationFrames.forEach(frame => cancelAnimationFrame(frame));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const partners = {
    government: [
      { name: '中国电信', logo: '/assets/china-telecom-logo.svg' },
      { name: '上海应用技术大学', logo: '/assets/上海应用技术大学.jpg' },
      { name: '东北林业大学', logo: '/assets/Nefu_Logo.svg.png' },
      { name: '海亮教育集团', logo: '/assets/idC0ublVZG_1762932044882.png' },
      { name: '工业和信息化部', logo: '/assets/工信部.png' },
      { name: '龙湖地产', logo: '/assets/longhu.png' },
      { name: '远东幕墙', logo: '/assets/远东.png' },
      { name: '君实生物', logo: '/assets/TopAlliance.png' }
    ],
    fortune500: [
      { name: 'Porsche', logo: '/assets/porsche-2.svg' },
      { name: 'Dell', logo: '/assets/dell-2.svg' },
      { name: 'VIVO', logo: '/assets/vivo-2.svg' },
      { name: '腾讯', logo: '/assets/tencent.svg' },
      { name: '阿里巴巴', logo: '/assets/alibaba-brand-color.svg' },
      { name: 'Coca-Cola', logo: '/assets/coca-cola-2021.svg' },
      { name: '友邦保险', logo: '/assets/aia-5.svg' },
    ],
    ecosystem: [
      { name: '影刀RPA', logo: '/assets/影刀.png' },
      { name: '飞书', logo: '/assets/bytedance-color.svg' },
      { name: 'Coze', logo: '/assets/doubao-color.svg' },
      { name: '阿里巴巴', logo: '/assets/alibaba-brand-color.svg' },
      { name: '微软亚洲研究院', logo: '/assets/idxyrLLIjl_logos.png' },
      { name: '新加坡国立大学', logo: '/assets/NUS_logo_full-horizontal.jpg' },
      { name: 'Google DeepMind', logo: '/assets/volcengine-color.svg' },
    ]
  };

  const PartnerRow = ({ 
    partners: partnerList, 
    scrollRef,
    isThirdRow = false
  }: { 
    partners: typeof partners.government; 
    scrollRef: React.RefObject<HTMLDivElement>;
    isThirdRow?: boolean;
  }) => (
    <div className="relative">
      <div 
        ref={scrollRef}
        className="overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
        }}
      >
        <div className="flex gap-6 will-change-transform">
          {/* 重复3次确保无缝滚动 */}
          {[...Array(3)].map((_, repeatIndex) => (
            <React.Fragment key={repeatIndex}>
              {partnerList.map((partner, index) => (
                <div key={`${repeatIndex}-${index}`} className="flex-shrink-0">
                  <PartnerCard partner={partner} isThirdRow={isThirdRow} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  const PartnerCard = ({ partner, isThirdRow = false }: { partner: { name: string; logo: string }; isThirdRow?: boolean }) => {
    // 第三行需要放大的Logo
    const largerLogos = ['飞书', 'Coze', '阿里巴巴', '新加坡国立大学', 'Google DeepMind'];
    const shouldBeLarger = isThirdRow && largerLogos.includes(partner.name);
    
    return (
      <div 
        className="bg-white rounded-xl px-6 py-4 flex items-center justify-center transition-all duration-300 hover:shadow-md"
        style={{
          border: '1px solid rgba(0, 0, 0, 0.06)',
          height: '72px',
          minWidth: shouldBeLarger ? '200px' : '140px'
        }}
      >
        {partner.logo ? (
          <img 
            src={partner.logo} 
            alt={partner.name}
            style={{
              maxHeight: shouldBeLarger ? '70px' : '40px',
              maxWidth: shouldBeLarger ? '256px' : '128px',
              objectFit: 'contain'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = 'text-body text-sm text-gray-700';
                span.textContent = partner.name;
                parent.appendChild(span);
              }
            }}
          />
        ) : (
          <span 
            className="text-body text-sm text-gray-700"
          >
            {partner.name}
          </span>
        )}
      </div>
    );
  };

  return (
    <section id="partners" className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-heading text-5xl lg:text-6xl text-black mb-6"
          >
            信任源自专业，创新来自合作
          </h2>
          <p 
            className="text-body text-xl lg:text-2xl text-gray-700"
          >
            已与100+全球领先企业和机构达成深度合作
          </p>
        </div>

        {/* Partner Rows - Anthropic Style */}
        <div className="space-y-4">
          <PartnerRow partners={partners.government} scrollRef={scrollRef1} />
          <PartnerRow partners={partners.fortune500} scrollRef={scrollRef2} />
          <PartnerRow partners={partners.ecosystem} scrollRef={scrollRef3} isThirdRow={true} />
        </div>
      </div>
    </section>
  );
};

export default PartnerShowcase;