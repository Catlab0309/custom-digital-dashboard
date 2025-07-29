import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardProvider } from './contexts/DashboardContext';
import Dashboard from './components/Dashboard';
import OnboardingWizard from './components/OnboardingWizard';
import ErrorBoundary from './components/ErrorBoundary';
import { useDashboard } from './contexts/DashboardContext';

function AppContent() {
  const { showWelcome } = useDashboard();

  if (showWelcome) {
    return <OnboardingWizard />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DashboardProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-600 dark:via-purple-600 dark:to-purple-800 transition-all duration-500">
            <AppContent />
          </div>
        </DashboardProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
