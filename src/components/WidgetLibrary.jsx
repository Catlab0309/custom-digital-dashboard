import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { t } from '../lib/i18n';
import {
  X,
  LineChart,
  PieChart,
  BarChart3,
  Clock,
  List,
  Image,
  Type,
  Cloud,
  Newspaper,
  CreditCard,
  Search,
  Target,
  TrendingUp,
  Gauge,
  GitBranch
} from 'lucide-react';

const widgetTypes = [
  {
    id: 'line-chart',
    name: t('widgetLibrary.widgets.lineChart.name'),
    description: t('widgetLibrary.widgets.lineChart.description'),
    icon: <LineChart className="w-8 h-8" />,
    category: t('widgetLibrary.categories.charts'),
    defaultWidth: 6,
    defaultHeight: 4,
  },
  {
    id: 'dual-line-chart',
    name: '双折线图',
    description: '显示两条数据线的对比图表',
    icon: <GitBranch className="w-8 h-8" />,
    category: t('widgetLibrary.categories.charts'),
    defaultWidth: 6,
    defaultHeight: 4,
  },
  {
    id: 'pie-chart',
    name: t('widgetLibrary.widgets.pieChart.name'),
    description: t('widgetLibrary.widgets.pieChart.description'),
    icon: <PieChart className="w-8 h-8" />,
    category: t('widgetLibrary.categories.charts'),
    defaultWidth: 4,
    defaultHeight: 4,
  },
  {
    id: 'bar-chart',
    name: t('widgetLibrary.widgets.barChart.name'),
    description: t('widgetLibrary.widgets.barChart.description'),
    icon: <BarChart3 className="w-8 h-8" />,
    category: t('widgetLibrary.categories.charts'),
    defaultWidth: 6,
    defaultHeight: 4,
  },
  {
    id: 'data-card',
    name: t('widgetLibrary.widgets.dataCard.name'),
    description: t('widgetLibrary.widgets.dataCard.description'),
    icon: <CreditCard className="w-8 h-8" />,
    category: t('widgetLibrary.categories.data'),
    defaultWidth: 3,
    defaultHeight: 2,
  },
  {
    id: 'clock',
    name: t('widgetLibrary.widgets.clock.name'),
    description: t('widgetLibrary.widgets.clock.description'),
    icon: <Clock className="w-8 h-8" />,
    category: t('widgetLibrary.categories.utility'),
    defaultWidth: 3,
    defaultHeight: 3,
  },
  {
    id: 'task-list',
    name: t('widgetLibrary.widgets.taskList.name'),
    description: t('widgetLibrary.widgets.taskList.description'),
    icon: <List className="w-8 h-8" />,
    category: t('widgetLibrary.categories.productivity'),
    defaultWidth: 4,
    defaultHeight: 5,
  },
  {
    id: 'carousel',
    name: t('widgetLibrary.widgets.carousel.name'),
    description: t('widgetLibrary.widgets.carousel.description'),
    icon: <Image className="w-8 h-8" />,
    category: t('widgetLibrary.categories.content'),
    defaultWidth: 6,
    defaultHeight: 4,
  },
  {
    id: 'text',
    name: t('widgetLibrary.widgets.text.name'),
    description: t('widgetLibrary.widgets.text.description'),
    icon: <Type className="w-8 h-8" />,
    category: t('widgetLibrary.categories.content'),
    defaultWidth: 4,
    defaultHeight: 3,
  },
  {
    id: 'weather',
    name: t('widgetLibrary.widgets.weather.name'),
    description: t('widgetLibrary.widgets.weather.description'),
    icon: <Cloud className="w-8 h-8" />,
    category: t('widgetLibrary.categories.utility'),
    defaultWidth: 3,
    defaultHeight: 3,
  },
  {
    id: 'news',
    name: t('widgetLibrary.widgets.news.name'),
    description: t('widgetLibrary.widgets.news.description'),
    icon: <Newspaper className="w-8 h-8" />,
    category: t('widgetLibrary.categories.content'),
    defaultWidth: 5,
    defaultHeight: 6,
  },
  {
    id: 'kpi',
    name: 'KPI指标',
    description: '显示关键绩效指标和趋势变化',
    icon: <Target className="w-8 h-8" />,
    category: t('widgetLibrary.categories.data'),
    defaultWidth: 4,
    defaultHeight: 3,
  },
  {
    id: 'progress',
    name: '进度跟踪',
    description: '显示项目进度和里程碑状态',
    icon: <TrendingUp className="w-8 h-8" />,
    category: t('widgetLibrary.categories.utility'),
    defaultWidth: 5,
    defaultHeight: 4,
  },
  {
    id: 'gauge',
    name: '仪表盘',
    description: '显示性能指标的仪表盘视图',
    icon: <Gauge className="w-8 h-8" />,
    category: t('widgetLibrary.categories.data'),
    defaultWidth: 3,
    defaultHeight: 3,
  },
];

const categories = [
  t('widgetLibrary.categories.all'),
  t('widgetLibrary.categories.charts'),
  t('widgetLibrary.categories.data'),
  t('widgetLibrary.categories.content'),
  t('widgetLibrary.categories.utility'),
  t('widgetLibrary.categories.productivity')
];

const WidgetLibrary = ({ onClose }) => {
  const { addWidget } = useDashboard();
  const [selectedCategory, setSelectedCategory] = useState(t('widgetLibrary.categories.all'));
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWidgets = widgetTypes.filter(widget => {
    const matchesCategory = selectedCategory === t('widgetLibrary.categories.all') || widget.category === selectedCategory;
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDefaultConfig = (widgetTypeId) => {
    switch (widgetTypeId) {
      case 'data-card':
        return {
          value: '1,234',
          label: '总销售额',
          unit: '元',
          change: '+12.5%',
          trend: 'up'
        };
      case 'kpi':
        return {
          value: 85.6,
          label: '销售完成率',
          unit: '%',
          target: 100,
          previousValue: 78.2,
          trend: 'up',
          changePercent: 9.5,
          description: '本月销售目标完成情况'
        };
      case 'progress':
        return {
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
      case 'gauge':
        return {
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
      case 'dual-line-chart':
        return {
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
            color: '#3B82F6',
            strokeWidth: 2
          },
          line2: {
            name: '利润',
            color: '#10B981',
            strokeWidth: 2
          },
          showGrid: true,
          showLegend: true,
          showTooltip: true
        };
      default:
        return {};
    }
  };

  const handleAddWidget = (widgetType) => {
    addWidget({
      type: widgetType.id,
      title: widgetType.name,
      defaultWidth: widgetType.defaultWidth,
      defaultHeight: widgetType.defaultHeight,
      config: getDefaultConfig(widgetType.id)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-modal-backdrop">
      <div className="glass-modal max-w-4xl w-full max-h-[90vh] overflow-hidden z-modal-content">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('widgetLibrary.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {t('widgetLibrary.subtitle')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('widgetLibrary.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input w-full pl-10 pr-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white shadow-lg backdrop-blur-md'
                      : 'glass-button text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Widget Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWidgets.map(widget => (
              <div
                key={widget.id}
                onClick={() => handleAddWidget(widget)}
                className="glass-button p-6 cursor-pointer group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    {widget.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {widget.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {widget.description}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      {widget.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWidgets.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('widgetLibrary.noResults.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('widgetLibrary.noResults.description')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetLibrary;
