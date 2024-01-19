<template>
    <div>
        Chosen member
        <p>{{ $route.params.name }}</p>
        <p>{{ store.memberId }}</p>
    </div>
</template>

<script setup>
import { useMemberStore } from '~/store/member.js';

const store = useMemberStore();
</script>

<style lang="scss" scoped>

</style>