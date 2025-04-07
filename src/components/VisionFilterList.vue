<template>
  <div class="filter-container">
    <div v-if="loading">Loading visions...</div>
    <!------------------------------------------------------------>
    <div v-else-if="error" class="error">{{ error }}</div>
    <!------------------------------------------------------------>
    <div v-else class="vision-filter-container">
      <h4 class="vision-filter-header">Filter by Vision</h4>
      <div class="vision-filter-list">
        <div
          v-for="vision in visions"
          :key="vision.id"
          class="vision-filter-item"
        >
          <img
            :src="vision.image_url"
            :alt="vision.name"
            class="vision-filter-icon"
          />
        </div>
      </div>
    </div>
    <!------------------------------------------------------------>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabaseClient.js";

// Loading and error states
const loading = ref(true);
const error = ref(null);

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

// This will hold the list of visions fetched from the database
const visions = ref([]);

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

onMounted(async () => {
  await getAllVisions();
});
</script>

<style scoped>
.filter-container {
  width: 500px;
}

.vision-filter-list {
  display: grid;
  grid-auto-flow: column;
}

.vision-filter-header {
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.vision-filter-icon {
  height: 40px;
  width: 40px;
  background-color: var(--secondary);
  border-radius: 100px;
  padding: 10px;
}
</style>
