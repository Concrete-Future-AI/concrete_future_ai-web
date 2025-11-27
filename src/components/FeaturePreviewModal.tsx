import React, { useState } from 'react';

interface FeaturePreviewModalProps {
  featureId: string | null;
  onClose: () => void;
}

const featurePageMap: Record<string, { path: string; title: string }> = {
  'local-llm': { path: '/features/local-llm-platform/index.html', title: '本地部署大模型平台' },
  'crm-ai': { path: '/features/crm-ai/index.html', title: 'CRM智能管理' },
  'sales-ai': { path: '/features/sales-ai/index.html', title: '销售智能助手' },
  'marketing-ai': { path: '/features/marketing-ai/index.html', title: '营销增长引擎' },
  'knowledge-base': { path: '/features/knowledge-base-ai/index.html', title: '企业知识库' },
  'finance-ai': { path: '/features/finance-ai/index.html', title: '财务智能管理' },
  'hr-ai': { path: '/features/hr-ai/index.html', title: 'HR智能管理' },
  'supply-chain': { path: '/features/supply-chain-ai/index.html', title: '供应链优化' },
  'procurement-ai': { path: '/features/procurement-ai/index.html', title: '采购智能管理' },
};

const FeaturePreviewModal: React.FC<FeaturePreviewModalProps> = ({ featureId, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!featureId) return null;

  const feature = featurePageMap[featureId];
  if (!feature) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative w-[95vw] h-[90vh] rounded-2xl overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4"
          style={{ 
            background: 'linear-gradient(135deg, #6B0F1A 0%, #8B2332 100%)'
          }}
        >
          <div className="text-white">
            <h2 className="text-xl font-bold">{feature.title}</h2>
            <p className="text-sm opacity-80">场景预览 - 可交互演示</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-[#6B0F1A] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">加载中...</p>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          src={feature.path}
          className="w-full h-full pt-[72px]"
          style={{ border: 'none' }}
          title={feature.title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default FeaturePreviewModal;
