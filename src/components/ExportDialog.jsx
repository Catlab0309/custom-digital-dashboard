import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';

const ExportDialog = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('正在准备导出...');
  const [isExporting, setIsExporting] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [exportedFile, setExportedFile] = useState(null);

  useEffect(() => {
    if (isExporting && !isComplete) {
      startExport();
    }
  }, []);

  const startExport = async () => {
    try {
      const updateProgress = (value, message) => {
        setProgress(value);
        setProgressMessage(message);
      };

      updateProgress(5, '正在准备导出...');
      await new Promise(resolve => setTimeout(resolve, 200));

      const dashboardElement = document.querySelector('main') ||
                              document.querySelector('.dashboard-grid') ||
                              document.querySelector('[class*="dashboard"]') ||
                              document.body;

      updateProgress(15, '正在隐藏弹窗元素...');

      // 隐藏所有弹窗和浮动元素
      const modals = document.querySelectorAll('[class*="modal"], [class*="dialog"], [class*="z-modal"]');
      const originalDisplays = [];
      modals.forEach((modal, index) => {
        originalDisplays[index] = modal.style.display;
        modal.style.display = 'none';
      });

      updateProgress(25, '正在优化小组件样式...');
      await new Promise(resolve => setTimeout(resolve, 300));

      // 临时添加导出专用样式来确保小组件正确渲染
      const exportStyle = document.createElement('style');
      exportStyle.id = 'export-temp-style';
      exportStyle.textContent = `
        /* 导出时的小组件样式优化 */
        .widget-container {
          background: rgba(255, 255, 255, 0.95) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          border-radius: 16px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          padding: 16px !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        /* 深色模式下的小组件样式 */
        .dark .widget-container {
          background: rgba(31, 41, 55, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2) !important;
        }

        /* 确保所有子元素不使用backdrop-filter */
        .widget-container *,
        .widget-container *::before,
        .widget-container *::after {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        /* 优化图表和内容的显示 */
        .widget-container .recharts-wrapper,
        .widget-container canvas,
        .widget-container svg {
          background: transparent !important;
        }

        /* 隐藏编辑模式相关元素 */
        .delete-button-area,
        .widget-handle,
        .react-resizable-handle {
          display: none !important;
        }

        /* 确保文字清晰可见 */
        .widget-container h1,
        .widget-container h2,
        .widget-container h3,
        .widget-container h4,
        .widget-container h5,
        .widget-container h6,
        .widget-container p,
        .widget-container span,
        .widget-container div {
          text-shadow: none !important;
        }
      `;
      document.head.appendChild(exportStyle);

      updateProgress(40, '正在渲染仪表板...');
      await new Promise(resolve => setTimeout(resolve, 500));

      updateProgress(60, '正在生成高清图片...');

      const canvas = await html2canvas(dashboardElement, {
        backgroundColor: '#f8fafc',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: dashboardElement.scrollWidth,
        height: dashboardElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        ignoreElements: (element) => {
          return element.classList.contains('z-modal-backdrop') ||
                 element.classList.contains('z-modal-content') ||
                 element.style.position === 'fixed' ||
                 element.getAttribute('role') === 'dialog' ||
                 element.classList.contains('delete-button-area') ||
                 element.classList.contains('widget-handle') ||
                 element.classList.contains('react-resizable-handle') ||
                 element.tagName === 'SCRIPT' ||
                 element.tagName === 'NOSCRIPT';
        },
        onclone: (clonedDoc) => {
          // 在克隆的文档中进一步优化样式
          const clonedWidgets = clonedDoc.querySelectorAll('.widget-container');
          clonedWidgets.forEach(widget => {
            widget.style.transform = 'none';
            widget.style.transition = 'none';
          });
        }
      });

      updateProgress(80, '正在处理图片...');

      // 清理临时样式
      const tempStyle = document.getElementById('export-temp-style');
      if (tempStyle) {
        tempStyle.remove();
      }

      // 恢复弹窗显示
      modals.forEach((modal, index) => {
        modal.style.display = originalDisplays[index];
      });

      updateProgress(90, '正在保存文件...');

      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `dashboard-${timestamp}`;
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png', 0.95);

      await new Promise(resolve => setTimeout(resolve, 300));
      link.click();

      updateProgress(100, '导出完成！');
      await new Promise(resolve => setTimeout(resolve, 500));

      setExportedFile(`${filename}.png`);
      setIsExporting(false);
      setIsComplete(true);

    } catch (error) {
      console.error('Export failed:', error);

      // 清理临时样式
      const tempStyle = document.getElementById('export-temp-style');
      if (tempStyle) {
        tempStyle.remove();
      }

      setIsExporting(false);
      setProgress(0);
      setProgressMessage('导出失败');
      alert('导出失败，请重试');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-modal-backdrop">
      <div className="glass-modal max-w-md w-full z-modal-content">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              导出仪表板
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              正在生成PNG图片
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!isComplete ? (
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                      className="text-blue-500 transition-all duration-300 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {progress}%
                    </span>
                  </div>
                </div>
              </div>
              {/* 进度条 */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                正在导出仪表板...
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {progressMessage}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                请稍候，正在生成高清PNG图片
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                导出完成！
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                文件已保存为: {exportedFile}
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                关闭
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;
