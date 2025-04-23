<template>
  <!-- Hero Section -->
  <div class="home-page-container">
    <div class="board-container">
      <div class="board board-background">
        <div class="note">
          <img :src="images.arlecchino" alt="" />
        </div>
        <div class="note">
          <strong>Hey there, Traveler!</strong>
          <p>
            Teyvat Bulletin is a simple, fan-made space where I share character
            builds, team compositions, and tips for Genshin Impact. <br />This
            isn't a pro-level guide, just a fun project where I explore
            different playstyles and showcase builds that have worked for me.
          </p>
        </div>

        <div class="note">
          <strong>What to expect?</strong>
          <p>
            Here you will find character build, character materials guide, and
            team compositions
          </p>
        </div>
        <div class="note">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus qui
            minus consectetur necessitatibus molestias odit nostrum facilis at
            cupiditate vel, repellat distinctio similique maiores voluptatibus,
            eos esse pariatur commodi. Iusto!
          </p>
        </div>
        <div class="note">
          <img :src="images.kinich" alt="" />
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="footer-container">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import "./../css/HomePage.css";
import "./../css/BulletinBoard.css";
import images from "./../assets/images.json";
import Footer from "./../components/Footer.vue";
</script>
