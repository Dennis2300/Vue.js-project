<template>
  <div class="teams-container">
    <LoadingSpinner v-if="loading" />
    <h1>Welcome to the Teams Page</h1>
    <div v-if="!loading && !error">
      <div v-for="team in teams" :key="team.id">
        <h2>{{ team.name }}</h2>
        <div>
          <img :src="team.slot_1.image_url" alt="" />
          <img :src="team.slot_2.image_url" alt="" />
          <img :src="team.slot_3.image_url" alt="" />
          <img :src="team.slot_4.image_url" alt="" />
          <p>
            {{ team.slot_1.name }} {{ team.slot_2.name }}
            {{ team.slot_3.name }} {{ team.slot_4.name }}
          </p>
        </div>
      </div>
    </div>
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
    const slotSelects = [1, 2, 3, 4]
      .map((slot) => `slot_${slot}(name, image_url)`)
      .join(", ");

    let { data, error: fetchError } = await supabase
      .from("teams")
      .select(`*, ${slotSelects}`);

    if (fetchError) throw fetchError;
    teams.value = data;
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
