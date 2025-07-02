<template>
  <div class="weapon-detail-container">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="weapon" class="weapon-detail">
      <div class="weapon-detail-header">
        <div class="weapon-image-container">
          <img
            class="weapon-image"
            :class="{
              'rarity-5': weapon.rarity === 5,
              'rarity-4': weapon.rarity === 4,
            }"
            :src="weapon.image_url"
            :alt="weapon.name"
          />
        </div>
        <div class="weapon-info">
          <h1 class="weapon-name">{{ weapon.name }}</h1>
          <p class="rarity-text" :data-stars="weapon.rarity"></p>
          <strong>{{ weapon.weapon_type_id.name }}</strong>
          <p class="weapon-sub-stats">
            <strong>Base Attack:</strong> {{ weapon.base_attack }}
          </p>
          <p class="weapon-sub-stats">
            <strong>{{ weapon.bonus_effect_type_id.name }}:</strong>
            {{
              formatBonusEffectValue(
                weapon.bonus_effect_value,
                weapon.bonus_effect_type_id.name
              )
            }}
          </p>
        </div>
      </div>
      <h1 class="divider header">Attribute</h1>
      <div class="weapon-attribute-text">
        <h1>{{ weapon.attribute }}</h1>
        <MarkdownRender
          class="pl-3 mt-2 mb-10"
          :content="weapon.attribute_description"
        />
      </div>
      <div class="lore-text">
        <h2 class="divider header">Description</h2>
        <MarkdownRender class="pl-2" :content="weapon.lore_description" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "./../supabaseClient.js";
import MarkdownRender from "@/components/MarkdownRender.vue";

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
  margin: 25px 0px 75px 0px;
}

.weapon-detail {
  background-color: var(--secondary);
  width: 66%;
  height: auto;
  margin: 0 auto;
  padding: 50px;
  border-radius: 20px;
}

.weapon-detail-header {
  display: flex;
  justify-content: left;
}

.weapon-image {
  width: 200px;
  height: 200px;
  margin-right: 20px;
  border-radius: 20px;
}

.weapon-name {
  font-family: var(--font-acme);
}

.weapon-info {
  margin-left: 20px;
  font-size: 1.5em;
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

.rarity-text::before {
  content: attr(data-stars);
  font-family: Arial, sans-serif;
  font-size: 1.2em;
  font-weight: bold;
}

.rarity-text[data-stars="5"]::before {
  content: "★★★★★";
  color: gold;
}
.rarity-text[data-stars="4"]::before {
  content: "★★★★";
  color: gold;
}

.weapon-sub-stats {
  font-family: var(--font-acme);
  letter-spacing: 1px;
}

.header {
  font-family: var(--font-acme);
  font-size: 2.5em;
  margin-top: 20px;
  letter-spacing: 1px;
}

.weapon-attribute-text {
  font-family: Arial, Helvetica, sans-serif;
}

.lore-text {
  font-family: Arial, Helvetica, sans-serif;
}

strong {
  font-weight: bold;
  color: lightgray;
  letter-spacing: 1px;
  font-size: 26px;
}
</style>
