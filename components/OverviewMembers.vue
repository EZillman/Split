<template>
    <div>

    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const members = ref([]);
const emit = defineEmits();

onMounted(async () => {
  await fetchMembers();
});

async function fetchMembers() {
  try {
    const { data, error } = await supabase
      .from('household_members')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    members.value = data;
    emit('members', members.value);
  } catch (error) {
    console.error('Error fetching members:', error.message);
  }
}
</script>

<style lang="scss" scoped>

</style>