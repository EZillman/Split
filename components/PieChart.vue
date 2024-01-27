<template>
    <div>
      <canvas id="chartCanvas" height="100" width="100"></canvas>
    </div>
 </template>
  
<script setup>
import Chart from 'chart.js/auto';

const props = defineProps(['percentage', 'householdMembers']);
const chartRef = ref(null);
const percentageRef = computed(() => props.percentage);

onMounted(() => {
  watch([props.householdMembers, percentageRef], () => {
    if (percentageRef.value && percentageRef.value.length > 0 && props.householdMembers && props.householdMembers.length > 0) {
      console.log('members', props.householdMembers);
      renderPieChart();
    }
  })
});

const generateColors = (count) => {
  const randomColor = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
  return Array.from({ length: count }, randomColor);
};

const renderPieChart = () => {
  const canvas = document.getElementById('chartCanvas');
  if (!canvas) {
    console.error('Canvas element not found.');
    return;
  }

  if (!props.householdMembers) {
    return;
  }

  const data = {
    labels: props.householdMembers.map((member) => member.name),
    datasets: [{
      data: props.percentage,
      backgroundColor: generateColors(props.householdMembers.length),
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (chartRef.value) {
    chartRef.value.destroy();
  }

  chartRef.value = new Chart(canvas, {
    type: 'pie',
    data: data,
    options: options,
  });
};


</script>
  
<style lang="scss" scoped>

</style>