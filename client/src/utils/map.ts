import { toGeoJsonPoint } from "./geo";

export const loadImage = (map: any, imageUrl: string, name: string) => {
  map.loadImage(imageUrl, (error: any, image: any) => {
    if (error) throw error;
    map.addImage(name, image);
  });
};

interface IGeoData {
  latlng: Array<Number>;
  title: String;
  image: String;
}

export const addLayer = (
  map: any,
  sourceName: string,
  data: Array<IGeoData>
) => {
  // const allImages = map.listImages();
  map.addSource(sourceName, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: data.map((item) =>
        toGeoJsonPoint(item.latlng, item.title, item.image)
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
      "text-field": ["get", "title"],
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 1.25],
      "text-anchor": "top",
    },
  });
};
