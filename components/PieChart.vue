<template>
    <div class="canvas-container">
      <div>
        <canvas ref="canvas" height="200" width="200"></canvas>
      </div>
    </div>
 </template>
  
<script setup>
import Chart from 'chart.js/auto';

const props = defineProps(['percentage', 'householdMembers']);
const chartRef = ref(null);
const canvas = ref(null);
const percentageRef = computed(() => props.percentage);

onMounted(() => {
  watch([props.householdMembers, percentageRef], () => {
    if (percentageRef.value && percentageRef.value.length > 0 && props.householdMembers && props.householdMembers.length > 0) {
      nextTick(() => {
        renderPieChart();
      });
    }
  });
  renderPieChart();
  
});


const generateColors = (count) => {
  const blueGreenColor = () => {
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    return `rgba(0, ${green}, ${blue}, 0.7)`;
  };

  return Array.from({ length: count }, blueGreenColor);
};

const renderPieChart = () => {
  if (!canvas.value) {
    console.error('Canvas element not found.');
    return;
  }

  if (!props.householdMembers) {
    return;
  }

  try {
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

    nextTick(() => {
      if (chartRef.value) {
        chartRef.value.destroy();
      }

      chartRef.value = new Chart(canvas.value, {
        type: 'pie',
        data: data,
        options: options,
      });          
    })

  } catch (error) {
    console.error('Error rendering pie chart:', error.message);
  }

};

</script>
  
<style lang="scss" scoped>
@media screen and (min-width: 640px) {
  canvas {
    height: 18.75rem;
    width: 18.75rem;
  }
}

@media screen and (min-width: 1100px) {
  .canvas-container {
    width: 50%;

    div {
      width: 27rem;
      padding: 3rem;
      border: 0.12rem solid #54E3EC;
      border-radius: 0.5rem;
      box-shadow: 0.2rem 0.2rem 0.2rem #00000023;
      color: #324B4B;
      background-color: #aececd86;      
    }
  }
}
</style>