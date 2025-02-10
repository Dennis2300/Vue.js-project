<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabaseClient.js";

const visions = ref([]);
const error = ref(null);

async function fetchVisions() {
    try {
        let { data, error: fetchError } = await supabase.from("vision").select("*");
        if (fetchError) throw fetchError;
        visions.value = data;
        console.log(data);
    } catch (err) {
        error.value = err.message;
    }
};

onMounted(() => {
    fetchVisions();
});
</script>

<template>
  <div>
    <h2>Create Character</h2>
    <form ></form>
  </div>
</template>
