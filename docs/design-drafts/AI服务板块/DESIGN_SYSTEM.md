# 设计系统文档

## 🎯 设计理念

**"拒绝平庸，追求记忆点"**

本设计系统的核心目标是**完全避免"AI Slop"美学**，创造一个具有强烈品牌辨识度的独特网站。

---

## 🎨 色彩系统

### 主色调：深蓝灰
```css
--color-primary: #0f172a     /* Slate-900 */
--color-secondary: #1e293b   /* Slate-800 */
```
**使用场景**: Hero背景、深色板块、卡片背景、高对比文本

**情感传达**: 工业感、专业、可信、稳重

### 强调色：琥珀橙
```css
--color-accent: #f59e0b       /* Amber-500 */
--color-accent-dark: #d97706  /* Amber-600 */
--color-accent-light: #fbbf24 /* Amber-400 */
```
**使用场景**: CTA按钮、标签边框、高亮文本、数据展示

**情感传达**: 温暖、金钱感、活力、价值

### 背景色：奶油黄
```css
--color-bg: #fefce8           /* Cream Yellow */
--color-bg-secondary: #fef3c7 /* Amber-100 */
```
**使用场景**: 全局背景、浅色板块

**情感传达**: 人性化、舒适、温暖、亲和

### 引擎配色
| 引擎 | 颜色 | Hex | 情感 |
|------|------|-----|------|
| 🎨 视觉 | Amber/Gold | #f59e0b | 高端、金钱感 |
| 🎬 视频 | Blue | #3b82f6 | 科技、专业 |
| 🎯 营销 | Green | #10b981 | 成长、活力 |
| 📊 决策 | Red | #ef4444 | 紧迫、数据 |

### ❌ 禁用色彩
**绝对不使用：**
- 紫色渐变（Indigo + Purple）- AI生成标志
- 纯白背景 - 缺乏深度
- 霓虹色 - 不专业

---

## 🔤 字体系统

### 标题：Syne
```css
font-family: 'Syne', -apple-system, sans-serif;
font-weight: 800;
letter-spacing: -0.04em;
```
**特点**: 几何现代感、超粗体、强冲击力  
**使用**: h1-h6 标题

### 正文：Bitter
```css
font-family: 'Bitter', Georgia, serif;
font-weight: 300-700;
```
**特点**: 优雅衬线体、易读性强  
**使用**: 段落文本、描述

### 技术标签：Inconsolata
```css
font-family: 'Inconsolata', 'Courier New', monospace;
font-weight: 600;
```
**特点**: 等宽字体、技术可信度  
**使用**: 代码、标签、技术说明

### 字重对比原则
- **标题**: 800 (超粗)
- **正文**: 300-400 (轻盈)
- **强调**: 600-700 (中粗)

**极端对比创造强烈层次感**

### ❌ 禁用字体
- Inter / Roboto / Arial - 过于常见
- Space Grotesk - AI常用字体
- 系统默认字体 - 缺乏个性

---

## 🎭 背景深度设计

### 原则：拒绝纯色背景

### 1. 全局背景
```css
background-color: #fefce8;
background-image: 
  repeating-linear-gradient(0deg, transparent, transparent 2px, 
    rgba(15, 23, 42, 0.03) 2px, rgba(15, 23, 42, 0.03) 4px),
  repeating-linear-gradient(90deg, transparent, transparent 2px, 
    rgba(15, 23, 42, 0.03) 2px, rgba(15, 23, 42, 0.03) 4px);
```
**效果**: 奶油黄 + 2×2px微妙网格（3%透明度）

### 2. Hero区域装饰
```html
<!-- 模糊光晕 -->
<div class="absolute inset-0 opacity-10">
  <div class="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
</div>

<!-- 几何网格 -->
<div class="absolute inset-0 opacity-5" 
     style="background-image: linear-gradient(#f59e0b 1px, transparent 1px), 
            linear-gradient(90deg, #f59e0b 1px, transparent 1px); 
            background-size: 40px 40px;">
</div>
```

