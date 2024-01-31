<template>
    <HeaderNav></HeaderNav>
    <main>
        <h2>Settings</h2>

        <div class="add-btn-container">
            <h3>Edit account</h3>
            <button @click="toggleEditUser">
                <img :class="{ rotated: isEditUserOpen }" src="/down.png" height="30" width="30">
            </button>            
        </div>

        <Transition name="fade">
            <EditUserForm v-if="isEditUserOpen"></EditUserForm>
        </Transition>

        <div class="add-btn-container">
            <h3>Edit household</h3>
            <button @click="toggleEditHousehold">
                <img :class="{ rotated: isEditHouseholdOpen }" src="/down.png" height="30" width="30">
            </button>            
        </div>

        <Transition name="fade">
            <EditHouseholdForm v-if="isEditHouseholdOpen"></EditHouseholdForm>
        </Transition>

        <LogoutBtn></LogoutBtn>
    </main>
</template>

<script setup>
const isEditUserOpen = ref(false);
const isEditHouseholdOpen = ref(false);

const toggleEditUser = () => {
    isEditUserOpen.value = !isEditUserOpen.value;
}

const toggleEditHousehold = () => {
    isEditHouseholdOpen.value = !isEditHouseholdOpen.value;
}

</script>

<style lang="scss" scoped>
img {
    transition: all ease-in-out 0.3s;
}

</style>