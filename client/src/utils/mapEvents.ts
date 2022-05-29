//@ts-ignore
import mapboxgl from "mapbox-gl";
import { deleteMarker } from "./layers";

export const mapData = {
  quakeId: null,
};

export const onMouseMove = (
  event: any,
  map: any,
  sourceName: string,
  interactive = false
) => {
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
};

export const onMouseLeave = (
  event: any,
  map: any,
  sourceName: string,
  interactive = false
) => {
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
};

export const onMouseClick = (event: any, map: any, sourceName: string) => {
  if (event.features.length === 0) return;
  mapData.quakeId = event.features[0].id;
  const coords = event.features[0].geometry.coordinates;
  const button = document.createElement("div");
  button.style.padding = "10px";
  button.innerHTML = `<button id="${mapData.quakeId}" class="my-button border">Delete marker</button>`;
  button.addEventListener("click", (e) => {
    //@ts-ignore
    deleteMarker(map, sourceName, e.target.id);
    popup.remove();
  });
  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(coords)
    .setDOMContent(button)
    .addTo(map);
};
