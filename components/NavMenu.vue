

<template>
    <nav>
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
</template>

<script setup>

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

                list-style-type: none;
                color: #D4F5F4;
            }    
            
            &.active-link {
                background-color: #324B4B;
            }
        }
     
    }

}

.desktop-icon {
    display: none;
}

@media screen and (min-width: 760px) {
    nav {
        height: 100%;
        width: 100%;

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

}

@media screen and (min-width: 1024px) {

    nav {
        height: 20%;
        top: 0;
        background-color: #324b4b00;

        ul {
            flex-direction: row;

            a {
                margin-top: 0;
                background-color: #324b4b00;

                li {
                    color: #324B4B;
                    font-size: 48px;

                    img {
                        display: none;
                    }
                }

                &.active-link {
                    background-color: #324b4b00;
                    text-decoration: underline #324B4B;
                }
            }
        }
    }

    .desktop-icon {
        display: block;
    }

}
</style>