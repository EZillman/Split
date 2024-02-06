<template>
    <HeaderNav></HeaderNav>
    <main>
        <h2>Members</h2>

        <div class="members-and-chores-container">
            <div class="show-and-hide-container">
                <div class="add-btn-container">
                    <h3>Add members</h3>
                    <button @click="toggleAddMembers" aria-label="toggle show add members form">
                        <img :class="{ rotated: isAddMembersOpen }" src="/down.png" alt="up and down icon" height="30" width="30">
                    </button>            
                </div>

                <Transition name="fade">
                    <CreateMemberForm v-if="isAddMembersOpen"></CreateMemberForm>            
                </Transition>            
            </div>

            <MembersList></MembersList>            
        </div>

    </main>
</template>

<script setup>
import '../assets/main.css';

const isAddMembersOpen = ref(false);

const toggleAddMembers = () => {
  isAddMembersOpen.value = !isAddMembersOpen.value;
};
</script>

<style lang="scss" scoped>
img {
    transition: all ease-in-out 0.3s;
}

</style>