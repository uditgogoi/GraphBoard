<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-sub-menu index="1">
        <template #title>Add Elements</template>
        <el-sub-menu index="1-1">
          <template #title>Chart</template>
          <el-menu-item index="bar">Bar</el-menu-item>
          <el-menu-item index="line">Line</el-menu-item>
          <el-menu-item index="area">Area</el-menu-item>
          <el-menu-item index="pie">Pie</el-menu-item>
          <el-menu-item index="scatterplot">Scatterplot</el-menu-item>
          <el-menu-item index="mixed">Mixed</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2-1">Box</el-menu-item>
        <el-menu-item index="3-1">Table</el-menu-item>
      </el-sub-menu>
      <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
      <!-- <el-menu-item index="4">Orders</el-menu-item> -->
    </el-menu>
    <div class="content">
      <Playground/>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Playground from "../components/Playground.vue";
import {uniqueID} from "../utils/helper";
import {Item} from "../Model/Item";
import {useGraphStore} from "../store";

const components=computed(()=> store.getDashboardItemList);
const store= useGraphStore();
const handleSelect = (e) => {
  addGraph(e);
};

const addGraph = (type) => {
  const newComponent= JSON.parse(JSON.stringify(Item))
  newComponent.id= uniqueID();
  newComponent.title= getGraphComponent(type);
  newComponent.name=getGraphComponent(type);
  newComponent.section=type;
  newComponent.type='graph';
  store.setNewDashboardItems([...components.value,newComponent]);
};

const getGraphComponent=(type)=> {
    return `${type[0].toUpperCase() + type.substring(1)}Chart`;
}
</script>