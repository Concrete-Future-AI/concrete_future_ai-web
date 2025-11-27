import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Brain,
  Sparkles,
  Zap,
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  X,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface AIFloatingButtonProps {
  onOpenChat: () => void;
  onOpenFeature?: (feature: string) => void;
}

export default function AIFloatingButton({ onOpenChat, onOpenFeature }: AIFloatingButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const quickActions = [
    {
      id: 'chat',
      label: 'AI对话',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      action: () => {
        onOpenChat();
        setIsExpanded(false);
      }
    },
    {
      id: 'analyze',
      label: '分析线索',
      icon: TrendingUp,
      color: 'from-teal-500 to-teal-600',
      action: () => {
        toast.success('正在分析今日重点线索...');
        setIsExpanded(false);
      }
    },
    {
      id: 'email',
      label: '写邮件',
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      action: () => {
        if (onOpenFeature) {
          onOpenFeature('email');
        }
        setIsExpanded(false);
      }
    },
    {
      id: 'meeting',
      label: '准备会议',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      action: () => {
        if (onOpenFeature) {
          onOpenFeature('meeting');
        }
        setIsExpanded(false);
      }
    },
    {
      id: 'playbook',
      label: '销售剧本',
      icon: FileText,
      color: 'from-pink-500 to-pink-600',
      action: () => {
        if (onOpenFeature) {
          onOpenFeature('playbook');
        }
        setIsExpanded(false);
      }
    },
    {
      id: 'data',
      label: '数据分析',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      action: () => {
        if (onOpenFeature) {
          onOpenFeature('analyzer');
        }
        setIsExpanded(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 space-y-2"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    onClick={action.action}
                    className={`bg-gradient-to-r ${action.color} hover:opacity-90 text-white rounded-xl shadow-lg w-full justify-start`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => {
            setIsExpanded(!isExpanded);
            setShowBadge(false);
          }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-2xl"
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <Brain className="w-6 h-6 text-white" />
              {showBadge && (
                <>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </span>
                </>
              )}
            </>
          )}
        </Button>
      </motion.div>

      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-12 left-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-xl shadow-lg whitespace-nowrap"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm">AI助手随时待命</span>
          </div>
          <div className="absolute -bottom-1 left-4 w-3 h-3 bg-purple-600 transform rotate-45" />
        </motion.div>
      )}
    </div>
  );
}