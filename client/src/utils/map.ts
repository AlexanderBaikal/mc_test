import { toGeoJsonPoint } from "./geo";
// @ts-ignore
import mapboxgl from "mapbox-gl";
import { deleteMarker } from "./layers";

export const loadImage = (map: any, imageUrl: string, name: string) => {
  return new Promise((resolve, reject) => {
    map.loadImage(imageUrl, (error: any, image: any) => {
      if (error) throw error;
      map.addImage(name, image);
      resolve(null);
    });
  });
};

interface IGeoData {
  latlng: Array<Number>;
  title: String;
  image: String;
  iconSize?: number;
}

export const addLayer = (
  map: any,
  sourceName: string,
  data: Array<IGeoData>,
  interactive = false
) => {
  // const allImages = map.listImages();
  map.addSource(sourceName, {
    type: "geojson",
    generateId: true,
    data: {
      type: "FeatureCollection",
      features: data.map((item) =>
        toGeoJsonPoint(item.latlng, item.title, item.image, item.iconSize)
      ),
    },
  });

  map.addLayer({
    id: sourceName,
    type: "symbol",
    source: sourceName,
    layout: {
      // get the name from the source's property
      "icon-image": ["get", "image"],
      "icon-size": ["get", "iconSize"],
      "text-field": ["get", "title"],
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 1.25],
      "text-anchor": "top",
    },
    paint: {
      "icon-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
    },
  });
  let quakeID: any = null;
  map.on("mousemove", sourceName, (event: any) => {
    if (!interactive) return;
    map.getCanvas().style.cursor = "pointer";
    // Check whether features exist

    if (event.features.length === 0) return;

    // If quakeID for the hovered feature is not null,
    // use removeFeatureState to reset to the default behavior
    if (quakeID) {
      map.removeFeatureState({
        source: sourceName,
        id: quakeID,
      });
    }

    quakeID = event.features[0].id;

    // When the mouse moves over the earthquakes-viz layer, update the
    // feature state for the feature under the mouse
    map.setFeatureState(
      {
        source: sourceName,
        id: quakeID,
      },
      {
        hover: true,
      }
    );
  });
  map.on("mouseleave", sourceName, () => {
    if (!interactive) return;
    if (quakeID) {
      map.setFeatureState(
        {
          source: sourceName,
          id: quakeID,
        },
        {
          hover: false,
        }
      );
    }
    quakeID = null;
    // Reset the cursor style
    map.getCanvas().style.cursor = "";
  });
  map.on("click", sourceName, (event: any) => {
    if (!interactive) return;
    if (event.features.length === 0) return;
    quakeID = event.features[0].id;
    deleteMarker(map, sourceName, quakeID);
    const coords = event.features[0].geometry.coordinates;
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(coords)
      .setHTML("<h1>Hello World!</h1>")
      .addTo(map);
  });
};
