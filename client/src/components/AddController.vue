<template>
  <div id="addButtons">
    <my-button
      @click="openMarkerSettings"
      :buttonId="'add marker'"
      :active="addMarkerActive"
      >{{ "Add Marker" }}</my-button
    >
    <my-button
      @click="openTextSettings"
      :buttonId="'add text'"
      :active="addTextActive"
      >{{ "Add Text" }}</my-button
    >
  </div>
</template>
<script>
  import MyButton from "@/components/UI/MyButton";

  export default {
    name: "add-controller",
    components: {
      MyButton,
    },
    props: {
      addMarkerActive: { type: Boolean, required: true },
      addTextActive: { type: Boolean, required: true },
    },
    methods: {
      openMarkerSettings() {
        this.$emit("update:addMarkerActive", !this.addMarkerActive);
      },
      openTextSettings() {
        this.$emit("update:addTextActive", !this.addTextActive);
      },
    },
  };
</script>
<style>
  #addButtons {
    background: #fff;
    margin-bottom: 20px;
    margin-left: 20px;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: "Open Sans", sans-serif;
    padding: 10px;
  }
</style>
