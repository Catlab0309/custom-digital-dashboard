import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, Edit2, Save, X, Circle } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { t } from '../../lib/i18n';
import { DSP_COLORS, getStatusColor } from '../../lib/colors';

const ProgressWidget = ({ widget }) => {

  // Ensure we always have default data
  const defaultConfig = {
    title: '项目进度',
    progress: 68,
    status: '进行中',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    milestones: [
      { id: 1, name: '需求分析', completed: true, date: '2024-01-15' },
      { id: 2, name: '设计阶段', completed: true, date: '2024-02-01' },
      { id: 3, name: '开发阶段', completed: false, date: '2024-02-28' },
      { id: 4, name: '测试阶段', completed: false, date: '2024-03-15' },
      { id: 5, name: '上线部署', completed: false, date: '2024-03-31' }
    ]
  };

  const config = { ...defaultConfig, ...(widget.config || {}) };



  const getProgressColor = (progress) => {
    if (progress >= 80) return DSP_COLORS.progress.completed;
    if (progress >= 50) return DSP_COLORS.progress.inProgress;
    if (progress >= 25) return DSP_COLORS.gauge.average;
    return DSP_COLORS.gauge.poor;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '已完成': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case '进行中': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case '延期': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case '暂停': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    });
  };



  return (
    <div className="h-full relative">
      {/* Progress Display */}
      <div className="h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {config.title}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(config.status)}`}>
            {config.status}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">完成进度</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {config.progress}%
            </span>
          </div>
          <div className="w-full rounded-full h-3" style={{ backgroundColor: DSP_COLORS.progress.background }}>
            <div
              className="h-3 rounded-full transition-all duration-500 relative"
              style={{
                width: `${config.progress}%`,
                backgroundColor: getProgressColor(config.progress)
              }}
            >
              <div className="absolute right-0 top-0 h-full w-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(config.startDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(config.endDate)}</span>
          </div>
        </div>

        {/* Milestones */}
        <div className="flex-1 overflow-y-auto">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">里程碑</h4>
          <div className="space-y-2">
            {config.milestones.slice(0, 3).map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center space-x-3 p-2 rounded-lg bg-white/50 dark:bg-gray-700/50"
              >
                <div className={`flex-shrink-0 ${milestone.completed ? 'text-green-500' : 'text-gray-400'}`}>
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${milestone.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    {milestone.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(milestone.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressWidget;
