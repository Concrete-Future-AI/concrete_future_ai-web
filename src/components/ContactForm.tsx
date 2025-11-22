import React, { useState } from 'react';
import CustomSelect from './CustomSelect';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    requirement: '企业AI全案转型咨询'
  });

  // 需求选项配置
  const requirementOptions = [
    { value: '企业AI全案转型咨询', label: '企业AI全案转型咨询' },
    { value: '外贸/电商降本增效方案', label: '外贸/电商降本增效方案' },
    { value: '智能客服/销售/RPA自动化部署', label: '智能客服/销售/RPA自动化部署' },
    { value: 'AI+硬件/产品智能化定制', label: 'AI+硬件/产品智能化定制' },
    { value: '企业内训与AI团队赋能', label: '企业内训与AI团队赋能' }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => {
        setCopiedItem(null);
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 飞书机器人 Webhook 地址
      const webhookUrl = 'https://open.feishu.cn/open-apis/bot/v2/hook/a9f3b370-76a0-4312-a3ec-41a89c294e27';
      
      // 格式化提交时间
      const submitTime = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // 构建飞书富文本消息
      const message = {
        msg_type: "post",
        content: {
          post: {
            zh_cn: {
              title: "🎯 新的客户咨询",
              content: [
                [
                  {
                    tag: "text",
                    text: "姓名：" + formData.name
                  }
                ],
                [
                  {
                    tag: "text",
                    text: "公司：" + formData.company
                  }
                ],
                [
                  {
                    tag: "text",
                    text: "微信号：" + (formData.phone || '未填写')
                  }
                ],
                [
                  {
                    tag: "text",
                    text: "需求类型：" + formData.requirement
                  }
                ],
                [
                  {
                    tag: "text",
                    text: "提交时间：" + submitTime
                  }
                ],
                [
                  {
                    tag: "text",
                    text: "---"
                  }
                ],
                [
                  {
                    tag: "text",
                    text: "💡 请尽快与客户联系！"
                  }
                ]
              ]
            }
          }
        }
      };
      
      // 发送到飞书机器人
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          phone: '',
          requirement: '战略咨询与培训'
        });
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error('提交失败:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.company;

  return (
    <section id="contact" className="py-20" style={{ backgroundColor: '#F9F8F6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            让转型不再是试错，从这里开始落地
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            每月仅开放 5 个深度陪跑名额。填写表单，锁定您的转型席位。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="text-label block text-gray-700 mb-2"
                  >
                    您的姓名 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-body w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                      focus:border-orange-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(217,119,87,0.1)]
                      hover:border-gray-300
                      transition-all duration-300"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="company" 
                    className="text-label block text-gray-700 mb-2"
                  >
                    公司名称 *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="text-body w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                      focus:border-orange-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(217,119,87,0.1)]
                      hover:border-gray-300
                      transition-all duration-300"
                    placeholder="请输入公司名称"
                    required
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm text-gray-700 mb-2"
                  style={{
                    fontWeight: '500'
                  }}
                >
                  微信号
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="text-body w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                    focus:border-orange-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(217,119,87,0.1)]
                    hover:border-gray-300
                    transition-all duration-300"
                  placeholder="请输入微信号"
                />
              </div>

              <div>
                <label 
                  htmlFor="requirement" 
                  className="block text-sm text-gray-700 mb-2"
                  style={{
                    fontWeight: '500'
                  }}
                >
                  您的需求 *
                </label>
                <CustomSelect
                  value={formData.requirement}
                  onChange={(value) => setFormData({ ...formData, requirement: value })}
                  options={requirementOptions}
                  placeholder="请选择您的需求"
                />
              </div>



              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 ${
                  isFormValid && !isSubmitting
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {isSubmitting ? '提交中...' : '免费领取诊断方案 (价值¥9800)'}
              </button>

              <p 
                className="text-body text-xs text-gray-500 text-center mt-2"
              >
                24小时内快速响应
              </p>

              {submitStatus === 'success' && (
                <div 
                  className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-center"
                  style={{
                    fontWeight: '500'
                  }}
                >
                  感谢您的咨询！我们将在24小时内主动联系您。
                </div>
              )}

              {submitStatus === 'error' && (
                <div 
                  className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center"
                  style={{
                    fontWeight: '500'
                  }}
                >
                  提交失败，请稍后重试。
                </div>
              )}


            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 
                className="text-lg text-black mb-4"
                style={{
                  fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                  fontWeight: '700'
                }}
              >欢迎主动联系我们</h3>
              <div className="space-y-3">
                <div 
                  className="flex items-center space-x-3 cursor-pointer group relative"
                  onClick={() => copyToClipboard('guohao@concretefutuerai.com', 'email')}
                >
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <img src="/img/icons8-最新帖子-30.png" alt="邮箱" className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div 
                      className="text-black text-sm group-hover:text-orange-600 transition-colors"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '500'
                      }}
                    >guohao@concretefutuerai.com</div>
                  </div>
                  {copiedItem === 'email' ? (
                    <span 
                      className="text-xs text-green-600 font-medium"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif"
                      }}
                    >已复制!</span>
                  ) : (
                    <span 
                      className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif"
                      }}
                    >点击复制</span>
                  )}
                </div>
                <div 
                  className="flex items-center space-x-3 cursor-pointer group relative"
                  onClick={() => copyToClipboard('Echo_Jiang1117', 'wechat')}
                >
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <img src="/img/icons8-微信-50.png" alt="微信" className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div 
                      className="text-black text-sm group-hover:text-orange-600 transition-colors"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '500'
                      }}
                    >Echo_Jiang1117</div>
                  </div>
                  {copiedItem === 'wechat' ? (
                    <span 
                      className="text-xs text-green-600 font-medium"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif"
                      }}
                    >已复制!</span>
                  ) : (
                    <span 
                      className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif"
                      }}
                    >点击复制</span>
                  )}
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 
                      className="text-black mb-1 text-sm"
                      style={{
                        fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                        fontWeight: '600'
                      }}
                    >定制方案</h4>
                    <p 
                      className="text-xs text-gray-600"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}
                    >深度诊断，量身定制最适合的转型路径</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 
                      className="text-black mb-1 text-sm"
                      style={{
                        fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif",
                        fontWeight: '600'
                      }}
                    >效果保障</h4>
                    <p 
                      className="text-xs text-gray-600"
                      style={{
                        fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif",
                        fontWeight: '400'
                      }}
                    >对结果负责，持续优化直到达成目标</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;