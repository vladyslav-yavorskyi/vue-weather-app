import { ref } from 'vue';
import axios from 'axios';

const url = import.meta.env.VITE_WEATHER_API_URL;
const key = import.meta.env.VITE_WEATHER_API_KEY;

export function useSearchUsersQuery(cityName) {
  const data = ref(null);
  const isLoading = ref(false);
  const isError = ref(false);

  // Your data fetching logic goes here
  // Replace with your Vue-compatible library logic if available
  const fetchData = async () => {
    isLoading.value = true;
    try {

      const response = await axios.get(`${url}/locations/v1/cities/autocomplete?apikey=${key}&q=${cityName}`);
      data.value = response.data;
      console.log(data.value, 'data');
      console.log(cityName, 'cityName');
    } catch (error) {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, isError, fetchData };
}

// Similar implementation for useLazyGetUserReposQuery
