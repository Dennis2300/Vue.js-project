<template>
  <div class="home-page-container">
    <div class="home-page-header">
      <h1>Welcome to Teyvat Bulletin</h1>
    </div>
    <div class="board-container">
      <div class="board">
        <div class="note">
          <img
            :src="images.arlecchino"
            alt=""
          />
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
          <img
            :src="images.kinich"
            alt=""
          />
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="home-page-footer-container">
      <footer class="home-page-footer">
        <h3>Disclaimer!</h3>
        <p>
          This website is a fan-made project and is not affiliated with,
          endorsed by, or sponsored by HoYoverse or miHoYo. <br />
          Character, images, names, and assets used on this site are the
          property of HoYoverse.
        </p>
        <div class="home-page-footer-link">
          Find more info <a href="/about">here</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import "./../css/HomePage.css";
import "./../css/BulletinBoard.css";
import images from "./../assets/images.json"
</script>
