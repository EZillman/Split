<template>
    <div>
        <div class="spinner"></div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.spinner {
    display: block;
    border: 0.5rem solid #324B4B; 
    border-top: 0.5rem solid #54E3EC; 
    border-radius: 50%;
    width: 50px; 
    height: 50px; 
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>