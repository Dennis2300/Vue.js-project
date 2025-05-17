import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import CharactersPage from "./views/CharactersPage.vue";
import TeamsPage from "./views/TeamsPage.vue";
import AboutPage from "./views/AboutPage.vue";
import CharacterDetailPage from "./views/CharacterDetailPage.vue";
import WeaponsPage from "./views/WeaponsPage.vue";
import ArtifactsPage from "./views/ArtifactsPage.vue";
import WeaponDetailPage from "./views/WeaponDetailPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/characters", component: CharactersPage },
  { path: "/teams", component: TeamsPage },
  { path: "/weapons", component: WeaponsPage },
  { path: "/artifacts", component: ArtifactsPage },
  {
    path: "/characters/:id",
    name: "CharacterDetailPage",
    component: CharacterDetailPage,
  },
  {
    path: "/weapons/:id",
    name: "WeaponDetailPage",
    component: WeaponDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
