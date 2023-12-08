import axios from 'axios';

const API_KEY = '40129758-d2f16a0aa6f51ef2ae8e82b21';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    orientation: 'horizontal',
    image_type: 'photo',
    q: searchQuery,
    page: page,
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return response.data;
}
