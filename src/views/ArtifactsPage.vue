<template>
  <div class="artifacts-page-container">
    <LoadingSpinner v-if="loading" />
    <div v-if="!loading && !error">
      <div v-for="artifact in artifacts" :key="artifact.id">
 
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

</style>
