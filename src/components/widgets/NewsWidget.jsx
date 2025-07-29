import React from 'react';
import { ExternalLink, Clock, User } from 'lucide-react';
import { t } from '../../lib/i18n';
import { formatDate } from '../../lib/utils';

const NewsWidget = ({ widget }) => {
  const config = widget.config || {};
  
  // Sample news data - in a real app, this would come from an API
  const newsItems = config.newsItems || [
    {
      id: 1,
      title: '科技行业第四季度实现重大增长',
      summary: '科技公司报告创纪录的季度收益，云服务和人工智能开发领域增长显著。',
      author: '张小明',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: '科技'
    },
    {
      id: 2,
      title: '全球市场呈现积极趋势',
      summary: '国际股市持续上涨轨迹，投资者对经济复苏表现出信心。',
      author: '李华',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: '金融'
    },
    {
      id: 3,
      title: '可持续能源投资增长',
      summary: '可再生能源项目获得前所未有的资金支持，企业承诺实现碳中和目标。',
      author: '王丽',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: '环境'
    },
    {
      id: 4,
      title: '远程工作政策演进',
      summary: '公司采用混合工作模式，适应员工对灵活工作安排的偏好转变。',
      author: '陈强',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      url: '#',
      category: '商业'
    }
  ];

  const categoryColors = {
    '科技': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    '金融': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    '环境': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    '商业': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'Default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor((now - publishedDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return '刚刚';
    if (diffInHours === 1) return '1小时前';
    if (diffInHours < 24) return `${diffInHours}小时前`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1天前';
    return `${diffInDays}天前`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Latest News
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Updated {getTimeAgo(newsItems[0]?.publishedAt)}
        </div>
      </div>

      {/* News List */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {newsItems.map((item, index) => (
          <article
            key={item.id}
            className={`p-3 rounded-lg border transition-colors hover:shadow-sm ${
              index === 0 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                categoryColors[item.category] || categoryColors.Default
              }`}>
                {item.category}
              </span>
              {index === 0 && (
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  Latest
                </span>
              )}
            </div>

            {/* Title */}
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
              {item.title}
            </h4>

            {/* Summary */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
              {item.summary}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{item.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{getTimeAgo(item.publishedAt)}</span>
                </div>
              </div>
              
              <button
                onClick={() => window.open(item.url, '_blank')}
                className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <span>Read more</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
          View All News
        </button>
      </div>
    </div>
  );
};

export default NewsWidget;
