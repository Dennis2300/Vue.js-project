<template>
    <div>
      <h2>Create Character</h2>
      <form class="create-character-form" @submit.prevent="submitCharacter">
        <!-- Character Name -->
        <input v-model="characterData.name" type="text" placeholder="Character Name" required />
  
        <!-- Character Rarity -->
        <select v-model="characterData.rarity" required>
          <option value="" disabled selected>Rarity</option>
          <option :value="5">5 Stars</option>
          <option :value="4">4 Stars</option>
        </select>
  
        <!-- Vision select -->
        <select v-model="characterData.vision_id" required>
          <option value="" disabled selected>Vision</option>
          <option v-for="vision in visions" :key="vision.id" :value="vision.id">
            {{ vision.name }}
          </option>
        </select>
  
        <!-- Birthday as a STRING in MM/DD format -->
        <input v-model="characterData.birthday" type="text" placeholder="Birthday (DD/MM)" required />
  
        <!-- Constellation Name -->
        <input v-model="characterData.constellation" type="text" placeholder="Constellation" required />
  
        <!-- Affiliation -->
        <div>
          <label for="affiliation">Affiliation(s)</label>
          <div>
            <input v-model="newAffiliation" type="text" placeholder="Enter an affiliation" />
            <button type="button" @click="addAffiliation">Add More</button>
          </div>
          <ul>
            <li v-for="(affiliation, index) in characterData.affiliation" :key="index">
              {{ affiliation }}
              <button type="button" @click="removeAffiliation(index)">Remove</button>
            </li>
          </ul>
        </div>
  
        <!-- Favourite Dish -->
        <input v-model="characterData.favourite_dish" type="text" placeholder="Favourite Dish" required />
  
        <!-- Release Date -->
        <input v-model="characterData.release_date" type="date" required />
  
        <!-- Voice actors -->
        <div>
          <input v-model="characterData.va.English" type="text" placeholder="English Voice Actor" />
          <input v-model="characterData.va.Japanese" type="text" placeholder="Japanese Voice Actor" />
          <input v-model="characterData.va.Korean" type="text" placeholder="Korean Voice Actor" />
          <input v-model="characterData.va.Chinese" type="text" placeholder="Chinese Voice Actor" />
        </div>
  
        <!-- Character Wiki URL -->
        <input v-model="characterData.wiki_url" type="text" placeholder="Wiki URL" required />
  
        <!-- Character Avatar URL -->
        <input v-model="characterData.image_url" type="text" placeholder="Avatar URL" required />
  
        <!-- Submit Button -->
        <button type="submit" class="button">Submit Character</button>
  
        <!-- Display success or error message -->
        <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
        <p v-if="error" class="text-red-500">{{ error }}</p>
      </form>
    </div>
  </template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabaseClient.js";

// Character form state
const characterData = ref({
  name: "",
  rarity: null,
  vision_id: "", // Correct column name
  birthday: "",
  constellation: "",
  affiliation: [], // Store multiple affiliations as JSON
  favourite_dish: "",
  release_date: "",
  va: {
    English: "",
    Japanese: "",
    Korean: "",
    Chinese: "",
  }, // Voice actors stored as JSON
  wiki_url: "",
  image_url: "", // Correct column name
});

// Visions state
const visions = ref([]);

// Error handling state
const error = ref(null);
const successMessage = ref(null);

// Fetch visions from the database
async function fetchVisions() {
  try {
    let { data, error: fetchError } = await supabase.from("vision").select("*");
    if (fetchError) throw fetchError;
    visions.value = data;
  } catch (err) {
    error.value = err.message;
  }
}

// Add and remove affiliations
const newAffiliation = ref("");

const addAffiliation = () => {
  if (newAffiliation.value.trim() !== "") {
    characterData.value.affiliation.push(newAffiliation.value.trim());
    newAffiliation.value = "";
  }
};
const removeAffiliation = (index) => {
  characterData.value.affiliation.splice(index, 1);
};

// Submit function
const submitCharacter = async () => {
  successMessage.value = null;
  error.value = null;

  // Validate required fields
  if (!characterData.value.name || !characterData.value.rarity || !characterData.value.vision_id) {
    error.value = "Please fill out all required fields.";
    return;
  }

  // Convert release_date to proper format
  const formattedDate = characterData.value.release_date
    ? new Date(characterData.value.release_date).toISOString().split("T")[0]
    : null;

  // Construct the payload for Supabase
  const payload = {
    name: characterData.value.name,
    rarity: characterData.value.rarity,
    vision_id: characterData.value.vision_id, // Correct column name
    birthday: characterData.value.birthday,
    constellation: characterData.value.constellation,
    affiliation: JSON.stringify(characterData.value.affiliation), // Convert to JSON
    favourite_dish: characterData.value.favourite_dish, // Correct column name
    release_date: formattedDate, // Ensure correct DATE format
    va: JSON.stringify(characterData.value.va), // Convert voice actors to JSON
    wiki_url: characterData.value.wiki_url,
    image_url: characterData.value.image_url, // Correct column name
  };

  console.log("Submitting character:", payload); // Debugging log

  // Insert into Supabase
  const { data, error: insertError } = await supabase
    .from("character")
    .insert([payload]);

  if (insertError) {
    error.value = insertError.message;
  } else {
    successMessage.value = "Character successfully added!";
    // Reset form after submission
    characterData.value = {
      name: "",
      rarity: null,
      vision_id: "",
      birthday: "",
      constellation: "",
      affiliation: [],
      favourite_dish: "",
      release_date: "",
      va: {
        English: "",
        Japanese: "",
        Korean: "",
        Chinese: "",
      },
      wiki_url: "",
      image_url: "",
    };
  }
};

onMounted(() => {
  fetchVisions();
});
</script>

<style scoped>
.create-character-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

select,
input {
  padding: 0.5rem;
  font-size: 1rem;
  background-color: var(--stroke);
  color: var(--paragraph);
}

.button {
  padding: 0.5rem 1rem;
  background-color: var(--stroke);
  color: white;
  border: none;
  cursor: pointer;
}
</style>