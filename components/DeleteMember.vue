<template>
    <div>
        <button class="danger-btn" @click="deleteMember()" >
            Delete member
        </button>
    </div>
</template>

<script setup>
import { useMemberStore } from '~/store/member.js';

const store = useMemberStore();
const supabase = useSupabaseClient();
const router = useRouter();

onMounted(() => {
    store.getMemberIdFromLocalStorage();
});

async function deleteMember() {
    const memberId = store.memberId;
    if (memberId) {
        try {
            await deleteAssignments(memberId);

            const { data, error } = await supabase
            .from('household_members')
            .delete()
            .eq('id', memberId)
            if (error) throw error;
            router.push('/members');
        } catch (error) {
            console.error('error deleting member:', error.message);
        }      
    } 
}

async function deleteAssignments(memberId) {
        try {
            const { data, error } = await supabase
                .from('assignments')
                .delete()
                .eq('member_id', memberId);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting assignments for member:', error.message);
        }        
}

</script>

<style lang="scss" scoped>

</style>