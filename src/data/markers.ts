import { get } from "./localization";
import { MarkerData, TextMarker } from "../types/map";

type Language = 'en' | 'tr';
export const cl = (localStorage.getItem('lang') || 'en') as Language;

export const textMarkers: TextMarker[] = [
  { 
    name: `<span data-i18n='SKALITZ'>${get.markers.SKALITZ[cl]}</span>`, 
    coords: [3606, 768]
  },
  { 
    name: `<span data-i18n='PRIBYSLAVITZ'>${get.markers.PRIBYSLAVITZ[cl]}</span>`, 
    coords: [3774, 1535]
  },
  { 
    name: `<span data-i18n='ROVNA'>${get.markers.ROVNA[cl]}</span>`, 
    coords: [3170, 1299]
  },
  { 
    name: `<span data-i18n='MERHOJED'>${get.markers.MERHOJED[cl]}</span>`, 
    coords: [2733, 1570]
  },
  { 
    name: `<span data-i18n='TALMBERG'>${get.markers.TALMBERG[cl]}</span>`, 
    coords: [2878, 2279]
  },
  { 
    name: `<span data-i18n='UZHITZ'>${get.markers.UZHITZ[cl]}</span>`, 
    coords: [3400, 3235]
  },
  { 
    name: `<span data-i18n='SAMOPESH'>${get.markers.SAMOPESH[cl]}</span>`, 
    coords: [2102, 1158]
  },
  { 
    name: `<span data-i18n='MONASTERY'>${get.markers.MONASTERY[cl]}</span>`, 
    coords: [1829, 865]
  },
  { 
    name: `<span data-i18n='LEDETCHKO'>${get.markers.LEDETCHKO[cl]}</span>`, 
    coords: [1423, 1954]
  },
  { 
    name: `<span data-i18n='SASAU'>${get.markers.SASAU[cl]}</span>`, 
    coords: [1034, 913]
  },
  { 
    name: `<span data-i18n='VRANIK'>${get.markers.VRANIK[cl]}</span>`, 
    coords: [810, 968]
  },
  { 
    name: `<span data-i18n='RATTAY'>${get.markers.RATTAY[cl]}</span>`, 
    coords: [389, 2712]
  },
  { 
    name: `<span data-i18n='NEUHOF'>${get.markers.NEUHOF[cl]}</span>`, 
    coords: [1280, 3515]
  }
];

export const markers: MarkerData[] = [
  {
    name: `<span data-i18n='woodland_garden'>${get.markers.woodland_garden[cl]}</span>`,
    group: "woodland_garden",
    icon: "woodland_garden",
    kcditems: [
      { item: "belladonna", qnt: "" },
      { item: "herb_paris", qnt: "" },
      { item: "valerian", qnt: "" }
    ],
    coords: [426.735901, 3670.262695]
  },
  {
    name: `<span data-i18n='woodland_garden'>${get.markers.woodland_garden[cl]}</span>`,
    group: "woodland_garden",
    icon: "woodland_garden",
    kcditems: [
      { item: "comfrey", qnt: "27" },
      { item: "mint", qnt: "45" },
      { item: "nettle", qnt: "11" }
    ],
    coords: [127.513657, 3326.467041]
  },
  {
    name: `<span data-i18n='interesting_site'>${get.markers.interesting_site[cl]}</span>`,
    group: "interesting_site",
    icon: "interesting_site",
    coords: [1424.631714, 629.960999]
  },
  {
    name: `<span data-i18n='accident'>${get.markers.accident[cl]}</span>`,
    group: "accident",
    icon: "accident",
    coords: [671.278870, 851.093628]
  }
];

export const usr_markers: MarkerData[] = []; 