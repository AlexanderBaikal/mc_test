<template>
  <aim-layer
    v-model:exportHeight="exportHeight"
    v-model:exportWidth="exportWidth"
  />
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
    <div class="export-btn">
      <my-button
        @click="switchExportMenu"
        :border="true"
        :active="isActiveExportMenu"
        :buttonId="'exportmenubutton'"
        >Export</my-button
      >
    </div>
    <export-form
      v-if="isActiveExportMenu"
      v-model:windowHeight="windowHeight"
      v-model:windowWidth="windowWidth"
      v-model:exportHeight="exportHeight"
      v-model:exportWidth="exportWidth"
    />
  </div>
</template>
<script>
  import MyButton from "@/components/UI/MyButton.vue";
  import MyControl from "@/components/UI/MyControl.vue";
  import MyInput from "@/components/UI/MyInput.vue";
  import AddForm from "@/components/UI/AddForm.vue";
  import ExportForm from "@/components/ExportForm.vue";
  import TextForm from "@/components/TextForm.vue";
  import IconForm from "@/components/IconForm.vue";
  import AimLayer from "@/components/AimLayer.vue";
  import LayerController from "@/components/LayerController.vue";
  import AddController from "@/components/AddController.vue";
  import { mapState, mapGetters, mapActions, mapMutations, Store } from "vuex";
  import { defineComponent } from "@vue/runtime-core";

  export default defineComponent({
    components: {
      MyButton,
      AddForm,
      MyInput,
      LayerController,
      AddController,
      TextForm,
      IconForm,
      MyControl,
      ExportForm,
      AimLayer,
    },
    name: "map-controller",
    data() {
      return {
        textInput: "",
        addMarkerActive: false,
        addTextActive: false,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        exportWidth: Math.min(600, window.innerWidth - 20),
        exportHeight: Math.min(400, window.innerHeight - 20),
        isActiveExportMenu: false,
      };
    },
    computed: {
      ...mapState({
        map: (state) => state.map.map,
        links: (state) => state.layer.links,
      }),
      ...mapGetters({}),
    },
    methods: {
      switchExportMenu() {
        this.isActiveExportMenu = !this.isActiveExportMenu;
      },
      onResize() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
      },
    },
    watch: {
      windowHeight(newHeight, oldHeight) {
        if (newHeight !== oldHeight)
          this.exportHeight = Math.min(this.exportHeight, newHeight - 20);
      },
      windowWidth(newWidth, oldWidth) {
        if (newWidth !== oldWidth)
          this.exportWidth = Math.min(this.exportWidth, newWidth - 20);
      },
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener("resize", this.onResize);
      });
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResize);
    },
  });
</script>
<style lang="css">
  #menu {
    position: absolute;
    z-index: 2001;
    top: 90px;
    right: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap-reverse;
    max-height: calc(100vh - 140px);
  }
  .export-btn {
    background: #fff;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
</style>
