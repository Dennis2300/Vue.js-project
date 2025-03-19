<template>
      <section class="main-section grid">
          <div class="grid-item-name">
            {{ character.vision.name }}
          </div>
          <div class="grid-item-birthday">
            {{ character.birthday }}
          </div>
          <div class="grid-item-constellation">
            {{ character.constellation }}
          </div>
          <div>
            {{ character.favourite_dish }}
          </div>
          <div>
            {{ character.release_date }}
          </div>
          <div class="grid-item-affiliation">
            <ul class="styled-list">
              <li
                v-for="(affiliation, index) in character.affiliation"
                :key="index"
              >
                {{ affiliation }}
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <div v-for="(actor, language) in character.va" :key="language">
                {{ language }} Voice Actor: <strong>{{ actor }}</strong>
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
</script>