<template>
  <div class="filter-container">
    <div v-if="loading">Loading visions...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="character-filter-container">
      <h4 class="vision-filter-header">Visions</h4>
      <div class="vision-filter-list">
        <div
          v-for="vision in visions"
          :key="vision.id"
          class="vision-filter-item"
          :class="{ selected: selectedVisionId === vision.id }"
          @click="selectVision(vision)"
        >
          <img
            :src="vision.image_url"
            :alt="vision.name"
            class="vision-filter-icon"
          />
        </div>
        <div class="divider-line"></div>
        <div class="vision-filter-item clear-button" @click="clearSelection">
          <svg class="clear-icon" viewBox="0 0 24 24">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
      <h4 class="rarity-filter-header">Rarity</h4>

      <div class="rarity-filter-container">
        <div
          class="rarity-star-container"
          :class="{ selected: selectedRarity === 5 }"
          @click="selectRarity(5)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
        </div>
        <div
          class="rarity-star-container"
          :class="{ selected: selectedRarity === 4 }"
          @click="selectRarity(4)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi bi-star-fill rarity-star"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, computed, watch } from "vue";
import { supabase } from "../supabaseClient.js";

const emits = defineEmits(["filtered-characters", "clear-filter"]);
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

// Loading and error states
const loading = ref(true);
const error = ref(null);
// Data states
const visions = ref([]);
const selectedVisionId = ref(null);
const selectedRarity = ref(null);

// cache functions will be made as modules later
function getCachedData(key) {
  const cachedData = sessionStorage.getItem(key);

  if (!cachedData) {
    return null;
  }

  const { data, timestamp } = JSON.parse(cachedData);
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

// Fetch all vision from database
async function getAllVisions() {
  const cacheKey = "visions";

  const cachedVisions = getCachedData(cacheKey);
  if (cachedVisions) {
    visions.value = cachedVisions;
    loading.value = false;
    return;
  }

  try {
    let { data, error: fetchError } = await supabase
      .from("vision")
      .select("*, name, image_url");
    if (fetchError) throw fetchError;

    visions.value = data;
    setCachedData(cacheKey, data);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Changes the vision state to the selected vision
function selectVision(vision) {
  selectedVisionId.value = vision.id;
}

// changes the selected vision to the selected vision
function selectRarity(stars) {
  selectedRarity.value = selectedRarity.value === stars ? null : stars;
}

// Creates a reactive computed property
const filteredCharacters = computed(
  // Computed is a Vue Composition API function that creates reactive derived data
  // Vue automatically tracks which reactive values are used inside and re-runs the function when they change
  // Arrow function for filtering characters
  () => {
    // Get the cached characters from sessionStorage
    const cachedCharacters = sessionStorage.getItem("characters");
    if (!cachedCharacters) return []; // Return empty array if no characters are cached

    try {
      // Parse the cached characters
      const { data: characters } = JSON.parse(cachedCharacters);

      // Filter characters based on selected vision and rarity
      return characters.filter((char) => {
        const visionMatch =
          !selectedVisionId.value || char.vision_id === selectedVisionId.value;
        const rarityMatch =
          !selectedRarity.value || char.rarity === selectedRarity.value;
        return visionMatch && rarityMatch;
      });
    } catch (err) {
      console.error("Error filtering characters:", err);
      return []; // Return empty array in case of error
    }
  }
);

// Function to clear filter
function clearSelection() {
  selectedVisionId.value = null;
  selectedRarity.value = null;
  emits("clear-filter");
}

// Watch statement to update the filtered characters if the selected vision or rarity changes
watch(
  filteredCharacters,
  (newVal) => {
    emits("filtered-characters", newVal);
  },
  { immediate: true }
);

onMounted(async () => {
  await getAllVisions();
});
</script>

<style scoped>
.filter-container {
  width: 500px;
  font-family: var(--font-heading);

}

.vision-filter-list {
  display: grid;
  grid-auto-flow: column;
  
}

.vision-filter-header {
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.rarity-filter-header {
  margin-top: 20px;
  margin-bottom: 10px;
  letter-spacing: 1px;

}

.vision-filter-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  background-color: var(--filter-color);
  border-radius: 100px;
}

.vision-filter-item:hover {
  background-color: var(--filter-color-hover);
  border-radius: 100px;
}

.vision-filter-item.selected {
  outline: 2px solid gold;
}

.vision-filter-icon {
  height: 40px;
  width: 40px;
  padding: 10px;
  border-radius: 100px;
}

.clear-button {
  background: var(--secondary) !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.clear-button:hover {
  background: var(--secondary); /* Tomato red hover */
  border-color: rgba(255, 99, 71, 0.6);
}

.clear-icon {
  width: 40px;
  height: 40px;
  padding: 10px;
  color: white;
  opacity: 0.8;
  background-color: inherit;
  border-radius: 100px;
}

.divider-line {
  height: 100%;
  width: 3px;
  border-radius: 25px;
  background: var(--secondary);
  margin-right: 12px;
}

.rarity-filter-container {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px;
  margin-bottom: 1rem;
  gap: 25px;
  border-radius: 8px;
  padding: 0%;
}

.rarity-star-container {
  display: flex;
  gap: 5px;
  background-color: var(--filter-color);
  padding: 7px 14px 7px 14px;
  border-radius: 10px;
  cursor: pointer;
}

.rarity-star-container:hover {
  background-color: var(--filter-color-hover);
}

.rarity-star-container.selected {
  outline: 1px solid gold;
}

.rarity-star {
  color: #f5c518;
  fill: #f5c518;
  width: 16px;
  height: 16px;
  background-color: transparent;
}
</style>
