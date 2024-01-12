<template>
    <div>
        <h2>Login</h2> 

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

            <label for="password">
                Password
            </label>
            <input
            type="password" 
            id="password"
            name="password" 
            v-model="password"
            />

            <p v-if="errorMsg">{{ errorMsg }}</p>

            <button type="submit">
                Login
            </button>
        </form>       
    </div>


</template>

<script setup>
import { useUserStore } from '~/store/user.js';

const router = useRouter();
const store = useUserStore();
const supabase = useSupabaseClient()
const email = ref('');
const password = ref(null);
const errorMsg = ref(null);

async function login() {
    try {
        const { user, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        store.setUser(user);
        router.push('/home');
        if (error) throw error; 
    } catch (error) {
        errorMsg.value = error.message;
    }
}

async function submitForm() {
    await login();
    console.log('logged in');
}

</script>

<style lang="scss" scoped>

</style>