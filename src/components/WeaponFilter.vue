<template>
  <div class="filter-container">
    <div v-if="loading">Loading visions...</div>
    <div v-if="error" class="error-message">
      Error loading visions: {{ error.message }}
    </div>

    <div v-if="!loading && !error" class="weapon-filter-container">
      <div class="weapon-type-container mt-2">
        <div
          v-for="weaponType in weaponTypes"
          :key="weaponType.id"
          class="weapon-type-item"
          :class="{ selected: selectedWeaponTypeId === weaponType.id }"
          @click="selectWeaponType(weaponType.id)"
        >
          <strong class="weapon-filter-name">{{ weaponType.name }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client

const loading = ref(true);
const error = ref(null);

const weaponTypes = ref([]);
const selectedWeaponTypeId = ref(null);

const emits = defineEmits(["filtered-weapons", "clear-filter"]);

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

function selectWeaponType(weaponTypeId) {
  selectedWeaponTypeId.value =
    selectedWeaponTypeId.value === weaponTypeId ? null : weaponTypeId;

  console.log(`Selected weapon type ID: ${selectedWeaponTypeId.value}`);
}

const filteredWeapons = computed(() => {
  const cachedWeapons = sessionStorage.getItem("weapons");
  if (!cachedWeapons) return [];

  try {
    const { data: weapons } = JSON.parse(cachedWeapons);

    return weapons.filter((weapon) => {
      const weaponTypeMatch =
        !selectedWeaponTypeId.value ||
        weapon.weapon_type_id?.id === selectedWeaponTypeId.value;
      return weaponTypeMatch;
    });
  } catch (err) {
    console.error("Error parsing cached weapons:", err);
    return [];
  }
});

watch(
  filteredWeapons,
  (newWeapons) => {
    emits("filtered-weapons", newWeapons);
  },
  { immediate: true }
);

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

.weapon-filter-name {
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
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
  position: relative;
  border: 2px solid transparent;
}

.weapon-type-item:hover {
  background-color: var(--filter-color-hover);
}

.weapon-type-item.active {
  background-color: var(--filter-color-active);
  font-weight: bold;
  box-shadow: 0 0 0 2px white, 0 0 10px 0 var(--filter-color-active);
  transform: scale(1.05);
  z-index: 1;
}

.weapon-type-item.active::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid var(--filter-color-active);
}

.weapon-type-item.selected {
  outline: 1px solid gold;
}
</style>
