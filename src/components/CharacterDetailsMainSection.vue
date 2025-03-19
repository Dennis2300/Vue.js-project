<template>
  <section class="main-section grid">
    <img
      class="vision-image"
      :src="character.vision.image_url"
      :alt="character.vision.name"
    />
    <!-- Rarity -->
    <div class="grid-item-rarity">
      <strong>Rarity: </strong>{{ character.rarity }} Star
    </div>

    <!-- Vision Name -->
    <div class="grid-item-vision-name">
      <strong>Vision:</strong> {{ character.vision.name }}
    </div>

    <!-- Birthday -->
    <div class="grid-item-birthday">
      <strong>Birthday:</strong> {{ character.birthday }}
    </div>

    <!-- Constellation -->
    <div class="grid-item-constellation">
      <strong>Constellation:</strong> {{ character.constellation }}
    </div>

    <!-- Favourite Dish -->
    <div class="grid-item-favourite-dish">
      <strong>Special Dish:</strong> {{ character.favourite_dish }}
    </div>

    <!-- Release Date -->
    <div class="grid-item-release-date">
      <strong> Release Date: </strong> {{ character.release_date }}
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
