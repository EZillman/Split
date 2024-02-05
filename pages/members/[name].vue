<template>
    <HeaderNav></HeaderNav>
    <main>            
        <ChosenMember></ChosenMember>
        <div class="members-and-chores-container">

            <div class="show-and-hide-container">
                <div class="add-btn-container">
                    <h3>Assign chore</h3>
                    <button @click="toggleAssignChores" aria-label="toggle show assign chores form">
                        <img :class="{ rotated: isAssignChoresOpen }" src="/down.png" alt="up and down icon" height="30" width="30">
                    </button>            
                </div>

                <Transition name="fade">
                    <AssignChoresForm v-if="isAssignChoresOpen"></AssignChoresForm>            
                </Transition>        

                <div class="add-btn-container">
                    <h3>Edit member</h3>
                    <button @click="toggleEditMember" aria-label="toggle show edit member form">
                        <img :class="{ rotated: isEditMemberOpen }" src="/down.png" alt="up and down icon" height="30" width="30">
                    </button>            
                </div>

                <Transition name="fade">
                    <EditMemberForm v-if="isEditMemberOpen"></EditMemberForm>            
                </Transition>  
            </div>

            <MemberAssignments></MemberAssignments>            
        </div>

    </main>
</template>

<script setup>
const isAssignChoresOpen = ref(false);
const isEditMemberOpen = ref(false);

const toggleAssignChores = () => {
  isAssignChoresOpen.value = !isAssignChoresOpen.value;
};

const toggleEditMember = () => {
  isEditMemberOpen.value = !isEditMemberOpen.value;
};

</script>

<style lang="scss" scoped>
img {
    transition: all ease-in-out 0.3s;
}
</style>