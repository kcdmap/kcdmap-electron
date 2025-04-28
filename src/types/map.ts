import { LatLngExpression, Layer, LayerGroup, Map, Marker, Popup } from 'leaflet';

export interface MarkerData {
  coords: [number, number];
  name: string;
  group: string;
  icon: string;
  desc?: string;
  items?: string;
  kcditems?: Array<{
    item: string;
    qnt: string;
  }>;
}

export interface TextMarker {
  coords: [number, number];
  name: string;
}

export interface MapConfig {
  version: number;
  url: string;
  iconsUrl: string;
  tilesUrl: string;
  maxNativeZoom: number;
  mapMinZoom: number;
  mapMaxZoom: number;
  mapSize: number;
  tileSize: number;
  mapScale: number;
  mapOffset: number;
  halfTile: number;
  mapBounds: number;
}

export interface LayerGroups {
  [key: string]: LayerGroup;
  textmarkers?: LayerGroup;
}

export interface MapState {
  map: Map | null;
  layerGroups: LayerGroups;
  globalMarkers: Marker[];
  textLayer: Layer[];
  sidebar: any; // TODO: Add proper type for sidebar
  hash: any; // TODO: Add proper type for hash
  coordinates: any; // TODO: Add proper type for coordinates
}

export interface MapContextType {
  state: MapState;
  addMarker: (lat: number, lng: number) => void;
  removeMarker: (lat: number, lng: number) => void;
  toggleLayer: (element: HTMLElement, layer: LayerGroup) => void;
  toggleAllLayers: (element: HTMLElement) => void;
  copyMarkerUrl: (element: HTMLElement) => void;
} 