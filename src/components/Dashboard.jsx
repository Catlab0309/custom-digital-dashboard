import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useDashboard } from '../contexts/DashboardContext';
import { useTheme } from '../contexts/ThemeContext';
import { t } from '../lib/i18n';
import DashboardHeader from './DashboardHeader';
import WidgetLibrary from './WidgetLibrary';
import WidgetConfigPanel from './WidgetConfigPanel';
import Widget from './Widget';
import { cn } from '../lib/utils';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const { widgets, layout, updateLayout, isEditing, selectedWidget, selectWidget } = useDashboard();
  const { theme } = useTheme();
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);

  const handleLayoutChange = (newLayout) => {
    updateLayout(newLayout);
  };

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 16, md: 12, sm: 8, xs: 4, xxs: 2 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DashboardHeader onShowWidgetLibrary={() => setShowWidgetLibrary(true)} />
      
      <main className="px-2 py-2 sm:px-3 sm:py-3">
        {widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="glass-panel p-12 max-w-md">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('empty.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('empty.description')}
              </p>
              <button
                onClick={() => setShowWidgetLibrary(true)}
                className="btn-primary"
              >
                {t('empty.addWidget')}
              </button>
            </div>
          </div>
        ) : (
          <div className={cn(
            "dashboard-grid",
            isEditing && "editing-mode"
          )}>
            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layout }}
              breakpoints={breakpoints}
              cols={cols}
              rowHeight={60}
              onLayoutChange={handleLayoutChange}
              isDraggable={isEditing}
              isResizable={isEditing}
              margin={[8, 8]}
              containerPadding={[4, 4]}
              useCSSTransforms={true}
              preventCollision={false}
              compactType="vertical"
              // 优化触摸设备兼容性
              allowOverlap={false}
              isBounded={true}
              // 减少触摸事件冲突
              transformScale={1}
              // 改善性能和触摸响应
              measureBeforeMount={false}
              // 指定拖拽手柄
              dragHandleClassName="widget-drag-handle"
            >
              {widgets.map((widget) => (
                <div key={widget.id} className="widget-grid-item">
                  <Widget widget={widget} />
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
        )}
      </main>

      {showWidgetLibrary && (
        <WidgetLibrary onClose={() => setShowWidgetLibrary(false)} />
      )}

      {selectedWidget && (
        <WidgetConfigPanel
          widget={widgets.find(w => w.id === selectedWidget)}
          onClose={() => selectWidget(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
