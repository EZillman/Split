<template>
    <div>
        <button class="danger-btn" @click="deleteChore()">
            Delete chore
        </button>
    </div>
</template>

<script setup>
import { useChoreStore } from '~/store/chore.js';

const store = useChoreStore();
const supabase = useSupabaseClient();
const router = useRouter();

onMounted(() => {
    store.getChoreIdFromLocalStorage();
});

async function deleteChore() {
    const chore = store;
    if (chore) {
        try {
            const { data, error } = await supabase
            .from('chores')
            .delete()
            .eq('id', chore.choreId)
            if (error) throw error;
            router.push('/chores');
        } catch (error) {
            console.error('error deleting chore:', error.message);
        }      
    } 
}
</script>

<style lang="scss" scoped>

</style>