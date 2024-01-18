<template>
    <HeaderNav></HeaderNav>
    <main>
        <h2>Chores</h2>

        <div class="add-btn-container">
            <h3>Add chores</h3>
            <button @click="toggleAddChores">
                <img v-if="isAddChoresOpen" src="/up.png" height="30" width="30">
                <img v-else src="/down.png" height="30" width="30">
            </button>            
        </div>

        <CreateChoresForm v-if="isAddChoresOpen"></CreateChoresForm>
        <ChoresList></ChoresList>
        
    </main>
</template>

<script setup>
const isAddChoresOpen = ref(false);

const toggleAddChores = () => {
  isAddChoresOpen.value = !isAddChoresOpen.value;
};

</script>

<style lang="scss" scoped>

</style>