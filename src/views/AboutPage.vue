<template>
  <div
    class="slide"
    v-for="(slide, i) in slides"
    :key="slide.id"
    :class="{ 'first-slide': i === 0, 'last-slide': i === slides.length - 1 }"
  >
    <div class="image" :style="getImage(slide)"></div>
    <video src="/video/effect.mp4" autoplay loop muted playsinline=""></video>
    <p>{{ slide.description }}</p>
  </div>
  <img src="@/assets/img/about/overlay.webp" alt="" class="overlay" />
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { slides } from "@/data/slides_about.js";

function getImage(slide) {
  return {
    backgroundImage: `url(${slide.image})`,
  };
}

onMounted(() => {
  document.body.classList.add("dark");
});

onUnmounted(() => {
  document.body.classList.remove("dark");
});
</script>

<style scoped>
.slide {
  position: sticky;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2rem solid black;
  border-bottom: 2rem solid black;
  overflow: hidden;
  .image,
  video {
    inset: 0;
    position: absolute;
  }

  .image {
    z-index: 1;
    background-size: cover;
    background-position: center;
  }

  video {
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0.5;
    object-fit: cover;
    pointer-events: none;
  }

  p {
    position: absolute;
    z-index: 3;
    color: white;
    font-size: 2rem;
    text-align: center;
    padding: 0 12rem;
    font-family: "PFD";
  }
}
.first-slide {
  border-top: none;
}
.last-slide {
  border-bottom: none;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}
</style>
