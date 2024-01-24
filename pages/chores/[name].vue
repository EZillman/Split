<template>
    <HeaderNav></HeaderNav>
    <main>
        <div class="members-and-chores-container">
            <ChosenChore></ChosenChore>

            <div class="desktop-add-container">
                <div class="add-btn-container">
                    <h3>Edit chore</h3>
                    <button @click="toggleEditChore">
                        <img :class="{ rotated: isEditChoreOpen }" src="/down.png" height="30" width="30">
                    </button>            
                </div>
        
                <Transition name="fade">
                    <EditChoreForm v-if="isEditChoreOpen"></EditChoreForm>            
                </Transition>                   
            </div>
   
        </div>
    </main>
</template>

<script setup>
const isEditChoreOpen = ref(false);

const toggleEditChore = () => {
  isEditChoreOpen.value = !isEditChoreOpen.value;
};

</script>

<style lang="scss" scoped>
img {
    transition: all ease-in-out 0.3s;
}

@media screen and (min-width: 1024px) {
    .desktop-add-container {
        margin: 10rem 2rem 0.5rem 1rem;
    }
}
</style>