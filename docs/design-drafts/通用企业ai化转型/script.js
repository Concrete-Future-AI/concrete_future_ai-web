// ==================== 高级动效系统 ====================
// 作者: AI化转型网站重设计
// 功能: Navbar interactions, Scroll animations, Counter animations, Parallax effects, Cursor tracking

// ==================== 0. 导航栏交互 ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 更新CSS变量：导航栏高度
    const updateNavbarHeight = () => {
        const height = navbar.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
    };
    
    // 初始化和窗口大小变化时更新
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    // 滚动时添加背景
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 导航栏高度可能在滚动时改变，更新CSS变量
        updateNavbarHeight();
        
        lastScroll = currentScroll;
    });

    // 移动端菜单切换
    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    });

    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // 特殊处理：如果目标在Tab内，先激活对应Tab
                if (targetId === 'features' || targetId === 'geo-service') {
                    const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
                    const tabPanes = document.querySelectorAll('.tab-pane');
                    
                    if (targetId === 'geo-service') {
                        // 激活GEO Tab
                        serviceTabBtns.forEach(btn => btn.classList.remove('active'));
                        tabPanes.forEach(pane => pane.classList.remove('active'));
                        document.querySelector('.service-tab-btn[data-tab="geo"]')?.classList.add('active');
                        document.getElementById('tab-geo')?.classList.add('active');
                    } else if (targetId === 'features') {
                        // 激活AI化转型Tab
                        serviceTabBtns.forEach(btn => btn.classList.remove('active'));
                        tabPanes.forEach(pane => pane.classList.remove('active'));
                        document.querySelector('.service-tab-btn[data-tab="ai-transformation"]')?.classList.add('active');
                        document.getElementById('tab-ai-transformation')?.classList.add('active');
                    }
                    
                    // 等待Tab切换完成后再滚动到Tab区域
                    setTimeout(() => {
                        const tabSection = document.querySelector('.service-details-tabs-section');
                        if (tabSection) {
                            const navbarHeight = navbar.offsetHeight;
                            const targetPosition = tabSection.offsetTop - navbarHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                } else {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const navbarHeight = navbar.offsetHeight;
                        const targetPosition = targetElement.offsetTop - navbarHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}

// ==================== 1. 数字计数动画 ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 初始化数字计数器
function initCounters() {
    const counters = document.querySelectorAll('.metric-value[data-target]');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target, 2000);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ==================== 2. Scroll-triggered 动画 ====================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate, .pain-card, .timeline-item');

    // 确保需要动画的元素都有基础类，避免默认状态被隐藏
    elements.forEach(el => {
        if (!el.classList.contains('scroll-animate')) {
            el.classList.add('scroll-animate');
        }
    });

    // 兼容不支持IntersectionObserver的环境
    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                // 添加延迟以创建交错效果
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ==================== 3. Feature Cards 左右交替动画 ====================
function initFeatureAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                const index = Array.from(featureCards).indexOf(entry.target);
                const isEven = index % 2 === 0;

                if (isEven) {
                    entry.target.classList.add('scroll-animate-left');
                } else {
                    entry.target.classList.add('scroll-animate-right');
                }

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 150);
            }
        });
    }, observerOptions);

    featureCards.forEach(card => observer.observe(card));
}

// ==================== 4. Parallax 背景效果 ====================
function initParallax() {
    const hero = document.querySelector('.hero-section');

    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Hero section parallax - 轻微视差效果
                if (hero && scrolled < window.innerHeight) {
                    const heroOffset = scrolled * 0.3;
                    const heroElements = hero.querySelectorAll('.hero-content > *');
                    heroElements.forEach((el, index) => {
                        const speed = 0.1 + (index * 0.05);
                        el.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                }

                ticking = false;
            });

            ticking = true;
        }
    });
}

