<template>
  <div>
    <OverviewSelect @change-option="handleOptionChange"></OverviewSelect>
    <!--<OverviewChores @chores="handleChores"></OverviewChores>
    <OverviewMembers @members="handleMembers"></OverviewMembers>-->

    <div class="distribution-container">
      <PieChart v-if="canRenderChart && members.length > 0" :percentage="calculatePercentageForChart" :householdMembers="members"></PieChart>

      <ul>
        <!--<li v-for="member in householdMembers" :key="member.id" ref="chartRefs">-->
        <li v-for="member in members" :key="member.id" ref="chartRefs">
          <h3>{{ member.name }}</h3>
          <p>{{ renderDistribution(member.id) }}</p>
        </li>
      </ul>      
    </div>

  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const assignments = ref([]);
const members = ref([]);
const chores = ref([]);
//const householdMembers = ref([]);
//const householdChores = ref([]);
const sharedChores = ref({});
const selectedOption = ref(null);
const canRenderChart = ref(false);

onMounted(async () => {
  await fetchAssignments();
  await fetchChores();
  await fetchMembers();
  //calculateSharedChores();
  members.value.forEach((member) => {
      calculateDistribution(member.id);
    });
});

/**
 * watch([assignments, householdMembers, householdChores], () => {
  if (householdMembers.value.length > 0 && householdChores.value.length > 0) {
    calculateSharedChores(); 
    householdMembers.value.forEach((member) => {
      calculateDistribution(member.id);
    });
  }


}); */

function handleOptionChange(option) {
  selectedOption.value = option;
}

function renderDistribution(memberId) {
  if (selectedOption.value === 'percentage') {
    return `${calculatePercentage(memberId)}%`;
  } else if (selectedOption.value === 'hours') {
    return `${calculateDistribution(memberId)} hours a month`;
  } else {
    return ''; 
  }
}

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

async function fetchMembers() {
  try {
    const { data, error } = await supabase
      .from('household_members')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    members.value = data;
    //emit('members', members.value);
  } catch (error) {
    console.error('Error fetching members:', error.message);
  }
}

async function fetchChores() {
  try {
    const { data, error } = await supabase
      .from('chores')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    chores.value = data;
    //emit('chores', chores.value);
  } catch (error) {
    console.error('Error fetching chores:', error.message);
  }
}

/**
 * function handleChores(chores) {
  householdChores.value = chores;
}

function handleMembers(members) {
  householdMembers.value = members;
}

 * 
 */

function calculateSharedChores() {
  sharedChores.value = {};

  // Loop through all assigned chores and track shared chores.
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
  // Filter the member's assigned chores from the entire list of chores.
  const memberAssignments = assignments.value.filter(
    (assignment) => assignment.member_id === memberId
  );

  // Calculate the total number of minutes for the member's chores.
  const totalMinutes = memberAssignments.reduce((total, assignment) => {
    const choreId = assignment.chore_id;
    //const chore = householdChores.value.find((chore) => chore.id === choreId);
    const chore = chores.value.find((chore) => chore.id === choreId);

    // Add a check to ensure chore is defined before accessing time_estimated.
    if (chore && chore.time_estimated !== undefined) {
      const monthlyMinutes = chore.time_estimated * chore.monthly_frequency;

      // If the chore is shared among multiple members, distribute the minutes equally.
      if (sharedChores.value[choreId] && sharedChores.value[choreId].length > 1) {
        const totalAssignees = sharedChores.value[choreId].length;
        const distributedMinutes = monthlyMinutes / totalAssignees;
        return total + distributedMinutes;
      } else {
        return total + monthlyMinutes;
      }
    } else {
      return total;
    }
  }, 0);

  const totalHours = (totalMinutes / 60).toFixed(1);

  return totalHours;
}


function calculateTotalMinutes() {
  // Calculate the total number of minutes for all chores.
  //return householdChores.value.reduce((total, chore) => {
    return chores.value.reduce((total, chore) => {
    return total + chore.time_estimated * chore.monthly_frequency;
  }, 0);
}

function calculatePercentage(memberId) {
  // Calculate the member's percentage of the total.
  const totalMinutes = calculateTotalMinutes();
  const memberMinutes = calculateDistribution(memberId) * 60; // Convert from hours to minutes
  const percentage = (memberMinutes / totalMinutes) * 100;
  
  canRenderChart.value = true;
  return percentage;
}

const calculatePercentageForChart = computed(() => {
  //return householdMembers.value.map((member) => {
    return members.value.map((member) => {
    return calculatePercentage(member.id);
  });
});

</script>


<style lang="scss" scoped>
h3 {
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 760px) {
  ul {
    display: flex;
    gap: 15%;
    margin: 2% 10%;
    justify-content: center;
  }
}

@media screen and (min-width: 1024px) {
  .distribution-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    margin: 2% 5%;
  }
}

</style>