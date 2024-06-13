<template>
  <div>    
    <BaseChart :chartOptions="chartOptions" :data="data" :key="chartOptions"/>
  </div>
</template>
<script setup>
import { computed } from "vue";
import BaseChart from "./BaseChart.vue";
import { useGraphStore } from "../../store";

const store= useGraphStore();
const props= defineProps(['id']);
const chartOptions=computed(()=> store.getDashboardItemList.find(item=> item.id===props.id)?.itemData.options);
const data= computed(()=> store.getDashboardItemList.find(item=> item.id===props.id)?.itemData.series)
</script>
<style scoped>
.barchart-wrapper {
  border: none !important;
}

</style>