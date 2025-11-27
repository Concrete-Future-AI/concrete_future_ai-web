import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Cpu, HardDrive, Zap, Thermometer, Server } from 'lucide-react';

const gpuNodes = [
  { id: 'GPU-01', model: 'H100', usage: 92, temp: 76, power: 680, status: 'busy' },
  { id: 'GPU-02', model: 'H100', usage: 88, temp: 74, power: 650, status: 'busy' },
  { id: 'GPU-03', model: 'H100', usage: 45, temp: 62, power: 420, status: 'idle' },
  { id: 'GPU-04', model: 'A100', usage: 95, temp: 79, power: 380, status: 'busy' },
  { id: 'GPU-05', model: 'A100', usage: 76, temp: 71, power: 340, status: 'busy' },
  { id: 'GPU-06', model: 'A100', usage: 32, temp: 58, power: 220, status: 'idle' },
];

export function ResourceMonitor() {
  return (
    <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="mb-4">
        <div className="text-white">GPU集群实时监控</div>
        <div className="text-xs text-slate-400">各节点资源使用详情</div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gpuNodes.map((node) => (
          <div key={node.id} className="rounded-lg border border-slate-700 bg-slate-800/30 p-4 hover:bg-slate-800/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Server className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm text-white">{node.id}</div>
                  <div className="text-xs text-slate-500">{node.model}</div>
                </div>
              </div>
              <Badge variant="outline" className={`text-xs ${
                node.status === 'busy' 
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' 
                  : 'border-green-500/30 bg-green-500/10 text-green-400'
              }`}>
                {node.status === 'busy' ? '繁忙' : '空闲'}
              </Badge>
            </div>

            <div className="space-y-2">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Cpu className="h-3 w-3" /> 利用率
                  </span>
                  <span className="text-white">{node.usage}%</span>
                </div>
                <Progress value={node.usage} className="h-1.5 bg-slate-700" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs">
                  <Thermometer className="h-3 w-3 text-orange-400" />
                  <span className="text-slate-400">温度:</span>
                  <span className="text-white">{node.temp}°C</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Zap className="h-3 w-3 text-yellow-400" />
                  <span className="text-slate-400">功耗:</span>
                  <span className="text-white">{node.power}W</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
