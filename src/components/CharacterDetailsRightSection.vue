<template>
  <section class="right-section">
    <!-- Affiliation -->
    <div class="section-item vertical-center-left">
      <h3 class="divider">Affiliations</h3>
      <ul class="no-bullets">
        <li
          v-for="(affiliation, index) in character.affiliation"
          :key="index"
          class="list-item"
        >
          {{ affiliation }}
        </li>
      </ul>
    </div>

    <!-- Voice Actors -->
    <div class="section-item">
      <h3 class="divider">Voice Actors</h3>
      <ul class="no-bullets">
        <li
          v-for="(actor, language) in character.va"
          :key="language"
          class="list-item"
        >
          {{ languageEmojis[language] || "🌐" }} |
          {{ actor }}
        </li>
      </ul>
    </div>

    <!-- Regions -->
    <div class="section-item" v-if="character.regions.length">
      <h3 class="divider">Associated Regions</h3>
      <ul class="no-bullets">
        <li
          v-for="region in character.regions"
          :key="region.id"
          class="list-item"
        >
          {{ region.name }}
        </li>
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

<style scoped>
.right-section {
  font-family: var(--font-acme);
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
}

.section-item {
  height: 150px;
}

.no-bullets {
  list-style-type: none;
}

.list-item {
  margin-bottom: 5px;
}
</style>
