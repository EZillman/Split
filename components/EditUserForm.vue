<template>
    <div>
        <form @submit.prevent="submitForm">
            <div class="inputs-container">

                <div class="input-container">
                    <label for="email">
                        Email
                    </label>
                    <input 
                    type="email"
                    id="email"
                    name="email"
                    v-model="email"
                    placeholder="example@gmail.com"
                    />                
                </div>

                <div class="input-container">
                    <label for="password">
                        Password
                    </label>
                    <input
                    type="password" 
                    id="password"
                    name="password" 
                    v-model="password"
                    />                
                </div>               
            </div>

            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p>

            <button type="submit">
                Save changes
            </button>
        </form>    
    </div>
</template>

<script setup>
const email = ref('');
const password = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

function showSuccessMsg() {
    successMsg.value = 'User is updated!';
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function updateUser() {
    const editedUser = {
        email: email.value || user.value.email,
        password: password.value || undefined,
    }
    try {
        const { data, error } = await supabase.auth.updateUser(editedUser);
        showSuccessMsg();
        if (error) throw error;
    } catch (error) {
        errorMsg.value = error.message;
    }   
}

async function submitForm() {
    await updateUser();
}

</script>

<style lang="scss" scoped>

</style>