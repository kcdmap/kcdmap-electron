import React from 'react';

interface Tab {
  href: string;
  title: string;
  icon: string;
}

interface SidebarTabsProps {
  tablist: Tab[];
  currentLang: string;
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ tablist, currentLang, activeTab, onTabClick }) => {
  return (
    <div className="sidebar-tabs">
      <img
        className="getFlag"
        width="36"
        height="36"
        src={`assets/flags/${currentLang}${currentLang === "tr" ? ".svg" : ".png"}`}
        alt={`${currentLang} flag`}
      />
      <ul role="tablist">
        {tablist.map((tab) => (
          <li
            key={tab.href}
            className={activeTab === tab.href.slice(1) ? 'active' : ''}
            onClick={() => onTabClick(tab.href.slice(1))}
          >
            <a href={tab.href} role="tab" title={tab.title}>
              <i className={tab.icon}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarTabs; 