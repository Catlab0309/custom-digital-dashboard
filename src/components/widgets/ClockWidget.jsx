import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const ClockWidget = ({ widget }) => {
  const [time, setTime] = useState(new Date());
  const config = widget.config || {};
  const timezone = config.timezone || 'local';
  const format24h = config.format24h !== false;
  const showSeconds = config.showSeconds !== false;
  const showDate = config.showDate !== false;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: !format24h,
    };

    if (timezone !== 'local') {
      options.timeZone = timezone;
    }

    return date.toLocaleTimeString('en-US', options);
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if (timezone !== 'local') {
      options.timeZone = timezone;
    }

    return date.toLocaleDateString('zh-CN', options);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      {/* Clock Icon */}
      <div className="text-blue-600 dark:text-blue-400 mb-4">
        <Clock className="w-12 h-12" />
      </div>

      {/* Time Display */}
      <div className="space-y-2">
        <div className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
          {formatTime(time)}
        </div>

        {showDate && (
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {formatDate(time)}
          </div>
        )}

        {timezone !== 'local' && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {timezone}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClockWidget;
