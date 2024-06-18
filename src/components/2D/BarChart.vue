<template>
  <div>
    <BaseChart :chartOptions="chartOptions" :data="data" v-if="xAxisLabels.length>0"/>
  </div>
</template>
<script setup>
import { computed, ref, watch,onMounted } from "vue";
import BaseChart from "./BaseChart.vue";
import { useGraphStore } from "../../store";

const store = useGraphStore();
const props = defineProps(["id"]);
const chartOptions = computed(
  () =>
    store.getDashboardItemList.find((item) => item.id === props.id)?.itemData
      .options
);
const data = computed(
  () =>
    store.getDashboardItemList.find((item) => item.id === props.id)?.itemData
      .series
);
const xAxisLabels= computed(()=> chartOptions.value.xaxis.categories)
</script>
<style scoped>
.barchart-wrapper {
  border: none !important;
}
</style>