<template>
  <section class="main-section grid">
    <!-- Vision Image -->
    <img
      class="vision-image"
      :src="character.vision.image_url"
      :alt="character.vision.name"
    />

    <!-- Rarity -->
    <div class="grid-item-rarity">
      Rarity
      <p class="rarity-text" :data-stars="character.rarity"></p>
    </div>

    <!-- Vision Name -->
    <div class="grid-item-vision-name">
      Vision |
      <strong>
        {{ character.vision.name }}
      </strong>
    </div>

    <!-- Birthday -->
    <div class="grid-item-birthday">
      Birthday |
      <strong>
        {{ character.birthday }}
      </strong>
    </div>

    <!-- Constellation -->
    <div class="grid-item-constellation">
      Constellation |
      <strong>
        {{ character.constellation }}
      </strong>
    </div>

    <!-- Favourite Dish -->
    <div class="grid-item-favourite-dish">
      Special Dish |
      <strong>
        {{ character.favourite_dish }}
      </strong>
    </div>

    <!-- Release Date -->
    <div class="grid-item-release-date">
      Release Date |
      <strong>
        {{ character.release_date }}
      </strong>
    </div>

    <!-- Affiliation -->
    <div class="grid-item-affiliation">
      <h3 class="list-title">Affiliations</h3>
      <ul class="styled-list">
        <li v-for="(affiliation, index) in character.affiliation" :key="index">
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
.vision-image {
  position: absolute;
  right: 3%;
  top: 5%;
  height: 100px;
  width: 100px;
  background-color: var(--background);
  border-radius: 100px;
}

.list-title {
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-areas:
    "rarity vision"
    "birthday constellation"
    "dish release"
    "affiliation va";
  gap: 50px;
}

.grid-item-rarity {
  grid-area: rarity;
}

.grid-item-vision-name {
  grid-area: vision;
}

.grid-item-birthday {
  grid-area: birthday;
}

.grid-item-constellation {
  grid-area: constellation;
}

.grid-item-favourite-dish {
  grid-area: dish;
}

.grid-item-release-date {
  grid-area: release;
}

.grid-item-affiliation {
  grid-area: affiliation;
}

.grid-item-voice-actors {
  grid-area: va;
}
</style>
