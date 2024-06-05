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
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-icon><More /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu @select="onSelectMenu">
                  <el-dropdown-item command="add">Add data</el-dropdown-item>
                  <el-dropdown-item command="edit">Edit Style</el-dropdown-item>
                  <el-dropdown-item command="remove">Remove</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>

        <component :is="getComponentName"></component
      ></el-card>
    </Vue3DraggableResizable>
    <AddNewData v-if="showAddNewData" @close="onClose"/>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import BarChart from "./2D/BarChart.vue";
import AreaChart from "./2D/AreaChart.vue";
import AddNewData from "./modal/AddNewData.vue";

const props = defineProps(["component"]);
const showAddNewData= ref(false);
const xValue = ref(100);
const yValue = ref(112);
const print = (val) => {
  console.log(val);
};

const handleCommand = (e) => {
  console.log(e);
  if(e==='add') {
    showAddNewData.value=true;
  }
  else if(e==='edit') {

  } else {

  }
};

const onClose=()=> {
  showAddNewData.value=false;
}

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
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>