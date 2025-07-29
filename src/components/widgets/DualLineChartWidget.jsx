import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DSP_COLORS, getChartColor } from '../../lib/colors';

const DualLineChartWidget = ({ widget }) => {

  // 默认配置
  const defaultConfig = {
    title: '双折线图对比',
    data: [
      { name: '1月', line1: 4000, line2: 2400 },
      { name: '2月', line1: 3000, line2: 1398 },
      { name: '3月', line1: 2000, line2: 9800 },
      { name: '4月', line1: 2780, line2: 3908 },
      { name: '5月', line1: 1890, line2: 4800 },
      { name: '6月', line1: 2390, line2: 3800 },
    ],
    line1: {
      name: '销售额',
      color: DSP_COLORS.chart.series[0],
      strokeWidth: 2
    },
    line2: {
      name: '利润',
      color: DSP_COLORS.chart.series[1],
      strokeWidth: 2
    },
    showGrid: true,
    showLegend: true,
    showTooltip: true
  };

  const config = { ...defaultConfig, ...(widget.config || {}) };



  return (
    <div className="h-full w-full flex flex-col justify-center p-4 relative overflow-hidden">

      {/* 标题 */}
      {config.title && (
        <div className="text-center mb-4 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {config.title}
          </h3>
        </div>
      )}

      {/* 图表 */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={config.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              stroke="currentColor"
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="currentColor"
              className="text-gray-600 dark:text-gray-400"
            />
            {config.showTooltip && <Tooltip />}
            {config.showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey="line1"
              stroke={config.line1?.color || '#3B82F6'}
              strokeWidth={config.line1?.strokeWidth || 2}
              name={config.line1?.name || '数据线1'}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="line2"
              stroke={config.line2?.color || '#10B981'}
              strokeWidth={config.line2?.strokeWidth || 2}
              name={config.line2?.name || '数据线2'}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DualLineChartWidget;
