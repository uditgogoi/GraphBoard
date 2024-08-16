<template>
  <div>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-sub-menu index="1">
          <template #title>Add Elements</template>
          <el-sub-menu index="graph">
            <template #title>Chart</template>
            <el-menu-item index="bar">Bar</el-menu-item>
            <el-menu-item index="line">Line</el-menu-item>
            <el-menu-item index="area">Area</el-menu-item>
            <el-menu-item index="pie">Pie</el-menu-item>
            <el-menu-item index="scatterplot">Scatterplot</el-menu-item>
            <el-menu-item index="mixed">Mixed</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="box">Box</el-menu-item>
          <el-menu-item index="table">Table</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="content">
      <Playground />
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Playground from "../components/Playground.vue";
import { uniqueID } from "../utils/helper";
import { BarItem, StatisticItem, TableItem } from "../Model/Item";
import { useGraphStore } from "../store";

const components = computed(() => store.getDashboardItemList);
const store = useGraphStore();
const handleSelect = (e) => {
  if (e === "box") {
    addBox();
    return;
  }
  if (e === "table") {
    addTable();
    return;
  }
  addGraph(e);
};

const addGraph = (type) => {
  const newComponent = JSON.parse(JSON.stringify(BarItem));
  newComponent.id = uniqueID();
  newComponent.title = getGraphComponent(type);
  newComponent.name = getGraphComponent(type);
  newComponent.section = type;
  newComponent.type = "graph";
  newComponent.subType = "bargraph";
  store.setNewDashboardItems([...components.value, newComponent]);
};

const getGraphComponent = (type) => {
  return `${type[0].toUpperCase() + type.substring(1)}Chart`;
};

const addBox = () => {
  const newComponent = JSON.parse(JSON.stringify(StatisticItem));
  newComponent.id = uniqueID();
  newComponent.title = `Demo Statistic`;
  newComponent.name = `Number`;
  newComponent.type = `statistic`;
  newComponent.subType = `simple-statistic`;
  store.setNewDashboardItems([...components.value, newComponent]);
};

const addTable = () => {
  const newComponent = JSON.parse(JSON.stringify(TableItem));
  newComponent.id = uniqueID();
  newComponent.title = `Demo Table`;
  newComponent.name = `Table`;
  newComponent.type = `table`;
  newComponent.itemData=[],
  store.setNewDashboardItems([...components.value, newComponent]);
};
</script>