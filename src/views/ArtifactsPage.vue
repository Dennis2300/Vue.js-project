<template>
  <div class="artifacts-container">
    <LoadingSpinner v-if="loading" />
    <h1>Welcome to the Artifacts Page</h1>
    <div v-if="!loading && !error">
      <div v-for="artifact in artifacts" :key="artifact.id">
        <div>
          <img :src="artifact.flower_url" alt="">
          <img :src="artifact.plume_url" alt="">
          <img :src="artifact.sands_url" alt="">
          <img :src="artifact.goblet_url" alt="">
          <img :src="artifact.circlet_url" alt="">
          <h2>{{ artifact.name }}</h2>
          <p>{{ artifact.two_piece_set }}</p>
          <p>{{ artifact.four_piece_set }}</p>
          <p>{{ artifact.source }}</p>
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
.artifacts-container {
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
