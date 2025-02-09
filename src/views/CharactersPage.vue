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
    <div class="character-display-container">
      <div
        v-if="!loading && !error && characters?.length"
        class="character-grid"
      >
        <div
          v-for="character in characters"
          :key="character.id"
          class="character-grid-item"
          :class="{
            'rarity-5': character.rarity === 5,
            'rarity-4': character.rarity === 4,
          }"
        >
          <!-- Vision Icon (Top Right Corner) -->
          <img
            v-if="character.vision?.image_url"
            :src="character.vision.image_url"
            :alt="character.vision.name"
            class="vision-icon"
          />
          <img
            class="character-avatar"
            :src="character.image_url"
            :alt="character.name"
          />
          <h3>{{ character.name }}</h3>
          <p class="rarity-text" :data-stars="character.rarity"></p>
        </div>
      </div>
    </div>

    <!-- Show error message if there is an error -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Import the Vue composition API
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import "./../css/CharactersPage.css"; // Import the component's CSS
import "ldrs/trefoil"; // Import the loading spinner component

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Data states
const characters = ref([]);

// Fetch all characters from the database
async function GetAllCharacters() {
  try {
    let { data, error: fetchError } = await supabase
      .from("character")
      .select("*, vision:vision_id(name, image_url)");
    if (fetchError) throw fetchError;
    characters.value = data;
    console.log(data);
  } catch (err) {
    error.value = err.message;
  }
}

// Fetch characters on page load
onMounted(async () => {
  loading.value = true;
  setTimeout(async () => {
    await GetAllCharacters();
    loading.value = false;
  }, 2000);
});
</script>
