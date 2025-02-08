<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js"; // Adjust the path if needed

const regions = ref([]);
const characters = ref([]);
const visions = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchRegion = async () => {
  try {
    let { data, error: fetchError } = await supabase.from("region").select("*");
    console.log(data);
    if (fetchError) throw fetchError;
    regions.value = data;
  } catch (err) {
    error.value = err.message;
  }
};

const fetchCharacter = async () => {
  try {
    let { data, error: fetchError } = await supabase
      .from("character")
      .select("*");
    console.log(data);
    if (fetchError) throw fetchError;
    characters.value = data;
  } catch (err) {
    error.value = err.message;
  }
};

const fetchVision = async () => {
  try {
    let { data, error: fetchError } = await supabase.from("vision").select("*");
    console.log(data);

    if (fetchError) throw fetchError;
    visions.value = data;
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(async () => {
  loading.value = true;
  await fetchRegion();
  await fetchCharacter();
  await fetchVision();
  loading.value = false;
});
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>

  <div v-else>
    <h2>Regions</h2>
    <ul>
      <li v-for="region in regions" :key="region.id">
        {{ region.name }}
      </li>
    </ul>

    <h2>Characters</h2>
    <ul>
      <li v-for="character in characters" :key="character.id">
        <p>
          {{ character.name }}
        </p>
        <img :src="character.image_url" alt="Vision Image" class="vision-img" />
      </li>
    </ul>

    <h2>Visions</h2>
    <ul>
      <li v-for="vision in visions" :key="vision.id">
        <p>
          {{ vision.name }}
        </p>
        <img :src="vision.image_url" alt="Vision Image" class="vision-img" />
      </li>
    </ul>
  </div>
</template>
