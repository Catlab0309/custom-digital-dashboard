import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, Edit2, Save, X, Minus } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { t } from '../../lib/i18n';
import { DSP_COLORS, getTrendColor } from '../../lib/colors';

const KPIWidget = ({ widget }) => {

  // Ensure we always have default data
  const defaultConfig = {
    value: 85.6,
    label: '销售完成率',
    unit: '%',
    target: 100,
    previousValue: 78.2,
    trend: 'up',
    changePercent: 9.5,
    description: '本月销售目标完成情况'
  };

  const config = { ...defaultConfig, ...(widget.config || {}) };



  const getTrendColorClass = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-5 h-5" />;
      case 'down': return <TrendingDown className="w-5 h-5" />;
      default: return <Minus className="w-5 h-5" />;
    }
  };

  const getProgressPercentage = () => {
    return Math.min((config.value / config.target) * 100, 100);
  };



  return (
    <div className="h-full relative">
      {/* KPI Display */}
      <div className="h-full flex flex-col justify-center p-4">


        {/* Main Value Display */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold mb-2" style={{ color: DSP_COLORS.kpi.value }}>
            {config.value}{config.unit}
          </div>
          <div className="text-sm" style={{ color: DSP_COLORS.kpi.label }}>
            {config.label}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1" style={{ color: DSP_COLORS.chart.text.secondary }}>
            <span>进度</span>
            <span>{config.target}{config.unit}</span>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: DSP_COLORS.kpi.progress.background }}>
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${getProgressPercentage()}%`,
                background: DSP_COLORS.kpi.progress.fill
              }}
            ></div>
          </div>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className={`flex items-center space-x-1 ${getTrendColorClass(config.trend)}`}>
            {getTrendIcon(config.trend)}
            <span className="text-sm font-medium">
              {config.changePercent > 0 ? '+' : ''}{config.changePercent}%
            </span>
          </div>
        </div>

        {/* Description */}
        {config.description && (
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {config.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPIWidget;
