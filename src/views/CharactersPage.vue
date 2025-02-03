<template>
  <div>
    <h1>All Genshin Characters</h1>
  </div>

</template>

<script setup>
import "./../css/CharactersPage.css";
import { ref, onMounted } from "vue";
import { getCharacters } from "@/api/api";

// Define types for the variables
const characters = ref([]); // Empty Array for characters to be stored
const loading = ref(true); // Loading state
const error = ref(null); // Error state

const fetchCharacters = async () => {
    try {
        const response = await getCharacters();
        characters.value = response.data;
        console.log("Response: ", characters.value);
    } catch (err) {
        error.value = err;
    }
}


</script>
