import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import {fromLonLat} from 'ol/proj.js';
import Stamen from 'ol/source/Stamen.js';


const map = new Map({
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'watercolor'
      })
    }),
    new TileLayer({
      source: new Stamen({
        layer: 'terrain-labels'
      })
    })
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([-77.4830, 37.5407]),
    zoom: 12
  })
});