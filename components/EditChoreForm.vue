<template>
    <div class="form-container">
        <form @submit.prevent="submitForm">
            <label for="chore_name">
                Chore name
            </label>
            <input 
            type="text"
            id="chore_name"
            name="chore_name"
            v-model="chore_name"
            :placeholder="`${chore.name}`"
            />

            <div>
                <div>
                    <label for="time_estimated">
                        Time estimated in minutes
                    </label>
                    <input 
                    type="number"
                    id="time_estimated"
                    class="small-input"
                    name="time_estimated"
                    v-model="time_estimated"
                    :placeholder="`${chore.time_estimated}`"
                    />                    
                </div>

                <div>
                    <label for="monthly_frequency">
                        Monthly frequency
                    </label>
                    <input 
                    type="number"
                    id="monthly_frequency"
                    class="small-input"
                    name="monthly_frequency"
                    v-model="monthly_frequency"
                    :placeholder="`${chore.monthly_frequency}`"
                    />                      
                </div>
              
            </div>

            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p>

            <button type="submit">
                Update chore
            </button>
        </form>
        <DeleteChore></DeleteChore>
    </div>
</template>

<script setup>
import { useChoreStore } from '~/store/chore.js';

const props = defineProps(['chore']);
const chore = props.chore;
const store = useChoreStore();
const supabase = useSupabaseClient();
const chore_name = ref('');
const time_estimated = ref(null);
const monthly_frequency = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

onMounted(() => {
    store.getChoreIdFromLocalStorage();
});

function showSuccessMsg() {
    successMsg.value = 'Chore is updated!';
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function updateChore() {
    const chore = store;
    const editedChore = {
        name: chore_name.value !== '' ? chore_name.value : chore.name,
        time_estimated: time_estimated.value !== null ? time_estimated.value : chore.time_estimated,
        monthly_frequency: monthly_frequency.value !== null ? monthly_frequency.value : chore.monthly_frequency,
    }
    if (chore) {
        try {
            const { data, error } = await supabase
            .from('chores')
            .update(editedChore)
            .eq('id', chore.choreId)
            showSuccessMsg();
            if (error) throw error;
        } catch (error) {
            errorMsg.value = error.message;
        }
    }
}

async function submitForm() {
   await updateChore();
}

</script>

<style lang="scss" scoped>

</style>