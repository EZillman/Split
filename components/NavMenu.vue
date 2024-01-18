

<template>
    <nav :class="{ 'tablet-nav-open': isMenuOpen }">
        <ul>
            <img src="/desktop-icon.png" class="desktop-icon" height="86" width="226">
            <NuxtLink to="/home" exact-active-class="active-link">
                <li>
                    <img src="/home.png" height="49" width="49"> 
                    Home
                </li>
            </NuxtLink>
            <NuxtLink to="/members" exact-active-class="active-link">
                <li>
                    <img src="/friends.png" height="49" width="49">
                    Members
                </li>
            </NuxtLink>
            <NuxtLink to="chores" exact-active-class="active-link">
                <li>
                    <img src="/vacuum-cleaner.png" height="49" width="49">
                    Chores
                </li>
            </NuxtLink>
            <NuxtLink to="settings" exact-active-class="active-link">
                <li>
                    <img src="/setting.png" height="49" width="49">
                    Settings
                </li>
            </NuxtLink>
        </ul>

    </nav>
    <div>
        <button 
        aria-label="toggle menu"
        :class="{ 'close-btn': isMenuOpen }"
        @click="toggleMenu"
        >
            <img v-if="isMenuOpen" class="close-btn-img" src="/interface.png" height="130" width="130">
            <img v-else src="/list.png" class="open-btn-img" height="111" width="95">

        </button>        
    </div>

</template>

<script setup>
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

</script>

<style lang="scss" scoped>

nav {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #324B4B;

    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0;
        margin: 0.2rem;

        a {
            background-color: #4D6C6C;
            margin: 0 0.1rem;
            padding: 1rem 0.3rem;
            width: 25%;
            text-align: center;
            text-decoration: none;            

            li {
                max-height: 5rem;
                max-width: 5rem;
                list-style-type: none;
                color: #D4F5F4;
            }    
            
            &.active-link {
                background-color: #324B4B;
            }
        }
     
    }

}

div button {
    display: none;
}

.desktop-icon {
    display: none;
}

@media screen and (min-width: 760px) {
    nav {
        height: 100%;
        width: 100%;
        right: -100%;
        transition: all 0.3s ease-in-out;

        ul {
            flex-direction: column;
                    
            a {
                width: 100%;
                text-align: left;
                padding-left: 10%;
                margin-top: 3rem;
                background-color: #324B4B;

                li {
                    font-size: 48px;
                    color: #54E3EC;
                }

                &.active-link {
                    text-decoration: underline #54E3EC;
                }
            }

        }

    }

    .tablet-nav-open {
        transition: all 0.3s ease-in-out;
        right: 0;
    }

    div button {
        right: 1rem;
        padding: 0;
        display: block;
        height: 7rem;
        width: 7rem;
        position: absolute;
        background-color: #324B4B;
    }

    .open-btn-img {
        margin-left: -0.3rem;
    }

    .close-btn-img {
        margin: -0.8rem 0 0 -0.7rem ;
    }

    .close-btn {
        box-shadow: none;
        border: 0.2rem #54E3EC solid;
    }
}

@media screen and (min-width: 1024px) {

    nav {
        height: 15%;
        top: 0;
        right: 0;
        background-color: #324b4b00;

        ul {
            flex-direction: row;

            a {
                margin-top: 0;
                background-color: #324b4b00;

                li {
                    color: #324B4B;
                    font-size: 48px;
                    transition: all 0.3s ease-in-out;

                    img {
                        display: none;
                    }
                }

                li:hover {
                    font-size: 50px;
                    transition: all 0.3s ease-in-out;
                }

                &.active-link {
                    background-color: #324b4b00;
                    text-decoration: underline #324B4B;
                }
            }
        }
    }

    div button {
        display: none;
    }

    .desktop-icon {
        display: block;
    }

}
</style>