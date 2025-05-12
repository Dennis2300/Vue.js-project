<template>
  <div class="character-page-container">
    <!-- Show loading spinner if loading -->
    <!-- Has some bugs, need fixing-->
    <LoadingSpinner v-if="loading" />

    <!-- Filter by Vision -->
    <CharacterFilter
      v-if="!loading && !error && characters?.length"
      @filtered-characters="displayFilteredCharacters"
      @clear-filter="handleClearFilter"
      class="mt-5"
    />

    <div
      v-if="!loading && !error && characters?.length"
      class="divider text-2xl mt-5"
    >
      <h2 class="character-page-header">Character Archive</h2>
    </div>

    <!-- Show characters -->
    <div
      v-if="!loading && !error && characters?.length"
      class="character-display-container mb-16"
    >
      <div class="character-grid">
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

          <div v-if="isNewCharacter(character)" class="ribbon ribbon-top-right">
            <span>New</span>
          </div>

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
    <div v-if="!loading && !error && characters?.length">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Import the Vue composition API
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
// ----------------------------------------------------------
import "./../css/CharactersPage.css"; // Import the component's CSS
import "ldrs/trefoil"; // Import the loading spinner component
import CharacterFilter from "./../components/CharacterFilter.vue";
// ----------------------------------------------------------
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
    sortCharactersByReleaseDate();
    loading.value = false;
    return;
  }

  try {
    let { data, error: fetchError } = await supabase
      .from("characters")
      .select("*, vision:vision_id(name, image_url)");
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
.ribbon {
  position: absolute;
  left: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: left;
  background-color: transparent;
}

.ribbon span {
  font-size: 15px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  transform: rotate(-45deg);
  width: 100px;
  display: block;
  background: #e74646;
  background: linear-gradient(#e74646 0%, #e74646 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  left: -21px;
  font-family: var(--font-alkatra);
  letter-spacing: 1px;
}

.ribbon span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #cc0000;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #cc0000;
}

.ribbon span::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #cc0000;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #cc0000;
}
</style>
