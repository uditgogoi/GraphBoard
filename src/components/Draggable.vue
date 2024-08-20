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
      @resizing="onResize"
      @drag-end="onDrag"
      @resize-end="onChangeDimension"
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
                    >Data Setting</el-dropdown-item
                  >
                  <el-dropdown-item command="edit">Edit Style</el-dropdown-item>
                  <el-dropdown-item command="clone">Clone</el-dropdown-item>
                  <el-dropdown-item command="remove">Remove</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <component
          :key="props.component.id"
          :is="getComponentName"
          :ready="graphDataLoaded"
          :id="props.component.id"
        ></component>
      </el-card>
    </Vue3DraggableResizable>
    <component
      :is="popupComponent"
      v-if="showAddNewData"
      @close="onClose"
      @submit="onSubmit"
      :id="props.component.id"
    />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import BarChart from "./2D/BarChart.vue";
import AreaChart from "./2D/AreaChart.vue";
import StatisticCard from "./2D/StatisticCard.vue";
import Table from "./2D/tables/SimpleTable.vue";
import PopulateBarData from "./modal/populateBarData.vue";
import { useGraphStore } from "../store";
import { uniqueID } from "../utils/helper";
import PopulateStatisticData from "./modal/PopulateStatisticData.vue";
import PopulateTableData from "./modal/PopulateTableData.vue";

const props = defineProps(["component"]);
const store = useGraphStore();
const dashboardList = computed(() => store.getDashboardItemList);
const showAddNewData = ref(false);
const graphDataLoaded = ref(false);
const xValue = ref(100);
const yValue = ref(112);
const popupComponent = ref(null);
const cardTitle = computed(
  () => dashboardList.value.find((item) => item.id === props.component.id).title
);
const print = (val) => {
  // console.log(val);
};

onMounted(() => {
  if (props.component.type === "graph") fetchGraphData();
});

const fetchGraphData = async () => {
  if (props.component.name === "BarChart") {
    const componentItemDataList = dashboardList.value;
    // for(let i=0; i< componentItemDataList.length; i++) {
    //   if(componentItemDataList[i].id=== props.component.id) {
    //     // componentItemDataList[i].itemData= JSON.parse(JSON.stringify(defaultBarChartValues));
    //     componentItemDataList[i].itemData= {};
    //   }
    // }
    store.setNewDashboardItems(componentItemDataList);
  }
  graphDataLoaded.value = true;
};

const handleCommand = (e) => {
  if (e === "populate") {
    showAddNewData.value = true;
    popupComponent.value = getPopupComponent();
  } else if (e === "edit") {
    // current
  } else if (e === "clone") {
    // clone the current
    cloneCurrentComponent();
  } else {
    const componentList = store.getDashboardItemList.filter(
      (item) => item.id != props.component.id
    );
    store.setNewDashboardItems(componentList);
  }
};

const getPopupComponent = () => {
  if (props.component.subType === "bargraph") {
    return PopulateBarData;
  }
  if (props.component.subType === "simple-statistic") {
    return PopulateStatisticData;
  }
  if(props.component.type==='table') {
    return PopulateTableData;
  }
  console.log(props.component)
};

const onClose = () => {
  showAddNewData.value = false;
  graphDataLoaded.value = true;
};

const onSubmit = () => {
  graphDataLoaded.value = false;
  showAddNewData.value = false;
  setTimeout(() => {
    onClose();
  }, 1000);
};

const getComponentName = computed(() => {
  if (props.component.type === "statistic") {
    return StatisticCard;
  }
  if (props.component.type === "table") {
    return Table;
  }
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

const cloneCurrentComponent = () => {
  const componentList = store.getDashboardItemList;
  const componentToCopy = componentList.find(
    (component) => component.id === props.component.id
  );
  const newComponent = JSON.parse(JSON.stringify(componentToCopy));
  newComponent.id = uniqueID();
  componentList.push(newComponent);
  store.setNewDashboardItems(componentList);
};

const onResize = (value) => {
  const componentList = store.getDashboardItemList;
  const currentComponent = componentList.find(
    (component) => component.id === props.component.id
  );
  if (currentComponent) {
    currentComponent.w = value.w;
    currentComponent.h = value.h;
    store.setNewDashboardItems(componentList);
  }
};

const onDrag = (value) => {
  const componentList = store.getDashboardItemList;
  const currentComponent = componentList.find(
    (component) => component.id === props.component.id
  );
  if (currentComponent) {
    currentComponent.x = value.x;
    currentComponent.y = value.y;
  }
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