<template>
  <div class="weapons-container">
    <LoadingSpinner v-if="loading" />

    <div class="filter-container" v-if="!loading && !error">
      <div class="filter-header">Placeholder for Weapons Filter</div>
    </div>

    <div class="weapons-table-container" v-if="!loading && !error">
      <h1 class="weapons-page-header divider">Weapon Archive</h1>
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
        <tr>
          <th class="weapon-icon"></th>
          <th>Name</th>
          <th>Rarity</th>
          <th>Type</th>
          <th>Base Attack</th>
          <th>Bonus Effect</th>
          <th>Bonus Value</th>
        </tr>
        <tr class="table-data" v-for="(weapons, index) in weapons" :key="index">
          <td>
            <img
              class="weapon-icon"
              :src="weapons.image_url"
              :alt="weapons.image_url"
            />
          </td>
          <td>{{ weapons.name }}</td>
          <td>{{ weapons.rarity }}</td>
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
  min-height: 100vh;
}

.weapons-table {
  margin: 0 auto;
  width: 1400px;
  margin-top: 50px;
  border-collapse: collapse;
  border: 1px solid var(--tertiary);
}

.weapons-table tr {
  border-bottom: 1px solid #ccc;
}

.weapon-icon {
  width: 80px;
  height: 80px;
}

.table-data {
  text-align: center;
  font-size: 1.5em;
  font-family: var(--font-acme);
}

</style>
