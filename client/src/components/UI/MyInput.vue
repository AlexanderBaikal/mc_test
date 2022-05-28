<template>
  <input
    class="add-form-input"
    type="text"
    :value="modelValue"
    @input="updateInput"
  />
</template>
<script>
  export default {
    name: "my-input",
    props: {
      modelValue: {
        type: String,
        required: true,
      },
    },

    methods: {
      updateInput(e) {
        this.$emit("update:modelValue", e.target.value);
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
</style>
