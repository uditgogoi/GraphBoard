<template>
  <el-container class="main-wrapper">
    <el-aside width="240px">
      <AppNavMenu />
    </el-aside>
    <el-main class="pt-0">
      <el-row>
        <el-col :span="3" :offset="21" class="flex justify-end align-center">
        </el-col>
      </el-row>
      <div class="dashboard-content">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import { ref } from "vue";
// import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import AppNavMenu from "@/components/AppNavMenu.vue";
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 95vh; */
}
.main-wrapper {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>