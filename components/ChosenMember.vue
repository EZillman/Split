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
        <AssignChores></AssignChores>

        <h2>{{ $route.params.name }}</h2>
        <p>{{ store.memberId }}</p>
    </div>
</template>

<script setup>
import { useMemberStore } from '~/store/member.js';

const store = useMemberStore();


</script>

<style lang="scss" scoped>

</style>