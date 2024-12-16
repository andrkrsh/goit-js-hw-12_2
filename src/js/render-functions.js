import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const loaderBtn = document.querySelector('.loader-btn');
const loadMoreBtn = document.querySelector('.load-more');
let lightbox;

export function renderCard(hits, gallery) {

    const markup = hits.map(hit => createGalleryCard(hit)).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    if (lightbox) {
        lightbox.refresh();
    } else {
        lightbox = new SimpleLightbox('.gallery a');
    }
}

function createGalleryCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <a class="gallery-item" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p><span>Likes:</span> ${likes}</p>
        <p><span>Views:</span> ${views}</p>
        <p><span>Comments:</span> ${comments}</p>
        <p><span>Downloads:</span> ${downloads}</p>
      </div>
    </a>
  `;
}

export function clearGallery(gallery) {
    gallery.innerHTML = '';
}

export function showErrorMessage(message) {
    iziToast.error({
        message: message,
        messageColor: '#fff',
        position: 'topRight',
        backgroundColor: '#5b8cd1',
    });
}

export function showLoadingIndicator() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
}

export function hideLoadingIndicator() {
    const loader = document.querySelector('.loader');
    if (loader) {
        document.body.removeChild(loader);
    }
}

export function showLoadMoreBtn() {
    loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreBtn() {
    loadMoreBtn.classList.add('hidden');

}

export function showLoadingIndicatorBtn() {
    loaderBtn.classList.remove('hidden')
}

export function hideLoadingIndicatorBtn() {
    loaderBtn.classList.add('hidden');

}