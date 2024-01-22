<template>
    <div>
        <div>
            <ul>
                <NuxtLink to="/members">
                    <li>Members</li>
                </NuxtLink>

                <li>></li>
                <NuxtLink :to="'/members/' + $route.params.name">
                    <li>{{ $route.params.name }}</li>                    
                </NuxtLink>

            </ul>
        </div>
        <h2>Chosen member</h2>
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