<template>
    <div>
        <form @submit.prevent="submitForm" class="form-container settings-form-container">
            <p v-if="!existingHousehold">
                Choose a name for your household!
            </p> 
            <div class="input-container">
                <label for="householdName">
                    Household name
                </label>
                <input 
                type="text"
                id="householdName"
                name="householdName"
                v-model="householdName"
                placeholder="a name for your household"
                />                
            </div>     

            <p v-if="successMsg">{{ successMsg }}</p>
            <p v-if="errorMsg">{{ errorMsg }}</p>
            
            <button type="submit">
                Save name
            </button>
        </form>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value.id;
const householdName = ref('');
const existingHousehold = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

onMounted(async () => {
    await checkForHousehold();
});

function showSuccessMsg() {
    successMsg.value = "Your household's name is updated!";
    setTimeout(() => {
        successMsg.value = null;
    }, 3000);
}

async function checkForHousehold() {
    try {
        const { data, error } = await supabase
            .from('households')
            .select('id, name')
            .eq('user_id', userId)
            .single();        

        existingHousehold.value = data;
        if (error) throw error;
    } catch (error) {
        console.error('Error fetching household:', error.message);
    }    
}

async function updateHouseholdName() {

    if (existingHousehold) {
        // If household with the same user_id exists, update name if it's different
        if (existingHousehold.name !== householdName.value) {
            try {
                const { data, error } = await supabase
                    .from('households')
                    .update({ name: householdName.value })
                    .eq('user_id', userId);

                showSuccessMsg();
                if (error) throw error;
            } catch (error) {
                errorMsg.value = error.message;
            }
            
        } else {
            const household = {
                name: householdName.value,
                user_id: userId,
            }
            // If household with the same user_id doesn't exist, add a new one
            try {
                const { data, error } = await supabase
                    .from('households')
                    .insert([
                        household
                    ])
                showSuccessMsg();
                if (error) throw error;
            } catch (error) {
                errorMsg.value = error.message;
            }            
        }
    }
}

async function submitForm() {
    await updateHouseholdName();
}

</script>

<style lang="scss" scoped>
button {
    color: #D4F5F4;
    background-color: #324B4B;
    border-color: #54E3EC;
}
</style>