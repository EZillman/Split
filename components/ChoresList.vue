<template>
    <div class="members-and-chores">
        <ul>
            <li v-for="chore in chores" :key="chore.id">
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

onMounted(async () => {
  await fetchChores();
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
  store.setChoreId(choreId);
  const formattedName = choreName.toLowerCase().replace(/\s+/g, '-');
  const routePath = `/chores/${formattedName}`;
  router.push(routePath);
}

</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  margin: 0.8rem;
  border: 0.12rem solid #54E3EC;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.2rem 0.2rem #00000023;
  color: #324B4B;
  background-color: #aececd86;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

button {
    width: 30%;
    margin-top: 0.5rem;
    //color: #D4F5F4;
    //background-color: #324B4B;
    //border-color: #54E3EC;
}

@media screen and (min-width: 760px) {
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 2rem;
  }

  li {
    width: 40%;
  }
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
