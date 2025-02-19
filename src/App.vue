<template>
  <div class="navbar-container fixed m-0 p-2">
    <div class="site-title pl-5">
      <router-link to="/">Teyvat Bulletin</router-link>
    </div>
    <nav class="navbar">
      <router-link to="/" class="navbar-text">Home</router-link> |
      <router-link to="/characters" class="navbar-text">Characters</router-link>
      | <router-link to="/teams" class="navbar-text">Teams</router-link> |
      <router-link to="/about" class="navbar-text">About</router-link>
    </nav>
  </div>

  <div class="content">
    <router-view />
  </div>
</template>

<script setup>
import "./css/Navbar.css";
</script>
