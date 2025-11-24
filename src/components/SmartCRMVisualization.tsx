import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Phone, Mail, Linkedin, Check, TrendingUp, BarChart3, Users, Clock } from 'lucide-react';

const SmartCRMVisualization = () => {
  const [scanComplete, setScanComplete] = React.useState(false);
  const odometerControls = useAnimation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setScanComplete(true);
      odometerControls.start({ 
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
      });
    }, 2800);
    return () => clearTimeout(timer);
  }, [odometerControls]);

  // Card stack data
  const stackCards = [
    { id: 3, y: -16, rotate: 1.5, scale: 0.94, delay: 0 },
    { id: 2, y: -8, rotate: -2, scale: 0.97, delay: 0.1 },
  ];

  // Stats data
  const statsData = [
    { label: '线索总数', value: '2,847', icon: Users, delay: 3.4 },
    { label: '处理时间', value: '0.3s', icon: Clock, delay: 3.5 },
    { label: '转化提升', value: '+40%', icon: TrendingUp, delay: 3.6 },
  ];

  return (
    <div 
      className="relative w-full h-full min-h-[320px] rounded-2xl overflow-visible flex items-center justify-center p-8 bg-slate-50"
    >
      {/* Subtle background texture - very minimal */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Left Stats Panel - Subtle ambient widgets */}
      <motion.div
        className="absolute -left-4 top-8 w-32 space-y-3 z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.4, duration: 0.6 }}
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="rounded-lg p-3 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: stat.delay,
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className="w-3 h-3 text-orange-500" />
              <span className="text-[9px] font-medium text-slate-500">
                {stat.label}
              </span>
            </div>
            <motion.div 
              className="text-lg font-semibold text-slate-900"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: stat.delay + 0.5,
              }}
            >
              {stat.value}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Progress Ring - Subtle */}
      <motion.div
        className="absolute -right-4 top-8 w-28 h-28 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.5, type: 'spring' }}
      >
        <div 
          className="w-full h-full rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
          }}
        >
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="#E5E7EB"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="44"
              stroke="#f59e0b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.85 }}
              transition={{
                duration: 1.5,
                delay: 3.7,
                ease: 'easeOut',
              }}
              style={{
                strokeDasharray: '276',
              }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            <motion.div 
              className="text-2xl font-bold text-orange-500"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 4.2,
              }}
            >
              85%
            </motion.div>
            <div className="text-[9px] font-medium text-slate-500">
              准确率
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Mini Bar Chart - Subtle */}
      <motion.div
        className="absolute -bottom-6 -left-4 w-40 rounded-lg p-3 backdrop-blur-sm z-20"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.8, type: 'spring' }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <BarChart3 className="w-3 h-3 text-orange-500" />
          <span className="text-[9px] font-medium text-slate-500">
            本周趋势
          </span>
        </div>
        <div className="flex items-end justify-between h-12 gap-1">
          {[30, 45, 35, 60, 55, 70, 85].map((height, index) => (
            <motion.div
              key={index}
              className="flex-1 rounded-t"
              style={{
                backgroundColor: index === 6 ? '#f59e0b' : '#E5E7EB',
              }}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{
                duration: 0.5,
                delay: 4 + index * 0.1,
                type: 'spring',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Card Stack Container */}
      <div className="relative w-full max-w-xs h-72 overflow-visible">
        {/* Background Stack Cards - Very subtle */}
        {stackCards.map((card) => (
          <motion.div
            key={card.id}
            className="absolute top-1/2 left-1/2 w-64 h-80 rounded-xl"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              transformOrigin: 'center center',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
            initial={{
              x: '-50%',
              y: '-40%',
              rotate: 0,
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              x: '-50%',
              y: `calc(-50% + ${card.y}px)`,
              rotate: card.rotate,
              scale: card.scale,
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              delay: card.delay,
            }}
          >
            {/* Minimal content placeholder */}
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 rounded bg-slate-200" style={{ width: '70%' }} />
                  <div className="h-1.5 rounded bg-slate-200" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Hero Card - Main focus */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-80 rounded-xl overflow-visible z-10 bg-white"
          style={{ 
            transformOrigin: 'center center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
          initial={{
            x: '-50%',
            y: '-30%',
            rotate: 0,
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            x: '-50%',
            y: '-50%',
            rotate: 0,
            scale: 1,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            delay: 0.4,
          }}
        >
          {/* Card Content */}
          <div className="relative w-full h-full p-5">
            {/* Header - Avatar & Name */}
            <div className="flex items-start gap-3 mb-4">
              {/* Avatar */}
              <motion.div
                className="relative w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.8,
                }}
              >
                <span className="text-white font-bold text-lg">AW</span>
                {/* Online indicator */}
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: 'spring' }}
                />
              </motion.div>

              {/* Name & Role */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <h3 className="text-sm font-semibold text-slate-900 mb-0.5">
                  Alexander Wu
                </h3>
                <p className="text-xs text-slate-500">CTO @ TechFlow</p>
              </motion.div>
            </div>

            {/* AI Badge - Clean modern style */}
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full mb-4 border border-orange-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.6,
                duration: 0.5,
                type: 'spring',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Check className="w-3 h-3" />
              </motion.div>
              <span className="text-xs font-medium">高意向客户</span>
            </motion.div>

            {/* Scanning Line - Subtle orange */}
            <motion.div
              className="absolute left-0 right-0 h-0.5 z-20 bg-orange-400"
              style={{
                boxShadow: '0 0 8px rgba(245, 158, 11, 0.4)',
              }}
              initial={{ top: '20%', opacity: 0 }}
              animate={{ 
                top: ['20%', '80%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 1.5,
                ease: 'easeInOut',
              }}
            />

            {/* Key Data Points - Clean list */}
            <motion.div
              className="space-y-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { label: '产品页访问', value: '8次' },
                { label: '技术文档', value: '已下载' },
                { label: '预算匹配', value: '95%' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between text-xs py-1.5 px-2 rounded bg-slate-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.15 }}
                >
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-slate-900 font-medium">{item.value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons - Modern clean design */}
            <div className="flex items-center gap-2 mb-4">
              {[
                { Icon: Phone, delay: 2.2 },
                { Icon: Mail, delay: 2.35 },
                { Icon: Linkedin, delay: 2.5 },
              ].map((action, index) => (
                <motion.button
                  key={index}
                  className="flex-1 h-10 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: action.delay,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <action.Icon className="w-4 h-4 text-slate-600" />
                </motion.button>
              ))}
            </div>

            {/* Success Badge - Breaking out, clean tooltip style */}
            <motion.div
              className="absolute -top-3 -right-8 px-3 py-2 bg-white rounded-lg shadow-lg border border-orange-100 z-30"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ 
                opacity: scanComplete ? 1 : 0, 
                scale: scanComplete ? 1 : 0, 
                rotate: 0 
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 12,
                delay: 2.8,
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-500">合格</div>
                  <div className="text-xs font-semibold text-slate-900">已验证</div>
                </div>
              </div>
            </motion.div>

            {/* Odometer Counter - Clean modern style */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.6, type: 'spring' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600">
                  转化率
                </span>
                <div className="relative h-8 overflow-hidden">
                  <motion.div
                    className="text-2xl font-bold text-orange-600"
                    initial={{ y: 40 }}
                    animate={odometerControls}
                  >
                    <div className="h-8 flex items-center">+40%</div>
                    <div className="h-8 flex items-center">+00%</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Processing Indicator - Clean modern badge */}
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-slate-100 z-30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.5 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-orange-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
          <span className="text-xs font-medium text-slate-700">
            AI 精准筛选
          </span>
        </motion.div>

        {/* Floating Tags - Clean tooltip style */}
        <motion.div
          className="absolute -top-8 -left-4 px-3 py-1.5 rounded-full bg-white shadow-md border border-orange-100 z-30"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -5, 0],
          }}
          transition={{ 
            opacity: { delay: 4.5 },
            scale: { delay: 4.5 },
            y: { 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
        >
          <span className="text-[10px] font-medium text-orange-600">
            高优先级
          </span>
        </motion.div>

        <motion.div
          className="absolute -top-6 right-20 px-3 py-1.5 rounded-full bg-white shadow-md border border-slate-100 z-30"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{ 
            opacity: { delay: 4.7 },
            scale: { delay: 4.7 },
            y: { 
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }
          }}
        >
          <span className="text-[10px] font-medium text-slate-600">
            B2B科技
          </span>
        </motion.div>

        <motion.div
          className="absolute bottom-14 -right-10 px-3 py-1.5 rounded-full bg-white shadow-md border border-slate-100 z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{ 
            opacity: { delay: 4.9 },
            scale: { delay: 4.9 },
            y: { 
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }
          }}
        >
          <span className="text-[10px] font-medium text-slate-600">
            企业级
          </span>
        </motion.div>
      </div>

      {/* Animated Connection Lines - Very subtle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <motion.line
          x1="20%"
          y1="50%"
          x2="40%"
          y2="50%"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{
            duration: 1,
            delay: 3.3,
            ease: 'easeInOut',
          }}
        />
        <motion.line
          x1="60%"
          y1="50%"
          x2="75%"
          y2="40%"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{
            duration: 1,
            delay: 3.4,
            ease: 'easeInOut',
          }}
        />
        <motion.circle
          cx="40%"
          cy="50%"
          r="2"
          fill="#f59e0b"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.3, 1],
            opacity: [0, 0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 0.8,
            delay: 4.3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
        <motion.circle
          cx="75%"
          cy="40%"
          r="2"
          fill="#f59e0b"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.3, 1],
            opacity: [0, 0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 0.8,
            delay: 4.4,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      </svg>
    </div>
  );
};

export default SmartCRMVisualization;
