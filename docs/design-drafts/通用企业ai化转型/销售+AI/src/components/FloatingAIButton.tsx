import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { AIAssistant } from './AIAssistant';

export function FloatingAIButton({ context }: { context?: 'dashboard' | 'forecast' | 'opportunities' | 'churn' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Button
            size="lg"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsPulsing(false);
            }}
            className={`h-16 w-16 rounded-full gradient-primary shadow-2xl hover:shadow-xl transition-all hover:scale-110 ${
              isPulsing ? 'pulse-glow' : ''
            }`}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Sparkles className="h-6 w-6 text-white" />
            )}
          </Button>
          {!isOpen && isPulsing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-2 h-7 w-7 rounded-full gradient-success flex items-center justify-center text-white text-xs font-bold shadow-lg"
            >
              3
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <AIAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} context={context} />
    </>
  );
}