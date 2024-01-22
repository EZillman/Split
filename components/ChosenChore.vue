<template>
    <div>
        Chosen chore
        <p>{{ $route.params.name }}</p>
        <p>{{ store.choreId }}</p>
        <p>Time estimated: {{ chore.time_estimated }} minutes</p>
        <p>Monthly frequency: {{ chore.monthly_frequency }} times a month</p>
    </div>
</template>

<script setup>
import { useChoreStore } from '~/store/chore.js';

const store = useChoreStore();
const supabase = useSupabaseClient();
const chore = ref({});

onMounted(async () => {
  await fetchChore();
});

async function fetchChore() {
  try {
    const { data, error } = await supabase
      .from('chores')
      .select('*')
      .eq('id', store.choreId)
      .single(); 

    if (error) throw error;
    
    chore.value = data;
    console.log('data', data);
  } catch (error) {
    console.error('Error fetching chore:', error.message);
  }
}
</script>

<style lang="scss" scoped>

</style>