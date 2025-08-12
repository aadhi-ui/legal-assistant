import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './hooks/useTranslation';
import { fetchContent } from './services/api';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import LegalCompanion from './sections/LegalCompanion';
import KnowYourRights from './sections/KnowYourRights';
import LegalAidServices from './sections/LegalAidServices';
import SuccessStories from './sections/SuccessStories';
import Footer from './sections/Footer';
import Chatbot from './components/Chatbot';
import LanguageModal from './components/LanguageModal';
import PropertyRights from './pages/PropertyRights';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Since we don't have a backend, just use static content
        setContent({
          topics: [],
          services: [],
          testimonials: []
        });
      } catch (error) {
        console.error('Error loading content:', error);
        setContent({
          topics: [],
          services: [],
          testimonials: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const handleLanguageSelect = (languageCode) => {
    setCurrentLanguage(languageCode);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: 'var(--text-dark)'
      }}>
        Loading LegalAid India...
      </div>
    );
  }

  return (
    <TranslationProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar 
                  onLanguageClick={() => setIsModalOpen(true)}
                  currentLanguage={currentLanguage}
                  onOpenAssistant={() => setAssistantOpen(true)}
                />
                
                <Hero />
                
                <LegalCompanion />
                
                <KnowYourRights topics={content?.topics} />
                
                <LegalAidServices services={content?.services} />
                
                <SuccessStories testimonials={content?.testimonials} />
                
                <Footer />
                
                <Chatbot 
                  isOpen={assistantOpen}
                  onOpen={() => setAssistantOpen(true)}
                  onClose={() => setAssistantOpen(false)}
                />
                
                <LanguageModal 
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onLanguageSelect={handleLanguageSelect}
                />
              </>
            } />
            <Route path="/property-rights" element={<PropertyRights />} />
          </Routes>
        </div>
      </Router>
    </TranslationProvider>
  );
}

export default App;
