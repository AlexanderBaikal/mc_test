<template>
  <div>
    <nav><router-link to="/">Home</router-link></nav>
    <router-view />
  </div>
</template>

<style>
  * {
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    position: relative;
    color: #2c3e50;
  }

  nav {
    padding: 15px;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: flex-end;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    text-decoration: none;
    border: rgba(0, 0, 0, 0.4) 1px solid;
  }

  nav a.router-link-exact-active {
    color: #3887be;
  }
</style>
