import React, { useState } from 'react';
import { Gauge, Edit2, Save, X } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { DSP_COLORS, getGaugeColor } from '../../lib/colors';
import { t } from '../../lib/i18n';

const GaugeWidget = ({ widget }) => {

  // Ensure we always have default data
  const defaultConfig = {
    value: 36,
    min: 0,
    max: 100,
    label: '1月',
    unit: '%',
    thresholds: {
      low: 30,
      medium: 70,
      high: 90
    }
  };

  const config = { ...defaultConfig, ...(widget.config || {}) };



  const getGaugeColorValue = (value) => {
    return getGaugeColor(value, config.thresholds);
  };

  const getStatusText = (value) => {
    if (value >= config.thresholds.high) return '优秀';
    if (value >= config.thresholds.medium) return '良好';
    if (value >= config.thresholds.low) return '一般';
    return '需要改进';
  };

  const getPercentage = () => {
    return ((config.value - config.min) / (config.max - config.min)) * 100;
  };

  const getRotation = () => {
    const percentage = getPercentage();
    return (percentage / 100) * 180 - 90; // -90 to 90 degrees
  };

  if (false) {
    return (
      <div className="h-full flex flex-col p-4">
        {/* Edit Controls */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">编辑仪表盘设置</h4>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <div className="flex-1 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              标签
            </label>
            <input
              type="text"
              value={tempConfig.label || ''}
              onChange={(e) => updateTempConfig('label', e.target.value)}
              className="glass-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                当前值
              </label>
              <input
                type="number"
                value={tempConfig.value || ''}
                onChange={(e) => updateTempConfig('value', parseFloat(e.target.value) || 0)}
                className="glass-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                最小值
              </label>
              <input
                type="number"
                value={tempConfig.min || ''}
                onChange={(e) => updateTempConfig('min', parseFloat(e.target.value) || 0)}
                className="glass-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                最大值
              </label>
              <input
                type="number"
                value={tempConfig.max || ''}
                onChange={(e) => updateTempConfig('max', parseFloat(e.target.value) || 100)}
                className="glass-input w-full px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              单位
            </label>
            <input
              type="text"
              value={tempConfig.unit || ''}
              onChange={(e) => updateTempConfig('unit', e.target.value)}
              className="glass-input w-full px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Modern Circular Progress Display */}
      <div className="h-full flex items-center justify-center p-4">
        <div className="relative">
          {/* Circular Progress */}
          <div className="relative w-40 h-40">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Outer tick marks */}
              <g stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600">
                {Array.from({ length: 60 }, (_, i) => {
                  const angle = (i * 6) * Math.PI / 180;
                  const isMainTick = i % 5 === 0;
                  const innerRadius = isMainTick ? 45 : 47;
                  const outerRadius = 49;
                  const x1 = 50 + innerRadius * Math.cos(angle);
                  const y1 = 50 + innerRadius * Math.sin(angle);
                  const x2 = 50 + outerRadius * Math.cos(angle);
                  const y2 = 50 + outerRadius * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      strokeWidth={isMainTick ? "0.8" : "0.4"}
                    />
                  );
                })}
              </g>

              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-200 dark:text-gray-700"
              />

              {/* Progress arc */}
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke={DSP_COLORS.primary[500]}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 35}`}
                strokeDashoffset={`${2 * Math.PI * 35 * (1 - getPercentage() / 100)}`}
                className="transition-all duration-1000 ease-out"
                style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))' }}
              />

              {/* Progress indicator dot */}
              <circle
                cx={50 + 35 * Math.cos((getPercentage() / 100 * 360 - 90) * Math.PI / 180)}
                cy={50 + 35 * Math.sin((getPercentage() / 100 * 360 - 90) * Math.PI / 180)}
                r="2.5"
                fill={DSP_COLORS.primary[500]}
                className="transition-all duration-1000 ease-out"
                style={{ filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.8))' }}
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                {config.label}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {config.value}{config.unit}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeWidget;
