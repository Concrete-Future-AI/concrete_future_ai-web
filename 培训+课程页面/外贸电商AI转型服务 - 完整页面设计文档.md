# 外贸电商AI转型服务 - 完整页面设计文档

## 基于Anthropic风格的现代简约设计

------

## 🎨 整体设计规范（参考Anthropic风格）

### **一、配色系统**

```css
/* 主色调 - 简约现代 */
--background-primary: #F5F5F0;      /* 浅米白背景 */
--background-secondary: #E8E6DD;    /* 卡片背景浅色 */
--background-card: #FFFEF9;         /* 卡片纯白 */

/* 文字颜色 */
--text-primary: #1A1A1A;            /* 主标题深黑 */
--text-secondary: #4A4A4A;          /* 正文深灰 */
--text-tertiary: #6B6B6B;           /* 辅助文字中灰 */

/* 强调色 */
--accent-primary: #F97316;          /* 行动橙 - CTA按钮 */
--accent-secondary: #EF4444;        /* 警示红 - 紧迫感 */
--accent-success: #10B981;          /* 成功绿 - 正向数据 */

/* 按钮颜色 */
--button-primary: #1A1A1A;          /* 黑色主按钮 */
--button-primary-hover: #2D2D2D;    /* 悬停深灰 */
--button-secondary: #FFFFFF;        /* 白色次级按钮 */
--button-border: #1A1A1A;           /* 按钮边框 */

/* 边框和分割 */
--border-light: #D4D2C8;            /* 浅色边框 */
--border-medium: #B8B6AC;           /* 中等边框 */
```

### **二、字体系统**

```css
/* 字体家族 */
--font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", 
                "PingFang SC", "Hiragino Sans GB", 
                "Microsoft YaHei", sans-serif;

/* 字体大小 */
--font-size-hero: 56px;             /* 主标题 */
--font-size-h1: 42px;               /* 一级标题 */
--font-size-h2: 32px;               /* 二级标题 */
--font-size-h3: 24px;               /* 三级标题 */
--font-size-body-large: 18px;       /* 大正文 */
--font-size-body: 16px;             /* 正文 */
--font-size-small: 14px;            /* 小字 */

/* 字重 */
--font-weight-bold: 700;
--font-weight-semibold: 600;
--font-weight-medium: 500;
--font-weight-regular: 400;

/* 行高 */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### **三、间距系统**

```css
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 32px;
--spacing-xl: 48px;
--spacing-2xl: 64px;
--spacing-3xl: 96px;
--spacing-4xl: 128px;
```

### **四、圆角系统**

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

### **五、阴影系统**

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08);
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.06);
```

------

## 📱 主页入口卡片设计

### **设计规格**

```
尺寸：400px × 480px
圆角：16px
背景：#E8E6DD (浅米色)
内边距：32px
阴影：0 2px 8px rgba(0, 0, 0, 0.06)
```

### **完整HTML/CSS实现**

```html
<div class="ai-transformation-card">
  <!-- 顶部标签 -->
  <div class="card-tag">
    <span class="warning-icon">⚠️</span>
    <span class="tag-text">你的竞争对手已经AI化了</span>
  </div>
  
  <!-- 主标题 -->
  <h3 class="card-title">
    外贸电商AI转型<br>
    让效率提升<span class="highlight">10倍</span>的秘密
  </h3>
  
  <!-- 核心价值点 -->
  <div class="value-points">
    <div class="value-item">
      <span class="check-icon">✓</span>
      <span class="value-text">1分钟生成100封开发信</span>
    </div>
    <div class="value-item">
      <span class="check-icon">✓</span>
      <span class="value-text">10秒完成专业视觉设计</span>
    </div>
    <div class="value-item">
      <span class="check-icon">✓</span>
      <span class="value-text">7×24小时AI数字人直播</span>
    </div>
  </div>
  
  <!-- 服务说明 -->
  <div class="service-info">
    <span class="service-label">深度咨询 ¥1,000/小时</span>
    <span class="divider">|</span>
    <span class="service-label">企业内训</span>
  </div>
  
  <!-- 行动按钮 -->
  <button class="card-cta">
    <span>了解如何开始转型</span>
    <span class="arrow">→</span>
  </button>
  
  <!-- 底部紧迫感提示 -->
  <div class="urgency-note">
    <div class="urgency-icon">⏰</div>
    <div class="urgency-text">AI转型窗口期仅18个月</div>
  </div>
</div>

<style>
.ai-transformation-card {
  width: 400px;
  background: #E8E6DD;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.ai-transformation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* 顶部标签 */
.card-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #EF4444;
  border-radius: 20px;
  padding: 6px 14px;
  margin-bottom: 20px;
}

.warning-icon {
  font-size: 14px;
}

.tag-text {
  font-size: 13px;
  font-weight: 600;
  color: #DC2626;
  letter-spacing: -0.01em;
}

/* 主标题 */
.card-title {
  font-size: 26px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.3;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.card-title .highlight {
  color: #F97316;
  position: relative;
  display: inline-block;
}

.card-title .highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 3px;
  background: #F97316;
  opacity: 0.3;
}

/* 价值点列表 */
.value-points {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.check-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: #10B981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.value-text {
  font-size: 15px;
  color: #2D2D2D;
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* 服务信息 */
.service-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid #D4D2C8;
  border-bottom: 1px solid #D4D2C8;
  margin-bottom: 24px;
}

.service-label {
  font-size: 14px;
  color: #4A4A4A;
  font-weight: 500;
}

.divider {
  color: #B8B6AC;
}

/* CTA按钮 */
.card-cta {
  width: 100%;
  background: #1A1A1A;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.card-cta:hover {
  background: #2D2D2D;
  transform: translateX(2px);
}

.card-cta .arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.card-cta:hover .arrow {
  transform: translateX(4px);
}

/* 紧迫感提示 */
.urgency-note {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(249, 115, 22, 0.08);
  border-radius: 6px;
  padding: 10px 12px;
}

.urgency-icon {
  font-size: 16px;
}

.urgency-text {
  font-size: 13px;
  color: #EA580C;
  font-weight: 600;
}

/* 响应式 */
@media (max-width: 768px) {
  .ai-transformation-card {
    width: 100%;
    max-width: 400px;
  }
}
</style>
```

------

## 📄 详细页面完整设计

### **页面总体布局**

```
宽度：最大1280px，居中
背景：#F5F5F0
内容区域：白色卡片或浅色区块
导航栏：固定顶部，半透明背景
```

------

## 🎯 第一屏：英雄区（Hero Section）

### **布局规格**

```
高度：100vh (视口高度)
背景：#F5F5F0
内容最大宽度：1120px
内边距：水平 64px，垂直 80px
```

### **完整HTML/CSS实现**

```html
<!-- 固定导航栏 -->
<nav class="main-navigation">
  <div class="nav-container">
    <div class="nav-logo">
      <img src="your-logo.svg" alt="公司Logo" class="logo-image">
    </div>
    <div class="nav-links">
      <a href="#solutions" class="nav-link">解决方案</a>
      <a href="#courses" class="nav-link">课程体系</a>
      <a href="#cases" class="nav-link">客户案例</a>
      <a href="#pricing" class="nav-link">服务价格</a>
      <a href="#contact" class="nav-link-cta">免费诊断</a>
    </div>
  </div>
</nav>

<!-- 第一屏：英雄区 -->
<section class="hero-section">
  <div class="hero-container">
    <!-- 左侧内容区 -->
    <div class="hero-content">
      <!-- 小标签 -->
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">外贸电商AI数智化转型</span>
      </div>
      
      <!-- 主标题 -->
      <h1 class="hero-title">
        外贸电商的<span class="title-underline">AI革命</span>：<br>
        不是选择，而是<span class="title-highlight">生存必修课</span>
      </h1>
      
      <!-- 副标题 -->
      <p class="hero-subtitle">
        当你还在手工处理业务时<br>
        你的竞争对手已经用AI实现了：
      </p>
      
      <!-- 数据展示 -->
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number">300<span class="stat-symbol">%</span></div>
          <div class="stat-label">获客效率↑</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">85<span class="stat-symbol">%</span></div>
          <div class="stat-label">成本降低↓</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">24<span class="stat-symbol">/7</span></div>
          <div class="stat-label">无人直播</div>
        </div>
      </div>
      
      <!-- CTA按钮组 -->
      <div class="hero-cta-group">
        <button class="btn-primary">
          <span>立即预约免费诊断</span>
          <span class="btn-note">(价值¥1,000)</span>
        </button>
        <button class="btn-secondary">
          <span>查看转型方案</span>
          <span class="arrow-icon">→</span>
        </button>
      </div>
      
      <!-- 紧迫感提示 -->
      <div class="hero-urgency">
        <div class="urgency-icon">⏰</div>
        <div class="urgency-content">
          <span class="urgency-main">本月仅剩 2 个免费名额</span>
          <div class="urgency-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 60%;"></div>
            </div>
            <span class="progress-text">已预约 3/5</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右侧视觉区 -->
    <div class="hero-visual">
      <!-- 这里可以放置动态展示AI生成的内容：产品图、开发信、直播画面的轮播 -->
      <div class="visual-showcase">
        <div class="showcase-card card-1">
          <div class="card-header">AI生成开发信</div>
          <div class="card-content">
            <div class="typing-effect">Dear [Client Name], I noticed your...</div>
          </div>
        </div>
        <div class="showcase-card card-2">
          <div class="card-header">AI视觉营销</div>
          <div class="card-image"></div>
        </div>
        <div class="showcase-card card-3">
          <div class="card-header">24h AI直播</div>
          <div class="live-indicator">
            <span class="live-dot"></span>
            <span class="live-text">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 向下滚动提示 -->
  <div class="scroll-indicator">
    <div class="scroll-text">向下了解更多</div>
    <div class="scroll-arrow">↓</div>
  </div>
</section>

<style>
/* ==================== 导航栏 ==================== */
.main-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #E8E6DD;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-image {
  height: 32px;
  width: auto;
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  font-size: 15px;
  font-weight: 500;
  color: #4A4A4A;
  text-decoration: none;
  transition: color 0.3s ease;
  letter-spacing: -0.01em;
}

.nav-link:hover {
  color: #1A1A1A;
}

.nav-link-cta {
  background: #1A1A1A;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-link-cta:hover {
  background: #2D2D2D;
  transform: translateY(-1px);
}

/* ==================== 英雄区 ==================== */
.hero-section {
  min-height: 100vh;
  background: #F5F5F0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  position: relative;
}

.hero-container {
  max-width: 1280px;
  width: 100%;
  padding: 0 64px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* 左侧内容 */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  background: white;
  border: 1px solid #D4D2C8;
  border-radius: 20px;
  padding: 8px 16px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #10B981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.badge-text {
  font-size: 14px;
  font-weight: 600;
  color: #4A4A4A;
  letter-spacing: -0.01em;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0;
}

.title-underline {
  position: relative;
  display: inline-block;
}

.title-underline::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  height: 12px;
  background: #F97316;
  opacity: 0.2;
  z-index: -1;
}

.title-highlight {
  color: #F97316;
}

.hero-subtitle {
  font-size: 20px;
  color: #4A4A4A;
  line-height: 1.6;
  margin: 8px 0 0 0;
  font-weight: 400;
}

/* 数据展示 */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 32px 0;
  margin: 16px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-symbol {
  font-size: 28px;
  color: #F97316;
}

.stat-label {
  font-size: 14px;
  color: #6B6B6B;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: #D4D2C8;
}

/* CTA按钮组 */
.hero-cta-group {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.btn-primary {
  background: #1A1A1A;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 18px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.btn-primary:hover {
  background: #2D2D2D;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.btn-note {
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
}

.btn-secondary {
  background: white;
  color: #1A1A1A;
  border: 2px solid #1A1A1A;
  border-radius: 10px;
  padding: 18px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-secondary:hover {
  background: #1A1A1A;
  color: white;
  transform: translateY(-2px);
}

.arrow-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.btn-secondary:hover .arrow-icon {
  transform: translateX(4px);
}

/* 紧迫感提示 */
.hero-urgency {
  display: flex;
  gap: 16px;
  background: rgba(249, 115, 22, 0.06);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 8px;
}

.urgency-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.urgency-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.urgency-main {
  font-size: 15px;
  font-weight: 600;
  color: #EA580C;
}

.urgency-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(249, 115, 22, 0.15);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #F97316;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 13px;
  color: #EA580C;
  font-weight: 600;
  white-space: nowrap;
}

/* 右侧视觉展示 */
.hero-visual {
  position: relative;
  height: 600px;
}

.visual-showcase {
  position: relative;
  width: 100%;
  height: 100%;
}

.showcase-card {
  position: absolute;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: all 0.5s ease;
}

.showcase-card:hover {
  transform: translateY(-8px) rotate(0deg) !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.card-1 {
  width: 320px;
  top: 50px;
  left: 0;
  transform: rotate(-3deg);
  animation: float 6s ease-in-out infinite;
}

.card-2 {
  width: 280px;
  top: 180px;
  right: 20px;
  transform: rotate(5deg);
  animation: float 6s ease-in-out infinite 2s;
}

.card-3 {
  width: 260px;
  bottom: 80px;
  left: 40px;
  transform: rotate(-2deg);
  animation: float 6s ease-in-out infinite 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); }
  50% { transform: translateY(-20px) rotate(var(--rotate, 0deg)); }
}

.card-header {
  font-size: 12px;
  font-weight: 600;
  color: #6B6B6B;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.card-content {
  background: #F8FAFC;
  border-radius: 6px;
  padding: 16px;
  min-height: 100px;
}

.typing-effect {
  font-size: 14px;
  color: #4A4A4A;
  line-height: 1.6;
  font-family: 'Courier New', monospace;
}

.card-image {
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #EF4444;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  width: fit-content;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.live-text {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.6;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

.scroll-text {
  font-size: 13px;
  color: #6B6B6B;
  font-weight: 500;
}

.scroll-arrow {
  font-size: 20px;
  color: #6B6B6B;
}

/* 响应式 */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  .hero-title {
    font-size: 44px;
  }
  
  .hero-visual {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 16px 32px;
  }
  
  .hero-container {
    padding: 0 32px;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-stats {
    flex-wrap: wrap;
    gap: 24px;
  }
  
  .hero-cta-group {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
```

