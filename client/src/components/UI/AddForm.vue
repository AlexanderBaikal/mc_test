<template>
  <div className="add-form">
    <div className="add-text-label">{{ textLabel }}</div>
    <slot></slot>
    <my-button @click="onSubmit" :buttonId="'apply'">{{
      submitButtonText
    }}</my-button>
  </div>
</template>

<script>
  import MyButton from "./MyButton.vue";
  export default {
    components: { MyButton },
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
  .add-form {
    background: #fff;
    margin-bottom: 20px;
    margin-left: 20px;
    border-radius: 3px;
    width: 120px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-family: "Open Sans", sans-serif;
    padding: 10px;
  }
  .add-text-label {
    font-size: 14px;
  }

  #apply {
    border-width: 1px;
    border-style: solid;
  }
</style>
