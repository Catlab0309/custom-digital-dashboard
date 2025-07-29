// Chinese (Simplified) translations for the dashboard application
export const zh_CN = {
  // Welcome Screen
  welcome: {
    title: "专业仪表板构建器",
    subtitle: "通过拖拽简化创建令人惊叹的交互式仪表板。适用于高管演示和数据可视化。",
    startButton: "开始构建仪表板",
    toggleTheme: "切换主题",
    features: {
      dragDrop: {
        title: "拖拽布局",
        description: "通过在仪表板网格中拖拽轻松排列小组件"
      },
      visualizations: {
        title: "丰富的可视化",
        description: "创建美观的图表、图形和数据可视化"
      },
      customizable: {
        title: "可定制小组件",
        description: "使用自定义数据源和设置配置每个小组件"
      },
      themes: {
        title: "主题支持",
        description: "在明暗主题之间切换以获得最佳观看体验"
      }
    },
    widgetTypes: {
      title: "可用小组件类型",
      lineCharts: "折线图",
      pieCharts: "饼图",
      barCharts: "柱状图",
      clock: "时钟小组件",
      taskLists: "任务列表",
      carousel: "图片轮播"
    },
    quickStart: {
      title: "快速开始指南",
      step1: {
        title: "添加小组件",
        description: "点击"+"按钮从小组件库添加新小组件"
      },
      step2: {
        title: "排列布局",
        description: "拖拽小组件重新定位，拖拽角落调整大小"
      },
      step3: {
        title: "自定义",
        description: "点击小组件配置其设置和数据源"
      }
    }
  },

  // Dashboard Header
  header: {
    title: "自定义数字大屏",
    subtitle: "专业数据可视化",
    addWidget: "添加小组件",
    edit: "编辑",
    save: "保存",
    fullscreen: "全屏",
    exitFullscreen: "退出全屏",
    export: "导出",
    toggleTheme: "切换主题",
    backToWelcome: "返回欢迎页"
  },

  // Edit Mode
  editMode: {
    indicator: "编辑模式：拖拽小组件重新定位，拖拽角落调整大小"
  },

  // Empty Dashboard
  empty: {
    title: "您的仪表板是空的",
    description: "添加您的第一个小组件开始构建仪表板",
    addWidget: "添加小组件"
  },

  // Widget Library
  widgetLibrary: {
    title: "小组件库",
    subtitle: "选择一个小组件添加到您的仪表板",
    search: "搜索小组件...",
    categories: {
      all: "全部",
      charts: "图表",
      data: "数据",
      content: "内容",
      utility: "工具",
      productivity: "效率"
    },
    noResults: {
      title: "未找到小组件",
      description: "尝试调整您的搜索或类别筛选"
    },
    widgets: {
      lineChart: {
        name: "折线图",
        description: "显示随时间变化的趋势"
      },
      pieChart: {
        name: "饼图",
        description: "用圆形图表显示比例"
      },
      barChart: {
        name: "柱状图",
        description: "用垂直柱状图比较数值"
      },
      dataCard: {
        name: "数据卡片",
        description: "显示关键指标和KPI"
      },
      clock: {
        name: "时钟",
        description: "显示当前时间和日期"
      },
      taskList: {
        name: "任务列表",
        description: "管理任务和待办事项"
      },
      carousel: {
        name: "图片轮播",
        description: "图片或内容的幻灯片展示"
      },
      text: {
        name: "文本块",
        description: "富文本内容和笔记"
      },
      weather: {
        name: "天气",
        description: "当前天气状况"
      },
      news: {
        name: "新闻动态",
        description: "最新新闻和更新"
      },
      kpi: {
        name: "KPI指标",
        description: "显示关键绩效指标和趋势变化"
      },
      progress: {
        name: "进度跟踪",
        description: "显示项目进度和里程碑状态"
      },
      gauge: {
        name: "仪表盘",
        description: "显示性能指标的仪表盘视图"
      }
    }
  },

  // Widget Actions
  widget: {
    configure: "配置小组件",
    editTitle: "点击编辑标题",
    unknownType: "未知小组件类型"
  },

  // Export Dialog
  export: {
    title: "导出仪表板",
    description: "选择导出格式",
    formats: {
      png: "PNG 图片",
      jpeg: "JPEG 图片", 
      pdf: "PDF 文档"
    },
    filename: "文件名",
    download: "下载",
    cancel: "取消",
    exporting: "正在导出...",
    success: "导出成功！",
    error: "导出失败，请重试。"
  },

  // Common
  common: {
    close: "关闭",
    loading: "加载中...",
    error: "错误",
    success: "成功",
    cancel: "取消",
    confirm: "确认",
    save: "保存",
    edit: "编辑",
    delete: "删除",
    add: "添加",
    remove: "移除"
  },

  // Widget specific content
  widgets: {
    clock: {
      timezone: "时区"
    },
    taskList: {
      addTask: "添加新任务...",
      noTasks: "暂无任务",
      firstTask: "在上方添加您的第一个任务"
    },
    text: {
      placeholder: "点击此处添加您的内容...",
      editing: "编辑中"
    },
    weather: {
      humidity: "湿度",
      wind: "风速",
      visibility: "能见度",
      feelsLike: "体感温度"
    },
    news: {
      title: "最新新闻",
      updated: "更新于",
      latest: "最新",
      readMore: "阅读更多",
      viewAll: "查看所有新闻"
    },
    carousel: {
      noImages: "无图片显示",
      configure: "在小组件设置中配置图片"
    }
  }
};

// Get translated text with fallback
export function t(key, fallback = key) {
  const keys = key.split('.');
  let value = zh_CN;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback;
    }
  }
  
  return typeof value === 'string' ? value : fallback;
}
