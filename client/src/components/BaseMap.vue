<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
  import mapboxgl from "mapbox-gl";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import { initialLayers } from "@/consts/initialLayers";
  import { loadImage, addLayer } from "@/utils/map";
  import { initLinks } from "@/utils/layers";

  export default {
    name: "BaseMap",
    data() {
      return {};
    },
    mounted() {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
      const map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-79.50768189070217, 8.999435903081396],
        zoom: 16,
      });
      this.setMap(map);
      map.on("load", () => {
        loadImage(
          map,
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          "custom-marker"
        );
        initialLayers.forEach((element) => {
          console.log(element.layerName, element.data);
          addLayer(map, element.layerName, element.data);
        });
        const links = initLinks(
          map,
          initialLayers.map((item) => item.layerName)
        );
        this.setLinks(links);
      });
      map.on("idle", () => {});
    },
    methods: {
      ...mapMutations({
        setMap: "map/setMap",
        setLinks: "layer/setLinks",
      }),
      ...mapActions({}),
    },
    computed: {
      ...mapState({
        map: (state) => state.map.map,
      }),
      ...mapGetters({}),
    },
  };
</script>

<style>
  .basemap {
    width: 100%;
    height: 100%;
  }
</style>
