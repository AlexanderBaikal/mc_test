import { toGeoJsonPoint } from "./geo";

interface ILink {
  id: string;
  href: string;
  textContent: string;
  active: boolean;
}

//layers = ["points", "circles", ...]
export const initLinks = (
  map: any,
  layers: Array<string>
): Array<ILink> | undefined => {
  // If these layers were not added to the map, abort
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

export const addMarker = (
  map: any,
  layer: String,
  title: String,
  icon = "fir-marker",
  iconSize?: number
) => {
  if (!map) return;
  const source = map.getSource(layer);
  if (!source) return;
  const { lat, lng } = map.getCenter();
  source.setData({
    type: "FeatureCollection",
    features: [
      ...source._data.features,
      toGeoJsonPoint([lng, lat], title, icon, iconSize),
    ],
  });
};

export const addTextLabel = (map: any, layer: String, title: String) => {
  if (!map) return;
  const source = map.getSource(layer);
  if (!source) return;
  const { lat, lng } = map.getCenter();
  source.setData({
    type: "FeatureCollection",
    features: [...source._data.features, toGeoJsonPoint([lng, lat], title, "")],
  });
};

export const deleteMarker = (map: any, layer: String, id: number) => {
  if (!map) return;
  const source = map.getSource(layer);
  if (!source) return;
  source.setData({
    type: "FeatureCollection",
    features: [
      ...source._data.features.filter(
        (item: any, itemId: number) => itemId != id
      ),
    ],
  });
};
