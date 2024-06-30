<template>
    <div>
      <apexchart
        width="100%"
        height="100%"
        type="bar"
        :options="props.chartOptions"
        :series="props.data"
        :id="props.id"
      ></apexchart>
    </div>
  </template>
  <script setup>
  const props=defineProps(['chartOptions','data',"id"]);
  </script>