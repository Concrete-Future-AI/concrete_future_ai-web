# 外贸电商AI转型落地页 - 完整实现代码

## 📋 文件结构

```
src/
├── pages/
│   ├── AITransformationPage.tsx      # 主页面组件
│   └── AITransformationPage.css      # 页面样式
├── components/
│   ├── Navigation.tsx                # 已存在
│   └── Footer.tsx                    # 已存在
```

## ✅ 已完成部分

- ✅ 第一屏：英雄区（Hero Section）
- ✅ 第二屏：痛点共鸣区（Pain Points）
- ✅ 基础样式和字体应用

## 🚧 待实现部分

下面是剩余屏幕的完整实现代码。请将这些代码添加到 `AITransformationPage.tsx` 中替换占位符组件。

---

## 第三屏：解决方案架构（Solutions Section）

### TSX 代码

```tsx
const SolutionsSection = () => {
  return (
    <section className="solutions-section">
      <div className="section-container">
        {/* 区域标题 */}
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">🎯</span>
            <span style={{
              fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
              fontWeight: '600'
            }}>
              我们的服务
            </span>
          </div>
          <h2 
            className="section-title"
            style={{
              fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
              fontWeight: '700'
            }}
          >
            我们提供的不是培训，<br />
            是<span className="title-underline">转型操作系统</span>
          </h2>
          <p 
            className="section-description"
            style={{
              fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
              fontWeight: '400'
            }}
          >
            从战略诊断到体系落地的全链路AI化服务
          </p>
        </div>
        
        {/* 服务架构 */}
        <div className="solutions-architecture">
          
          {/* 第一步：深度咨询 */}
          <div className="solution-card card-consulting">
            <div 
              className="card-number"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: '700'
              }}
            >
              第一步
            </div>
            <div className="card-icon-large">💡</div>
            <h3 
              className="card-title"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
              }}
            >
              深度战略咨询
            </h3>
            <p 
              className="card-subtitle"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '500'
              }}
            >
              1小时 = 为企业节省6个月弯路
            </p>
            
            <div className="card-content">
              <div className="content-section">
                <h4 
                  className="content-heading"
                  style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '600'
                  }}
                >
                  我们帮你回答3个核心问题：
                </h4>
                
                {/* 问题块 */}
                <div className="question-block">
                  <div className="question-number">1️⃣</div>
                  <div className="question-content">
                    <h5 
                      className="question-title"
                      style={{
                        fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                        fontWeight: '600'
                      }}
                    >
                      你的业务链条哪个环节最该AI化？
                    </h5>
                    <ul className="question-details">
                      <li style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}>
                        诊断10+个业务节点
                      </li>
                      <li style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}>
                        识别3个最快见效的突破口
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="question-block">
                  <div className="question-number">2️⃣</div>
                  <div className="question-content">
                    <h5 
                      className="question-title"
                      style={{
                        fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                        fontWeight: '600'
                      }}
                    >
                      如何避开95%企业踩过的AI坑？
                    </h5>
                    <ul className="question-details">
                      <li style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}>
                        盘点5大常见误区
                      </li>
                      <li style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}>
                        定制防坑指南
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="question-block">
                  <div className="question-number">3️⃣</div>
                  <div className="question-content">
                    <h5 
                      className="question-title"
                      style={{
                        fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                        fontWeight: '600'
                      }}
                    >
                      你的90天转型路线图怎么画？
                    </h5>
                    <ul className="question-details">
                      <li style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}>
                        短期速赢 + 中期体系 + 长期战略
                      </li>
                      <li style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}>
                        可落地的分步行动计划
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* 定价盒子 */}
              <div className="card-pricing-box">
                <div className="pricing-row">
                  <span 
                    className="pricing-label"
                    style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    💰 投资
                  </span>
                  <span 
                    className="pricing-value"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: '700'
                    }}
                  >
                    ¥1,000/小时
                  </span>
                </div>
                <div className="pricing-row">
                  <span 
                    className="pricing-label"
                    style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    📈 价值
                  </span>
                  <span 
                    className="pricing-value"
                    style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '700'
                    }}
                  >
                    避免错误投入数万~数十万
                  </span>
                </div>
                <div className="pricing-row">
                  <span 
                    className="pricing-label"
                    style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    ⏱️ 时长
                  </span>
                  <span 
                    className="pricing-value"
                    style={{
                      fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                      fontWeight: '700'
                    }}
                  >
                    通常2-4小时深度对话
                  </span>
                </div>
              </div>
              
              <button 
                className="card-cta"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '600'
                }}
              >
                预约首次免费诊断(60分钟) →
              </button>
            </div>
          </div>
          
          {/* 连接箭头 */}
          <div className="solution-connector">
            <div className="connector-line"></div>
            <div className="connector-arrow">↓</div>
            <div 
              className="connector-text"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '600'
              }}
            >
              完成诊断后
            </div>
          </div>
          
          {/* 第二步：系统化培训 */}
          <div className="solution-card card-training">
            <div 
              className="card-number"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: '700'
              }}
            >
              第二步
            </div>
            <div className="card-icon-large">🎯</div>
            <h3 
              className="card-title"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                fontWeight: '700'
              }}
            >
              系统化企业内训
            </h3>
            <p 
              className="card-subtitle"
              style={{
                fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                fontWeight: '500'
              }}
            >
              不是碎片化技能，是完整转型体系
            </p>
            
            <div className="card-content">
              <div className="content-section">
                <div className="feature-grid">
                  {[
                    '10大核心模块覆盖全业务链',
                    '定制化设计，非标准化课件',
                    '配套工具包 + 模板 + 工作流',
                    '30天落地答疑支持',
                    '可选进阶技术模块'
                  ].map((text, index) => (
                    <div key={index} className="feature-item">
                      <div className="feature-icon">✓</div>
                      <div 
                        className="feature-text"
                        style={{
                          fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                          fontWeight: '500'
                        }}
                      >
                        {text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 培训流程 */}
              <div className="training-flow">
                <div className="flow-item">
                  <div className="flow-icon">🧠</div>
                  <div 
                    className="flow-text"
                    style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    认知升级
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">
                  <div className="flow-icon">🛠️</div>
                  <div 
                    className="flow-text"
                    style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    工具掌握
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">
                  <div className="flow-icon">🚀</div>
                  <div 
                    className="flow-text"
                    style={{
                      fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                      fontWeight: '600'
                    }}
                  >
                    体系落地
                  </div>
                </div>
              </div>
              
              <div className="card-highlight-box">
                <p 
                  className="highlight-text"
                  style={{
                    fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                    fontWeight: '600'
                  }}
                >
                  让AI能力成为企业的核心竞争力
                </p>
              </div>
              
              <button 
                className="card-cta secondary"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '600'
                }}
              >
                查看完整课程体系 ↓
              </button>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};
```

