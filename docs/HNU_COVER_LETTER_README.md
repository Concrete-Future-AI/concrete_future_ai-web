# Hunan University Cover Letter Template

湖南大学官方风格求职信/申请信LaTeX模板

## 项目简介

本项目提供符合湖南大学视觉规范的Cover Letter LaTeX模板，适用于研究生申请、求职申请等正式信函场景。模板基于HIT推荐信模板修改，由Guohao Qi (qgh124430@hnu.edu.cn) 改编适配湖南大学学生需求。

## 主要特性

- 湖南大学官方logo和背景水印
- 专业的页眉页脚布局设计
- 自动页码管理（Page X of Y格式）
- 支持个性化信息配置
- 支持电子签名或手写签名
- Cambria字体支持（可选）
- 多页信件自动格式化

## 文件结构

```
Cover letter template of HNU/
├── main.tex                    # 主LaTeX文件（使用示例）
├── HNUletter.cls              # 湖南大学信件文档类定义
├── HNU_square.png             # 湖南大学方形logo
├── hnu_background.png         # 背景水印图片
├── signature_block.pdf        # 签名块示例
├── Cambria.ttf                # Cambria字体（常规）
├── CambriaBold.ttf            # Cambria字体（粗体）
├── CambriaItalic.ttf          # Cambria字体（斜体）
└── CambriaBoldItalic.ttf      # Cambria字体（粗斜体）
```

## 使用方法

### 环境要求

- LaTeX发行版（推荐TeX Live或MiKTeX）
- XeLaTeX编译器（支持fontspec和中文字体）
- 必需的LaTeX包：
  - fontspec
  - tikz
  - xcolor
  - fancyhdr
  - lastpage
  - eso-pic
  - babel

### 快速开始

1. 克隆或下载本仓库：
```bash
git clone https://github.com/Barca0412/Cover-letter-of-Hunan-University.git
```

2. 打开 `main.tex` 文件，修改个人信息部分：

```latex
% 姓名和职位
\def\name{XXX,\\
Student,\\
College of Finance and Statistics, Hunan University
}

% 学院信息
\def\Where{\hspace{-1.2mm}\textbf{\color{HNUred}
College of Finance and Statistics,\\ Hunan University
}}

% 联系地址
\def\Address{109 Shijiachong Street,\\ Yuelu District,}
\def\CityZip{Changsha, Hunan, 410006}

% 联系方式
\def\Email{\textbf{\color{HNUred}E-mail}: XXX@hnu.edu.cn}
\def\TEL{\textbf{\color{HNUred}Phone}: 86-XXX}
\def\URL{\textbf{\color{HNUred}URL}: https://github.com/XXX}
```

3. 修改收件人信息：

```latex
\begin{letter}{
University Name\\
University Address\\
City, Province, Zip code
}
```

4. 编写正文内容，替换示例文本。

5. 使用XeLaTeX编译：
```bash
xelatex main.tex
```

### 自定义选项

#### 签名设置

**方式一：使用电子签名（推荐）**
```latex
\signature{
\vspace{-12mm}\includegraphics[scale=0.4]{signature_block.pdf}\\\vspace{-2mm}
\name}
```

**方式二：手写签名**
```latex
\signature{\name}  % 打印后手写签名
```

#### 水印控制

保留水印：
```latex
\watermark{}{}{}
```

移除水印：
```latex
% \watermark{}{}{}  % 注释此行
```

#### 字体设置

如已安装Cambria字体，取消注释以下行：
```latex
\setmainfont{[Cambria.ttf]}[BoldFont = [CambriaBold.ttf], ItalicFont = [CambriaItalic.ttf], BoldItalicFont = [CambriaBoldItalic.ttf] ]
```

#### 页脚信息

自定义学院页脚：
```latex
\def\school{\small{
HNU $\cdot$
~College of Finance and Statistics $\cdot$
~No.109, Shijiachong Street $\cdot$
~Changsha, Hunan Province, China} }
```

移除页脚：
```latex
\def\school{~}
```

## 编译说明

### 推荐编译命令

```bash
xelatex main.tex
xelatex main.tex  # 建议运行两次以确保交叉引用正确
```

### 在线LaTeX平台

- Overleaf：上传所有文件到项目，设置编译器为XeLaTeX
- TeXPage：类似操作，选择XeLaTeX编译

### 常见问题

**问题1：字体未找到**
- 解决方案：注释掉 `\setmainfont` 命令，使用默认字体

**问题2：logo不显示**
- 确保 `HNU_square.png` 与 `.tex` 文件在同一目录

**问题3：页码显示异常**
- 运行两次XeLaTeX以更新 `\pageref` 引用

**问题4：中文显示问题**
- 确保使用XeLaTeX而非PDFLaTeX编译

## 贡献与反馈

- 原作者：Brian Wood (brian.wood@oregonstate.edu)
- HNU版本修改：Guohao Qi (qgh124430@hnu.edu.cn)
- 微信：qgh985695077

如有问题或建议，欢迎通过邮件联系或在GitHub提交Issue。

## 许可说明

本模板基于前人工作修改而成，供湖南大学学生学习和使用。使用时请注意：
- 本模板为非官方模板
- 使用前请核对是否符合目标机构要求
- 个人信息务必仔细检查

## 版本历史

- 2024-04-04: 初始版本发布，基于NJU版本改编
- 基于HIT推荐信模板和NJU版本（Luyi Li修改）

## 参考资料

- 基于brownletter.cls (Copyright 2003, Nesime Tatbul)
- LaTeX letter文档类
- TikZ宏包文档
