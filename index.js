import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import Vector from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import { fromLonLat } from 'ol/proj.js';
import Stamen from 'ol/source/Stamen.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import countiesJsonUrl from './geojson/counties.geojson';

const vectorSource = new Vector({
  url: countiesJsonUrl,
  format: new GeoJSON(),
  overlaps: false,
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
  projection: 'EPSG:3857'
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'watercolor'
      })
    }),
    new TileLayer({
      source: new Stamen({
        layer: 'toner-labels'
      })
    }),
    vectorLayer,
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([-77.4830, 37.5407]),
    zoom: 12
  })
});

var infoBox = document.getElementById('info');

map.on('click', function () {
  console.log(vectorSource.getFeatures())

  selectedFeatures.clear();
  infoBox.innerHTML = 'Changed!';
});