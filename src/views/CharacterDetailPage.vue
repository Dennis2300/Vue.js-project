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
      <!-- Character Detail Header -->
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
        <CharacterDetailsRightSection :character="character" />

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
import CharacterDetailsRightSection from "../components/CharacterDetailsRightSection.vue"; // Import the character details right section component

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
      .from("characters")
      .select("*, vision:vision(name, image_url)")
      .eq("id", characterId)
      .single();
    if (charError) throw charError;

    // Then fetch associated regions
    const { data: regionsData, error: regionsError } = await supabase
      .from("region_character")
      .select("region:region_id(id, name)")
      .eq("character_id", characterId);
    if (regionsError) throw regionsError;

    // Then fetch weapons
    const { data: weaponsData, error: weaponsError } = await supabase
      .from("weapon_character")
      .select(
        "weapon:weapon_id(*, bonus_effect:bonus_effect_type_id(name), weapon_type:weapon_type_id(name))"
      )
      .eq("character_id", characterId);
    if (weaponsError) throw weaponsError;

    // Then fetch artifacts
    const { data: artifactsData, error: artifactsError } = await supabase
      .from("character_artifact")
      .select("artifact:artifact_id(*)")
      .eq("character_id", characterId);
    if (artifactsError) throw artifactsError;

    // Combine the data
    const characterWithRegions = {
      ...characterData, // copy character data to new object
      regions: regionsData.map((item) => item.region), // add regions to new object
      weapons: weaponsData.map((item) => item.weapon), // add weapons to new object
      artifacts: artifactsData.map((item) => item.artifact), // add artifacts to new object
    };

    setCachedData(cacheKey, characterWithRegions);
    return characterWithRegions;
  } catch (err) {
    console.error("Error fetching character:", err);
    return null;
  }
}

onMounted(async () => {
  const characterId = route.params.id;
  loading.value = true;
  character.value = await fetchCharacterDetails(characterId);
  loading.value = false;
});
</script>
