<template>
  <el-dialog v-model="dialogTableVisible" title="Save dashboard" width="480">
    <el-row>
      <el-col :span="24">
        <span>Dashboard name</span>
        <el-input v-model="title"></el-input>
      </el-col>
      <el-col :span="24" class="action">
        <el-button type="primary" plain @click="saveDashboardData"
          >Save</el-button
        >
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { uniqueID } from "../../utils/helper";
import { ElMessage } from "element-plus";

const dialogTableVisible = ref(true);
const title = ref("");
const emits = defineEmits(["onSubmit"]);

const saveDashboardData = () => {
  if (!title.value) {
    ElMessage({
      message: "Title is invalid",
      type: 'danger',
    });
    return;
  }
  const dashboardData = {
    dashboardId: uniqueID(),
    title: title.value,
  };

  emits('onSubmit',dashboardData)
};
</script>
<style scoped>
.action {
  margin-top: 1rem;
}
</style>