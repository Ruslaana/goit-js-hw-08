import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
galleryList.style.listStyleType = 'none';

const galeryMarkup = createGalleryItem(galleryItems);

galleryList.insertAdjacentHTML('beforeend', galeryMarkup);

const gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  fadeSpeed: 250,
});

//=================================
function createGalleryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"/>
        </a>
    </li>`;
    })
    .join('');
}
