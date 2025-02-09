<template>
  <div>
    <h1 class="character-page-header">Genshin Impact Characters</h1>

    <!-- Show loading spinner if loading -->
    <div v-if="loading" class="loading-spinner-container">
      <l-trefoil
        class="loading-spinner"
        size="40"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.4"
        color="white"
      ></l-trefoil>
    </div>

    <!-- Show characters -->
    <div v-if="!loading && !error && characters?.length">
      <div
        v-for="character in characters"
        :key="character.id"
      >
        <img
          :src="character.image_url"
          :alt="character.name"
        />
        <h2>{{ character.name }}</h2>
      </div>
    </div>

    <!-- Show error message if there is an error -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";
import "./../css/CharactersPage.css";
import "ldrs/trefoil";

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Data states
const characters = ref([]);

async function GetAllCharacters() {
  try {
    let { data, error: fetchError } = await supabase
      .from("character")
      .select("*");
    if (fetchError) throw fetchError;
    characters.value = data;
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(async () => {
  loading.value = true;
  await GetAllCharacters();
  loading.value = false;
});
</script>
