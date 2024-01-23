<template>
    <div>
        <h3>Assign chores</h3>
        <form @submit.prevent="submitForm">
            <label for="chores">Assign chore</label>
            <select name="chores" id="chores" v-model="selectedChoreId" required>
                <option value="chore" disabled>
                    Select a chore
                </option>
                <option v-for="chore in chores" :key="chore.id" :value="chore.id">
                    {{ chore.name }}
                </option>
            </select>    
            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p> 
            
            <button type="submit">Assign chore</button>
        </form>
    </div>

</template>

<script setup>
import { useMemberStore } from '~/store/member.js';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const store = useMemberStore();
const userId = user.value.id;
const chores = ref([]);
const selectedChoreId = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

onMounted(async () => {
  await fetchChores();
});

async function fetchChores() {
  try {
    const { data, error } = await supabase
      .from('chores')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    chores.value = data;
  } catch (error) {
    console.error('Error fetching chores:', error.message);
  }
}

async function addAssignment(choreId) {
    const newAssignment = {
        user_id: userId,
        member_id: store.memberId,
        chore_id: choreId,
    }    

    try {
        const { data, error } = await supabase
        .from('assignments')
        .insert([
            newAssignment
        ])
        showSuccessMsg();
        if (error) throw error;
    } catch (error) {
        errorMsg.value = error.message;
    }

}

function showSuccessMsg() {
    successMsg.value = 'Assigned chore!';
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function submitForm() {
    if (selectedChoreId.value) {
        await addAssignment(selectedChoreId.value);
    } else {
        console.error('Please select a chore before submitting.');
    }
}

</script>

<style lang="scss" scoped>

</style>