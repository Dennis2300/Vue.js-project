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
          <p class="rarity-text text-white" :data-stars="character.rarity"></p>
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
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Import the Vue composition API
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import "./../css/CharactersPage.css"; // Import the component's CSS
import "ldrs/trefoil"; // Import the loading spinner component
import images from "./../assets/images.json";
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import Footer from "@/components/Footer.vue";

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Data states
const characters = ref([]);

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

function getCachedData(key) {
  const cachedData = sessionStorage.getItem(key);
  console.log("Retrieving data from sessionStorage for key:", key, cachedData);

  if (!cachedData) {
    console.log("No cached data found for key:", key);
    return null;
  }

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();

  if (now - timestamp < CACHE_DURATION) {
    console.log("Using cached data for key:", key);
    return data;
  } else {
    console.log("Cache expired for key:", key);
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
  console.log("Data saved to sessionStorage:", key, cache);
}

// Fetch all characters from the database
async function GetAllCharacters() {
  const cacheKey = "characters";

  const cachedCharacters = getCachedData(cacheKey);
  if (cachedCharacters) {
    characters.value = cachedCharacters;
    loading.value = false;
    return;
  }

  console.log("Fetching characters from the database...");
  try {
    let { data, error: fetchError } = await supabase
      .from("character")
      .select("*, vision:vision_id(name, image_url)");
    if (fetchError) throw fetchError;

    characters.value = data;
    setCachedData(cacheKey, data);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Fetch characters on page load
onMounted(async () => {
  await GetAllCharacters();
});
</script>
