<template>
  <nav id="menu">
    <my-button
      v-for="link in links"
      :key="link.id"
      @click="onShowLayer($event, link.id)"
      :buttonId="link.id"
      :active="link.active"
      >{{ link.textContent }}</my-button
    >
    <my-button @click="onAddMarker('points', 'NEW')" :buttonId="'add marker'">{{
      "Add Marker"
    }}</my-button>
  </nav>
</template>
<script>
  import MyButton from "@/components/UI/MyButton.vue";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import { addMarker } from "@/utils/layers";
  export default {
    setup(props) {},
    components: { MyButton },
    computed: {
      ...mapState({
        map: (state) => state.map.map,
        links: (state) => state.layer.links,
      }),
      ...mapGetters({}),
    },
    methods: {
      ...mapActions({
        showLayer: "layer/showLayer",
      }),
      ...mapMutations({
        changeVisibility: "layer/changeVisibility",
      }),
      onAddMarker(layer, title) {
        addMarker(this.map, layer, title);
      },
      onShowLayer(e, id) {
        e.preventDefault();
        e.stopPropagation();
        const clickedLayer = this.links.find((item) => item.id === id);
        const clickedId = clickedLayer.textContent;
        const wasActive = clickedLayer.active;
        this.changeVisibility(id);
        this.map.setLayoutProperty(
          clickedId,
          "visibility",
          wasActive ? "none" : "visible"
        );
      },
    },
    watch: {},
  };
</script>
<style lang="css">
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
