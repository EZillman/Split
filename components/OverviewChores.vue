<template>
    <div>

    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const chores = ref([]);
const emit = defineEmits();

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
    emit('chores', chores.value);
  } catch (error) {
    console.error('Error fetching chores:', error.message);
  }
}
</script>

<style lang="scss" scoped>

</style>