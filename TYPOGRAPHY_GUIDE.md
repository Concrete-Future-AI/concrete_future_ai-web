# 🎨 字体体系指南

## ✨ **新字体方案**

### 核心理念
**高对比度 + 几何现代感 + 技术专业性**

---

## 📚 **字体家族**

### 1. **Space Grotesk** (Display/强调)
- **用途**：大标题、Logo英文、CTA按钮
- **特点**：几何感强、现代、科技感、高识别度
- **字重**：600-800-900

### 2. **IBM Plex Sans** (Body/正文)
- **用途**：正文段落、导航链接、描述文字
- **特点**：专业、技术感、极佳易读性
- **字重**：300-400-500-600-700

### 3. **JetBrains Mono** (Code/数据)
- **用途**：数字展示、代码片段、等宽标签
- **特点**：等宽、数据感、科技感
- **字重**：400-500-600-700

### 4. **Noto Sans SC** (中文)
- **用途**：中文标题、中文Logo、中文正文
- **特点**：思源黑体、几何感、现代
- **字重**：400-500-700-900

---

## 🎯 **应用矩阵**

| 组件 | 元素 | 字体 | 字重 | 字号 |
|------|------|------|------|------|
| **Navigation** | Logo中文 | Noto Sans SC | 900 | 24-30px |
| | Logo英文 | Space Grotesk | 600 | 9-10px |
| | 导航链接 | IBM Plex Sans | 500 | 14px |
| | CTA按钮 | Space Grotesk | 700 | 14px |
| **Hero** | 大标题 | Space Grotesk | 800 | 72-96px |
| | 副标题 | IBM Plex Sans | 400 | 20-24px |
| | 主CTA | Space Grotesk | 700 | 16px |
| | 次CTA | IBM Plex Sans | 500 | 16px |
| **ServiceCapabilities** | 标题 | Space Grotesk | 700 | 40-48px |
| | 序号标签 | JetBrains Mono | 600 | 12px |
| | 卡片标题 | Space Grotesk | 700 | 18px |
| | 描述文字 | IBM Plex Sans | 400 | 14px |
| **ServiceMatrix** | 大标题 | Space Grotesk | 800 | 48-56px |
| | 序号 | JetBrains Mono | 600 | 14px |
| | 板块标题 | Space Grotesk | 700 | 32px |
| | 描述文字 | IBM Plex Sans | 400 | 17px |
| | 标签 | IBM Plex Sans | 500 | 14px |
| **ResultsShowcase** | 大标题 | Space Grotesk | 900 | 72-84px |
| | 数字 | JetBrains Mono | 700 | 72-84px |
| | 标签 | IBM Plex Sans | 500 | 14px |
| | 描述 | IBM Plex Sans | 400 | 16px |
| **PartnerShowcase** | 标题 | Space Grotesk | 800 | 48-60px |
| | 副标题 | IBM Plex Sans | 400 | 18px |

---

## 🎨 **字体组合原则**

### ✅ **好的组合**
```
Space Grotesk (Display) + IBM Plex Sans (Body)
└─ 高对比度：几何 vs 人文
└─ 互补性：冲击力 vs 易读性
```

### ❌ **避免的组合**
- 不要混用多个Display字体
- 不要在同一层级使用多种字体
- 不要使用过多字重变化

---

## 💪 **字重使用规则**

### 极端对比原则
```
超粗 (800-900)  ←→  正常 (400-500)
NOT: 600 ←→ 700 (对比度不够)
```

### 层级划分
- **900-800**: 超大标题（Hero、Section）
- **700-600**: 小标题、强调、按钮
- **500**: 导航、标签、次要强调
- **400**: 正文、描述
- **300**: 辅助说明（慎用）

---

## 📐 **尺寸跳跃原则**

### 3倍以上跳跃
```
✅ 96px → 24px (4倍)
✅ 72px → 18px (4倍)
❌ 24px → 18px (1.3倍，对比度不够)
```

### 推荐尺寸阶梯
```
超大: 96px (Hero)
大:   72px (Section Title)
中大: 48px (Sub Section)
中:   32px (Card Title)
小中: 24px (Subtitle)
小:   18px (Body Large)
正文: 16px (Body)
细节: 14px (Caption)
微小: 12px (Label)
```

---

## 🎯 **实施示例**

### Hero标题
```tsx
<h1 style={{
  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
  fontWeight: '800',
  fontSize: '96px',
  letterSpacing: '-0.03em',
  lineHeight: '1.1'
}}>
  企业AI化转型所需的一切都在这里
</h1>
```

### 正文段落
```tsx
<p style={{
  fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '1.7'
}}>
  从战略咨询到技术落地...
</p>
```

### CTA按钮
```tsx
<button style={{
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: '700',
  fontSize: '16px',
  letterSpacing: '0.01em'
}}>
  立即咨询
</button>
```

### 数字展示
```tsx
<div style={{
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: '700',
  fontSize: '72px',
  letterSpacing: '-0.02em'
}}>
  100+
</div>
```

---

## 🚀 **组件更新状态**

✅ **已完成更新**：
- [x] Navigation.tsx - Logo、导航链接、CTA按钮
- [x] Hero.tsx - 大标题、副标题、按钮
- [x] ServiceCapabilities.tsx - 标题、序号、卡片内容
- [x] ServiceMatrix.tsx - 标题、序号、板块标题、列表、按钮
- [x] ResultsShowcase.tsx - 大标题、数字、标签、描述
- [x] PartnerShowcase.tsx - 标题、副标题
- [x] ContactForm.tsx - 标题、表单标签、输入框、按钮
- [x] Footer.tsx - Logo、链接、描述

---

## ✨ **为什么这个字体方案好？**

### 1. **高对比度** = 吸引力
- Space Grotesk (几何) vs IBM Plex Sans (人文)
- 900字重 vs 400字重
- 96px vs 16px

### 2. **专业感** = 信任度
- IBM Plex系列 → IBM品牌背书
- JetBrains Mono → 开发者工具背书
- 技术感强但不失温度

### 3. **现代感** = 科技感
- Space Grotesk → 几何、未来、AI感
- 避免了通用系统字体的平庸
- 符合橙色配色的温暖现代调性

### 4. **易读性** = 用户体验
- IBM Plex Sans易读性极佳
- 合理的行高和字间距
- 中英文字体搭配和谐

---

## 📝 **字体加载状态**

已添加到 `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
```

✅ **所有组件已完成更新** (8/8)

**更新详情**：
- Navigation: Logo双字体、导航IBM Plex Sans、CTA Space Grotesk
- Hero: Space Grotesk超大标题、IBM Plex Sans副标题
- ServiceCapabilities: Space Grotesk标题、JetBrains Mono序号
- ServiceMatrix: 全面字体层次重构
- ResultsShowcase: JetBrains Mono数字、Space Grotesk标题
- PartnerShowcase: 标题副标题字体更新
- ContactForm: 表单全面字体优化
- Footer: Logo、链接、描述字体统一

---

最后更新: 2025-01-16 (完成✅)
