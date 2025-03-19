<template>
  <div class="character-detail-container">
    <!-- Loading Spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- Character Detail Page -->
    <div
      v-else-if="character"
      class="character-detail"
      :class="{
        'rarity-5': character.rarity === 5,
        'rarity-4': character.rarity === 4,
      }"
    >
      <div class="character-detail-header-container">
        <img
          :src="character.image_url"
          alt="Vision"
          class="character-detail-avatar"
        />
        <p class="rarity-text" :data-stars="character.rarity"></p>
        <h1 class="character-detail-header">{{ character.name }}</h1>
      </div>

      <!-- Character Detail Layout -->
      <div class="character-detail-layout">
        <section class="main-section grid">
          <div class="grid-item-name">
            {{ character.vision.name }}
          </div>
          <div class="grid-item-birthday">
            {{ character.birthday }}
          </div>
          <div class="grid-item-constellation">
            {{ character.constellation }}
          </div>
          <div>
            {{ character.favourite_dish }}
          </div>
          <div>
            {{ character.release_date }}
          </div>
          <div class="grid-item-affiliation">
            <ul class="styled-list">
              <li
                v-for="(affiliation, index) in character.affiliation"
                :key="index"
              >
                {{ affiliation }}
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <div v-for="(actor, language) in character.va" :key="language">
                {{ language }} Voice Actor: <strong>{{ actor }}</strong>
              </div>
            </ul>
          </div>
        </section>
        <section class="right-section">
          <div>Best Weapon:</div>
        </section>
        <section class="bottom-section">
          <div>
            <a :href="character.wiki_url || '#'" target="_blank">Source</a>
          </div>
        </section>
      </div>
    </div>

    <!-- Error Message-->
    <div v-else>
      <p>Character not found.</p>
    </div>
  </div>
</template>

<script setup>
// Import the necessary functions and components
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "./../supabaseClient.js";

// Import the necessary styles
import "./../css/CharacterDetailPage.css";
import "./../css/CharacterDetailGrid.css";

// Import the loading spinner component
import "ldrs/trefoil";
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component

const route = useRoute();
const character = ref(null);
const loading = ref(true);

async function fetchCharacterDetails(characterId) {
  try {
    const { data, error } = await supabase
      .from("character")
      .select("*, vision:vision_id(name, image_url)")
      .eq("id", characterId)
      .single();

    if (error) throw error;
    return data; // Return the fetched character data
  } catch (err) {
    console.error("Error fetching character:", err);
    return null; // Return null if there's an error
  }
}

onMounted(async () => {
  const characterId = route.params.id;
  loading.value = true;
  character.value = await fetchCharacterDetails(characterId);
  loading.value = false;
});
</script>
