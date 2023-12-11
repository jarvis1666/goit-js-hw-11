import axios from 'axios';

const KEY = '41195760-52c8d9d10a5236187cb5e2e09';
const BASE_URL = 'https://pixabay.com/api/';

export async function serviceMovie() {
  const queryParams = new URLSearchParams({
    key: KEY,
    q: 'p',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  try {
    const response = await axios.get(`${BASE_URL}?${queryParams}`);
    console.log('response', response.data.hits); // масив отриманих зображень
    return response.data.hits;
  } catch (error) {
    throw new Error(error);
    //вивести вікно з помилкою
  }
}
