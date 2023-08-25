<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style>
#app {
  position: fixed;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
body {
  margin: 0;
}
* {
  border-radius: 3px;
  box-sizing: border-box;
}
button {
  border: 1px solid #999;
}
</style>
