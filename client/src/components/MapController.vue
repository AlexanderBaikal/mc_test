<template>
  <div id="menu">
    <layer-controller />
    <add-controller
      v-model:addMarkerActive="addMarkerActive"
      v-model:addTextActive="addTextActive"
    />
    <text-form v-if="addTextActive" v-model:addTextActive="addTextActive" />
    <icon-form
      v-if="addMarkerActive"
      v-model:addTextActive="addTextActive"
      v-model:addMarkerActive="addMarkerActive"
    />
  </div>
</template>
<script>
  import MyButton from "@/components/UI/MyButton.vue";
  import AddForm from "@/components/UI/AddForm.vue";
  import TextForm from "@/components/TextForm.vue";
  import IconForm from "@/components/IconForm.vue";
  import LayerController from "@/components/LayerController.vue";
  import AddController from "@/components/AddController.vue";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import { addMarker, addTextLabel } from "@/utils/layers";

  export default {
    components: {
      MyButton,
      AddForm,
      LayerController,
      AddController,
      TextForm,
      IconForm,
    },
    data() {
      return {
        textInput: "",
        addMarkerActive: false,
        addTextActive: false,
      };
    },
    computed: {
      ...mapState({
        map: (state) => state.map.map,
        links: (state) => state.layer.links,
      }),
      ...mapGetters({}),
    },
    methods: {},
    watch: {},
  };
</script>
<style lang="css">
  #menu {
    position: absolute;
    z-index: 1;
    top: 90px;
    right: 10px;
  }
</style>
