<template>
    <div class="chore">
        <div>
            <ul class="breadcrumbs">
                <NuxtLink to="/chores">
                    <li>Chores</li>
                </NuxtLink>
                <li>/</li>
                <NuxtLink :to="'/chores/' + $route.params.name">
                    <li>{{ $route.params.name }}</li>                    
                </NuxtLink>

            </ul>
        </div>
        <h2>{{ $route.params.name }}</h2>
        <div class="chore-container">
          <p>Time estimated: {{ chore.time_estimated }} minutes</p>
          <p>Monthly frequency: {{ chore.monthly_frequency }} times a month</p>          
        </div>
    </div>
</template>

<script setup>
import { useChoreStore } from '~/store/chore.js';

const store = useChoreStore();
const supabase = useSupabaseClient();
const chore = ref({});
const emit = defineEmits();

onMounted(async () => {
  store.getChoreIdFromLocalStorage();
  await fetchChore();
});

async function fetchChore() {
  try {
    const { data, error } = await supabase
      .from('chores')
      .select('*')
      .eq('id', store.choreId)
      .single(); 
    if (error) throw error;
    chore.value = data;
    emit('chosenChore', chore);
  } catch (error) {
    console.error('Error fetching chore:', error.message);
  }
}
</script>

<style lang="scss" scoped>
.chore-container {
    margin: 2%;
    border: 0.1rem #54E3EC solid;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.2rem 0.2rem #00000023;
    background-color: #aececd86;
}

@media screen and (min-width: 760px) {
  .chore-container {
    margin: 1% 20%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (min-width: 1024px) {
  .chore-container {
    margin: 10rem 1rem 0.5rem 2rem;
  }

  .chore {
    width: 60%;
  }

  .breadcrumbs {
    position: absolute;
    top: 7.2rem;
 
  }

  h2 {
    position: absolute;
    margin-left: 45%;
  }
}
</style>