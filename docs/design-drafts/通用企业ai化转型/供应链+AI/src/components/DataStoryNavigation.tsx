import { useState } from 'react';
import { Check, Circle, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface StoryStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  insights?: string;
}

interface DataStoryNavigationProps {
  steps: StoryStep[];
  currentStep: string;
  onStepChange: (stepId: string) => void;
}

export default function DataStoryNavigation({
  steps,
  currentStep,
  onStepChange,
}: DataStoryNavigationProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      {/* Story Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3>数据探索路径</h3>
          <span className="text-sm text-slate-400">
            {currentIndex + 1} / {steps.length}
          </span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Story Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = step.status === 'completed';
          const isLocked = step.status === 'locked';

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => !isLocked && onStepChange(step.id)}
                disabled={isLocked}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                    : isCompleted
                      ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      : 'bg-slate-800/30 border-slate-700/50 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step Icon */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                        : isCurrent
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                          : 'bg-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-slate-400" />
                    ) : (
                      <Circle
                        className={`w-5 h-5 ${isCurrent ? 'text-white' : 'text-slate-400'}`}
                      />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500">步骤 {index + 1}</span>
                      {isCurrent && (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded"
                        >
                          进行中
                        </motion.div>
                      )}
                    </div>
                    <h4 className={`mb-1 ${isCurrent ? 'text-cyan-400' : ''}`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400">{step.description}</p>
                    {step.insights && (isCompleted || isCurrent) && (
                      <div className="mt-2 p-2 bg-slate-700/50 rounded text-xs text-slate-300 border-l-2 border-yellow-500">
                        💡 {step.insights}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={currentIndex === 0}
          onClick={() => onStepChange(steps[currentIndex - 1]?.id)}
        >
          上一步
        </Button>
        <Button
          size="sm"
          disabled={currentIndex === steps.length - 1}
          onClick={() => onStepChange(steps[currentIndex + 1]?.id)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          下一步
        </Button>
      </div>
    </div>
  );
}
