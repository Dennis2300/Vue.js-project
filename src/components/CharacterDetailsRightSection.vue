<template>
  <section class="right-section flex flex-col gap-6">
    <!-- Affiliation -->
    <div class="grid-item-affiliation mt-2">
      <h3 class="list-title divider">Affiliations</h3>
      <ul class="styled-list">
        <li v-for="(affiliation, index) in character.affiliation" :key="index">
          {{ affiliation }}
        </li>
      </ul>
    </div>

    <!-- Voice Actors -->
    <div class="grid-item-voice-actors">
      <h3 class="list-title divider">Voice Actors</h3>
      <ul>
        <div
          class="va-list"
          v-for="(actor, language) in character.va"
          :key="language"
        >
          {{ languageEmojis[language] || "🌐" }} |
          {{ actor }}
        </div>
      </ul>
    </div>

    <!-- Regions -->
    <div class="grid-item-regions" v-if="character.regions.length">
      <h4 class="list-title divider">Associated Regions</h4>
      <div>
        <div
          v-for="region in character.regions"
          :key="region.id"
          class="region-tag region-list"
        >
          <h3 class="region-name">{{ region.name }}</h3>
        </div>
      </div>
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
  gap: 20px;
}

.right-section > div {
  min-height: 155px;
  overflow: auto;
}

.list-title {
  margin-top: 0px;
  margin-bottom: 10px;
  background-color: inherit;
  color: grey;
}

.region-name {
  background-color: inherit;
}

.center {
  margin: auto 0;
}
</style>
