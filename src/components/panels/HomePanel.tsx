import React, { useCallback } from 'react';
import { get } from '../../../assets/scripts/data/localization';
import { useMap } from '../../context/MapContext';

interface HomePanelProps {
  currentLang: string;
}

const HomePanel: React.FC<HomePanelProps> = ({ currentLang }) => {
  const { state, toggleLayer, toggleAllLayers } = useMap();

  const getLatestVersion = () => {
    let ver = "0.0.0";
    get.panel.about.update.forEach((item) => {
      if (parseFloat(item.v) > parseFloat(ver)) {
        ver = item.v;
      }
    });
    return ver;
  };

  const handleToggle = useCallback((e: React.MouseEvent<HTMLLabelElement>, group: string) => {
    const element = e.currentTarget;
    const layer = state.layerGroups[group];
    if (layer) {
      toggleLayer(element, layer);
    }
  }, [state.layerGroups, toggleLayer]);

  const handleToggleAll = useCallback((e: React.MouseEvent<HTMLLabelElement>) => {
    toggleAllLayers(e.currentTarget);
  }, [toggleAllLayers]);

  return (
    <>
      <span className="sidebar-close">
        <i className="left-arrow"></i>
      </span>
      <div className="logo-container">
        <img
          className="logo-menu"
          src="assets/images/kcdmap.svg"
          alt="Kingdom Come Deliverance için İnteraktif Harita"
        />
        <p className="version">v. {getLatestVersion()}</p>
      </div>
      <div className="content">
        <ul className="user-list">
          <li>
            <i className={get.markers.my_markers.icon}></i>
            <input
              type="checkbox"
              id={get.markers.my_markers.id}
              className="cc"
              defaultChecked
            />
            <label
              htmlFor={get.markers.my_markers.id}
              className="cl"
              data-i18n={get.markers.my_markers.i18n}
              onClick={(e) => handleToggle(e, 'my_markers')}
            >
              {get.markers.my_markers[currentLang]}
            </label>
          </li>
        </ul>
        <ul className="allmarkers-list">
          <li>
            <i className={get.markers.all_markers.icon}></i>
            <input
              type="checkbox"
              id={get.markers.all_markers.id}
              className="cc"
            />
            <label
              htmlFor={get.markers.all_markers.id}
              className="cl"
              data-i18n={get.markers.all_markers.i18n}
              onClick={handleToggleAll}
            >
              {get.markers.all_markers[currentLang]}
            </label>
          </li>
        </ul>
        <ul className="markers-list">
          {Object.entries(get.markers)
            .filter(([key]) => !['my_markers', 'all_markers'].includes(key))
            .map(([key, marker]) => (
              <li key={key}>
                <i className={marker.icon}></i>
                <input
                  type="checkbox"
                  id={marker.id}
                  className="cc"
                />
                <label
                  htmlFor={marker.id}
                  className="cl"
                  data-i18n={marker.i18n}
                  onClick={(e) => handleToggle(e, key)}
                >
                  {marker[currentLang]}
                </label>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default HomePanel; 