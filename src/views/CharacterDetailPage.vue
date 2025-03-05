<template>
  <div class="character-detail-container">
    <h1>Character detail page</h1>
    <!-- Loading Spinner -->
    <div v-if="loading">
      <l-trefoil
        v-if="loading"
        class="loading-spinner"
        size="40"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.4"
        color="white"
      ></l-trefoil>
    </div>

    <!-- Character Detail Page -->
    <div v-else-if="character">
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
