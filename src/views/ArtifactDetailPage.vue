<template>
  <div class="artifact-detail-page-container">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="artifact" class="artifact-detail-container">
      <div class="artifact-detail">
        <h1 class="artifact-name divider mb-7">{{ artifact.name }}</h1>
        <!-- Image Container -->
        <div class="artifact-img-container">
          <img
            :src="artifact.flower_url"
            alt="Artifact Image"
            class="artifact-img"
          />
          <img
            :src="artifact.plume_url"
            alt="Artifact Image"
            class="artifact-img"
          />
          <img
            :src="artifact.sands_url"
            alt="Artifact Image"
            class="artifact-img"
          />
          <img
            :src="artifact.goblet_url"
            alt="Artifact Image"
            class="artifact-img"
          />
          <img
            :src="artifact.circlet_url"
            alt="Artifact Image"
            class="artifact-img"
          />
        </div>
        
        <!-- Artifact Attributes -->
        <div class="artifact-attributes-container">
          <div class="artifact-two-piece-set">
            <h1>2 Piece Bonus</h1>
            <p>{{ artifact.two_piece_set }}</p>
          </div>
          <div class="artifact-four-piece-set">
            <h1>4 Piece Bonus</h1>
            <MarkdownRender
              class="artifact-four-piece-set-text"
              :content="artifact.four_piece_set"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client

import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import MarkdownRender from "./../components/MarkdownRender.vue";

const route = useRoute();
const loading = ref(true);

const artifact = ref(null);

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

async function fetchArtifactDetails(artifactId) {
  const cacheKey = `artifact-${artifactId}`;
  const cachedArtifact = getCachedData(cacheKey);

  if (cachedArtifact) return cachedArtifact;

  try {
    const { data: artifactData, error: artifactError } = await supabase
      .from("artifacts")
      .select("*")
      .eq("id", artifactId)
      .single();
    if (artifactError) throw artifactError;

    setCachedData(cacheKey, artifactData);
    return artifactData;
  } catch (err) {
    console.log("Error fetching artifact:", err);
    return null;
  }
}

onMounted(async () => {
  const artifactId = route.params.id;
  loading.value = true;
  artifact.value = await fetchArtifactDetails(artifactId);
  loading.value = false;
});
</script>

<style scoped>
.artifact-detail-page-container {
  padding: 0;
  margin: 50px 0px 100px 0px;
}

.artifact-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.artifact-detail {
  background-color: var(--secondary);
  width: 1200px;
  padding: 50px;
  border-radius: 25px;
}

.artifact-name {
  font-family: var(--font-acme);
  font-size: 3rem;
  letter-spacing: 1px;
}

.artifact-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.artifact-img {
  width: 150px;
  height: 150px;
  margin: 10px;
}

.artifact-attributes-container {
  margin-top: 20px;
}

.artifact-two-piece-set h1 {
  color: var(--tertiary);
  font-family: var(--font-bungee);
}

.artifact-two-piece-set p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5em;
  letter-spacing: 1px;
  margin: 5px 0px 35px 0px;
}

.artifact-four-piece-set h1 {
  color: var(--tertiary);
  font-family: var(--font-bungee);
  margin-top: 25px;
}

.artifact-four-piece-set-text {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5em;
  letter-spacing: 1px;
}
</style>
