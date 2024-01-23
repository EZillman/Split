<template>
    <div>
        <h3>Assigned chores</h3>
        <ul>
            <li v-for="assignedChore in assignedChores" :key="assignedChore.id">
                {{ assignedChore.name }}
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

</style>