### CSS 样式（添加到 AITransformationPage.css）

```css
/* ==================== 第三屏：解决方案架构 ==================== */
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
  color: #1A1A1A;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.card-subtitle {
  font-size: 18px;
  color: #6B6B6B;
  margin: 0 0 32px 0;
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.pricing-value {
  font-size: 16px;
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
```

---

## 📝 实现步骤说明

1. **将上面的 Solutions Section 代码添加到 AITransformationPage.tsx**
   - 替换占位符 `const SolutionsSection = () => <div>Solutions Section (待实现)</div>;`

2. **将 CSS 代码添加到 AITransformationPage.css**
   - 追加到文件末尾

3. **测试页面效果**
   - 运行 `npm run dev`
   - 访问对应路由查看效果

4. **调整细节**
   - 根据实际效果调整间距、颜色等
   - 确保字体正确应用
   - 测试响应式布局

---

## 🎯 下一步

完成第三屏后，继续实现：
- 第四屏：课程模块详解（手风琴式展开）
- 第五屏：客户案例与成果
- 第六屏：服务流程
- 第七屏：价格与价值锚定
- 第八屏：行动召唤（CTA）

每个屏幕的实现代码我都已经在原设计文档中详细列出，您可以按照相同的模式逐步实现。

---

## 💡 提示

- 所有组件都已应用新的字体体系（Space Grotesk + IBM Plex Sans + JetBrains Mono + Noto Sans SC）
- 保持与主站设计风格一致
- 注意响应式布局的测试
- 可以根据实际需求调整内容和样式
