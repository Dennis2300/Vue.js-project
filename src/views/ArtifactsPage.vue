<template>
  <div class="artifacts-page-container">
    <h1 class="divider mb-10 artifacts-page-header">Artifacts Archive</h1>
    <!--Loading for when fetching is in progress-->
    <LoadingSpinner v-if="loading" />

    <!--Display data when loading is done-->
    <div v-if="!loading && !error" class="artifacts-display-grid">
      <div v-for="artifact in artifacts" :key="artifact.id">
        <router-link
          :to="`/artifacts/${artifact.id}?name=${encodeURIComponent(
            artifact.name
          )}`"
          class="artifact-card"
        >
          <img
            class="artifact-img"
            :src="artifact.flower_url"
            :alt="artifact.name"
          />
          <h2 class="truncate artifact-name">
            {{ artifact.name }}
          </h2>
        </router-link>
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

const artifacts = ref([]);

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

function getCachedData(key) {
  const cachedData = sessionStorage.getItem(key);

  if (!cachedData) {
    return null;
  }

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();

  if (now - timestamp < CACHE_DURATION) {
    return data;
  } else {
    sessionStorage.removeItem(key);
    return null;
  }
}

function setCachedData(key, data) {
  const cache = {
    timestamp: new Date().getTime(),
    data,
  };
  sessionStorage.setItem(key, JSON.stringify(cache));
}

async function getAllArtifacts() {
  const cacheKey = "artifacts";

  // Check if cached data exists
  const cachedArtifacts = getCachedData(cacheKey);
  if (cachedArtifacts) {
    artifacts.value = cachedArtifacts;
    loading.value = false;
    return;
  }

  // Fetch data from Supabase
  try {
    let { data, error: fetchError } = await supabase
      .from("artifacts")
      .select("id, name, flower_url")
      .order("id", { ascending: true });

    if (fetchError) throw fetchError;

    artifacts.value = data;
    setCachedData(cacheKey, data); // Cache the fetched data
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getAllArtifacts();
});
</script>

<style scoped>
.artifacts-page-container {
  margin-top: 25px;
  width: 100vw;
  padding: 50px;
}

.artifacts-page-header {
  font-family: var(--font-alfa);
  font-weight: lighter;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: default;
}

.artifacts-display-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.artifact-card {
  background-color: var(--secondary);
  font-family: var(--font-acme);
  padding: 25px;
  width: 350px;
  display: flex;
  justify-items: center;
  align-items: center;
  border-radius: 25px;
  font-size: 1.25em;
  text-decoration: none;
  color: var(--tertiary);
}

.artifact-name {
  padding-left: 5px;
}

.artifact-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
