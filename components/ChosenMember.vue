<template>
    <div>
        <div>
            <ul class="breadcrumbs">
              <li>
                <NuxtLink to="/members">
                    Members
                </NuxtLink>                
              </li>

              <li>/</li>
                
              <li v-if="member">
                <NuxtLink :to="'/members/' + member.name" class="link-active">
                    {{ member.name }}                  
                </NuxtLink>                
              </li>
            </ul>
        </div>
        <h2 v-if="member">{{ member.name }}</h2>
    </div>
</template>

<script setup>
import { useMemberStore } from '~/store/member.js';

const store = useMemberStore();
const supabase = useSupabaseClient();
const member = ref({});

onMounted(async () => {
  store.getMemberIdFromLocalStorage();
  await fetchMember();
});

async function fetchMember() {
  try {
    const { data, error } = await supabase
      .from('household_members')
      .select('*')
      .eq('id', store.memberId)
      .single(); 
    if (error) throw error;
    member.value = data;
  } catch (error) {
    console.error('Error fetching member:', error.message);
  }
}
</script>

<style lang="scss" scoped>

</style>