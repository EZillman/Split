<template>
    <div>
        <label for="distribution">Show distributon in:</label>
        <select name="distribution" id="distribution" v-model="selectedOption" @change="emitOption">
            <option value="percentage">Percentage</option>
            <option value="hours">Hours</option>
        </select>
    </div>
</template>

<script setup>
const selectedOption = ref('percentage');
const emit = defineEmits();

onMounted(() => {
  emit('change-option', selectedOption.value);
});

function emitOption() {
  emit('change-option', selectedOption.value);
}

</script>

<style lang="scss" scoped>
@media screen and (min-width: 640px) {
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1% 20%;

  }
}

@media screen and (min-width: 1100px) {
  div {
    margin: 0 20%;    

    label {
      width: 14rem;
    }

    select {
      width: 12rem;
      height: 2rem;
      color: #324B4B;
      border-color: #324B4B;
    }
  }
}

</style>