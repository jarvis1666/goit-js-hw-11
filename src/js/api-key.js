import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41101875-48e4e18d626284da52e103f42';

export async function serviceMovie(q, page, perPage) {
  try {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

// import axios from 'axios';

// const KEY = '41195760-52c8d9d10a5236187cb5e2e09';
// const BASE_URL = 'https://pixabay.com/api/';

// export async function serviceMovie(q, page, per_page) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
//     );
//     console.log('response', response.data.hits); // масив отриманих зображень
//     return response.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
