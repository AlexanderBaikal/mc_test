<template>
  <div id="mapContainer" class="basemap"></div>
  <nav id="menu">
    <my-button
      v-for="link in links"
      :key="link.id"
      @click="onLinkClick($event, link.id)"
      :buttonId="link.id"
      :active="link.active"
      >{{ link.textContent }}</my-button
    >
    <my-button @click="addMarker" :buttonId="'add marker'">{{
      "Add Marker"
    }}</my-button>
  </nav>
</template>

<script>
  import mapboxgl from "mapbox-gl";
  import MyButton from "@/components/UI/MyButton.vue";

  import { initialLayers } from "@/consts/initialLayers";
  import { loadImage, addLayer } from "@/utils/map";
  import { initLinks } from "@/utils/layers";

  const toGeoJsonPoint = (latlng, title) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: latlng,
      },
      properties: {
        title,
      },
    };
  };

  export default {
    name: "BaseMap",
    components: { MyButton },
    data() {
      return { map: null, links: [] };
    },
    mounted() {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
      const map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-79.50768189070217, 8.999435903081396],
        zoom: 16,
      });

      this.map = map;

      map.on("load", () => {
        loadImage(
          map,
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          "custom-marker"
        );
        // map.addSource("points", {
        //   type: "geojson",
        //   data: {
        //     type: "FeatureCollection",
        //     features: [
        //       toGeoJsonPoint(
        //         [-79.50168189070217, 8.999435903081396],
        //         "Mapbox DC"
        //       ),
        //       toGeoJsonPoint(
        //         [-79.50768189070217, 8.999435903081396],
        //         "Mapbox SF"
        //       ),
        //     ],
        //   },
        // });

        // // Add a symbol layer
        // map.addLayer({
        //   id: "points",
        //   type: "symbol",
        //   source: "points",
        //   layout: {
        //     "icon-image": "custom-marker",
        //     // get the title name from the source's "title" property
        //     "text-field": ["get", "title"],
        //     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        //     "text-offset": [0, 1.25],
        //     "text-anchor": "top",
        //   },
        // });
        initialLayers.forEach((element) => {
          addLayer(map, element.layerName, element.data);
        });
        const links = initLinks(
          map,
          initialLayers.map((item) => item.layerName)
        );
        this.links = links;
      });
    },
    methods: {
      addMarker(e) {
        const source = this.map.getSource("points");
        const { lat, lng } = this.map.getCenter();
        console.log([lng, lat]);
        source.setData({
          type: "FeatureCollection",
          features: [
            ...source._data.features,
            toGeoJsonPoint([lng, lat], "Mapbox LA"),
          ],
        });
      },
      onLinkClick(e, id) {
        e.preventDefault();
        e.stopPropagation();

        const clickedLayer = this.links.find((item) => item.id === id);
        const clickedId = clickedLayer.textContent;
        const wasActive = clickedLayer.active;

        this.links = this.links.map((item) =>
          item.id === id ? { ...item, active: !wasActive } : item
        );

        this.map.setLayoutProperty(
          clickedId,
          "visibility",
          wasActive ? "none" : "visible"
        );
      },
    },
  };
</script>

<style>
  .basemap {
    width: 100%;
    height: 100%;
  }

  #menu {
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 90px;
    right: 10px;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: "Open Sans", sans-serif;
  }
</style>
