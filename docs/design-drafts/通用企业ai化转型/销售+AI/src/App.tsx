import { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { SalesForecast } from './components/SalesForecast';
import { OpportunityHub } from './components/OpportunityHub';
import { ChurnWatchlist } from './components/ChurnWatchlist';
import { AIHub } from './components/AIHub';
import { Toaster } from './components/ui/sonner';
import { FloatingAIButton } from './components/FloatingAIButton';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const pageTitle = {
    dashboard: '智能仪表盘',
    forecast: '销售预测中心',
    opportunities: '机会识别中心',
    churn: '客户流失预警',
    aihub: 'AI功能中心',
  }[currentPage] || '智能仪表盘';

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'forecast':
        return <SalesForecast />;
      case 'opportunities':
        return <OpportunityHub />;
      case 'churn':
        return <ChurnWatchlist />;
      case 'aihub':
        return <AIHub />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title={pageTitle} />
      <div className="flex">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
      <FloatingAIButton context={currentPage as any} />
      <Toaster />
    </div>
  );
}