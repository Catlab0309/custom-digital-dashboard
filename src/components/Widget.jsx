import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { t } from '../lib/i18n';
import { Settings, X, Edit2, GripVertical } from 'lucide-react';
import { cn } from '../lib/utils';

// Widget type imports
import LineChartWidget from './widgets/LineChartWidget';
import DualLineChartWidget from './widgets/DualLineChartWidget';
import PieChartWidget from './widgets/PieChartWidget';
import BarChartWidget from './widgets/BarChartWidget';
import DataCardWidget from './widgets/DataCardWidget';
import ClockWidget from './widgets/ClockWidget';
import TaskListWidget from './widgets/TaskListWidget';
import CarouselWidget from './widgets/CarouselWidget';
import TextWidget from './widgets/TextWidget';
import WeatherWidget from './widgets/WeatherWidget';
import NewsWidget from './widgets/NewsWidget';
import KPIWidget from './widgets/KPIWidget';
import ProgressWidget from './widgets/ProgressWidget';
import GaugeWidget from './widgets/GaugeWidget';

const widgetComponents = {
  'line-chart': LineChartWidget,
  'dual-line-chart': DualLineChartWidget,
  'pie-chart': PieChartWidget,
  'bar-chart': BarChartWidget,
  'data-card': DataCardWidget,
  'clock': ClockWidget,
  'task-list': TaskListWidget,
  'carousel': CarouselWidget,
  'text': TextWidget,
  'weather': WeatherWidget,
  'news': NewsWidget,
  'kpi': KPIWidget,
  'progress': ProgressWidget,
  'gauge': GaugeWidget,
};

const Widget = ({ widget }) => {
  const { removeWidget, updateWidget, isEditing, selectedWidget, selectWidget } = useDashboard();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(widget.title);

  const WidgetComponent = widgetComponents[widget.type];
  const isSelected = selectedWidget === widget.id;

  const handleTitleSave = () => {
    updateWidget(widget.id, { title: tempTitle });
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(widget.title);
    setIsEditingTitle(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      handleTitleCancel();
    }
  };

  if (!WidgetComponent) {
    return (
      <div className="widget-container h-full flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>{t('widget.unknownType')}: {widget.type}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "widget-container h-full flex flex-col relative group",
        isSelected && "ring-2 ring-blue-500 dark:ring-blue-400"
      )}
      onClick={(e) => {
        // 如果点击的是删除按钮区域或拖拽手柄，不要触发选择
        if (e.target.closest('.delete-button-area') || e.target.closest('.widget-drag-handle')) {
          return;
        }
        if (!isEditing) {
          selectWidget(widget.id);
        }
      }}
      onMouseDown={(e) => {
        // 如果鼠标按下在删除按钮区域，阻止拖拽
        if (e.target.closest('.delete-button-area')) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        // 如果不是在拖拽手柄上，且处于编辑模式，阻止默认拖拽行为
        if (isEditing && !e.target.closest('.widget-drag-handle')) {
          e.preventDefault();
        }
      }}
    >
      {/* 浮动删除按钮 - 完全独立，不受拖拽影响 */}
      {isEditing && (
        <div
          className="delete-button-area absolute -top-2 -right-2 z-widget-delete"
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            pointerEvents: 'auto'
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const confirmed = window.confirm('确定要删除这个小组件吗？');
            if (confirmed) {
              removeWidget(widget.id);
            }
          }}
        >
          <div
            className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg border-2 border-white cursor-pointer"
            title="删除小组件"
            style={{
              position: 'relative',
              pointerEvents: 'auto',
              userSelect: 'none'
            }}
          >
            ×
          </div>
        </div>
      )}
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3 min-h-[32px]">
        <div className="flex items-center space-x-2 flex-1">
          {isEditing && (
            <div className="widget-handle widget-drag-handle cursor-move">
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
          )}
          
          {isEditingTitle ? (
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleKeyPress}
              className="flex-1 text-lg font-semibold bg-transparent border-b border-blue-500 focus:outline-none text-gray-900 dark:text-white"
              autoFocus
            />
          ) : (
            <h3
              className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg p-1 -m-1 transition-colors flex-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingTitle(true);
              }}
              title="点击编辑标题"
            >
              {widget.title}
            </h3>
          )}
        </div>

        {/* Widget Actions */}
        <div className={cn(
          "flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity",
          isEditing && "opacity-100"
        )}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              selectWidget(widget.id);
            }}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
            title="配置小组件"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Widget Content */}
      <div className="flex-1 min-h-0">
        <WidgetComponent widget={widget} />
      </div>
    </div>
  );
};

export default Widget;
