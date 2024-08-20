<template>
  <el-row class="tac mb-5">
    <el-col :span="24">
      <el-row class="brand-title">
        <el-col :span="24" class="flex align-center pa-2">
          <img src="../assets/logo-1.png" alt="logo" width="200" />

          <!-- <h3>GraphBoards</h3> -->
        </el-col>
      </el-row>
      <el-menu
        class="el-menu-vertical-demo nav-menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="checkDefaultActive()"
      >
        <el-menu-item
          :index="index"
          v-for="(option, index) in leftNavigationMenu"
          :key="option.id"
          @click="onChangeRoute(option)"
          :disabled="option.disable"
        >
          <el-icon>
            <component :is="option.icon" />
          </el-icon>
          <span>{{ option.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
    
  <script setup>
import { ref } from "vue";
import { LeftNavigationMenu } from "@/utils/config";
import { useRouter } from "vue-router";

const router = useRouter();
const leftNavigationMenu = ref(LeftNavigationMenu);

const onChangeRoute = (option) => {
  router.push(option.route);
};

const checkDefaultActive = () => {
  const idArray = window.location.href.split("/");
  const id = idArray[idArray.length - 1];
  return leftNavigationMenu.value.findIndex(
    (item) => item.id === id.toLowerCase()
  );
};
</script>
    
<style scoped>
.nav-menu {
  height: 100vh;
}
.brand-title {
  background: #545c64;
  color: #fff;
}
</style>