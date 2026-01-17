<template>
  <div class="poster" v-if="movie" :style="getImage(movie)">
    <div class="overlay">
      <div class="info">
        <img :src="movie.logo" />
        <p>{{ movie.description }}</p>
        <button class="btn-1" @click="showPlayer(movie.id)">&#9654; Watch</button>
        <button class="btn-2" @click="$router.push('/movielist')">Go back</button>
      </div>
    </div>
    <div class="player">
      <video v-show="activeMovie === movie.id" :id="`player-${movie.id}`" ref="players" playsinline>
        <source :src="movie.video" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, computed } from "vue";
import { movies } from "@/data/movies";
import { useRoute } from "vue-router";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const route = useRoute();
const activeMovie = ref(null);
const video = ref(null);
const movie = computed(() => {
  return movies.find((movie) => movie.id === Number(route.params.id));
});

function getImage(movie) {
  return {
    backgroundImage: `url(${movie.image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
}

function showPlayer(id) {
  activeMovie.value = id;
  nextTick(() => {
    video.value = document.getElementById(`player-${id}`);
    const player = new Plyr(video.value, {
      controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "fullscreen"],
      ratio: "16:9",
      fullscreen: { enabled: true },
    });
    player.fullscreen.enter();
    player.on("exitfullscreen", () => {
      player.pause();
      player.destroy();
      activeMovie.value = null;
    });
  });
}
</script>

<style lang="scss" scoped>
.poster {
  font-family: "Helvetica";
  width: 100vw;
  height: 100vh;
  .overlay {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.99) 25%, rgba(0, 0, 0, 0) 100%);
    .info {
      width: 33%;
      margin-left: 5rem;
      img {
        width: 33rem;
        height: 10rem;
      }
      p {
        color: white;
        font-size: 1.7rem;
        margin: 1rem 0;
      }
      .btn-1,
      .btn-2 {
        background-color: white;
        color: black;
        font-size: 1.5rem;
        font-weight: bold;
        padding: 20px 40px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        &:hover {
          background-color: #e6e6e6;
        }
      }
      .btn-2 {
        background-color: rgba(109, 109, 110, 0.7);
        color: white;
        margin-left: 1rem;
        padding: 20px 50px;
        &:hover {
          background-color: rgba(109, 109, 110);
        }
      }
    }
  }

  .player {
    width: auto;
    height: auto;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    video,
    .plyr {
      width: 100% !important;
      max-height: 100vh;
      object-fit: contain !important;
      background: black;
    }
  }
}

@media (max-width: 1600px) {
  .poster .overlay .info {
    img {
      width: 23rem;
      height: 7rem;
    }

    p {
      font-size: 1.3rem;
    }

    .btn-1,
    .btn-2 {
      font-size: 1.1rem;
      padding: 15px 30px;
    }
  }
}
</style>
