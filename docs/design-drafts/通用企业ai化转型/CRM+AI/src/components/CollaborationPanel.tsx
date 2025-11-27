import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  MessageSquare, 
  Send, 
  AtSign, 
  Smile,
  Paperclip,
  MoreHorizontal,
  Heart,
  Reply,
  Edit2,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: Date;
  mentions: string[];
  reactions: { emoji: string; count: number; users: string[] }[];
  replies?: Comment[];
}

interface CollaborationPanelProps {
  entityType: 'lead' | 'deal' | 'contact';
  entityId: string;
  entityName: string;
}

export default function CollaborationPanel({ 
  entityType, 
  entityId, 
  entityName 
}: CollaborationPanelProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: '李经理',
        avatar: 'LJ',
        role: '销售经理'
      },
      content: '@小王 这个客户的Velocity Score很高，建议尽快跟进。我看到他们最近访问了定价页面三次。',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      mentions: ['小王'],
      reactions: [
        { emoji: '👍', count: 2, users: ['小王', '张副总'] }
      ]
    },
    {
      id: '2',
      author: {
        name: '小王',
        avatar: 'XW',
        role: '客户经理'
      },
      content: '收到！我已经准备好方案PPT，计划今天下午给客户发送。',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      mentions: [],
      reactions: []
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const teamMembers = [
    { name: '小王', role: '客户经理' },
    { name: '李经理', role: '销售经理' },
    { name: '张副总', role: 'VP' },
  ];

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const mentions = newComment.match(/@(\S+)/g)?.map(m => m.slice(1)) || [];
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: '小王',
        avatar: 'XW',
        role: '客户经理'
      },
      content: newComment,
      timestamp: new Date(),
      mentions,
      reactions: []
    };

    setComments([...comments, comment]);
    setNewComment('');
    
    if (mentions.length > 0) {
      toast.success(`已提及 ${mentions.join(', ')}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const addReaction = (commentId: string, emoji: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const existingReaction = comment.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          if (existingReaction.users.includes('小王')) {
            return {
              ...comment,
              reactions: comment.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== '小王') }
                  : r
              ).filter(r => r.count > 0)
            };
          } else {
            return {
              ...comment,
              reactions: comment.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count + 1, users: [...r.users, '小王'] }
                  : r
              )
            };
          }
        } else {
          return {
            ...comment,
            reactions: [...comment.reactions, { emoji, count: 1, users: ['小王'] }]
          };
        }
      }
      return comment;
    }));
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-500',
      'bg-teal-500', 
      'bg-blue-500',
      'bg-orange-500',
      'bg-pink-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-teal-50">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <h3 className="text-neutral-900">协作与讨论</h3>
          <Badge variant="outline" className="ml-auto bg-white border-purple-200 text-purple-700">
            {comments.length} 条评论
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group"
            >
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full ${getAvatarColor(comment.author.name)} flex items-center justify-center text-white text-sm flex-shrink-0`}>
                  {comment.author.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-neutral-900">{comment.author.name}</span>
                    <span className="text-xs text-neutral-500">{comment.author.role}</span>
                    <span className="text-xs text-neutral-400">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-neutral-700 break-words">
                    {renderContent(comment.content)}
                  </div>
                  
                  {comment.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {comment.reactions.map((reaction, idx) => (
                        <button
                          key={idx}
                          onClick={() => addReaction(comment.id, reaction.emoji)}
                          className={`
                            inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                            transition-all hover:scale-110
                            ${reaction.users.includes('小王')
                              ? 'bg-purple-100 border border-purple-300'
                              : 'bg-neutral-100 border border-neutral-200 hover:border-purple-300'
                            }
                          `}
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-neutral-600">{reaction.count}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => addReaction(comment.id, '👍')}
                      className="text-xs text-neutral-500 hover:text-purple-600 transition-colors"
                    >
                      👍 点赞
                    </button>
                    <button className="text-xs text-neutral-500 hover:text-purple-600 transition-colors">
                      <Reply className="w-3 h-3 inline mr-1" />
                      回复
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t bg-neutral-50">
        <div className="flex gap-2">
          <div className={`w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm flex-shrink-0`}>
            XW
          </div>
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="添加评论... (使用 @ 提及团队成员)"
              className="min-h-[60px] resize-none border-neutral-200 focus:border-purple-300 rounded-xl"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-neutral-500 hover:text-purple-600"
                  onClick={() => setShowMentions(!showMentions)}
                >
                  <AtSign className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-purple-600">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-purple-600">
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg"
              >
                <Send className="w-4 h-4 mr-2" />
                发送
              </Button>
            </div>
          </div>
        </div>

        {showMentions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-2 bg-white rounded-xl border shadow-lg"
          >
            <div className="text-xs text-neutral-500 mb-2">提及团队成员</div>
            {teamMembers.map((member) => (
              <button
                key={member.name}
                onClick={() => {
                  setNewComment(newComment + `@${member.name} `);
                  setShowMentions(false);
                  textareaRef.current?.focus();
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <div className={`w-6 h-6 rounded-full ${getAvatarColor(member.name)} flex items-center justify-center text-white text-xs`}>
                  {member.name.slice(0, 2)}
                </div>
                <div className="text-left">
                  <div className="text-sm text-neutral-900">{member.name}</div>
                  <div className="text-xs text-neutral-500">{member.role}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </Card>
  );
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  return date.toLocaleDateString('zh-CN');
}

function renderContent(content: string) {
  const parts = content.split(/(@\S+)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('@')) {
      return (
        <span 
          key={idx} 
          className="inline-flex items-center px-1.5 py-0.5 rounded bg-purple-100 text-purple-700"
        >
          {part}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}
