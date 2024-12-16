import axios from 'axios';

const API_KEY = '47661758-276cd75f39684298817518b5c';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImg(searchQuery, page = 1, perPage = 15) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage
    });
    try {
        const response = await axios.get(`${BASE_URL}?${params}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}