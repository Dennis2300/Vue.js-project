<template>
  <div class="error-container">
    <h1 class="error-header">Code 500: Internal Server Error</h1>
    <p class="error-message mt-5">Check my socials for status updates:</p>
    <a href="https://x.com/SindZhou" target="_blank" class="link mt-2">Twitter / X</a>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: var(--font-bungee);
}
.error-header {
  font-size: 3em;
  text-transform: uppercase;
}

.error-message {
  font-size: 1.5em;
  letter-spacing: 1px;
}

.link {
  font-size: 1.2em;
  text-decoration: none;
  color: var(--tertiary);
  transition: color 0.3s ease-in-out;
}

.link:hover {
  text-decoration: none;
  color: darkgrey;
}
</style>
