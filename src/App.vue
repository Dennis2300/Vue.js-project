<template>
  <!-- Navbar Component -->
  <Navbar />

  <!-- Main Content Section -->
  <div class="content">
    <router-view />
  </div>
</template>


<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style scoped>
.content {
  margin-top: 60px;
}
</style>