<template>
  <div class="navbar">
    <el-dropdown>
      <el-button :size="50" plain circle type="primary">
        <el-avatar :src="profilePic" v-if="profilePic" />
        <el-icon v-else><User /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled>Profile</el-dropdown-item>
          <el-dropdown-item @click="onLogout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { auth } from "../auth/firebase";
import { useRouter } from "vue-router";
import { useGraphStore } from "../store";
import { computed, onMounted } from "vue";

const store = useGraphStore();
const router = useRouter();
const profilePic = computed(() => store.getUserData?.profilePicture || "");

const onLogout = async () => {
  try {
    await auth.signOut();
    // store.setUserLogInStatus(false);
    router.push("/auth");
  } catch (error) {
    console.error("Google sign-in error:", error);
    error.value = error;
  }
};
</script>
<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>