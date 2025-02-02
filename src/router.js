import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import CharactersPage from "./views/CharactersPage.vue";
import TeamsPage from "./views/TeamsPage.vue";
import AboutPage from "./views/AboutPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/characters", component: CharactersPage },
  { path: "/teams", component: TeamsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
