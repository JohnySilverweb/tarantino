<template>
  <div class="typewriter">
    <h1>Thank you for visiting this page.</h1>
  </div>
  <div class="contacts">
    <ul>
      <li>
        <a href="https://t.me/notmaksym"><i class="fab fa-telegram"></i></a>
      </li>
      <li>
        <a href="https://www.instagram.com/max_ermakov444/"><i class="fab fa-instagram"></i></a>
      </li>
      <li>
        <a href="https://github.com/JohnySilverweb"><i class="fab fa-github"></i></a>
      </li>
      <li>
        <a href="mailto:maxermakov444@gmail.com"><i class="fas fa-envelope"></i></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.add("dark");
  },
  unmounted() {
    document.body.classList.remove("dark");
  },
};
</script>

<style scoped>
.typewriter {
  display: flex;
  justify-content: center;
  align-items: start;
  height: 80vh;
  h1 {
    color: white;
    align-self: center;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    border-right: 10px solid red;
    animation: typing 3s steps(32, end) both, blink-caret 0.5s step-end infinite;
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 28%;
  }
}
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: red;
  }
}

.contacts ul {
  gap: 5rem;
  display: flex;
  align-items: end;
  justify-content: center;
  li {
    list-style: none;
    a {
      color: #666;
      background: #333;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      width: 60px;
      height: 60px;
      font-size: 30px;
      border-radius: 50%;
      &::before {
        content: "";
        background: white;
        border-radius: 50%;
        transition: 0.2s;
        transform: scale(0.9);
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    a:hover {
      color: white;
      box-shadow: 0 0 5px white;
      text-shadow: 0 0 5px white;
      &::before {
        content: "";
        transform: scale(1.1);
        box-shadow: 0 0 25px white;
      }
    }
  }
}

@media (max-width: 1600px) {
  .typewriter {
    height: 60vh;
    h1 {
      font-size: 1.5rem;
    }
  }
  /* @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 90vw;
    }
  } */
}
</style>
