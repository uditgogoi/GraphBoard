<template>
  <el-container>
    <el-aside width="240px">
      <AppNavMenu />
    </el-aside>
    <el-main class="pt-0">
      <el-row>
        <el-col :span="3" :offset="21" class="flex justify-end align-center">
          <!-- <el-dropdown class="el-dropdown">
            <span class="el-dropdown-link">
              <el-avatar>{{ shortHandName }} </el-avatar>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="option in menuItemDropdown"
                  :key="option.id"
                  @click="onClickMenuItem(option)"
                >
                  <el-icon color="#5c7dff">
                    <component :is="option.icon" />
                  </el-icon>
                  &nbsp;
                  {{ option.title }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
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
  min-height: 95vh;
}
</style>