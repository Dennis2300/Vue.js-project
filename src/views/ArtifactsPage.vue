<template>
  <div class="artifacts-page-container">
    <LoadingSpinner v-if="loading" />
    <div v-if="!loading && !error">
      <div v-for="artifact in artifacts" :key="artifact.id">
        <div class="artifacts-display">
          <h2 class="divider my-7 artifact-name">
            {{ artifact.name }}
          </h2>
          <div class="artifacts-img-container mb-3">
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
          <div class="artifacts-text-container">
            <div class="two-piece-set">
              <h3 class="piece-title">2 Piece Set Bonus</h3>
              <p class="piece-text mt-2 mb-3">{{ artifact.two_piece_set }}</p>
            </div>
            <div class="four-piece-set">
              <h3 class="piece-title">4 Piece Set Bonus</h3>
              <MarkdownRender
                class="piece-text"
                :content="artifact.four_piece_set"
              />
            </div>
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
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.artifacts-display {
  background-color: var(--secondary);
  padding: 15px;
  margin-bottom: 50px;
  border-radius: 25px;
  width: 50vw;
}

.artifact-name {
  font-size: 2.7em;
  font-family: var(--font-acme);
  letter-spacing: 1px;
  font-weight: lighter;
}

.artifacts-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.artifacts-text-container {
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
}

.two-piece-set {
  width: 85%;
  margin: 0 auto;
  text-align: left;
  margin-bottom: 10px;
}

.four-piece-set {
  width: 85%;
  margin: 0 auto;
  text-align: left;
  margin-bottom: 10px;
}

.piece-title {
  font-size: 1.5rem;
  color: var(--tertiary);
}

.piece-text {
  font-size: 1.2rem;
}

.artifact-img {
  width: 100px;
  height: 100px;
  margin: 10px;
}


</style>
