import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function generateSampleData(type, count = 10) {
  const data = [];
  
  switch (type) {
    case 'line':
      for (let i = 0; i < count; i++) {
        data.push({
          name: `Point ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 20,
          date: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
      }
      break;
    case 'pie':
      const categories = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'];
      categories.slice(0, count).forEach((cat, i) => {
        data.push({
          name: cat,
          value: Math.floor(Math.random() * 50) + 10,
          fill: `hsl(${(i * 360) / count}, 70%, 50%)`
        });
      });
      break;
    case 'bar':
      for (let i = 0; i < count; i++) {
        data.push({
          name: `Item ${i + 1}`,
          value: Math.floor(Math.random() * 80) + 10,
          fill: `hsl(${(i * 360) / count}, 60%, 50%)`
        });
      }
      break;
    default:
      return [];
  }
  
  return data;
}
