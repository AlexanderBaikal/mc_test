<template>
  <div v-if="links.length" id="layers">
    <my-button
      v-for="link in links"
      :key="link.id"
      @click="onShowLayer($event, link.id)"
      :buttonId="link.id"
      :active="link.active"
      >{{ link.textContent }}</my-button
    >
    <!-- <my-button v-for="layer in extraLayers" :key="layer"       :buttonId="layer"
      :active="link.active">{{layer}}</my-button> -->
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import MyButton from "@/components/UI/MyButton";
  import { extraLayers, initialLayers } from "@/consts/initialLayers";
  export default {
    name: "layer-controller",
    props: {},
    components: {
      MyButton,
    },
    computed: {
      ...mapState({
        map: (state) => state.map.map,
        links: (state) => state.layer.links,
      }),
    },
    methods: {
      ...mapMutations({
        changeVisibility: "layer/changeVisibility",
      }),
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
  };
</script>
<style>
  #layers {
    background: #fff;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
</style>
