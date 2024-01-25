<template>
    <div>
      <OverviewChores @chores="handleChores"></OverviewChores>
      <OverviewMembers @members="handleMembers"></OverviewMembers>

      <ul>
        <li v-for="member in householdMembers" :key="member.id">
          {{ member.name }} - Total minutes: {{ calculateDistribution(member.id) }}
        </li>
      </ul>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const assignments = ref([]);
const householdMembers = ref([]);
const householdChores = ref([]);

onMounted(async () => {
  await fetchAssignments();
});

watchEffect(() => {
  if (householdMembers.value.length > 0 && householdChores.value.length > 0) {
    householdMembers.value.forEach((member) => {
      calculateDistribution(member.id);
    });
  }
});

async function fetchAssignments() {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    assignments.value = data;
    console.log('assignments', assignments);

  } catch (error) {
    console.error('Error fetching members:', error.message);
  }
}

function handleChores(chores) {
  householdChores.value = chores;
  console.log('chores', householdChores);
}

function handleMembers(members) {
  householdMembers.value = members;
  console.log('members', householdMembers);
}

function calculateDistribution(memberId) {
  // Om mer än en medlem är assignad på en chore, dela minuterna på antalet assignade medlemmar
  const memberAssignments = assignments.value.filter(
    (assignment) => assignment.member_id === memberId
  );

  const totalMinutes = memberAssignments.reduce(
    (total, assignment) =>
    total + householdChores.value.find((chore) => chore.id === assignment.chore_id).time_estimated,
    0
  )
  return totalMinutes;
}

</script>

<style lang="scss" scoped>

</style>