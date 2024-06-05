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
  width: 70vw;
  height: 100vh;
  margin: auto;
  padding: 1rem;
  margin-top: 2rem;
  overflow-y: scroll;
  position: relative;
  background:
    conic-gradient(from 90deg at 0.5px 0.5px,#09070700 90deg,rgb(218, 218, 218) 0) 
    0 0/25px 25px;
}
</style>