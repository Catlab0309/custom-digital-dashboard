import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { useTheme } from '../contexts/ThemeContext';
import { t } from '../lib/i18n';
import { 
  LayoutDashboard, 
  Palette, 
  Settings, 
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  List,
  Image,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  Play,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

const OnboardingWizard = () => {
  const { hideWelcome } = useDashboard();
  const { theme, toggleTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'introduction',
      title: '欢迎使用专业仪表板构建器',
      subtitle: '创建令人惊叹的数据可视化演示',
      content: (
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-3xl shadow-2xl mx-auto w-32 h-32 flex items-center justify-center">
              <LayoutDashboard className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
              <Sparkles className="w-6 h-6 text-yellow-800" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-white/90 leading-relaxed">
              这是一个功能强大的可定制表盘系统，让您轻松创建专业级的数据展示界面。
            </p>
            <p className="text-base text-white/70">
              欢迎使用专业数据可视化大屏
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'features',
      title: '核心功能介绍',
      subtitle: '支持拖拽布局、响应式设计、多种图表组件和实时数据监控',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4 text-center space-y-2">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-2xl mx-auto w-12 h-12 flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">拖拽布局</h3>
            <p className="text-xs text-white/80">直观的拖拽操作，自由调整组件位置和大小</p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4 text-center space-y-2">
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-2xl mx-auto w-12 h-12 flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">丰富组件</h3>
            <p className="text-xs text-white/80">图表、卡片、轮播图、新闻等多种可视化组件</p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4 text-center space-y-2">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-2xl mx-auto w-12 h-12 flex items-center justify-center shadow-lg">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">主题切换</h3>
            <p className="text-xs text-white/80">一键切换明暗主题，所有组件自动适配</p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4 text-center space-y-2">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-2xl mx-auto w-12 h-12 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white">实时配置</h3>
            <p className="text-xs text-white/80">实时编辑组件内容，所有修改即时生效</p>
          </div>
        </div>
      )
    },
    {
      id: 'widgets',
      title: '开始使用',
      subtitle: '点击开始体验，立即创建您的专业数据大屏！',
      content: (
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-3xl shadow-2xl mx-auto w-32 h-32 flex items-center justify-center">
              <Play className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
              <Sparkles className="w-6 h-6 text-yellow-800" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-white/90 leading-relaxed">
              一切准备就绪！现在您可以开始创建属于自己的专业数据可视化大屏。
            </p>
            <p className="text-base text-white/70">
              点击下方按钮，开始您的数据可视化之旅
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 flex flex-col p-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          {/* Progress Indicators */}
          <div className="flex justify-center mb-4">
            <div className="flex space-x-3">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-white scale-125'
                      : index < currentStep
                      ? 'bg-white/70'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-4 md:p-6 relative">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-3">
                <div className="text-3xl">✨</div>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                {currentStepData.title}
              </h1>
              <p className="text-sm md:text-base text-white/80">
                {currentStepData.subtitle}
              </p>
            </div>

            {/* Step Content */}
            <div className="mb-12">
              {currentStepData.content}
            </div>

            {/* Navigation Buttons - positioned in bottom */}
            <div className="absolute bottom-3 left-6 right-6">
              <div className={`flex items-center ${currentStep === 0 ? 'justify-end' : 'justify-between'} gap-8`}>
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 text-white/80 hover:bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>上一步</span>
                  </button>
                )}

                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={hideWelcome}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm"
                  >
                    <Play className="w-5 h-5" />
                    <span>开始体验</span>
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
                  >
                    <span>下一步</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