### 3. 卡片装饰
```html
<!-- 顶部线条 -->
<div class="absolute top-0 left-0 w-full h-1 
            bg-gradient-to-r from-transparent via-amber-500 to-transparent">
</div>

<!-- Hover光晕 -->
<div class="absolute top-0 right-0 w-40 h-40 bg-amber-500 rounded-full blur-3xl 
            opacity-0 group-hover:opacity-10 transition-opacity duration-300">
</div>
```

### 4. 深色板块
```css
background: #0f172a; /* Slate-900 */
background-image: 
  linear-gradient(#f59e0b 1px, transparent 1px),
  linear-gradient(90deg, #f59e0b 1px, transparent 1px);
background-size: 60px 60px;
opacity: 0.05;
```

---

## ⚡ 动画系统

### 原则：使用弹性曲线，避免线性过渡

### 1. 动画曲线
```css
/* 弹性曲线 - 自然运动 */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* 平滑入场 - 优雅流畅 */
cubic-bezier(0.16, 1, 0.3, 1)
```

### 2. 入场动画
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}
```

**效果**: 从下方滑入 + 缩放 + 去模糊

### 3. 交错时间
```css
[data-animate]:nth-child(1) { animation-delay: 0.15s; }
[data-animate]:nth-child(2) { animation-delay: 0.25s; }
[data-animate]:nth-child(3) { animation-delay: 0.35s; }
/* ... */
```

**节奏**: 每个元素延迟增加0.1s

### 4. Hover微交互
```css
/* 卡片 */
.hover\:border-amber-400:hover {
  border-color: #fbbf24;
  transform: translateY(-2px);
}

/* SVG图标 */
.group-hover\:rotate-6 {
  transform: rotate(6deg) scale(1.1);
}

/* 光晕 */
.group-hover\:opacity-10 {
  opacity: 0.1;
  filter: blur(3rem);
}
```

**时间**: 300ms过渡

---

## 📐 布局原则

### 1. 最大宽度
```css
max-width: 1280px; /* 7xl */
```

### 2. 间距系统
- **板块间距**: py-24 (6rem / 96px)
- **内容间距**: px-6 (1.5rem / 24px)
- **元素间距**: gap-8 (2rem / 32px)

### 3. 网格系统
```html
<!-- 3列 -->
<div class="grid md:grid-cols-3 gap-8">

<!-- 4列 -->
<div class="grid md:grid-cols-4 gap-8">

<!-- 2列 -->
<div class="grid md:grid-cols-2 gap-16">
```

### 4. 响应式断点
- **移动端**: < 768px (单列)
- **平板**: 768px - 1024px (2列)
- **桌面**: 1024px+ (3-4列)

---

## 💬 文案原则

### 1. 避免空洞话术

| ❌ 不要说 | ✅ 改说 |
|----------|---------|
| "我们拥有算法科学家团队" | "团队来自字节、阿里、微软" |
| "深度融合业务场景" | "签合同时就锁死ROI承诺" |
| "AI赋能" | "2周上线，60天回本" |
| "人机协同" | "第3周就能看到成本下降" |
| "探索与诊断" | "免费诊断 - 1小时算清ROI" |

### 2. 文案公式

**具体化公式**:
```
模糊表达 → 具体数字 + 时间节点 + 承诺
```

**示例**:
- "快速部署" → "2周上线，第3周见效"
- "效果显著" → "成本降70%，产能翻10倍"
- "持续优化" → "60天未达标，按比例退款"

### 3. 标签规范
```html
<!-- Mono字体 + 大写 + 追踪宽度 -->
<span class="mono tracking-wider uppercase">
  💰 REAL DATA · VERIFIED
</span>
```

---

## 🎯 组件设计规范

### 1. 按钮
```html
<!-- 主按钮 -->
<button class="px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded 
               hover:bg-amber-400 transition-all">

<!-- 次要按钮 -->
<button class="px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded
               hover:bg-slate-900 hover:text-white transition-all">
