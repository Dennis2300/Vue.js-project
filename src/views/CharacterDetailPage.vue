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
        v-if="character.splash_art"
        class="background-img"
        :src="character.splash_art"
        alt="Character Art"
      />
      <div v-else></div> <!-- Fallback if no splash art is available -->

      <!-- character detail image container -->
      <div class="character-detail-image-container">
        <!-- character avatar -->
        <div class="character-avatar-container">
          <div class="character-avatar-wrapper">
            <img
              class="character-avatar-img"
              :src="character.image_url"
              :alt="character.name"
            />
            <img
              class="character-vision-img"
              :src="character.vision.image_url"
              alt=""
            />
          </div>
          <h1 class="character-name mt-3">{{ character.name }}</h1>
          <div class="character-tags-container mt-2">
            <p class="character-tags">{{ character.vision.name }}</p>
            <p class="character-tags" v-if="character.team_role?.name">
              {{ character.team_role?.name || "" }}
            </p>
            <p class="character-tags" v-if="character.substat?.name">
              {{ character.substat?.name || "" }}
            </p>
            <p class="character-tags">{{ character.weapon_type.name }}</p>
          </div>
        </div>

        <!-- character overview -->
        <div class="character-overview-container">
          <div class="character-overview">
            <!-- character voice actors -->
            <h1 class="divider">Voice Actors</h1>
            <div class="character-va-container" v-if="character.va">
              <div v-for="(name, lang) in character.va" :key="lang">
                <p class="character-list-view">
                  {{ flagEmoji(lang) }} &rarr;
                  <span v-html="formatVoiceActorName(name)"></span>
                </p>
              </div>
            </div>

            <div v-else>
              <p class="text-center my-9">No voice actors announced yet.</p>
            </div>

            <!-- character affiliation -->
            <h1 class="divider mt-5">Affiliation</h1>
            <div
              v-if="character.affiliation"
              v-for="affiliation in character.affiliation"
              :key="affiliation"
            >
              <p class="character-list-view">
                {{ affiliation ? affiliation : "" }}
              </p>
            </div>

            <div v-else>
              <p class="text-center my-9">No affiliation yet.</p>
            </div>

            <!-- character regions -->
            <h1 class="divider mt-5">Regions</h1>
            <div v-for="region in character.regions" :key="region.id">
              <p class="character-list-view">
                {{ region.name }}
              </p>
            </div>
            <div v-if="!character.regions.length">
              <p class="text-center my-9">No regions yet.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- character detail container  -->
      <div class="character-info-container">
        <h1 class="divider">Character Information</h1>
        <div class="character-info character-info-grid">
          <!-- Character Info Grid -->
          <div class="character-info-grid-item left">
            <p class="character-info-text">
              <span style="color: gray">Rarity</span>
              <span style="color: gold">{{
                "★".repeat(character.rarity)
              }}</span>
            </p>
            <div class="divider m-0"></div>
            <p class="character-info-text">
              <span style="color: gray">Birthday (mm/dd)</span>
              <span>{{ character.birthday }}</span>
            </p>
            <div class="divider m-0"></div>

            <p class="character-info-text">
              <span style="color: gray">Constellation</span>
              <span>{{ character.constellation }}</span>
            </p>
          </div>

          <!-- Character Info Grid -->
          <div class="character-info-grid-item right">
            <p class="character-info-text">
              <span style="color: gray">Weapon</span>
              <span>{{ character.weapon_type.name }}</span>
            </p>
            <div class="divider m-0"></div>
            <p class="character-info-text">
              <span style="color: gray">Release Date</span>
              <span>{{ formatDate(character.release_date) }}</span>
            </p>
            <div class="divider m-0"></div>
            <p class="character-info-text">
              <span style="color: gray">Favourite Dish</span>
              <span>{{ character.favourite_dish }}</span>
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
            <span class="character-weapon-rank">{{ artifact.rank }}</span>
          </router-link>
          <div v-if="!character.artifacts.length">
            <p class="not-found mb-6">No artifacts found for this character.</p>
          </div>
        </div>

        <div class="character-build-container my-5">
          <div class="character-build-text">
            <MarkdownRender :content="character.artifact_build_note" />
            <p
              class="no-build-yet text-3xl"
              v-if="!character.artifact_build_note.length"
            >
              Not available yet
            </p>
          </div>
          <div class="character-artifact-stats">
            <div
              class="character-artifact-text"
              v-for="build in character.build"
              :key="build.id"
            >
              <div class="divider text-3xl mb-3 sands">Sands</div>
              <h2>{{ build.sands_main_stat }}</h2>
              <div class="divider text-3xl mt-8 mb-3 goblet">Goblet</div>
              <h2>{{ build.goblet_main_stat }}</h2>
              <div class="divider text-3xl mt-8 mb-3 circlet">Circlet</div>
              <h2>{{ build.circlet_main_stat }}</h2>
              <div class="divider text-xl mt-8 substat">Substat priority</div>
              <div
                class="text-left"
                v-for="substat in build.substat_priority"
                :key="build.id"
              >
                <p class="text-lg">- {{ substat }}</p>
              </div>
            </div>
            <p
              class="no-build-yet text-3xl"
              v-if="!character.artifact_build_note.length"
            >
              Not available yet
            </p>
          </div>
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
            <img
              class="character-bis-weapon-image"
              :class="{
                'weapon-rarity-5': weapon.rarity === 5,
                'weapon-rarity-4': weapon.rarity === 4,
              }"
              :src="weapon.image_url"
              alt=""
            />
            <p class="character-bis-name">
              {{ weapon.name }}
            </p>
            <span class="character-weapon-rank">{{ weapon.rank }}</span>
          </router-link>
          <div v-if="!character.weapons.length">
            <p class="not-found">No weapons found for this character.</p>
          </div>
        </div>
      </div>

      <!-- Placeholder for character build infographic -->
      <div class="character-mats-container">
        <h1 class="divider">{{ character.name }} Level up materials</h1>
        <div>
          <img
            class="character-mats-infographic"
            :src="`https://placehold.co/1000x700/222831/white?text=Character+mats+not+available+yet+for+${character.name}`"
            alt=""
          />
        </div>
      </div>

      <!-- Source -->
      <div class="character-source-container">
        <h3 class="divider">Sources</h3>
        <div class="character-source">
          <a class="source-link" :href="character.wiki_url" target="_blank"
            >Hoyo wiki</a
          >
        </div>
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
import MarkdownRender from "./../components/MarkdownRender.vue";

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

