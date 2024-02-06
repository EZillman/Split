<template>
    <HeaderNav></HeaderNav>
    <main>
        <div class="members-and-chores-container">
            <ChosenChore @chosenChore="saveChore"></ChosenChore>

            <div class="show-and-hide-container edit-container">
                <div class="add-btn-container">
                    <h3>Edit chore</h3>
                    <button @click="toggleEditChore" aria-label="toggle show edit chore form">
                        <img :class="{ rotated: isEditChoreOpen }" src="/down.png" alt="up and down icon" height="30" width="30">
                    </button>            
                </div>
        
                <Transition name="fade">
                    <EditChoreForm v-if="isEditChoreOpen" :chore="chore"></EditChoreForm>            
                </Transition>                   
            </div>
   
        </div>
    </main>
</template>

<script setup>
import '../assets/main.css';

const isEditChoreOpen = ref(false);
const chore = ref(null);

const toggleEditChore = () => {
  isEditChoreOpen.value = !isEditChoreOpen.value;
};

function saveChore(chosenChore) {
    chore.value = chosenChore.value;
}

</script>

<style lang="scss" scoped>
img {
    transition: all ease-in-out 0.3s;
}

@media screen and (min-width: 1100px) {
    .desktop-add-container {
        margin: 10rem 2rem 0.5rem 1rem;
    }

    .edit-container {
        margin-top: 10rem;
        min-height: 20rem;
    }
}
</style>