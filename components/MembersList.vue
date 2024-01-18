<template>
    <div>
        <ul>
            <li v-for="member in members" :key="member.id">
                <h3>{{ member.name }}</h3>
                <button>Select</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const members = ref([]);

onMounted(async () => {
  await fetchMembers();
});

async function fetchMembers() {
  try {
    const { data, error } = await supabase
      .from('household_members')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    members.value = data;
  } catch (error) {
    console.error('Error fetching members:', error.message);
  }
}

</script>

<style lang="scss" scoped>

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  margin: 0.8rem;
  border: 0.12rem solid #54E3EC;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.2rem 0.2rem #00000023;
  color: #324B4B;
  background-color: #aececd86;
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
    width: 30%;
  }
}

</style>