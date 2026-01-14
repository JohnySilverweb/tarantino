<template>
  <div class="bg">
    <div class="top">
      <img src="@/assets/img/home/quote_symbol.webp" alt="quote symbol" @click="next('quote')" />
      <transition name="fade" mode="out-in">
        <p class="quote-1" :key="quotes[quote].id">{{ quotes[quote].text }}</p>
      </transition>
    </div>
    <h1>Quentin Tarantino</h1>
    <div class="bottom">
      <img src="@/assets/img/home/question.webp" alt="question symbol" @click="next('slide')" />
      <transition name="fade" mode="out-in">
        <div class="bottom-info" :key="slides[slide].head">
          <h2>{{ slides[slide].head }}</h2>
          <p>{{ slides[slide].text }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { quotes } from "@/data/quotes.js";
import { slides } from "@/data/slides_home.js";
export default {
  data() {
    return { quotes, quote: 0, slides, slide: 0 };
  },
  methods: {
    next(type) {
      this[type] = (this[type] + 1) % this[`${type}s`].length;
    },
  },
};
</script>
<style lang="scss" scoped>
.bg {
  background-image: url("@/assets/img/home/background.webp");
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100vh;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    background-image: url("@/assets/img/grain.webp");
  }
  img {
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    transition: filter 0.2s ease;
    filter: opacity(0.7);
    &:hover {
      filter: opacity(1) drop-shadow(0 0 4px rgba(255, 217, 0, 0.8)) drop-shadow(0 0 6px rgba(255, 217, 0, 0.8));
    }
  }
  .top {
    display: flex;
    gap: 2rem;
    width: 45%;
    padding: 9rem 0 0 1rem;
    .quote-1 {
      font-family: "PFD";
      font-size: 4.5rem;
      margin: 0;
      line-height: 1;
      color: rgb(243, 209, 116);
    }
  }
  h1,
  h2 {
    font-family: "Bebas Neue";
    font-size: 5.5rem;
    width: 100%;
    color: rgb(253, 172, 3);
    margin: 1rem 0 0 7.5rem;
  }

  .bottom {
    width: 45%;
    margin: 5.5rem 0 0 0;
    display: flex;
    img {
      width: 6rem;
      height: 6rem;
      margin: 0 1rem 1rem 0;
    }
    h2 {
      margin: 0;
      font-size: 6rem;
    }
    p {
      font-family: "Roboto";
      color: white;
      font-size: 1.8rem;
      margin-top: 0.5rem;
    }
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.4s;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
  quote-1 {
    font-family: "PFD";
    font-size: 4.5rem;
    margin: 0;
    line-height: 1;
    color: rgb(243, 209, 116);
  }
  &-enter-to,
  &-leave-from {
    opacity: 1;
  }
}

@media (min-width: 1279px) and (max-width: 1500px) {
  .bg {
    img {
      width: 4rem;
      height: 4rem;
    }
    .top {
      padding: 4rem 0 0 1rem;
      .quote-1 {
        font-size: 3rem;
      }
    }
    h1 {
      font-size: 4.5rem;
      margin: 1rem 0 0 7rem;
    }

    .bottom {
      img {
        width: 4rem;
        height: 4rem;
        margin: 0 1rem 1rem 1.5rem;
      }
      h2 {
        font-size: 4rem;
      }
      p {
        font-size: 1.4rem;
      }
    }
  }
}

@media (min-width: 1501px) and (max-width: 1840px) {
  .bg {
    img {
      width: 5rem;
      height: 5rem;
    }
    .top {
      padding: 4rem 0 0 1rem;
      .quote-1 {
        font-size: 3.5rem;
      }
    }
    h1 {
      font-size: 5rem;
      margin: 1rem 0 0 7.5rem;
    }

    .bottom {
      margin-top: 10rem;
      img {
        width: 5rem;
        height: 5rem;
        margin: 0 1rem 1rem 1.5rem;
      }
      h2 {
        font-size: 5.5rem;
      }
      p {
        font-size: 1.7rem;
      }
    }
  }
}
</style>
