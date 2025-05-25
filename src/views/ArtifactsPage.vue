<template>
  <div class="artifacts-page-container">
    <h1 class="divider mb-10">Artifact Page</h1>
    <!--Loading for when fetching is in progress-->
    <LoadingSpinner v-if="loading" />

    <!--Display data when loading is done-->
    <div v-if="!loading && !error" class="artifacts-display-grid">
      <div v-for="artifact in artifacts" :key="artifact.id">
        <div class="artifact-card">
          <img class="artifact-img" :src="artifact.flower_url" alt="" />
          <h2 class="truncate artifact-name">
            {{ artifact.name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import MarkdownRender from "./../components/MarkdownRender.vue";

const loading = ref(true);
const error = ref(null);

const artifacts = ref([]);

async function getAllArtifacts() {
  try {
    let { data, error: fetchError } = await supabase
      .from("artifacts")
      .select("*")
      .order("id", { ascending: true });
    if (fetchError) throw fetchError;
    artifacts.value = data;
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

.artifacts-display-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.artifact-card {
  background-color: var(--secondary);
  padding: 25px;
  width: 350px;
  display: flex;
  justify-items: center;
  align-items: center;
  border-radius: 25px;
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
