<template>
    <nav :class="{ 'tablet-nav-open': isMenuOpen, 'nav-small': scrollDirection === 'up' }">
        <ul>
            <li>
                <NuxtLink to="/home" exact-active-class="active-link">
                    <img src="/home.png" height="49" width="49" alt="Home icon"> 
                    Home
                </NuxtLink>
            </li>
            
            <li>
                <NuxtLink to="/members" exact-active-class="active-link">
                    <img src="/friends.png" height="49" width="49" alt="Members icon">
                    Members
                </NuxtLink>
            </li>
            
            <li>
                <NuxtLink to="/chores" exact-active-class="active-link">
                <img src="/vacuum-cleaner.png" height="49" width="49" alt="Chores icon">
                Chores              
                </NuxtLink>                
            </li>
            
            <li>
                <NuxtLink to="/settings" exact-active-class="active-link">
                    <img src="/setting.png" height="49" width="49" alt="Settings icon">
                    Settings
                </NuxtLink>
            </li>

        </ul>

    </nav>
    <div>
        <button 
        aria-label="toggle menu"
        :class="{ 'close-btn': isMenuOpen }"
        @click="toggleMenu"
        >
            <img v-if="isMenuOpen" class="close-btn-img" src="/interface.png" height="130" width="130" alt="Close menu button">
            <img v-else src="/list.png" class="open-btn-img" height="111" width="95" alt="Open menu button">

        </button>        
    </div>

</template>

<script setup>
const scrollDirection = ref('down');
const isMenuOpen = ref(false);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  const scrollY = window.scrollY;
  if (scrollY > 0 && scrollDirection.value !== 'up') {
    scrollDirection.value = 'up';
  } else if (scrollY === 0 && scrollDirection.value !== 'down') {
    scrollDirection.value = 'down';
  }
};

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
        height: 7rem;

        li {
            background-color: #4D6C6C;
            margin: 0 0.1rem;
            padding: 1rem 0.3rem;
            width: 25%;
            text-align: center;
            list-style-type: none;          

            a {
                display: block;
                height: 100%;
                width: 100%;
                text-decoration: none;
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

.only-desktop {
    display: none;
}

@media screen and (min-width: 640px) {
    nav {
        z-index: 2;
        height: 100%;
        width: 100%;
        right: -100%;
        transition: all 0.3s ease-in-out;

        ul {
            flex-direction: column;
                    
            li {
                width: 100%;
                text-align: left;
                padding-left: 10%;
                margin-top: 3rem;
                background-color: #324B4B;

                a {
                    color: #54E3EC;
                    font-size: 3rem;
                    
                    &.active-link {
                        text-decoration: underline #54E3EC;
                    }

                }


            }

        }

    }

    .tablet-nav-open {
        transition: all 0.3s ease-in-out;
        right: 0;
    }

    div button {
        z-index: 2;
        right: 0;
        top: 0;
        padding: 0;
        display: block;
        height: 7rem;
        width: 7rem;
        position: fixed;
        background-color: #324B4B;
        box-shadow: none;
    }

    .open-btn-img {
        margin-left: -0.3rem;
    }

    .close-btn-img {
        margin: -0.8rem 0 0 -0.7rem ;
    }

    .close-btn {
        border: 0.2rem #54E3EC solid;
    }
}

@media screen and (min-width: 1100px) {

    nav {
        height: 8.2rem;
        top: 0;
        right: 0;

        ul {
            flex-direction: row;
            padding-left: 5rem;

            li {
                margin-top: 0;
                padding-left: 0;
                background-color: #324b4b00;

                a {
                    transition: all 0.3s ease-in-out;
                    font-size: 4rem;

                    img {
                        display: none;
                    }
                    
                    &.active-link {
                        background-color: #324b4b00;
                        text-decoration: underline #54E3EC;
                    } 
                }

                a:hover {
                    font-size: 4.2rem;
                    transition: all 0.3s ease-in-out;
                }


            }
        }
    }

    div button {
        display: none;
    }

    .nav-small {
        height: 6rem;

        ul {
            height: 5rem;
        }

        a {
            font-size: 3rem;
        }

        a:hover {
            font-size: 3.2rem;
        }
    }

}
</style>