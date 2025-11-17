import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ConsultationModal from './ConsultationModal';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#partners', label: '合作伙伴' },
    { href: '#matrix', label: '服务板块' },
    { href: '#results', label: '成功案例' },
    { href: '#contact', label: '联系我们' }
  ];

  return (
    <>
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.85)' 
          : 'rgba(255, 255, 255, 0)',
        borderBottom: isScrolled 
          ? '1px solid rgba(0, 0, 0, 0.06)' 
          : '1px solid transparent',
        boxShadow: isScrolled 
          ? '0 2px 20px rgba(0, 0, 0, 0.04)' 
          : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - 现代几何字体 */}
          <Link 
            to="/" 
            className="flex flex-col group"
          >
            <div 
              className="text-display text-2xl lg:text-3xl transition-all duration-300"
              style={{ 
                color: '#0A0A0A',
                lineHeight: '1'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#D97757';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#0A0A0A';
              }}
            >
              炬象未来
            </div>
            <div 
              className="text-data text-[9px] lg:text-[10px] tracking-wider"
              style={{ 
                color: '#9CA3AF',
                marginTop: '2px',
                letterSpacing: '0.15em'
              }}
            >
              CONCRETE FUTURE AI
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              isHomePage ? (
                <a
                  key={index}
                  href={link.href}
                  className="relative px-4 py-2 text-sm transition-all duration-300 rounded-lg group"
                  style={{
                    color: '#374151',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#D97757';
                    e.currentTarget.style.background = 'rgba(217, 119, 87, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                  <span 
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-6"
                    style={{ background: '#D97757' }}
                  ></span>
                </a>
              ) : (
                <Link
                  key={index}
                  to={`/${link.href}`}
                  className="relative px-4 py-2 text-sm transition-all duration-300 rounded-lg group"
                  style={{
                    color: '#374151',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#D97757';
                    e.currentTarget.style.background = 'rgba(217, 119, 87, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                  <span 
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-6"
                    style={{ background: '#D97757' }}
                  ></span>
                </Link>
              )
            ))}
            
            {/* CTA Button - 精致设计 */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="ml-4 px-6 py-2.5 rounded-xl text-sm transition-all duration-300 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 12px rgba(217, 119, 87, 0.3)',
                fontFamily: 'var(--font-display)',
                fontWeight: '800'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(217, 119, 87, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(217, 119, 87, 0.3)';
              }}
            >
              <span className="relative z-10">立即咨询</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              ></div>
            </button>
          </div>

          {/* Mobile menu button - 精致设计 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                background: isMenuOpen ? 'rgba(217, 119, 87, 0.1)' : 'transparent',
                color: isMenuOpen ? '#D97757' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (!isMenuOpen) {
                  e.currentTarget.style.background = 'rgba(217, 119, 87, 0.06)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMenuOpen) {
                  e.currentTarget.style.background = 'transparent';
                }
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

        {/* Mobile Navigation - 精致设计 */}
        {isMenuOpen && (
          <div 
            className="md:hidden mt-2 mb-4 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-sm transition-all duration-300"
                  style={{
                    color: '#374151',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '400'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(217, 119, 87, 0.06)';
                    e.currentTarget.style.color = '#D97757';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#374151';
                  }}
                >
                  {link.label}
                </a>
              ))}
              
              <button 
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full mt-3 px-4 py-3 rounded-xl text-sm transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #D97757 0%, #C96543 100%)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800'
                }}
              >
                立即咨询
              </button>
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