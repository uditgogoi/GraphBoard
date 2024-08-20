<template>
  <div class="navbar">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-button plain circle type="primary">
          <el-icon><User /></el-icon>
        </el-button>
      </span>
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
import {
  auth,
} from '../auth/firebase';
import { useRouter } from 'vue-router';

const router= useRouter();

const onLogout=async()=> {
  try {
    await auth.signOut();
    router.push('/auth')
  } catch (error) {
    console.error("Google sign-in error:", error);
    error.value = error
  }
}
</script>
<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>