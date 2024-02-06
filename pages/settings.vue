<template>
    <HeaderNav></HeaderNav>
    <main>
        <h2>Settings</h2>
        
        <div class="settings-forms-container">
           <div class="show-and-hide-container desktop-form-container">
                <div class="center-btn-container">
                    <div class="add-btn-container btn-container">
                        <h3>Edit account</h3>
                        <button @click="toggleEditUser" aria-label="toggle show edit user form">
                            <img :class="{ rotated: isEditUserOpen }" src="/down.png" alt="up and down icon" height="30" width="30">
                        </button>            
                    </div>
                </div>

                <Transition name="fade">
                    <EditUserForm v-if="isEditUserOpen"></EditUserForm>
                </Transition>            
            </div>
        </div>
 
        <div class="logout-btn">
            <LogoutBtn></LogoutBtn>            
        </div>

    </main>
</template>

<script setup>
const isEditUserOpen = ref(false);

const toggleEditUser = () => {
    isEditUserOpen.value = !isEditUserOpen.value;
}

</script>

<style lang="scss" scoped>
img {
    transition: all ease-in-out 0.3s;
}

@media screen and (min-width: 640px) {
    .logout-btn {
        margin: 1rem;
    }    
}


@media screen and (min-width: 1100px) {
    .settings-forms-container {
        display: flex;
    }
    .desktop-form-container {
        border: 0.1rem #324B4B solid;
        background-color: #DEF2EB;
        width: 100%;
        margin: 0;
        border-radius: 0;
    }   

    .center-btn-container {
        display: flex;
        justify-content: center;
    }
    
    .btn-container {
        justify-content: space-between;
        width: 18rem;
        margin: 0 1rem;
    }

    .logout-btn {
        width: 20rem;
    }
}


</style>