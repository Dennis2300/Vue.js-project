<template>
  <!-- Show loading spinner if loading -->
  <LoadingSpinner v-if="loading" />

  <!-- Show characters -->
  <div class="character-page-container" v-if="!loading && !error">
    <!-- Filter by Vision -->
    <CharacterFilter
      @filtered-characters="displayFilteredCharacters"
      @clear-filter="handleClearFilter"
      class="mt-5"
    />

    <div class=" text-2xl mt-5">
      <h2 class="character-page-header divider text-5xl">Character Archive</h2>
      <h6 class="text-center tracking-wider cursor-default">Click to view the build</h6>
    </div>

    <!-- Show characters -->
    <div class="character-grid-container">
      <div class="character-grid">
        <router-link
          v-for="character in characters"
          :key="character.id"
          :to="`/characters/${character.id}?name=${encodeURIComponent(
            character.name
          )}`"
          class="character-grid-item"
          :class="{
            'rarity-5': character.rarity === 5,
            'rarity-4': character.rarity === 4,
          }"
        >
          <!-- Vision Icon (Top Right Corner) -->
          <img
            :src="character.vision.image_url"
            :alt="character.vision.name"
            class="vision-icon"
          />
          <img
            class="character-avatar"
            :src="character.image_url"
            :alt="character.name"
          />

          <div v-if="isNewCharacter(character)" class="ribbon ribbon-top-right">
            <span>New</span>
          </div>

          <h3>{{ character.name }}</h3>
          <p class="rarity-text text-white" :data-stars="character.rarity"></p>
        </router-link>
      </div>
    </div>

    <!-- Show Footer-->
    <div class="mt-16" v-if="!loading && !error && characters?.length">
      <Footer />
    </div>
  </div>

  <!-- Show error message -->
  <div v-if="error">
    <Errorcomponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Import the Vue composition API
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
// ----------------------------------------------------------
import "./../css/Ribbon.css"; // Import the CSS for the ribbon effect
import "ldrs/trefoil"; // Import the loading spinner component
import CharacterFilter from "./../components/CharacterFilter.vue";
// ----------------------------------------------------------
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import Errorcomponent from "./../components/ErrorComponent.vue"; // Import the error component
import Footer from "@/components/Footer.vue";

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Data states
const characters = ref([]);

// If the data is older than CACHE_DURATION, it will be removed
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// cache functions will be made as modules later
// function to retrieve data from sessionStorage
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
    sortCharactersByReleaseDate();
    loading.value = false;
    return;
  }

  try {
    let { data, error: fetchError } = await supabase
      .from("characters")
      .select("*, vision:vision(name, image_url)");

    if (fetchError) throw fetchError;

    characters.value = data;
    setCachedData(cacheKey, data);
    sortCharactersByReleaseDate();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Sort characters by release date
function sortCharactersByReleaseDate() {
  characters.value.sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });
}

function isNewCharacter(character) {
  if (character && typeof character.new_character !== "undefined") {
    return Boolean(character.new_character);
  }
  return false;
}

function displayFilteredCharacters(filtered) {
  characters.value = filtered;
  sortCharactersByReleaseDate();
}

function handleClearFilter() {
  characters.value = [...characters.value];
  sortCharactersByReleaseDate();
}

// Fetch characters on page load
onMounted(async () => {
  await GetAllCharacters();
  isNewCharacter();
});
</script>

<style scoped>
.character-page-container {
  width: 1400px;
}

.link {
  text-decoration: none;
  color: white;
}

.character-page-header {
  font-family: var(--font-archivo);
  font-weight: lighter;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: default;
}
.character-grid-container {
  min-height: 100vh;
}

.character-grid {
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}

.character-grid-item {
  position: relative;
  text-align: center;
  display: block;
  text-decoration: none;
  font-size: 1.5em;
  width: 250px;
  height: 250px;
  margin-top: 10px;
  padding-top: 30px;
  border-radius: 25px;
  background-color: var(--secondary);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.character-grid-item:hover {
  transform: translateY(-10px);
}

.vision-icon {
  position: absolute;
  top: 15px;
  right: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  padding: 5px;
  z-index: 99;
}

.character-avatar {
  width: 150px;
  height: 150px;
  border-radius: 12.5px;
  transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
}

.rarity-5 .character-avatar {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 .character-avatar {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}

.rarity-text::before {
  content: attr(data-stars);
  font-family: Arial, sans-serif;
  font-size: 1.2em;
  font-weight: bold;
}

.rarity-text[data-stars="5"]::before {
  content: "★★★★★";
}
.rarity-text[data-stars="4"]::before {
  content: "★★★★";
}

.character-grid-item h3 {
  background-color: inherit;
  color: var(--quaternary);
  margin-top: 5px;
  font-family: var(--font-acme);
  letter-spacing: 1px;
  text-transform: capitalize;
}

.character-grid-item p {
  background-color: inherit;
  color: gold;
  border-radius: 25px;
  margin: 0%;
  padding: 0%;
  letter-spacing: 2px;
}
</style>
