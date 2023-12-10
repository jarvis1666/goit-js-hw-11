import axios from 'axios';

const hendleInput = document.querySelector(`input[name="searchQuery"]`);
const form = document.querySelector(`.search-form`);
const btn = document.querySelector(`button`);

//функцшя для зчитування введеної інформації
btn.addEventListener('click', hendleClick);
function hendleClick() {
  const info = hendleInput.value;

  localStorage.setItem('info', JSON.stringify(info));
  console.log(localStorage.getItem('info'));
}

const infoInput = localStorage.getItem('info'); //констаннта из введенною інформацією
console.log(infoInput);
//очищення форми після відправки
form.addEventListener('submit', event => {
  event.preventDefault(); //скасування стандартної дії при відправці форми
  form.reset(); //скидання значень форми
  localStorage.removeItem('info'); //очищення локального сховища.
});
