<template>
  <div class="home">
    <BaseMap />
    <MapController />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import BaseMap from "@/components/BaseMap.vue";
  import MapController from "@/components/MapController.vue"; // @ is an alias to /src

  export default defineComponent({
    name: "HomeView",
    components: {
      BaseMap,
      MapController,
    },
  });
</script>

<style>
  .home {
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    width: 100vw;
    z-index: -999;
  }
</style>
