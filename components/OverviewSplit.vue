<template>
  <div>
    <OverviewChoice></OverviewChoice>
    <OverviewChores @chores="handleChores"></OverviewChores>
    <OverviewMembers @members="handleMembers"></OverviewMembers>

    <ul>
      <li v-for="member in householdMembers" :key="member.id">
        {{ member.name }} - {{ calculateDistribution(member.id) }} hours a month
        {{ calculatePercentage(member.id) }}% of total
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
    calculateSharedChores(); 
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

  // Loop through all assigned tasks and track shared tasks.
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
  // Filter the member's assigned tasks from the entire list of tasks.
  const memberAssignments = assignments.value.filter(
    (assignment) => assignment.member_id === memberId
  );

  // Calculate the total number of minutes for the member's tasks.
  const totalMinutes = memberAssignments.reduce((total, assignment) => {
    const choreId = assignment.chore_id;
    const chore = householdChores.value.find((chore) => chore.id === choreId);
    const monthlyMinutes = chore.time_estimated * chore.monthly_frequency;

     // If the task is shared among multiple members, distribute the minutes equally.
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

function calculateTotalMinutes() {
  // Calculate the total number of minutes for all tasks.
  return householdChores.value.reduce((total, chore) => {
    return total + chore.time_estimated * chore.monthly_frequency;
  }, 0);
}

function calculatePercentage(memberId) {
  // Calculate the member's percentage of the total.
  const totalMinutes = calculateTotalMinutes();
  const memberMinutes = calculateDistribution(memberId) * 60; // Convert from hours to minutes
  const percentage = (memberMinutes / totalMinutes) * 100;

  return percentage.toFixed(1); // Round to one decimal place.
}

</script>


<style lang="scss" scoped>

</style>