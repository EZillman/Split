<template>
    <div class="members-and-chores">
        <ul class="chore-container">
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
  try {
    const { data, error } = await supabase
      .from('chores')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    chores.value = data;
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
    //color: #D4F5F4;
    //background-color: #324B4B;
    //border-color: #54E3EC;
}

@media screen and (min-width: 1024px) {
  ul {
    display: block;
  }

  li {
    width: 100%;
  }
}
</style>
