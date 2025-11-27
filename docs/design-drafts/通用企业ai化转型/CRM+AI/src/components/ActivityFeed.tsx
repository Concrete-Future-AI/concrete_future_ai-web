import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  FileText,
  TrendingUp,
  User,
  Send,
  Paperclip,
  Smile,
  AtSign,
  MoreHorizontal,
  ThumbsUp,
  Reply
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    color: string;
  };
  type: 'comment' | 'call' | 'email' | 'meeting' | 'status' | 'note';
  content: string;
  timestamp: string;
  likes?: number;
  replies?: Activity[];
}

interface ActivityFeedProps {
  entityId: string;
  entityType: 'lead' | 'deal' | 'contact';
}

export default function ActivityFeed({ entityId, entityType }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      user: { name: '张小明', color: 'from-blue-500 to-cyan-500' },
      type: 'comment',
      content: '@李华 这个客户看起来很有意向，建议尽快安排演示会议',
      timestamp: '2小时前',
      likes: 3
    },
    {
      id: '2',
      user: { name: '李华', color: 'from-purple-500 to-pink-500' },
      type: 'call',
      content: '完成了25分钟电话沟通，客户对产品功能很感兴趣，重点关注了数据分析模块',
      timestamp: '5小时前',
      likes: 5
    },
    {
      id: '3',
      user: { name: '王经理', color: 'from-green-500 to-teal-500' },
      type: 'status',
      content: '将阶段从"需求确认"更新为"方案演示"',
      timestamp: '1天前'
    },
    {
      id: '4',
      user: { name: '张小明', color: 'from-blue-500 to-cyan-500' },
      type: 'email',
      content: '发送了定制方案邮件，包含3个案例研究和ROI分析',
      timestamp: '2天前',
      likes: 2
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const getActivityIcon = (type: Activity['type']) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'comment': return <MessageSquare className={iconClass} />;
      case 'call': return <Phone className={iconClass} />;
      case 'email': return <Mail className={iconClass} />;
      case 'meeting': return <Calendar className={iconClass} />;
      case 'status': return <TrendingUp className={iconClass} />;
      case 'note': return <FileText className={iconClass} />;
      default: return <User className={iconClass} />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'comment': return 'bg-blue-100 text-blue-600';
      case 'call': return 'bg-green-100 text-green-600';
      case 'email': return 'bg-purple-100 text-purple-600';
      case 'meeting': return 'bg-orange-100 text-orange-600';
      case 'status': return 'bg-gray-100 text-gray-600';
      case 'note': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      user: { name: '我', color: 'from-blue-500 to-purple-500' },
      type: 'comment',
      content: newComment,
      timestamp: '刚刚',
      likes: 0
    };

    setActivities([newActivity, ...activities]);
    setNewComment('');
    toast.success('评论已发布');
  };

  const handleLike = (activityId: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, likes: (activity.likes || 0) + 1 }
        : activity
    ));
  };

  return (
    <Card className="border border-gray-100 shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            活动与讨论
          </h3>
          <Badge variant="outline" className="text-xs">
            {activities.length} 条动态
          </Badge>
        </div>

        {/* New Comment Input */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">我</span>
          </div>
          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="添加评论或@提及团队成员..."
              className="min-h-[80px] resize-none border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-xl"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  <AtSign className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
                size="sm"
              >
                <Send className="w-4 h-4 mr-1" />
                发布
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        <AnimatePresence>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3 group"
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activity.user.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                {activity.user.avatar ? (
                  <img src={activity.user.avatar} alt={activity.user.name} className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-white text-sm">
                    {activity.user.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-900">{activity.user.name}</span>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                      <span className="capitalize">{activity.type === 'comment' ? '评论' : activity.type === 'call' ? '电话' : activity.type === 'email' ? '邮件' : activity.type === 'meeting' ? '会议' : activity.type === 'status' ? '状态' : '笔记'}</span>
                    </div>
                    <span className="text-xs text-gray-400">{activity.timestamp}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-2 text-sm text-gray-700 bg-gray-50 rounded-xl p-3">
                  {activity.content}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(activity.id)}
                    className="text-gray-500 hover:text-purple-600 text-xs rounded-lg h-7"
                  >
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {activity.likes ? `${activity.likes}` : '点赞'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyTo(activity.id)}
                    className="text-gray-500 hover:text-purple-600 text-xs rounded-lg h-7"
                  >
                    <Reply className="w-3 h-3 mr-1" />
                    回复
                  </Button>
                </div>

                {/* Replies */}
                {activity.replies && activity.replies.length > 0 && (
                  <div className="mt-3 ml-4 pl-4 border-l-2 border-gray-100 space-y-3">
                    {activity.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${reply.user.color} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white text-xs">
                            {reply.user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900">{reply.user.name}</span>
                            <span className="text-xs text-gray-400">{reply.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
