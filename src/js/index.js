import Notiflix from 'notiflix';
import { serviceMovie } from './api-key';
import { createMarkup } from './create';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

export const variables = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

const perPage = 40;
let page = 1;
let searchImg = '';
let isLoading = false;
let firstLoadCompleted = false;

variables.searchForm.addEventListener('submit', handleFormSubmit);
window.addEventListener('scroll', handleScroll);

function handleFormSubmit(event) {
  event.preventDefault();
  page = 1;
  variables.gallery.innerHTML = '';
  firstLoadCompleted = false;

  const { searchQuery } = event.currentTarget.elements;
  searchImg = searchQuery.value.trim().toLowerCase();

  if (searchImg === '') {
    Notiflix.Notify.info('Please, enter parameters for search');
    return;
  }

  loadImages();
  event.currentTarget.reset();
}

export function handleScroll(data) {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 1 && !isLoading) {
    loadImages();
  }
  // console.log('page * perPage', page * perPage);
  // console.log('data.total', data.total);
  // console.log('data.totalHits', data.totalHits);
  if (page * perPage >= data.totalHits) {
    removeScrollListener();
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results"
    );
  }
}

function removeScrollListener() {
  window.removeEventListener('scroll', handleScroll);
}

async function loadImages() {
  isLoading = true;

  try {
    const data = await serviceMovie(searchImg, page, perPage);
    const resSearch = data.hits;

    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your request. Please try again'
      );
    } else {
      if (!firstLoadCompleted) {
        // Додаємо перевірку
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
        firstLoadCompleted = true;
      }
      createMarkup(resSearch);
    }
    lightbox.refresh();
    page += 1;
  } catch (error) {
    onFetchError();
  } finally {
    isLoading = false;
  }
}

function onFetchError() {
  Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
}
// щось не дуже сподобалось
// function scrollPage() {
//   const { height: cardHeight } =
//     variables.gallery.firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
