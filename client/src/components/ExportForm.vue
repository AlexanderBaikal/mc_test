<template>
  <add-form
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
</template>
<script>
  import AddForm from "@/components/UI/AddForm.vue";
  import { downloadImage } from "@/utils/canvas";
  export default {
    name: "export-form",
    components: {
      AddForm,
    },
    props: {
      exportWidth: {
        type: Number,
        required: true,
      },
      exportHeight: {
        type: Number,
        required: true,
      },
      windowWidth: {
        type: Number,
        required: true,
      },
      windowHeight: {
        type: Number,
        required: true,
      },
    },
    methods: {
      setExportWidth(e) {
        const newExportWidth = Math.min(e.target.value, this.windowWidth - 20);
        this.$emit("update:exportWidth", newExportWidth);
      },
      setExportHeight(e) {
        const newExportHeight = Math.min(
          e.target.value,
          this.windowHeight - 20
        );
        this.$emit("update:exportHeight", newExportHeight);
      },
      saveScreenshot() {
        const captureElement = document.querySelector("#mapContainer");
        const width = this.exportWidth;
        const height = this.exportHeight;
        const x = (window.innerWidth - this.exportWidth) / 2;
        const y = (window.innerHeight - this.exportHeight) / 2;
        downloadImage(captureElement, width, height, x, y);
      },
    },
  };
</script>
<style>
  .row-inputs {
    display: flex;
    justify-content: space-between;
  }
  .row-input {
    width: calc(50% - 2.5px);
    margin: 10px 0;
    box-sizing: border-box;
  }
</style>
