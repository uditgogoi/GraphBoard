<template>
  <div class="dashboard-list">
    <h2 v-if="dashboardList && dashboardList.length > 0">Dashboard List</h2>
    <el-container v-loading="loading" class="loader" v-if="loading" />
    <div v-else>
      <el-row :gutter="20" v-if="dashboardList && dashboardList.length > 0">
        <el-col
          :span="6"
          v-for="dashboard in dashboardList"
          :key="dashboard.dashboardId"
          class="card-col"
        >
          <el-card shadow="always" class="dashboard-card">
            <div class="options">
              <el-button type="info" link>
                <el-icon><CloseBold /></el-icon>
              </el-button>
            </div>
            <p class="dashboard-title">
              <span>{{ dashboard.title }}</span>
              <el-button
                type="primary"
                round
                @click="onShowDashboardViewer(dashboard.dashboardId)"
              >
                View
                <el-icon class="el-icon--right"><Right /></el-icon>
              </el-button>
            </p>
            <!-- <div class="options">
            <el-button type="info" link
              >
              <el-icon><CloseBold /></el-icon>
            </el-button>
          </div>
          <p>{{ dashboard.title }}</p>
          <el-button type="primary" plain @click="onShowDashboardViewer(dashboard.dashboardId)"
            >Show
            <el-icon class="el-icon--right"><Right /></el-icon>
          </el-button> -->
          </el-card>
        </el-col>
      </el-row>
      <el-row v-else class="create-dashboard-wrapper">
        <div>
          <div>
            <p>
              <el-text class="my-5" size="large" type="info">
              No dashboard present
            </el-text>
          </p>
          </div>
          
          <el-button type="primary" :icon="Plus" size="large" @click="onCreateNewDashboard">
            Create new Dashboard
          </el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Right, Plus } from "@element-plus/icons-vue";
const dashboardList = ref([]);
const loading = ref(true);
const router = useRouter();

onMounted(() => {
  fetchDashboardList();
});

const fetchDashboardList = () => {
  let dashboards = localStorage.getItem("dashboards");
  if (dashboards) {
    dashboards = JSON.parse(dashboards);
  }
  dashboardList.value = dashboards;

  //   console.log("=====",store.getDashboardItemList)
  loading.value = false;
};
const onShowDashboardViewer = (id) => {
  router.push({ name: "Dashboard-viewer", params: { id: id } });
};

const onCreateNewDashboard=()=> {
  router.push({name:'CreateDashboard'})
}
</script>
<style scoped>
.dashboard-list {
  margin-top: 2rem;
}
.card-col {
  margin-bottom: 2rem;
}
.loader {
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.options {
  display: flex;
  justify-content: right;
}
.dashboard-card > * {
  padding: 0.8rem !important;
}
.dashboard-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.create-dashboard-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  height: 40vh;
}
</style>