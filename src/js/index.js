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
        variables.loadMoreButton.classList.remove('is-hidden');
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
      variables.loadMoreButton.classList.add('is-hidden');
      Notiflix.Notify.info(
        'We`re soory, but you`ve reached the end of search fins.'
      );
      variables.loadMoreButton.removeEventListener('click', handleLoadMove);
      // window.removeEventListener('scroll', onInfiniteScroll);
    }
  } catch (error) {
    onFetchError;
  }
  //  lightbox.refresh();
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

// треба допрацювати цей скрол, щоб не задвоювалися сторінки
// при новому запиті пошуку, тому поки без нього
// function onInfiniteScroll() {
//   if (
//     window.innerHeight + window.scrollY >=
//     document.documentElement.scrollHeight
//   ) {
//     handleLoadMove();
//   }
// }

// треба допрацювати цей скрол, щоб не задвоювалися сторінки
// при новому запиті пошуку, тому поки без нього
// function onInfiniteScroll() {
//   if (
//     window.innerHeight + window.scrollY >=
//     document.documentElement.scrollHeight
//   ) {
//     houdllLoadMore();
//   }
// }

// import axios from 'axios';
// import Notiflix from 'notiflix';
// import { serviceMovie } from './api-key';
// import { createMarkup } from './create';

// export const variables = {
//   form: document.querySelector(`.search-form`),
//   gallery: document.querySelector(`.gallery`),
//   loadMoreButton: document.querySelector(`.load-more`),
// };

// let page = 1;
// const per_page = 40;
// let searchImg = '';

// variables.loadMoreButton.classList.add('is-hidden');
// variables.gallery.addEventListener('submit', hendleClick);

// function hendleClick(event) {
//   event.preventDefault();
//   page = 1;
//   variables.gallery.innerHTML = '';
//   const { searchQuery } = event.currentTarget.elements;
//   searchImg = searchQuery.value.trim().toLowerCase();

//   if (searchImg === '') {
//     Notiflix.Notify.info('Please, enter parameters for search');
//     return;
//   }

//   serviceMovie(searchImg, page, per_page)
//     .then(data => {
//       const resSearch = data.hits;
//       if (data.totalHits === 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your request. Please try again'
//         );
//       } else {
//         Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
//         createMarkup(resSearch);
//       }
//       if (data.totalHits > per_page) {
//         variables.loadMoreButton.classList.remove('is-hidden');
//       }
//     })
//     .catch(error => {
//       Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
//     });
//   variables.loadMoreButton.addEventListener('click', handleLoadMore);
// }

// async function handleLoadMore() {
//   page += 1;
//   try {
//     const fin = await serviceMovie(searchImg, page, per_page);
//     const resSearch = fin.hits;
//     const numEndPage = Math.ceil(fin.totalHits / per_page);
//     createMarkup(resSearch);

//     if (page === numEndPage) {
//       variables.loadMoreButton.classList.add('is-hidden');
//       Notiflix.Notify.info(
//         'We`re soory, but you`ve reached the end of search fins.'
//       );
//       variables.loadMoreButton.removeEventListener('click', handleLoadMore);
//     }
//   } catch (error) {
//     Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
//   }
// }

// const hendleInput = document.querySelector(`input[name="searchQuery"]`);
// const btn = document.querySelector(`button`);

// let page = 1;
// export let infoInput = localStorage.getItem('info'); //констаннта из введенною інформацією
// //функція для зчитування введеної інформації
// btn.addEventListener('click', hendleClick);
// function hendleClick() {
//   const info = hendleInput.value;
//   console.log('info', info);
//   localStorage.setItem('info', JSON.stringify(info));

//   // return info;
//   // console.log(localStorage.getItem('info'));
// }
// // console.log('функція', serviceMovie);
// export let infoIn = hendleClick();

// console.log('Введені дані', infoInput);

// //функція перевірки отриманих значень та їх відправки в html
// if (infoInput !== null) {
//   serviceMovie()
//     .then(data => {
//       if (data) {
//         // console.log('data', data);
//         gallery.insertAdjacentHTML('beforeend', createMarkup(data)); //додаємо елементи з серверу до діва
//       } else {
//         throw new Error();
//         //прописати виведення вікна з помилкою
//       }
//     })
//     .catch(
//       error => console.log(error)
//       //прописати виведення вікна з помилкою
//     );
// } else {
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   );
// }
// // функція відмалювання отриманих даних
// function createMarkup(array) {
//   return array
//     .map(imgInfo => {
//       // console.log('imgInfo', imgInfo); //об'єкти з даними картинок
//       let {
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       } = imgInfo;
//       return `
//     <div class="photo-card">
//       <img src="${largeImageURL}" alt="${tags}" srcset="${webformatURL}" loading="lazy" />
//       <div class="info">
//         <p class="info-item">
//           <b>Likes: ${likes}</b>
//         </p>
//         <p class="info-item">
//           <b>Views: ${views}</b>
//         </p>
//         <p class="info-item">
//           <b>Comments: ${comments}</b>
//         </p>
//         <p class="info-item">
//          <b>Downloads: ${downloads}</b>
//          </p>
//       </div>
//     </div>`;
//     })
//     .join('');
// }

// //очищення форми після відправки
// form.addEventListener('submit', event => {
//   event.preventDefault(); //скасування стандартної дії при відправці форми
//   form.reset(); //скидання значень форми
//   localStorage.removeItem('info'); //очищення локального сховища.
// });
