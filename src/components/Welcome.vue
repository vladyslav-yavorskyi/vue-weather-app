<template>
  <div class="flex justify-center pt-10 mx-auto h-screen w-screen">

    <div class="relative w-[560px]">
      <input
          type="text"
          class="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for city..."
          v-model="search"
      />

      <ul class="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
        <li v-if="isLoading" class="text-center">Loading...</li>
        <li
            v-for="city in data"
            :key="city.Key"
            class="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          <router-link @click="() => setCity(city.LocalizedName)" :to="{ name: 'City', params: { cityKey: city.Key} }">
            {{ city.LocalizedName  }} - {{ city.Country.LocalizedName }}
          </router-link>
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import { debounce } from '../hooks/debounce.js';
import {useFetch} from "../hooks/fetchData.js";
import {store} from "../state/store.js";

const url = import.meta.env.VITE_WEATHER_API_URL;
const key = import.meta.env.VITE_WEATHER_API_KEY;
const search = ref('');
const cityName = ref('');


const urlRef = computed(() => `${url}/locations/v1/cities/autocomplete?apikey=${key}&q=${cityName.value}`);
const {data, isLoading} = useFetch(urlRef);

const setCity = (city) => {
  store.currentCity = city;
}

watch(search, debounce(() => {
  cityName.value = search.value;
}, 500));


</script>
