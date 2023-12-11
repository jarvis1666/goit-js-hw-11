import axios from 'axios';
import { serviceMovie } from './api-key';

const hendleInput = document.querySelector(`input[name="searchQuery"]`);
const form = document.querySelector(`.search-form`);
const btn = document.querySelector(`button`);
const gallery = document.querySelector(`.gallery`);

let page = 1;

//функція для зчитування введеної інформації
btn.addEventListener('click', hendleClick);
function hendleClick() {
  const info = hendleInput.value;

  localStorage.setItem('info', JSON.stringify(info));
  console.log(localStorage.getItem('info'));
}
// console.log('функція', serviceMovie);
export const infoInput = localStorage.getItem('info'); //констаннта из введенною інформацією
console.log('Введені дані', infoInput);

//функція перевірки отриманих значень та їх відправки в html
serviceMovie()
  .then(data => {
    if (data) {
      console.log('data', data);
      gallery.insertAdjacentHTML('beforeend', createMarkup(data)); //додаємо елементи з серверу до діва
    } else {
      throw new Error();
      //прописати виведення вікна з помилкою
    }
  })
  .catch(
    error => console.log(error)
    //прописати виведення вікна з помилкою
  );

// функція відмалювання отриманих даних
function createMarkup(array) {
  return array
    .map(imgInfo => {
      // console.log('imgInfo', imgInfo); //об'єкти з даними картинок
      let {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = imgInfo;
      return `
    <div class="photo-card">
      <img src="${largeImageURL}" alt="${tags}" srcset="${webformatURL}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
         <b>Downloads: ${downloads}</b>
         </p>
      </div>
    </div>`;
    })
    .join('');
}

//очищення форми після відправки
form.addEventListener('submit', event => {
  event.preventDefault(); //скасування стандартної дії при відправці форми
  form.reset(); //скидання значень форми
  localStorage.removeItem('info'); //очищення локального сховища.
});
