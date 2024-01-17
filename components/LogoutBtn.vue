<template>
    <button type="submit" @click="logout">
        Logout
    </button>
</template>

<script setup>
import { useUserStore } from '~/store/user.js';

const supabase = useSupabaseClient();
const store = useUserStore();
const router = useRouter();

async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        store.setUser(null);
        router.push('/login');
        if (error) throw error;
    } catch (error) {
        console.error(error);
    }
}

</script>

<style lang="scss" scoped>

</style>