<template>
    <div class="members-and-chores">
        <div class="loading-spinner">
            <LoadingSpinner v-if="loading"></LoadingSpinner>        
        </div>
        <h3>Assigned chores</h3> 
        <p v-if="successMsg">{{ successMsg }}</p>
        <ul class="chore-container">
            <li v-for="assignedChore in assignedChores" :key="assignedChore.id" >
                <div>
                    <h3>{{ assignedChore.name }}</h3>
                    <button @click="unassignChore(assignedChore.id, assignedChore.name)">
                        Unassign
                    </button>                    
                </div>

                <div>
                    <p>Time estimated: {{ assignedChore.time_estimated }} minutes</p>
                    <p>Monthly frequency: {{ assignedChore.monthly_frequency }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useMemberStore } from '~/store/member.js';

const store = useMemberStore();
const supabase = useSupabaseClient();
const assignments = ref([]);
const assignedChores = ref([]);
const successMsg = ref(null);
const loading = ref(false);

function subscribeToDatabaseChanges() {
  const channel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: '*',
      },
      async (payload) => {
        await fetchAssignments();
      } 
    )
    .subscribe()

  return channel;
}

onMounted(async () => {
    store.getMemberIdFromLocalStorage();  
    await fetchAssignments();
    subscribeToDatabaseChanges();
});

async function fetchAssignments() {
    loading.value = true;
    try {
        const { data, error } = await supabase
            .from('assignments')
            .select('*')
            .eq('member_id', store.memberId)
        if (error) throw error;
        assignments.value = data;
        await fetchAssignedChores();
    } catch (error) {
        console.error('Error fetching assignments:', error.message);
    }
}

async function fetchAssignedChores() {
    try {
        const choreIds = assignments.value.map((assignment) => assignment.chore_id);
    
    if (choreIds.length > 0) {
      const { data, error } = await supabase
        .from('chores')
        .select('*')
        .in('id', choreIds);
      if (error) throw error;
      assignedChores.value = data;
      loading.value = false;
    }
  } catch (error) {
      console.error('Error fetching chores for assignments:', error.message);
  }
}

function showSuccessMsg(choreName) {
    successMsg.value = `${choreName} is unassigned!`;
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function unassignChore(choreId, choreName) {
    try {
        const assignmentToDelete = assignments.value.find(
            (assignment) => assignment.chore_id === choreId
        );

        if (assignmentToDelete) {
            const { data, error } = await supabase
            .from('assignments')
            .delete()
            .eq('id', assignmentToDelete.id);
            if (error) throw error;
            showSuccessMsg(choreName);
            await fetchAssignedChores();
        }
    } catch (error) {
        console.error('Error unassigning chore:', error.message);
    }
}
</script>

<style lang="scss" scoped>
h3 {
    display: flex;
    justify-content: center;
}

button {
    width: 40%;
    margin-top: 0.5rem;
}

@media screen and (min-width: 1024px) {
    h3 {
        margin: 0.2rem 0;
    }
}
</style>