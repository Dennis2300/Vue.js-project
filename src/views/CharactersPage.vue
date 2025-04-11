<template>
  <div class="character-page-container">
    <h1 class="character-page-header">Character Archive</h1>

    <!-- Filter by Vision -->
    <VisionFilterList
      @filtered-characters="displayFilteredCharacters"
      @clear-filter="handleClearFilter"
    />

    <!-- Filter by Rarity -->
    <RarityFilter />

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
// ----------------------------------------------------------
import "./../css/CharactersPage.css"; // Import the component's CSS
import "ldrs/trefoil"; // Import the loading spinner component
import VisionFilterList from "../components/VisionFilter.vue";
import RarityFilter from "../components/RarityFilter.vue"; // Import the RarityFilter component
// ----------------------------------------------------------
import images from "./../assets/images.json";
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import Footer from "@/components/Footer.vue";

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Data states
const characters = ref([]);

// If the data is older than CACHE_DURATION, it will be removed
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// cache functions will be made as modules later
// getCachedData function to retrieve data from sessionStorage
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

// setCachedData function to store data in sessionStorage
function setCachedData(key, data) {
  const cache = {
    timestamp: new Date().getTime(),
    data,
  };
  sessionStorage.setItem(key, JSON.stringify(cache));
}

// Fetch all characters from the database

async function GetAllCharacters() {
  const cacheKey = "characters";

  const cachedCharacters = getCachedData(cacheKey);
  if (cachedCharacters) {
    characters.value = cachedCharacters;
    sortCharactersByName();
    loading.value = false;
    return;
  }

  try {
    let { data, error: fetchError } = await supabase
      .from("character")
      .select("*, vision:vision_id(name, image_url)");
    if (fetchError) throw fetchError;

    characters.value = data;
    setCachedData(cacheKey, data);
    sortCharactersByName();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Sort characters by name function
function sortCharactersByName() {
  characters.value.sort((a, b) => a.name.localeCompare(b.name));
}

function displayFilteredCharacters(filtered) {
  characters.value = filtered;
  sortCharactersByName();
}

function handleClearFilter() {
  characters.value = [...characters.value];
  sortCharactersByName();
}

// Fetch characters on page load
onMounted(async () => {
  await GetAllCharacters();
});
</script>
