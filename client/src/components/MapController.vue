<template>
  <div id="menu">
    <!-- <div id="aim">+</div> -->
    <div v-if="links.length" id="layers">
      <my-button
        v-for="link in links"
        :key="link.id"
        @click="onShowLayer($event, link.id)"
        :buttonId="link.id"
        :active="link.active"
        >{{ link.textContent }}</my-button
      >
    </div>
    <div id="addButtons">
      <my-button
        @click="openMarkerSettings"
        :buttonId="'add marker'"
        :active="addMarkerActive"
        >{{ "Add Marker" }}</my-button
      >
      <my-button @click="openTextSettings" :buttonId="'add text'">{{
        "Add Text"
      }}</my-button>
    </div>

    <add-form
      v-if="true"
      :onSubmit="onAddText('points')"
      :submitButtonText="'Apply'"
      :textLabel="'Enter text'"
    >
    </add-form>

    <div v-if="addMarkerActive" id="markerInput">
      <div id="addTextLabel">Enter label</div>
      <input style="width: calc(100% - 20px)" type="text" v-model="textInput" />
      <div id="addIconLabel">Choose Icon</div>
      <img
        v-for="iconImage in iconImages"
        :key="iconImage.name"
        :src="iconImage.data"
        class="imageIconButton"
        @click="setActiveIcon(iconImage.name)"
        :class="{ active: activeIcon === iconImage.name }"
      />
      <my-button @click="onAddMarker('points', 'NEW')" :buttonId="'apply'">{{
        "Apply"
      }}</my-button>
    </div>
    <div v-if="addTextActive" id="markerInput">
      <div id="addTextLabel">Enter label</div>
      <input style="width: calc(100% - 20px)" type="text" v-model="textInput" />
      <my-button @click="onAddText('points')" :buttonId="'apply'">{{
        "Apply"
      }}</my-button>
    </div>
  </div>
</template>
<script>
  import MyButton from "@/components/UI/MyButton.vue";
  import AddForm from "@/components/UI/AddForm.vue";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import { addMarker, addTextLabel } from "@/utils/layers";
  import flagMarker from "@/assets/flag.png";
  import firMarker from "@/assets/fir.png";
  import mountainMarker from "@/assets/mountain.png";
  import moaiMarker from "@/assets/moai.png";
  export default {
    components: { MyButton, AddForm },
    data() {
      return {
        textInput: "",
        activeIcon: -1,
        iconImages: [
          { name: "flag-marker", data: flagMarker },
          { name: "fir-marker", data: firMarker },
          { name: "mountain-marker", data: mountainMarker },
          { name: "moai-marker", data: moaiMarker },
        ],
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
      ...mapActions({
        showLayer: "layer/showLayer",
      }),
      ...mapMutations({
        changeVisibility: "layer/changeVisibility",
      }),
      onAddMarker(layer) {
        this.addMarkerActive = false;
        addMarker(this.map, layer, this.textInput, this.activeIcon);
        this.textInput = "";
      },
      openMarkerSettings() {
        this.addMarkerActive = true;
      },
      openTextSettings() {
        this.addTextActive = true;
      },
      onAddText(layer) {
        this.addTextActive = false;
        addTextLabel(this.map, layer, this.textInput);
        this.textInput = "";
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
      setActiveIcon(iconImage) {
        if (this.activeIcon !== iconImage) this.activeIcon = iconImage;
        else this.activeIcon = -1;
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
  }
  #layers {
    background: #fff;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: "Open Sans", sans-serif;
    padding: 10px;
  }
  #addButtons {
    background: #fff;
    margin-top: 20px;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: "Open Sans", sans-serif;
    padding: 10px;
  }
  #markerInput {
    background: #fff;
    margin-top: 20px;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: "Open Sans", sans-serif;
    padding: 10px;
  }
  #addTextLabel {
    padding-bottom: 10px;
    font-size: 14px;
  }
  #addIconLabel {
    padding: 10px 0;
    font-size: 14px;
  }
  .imageIconButton {
    width: 20%;
    padding: 5%;
    cursor: pointer;
    border-radius: 20%;
  }
  .imageIconButton.active {
    background-color: #3887be;
  }
  #apply {
    border-width: 1px;
    border-style: solid;
  }
  /* #aim {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
</style>
