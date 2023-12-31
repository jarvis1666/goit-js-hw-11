import { variables } from './index';

export function createMarkup(resSearch) {
  const array = resSearch.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
      <a class="gallery_link" href="${largeImageURL}" data-lightbox="gallery">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info"><p class="info-item">
      <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
      <b>Views: ${views}</b>
      </p>
      <p class="info-item">
      <b>Comments: ${comments}</b>
      </p
      ><p class="info-item">
      <b>Downloads: ${downloads}</b>
      </p>
      </div>
      </div>`;
    }
  );
  variables.gallery.insertAdjacentHTML('beforeend', array.join(''));
}
