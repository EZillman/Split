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
    const member = store;
    if (member) {
        try {
            const { data, error } = await supabase
            .from('household_members')
            .delete()
            .eq('id', member.memberId)
            if (error) throw error;
            router.push('/members');
        } catch (error) {
            console.error('error deleting member:', error.message);
        }      
    } 
}



</script>

<style lang="scss" scoped>

</style>