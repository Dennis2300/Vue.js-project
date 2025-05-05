<template>
  <div class="weapons-container">
    <LoadingSpinner v-if="loading" />

    <div class="filter-container">
      <div class="filter-header">Placeholder for Weapons Filter</div>
    </div>

    <div class="weapons-grid-container">
      <h1 class="weapons-page-header divider">Welcome to the Weapons Page</h1>
      <div v-if="!loading && !error && weapons?.length">
        <div class="weapons-grid">
          <div v-for="weapon in weapons" :key="weapon.id">
            <h1>{{ weapon.name }}</h1>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && !error">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import Footer from "@/components/Footer.vue";

const loading = ref(true);
const error = ref(null);

const weapons = ref([]);

async function getAllWeapons() {
  try {
    let { data, error: fetchError } = await supabase.from("weapon").select("*");

    if (fetchError) throw fetchError;

    weapons.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getAllWeapons();
});
</script>

<style scoped>
.weapons-container {
  margin-top: 75px;
  width: 100vw;
}

.weapons-grid-container {
  min-height: 100vh;
}

.weapons-page-header {
  font-size: 2rem;
  color: white;
}

.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
