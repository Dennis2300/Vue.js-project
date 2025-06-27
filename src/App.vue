<template>
  <!-- Navbar Component -->
  <Navbar />

  <!-- Main Content Section -->
  <div class="content">
    <router-view />
  </div>

  <!-- Footer Component -->
  <Footer />
</template>


<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

</script>

<style scoped>
.content {
  margin-top: 60px;
}
</style>