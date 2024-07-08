<template>
  <div class="statistic-card">
    <el-statistic :value="98500">
      <template #title>
        <div style="display: inline-flex; align-items: center">
          Daily active users
          <el-tooltip
            effect="dark"
            content="Number of users who logged into the product in one day"
            placement="top"
          >
            <el-icon style="margin-left: 4px" :size="12">
              <Warning />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
    </el-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>than yesterday</span>
        <span class="green">
          24%
          <el-icon>
            <CaretTop />
          </el-icon>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from "@element-plus/icons-vue";
</script>
<style scoped>
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
