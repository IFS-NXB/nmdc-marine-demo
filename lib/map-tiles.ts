/**
 * Base map tile layer shared by every Leaflet map in the app.
 *
 * Uses Mapbox (Navigation Night style) when a Mapbox access token is
 * configured, and falls back to the free CARTO dark basemap otherwise.
 * The token comes from NEXT_PUBLIC_MAPBOX_TOKEN (or MAPBOX_API, mapped in
 * next.config.ts) and is inlined into the client bundle at build time.
 */
import type * as Leaflet from 'leaflet';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_STYLE = 'mapbox/navigation-night-v1';

export function addBaseTileLayer(L: typeof Leaflet, map: Leaflet.Map): Leaflet.TileLayer {
  if (MAPBOX_TOKEN) {
    return L.tileLayer(
      `https://api.mapbox.com/styles/v1/${MAPBOX_STYLE}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
      {
        maxZoom: 19,
        tileSize: 512,
        zoomOffset: -1,
        attribution:
          '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(map);
  }

  return L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);
}
