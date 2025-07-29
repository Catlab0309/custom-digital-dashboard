import React from 'react';
import { t } from '../../lib/i18n';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Eye,
  Thermometer
} from 'lucide-react';

const WeatherWidget = ({ widget }) => {
  const config = widget.config || {};
  
  // Sample weather data - in a real app, this would come from an API
  const weatherData = config.weatherData || {
    location: '北京市',
    temperature: 22,
    condition: 'partly-cloudy',
    description: '多云',
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    feelsLike: 25,
  };

  const weatherIcons = {
    'sunny': <Sun className="w-12 h-12 text-yellow-500" />,
    'partly-cloudy': <Cloud className="w-12 h-12 text-gray-500" />,
    'cloudy': <Cloud className="w-12 h-12 text-gray-600" />,
    'rainy': <CloudRain className="w-12 h-12 text-blue-500" />,
    'snowy': <CloudSnow className="w-12 h-12 text-blue-300" />,
    'stormy': <CloudLightning className="w-12 h-12 text-purple-600" />,
  };

  const backgroundColors = {
    'sunny': 'from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20',
    'partly-cloudy': 'from-blue-100 to-gray-100 dark:from-blue-900/20 dark:to-gray-900/20',
    'cloudy': 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
    'rainy': 'from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20',
    'snowy': 'from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900',
    'stormy': 'from-purple-100 to-gray-200 dark:from-purple-900/20 dark:to-gray-900',
  };

  return (
    <div className={`h-full bg-gradient-to-br ${backgroundColors[weatherData.condition] || backgroundColors['partly-cloudy']} rounded-lg p-4`}>
      <div className="h-full flex flex-col">
        {/* Location */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {weatherData.location}
          </h3>
        </div>

        {/* Main Weather Display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Weather Icon */}
          <div className="mb-4">
            {weatherIcons[weatherData.condition] || weatherIcons['partly-cloudy']}
          </div>

          {/* Temperature */}
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {weatherData.temperature}°C
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {weatherData.description}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('widgets.weather.feelsLike')} {weatherData.feelsLike}°C
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
            <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-900 dark:text-white">
              {weatherData.humidity}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {t('widgets.weather.humidity')}
            </div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
            <Wind className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-900 dark:text-white">
              {weatherData.windSpeed} km/h
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {t('widgets.weather.wind')}
            </div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
            <Eye className="w-4 h-4 text-green-500 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-900 dark:text-white">
              {weatherData.visibility} km
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {t('widgets.weather.visibility')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
