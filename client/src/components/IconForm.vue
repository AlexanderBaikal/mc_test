<template>
  <add-form
    :onSubmit="onAddMarker"
    :submitButtonText="`Apply`"
    :textLabel="`Enter text`"
  >
    <my-input v-model="textInput" />
    <div class="add-icon-label">Choose Icon</div>
    <img
      v-for="iconImage in iconImages"
      :key="iconImage.name"
      :src="iconImage.data"
      class="image-icon-button"
      @click="setActiveIcon(iconImage.name)"
      :class="{ active: activeIcon === iconImage.name }"
    />
  </add-form>
</template>
<script>
  import MyButton from "@/components/UI/MyButton";
  import MyInput from "@/components/UI/MyInput";
  import AddForm from "@/components/UI/AddForm";
  import { addMarker, addTextLabel } from "@/utils/layers";
  import { mapState } from "vuex";
  import flagMarker from "@/assets/flag.png";
  import firMarker from "@/assets/fir.png";
  import mountainMarker from "@/assets/mountain.png";
  import moaiMarker from "@/assets/moai.png";
  import cameraMarker from "@/assets/camera.png";
  import postMarker from "@/assets/post.png";
  import houseMarker from "@/assets/house.png";
  import moneyMarker from "@/assets/money.png";

  export default {
    name: "icon-form",
    components: {
      MyButton,
      AddForm,
      MyInput,
    },
    props: {
      addTextActive: {
        type: Boolean,
        required: true,
      },
      addMarkerActive: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        textInput: "",
        activeIcon: -1,
        iconImages: [
          { name: "fir-marker", data: firMarker },
          { name: "flag-marker", data: flagMarker },
          { name: "mountain-marker", data: mountainMarker },
          { name: "moai-marker", data: moaiMarker },
          { name: "camera-marker", data: cameraMarker },
          { name: "post-marker", data: postMarker },
          { name: "house-marker", data: houseMarker },
          { name: "money-marker", data: moneyMarker },
        ],
      };
    },
    computed: {
      ...mapState({
        map: (state) => state.map.map,
      }),
    },
    methods: {
      onAddText() {
        const layer = "points";
        addTextLabel(this.map, layer, this.textInput);
        this.$emit("update:addTextActive", false);
        this.textInput = "";
      },
      setActiveIcon(iconImage) {
        if (this.activeIcon !== iconImage) this.activeIcon = iconImage;
        else this.activeIcon = -1;
      },
      onAddMarker() {
        const layer = "points";
        addMarker(this.map, layer, this.textInput, this.activeIcon);
        this.$emit("update:addMarkerActive", false);
        this.textInput = "";
      },
    },
  };
</script>
<style>
  .add-icon-label {
    padding: 10px 0;
    font-size: 14px;
  }

  .image-icon-button {
    width: 20%;
    padding: 5%;
    cursor: pointer;
    border-radius: 20%;
  }

  .image-icon-button.active {
    background-color: #3887be;
  }
</style>
