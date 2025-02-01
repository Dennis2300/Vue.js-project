<template>
  <div class="navbar-container">
    <div class="site-title">
      <router-link to="/">Teyvat Bulletin</router-link>
    </div>
    <nav class="navbar">
        <router-link to="/" class="navbar-text">Home</router-link> |
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
