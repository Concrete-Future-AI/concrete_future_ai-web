# 项目目录结构说明

本文档说明了项目的标准化商用目录结构。

## 目录结构

```
website_3/
├── docs/                           # 项目文档
│   ├── design-drafts/             # 设计草稿和中文文档
│   │   ├── AI服务板块/
│   │   └── 培训+课程页面/
│   ├── archive/                   # 归档的旧代码文件
│   │   ├── AIImplementationPage_old_backup.tsx
│   │   ├── AIImplementationPage_previous.tsx
│   │   └── AIImplementationPage_refactored.tsx
│   └── *.md                       # 所有markdown文档
│
├── public/                        # 静态资源 (部署时直接复制)
│   ├── assets/                    # 静态资源
│   │   ├── images/               # 图片资源（按类别组织）
│   │   │   ├── partners/         # 合作伙伴logo
│   │   │   ├── services/         # 服务相关图片
│   │   │   ├── avatars/          # 用户头像
│   │   │   ├── case-studies/     # 案例研究图片
│   │   │   └── icons/            # 图标
│   │   ├── logo.png              # 公司logo
│   │   └── favicon.svg           # 网站图标
│   │
│   └── img/                       # 向后兼容的图片目录
│
├── src/                           # 源代码
│   ├── components/                # React组件
│   ├── pages/                     # 页面组件
│   ├── hooks/                     # 自定义Hooks
│   ├── lib/                       # 工具库
│   ├── assets/                    # 编译时资源
│   ├── App.tsx                    # 主应用组件
│   ├── main.tsx                   # 应用入口
│   └── index.css                  # 全局样式
│
├── dist/                          # 构建输出目录 (自动生成)
├── node_modules/                  # 依赖包 (自动生成)
│
└── [配置文件]                      # 项目配置
    ├── package.json               # 项目依赖和脚本
    ├── tsconfig.json              # TypeScript配置
    ├── vite.config.ts             # Vite构建配置
    ├── tailwind.config.js         # Tailwind CSS配置
    ├── postcss.config.js          # PostCSS配置
    └── eslint.config.js           # ESLint配置
```

## 资源路径规范

### 静态资源访问
在代码中引用`public/`目录下的资源时，路径需要从根目录开始：

```tsx
// 合作伙伴logo
<img src="/assets/tencent.svg" />

// 服务图片
<img src="/img/digi_man.jpg" />

// 图标
<img src="/img/icons8-微信-50.png" />
```

### 为什么这样组织？

1. **`docs/`** - 将所有文档集中管理，便于维护和查找
2. **`public/assets/images/`** - 按功能分类组织图片，提高可维护性
3. **`public/img/`** - 保留向后兼容性，避免破坏现有代码引用
4. **`docs/archive/`** - 归档旧代码，保持主代码库整洁

## 图片资源分类

### Partners (合作伙伴)
存放合作伙伴、客户、合作机构的logo
- 路径: `public/assets/images/partners/`
- 访问: `/assets/xxx.svg`

### Services (服务)
存放产品服务相关的概念图、演示图
- 路径: `public/assets/images/services/`
- 访问: `/img/xxx.jpg`

### Avatars (头像)
存放用户头像、团队成员照片
- 路径: `public/assets/images/avatars/`
- 访问: `/img/头像1.png`

### Case Studies (案例)
存放客户案例、成功故事的图片
- 路径: `public/assets/images/case-studies/`
- 访问: `/img/某外贸公司全员AI培训.png`

### Icons (图标)
存放小图标、UI元素
- 路径: `public/assets/images/icons/`
- 访问: `/img/icons8-微信-50.png`

## 文档管理

### 设计文档
所有设计相关的文档和草稿存放在 `docs/design-drafts/`

### 技术文档
所有markdown格式的技术文档存放在 `docs/` 根目录

### 归档文件
不再使用但需要保留的代码文件存放在 `docs/archive/`

## 最佳实践

1. **新增图片** - 根据用途放入对应的 `public/assets/images/` 子目录
2. **命名规范** - 使用小写字母和连字符，如 `company-logo.svg`
3. **格式选择**:
   - Logo/图标: SVG (矢量图)
   - 照片: JPG/AVIF (压缩格式)
   - 需要透明背景: PNG
4. **文档更新** - 项目重要变更应同步更新文档

## 构建和部署

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

构建后，`public/` 目录下的所有文件会被复制到 `dist/` 目录，保持相同的路径结构。
