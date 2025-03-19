<template>
  <section class="main-section grid">
    <img class="vision-image" :src="character.vision.image_url" :alt="character.vision.name" />
    <!-- Name -->
    <div class="grid-item-name">
      {{ character.vision.name }}
    </div>

    <!-- Birthday -->
    <div class="grid-item-birthday">
      {{ character.birthday }}
    </div>

    <!-- Constellation -->
    <div class="grid-item-constellation">
      {{ character.constellation }}
    </div>

    <!-- Favourite Dish -->
    <div class="grid-item-favourite-dish">
      {{ character.favourite_dish }}
    </div>

    <!-- Release Date -->
    <div class="grid-item-release-date">
      {{ character.release_date }}
    </div>

    <!-- Affiliation -->
    <div class="grid-item-affiliation">
      <ul class="styled-list">
        <li v-for="(affiliation, index) in character.affiliation" :key="index">
          {{ affiliation }}
        </li>
      </ul>
    </div>

    <!-- Voice Actors -->
    <div class="grid-item-voice-actors">
      <ul class="styled-list">
        <div v-for="(actor, language) in character.va" :key="language">
          {{ language }} VA: {{ languageEmojis[language] || "🌐" }}
          <strong>{{ actor }}</strong>
        </div>
      </ul>
    </div>
  </section>
</template>

<script setup>
// Define the prop
const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

// Define the language emojis
const languageEmojis = {
  English: "🇺🇸",
  Japanese: "🇯🇵",
  Korean: "🇰🇷",
  Chinese: "🇨🇳",
};
</script>
