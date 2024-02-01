
<template>
    <header>
        <NavMenu></NavMenu>        
    </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@media screen and (min-width: 760px) {
    header {
        background-color: #324B4B;
        display: block;
        height: 8rem;
    }
}

@media screen and (min-width: 1024px) {
    header {
        height: 0;
    }
}
</style>