------

## 🎯 第二屏：痛点共鸣区

### **布局规格**

```
背景：白色 (#FFFFFF)
内容最大宽度：1120px
内边距：垂直 96px，水平 64px
```

### **完整HTML/CSS实现**

```html
<section class="pain-points-section">
  <div class="section-container">
    <!-- 区域标题 -->
    <div class="section-header">
      <div class="section-badge">
        <span class="badge-icon">💡</span>
        <span>传统模式 vs AI化</span>
      </div>
      <h2 class="section-title">
        你是否每天都在经历<br>
        这些<span class="title-emphasis">效率黑洞</span>？
      </h2>
      <p class="section-description">
        传统作业方式正在吞噬你的时间、成本和竞争力
      </p>
    </div>
    
    <!-- 对比表格 -->
    <div class="comparison-table">
      <!-- 表头 -->
      <div class="table-header">
        <div class="header-cell header-traditional">
          <span class="header-icon">❌</span>
          <span class="header-text">传统作业模式</span>
        </div>
        <div class="header-cell header-ai">
          <span class="header-icon">✨</span>
          <span class="header-text">AI化后</span>
        </div>
      </div>
      
      <!-- 对比行 1: 开发信 -->
      <div class="comparison-row">
        <div class="row-header">
          <div class="row-icon">📧</div>
          <div class="row-title">开发信撰写</div>
        </div>
        <div class="row-content">
          <div class="content-cell traditional">
            <div class="metric-item">
              <span class="metric-label">效率</span>
              <span class="metric-value negative">1封 = 30分钟</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">质量</span>
              <span class="metric-value negative">人工个性化困难</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">产能</span>
              <span class="metric-value negative">月均500封上限</span>
            </div>
            <div class="cost-tag cost-high">高时间成本</div>
          </div>
          <div class="content-cell ai">
            <div class="metric-item">
              <span class="metric-label">效率</span>
              <span class="metric-value positive">100封 = 1分钟</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">质量</span>
              <span class="metric-value positive">自动精准个性化</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">产能</span>
              <span class="metric-value positive">月均50,000封</span>
            </div>
            <div class="improvement-tag">
              <span class="improvement-icon">↑</span>
              <span>效率提升100倍</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 对比行 2: 视觉营销 -->
      <div class="comparison-row">
        <div class="row-header">
          <div class="row-icon">🎨</div>
          <div class="row-title">视觉营销素材</div>
        </div>
        <div class="row-content">
          <div class="content-cell traditional">
            <div class="metric-item">
              <span class="metric-label">制作周期</span>
              <span class="metric-value negative">设计师3天/张</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">修改成本</span>
              <span class="metric-value negative">修改成本高</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">月度成本</span>
              <span class="metric-value negative">¥15,000</span>
            </div>
            <div class="cost-tag cost-high">设计师依赖</div>
          </div>
          <div class="content-cell ai">
            <div class="metric-item">
              <span class="metric-label">制作周期</span>
              <span class="metric-value positive">AI 10秒/张</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">修改成本</span>
              <span class="metric-value positive">无限次迭代</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">月度成本</span>
              <span class="metric-value positive">¥2,000</span>
            </div>
            <div class="improvement-tag">
              <span class="improvement-icon">↓</span>
              <span>成本降低85%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 对比行 3: 直播带货 -->
      <div class="comparison-row">
        <div class="row-header">
          <div class="row-icon">📹</div>
          <div class="row-title">直播带货</div>
        </div>
        <div class="row-content">
          <div class="content-cell traditional">
            <div class="metric-item">
              <span class="metric-label">人力需求</span>
              <span class="metric-value negative">需3班倒主播</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">月度成本</span>
              <span class="metric-value negative">¥30,000</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">稳定性</span>
              <span class="metric-value negative">状态不稳定</span>
            </div>
            <div class="cost-tag cost-high">高人力成本</div>
          </div>
          <div class="content-cell ai">
            <div class="metric-item">
              <span class="metric-label">人力需求</span>
              <span class="metric-value positive">AI数字人24h</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">月度成本</span>
              <span class="metric-value positive">¥3,000</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">稳定性</span>
              <span class="metric-value positive">标准化输出</span>
            </div>
            <div class="improvement-tag">
              <span class="improvement-icon">↓</span>
              <span>人力成本节省90%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 对比行 4: 市场决策 -->
      <div class="comparison-row">
        <div class="row-header">
          <div class="row-icon">📊</div>
          <div class="row-title">市场决策</div>
        </div>
        <div class="row-content">
          <div class="content-cell traditional">
            <div class="metric-item">
              <span class="metric-label">决策依据</span>
              <span class="metric-value negative">依赖经验拍脑袋</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">试错成本</span>
              <span class="metric-value negative">试错成本高</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">决策周期</span>
              <span class="metric-value negative">数周到数月</span>
            </div>
            <div class="cost-tag cost-high">高风险</div>
          </div>
          <div class="content-cell ai">
            <div class="metric-item">
              <span class="metric-label">决策依据</span>
              <span class="metric-value positive">AI数据分析</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">试错成本</span>
              <span class="metric-value positive">降低失误80%</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">决策周期</span>
              <span class="metric-value positive">数小时到数天</span>
            </div>
            <div class="improvement-tag">
              <span class="improvement-icon">↑</span>
              <span>决策准确率提升</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部强调 -->
    <div class="section-emphasis">
      <div class="emphasis-content">
        <h3 class="emphasis-title">这不是未来，而是现在</h3>
        <p class="emphasis-text">
          你的同行已经在用AI拉开差距<br>
          每晚一个月行动，领先优势就少一年
        </p>
        <button class="emphasis-cta">
          <span>计算我能节省多少成本</span>
          <span class="cta-arrow">→</span>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
/* ==================== 痛点共鸣区 ==================== */
.pain-points-section {
  background: #FFFFFF;
  padding: 96px 0;
}

.section-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 64px;
}

/* 区域标题 */
.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FEF3C7;
  border: 1px solid #FDE047;
  border-radius: 20px;
  padding: 8px 16px;
  margin-bottom: 20px;
}

.badge-icon {
  font-size: 16px;
}

.section-badge span:last-child {
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
}

.section-title {
  font-size: 42px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.2;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
}

.title-emphasis {
  color: #EF4444;
  position: relative;
}

.title-emphasis::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  height: 10px;
  background: #EF4444;
  opacity: 0.15;
  z-index: -1;
}

.section-description {
  font-size: 18px;
  color: #6B6B6B;
  margin: 0;
}

/* 对比表格 */
.comparison-table {
  background: #F8FAFC;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E2E8F0;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.header-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
}

.header-traditional {
  background: rgba(239, 68, 68, 0.08);
  border: 2px solid rgba(239, 68, 68, 0.2);
}

.header-ai {
  background: rgba(16, 185, 129, 0.08);
  border: 2px solid rgba(16, 185, 129, 0.3);
}

.header-icon {
  font-size: 24px;
}

.header-text {
  font-size: 18px;
  font-weight: 700;
  color: #1A1A1A;
}

/* 对比行 */
.comparison-row {
  background: white;
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
}

.comparison-row:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.comparison-row:last-child {
  margin-bottom: 0;
}

.row-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
}

.row-icon {
  font-size: 24px;
}

.row-title {
  font-size: 18px;
  font-weight: 600;
  color: #1A1A1A;
}

.row-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: #E2E8F0;
}

.content-cell {
  padding: 24px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F1F5F9;
}

.metric-item:last-of-type {
  border-bottom: none;
}

.metric-label {
  font-size: 13px;
  color: #64748B;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 15px;
  font-weight: 600;
}

.metric-value.negative {
  color: #DC2626;
}

.metric-value.positive {
  color: #059669;
}

.cost-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  margin-top: 8px;
}

.cost-high {
  background: rgba(239, 68, 68, 0.1);
  color: #DC2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.improvement-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #059669;
  margin-top: 8px;
}

.improvement-icon {
  font-size: 16px;
}

/* 底部强调区 */
.section-emphasis {
  margin-top: 64px;
  background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
  border-radius: 16px;
  padding: 48px 64px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.section-emphasis::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.5;
}

.emphasis-content {
  position: relative;
  z-index: 1;
}

.emphasis-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
}

.emphasis-text {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin: 0 0 32px 0;
}

.emphasis-cta {
  background: #F97316;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.emphasis-cta:hover {
  background: #EA580C;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}

.cta-arrow {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.emphasis-cta:hover .cta-arrow {
  transform: translateX(4px);
}

/* 响应式 */
@media (max-width: 1024px) {
  .table-header,
  .row-content {
    grid-template-columns: 1fr;
  }
  
  .header-traditional {
    order: 1;
  }
  
  .header-ai {
    order: 2;
  }
}

@media (max-width: 768px) {
  .section-container {
    padding: 0 32px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .comparison-table {
    padding: 20px;
  }
  
  .section-emphasis {
    padding: 32px 24px;
  }
  
  .emphasis-title {
    font-size: 24px;
  }
}
</style>
```

