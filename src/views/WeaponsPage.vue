<template>
  <!-- Loading Spinner -->
  <LoadingSpinner v-if="loading" />

  <!-- Weapons Container -->
  <div v-if="!loading && !error" class="weapons-page-container">
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
.weapons-page-container {
  background-color: aqua;
}
</style>
