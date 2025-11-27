import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import DirectorDashboard from './components/DirectorDashboard';
import SpecialistDashboard from './components/SpecialistDashboard';
import ApplicantDashboard from './components/ApplicantDashboard';
import Supplier360 from './components/Supplier360';
import P2PWorkflow from './components/P2PWorkflow';
import ContractManagement from './components/ContractManagement';
import Settings from './components/Settings';
import MainLayout from './components/MainLayout';
import { Toaster } from './components/ui/sonner';
import AIAssistant from './components/AIAssistant';
import AICommandCenter from './components/AICommandCenter';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'director' | 'specialist' | 'applicant'>('director');
  const [currentView, setCurrentView] = useState<'dashboard' | 'supplier' | 'p2p' | 'contract' | 'ai-center' | 'settings'>('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      {/* Role Selector - For Demo Purposes - Material Design Style */}
      <div className="elevation-3 ai-gradient text-white px-6 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent data-flow" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center elevation-2">
              <span className="text-xl">智</span>
            </div>
            <div>
              <h1 className="text-xl font-medium">智采云 Smart Procurement Cloud</h1>
              <p className="text-sm text-white/80">AI驱动的企业采购管理平台</p>
            </div>
          </div>
          <Tabs value={currentRole} onValueChange={(v) => setCurrentRole(v as any)}>
            <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
              <TabsTrigger value="director" className="data-[state=active]:bg-white/90 data-[state=active]:text-purple-700">
                采购总监 (王总)
              </TabsTrigger>
              <TabsTrigger value="specialist" className="data-[state=active]:bg-white/90 data-[state=active]:text-purple-700">
                采购专员 (李明)
              </TabsTrigger>
              <TabsTrigger value="applicant" className="data-[state=active]:bg-white/90 data-[state=active]:text-purple-700">
                业务申请人 (张悦)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <MainLayout currentView={currentView} onViewChange={setCurrentView} role={currentRole}>
        {currentView === 'dashboard' && (
          <>
            {currentRole === 'director' && <DirectorDashboard />}
            {currentRole === 'specialist' && <SpecialistDashboard />}
            {currentRole === 'applicant' && <ApplicantDashboard />}
          </>
        )}
        {currentView === 'ai-center' && <AICommandCenter role={currentRole} />}
        {currentView === 'supplier' && <Supplier360 role={currentRole} />}
        {currentView === 'p2p' && <P2PWorkflow role={currentRole} />}
        {currentView === 'contract' && <ContractManagement role={currentRole} />}
        {currentView === 'settings' && <Settings role={currentRole} />}
      </MainLayout>

      {/* AI助手 - 全局悬浮 */}
      <AIAssistant role={currentRole} />
    </div>
  );
}