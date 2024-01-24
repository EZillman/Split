<template>
    <div>
        <h3>Assigned chores</h3>
        <ul>
            <li v-for="assignedChore in assignedChores" :key="assignedChore.id">
                <h3>{{ assignedChore.name }}</h3>
                <button>Unassign</button>
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

li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    margin: 0.8rem;
    border: 0.12rem solid #54E3EC;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.2rem 0.2rem #00000023;
    color: #324B4B;
    background-color: #aececd86;

    button {
        width: 50%;
    }
}
</style>