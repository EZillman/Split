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
const selectedOption = ref(null);
const emit = defineEmits();

function emitOption() {
  emit('change-option', selectedOption.value);
}

</script>

<style lang="scss" scoped>

</style>