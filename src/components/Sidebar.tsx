import React, { useState } from 'react';
import { get } from '../../assets/scripts/data/localization';
import SidebarTabs from './SidebarTabs';
import SidebarContent from './SidebarContent';

interface SidebarProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentLang, onLanguageChange }) => {
  const [activeTab, setActiveTab] = useState('home');

  const tablist = [
    { href: "#home", title: get.tablist.home[currentLang], icon: "home" },
    { href: "#share", title: get.tablist.share[currentLang], icon: "share" },
    { href: "#about", title: get.tablist.about[currentLang], icon: "about" },
    { href: "#backup", title: get.tablist.backup[currentLang], icon: "inventory" }
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div id="sidebar" className="sidebar collapsed">
      <SidebarTabs
        tablist={tablist}
        currentLang={currentLang}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />
      <SidebarContent
        tablist={tablist}
        currentLang={currentLang}
        activeTab={activeTab}
        onLanguageChange={onLanguageChange}
      />
    </div>
  );
};

export default Sidebar; 