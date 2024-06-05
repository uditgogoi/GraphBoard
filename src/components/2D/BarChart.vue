<template>
  <div>
    <BaseChart :chartOptions="chartOptions" :data="data" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import BaseChart from "./BaseChart.vue";
const chartOptions = ref({
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
});

const data = ref([
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
]);
</script>
<style scoped>
.barchart-wrapper {
  border: none !important;
}

</style>