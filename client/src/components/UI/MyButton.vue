<template>
  <a :class="{ active: active, 'my-button': true }" :href="href" :id="buttonId"
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
    },
  };
</script>
<style lang="css">
  a.my-button {
    font-size: 13px;
    color: #404040;
    display: block;
    margin: 0;
    padding: 0;
    padding: 10px;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    text-align: center;
  }

  a.my-button:last-child {
    border: none;
  }

  a.my-button:hover {
    background-color: #f8f8f8;
    color: #404040;
  }

  a.my-button.active {
    background-color: #3887be;
    color: #ffffff;
  }

  a.my-button.active:hover {
    background: #3074a4;
  }
</style>
