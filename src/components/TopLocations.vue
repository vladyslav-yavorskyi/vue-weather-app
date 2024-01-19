<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const locations = ref([]);
const url = import.meta.env.VITE_WEATHER_API_URL;
const key = import.meta.env.VITE_WEATHER_API_KEY;
const isLoading = ref(true);
const fetchData = async () => {
  try {
    const response = await axios.get(`${url}/50?apikey=${key}`);
    locations.value = response.data;
    console.log(locations.value)
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchData();
});

</script>

<template>
  <div id="app">
    <h1>Jobs</h1>
    <p>Here are the top 50 locations for jobs in the world.</p>
    <p>Click on a location to see more information.</p>
    <router-link to="/">Back to home.</router-link>
    <p v-if="isLoading">Loading...</p>
    <ul>
      <li v-for="location in locations" :key="location.Key">
        <h2>{{ location.EnglishName }}</h2>
        <p>{{ location.Country.EnglishName }}</p>
        <a :href="location.Link" target="_blank">More info</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>