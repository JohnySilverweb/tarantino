<template>
  <div class="poster" v-if="movie" :style="getImage(movie)">
    <div class="overlay">
      <div class="info">
        <img :src="movie.logo" />
        <p>{{ movie.description }}</p>
        <button class="btn-1">&#9654; Watch</button>
        <button class="btn-2" @click="$router.push('/movielist')">Go back</button>
      </div>
    </div>
    <div class="player-wrapper">
      <div class="player">
        <video class="screen" :src="movie.video"></video>
        <button class="close">X</button>
        <button id="start">
          <img src="@/assets/img/movie/player/play.svg" alt="play" />
        </button>
        <div class="controls">
          <div class="range-and-time">
            <input type="range" class="progress" id="progress" min="0" max="100" step="0.1" value="0" />
            <span id="timestamp" type="timestamp">00:00</span>
          </div>
          <div class="player-buttons">
            <div class="controls-left">
              <button class="btn" id="play"><img src="@/assets/img/movie/player/play.svg" alt="play button" /></button>
              <button class="btn" id="stop"><img src="@/assets/img/movie/player/pause.svg" alt="pause button" /></button>
              <div class="volume-wrapper">
                <img src="@/assets/img/movie/player/volume-high.svg" alt="volume icon" class="v-high" />
                <img src="@/assets/img/movie/player/volume-low.svg" alt="volume icon 50%" class="v-low" />
                <img src="@/assets/img/movie/player/mute.svg" alt="volume icon 0%" class="v-mute" />
                <input type="range" class="volume" id="volume" min="0" max="1" step="0.01" value="1" />
              </div>
            </div>
            <button class="btn" id="fullscreen"><img src="@/assets/img/movie/player/fullscreen.svg" alt="fullscreen button" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { movies } from "@/data/movies";
import { useRoute } from "vue-router";

const route = useRoute();
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

/* PLAYER  */

import { onMounted } from "vue";

