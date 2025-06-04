<template>
  <!-- Loading Spinner -->
  <LoadingSpinner v-if="loading" />

  <!-- Weapons Container -->
  <div v-if="!loading && !error" class="weapons-container">
    <!-- Weapons Page Header -->
    <h1 class="weapons-page-header divider">Weapons Archive</h1>

    <!-- Placeholder for Weapons Filter -->
    <div>
      <h1 class="text-center">Filter Weapons</h1>
    </div>

    <!-- Weapons Table -->
    <div class="weapons-table-container">
      <table class="weapons-table">
        <colgroup>
          <!-- Icon column -->
          <col style="width: 50px" />
          <!-- Name column -->
          <col style="width: 200px" />
          <!-- Rarity column -->
          <col style="width: 80px" />
          <!-- Type column -->
          <col style="width: 100px" />
          <!-- Base Attack column -->
          <col style="width: 100px" />
          <!-- Bonus Effect column -->
          <col style="width: 150px" />
          <!-- Bonus Effect Value column -->
          <col style="width: 100px" />
          <!-- View More column -->
          <col style="width: 25px" />
        </colgroup>
        <thead>
          <tr class="table-header text-left">
            <th class="weapon-icon"></th>
            <th>Name</th>
            <th>Rarity</th>
            <th>Type</th>
            <th>Base Attack</th>
            <th>Bonus Effect</th>
            <th>Bonus Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table-data"
            v-for="(weapon, index) in weapons"
            :key="index"
          >
            <td class="weapon-icon-container">
              <img
                class="weapon-icon my-3"
                :class="{
                  'rarity-5': weapon.rarity === 5,
                  'rarity-4': weapon.rarity === 4,
                }"
                :src="weapon.image_url"
                :alt="weapon.image_url"
              />
            </td>
            <td class="text-left">{{ weapon.name }}</td>
            <td>
              <p class="rarity-text text-white" :data-stars="weapon.rarity"></p>
            </td>
            <td>{{ weapon.weapon_type_id.name }}</td>
            <td>{{ weapon.base_attack }}</td>
            <td>{{ weapon.bonus_effect_type_id.name }}</td>
            <td>
              {{
                formatBonusEffectValue(
                  weapon.bonus_effect_value,
                  weapon.bonus_effect_type_id.name
                )
              }}
            </td>
            <td>
              <router-link
                class="more-button"
                :key="weapons.id"
                :to="`/weapons/${weapon.id}`"
              >
                Details
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="mt-10">
      <Footer />
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
import Footer from "@/components/Footer.vue";

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
      .select("*, weapon_type_id(name), bonus_effect_type_id(name)");
    if (fetchError) throw fetchError;
    weapons.value = data;
    setCachedData(cacheKey, data);
    sortWeaponsByReleaseDate();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function formatBonusEffectValue(value, type) {
  // add more types here
  return [
    "CRIT DMG",
    "CRIT Rate",
    "DEF %",
    "ATK %",
    "HP %",
    "Energy Recharge",
  ].includes(type)
    ? `${value}%`
    : value;
}

function sortWeaponsByReleaseDate() {
  weapons.value.sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });
}



onMounted(() => {
  getAllWeapons();
});
</script>

<style scoped>
.weapons-container {
  margin-top: 75px;
  width: 100vw;
  cursor: default;
}

.filter-container {
  width: 1200px;
  height: 75px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-options-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.weapons-page-header {
  font-family: var(--font-archivo);
  font-weight: lighter;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: default;
  font-size: 3.5em;
}

.weapons-table-container {
  margin: 0 auto;
  height: 700px;
  width: 1500px;
  overflow-y: scroll;
  border: 1px solid var(--tertiary);
}

.weapons-table {
  margin: 0 auto;
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background-color: #0b192c;
  font-family: var(--font-acme);
  font-size: 1.5em;
  letter-spacing: 1px;
  position: sticky;
  top: 0%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.75);
}

.weapons-table tr:nth-child(even) {
  background-color: var(--secondary);
}

.weapon-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weapon-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
}

.table-data {
  font-size: 1.5em;
  letter-spacing: 1px;
  font-family: var(--font-acme);
}

.more-button {
  background-color: green;
  font-size: 14px;
  border-radius: 5px;
  padding: 5px 10px;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: white;
}

.more-button:hover {
  background-color: darkgreen;
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 5px rgba(231, 148, 74, 0.8),
    0px 0px 15px rgba(231, 148, 74, 0.5);
}

.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 5px rgba(155, 114, 213, 0.8),
    0px 0px 15px rgba(155, 114, 213, 0.5);
}

select {
  /* Remove default styling */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Custom styling */
  width: 200px;
  height: 40px;
  border: none;
  font-size: 1.2em;
  background-color: var(--secondary);
  font-family: var(--font-acme);
  padding-left: 15px;
  border-radius: 10px;
  cursor: pointer;

  /* Custom dropdown arrow (works in all browsers) */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;

  /* Remove default outline and add custom focus style */
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
</style>
