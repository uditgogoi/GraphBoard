<template>
  <div>
    <BaseChart :key="props.id" :chartOptions="chartOptions" :data="data" v-if="xAxisLabels.length>0" :id="props.id"/>
    <el-skeleton :rows="3" v-else/>
  </div>
</template>
<script setup>
import { computed, ref, watch,onMounted } from "vue";
import BaseChart from "./BaseChart.vue";
import { useGraphStore } from "../../store";

const store = useGraphStore();
const props = defineProps(["id","ready"]);
onMounted(()=> {
  console.log(store.getDashboardItemList)
  console.log(props.id)
})
const chartOptions = computed(
  () =>
    store.getDashboardItemList.find((item) => item.id === props.id)?.itemData
      .options
);
const data = computed(
  () =>
    store.getDashboardItemList.find((item) => item.id === props.id)?.itemData
      .series || []
);
const xAxisLabels= computed(()=> chartOptions.value?.xaxis?.categories || 0)
</script>
<style scoped>
.barchart-wrapper {
  border: none !important;
}
</style>