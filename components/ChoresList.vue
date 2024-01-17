<template>
    <div>
        <ul>
            <li v-for="chore in chores" :key="chore.id">
                {{ chore.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const chores = ref([]);

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

</script>