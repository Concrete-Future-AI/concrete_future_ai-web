import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { CheckCircle, XCircle, Clock, User, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ApprovalDialogProps {
  request: any;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string, decision: 'approve' | 'reject', comment: string) => void;
}

export default function ApprovalDialog({ request, open, onClose, onApprove }: ApprovalDialogProps) {
  const [decision, setDecision] = useState<'approve' | 'reject'>('approve');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!request) return null;

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onApprove(request.id, decision, comment);
    
    toast.success(
      decision === 'approve' ? '申请已批准' : '申请已拒绝',
      {
        description: decision === 'approve' 
          ? '申请已流转至下一审批节点' 
          : '申请人将收到通知',
      }
    );
    
    setSubmitting(false);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>审批采购申请</DialogTitle>
          <DialogDescription>
            请仔细审核以下信息并做出决定
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Request Details */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">申请编号</p>
                <p className="flex items-center gap-2">
                  {request.id}
                  <Badge variant="outline">{request.category}</Badge>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">申请人</p>
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  {request.requester}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">申请物品</p>
                <p>{request.item}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">申请金额</p>
                <p className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  {request.amount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">提交日期</p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {request.submitDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">当前状态</p>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {request.approvalFlow[request.currentStep]}
                </Badge>
              </div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm mb-2">💡 AI智能建议</p>
            <p className="text-sm text-gray-700">
              根据历史采购数据，该物品价格合理，申请人历史采购记录良好。
              建议批准此申请。预计可在协议供应商处采购，3-5个工作日交付。
            </p>
          </div>

          {/* Decision */}
          <div>
            <Label className="mb-3 block">审批决定</Label>
            <RadioGroup value={decision} onValueChange={(v) => setDecision(v as any)}>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-green-50 cursor-pointer">
                <RadioGroupItem value="approve" id="approve" />
                <Label htmlFor="approve" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p>批准</p>
                    <p className="text-xs text-gray-500">同意此采购申请</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-red-50 cursor-pointer">
                <RadioGroupItem value="reject" id="reject" />
                <Label htmlFor="reject" className="flex items-center gap-2 cursor-pointer flex-1">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p>拒绝</p>
                    <p className="text-xs text-gray-500">不同意此采购申请</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Comment */}
          <div>
            <Label className="mb-2 block">审批意见 {decision === 'reject' && '(必填)'}</Label>
            <Textarea
              placeholder={decision === 'approve' ? '可选填写审批意见...' : '请说明拒绝原因...'}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            取消
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={submitting || (decision === 'reject' && !comment.trim())}
            className={decision === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            {submitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                处理中...
              </>
            ) : (
              <>
                {decision === 'approve' ? '批准申请' : '拒绝申请'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