onMounted(() => {
  const video = document.querySelector(".screen");
  const play = document.querySelector("#play");
  const progress = document.querySelector("#progress");
  const timestamp = document.querySelector("#timestamp");
  const volume = document.querySelector("#volume");
  const fullscreen = document.querySelector("#fullscreen");
  const player = document.querySelector(".player");
  const volumeIcon = document.querySelector(".volume-wrapper img");
  const start = document.querySelector("#start img");
  const stop = document.querySelector("#stop");
  const vHigh = document.querySelector(".volume-wrapper .v-high");
  const vLow = document.querySelector(".volume-wrapper .v-low");
  const vMute = document.querySelector(".volume-wrapper .v-mute");
  const btnOpnPlr = document.querySelector(".btn-1");
  const btnClsPlr = document.querySelector(".close");

  btnOpnPlr.addEventListener("click", () => {
    player.requestFullscreen();
    player.style.display = "flex";
  });

  function toggleVideoStatus() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function upgradeProgress() {
    const percent = (video.currentTime / video.duration) * 100;

    progress.value = percent;

    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
      minutes = "0" + String(minutes);
    }
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
      seconds = "0" + String(seconds);
    }
    timestamp.innerHTML = `${minutes}:${seconds}`;
    progress.style.setProperty("--progress", `${percent}%`);
  }

  function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
  }

  function setVolume() {
    video.volume = volume.valueAsNumber;

    const percent = volume.valueAsNumber * 100;

    volume.style.setProperty("--progress", `${percent}%`);

    if (volume.valueAsNumber == 0) {
      vMute.style.display = "block";
      vHigh.style.display = "none";
      vLow.style.display = "none";
    } else if (volume.valueAsNumber < 0.5) {
      vLow.style.display = "block";
      vHigh.style.display = "none";
      vMute.style.display = "none";
    } else {
      vHigh.style.display = "block";
      vMute.style.display = "none";
      vLow.style.display = "none";
    }
  }

  function setFullscreen() {
    if (!document.fullscreenElement) {
      player.requestFullscreen();
      player.classList.add("fullscreen");
    } else {
      document.exitFullscreen();
      player.classList.remove("fullscreen");
    }
  }

  video.addEventListener("click", toggleVideoStatus);
  video.addEventListener("loadedmetadata", upgradeProgress);
  video.addEventListener("timeupdate", upgradeProgress);
  play.addEventListener("click", toggleVideoStatus);
  stop.addEventListener("click", toggleVideoStatus);
  start.addEventListener("click", toggleVideoStatus);
  progress.addEventListener("input", setVideoProgress);
  volume.addEventListener("input", setVolume);
  fullscreen.addEventListener("click", setFullscreen);
  btnClsPlr.addEventListener("click", () => {
    player.style.display = "none";
  });
  video.addEventListener("dblclick", setFullscreen);
  video.addEventListener("play", () => {
    start.style.display = "none";
    stop.style.display = "block";
    play.style.display = "none";
  });

  video.addEventListener("pause", () => {
    start.style.display = "block";
    stop.style.display = "none";
    play.style.display = "block";
  });

  setVolume();

  let previousVolume = 1;
  volumeIcon.addEventListener("click", () => {
    if (video.volume > 0) {
      previousVolume = video.volume;
      video.volume = 0;
      volume.value = 0;
    } else {
      video.volume = previousVolume;
      volume.value = previousVolume;
    }
  });

  if (player.style.width < "1000px") {
    btnClsPlr.style.display = "block";
  }
});
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
  /* PLAYER */
  .player-wrapper {
    position: absolute;
    top: 80px;
    left: 62%;
    .player {
      display: flex;
      justify-content: center;
      position: relative;
      height: 400px;
      .close {
        display: none;
        display: block;
        position: absolute;
        left: 94%;
        border: none;
        border-radius: 5px;
        font-size: 20px;
        padding: 3px 10px;
        background: #ffffff85;
        margin: 10px 0px 0px -8px;
        transition: 0.1s ease;
        &:hover {
          background: white;
        }
      }
      #start {
        background: none;
        border: none;
        /* position: relative; */
        img {
          width: 150px;
          height: 150px;
          position: absolute;
          top: 45%;
          left: 45%;
          transition: 0.3s ease;
          cursor: pointer;
          &:hover {
            transform: scale(1.05);
          }
        }
      }
      .controls {
        position: absolute;
        width: 97%;
        bottom: 0;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        gap: 10px;
        .range-and-time {
          justify-content: space-between;
          display: flex;
          align-items: center;
          gap: 2rem;
          &:hover #progress::-webkit-slider-thumb,
          &:hover #progress::-moz-range-thumb {
            width: 25px;
            height: 25px;
          }
          &:hover #progress::-webkit-slider-runnable-track,
          &:hover #progress::-moz-range-track {
            height: 5px;
          }

          #progress {
            flex: 1;
            background: none;
            cursor: pointer;
          }
          #progress::-webkit-slider-runnable-track,
          #progress::-moz-range-track {
            height: 3px;
            border-radius: 0;
            background: linear-gradient(to right, #c4141c 0%, #c4141c var(--progress), #555 var(--progress), #555 100%);
            transition: 0.1s ease;
          }
          #progress::-webkit-slider-thumb,
          #progress::-moz-range-thumb {
            background-color: #c4141c;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            border: none;
            margin-top: -7px;
            transition: 0.1s ease;
          }
          #timestamp {
            color: white;
          }
        }
        .player-buttons {
          display: flex;
          justify-content: space-between;
          .btn {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            transition: 0.2s ease;
            &:hover {
              transform: scale(1.1);
            }
          }
          .controls-left {
            display: flex;
            align-items: center;
            gap: 25px;
            #stop {
              display: none;
            }
            .volume-wrapper {
              display: flex;
              justify-content: left;
              align-items: center;
              gap: 10px;
              cursor: pointer;
              .v-low,
              .v-mute {
                display: none;
              }
              &:hover {
                #volume {
                  width: 100px;
                }
                #volume::-webkit-slider-thumb,
                #volume::-moz-range-thumb {
                  width: 15px;
                }
              }
              #volume {
                background: transparent;
                width: 0;
                transition: 0.1s ease-in;
                cursor: pointer;
              }
              #volume::-webkit-slider-runnable-track,
              #volume::-moz-range-track {
                height: 2px;
                background: linear-gradient(to right, white 0%, white var(--progress), #555 var(--progress), #555 100%);
                border-radius: 0;
              }
              #volume::-webkit-slider-thumb,
              #volume::-moz-range-thumb {
                border-radius: 50%;
                border: none;
                width: 0;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .player.fullscreen .close {
      display: none !important;
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