// Fetch base character details
async function fetchBaseCharacterDetails(characterId) {
  const { data, error } = await supabase
    .from("characters")
    .select(
      "*, vision:vision(name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(name)"
    )
    .eq("id", characterId)
    .single();

  if (error) throw error;
  return data;
}

// Fetch character regions
async function fetchCharacterRegions(characterId) {
  const { data, error } = await supabase
    .from("region_character")
    .select("region:region_id(id, name)")
    .eq("character_id", characterId);

  if (error) throw error;
  return data.map((item) => item.region);
}

// Fetch character weapons
async function fetchCharacterWeapons(characterId) {
  const { data, error } = await supabase
    .from("weapon_character")
    .select(
      "rank, weapon:weapon_id(*, bonus_effect:bonus_effect_type_id(name), weapon_type:weapon_type_id(name))"
    )
    .eq("character_id", characterId)
    .order("rank", { ascending: true });

  if (error) throw error;
  return data.map((item) => ({ ...item.weapon, rank: item.rank }));
}

// Fetch character artifacts
async function fetchCharacterArtifacts(characterId) {
  const { data, error } = await supabase
    .from("character_artifact")
    .select("rank, artifact:artifact_id(*)")
    .eq("character_id", characterId)
    .order("rank", { ascending: true });

  if (error) throw error;
  console.log("Fetched artifacts:", data);
  return data.map((item) => ({ ...item.artifact, rank: item.rank }));
}

async function fetchCharacterBuild(characterId) {
  const { data, error } = await supabase
    .from("characterBuild")
    .select("*")
    .eq("character_id", characterId);

  if (error) throw error;
  return data;
}

// Main function to fetch character details
async function fetchCharacterDetails(characterId) {
  const cacheKey = `character-${characterId}`;
  const cachedCharacter = getCachedData(cacheKey);
  if (cachedCharacter) return cachedCharacter;

  try {
    const [characterData, regions, weapons, artifacts, build] =
      await Promise.all([
        fetchBaseCharacterDetails(characterId),
        fetchCharacterRegions(characterId),
        fetchCharacterWeapons(characterId),
        fetchCharacterArtifacts(characterId),
        fetchCharacterBuild(characterId),
      ]);

    const result = {
      ...characterData,
      regions,
      weapons,
      artifacts,
      build,
    };

    setCachedData(cacheKey, result);
    return result;
  } catch (err) {
    console.error("Error fetching character:", err);
    return null;
  }
}

