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
  orders?: number;
  metrics?: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
  }[];
}

interface ChinaMapProps {
  locations: Location[];
  selectedLayer?: 'inventory' | 'logistics' | 'risk' | 'service';
  onLocationClick?: (location: Location) => void;
  showRoutes?: boolean;
}

export default function ChinaMap({ locations, selectedLayer = 'inventory', onLocationClick, showRoutes = false }: ChinaMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

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

  // Simplified China map paths (provinces outline)
  const chinaProvinces = [
    // Northeast
    { name: '黑龙江', path: 'M 420,80 L 460,70 L 480,90 L 470,110 L 440,100 Z', color: '#1e293b' },
    { name: '吉林', path: 'M 440,100 L 470,110 L 460,130 L 430,125 Z', color: '#1e293b' },
    { name: '辽宁', path: 'M 430,125 L 460,130 L 450,150 L 420,145 Z', color: '#1e293b' },
    
    // North
    { name: '北京', path: 'M 380,130 L 390,125 L 395,135 L 385,140 Z', color: '#1e293b' },
    { name: '河北', path: 'M 360,120 L 400,115 L 410,145 L 370,150 Z', color: '#1e293b' },
    { name: '山西', path: 'M 330,130 L 360,125 L 365,155 L 335,160 Z', color: '#1e293b' },
    { name: '内蒙古', path: 'M 280,60 L 420,70 L 400,110 L 350,105 L 320,95 L 290,85 Z', color: '#1e293b' },
    
    // East
    { name: '山东', path: 'M 390,150 L 420,148 L 425,170 L 395,172 Z', color: '#1e293b' },
    { name: '江苏', path: 'M 400,180 L 430,178 L 435,195 L 405,197 Z', color: '#1e293b' },
    { name: '上海', path: 'M 430,190 L 438,188 L 440,195 L 432,197 Z', color: '#1e293b' },
    { name: '浙江', path: 'M 405,200 L 435,198 L 430,220 L 400,222 Z', color: '#1e293b' },
    { name: '安徽', path: 'M 380,180 L 405,178 L 410,205 L 385,207 Z', color: '#1e293b' },
    
    // Central
    { name: '河南', path: 'M 350,160 L 385,158 L 390,185 L 355,187 Z', color: '#1e293b' },
    { name: '湖北', path: 'M 340,190 L 380,188 L 385,215 L 345,217 Z', color: '#1e293b' },
    { name: '湖南', path: 'M 335,220 L 375,218 L 380,245 L 340,247 Z', color: '#1e293b' },
    { name: '江西', path: 'M 385,210 L 415,208 L 410,240 L 380,242 Z', color: '#1e293b' },
    
    // South
    { name: '广东', path: 'M 340,260 L 390,258 L 395,285 L 345,287 Z', color: '#1e293b' },
    { name: '广西', path: 'M 300,260 L 340,258 L 345,285 L 305,287 Z', color: '#1e293b' },
    { name: '福建', path: 'M 400,245 L 430,243 L 425,270 L 395,272 Z', color: '#1e293b' },
    { name: '海南', path: 'M 320,310 L 340,308 L 345,320 L 325,322 Z', color: '#1e293b' },
    
    // Southwest
    { name: '四川', path: 'M 260,200 L 310,198 L 315,235 L 265,237 Z', color: '#1e293b' },
    { name: '重庆', path: 'M 310,210 L 330,208 L 335,225 L 315,227 Z', color: '#1e293b' },
    { name: '贵州', path: 'M 280,240 L 320,238 L 325,265 L 285,267 Z', color: '#1e293b' },
    { name: '云南', path: 'M 230,250 L 280,248 L 285,290 L 235,292 Z', color: '#1e293b' },
    
    // Northwest
    { name: '陕西', path: 'M 310,160 L 345,158 L 350,190 L 315,192 Z', color: '#1e293b' },
    { name: '甘肃', path: 'M 220,130 L 310,125 L 315,165 L 225,170 Z', color: '#1e293b' },
    { name: '青海', path: 'M 180,150 L 240,145 L 245,180 L 185,185 Z', color: '#1e293b' },
    { name: '宁夏', path: 'M 290,130 L 310,128 L 315,145 L 295,147 Z', color: '#1e293b' },
    { name: '新疆', path: 'M 80,80 L 220,75 L 230,140 L 190,150 L 85,155 Z', color: '#1e293b' },
    { name: '西藏', path: 'M 100,180 L 230,175 L 240,240 L 110,245 Z', color: '#1e293b' },
  ];

  // Routes between major cities
  const routes = [
    { from: { x: 38, y: 26 }, to: { x: 43, y: 38 }, active: true, label: '北京-上海' },
    { from: { x: 43, y: 38 }, to: { x: 39, y: 56 }, active: true, label: '上海-深圳' },
    { from: { x: 38, y: 26 }, to: { x: 31, y: 40 }, active: true, label: '北京-成都' },
    { from: { x: 31, y: 40 }, to: { x: 39, y: 56 }, active: false, label: '成都-深圳' },
  ];

  return (
    <div className="relative w-full h-full bg-slate-950 rounded-lg overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* China Map SVG */}
      <svg viewBox="0 0 600 400" className="w-full h-full relative z-10">
        <defs>
          {/* Gradient for heat map */}
          <radialGradient id="heatGradient">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>

          {/* Glow effect for active routes */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Arrow marker for routes */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
          </marker>
        </defs>

        {/* Province outlines */}
        <g className="provinces">
          {chinaProvinces.map((province) => (
            <motion.path
              key={province.name}
              d={province.path}
              fill={province.color}
              stroke="#334155"
              strokeWidth="1"
              className="transition-colors cursor-pointer"
              whileHover={{ fill: '#1e40af15' }}
              onClick={() => toast.info(province.name, { description: '省份数据加载中...' })}
            />
          ))}
        </g>

        {/* Heat map overlay based on selected layer */}
        {selectedLayer === 'inventory' && (
          <g className="heatmap" opacity="0.6">
            {locations.filter(loc => loc.type === 'warehouse').map((loc) => (
              <circle
                key={`heat-${loc.id}`}
                cx={`${loc.x}%`}
                cy={`${loc.y}%`}
                r="60"
                fill="url(#heatGradient)"
                className="pointer-events-none"
              />
            ))}
          </g>
        )}

        {/* Logistics routes */}
        {showRoutes && (
          <g className="routes">
            {routes.map((route, index) => (
              <g key={index}>
                <motion.path
                  d={`M ${route.from.x}% ${route.from.y}% Q ${(route.from.x + route.to.x) / 2}% ${Math.min(route.from.y, route.to.y) - 5}% ${route.to.x}% ${route.to.y}%`}
                  fill="none"
                  stroke={route.active ? '#06b6d4' : '#475569'}
                  strokeWidth="2"
                  strokeDasharray={route.active ? '0' : '5,5'}
                  markerEnd={route.active ? 'url(#arrowhead)' : ''}
                  filter={route.active ? 'url(#glow)' : ''}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: index * 0.3 }}
                />
                {route.active && (
                  <motion.circle
                    r="3"
                    fill="#06b6d4"
                    initial={{ offsetDistance: '0%' }}
                    animate={{ offsetDistance: '100%' }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      path={`M ${route.from.x * 6},${route.from.y * 4} Q ${((route.from.x + route.to.x) / 2) * 6},${(Math.min(route.from.y, route.to.y) - 5) * 4} ${route.to.x * 6},${route.to.y * 4}`}
                    />
                  </motion.circle>
                )}
              </g>
            ))}
          </g>
        )}

        {/* Location markers */}
        <g className="locations">
          {locations.map((location) => {
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
                    description: `${location.type === 'warehouse' ? '仓库' : '配送中心'} | 状态: ${location.status === 'healthy' ? '正常' : location.status === 'warning' ? '预警' : '异常'}`
                  });
                }}
              >
                {/* Pulse animation for critical locations */}
                {location.status === 'critical' && (
                  <motion.circle
                    cx={`${location.x}%`}
                    cy={`${location.y}%`}
                    r="15"
                    fill={getStatusColor(location.status)}
                    opacity="0.3"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Main marker circle */}
                <motion.circle
                  cx={`${location.x}%`}
                  cy={`${location.y}%`}
                  r={isHovered ? "12" : "10"}
                  fill={getStatusColor(location.status)}
                  stroke="#0f172a"
                  strokeWidth="2"
                  filter="url(#glow)"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Icon */}
                <foreignObject
                  x={`${location.x - 1.5}%`}
                  y={`${location.y - 1.5}%`}
                  width="3%"
                  height="3%"
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="w-full h-full text-slate-900" />
                  </div>
                </foreignObject>

                {/* Label */}
                <text
                  x={`${location.x}%`}
                  y={`${location.y + 4}%`}
                  textAnchor="middle"
                  className="text-xs fill-slate-300 pointer-events-none"
                  style={{ fontSize: '10px' }}
                >
                  {location.name}
                </text>

                {/* Warning indicator */}
                {location.status !== 'healthy' && (
                  <g>
                    <circle
                      cx={`${location.x + 1.5}%`}
                      cy={`${location.y - 1.5}%`}
                      r="4"
                      fill="#ef4444"
                      stroke="#0f172a"
                      strokeWidth="1"
                    />
                    <foreignObject
                      x={`${location.x + 0.5}%`}
                      y={`${location.y - 2.5}%`}
                      width="2%"
                      height="2%"
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

        {/* Border outline of China */}
        <path
          d="M 80,80 L 220,75 L 280,60 L 420,70 L 460,70 L 480,90 L 470,110 L 460,130 L 450,150 L 425,170 L 438,188 L 440,195 L 430,220 L 425,270 L 395,285 L 345,287 L 345,320 L 320,310 L 300,287 L 235,292 L 185,290 L 110,245 L 100,180 L 85,155 L 80,80 Z"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.3"
        />
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur border border-slate-800 rounded-lg p-4 text-xs space-y-2">
        <div className="mb-2 pb-2 border-b border-slate-800">
          <p className="text-slate-300">图例</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-400">状态正常</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-slate-400">预警</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-slate-400">异常</span>
        </div>
        <div className="flex items-center gap-2">
          <Warehouse className="w-3 h-3 text-cyan-400" />
          <span className="text-slate-400">仓库</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 text-blue-400" />
          <span className="text-slate-400">配送中心</span>
        </div>
      </div>

      {/* Hovered location details */}
      {hoveredLocation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg p-4 min-w-[200px]"
        >
          {locations.filter(loc => loc.id === hoveredLocation).map(location => (
            <div key={location.id} className="space-y-2">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <h4 className="text-cyan-400">{location.name}</h4>
                <Badge variant={location.status === 'healthy' ? 'default' : 'destructive'} className="text-xs">
                  {location.status === 'healthy' ? '正常' : location.status === 'warning' ? '预警' : '异常'}
                </Badge>
              </div>
              
              {location.metrics?.map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{metric.label}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-200">{metric.value}</span>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-green-400" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    ) : null}
                  </div>
                </div>
              ))}
              
              {location.inventory !== undefined && location.capacity !== undefined && (
                <div className="mt-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400">库存水位</span>
                    <span className="text-slate-200">
                      {location.inventory}/{location.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        (location.inventory / location.capacity) > 0.8
                          ? 'bg-green-500'
                          : (location.inventory / location.capacity) > 0.3
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${(location.inventory / location.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Scale indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <div className="w-16 h-0.5 bg-slate-600"></div>
          <span>500km</span>
        </div>
      </div>
    </div>
  );
}
