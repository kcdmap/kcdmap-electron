import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { get } from '../../assets/scripts/data/localization';
import { textMarkers, markers, usr_markers } from '../../assets/scripts/data/markers';
import { MapConfig, MapState, MapContextType, MarkerData, TextMarker } from '../types/map';

const MapContext = createContext<MapContextType | null>(null);

const config: MapConfig = {
  version: 1.3,
  url: `http://${window.location.hostname}/`,
  iconsUrl: 'assets/images/',
  tilesUrl: "assets/map/{z}_{x}_{y}.jpg",
  maxNativeZoom: 5,
  mapMinZoom: 1,
  mapMaxZoom: 5,
  mapSize: 8192,
  tileSize: 256,
  mapScale: 8192 / 256,
  mapOffset: 8192 / (8192 / 256) / 2,
  halfTile: 256 / 2,
  mapBounds: 4096
};

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mapRef = useRef<L.Map | null>(null);
  const [state, setState] = useState<MapState>({
    map: null,
    layerGroups: {},
    globalMarkers: [],
    textLayer: [],
    sidebar: null,
    hash: null,
    coordinates: null
  });

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      L.CRS.MySimple = L.extend({}, L.CRS.Simple, {
        transformation: new L.Transformation(1 / 16, 0, -1 / 16, 256)
      });

      const myBounds: L.LatLngBoundsExpression = [[0, 0], [config.mapBounds, config.mapBounds]];

      const map = L.map('map', {
        maxNativeZoom: config.maxNativeZoom,
        minZoom: config.mapMinZoom,
        maxZoom: config.mapMaxZoom,
        zoomControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: 'topright'
        },
        crs: L.CRS.MySimple,
        scrollWheelZoom: false,
        smoothWheelZoom: true,
        smoothSensitivity: 1,
      }).setView([2048, 2048], 2);

      L.tileLayer.canvas(config.tilesUrl, {
        maxNativeZoom: config.maxNativeZoom,
        minZoom: config.mapMinZoom,
        maxZoom: config.mapMaxZoom,
        tileSize: config.tileSize,
        noWrap: true,
        tms: false,
        bounds: myBounds,
        continuousWorld: true
      }).addTo(map);

      map.setMaxBounds([[-3000, -3000], [7000, 7000]]);

      // Add controls
      new L.Control.Zoom({ position: 'topright' }).addTo(map);
      const sidebar = L.control.sidebar('sidebar').addTo(map);
      const hash = new L.Hash(map);
      const coordinates = L.control.coordinates({
        position: "bottomright",
        decimals: 0,
        decimalSeperator: ".",
        labelTemplateLat: "Y: {y}",
        labelTemplateLng: "X: {x}",
        enableUserInput: true,
        useDMS: false,
        useLatLngOrder: false,
        markerType: L.marker,
        markerProps: {}
      }).addTo(map);

      mapRef.current = map;
      setState(prev => ({
        ...prev,
        map,
        sidebar,
        hash,
        coordinates
      }));

      // Initialize markers
      initializeMarkers(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const initializeMarkers = (map: L.Map) => {
    const layerGroups: { [key: string]: L.LayerGroup } = {};
    const globalMarkers: L.Marker[] = [];

    // Initialize text markers
    layerGroups.textmarkers = L.layerGroup();
    textMarkers.forEach(marker => {
      const transparentMarker = L.icon({
        iconUrl: `${config.iconsUrl}alpha_marker.png`,
        iconSize: [1, 1],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
      });

      const textMarker = L.marker(marker.coords, { 
        opacity: 0.0, 
        icon: transparentMarker 
      }).bindTooltip(marker.name, {
        permanent: true,
        direction: "top",
        className: "text-label",
        offset: [0, 0]
      });

      layerGroups.textmarkers.addLayer(textMarker);
    });

    // Initialize game markers
    markers.forEach((marker, index) => {
      if (!layerGroups[marker.group]) {
        layerGroups[marker.group] = L.layerGroup();
      }

      const markerIcon = L.icon({
        iconUrl: `${config.iconsUrl}${marker.icon}.png`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
      });

      const popupContent = createPopupContent(marker);
      const newMarker = L.marker(marker.coords, {
        icon: markerIcon,
        title: marker.group
      }).bindPopup(popupContent);

      layerGroups[marker.group].addLayer(newMarker);
      globalMarkers.push(newMarker);
    });

    setState(prev => ({
      ...prev,
      layerGroups,
      globalMarkers
    }));

    // Add all layer groups to map
    Object.values(layerGroups).forEach(group => group.addTo(map));
  };

  const createPopupContent = (marker: MarkerData) => {
    const x = marker.coords[1].toFixed(0);
    const y = marker.coords[0].toFixed(0);
    const markerUrl = encodeURI(`${config.url}?marker=${y},${x}`);

    const itemsList = marker.kcditems?.map(item => 
      `<li><i class="${item.item}"></i><span class="iname" data-i18n="${item.item}">${item.item.replace(/_/gi, " ")}</span><span class="qnt">${item.qnt}</span></li>`
    ).join('') || '';

    return `
      <p class='mtitle'>${marker.name}</p>
      <span class='mdesc'>${marker.desc || ''}</span>
      <ul class='ilist'>${itemsList}</ul>
      <p class='original_coords'>${y},${x}</p>
      <p class='markerlink hide'>${markerUrl}</p>
      <button class='copymarkerurl'>
        <span class='sharetext' data-i18n='copylink'>${get.copylink[localStorage.getItem('lang') || 'en']}</span>
        <span class='copiedmsg hide'>${get.copied[localStorage.getItem('lang') || 'en']}</span>
      </button>
    `;
  };

  const addMarker = (lat: number, lng: number) => {
    // Implementation for adding user markers
  };

  const removeMarker = (lat: number, lng: number) => {
    // Implementation for removing markers
  };

  const toggleLayer = (element: HTMLElement, layer: L.LayerGroup) => {
    if (mapRef.current) {
      if (mapRef.current.hasLayer(layer)) {
        mapRef.current.removeLayer(layer);
        element.classList.remove('active');
      } else {
        mapRef.current.addLayer(layer);
        element.classList.add('active');
      }
    }
  };

  const toggleAllLayers = (element: HTMLElement) => {
    if (mapRef.current) {
      const isActive = element.classList.contains('active');
      Object.values(state.layerGroups).forEach(group => {
        if (isActive) {
          mapRef.current?.removeLayer(group);
        } else {
          mapRef.current?.addLayer(group);
        }
      });
      element.classList.toggle('active');
    }
  };

  const copyMarkerUrl = (element: HTMLElement) => {
    const markerLink = element.querySelector('.markerlink');
    if (markerLink) {
      navigator.clipboard.writeText(markerLink.textContent || '');
      const copiedMsg = element.querySelector('.copiedmsg');
      if (copiedMsg) {
        copiedMsg.classList.remove('hide');
        setTimeout(() => copiedMsg.classList.add('hide'), 2000);
      }
    }
  };

  return (
    <MapContext.Provider value={{
      state,
      addMarker,
      removeMarker,
      toggleLayer,
      toggleAllLayers,
      copyMarkerUrl
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}; 