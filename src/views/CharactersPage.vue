<template>
  <div>
    <h1 class="character-page-header">Genshin Impact Characters</h1>

    <!-- Show loading spinner if loading -->
    <div v-if="loading" class="loading-spinner-container">
      <l-trefoil
        class="loading-spinner"
        size="40"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.4"
        color="white"
      ></l-trefoil>
    </div>

    <!-- Show error message if there is an error -->
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- Show characters if they are available -->
    <div class="character-display-container">
      <div
        v-if="!loading && !error && characters?.length"
        class="character-grid"
      >
        <div
          v-for="character in characters"
          :key="character.id"
          class="character-grid-item"
        >
          <img src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/04/22/35428890/672e65470bfd14b664596c2a7f7eaaf8_7046130387894981792.png?x-oss-process=image%2Fformat%2Cwebp" alt="" />
          <h3 class="character-name">{{ character.name }}</h3>
          <button>Details...</button>
        </div>
      </div>
    </div>

    <!-- Show message if no characters are found -->
    <p v-if="!loading && !error && !characters?.length" class="text-gray-500">
      No characters available.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCharacters } from "@/api/api.js";
import "./../css/CharactersPage.css";
import "ldrs/trefoil";

const characters = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchCharacters = async () => {
  // Add a delay to simulate loading
  loading.value = true;
  try {
    // Simulate a delay of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await getCharacters();
    // This is to ensure that the characters array is always defined
    characters.value = response.results || [];
  } catch (error) {
    error.value = "Failed to load characters.";
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCharacters);
</script>
