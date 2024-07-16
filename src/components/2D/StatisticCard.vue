<template>
  <div class="statistic-card">
    <el-statistic :value="data.itemData.value">
      <template #title>
        <div style="display: inline-flex; align-items: center">
          {{ data.itemData.description }}
          <el-tooltip
            effect="dark"
            :content="data.itemData.infoText"
            placement="top"
            v-if="data.itemData.infoText"
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
        <span v-if="data.itemData.suffixText ">{{ data.itemData.suffixText }}</span>
        <span :class="[data.itemData.trendIncrement?'green':'red']" v-if="data.itemData.trendValue">
          {{  data.itemData.trendValue}}{{ data.itemData.trendType }}
          <el-icon>
            <CaretTop v-if="data.itemData.trendIncrement"/>
            <CaretBottom v-else/>
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
import { computed, ref, watch,onMounted } from "vue";
import { useGraphStore } from "../../store";

const store = useGraphStore();
const props = defineProps(["id", "ready"]);
const data = computed(() =>
  store.getDashboardItemList.find((item) => item.id === props.id)
);
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
