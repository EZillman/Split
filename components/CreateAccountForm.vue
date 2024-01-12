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

            <label for="displayName">
                Household name
            </label>
            <input
            type="text"
            id="displayName"
            name="displayName"
            v-model="displayName"
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

            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p>

            <button type="submit">
                Create account
            </button>
        </form>
    </div>
</template>

<script setup>
import { useAccountStore } from '~/store/account.js';

const store = useAccountStore();
const supabase = useSupabaseClient();
const email = ref('');
const displayName = ref('');
const password = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

async function signUp() {
    try {
        const { user, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        })
        // save name in a different table
        if (error) throw error;

        store.setAccount(user);
        successMsg.value = 'A confirmation will be sent to your email!';
    } catch (error) {
        errorMsg.value = error.message;
    }

}

async function submitForm() {
    await signUp();
}
</script>

<style lang="scss" scoped>

</style>