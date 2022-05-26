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
