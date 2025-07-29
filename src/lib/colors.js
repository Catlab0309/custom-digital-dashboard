// DSP数据大屏统一颜色主题配置
// 基于提供的设计图，使用蓝紫色系作为主色调

export const DSP_COLORS = {
  // 主色调 - 蓝紫色系
  primary: {
    50: '#f0f4ff',
    100: '#e0e7ff', 
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // 主色
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // 渐变色组合
  gradients: {
    primary: 'from-blue-400 via-blue-500 to-purple-600',
    secondary: 'from-indigo-400 via-purple-500 to-pink-500',
    success: 'from-green-400 to-blue-500',
    warning: 'from-yellow-400 to-orange-500',
    danger: 'from-red-400 to-pink-500',
    info: 'from-cyan-400 to-blue-500',
  },

  // 图表专用颜色
  chart: {
    // 主要数据系列颜色
    series: [
      '#6366f1', // 主蓝色
      '#8b5cf6', // 紫色
      '#06b6d4', // 青色
      '#10b981', // 绿色
      '#f59e0b', // 橙色
      '#ef4444', // 红色
      '#ec4899', // 粉色
      '#84cc16', // 青绿色
    ],
    
    // 背景和辅助色
    background: {
      light: 'rgba(99, 102, 241, 0.1)',
      medium: 'rgba(99, 102, 241, 0.2)',
      dark: 'rgba(99, 102, 241, 0.3)',
    },
    
    // 网格线颜色
    grid: 'rgba(99, 102, 241, 0.1)',
    
    // 文本颜色
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      light: '#9ca3af',
    }
  },

  // KPI指标颜色
  kpi: {
    value: '#1f2937',
    label: '#6b7280',
    trend: {
      up: '#10b981',
      down: '#ef4444',
      stable: '#6b7280',
    },
    progress: {
      background: '#e5e7eb',
      fill: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
    }
  },

  // 仪表盘颜色
  gauge: {
    background: '#e5e7eb',
    excellent: '#10b981', // 绿色 - 优秀
    good: '#6366f1',      // 蓝色 - 良好  
    average: '#f59e0b',   // 橙色 - 一般
    poor: '#ef4444',      // 红色 - 需要改进
  },

  // 进度条颜色
  progress: {
    background: '#e5e7eb',
    completed: '#10b981',
    inProgress: '#6366f1',
    pending: '#9ca3af',
    overdue: '#ef4444',
  },

  // 状态颜色
  status: {
    success: {
      bg: '#dcfce7',
      text: '#166534',
      border: '#bbf7d0',
    },
    warning: {
      bg: '#fef3c7',
      text: '#92400e',
      border: '#fde68a',
    },
    error: {
      bg: '#fee2e2',
      text: '#991b1b',
      border: '#fecaca',
    },
    info: {
      bg: '#dbeafe',
      text: '#1e40af',
      border: '#bfdbfe',
    },
    processing: {
      bg: '#f3e8ff',
      text: '#6b21a8',
      border: '#e9d5ff',
    }
  },

  // 数据卡片颜色
  dataCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'rgba(99, 102, 241, 0.2)',
    shadow: '0 4px 6px -1px rgba(99, 102, 241, 0.1)',
    value: '#1f2937',
    label: '#6b7280',
    icon: '#6366f1',
  }
};

// 获取图表颜色的辅助函数
export const getChartColor = (index) => {
  return DSP_COLORS.chart.series[index % DSP_COLORS.chart.series.length];
};

// 获取状态颜色的辅助函数
export const getStatusColor = (status) => {
  const statusMap = {
    'success': DSP_COLORS.status.success,
    'completed': DSP_COLORS.status.success,
    'warning': DSP_COLORS.status.warning,
    'pending': DSP_COLORS.status.warning,
    'error': DSP_COLORS.status.error,
    'failed': DSP_COLORS.status.error,
    'info': DSP_COLORS.status.info,
    'processing': DSP_COLORS.status.processing,
    'in-progress': DSP_COLORS.status.processing,
  };
  
  return statusMap[status.toLowerCase()] || DSP_COLORS.status.info;
};

// 获取趋势颜色的辅助函数
export const getTrendColor = (trend) => {
  const trendMap = {
    'up': DSP_COLORS.kpi.trend.up,
    'down': DSP_COLORS.kpi.trend.down,
    'stable': DSP_COLORS.kpi.trend.stable,
  };
  
  return trendMap[trend] || DSP_COLORS.kpi.trend.stable;
};

// 获取仪表盘颜色的辅助函数
export const getGaugeColor = (value, thresholds) => {
  if (value >= thresholds.high) return DSP_COLORS.gauge.excellent;
  if (value >= thresholds.medium) return DSP_COLORS.gauge.good;
  if (value >= thresholds.low) return DSP_COLORS.gauge.average;
  return DSP_COLORS.gauge.poor;
};
