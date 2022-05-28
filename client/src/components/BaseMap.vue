<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
  import mapboxgl from "mapbox-gl";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import { extraLayers, initialLayers } from "@/consts/initialLayers";
  import { loadImage, addLayer } from "@/utils/map";
  import { initLinks } from "@/utils/layers";
  import flagMarker from "@/assets/flag.png";
  import firMarker from "@/assets/fir.png";
  import mountainMarker from "@/assets/mountain.png";
  import moaiMarker from "@/assets/moai.png";

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
        preserveDrawingBuffer: true,
      });
      this.setMap(map);
      map.on("load", async () => {
        const images = [
          { name: "fir-marker", data: firMarker },
          { name: "flag-marker", data: flagMarker },
          { name: "mountain-marker", data: mountainMarker },
          { name: "moai-marker", data: moaiMarker },
        ];
        const imageLoading = Promise.all(
          images.map((img) => loadImage(map, img.data, img.name))
        );
        await imageLoading;
        initialLayers.forEach((element) => {
          addLayer(map, element.layerName, element.data, true);
        });
        const links = initLinks(map, [
          ...initialLayers.map((item) => item.layerName),
          ...extraLayers,
        ]);
        this.setLinks(links);
      });

      map.on("idle", () => {
        // console.log(map.listImages());
        // console.log(map.getStyle().layers);
      });
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
