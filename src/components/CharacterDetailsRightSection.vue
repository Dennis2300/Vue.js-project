<template>
    <section class="right-section flex flex-col gap-6">
          <!-- Affiliation -->
          <div class="grid-item-affiliation mt-2">
            <h3 class="list-title mb-3">Affiliations</h3>
            <ul class="styled-list">
              <li
                v-for="(affiliation, index) in character.affiliation"
                :key="index"
              >
                {{ affiliation }}
              </li>
            </ul>
          </div>

          <!-- Voice Actors -->
          <div class="grid-item-voice-actors">
            <h3 class="list-title">Voice Actors</h3>
            <ul class="styled-list">
              <div v-for="(actor, language) in character.va" :key="language">
                {{ language }} {{ languageEmojis[language] || "🌐" }}
                <strong>{{ actor }}</strong>
              </div>
            </ul>
          </div>

          <!-- Regions -->
          <div class="grid-item-regions" v-if="character.regions.length">
            <h3>Associated Regions</h3>
            <div class="regions-list">
              <div
                v-for="region in character.regions"
                :key="region.id"
                class="region-tag"
              >
                {{ region.name }}
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