------

## 🎯 第三屏：解决方案架构

### **完整HTML/CSS实现**

```html
<section class="solutions-section">
  <div class="section-container">
    <!-- 区域标题 -->
    <div class="section-header">
      <div class="section-badge">
        <span class="badge-icon">🎯</span>
        <span>我们的服务</span>
      </div>
      <h2 class="section-title">
        我们提供的不是培训，<br>
        是<span class="title-underline">转型操作系统</span>
      </h2>
      <p class="section-description">
        从战略诊断到体系落地的全链路AI化服务
      </p>
    </div>
    
    <!-- 服务架构 -->
    <div class="solutions-architecture">
      
      <!-- 第一步：深度咨询 -->
      <div class="solution-card card-consulting">
        <div class="card-number">第一步</div>
        <div class="card-icon-large">💡</div>
        <h3 class="card-title">深度战略咨询</h3>
        <p class="card-subtitle">1小时 = 为企业节省6个月弯路</p>
        
        <div class="card-content">
          <div class="content-section">
            <h4 class="content-heading">我们帮你回答3个核心问题：</h4>
            
            <div class="question-block">
              <div class="question-number">1️⃣</div>
              <div class="question-content">
                <h5 class="question-title">你的业务链条哪个环节最该AI化？</h5>
                <ul class="question-details">
                  <li>诊断10+个业务节点</li>
                  <li>识别3个最快见效的突破口</li>
                </ul>
              </div>
            </div>
            
            <div class="question-block">
              <div class="question-number">2️⃣</div>
              <div class="question-content">
                <h5 class="question-title">如何避开95%企业踩过的AI坑？</h5>
                <ul class="question-details">
                  <li>盘点5大常见误区</li>
                  <li>定制防坑指南</li>
                </ul>
              </div>
            </div>
            
            <div class="question-block">
              <div class="question-number">3️⃣</div>
              <div class="question-content">
                <h5 class="question-title">你的90天转型路线图怎么画？</h5>
                <ul class="question-details">
                  <li>短期速赢 + 中期体系 + 长期战略</li>
                  <li>可落地的分步行动计划</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="card-pricing-box">
            <div class="pricing-row">
              <span class="pricing-label">💰 投资</span>
              <span class="pricing-value">¥1,000/小时</span>
            </div>
            <div class="pricing-row">
              <span class="pricing-label">📈 价值</span>
              <span class="pricing-value">避免错误投入数万~数十万</span>
            </div>
            <div class="pricing-row">
              <span class="pricing-label">⏱️ 时长</span>
              <span class="pricing-value">通常2-4小时深度对话</span>
            </div>
          </div>
          
          <button class="card-cta">
            预约首次免费诊断(60分钟) →
          </button>
        </div>
      </div>
      
      <!-- 连接箭头 -->
      <div class="solution-connector">
        <div class="connector-line"></div>
        <div class="connector-arrow">↓</div>
        <div class="connector-text">完成诊断后</div>
      </div>
      
      <!-- 第二步：系统化培训 -->
      <div class="solution-card card-training">
        <div class="card-number">第二步</div>
        <div class="card-icon-large">🎯</div>
        <h3 class="card-title">系统化企业内训</h3>
        <p class="card-subtitle">不是碎片化技能，是完整转型体系</p>
        
        <div class="card-content">
          <div class="content-section">
            <div class="feature-grid">
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">10大核心模块覆盖全业务链</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">定制化设计，非标准化课件</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">配套工具包 + 模板 + 工作流</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">30天落地答疑支持</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">可选进阶技术模块</div>
              </div>
            </div>
          </div>
          
          <div class="training-flow">
            <div class="flow-item">
              <div class="flow-icon">🧠</div>
              <div class="flow-text">认知升级</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-item">
              <div class="flow-icon">🛠️</div>
              <div class="flow-text">工具掌握</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-item">
              <div class="flow-icon">🚀</div>
              <div class="flow-text">体系落地</div>
            </div>
          </div>
          
          <div class="card-highlight-box">
            <p class="highlight-text">
              让AI能力成为企业的核心竞争力
            </p>
          </div>
          
          <button class="card-cta secondary">
            查看完整课程体系 ↓
          </button>
        </div>
      </div>
      
    </div>
    
  </div>
</section>

<style>
/* ==================== 解决方案架构区 ==================== */
.solutions-section {
  background: #F5F5F0;
  padding: 96px 0;
}

/* 服务卡片 */
.solutions-architecture {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 64px;
}

.solution-card {
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.solution-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #F97316, #EA580C);
}

.card-consulting::before {
  background: linear-gradient(90deg, #3B82F6, #1D4ED8);
}

.card-training::before {
  background: linear-gradient(90deg, #10B981, #059669);
}

.solution-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-number {
  display: inline-block;
  background: #1A1A1A;
  color: white;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
}

.card-icon-large {
  font-size: 48px;
  margin-bottom: 20px;
}

.card-title {
  font-size: 32px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.card-subtitle {
  font-size: 18px;
  color: #6B6B6B;
  margin: 0 0 32px 0;
  font-weight: 500;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-heading {
  font-size: 20px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 20px 0;
}

/* 问题块 */
.question-block {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: #F8FAFC;
  border-radius: 12px;
  border-left: 4px solid #3B82F6;
  transition: all 0.3s ease;
}

.question-block:hover {
  background: #F1F5F9;
  border-left-color: #1D4ED8;
}

.question-number {
  font-size: 24px;
  flex-shrink: 0;
}

.question-content {
  flex: 1;
}

.question-title {
  font-size: 17px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.question-details {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.question-details li {
  font-size: 15px;
  color: #4A4A4A;
  padding-left: 20px;
  position: relative;
}

.question-details li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3B82F6;
  font-weight: 700;
}

/* 定价盒子 */
.card-pricing-box {
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pricing-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #E2E8F0;
}

.pricing-row:last-child {
  border-bottom: none;
}

.pricing-label {
  font-size: 15px;
  color: #64748B;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pricing-value {
  font-size: 16px;
  font-weight: 700;
  color: #1A1A1A;
}

/* 特性网格 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: #F1F5F9;
  transform: translateX(4px);
}

.feature-icon {
  width: 24px;
  height: 24px;
  background: #10B981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.feature-text {
  font-size: 15px;
  color: #1A1A1A;
  font-weight: 500;
}

/* 培训流程 */
.training-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border-radius: 12px;
}

.flow-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.flow-icon {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.flow-text {
  font-size: 15px;
  font-weight: 600;
  color: #065F46;
}

.flow-arrow {
  font-size: 24px;
  color: #10B981;
  font-weight: 700;
}

/* 高亮盒子 */
.card-highlight-box {
  background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
  border-radius: 12px;
  padding: 24px 32px;
  text-align: center;
}

.highlight-text {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0;
  letter-spacing: -0.01em;
}

/* 卡片CTA */
.card-cta {
  width: 100%;
  background: #1A1A1A;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 18px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.card-cta:hover {
  background: #2D2D2D;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-cta.secondary {
  background: white;
  color: #1A1A1A;
  border: 2px solid #1A1A1A;
}

.card-cta.secondary:hover {
  background: #1A1A1A;
  color: white;
}

/* 连接器 */
.solution-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 0;
}

.connector-line {
  width: 2px;
  height: 40px;
  background: linear-gradient(180deg, #D4D2C8 0%, transparent 100%);
}

.connector-arrow {
  font-size: 32px;
  color: #B8B6AC;
}

.connector-text {
  font-size: 14px;
  color: #6B6B6B;
  font-weight: 600;
  background: white;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid #E2E8F0;
}

/* 响应式 */
@media (max-width: 768px) {
  .solution-card {
    padding: 32px 24px;
  }
  
  .card-title {
    font-size: 24px;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .training-flow {
    flex-direction: column;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
  }
}
</style>
```

## 🎯 第四屏：课程模块详解

### **完整HTML/CSS实现**

