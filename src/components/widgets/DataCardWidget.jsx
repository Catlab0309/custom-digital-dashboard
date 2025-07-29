import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { DSP_COLORS, getTrendColor } from '../../lib/colors';

const DataCardWidget = ({ widget }) => {

  // 默认配置
  const defaultConfig = {
    value: '1,234',
    label: '总销售额',
    unit: '元',
    change: '+12.5%',
    trend: 'up' // 'up', 'down', 'neutral'
  };

  const config = { ...defaultConfig, ...(widget.config || {}) };
  const { value, label, unit, change, trend } = config;



  const trendIcons = {
    up: <TrendingUp className="w-4 h-4" />,
    down: <TrendingDown className="w-4 h-4" />,
    neutral: <Minus className="w-4 h-4" />,
  };

  const trendColors = {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  };



  return (
    <div className="data-card-widget h-full w-full flex flex-col justify-center items-center text-center relative">
      <div className="space-y-2 w-full px-2">
        {/* Value */}
        <div
          className="text-2xl sm:text-3xl font-bold leading-tight"
          style={{ color: DSP_COLORS.dataCard.value }}
        >
          {value}
          {unit && (
            <span
              className="text-base sm:text-lg ml-1"
              style={{ color: DSP_COLORS.dataCard.label }}
            >
              {unit}
            </span>
          )}
        </div>

        {/* Label */}
        <div
          className="text-xs sm:text-sm font-medium leading-tight"
          style={{ color: DSP_COLORS.dataCard.label }}
        >
          {label}
        </div>

        {/* Change Indicator */}
        {change && (
          <div className={`flex items-center justify-center space-x-1 text-xs sm:text-sm font-medium ${trendColors[trend]}`}>
            {trendIcons[trend]}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCardWidget;
