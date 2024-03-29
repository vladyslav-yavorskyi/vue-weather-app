import { ref, watch, toRef } from 'vue'
import axios from "axios";

export function useFetch(urlRef) {
    const data = ref(null)
    const isError = ref(null)
    const isLoading = ref(false)

    const fetchData = async () => {
        data.value = null
        isError.value = null
        isLoading.value = true

        if (urlRef.value.length === 0) return;
        try {
            const response = await axios.get(urlRef.value)
            data.value = response.data.slice(0, 5)
        } catch (err) {
            isError.value = err
        } finally {
            isLoading.value = false
        }
    }

    watch(urlRef, fetchData)

    return { data, isError, isLoading, fetchData }
}