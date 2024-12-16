import { fetchImg } from './js/pixabay-api.js';
import { renderCard, showErrorMessage, showLoadingIndicator, hideLoadingIndicator, clearGallery, showLoadMoreBtn, hideLoadMoreBtn, showLoadingIndicatorBtn, hideLoadingIndicatorBtn } from './js/render-functions.js';



const searchForm = document.querySelector("form");
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    hideLoadMoreBtn();
    clearGallery(gallery);

    const form = e.currentTarget;
    searchQuery = form.elements.query.value.trim();
    page = 1;

    if (searchQuery === '') {
        showErrorMessage("Please enter a search query.");
        return;
    }

    showLoadingIndicator();

    fetchImg(searchQuery, page)
        .then(data => {
            hideLoadingIndicator();

            if (data.hits.length === 0) {
                showErrorMessage("Sorry, there are no images matching your search query. Please try again!");
                return;
            }

            totalHits = data.totalHits;

            renderCard(data.hits, gallery);

            if (data.hits.length < 15 || gallery.children.length >= totalHits) {
                showEndOfResultsMessage();
            } else {
                showLoadMoreBtn();
            }
        })
        .catch(error => {
            console.log(error);
            showErrorMessage("Failed to fetch images. Please try again later.");
        });

    e.currentTarget.reset();
}


function onLoadMore() {
    page += 1;
    showLoadingIndicatorBtn();
    fetchImg(searchQuery, page)
        .then(data => {
            hideLoadingIndicator();
            renderCard(data.hits, gallery);
            hideLoadingIndicatorBtn();

            if (gallery.children.length >= totalHits) {
                hideLoadMoreBtn();
                showEndOfResultsMessage();
            }

            smoothScroll();
        })
        .catch(error => {
            hideLoadingIndicator();
            console.log(error);
            showErrorMessage("Failed to fetch images. Please try again later.");
        });

}

function smoothScroll() {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}