import { toGeoJsonPoint } from "./geo";
// @ts-ignore
import mapboxgl from "mapbox-gl";
import { deleteMarker } from "./layers";

export const mapData = {
  quakeId: null,
};

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
  map.on("mousemove", sourceName, (event: any) => {
    if (!interactive) return;
    map.getCanvas().style.cursor = "pointer";
    // Check whether features exist
    if (event.features.length === 0) return;
    // If quakeID for the hovered feature is not null,
    // use removeFeatureState to reset to the default behavior
    if (mapData.quakeId !== null) {
      map.removeFeatureState({
        source: sourceName,
        id: mapData.quakeId,
      });
    }

    mapData.quakeId = event.features[0].id;
    // When the mouse moves over the layer, update the
    // feature state for the feature under the mouse
    map.setFeatureState(
      {
        source: sourceName,
        id: mapData.quakeId,
      },
      {
        hover: true,
      }
    );
  });
  map.on("mouseleave", sourceName, () => {
    if (!interactive) return;
    if (mapData.quakeId !== null) {
      map.setFeatureState(
        {
          source: sourceName,
          id: mapData.quakeId,
        },
        {
          hover: false,
        }
      );
    }
    mapData.quakeId = null;
    map.getCanvas().style.cursor = "";
  });
  map.on("click", sourceName, (event: any) => {
    if (!interactive) return;
    if (event.features.length === 0) return;
    mapData.quakeId = event.features[0].id;
    const coords = event.features[0].geometry.coordinates;
    const button = document.createElement("div");
    button.style.padding = "10px";
    button.innerHTML = `<button id="${mapData.quakeId}" class="my-button">Delete marker</button>`;
    button.addEventListener("click", (e) => {
      //@ts-ignore
      deleteMarker(map, sourceName, e.target.id);
      popup.remove();
    });
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(coords)
      .setDOMContent(button)
      .addTo(map);
  });
};
