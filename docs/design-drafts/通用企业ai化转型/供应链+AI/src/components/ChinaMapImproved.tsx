import { useState } from 'react';
import { MapPin, Warehouse, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface Location {
  id: string;
  name: string;
  type: 'warehouse' | 'store' | 'distribution';
  region: string;
  x: number; // percentage
  y: number; // percentage
  status: 'healthy' | 'warning' | 'critical';
  inventory?: number;
  capacity?: number;
  demand?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface ChinaMapImprovedProps {
  locations: Location[];
  selectedLayer?: 'demand' | 'inventory' | 'logistics';
  onLocationClick?: (location: Location) => void;
  showHeatmap?: boolean;
  className?: string;
}

export default function ChinaMapImproved({
  locations = [],
  selectedLayer = 'demand',
  onLocationClick,
  showHeatmap = true,
  className = ''
}: ChinaMapImprovedProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // 真实的中国省份SVG路径 (简化版)
  const provinces = [
    {
      name: '新疆',
      path: 'M 100,200 L 100,150 L 150,120 L 200,110 L 250,120 L 280,150 L 280,200 L 250,240 L 200,250 L 150,240 Z',
      color: '#1e293b'
    },
    {
      name: '西藏',
      path: 'M 150,260 L 200,270 L 250,260 L 280,240 L 270,300 L 220,320 L 170,310 Z',
      color: '#1e293b'
    },
    {
      name: '内蒙古',
      path: 'M 300,120 L 480,110 L 500,130 L 480,160 L 400,170 L 320,160 Z',
      color: '#1e293b'
    },
    {
      name: '青海',
      path: 'M 220,190 L 280,180 L 300,210 L 280,240 L 230,250 Z',
      color: '#1e293b'
    },
    {
      name: '甘肃',
      path: 'M 280,180 L 350,170 L 370,190 L 350,220 L 300,230 Z',
      color: '#1e293b'
    },
    {
      name: '四川',
      path: 'M 320,240 L 380,230 L 400,260 L 380,290 L 340,300 Z',
      color: '#1e293b'
    },
    {
      name: '云南',
      path: 'M 320,310 L 360,300 L 380,330 L 360,360 L 320,350 Z',
      color: '#1e293b'
    },
    {
      name: '贵州',
      path: 'M 380,300 L 420,290 L 440,310 L 420,340 L 390,340 Z',
      color: '#1e293b'
    },
    {
      name: '广西',
      path: 'M 420,340 L 460,330 L 480,350 L 460,380 L 430,380 Z',
      color: '#1e293b'
    },
    {
      name: '广东',
      path: 'M 480,340 L 540,330 L 560,350 L 540,380 L 490,380 Z',
      color: '#1e293b'
    },
    {
      name: '福建',
      path: 'M 550,290 L 580,280 L 590,310 L 570,340 L 540,330 Z',
      color: '#1e293b'
    },
    {
      name: '浙江',
      path: 'M 540,260 L 570,250 L 580,280 L 560,300 L 530,290 Z',
      color: '#1e293b'
    },
    {
      name: '江苏',
      path: 'M 520,230 L 560,220 L 570,250 L 540,260 Z',
      color: '#1e293b'
    },
    {
      name: '上海',
      path: 'M 565,240 L 575,235 L 580,245 L 570,250 Z',
      color: '#1e293b'
    },
    {
      name: '安徽',
      path: 'M 500,250 L 530,240 L 540,270 L 510,280 Z',
      color: '#1e293b'
    },
    {
      name: '江西',
      path: 'M 510,280 L 540,270 L 550,310 L 520,320 Z',
      color: '#1e293b'
    },
    {
      name: '湖南',
      path: 'M 460,280 L 500,270 L 510,310 L 470,320 Z',
      color: '#1e293b'
    },
    {
      name: '湖北',
      path: 'M 460,240 L 500,230 L 510,270 L 470,280 Z',
      color: '#1e293b'
    },
    {
      name: '重庆',
      path: 'M 420,270 L 450,260 L 460,280 L 440,290 Z',
      color: '#1e293b'
    },
    {
      name: '陕西',
      path: 'M 400,200 L 440,190 L 460,230 L 420,240 Z',
      color: '#1e293b'
    },
    {
      name: '河南',
      path: 'M 460,210 L 510,200 L 520,240 L 470,250 Z',
      color: '#1e293b'
    },
    {
      name: '山东',
      path: 'M 510,180 L 560,170 L 570,210 L 520,220 Z',
      color: '#1e293b'
    },
    {
      name: '山西',
      path: 'M 440,170 L 480,160 L 490,200 L 450,210 Z',
      color: '#1e293b'
    },
    {
      name: '河北',
      path: 'M 480,140 L 530,130 L 540,170 L 490,180 Z',
      color: '#1e293b'
    },
    {
      name: '北京',
      path: 'M 500,148 L 510,143 L 515,153 L 505,158 Z',
      color: '#1e293b'
    },
    {
      name: '天津',
      path: 'M 518,160 L 528,155 L 533,165 L 523,170 Z',
      color: '#1e293b'
    },
    {
      name: '辽宁',
      path: 'M 540,120 L 570,110 L 580,140 L 550,150 Z',
      color: '#1e293b'
    },
    {
      name: '吉林',
      path: 'M 570,100 L 600,90 L 610,120 L 580,130 Z',
      color: '#1e293b'
    },
    {
      name: '黑龙江',
      path: 'M 600,70 L 650,60 L 660,100 L 620,110 Z',
      color: '#1e293b'
    },
    {
      name: '海南',
      path: 'M 480,410 L 510,405 L 520,425 L 490,430 Z',
      color: '#1e293b'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return '#22c55e';
      case 'warning':
        return '#eab308';
      case 'critical':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'warehouse':
        return Warehouse;
      case 'distribution':
        return MapPin;
      default:
        return MapPin;
    }
  };

  // 需求热力图数据
  const heatmapData = [
    { region: '华东', x: 56, y: 48, intensity: 0.9 },
    { region: '华南', x: 52, y: 72, intensity: 0.8 },
    { region: '华北', x: 50, y: 30, intensity: 0.7 },
    { region: '西南', x: 35, y: 58, intensity: 0.6 },
    { region: '华中', x: 48, y: 52, intensity: 0.75 }
  ];

  return (
    <div className={`relative w-full h-full bg-slate-950 rounded-lg overflow-hidden border border-slate-800 ${className}`}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-improved" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-600"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-improved)" />
        </svg>
      </div>

      {/* Main SVG Map */}
      <svg viewBox="0 0 700 500" className="w-full h-full relative z-10">
        <defs>
          {/* 热力图渐变 */}
          <radialGradient id="demandHeat">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>

          {/* 发光效果 */}
          <filter id="glow-improved">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 脉冲动画 */}
          <filter id="pulse">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* 省份轮廓 */}
        <g className="provinces">
          {provinces.map((province) => (
            <motion.path
              key={province.name}
              d={province.path}
              fill={province.color}
              stroke="#334155"
              strokeWidth="1.5"
              className="transition-all cursor-pointer"
              whileHover={{
                fill: '#1e40af20',
                stroke: '#60a5fa'
              }}
              onClick={() =>
                toast.info(province.name, {
                  description: '查看省份详细数据'
                })
              }
            />
          ))}</g>

        {/* 需求热力图 */}
        {showHeatmap && selectedLayer === 'demand' && (
          <g className="heatmap" opacity="0.7">
            {heatmapData.map((heat, index) => (
              <motion.circle
                key={index}
                cx={`${heat.x}%`}
                cy={`${heat.y}%`}
                r="80"
                fill="url(#demandHeat)"
                className="pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: heat.intensity, scale: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            ))}
          </g>
        )}

        {/* 地点标记 */}
        <g className="locations">
          {locations.map((location, index) => {
            const Icon = getLocationIcon(location.type);
            const isHovered = hoveredLocation === location.id;

            return (
              <g
                key={location.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => {
                  onLocationClick?.(location);
                  toast.info(location.name, {
                    description: `需求预测: ${location.demand || 'N/A'} | 库存: ${location.inventory}/${location.capacity}`
                  });
                }}
              >
                {/* 预警脉冲动画 */}
                {location.status === 'critical' && (
                  <motion.circle
                    cx={`${location.x}%`}
                    cy={`${location.y}%`}
                    r="20"
                    fill={getStatusColor(location.status)}
                    opacity="0.2"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                )}

                {/* 主标记 */}
                <motion.circle
                  cx={`${location.x}%`}
                  cy={`${location.y}%`}
                  r={isHovered ? '14' : '11'}
                  fill={getStatusColor(location.status)}
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  filter="url(#glow-improved)"
                  animate={
                    location.status === 'critical'
                      ? {
                          scale: [1, 1.1, 1],
                          filter: [
                            'url(#glow-improved)',
                            'brightness(1.2)',
                            'url(#glow-improved)'
                          ]
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: location.status === 'critical' ? Infinity : 0
                  }}
                  whileHover={{ scale: 1.3 }}
                />

                {/* 图标 */}
                <foreignObject
                  x={`${location.x - 1.2}%`}
                  y={`${location.y - 1.2}%`}
                  width="2.4%"
                  height="2.4%"
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="w-full h-full text-slate-950" />
                  </div>
                </foreignObject>

                {/* 地名标签 */}
                <text
                  x={`${location.x}%`}
                  y={`${location.y + 3.5}%`}
                  textAnchor="middle"
                  className="fill-slate-200 pointer-events-none"
                  style={{ fontSize: '11px', fontWeight: 500 }}
                >
                  {location.name}
                </text>

                {/* 趋势指示器 */}
                {location.trend && (
                  <foreignObject
                    x={`${location.x + 1.5}%`}
                    y={`${location.y - 1.8}%`}
                    width="1.5%"
                    height="1.5%"
                    className="pointer-events-none"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {location.trend === 'up' ? (
                        <TrendingUp className="w-full h-full text-green-400" />
                      ) : location.trend === 'down' ? (
                        <TrendingDown className="w-full h-full text-red-400" />
                      ) : null}
                    </div>
                  </foreignObject>
                )}

                {/* 预警图标 */}
                {location.status === 'critical' && (
                  <g>
                    <circle
                      cx={`${location.x - 1.5}%`}
                      cy={`${location.y - 1.5}%`}
                      r="5"
                      fill="#ef4444"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                    <foreignObject
                      x={`${location.x - 2}%`}
                      y={`${location.y - 2}%`}
                      width="1%"
                      height="1%"
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <AlertTriangle className="w-full h-full text-white" />
                      </div>
                    </foreignObject>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* 中国边界 */}
        <path
          d="M 100,150 L 200,110 L 280,120 L 350,170 L 480,110 L 540,120 L 570,110 L 600,90 L 650,60 L 660,100 L 620,110 L 580,140 L 570,210 L 590,310 L 560,350 L 540,380 L 490,380 L 460,380 L 430,380 L 390,340 L 360,360 L 320,350 L 320,310 L 340,300 L 320,240 L 280,240 L 250,260 L 200,270 L 170,310 L 150,260 L 150,240 L 150,200 Z"
          fill="none"
          stroke="#475569"
          strokeWidth="3"
          strokeDasharray="8,4"
          opacity="0.4"
        />
      </svg>

      {/* 悬停详情卡片 */}
      {hoveredLocation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-slate-900/98 backdrop-blur-sm border border-slate-700 rounded-lg p-4 min-w-[240px] shadow-xl"
        >
          {locations
            .filter((loc) => loc.id === hoveredLocation)
            .map((location) => (
              <div key={location.id} className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h4 className="text-cyan-400">{location.name}</h4>
                    <p className="text-xs text-slate-500">{location.region}</p>
                  </div>
                  <Badge
                    variant={
                      location.status === 'healthy'
                        ? 'default'
                        : location.status === 'warning'
                          ? 'secondary'
                          : 'destructive'
                    }
                    className="text-xs"
                  >
                    {location.status === 'healthy'
                      ? '正常'
                      : location.status === 'warning'
                        ? '预警'
                        : '异常'}
                  </Badge>
                </div>

                {location.demand !== undefined && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">预测需求</span>
                    <div className="flex items-center gap-1">
                      <span className="text-purple-400">{location.demand}件</span>
                      {location.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : location.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      ) : null}
                    </div>
                  </div>
                )}

                {location.inventory !== undefined &&
                  location.capacity !== undefined && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">当前库存</span>
                        <span className="text-cyan-400">
                          {location.inventory}/{location.capacity}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${
                              location.inventory / location.capacity > 0.7
                                ? 'bg-green-500'
                                : location.inventory / location.capacity > 0.3
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(location.inventory / location.capacity) * 100}%`
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <p className="text-xs text-slate-500">
                          库存水位{' '}
                          {Math.round((location.inventory / location.capacity) * 100)}%
                        </p>
                      </div>
                    </>
                  )}
              </div>
            ))}
        </motion.div>
      )}

      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-lg p-4 text-xs space-y-2.5">
        <div className="mb-2 pb-2 border-b border-slate-800">
          <p className="text-slate-300">地图图例</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-400">状态正常</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-slate-400">需要关注</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-slate-400">异常警报</span>
        </div>
        <div className="pt-2 border-t border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2">
            <Warehouse className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-400">仓库</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-blue-400" />
            <span className="text-slate-400">配送中心</span>
          </div>
        </div>
      </div>

      {/* 图层指示器 */}
      <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2">
        <p className="text-xs text-slate-400 mb-1">当前图层</p>
        <p className="text-sm text-cyan-400">
          {selectedLayer === 'demand'
            ? '需求热力'
            : selectedLayer === 'inventory'
              ? '库存分布'
              : '物流网络'}
        </p>
      </div>

      {/* 比例尺 */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <div className="w-20 h-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
          <span>500km</span>
        </div>
      </div>
    </div>
  );
}