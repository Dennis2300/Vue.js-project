<template>
  <div class="about-page-container">
    <section ref="purposeSection" class="section">
      <h1>About this project</h1>
      <p>This project is fan made</p>
    </section>

    <section ref="disclaimerSection" class="section">
      <h2>Disclaimer!</h2>
      <p>
        This is a personal project, and all content here is for educational
        purposes. Some features may change as development progresses.
      </p>
    </section>

    <section ref="techStackSection" class="section">
      <h2>Techstacks used in this project</h2>
      <ul>
        <li v-for="(tech, index) in techStack" :key="index" ref="techItems">
          {{ tech }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const purposeSection = ref(null);
const disclaimerSection = ref(null);
const techStackSection = ref(null);
const techItems = ref(null);

// Techstack used as array
const techStack = ref([
  "Vue.JS",
  "Vite",
  "UI-Ball - LDRS",
  "TailwindCSS",
  "GSAP",
]);
</script>
