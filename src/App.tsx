import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PartnerShowcase from './components/PartnerShowcase';
import ServiceCapabilities from './components/ServiceCapabilities';
import ServiceMatrix from './components/ServiceMatrix';
import ResultsShowcase from './components/ResultsShowcase';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AITransformationPage from './pages/AITransformationPage';
import AIImplementationPage from './pages/AIImplementationPage';

// 主页组件
function HomePage() {
  return (
    <>
      <Hero />
      <PartnerShowcase />
      <ServiceCapabilities />
      <ServiceMatrix />
      <ResultsShowcase />
      <ContactForm />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F0EA' }}>
      <Routes>
        <Route path="/" element={
          <>
            <Navigation />
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/ai-transformation" element={<AITransformationPage />} />
        <Route path="/ai-implementation" element={<AIImplementationPage />} />
      </Routes>
    </div>
  );
}

export default App;