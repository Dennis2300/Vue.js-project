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
      <strong>Rarity</strong> | {{ character.rarity }} Star
    </div>

    <!-- Vision Name -->
    <div class="grid-item-vision-name">
      <strong>Vision</strong> |
      {{ character.vision.name }}
    </div>

    <!-- Birthday -->
    <div class="grid-item-birthday">
      <strong>Birthday</strong> |
      {{ character.birthday }}
    </div>

    <!-- Constellation -->
    <div class="grid-item-constellation">
      <strong>Constellation</strong> |
      {{ character.constellation }}
    </div>

    <!-- Favourite Dish -->
    <div class="grid-item-favourite-dish">
      <strong>Special Dish</strong> |
      {{ character.favourite_dish }}
    </div>

    <!-- Release Date -->
    <div class="grid-item-release-date">
      <strong>Release Date</strong> |
      {{
        new Date(character.release_date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
    </div>

    <!-- Best Artifact Sets -->
    <div class="grid-item-artifact">
      <h3>Best Artifacts</h3>
      <div class="flex space-x-12 text-center mt-4">
        <div>
          <img src="https://placehold.co/100x100" alt="" />
          <h5>Placeholder</h5>
        </div>
        <div>
          <img src="https://placehold.co/100x100" alt="" />
          <h5>Placeholder</h5>
        </div>
        <div>
          <img src="https://placehold.co/100x100" alt="" />
          <h5>Placeholder</h5>
        </div>
      </div>
    </div>

    <!-- Best Weapons -->
    <div class="grid-item-weapons">
      <h3>Best Weapons</h3>
      <div class="flex space-x-12 text-center mt-4">
        <div>
          <img src="https://placehold.co/100x100" alt="" />
          <h5>Placeholder</h5>
        </div>
        <div>
          <img src="https://placehold.co/100x100" alt="" />
          <h5>Placeholder</h5>
        </div>
        <div>
          <img src="https://placehold.co/100x100" alt="" />
          <h5>Placeholder</h5>
        </div>
      </div>
    </div>

    <div v-if="character.weapons.length" class="grid-item-weapons">
      <h3>Best Weapons</h3>
      <div class="flex space-x-12 text-center mt-4">
        <div
          v-for="weapon in character.weapons"
          :key="weapon.id"
          class="weapon-item"
        >
          <img :src="weapon.image_url" alt="" />
          <h5>{{ weapon.name }}</h5>
        </div>
      </div>
    </div>
    -
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
</script>

<style scoped>
strong {
  color: var(--quaternary);
}

.vision-image {
  position: absolute;
  right: 3%;
  top: 5%;
  height: 100px;
  width: 100px;
  background-color: var(--primary);
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
