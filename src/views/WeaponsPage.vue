<template>
  <div class="weapons-container">
    <LoadingSpinner v-if="loading" />

    <div class="filter-container" v-if="!loading && !error">
      <div class="filter-header">Placeholder for Weapons Filter</div>
    </div>

    <h1 class="weapons-page-header divider">Weapon Archive</h1>
    <div class="weapons-table-container" v-if="!loading && !error">
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
          <col style="width: 150px" />
          <!-- View More column -->
          <col style="width: 25px" />
        </colgroup>
        <tr class="table-header">
          <th class="weapon-icon"></th>
          <th>Name</th>
          <th>Rarity</th>
          <th>Type</th>
          <th>Base Attack</th>
          <th>Bonus Effect</th>
          <th>Bonus Value</th>
          <th></th>
        </tr>
        <tr class="table-data" v-for="(weapons, index) in weapons" :key="index">
          <td>
            <img
              class="weapon-icon"
              :class="{
                'rarity-5': weapons.rarity === 5,
                'rarity-4': weapons.rarity === 4,
              }"
              :src="weapons.image_url"
              :alt="weapons.image_url"
            />
          </td>
          <td>{{ weapons.name }}</td>
          <td>
            <p class="rarity-text text-white" :data-stars="weapons.rarity"></p>
          </td>
          <td>{{ weapons.weapon_type_id.name }}</td>
          <td>{{ weapons.base_attack }}</td>
          <td>{{ weapons.bonus_effect_type_id.name }}</td>
          <td>
            {{
              formatBonusEffectValue(
                weapons.bonus_effect_value,
                weapons.bonus_effect_type_id.name
              )
            }}
          </td>
          <td><button>More...</button></td>
        </tr>
      </table>
    </div>

    <div v-if="!loading && !error">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import Footer from "@/components/Footer.vue";

const loading = ref(true);
const error = ref(null);

const weapons = ref([]);

async function getAllWeapons() {
  try {
    let { data, error: fetchError } = await supabase
      .from("weapon")
      .select("*, weapon_type_id(name), bonus_effect_type_id(name)");

    if (fetchError) throw fetchError;

    weapons.value = data;
    console.log(weapons.value);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function formatBonusEffectValue(value, type) {
  // add more types here
  return ["CRIT DMG", "CRIT Rate"].includes(type) ? `${value} %` : value;
}

onMounted(() => {
  getAllWeapons();
});
</script>

<style scoped>
.weapons-container {
  margin-top: 75px;
  width: 100vw;
}

.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  height: 7vh;
}

.weapons-table-container {
  margin-top: 25px;
  height: 55vh;
  overflow-y: scroll;
  margin-bottom: 25px;
}

.weapons-table {
  margin: 0 auto;
  width: 100vw;
  border-collapse: collapse;
}

.table-header {
  background-color: #0b192c;
  font-family: var(--font-acme);
  font-size: 2em;
  position: sticky;
  top: 0%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.75);
}

.weapons-table tr:nth-child(odd) {
  background-color: var(--secondary);
}

.weapon-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin: 10px;
}

.table-data {
  text-align: center;
  font-size: 1.5em;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
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
</style>
