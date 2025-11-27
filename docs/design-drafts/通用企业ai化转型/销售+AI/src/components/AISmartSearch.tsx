import { useState, useEffect } from 'react';
import { Search, Sparkles, TrendingUp, User, Target, Clock, ArrowRight, X } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface SearchResult {
  id: string;
  type: 'customer' | 'opportunity' | 'insight' | 'recommendation';
  title: string;
  description: string;
  score: number;
  icon: any;
  metadata?: string;
  action?: () => void;
}

interface AISmartSearchProps {
  onResultClick?: (result: SearchResult) => void;
}

export function AISmartSearch({ onResultClick }: AISmartSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // AI智能建议
  const suggestions = [
    '本月即将到期的合同',
    '高潜力但未跟进的客户',
    '销售周期超过平均值的商机',
    '最近互动减少的重要客户'
  ];

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        performAISearch(query);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const performAISearch = (searchQuery: string) => {
    // 模拟AI智能搜索结果
    const mockResults: SearchResult[] = [
      {
        id: '1',
        type: 'insight',
        title: `AI发现：${searchQuery}相关的3个关键洞察`,
        description: '基于历史数据和当前趋势的智能分析',
        score: 95,
        icon: Sparkles,
        metadata: '2分钟前生成',
        action: () => toast.success('查看AI洞察详情')
      },
      {
        id: '2',
        type: 'customer',
        title: '智慧零售科技有限公司',
        description: `与"${searchQuery}"相关 · 健康度: 78分 · 下次跟进: 明天`,
        score: 88,
        icon: User,
        metadata: 'VIP客户',
        action: () => toast.success('打开客户详情')
      },
      {
        id: '3',
        type: 'opportunity',
        title: '企业级CRM系统升级项目',
        description: `匹配度: 92% · 预计价值: ¥45万 · 成交概率: 75%`,
        score: 92,
        icon: Target,
        metadata: '需求分析阶段',
        action: () => toast.success('打开商机详情')
      },
      {
        id: '4',
        type: 'recommendation',
        title: `AI建议：关于"${searchQuery}"的最佳行动`,
        description: '立即联系2个高意向客户，预计成功率提升40%',
        score: 85,
        icon: TrendingUp,
        metadata: '置信度: 85%',
        action: () => toast.success('执行AI建议')
      }
    ];

    setResults(mockResults);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    toast.info(`AI正在分析: ${suggestion}`, { icon: '🤖' });
  };

  const handleResultClick = (result: SearchResult) => {
    result.action?.();
    onResultClick?.(result);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer': return 'bg-primary/10 text-primary border-primary/20';
      case 'opportunity': return 'bg-accent/10 text-accent border-accent/20';
      case 'insight': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'recommendation': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-secondary';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'customer': return '客户';
      case 'opportunity': return '商机';
      case 'insight': return 'AI洞察';
      case 'recommendation': return 'AI建议';
      default: return '';
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <div className="h-4 w-px bg-border" />
          <Sparkles className="h-3 w-3 text-primary animate-pulse" />
        </div>
        <Input
          placeholder="AI智能搜索客户、商机或洞察..."
          className="pl-[88px] pr-12 h-12 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 bg-card"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showSuggestions && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full z-50"
          >
            <Card className="border-2 border-border rounded-xl shadow-2xl overflow-hidden bg-card">
              <div className="p-2 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
                <div className="flex items-center gap-2 px-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">
                    AI为您找到 {results.length} 个相关结果
                  </span>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {results.map((result, idx) => {
                  const Icon = result.icon;
                  return (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleResultClick(result)}
                      className="p-4 border-b border-border last:border-b-0 hover:bg-secondary/50 cursor-pointer group transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-lg ${getTypeColor(result.type)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {result.title}
                            </h4>
                            <Badge className={`${getTypeColor(result.type)} text-xs border`}>
                              {getTypeLabel(result.type)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                              <span className="text-xs text-muted-foreground">
                                匹配度: {result.score}%
                              </span>
                            </div>
                            {result.metadata && (
                              <>
                                <div className="h-3 w-px bg-border" />
                                <span className="text-xs text-muted-foreground">
                                  {result.metadata}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Suggestions */}
      {!query && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI推荐搜索:
          </span>
          {suggestions.map((suggestion, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 rounded-lg bg-secondary hover:bg-primary/10 border border-border hover:border-primary/50 text-xs transition-all hover-lift"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