```

### 2. 卡片
```html
<div class="bg-white border-2 border-slate-200 rounded-2xl p-8 
            hover:border-amber-400 hover:shadow-2xl 
            transition-all duration-300 transform hover:-translate-y-2 
            relative overflow-hidden">
  
  <!-- 背景装饰 -->
  <div class="absolute top-0 right-0 w-40 h-40 bg-amber-500 rounded-full blur-3xl 
              opacity-0 group-hover:opacity-10 transition-opacity duration-300">
  </div>
  
  <!-- 内容（z-10确保在装饰之上）-->
  <div class="relative z-10">
    <!-- ... -->
  </div>
</div>
```

### 3. 标签
```html
<!-- 技术标签 -->
<div class="inline-block px-6 py-2 bg-slate-900 border-2 border-amber-500 
            rounded-full text-amber-400 font-bold text-sm mono">
  💡 WHY US
</div>
```

### 4. 步骤卡
```html
<div class="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 
            hover:border-amber-500 transition-all duration-300">
  
  <!-- 步骤号 -->
  <div class="w-12 h-12 bg-amber-500 text-slate-900 rounded-lg 
              flex items-center justify-center text-xl font-black mono">
    01
  </div>
  
  <!-- 标题 + 副标题 -->
  <h4 class="text-2xl font-black text-white mb-2">标题</h4>
  <p class="text-sm font-bold text-amber-400 mb-4 mono">副标题</p>
  
  <!-- 描述 -->
  <p class="text-slate-300 text-sm">描述内容</p>
</div>
```

---

## 🚫 设计禁忌

### 绝对不要做的事情

1. **不要用紫色渐变**
   - ❌ `from-indigo-600 to-purple-600`
   - ✅ `from-amber-500 to-orange-500`

2. **不要纯色背景**
   - ❌ `bg-white`
   - ✅ `bg-white + 网格纹理`

3. **不要换回常见字体**
   - ❌ Inter / Roboto
   - ✅ Syne / Bitter

4. **不要线性动画**
   - ❌ `ease-in-out`
   - ✅ `cubic-bezier(0.34, 1.56, 0.64, 1)`

5. **不要空洞文案**
   - ❌ "AI赋能"
   - ✅ "2周上线，60天回本"

6. **不要纯阴影设计**
   - ❌ `shadow-lg` 单独使用
   - ✅ `border-2 + shadow-lg` 组合

---

## 📦 设计资源

### 字体加载
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Bitter:wght@300;400;600;700&family=Inconsolata:wght@400;600;800&display=swap" rel="stylesheet">
```

### 图标系统
- **Emoji**: 大尺寸装饰图标（text-5xl / text-6xl）
- **SVG**: 功能性图标，支持动画
- **Lucide Icons**: 辅助图标库

### 颜色代码速查
```css
/* 主色系 */
--slate-900: #0f172a
--slate-800: #1e293b
--slate-700: #334155
--slate-200: #e2e8f0

/* 强调色系 */
--amber-600: #d97706
--amber-500: #f59e0b
--amber-400: #fbbf24

/* 引擎色系 */
--blue-500: #3b82f6
--green-500: #10b981
--red-500: #ef4444

/* 背景色系 */
--bg-cream: #fefce8
--amber-100: #fef3c7
```

---

## 🎉 设计哲学总结

### 核心信念
> "每个元素都有目的，每个颜色都有含义，每个动画都有节奏，每个文案都有承诺"

### 三大支柱
1. **视觉独特性** - 避免AI通病，建立品牌识别
2. **内容可信度** - 具体数字，明确承诺
3. **交互自然性** - 弹性动画，渐进披露

### 成功标准
- ✅ 一眼就能认出不是AI生成
- ✅ 客户看完记得住品牌特点
- ✅ 文案让人信任而非怀疑
- ✅ 动画自然而非生硬
- ✅ 整体协调而非拼凑

---

**最后更新**: 2025-11-14  
**设计师**: Claude AI  
**版本**: v2.0 - 独特美学系统
