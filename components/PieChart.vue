<template>
    <div>
      <canvas ref="canvas" height="200" width="200"></canvas>
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
  console.log('hej');
  if (!canvas.value) {
    console.error('Canvas element not found.');
    return;
  }

  if (!props.householdMembers) {
    console.log('test');
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

    console.log(data);

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
@media screen and (min-width: 760px) {
  canvas {
    height: 400px;
    width: 400px;
  }
}

@media screen and (min-width: 1024px) {
  div {
    width: 50%;
  }
}
</style>