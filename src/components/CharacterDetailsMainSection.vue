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
    <div class="grid-item grid-item-artifact">
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
    <!--TODO: When hover/click show weapon stats-->
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
          <h3>{{ selectedWeapon.name }}</h3>
          <p
            class="rarity-text text-white"
            :data-stars="selectedWeapon.rarity"
          ></p>
          <p>Base Attack: {{ selectedWeapon.base_attack }}</p>
        </div>
        <button class="close-button" @click="showPopup = false">Close</button>
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
  selectedWeapon.value = weapon;

  // format the weapon object to show details
  const weaponDetails = JSON.parse(JSON.stringify(weapon));

  // console.log("Name: ", weaponDetails.name);
  // console.log("Type:", weaponDetails.weapon_type.name);
  // console.log("Base Attack:", weaponDetails.base_attack);
  // console.log("Bonus Effect Type:", weaponDetails.bonus_effect.name);
  // console.log("Bonus Effect Value:", weaponDetails.bonus_effect_value);
  // console.log("Attribute Name:", weaponDetails.attribute);
  // console.log("Attribute Value:", weaponDetails.attribute_description);
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
    "dish release"
    "affiliation va";
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

.grid-item-affiliation {
  grid-area: affiliation;
}

.grid-item-voice-actors {
  grid-area: va;
}

.weapon-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 500px;
  border-radius: 25px;
  padding: 25px;
  background-color: #0B192C;
  z-index: 99;
}

.weapon-details {
  color: white;
}

.close-button {
  position: absolute;
  background-color: var(--quaternary);
  color: black;
  font-family: var(--font-acme);
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  bottom: 25px;
  right: 25px;
}
</style>
