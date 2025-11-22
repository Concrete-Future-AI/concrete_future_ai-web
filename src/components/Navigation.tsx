import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ConsultationModal from './ConsultationModal';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { href: '#partners', label: '合作伙伴' },
    { href: '#matrix', label: '服务板块' },
    { href: '#results', label: '成功案例' },
    { href: '#contact', label: '联系我们' }
  ];

  return (
    <>
    <nav 
      className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-black/5"
      style={{
        background: 'rgba(249, 248, 246, 0.8)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Typographic Logo - Brand Command Center */}
          <Link 
            to="/" 
            className="flex flex-col group"
          >
            {/* Chinese Brand Name with Accent */}
            <div className="flex items-center gap-1.5">
              <span 
                className="text-2xl font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-[#D97757]"
                style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
                  lineHeight: '1'
                }}
              >
                炬象未来
              </span>
              {/* Brand Spark Accent */}
              <span 
                className="w-1.5 h-1.5 rounded-sm transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: '#D97757' }}
              ></span>
            </div>
            
            {/* English Tagline */}
            <div 
              className="text-[10px] uppercase tracking-[0.2em] text-gray-500 transition-colors duration-300 group-hover:text-gray-700"
              style={{ 
                fontFamily: 'var(--font-display)',
                marginTop: '2px'
              }}
            >
              CONCRETE FUTURE AI
            </div>
          </Link>

          {/* Desktop Navigation - Refined Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              isHomePage ? (
                <a
                  key={index}
                  href={link.href}
                  className="relative text-sm text-gray-600 transition-colors duration-300 group"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: '500'
                  }}
                >
                  <span className="group-hover:text-black transition-colors duration-300">
                    {link.label}
                  </span>
                  {/* Smooth Underline Animation - Left to Right */}
                  <span 
                    className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full"
                  ></span>
                </a>
              ) : (
                <Link
                  key={index}
                  to={`/${link.href}`}
                  className="relative text-sm text-gray-600 transition-colors duration-300 group"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: '500'
                  }}
                >
                  <span className="group-hover:text-black transition-colors duration-300">
                    {link.label}
                  </span>
                  {/* Smooth Underline Animation - Left to Right */}
                  <span 
                    className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full"
                  ></span>
                </Link>
              )
            ))}
            
            {/* Header CTA Button - Refined Pill Design */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="ml-6 px-6 py-2 rounded-lg text-sm text-white font-bold transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
              style={{
                fontFamily: 'var(--font-display)'
              }}
            >
              立即咨询
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile CTA Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-1.5 rounded-lg text-xs text-white font-bold transition-all duration-300 shadow-md bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
              style={{
                fontFamily: 'var(--font-display)'
              }}
            >
              咨询
            </button>
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                background: isMenuOpen ? 'rgba(217, 119, 87, 0.1)' : 'transparent',
                color: isMenuOpen ? '#D97757' : '#4B5563'
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden mt-2 mb-4 rounded-2xl overflow-hidden backdrop-blur-lg border border-black/5 shadow-xl"
            style={{
              background: 'rgba(249, 248, 246, 0.95)'
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-sm text-gray-600 transition-all duration-300 hover:bg-orange-50 hover:text-black font-medium"
                  style={{
                    fontFamily: 'var(--font-body)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
    
    {/* 咨询弹窗 */}
    <ConsultationModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
  </>
  );
};

export default Navigation;