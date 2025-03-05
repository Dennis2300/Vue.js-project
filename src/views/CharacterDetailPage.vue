<template>
  <div class="character-detail-container">
    <!-- Loading Spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- Character Detail Page -->
    <div v-else-if="character" class="character-detail">
      <h1>{{ character.name }}</h1>
    </div>

    <!-- Error Message-->
    <div v-else>
      <p>Character not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "./../supabaseClient.js";

import "ldrs/trefoil";
import "./../css/CharacterDetailPage.css";
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component

const route = useRoute();
const character = ref(null);
const loading = ref(true);

async function fetchCharacterDetails(characterId) {
  try {
    const { data, error } = await supabase
      .from("character")
      .select("*, vision:vision_id(name, image_url)")
      .eq("id", characterId)
      .single();

    if (error) throw error;
    return data; // Return the fetched character data
  } catch (err) {
    console.error("Error fetching character:", err);
    return null; // Return null if there's an error
  }
}

onMounted(async () => {
  const characterId = route.params.id;
  loading.value = true;
  character.value = await fetchCharacterDetails(characterId);
  loading.value = false;
});
</script>
