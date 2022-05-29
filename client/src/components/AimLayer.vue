<template>
  <div id="aim">
    <div
      id="aimRect"
      :style="{ width: exportWidth + 'px', height: exportHeight + 'px' }"
    >
      <div id="aimPoint"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "aim-layer",
    props: {
      exportWidth: {
        type: Number,
        required: true,
      },
      exportHeight: {
        type: Number,
        required: true,
      },
    },
  };
</script>
<style>
  #aim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  #aimRect {
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #aimPoint {
    background-color: black;
    width: 3px;
    height: 3px;
  }
</style>
