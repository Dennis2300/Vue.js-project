<template>
  <div class="about-page-container">
    <!--About this project section-->
    <section ref="purposeSection" class="section">
      <h1>About this project</h1>
      <p>
        I started Teyvat Bulletin as a way to learn and improve my programming
        skills, particularly in Vue.js, since it's the framework HoYoverse uses
        for their own web applications. I wanted to get hands-on experience with
        Vue while also experimenting with web effects and interactive UI
        elements to make the site visually engaging.
      </p>
      <p>
        At the same time, I’ve always enjoyed Genshin Impact, and I wanted to
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
    </section>

    <!--Disclaimer section-->
    <section ref="disclaimerSection" class="section">
      <h1>Disclaimer!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        incidunt iste explicabo itaque dicta iure cumque, tenetur suscipit!
        Numquam quae eligendi voluptate rem voluptatibus ullam, in totam
        repudiandae doloremque expedita!
      </p>
    </section>

    <!--Credits section-->
    <section ref="creditsSection" class="section">
      <h1>Credits</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        incidunt iste explicabo itaque dicta iure cumque, tenetur suscipit!
        Numquam quae eligendi voluptate rem voluptatibus ullam, in totam
        repudiandae doloremque expedita!
      </p>
    </section>

    <!--Techstack Used section-->
    <section ref="techstackSection" class="section">
      <h1>Techstack Used</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis eum
        quisquam vitae! Eos sapiente accusamus minima nulla aliquam, praesentium
        saepe modi eius dolore, perferendis omnis error magnam amet laboriosam
        quis?
      </p>
    </section>
  </div>
</template>

<script setup>
import "./../css/Tailwind.css";
import "./../css/AboutPage.css";
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function scrollSection() {
  const sections = gsap.utils.toArray(".section");

  sections.forEach((section, index) => {
    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          end: "top 75%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      }
    );

    if (index > 0) {
      gsap.fromTo(
        sections[index - 1],
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    ScrollTrigger.create({
      trigger: section,
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: "+=50%",
      scrub: 1,
    });
  });

  ScrollTrigger.refresh();
}



onMounted(() => {
  scrollSection();
});
</script>
