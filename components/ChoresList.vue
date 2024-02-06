<template>
    <div class="members-and-chores">
      <div class="loading-spinner">
        <LoadingSpinner v-if="loading"></LoadingSpinner>        
      </div>
      
        <ul class="chore-container">
          <transition-group name="fade">
            <li v-for="chore in chores" :key="chore.id" >
                <div>
                  <h3>{{ chore.name }}</h3>
                  <button @click="selectChore(chore.name, chore.id)">Select</button>                  
                </div>

                <div>
                  <p>Time estimated: {{ chore.time_estimated }} minutes</p>
                  <p>Monthly frequency: {{ chore.monthly_frequency }}</p>
                </div>
            </li>            
          </transition-group>

        </ul>
    </div>
</template>

<script setup>
import { useChoreStore } from '~/store/chore.js';

const router = useRouter();
const supabase = useSupabaseClient();
const store = useChoreStore();
const user = useSupabaseUser();
const userId = user.value.id;
const chores = ref([]);
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
        await fetchChores();
      } 
    )
    .subscribe()

  return channel;
}

onMounted(async () => {
  await fetchChores();
  subscribeToDatabaseChanges();
});

async function fetchChores() {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('chores')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    chores.value = data;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching chores:', error.message);
  }
}

function selectChore(choreName, choreId) {
  localStorage.setItem('choreId', choreId);
  store.setChoreId(choreId);
  const formattedName = choreName.toLowerCase().replace(/\s+/g, '-');
  const routePath = `/chores/${formattedName}`;
  router.push(routePath);
}

</script>

<style lang="scss" scoped>

button {
    width: 30%;
    margin-top: 0.5rem;
}

@media screen and (min-width: 1100px) {
  ul {
    display: block;
  }

  li {
    width: 100%;
  }
}
</style>
