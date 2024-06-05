<template>
  <div class="playground">
    <span v-for="(component, key) in components" :key="key">
      <Draggable :component="component" />
    </span>
  </div>
</template>
<script setup>
import Draggable from "./Draggable.vue";
const props = defineProps(["components"]);
</script>
<style scoped>
.playground {
  width: 95%;
  height: 100vh;
  margin: auto;
  padding: 1rem;
  margin-top: 1rem;
  overflow-y: scroll;
  overflow-x: scroll ;
  position: relative;
  background:
    conic-gradient(from 90deg at 0.5px 0.5px,#09070700 90deg,rgb(207, 207, 207) 0) 
    0 0/25px 25px;
    background-color: rgb(253, 252, 248);
}
</style>