// ==================== 5. 鼠标跟踪光标效果 ====================
function initCursorEffect() {
    // 仅在桌面设备上启用
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }

    // 创建光标元素
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 24px;
        height: 24px;
        border: 2px solid rgba(107, 15, 26, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.2s ease;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
        display: none;
    `;

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: #6B0F1A;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        display: none;
    `;

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.display = 'block';
        cursorDot.style.display = 'block';

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // 平滑跟随效果
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.2;
        cursorY += dy * 0.2;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // 悬停效果
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .metric-card, .pain-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(107, 15, 26, 0.08)';
            cursor.style.borderColor = 'rgba(212, 165, 116, 0.8)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '24px';
            cursor.style.height = '24px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderColor = 'rgba(107, 15, 26, 0.6)';
        });
    });
}

// ==================== 6. 平滑滚动到锚点 ====================
function initSmoothScroll() {
    // 注意：导航链接的平滑滚动已在 initNavbar 中处理
    // 避免重复绑定导致冲突和内容被导航栏遮挡
    // 此函数保留但不执行，如需为特定非导航链接添加平滑滚动，请在此处添加特定选择器
    return;
}

// ==================== 7. 按钮涟漪效果 ====================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ==================== 8. 进度指示器 ====================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #6B0F1A, #AB3544, #D4A574);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(107, 15, 26, 0.3);
    `;
    document.body.appendChild(progressBar);

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = (scrollTop / scrollHeight) * 100;

                progressBar.style.width = scrollPercent + '%';
                ticking = false;
            });

            ticking = true;
        }
    });
}

// ==================== 9. 卡片3D倾斜效果 ====================
function initCard3D() {
    const cards = document.querySelectorAll('.metric-card, .pain-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// ==================== 10. 图标旋转动画 ====================
function initIconAnimations() {
    const icons = document.querySelectorAll('.metric-icon, .feature-icon svg');

    icons.forEach(icon => {
        const parent = icon.closest('.metric-card, .feature-card');

        if (parent) {
            parent.addEventListener('mouseenter', function() {
                icon.style.animation = 'iconBounce 0.6s ease';
            });

            parent.addEventListener('animationend', function() {
                icon.style.animation = '';
            });
        }
    });
}

// ==================== 11. 添加必要的CSS动画 ====================
function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes iconBounce {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.15) rotate(-8deg); }
            50% { transform: scale(1.2) rotate(0deg); }
            75% { transform: scale(1.15) rotate(8deg); }
        }

        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }

        /* 卡片3D变换的过渡 */
        .metric-card, .pain-card {
            transition: transform 0.2s ease-out;
        }

        /* 光标隐藏默认光标 */
        body.custom-cursor-active {
            cursor: none;
        }

        body.custom-cursor-active a,
        body.custom-cursor-active button,
        body.custom-cursor-active .feature-card,
        body.custom-cursor-active .metric-card,
        body.custom-cursor-active .pain-card {
            cursor: none;
        }
    `;
    document.head.appendChild(style);
}

// ==================== 12. 性能优化: 防抖函数 ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== 13. CTA按钮功能 ====================
function initCTAButtons() {
    const btnPrimary = document.querySelectorAll('.btn-primary');
    const btnSecondary = document.querySelectorAll('.btn-secondary');

    btnPrimary.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 阻止默认的链接跳转（如果是a标签）
            if (btn.tagName === 'A') {
                e.preventDefault();
            }
            // 这里可以添加打开咨询表单的逻辑
            console.log('免费咨询按钮被点击');
        });
    });

    btnSecondary.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.tagName === 'A') {
                e.preventDefault();
            }
            console.log('查看案例按钮被点击');
        });
    });
}

// ==================== 14. 性能监控 ====================
function initPerformanceMonitoring() {
    // 页面加载性能
    window.addEventListener('load', () => {
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`页面加载时间: ${loadTime}ms`);
        }
    });

    // 监控长任务
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.warn('检测到长任务:', entry.duration + 'ms');
                }
            });
            observer.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // PerformanceObserver不支持longtask
        }
    }
}

