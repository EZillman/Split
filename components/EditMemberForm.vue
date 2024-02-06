<template>
    <div class="form-container">
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
            required
            />

            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p>

            <button type="submit">
                Save changes
            </button> 
        </form>
        <DeleteMember></DeleteMember>
    </div>
</template>

<script setup>
import { useMemberStore } from '~/store/member.js';

const store = useMemberStore();
const supabase = useSupabaseClient();
const member_name = ref('');
const errorMsg = ref(null);
const successMsg = ref(null);

onMounted(() => {
    store.getMemberIdFromLocalStorage();
});

function showSuccessMsg() {
    successMsg.value = 'Member is updated!';
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function updateMember() {
    const member = store;
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
div {
    margin: 0.2rem 0.5rem;
}
</style>