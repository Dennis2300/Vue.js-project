<template>
  <div class="character-page-container">
    <h1 class="character-page-header">Genshin Impact Characters</h1>

    <!-- Show loading spinner if loading -->
    <LoadingSpinner v-if="loading" />

    <!-- Show characters -->
    <div class="character-display-container">
      <div
        v-if="!loading && !error && characters?.length"
        class="character-grid"
      >
        <router-link
          v-for="character in characters"
          :key="character.id"
          :to="`/characters/${character.id}`"
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
        </router-link>
      </div>
    </div>

    <!-- Show error message if there is an error -->
    <div v-if="error">
      <p class="error-message">
        Failed to get characters due to a connection issue. <br />
        Please try again later.
      </p>
      <img
        class="error-message-sticker"
        :src="images.tighnari"
        alt="Tighnari Flop"
      />
      <p class="error-message">
        or check my socials for updates:
        <a href="https://x.com/SindZhou" target="_blank" class="link"
          >Twitter/X</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Import the Vue composition API
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import "./../css/CharactersPage.css"; // Import the component's CSS
import "ldrs/trefoil"; // Import the loading spinner component
import images from "./../assets/images.json";
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component

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
  }, 1000);
});
</script>
