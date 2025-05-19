<template>
  <div class="artifacts-page-container">
    <LoadingSpinner v-if="loading" />
    <h1 class="artifact-page-header">Welcome to the Artifacts Page</h1>
    <div v-if="!loading && !error">
      <div v-for="artifact in artifacts" :key="artifact.id">
        <div class="artifacts-display">
          <div class="artifacts-img-container">
            <h2 class="divider">{{ artifact.name }}</h2>

            <img
              class="artifact-img"
              :src="artifact.flower_url"
              :alt="artifact.name"
            />
            <img
              class="artifact-img"
              :src="artifact.plume_url"
              :alt="artifact.name"
            />
            <img
              class="artifact-img"
              :src="artifact.sands_url"
              :alt="artifact.name"
            />
            <img
              class="artifact-img"
              :src="artifact.goblet_url"
              :alt="artifact.name"
            />
            <img
              class="artifact-img"
              :src="artifact.circlet_url"
              :alt="artifact.name"
            />
          </div>
          <div>
            <h3>2 Piece Set Bonus</h3>
            <p>{{ artifact.two_piece_set }}</p>
          </div>
          <div>
            <h3>4 Piece Set Bonus</h3>
            <p>{{ artifact.four_piece_set }}</p>
          </div>
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

const artifacts = ref([]);

async function getAllArtifacts() {
  try {
    let { data, error: fetchError } = await supabase
      .from("artifacts")
      .select("*");
    if (fetchError) throw fetchError;
    artifacts.value = data;
    console.log(artifacts.value);
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
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.artifact-page-header {
  font-size: 2rem;
  color: white;
}

.artifacts-display {
  background-color: var(--secondary);
  padding: 15px;
  margin-bottom: 50px;
  border-radius: 25px;
  width: 50vw;
}

.artifact-img-container {
}

.artifact-img {
  width: 100px;
  height: 100px;
  margin: 10px;
}
</style>
