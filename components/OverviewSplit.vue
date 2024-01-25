<template>
  <div>
    <OverviewChores @chores="handleChores"></OverviewChores>
    <OverviewMembers @members="handleMembers"></OverviewMembers>

    <ul>
      <li v-for="member in householdMembers" :key="member.id">
        {{ member.name }} - {{ calculateDistribution(member.id) }} hours a month
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
const sharedChores = ref({});

onMounted(async () => {
  await fetchAssignments();
});

watch(assignments, () => {
  if (householdMembers.value.length > 0 && householdChores.value.length > 0) {
    calculateSharedChores(); // Lägg till detta anrop
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
  } catch (error) {
    console.error('Error fetching members:', error.message);
  }
}

function handleChores(chores) {
  householdChores.value = chores;
}

function handleMembers(members) {
  householdMembers.value = members;
}

function calculateSharedChores() {
  sharedChores.value = {};

  assignments.value.forEach((assignment) => {
    const choreId = assignment.chore_id;
    const memberId = assignment.member_id;

    if (sharedChores.value[choreId]) {
      sharedChores.value[choreId].push(memberId);
    } else {
      sharedChores.value[choreId] = [memberId];
    }
  });
}

function calculateDistribution(memberId) {
  const memberAssignments = assignments.value.filter(
    (assignment) => assignment.member_id === memberId
  );

  const totalMinutes = memberAssignments.reduce((total, assignment) => {
    const choreId = assignment.chore_id;
    const chore = householdChores.value.find((chore) => chore.id === choreId);
    const monthlyMinutes = chore.time_estimated * chore.monthly_frequency;

    if (sharedChores.value[choreId] && sharedChores.value[choreId].length > 1) {
      const totalAssignees = sharedChores.value[choreId].length;
      const distributedMinutes = monthlyMinutes / totalAssignees;
      return total + distributedMinutes;
    } else {
      return total + monthlyMinutes;
    }
  }, 0);

  const totalHours = (totalMinutes / 60).toFixed(1);

  return totalHours;
}

</script>


<style lang="scss" scoped>

</style>