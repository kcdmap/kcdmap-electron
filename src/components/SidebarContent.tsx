import React from 'react';
import { get } from '../../assets/scripts/data/localization';
import HomePanel from './panels/HomePanel';
import SharePanel from './panels/SharePanel';
import AboutPanel from './panels/AboutPanel';
import BackupPanel from './panels/BackupPanel';

interface Tab {
  href: string;
  title: string;
  icon: string;
}

interface SidebarContentProps {
  tablist: Tab[];
  currentLang: string;
  activeTab: string;
  onLanguageChange: (lang: string) => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  currentLang,
  activeTab,
  onLanguageChange
}) => {
  return (
    <div className="sidebar-content">
      <div className={`sidebar-pane ${activeTab === 'home' ? 'active' : ''}`} id="home">
        <HomePanel currentLang={currentLang} />
      </div>
      <div className={`sidebar-pane ${activeTab === 'share' ? 'active' : ''}`} id="share">
        <SharePanel currentLang={currentLang} />
      </div>
      <div className={`sidebar-pane ${activeTab === 'about' ? 'active' : ''}`} id="about">
        <AboutPanel currentLang={currentLang} />
      </div>
      <div className={`sidebar-pane ${activeTab === 'backup' ? 'active' : ''}`} id="backup">
        <BackupPanel currentLang={currentLang} onLanguageChange={onLanguageChange} />
      </div>
    </div>
  );
};

export default SidebarContent; 