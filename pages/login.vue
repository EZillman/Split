<template>
    <header>
        <div></div>
    </header>
    <main>
        <div class="landing-container">
            <div v-if="showLoginForm">
                <LoginForm></LoginForm>
                <p>
                    Don't have an account?
                </p>   
            </div>

            <div v-else>
                <CreateAccountForm></CreateAccountForm>
                <p>
                    Already have an account?
                </p>   
            </div>

            <div class="button-container">
                <button @click="toggleForms">
                    {{ formAlternatives }}
                </button>                
            </div>

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

header {
    div{
        height: 70px;
        width: 145px;
        background-image: url('/mobile-icon.png');
    }
}

button {
    color: #D4F5F4;
    background-color: #324B4B;
    border-color: #54E3EC;
}

p {
    margin-top: 2rem;
}

.landing-container {
    margin: 1% 3%;
}

@media screen and (min-width: 760px) {
    header {
        div{
            height: 95px;
            width: 240px;
            background-image: url('/tablet-icon.png');
        }
    }

    p {
        margin-top: 4rem;
    }

    .landing-container {
        margin: 5% 12%;
        padding: 0.8rem;
        border: 0.1rem #54E3EC solid;
        border-radius: 0.5rem;
        background-color: #aececd86;
    }
}

@media screen and (min-width: 1024px) {
    header {
        div{
            height: 120px;
            width: 330px;
            background-image: url('/desktop-icon.png');
        }
    }

    .landing-container {
        margin: 5% 20%;
        padding: 1rem;
    }
}

</style>