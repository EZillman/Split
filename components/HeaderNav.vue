
<template>
    <header :class="{ 'header-hidden': scrollDirection === 'up' }">
        
        <NavMenu></NavMenu>     
        <h1 :class="{ 'h1-hidden': scrollDirection === 'up' }">
            Split
        </h1>   
    </header>
</template>

<script setup>
const scrollDirection = ref('down');

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
</script>

<style lang="scss" scoped>

h1 {
    display: none;
}

@media screen and (min-width: 640px) {
    header {
        background-color: #324B4B;
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        height: 8rem;
        transition: all ease-in-out 0.3s;

        h1 {
            display: block;
            margin: 1.6rem 2rem;
            text-transform: uppercase;
            color: #54E3EC;
            transition: all ease-in-out 0.3s;
        }
    }

    .header-hidden {
        height: 0;
        transition: all ease-in-out 0.3s;
    }

    .h1-hidden {
        display: none;
        transition: all ease-in-out 0.3s;
    }
}

@media screen and (min-width: 1100px) {
    header {
        height: 0;

        h1 {
            display: none;
        }
    }


}
</style>