```html
<section class="courses-section" id="courses">
  <div class="section-container">
    <!-- 区域标题 -->
    <div class="section-header">
      <div class="section-badge">
        <span class="badge-icon">📚</span>
        <span>课程体系</span>
      </div>
      <h2 class="section-title">
        10大模块AI转型全景图<br>
        从战略到执行的<span class="title-highlight">完整闭环</span>
      </h2>
      <p class="section-description">
        每个模块都配备：实战案例拆解 + 工具模板包 + 落地指导手册 + 30天答疑支持
      </p>
    </div>
    
    <!-- 手风琴式课程列表 -->
    <div class="accordion-container">
      
      <!-- 模块1 -->
      <div class="accordion-item">
        <button class="accordion-header">
          <div class="header-left">
            <span class="module-number">模块一</span>
            <span class="module-title">战略认知篇 · AI洞察外贸新机遇</span>
          </div>
          <div class="header-right">
            <span class="expand-icon">+</span>
          </div>
        </button>
        <div class="accordion-content">
          <div class="content-wrapper">
            <div class="content-block">
              <h4 class="block-title">📌 你将获得：</h4>
              <ul class="bullet-list">
                <li>AI时代外贸电商的竞争格局全景图</li>
                <li>诊断你的业务AI化成熟度模型</li>
                <li>识别你的3个AI优先突破点</li>
              </ul>
            </div>
            
            <div class="content-block">
              <h4 class="block-title">🎁 交付物：</h4>
              <div class="deliverable-grid">
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">企业AI转型诊断报告</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">AI应用优先级矩阵</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">90天行动路线图</span>
                </div>
              </div>
            </div>
            
            <div class="outcome-badge">
              <span class="outcome-icon">⏱️</span>
              <span class="outcome-text">典型效果：避免盲目试错，节省3-6个月探索时间</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 模块2 -->
      <div class="accordion-item">
        <button class="accordion-header">
          <div class="header-left">
            <span class="module-number">模块二</span>
            <span class="module-title">高效获客篇 · 1分钟写出100封开发信</span>
          </div>
          <div class="header-right">
            <span class="expand-icon">+</span>
          </div>
        </button>
        <div class="accordion-content">
          <div class="content-wrapper">
            <div class="content-block">
              <h4 class="block-title">📌 你将获得：</h4>
              <ul class="bullet-list">
                <li>AI批量生成个性化开发信的完整工作流</li>
                <li>提升邮件打开率/回复率的提示词工程</li>
                <li>自动化客户画像与精准匹配系统</li>
              </ul>
            </div>
            
            <div class="content-block">
              <h4 class="block-title">🎁 交付物：</h4>
              <div class="deliverable-grid">
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">开发信生成模板库(50+场景)</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">AI写作提示词手册</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">客户分层自动化流程图</span>
                </div>
              </div>
            </div>
            
            <div class="outcome-badge">
              <span class="outcome-icon">⏱️</span>
              <span class="outcome-text">典型效果：获客效率提升50倍，成本降低70%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 模块3+4 -->
      <div class="accordion-item">
        <button class="accordion-header">
          <div class="header-left">
            <span class="module-number">模块三+四</span>
            <span class="module-title">视觉营销篇 · 10秒出大片+全球化</span>
          </div>
          <div class="header-right">
            <span class="expand-icon">+</span>
          </div>
        </button>
        <div class="accordion-content">
          <div class="content-wrapper">
            <div class="content-block">
              <h4 class="block-title">📌 你将获得：</h4>
              <ul class="bullet-list">
                <li>AI快速生成专业产品图/场景图的方法</li>
                <li>一键多语言/多文化适配的营销素材</li>
                <li>Midjourney/SD等工具的深度应用</li>
              </ul>
            </div>
            
            <div class="content-block">
              <h4 class="block-title">🎁 交付物：</h4>
              <div class="deliverable-grid">
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">行业定制化提示词库</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">视觉营销素材生产线搭建指南</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">100+爆款案例拆解</span>
                </div>
              </div>
            </div>
            
            <div class="outcome-badge">
              <span class="outcome-icon">⏱️</span>
              <span class="outcome-text">典型效果：设计成本降85%，产出提升10倍</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 模块5 -->
      <div class="accordion-item">
        <button class="accordion-header">
          <div class="header-left">
            <span class="module-number">模块五</span>
            <span class="module-title">产品创新篇 · 开模前定胜负</span>
          </div>
          <div class="header-right">
            <span class="expand-icon">+</span>
          </div>
        </button>
        <div class="accordion-content">
          <div class="content-wrapper">
            <div class="content-block">
              <h4 class="block-title">📌 你将获得：</h4>
              <ul class="bullet-list">
                <li>AI辅助市场需求洞察与趋势预测</li>
                <li>虚拟产品测试与快速试错方法</li>
                <li>降低新品失败率的决策框架</li>
              </ul>
            </div>
            
            <div class="content-block">
              <h4 class="block-title">🎁 交付物：</h4>
              <div class="deliverable-grid">
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">AI产品市场验证工作流</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">新品决策评估模板</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">趋势预测工具包</span>
                </div>
              </div>
            </div>
            
            <div class="outcome-badge">
              <span class="outcome-icon">⏱️</span>
              <span class="outcome-text">典型效果：新品失败率降低80%，研发周期缩短50%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 模块6+7 -->
      <div class="accordion-item">
        <button class="accordion-header">
          <div class="header-left">
            <span class="module-number">模块六+七</span>
            <span class="module-title">增长引擎篇 · 7×24小时AI直播</span>
          </div>
          <div class="header-right">
            <span class="expand-icon">+</span>
          </div>
        </button>
        <div class="accordion-content">
          <div class="content-wrapper">
            <div class="content-block">
              <h4 class="block-title">📌 你将获得：</h4>
              <ul class="bullet-list">
                <li>AI数字人直播的价值逻辑与ROI分析</li>
                <li>3步搭建无人直播间的完整流程</li>
                <li>数字人话术优化与转化率提升技巧</li>
              </ul>
            </div>
            
            <div class="content-block">
              <h4 class="block-title">🎁 交付物：</h4>
              <div class="deliverable-grid">
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">数字人直播SOP手册</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">话术脚本模板库</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">直播间搭建技术指南</span>
                </div>
              </div>
            </div>
            
            <div class="outcome-badge">
              <span class="outcome-icon">⏱️</span>
              <span class="outcome-text">典型效果：人力成本节省90%，直播时长扩展3倍</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 模块8 -->
      <div class="accordion-item">
        <button class="accordion-header">
          <div class="header-left">
            <span class="module-number">模块八</span>
            <span class="module-title">科学决策篇 · 告别拍脑袋</span>
          </div>
          <div class="header-right">
            <span class="expand-icon">+</span>
          </div>
        </button>
        <div class="accordion-content">
          <div class="content-wrapper">
            <div class="content-block">
              <h4 class="block-title">📌 你将获得：</h4>
              <ul class="bullet-list">
                <li>AI数据分析与商业洞察方法</li>
                <li>自动化报表与决策看板搭建</li>
                <li>预测性分析降低战略失误</li>
              </ul>
            </div>
            
            <div class="content-block">
              <h4 class="block-title">🎁 交付物：</h4>
              <div class="deliverable-grid">
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">AI数据分析工作流</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">决策支持看板模板</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">关键指标监控体系</span>
                </div>
              </div>
            </div>
            
            <div class="outcome-badge">
              <span class="outcome-icon">⏱️</span>
              <span class="outcome-text">典型效果：决策周期缩短60%，失误率降低70%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 模块9 -->
      <div class="accordion-item">
        <button class="accordion-header">
          <div class="header-left">
            <span class="module-number">模块九</span>
            <span class="module-title">利润中心篇 · 服务升级为利润引擎</span>
          </div>
          <div class="header-right">
            <span class="expand-icon">+</span>
          </div>
        </button>
        <div class="accordion-content">
          <div class="content-wrapper">
            <div class="content-block">
              <h4 class="block-title">📌 你将获得：</h4>
              <ul class="bullet-list">
                <li>将AI能力对外输出的商业模式设计</li>
                <li>AI服务产品化与定价策略</li>
                <li>开辟第二增长曲线的路径规划</li>
              </ul>
            </div>
            
            <div class="content-block">
              <h4 class="block-title">🎁 交付物：</h4>
              <div class="deliverable-grid">
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">AI服务产品化方案</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">定价与商业模式画布</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">客户开发策略</span>
                </div>
              </div>
            </div>
            
            <div class="outcome-badge">
              <span class="outcome-icon">⏱️</span>
              <span class="outcome-text">典型效果：新增年收入XX万-XXX万</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 模块10 -->
      <div class="accordion-item">
        <button class="accordion-header">
          <div class="header-left">
            <span class="module-number">模块十</span>
            <span class="module-title">体系制胜篇 · 从工具到战略</span>
          </div>
          <div class="header-right">
            <span class="expand-icon">+</span>
          </div>
        </button>
        <div class="accordion-content">
          <div class="content-wrapper">
            <div class="content-block">
              <h4 class="block-title">📌 你将获得：</h4>
              <ul class="bullet-list">
                <li>构建组织级AI能力的方法论</li>
                <li>AI时代的团队协作与绩效管理</li>
                <li>形成长期竞争壁垒的战略路径</li>
              </ul>
            </div>
            
            <div class="content-block">
              <h4 class="block-title">🎁 交付物：</h4>
              <div class="deliverable-grid">
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">企业AI能力成熟度模型</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">AI时代绩效考核新范式</span>
                </div>
                <div class="deliverable-item">
                  <span class="deliverable-icon">✓</span>
                  <span class="deliverable-text">长期战略规划图</span>
                </div>
              </div>
            </div>
            
            <div class="outcome-badge">
              <span class="outcome-icon">⏱️</span>
              <span class="outcome-text">典型效果：构建难以复制的组织能力</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <!-- 进阶模块区 -->
    <div class="advanced-modules">
      <div class="advanced-header">
        <h3 class="advanced-title">🔥 进阶技术模块（按需选配）</h3>
        <p class="advanced-description">深度技术能力提升，适合有一定基础的企业</p>
      </div>
      
      <div class="advanced-grid">
        <div class="advanced-card">
          <div class="advanced-icon">🎨</div>
          <h4 class="advanced-card-title">Comfy UI工作流深度应用</h4>
          <p class="advanced-card-desc">电商/设计/自媒体视效方向定制</p>
        </div>
        
        <div class="advanced-card">
          <div class="advanced-icon">🤖</div>
          <h4 class="advanced-card-title">AI Agent(智能体)搭建实战</h4>
          <p class="advanced-card-desc">自动化业务流程的核心技术</p>
        </div>
        
        <div class="advanced-card">
          <div class="advanced-icon">📚</div>
          <h4 class="advanced-card-title">企业知识库与RAG框架</h4>
          <p class="advanced-card-desc">让AI成为你的专属智囊团</p>
        </div>
        
        <div class="advanced-card">
          <div class="advanced-icon">🧠</div>
          <h4 class="advanced-card-title">模型训练与微调</h4>
          <p class="advanced-card-desc">打造企业专属AI能力</p>
        </div>
        
        <div class="advanced-card">
          <div class="advanced-icon">👥</div>
          <h4 class="advanced-card-title">AI时代协作及绩效考核新范式</h4>
          <p class="advanced-card-desc">组织转型的配套管理体系</p>
        </div>
        
        <div class="advanced-card">
          <div class="advanced-icon">⚙️</div>
          <h4 class="advanced-card-title">其他企业定制化内训</h4>
          <p class="advanced-card-desc">根据你的特殊需求设计</p>
        </div>
      </div>
    </div>
    
    <!-- 模块包含内容说明 -->
    <div class="module-includes">
      <h3 class="includes-title">每个模块都包含：</h3>
      <div class="includes-grid">
        <div class="includes-item">
          <div class="includes-icon">📖</div>
          <div class="includes-text">理论框架 + 实战案例 + 工具模板</div>
        </div>
        <div class="includes-item">
          <div class="includes-icon">🎯</div>
          <div class="includes-text">现场演练 + 落地指导 + 答疑支持</div>
        </div>
        <div class="includes-item">
          <div class="includes-icon">🔄</div>
          <div class="includes-text">线上线下结合，灵活定制</div>
        </div>
      </div>
    </div>
    
    <!-- CTA -->
    <div class="courses-cta">
      <button class="cta-button">
        <span>获取定制化培训方案</span>
        <span class="cta-arrow">→</span>
      </button>
    </div>
    
  </div>
</section>

<style>
/* ==================== 课程模块区 ==================== */
.courses-section {
  background: white;
  padding: 96px 0;
}

/* 手风琴容器 */
.accordion-container {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 手风琴项目 */
.accordion-item {
  background: white;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.accordion-item:hover {
  border-color: #CBD5E1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.accordion-item.active {
  border-color: #3B82F6;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.15);
}

/* 手风琴头部 */
.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.accordion-header:hover {
  background: #F8FAFC;
}

.accordion-item.active .accordion-header {
  background: #F0F9FF;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.module-number {
  background: #1A1A1A;
  color: white;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 6px;
  white-space: nowrap;
}

.module-title {
  font-size: 18px;
  font-weight: 600;
  color: #1A1A1A;
  line-height: 1.4;
}

.header-right {
  flex-shrink: 0;
}

.expand-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 300;
  color: #64748B;
  background: #F1F5F9;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.accordion-item.active .expand-icon {
  transform: rotate(45deg);
  background: #3B82F6;
  color: white;
}

/* 手风琴内容 */
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.accordion-item.active .accordion-content {
  max-height: 1000px;
}

.content-wrapper {
  padding: 0 32px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.block-title {
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.bullet-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bullet-list li {
  font-size: 15px;
  color: #4A4A4A;
  line-height: 1.6;
  padding-left: 24px;
  position: relative;
}

.bullet-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3B82F6;
  font-size: 20px;
  font-weight: 700;
}

/* 交付物网格 */
.deliverable-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.deliverable-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #F0F9FF;
  border: 1px solid #DBEAFE;
  border-radius: 8px;
}

.deliverable-icon {
  width: 20px;
  height: 20px;
  background: #3B82F6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.deliverable-text {
  font-size: 14px;
  color: #1E40AF;
  font-weight: 500;
}

/* 效果徽章 */
.outcome-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE047 100%);
  border-radius: 10px;
  border: 1px solid #FBBF24;
}

.outcome-icon {
  font-size: 20px;
}

.outcome-text {
  font-size: 15px;
  color: #92400E;
  font-weight: 600;
}

/* 进阶模块区 */
.advanced-modules {
  margin-top: 64px;
  padding: 48px;
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border-radius: 16px;
  border: 2px solid #E2E8F0;
}

.advanced-header {
  text-align: center;
  margin-bottom: 32px;
}

.advanced-title {
  font-size: 28px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.advanced-description {
  font-size: 16px;
  color: #6B6B6B;
  margin: 0;
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.advanced-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.advanced-card:hover {
  border-color: #3B82F6;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.15);
  transform: translateY(-4px);
}

.advanced-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.advanced-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.advanced-card-desc {
  font-size: 14px;
  color: #6B6B6B;
  margin: 0;
  line-height: 1.5;
}

/* 模块包含内容 */
.module-includes {
  margin-top: 48px;
  padding: 32px;
  background: #FFFEF9;
  border-radius: 12px;
  border: 2px dashed #D4D2C8;
}

.includes-title {
  font-size: 20px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 24px 0;
  text-align: center;
}

.includes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.includes-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

.includes-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.includes-text {
  font-size: 15px;
  color: #4A4A4A;
  font-weight: 500;
  line-height: 1.4;
}

/* CTA */
.courses-cta {
  margin-top: 48px;
  text-align: center;
}

.cta-button {
  background: #1A1A1A;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #2D2D2D;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.cta-arrow {
  font-size: 22px;
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-arrow {
  transform: translateX(4px);
}

/* 响应式 */
@media (max-width: 768px) {
  .accordion-header {
    padding: 20px;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .module-title {
    font-size: 16px;
  }
  
  .content-wrapper {
    padding: 0 20px 24px 20px;
  }
  
  .advanced-modules {
    padding: 32px 24px;
  }
  
  .advanced-grid {
    grid-template-columns: 1fr;
  }
}

/* JavaScript交互 */
<script>
document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const accordionItem = button.parentElement;
    const isActive = accordionItem.classList.contains('active');
    
    // 关闭所有其他手风琴
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // 切换当前手风琴
    if (!isActive) {
      accordionItem.classList.add('active');
    }
  });
});
</script>
</style>
```

