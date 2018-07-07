import Map from 'ol/Map.js'
import View from 'ol/View.js'
import TileLayer from 'ol/layer/Tile.js'
import VectorSource from 'ol/source/Vector.js'
import Vector from 'ol/layer/Vector.js'
import { fromLonLat } from 'ol/proj.js'
import Stamen from 'ol/source/Stamen.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import Select from 'ol/interaction/Select.js'
import DragBox from 'ol/interaction/DragBox.js'
import { platformModifierKeyOnly } from 'ol/events/condition.js'


const vectorSource = new VectorSource({
  url: 'geojson/counties.json',
  format: new GeoJSON()
})
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
    new Vector({
      source: vectorSource
    })
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([-77.4830, 37.5407]),
    zoom: 12
  })
})

// a normal select interaction to handle click
var select = new Select();
map.addInteraction(select);

var selectedFeatures = select.getFeatures();

// a DragBox interaction used to select features by drawing boxes
var dragBox = new DragBox({
  condition: platformModifierKeyOnly
});

map.addInteraction(dragBox);

var infoBox = document.getElementById('info');

dragBox.on('boxend', function () {
  // features that intersect the box are added to the collection of
  // selected features, and their names are displayed in the "info"
  // div
  var info = [];
  var extent = dragBox.getGeometry().getExtent();
  vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
    selectedFeatures.push(feature);
    info.push(feature.get('name'));
  });
  if (info.length > 0) {
    infoBox.innerHTML = info.join(', ');
  }
  console.log(selectedFeatures)
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on('boxstart', function () {
  selectedFeatures.clear();
  infoBox.innerHTML = '&nbsp;';
});
map.on('click', function () {
  console.log(vectorSource.getFeatures())

  selectedFeatures.clear();
  infoBox.innerHTML = '&nbsp;';
});