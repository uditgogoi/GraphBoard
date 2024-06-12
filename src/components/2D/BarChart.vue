<template>
  <div>
    <BaseChart :chartOptions="chartOptions" :data="data" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import BaseChart from "./BaseChart.vue";

const props=defineProps(['graphData'])

const chartOptions= ref(props.graphData.options);
const data = ref(props.graphData.series);

// console.log(data.value)
console.log(data.value)

// [
//   {
//     name: "series-1",
//     data: [30, 40, 35, 50, 49, 60, 70, 91],
//   },
// ]
</script>
<style scoped>
.barchart-wrapper {
  border: none !important;
}

</style>