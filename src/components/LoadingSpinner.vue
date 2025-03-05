<template>
  <div class="loading-spinner-container">
    <l-trefoil
      class="loading-spinner"
      :size="size"
      :stroke="stroke"
      :stroke-length="strokeLength"
      :bg-opacity="bgOpacity"
      :speed="speed"
      :color="color"
    ></l-trefoil>
  </div>
</template>

<script setup>
import { trefoil } from "ldrs"; // Import the trefoil component
trefoil.register(); // Register the component

// Define props for customization
defineProps({
  size: {
    type: Number,
    default: 40,
  },
  stroke: {
    type: Number,
    default: 4,
  },
  strokeLength: {
    type: Number,
    default: 0.15,
  },
  bgOpacity: {
    type: Number,
    default: 0.1,
  },
  speed: {
    type: Number,
    default: 1.4,
  },
  color: {
    type: String,
    default: "white",
  },
});
</script>

<style scoped>
.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.loading-spinner {
  transform: scale(3);
}
</style>
