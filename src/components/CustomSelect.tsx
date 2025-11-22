import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = '请选择'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 添加 CSS 动画
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInSlideDown {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 关闭下拉菜单当点击外部
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 获取当前选中项
  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Input Field (Closed State) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full h-14 px-4 flex items-center justify-between
          bg-white rounded-lg border
          transition-all duration-200
          ${isOpen 
            ? 'border-orange-500 ring-2 ring-orange-100' 
            : 'border-gray-200 hover:border-gray-300'
          }
        `}
      >
        <span 
          className={`text-left ${selectedOption ? 'text-gray-900' : 'text-gray-400'}`}
          style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Arrow Icon */}
        <ChevronDown 
          className={`
            w-5 h-5 text-gray-400 
            transition-transform duration-200
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
        />
      </button>

      {/* Dropdown Menu (Open State) */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-100 shadow-xl z-50 overflow-hidden"
          style={{
            animation: 'fadeInSlideDown 200ms ease-out',
            transformOrigin: 'top'
          }}
        >
          <ul className="py-2">
            {options.map((option) => {
              const isSelected = option.value === value;
              
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full px-4 py-3 flex items-center justify-between
                      text-left transition-colors duration-150
                      ${isSelected 
                        ? 'bg-orange-50 text-orange-600' 
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      }
                    `}
                    style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
                  >
                    <span>{option.label}</span>

                    {/* Checkmark for selected item */}
                    {isSelected && (
                      <Check className="w-5 h-5 text-orange-600" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
