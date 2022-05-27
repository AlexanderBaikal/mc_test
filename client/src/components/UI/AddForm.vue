<template>
  <div className="add-from">
    <div className="add-text-label">{{ textLabel }}</div>
    <input className="add-from-input" type="text" v-model="textInput" />
    <slot></slot>
    <my-button @click="onSubmit" :buttonId="'apply'">{{
      submitButtonText
    }}</my-button>
  </div>
</template>
<script>
  import MyButton from "./MyButton.vue";
  export default {
    components: [MyButton],
    name: "add-form",
    props: {
      textLabel: { type: String, required: true },
      submitButtonText: { type: String, required: true },
      onSubmit: { type: Function, required: true },
    },
    data() {
      return {};
    },
  };
</script>
<style lang="css">
  .add-from-input {
    width: calc(100% - 20px);
  }
  .add-from {
    background: #fff;
    margin-top: 20px;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: "Open Sans", sans-serif;
    padding: 10px;
  }
  .add-text-label {
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
</style>
