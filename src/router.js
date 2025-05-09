import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import CharactersPage from "./views/CharactersPage.vue";
import TeamsPage from "./views/TeamsPage.vue";
import AboutPage from "./views/AboutPage.vue";
import TestDataPage from "./views/TestDataPage.vue";
import CharacterDetailPage from "./views/CharacterDetailPage.vue";
import WeaponsPage from "./views/WeaponsPage.vue";
import ArtifactsPage from "./views/ArtifactsPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/characters", component: CharactersPage },
  { path: "/teams", component: TeamsPage },
  { path: "/test", component: TestDataPage },
  { path: "/weapons", component: WeaponsPage },
  { path: "/artifacts", component: ArtifactsPage },
  {
    path: "/characters/:id",
    name: "CharacterDetaiPage",
    component: CharacterDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
