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
@media screen and (min-width: 760px) {
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1% 20%;

  }
}

@media screen and (min-width: 1024px) {
  div {
    

    label {
      width: 14rem;
    }

    select {
      width: 14rem;
    }
  }
}

</style>