------

## 🎯 第五屏：客户成果展示

### **完整HTML/CSS实现**

```html
<section class="cases-section" id="cases">
  <div class="section-container">
    <!-- 区域标题 -->
    <div class="section-header">
      <div class="section-badge">
        <span class="badge-icon">🏆</span>
        <span>客户案例</span>
      </div>
      <h2 class="section-title">
        他们已经用AI<br>
        <span class="title-highlight">重构了竞争力</span>
      </h2>
      <p class="section-description">
        真实数据，可验证的转型成果
      </p>
    </div>
    
    <!-- 案例卡片 -->
    <div class="cases-grid">
      
      <!-- 案例1 -->
      <div class="case-card">
        <div class="case-header">
          <div class="case-company">
            <h3 class="company-name">某跨境3C配件企业</h3>
            <p class="company-size">年营收5000万</p>
          </div>
          <div class="case-timeline">
            <span class="timeline-icon">📅</span>
            <span class="timeline-text">转型周期：3个月</span>
          </div>
        </div>
        
        <div class="case-quote">
          <div class="quote-mark">"</div>
          <p class="quote-text">接受咨询+培训3个月后：</p>
        </div>
        
        <div class="case-metrics">
          <h4 class="metrics-title">📊 核心数据变化：</h4>
          <div class="metrics-grid">
            <div class="metric-item">
              <div class="metric-label">获客成本</div>
              <div class="metric-change">
                <span class="metric-before">¥85</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">¥32</span>
                <span class="metric-improvement down">↓62%</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">开发信响应率</div>
              <div class="metric-change">
                <span class="metric-before">2%</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">8%</span>
                <span class="metric-improvement up">↑4倍</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">营销素材产出</div>
              <div class="metric-change">
                <span class="metric-before">10张/周</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">200张/周</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">设计团队</div>
              <div class="metric-change">
                <span class="metric-before">5人</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">2人</span>
                <span class="metric-savings">(节省¥36万/年)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="case-testimonial">
          <div class="testimonial-icon">💬</div>
          <div class="testimonial-content">
            <p class="testimonial-role">CEO评价：</p>
            <p class="testimonial-text">
              "最大的收获不是学会工具，而是用AI思维重新设计了业务流程。现在我们的效率是同行的10倍。"
            </p>
          </div>
        </div>
      </div>
      
      <!-- 案例2 -->
      <div class="case-card">
        <div class="case-header">
          <div class="case-company">
            <h3 class="company-name">某家居出口品牌</h3>
            <p class="company-size">年营收8000万</p>
          </div>
          <div class="case-timeline">
            <span class="timeline-icon">📅</span>
            <span class="timeline-text">转型周期：4个月</span>
          </div>
        </div>
        
        <div class="case-quote">
          <div class="quote-mark">"</div>
          <p class="quote-text">深度咨询+系统培训后：</p>
        </div>
        
        <div class="case-metrics">
          <h4 class="metrics-title">📊 核心数据变化：</h4>
          <div class="metrics-grid">
            <div class="metric-item">
              <div class="metric-label">视觉营销点击率</div>
              <div class="metric-change">
                <span class="metric-before">1.2%</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">4.8%</span>
                <span class="metric-improvement up">↑4倍</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">新品上市周期</div>
              <div class="metric-change">
                <span class="metric-before">45天</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">18天</span>
                <span class="metric-improvement down">↓60%</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">AI数字人直播</div>
              <div class="metric-change">
                <span class="metric-before">0</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">24h在线</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">年度营销成本</div>
              <div class="metric-change">
                <span class="metric-savings large">↓¥120万</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="case-testimonial">
          <div class="testimonial-icon">💬</div>
          <div class="testimonial-content">
            <p class="testimonial-role">CMO评价：</p>
            <p class="testimonial-text">
              "我们把节省的成本重新投入AI研发，现在AI能力本身成了新的利润中心，去年靠AI服务外包就赚了200万。"
            </p>
          </div>
        </div>
      </div>
      
      <!-- 案例3 -->
      <div class="case-card">
        <div class="case-header">
          <div class="case-company">
            <h3 class="company-name">某服装外贸公司</h3>
            <p class="company-size">年营收3000万</p>
          </div>
          <div class="case-timeline">
            <span class="timeline-icon">📅</span>
            <span class="timeline-text">转型周期：3个月</span>
          </div>
        </div>
        
        <div class="case-quote">
          <div class="quote-mark">"</div>
          <p class="quote-text">90天AI转型计划后：</p>
        </div>
        
        <div class="case-metrics">
          <h4 class="metrics-title">📊 核心数据变化：</h4>
          <div class="metrics-grid">
            <div class="metric-item">
              <div class="metric-label">直播间</div>
              <div class="metric-change">
                <span class="metric-before">3班倒</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">24h无人直播</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">直播转化率</div>
              <div class="metric-change">
                <span class="metric-before">2.3%</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">2.8%</span>
                <span class="metric-note">(真人vs AI)</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">主播人力成本</div>
              <div class="metric-change">
                <span class="metric-before">¥30万/年</span>
                <span class="metric-arrow">→</span>
                <span class="metric-after">¥3万/年</span>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-label">产品上新速度</div>
              <div class="metric-change">
                <span class="metric-improvement up">提升300%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="case-testimonial">
          <div class="testimonial-icon">💬</div>
          <div class="testimonial-content">
            <p class="testimonial-role">运营总监评价：</p>
            <p class="testimonial-text">
              "AI数字人竟然比真人主播还稳定，而且可以同时跑多个直播间测试，现在我们的选品决策快准狠。"
            </p>
          </div>
        </div>
      </div>
      
    </div>
    
    <!-- 行业覆盖 -->
    <div class="industry-coverage">
      <h3 class="coverage-title">已服务企业覆盖行业：</h3>
      <div class="industry-tags">
        <span class="industry-tag">3C数码</span>
        <span class="industry-tag">家居家纺</span>
        <span class="industry-tag">服装配饰</span>
        <span class="industry-tag">工业品出口</span>
        <span class="industry-tag">美妆个护</span>
        <span class="industry-tag">母婴用品</span>
        <span class="industry-tag">运动户外</span>
        <span class="industry-tag">汽配电器</span>
      </div>
    </div>
    
    <!-- 查看更多 -->
    <div class="cases-footer">
      <button class="view-more-btn">
        <span>查看更多案例</span>
        <span class="btn-arrow">→</span>
      </button>
    </div>
    
  </div>
</section>

<style>
/* ==================== 客户案例区 ==================== */
.cases-section {
  background: #F5F5F0;
  padding: 96px 0;
}

/* 案例网格 */
.cases-grid {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 32px;
}

/* 案例卡片 */
.case-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.case-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

/* 案例头部 */
.case-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 2px solid #F1F5F9;
}

.case-company {
  flex: 1;
}

.company-name {
  font-size: 20px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 6px 0;
}

.company-size {
  font-size: 14px;
  color: #6B6B6B;
  font-weight: 500;
  margin: 0;
}

.case-timeline {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #F8FAFC;
  padding: 6px 12px;
  border-radius: 6px;
}

.timeline-icon {
  font-size: 14px;
}

.timeline-text {
  font-size: 13px;
  color: #4A4A4A;
  font-weight: 500;
}

/* 引用 */
.case-quote {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.quote-mark {
  font-size: 48px;
  line-height: 0.5;
  color: #3B82F6;
  font-family: Georgia, serif;
}

.quote-text {
  font-size: 16px;
  color: #4A4A4A;
  font-weight: 500;
  margin: 0;
  padding-top: 12px;
}

/* 指标区域 */
.case-metrics {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 20px;
}

.metrics-title {
  font-size: 15px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.metrics-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-label {
  font-size: 13px;
  color: #64748B;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.metric-before {
  font-size: 15px;
  color: #DC2626;
  font-weight: 600;
  text-decoration: line-through;
  opacity: 0.7;
}

.metric-arrow {
  font-size: 16px;
  color: #94A3B8;
}

.metric-after {
  font-size: 16px;
  color: #059669;
  font-weight: 700;
}

.metric-improvement {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
}

.metric-improvement.up {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.metric-improvement.down {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.metric-savings {
  font-size: 15px;
  color: #059669;
  font-weight: 700;
}

.metric-savings.large {
  font-size: 18px;
}

.metric-note {
  font-size: 12px;
  color: #6B6B6B;
  font-style: italic;
}

/* 评价 */
.case-testimonial {
  display: flex;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border-radius: 12px;
}

.testimonial-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.testimonial-content {
  flex: 1;
}

.testimonial-role {
  font-size: 13px;
  color: #92400E;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.testimonial-text {
  font-size: 15px;
  color: #78350F;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

/* 行业覆盖 */
.industry-coverage {
  margin-top: 64px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  text-align: center;
}

.coverage-title {
  font-size: 20px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 24px 0;
}

.industry-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.industry-tag {
  display: inline-block;
  padding: 10px 20px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #4A4A4A;
  transition: all 0.3s ease;
}

.industry-tag:hover {
  background: #EFF6FF;
  border-color: #3B82F6;
  color: #1E40AF;
  transform: translateY(-2px);
}

/* 底部CTA */
.cases-footer {
  margin-top: 48px;
  text-align: center;
}

.view-more-btn {
  background: #1A1A1A;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 16px 40px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.view-more-btn:hover {
  background: #2D2D2D;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.btn-arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.view-more-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* 响应式 */
@media (max-width: 1024px) {
  .cases-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .case-card {
    padding: 24px;
  }
  
  .case-header {
    flex-direction: column;
    gap: 12px;
  }
  
  .industry-tags {
    gap: 8px;
  }
  
  .industry-tag {
    font-size: 13px;
    padding: 8px 16px;
  }
}
</style>
```

