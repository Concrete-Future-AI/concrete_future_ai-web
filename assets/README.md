## Logo轮播组件使用说明

本组件已改写为：自动从当前目录动态收集 `png/jpg/jpeg/svg` 文件（使用 `import.meta.glob`），默认灰白显示，悬停恢复原色并放大，点击可跳转到对应网站。

### 如何添加新 logo
1. 将 PNG/JPG/SVG 文件直接拖入本文件夹：`files 2/src/assets/logos/`
2. 在本文件夹的 `links.json` 中添加对应跳转 URL（可选）
3. 保存后，开发服务器会热更新，组件自动显示新 logo

### 文件命名规范
- 使用有意义的文件名，如：`MyCompany.png`
- 建议透明背景 PNG 或 SVG，显示效果更好
- 建议图像高度不超过 100px（组件会自适应缩放）

### 链接配置
在 `links.json` 中添加键值对，键为文件名，值为跳转链接：

```json
"MyCompany.png": "https://mycompany.com"
```

如果未在 `links.json` 中配置链接，点击该 logo 不会跳转。

### 视觉效果
- 默认灰白显示：`grayscale` + `opacity-60`
- 悬停彩色并放大约 10%，同时暂停滚动以便点击
- 点击 logo 在新窗口打开对应网站

### 目录内示例
- 已包含 `Harvard.svg`, `NVIDIA.svg`, `Meta.svg`, `Notion.svg`, `Coursera.svg`, `TestLogo.svg` 等示例文件
- `links.json` 已为这些示例配置跳转链接

### 常见问题
- 新增后未显示：确认文件位于 `files 2/src/assets/logos/`，扩展名是否为 `png/jpg/jpeg/svg`
- 点击无跳转：检查 `links.json` 是否补充了该文件名的链接映射
- 灰度不明显：可将图片标签样式中的透明度从 `opacity-60` 调整到 `opacity-70/80`

如需进一步调整样式（标题、背景、滚动速度、间距等），可在组件中修改相应的 Tailwind 与动画参数。