<template>
  <nav>
    <ul>
      <li class="link">
        <router-link to="/">
          <span class="link--top">Home</span>
          <span class="link--bottom">Home</span>
        </router-link>
      </li>
      <li class="link">
        <router-link to="/about">
          <span class="link--top">About</span>
          <span class="link--bottom">About</span>
        </router-link>
      </li>
      <li class="link">
        <router-link to="/movielist">
          <span class="link--top">Movielist</span>
          <span class="link--bottom">Movielist</span>
        </router-link>
      </li>
      <li class="link">
        <router-link to="/contacts">
          <span class="link--top">Contacts</span>
          <span class="link--bottom">Contacts</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss" scoped>
nav {
  position: relative;
  z-index: 100;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

ul {
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0;
  gap: 2.5rem;
  padding: 1.5rem 20rem;
  .link {
    position: relative;
    display: inline-block;
    line-height: 1em;
  }

  .link--top {
    font-family: "Montserrat Bold";
    position: absolute;
    color: black;
    top: 0;
    display: inline-block;
    clip-path: polygon(0% 66%, 0% 0%, 100% 0%, 100% 40%);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, color 0.5s ease 0.22s;
    &::after {
      content: "";
      position: absolute;
      top: 36%;
      left: 0;
      width: 100%;
      height: 4%;
      background: red;
      transform: rotateZ(-2.2deg) scaleX(0%);
      transform-origin: right top;
      transition: transform 0.2s ease 0.22s;
    }
  }

  .link--bottom {
    font-family: "Montserrat Bold";
    display: inline-block;
    clip-path: polygon(0% 65%, 100% 40%, 100% 110%, 0% 110%);
    color: black;
    transition: color 0.5s ease 0.22s, background-position 0.2s ease 0.22s;
    text-decoration: none;
    background-size: 200% 10%;
    background-position: left bottom;
    background-repeat: no-repeat;
    background-image: linear-gradient(to right, red 50%, transparent 50%);
    &::after {
      content: "";
      position: absolute;
      top: 40%;
      left: 0;
      width: 100%;
      height: 4%;
      background: red;
      transform: rotateZ(-2deg) scaleX(0%);
      transform-origin: right top;
      transition: transform 0.2s ease 0.22s;
    }
  }

  .link:hover .link--top {
    color: red;
    transform: translateY(-0.5em) rotateZ(-3deg);
    transition: transform 0.5s cubic-bezier(0.12, 0.8, 0.57, 1) 0.42s, color 0.5s ease 0.22s;
    &::after {
      top: 62%;
      transform-origin: left top;
      transform: rotateZ(-2.2deg) scaleX(100%);
    }
  }

  .link:hover .link--bottom {
    color: red;
    background-position: 100% bottom;
    transition: color 0.5s ease 0.2s, background-position 0.2s ease;
    &::after {
      top: 65%;
      transform-origin: left top;
      transform: rotateZ(-2.1deg) scaleX(100%);
    }
  }
}
</style>
