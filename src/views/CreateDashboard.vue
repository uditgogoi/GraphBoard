<template>
  <div>
    <el-row class="dashboard-options">
      <el-col :span="4">
        <el-menu
          :default-active="activeIndex"
          class="no-horizontal-line"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-sub-menu index="1">
            <template #title>Add Elements</template>
            <el-sub-menu index="graph">
              <template #title>Chart</template>
              <el-menu-item index="bar">Bar</el-menu-item>
              <el-menu-item index="line" disabled
                >Line (coming soon)</el-menu-item
              >
              <el-menu-item index="area" disabled
                >Area (coming soon)</el-menu-item
              >
              <el-menu-item index="pie" disabled
                >Pie (coming soon)</el-menu-item
              >
              <el-menu-item index="scatterplot" disabled
                >Scatterplot (coming soon)</el-menu-item
              >
              <el-menu-item index="mixed" disabled
                >Mixed (coming soon)</el-menu-item
              >
            </el-sub-menu>
            <el-menu-item index="box">Statistic card</el-menu-item>
            <el-menu-item index="table">Table</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" plain @click="onClickSaveDashboard"
          >Save dashboard</el-button
        >
      </el-col>
    </el-row>

    <div class="content">
      <Playground />
    </div>
    <SaveDashboardModal
      v-if="showSaveDashboard"
      @close="showSaveDashboard = false"
      @onSubmit="onSubmitDashboard"
    />
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Playground from "../components/Playground.vue";
import { uniqueID } from "../utils/helper";
import { BarItem, StatisticItem, TableItem } from "../Model/Item";
import SaveDashboardModal from "../components/modal/SaveDashboardModal.vue";
import { useGraphStore } from "../store";
import { ElMessage } from "element-plus";

const components = computed(() => store.getDashboardItemList);
const store = useGraphStore();
const showSaveDashboard = ref(false);
const dashboardListData = computed(() => store.getDashboardItemList);

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
  (newComponent.itemData = []),
    store.setNewDashboardItems([...components.value, newComponent]);
};

const onClickSaveDashboard = () => {
  const dashboardList = dashboardListData.value;
  if (!dashboardList || dashboardList.length === 0) {
    notification({
      msg:'No dashboard items found',
      type:'danger'
    })
    return;
  }
  showSaveDashboard.value=true;
};

const onSubmitDashboard = (value) => {
  const dashboardList = dashboardListData.value;
  const newDashboard = {
    ...value,
    components: dashboardList,
  };
  let dashboards= localStorage.getItem('dashboards');
  if(dashboards) {
    dashboards= JSON.parse(dashboards);
    dashboards.push(newDashboard);
  }
  else {
    dashboards=[newDashboard];
  }
  localStorage.setItem("dashboards", JSON.stringify(dashboards));
  showSaveDashboard.value = false;
};

const notification = (notice) => {
  ElMessage({
    message: notice.msg,
    type: notice.type,
  });
};
</script>
<style scoped>
.dashboard-options {
  width: 100%;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid rgb(197, 195, 195); */
}
.el-menu--horizontal.el-menu {
  border-bottom: none;
}
</style>../model/Item