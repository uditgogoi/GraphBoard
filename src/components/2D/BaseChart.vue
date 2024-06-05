<template>
    <div>
      <apexchart
        width="100%"
        height="100%"
        type="bar"
        :options="props.chartOptions"
        :series="props.data"
      ></apexchart>
    </div>
  </template>
  <script setup>
  const props=defineProps(['chartOptions','data']);
  </script>