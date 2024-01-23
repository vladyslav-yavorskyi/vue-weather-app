<template>
  <div :class="theme" class="h-screen w-screen ">
    <div class="flex justify-center items-center h-screen">
      <div class="glass-card flex justify-center items-center flex-col">
        <h1>City </h1> <h1>{{ store.currentCity }}</h1>
        <div v-if="isLoadingCity">Loading...</div>
        <div v-else-if="cityData && cityData.length > 0">
          <h2>{{ cityData[0].WeatherText }}</h2>
          <p>Temperature: {{ cityData[0].Temperature.Metric.Value }}°C</p>
          <img :src="getWeatherIcon(cityData[0].WeatherIcon)" alt="icon"/><!--          <p>{{// getWeatherIcon( Number(cityData[0].WeatherIcon ))}}</p>-->
          <p>Has Precipitation: {{ cityData[0].HasPrecipitation }}</p>
          <p>Precipitation Type: {{ cityData[0].PrecipitationType }}</p>
          <p>Is Day Time: {{ cityData[0].IsDayTime }}</p>
        </div>
        <div v-else>
          <p>No data available</p>
        </div>
        <div v-if="cityHistoryData && cityHistoryData.length" class="flex">
          {{ cityHistoryData[0].length }}
          <div v-for="item in cityHistoryData" :key="item.EpochTime">
            <p>{{ getFormattedTime(item.LocalObservationDateTime) }}</p>
            <p>{{ item.WeatherText }}</p>
            <p>{{ item.Temperature.Metric.Value }}</p>
            <img :src="getWeatherIcon(item.WeatherIcon)" alt="icon"/><!--          <p>{{// getWeatherIcon( Number(cityData[0].WeatherIcon ))}}</p>-->
            <p>{{ item.HasPrecipitation }}</p>
            <p>{{ item.PrecipitationType }}</p>
            <p>{{ item.IsDayTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, computed, ref, watch, toRefs} from "vue";
import {useFetch} from "../hooks/fetchData.js";
import {store} from "../state/store.js";

const url = import.meta.env.VITE_WEATHER_API_URL;
const key = import.meta.env.VITE_WEATHER_API_KEY;

const route = useRoute();

let cityKey = ref(route.params.cityKey);

watch(() => route.params, (newParams) => {
  cityKey.value = newParams.cityKey;
});

const urlHistory = computed(() => `${url}/currentconditions/v1/${cityKey.value}/historical/24?apikey=${key}`);
const urlRef = computed(() => `${url}/currentconditions/v1/${cityKey.value}?apikey=${key}`);
const { data: cityData, isLoading: isLoadingCity, fetchData: fetchCityData } = useFetch(urlRef);
const { data: cityHistoryData, isLoading: isLoadingHistory, fetchData: fetchHistoryData} = useFetch(urlHistory)
onMounted(() => {
  fetchCityData();
  fetchHistoryData();
})


const getFormattedTime = (time) => {
  let date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

const getWeatherIcon = (icon) => {
    return `https://developer.accuweather.com/sites/default/files/${icon < 10 ? '0' + icon : icon}-s.png`;
}
console.log(getWeatherIcon(1))

const theme = computed(() => {
  if (!cityData.value || cityData.value.length === 0) {
    return '';
  }

  const weatherText = cityData.value[0].WeatherText.toLowerCase()
  const temperature = cityData.value[0].Temperature.Metric.Value;
  const currentTime = new Date().getHours();

  if (currentTime >= 18 || currentTime <= 6) {
    return 'theme-dark';
  } else if (weatherText.includes('snow') && temperature <= 0) {
    return 'theme-snow';
  } else if (weatherText.includes('rain')) {
    console.log('rain')
    return 'theme-rain';
  } else if (weatherText.includes('sunny') && temperature > 20) {
    return 'theme-sunny';
  } else if (weatherText.includes('cloudy')) {
    return 'theme-cloudy';
  } else if (weatherText.includes('windy')) {
    return 'theme-windy';
  } else if (currentTime >= 6 && currentTime <= 18 && temperature > 30) {
    return 'theme-hot';
  }

  return '';
});


</script>

<style scoped>

.glass-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 20px;
  color: #fff;
  width: 80vw;
  height: 65vh;
}

.glass-card h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

.glass-card h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.glass-card p {
  font-size: 1em;
  margin-bottom: 10px;
}

.theme-dark {
  position: relative;
  color: #FFFFFF;
  height: 100%;
  width: 100%;
}

.theme-dark::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../assets/theme-backgrounds/night.png');
  background-size: cover;
  backdrop-filter: blur(10px);
}
.theme-snow {
  background-color: #fff;
  color: #000;
}

.theme-rain {
  background-color: #5f9ea0;
  color: #fff;
}

.theme-sunny {
  background-color: #ffdb58;
  color: #000;
}

.theme-cloudy {
  position: relative;
  color: #FFFFFF;
  height: 100%;
  width: 100%;
}

.theme-cloudy::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../assets/theme-backgrounds/cloudy.png');
  background-size: cover;
  backdrop-filter: blur(10px);
}

.theme-windy {
  background-color: #87ceeb;
  color: #000;
}

.theme-hot {
  background-color: #ff4500;
  color: #fff;
}
</style>
