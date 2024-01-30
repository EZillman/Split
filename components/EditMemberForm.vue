<template>
    <div>
        <form @submit.prevent="submitForm">
            <label for="member_name">
                Member name
            </label>
            <input 
            type="text"
            id="member_name"
            name="member_name"
            v-model="member_name"
            :placeholder="$route.params.name"
            />

            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p>

            <button type="submit">
                Save changes
            </button>
        </form>
    </div>
</template>

<script setup>
import { useMemberStore } from '~/store/member.js';

const store = useMemberStore();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const member_name = ref('');
const errorMsg = ref(null);
const successMsg = ref(null);

function showSuccessMsg() {
    successMsg.value = 'Member is updated!';
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function updateMember() {
    const member = store;
    console.log('memberstore', member);
    const editedMember = {
        name: member_name.value,
    }
    if (member) {
        try {
            const { data, error } = await supabase
            .from('household_members')
            .update(editedMember)
            .eq('id', member.memberId)
            showSuccessMsg();
            if (error) throw error;
        } catch (error) {
            errorMsg.value = error.message;
        }
        
    }
}

async function submitForm() {
   await updateMember();
}
</script>

<style lang="scss" scoped>

</style>