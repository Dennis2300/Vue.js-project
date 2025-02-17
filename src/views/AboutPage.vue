<template>
  <div class="about-page-container">
    <!--About this project section-->
    <section ref="purposeSection" class="section">
      <h1>About this project</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, culpa
        reiciendis tempore corporis exercitationem delectus est voluptas eveniet
        quod? Ratione soluta ex aliquam aspernatur sint fugit explicabo
        voluptatibus quis facilis.
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
import { onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function scrollEffect() {
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
  scrollEffect();
});
</script>
