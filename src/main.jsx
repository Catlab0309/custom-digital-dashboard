import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 全局错误处理，防止浏览器扩展错误影响应用程序
window.addEventListener('error', (event) => {
  // 如果错误来自content_script.js（浏览器扩展），则忽略
  if (event.filename && event.filename.includes('content_script.js')) {
    console.warn('Ignoring browser extension error:', event.error);
    event.preventDefault();
    return false;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  // 如果Promise rejection来自fetchError（浏览器扩展），则忽略
  if (event.reason && event.reason.message && event.reason.message.includes('fetchError')) {
    console.warn('Ignoring browser extension fetch error:', event.reason);
    event.preventDefault();
    return false;
  }
});

// 抑制浏览器干预警告（如触摸事件取消警告）
const originalConsoleWarn = console.warn;
console.warn = function(...args) {
  const message = args.join(' ');
  // 过滤掉react-grid-layout的触摸事件警告
  if (message.includes('Intervention') && message.includes('touchstart') && message.includes('cancelable=false')) {
    return; // 忽略这个警告
  }
  // 过滤掉其他已知的无害警告
  if (message.includes('react-grid-layout') && message.includes('touchstart')) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
