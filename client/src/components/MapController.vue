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
    <div class="save-btn">
      <my-button @click="saveScreenshot">Save Screenshot</my-button>
    </div>
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
  import html2canvas from "html2canvas";

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
    methods: {
      saveScreenshot() {
        const captureElement = document.querySelector("#mapContainer");
        html2canvas(captureElement)
          .then((canvas) => {
            canvas.style.display = "none";
            document.body.appendChild(canvas);
            return canvas;
          })
          .then((canvas) => {
            const image = canvas
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream");
            const a = document.createElement("a");
            a.setAttribute("download", "my-image.png");
            a.setAttribute("href", image);
            a.click();
            canvas.remove();
          });
      },
    },
    watch: {},
  };
</script>
<style lang="css">
  #menu {
    position: absolute;
    z-index: 1;
    top: 90px;
    right: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap-reverse;
    max-height: calc(100vh - 140px);
  }
  .save-btn {
    background: #fff;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: "Open Sans", sans-serif;
    padding: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
</style>
