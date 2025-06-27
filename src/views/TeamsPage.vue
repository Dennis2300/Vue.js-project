<template>
  <div class="teams-page-container">
    <LoadingSpinner v-if="loading" />
    <h1 class="teams-page-header">Welcome to the Teams Page</h1>
    <div class="teams-container" v-if="!loading && !error">
      <div class="teams-display" v-for="team in teams" :key="team.id">
        <h2 class="divider">{{ team.name }}</h2>
        <div>
          <img
            v-for="i in 4"
            :key="i"
            :src="team[`slot_${i}`].image_url"
            :class="`rarity-${team[`slot_${i}`].rarity}`"
            class="teams-img"
            alt=""
          />
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
      .map((slot) => `slot_${slot}(name, image_url, rarity)`)
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
.teams-page-container {
  min-height: 90vh;
  margin-top: 75px;
}

.teams-page-header {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.teams-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.teams-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 15px;
  border-radius: 25px;
  background-color: var(--secondary);
}

.teams-img {
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 25px;
}

.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}

.teams-pros-cons-container {
  display: flex;
}
</style>
