<template>
  <add-form
    :onSubmit="onAddMarker"
    :submitButtonText="'Apply'"
    :textLabel="'Enter text'"
  >
    <input className="add-form-input" type="text" v-model="textInput" />
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
  import AddForm from "@/components/UI/AddForm";
  import { addMarker, addTextLabel } from "@/utils/layers";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import flagMarker from "@/assets/flag.png";
  import firMarker from "@/assets/fir.png";
  import mountainMarker from "@/assets/mountain.png";
  import moaiMarker from "@/assets/moai.png";

  export default {
    name: "icon-form",
    components: {
      MyButton,
      AddForm,
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
          { name: "flag-marker", data: flagMarker },
          { name: "fir-marker", data: firMarker },
          { name: "mountain-marker", data: mountainMarker },
          { name: "moai-marker", data: moaiMarker },
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
        this.$emit("update:addTextActive", false);
        const layer = "points";
        addTextLabel(this.map, layer, this.textInput);
        this.textInput = "";
      },
      setActiveIcon(iconImage) {
        if (this.activeIcon !== iconImage) this.activeIcon = iconImage;
        else this.activeIcon = -1;
      },
      onAddMarker() {
        const layer = "points";
        this.$emit("update:addMarkerActive", false);
        addMarker(this.map, layer, this.textInput, this.activeIcon);
        this.textInput = "";
      },
    },
  };
</script>
<style>
  .add-form-input {
    width: 100%;
    box-sizing: border-box;
    margin: 10px 0;
  }
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
