<template>
  <el-row class="tac mb-5">
    <el-col :span="24">
      <el-row>
        <el-col :span="24" class="flex align-center pa-2">
          <!-- <img
            src="https://seeklogo.com/images/A/atomic-logo-42027187FA-seeklogo.com.png"
            alt=""
            width="30"
          />
            &nbsp; &nbsp; -->
          <h3>GraphBoards</h3>
        </el-col>
      </el-row>
      <el-menu
        class="el-menu-vertical-demo nav-menu"
        @open="handleOpen"
        @close="handleClose"
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
  height: 89vh;
}
</style>