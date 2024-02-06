<template>
    <div class="chore">
      <div class="loading-spinner">
        <LoadingSpinner v-if="loading"></LoadingSpinner>        
      </div>
        <div>
            <ul class="breadcrumbs">
              <li>
                <NuxtLink to="/chores">
                  Chores
                </NuxtLink>
              </li>
              <li>/</li>
              
              <li>
                <NuxtLink :to="'/chores/' + chore.name" class="link-active">
                    {{ chore.name }}                   
                </NuxtLink>
              </li> 
            </ul>
        </div>
        <h2>{{ chore.name }}</h2>
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
const loading = ref(false);

function subscribeToDatabaseChanges() {
  const channel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: '*',
      },
      async (payload) => {
        await fetchChore();
      } 
    )
    .subscribe()

  return channel;
}

onMounted(async () => {
  store.getChoreIdFromLocalStorage();
  await fetchChore();
  subscribeToDatabaseChanges();
});

async function fetchChore() {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('chores')
      .select('*')
      .eq('id', store.choreId)
      .single(); 
    if (error) throw error;
    chore.value = data;
    loading.value = false;
    emit('chosenChore', chore);
  } catch (error) {
    console.error('Error fetching chore:', error.message);
  }
}
</script>

<style lang="scss" scoped>
.chore-container {
    margin: 0.5rem;
    padding: 0.2rem;
    border: 0.1rem #54E3EC solid;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.2rem 0.2rem #00000023;
    background-color: #aececd86;
}

@media screen and (min-width: 640px) {
  .chore-container {
    margin: 2rem 10rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (min-width: 1100px) {
  .chore-container {
    margin: 10rem 1rem 0.5rem 2rem;
    height: 22rem;
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