<template>
    <div class="text-container">
        <h3>Your household doesn't have any assignments!</h3>
        <p>You need to:</p>

        <div>
            <ul>
                <li>
                    Add some chores to your household
                </li>
                <li>
                    Add some members to your household
                </li>
                <li>
                    Assign chores to your members
                </li>
            </ul>            
        </div>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0.5rem;
    padding: 1rem;
    border: 0.12rem solid #54E3EC;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.2rem 0.2rem #00000023;
    color: #324B4B;
    background-color: #aececd86;

    div {
        display: flex;
        justify-content: center;        
    }
}

h3 {
    display: flex;
    justify-content: center;
    margin: 0.5rem;
}

ul {
    list-style-type: disc;
    padding-left: 0.2rem;
}


@media screen and (min-width: 640px) {
    .text-container  {
        margin: 1rem 5rem;
    }
}

@media screen and (min-width: 1100px) {
    .text-container  {
        margin: 1rem 20rem;
    }

    p {
        font-size: 1.75rem;
    }

    li {
        font-size: 1.5rem;
    }
}
</style>