<template>
    <div>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="member_name">
                Member name
            </label>
            <input 
            type="text"
            id="member_name"
            name="member_name"
            v-model="member_name"
            placeholder="The name of this member"
            required
            />

            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p>

            <button type="submit">
                Add member
            </button>
        </form>
    </div>
</template>

<script setup>

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const member_name = ref('');
const errorMsg = ref(null);
const successMsg = ref(null);

function showSuccessMsg() {
    successMsg.value = 'Member added!';
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function addMember() {
    const newMember = {
        name: member_name.value,
        user_id: userId,
    }    

    try {
        const { data, error } = await supabase
        .from('household_members')
        .insert([
            newMember
        ])
        showSuccessMsg();
        if (error) throw error;
    } catch (error) {
        errorMsg.value = error.message;
    }

}

async function submitForm() {
   await addMember();
   member_name.value = '';
}

</script>

<style lang="scss" scoped>


</style>