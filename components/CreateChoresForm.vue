<template>
    <div>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="chore_name">
                Chore name
            </label>
            <input 
            type="text"
            id="chore_name"
            name="chore_name"
            v-model="chore_name"
            placeholder="The name of this chore"
            required
            />

                    <label for="time_estimated">
                        Time estimated in minutes
                    </label>
                    <input 
                    type="number"
                    id="time_estimated"
                    class="small-input"
                    name="time_estimated"
                    v-model="time_estimated"
                    placeholder="Time estimated to complete this chore"
                    required
                    />                    
                
                    <label for="monthly_frequency">
                        Monthly frequency
                    </label>
                    <input 
                    type="number"
                    id="monthly_frequency"
                    class="small-input"
                    name="monthly_frequency"
                    v-model="monthly_frequency"
                    placeholder="The monthly frequency for this chore"
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

@media screen and (min-width: 640px) {
    form {
        div {
            display: flex;
            flex-direction: row;
            gap: 0.2rem;
            width: 96%;

            div {
                display: flex;
                flex-direction: column;
            }
        }
    }

    /**.small-input {
        width: 95%;
    }
     */
}

</style>