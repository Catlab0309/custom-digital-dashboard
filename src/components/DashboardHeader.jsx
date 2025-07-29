import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { useTheme } from '../contexts/ThemeContext';
import { t } from '../lib/i18n';
import {
  Plus,
  Edit3,
  Save,
  Sun,
  Moon,
  LayoutDashboard,
  Settings,
  Home,
  Maximize,
  Minimize,
  Download
} from 'lucide-react';
import ExportDialog from './ExportDialog';

const DashboardHeader = ({ onShowWidgetLibrary }) => {
  const { isEditing, setEditing, showWelcome, hideWelcome } = useDashboard();
  const { theme, toggleTheme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleEditToggle = () => {
    setEditing(!isEditing);
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <header className="glass-header">
      <div className="px-2 sm:px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('header.title')}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('header.subtitle')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Add Widget Button */}
            <button
              onClick={onShowWidgetLibrary}
              className="btn-primary flex items-center space-x-2"
              title={t('header.addWidget')}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t('header.addWidget')}</span>
            </button>

            {/* Edit Mode Toggle */}
            <button
              onClick={handleEditToggle}
              className={`flex items-center space-x-2 font-medium py-2 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
                isEditing
                  ? 'bg-gradient-to-r from-green-500/80 to-emerald-600/80 hover:from-green-600/90 hover:to-emerald-700/90 text-white backdrop-blur-md'
                  : 'glass-button text-gray-700 dark:text-gray-300'
              }`}
              title={isEditing ? t('header.save') : t('header.edit')}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('header.save')}</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('header.edit')}</span>
                </>
              )}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={handleFullscreenToggle}
              className="glass-button flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 group"
              title={isFullscreen ? t('header.exitFullscreen') : t('header.fullscreen')}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
              <span className="hidden lg:inline text-sm font-medium">
                {isFullscreen ? t('header.exitFullscreen') : t('header.fullscreen')}
              </span>
            </button>

            {/* Export Button */}
            <button
              onClick={() => setShowExportDialog(true)}
              className="glass-button flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 group"
              title={t('header.export')}
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline text-sm font-medium">
                {t('header.export')}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="glass-button flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 group"
              title={t('header.toggleTheme')}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span className="hidden lg:inline text-sm font-medium">
                {t('header.toggleTheme')}
              </span>
            </button>

            {/* Settings/Welcome */}
            <button
              onClick={() => window.location.reload()}
              className="glass-button flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 group"
              title={t('header.backToWelcome')}
            >
              <Home className="w-4 h-4" />
              <span className="hidden lg:inline text-sm font-medium">
                {t('header.backToWelcome')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Mode Indicator */}
      {isEditing && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-200">
              <Edit3 className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t('editMode.indicator')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Export Dialog */}
      {showExportDialog && (
        <ExportDialog onClose={() => setShowExportDialog(false)} />
      )}
    </header>
  );
};

export default DashboardHeader;
