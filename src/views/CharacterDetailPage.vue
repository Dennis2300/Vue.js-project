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
        <section class="main-section">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem et
          porro consequuntur nulla. Repellendus, ipsam autem doloremque animi
          quidem cupiditate dolore vero quam amet excepturi commodi quis esse
          laudantium consequuntur.
        </section>
        <section class="right-section">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          atque nemo libero dolore. Sint, possimus repellat? Rerum sint, esse
          atque perferendis impedit neque laudantium, repellendus culpa nesciunt
          fugit, quisquam alias?
        </section>
        <section class="bottom-section">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto qui
          doloribus obcaecati dicta, et quos hic esse deserunt facilis placeat
          quam alias quibusdam corporis iste rem voluptatibus, vero suscipit
          consequuntur?
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
