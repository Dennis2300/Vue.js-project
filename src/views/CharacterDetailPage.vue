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
      <!-- character detail image container -->
      <div class="character-detail-image-container">
        <!-- character avatar -->
        <div class="character-avatar-container">
          <img
            class="character-avatar"
            :src="character.image_url"
            :alt="character.name"
          />
          <h1 class="character-name mt-3">{{ character.name }}</h1>
          <div class="character-tags-container mt-2">
            <p class="character-tags">{{ character.vision.name }}</p>
            <p class="character-tags">{{ character.team_role.name }}</p>
            <p class="character-tags">{{ character.substat.name }}</p>
            <p class="character-tags">{{ character.weapon_type.name }}</p>
          </div>
        </div>
        <!-- character overview -->
        <div class="character-overview-container">
          <div class="character-overview">
            <!-- character voice actors -->
            <h1 class="divider">Voice Actors</h1>
            <div v-for="(name, lang) in character.va" :key="lang">
              <p class="character-va">{{ lang }} - {{ name }}</p>
            </div>

            <!-- character affiliation -->
            <h1 class="divider">Affiliation</h1>
            <div
              v-for="affiliation in character.affiliation"
              :key="affiliation"
            >
              <p class="character-va">{{ affiliation }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- character detail container  -->
      <div class="character-info-container">
        <h1>{{ character.name }}</h1>
        <p>{{ character.rarity }}</p>
        <p>{{ character.birthday }}</p>
        <p>{{ character.constellation }}</p>
        <p>{{ character.affiliation }}</p>
        <p>{{ character.favourite_dish }}</p>
        <p>{{ character.release_date }}</p>
        <p>{{ character.va }}</p>
        <p>{{ character.wiki_url }}</p>
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

// Import the loading spinner component
import "ldrs/trefoil";
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component

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
      .select(
        "*, vision:vision(name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(name)"
      )
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

<style scoped>
.character-detail-container {
  background-color: var(--secondary);
  width: 1500px;
  min-height: 100vh;
}

.character-detail-image-container {
  display: flex;
  justify-content: space-between;
}

.character-avatar-container {
  background-color: blueviolet;
  width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.character-avatar {
  width: 200px;
  height: 200px;
  border-radius: 15px;
  padding: 10px 10px 0px 10px;
}

.character-name {
  font-family: var(--font-fugaz);
  font-size: 3rem;
  margin-top: 10px;
  text-transform: capitalize;
}

.character-tags-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.character-tags {
  background-color: var(--primary);
  color: var(--tertiary);
  font-family: var(--font-acme);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  letter-spacing: 1px;
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

.character-overview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkblue;
  width: 700px;
  height: 500px;
}

.character-overview {
  background-color: #b56a2b;
  padding: 10px 25px 10px 25px;
  width: 500px;
  border-radius: 15px;
}

.character-va {
  font-family: var(--font-acme);
  font-size: 1.2rem;
  margin: 5px 0;
}

.character-info-container {
  background-color: #b56a2b;
}
</style>