## 🎯 第六屏：服务流程

### **完整HTML/CSS实现**

```html
<section class="process-section">
  <div class="section-container">
    <!-- 区域标题 -->
    <div class="section-header">
      <div class="section-badge">
        <span class="badge-icon">🚀</span>
        <span>服务流程</span>
      </div>
      <h2 class="section-title">
        从接触到落地的<br>
        <span class="title-highlight">4步转型之旅</span>
      </h2>
      <p class="section-description">
        清晰的路径，可预期的结果
      </p>
    </div>
    
    <!-- 流程步骤 -->
    <div class="process-timeline">
      
      <!-- 步骤1 -->
      <div class="process-step">
        <div class="step-number">
          <span class="number-bg">01</span>
        </div>
        <div class="step-content">
          <div class="step-header">
            <h3 class="step-title">免费诊断</h3>
            <div class="step-badge">价值¥1,000</div>
          </div>
          
          <div class="step-details">
            <div class="detail-row">
              <div class="detail-icon">⏱️</div>
              <div class="detail-text">60分钟深度对话</div>
            </div>
            
            <div class="detail-block">
              <h4 class="detail-title">🎯 输出内容：</h4>
              <ul class="detail-list">
                <li>AI化成熟度诊断报告</li>
                <li>3个优先突破点建议</li>
                <li>初步转型路线图</li>
              </ul>
            </div>
          </div>
          
          <button class="step-cta">
            <span>立即预约诊断</span>
            <span class="cta-icon">→</span>
          </button>
        </div>
      </div>
      
      <!-- 连接线 -->
      <div class="process-connector">
        <div class="connector-line"></div>
        <div class="connector-arrow">↓</div>
      </div>
      
      <!-- 步骤2 -->
      <div class="process-step">
        <div class="step-number">
          <span class="number-bg">02</span>
        </div>
        <div class="step-content">
          <div class="step-header">
            <h3 class="step-title">深度咨询</h3>
            <div class="step-badge pricing">¥1,000/小时</div>
          </div>
          
          <div class="step-details">
            <div class="detail-row">
              <div class="detail-icon">⏱️</div>
              <div class="detail-text">通常2-4小时</div>
            </div>
            
            <div class="detail-block">
              <h4 class="detail-title">🎯 输出内容：</h4>
              <ul class="detail-list">
                <li>详细业务诊断与分析</li>
                <li>完整90天转型规划</li>
                <li>工具选型与预算方案</li>
                <li>风险点与应对策略</li>
              </ul>
            </div>
          </div>
          
          <button class="step-cta secondary">
            <span>预约深度咨询</span>
            <span class="cta-icon">→</span>
          </button>
        </div>
      </div>
      
      <!-- 连接线 -->
      <div class="process-connector">
        <div class="connector-line"></div>
        <div class="connector-arrow">↓</div>
      </div>
      
      <!-- 步骤3 -->
      <div class="process-step">
        <div class="step-number">
          <span class="number-bg">03</span>
        </div>
        <div class="step-content">
          <div class="step-header">
            <h3 class="step-title">定制化培训</h3>
            <div class="step-badge custom">按需报价</div>
          </div>
          
          <div class="step-details">
            <div class="detail-row">
              <div class="detail-icon">⏱️</div>
              <div class="detail-text">根据模块数量定制</div>
            </div>
            
            <div class="detail-block">
              <h4 class="detail-title">🎯 交付内容：</h4>
              <ul class="detail-list">
                <li>10大核心模块系统培训</li>
                <li>配套工具包+模板+工作流</li>
                <li>现场实操演练</li>
                <li>定制化内训内容</li>
              </ul>
            </div>
          </div>
          
          <button class="step-cta secondary">
            <span>获取培训方案</span>
            <span class="cta-icon">→</span>
          </button>
        </div>
      </div>
      
      <!-- 连接线 -->
      <div class="process-connector">
        <div class="connector-line"></div>
        <div class="connector-arrow">↓</div>
      </div>
      
      <!-- 步骤4 -->
      <div class="process-step">
        <div class="step-number">
          <span class="number-bg">04</span>
        </div>
        <div class="step-content">
          <div class="step-header">
            <h3 class="step-title">落地陪跑</h3>
            <div class="step-badge included">30天</div>
          </div>
          
          <div class="step-details">
            <div class="detail-row">
              <div class="detail-icon">⏱️</div>
              <div class="detail-text">培训后30天答疑期</div>
            </div>
            
            <div class="detail-block">
              <h4 class="detail-title">🎯 支持内容：</h4>
              <ul class="detail-list">
                <li>实施过程答疑指导</li>
                <li>工具使用问题解决</li>
                <li>定期回顾与优化建议</li>
                <li>持续迭代支持</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <!-- 灵活性说明 -->
    <div class="flexibility-note">
      <div class="note-icon">💡</div>
      <div class="note-content">
        <h3 class="note-title">灵活选择：</h3>
        <p class="note-text">
          可以只做咨询、只做培训，或咨询+培训组合<br>
          我们根据你的实际需求定制服务方案
        </p>
      </div>
    </div>
    
  </div>
</section>

<style>
/* ==================== 服务流程区 ==================== */
.process-section {
  background: white;
  padding: 96px 0;
}

/* 流程时间线 */
.process-timeline {
  margin-top: 64px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* 流程步骤 */
.process-step {
  display: flex;
  gap: 32px;
  position: relative;
}

/* 步骤编号 */
.step-number {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  position: relative;
}

.number-bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
  color: white;
  font-size: 28px;
  font-weight: 700;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 2;
}

/* 步骤内容 */
.step-content {
  flex: 1;
  background: #F8FAFC;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid #E2E8F0;
  transition: all 0.3s ease;
}

.step-content:hover {
  border-color: #3B82F6;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.15);
  transform: translateX(4px);
}

/* 步骤头部 */
.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E2E8F0;
}

.step-title {
  font-size: 24px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.step-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.step-badge:not(.pricing):not(.custom):not(.included) {
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE047 100%);
  color: #92400E;
  border: 1px solid #FBBF24;
}

.step-badge.pricing {
  background: linear-gradient(135deg, #DBEAFE 0%, #93C5FD 100%);
  color: #1E40AF;
  border: 1px solid #3B82F6;
}

.step-badge.custom {
  background: linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%);
  color: #3730A3;
  border: 1px solid #6366F1;
}

.step-badge.included {
  background: linear-gradient(135deg, #D1FAE5 0%, #6EE7B7 100%);
  color: #065F46;
  border: 1px solid #10B981;
}

/* 步骤详情 */
.step-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
}

.detail-icon {
  font-size: 20px;
}

.detail-text {
  font-size: 15px;
  color: #4A4A4A;
  font-weight: 500;
}

.detail-block {
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.detail-title {
  font-size: 15px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-list li {
  font-size: 15px;
  color: #4A4A4A;
  padding-left: 24px;
  position: relative;
  line-height: 1.6;
}

.detail-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10B981;
  font-weight: 700;
}

/* 步骤CTA */
.step-cta {
  width: 100%;
  background: #1A1A1A;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.step-cta:hover {
  background: #2D2D2D;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.step-cta.secondary {
  background: white;
  color: #1A1A1A;
  border: 2px solid #1A1A1A;
}

.step-cta.secondary:hover {
  background: #1A1A1A;
  color: white;
}

.cta-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.step-cta:hover .cta-icon {
  transform: translateX(4px);
}

/* 连接器 */
.process-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  margin-left: 40px;
}

.connector-line {
  width: 3px;
  height: 40px;
  background: linear-gradient(180deg, #D4D2C8 0%, #E2E8F0 100%);
}

.connector-arrow {
  font-size: 32px;
  color: #B8B6AC;
  margin-top: -8px;
}

/* 灵活性说明 */
.flexibility-note {
  max-width: 800px;
  margin: 48px auto 0;
  display: flex;
  gap: 20px;
  padding: 32px;
  background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
  border-radius: 16px;
  border: 2px solid #FCD34D;
}

.note-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.note-content {
  flex: 1;
}

.note-title {
  font-size: 20px;
  font-weight: 700;
  color: #78350F;
  margin: 0 0 8px 0;
}

.note-text {
  font-size: 16px;
  color: #92400E;
  line-height: 1.6;
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .process-step {
    flex-direction: column;
    gap: 16px;
  }
  
  .step-number {
    width: 60px;
    height: 60px;
  }
  
  .number-bg {
    font-size: 22px;
  }
  
  .step-content {
    padding: 24px;
  }
  
  .step-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .process-connector {
    margin-left: 30px;
  }
  
  .flexibility-note {
    flex-direction: column;
    padding: 24px;
  }
}
</style>
```

------

## 🎯 第七屏：价格价值锚定

### **完整HTML/CSS实现**

