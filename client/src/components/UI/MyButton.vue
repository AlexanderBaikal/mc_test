<template>
  <a
    :class="{ active: active, 'my-button': true, border: border }"
    :href="href"
    :id="buttonId"
    ><slot></slot
  ></a>
</template>
<script>
  export default {
    name: "my-button",
    props: {
      buttonId: {
        type: String,
        required: true,
      },
      href: {
        type: String,
        default: "#",
      },
      active: {
        type: Boolean,
        default: false,
      },
      border: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
<style lang="css">
  .my-button {
    font-size: 13px;
    color: #404040;
    display: block;
    margin: 0;
    padding: 10px;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    text-align: center;
    background-color: #ffffff;
  }

  .my-button:last-child {
    border: none;
  }

  .my-button:hover {
    background-color: #f8f8f8;
    color: #404040;
  }

  .my-button.active {
    background-color: #4caf50;
    color: #ffffff;
  }

  .my-button.active:hover {
    background: #388e3c;
  }
  .my-button.border {
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
</style>
