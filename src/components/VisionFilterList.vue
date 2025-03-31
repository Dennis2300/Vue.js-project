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

const visions = ref([]);
const loading = ref(true);
const error = ref(null);

async function getAllVisions() {
  try {
    let { data, error: fetchError } = await supabase
      .from("vision")
      .select("*, name, image_url");

    if (fetchError) throw fetchError;
    visions.value = data;
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
