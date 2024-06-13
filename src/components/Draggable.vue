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
      @drag-end="onDragEnd"
      @resize-end="print('resize-end')"
      classNameHandle="my-handle"
    >
      <el-card shadow="never" class="component-wrapper">
        <template #header>
          <div class="card-header">
            <span>{{ cardTitle }}</span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-icon><More /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu @select="onSelectMenu">
                  <el-dropdown-item command="populate"
                    >Populate Data</el-dropdown-item
                  >
                  <el-dropdown-item command="edit">Edit Style</el-dropdown-item>
                  <el-dropdown-item command="remove">Remove</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>

        <component
          :key="props.component.id"
          :is="getComponentName"
          v-if="graphDataLoaded"
          :id="props.component.id"
        ></component>
      </el-card>
    </Vue3DraggableResizable>
    <PopulateBarData
      v-if="showAddNewData"
      @close="onClose"
      :id="props.component.id"
    />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import BarChart from "./2D/BarChart.vue";
import AreaChart from "./2D/AreaChart.vue";
import PopulateBarData from "./modal/populateBarData.vue";
import { defaultBarChartValues } from "../Model/Charts";
import { useGraphStore } from "../store";

const props = defineProps(["component"]);
const store= useGraphStore();
const dashboardList= computed(()=> store.getDashboardItemList);
const showAddNewData = ref(false);
const graphDataLoaded = ref(false);
const xValue = ref(100);
const yValue = ref(112);
const cardTitle = computed(()=> dashboardList.value.find(item=> item.id=== props.component.id).title);
const print = (val) => {
  // console.log(val);
};

onMounted(() => {
  fetchGraphData();
});

const fetchGraphData = async () => {
  if (props.component.name === "BarChart") {
    const componentItemDataList= dashboardList.value;
    for(let i=0; i< componentItemDataList.length; i++) {
      if(componentItemDataList[i].id=== props.component.id) {
        componentItemDataList[i].itemData= JSON.parse(JSON.stringify(defaultBarChartValues));
      }
    }
    store.setNewDashboardItems(componentItemDataList);
  }
  graphDataLoaded.value=true;
};

const handleCommand = (e) => {
  if (e === "populate") {
    showAddNewData.value = true;
  } else if (e === "edit") {
  } else {
    const componentList= store.getDashboardItemList.filter(item=> item.id!= props.component.id);
    store.setNewDashboardItems(componentList);
  }
};

const onClose = () => {
  showAddNewData.value = false;
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



const onDragEnd = (obj, id) => {
  // console.log(obj, id);
};
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