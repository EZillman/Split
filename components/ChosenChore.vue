<template>
    <div>
        Chosen chore
        <p>{{ $route.params.name }}</p>
        <p>{{ store.choreId }}</p>
    </div>
</template>

<script setup>
import { useChoreStore } from '~/store/chore.js';

const store = useChoreStore();

//Hämta all chore info

</script>

<style lang="scss" scoped>

</style>