<template>
    <HeaderNav></HeaderNav>
    <main>
        <h2 v-if="existingHousehold">{{ existingHousehold.name }}'s household</h2>
        <h2 v-else>Home</h2>
        <OverviewSplit></OverviewSplit>
    </main>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const existingHousehold = ref(null);

onMounted(async () => {
    await checkForHousehold();
});

async function checkForHousehold() {
    try {
        const { data, error } = await supabase
            .from('households')
            .select('id, name')
            .eq('user_id', userId)
            .single();        

        existingHousehold.value = data;
        if (error) throw error;
    } catch (error) {
        console.error('Error fetching household:', error.message);
    }    
}
</script>

<style lang="sass" scoped>

</style>