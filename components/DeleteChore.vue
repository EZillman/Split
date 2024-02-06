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
    const choreId = store.choreId;
    if (choreId) {
        try {
            await deleteAssignments(choreId);

            const { data, error } = await supabase
            .from('chores')
            .delete()
            .eq('id', choreId)
            if (error) throw error;
            router.push('/chores');
        } catch (error) {
            console.error('error deleting chore:', error.message);
        }      
    } 
}

async function deleteAssignments(choreId) {
        try {
            const { data, error } = await supabase
                .from('assignments')
                .delete()
                .eq('chore_id', choreId);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting assignments for chore:', error.message);
        }        
}
</script>

<style lang="scss" scoped>

</style>