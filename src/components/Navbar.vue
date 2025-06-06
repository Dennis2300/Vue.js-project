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

<style scoped>
.navbar-container {
  position: fixed;
  background-color: #0b192c;
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.75);
}

.favicon {
  width: 50px;
  height: auto;
  background-color: inherit;
}

.web-navbar {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.web-navbar a {
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-family: var(--font-acme);
  background-color: inherit;
  padding-left: 15px;
  padding-right: 15px;
}

.web-navbar a:hover {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  background-color: grey;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

.version {
  font-size: 20px;
  font-family: var(--font-acme);
  color: white;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
}

.right-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-left: auto;
  margin-right: 20px;
  font-family: var(--font-acme);
}
</style>
