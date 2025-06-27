<template>
  <div class="divider text-2xl">
    <h3 class="footer-header">Disclaimer!</h3>
  </div>
  <div class="web-footer-container">
    <footer class="web-footer">
      <p class="web-footer-text">
        This website is a fan-made project and is not affiliated with, endorsed
        by, or sponsored by HoYoverse or miHoYo. <br />
        Character, images, names, and assets used on this site are the property
        of HoYoverse.
      </p>
      <div class="web-footer-link">
        Find more info <a href="/about">here</a>
      </div>
      <div class="tech-stack">
        <p>
          Built with <span class="vue"><a href="https://vuejs.org/" target="_blank">Vue.js</a></span> and
          <span class="supabase"><a href="https://supabase.com/" target="_blank">Supabase</a></span>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.web-footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-header {
  font-family: var(--font-bungee);
  letter-spacing: 1px;
}

.web-footer {
  width: 75vw;
  font-size: 1.2em;
  line-height: 1.4;
  margin: 20px 0px 20px 0px;
}

.web-footer-text {
  font-family: var(--font-archivo);
  font-size: 16px;
  text-align: center;
  letter-spacing: 1px;
}

.web-footer-link {
  text-decoration: none;
  color: white;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 25px;
  font-family: var(--font-archivo);
  font-size: 16px;
}

.web-footer-link a {
  color: #ffd700;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.web-footer-link a:hover {
  color: #ff4500;
  text-decoration: underline;
}

.tech-stack {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px 0;
}

.tech-stack p {
  color: #666;
  font-size: 14px;
}

.tech-stack .vue {
  color: #42b883;
  font-weight: bold;
}

.vue a, .supabase a {
  color: #42b883;
  text-decoration: none;
}

.vue a:hover, .supabase a:hover {
  text-decoration: underline;
}

.tech-stack .supabase {
  color: #3ecf8e;
  font-weight: bold;
}
</style>
