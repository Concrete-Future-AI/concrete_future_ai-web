import React from 'react';

const Footer = () => {
  const footerLinks = {
    products: [
      { name: '服务能力', href: '#services' },
      { name: '四大服务板块', href: '#matrix' },
      { name: '合作伙伴', href: '#partners' },
      { name: '成功案例', href: '#results' }
    ],
    solutions: [
      { name: '智能客服', href: '#services' },
      { name: 'RPA自动化', href: '#services' },
      { name: '数据分析', href: '#results' },
      { name: '营销自动化', href: '#services' }
    ],
    company: [
      { name: '关于我们', href: '#research' },
      { name: '合作伙伴', href: '#partners' },
      { name: '成功案例', href: '#results' },
      { name: '联系我们', href: '#contact' }
    ],
    support: [
      { name: '技术支持', href: '#contact' },
      { name: '培训服务', href: '#services' },
      { name: '快速响应', href: '#contact' },
      { name: '效果保障', href: '#services' }
    ]
  };

  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <div className="mb-4 md:mb-6">
              <div 
                className="text-display text-xl md:text-2xl"
              >
                炬象未来
              </div>
            </div>
            <p 
              className="text-body text-xs md:text-sm text-gray-300 mb-4 md:mb-6"
            >
              专注于企业AI化转型，为各行各业提供专业的AI解决方案。
              让每一家企业都能享受AI技术带来的增长红利。
            </p>
          </div>

          {/* Products */}
          <div className="text-center sm:text-left">
            <h3 
              className="text-label text-gray-400 mb-3 md:mb-4 text-xs md:text-sm"
            >
              产品服务
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-body text-xs md:text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="text-center sm:text-left">
            <h3 
              className="text-label text-gray-400 mb-3 md:mb-4 text-xs md:text-sm"
            >
              解决方案
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-body text-xs md:text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h3 
              className="text-label text-gray-400 mb-3 md:mb-4 text-xs md:text-sm"
            >
              公司信息
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-body text-xs md:text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h3 
              className="text-label text-gray-400 mb-3 md:mb-4 text-xs md:text-sm"
            >
              支持帮助
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-body text-xs md:text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6 md:my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div 
            className="text-body text-xs md:text-sm text-gray-400 text-center md:text-left"
          >
            © 2025 炬象未来. 保留所有权利.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400">
            <a 
              href="#privacy" 
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400'
              }}
            >
              隐私政策
            </a>
            <a 
              href="#terms" 
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400'
              }}
            >
              服务条款
            </a>
            <a 
              href="#security" 
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '400'
              }}
            >
              安全声明
            </a>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;