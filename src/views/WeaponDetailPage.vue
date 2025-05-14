<template>
  <div class="weapon-detail-container">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="weapon">
      <h1>{{ weapon.name }}</h1>
      <router-link to="/weapons">Back to weapons</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "./../supabaseClient.js";

import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component

const weapon = ref(null);
const route = useRoute();
const loading = ref(true);

async function fetchWeaponDetails(weaponId) {
  try {
    const { data: weaponData, error: weaponsError } = await supabase
      .from("weapons")
      .select("*")
      .eq("id", weaponId)
      .single();
    if (weaponsError) throw weaponsError;

    return weaponData;
  } catch (err) {
    console.log("Error fetching weapon:", err);
    return null;
  }
}

onMounted(async () => {
  const weaponId = useRoute().params.id;
  loading.value = true;
  weapon.value = await fetchWeaponDetails(weaponId);
  loading.value = false;
});
</script>

<style scoped>
.weapon-detail-container {
  margin: 75px 0 0 0;
}
</style>
