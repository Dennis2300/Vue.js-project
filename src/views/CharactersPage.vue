<template>
  <div>
    <h1 class="character-page-header">Genshin Impact Characters</h1>

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

    <p v-if="error" class="text-red-500">{{ error }}</p>
  <div class="character-display-container">
    <div v-if="!loading && !error && characters?.length" class="character-grid">
      <div v-for="character in characters" :key="character.id " class="character-grid-item">
        <span>{{ character.name }}</span>
      </div>
    </div>
  </div>

    <!-- Ensure characters is defined before looping 
        <ul v-if="!loading && !error && characters?.length" class="space-y-2">
            <li
            v-for="character in characters"
            :key="character.id"
            class="border p-2 rounded-lg shadow-md"
            >
            <strong class="text-lg">{{ character.name }}</strong> -
            <span class="text-gray-500">({{ character.vision }})</span> -
            <span class="font-medium">{{ character.weapon }}</span> -
            <span class="text-yellow-500">{{
                character.rarity?.replace("_", " ") || "Unknown"
            }}</span>
            <a
            :href="character.wiki_url"
            target="_blank"
            class="text-blue-500 hover:underline"
            >Wiki</a
            >
        </li>
    </ul>
-->
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
  try {
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
