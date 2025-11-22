import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
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

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 飞书机器人 Webhook 地址（与ContactForm相同）
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
              title: "🎯 新的客户咨询（AI实施页面）",
              content: [
                [
                  {
                    tag: "text",
                    text: "来源：AI化转型落地开发与部署页面"
                  }
                ],
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
                    text: "💡 免费咨询预约（价值¥1,000）- 请尽快与客户联系！"
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
          requirement: 'AI化转型落地开发与部署'
        });
        
        // 3秒后自动关闭弹窗
        setTimeout(() => {
          setSubmitStatus('idle');
          onClose();
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div 
          className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-start rounded-t-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.05) 0%, rgba(255, 255, 255, 1) 100%)'
          }}
        >
          <div>
            <h3 
              className="text-heading text-3xl mb-2"
              style={{ color: '#0A0A0A' }}
            >
              免费预约咨询
            </h3>
            <p 
              className="text-sm"
              style={{
                color: '#D97757',
                fontWeight: '700'
              }}
            >
              价值 ¥1,000 | 24小时内快速响应
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 表单内容 */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label 
              htmlFor="modal-name" 
              className="block text-sm mb-2"
              style={{ color: '#1E293B' }}
            >
              您的姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="modal-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-body w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                focus:outline-none
                hover:border-gray-300
                transition-all duration-300"
              style={{
                borderColor: formData.name ? '#D97757' : '#E5E7EB',
                boxShadow: formData.name ? '0 0 0 3px rgba(217, 119, 87, 0.1)' : 'none'
              }}
              placeholder="请输入您的姓名"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="modal-company" 
              className="block text-sm mb-2"
              style={{ color: '#1E293B' }}
            >
              公司名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="modal-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="text-body w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                focus:outline-none
                hover:border-gray-300
                transition-all duration-300"
              style={{
                borderColor: formData.company ? '#D97757' : '#E5E7EB',
                boxShadow: formData.company ? '0 0 0 3px rgba(217, 119, 87, 0.1)' : 'none'
              }}
              placeholder="请输入公司名称"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="modal-phone" 
              className="block text-sm mb-2"
              style={{ color: '#1E293B' }}
            >
              微信号（选填）
            </label>
            <input
              type="text"
              id="modal-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-body w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                focus:outline-none
                hover:border-gray-300
                transition-all duration-300"
              style={{
                borderColor: formData.phone ? '#D97757' : '#E5E7EB',
                boxShadow: formData.phone ? '0 0 0 3px rgba(217, 119, 87, 0.1)' : 'none'
              }}
              placeholder="请输入微信号，方便我们联系您"
            />
          </div>

          <div>
            <label 
              htmlFor="modal-requirement" 
              className="block text-sm mb-2"
              style={{ color: '#1E293B' }}
            >
              您的需求 <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              value={formData.requirement}
              onChange={(value) => setFormData({ ...formData, requirement: value })}
              options={requirementOptions}
              placeholder="请选择您的需求"
            />
          </div>

          {/* 提交状态提示 */}
          {submitStatus === 'success' && (
            <div 
              className="rounded-lg p-4 text-center border-2"
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                borderColor: '#10B981',
                color: '#065F46',
                fontWeight: '700'
              }}
            >
              ✓ 提交成功！我们将在24小时内主动联系您
            </div>
          )}

          {submitStatus === 'error' && (
            <div 
              className="rounded-lg p-4 text-center border-2"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: '#EF4444',
                color: '#991B1B',
                fontWeight: '700'
              }}
            >
              × 提交失败，请稍后重试
            </div>
          )}

          {/* 按钮组 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-subheading flex-1 py-3 px-6 rounded-xl text-base transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              style={{ color: '#64748B' }}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`flex-1 py-3 px-6 rounded-xl text-base transition-all duration-300 ${
                isFormValid && !isSubmitting
                  ? 'text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{
                background: isFormValid && !isSubmitting 
                  ? 'linear-gradient(135deg, #D97757 0%, #C96543 100%)' 
                  : undefined,
                fontWeight: '800'
              }}
            >
              {isSubmitting ? '提交中...' : '立即预约'}
            </button>
          </div>

          {/* 信任标记 */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span 
                className="text-body text-xs text-gray-600"
              >
                信息加密传输
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span 
                className="text-body text-xs text-gray-600"
              >
                隐私保护承诺
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;
