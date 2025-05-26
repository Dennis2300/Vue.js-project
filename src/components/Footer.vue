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
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.web-footer-link a:hover {
  color: #ff4500;
  text-decoration: underline;
}
</style>
