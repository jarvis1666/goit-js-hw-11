import Notiflix from 'notiflix';
import { serviceMovie } from './api-key';
import { createMarkup } from './create';

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

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
    loadImages();
  }
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

    if (data.totalHits > page * perPage) {
    } else {
    }

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

function scrollPage() {
  const { height: cardHeight } =
    variables.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