```html
<section class="pricing-section" id="pricing">
  <div class="section-container">
    <!-- 区域标题 -->
    <div class="section-header">
      <div class="section-badge">
        <span class="badge-icon">💰</span>
        <span>投资回报</span>
      </div>
      <h2 class="section-title">
        这不是费用，是<br>
        <span class="title-highlight">投资回报率计算</span>
      </h2>
      <p class="section-description">
        真正的问题不是"贵不贵"，而是"不转型的成本有多高"
      </p>
    </div>
    
    <!-- ROI计算器 -->
    <div class="roi-calculator">
      <div class="calculator-header">
        <h3 class="calculator-title">假设你是年营收5000万的外贸电商企业：</h3>
      </div>
      
      <div class="comparison-blocks">
        <!-- 传统模式 -->
        <div class="cost-block traditional">
          <div class="block-header">
            <div class="block-icon">❌</div>
            <h4 class="block-title">传统模式年度成本</h4>
          </div>
          
          <div class="cost-items">
            <div class="cost-item">
              <span class="cost-label">设计团队(5人)</span>
              <span class="cost-value">¥50万</span>
            </div>
            <div class="cost-item">
              <span class="cost-label">直播团队(6人)</span>
              <span class="cost-value">¥72万</span>
            </div>
            <div class="cost-item">
              <span class="cost-label">市场研究</span>
              <span class="cost-value">¥30万</span>
            </div>
            <div class="cost-item">
              <span class="cost-label">低效试错损失</span>
              <span class="cost-value">¥80万</span>
            </div>
          </div>
          
          <div class="cost-total traditional-total">
            <span class="total-label">年度总成本</span>
            <span class="total-value">¥232万</span>
          </div>
        </div>
        
        <!-- 转换箭头 -->
        <div class="transformation-arrow">
          <div class="arrow-icon">→</div>
          <div class="arrow-text">AI化转型后</div>
        </div>
        
        <!-- AI化后 -->
        <div class="cost-block ai-mode">
          <div class="block-header">
            <div class="block-icon">✨</div>
            <h4 class="block-title">AI化后年度成本</h4>
          </div>
          
          <div class="cost-items">
            <div class="cost-item">
              <span class="cost-label">设计团队(2人)</span>
              <span class="cost-value">¥20万</span>
            </div>
            <div class="cost-item">
              <span class="cost-label">AI直播系统</span>
              <span class="cost-value">¥5万</span>
            </div>
            <div class="cost-item">
              <span class="cost-label">AI工具订阅</span>
              <span class="cost-value">¥10万</span>
            </div>
            <div class="cost-item">
              <span class="cost-label">试错损失降低</span>
              <span class="cost-value">¥16万 <span class="reduction">(-80%)</span></span>
            </div>
          </div>
          
          <div class="cost-total ai-total">
            <span class="total-label">年度总成本</span>
            <span class="total-value">¥51万</span>
          </div>
          
          <div class="savings-highlight">
            <span class="savings-icon">💰</span>
            <span class="savings-text">年度节省：<strong>¥181万</strong></span>
          </div>
        </div>
      </div>
      
      <!-- 我们的投入 -->
      <div class="investment-block">
        <div class="investment-header">
          <h4 class="investment-title">我们的服务投入</h4>
        </div>
        
        <div class="investment-breakdown">
          <div class="investment-item">
            <span class="investment-label">深度咨询(4h)</span>
            <span class="investment-value">¥4,000</span>
          </div>
          <div class="investment-item">
            <span class="investment-label">系统培训</span>
            <span class="investment-value">¥8-15万<span class="note-text">(按需)</span></span>
          </div>
        </div>
        
        <div class="investment-total">
          <span class="total-label">总投入</span>
          <span class="total-value">约¥10万</span>
        </div>
        
        <div class="roi-metrics">
          <div class="roi-metric">
            <div class="metric-label">投资回报率(ROI)</div>
            <div class="metric-value highlight">1,810%</div>
          </div>
          <div class="roi-metric">
            <div class="metric-label">回本周期</div>
            <div class="metric-value highlight">&lt; 3个月</div>
          </div>
        </div>
      </div>
      
    </div>
    
    <!-- 额外价值 -->
    <div class="additional-value">
      <h3 class="value-title">而且这还没算：</h3>
      <div class="value-grid">
        <div class="value-item">
          <div class="value-icon">✓</div>
          <div class="value-text">效率提升带来的营收增长</div>
        </div>
        <div class="value-item">
          <div class="value-icon">✓</div>
          <div class="value-text">市场响应速度提升的竞争优势</div>
        </div>
        <div class="value-item">
          <div class="value-icon">✓</div>
          <div class="value-text">员工从重复劳动中解放的价值</div>
        </div>
        <div class="value-item">
          <div class="value-icon">✓</div>
          <div class="value-text">AI能力对外输出的新收入</div>
        </div>
      </div>
    </div>
    
    <!-- 底部强调 -->
    <div class="pricing-emphasis">
      <p class="emphasis-text">
        真正的问题不是"贵不贵"<br>
        而是"不转型的成本有多高"
      </p>
      <button class="emphasis-cta">
        <span>计算我的企业能节省多少</span>
        <span class="cta-arrow">→</span>
      </button>
    </div>
    
  </div>
</section>

<style>
/* ==================== 价格价值区 ==================== */
.pricing-section {
  background: #F5F5F0;
  padding: 96px 0;
}

/* ROI计算器 */
.roi-calculator {
  margin-top: 48px;
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.calculator-header {
  text-align: center;
  margin-bottom: 40px;
}

.calculator-title {
  font-size: 24px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
}

/* 对比块 */
.comparison-blocks {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 32px;
  align-items: center;
  margin-bottom: 48px;
}

.cost-block {
  background: #F8FAFC;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid #E2E8F0;
}

.cost-block.traditional {
  border-color: rgba(239, 68, 68, 0.3);
}

.cost-block.ai-mode {
  border-color: rgba(16, 185, 129, 0.3);
  background: linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%);
}

.block-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #E2E8F0;
}

.block-icon {
  font-size: 28px;
}

.block-title {
  font-size: 18px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

/* 成本项目 */
.cost-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
}

.cost-label {
  font-size: 14px;
  color: #4A4A4A;
  font-weight: 500;
}

.cost-value {
  font-size: 16px;
  font-weight: 700;
  color: #1A1A1A;
}

.reduction {
  font-size: 12px;
  color: #059669;
  font-weight: 600;
  margin-left: 6px;
}

/* 成本总计 */
.cost-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 10px;
  margin-top: 16px;
}

.traditional-total {
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
}

.ai-total {
  background: rgba(16, 185, 129, 0.1);
  border: 2px solid rgba(16, 185, 129, 0.3);
}

.total-label {
  font-size: 14px;
  color: #4A4A4A;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.total-value {
  font-size: 24px;
  font-weight: 700;
  color: #1A1A1A;
}

/* 节省高亮 */
.savings-highlight {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border-radius: 10px;
  margin-top: 16px;
  color: white;
}

.savings-icon {
  font-size: 24px;
}

.savings-text {
  font-size: 16px;
  font-weight: 500;
}

.savings-text strong {
  font-size: 20px;
  font-weight: 700;
}

/* 转换箭头 */
.transformation-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.arrow-icon {
  font-size: 36px;
  color: #3B82F6;
  font-weight: 700;
}

.arrow-text {
  font-size: 14px;
  color: #4A4A4A;
  font-weight: 600;
  white-space: nowrap;
}

/* 投入块 */
.investment-block {
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border: 2px solid #3B82F6;
  border-radius: 16px;
  padding: 32px;
}

.investment-header {
  text-align: center;
  margin-bottom: 24px;
}

.investment-title {
  font-size: 20px;
  font-weight: 700;
  color: #1E40AF;
  margin: 0;
}

.investment-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.investment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
}

.investment-label {
  font-size: 15px;
  color: #1E40AF;
  font-weight: 600;
}

.investment-value {
  font-size: 16px;
  font-weight: 700;
  color: #1A1A1A;
}

.note-text {
  font-size: 12px;
  color: #6B6B6B;
  font-weight: 500;
  margin-left: 6px;
}

.investment-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-radius: 10px;
  margin-bottom: 24px;
  border: 2px solid #3B82F6;
}

/* ROI指标 */
.roi-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.roi-metric {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.metric-label {
  font-size: 13px;
  color: #64748B;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: #1A1A1A;
}

.metric-value.highlight {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 额外价值 */
.additional-value {
  margin-top: 48px;
  padding: 32px;
  background: white;
  border-radius: 16px;
}

.value-title {
  font-size: 22px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 24px 0;
  text-align: center;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 10px;
}

.value-icon {
  width: 24px;
  height: 24px;
  background: #10B981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.value-text {
  font-size: 15px;
  color: #4A4A4A;
  font-weight: 500;
  line-height: 1.4;
}

/* 底部强调 */
.pricing-emphasis {
  margin-top: 48px;
  text-align: center;
  padding: 48px;
  background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
  border-radius: 16px;
}

.emphasis-text {
  font-size: 24px;
  color: white;
  line-height: 1.5;
  margin: 0 0 32px 0;
  font-weight: 600;
}

.emphasis-cta {
  background: #F97316;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 18px 40px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.emphasis-cta:hover {
  background: #EA580C;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
}

.cta-arrow {
  font-size: 22px;
  transition: transform 0.3s ease;
}

.emphasis-cta:hover .cta-arrow {
  transform: translateX(4px);
}

/* 响应式 */
@media (max-width: 1024px) {
  .comparison-blocks {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .transformation-arrow {
    flex-direction: row;
  }
  
  .arrow-icon {
    transform: rotate(90deg);
  }
}

@media (max-width: 768px) {
  .roi-calculator {
    padding: 32px 24px;
  }
  
  .roi-metrics {
    grid-template-columns: 1fr;
  }
  
  .value-grid {
    grid-template-columns: 1fr;
  }
  
  .pricing-emphasis {
    padding: 32px 24px;
  }
  
  .emphasis-text {
    font-size: 20px;
  }
}
</style>
```

------

## 🎯 第八屏：终极CTA（行动召唤）

### **完整HTML/CSS实现**

