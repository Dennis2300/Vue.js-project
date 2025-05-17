<template>
  <div class="teams-container">
    <LoadingSpinner v-if="loading" />
    <h1>Welcome to the Teams Page</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component

const loading = ref(true);
const error = ref(null);

const teams = ref([]);

async function getAllTeams() {
  try {
    let { data, error: fetchError } = await supabase
      .from("teams")
      .select(
        "*, slot_1(name), slot_2(name), slot_3(name), slot_4(name)"
      );
    if (fetchError) throw fetchError;
    teams.value = data;
    console.log("Teams data:", teams.value);
  } catch (fetchError) {
    error.value = fetchError.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getAllTeams();
});
</script>

<style scoped>
.teams-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  font-size: 2rem;
  color: white;
}
</style>