// ==================== Features Tab 切换 ====================
function initFeaturesTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const featureCards = document.querySelectorAll('.feature-card');

    if (tabBtns.length === 0 || featureCards.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 筛选卡片
            featureCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    // 触发重新动画
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ==================== 主初始化函数 ====================
function init() {
    console.log('🚀 正在初始化动效系统...');

    // 注入CSS样式
    injectAnimationStyles();

    // 导航栏交互
    initNavbar();

    // Features Tab切换
    initFeaturesTabs();

    // 服务详情Tab切换
    if (typeof window.siteFunctions !== 'undefined' && window.siteFunctions.initTabs) {
        window.siteFunctions.initTabs();
    }

    // 基础功能 - 所有设备
    initCounters();
    initScrollAnimations();
    initFeatureAnimations();
    initSmoothScroll();
    initRippleEffect();
    initScrollProgress();
    initIconAnimations();
    initCTAButtons();

    // 桌面设备专属功能
    if (window.innerWidth > 768) {
        initCard3D();
        // initCursorEffect(); // 可选：启用自定义光标
        // initParallax(); // 可选：启用视差效果（可能影响性能）
    }

    // 开发环境性能监控
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        initPerformanceMonitoring();
    }

    console.log('✨ 网站动效系统已加载完成');
}

// ==================== 页面加载完成后初始化 ====================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== 导出API (可选) ====================
window.AnimationSystem = {
    initCounters,
    initScrollAnimations,
    initFeatureAnimations,
    initParallax,
    initCursorEffect,
    initSmoothScroll,
    initRippleEffect,
    initScrollProgress,
    initCard3D,
    initIconAnimations
};

// ==================== 错误处理 ====================
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
});

// ==================== 响应式处理 ====================
let resizeTimer;
window.addEventListener('resize', debounce(() => {
    console.log('窗口大小变化，重新初始化部分功能');
    // 响应式重新初始化
    if (window.innerWidth <= 768) {
        // 移动设备：禁用某些效果
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.custom-cursor-dot');
        if (cursor) cursor.remove();
        if (cursorDot) cursorDot.remove();
    }
}, 250));

// ==================== Tab切换功能（服务详情） ====================
function initTabs() {
    const tabButtons = document.querySelectorAll('.service-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // 移除所有active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // 添加active类到当前选中的
            button.classList.add('active');
            const targetPane = document.getElementById(`tab-${targetTab}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }

            // 添加切换动画
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// 初始化window.siteFunctions对象并导出Tab功能
if (typeof window.siteFunctions === 'undefined') {
    window.siteFunctions = {};
}
window.siteFunctions.initTabs = initTabs;

// ==================== 深度链接支持（URL hash自动激活Tab） ====================
function handleDeepLink() {
    const hash = window.location.hash;
    if (!hash) return;
    
    const targetId = hash.substring(1);
    
    // 如果目标在Tab内，激活对应Tab
    if (targetId === 'features' || targetId === 'geo-service') {
        const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        if (targetId === 'geo-service') {
            // 激活GEO Tab
            serviceTabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.querySelector('.service-tab-btn[data-tab="geo"]')?.classList.add('active');
            document.getElementById('tab-geo')?.classList.add('active');
        } else if (targetId === 'features') {
            // 激活AI化转型Tab
            serviceTabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.querySelector('.service-tab-btn[data-tab="ai-transformation"]')?.classList.add('active');
            document.getElementById('tab-ai-transformation')?.classList.add('active');
        }
        
        // 等待Tab激活后再滚动
        setTimeout(() => {
            const tabSection = document.querySelector('.service-details-tabs-section');
            if (tabSection) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 73;
                const targetPosition = tabSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

// 页面加载和hash变化时处理深度链接
window.addEventListener('load', handleDeepLink);
window.addEventListener('hashchange', handleDeepLink);

