import React, { useState } from 'react';
import { Edit2, Save, X, Type } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { t } from '../../lib/i18n';

const TextWidget = ({ widget }) => {
  const { updateWidget } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(widget.config.content || '');

  const content = widget.config.content || t('widgets.text.placeholder');
  const fontSize = widget.config.fontSize || 'text-base';
  const textAlign = widget.config.textAlign || 'left';
  const fontWeight = widget.config.fontWeight || 'normal';

  const handleSave = () => {
    updateWidget(widget.id, {
      config: { ...widget.config, content: tempContent }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const startEditing = () => {
    setTempContent(content);
    setIsEditing(true);
  };

  const fontSizeClasses = {
    'text-xs': 'text-xs',
    'text-sm': 'text-sm',
    'text-base': 'text-base',
    'text-lg': 'text-lg',
    'text-xl': 'text-xl',
    'text-2xl': 'text-2xl',
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const fontWeightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  if (isEditing) {
    return (
      <div className="h-full flex flex-col p-2">
        {/* Edit Controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Type className="w-4 h-4" />
            <span>{t('widgets.text.editing')}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              title={t('common.save')}
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              title={t('common.cancel')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Text Editor */}
        <textarea
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="输入您的文本内容..."
          className="glass-input flex-1 w-full p-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Content Display */}
      <div className="h-full p-4 overflow-y-auto">
        {content === t('widgets.text.placeholder') ? (
          <div
            className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            onClick={startEditing}
          >
            <Type className="w-12 h-12 mb-4" />
            <p className="text-sm text-center">{t('widgets.text.placeholder')}</p>
          </div>
        ) : (
          <div
            className={`
              ${fontSizeClasses[fontSize] || 'text-base'}
              ${textAlignClasses[textAlign] || 'text-left'}
              ${fontWeightClasses[fontWeight] || 'font-normal'}
              text-gray-900 dark:text-white leading-relaxed whitespace-pre-wrap cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg p-2 -m-2 transition-colors
            `}
            onClick={startEditing}
            title="点击编辑内容"
          >
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextWidget;
