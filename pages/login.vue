<template>
    <main>
        <div>
            <div v-if="showLoginForm">
                <LoginForm></LoginForm>
            </div>

            <div v-else>
                <CreateAccountForm></CreateAccountForm>
            </div>

            <button @click="toggleForms">
                {{ formAlternatives }}
            </button>
        </div>
    </main>
</template>

<script setup>
let showLoginForm = ref(true);
let formAlternatives = ref('Create account');

function toggleForms() {
    showLoginForm.value = !showLoginForm.value;
    formAlternatives.value = showLoginForm.value ? 'Create account' : 'Login';
}
</script>

<style lang="scss" scoped>

</style>