import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles, TrendingUp, Users, BarChart3 } from 'lucide-react';

const AnimatedEfficiencyVisualization = () => {
  // Audio waveform bars animation
  const AudioBar = ({ delay }: { delay: number }) => (
    <motion.div
      className="w-1 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full"
      animate={{
        height: ['8px', '24px', '12px', '20px', '8px'],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );

  // Transcription text lines
  const transcriptionLines = [
    '客户询问产品规格...',
    'AI实时分析需求',
    '智能推荐方案',
  ];

  // Bar chart data
  const chartBars = [
    { label: '传统', height: 30, color: 'bg-gray-400' },
    { label: '竞品', height: 45, color: 'bg-gray-400' },
    { label: 'AI后', height: 85, color: 'bg-gradient-to-t from-amber-400 to-orange-500' },
  ];

  return (
    <div className="relative w-full h-full min-h-[320px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden p-6">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating geometric particles */}
      <motion.div
        className="absolute top-10 left-10 w-2 h-2 bg-amber-500/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-3 h-3 bg-blue-500/20 rounded-full"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Main Container with subtle float */}
      <motion.div
        className="relative z-10 h-full"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* LAYER 1: Input - Voice Transcription */}
        <motion.div
          className="absolute top-4 left-4 max-w-[200px]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-white/10 rounded-xl p-3 shadow-lg">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-blue-400/20 blur-xl -z-10" />
            
            {/* Header with avatar and mic icon */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="h-2 bg-cyan-400/40 rounded w-16 mb-1" />
                <div className="h-1.5 bg-cyan-400/30 rounded w-12" />
              </div>
              <Mic className="w-4 h-4 text-cyan-400" />
            </div>

            {/* Audio waveform */}
            <div className="flex items-end gap-1 h-6 mb-2">
              {[0, 0.1, 0.2, 0.3, 0.4, 0.15, 0.25].map((delay, i) => (
                <AudioBar key={i} delay={delay} />
              ))}
            </div>

            {/* Transcription lines appearing */}
            <div className="space-y-1">
              {transcriptionLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + index * 0.6,
                    ease: 'easeOut' 
                  }}
                  className="h-2 bg-gradient-to-r from-cyan-400/40 to-transparent rounded overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-cyan-400/60 rounded"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.6 + index * 0.6 
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-1 mt-2">
              <motion.div
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] text-cyan-300/80 font-medium">实时转录</span>
            </div>
          </div>
        </motion.div>

        {/* LAYER 2: AI Processing Hub - Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Central AI Icon with pulse */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)',
              }}
            />
            
            {/* Main icon container */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-amber-300/50 blur-lg" />
              <Sparkles className="w-7 h-7 text-white relative z-10" />
            </div>
          </motion.div>

          {/* Energy pulse lines connecting to output */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ width: '200px', height: '200px', left: '-100px', top: '-100px' }}>
            <motion.path
              d="M 100 100 Q 150 100 180 120"
              stroke="url(#pulseGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.5,
              }}
            />
            <defs>
              <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0)" />
                <stop offset="50%" stopColor="rgba(245, 158, 11, 1)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* LAYER 3: Output - Growth Dashboard */}
        <motion.div
          className="absolute bottom-4 right-4 max-w-[220px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="relative backdrop-blur-md bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-xl p-4 shadow-2xl">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-amber-400/10 blur-xl -z-10" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-gray-300 font-semibold">转化效果</span>
              </div>
              <BarChart3 className="w-4 h-4 text-gray-400" />
            </div>

            {/* Bar Chart - Animated Growth */}
            <div className="flex items-end justify-between h-24 mb-3 gap-2">
              {chartBars.map((bar, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className={`w-full ${bar.color} rounded-t-lg shadow-lg`}
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.height}%` }}
                    transition={{
                      duration: 1,
                      delay: 1.5 + index * 0.3,
                      ease: 'easeOut',
                    }}
                  >
                    {index === 2 && (
                      <motion.div
                        className="absolute inset-0 bg-amber-300/30 rounded-t-lg"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </motion.div>
                  <span className="text-[9px] text-gray-400">{bar.label}</span>
                </div>
              ))}
            </div>

            {/* Circular Progress - Lead Score */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <svg className="w-10 h-10 transform -rotate-90">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke="rgba(148, 163, 184, 0.2)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <motion.circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke="url(#scoreGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.98 }}
                      transition={{
                        duration: 1.5,
                        delay: 2,
                        ease: 'easeOut',
                      }}
                      style={{
                        pathLength: 0,
                        strokeDasharray: '100 100',
                      }}
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-xs font-bold text-amber-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                    >
                      98
                    </motion.span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">线索评分</div>
                  <div className="text-xs text-amber-400 font-semibold">优质客户</div>
                </div>
              </div>
            </div>

            {/* Conversion Badge - Popping up */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 2.8,
                type: 'spring',
                stiffness: 200,
              }}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 rounded-full shadow-lg"
            >
              <TrendingUp className="w-3 h-3 text-white" />
              <span className="text-xs font-bold text-white">+40% 转化</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedEfficiencyVisualization;
