<template>
  <!-- Hero Section -->
  <div class="home-page-container">
    <h1 class="divider website-title">Teyvat Bulletin</h1>
    <div class="board-container">
      <div class="board board-background">
        <div class="note">
          <img :src="images.arlecchino" alt="" />
        </div>
        <div class="note">
          <strong>Hey there, Traveler!</strong>
          <p>
            Teyvat Bulletin is a simple, fan-made space where you can find
            character builds, materials, and team compositions for Genshin
            Impact.
          </p>
        </div>

        <div class="note">
          <strong>What to expect?</strong>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
            neque est possimus. Sapiente hic consequatur tenetur aperiam
            tempora, fuga voluptatum molestiae perspiciatis possimus nobis nam
            impedit tempore quos optio aut.
          </p>
        </div>
        <div class="note">
          <strong>Not pro level!</strong>
          <p>
            This isn't a pro-level guide, just a fun project where I explore
            different playstyles and showcase builds that have worked for me.
          </p>
        </div>
        <div class="note">
          <img :src="images.kinich" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "./../css/BulletinBoard.css";
import images from "./../assets/images.json";
</script>

<style scoped>
.home-page-container {
  margin-top: 20px;
  width: 1500px;
}

.website-title {
  font-size: 3em;
  color: white;
  text-align: center;
  font-family: var(--font-bungee);
}
</style>
