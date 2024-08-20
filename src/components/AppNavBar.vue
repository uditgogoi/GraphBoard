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
          <el-dropdown-item>Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
</script>
<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>