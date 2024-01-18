<template>
    <HeaderNav></HeaderNav>
    <main>
        <h2>Members</h2>

        <div class="add-btn-container">
            <h3>Add members</h3>
            <button @click="toggleAddMembers">
                <img v-if="isAddMembersOpen" src="/up.png" height="30" width="30">
                <img v-else src="/down.png" height="30" width="30">
            </button>            
        </div>

        <CreateMemberForm v-if="isAddMembersOpen"></CreateMemberForm>
        <MembersList></MembersList>

    </main>
</template>

<script setup>
const isAddMembersOpen = ref(false);

const toggleAddMembers = () => {
  isAddMembersOpen.value = !isAddMembersOpen.value;
};
</script>

<style lang="scss" scoped>

</style>