function formatDate(dateString) {
  if (!dateString) return "Upcoming";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function flagEmoji(lang) {
  const flagMap = {
    chinese: "🇨🇳",
    english: "🇺🇸",
    japanese: "🇯🇵",
    korean: "🇰🇷",
  };
  return flagMap[lang.toLowerCase()] || "Additional"; // Default to white flag if language not found
}

function formatVoiceActorName(name) {
  return name.includes("&") ? name.replace(/\s*&\s*/g, "<br>& ") : name;
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
  position: relative;
  width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.character-avatar-wrapper {
  position: relative;
}

.character-avatar-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 15px;
}

.character-vision-img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -20px;
  left: -20px;
  background-color: var(--primary);
  border-radius: 100%;
  padding: 5px;
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

.rarity-5 .character-avatar-img {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 .character-avatar-img {
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
  width: 66%;
  border-radius: 15px;
}

.character-va-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.character-list-view {
  font-family: var(--font-acme);
  font-size: 18px;
  letter-spacing: 1px;
  margin: 10px 0;
}

.character-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  letter-spacing: 1px;
}

.character-info {
  background-color: var(--primary);
  font-family: var(--font-acme);
  width: 90%;
  height: 200px;
  border-radius: 15px;
  padding: 15px;
  font-size: 2em;
  margin-top: 10px;
  padding: 25px 45px 25px 45px;
}

.character-info-grid {
  display: grid;
  grid-template-areas: "left right right";
  gap: 80px;
}

.left {
  grid-area: left;
}
.right {
  grid-area: right;
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
  height: auto;
  margin-top: 50px;
}

.character-bis-list-container {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}

.character-bis-item {
  position: relative;
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
  box-shadow: 0px 0px 15px var(--tertiary), 0px 0px 30px var(--tertiary);
}

.character-bis-image {
  width: 100px;
  height: 100px;
  border-radius: 25px;
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.character-bis-weapon-image {
  width: 100px;
  height: 100px;
  border-radius: 25px;
}

.weapon-rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.weapon-rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}

.character-bis-name {
  font-size: 1.5em;
  margin-top: 10px;
  text-align: center;
  letter-spacing: 1px;
  font-family: var(--font-acme);
}

.character-build-container {
  display: grid;
  grid-template-areas: "text text stats";
  gap: 25px;
  padding: 10px;
  min-height: 375px;
}

.character-build-text {
  background-color: var(--primary);
  font-family: var(--font-roboto);
  letter-spacing: 1px;
  border-radius: 15px;
  grid-area: text;
  padding: 25px;
  width: 745px;
}

.sands,
.goblet,
.circlet,
.substat {
  color: var(--tertiary);
}

.character-artifact-stats {
  background-color: var(--primary);
  font-family: var(--font-roboto);
  letter-spacing: 1px;
  border-radius: 15px;
  grid-area: stats;
  padding: 25px;
  width: 445px;
}

.character-artifact-text {
  text-align: center;
}

.no-build-yet {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.character-weapon-rank {
  position: absolute;
  background-color: var(--secondary);
  top: 15px;
  left: 15px;
  padding: 5px 10px;
  font-family: var(--font-acme);
  font-size: 18px;
  border-radius: 10px;
  letter-spacing: 1px;
}

.not-found {
  font-size: 32px;
  font-family: var(--font-acme);
  text-align: center;
  margin-top: 50px;
  text-decoration: underline;
  letter-spacing: 1px;
}

.character-weapon-container {
  margin-top: 50px;
  height: 300px;
}

.character-mats-container {
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-mats-infographic {
  border-radius: 15px;
  margin-top: 25px;
}

.character-source-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 125px;
}

.character-source {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 100%;
}

.source-link {
  background-color: var(--primary);
  font-family: var(--font-acme);
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 10px;
  height: 60px;
  width: 200px;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease;
}

.character-source a:hover {
  background-color: var(--tertiary);
  color: black;
}
</style>
