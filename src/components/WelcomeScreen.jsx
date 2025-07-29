import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { useTheme } from '../contexts/ThemeContext';
import { t } from '../lib/i18n';
import {
  LayoutDashboard,
  Palette,
  MousePointer,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  List,
  Image,
  Sun,
  Moon
} from 'lucide-react';

const WelcomeScreen = () => {
  const { hideWelcome } = useDashboard();
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: <LayoutDashboard className="w-8 h-8 text-blue-500" />,
      title: t('welcome.features.dragDrop.title'),
      description: t('welcome.features.dragDrop.description'),
      iconColor: 'text-blue-500'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      title: t('welcome.features.visualizations.title'),
      description: t('welcome.features.visualizations.description'),
      iconColor: 'text-green-500'
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: t('welcome.features.themes.title'),
      description: t('welcome.features.themes.description'),
      iconColor: 'text-purple-500'
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      title: t('welcome.features.customizable.title'),
      description: t('welcome.features.customizable.description'),
      iconColor: 'text-orange-500'
    }
  ];

  const widgetTypes = [
    { icon: <LineChart className="w-6 h-6 text-blue-500" />, name: t('welcome.widgetTypes.lineCharts') },
    { icon: <PieChart className="w-6 h-6 text-green-500" />, name: t('welcome.widgetTypes.pieCharts') },
    { icon: <BarChart3 className="w-6 h-6 text-purple-500" />, name: t('welcome.widgetTypes.barCharts') },
    { icon: <Clock className="w-6 h-6 text-orange-500" />, name: t('welcome.widgetTypes.clock') },
    { icon: <List className="w-6 h-6 text-red-500" />, name: t('welcome.widgetTypes.taskLists') },
    { icon: <Image className="w-6 h-6 text-indigo-500" />, name: t('welcome.widgetTypes.carousel') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
              <LayoutDashboard className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('welcome.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('welcome.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Widget Types */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('welcome.widgetTypes.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {widgetTypes.map((widget, index) => (
              <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="mb-2">
                  {widget.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {widget.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('welcome.quickStart.title')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('welcome.quickStart.step1.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('welcome.quickStart.step1.description')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('welcome.quickStart.step2.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('welcome.quickStart.step2.description')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('welcome.quickStart.step3.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('welcome.quickStart.step3.description')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={hideWelcome}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {t('welcome.startButton')}
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span>{t('welcome.toggleTheme')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
