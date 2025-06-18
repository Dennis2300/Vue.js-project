import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import CharactersPage from "./views/CharactersPage.vue";
import TeamsPage from "./views/TeamsPage.vue";
import AboutPage from "./views/AboutPage.vue";
import CharacterDetailPage from "./views/CharacterDetailPage.vue";
import WeaponsPage from "./views/WeaponsPage.vue";
import ArtifactsPage from "./views/ArtifactsPage.vue";
import WeaponDetailPage from "./views/WeaponDetailPage.vue";
import ArtifactDetailPage from "./views/ArtifactDetailPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/teams", component: TeamsPage },
  { path: "/characters", component: CharactersPage },
  {
    path: "/characters/:id",
    name: "CharacterDetailPage",
    component: CharacterDetailPage,
  },
  { path: "/weapons", component: WeaponsPage },
  {
    path: "/weapons/:id",
    name: "WeaponDetailPage",
    component: WeaponDetailPage,
  },
  { path: "/artifacts", component: ArtifactsPage },
  {
    path: "/artifacts/:id",
    name: "ArtifactDetailPage",
    component: ArtifactDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    return { top: 0 };
  },
});

export default router;
