<template>
  <div class="dashboard-viewer">
    <div>
      <el-button round type="primary" @click="onClickBack">
        <el-icon><Back /></el-icon>
        Back
      </el-button>
    </div>

    <h2>
      {{ dashboardData.title }}
    </h2>
    <div v-for="component in components" :key="component.id" class="block">
      <Vue3DraggableResizable
        :initW="component.w"
        :initH="component.h"
        v-model:x="component.x"
        v-model:y="component.y"
        v-model:w="component.w"
        v-model:h="component.h"
        :draggable="false"
        :resizable="false"
      >
        <el-card shadow="never" class="component-wrapper">
          <h3 class="heading">{{ component.title }}</h3>
          <component
            :key="component.id"
            :is="getComponentName(component.name)"
            :id="component.id"
          />
        </el-card>
      </Vue3DraggableResizable>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useGraphStore } from "../store";
import { useRoute, useRouter } from "vue-router";
import BarChart from "../components/2D/BarChart.vue";
import AreaChart from "../components/2D/AreaChart.vue";
import StatisticCard from "../components/2D/StatisticCard.vue";
import Table from "../components/2D/tables/SimpleTable.vue";

const route = useRoute();
const router = useRouter();
const store = useGraphStore();
const dashboardListData = computed(() => store.getDashboardItemList);
const dashboardData = ref({});
const components = ref({});

onMounted(() => {
  fetchDashboard();
});

const fetchDashboard = () => {
  let dashboards = localStorage.getItem("dashboards");
  if (dashboards) {
    dashboards = JSON.parse(dashboards);
  }
  dashboardData.value = dashboards.find(
    (dashboard) => dashboard.dashboardId === route.params.id
  );
  components.value = dashboardData.value?.components;

  store.setNewDashboardItems(components.value);
};

const getComponentName = (name) => {
  let component;
  console.log(name.toLowerCase())
  switch (name.toLowerCase()) {
    case "barchart":
      component = BarChart;
      break;
    case "statistic":
      component = StatisticCard;
      break;
    case "table":
      component = Table;
      break;
    default:
      component = BarChart;
  }
  return component;
};

const onClickBack = () => {
  router.go(-1);
};
</script>
<style scoped>
.block {
  position: relative;
}
.container {
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
}
.heading {
  padding-left: 1rem;
}
</style>