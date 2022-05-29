import { toGeoJsonPoint } from "./geo";
import { onMouseClick, onMouseLeave, onMouseMove } from "./mapEvents";

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
    onMouseMove(event, map, sourceName);
  });
  map.on("mouseleave", sourceName, (event: any) => {
    if (!interactive) return;
    onMouseLeave(event, map, sourceName);
  });
  map.on("click", sourceName, (event: any) => {
    if (!interactive) return;
    onMouseClick(event, map, sourceName);
  });
};
