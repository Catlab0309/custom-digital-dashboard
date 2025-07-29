
import React, { useState } from 'react';
import { X, Edit3, Check, Plus, Trash2 } from 'lucide-react';
import { useDashboard } from '../contexts/DashboardContext';
import { generateSampleData } from '../lib/utils';

const WidgetConfigPanel = ({ widget, onClose }) => {
  const { updateWidget } = useDashboard();
  const [editingData, setEditingData] = useState(null);
  const [tempValue, setTempValue] = useState('');

  if (!widget) {
    return null;
  }

  const handleEditStart = (index, field, currentValue) => {
    setEditingData({ index, field });
    setTempValue(currentValue.toString());
  };

  const handleEditSave = () => {
    try {
      if (editingData && widget && widget.id) {
        const data = getData();
        const { index, field } = editingData;

        // 创建完全新的数据数组
        const newData = data.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [field]: field === 'value' ? (parseFloat(tempValue) || 0) : String(tempValue)
            };
          }
          return { ...item };
        });

        updateWidget(widget.id, {
          config: { ...widget.config, data: newData }
        });

        setEditingData(null);
        setTempValue('');
      }
    } catch (error) {
      console.error('Error saving widget data:', error);
      setEditingData(null);
      setTempValue('');
    }
  };

  const handleEditCancel = () => {
    setEditingData(null);
    setTempValue('');
  };

  const handleKeyPress = (e) => {
    try {
      // 阻止事件冒泡，避免与浏览器扩展冲突
      e.stopPropagation();

      if (e.key === 'Enter') {
        e.preventDefault();
        handleEditSave();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleEditCancel();
      }
    } catch (error) {
      console.error('Error in handleKeyPress:', error);
      // 发生错误时取消编辑
      handleEditCancel();
    }
  };

  const getWidgetDataType = (type) => {
    switch (type) {
      case 'line-chart': return 'line';
      case 'bar-chart': return 'bar';
      case 'pie-chart': return 'pie';
      default: return 'line';
    }
  };

  const addDataPoint = () => {
    try {
      if (widget && widget.id) {
        const data = getData();
        const newIndex = data.length + 1;

        const newData = [...data, {
          name: `Point ${newIndex}`,
          value: 0
        }];

        updateWidget(widget.id, {
          config: { ...widget.config, data: newData }
        });
      }
    } catch (error) {
      console.error('Error adding data point:', error);
    }
  };

  const removeDataPoint = (index) => {
    try {
      if (widget && widget.id) {
        const data = getData();
        const newData = data.filter((_, i) => i !== index);

        updateWidget(widget.id, {
          config: { ...widget.config, data: newData }
        });
      }
    } catch (error) {
      console.error('Error removing data point:', error);
    }
  };

  const updateWidgetTitle = (newTitle) => {
    try {
      if (widget && widget.id) {
        updateWidget(widget.id, {
          title: newTitle
        });
      }
    } catch (error) {
      console.error('Error updating widget title:', error);
    }
  };

  // 双折线图配置更新函数
  const updateDualLineConfig = (field, value) => {
    try {
      if (widget && widget.id) {
        updateWidget(widget.id, {
          config: { ...widget.config, [field]: value }
        });
      }
    } catch (error) {
      console.error('Error updating dual line config:', error);
    }
  };

  const updateDualLineData = (newData) => {
    try {
      if (widget && widget.id) {
        updateWidget(widget.id, {
          config: { ...widget.config, data: newData }
        });
      }
    } catch (error) {
      console.error('Error updating dual line data:', error);
    }
  };

  const updateLineConfig = (lineKey, field, value) => {
    try {
      if (widget && widget.id) {
        const currentConfig = widget.config || {};
        const currentLineConfig = currentConfig[lineKey] || {};
        updateWidget(widget.id, {
          config: {
            ...currentConfig,
            [lineKey]: {
              ...currentLineConfig,
              [field]: value
            }
          }
        });
      }
    } catch (error) {
      console.error('Error updating line config:', error);
    }
  };

  // 数据卡片配置更新函数
  const updateDataCardConfig = (field, value) => {
    try {
      if (widget && widget.id) {
        updateWidget(widget.id, {
          config: { ...widget.config, [field]: value }
        });
      }
    } catch (error) {
      console.error('Error updating data card config:', error);
    }
  };

  // 双折线图默认数据
  const getDefaultDualLineData = () => [
    { name: '1月', line1: 4000, line2: 2400 },
    { name: '2月', line1: 3000, line2: 1398 },
    { name: '3月', line1: 2000, line2: 9800 },
    { name: '4月', line1: 2780, line2: 3908 },
    { name: '5月', line1: 1890, line2: 4800 },
    { name: '6月', line1: 2390, line2: 3800 },
  ];

  // 双折线图数据操作函数
  const addDualLineDataPoint = () => {
    try {
      if (widget && widget.id) {
        const currentData = widget.config?.data || getDefaultDualLineData();
        const newData = [...currentData];
        newData.push({
          name: `数据${newData.length + 1}`,
          line1: 0,
          line2: 0
        });
        updateDualLineData(newData);
      }
    } catch (error) {
      console.error('Error adding dual line data point:', error);
    }
  };

  const removeDualLineDataPoint = (index) => {
    try {
      if (widget && widget.id) {
        const currentData = widget.config?.data || getDefaultDualLineData();
        const newData = [...currentData];
        newData.splice(index, 1);
        updateDualLineData(newData);
      }
    } catch (error) {
      console.error('Error removing dual line data point:', error);
    }
  };

  const updateDualLineDataPoint = (index, field, value) => {
    try {
      if (widget && widget.id) {
        const currentData = widget.config?.data || getDefaultDualLineData();
        const newData = [...currentData];
        newData[index] = { ...newData[index], [field]: value };
        updateDualLineData(newData);
      }
    } catch (error) {
      console.error('Error updating dual line data point:', error);
    }
  };

  // KPI小组件配置更新函数
  const updateKPIConfig = (field, value) => {
    try {
      if (widget && widget.id) {
        const currentConfig = widget.config || {};
        const newConfig = { ...currentConfig, [field]: value };
        updateWidget(widget.id, { config: newConfig });
      }
    } catch (error) {
      console.error('Error updating KPI config:', error);
    }
  };

  // 仪表盘小组件配置更新函数
  const updateGaugeConfig = (field, value) => {
    try {
      if (widget && widget.id) {
        const currentConfig = widget.config || {};
        if (field.includes('.')) {
          // 处理嵌套字段，如 thresholds.low
          const [parent, child] = field.split('.');
          const newConfig = {
            ...currentConfig,
            [parent]: {
              ...currentConfig[parent],
              [child]: value
            }
          };
          updateWidget(widget.id, { config: newConfig });
        } else {
          const newConfig = { ...currentConfig, [field]: value };
          updateWidget(widget.id, { config: newConfig });
        }
      }
    } catch (error) {
      console.error('Error updating Gauge config:', error);
    }
  };

  // 进度跟踪小组件配置更新函数
  const updateProgressConfig = (field, value) => {
    try {
      if (widget && widget.id) {
        const currentConfig = widget.config || {};
        const newConfig = { ...currentConfig, [field]: value };
        updateWidget(widget.id, { config: newConfig });
      }
    } catch (error) {
      console.error('Error updating Progress config:', error);
    }
  };

  // 更新进度跟踪里程碑
  const updateProgressMilestone = (index, field, value) => {
    try {
      if (widget && widget.id) {
        const currentConfig = widget.config || {};
        const milestones = [...(currentConfig.milestones || [])];
        milestones[index] = { ...milestones[index], [field]: value };
        updateProgressConfig('milestones', milestones);
      }
    } catch (error) {
      console.error('Error updating progress milestone:', error);
    }
  };

  // 只为图表类小组件显示数据编辑
  const isChartWidget = ['line-chart', 'bar-chart', 'pie-chart'].includes(widget.type);

  // 双折线图需要特殊处理
  const isDualLineChart = widget.type === 'dual-line-chart';

  // 数据卡片需要特殊处理
  const isDataCard = widget.type === 'data-card';

  // 有内置编辑界面的小组件类型（但现在我们为KPI、仪表盘、进度跟踪提供配置界面）
  const hasBuiltinEditor = ['text', 'clock', 'task-list', 'carousel', 'weather', 'news'].includes(widget.type);

  // 需要专门配置界面的小组件
  const isKPIWidget = widget.type === 'kpi';
  const isGaugeWidget = widget.type === 'gauge';
  const isProgressWidget = widget.type === 'progress';

  // 安全获取数据，确保总是返回可变的新对象
  const getData = () => {
    const rawData = widget.config?.data || generateSampleData(getWidgetDataType(widget.type), 7);
    // 深度克隆数据，确保完全可变
    return rawData.map(item => ({
      name: String(item.name || ''),
      value: Number(item.value || 0),
      ...(item.fill && { fill: String(item.fill) }),
      ...(item.date && { date: String(item.date) })
    }));
  };

  // 双折线图数据渲染函数
  const renderDualLineDataEditor = () => {
    const dualLineData = widget.config?.data || getDefaultDualLineData();
    return dualLineData.map((point, index) => (
      <div key={index} className="grid grid-cols-4 gap-2 items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <input
          type="text"
          placeholder="标签"
          value={point.name || ''}
          onChange={(e) => updateDualLineDataPoint(index, 'name', e.target.value)}
          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="number"
          placeholder="值1"
          value={point.line1 || ''}
          onChange={(e) => updateDualLineDataPoint(index, 'line1', parseFloat(e.target.value) || 0)}
          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="number"
          placeholder="值2"
          value={point.line2 || ''}
          onChange={(e) => updateDualLineDataPoint(index, 'line2', parseFloat(e.target.value) || 0)}
          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={() => removeDualLineDataPoint(index)}
          className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ));
  };

  // 标准数据编辑器渲染函数
  const renderStandardDataEditor = () => {
    const data = getData();
    return data.map((item, index) => (
      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
        {/* 标签编辑 */}
        <div className="flex-1">
          {editingData?.index === index && editingData?.field === 'name' ? (
            <div className="flex items-center space-x-1">
              <input
                type="text"
                value={tempValue}
                onChange={(e) => {
                  e.stopPropagation();
                  setTempValue(e.target.value);
                }}
                onKeyDown={handleKeyPress}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                autoFocus
              />
              <button
                onClick={handleEditSave}
                className="p-1 text-green-600 hover:text-green-700"
              >
                <Check className="w-3 h-3" />
              </button>
              <button
                onClick={handleEditCancel}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEditStart(index, 'name', item.name)}
              className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 group text-sm"
            >
              <span>{item.name}</span>
              <Edit3 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50 inline" />
            </button>
          )}
        </div>

        {/* 数值编辑 */}
        <div className="w-20">
          {editingData?.index === index && editingData?.field === 'value' ? (
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={tempValue}
                onChange={(e) => {
                  e.stopPropagation();
                  setTempValue(e.target.value);
                }}
                onKeyDown={handleKeyPress}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                autoFocus
              />
              <button
                onClick={handleEditSave}
                className="p-1 text-green-600 hover:text-green-700"
              >
                <Check className="w-3 h-3" />
              </button>
              <button
                onClick={handleEditCancel}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEditStart(index, 'value', item.value)}
              className="w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 group text-sm text-right"
            >
              <span>{item.value}</span>
              <Edit3 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50 inline" />
            </button>
          )}
        </div>

        {/* 删除按钮 */}
        <button
          onClick={() => removeDataPoint(index)}
          className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ));
  };

  // 对于有内置编辑界面的小组件，只显示标题编辑
  // 但KPI、仪表盘、进度跟踪小组件需要显示完整配置界面
  if (!isChartWidget && !isDualLineChart && !isDataCard && !isKPIWidget && !isGaugeWidget && !isProgressWidget) {
    return (
      <div className="fixed inset-y-0 right-2 w-80 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg z-50">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">小组件配置</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              小组件标题
            </label>
            <input
              type="text"
              value={widget.title || ''}
              onChange={(e) => updateWidgetTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="输入小组件标题"
            />
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {hasBuiltinEditor
              ? '此类型的小组件有自己的编辑界面，请直接在小组件上点击编辑按钮进行编辑。'
              : '此类型的小组件有自己的编辑界面，请直接在小组件上进行编辑。'
            }
          </div>
        </div>
      </div>
    );
  }

  const data = getData();

  return (
    <div className="fixed top-2 bottom-2 right-2 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl z-sidebar flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">小组件配置</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {/* 小组件标题编辑 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            小组件标题
          </label>
          <input
            type="text"
            value={widget.title || ''}
            onChange={(e) => updateWidgetTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="输入小组件标题"
          />
        </div>

        {/* 双折线图特殊配置 */}
        {isDualLineChart && (
          <>
            {/* 图表标题配置 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                图表标题
              </label>
              <input
                type="text"
                value={widget.config?.title || ''}
                onChange={(e) => updateDualLineConfig('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入图表标题"
              />
            </div>

            {/* 折线配置 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                折线配置
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">第一条线</h5>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="线条名称"
                      value={widget.config?.line1?.name || ''}
                      onChange={(e) => updateLineConfig('line1', 'name', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="color"
                      value={widget.config?.line1?.color || '#3B82F6'}
                      onChange={(e) => updateLineConfig('line1', 'color', e.target.value)}
                      className="w-full h-8 border border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">第二条线</h5>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="线条名称"
                      value={widget.config?.line2?.name || ''}
                      onChange={(e) => updateLineConfig('line2', 'name', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="color"
                      value={widget.config?.line2?.color || '#10B981'}
                      onChange={(e) => updateLineConfig('line2', 'color', e.target.value)}
                      className="w-full h-8 border border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 显示选项 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                显示选项
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={widget.config?.showGrid !== false}
                    onChange={(e) => updateDualLineConfig('showGrid', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">显示网格</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={widget.config?.showLegend !== false}
                    onChange={(e) => updateDualLineConfig('showLegend', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">显示图例</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={widget.config?.showTooltip !== false}
                    onChange={(e) => updateDualLineConfig('showTooltip', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">显示提示框</span>
                </label>
              </div>
            </div>
          </>
        )}

        {/* 数据卡片特殊配置 */}
        {isDataCard && (
          <>
            {/* 数值 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                数值
              </label>
              <input
                type="text"
                value={widget.config?.value || ''}
                onChange={(e) => updateDataCardConfig('value', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入数值"
              />
            </div>

            {/* 标签 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                标签
              </label>
              <input
                type="text"
                value={widget.config?.label || ''}
                onChange={(e) => updateDataCardConfig('label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入标签"
              />
            </div>

            {/* 单位 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                单位
              </label>
              <input
                type="text"
                value={widget.config?.unit || ''}
                onChange={(e) => updateDataCardConfig('unit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入单位"
              />
            </div>

            {/* 变化值 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                变化值
              </label>
              <input
                type="text"
                value={widget.config?.change || ''}
                onChange={(e) => updateDataCardConfig('change', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="例如: +12.5%"
              />
            </div>

            {/* 趋势 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                趋势
              </label>
              <select
                value={widget.config?.trend || 'up'}
                onChange={(e) => updateDataCardConfig('trend', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="up">上升</option>
                <option value="down">下降</option>
                <option value="neutral">持平</option>
              </select>
            </div>
          </>
        )}

        {/* KPI指标配置 */}
        {isKPIWidget && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">KPI指标配置</h3>
            </div>

            {/* 数值 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                当前数值
              </label>
              <input
                type="number"
                step="0.1"
                value={widget.config?.value || 85.6}
                onChange={(e) => updateKPIConfig('value', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* 标签 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                指标名称
              </label>
              <input
                type="text"
                value={widget.config?.label || '销售完成率'}
                onChange={(e) => updateKPIConfig('label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入指标名称"
              />
            </div>

            {/* 单位 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                单位
              </label>
              <input
                type="text"
                value={widget.config?.unit || '%'}
                onChange={(e) => updateKPIConfig('unit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入单位"
              />
            </div>

            {/* 目标值 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                目标值
              </label>
              <input
                type="number"
                step="0.1"
                value={widget.config?.target || 100}
                onChange={(e) => updateKPIConfig('target', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* 上期数值 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                上期数值
              </label>
              <input
                type="number"
                step="0.1"
                value={widget.config?.previousValue || 78.2}
                onChange={(e) => updateKPIConfig('previousValue', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* 趋势 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                趋势方向
              </label>
              <select
                value={widget.config?.trend || 'up'}
                onChange={(e) => updateKPIConfig('trend', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="up">上升</option>
                <option value="down">下降</option>
                <option value="stable">持平</option>
              </select>
            </div>

            {/* 变化百分比 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                变化百分比
              </label>
              <input
                type="number"
                step="0.1"
                value={widget.config?.changePercent || 9.5}
                onChange={(e) => updateKPIConfig('changePercent', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* 描述 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                描述信息
              </label>
              <textarea
                value={widget.config?.description || '本月销售目标完成情况'}
                onChange={(e) => updateKPIConfig('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows="3"
                placeholder="输入描述信息"
              />
            </div>
          </>
        )}

        {/* 仪表盘配置 */}
        {isGaugeWidget && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">仪表盘配置</h3>
            </div>

            {/* 当前值 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                当前值
              </label>
              <input
                type="number"
                step="0.1"
                value={widget.config?.value || 36}
                onChange={(e) => updateGaugeConfig('value', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* 标签 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                标签
              </label>
              <input
                type="text"
                value={widget.config?.label || '1月'}
                onChange={(e) => updateGaugeConfig('label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入标签"
              />
            </div>

            {/* 单位 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                单位
              </label>
              <input
                type="text"
                value={widget.config?.unit || '%'}
                onChange={(e) => updateGaugeConfig('unit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入单位"
              />
            </div>

            {/* 最小值和最大值 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  最小值
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={widget.config?.min || 0}
                  onChange={(e) => updateGaugeConfig('min', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  最大值
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={widget.config?.max || 100}
                  onChange={(e) => updateGaugeConfig('max', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* 阈值设置 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                阈值设置
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 w-16">低:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={widget.config?.thresholds?.low || 30}
                    onChange={(e) => updateGaugeConfig('thresholds.low', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 w-16">中:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={widget.config?.thresholds?.medium || 70}
                    onChange={(e) => updateGaugeConfig('thresholds.medium', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 w-16">高:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={widget.config?.thresholds?.high || 90}
                    onChange={(e) => updateGaugeConfig('thresholds.high', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* 进度跟踪配置 */}
        {isProgressWidget && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">进度跟踪配置</h3>
            </div>

            {/* 项目标题 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                项目标题
              </label>
              <input
                type="text"
                value={widget.config?.title || '项目进度'}
                onChange={(e) => updateProgressConfig('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="输入项目标题"
              />
            </div>

            {/* 完成进度 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                完成进度 (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={widget.config?.progress || 68}
                onChange={(e) => updateProgressConfig('progress', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* 项目状态 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                项目状态
              </label>
              <select
                value={widget.config?.status || '进行中'}
                onChange={(e) => updateProgressConfig('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="进行中">进行中</option>
                <option value="已完成">已完成</option>
                <option value="延期">延期</option>
                <option value="暂停">暂停</option>
              </select>
            </div>

            {/* 开始日期 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                开始日期
              </label>
              <input
                type="date"
                value={widget.config?.startDate || '2024-01-01'}
                onChange={(e) => updateProgressConfig('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* 结束日期 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                结束日期
              </label>
              <input
                type="date"
                value={widget.config?.endDate || '2024-03-31'}
                onChange={(e) => updateProgressConfig('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </>
        )}

        {/* 数据编辑 - 只对图表类组件显示 */}
        {(isChartWidget || isDualLineChart) && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                数据编辑
              </label>
              <button
                onClick={isDualLineChart ? addDualLineDataPoint : addDataPoint}
                className="flex items-center space-x-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>添加</span>
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {isDualLineChart ? renderDualLineDataEditor() : renderStandardDataEditor()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetConfigPanel;