```html
<section class="final-cta-section" id="contact">
  <div class="section-container">
    
    <!-- 紧迫感标题 -->
    <div class="urgency-header">
      <h2 class="urgency-title">
        AI转型的窗口期只有<span class="time-highlight">18个月</span><br>
        早一天行动 = 多一年领先优势
      </h2>
    </div>
    
    <!-- 主CTA卡片 -->
    <div class="main-cta-card">
      <div class="cta-badge">
        <span class="badge-icon">🎁</span>
        <span class="badge-text">限时福利</span>
      </div>
      
      <h3 class="cta-title">免费AI转型诊断</h3>
      <p class="cta-subtitle">价值¥1,000的60分钟深度咨询</p>
      
      <div class="cta-benefits">
        <h4 class="benefits-title">我们帮你：</h4>
        <div class="benefits-grid">
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span class="benefit-text">诊断你的业务AI化成熟度</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span class="benefit-text">识别3个最快见效的AI应用点</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span class="benefit-text">规划90天转型路线图</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span class="benefit-text">评估预期投资回报率</span>
          </div>
        </div>
      </div>
      
      <div class="quota-indicator">
        <div class="quota-header">
          <span class="quota-icon">⚠️</span>
          <span class="quota-text">每月仅开放 <strong>5</strong> 个免费名额</span>
        </div>
        <div class="quota-progress">
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 60%;">
              <div class="progress-shine"></div>
            </div>
          </div>
          <div class="progress-label">已预约 3/5</div>
        </div>
      </div>
      
      <button class="primary-cta-button">
        <span class="button-text">立即预约诊断</span>
        <span class="button-subtext">2分钟填写需求表</span>
      </button>
    </div>
    
    <!-- 联系方式 -->
    <div class="contact-methods">
      <h3 class="contact-title">或直接联系我们：</h3>
      
      <div class="contact-grid">
        <div class="contact-card">
          <div class="contact-icon">📞</div>
          <div class="contact-info">
            <div class="contact-label">咨询热线</div>
            <div class="contact-value">XXX-XXXX-XXXX</div>
            <div class="contact-note">工作日 9:00-18:00</div>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">💬</div>
          <div class="contact-info">
            <div class="contact-label">微信咨询</div>
            <div class="contact-qr">
              <div class="qr-placeholder">
                <div class="qr-code">[二维码]</div>
                <div class="qr-text">扫码添加企业微信</div>
              </div>
            </div>
            <div class="contact-note">1对1顾问服务</div>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">📧</div>
          <div class="contact-info">
            <div class="contact-label">邮件咨询</div>
            <div class="contact-value">consulting@yourcompany.com</div>
            <div class="contact-note">24小时内回复</div>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">🏢</div>
          <div class="contact-info">
            <div class="contact-label">公司地址</div>
            <div class="contact-value">[具体地址]</div>
            <div class="contact-note">欢迎预约到访深度交流</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 最终激励 -->
    <div class="final-motivation">
      <div class="motivation-icon">⏰</div>
      <div class="motivation-content">
        <p class="motivation-text">
          你的竞争对手已经在行动<br>
          每晚一个月，领先优势就少一年
        </p>
        <p class="motivation-slogan">
          当别人还在犹豫时，你已经在超越
        </p>
      </div>
    </div>
    
  </div>
</section>

<style>
/* ==================== 终极CTA区 ==================== */
.final-cta-section {
  background: linear-gradient(180deg, #F5F5F0 0%, #E8E6DD 100%);
  padding: 96px 0;
}

/* 紧迫感标题 */
.urgency-header {
  text-align: center;
  margin-bottom: 48px;
}

.urgency-title {
  font-size: 36px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.4;
  margin: 0;
  letter-spacing: -0.02em;
}

.time-highlight {
  color: #EF4444;
  position: relative;
  display: inline-block;
}

.time-highlight::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  height: 10px;
  background: #EF4444;
  opacity: 0.2;
  z-index: -1;
}

/* 主CTA卡片 */
.main-cta-card {
  max-width: 700px;
  margin: 0 auto 48px;
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.main-cta-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #F97316 0%, #EF4444 100%);
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE047 100%);
  border: 2px solid #FBBF24;
  border-radius: 24px;
  padding: 10px 24px;
  margin-bottom: 24px;
}

.badge-icon {
  font-size: 20px;
}

.badge-text {
  font-size: 15px;
  font-weight: 700;
  color: #92400E;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.cta-title {
  font-size: 36px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.cta-subtitle {
  font-size: 18px;
  color: #6B6B6B;
  margin: 0 0 32px 0;
  font-weight: 500;
}

/* CTA福利 */
.cta-benefits {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: left;
}

.benefits-title {
  font-size: 16px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 16px 0;
  text-align: center;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.benefit-icon {
  width: 20px;
  height: 20px;
  background: #10B981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.benefit-text {
  font-size: 14px;
  color: #4A4A4A;
  font-weight: 500;
  line-height: 1.4;
}

/* 名额指示器 */
.quota-indicator {
  background: rgba(239, 68, 68, 0.08);
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 32px;
}

.quota-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}

.quota-icon {
  font-size: 20px;
}

.quota-text {
  font-size: 15px;
  color: #DC2626;
  font-weight: 600;
}

.quota-text strong {
  font-size: 20px;
  font-weight: 700;
}

.quota-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar-container {
  flex: 1;
  height: 12px;
  background: rgba(239, 68, 68, 0.15);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #EF4444 0%, #DC2626 100%);
  border-radius: 6px;
  position: relative;
  transition: width 0.5s ease;
}

.progress-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

.progress-label {
  font-size: 14px;
  color: #DC2626;
  font-weight: 700;
  white-space: nowrap;
}

/* 主CTA按钮 */
.primary-cta-button {
  width: 100%;
  background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 20px 32px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.primary-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.button-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.button-subtext {
  font-size: 14px;
  opacity: 0.8;
  font-weight: 500;
}

/* 联系方式 */
.contact-methods {
  max-width: 1000px;
  margin: 0 auto 48px;
}

.contact-title {
  font-size: 24px;
  font-weight: 700;
  color: #1A1A1A;
  text-align: center;
  margin: 0 0 32px 0;
  padding-top: 48px;
  border-top: 2px solid #D4D2C8;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.contact-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 2px solid #E2E8F0;
  transition: all 0.3s ease;
}

.contact-card:hover {
  border-color: #3B82F6;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.15);
  transform: translateY(-4px);
}

.contact-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-label {
  font-size: 13px;
  color: #64748B;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-value {
  font-size: 16px;
  color: #1A1A1A;
  font-weight: 700;
  word-break: break-all;
}

.contact-note {
  font-size: 13px;
  color: #6B6B6B;
  font-weight: 500;
}

.contact-qr {
  padding: 12px 0;
}

.qr-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qr-code {
  width: 100px;
  height: 100px;
  background: #F1F5F9;
  border: 2px dashed #CBD5E1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #64748B;
  font-weight: 600;
}

.qr-text {
  font-size: 12px;
  color: #6B6B6B;
  font-weight: 500;
}

/* 最终激励 */
.final-motivation {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
  border-radius: 16px;
  text-align: center;
}

.motivation-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.motivation-content {
  flex: 1;
}

.motivation-text {
  font-size: 18px;
  color: white;
  line-height: 1.6;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.motivation-slogan {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-style: italic;
}

/* 响应式 */
@media (max-width: 768px) {
  .urgency-title {
    font-size: 28px;
  }
  
  .main-cta-card {
    padding: 32px 24px;
  }
  
  .cta-title {
    font-size: 28px;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .final-motivation {
    flex-direction: column;
    padding: 24px;
  }
}
</style>
```

------

## 🎯 固定侧边栏/悬浮CTA

### **完整HTML/CSS实现**

```html
<!-- 固定悬浮CTA -->
<div class="floating-cta">
  <button class="floating-button" id="floatingChatBtn">
    <span class="floating-icon">💬</span>
    <span class="floating-text">在线咨询</span>
  </button>
  
  <button class="floating-button" id="floatingPhoneBtn">
    <span class="floating-icon">📞</span>
    <span class="floating-text">电话预约</span>
  </button>
  
  <button class="floating-button primary" id="floatingDiagnosisBtn">
    <span class="floating-icon">🎁</span>
    <span class="floating-text">免费诊断</span>
    <span class="floating-badge">剩2名额</span>
  </button>
</div>

<!-- 底部悬浮条（移动端） -->
<div class="mobile-bottom-bar">
  <button class="bottom-bar-button" id="mobileConsultBtn">
    <span class="bar-icon">💬</span>
    <span class="bar-text">咨询</span>
  </button>
  <button class="bottom-bar-button primary" id="mobileDiagnosisBtn">
    <span class="bar-icon">🎁</span>
    <span class="bar-text">免费诊断</span>
  </button>
  <button class="bottom-bar-button" id="mobilePhoneBtn">
    <span class="bar-icon">📞</span>
    <span class="bar-text">电话</span>
  </button>
</div>

<style>
/* ==================== 固定悬浮CTA ==================== */
.floating-cta {
  position: fixed;
  right: 32px;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 999;
}

.floating-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: white;
  border: 2px solid #E2E8F0;
  border-radius: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.floating-button:hover {
  transform: translateX(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  border-color: #3B82F6;
}

.floating-button.primary {
  background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
  color: white;
  border-color: #1A1A1A;
}

.floating-button.primary:hover {
  transform: translateX(-4px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.floating-icon {
  font-size: 20px;
}

.floating-text {
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
}

.floating-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #EF4444;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 10px;
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* 移动端底部栏 */
.mobile-bottom-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #E2E8F0;
  padding: 12px 16px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 999;
}

.mobile-bottom-bar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

.bottom-bar-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bottom-bar-button:active {
  transform: scale(0.95);
}

.bottom-bar-button.primary {
  background: #1A1A1A;
  color: white;
  border-color: #1A1A1A;
}

.bar-icon {
  font-size: 24px;
}

.bar-text {
  font-size: 13px;
  font-weight: 600;
}

/* 响应式 */
@media (max-width: 768px) {
  .floating-cta {
    display: none;
  }
  
  .mobile-bottom-bar {
    display: grid;
  }
}
</style>

<script>
// 悬浮按钮交互
document.getElementById('floatingChatBtn')?.addEventListener('click', () => {
  // 打开在线咨询
  console.log('打开在线咨询');
});

document.getElementById('floatingPhoneBtn')?.addEventListener('click', () => {
  // 拨打电话或显示电话号码
  window.location.href = 'tel:XXX-XXXX-XXXX';
});

document.getElementById('floatingDiagnosisBtn')?.addEventListener('click', () => {
  // 跳转到预约表单
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// 移动端按钮交互
document.getElementById('mobileConsultBtn')?.addEventListener('click', () => {
  console.log('打开在线咨询');
});

document.getElementById('mobileDiagnosisBtn')?.addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('mobilePhoneBtn')?.addEventListener('click', () => {
  window.location.href = 'tel:XXX-XXXX-XXXX';
});
</script>
```

------

## 📄 页脚设计

### **完整HTML/CSS实现**

```html
<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-column">
        <div class="footer-logo">
          <img src="your-logo.svg" alt="公司Logo" class="footer-logo-img">
        </div>
        <p class="footer-tagline">
          外贸电商AI数智化转型专家<br>
          让效率提升10倍
        </p>
      </div>
      
      <div class="footer-column">
        <h4 class="footer-title">服务</h4>
        <ul class="footer-links">
          <li><a href="#solutions">深度咨询</a></li>
          <li><a href="#courses">企业内训</a></li>
          <li><a href="#cases">客户案例</a></li>
          <li><a href="#pricing">服务价格</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4 class="footer-title">联系我们</h4>
        <ul class="footer-contacts">
          <li>📞 XXX-XXXX-XXXX</li>
          <li>📧 consulting@yourcompany.com</li>
          <li>🏢 [具体地址]</li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4 class="footer-title">关注我们</h4>
        <div class="social-links">
          <a href="#" class="social-link">微信</a>
          <a href="#" class="social-link">微博</a>
          <a href="#" class="social-link">LinkedIn</a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">© 2025 [公司名称]. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#">隐私政策</a>
        <span class="divider">|</span>
        <a href="#">服务条款</a>
      </div>
    </div>
  </div>
</footer>

<style>
/* ==================== 页脚 ==================== */
.site-footer {
  background: #1A1A1A;
  color: rgba(255, 255, 255, 0.8);
  padding: 64px 0 32px;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 64px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo-img {
  height: 40px;
  width: auto;
  filter: brightness(0) invert(1);
}

.footer-tagline {
  font-size: 14px;
  line-height: 1.6;
  margin: 8px 0 0 0;
}

.footer-title {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
}

.footer-links,
.footer-contacts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-contacts li {
  font-size: 14px;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.footer-legal {
  display: flex;
  gap: 16px;
  align-items: center;
}

.footer-legal a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: white;
}

.divider {
  color: rgba(255, 255, 255, 0.3);
}

/* 响应式 */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 32px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
```

