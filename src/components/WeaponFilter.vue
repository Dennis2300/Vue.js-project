<template>
  <div class="filter-container">
    <div v-if="loading">Loading visions...</div>
    <div v-if="error" class="error-message">
      Error loading visions: {{ error.message }}
    </div>

    <div v-if="!loading && !error" class="weapon-filter-container">
      <h4 class="weapon-type-filter-header tracking-wider">
        Filter by weapon type:
      </h4>
      <div class="weapon-type-container mt-2">
        <div
          v-for="weaponType in weaponTypes"
          :key="weaponType.id"
          class="weapon-type-item"
          @click="clickLog"
        >
          {{ weaponType.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client

const loading = ref(true);
const error = ref(null);

const weaponTypes = ref([]);

// Get all weapon types from the database
async function getAllWeaponTypes() {
  try {
    let { data, error: fetchError } = await supabase
      .from("weaponTypes")
      .select("*");

    if (fetchError) throw fetchError;

    weaponTypes.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function clickLog() {
  console.log("Weapon type clicked");
}

onMounted(() => {
  getAllWeaponTypes();
});
</script>

<style scoped>
.filter-container {
  padding: 16px 0px 16px 0px;
}

.weapon-type-filter-header {
  font-family: var(--font-acme);
}

.weapon-type-container {
  display: flex;
  gap: 16px;
  white-space: nowrap;
}

.weapon-type-item {
  background-color: var(--filter-color);
  font-family: var(--font-acme);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.weapon-type-item:hover {
  background-color: var(--filter-color-hover);
}
</style>
