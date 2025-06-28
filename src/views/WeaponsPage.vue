<template>
  <!-- Loading Spinner -->
  <LoadingSpinner v-if="loading" />

  <!-- Weapons Container -->
  <div v-if="!loading && !error">
    <div class="weapons-page-container">
      <!-- Weapon filter-->
      <div class="weapon-filter-container">
        <WeaponFilter
          @filtered-weapons="displayFilteredWeapons"
          @clear-filter="handleClearFilter"
        />
      </div>

      <h1 class="weapon-page-header divider text-5xl my-9">Weapons Archive</h1>

      <!-- Weapon display -->
      <div class="weapon-display-container">
        <div class="weapon-grid">
          <router-link
            v-for="weapon in weapons"
            class="weapon-grid-card"
            :class="{
              'rarity-5': weapon.rarity === 5,
              'rarity-4': weapon.rarity === 4,
            }"
            :key="weapon.id"
            :to="`/weapons/${weapon.id}?name=${encodeURIComponent(
              weapon.name
            )}`"
          >
            <!-- Weapon image -->
            <img
              :src="weapon.image_url"
              :alt="weapon.name"
              class="weapon-grid-image"
            />
            <!-- weapon name -->
            <div class="divider px-10 mt-9"></div>
            <h2 class="weapon-card-title">{{ weapon.name }}</h2>
            <!-- Weapon Tags -->
            <div class="weapon-card-tags-container">
              <p class="weapon-tags">
                {{ weapon.weapon_type_id.name }}
              </p>
              <p class="weapon-tags">
                {{ weapon.bonus_effect_type_id.name }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Error Message -->
  <div v-if="error" class="error-message">
    <ErrorComponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import ErrorComponent from "./../components/ErrorComponent.vue"; // Import the error component
import WeaponFilter from "./../components/WeaponFilter.vue"; // Import the weapon filter component

// states for loading and error
const loading = ref(true);
const error = ref(null);

// empty array to hold weapons data
const weapons = ref([]);

const CACHE_DURATION = 60 * 60 * 1000;

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

function setCachedData(key, data) {
  const cache = {
    timestamp: new Date().getTime(),
    data,
  };
  sessionStorage.setItem(key, JSON.stringify(cache));
}

async function getAllWeapons() {
  const cacheKey = "weapons";

  const cachedWeapons = getCachedData(cacheKey);
  if (cachedWeapons) {
    weapons.value = cachedWeapons;
    sortWeaponsByReleaseDate();
    loading.value = false;
    return;
  }

  try {
    let { data, error: fetchError } = await supabase
      .from("weapons")
      .select(
        "id, name, rarity, image_url, weapon_type_id(id, name), bonus_effect_type_id(name)"
      );
    if (fetchError) throw fetchError;

    console.log("Fetched weapons:", data);

    weapons.value = data;
    setCachedData(cacheKey, data);
    sortWeaponsByReleaseDate();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function sortWeaponsByReleaseDate() {
  weapons.value.sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });
}

function displayFilteredWeapons(filtered) {
  weapons.value = filtered;
  sortWeaponsByReleaseDate();
}

function handleClearFilter() {
  weapons.value = [...weapons.value];
  sortWeaponsByReleaseDate();
}
onMounted(() => {
  getAllWeapons();
});
</script>

<style scoped>
.weapons-page-container {
  width: 1250px;
  min-height: 75vh;
  margin: 25px 0px 75px 0px;
}

.weapon-filter-container {
  display: flex;
  justify-content: left;
  align-items: center;
}

.weapon-page-header {
  font-family: var(--font-archivo);
  text-transform: uppercase;
}

.weapon-display-container {
  min-height: 600px;
}

.weapon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 50px;
  padding: 20px;
}

.weapon-grid-card {
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  padding: 25px 0;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.weapon-grid-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: var(--filter-color);
}

.weapon-grid-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transition: left 0.7s ease-in-out;
}

.weapon-grid-card:hover::after {
  left: 100%;
}


.weapon-grid-image {
  width: 150px;
  height: 150px;
  border-radius: 25px;
}

.weapon-card-title {
  font-size: 1.5em;
  color: white;
  letter-spacing: 1px;
}

.weapon-card-tags-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-top: 15px;
}

.weapon-tags {
  background-color: var(--primary);
  font-family: var(--font-acme);
  color: var(--tertiary);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.rarity-5 .weapon-grid-image {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 .weapon-grid-image {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>
