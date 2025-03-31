<template>
    <div class="vision-container">
        <div v-if="loading">Loading visions...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
            <h2>Visions</h2>
            <div v-for="vision in visions" :key="vision.id" class="vision-item">
                <img :src="vision.image_url" :alt="vision.name">
            </div>
        </div>
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
