import React, { useEffect, useState } from 'react';
import { get } from '../assets/scripts/data/localization';
import Sidebar from './components/Sidebar';
import { MapProvider } from './context/MapContext';
import './index.css';

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    // Set initial language if not exists
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en');
    }

    // Update meta tags
    const title = document.querySelector('title');
    if (title) title.innerText = get.meta.title[currentLang];

    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = get.meta.description[currentLang];

    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <MapProvider>
      <div className="app">
        <div id="map" style={{ height: '100vh', width: '100%' }} />
        <Sidebar currentLang={currentLang} onLanguageChange={handleLanguageChange} />
      </div>
    </MapProvider>
  );
};

export default App; 