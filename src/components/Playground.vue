<template>
  <div class="playground">
    <div v-if="componentsList.length>0">
      <div v-for="component in componentsList" :key="component.id">
        <Draggable :component="component" :key="component.id"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import Draggable from "./Draggable.vue";
import { useGraphStore } from "../store";
import { computed, reactive, ref } from "vue";

const store = useGraphStore();
const props = defineProps(["components"]);
const componentsList = computed(() => store.getDashboardItemList);
</script>
<style scoped>
.playground {
  width: 95%;
  min-height: 100vh;
  height: auto;
  margin: auto;
  padding: 1rem;
  margin-top: 1rem;
  overflow-y: scroll;
  overflow-x: scroll;
  position: relative;
  background: conic-gradient(
      from 90deg at 0.5px 0.5px,
      #09070700 90deg,
      rgb(184, 184, 184) 0
    )
    0 0/25px 25px;
  background-color: rgb(219, 219, 219);
}
</style>