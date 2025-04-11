<template>
  <div class="footer-container">
    <footer class="footer">
      <h3>Disclaimer!</h3>
      <p class="footer-text">
        This website is a fan-made project and is not affiliated with, endorsed
        by, or sponsored by HoYoverse or miHoYo. <br />
        Character, images, names, and assets used on this site are the property
        of HoYoverse.
      </p>
      <div class="footer-link">Find more info <a href="/about">here</a></div>
    </footer>
  </div>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  text-align: center;
  width: 75vw;
  font-size: 1.2em;
  line-height: 1.4;
  margin: 20px 0px 50px 0px;
}

.footer-text {
  margin-top: 15px;
}

.footer-link {
  text-decoration: none;
  color: white;
}

.footer-link a {
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.footer-link a:hover {
  color: #ff4500;
  text-decoration: underline;
}
</style>
