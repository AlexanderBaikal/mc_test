import { onMounted, ref } from "vue";

// init map
// add marker-image
// add source
// create layer based on source
// create links

export function useMap(map) {
  const init = (map) => {};
}
// map.on("load", () => {
// map.loadImage(
//   "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
//   (error, image) => {
//     if (error) throw error;
//     map.addImage("custom-marker", image);
//   map.addSource("points", {
//     type: "geojson",
//     data: {
//       type: "FeatureCollection",
//       features: [
//         toGeoJsonPoint(
//           [-79.50168189070217, 8.999435903081396],
//           "Mapbox DC",
//           "custom-marker"
//         ),
//         toGeoJsonPoint(
//           [-79.50768189070217, 8.999435903081396],
//           "Mapbox SF",
//           "custom-marker"
//         ),
//       ],
//     },
//   });

//   // Add a symbol layer
//   map.addLayer({
//     id: "points",
//     type: "symbol",
//     source: "points",
//     layout: {
//       "icon-image": ["get", "image"],
//       // get the title name from the source's "title" property
//       "text-field": ["get", "title"],
//       "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
//       "text-offset": [0, 1.25],
//       "text-anchor": "top",
//     },
//   });
// }
//   );
// });

const loadImage = (imageUrl, name) => {
  map.loadImage(imageUrl, (error, image) => {
    if (error) throw error;
    map.addImage(name, image);
  });
};

const initLayers = [
  {
    layerName: "points",
    data: [
      {
        latlng: [-79.50768189070217, 8.999435903081396],
        title: "Mapbox SF",
        image: "custom-marker",
      },
      {
        latlng: [-79.51768189070217, 8.979435903081396],
        title: "Mapbox SF",
        image: "custom-marker",
      },
    ],
  },
];

const addLayer = (sourceName, data) => {
  // const allImages = map.listImages(); CHECK IT
  map.addSource(sourceName, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: data,
    },
  });
  // Add a symbol layer
  map.addLayer({
    id: sourceName,
    type: "symbol",
    source: sourceName,
    layout: {
      // get the name from the source's property
      "icon-image": ["get", "image"],
      "text-field": ["get", "title"],
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 1.25],
      "text-anchor": "top",
    },
  });
};

//layers = ["points", "circles", ...]
const initLinks = (layers) => {
  // If these layers were not added to the map, abort
  // !map.getLayer('contours') || !map.getLayer('museums')
  if (layers.some((item) => !map.getLayer(item))) {
    return;
  }
  const links = [];
  for (const id of layers) {
    if (document.getElementById(id)) {
      continue;
    }
    const link = {
      id,
      href: "#",
      textContent: id,
      active: true,
    };
    links.push(link);
  }
  return links;
};
