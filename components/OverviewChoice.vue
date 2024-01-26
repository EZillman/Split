<template>
    <div>
        <label for="distribution">Show distributon in:</label>
        <select name="distribution" id="distribution" v-model="selectedOption">
            <option value="percentage">Percentage</option>
            <option value="hours">Hours</option>
        </select>
    </div>
</template>

<script setup>
const selectedOption = ref(null);

</script>

<style lang="scss" scoped>

</style>