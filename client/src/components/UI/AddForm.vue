<template>
  <my-control>
    <div className="add-text-label">{{ textLabel }}</div>
    <slot></slot>
    <my-button @click="onSubmit" :buttonId="'apply'">{{
      submitButtonText
    }}</my-button>
  </my-control>
</template>

<script>
  import MyButton from "./MyButton.vue";
  import MyControl from "./MyControl.vue";
  export default {
    components: { MyButton, MyControl },
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
  .add-text-label {
    font-size: 14px;
  }

  #apply {
    border-width: 1px;
    border-style: solid;
  }
</style>
