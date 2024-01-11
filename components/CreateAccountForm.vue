<template>
    <div>
        <h2>Create account</h2>

        <form @submit.prevent="submitForm">
            <label for="email">
                Email
            </label>
            <input 
            type="email"
            id="email"
            name="email"
            v-model="email"
            />

            <label for="name">
                Household name
            </label>
            <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            />

            <label for="password">
                Password
            </label>
            <input
            type="password" 
            id="password"
            name="password" 
            v-model="password"
            />

            <button type="submit">
                Create account
            </button>
        </form>
    </div>
</template>

<script setup>
//const store = useAccountStore();
const email = ref('');
const name = ref('');
const password = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

async function signUp() {

}

async function submitForm() {
    //await signUp();
}
</script>

<style lang="scss" scoped>

</style>