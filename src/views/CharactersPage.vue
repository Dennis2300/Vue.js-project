<template>
  <!-- Show loading spinner if loading -->
  <LoadingSpinner v-if="loading" />

  <!-- Show characters -->
  <div class="character-page-container" v-if="!loading && !error">
    <!-- Filter by Vision -->
    <div class="character-filter-container">
      <CharacterFilter
        @filtered-characters="displayFilteredCharacters"
        @clear-filter="handleClearFilter"
        class="mt-5"
      />
    </div>

    <div class="text-2xl mt-5">
      <h2 class="character-page-header divider text-5xl my-9">
        Character Archive
      </h2>
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

          <!-- Ribbons for New character -->

          <div v-if="isNewCharacter(character)" class="ribbon ribbon-top-right">
            <span>New</span>
          </div>
          <!-- Ribbons for New character -->
          <div
            v-if="isUpcomingCharacter(character)"
            class="ribbon ribbon-top-right"
          >
            <span class="upcoming">Upcoming</span>
          </div>

          <h3>{{ character.name }}</h3>
          <p class="rarity-text" :data-stars="character.rarity"></p>
          <div class="character-tags-container mt-2">
            <strong class="character-tag">{{
              character.team_role?.name || "UPCOMING"
            }}</strong>
            <strong v-if="character.substat?.name" class="character-tag">{{
              character.substat?.name || ""
            }}</strong>
          </div>
        </router-link>
      </div>
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
      .select(
        "*, vision:vision(id, name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(name)"
      )
      .order("id", { ascending: true });

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
  characters.value = [...characters.value].sort((a, b) => {
    // Upcoming characters first
    if (a.is_upcoming !== b.is_upcoming) {
      return b.is_upcoming - a.is_upcoming;
    }

    // Then sort by release date (newest first)
    return new Date(b.release_date) - new Date(a.release_date);
  });
}

// Check if a character is new
function isNewCharacter(character) {
  if (character && typeof character.new_character !== "undefined") {
    return Boolean(character.new_character);
  }
  return false;
}

function isUpcomingCharacter(character) {
  if (character && typeof character.is_upcoming !== "undefined") {
    return Boolean(character.is_upcoming);
  }
  return false;
}

// If there is a filter applied, display the filtered characters
function displayFilteredCharacters(filtered) {
  characters.value = filtered;
  sortCharactersByReleaseDate();
}

// Clear the filter and reset characters to the original list
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
  margin-bottom: 75px;
}

.link {
  text-decoration: none;
  color: white;
}

.character-filter-container {
  height: 180px;
  padding: 0px 25px 0px 25px;
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
  width: 275px;
  height: 300px;
  margin-top: 10px;
  padding-top: 30px;
  border-radius: 15px;
  background-color: var(--secondary);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid transparent;
}

.character-grid-item:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-color: var(--tertiary);
  background-color: var(--filter-color);
}

.vision-icon {
  position: absolute;
  top: 15px;
  right: 50px;
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

.character-tags-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  gap: 10px;
}

.character-tag {
  background-color: var(--primary);
  font-family: var(--font-acme);
  color: var(--tertiary);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.upcoming {
  font-size: 10px;
}
</style>
