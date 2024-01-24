<template>
    <div>
        <h3>Assigned chores</h3>
        <ul class="chore-container">
            <li v-for="assignedChore in assignedChores" :key="assignedChore.id" >
                <div>
                    <h3>{{ assignedChore.name }}</h3>
                    <button>Unassign</button>                    
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

onMounted(async () => {
    await fetchAssignments();
});

async function fetchAssignments() {
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
    }
  } catch (error) {
      console.error('Error fetching chores for assignments:', error.message);
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
</style>