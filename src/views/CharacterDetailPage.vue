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
      <!-- Background Image -->
      <img
        class="background-img"
        :src="character.splash_art"
        alt="Character Art"
      />

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
              <p class="character-list-view">{{ lang }} - {{ name }}</p>
            </div>

            <!-- character affiliation -->
            <h1 class="divider mt-10">Affiliation</h1>
            <div
              v-for="affiliation in character.affiliation"
              :key="affiliation"
            >
              <p class="character-list-view">{{ affiliation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- character detail container  -->
      <div class="character-info-container">
        <h1 class="divider">Overview</h1>
        <div class="character-info character-info-grid">
          <!-- Character Info Grid -->
          <div class="character-info-grid-item">
            <p class="character-info-text">
              <span style="color: gray">Rarity</span>
              <span style="color: gold">{{
                "★".repeat(character.rarity)
              }}</span>
            </p>
            <p class="character-info-text">
              <span style="color: gray">Birthday</span>
              <span>{{ character.birthday }}</span>
            </p>
            <p class="character-info-text">
              <span style="color: gray">Constellation</span>
              <span>{{ character.constellation }}</span>
            </p>
          </div>

          <!-- Character Info Grid -->
          <div class="character-info-grid-item">
            <p class="character-info-text">
              <span style="color: gray">Favourite Dish</span>
              <span>{{ character.favourite_dish }}</span>
            </p>
            <p class="character-info-text">
              <span style="color: gray">Release Date</span>
              <span>{{ formatDate(character.release_date) }}</span>
            </p>
            <p class="character-info-text">
              <span style="color: gray">Weapon</span>
              <span>{{ character.weapon_type.name }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- character best artifact -->
      <div class="character-artifact-container">
        <h1 class="divider">Best Artifact for {{ character.name }}</h1>
        <div class="character-bis-list-container">
          <router-link
            :to="`/artifacts/${artifact.id}?name=${encodeURIComponent(
              artifact.name
            )}`"
            class="character-bis-item"
            v-for="artifact in character.artifacts"
            :key="artifact.id"
          >
            <img
              class="character-bis-image"
              :src="artifact.flower_url"
              alt=""
            />
            <p class="character-bis-name">{{ artifact.name }}</p>
          </router-link>
        </div>
      </div>

      <!-- character best weapon -->
      <div class="character-weapon-container">
        <h1 class="divider">Best Weapon for {{ character.name }}</h1>
        <div class="character-bis-list-container">
          <router-link
            :to="`/weapons/${weapon.id}?name=${encodeURIComponent(
              weapon.name
            )}`"
            class="character-bis-item"
            v-for="weapon in character.weapons"
            :key="weapon.id"
          >
            <img class="character-bis-image" :src="weapon.image_url" alt="" />
            <p class="character-bis-name">{{ weapon.name }}</p>
          </router-link>
        </div>
      </div>

      <!-- Placeholder for character build infographic -->
      <div class="character-mats-container">
        <h1 class="divider">Character Level up materials</h1>
        <img
          src="https://placehold.co/1000x700?text=Character+build+here"
          alt=""
        />
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

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

onMounted(async () => {
  const characterId = route.params.id;
  loading.value = true;
  character.value = await fetchCharacterDetails(characterId);
  loading.value = false;
});
</script>

<style scoped>
.divider {
  font-family: var(--font-acme);
  letter-spacing: 1px;
}

.character-detail-container {
  position: relative;
  background-color: var(--secondary);
  width: 1325px;
  min-height: 1500px;
  border-radius: 25px;
  margin-top: 50px;
  z-index: 1;
  padding: 0px 75px 50px 75px;
  margin-bottom: 75px;
}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0.05;
  z-index: -1;
}

.character-detail-image-container {
  display: flex;
  justify-content: space-between;
}

.character-avatar-container {
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
  font-family: var(--font-acme);
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
  width: 700px;
  height: 500px;
}

.character-overview {
  background-color: var(--primary);
  padding: 10px 25px 25px 25px;
  width: 500px;
  border-radius: 15px;
}

.character-list-view {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
  margin: 5px 0;
}

.character-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
}

.character-info {
  background-color: var(--primary);
  font-family: var(--font-acme);
  width: 80%;
  height: 200px;
  border-radius: 15px;
  padding: 15px;
  font-size: 2em;
  margin-top: 10px;
  padding: 25px 45px 25px 45px;
}

.character-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 150px;
}

.character-info-grid-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.character-info-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.character-artifact-container {
  height: 300px;
  margin-top: 75px;
}

.character-bis-list-container {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}

.character-bis-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  width: 400px;
  height: 200px;
  border-radius: 15px;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.character-bis-item:hover {
  box-shadow: 0px 0px 15px var(--tertiary),
    0px 0px 30px var(--tertiary);
}

.character-bis-image {
  width: 100px;
  height: 100px;
  border-radius: 25px;
}

.character-bis-name {
  font-size: 1.5em;
  margin-top: 10px;
  text-align: center;
  letter-spacing: 1px;
  font-family: var(--font-acme);
}

.character-weapon-container {
  height: 300px;
}

.character-mats-container {
  background-color: #b56a2b;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
