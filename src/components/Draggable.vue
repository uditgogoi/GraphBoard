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
            <span>{{ cardTitle }}</span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-icon><More /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu @select="onSelectMenu">
                  <el-dropdown-item command="populate">Populate Data</el-dropdown-item>
                  <el-dropdown-item command="edit">Edit Style</el-dropdown-item>
                  <el-dropdown-item command="remove">Remove</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>

        <component :is="getComponentName" :graphData="chartData" v-if="graphDataLoaded"></component
      ></el-card>
    </Vue3DraggableResizable>
    <PopulateBarData v-if="showAddNewData" @close="onClose" :data="populateDataProp" @change="onChangeGraphData"/>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import BarChart from "./2D/BarChart.vue";
import AreaChart from "./2D/AreaChart.vue";
import PopulateBarData from "./modal/populateBarData.vue";
import {defaultBarChartValues} from '../Model/BarChart';
const props = defineProps(["component"]);

const showAddNewData= ref(false);
const graphDataLoaded= ref(false);
const chartData=ref({});
const xValue = ref(100);
const yValue = ref(112);
const populateDataProp= ref({});
const cardTitle= ref('Car Name')
const print = (val) => {
  console.log(val);
};

onMounted(()=> {
  fetchGraphData();
})

const fetchGraphData=async()=> {
  if(props.component.name=== 'BarChart') {
    chartData.value= defaultBarChartValues;
    
  }
  graphDataLoaded.value=true;
}

const handleCommand = (e) => {
  console.log(e);
  if(e==='populate') {
    showAddNewData.value=true;
    populateDataProp.value=constructGraphData();
  }
  else if(e==='edit') {

  } else {

  }
};

const constructGraphData=()=> {
  return {
    title: cardTitle.value,
    chart: chartData.value
  }
}

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

const onChangeGraphData= (props)=> {
  graphDataLoaded.value=false;
  cardTitle.value= props.title;
  chartData.value.series= props.chart.series?.length? props.chart.series:  chartData.value.series;
  console.log(props)
  graphDataLoaded.value=true;
  onClose();
}
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