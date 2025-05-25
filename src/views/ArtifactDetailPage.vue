<template>
  <div class="artifact-detail-page-container">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="artifact" class="artifact-detail-container">
      <div class="artifact-detail">
        <h1 class="artifact-name divider mb-7">{{ artifact.name }}</h1>
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
        <div class="artifact-attributes-container">
          <div class="artifact-two-piece-set">
            <h1>2 Piece Bonus:</h1>
            <p>{{ artifact.two_piece_set }}</p>
          </div>
          <div class="artifact-four-piece-set">
            <h1>4 Piece Bonus:</h1>
            <p>{{ artifact.four_piece_set }}</p>
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

const artifact = ref(null);
const route = useRoute();
const loading = ref(true);

async function fetchArtifactDetails(artifactId) {
  try {
    const { data: artifactData, error: artifactError } = await supabase
      .from("artifacts")
      .select("*")
      .eq("id", artifactId)
      .single();
    if (artifactError) throw artifactError;

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
  margin: 0;
}

.artifact-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.artifact-detail {
  background-color: var(--secondary);
  height: 66%;
  width: 66%;
  padding: 50px;
  border-radius: 25px;
}

.artifact-name {
  font-size: 3rem;
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



</style>
