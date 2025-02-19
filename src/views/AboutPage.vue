<template>
  <div class="about-page-container">
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
    </div>

    <!--Animation container-->
    <div class="animation-container">
      <!--Disclaimer section-->
      <section class="panel">
        <h1>Disclaimer!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          incidunt iste explicabo itaque dicta iure cumque, tenetur suscipit!
          Numquam quae eligendi voluptate rem voluptatibus ullam, in totam
          repudiandae doloremque expedita!
        </p>
      </section>

      <!--Credits section-->
      <section class="panel slide">
        <h1>Credits</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          incidunt iste explicabo itaque dicta iure cumque, tenetur suscipit!
          Numquam quae eligendi voluptate rem voluptatibus ullam, in totam
          repudiandae doloremque expedita!
        </p>
      </section>

      <!--Techstack Used section-->
      <section class="panel slide">
        <h1>Techstack Used</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
          eum quisquam vitae! Eos sapiente accusamus minima nulla aliquam,
          praesentium saepe modi eius dolore, perferendis omnis error magnam
          amet laboriosam quis?
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import "./../css/Tailwind.css";
import "./../css/AboutPage.css";

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
  let slides = gsap.utils.toArray(".slide");
  const tl = gsap.timeline();

  slides.forEach((slide) => {
    tl.from(slide, { xPercent: 100 });
  });

  ScrollTrigger.create({
    animation: tl,
    trigger: ".animation-container",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    markers: true,
  });
}

onMounted(() => {
  animateTitle();
  animateParagraph();
  animatePanels();
});
</script>
