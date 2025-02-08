<template>
  <div class="container">
    <h1>Genshin Regions</h1>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="region in regions" :key="region.id">
          <strong>{{ region.name }}</strong>
          <img :src="region.image_url" alt="Region Image" class="region-img" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { supabase } from "@/supabaseClient";
export default {
  setup() {
    const regions = ref([]);
    const loading = ref(true);

    const fetchRegions = async () => {
      loading.value = true;
      const { data, error } = await supabase.rpc("genshin.regions");

      if (error) console.error("Error fetching regions:", error);
      else regions.value = data;

      loading.value = false;
    };

    onMounted(fetchRegions);

    return { regions, loading };
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
.region-img {
  width: 150px;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
}
</style>
