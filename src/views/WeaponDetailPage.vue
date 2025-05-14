<template>
  <div class="weapon-detail-container">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="weapon" class="weapon-detail">
      <router-link to="/weapons">Back to weapons</router-link>
      <h1>{{ weapon.name }}</h1>
      <img :src="weapon.image_url" :alt="weapon.name" />
      <p>{{ weapon.rarity }}</p>
      <p>{{ weapon.weapon_type_id.name }}</p>
      <p>{{ weapon.base_attack }}</p>
      <p>{{ weapon.bonus_effect_type_id.name }}</p>
      <p>
        {{
          formatBonusEffectValue(
            weapon.bonus_effect_value,
            weapon.bonus_effect_type_id.name
          )
        }}
      </p>
      <p>{{ weapon.release_date }}</p>
      <p>{{ weapon.lore_description }}</p>
      <p>{{ weapon.attribute }}</p>
      <p>{{ weapon.attribute_description }}</p>
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
      .select("*, weapon_type_id(name), bonus_effect_type_id(name)")
      .eq("id", weaponId)
      .single();
    if (weaponsError) throw weaponsError;

    return weaponData;
  } catch (err) {
    console.log("Error fetching weapon:", err);
    return null;
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

.weapon-detail {
  background-color: aqua;
}
</style>
