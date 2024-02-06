<template>
    <HeaderNav></HeaderNav>
    <main>
        <h2>Chores</h2>

        <div class="members-and-chores-container">
            <div class="show-and-hide-container">
                <div class="add-btn-container">
                    <h3>Add chores</h3>
                    <button @click="toggleAddChores" aria-label="toggle show add chores form">
                        <img :class="{ rotated: isAddChoresOpen }" src="/down.png" alt="up and down icon" height="30" width="30">
                    </button>            
                </div>

                <Transition name="fade">
                    <CreateChoresForm v-if="isAddChoresOpen"></CreateChoresForm>            
                </Transition>            
            </div>

            <ChoresList></ChoresList>            
        </div>
        
    </main>
</template>

<script setup>
import '../assets/main.css';

const isAddChoresOpen = ref(false);

const toggleAddChores = () => {
  isAddChoresOpen.value = !isAddChoresOpen.value;
};

</script>

<style lang="scss" scoped>
img {
    transition: all ease-in-out 0.3s;
}
</style>