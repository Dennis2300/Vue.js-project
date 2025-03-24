<template>
  <div class="character-detail-container">
    <!-- Loading Spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- Character Detail Page -->
    <div
      v-else-if="character"
      class="character-detail"
      :class="{
        'rarity-5': character.rarity === 5,
        'rarity-4': character.rarity === 4,
      }"
    >
      <div class="character-detail-header-container">
        <img
          :src="character.image_url"
          alt="Vision"
          class="character-detail-avatar"
        />
        <p class="rarity-text text-white" :data-stars="character.rarity"></p>
        <h1 class="character-detail-header">{{ character.name }}</h1>
      </div>

      <!-- Character Detail Layout -->
      <div class="character-detail-layout">
        <!-- Main Section -->
        <CharacterDetailsMainSection :character="character" />

        <!-- Side Sections -->
        <section class="right-section flex flex-col gap-6">
          <!-- Affiliation -->
          <div class="grid-item-affiliation mt-2">
            <h3 class="list-title mb-3">Affiliations</h3>
            <ul class="styled-list">
              <li
                v-for="(affiliation, index) in character.affiliation"
                :key="index"
              >
                {{ affiliation }}
              </li>
            </ul>
          </div>

          <!-- Voice Actors -->
          <div class="grid-item-voice-actors">
            <h3 class="list-title">Voice Actors</h3>
            <ul class="styled-list">
              <div v-for="(actor, language) in character.va" :key="language">
                {{ language }} {{ languageEmojis[language] || "🌐" }}
                <strong>{{ actor }}</strong>
              </div>
            </ul>
          </div>

          <!-- Regions -->
          <div class="regions-section" v-if="character.regions.length">
            <h3>Associated Regions</h3>
            <div class="regions-list">
              <div
                v-for="region in character.regions"
                :key="region.id"
                class="region-tag"
              >
                {{ region.name }}
              </div>
            </div>
          </div>
        </section>

        <!-- Bottom Section -->
        <section class="bottom-section">
          <div>
            <a :href="character.wiki_url || '#'" target="_blank">Source</a>
          </div>
        </section>
      </div>
    </div>

    <!-- Error Message-->
    <div v-else>
      <p>Character not found.</p>
    </div>
  </div>
</template>

<script setup>
// Import the necessary functions and components
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "./../supabaseClient.js";

// Import the necessary styles
import "./../css/CharacterDetailPage.css";
import "./../css/CharacterDetailGrid.css";

// Import the loading spinner component
import "ldrs/trefoil";
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component

// Import the character details main section component
import CharacterDetailsMainSection from "../components/CharacterDetailsMainSection.vue"; // Import the character details main section component

const route = useRoute();
const character = ref(null);
const loading = ref(true);

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// Function to get cached data from session storage
function getCachedData(key) {
  const cachedData = sessionStorage.getItem(key);
  if (!cachedData) return null;

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();

  if (now - timestamp < CACHE_DURATION) {
    return data;
  } else {
    sessionStorage.removeItem(key);
    return null;
  }
}

// Function to set cached data in session storage if it doesn't already exist
function setCachedData(key, data) {
  const cache = {
    timestamp: new Date().getTime(),
    data,
  };
  sessionStorage.setItem(key, JSON.stringify(cache));
}

// Function to fetch character details from the database
async function fetchCharacterDetails(characterId) {
  const cacheKey = `character-${characterId}`;
  const cachedCharacter = getCachedData(cacheKey);

  if (cachedCharacter) return cachedCharacter;

  try {
    // First fetch character details
    const { data: characterData, error: charError } = await supabase
      .from("character")
      .select("*, vision:vision_id(name, image_url)")
      .eq("id", characterId)
      .single();

    if (charError) throw charError;

    // Then fetch associated regions
    const { data: regionsData, error: regionsError } = await supabase
      .from("region_character")
      .select("region:region_id(id, name)")
      .eq("character_id", characterId);

    if (regionsError) throw regionsError;

    // Combine the data
    const characterWithRegions = {
      ...characterData,
      regions: regionsData.map((item) => item.region),
    };

    setCachedData(cacheKey, characterWithRegions);
    return characterWithRegions;
  } catch (err) {
    console.error("Error fetching character:", err);
    return null;
  }
}

// Define the language emojis
const languageEmojis = {
  English: "🇺🇸",
  Japanese: "🇯🇵",
  Korean: "🇰🇷",
  Chinese: "🇨🇳",
};

onMounted(async () => {
  const characterId = route.params.id;
  loading.value = true;
  character.value = await fetchCharacterDetails(characterId);
  loading.value = false;
});
</script>
