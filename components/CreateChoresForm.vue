<template>
    <div>
        <form @submit.prevent="submitForm">
            <label for="chore_name">
                Chore name
            </label>
            <input 
            type="text"
            id="chore_name"
            name="chore_name"
            v-model="chore_name"
            placeholder="name"
            required
            />

            <label for="time_estimated">
                Time estimated in minutes
            </label>
            <input 
            type="number"
            id="time_estimated"
            name="time_estimated"
            v-model="time_estimated"
            placeholder="30"
            required
            />

            <label for="monthly_frequency">
                Monthly frequency
            </label>
            <input 
            type="number"
            id="monthly_frequency"
            name="monthly_frequency"
            v-model="monthly_frequency"
            placeholder="4"
            required
            />

            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p>

            <button type="submit">
                Add chore
            </button>
        </form>

    </div>
</template>

<script setup>

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const chore_name = ref('');
const time_estimated = ref(null);
const monthly_frequency = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

function showSuccessMsg() {
    successMsg.value = 'Chore added!';
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function addChore() {
    const newChore = {
        name: chore_name.value,
        time_estimated: time_estimated.value,
        monthly_frequency: monthly_frequency.value,
        user_id: userId,
    }

    try {
        const { data, error } = await supabase
        .from('chores')
        .insert([
            newChore
        ])
        showSuccessMsg();
        if (error) throw error;
    } catch (error) {
        errorMsg.value = error.message;
    }
}

async function submitForm() {
    await addChore();
    chore_name.value = '';
    time_estimated.value = null;
    monthly_frequency.value = null;
}

</script>

<style lang="scss" scoped>

</style>