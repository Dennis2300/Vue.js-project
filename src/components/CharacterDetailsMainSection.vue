<template>
  <section class="main-section grid">
    <!-- Vision Image -->
    <img
      class="vision-image"
      :src="character.vision.image_url"
      :alt="character.vision.name"
    />

    <!-- Rarity -->
    <div class="grid-item grid-item-rarity">
      <strong>Rarity |</strong> {{ character.rarity }} Star
    </div>

    <!-- Vision Name -->
    <div class="grid-item grid-item-vision-name">
      <strong>Vision |</strong>
      {{ character.vision.name }}
    </div>

    <!-- Birthday -->
    <div class="grid-item grid-item-birthday">
      <strong>Birthday |</strong>
      {{ character.birthday }}
    </div>

    <!-- Constellation -->
    <div class="grid-item grid-item-constellation">
      <strong>Constellation |</strong>
      {{ character.constellation }}
    </div>

    <!-- Favourite Dish -->
    <div class="grid-item grid-item-favourite-dish">
      <strong>Special Dish |</strong>
      {{ character.favourite_dish }}
    </div>

    <!-- Release Date -->
    <div class="grid-item grid-item-release-date">
      <strong>Release Date |</strong>
      {{
        new Date(character.release_date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
    </div>

    <!-- Best Artifact Sets -->
    <div v-if="character.artifacts.length" class="grid-item grid-item-artifact">
      <h3>Best Artifacts</h3>
      <!-- Best Artifact list -->
      <div class="flex space-x-16 text-center mt-4">
        <div
          v-for="artifact in character.artifacts"
          :key="artifact.id"
          class="max-w-[100px]"
        >
          <img
            class="character-artifact-img"
            :src="artifact.flower_url"
            :alt="artifact.name"
          />
          <h5 class="text-sm truncate">{{ artifact.name }}</h5>
        </div>
      </div>
    </div>

    <!-- Best Weapons -->
    <div v-if="character.weapons.length" class="grid-item grid-item-weapons">
      <h3>Best Weapons</h3>
      <!-- Best Weapon list -->
      <div class="flex space-x-16 text-center mt-4">
        <div
          v-for="weapon in character.weapons"
          :key="weapon.id"
          class="max-w-[100px]"
          @click="showWeaponDetails(weapon)"
        >
          <img
            :src="weapon.image_url"
            :alt="weapon.name"
            :title="weapon.name"
            class="weapon-img hover:whitespace-normal"
          />
          <h5 class="text-sm truncate">
            {{ weapon.name }}
          </h5>
        </div>
      </div>
      <!-- Weapon Details Modal -->
      <div v-if="showPopup" class="weapon-popup">
        <div class="weapon-details">
          <h2>{{ selectedWeapon.name }}</h2>
          <p
            class="rarity-text text-white"
            :data-stars="selectedWeapon.rarity"
          ></p>
          <p>{{ selectedWeapon.weapon_type.name }}</p>
          <p>Base Attack: {{ selectedWeapon.base_attack }}</p>
          <p>
            {{
              formatEffectValue(
                selectedWeapon.bonus_effect.name,
                selectedWeapon.bonus_effect_value
              )
            }}
          </p>
          <p class="divider">{{ selectedWeapon.attribute }}</p>
          <p class="attribute-description">
            {{ selectedWeapon.attribute_description }}
          </p>
          <button class="close-button" @click="showPopup = false">X</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const showPopup = ref(false);
const selectedWeapon = ref(null);

function showWeaponDetails(weapon) {
  // Show the popup
  showPopup.value = true;
  // Set the selected weapon
  selectedWeapon.value = weapon;
}

function formatEffectValue(name, value) {
  if (name === "CRIT DMG" || name === "CRIT Rate") {
    return `${name}: ${value} %`;
  }
  return `${name}: ${value}`;
}

// Define the prop
const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.main-section {
  font-family: var(--font-acme);
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

.weapon-img {
  height: 100px;
  width: 100px;
  border-radius: 25px;
  background-color: var(--primary);
}

.weapon-img:hover {
  cursor: pointer;
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}

.list-title {
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-areas:
    "rarity vision"
    "birthday constellation"
    "dish release";
  gap: 50px;
}

.grid-item {
  letter-spacing: 1px;
}

.grid-item strong {
  color: grey;
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

.weapon-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 500px;
  border-radius: 25px;
  padding: 25px;
  background-color: #0b192c;
  z-index: 99;
  animation: fadeIn 0.3s ease-in-out;
}

.weapon-details {
  color: white;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.attribute-description {
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
  letter-spacing: 1px;
  line-height: 1.5;
  font-family: Arial, Helvetica, sans-serif;
}

.character-artifact-img {
  height: 100px;
  width: 100px;
  border-radius: 25px;
  background-color: var(--primary);
}

.close-button {
  position: absolute;
  background-color: darkred;
  color: white;
  font-family: var(--font-acme);
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  top: 15px;
  right: 15px;
}
</style>
