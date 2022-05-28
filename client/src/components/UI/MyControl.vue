<template>
  <div className="control">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "my-control",
  };
</script>
<style>
  .control {
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
