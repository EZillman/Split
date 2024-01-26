<template>
    <div>
      <canvas ref="chartCanvas" height="100" width="100"></canvas>
    </div>
 </template>
  
<script setup>
import Chart from 'chart.js/auto';

const props = defineProps(['percentage']);

</script>
  

<style lang="scss" scoped>

</style>