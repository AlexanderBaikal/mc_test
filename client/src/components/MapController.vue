<template>
  <div id="aim">
    <div
      id="aimRect"
      :style="{ width: exportWidth + 'px', height: exportHeight + 'px' }"
    >
      <div id="aimPoint"></div>
    </div>
  </div>
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
      <my-button
        @click="switchExportMenu"
        :border="true"
        :buttonId="'exportmenubutton'"
        >Export</my-button
      >
    </div>
    <add-form
      v-if="isActiveExportMenu"
      :onSubmit="saveScreenshot"
      :submitButtonText="'Export'"
      :textLabel="'Enter width / height'"
    >
      <div class="row-inputs">
        <input
          class="row-input"
          type="number"
          :value="exportWidth"
          @input="setExportWidth"
          min="1"
        />
        <input
          class="row-input"
          type="number"
          :value="exportHeight"
          @input="setExportHeight"
          min="1"
        />
      </div>
    </add-form>
  </div>
</template>
<script>
  import MyButton from "@/components/UI/MyButton.vue";
  import MyControl from "@/components/UI/MyControl.vue";
  import MyInput from "@/components/UI/MyInput.vue";
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
      MyInput,
      LayerController,
      AddController,
      TextForm,
      IconForm,
      MyControl,
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
      setExportWidth(e) {
        this.exportWidth = Math.min(e.target.value, this.windowWidth - 20);
      },
      setExportHeight(e) {
        console.log(e.target.value);
        this.exportHeight = Math.min(e.target.value, this.windowHeight - 20);
      },
      saveScreenshot() {
        const captureElement = document.querySelector("#mapContainer");
        html2canvas(captureElement, {
          width: this.exportWidth,
          height: this.exportHeight,
          x: (window.innerWidth - this.exportWidth) / 2,
          y: (window.innerHeight - this.exportHeight) / 2,
        })
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
      onResize() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
      },
    },
    watch: {
      windowHeight(newHeight, oldHeight) {
        // if (newHeight !== oldHeight)
        console.log(newHeight);
        this.exportHeight = Math.min(this.exportHeight, newHeight - 20);
      },
      windowWidth(newWidth, oldWidth) {
        // if (newWidth !== oldWidth)
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
  };
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

  .row-inputs {
    display: flex;
    justify-content: space-between;
  }
  .row-input {
    width: calc(50% - 2.5px);
    margin: 10px 0;
    box-sizing: border-box;
  }
  #aim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  #aimRect {
    border: 1px solid black;
    /* width: 300px;
    height: 300px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #aimPoint {
    background-color: black;
    width: 3px;
    height: 3px;
  }
</style>
