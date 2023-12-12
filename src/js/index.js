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

variables.loadMoreButton.classList.add('is-hidden');
variables.searchForm.addEventListener('submit', hendleClick);

function hendleClick(event) {
  event.preventDefault();
  page = 1;
  variables.gallery.innerHTML = '';
  const { searchQuery } = event.currentTarget.elements;
  searchImg = searchQuery.value.trim().toLowerCase();

  if (searchImg === '') {
    Notiflix.Notify.info('Please, enter parameters for search');
    return;
  }

  serviceMovie(searchImg, page, perPage)
    .then(data => {
      const resSearch = data.hits;
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your request. Please try again'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
        createMarkup(resSearch);
        // lightbox.refresh();
      }
      if (data.totalHits > perPage) {
        variables.loadMoreButton.classList.remove('button.is-hidden');
        // window.addEventListener('scroll', onInfiniteScroll);
      }
      scrollPage();
    })
    .catch(onFetchError);

  variables.loadMoreButton.addEventListener('click', handleLoadMove);

  event.currentTarget.reset();
}

async function handleLoadMove() {
  page += 1;
  try {
    const fin = await serviceMovie(searchImg, page, perPage);
    const resSearch = fin.hits;
    const numEndPage = Math.ceil(fin.totalHits / perPage);
    createMarkup(resSearch);

    if (page === numEndPage) {
      variables.loadMoreButton.classList.add('button.is-hidden');
      Notiflix.Notify.info(
        'We`re soory, but you`ve reached the end of search fins.'
      );
      variables.loadMoreButton.removeEventListener('click', handleLoadMove);
      // window.removeEventListener('scroll', onInfiniteScroll);
    }
  } catch (error) {
    onFetchError;
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
