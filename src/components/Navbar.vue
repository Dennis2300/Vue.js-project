<template>
  <div class="navbar-container">
    <nav class="web-navbar">
      <img src="../../public/webIcon.webp" alt="Logo" class="favicon" />
      <router-link to="/">Home</router-link>
      <router-link to="/characters">Character</router-link>
      <router-link to="/weapons">Weapons</router-link>
      <router-link to="/artifacts">Artifacts</router-link>
      <router-link to="/teams">Team</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <div class="right-navbar">
        <p>Support Me!</p>
    </div>
  </div>
</template>

<script setup>
import "./../css/Navbar.css";
</script>
