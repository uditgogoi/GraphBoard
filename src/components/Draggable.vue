<template>
  <div>
    <Vue3DraggableResizable
      :initW="props.component.w"
      :initH="props.component.h"
      v-model:x="xValue"
      v-model:y="yValue"
      v-model:w="props.component.w"
      v-model:h="props.component.h"
      v-model:active="props.component.active"
      :draggable="true"
      :resizable="true"
      @activated="print('activated')"
      @deactivated="print('deactivated')"
      @drag-start="print('drag-start')"
      @resize-start="print('resize-start')"
      @dragging="print('dragging')"
      @resizing="print('resizing')"
      @drag-end="print('drag-end')"
      @resize-end="print('resize-end')"
      classNameHandle="my-handle"
    >
      <el-card shadow="never" class="component-wrapper">
        <component :is="getComponentName"></component
      ></el-card>
    </Vue3DraggableResizable>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import BarChart from "./2D/BarChart.vue";
import AreaChart from "./2D/AreaChart.vue";
const props = defineProps(["component"]);

const xValue = ref(100);
const yValue = ref(112);
const print = (val) => {
  console.log(val);
};

const getComponentName = computed(() => {
  let component = BarChart;
  switch (props.component.name) {
    case "AreaChart":
      component = AreaChart;
      break;
  }
  return component;
});
</script>
<style scoped>
.component-wrapper {
   height: inherit;
}
</style>