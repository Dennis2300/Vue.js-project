<template>
  <div class="about-page-container">
    <!--Stickers-->
    <img class="sticker sticker-1" :src="images.furina" alt="" />
    <img class="sticker sticker-2" :src="images.kinich" alt="" />
    <img class="sticker sticker-3" :src="images.ajaw" alt="" />

    <!--About this project section-->
    <div class="about-page-intro">
      <!--About this project section-->
      <h1 class="title">About this project</h1>
      <p class="paragraph">
        I started <strong class="text-highlight">Teyvat Bulletin</strong> as a
        way to learn and improve my programming skills, particularly in Vue.js,
        since it's the framework
        <strong class="text-highlight">HoYoverse</strong> uses for their own web
        applications. I wanted to get hands-on experience with Vue while also
        experimenting with web effects and interactive UI elements to make the
        site visually engaging.
      </p>
      <p>
        At the same time, I’ve always enjoyed
        <strong class="text-highlight">Genshin Impact</strong>, and I wanted to
        create a space where players can easily find character materials, weapon
        recommendations, and team compositions without having to search through
        multiple sources. My goal was to make a clean, organized, and
        user-friendly resource that helps both new and experienced players
        quickly see what they need to level up their favorite characters.
      </p>
      <p>
        This project is a combination of my interest in programming, web design,
        and Genshin Impact, and it continues to evolve as I learn more about
        Vue, front-end development, and interactive web experiences.
      </p>
      <p>
        <strong class="text-highlight">Support Me on Ko-fi!</strong> If you’ve
        enjoyed using <strong>Teyvat Bulletin</strong> and found it helpful,
        consider supporting me on <strong>Ko-fi</strong>! Your support goes a
        long way in helping me cover ongoing costs like database fees, hosting,
        and other expenses that keep this site running smoothly. You can find my
        Ko-Fi
        <a href="https://ko-fi.com/" target="_blank" class="text-highlight link"
          >here</a
        >. or check out the
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-github"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
          />
        </svg>
        Repo
        <a
          href="https://github.com/Dennis2300/Vue.js-project"
          target="_blank"
          class="text-highlight link"
          >here</a
        >. <br />
        Every contribution, no matter how small, allows me to continue improving
        and maintaining this resource for the Genshin Impact community. Thank
        you for being a part of this journey—your support means the world to me!
      </p>
    </div>

    <!--Animation container-->
    <div class="animation-container">
      <!--Disclaimer section-->
      <section class="panel">
        <h1>Disclaimer!</h1>
        <p>
          This website is a
          <strong class="text-highlight">fan-made</strong> project and is not
          affiliated with, endorsed by, or sponsored by
          <strong class="text-highlight">HoYoverse</strong> or
          <strong class="text-highlight">miHoYo</strong>. It is created by and
          for fans of <strong class="text-highlight">Genshin Impact</strong> to
          provide a centralized resource for character information, materials,
          builds, and team recommendations.
        </p>
        <p>
          All characters, images, names, logos, and other in-game assets used on
          this site are the intellectual property of
          <strong class="text-highlight">HoYoverse</strong>. These materials are
          used under fair use principles for informational and educational
          purposes only. We do not claim ownership of any
          <strong class="text-highlight">Genshin Impact-related</strong>
          content, and all rights belong to
          <strong class="text-highlight">HoYoverse</strong>.
        </p>
        <p>
          The information provided on this website is based on community
          knowledge, gameplay experience, and available data. While we strive to
          ensure accuracy, we cannot guarantee that all information is
          up-to-date or error-free. For the most accurate and official
          information about
          <strong class="text-highlight">Genshin Impact</strong> , please visit
          the official website
          <a
            href="https://genshin.hoyoverse.com/en/"
            target="_blank"
            rel="noopener"
            class="text-highlight link"
          >
            here</a
          >.
        </p>
        <p>
          If you are the owner of any content used on this website and believe
          it violates your rights, or if you have any concerns, please feel free
          to contact me via email at
          <strong class="text-highlight">email@example.com</strong>. I am more
          than willing to address any concerns and will respond promptly.
        </p>
        <p>
          <strong>
            Thank you for visiting, and we hope you find this resource helpful!
          </strong>
        </p>
      </section>

      <!--Techstack Used section-->
      <section class="panel left">
        <h1>Techstack Used</h1>
        <p>
          Building Teyvat Bulletin has been an exciting journey, and I’ve
          leveraged a powerful combination of modern tools and frameworks to
          bring this project to life. From crafting dynamic user interfaces with
          <strong class="text-highlight">Vue.js</strong> to managing real-time
          data seamlessly with <strong class="text-highlight">Supabase</strong>,
          each technology has played a crucial role in shaping the site’s
          functionality and design. I’ve also used
          <strong class="text-highlight">GSAP</strong> for smooth, interactive
          animations, <strong class="text-highlight">Tailwind CSS</strong> for
          rapid and responsive styling, and ldrs for sleek, customizable loading
          animations. Together, these tools have allowed me to create a fast,
          visually appealing, and user-friendly experience for Genshin Impact
          fans.
        </p>
        <p>
          Notable mentions: <strong class="text-highlight">Uiball</strong> for
          their ldrs (Loading/Spinner) library
        </p>
        <div
          class="techstack-container bg-gradient-to-r from-[#FF0080] via-[#FF8C00] via-[#FFD700] to-[#00FFEA]"
        >
          <img
            src="./../assets//images/icons/vue.svg"
            alt="vue.js"
            class="logo"
          />
          <img
            src="./../assets//images/icons/supabase.svg"
            alt="supabase"
            class="logo"
          />
          <img
            src="./../assets//images/icons/tailwindcss.svg"
            alt="tailwindcss"
            class="logo"
          />
        </div>
      </section>

      <!--Credits section-->
      <section class="panel right">
        <h1>Credits</h1>
        <p>
          This website was made possible by utilizing valuable resources and
          information from various online sources. Below, we acknowledge the
          platforms and communities that contributed to the creation of this
          project. Special thanks to the following websites for their
          comprehensive guides, databases, and insights on Genshin Impact and
          related content.
        </p>
        <div class="credits-list-container">
          <a href="https://wiki.hoyolab.com/pc/genshin/home" target="_blank"
            >Genshin HoyoLAB Wiki (Official)</a
          >
          |
          <a
            href="https://genshin-impact.fandom.com/wiki/HoYoLAB"
            target="_blank"
            >Genshin Impact Wiki</a
          >
          |
          <a href="https://game8.co/games/Genshin-Impact" target="_blank"
            >Game8 - Build & Guides</a
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import "./../css/Tailwind.css";
import "./../css/AboutPage.css";
import images from "./../assets/images.json";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

function animateTitle() {
  gsap.fromTo(
    ".title",
    {
      opacity: 0,
      y: -100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
    }
  );
}

function animateParagraph() {
  gsap.fromTo(
    ".about-page-intro p",
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
    }
  );
}

function animatePanels() {
  const tl = gsap.timeline();

  tl.from(".left", { xPercent: 100 }).from(".right", { xPercent: -100 });

  ScrollTrigger.create({
    animation: tl,
    trigger: ".animation-container",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  });
}

onMounted(() => {
  animateTitle();
  animateParagraph();
  animatePanels();
});
</script>
