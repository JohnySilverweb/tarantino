import { createRouter, createWebHistory } from "vue-router";
import "@/assets/styles/global.css";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import MovieList from "@/views/MovieList.vue";
import WatchPage from "@/views/WatchPage.vue";
import ContactsPage from "@/views/ContactsPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/movielist", component: MovieList },
  { path: "/contacts", component: ContactsPage },
  { path: "/watch/:id", component: WatchPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
