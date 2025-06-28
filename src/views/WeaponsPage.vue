<template>
  <!-- Loading Spinner -->
  <LoadingSpinner v-if="loading" />

  <!-- Weapons Container -->
  <div v-if="!loading && !error" class="weapons-page-container">
    <div class="weapons-page-content">
      <div class="weapon-filter-container">
        <!-- Filter by Weapon Type or Bonus Effect -->
        <WeaponFilter
          @filtered-weapons="displayFilteredWeapons"
          @clear-filter="handleClearFilter"
        />
      </div>
      <h1 class="weapon-page-header divider text-5xl">Weapons Archive</h1>
      <div class="weapon-grid-container mt-10">
        <router-link
          v-for="weapon in weapons"
          class="weapon-grid-item"
          :class="{
            'rarity-5': weapon.rarity === 5,
            'rarity-4': weapon.rarity === 4,
          }"
          :key="weapon.id"
          :to="`/weapons/${weapon.id}?name=${encodeURIComponent(weapon.name)}`"
        >
          <!-- Weapon image -->
          <img
            :src="weapon.image_url"
            :alt="weapon.name"
            class="weapon-image mt-5"
          />
          <!-- weapon name -->
          <div class="divider"></div>
          <h2 class="weapon-name text-white truncate">{{ weapon.name }}</h2>
          <!-- Weapon Tags -->
          <div class="weapon-tags-container mt-5">
            <p class="weapon-type-tag">
              {{ weapon.weapon_type_id.name }}
            </p>
            <p class="weapon-bonus-effect-tag">
              {{ weapon.bonus_effect_type_id.name }}
            </p>
          </div>
        </router-link>
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
  min-height: 100vh;
  margin-bottom: 75px;
}

.weapon-filter-container {
  height: 100px;
}

.weapon-page-header {
  font-family: var(--font-archivo);
}

.weapons-page-content {
  max-width: 1600px;
}

.weapon-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px;
}

.weapon-grid-item {
  background-color: var(--secondary);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
  height: 325px;
  text-decoration: none;
}

.weapon-grid-item:hover {
  transform: translateY(-10px);
}

.weapon-image {
  width: 150px;
  height: 150px;
  border-radius: 25px;
}

.weapon-name {
  font-family: var(--font-acme);
  letter-spacing: 1px;
  text-decoration: none;
}

.weapon-tags-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.weapon-type-tag,
.weapon-bonus-effect-tag {
  background-color: var(--primary);
  color: var(--tertiary);
  font-family: var(--font-acme);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.rarity-5 .weapon-image {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 .weapon-image {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>
