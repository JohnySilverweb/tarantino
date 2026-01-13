<template>
  <div class="content">
    <img src="@/assets/img/movielist/logo.webp" alt="Logo" />
    <div class="cards">
      <div class="card" v-for="card in cards" :key="card.id" @click="goToMovie(card.id)">
        <div class="card-bg" :style="getImage(card)">
          <div class="info">
            <h2>{{ card.title }}</h2>
            <h3>{{ card.year }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cards } from "@/data/moviecards";
import { useRouter } from "vue-router";

const router = useRouter();

function goToMovie(id) {
  router.push(`/watch/${id}`);
}

function getImage(card) {
  return {
    backgroundImage: `url(${card.image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100vw;
  // height: 195vh;
  // background-size: cover;
  background: linear-gradient(to bottom, #3e0f0f 30%, #8b1c1c 50%, #3e0f0f 100%);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("@/assets/img/movielist/overlay.webp");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.03;
    pointer-events: none;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("@/assets/img/grain.webp");
    opacity: 0.07;
    pointer-events: none;
    z-index: 1;
  }
}

img {
  display: block;
  margin: 0 auto 2rem auto;
  width: 50rem;
  height: 20rem;
  position: relative;
  opacity: 0.8;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.8));
  z-index: 999;
}

.cards {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 20rem;
}

.card {
  margin-bottom: 2rem;
  position: relative;
  width: 18rem;
  height: 28rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  .card-bg {
    position: absolute;
    inset: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    // Optimization
    will-change: transform;
    &:hover {
      transform: scale(1.15);
    }
  }

  .info {
    border-end-start-radius: 10px;
    border-end-end-radius: 10px;
    padding: 8px;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(3px);
    font-size: 13px;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0);
    opacity: 1;
    * {
      margin: 0;
      color: white;
    }
    h3 {
      opacity: 0.7;
    }
  }
}

.card:hover .info,
.card-bg:hover .info {
  transform: translateY(100%);
  opacity: 0;
  pointer-events: none;
}
</style>
